// Text measurement without layout thrash — a thin wrapper over @chenglou/pretext.
// Browser-only (Canvas 2D + Intl.Segmenter): call from effects, attachments or
// event handlers, never during SSR. `font` is a canvas font string, e.g.
// "500 12px Inter" — name a real family; bare `system-ui` measures wrong on macOS.
import { prepare, layout, prepareWithSegments, measureNaturalWidth } from '@chenglou/pretext';
export function lineCount(text, font, width, options) {
    return layout(prepare(text, font, options), width, 1).lineCount;
}
export function fits(text, font, width, lines = 1) {
    return lineCount(text, font, width) <= lines;
}
/** Height the text will take at `width`, before it is in the DOM. */
export function textHeight(text, font, width, lineHeight) {
    return layout(prepare(text, font), width, lineHeight).height;
}
/** Natural (unwrapped) width of `text` in `font`, px. */
export function textWidth(text, font) {
    return measureNaturalWidth(prepareWithSegments(text, font));
}
/** Longest candidate (in given order) that fits in `lines`; the last one if none does. */
export function pickFit(candidates, font, width, lines = 1) {
    return candidates.find((c) => fits(c, font, width, lines)) ?? candidates.at(-1) ?? '';
}
/**
 * Which parts of a chip fit in `budget` px along one axis — width for a row
 * of parts, height for a stack of them.
 *
 * Anchors (`priority: 0`) always show; they are what earns an ellipsis when
 * even they overflow. The rest are added in priority order and the first one
 * that does not fit ends it: a chip reads in one direction, so keeping a later
 * part after dropping an earlier one reads as arbitrary.
 *
 * A budget of 0 — server-rendered, or before the first measurement — leaves
 * the anchors, so the first paint is the important part and nothing else.
 */
export function fitParts(parts, budget, measure = textWidth) {
    const shown = {};
    for (const p of parts)
        shown[p.key] = false;
    const present = parts.filter((p) => p.size !== undefined || !!p.text);
    const anchors = present.filter((p) => (p.priority ?? 1) === 0);
    for (const p of anchors)
        shown[p.key] = true;
    if (!(budget > 0))
        return shown;
    const cost = (p) => (p.size ?? measure(p.text, p.font ?? '')) + (p.extra ?? 0);
    let used = 0;
    for (const p of anchors)
        used += cost(p);
    const optional = present
        .filter((p) => (p.priority ?? 1) !== 0)
        .sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1));
    for (const p of optional) {
        const c = cost(p);
        if (used + c > budget)
            break;
        used += c;
        shown[p.key] = true;
    }
    return shown;
}
/** The element's computed font as a canvas font string. */
export function fontOf(el) {
    const s = getComputedStyle(el);
    return `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
}
/**
 * `{@attach fitLabel([title, short, initials])}` — keeps the element's text at
 * the longest candidate that fits its content box. The element needs a width
 * that does not come from its own text (block, or a flex item with min-width: 0).
 */
export function fitLabel(candidates, lines = 1) {
    return (el) => {
        const font = fontOf(el);
        let width = 0;
        const apply = () => { el.textContent = pickFit(candidates, font, width, lines); };
        const ro = new ResizeObserver(([entry]) => { width = entry.contentRect.width; apply(); });
        ro.observe(el);
        document.fonts?.ready.then(apply); // webfont swap changes widths without a resize
        return () => ro.disconnect();
    };
}
// ─── Paragraph breaking (Knuth-Plass, simplified) ────────────────────────
// The browser breaks greedily: fill a line, break, repeat. This scores every
// feasible set of breaks by how much each line would have to stretch and
// keeps the cheapest — the lines come out even instead of one loose line
// paying for the next. Break opportunities are the text's own: spaces and
// soft hyphens (U+00AD, typeset server-side). No-break spaces stay glued.
// Scoring is TeX's: badness = 100·(slack / stretch)³ where each interword
// space may stretch by half its width, capped at 10000; a line costs
// (10 + badness)² plus 50² for ending inside a word, plus 10000 when the line
// above did too. ponytail: no fitness classes, no shrink; O(n·k).
const SHY = '­';
export function breakLines(text, font, width) {
    const measure = (s) => measureNaturalWidth(prepareWithSegments(s, font));
    const boxes = [];
    const glue = []; // glue[i] sits between boxes[i] and boxes[i + 1]
    // Any whitespace run is one space to `white-space: normal` — a stored line
    // break included. Only a no-break space keeps its neighbours in one box.
    const words = text.split(/[^\S\u00a0]+/).filter(Boolean);
    words.forEach((w, wi) => {
        const frags = w.split(SHY);
        frags.forEach((f, fi) => {
            boxes.push(f);
            if (fi < frags.length - 1)
                glue.push('shy');
        });
        if (wi < words.length - 1)
            glue.push('space');
    });
    const n = boxes.length;
    if (n === 0)
        return [];
    const bw = boxes.map(measure);
    const space = measure('a a') - measure('aa');
    const hyphen = measure('-');
    const badness = (slackPx, spaces) => {
        const r = slackPx / (Math.max(spaces, 1) * space * 0.5);
        return Math.min(10000, 100 * r * r * r);
    };
    // best[h][k]: cheapest way to set boxes[0..k) with a break after, h = 1 when
    // that last line ended inside a word; prev[h][k]: [start of that line, its h].
    const best = [new Array(n + 1).fill(Infinity), new Array(n + 1).fill(Infinity)];
    const prev = [new Array(n + 1), new Array(n + 1)];
    best[0][0] = 0;
    for (let i = 0; i < n; i++) {
        for (const ph of [0, 1]) {
            if (best[ph][i] === Infinity)
                continue;
            let w = 0;
            let spaces = 0;
            for (let j = i; j < n; j++) {
                w += bw[j];
                const last = j === n - 1;
                const h = !last && glue[j] === 'shy' ? 1 : 0;
                const lineW = h ? w + hyphen : w;
                if (lineW > width) {
                    if (w > width)
                        break;
                    continue; // only the hyphen overflows — try the next box
                }
                const b = last ? 0 : badness(width - lineW, spaces);
                const cost = last ? 0 : (10 + b) ** 2 + (h ? 50 ** 2 : 0) + (h && ph ? 10000 : 0);
                if (best[ph][i] + cost < best[h][j + 1]) {
                    best[h][j + 1] = best[ph][i] + cost;
                    prev[h][j + 1] = [i, ph];
                }
                if (!last && glue[j] === 'space') {
                    w += space;
                    spaces++;
                }
            }
        }
    }
    let h = best[0][n] <= best[1][n] ? 0 : 1;
    if (best[h][n] === Infinity)
        return [text]; // a box wider than the column: let the browser cope
    const lines = [];
    for (let k = n; k > 0;) {
        const [i, ph] = prev[h][k];
        let line = '';
        for (let b = i; b < k; b++)
            line += boxes[b] + (b < k - 1 && glue[b] === 'space' ? ' ' : '');
        if (h)
            line += '-';
        lines.unshift(line);
        k = i;
        h = ph;
    }
    return lines;
}
/**
 * `<p {@attach typeset(text)}>` — sets the paragraph as justified Knuth-Plass
 * lines, one block span per line, re-done on resize and after webfonts load.
 * Progressive: the server-rendered text is what crawlers and no-JS get; if the
 * browser's own measure disagrees with ours (a line overflows), the plain
 * text goes back and the browser breaks it. Pass the text, not the DOM — the
 * span rebuild replaces the framework's text node.
 */
export function typeset(text) {
    return (el) => {
        if (getComputedStyle(el).whiteSpace !== 'normal')
            return;
        const font = fontOf(el);
        let width = 0;
        // A line span never wraps: canvas and layout disagree by a pixel now and
        // then, and a line that wrapped inside its span — the browser hyphenating
        // the last word with its own dictionary, "małżeń-" / "stwo" — read as a
        // hole in the paragraph. Set as nowrap, a misfit is plain overflow, which
        // is measurable: re-break a touch narrower, and only then hand the text
        // back to the browser.
        const set = (w) => {
            const lines = breakLines(text, font, w);
            el.replaceChildren(...lines.map((l, i) => {
                const s = document.createElement('span');
                s.style.display = 'block';
                s.style.whiteSpace = 'nowrap';
                s.style.hyphens = 'manual';
                s.style.textAlign = 'justify';
                s.style.textAlignLast = i === lines.length - 1 ? 'auto' : 'justify';
                s.textContent = l;
                return s;
            }));
            for (const s of el.children)
                if (s.scrollWidth > s.clientWidth + 1)
                    return false;
            return true;
        };
        const apply = () => {
            if (!width)
                return;
            for (const w of [width, width - 2, width * 0.985, width * 0.97])
                if (set(w))
                    return;
            el.textContent = text;
        };
        const ro = new ResizeObserver(([e]) => {
            if (e.contentRect.width === width)
                return;
            width = e.contentRect.width;
            apply();
        });
        ro.observe(el);
        document.fonts?.ready.then(apply);
        return () => ro.disconnect();
    };
}
