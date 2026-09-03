globalThis.__DAY_CALENDAR_CSS__ = ":host{display:block}\n\t/* ─── Container ──────────────────────────────────── */\n\t.tw.svelte-j4rvbp {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw--auto.svelte-j4rvbp { overflow: visible; }\n\n\t/* ─── Scroll container ───────────────────────────── */\n\t.tw-scroll.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\toverflow-y: auto;\n\t\toverflow-x: auto;\n\t\toverscroll-behavior: contain;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t}\n\t.tw--auto.svelte-j4rvbp .tw-scroll:where(.svelte-j4rvbp) { overflow-y: visible; }\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar { width: 5px; height: 5px; }\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-scrollbar, rgba(0, 0, 0, 0.1));\n\t\tborder-radius: 4px;\n\t}\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar-track { background: transparent; }\n\n\t.tw-inner.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\twidth: 100%;\n\t}\n\n\t/* ─── Sticky top (header + all-day) ──────────────── */\n\t.tw-top.svelte-j4rvbp {\n\t\tposition: sticky;\n\t\ttop: 0;\n\t\tz-index: 30;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t/* ─── Day header row ─────────────────────────────── */\n\t.tw-head.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t}\n\n\t.tw-corner.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 2;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t}\n\n\t.tw-hd.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: var(--tw-col-min, 110px);\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tgap: 2px;\n\t\tpadding: 8px 4px 6px;\n\t\tborder-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.tw-hd-wd.svelte-j4rvbp {\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.06em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.tw-hd--today.svelte-j4rvbp .tw-hd-wd:where(.svelte-j4rvbp) {\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tfont-weight: 600;\n\t}\n\n\t.tw-hd-num.svelte-j4rvbp {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tmin-width: 26px;\n\t\theight: 26px;\n\t\tborder-radius: 50%;\n\t\tfont: 600 14px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.tw-hd-num--today.svelte-j4rvbp {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-accent-fg, #ffffff);\n\t\tfont-weight: 700;\n\t}\n\n\t.tw-hd-custom.svelte-j4rvbp {\n\t\tmax-width: 100%;\n\t\toverflow: hidden;\n\t}\n\n\t/* ─── All-day strip ──────────────────────────────── */\n\t.tw-allday.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tborder-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.tw-ad-gutter.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 2;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: flex-end;\n\t\tpadding: 4px 6px 4px 0;\n\t}\n\t.tw-ad-gutter-lb.svelte-j4rvbp {\n\t\tfont: 500 10px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-align: right;\n\t}\n\n\t.tw-ad-cell.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: var(--tw-col-min, 110px);\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tpadding: 3px 3px 4px;\n\t\tborder-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.tw-ad-cell--today.svelte-j4rvbp { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }\n\n\t.tw-ad.svelte-j4rvbp {\n\t\tappearance: none;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t\tpadding: 2px 6px;\n\t\tmin-height: 18px;\n\t\tborder: none;\n\t\tborder-radius: 3px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-left: 2.5px solid var(--ev-color);\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t\ttransition: background 0.12s;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ad.svelte-j4rvbp:hover {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 32%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.tw-ad--mid.svelte-j4rvbp,\n\t.tw-ad--end.svelte-j4rvbp:not(.tw-ad--start) {\n\t\tborder-left: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t\tborder-radius: 0 3px 3px 0;\n\t}\n\t.tw-ad--selected.svelte-j4rvbp {\n\t\tbox-shadow: 0 0 0 1.5px var(--ev-color);\n\t}\n\t.tw-ad--cancelled.svelte-j4rvbp .tw-ad-title:where(.svelte-j4rvbp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.tw-ad.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.tw-ad-title.svelte-j4rvbp {\n\t\tfont: 500 11px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.tw-ad-span.svelte-j4rvbp {\n\t\tfont: 400 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex-shrink: 0;\n\t}\n\t.tw-ad-cont.svelte-j4rvbp,\n\t.tw-ad-arrow.svelte-j4rvbp {\n\t\tfont-size: 10px;\n\t\tcolor: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tline-height: 1;\n\t}\n\t.tw-ad-arrow.svelte-j4rvbp { margin-left: auto; }\n\n\t.tw-ad-more.svelte-j4rvbp {\n\t\tappearance: none;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tborder-radius: 3px;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tpadding: 2px 6px;\n\t\tcursor: pointer;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ad-more.svelte-j4rvbp:hover { color: var(--dt-text, rgba(0, 0, 0, 0.87)); }\n\t.tw-ad-more.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Grid body ──────────────────────────────────── */\n\t.tw-body.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tposition: relative;\n\t}\n\n\t/* ─── Time gutter ────────────────────────────────── */\n\t.tw-gutter.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 20;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\tborder-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.tw-gutter-lb.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tright: 6px;\n\t\ttransform: translateY(-50%);\n\t\tfont: 500 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\twhite-space: nowrap;\n\t}\n\n\t.tw-gutter-now.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tright: -3px;\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\ttransform: translateY(-50%);\n\t\tz-index: 2;\n\t}\n\n\t/* ─── Columns wrapper ────────────────────────────── */\n\t.tw-cols.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tdisplay: flex;\n\t\tposition: relative;\n\t\tmin-width: 0;\n\t}\n\n\t/* ─── Guide lines ────────────────────────────────── */\n\t.tw-lines.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tpointer-events: none;\n\t\t/* Above the columns' background washes, below blocked/events/now */\n\t\tz-index: 1;\n\t}\n\t.tw-line.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 1px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.tw-line--half.svelte-j4rvbp { opacity: 0.4; }\n\n\t/* ─── Day column ─────────────────────────────────── */\n\t.tw-col.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: var(--tw-col-min, 110px);\n\t\tposition: relative;\n\t\tborder-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tbox-sizing: border-box;\n\t}\n\t/* The gutter's right border already bounds the first column */\n\t.tw-lines.svelte-j4rvbp + .tw-col:where(.svelte-j4rvbp) { border-left: none; }\n\n\t.tw-col--today.svelte-j4rvbp { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }\n\t/* Dim past days with a wash, never a subtree opacity (event contrast) */\n\t.tw-col--past.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 2.5%, transparent);\n\t}\n\t.tw-col--weekend.svelte-j4rvbp:not(.tw-col--today):not(.tw-col--past) {\n\t\tbackground: var(--dt-weekend-bg, rgba(0, 0, 0, 0.012));\n\t}\n\t.tw-col--disabled.svelte-j4rvbp {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tvar(--dt-border, rgba(0, 0, 0, 0.08)) 6px,\n\t\t\tvar(--dt-border, rgba(0, 0, 0, 0.08)) 7px\n\t\t) !important;\n\t}\n\n\t/* ─── Blocked slot overlay ───────────────────────── */\n\t.tw-blocked.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 2;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t\tpointer-events: none;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: center;\n\t\toverflow: hidden;\n\t}\n\t.tw-blocked-lb.svelte-j4rvbp {\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t\twhite-space: nowrap;\n\t\tpadding-top: 4px;\n\t}\n\n\t/* ─── Now line ───────────────────────────────────── */\n\t.tw-now.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 2px;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tbox-shadow: 0 0 6px var(--dt-glow, rgba(37, 99, 235, 0.25));\n\t\tz-index: 12;\n\t\tpointer-events: none;\n\t\ttransform: translateY(-1px);\n\t}\n\t.tw-now-dot.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: -4px;\n\t\ttop: -3px;\n\t\twidth: 8px;\n\t\theight: 8px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.tw-ev.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tz-index: 6;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 14%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\toverflow: hidden;\n\t\tcursor: grab;\n\t\t/* Pointer drags move the event, never scroll the grid */\n\t\ttouch-action: none;\n\t\ttransition: box-shadow 120ms, background 120ms;\n\t\tbox-sizing: border-box;\n\t\tmin-height: 24px;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ev.svelte-j4rvbp:hover {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 24%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tz-index: 8;\n\t}\n\t/* Short blocks keep duration-proportional height, but get a 44px\n\t   transparent hit-slop so clicks/taps still land. */\n\t.tw-ev--short.svelte-j4rvbp { overflow: visible; }\n\t.tw-ev--short.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.tw-ev--selected.svelte-j4rvbp {\n\t\tbox-shadow: 0 0 0 2px var(--ev-color),\n\t\t\t0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t\tz-index: 9;\n\t}\n\t.tw-ev--current.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.tw-ev--resizing.svelte-j4rvbp {\n\t\tz-index: 50;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n\t\tcursor: ns-resize;\n\t}\n\t/* Origin of an in-flight move: still there, clearly no longer the subject. */\n\t.tw-ev--moving.svelte-j4rvbp {\n\t\topacity: 0.3;\n\t\tpointer-events: none;\n\t\tbox-shadow: none;\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — consistent with the other views. */\n\t.tw-ev--cancelled.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.tw-ev--cancelled.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.tw-ev--cancelled.svelte-j4rvbp .tw-ev-stripe:where(.svelte-j4rvbp) { opacity: 0.45; /* decorative bar only */ }\n\t.tw-ev--tentative.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.tw-ev--full.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.tw-ev--full.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) { color: var(--dt-text-2, rgba(0, 0, 0, 0.54)); }\n\t.tw-ev--limited.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.tw-ev--readonly.svelte-j4rvbp { cursor: default; }\n\n\t.tw-ev-stripe.svelte-j4rvbp {\n\t\twidth: 3px;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tborder-radius: 5px 0 0 5px;\n\t}\n\n\t.tw-ev-body.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 3px 6px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\toverflow: hidden;\n\t}\n\t/* Compact (< ~35min at default zoom): single inline line \"9:00 Title\" */\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-body:where(.svelte-j4rvbp) {\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding-top: 1px;\n\t\tpadding-bottom: 1px;\n\t}\n\n\t.tw-ev-time.svelte-j4rvbp {\n\t\tfont: 400 11px/1.1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-time:where(.svelte-j4rvbp) { order: 0; }\n\n\t.tw-ev-title.svelte-j4rvbp {\n\t\tfont: 600 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.tw-ev-loc.svelte-j4rvbp {\n\t\tfont: 400 10px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.tw-ev-live.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\ttop: 4px;\n\t\tright: 4px;\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tanimation: svelte-j4rvbp-tw-pulse 2s ease-in-out infinite;\n\t}\n\t@keyframes svelte-j4rvbp-tw-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t/* Resizing lives only on the centered grip column. The old full-width\n\t   edge bands (12–20px of inward slop each) covered short events\n\t   entirely — min block height is 24px, so every grab meant to move\n\t   started a resize instead. The grip is the visible affordance;\n\t   everything else on the block drags to move. */\n\t.tw-ev-handle.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 44px;\n\t\theight: 8px;\n\t\tz-index: 2;\n\t\tcursor: ns-resize;\n\t\ttouch-action: none;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp { top: 0; }\n\t.tw-ev-handle--end.svelte-j4rvbp { bottom: 0; }\n\t/* Hit-slop: ≥20px effective, extending inward so overflow clipping\n\t   can't cut it off. */\n\t.tw-ev-handle.svelte-j4rvbp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 20px;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp::before { top: 0; }\n\t.tw-ev-handle--end.svelte-j4rvbp::before { bottom: 0; }\n\t/* Short events: shrink the slop so a move-grab area survives */\n\t.tw-ev--short.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::before { height: 12px; }\n\t.tw-ev-handle.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 20px;\n\t\theight: 3px;\n\t\tborder-radius: 2px;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp::after { top: 1px; }\n\t.tw-ev-handle--end.svelte-j4rvbp::after { bottom: 1px; }\n\t.tw-ev.svelte-j4rvbp:hover .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev.svelte-j4rvbp:focus-within .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev.svelte-j4rvbp:focus-visible .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev--resizing.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev--selected.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::after { opacity: 0.55; }\n\t/* Pointer on the grip column itself: brighten so the hit zone reads */\n\t.tw-ev-handle.svelte-j4rvbp:hover::after { opacity: 0.9; }\n\t/* Coarse pointers can't hover — show the grips persistently */\n\t@media (hover: none) {\n\t\t.tw-ev-handle.svelte-j4rvbp::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Move / create ghost ────────────────────────── */\n\t.tw-ghost.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 1px;\n\t\tright: 3px;\n\t\tz-index: 40;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\toutline: 1px solid color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t\tbox-shadow: 0 6px 18px color-mix(in srgb, var(--ev-color) 24%, rgba(0, 0, 0, 0.22));\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\tpadding: 3px 6px;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t\tcursor: grabbing;\n\t\tbox-sizing: border-box;\n\t}\n\t.tw-ghost--create.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, transparent);\n\t\toutline: 1px dashed color-mix(in srgb, var(--ev-color) 60%, transparent);\n\t\tbox-shadow: none;\n\t}\n\t.tw-ghost-time.svelte-j4rvbp {\n\t\tfont: 600 11px/1.1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--ev-color, var(--dt-accent, #2563eb));\n\t\twhite-space: nowrap;\n\t}\n\t.tw-ghost-title.svelte-j4rvbp {\n\t\tfont: 600 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t/* ─── Empty overlay ──────────────────────────────── */\n\t.tw-empty.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpointer-events: none;\n\t\tz-index: 4;\n\t}\n\n\t/* ─── Focus-visible ──────────────────────────────── */\n\t/* box-shadow instead of outline: outlines get clipped by the\n\t   overflow: hidden scroll container. */\n\t.tw-ev.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tz-index: 9;\n\t}\n\n\t/* ─── Reduced motion ─────────────────────────────── */\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.tw-ev.svelte-j4rvbp,\n\t\t.tw-ad.svelte-j4rvbp,\n\t\t.tw-ev-handle.svelte-j4rvbp::after {\n\t\t\ttransition: none;\n\t\t}\n\t\t.tw-ev-live.svelte-j4rvbp { animation: none; }\n\t}\n\n\t/* ═══ Container ═══ */\n\t.ag.svelte-n8lbn1 {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\tbox-sizing: border-box;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\n\t.ag--auto.svelte-n8lbn1 { height: auto; overflow: visible; }\n\n\t/* Button UA reset for interactive cards/rows (real <button>s for a11y).\n\t   Placed first so later component rules override it.\n\t   user-select is scoped here (not on .ag) so event text stays copyable. */\n\t.ag-card.svelte-n8lbn1,\n\t.ag-allday-chip.svelte-n8lbn1,\n\t.ag-compact-row.svelte-n8lbn1,\n\t.ag-q-now.svelte-n8lbn1,\n\t.ag-q-done-item.svelte-n8lbn1,\n\t.ag-log-row.svelte-n8lbn1,\n\t.ag-q-done-toggle.svelte-n8lbn1 {\n\t\tfont: inherit;\n\t\tcolor: inherit;\n\t\ttext-align: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tbox-sizing: border-box;\n\t\tuser-select: none;\n\t}\n\n\t.ag--disabled.svelte-n8lbn1 {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 12px\n\t\t);\n\t}\n\n\t/* ═══ Body ═══ */\n\t.ag-body.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\tpadding-top: 8px;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-border) transparent;\n\t}\n\n\t/* ═══ In-view date header ═══ */\n\t.ag-day-head.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 0 16px 6px;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-day-head-badge.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);\n\t\tpadding: 2px 7px;\n\t\tborder-radius: 3px;\n\t}\n\t.ag-day-head-badge--muted.svelte-n8lbn1 {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tbackground: color-mix(in srgb, var(--dt-text-2, rgba(0, 0, 0, 0.54)) 10%, transparent);\n\t}\n\t.ag-day-head-name.svelte-n8lbn1 {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.2;\n\t}\n\t.ag-day-head-date.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1.2;\n\t}\n\t.ag--auto.svelte-n8lbn1 .ag-body:where(.svelte-n8lbn1) { overflow-y: visible; min-height: auto; }\n\t.ag-body.svelte-n8lbn1::-webkit-scrollbar {\n\t\twidth: 4px;\n\t}\n\t.ag-body.svelte-n8lbn1::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-border);\n\t\tborder-radius: 2px;\n\t}\n\n\t/* ═══ All-day strip ═══ */\n\t.ag-allday.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t\tpadding: 6px 16px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.ag-allday-label.svelte-n8lbn1 {\n\t\tfont: 600 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-items.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 6px;\n\t}\n\t.ag-allday-chip.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tpadding: 3px 10px;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 20%, transparent);\n\t\tcursor: pointer;\n\t\ttransition: background 0.15s, border-color 0.15s;\n\t}\n\t.ag-allday-chip.svelte-n8lbn1:hover,\n\t.ag-allday-chip.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 35%, transparent);\n\t}\n\t.ag-allday-chip.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-allday-chip--selected.svelte-n8lbn1 {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-allday-dot.svelte-n8lbn1 {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-title.svelte-n8lbn1 {\n\t\tfont: 500 0.75rem/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ═══ Shared: event card ═══ */\n\t.ag-card.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\tborder-radius: 10px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 10%, var(--dt-border, rgba(0, 0, 0, 0.08)));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, border-color 150ms;\n\t}\n\t.ag-card.svelte-n8lbn1:hover,\n\t.ag-card.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t}\n\t.ag-card.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-card--selected.svelte-n8lbn1 {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-card--cancelled.svelte-n8lbn1 {\n\t\topacity: 0.5;\n\t}\n\t.ag-card--cancelled.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-card--tentative.svelte-n8lbn1 {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card--full.svelte-n8lbn1 {\n\t\topacity: 0.55;\n\t}\n\t.ag-card--limited.svelte-n8lbn1 {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card-body.svelte-n8lbn1 {\n\t\tpadding: 10px 12px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t\tmin-width: 0;\n\t\tflex: 1;\n\t}\n\t.ag-card-top.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: flex-start;\n\t\tgap: 8px;\n\t\tmin-width: 0;\n\t}\n\t.ag-card-title.svelte-n8lbn1 {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.3;\n\t\tword-break: break-word;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.ag-card-meta.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tline-height: 1;\n\t}\n\t.ag-card-dur.svelte-n8lbn1 {\n\t\tmargin-left: 6px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.ag-card-sub.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tline-height: 1;\n\t}\n\t.ag-card-loc.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1;\n\t}\n\t.ag-card-tags.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tflex-wrap: wrap;\n\t}\n\t.ag-card-tag.svelte-n8lbn1 {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ── Queue card variant ── */\n\t.ag-card--q.svelte-n8lbn1 {\n\t\ttransition: border-color 150ms, transform 100ms;\n\t}\n\t.ag-compact-row--queue.svelte-n8lbn1 {\n\t\tmargin: 0;\n\t}\n\n\t.ag-card--q.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tgap: 3px;\n\t}\n\t.ag-card--q.svelte-n8lbn1 .ag-card-tags:where(.svelte-n8lbn1) {\n\t\tmargin-top: 2px;\n\t}\n\t.ag-card-eta.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.04em;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t}\n\t.ag-card--hero.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 16px;\n\t\tfont-weight: 700;\n\t}\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-eta:where(.svelte-n8lbn1) {\n\t\tfont-size: 11px;\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 18%, transparent);\n\t\tpadding: 2px 7px;\n\t\tborder-radius: 4px;\n\t}\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\n\t/* ── Plan card variant ── */\n\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 12px 14px;\n\t\tgap: 3px;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-top:where(.svelte-n8lbn1) {\n\t\talign-items: baseline;\n\t}\n\t.ag-card-order.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-weight: 700;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tflex-shrink: 0;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 14px;\n\t}\n\t.ag-card--first.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t}\n\t.ag-card--first.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 16px;\n\t\tfont-weight: 700;\n\t}\n\t/* Everything under the title aligns past the order number — the\n\t   subtitle, location, time and tags share one left edge. */\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-sub:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-loc:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-meta:where(.svelte-n8lbn1) {\n\t\tpadding-left: 22px;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-tags:where(.svelte-n8lbn1) {\n\t\tpadding-left: 22px;\n\t\tmargin-top: 2px;\n\t}\n\n\t/* ═══ The Queue: 2-column grid ═══ */\n\t.ag-q.svelte-n8lbn1 {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr 1.8fr;\n\t\tgap: 0;\n\t\tflex: 1;\n\t\tpadding: 8px 0 10px;\n\t\tmin-height: 0;\n\t}\n\t/* Mobile: stack queue columns vertically — \"Up next\" (hero) first,\n\t   Now/Done status column second */\n\t.ag--mobile.svelte-n8lbn1 .ag-q:where(.svelte-n8lbn1) {\n\t\tgrid-template-columns: 1fr;\n\t\tmin-height: auto;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-status:where(.svelte-n8lbn1) {\n\t\torder: 2;\n\t\tborder-right: none;\n\t\tborder-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tpadding-top: 10px;\n\t\tmargin-top: 8px;\n\t\toverflow-y: visible;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-queue:where(.svelte-n8lbn1) {\n\t\torder: 1;\n\t\toverflow-y: visible;\n\t\tpadding-bottom: 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-meta:where(.svelte-n8lbn1) {\n\t\tline-height: 1.3;\n\t\tpadding-bottom: 1px;\n\t}\n\t/* Mobile: larger touch targets */\n\t.ag--mobile.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 15px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--hero:where(.svelte-n8lbn1) .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 18px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--hero:where(.svelte-n8lbn1) .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 16px 18px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-row:where(.svelte-n8lbn1) {\n\t\tpadding: 12px 0;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--plan:where(.svelte-n8lbn1) .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--plan:where(.svelte-n8lbn1) .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 15px;\n\t}\n\t/* Mobile: Now/Done status subtree type scale */\n\t.ag--mobile.svelte-n8lbn1 .ag-q-label:where(.svelte-n8lbn1) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-clock:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-now-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-now-sub:where(.svelte-n8lbn1) {\n\t\tfont-size: 13px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-now-time:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-free-label:where(.svelte-n8lbn1) {\n\t\tfont-size: 13px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-done-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 13px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-done-check:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-eta:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-sub:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-loc:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-tag:where(.svelte-n8lbn1) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-time:where(.svelte-n8lbn1),\n\t.ag--mobile.svelte-n8lbn1 .ag-log-dur:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 15px;\n\t}\n\t.ag-q-label.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.14em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tmargin-bottom: 8px;\n\t\tpadding: 0 12px;\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\t.ag-q-empty.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tflex: 1;\n\t\tfont-size: 13px;\n\t\tfont-weight: 300;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\n\t/* ── NOW column (includes Done above) ── */\n\t.ag-q-status.svelte-n8lbn1 {\n\t\tpadding: 0 10px 0 14px;\n\t\tborder-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-q-status.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1 {\n\t\talign-self: flex-start;\n\t\tmargin-top: 2px;\n\t\tpadding: 3px 8px;\n\t\tborder: 1px solid var(--dt-border);\n\t\tborder-radius: 999px;\n\t\tbackground: none;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-3);\n\t\tcursor: pointer;\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1:hover,\n\t.ag-q-done-toggle.svelte-n8lbn1:active {\n\t\tcolor: var(--dt-text);\n\t\tborder-color: var(--dt-text-3);\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-q-now-sub.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tcolor: var(--dt-text-2);\n\t\tmargin-top: 1px;\n\t}\n\t.ag-q-done-section.svelte-n8lbn1 {\n\t\tmargin-top: 12px;\n\t\tpadding-top: 10px;\n\t\tborder-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.ag-q-clock.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tmargin-left: 4px;\n\t}\n\t.ag-q-now.svelte-n8lbn1 {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 8px 10px;\n\t\tmargin-bottom: 8px;\n\t\tborder-radius: 8px;\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, border-color 150ms;\n\t}\n\t.ag-q-now.svelte-n8lbn1:hover,\n\t.ag-q-now.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 35%, transparent);\n\t}\n\t.ag-q-now.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-q-now--selected.svelte-n8lbn1 {\n\t\tborder-color: var(--ev-color, var(--dt-accent));\n\t}\n\t.ag-q-now-dot.svelte-n8lbn1 {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent, #2563eb));\n\t\tmargin-bottom: 6px;\n\t\tanimation: svelte-n8lbn1-ag-pulse 2.5s ease-in-out infinite;\n\t}\n\t@keyframes svelte-n8lbn1-ag-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-q-now-dot.svelte-n8lbn1 {\n\t\t\tanimation: none;\n\t\t}\n\t\t.ag-q-now-fill.svelte-n8lbn1 {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\t.ag-q-now-title.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.25;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\toverflow: hidden;\n\t\tword-break: break-word;\n\t\tmargin-bottom: 3px;\n\t}\n\t.ag-q-now-time.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tmargin-bottom: 6px;\n\t}\n\t.ag-q-now-track.svelte-n8lbn1 {\n\t\theight: 2px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tborder-radius: 1px;\n\t\toverflow: hidden;\n\t}\n\t.ag-q-now-fill.svelte-n8lbn1 {\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tbackground: var(--ev-color, var(--dt-accent, #2563eb));\n\t\tborder-radius: 1px;\n\t\ttransform-origin: left;\n\t\ttransition: transform 1s linear;\n\t}\n\t.ag-q-free.svelte-n8lbn1 {\n\t\tpadding: 8px 10px;\n\t\tmargin-right: 10px;\n\t}\n\t.ag-q-free-label.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tfont-weight: 300;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tmargin-bottom: 2px;\n\t}\n\n\t/* ── NEXT: hero center column ── */\n\t.ag-q-queue.svelte-n8lbn1 {\n\t\tpadding: 0 16px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 8px;\n\t}\n\t.ag-q-queue.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\n\n\t.ag-q-done-item.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tpadding: 3px 0;\n\t\twidth: 100%;\n\t\tcursor: pointer;\n\t}\n\t.ag-q-done-item.svelte-n8lbn1:hover .ag-q-done-title:where(.svelte-n8lbn1),\n\t.ag-q-done-item.svelte-n8lbn1:active .ag-q-done-title:where(.svelte-n8lbn1),\n\t.ag-q-done-item--selected.svelte-n8lbn1 .ag-q-done-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.ag-q-done-item.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-q-done-check.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-success, rgba(22, 163, 74, 0.7));\n\t\tflex-shrink: 0;\n\t}\n\t.ag-q-done-title.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tline-height: 1.2;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttext-decoration: line-through;\n\t\ttext-decoration-color: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttransition: color 150ms;\n\t}\n\n\t/* ═══ Past Day: \"The Log\" ═══\n\t   Dim comes from text tokens only (single layer) — no subtree opacity. */\n\t.ag-log.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-log.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\t.ag-log-row.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 10px;\n\t\tpadding: 8px 0;\n\t\twidth: 100%;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tcursor: pointer;\n\t}\n\t.ag-log-row.svelte-n8lbn1:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.ag-log-row.svelte-n8lbn1:hover .ag-log-title:where(.svelte-n8lbn1),\n\t.ag-log-row.svelte-n8lbn1:active .ag-log-title:where(.svelte-n8lbn1),\n\t.ag-log-row--selected.svelte-n8lbn1 .ag-log-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.ag-log-row.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 6px;\n\t}\n\t.ag-log-row--selected.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, transparent);\n\t\tborder-radius: 6px;\n\t\tbox-shadow: 0 0 0 8px color-mix(in srgb, var(--ev-color) 6%, transparent);\n\t}\n\t.ag-log-check.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-success, rgba(22, 163, 74, 0.7));\n\t\tflex-shrink: 0;\n\t}\n\t.ag-log-time.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\twidth: 64px;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-log-dot.svelte-n8lbn1 {\n\t\twidth: 5px;\n\t\theight: 5px;\n\t\tborder-radius: 50%;\n\t\tflex-shrink: 0;\n\t\topacity: 0.6;\n\t}\n\t.ag-log-title.svelte-n8lbn1 {\n\t\tfont-size: 13px;\n\t\tfont-weight: 500;\n\t\tline-height: 1.2;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex: 1;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttext-decoration: line-through;\n\t\ttext-decoration-color: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\ttransition: color 150ms;\n\t\ttext-align: left;\n\t}\n\t.ag-log-dur.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 0;\n\t}\n\n\t/* ═══ Compact Day ═══ */\n\t.ag-compact-list.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-compact-list.svelte-n8lbn1::-webkit-scrollbar { display: none; }\n\t.ag-compact-row.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 4px 0;\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\twidth: 100%;\n\t}\n\t.ag-compact-row--selected.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 10%, transparent);\n\t\tborder-radius: 4px;\n\t\t/* The highlight bleeds into the gutter via a spread shadow — zero\n\t\t   layout impact, so nothing shifts or clips even when the host\n\t\t   reduces the gutters below the bleed width. */\n\t\tbox-shadow: 0 0 0 6px color-mix(in srgb, var(--ev-color) 10%, transparent);\n\t}\n\t.ag-compact-row.svelte-n8lbn1:hover .ag-compact-row-title:where(.svelte-n8lbn1),\n\t.ag-compact-row.svelte-n8lbn1:active .ag-compact-row-title:where(.svelte-n8lbn1) { color: var(--dt-text); }\n\t.ag-compact-row.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, transparent);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-compact-row.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t/* The time label doubles as the class-color signal (replaces the old\n\t   dot): the event color mixed toward the text color, so it stays\n\t   legible on any palette and costs zero horizontal space. */\n\t.ag-compact-row-time.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tfont-weight: 500;\n\t\tcolor: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 60%, var(--dt-text, rgba(0, 0, 0, 0.87)));\n\t\tmin-width: 64px;\n\t\tflex-shrink: 0;\n\t\tline-height: 1.4;\n\t}\n\t/* Title + subtitle + tags cluster. One line while it fits; on mobile the\n\t   metadata wraps to a second line under the title instead of crushing it. */\n\t.ag-compact-row-main.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-main:where(.svelte-n8lbn1) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t/* Mobile: size the title by its content when deciding line breaks — a long\n\t   title claims the first line whole (ellipsizing only against the full row)\n\t   and pushes subtitle/tags down instead of truncating at 35%. */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) {\n\t\tflex-basis: auto;\n\t}\n\t/* On its own wrapped line the subtitle gets the full width */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-sub:where(.svelte-n8lbn1) {\n\t\tmax-width: 100%;\n\t}\n\t.ag-compact-row-title.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tfont-weight: 500;\n\t\tcolor: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 82%, transparent);\n\t\tflex: 1;\n\t\t/* The title is the row's identity — never let subtitle/tags/duration\n\t\t   squeeze it out on narrow screens (flex: 1 alone resolves to 0px). */\n\t\tmin-width: 35%;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t\tline-height: 1.4;\n\t\ttext-align: left;\n\t}\n\t.ag-compact-row-dur.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 0;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-row-sub.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\tmax-width: 45%;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-row-tag.svelte-n8lbn1 {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 1;\n\t\tmin-width: 2.5em;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-row--cancelled.svelte-n8lbn1 { opacity: 0.5; }\n\t.ag-compact-row--cancelled.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) { text-decoration: line-through; }\n\t.ag-compact-row--tentative.svelte-n8lbn1 { opacity: 0.65; }\n\t/* Mobile: larger touch targets for compact rows */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row:where(.svelte-n8lbn1) { padding: 8px 0; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) { font-size: 15px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-time:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-dur:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-sub:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-tag:where(.svelte-n8lbn1) { font-size: 11px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head:where(.svelte-n8lbn1) { padding: 0 16px 8px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head-name:where(.svelte-n8lbn1) { font-size: 15px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head-date:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head-badge:where(.svelte-n8lbn1) { font-size: 11px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-allday-title:where(.svelte-n8lbn1) { font-size: 0.85rem; }\n\t.ag--mobile.svelte-n8lbn1 .ag-allday-label:where(.svelte-n8lbn1) { font-size: 11px; }\n\n\t/* ═══ Future Day: \"The Plan\" ═══ */\n\t.ag-plan.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 6px;\n\t}\n\t.ag-plan.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\n\t/* ═══ Container ═══ */\n\t.ag.svelte-uhwfyj {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\tbox-sizing: border-box;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\t.ag--auto.svelte-uhwfyj {\n\t\theight: auto;\n\t\toverflow: visible;\n\t}\n\n\t/* Button UA reset for interactive cards/rows (real <button>s for a11y).\n\t   Placed first so later component rules override it. */\n\t.ag-card.svelte-uhwfyj,\n\t.ag-allday-chip.svelte-uhwfyj,\n\t.ag-compact.svelte-uhwfyj,\n\t.ag-compact-more.svelte-uhwfyj,\n\t.ag-past-toggle.svelte-uhwfyj {\n\t\tfont: inherit;\n\t\tcolor: inherit;\n\t\ttext-align: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tbox-sizing: border-box;\n\t}\n\n\t/* ═══ Body ═══ */\n\t.ag-body.svelte-uhwfyj {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\tbox-sizing: border-box;\n\t\t/* No padding-top here: the sticky day headers pin at the scrollport\n\t\t   edge, and container padding would leave a see-through band above\n\t\t   them where scrolled cards bleed out. */\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-border) transparent;\n\t}\n\t.ag-wday.svelte-uhwfyj:first-child .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding-top: 12px;\n\t}\n\t.ag--auto.svelte-uhwfyj .ag-body:where(.svelte-uhwfyj) {\n\t\toverflow-y: visible;\n\t}\n\t.ag-body.svelte-uhwfyj::-webkit-scrollbar {\n\t\twidth: 4px;\n\t}\n\t.ag-body.svelte-uhwfyj::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-border);\n\t\tborder-radius: 2px;\n\t}\n\n\t/* ═══ All-day chips ═══ */\n\t.ag-allday.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 4px;\n\t\tpadding: 4px 14px 6px;\n\t}\n\t.ag-allday-chip.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 2px 8px;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 18%, transparent);\n\t\tcursor: pointer;\n\t\ttransition: background 0.15s, border-color 0.15s;\n\t}\n\t.ag-allday-chip.svelte-uhwfyj:hover,\n\t.ag-allday-chip.svelte-uhwfyj:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.ag-allday-chip.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-allday-chip--selected.svelte-uhwfyj {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-allday-dot.svelte-uhwfyj {\n\t\twidth: 5px;\n\t\theight: 5px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-title.svelte-uhwfyj {\n\t\tfont: 500 0.7rem/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t}\n\t.ag-allday-span.svelte-uhwfyj {\n\t\tfont: 500 10px/1.2 var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ═══ Shared: event card ═══ */\n\t.ag-card.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 8%, var(--dt-border, rgba(0, 0, 0, 0.08)));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, border-color 150ms;\n\t}\n\t.ag-card.svelte-uhwfyj:hover,\n\t.ag-card.svelte-uhwfyj:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.ag-card.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-card--selected.svelte-uhwfyj {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-card--cancelled.svelte-uhwfyj {\n\t\topacity: 0.5;\n\t}\n\t.ag-card--cancelled.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-card--tentative.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card--full.svelte-uhwfyj {\n\t\topacity: 0.55;\n\t}\n\t.ag-card--limited.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card-body.svelte-uhwfyj {\n\t\tpadding: 7px 10px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tmin-width: 0;\n\t\tflex: 1;\n\t}\n\t.ag-card-title.svelte-uhwfyj {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.3;\n\t\tword-break: break-word;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\toverflow: hidden;\n\t}\n\t.ag-card-meta.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tline-height: 1;\n\t}\n\t.ag-card-dur.svelte-uhwfyj {\n\t\tmargin-left: 6px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.ag-card-eta.svelte-uhwfyj {\n\t\tmargin-left: auto;\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\tcolor: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 60%, var(--ev-color));\n\t\tletter-spacing: 0.02em;\n\t}\n\t.ag-card-sub.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tline-height: 1;\n\t}\n\t.ag-card-loc.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1;\n\t}\n\t.ag-card-tags.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tflex-wrap: wrap;\n\t}\n\t.ag-card-tag.svelte-uhwfyj {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\t.ag-card-progress.svelte-uhwfyj {\n\t\theight: 3px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tborder-radius: 2px;\n\t\toverflow: hidden;\n\t\tmargin-top: 2px;\n\t}\n\t.ag-card-progress-fill.svelte-uhwfyj {\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tborder-radius: 2px;\n\t\ttransform-origin: left;\n\t\ttransition: transform 1s linear;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-card-progress-fill.svelte-uhwfyj {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\n\t/* ═══ Week day groups ═══ */\n\t.ag-wday.svelte-uhwfyj {\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.ag-wday.svelte-uhwfyj:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.ag-wday--today.svelte-uhwfyj {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 2%, transparent);\n\t}\n\t.ag-wday--tomorrow.svelte-uhwfyj .ag-card:where(.svelte-uhwfyj) {\n\t\topacity: 0.82;\n\t}\n\t/* Past days: token-based text dim instead of subtree opacity (readability) */\n\t.ag-wday--past.svelte-uhwfyj .ag-wday-name:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tfont-weight: 500;\n\t}\n\t.ag-wday--past.svelte-uhwfyj .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 8px 20px 2px;\n\t}\n\t.ag-wday--disabled.svelte-uhwfyj {\n\t\tposition: relative;\n\t}\n\t.ag-wday--disabled.svelte-uhwfyj::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 4px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent) 4px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent) 8px\n\t\t);\n\t\tpointer-events: none;\n\t}\n\t.ag-wday-custom-header.svelte-uhwfyj {\n\t\tpadding: 2px 0 4px;\n\t}\n\n\t.ag-wday-head--click.svelte-uhwfyj,\n\t.ag-wday-empty--click.svelte-uhwfyj {\n\t\tcursor: pointer;\n\t}\n\t.ag-wday-head.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tpadding: 8px 20px;\n\t\tposition: sticky;\n\t\ttop: 0;\n\t\tbackground: var(--dt-bg, #fff);\n\t\tz-index: 1;\n\t\t/* Own compositor layer: without it, fast (async) scrolling repaints\n\t\t   the pinned header a frame late and a gap flashes above it. */\n\t\ttransform: translateZ(0);\n\t\twill-change: transform;\n\t}\n\t.ag-wday-head-left.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t}\n\t.ag-wday-badge.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);\n\t\tpadding: 2px 7px;\n\t\tborder-radius: 3px;\n\t}\n\t.ag-wday-badge--muted.svelte-uhwfyj {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tbackground: color-mix(\n\t\t\tin srgb,\n\t\t\tvar(--dt-text-2, rgba(0, 0, 0, 0.54)) 10%,\n\t\t\ttransparent\n\t\t);\n\t}\n\t.ag-wday-name.svelte-uhwfyj {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.2;\n\t}\n\t.ag-wday-date.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1.2;\n\t}\n\n\t.ag-wday-empty.svelte-uhwfyj {\n\t\tpadding: 2px 20px 6px;\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tfont-style: italic;\n\t}\n\n\t/* Expanded day */\n\t.ag-wday-expanded.svelte-uhwfyj {\n\t\tpadding: 0 20px 10px;\n\t}\n\t.ag-wslot.svelte-uhwfyj {\n\t\tmargin-bottom: 4px;\n\t}\n\t.ag-wslot-header.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 2px 0;\n\t}\n\t.ag-wslot-now.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tfont-weight: 700;\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t}\n\t.ag-wslot-cards.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t}\n\t.ag-wslot-cards--multi.svelte-uhwfyj {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n\t\tgap: 4px;\n\t}\n\t.ag-wday-past-line.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tpadding: 6px 0 0;\n\t}\n\t.ag-wday-past-line--summary.svelte-uhwfyj {\n\t\tpadding: 0 20px 8px;\n\t}\n\t/* \"✓ N completed\" is a disclosure — tap to reveal the finished events */\n\t.ag-past-toggle.svelte-uhwfyj {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tcursor: pointer;\n\t\tmin-height: 32px;\n\t\ttransition: color 150ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.ag-past-toggle.svelte-uhwfyj:hover,\n\t.ag-past-toggle.svelte-uhwfyj:active {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.ag-past-toggle.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-past-chevron.svelte-uhwfyj {\n\t\ttransition: transform 120ms;\n\t}\n\t.ag-past-chevron--open.svelte-uhwfyj {\n\t\ttransform: rotate(180deg);\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-past-chevron.svelte-uhwfyj { transition: none; }\n\t}\n\t/* Revealed completed events: dim + strike, single token layer */\n\t.ag-compact--done.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t\ttext-decoration-color: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.ag-compact--done.svelte-uhwfyj .ag-compact-time:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tfont-weight: 400;\n\t}\n\n\t/* Compact day events */\n\t.ag-wday-compact.svelte-uhwfyj {\n\t\tpadding: 0 20px 8px;\n\t}\n\t.ag-compact.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t\tpadding: 3px 0;\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\twidth: 100%;\n\t}\n\t.ag-compact--selected.svelte-uhwfyj {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 10%, transparent);\n\t\tborder-radius: 4px;\n\t\t/* The highlight bleeds into the gutter via a spread shadow — zero\n\t\t   layout impact, so nothing shifts or clips even when the host\n\t\t   reduces the gutters below the bleed width. */\n\t\tbox-shadow: 0 0 0 6px color-mix(in srgb, var(--ev-color) 10%, transparent);\n\t}\n\t.ag-compact.svelte-uhwfyj:hover .ag-compact-title:where(.svelte-uhwfyj),\n\t.ag-compact.svelte-uhwfyj:active .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text);\n\t}\n\t.ag-compact.svelte-uhwfyj:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, transparent);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-compact.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t/* The time label doubles as the class-color signal (replaces the old\n\t   dot): the event color mixed toward the text color, so it stays\n\t   legible on any palette and costs zero horizontal space. */\n\t.ag-compact-time.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tfont-weight: 500;\n\t\tcolor: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 60%, var(--dt-text, rgba(0, 0, 0, 0.87)));\n\t\tmin-width: 40px;\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t\tline-height: 1.4;\n\t}\n\t/* Title + location + subtitle + tags cluster. One line while it fits; on\n\t   mobile the metadata wraps to a second line instead of crushing the title. */\n\t.ag-compact-main.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-main:where(.svelte-uhwfyj) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t/* Mobile: size the title by its content when deciding line breaks — a long\n\t   title claims the first line whole (ellipsizing only against the full row)\n\t   and pushes location/subtitle/tags down instead of truncating at 35%. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tflex-basis: auto;\n\t}\n\t/* On their own wrapped line the metadata gets the full width — the tight\n\t   desktop caps would truncate it beside empty space. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-loc:where(.svelte-uhwfyj),\n\t.ag--mobile.svelte-uhwfyj .ag-compact-sub:where(.svelte-uhwfyj) {\n\t\tmax-width: 100%;\n\t}\n\t.ag-compact-title.svelte-uhwfyj {\n\t\tfont-size: 12px;\n\t\tfont-weight: 500;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex: 1;\n\t\t/* The title is the row's identity — never let subtitle/tags/duration\n\t\t   squeeze it out on narrow screens (min-width: 0 resolves to 0px). */\n\t\tmin-width: 35%;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-dur.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-sub.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-width: 120px;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-loc.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-width: 100px;\n\t}\n\t.ag-compact--cancelled.svelte-uhwfyj {\n\t\topacity: 0.5;\n\t}\n\t.ag-compact--cancelled.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-compact--tentative.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t}\n\t.ag-compact--full.svelte-uhwfyj {\n\t\topacity: 0.55;\n\t}\n\t.ag-compact--limited.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t}\n\t.ag-compact-tag.svelte-uhwfyj {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 1;\n\t\tmin-width: 2.5em;\n\t\tmax-width: 80px;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-more.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tcolor: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 72%, transparent);\n\t\tpadding: 2px 0 0 13px;\n\t\tcursor: pointer;\n\t\tdisplay: block;\n\t}\n\t.ag-compact-more.svelte-uhwfyj:hover,\n\t.ag-compact-more.svelte-uhwfyj:active {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.ag-compact-more.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\n\t/* ═══ Day-drop drag ═══ */\n\t.ag-card--drag.svelte-uhwfyj {\n\t\topacity: 0.4;\n\t}\n\t.ag-wday--drop.svelte-uhwfyj {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 6%, transparent);\n\t\tbox-shadow: inset 0 0 0 1px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ═══ Timetable columns (desktop) ═══ */\n\t.ag--cols.svelte-uhwfyj .ag-body:where(.svelte-uhwfyj) {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(var(--ag-cols, 7), minmax(0, 1fr));\n\t}\n\t/* Columns stretch to the tallest day, so the separator runs full height */\n\t.ag--cols.svelte-uhwfyj .ag-wday:where(.svelte-uhwfyj) {\n\t\tborder-bottom: none;\n\t\tborder-inline-start: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tmin-width: 0;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-wday:where(.svelte-uhwfyj):first-child {\n\t\tborder-inline-start: none;\n\t}\n\t/* Uniform head padding — the :first-child top bump would misalign columns.\n\t   Also overrides the past-day head variant (extra class = higher specificity). */\n\t.ag--cols.svelte-uhwfyj .ag-wday:where(.svelte-uhwfyj) .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 10px 8px;\n\t}\n\t/* Badge + name + date won't fit one line in a ~160px column */\n\t.ag--cols.svelte-uhwfyj .ag-wday-head-left:where(.svelte-uhwfyj) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-wday-expanded:where(.svelte-uhwfyj),\n\t.ag--cols.svelte-uhwfyj .ag-wday-compact:where(.svelte-uhwfyj),\n\t.ag--cols.svelte-uhwfyj .ag-wday-empty:where(.svelte-uhwfyj),\n\t.ag--cols.svelte-uhwfyj .ag-wday-past-line--summary:where(.svelte-uhwfyj) {\n\t\tpadding-left: 10px;\n\t\tpadding-right: 10px;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-allday:where(.svelte-uhwfyj) {\n\t\tpadding-left: 10px;\n\t\tpadding-right: 10px;\n\t}\n\t/* Narrow cards: long titles get a third line, meta wraps instead of clipping */\n\t.ag--cols.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\t-webkit-line-clamp: 3;\n\t\tline-clamp: 3;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-card-meta:where(.svelte-uhwfyj) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 3px;\n\t}\n\n\t/* ═══ Mobile adaptations ═══ */\n\t.ag--mobile.svelte-uhwfyj .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 16px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-expanded:where(.svelte-uhwfyj) {\n\t\tpadding: 0 16px 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-compact:where(.svelte-uhwfyj) {\n\t\tpadding: 0 16px 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-body:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 14px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\tfont-size: 15px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-meta:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-sub:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-loc:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-eta:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-tag:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact:where(.svelte-uhwfyj) {\n\t\tpadding: 8px 0;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tfont-size: 15px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-time:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-dur:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-sub:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-loc:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-tag:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-more:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t\tpadding-top: 6px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-allday-span:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-badge:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wslot-now:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-empty:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-past-line:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wslot-cards--multi:where(.svelte-uhwfyj) {\n\t\tgrid-template-columns: 1fr;\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.mb.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\toverflow: hidden;\n\t\tbackground: var(--dt-bg, #fff);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\ttouch-action: pan-y;\n\t}\n\t.mb--auto.svelte-zbkzcp { overflow: visible; }\n\n\t/* ─── Swipe wrapper (follows the finger) ─────────── */\n\t.mb-swipe.svelte-zbkzcp {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tposition: relative;\n\t}\n\t.mb-swipe--animate.svelte-zbkzcp {\n\t\ttransition: transform 180ms ease;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mb-swipe--animate.svelte-zbkzcp { transition: none; }\n\t}\n\n\t/* ─── All-day bar ────────────────────────────────── */\n\t.mb-allday.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tpadding: 4px 8px;\n\t\toverflow-x: auto;\n\t\tscrollbar-width: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t\talign-items: center;\n\t}\n\t.mb-allday.svelte-zbkzcp::-webkit-scrollbar { display: none; }\n\t.mb-allday--expanded.svelte-zbkzcp {\n\t\tflex-wrap: wrap;\n\t\toverflow-x: visible;\n\t}\n\n\t.mb-allday-chip.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 4px 8px;\n\t\tmin-height: 32px;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));\n\t\tborder: none;\n\t\tcursor: pointer;\n\t\tflex-shrink: 0;\n\t\ttransition: background 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tmax-width: 160px;\n\t\tposition: relative;\n\t}\n\t/* Hit-slop: 44px effective touch target */\n\t.mb-allday-chip.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-allday-chip.svelte-zbkzcp:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, #f9fafb));\n\t}\n\t.mb-allday-chip--selected.svelte-zbkzcp {\n\t\tbox-shadow: 0 0 0 1.5px var(--ev-color);\n\t}\n\t.mb-allday-chip.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.mb-allday-dot.svelte-zbkzcp {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\n\t.mb-allday-title.svelte-zbkzcp {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\tmax-width: 100px;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-allday-span.svelte-zbkzcp {\n\t\tfont: 400 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t.mb-allday-more.svelte-zbkzcp {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t\tpadding: 0 6px;\n\t\tmin-height: 32px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\tposition: relative;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.mb-allday-more.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-allday-more.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Grid ───────────────────────────────────────── */\n\t.mb-grid.svelte-zbkzcp {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\t-webkit-overflow-scrolling: touch;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t\tposition: relative;\n\t\tpadding-top: 8px;\n\t}\n\t.mb--auto.svelte-zbkzcp .mb-grid:where(.svelte-zbkzcp) { overflow-y: visible; }\n\t.mb-grid.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.mb-grid-inner.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tmin-width: 100%;\n\t}\n\n\t/* ─── Empty state ────────────────────────────────── */\n\t.mb-empty.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpointer-events: none;\n\t\tz-index: 4;\n\t}\n\t.mb-empty-text.svelte-zbkzcp {\n\t\tfont: 500 13px/1.4 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t/* ─── Hour row ───────────────────────────────────── */\n\t.mb-hour.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t}\n\n\t.mb-hour-label.svelte-zbkzcp {\n\t\twidth: 40px;\n\t\t/* border-box keeps the label inside the 40px gutter that events\n\t\t   start at — content-box pushed digits flush under the event edge */\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\tfont: 500 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-align: right;\n\t\tpadding-right: 8px;\n\t\tpadding-top: 0;\n\t\tposition: relative;\n\t\ttop: -6px;\n\t}\n\n\t.mb-hour-line.svelte-zbkzcp {\n\t\tflex: 1;\n\t\theight: 1px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.mb-hour--blocked.svelte-zbkzcp {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t}\n\n\t.mb-blocked-label.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 44px;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t}\n\n\t/* ─── Now line ───────────────────────────────────── */\n\t.mb-now.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 10;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tpointer-events: none;\n\t}\n\n\t.mb-now-label.svelte-zbkzcp {\n\t\twidth: 40px;\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\ttext-align: right;\n\t\tpadding-right: 6px;\n\t\tfont: 700 10px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t}\n\n\t.mb-now-line.svelte-zbkzcp {\n\t\tflex: 1;\n\t\theight: 2px;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tbox-shadow: 0 0 6px var(--dt-glow, rgba(37, 99, 235, 0.25));\n\t\tposition: relative;\n\t}\n\n\t.mb-now-line.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: -4px;\n\t\ttop: -4px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.mb-event.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tz-index: 5;\n\t\tborder-radius: 8px;\n\t\tcursor: pointer;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));\n\t\tborder: none;\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\toverflow: hidden;\n\t\ttransition: box-shadow 120ms, background 120ms;\n\t\ttext-align: left;\n\t\tpadding: 0;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tmin-height: 24px;\n\t}\n\t.mb-event.svelte-zbkzcp:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, #f9fafb));\n\t}\n\t/* Short blocks keep their duration-proportional height, but get a 44px\n\t   transparent hit-slop so taps still land. */\n\t.mb-event--short.svelte-zbkzcp {\n\t\toverflow: visible;\n\t}\n\t.mb-event--short.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-event--short.svelte-zbkzcp .mb-ev-body:where(.svelte-zbkzcp) {\n\t\tpadding-top: 2px;\n\t\tpadding-bottom: 2px;\n\t}\n\t.mb-event--selected.svelte-zbkzcp {\n\t\tbox-shadow: 0 0 0 2px var(--ev-color),\n\t\t\t0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t}\n\t.mb-event--current.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, #f9fafb));\n\t}\n\t.mb-event--next.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 35%, transparent);\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — never a bare opacity on the block. */\n\t.mb-event--cancelled.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #f9fafb));\n\t}\n\t.mb-event--cancelled.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mb-event--cancelled.svelte-zbkzcp .mb-ev-stripe:where(.svelte-zbkzcp) {\n\t\topacity: 0.45; /* decorative bar only */\n\t}\n\t.mb-event--tentative.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.mb-event--full.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.mb-event--full.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mb-event--limited.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.mb-event--resizing.svelte-zbkzcp {\n\t\tz-index: 50;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n\t\tcursor: ns-resize;\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t/* Resizing lives only on the centered grip column. The old full-width\n\t   edge bands (24px of inward slop each) covered short events entirely —\n\t   min block height is 24px, so any tap near an edge risked starting a\n\t   resize. The grip is persistently visible on touch (hover:none below),\n\t   so the smaller target stays discoverable; taps elsewhere open. */\n\t.mb-ev-handle.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 56px;\n\t\theight: 10px;\n\t\tz-index: 2;\n\t\tcursor: ns-resize;\n\t\ttouch-action: none;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp { top: 0; }\n\t.mb-ev-handle--end.svelte-zbkzcp { bottom: 0; }\n\t/* Hit-slop: ≥24px effective, extending inward so the block's\n\t   overflow clipping can't cut it off. */\n\t.mb-ev-handle.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 24px;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp::before { top: 0; }\n\t.mb-ev-handle--end.svelte-zbkzcp::before { bottom: 0; }\n\t.mb-ev-handle.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 24px;\n\t\theight: 3px;\n\t\tborder-radius: 2px;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp::after { top: 2px; }\n\t.mb-ev-handle--end.svelte-zbkzcp::after { bottom: 2px; }\n\t.mb-event.svelte-zbkzcp:hover .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event.svelte-zbkzcp:focus-within .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event--resizing.svelte-zbkzcp .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event--selected.svelte-zbkzcp .mb-ev-handle:where(.svelte-zbkzcp)::after { opacity: 0.55; }\n\t/* Finger on the grip column itself: brighten so the hit zone reads */\n\t.mb-ev-handle.svelte-zbkzcp:hover::after { opacity: 0.9; }\n\t/* Touch devices have no hover — show the handles persistently. */\n\t@media (hover: none) {\n\t\t.mb-ev-handle.svelte-zbkzcp::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Drag-to-create ghost ───────────────────────── */\n\t.mb-create-ghost.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 40px;\n\t\tright: 4px;\n\t\tz-index: 40;\n\t\tborder-radius: 8px;\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);\n\t\tborder: 1px dashed color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t}\n\t.mb-create-ghost-time.svelte-zbkzcp {\n\t\tfont: 600 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tpadding: 4px 8px;\n\t\twhite-space: nowrap;\n\t}\n\n\t.mb-ev-stripe.svelte-zbkzcp {\n\t\twidth: 4px;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tborder-radius: 8px 0 0 8px;\n\t}\n\n\t.mb-ev-body.svelte-zbkzcp {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 4px 8px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\tjustify-content: center;\n\t}\n\n\t.mb-ev-title.svelte-zbkzcp {\n\t\tfont: 600 15px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-time.svelte-zbkzcp {\n\t\tfont: 400 12px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t.mb-ev-sub.svelte-zbkzcp {\n\t\tfont: 400 12px/1.1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-loc.svelte-zbkzcp {\n\t\tfont: 400 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-tags.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tmargin-top: 2px;\n\t}\n\n\t.mb-ev-tag.svelte-zbkzcp {\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t.mb-ev-live.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\ttop: 6px;\n\t\tright: 6px;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tanimation: svelte-zbkzcp-mb-pulse 2s ease-in-out infinite;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mb-ev-live.svelte-zbkzcp { animation: none; }\n\t}\n\t.mb-ev-next-badge.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\ttop: 4px;\n\t\tright: 4px;\n\t\tfont: 600 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t@keyframes svelte-zbkzcp-mb-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\n\t/* ─── Focus ──────────────────────────────────────── */\n\t.mb-event.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.mw.svelte-1d18hkf {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\toverflow: hidden;\n\t\tbackground: var(--dt-bg, #fff);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\ttouch-action: pan-y;\n\t}\n\t.mw--auto.svelte-1d18hkf { overflow: visible; }\n\n\t/* ─── Scrollable day list ────────────────────────── */\n\t.mw-list.svelte-1d18hkf {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\t-webkit-overflow-scrolling: touch;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t}\n\t.mw--auto.svelte-1d18hkf .mw-list:where(.svelte-1d18hkf) { overflow-y: visible; }\n\t.mw-list--animate.svelte-1d18hkf {\n\t\ttransition: transform 180ms ease;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mw-list--animate.svelte-1d18hkf { transition: none; }\n\t}\n\n\t/* ─── Day row ────────────────────────────────────── */\n\t.mw-row.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 12px;\n\t\tposition: relative;\n\t\t/* border-box: width 100% + padding otherwise overflows the list by\n\t\t   24px, which iOS turns into a horizontal pan that clips the date\n\t\t   column off the left edge */\n\t\tbox-sizing: border-box;\n\t\tpadding: 10px 12px;\n\t\tbackground: transparent;\n\t\ttransition: background 120ms;\n\t\ttext-align: left;\n\t\twidth: 100%;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tmin-height: 56px;\n\t}\n\t.mw-row.svelte-1d18hkf:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.mw-row.svelte-1d18hkf:has(.mw-row-target:where(.svelte-1d18hkf):active) {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 6%, transparent);\n\t}\n\t.mw-row--today.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 4%, transparent);\n\t}\n\t/* Token-based dim (not subtree opacity) so past rows stay legible/tappable */\n\t.mw-row--past.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent);\n\t}\n\t.mw-row--past.svelte-1d18hkf .mw-ev-title,\n\t.mw-row--past.svelte-1d18hkf .mw-day-num:where(.svelte-1d18hkf) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-row--disabled.svelte-1d18hkf {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 12px\n\t\t);\n\t}\n\t.mw-row-target.svelte-1d18hkf {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tz-index: 0;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\tpadding: 0;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.mw-row-target.svelte-1d18hkf:disabled {\n\t\tcursor: default;\n\t}\n\t.mw-row-target.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Date column ────────────────────────────────── */\n\t.mw-date.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\twidth: 40px;\n\t\tflex-shrink: 0;\n\t\tgap: 2px;\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tpointer-events: none;\n\t}\n\n\t.mw-day-name.svelte-1d18hkf {\n\t\tfont: 600 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.06em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-day-name--today.svelte-1d18hkf {\n\t\tcolor: var(--dt-accent, #2563eb);\n\t}\n\n\t.mw-day-num.svelte-1d18hkf {\n\t\tfont: 700 18px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.mw-day-num--today.svelte-1d18hkf {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tborder-radius: 50%;\n\t\tfont-size: 15px;\n\t}\n\n\t/* ─── Events column ──────────────────────────────── */\n\t/* pointer-events pass through to the full-row target underneath;\n\t   only the chips (and \"+N more\") re-capture them. */\n\t.mw-events.svelte-1d18hkf {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t\tposition: relative;\n\t\tz-index: 2;\n\t\tpointer-events: none;\n\t}\n\n\t.mw-empty.svelte-1d18hkf {\n\t\tfont: 400 13px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t/* ─── Event chip ─────────────────────────────────── */\n\t.mw-ev.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0;\n\t\tmin-height: 44px;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 10%, var(--dt-surface, #f9fafb));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tborder: none;\n\t\ttext-align: left;\n\t\tpadding: 0;\n\t\tpointer-events: auto;\n\t}\n\t.mw-ev.svelte-1d18hkf:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, #f9fafb));\n\t}\n\t.mw-ev--selected.svelte-1d18hkf {\n\t\tbox-shadow: 0 0 0 1.5px var(--ev-color);\n\t}\n\t.mw-ev--current.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 16%, var(--dt-surface, #f9fafb));\n\t}\n\t.mw-ev--allday.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 14%, var(--dt-surface, #f9fafb));\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — never a bare opacity on the chip. */\n\t.mw-ev--cancelled.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #f9fafb));\n\t}\n\t.mw-ev--cancelled.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-ev--cancelled.svelte-1d18hkf .mw-ev-stripe:where(.svelte-1d18hkf) {\n\t\topacity: 0.45; /* decorative bar only */\n\t}\n\t.mw-ev--tentative.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.mw-ev--full.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.mw-ev--full.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-ev--limited.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\n\t.mw-ev-stripe.svelte-1d18hkf {\n\t\twidth: 3px;\n\t\talign-self: stretch;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tflex-shrink: 0;\n\t\tborder-radius: 6px 0 0 6px;\n\t}\n\n\t.mw-ev-body.svelte-1d18hkf {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 5px 8px;\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t}\n\n\t.mw-ev-title.svelte-1d18hkf {\n\t\tfont: 500 15px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\n\t.mw-ev-time.svelte-1d18hkf {\n\t\tfont: 400 12px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\n\t.mw-ev-more.svelte-1d18hkf {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tpadding: 2px 4px;\n\t\tmin-height: 32px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tposition: relative;\n\t\tpointer-events: auto;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t/* Hit-slop: 44px effective touch target */\n\t.mw-ev-more.svelte-1d18hkf::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mw-ev-more.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Chevron ────────────────────────────────────── */\n\t.mw-chevron.svelte-1d18hkf {\n\t\tflex-shrink: 0;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tpointer-events: none;\n\t}\n\n\t/* ─── Focus ──────────────────────────────────────── */\n\t.mw-ev.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.mg.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tbackground: var(--dt-bg);\n\t\tcolor: var(--dt-text);\n\t\tfont-family: var(--dt-sans);\n\t\toverflow: hidden;\n\t\tcontainer-type: inline-size;\n\t}\n\t.mg--auto.svelte-pvjuld {\n\t\theight: auto;\n\t}\n\n\t.mg-head.svelte-pvjuld {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(7, 1fr);\n\t\tborder-bottom: 1px solid var(--dt-border);\n\t\tflex: none;\n\t}\n\t.mg-head-cell.svelte-pvjuld {\n\t\tpadding: 6px 8px;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--dt-text-3);\n\t}\n\n\t.mg-body.svelte-pvjuld {\n\t\tflex: 1;\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(7, 1fr);\n\t\t/* 56px floor + scroll backstop: a 6-row month compresses instead of clipping its last week */\n\t\tgrid-template-rows: repeat(var(--mg-rows, 5), minmax(56px, 1fr));\n\t\tmin-height: 0;\n\t\toverflow-y: auto;\n\t}\n\t.mg--auto.svelte-pvjuld .mg-body:where(.svelte-pvjuld) {\n\t\tgrid-template-rows: repeat(var(--mg-rows, 5), minmax(88px, auto));\n\t}\n\t.mg-row.svelte-pvjuld {\n\t\tdisplay: contents;\n\t}\n\n\t.mg-cell.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 3px;\n\t\tpadding: 6px;\n\t\tborder-right: 1px solid var(--dt-border-day);\n\t\tborder-bottom: 1px solid var(--dt-border-day);\n\t\tmin-width: 0;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t}\n\t.mg-cell.svelte-pvjuld:nth-child(7n) {\n\t\tborder-right: none;\n\t}\n\t.mg-cell--weekend.svelte-pvjuld {\n\t\tbackground: var(--dt-weekend-bg, rgba(0, 0, 0, 0.02));\n\t}\n\t/* Dim only the day number for adjacent-month cells — their events stay legible */\n\t.mg-cell--out.svelte-pvjuld {\n\t\tbackground: var(--dt-surface, transparent);\n\t}\n\t.mg-cell--out.svelte-pvjuld .mg-daynum:where(.svelte-pvjuld) {\n\t\tcolor: var(--dt-text-3);\n\t}\n\t.mg-cell--today.svelte-pvjuld {\n\t\tbackground: var(--dt-today-bg);\n\t}\n\t.mg-cell--expanded.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\toverflow-y: auto;\n\t}\n\t.mg-cell--disabled.svelte-pvjuld {\n\t\topacity: 0.35;\n\t\tpointer-events: none;\n\t}\n\t.mg-cell--clickable.svelte-pvjuld {\n\t\tcursor: pointer;\n\t}\n\t.mg-cell--clickable.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(0, 0, 0, 0.04));\n\t}\n\t.mg-cell.svelte-pvjuld:focus-visible {\n\t\toutline: 2px solid var(--dt-accent, #2563eb);\n\t\toutline-offset: -2px;\n\t}\n\n\t.mg-daynum.svelte-pvjuld {\n\t\tflex: none;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 12px;\n\t\tfont-weight: 600;\n\t\tcolor: var(--dt-text-2);\n\t\twidth: 22px;\n\t\theight: 22px;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tborder-radius: 999px;\n\t}\n\t.mg-daynum--today.svelte-pvjuld {\n\t\tbackground: var(--dt-accent);\n\t\tcolor: var(--dt-btn-text);\n\t}\n\n\t.mg-chips.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tmin-height: 0;\n\t\toverflow: hidden;\n\t}\n\t.mg-chip.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tborder: none;\n\t\tbackground: none;\n\t\tpadding: 2px 4px;\n\t\tborder-radius: 5px;\n\t\tfont-family: var(--dt-sans);\n\t\tfont-size: 12px;\n\t\tline-height: 1.3;\n\t\tcolor: var(--dt-text);\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\ttext-align: left;\n\t}\n\t.mg-chip.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(0, 0, 0, 0.04));\n\t}\n\t.mg-chip.svelte-pvjuld:focus-visible {\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\toutline: none;\n\t}\n\t.mg-chip--selected.svelte-pvjuld {\n\t\tbackground: var(--dt-accent-dim);\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld {\n\t\ttext-decoration: line-through;\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld .mg-chip-title:where(.svelte-pvjuld) {\n\t\tcolor: var(--dt-text-2);\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld .mg-chip-dot:where(.svelte-pvjuld) {\n\t\topacity: 0.5;\n\t}\n\t.mg-chip-dot.svelte-pvjuld {\n\t\tflex: none;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 999px;\n\t\tbackground: var(--mg-chip-color);\n\t}\n\t.mg-chip-time.svelte-pvjuld {\n\t\tflex: none;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2);\n\t}\n\t.mg-chip-title.svelte-pvjuld {\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\twhite-space: nowrap;\n\t}\n\t.mg-more.svelte-pvjuld {\n\t\talign-self: flex-start;\n\t\tborder: none;\n\t\tbackground: none;\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 5px;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2);\n\t\tcursor: pointer;\n\t}\n\t.mg-more.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(0, 0, 0, 0.04));\n\t\tcolor: var(--dt-text);\n\t}\n\t.mg-more.svelte-pvjuld:focus-visible {\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\toutline: none;\n\t}\n\n\t/* Container-based (the calendar adapts to its box, not the viewport) */\n\t@container (max-width: 640px) {\n\t\t.mg-chip-time.svelte-pvjuld {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t@media (hover: none) {\n\t\t.mg-chip.svelte-pvjuld,\n\t\t.mg-more.svelte-pvjuld {\n\t\t\tmin-height: 30px;\n\t\t}\n\t}\n\n\t/* ── Dots mode (mobile) ─────────────────────────────\n\t   Cells are too narrow for text chips, so events render as colored\n\t   dots in a wrapping row. The cell itself stays the tap target\n\t   (day drill-down); dots keep their title/aria-label for a11y. */\n\t.mg--dots.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip:where(.svelte-pvjuld) {\n\t\tpadding: 3px;\n\t\tmin-height: 0;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip-title:where(.svelte-pvjuld),\n\t.mg--dots.svelte-pvjuld .mg-chip-time:where(.svelte-pvjuld) {\n\t\tdisplay: none;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip-dot:where(.svelte-pvjuld) {\n\t\twidth: 8px;\n\t\theight: 8px;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-more:where(.svelte-pvjuld) {\n\t\tpadding: 0 3px;\n\t\tmin-height: 0;\n\t\talign-self: center;\n\t\tfont-size: 10px;\n\t}\n\n\t.cal.svelte-1b53e7w {\n\t\tposition: relative;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\theight: var(--cal-h, 600px);\n\t\tbackground: var(--dt-bg, inherit);\n\t\tborder-radius: var(--cal-r, 12px);\n\t\toverflow: clip;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tbox-sizing: border-box;\n\t}\n\t.cal--auto.svelte-1b53e7w {\n\t\theight: auto;\n\t\toverflow: visible;\n\t}\n\n\n\t/* ── Desktop header ── */\n\t.cal-hd.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t\tpadding: 8px 12px;\n\t\tmin-height: 48px;\n\t\tbox-sizing: border-box;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\n\t.cal-hd-side.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\n\t.cal-hd-side--end.svelte-1b53e7w {\n\t\tjustify-content: flex-end;\n\t}\n\n\t.cal-hd-title.svelte-1b53e7w {\n\t\tfont: 600 14px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.cal-hd-btn.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 28px;\n\t\theight: 28px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tborder-radius: 6px;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms, color 120ms;\n\t}\n\n\t.cal-hd-btn.svelte-1b53e7w:hover {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent);\n\t}\n\n\t.cal-hd-btn.svelte-1b53e7w:focus-visible,\n\t.cal-hd-today.svelte-1b53e7w:focus-visible,\n\t.cal-pill.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\toutline-offset: 2px;\n\t}\n\n\t.cal-hd-today.svelte-1b53e7w {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tbackground: transparent;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tpadding: 6px 10px;\n\t\tborder-radius: 6px;\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\t\tmargin-right: 2px;\n\t\ttransition: background 120ms, color 120ms, border-color 120ms;\n\t}\n\n\t.cal-hd-today.svelte-1b53e7w:hover:not(:disabled) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tborder-color: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.cal-hd-today.svelte-1b53e7w:disabled {\n\t\topacity: 0.45;\n\t\tcursor: default;\n\t}\n\n\t.cal-pills.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tgap: 2px;\n\t\tbackground: color-mix(in srgb, var(--dt-surface, var(--dt-bg, #ffffff)) 85%, transparent);\n\t\tborder-radius: 8px;\n\t\tpadding: 2px;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\n\t.cal-pill.svelte-1b53e7w {\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tcursor: pointer;\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tpadding: 5px 12px;\n\t\tborder-radius: 6px;\n\t\ttransition: background 100ms, color 100ms;\n\t}\n\n\t/* :not(--active) — the hover rule otherwise outranks the active color,\n\t   and iOS keeps :hover stuck after a tap (dark text on the accent). */\n\t.cal-pill.svelte-1b53e7w:hover:not(.cal-pill--active) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\n\t.cal-pill--active.svelte-1b53e7w {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t}\n\n\t.cal-body.svelte-1b53e7w {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t}\n\t.cal--auto.svelte-1b53e7w .cal-body:where(.svelte-1b53e7w) {\n\t\toverflow: visible;\n\t}\n\n\t.cal-empty.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 100%;\n\t\tfont: 400 13px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\n\t.cal-loading.svelte-1b53e7w {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 2px;\n\t\tbackground: linear-gradient(\n\t\t\t90deg,\n\t\t\ttransparent 0%,\n\t\t\tvar(--dt-accent, #2563eb) 50%,\n\t\t\ttransparent 100%\n\t\t);\n\t\tanimation: svelte-1b53e7w-cal-slide 1.2s ease-in-out infinite;\n\t}\n\n\t@keyframes svelte-1b53e7w-cal-slide {\n\t\t0% { transform: translateX(-100%); }\n\t\t100% { transform: translateX(100%); }\n\t}\n\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.cal-loading.svelte-1b53e7w {\n\t\t\tanimation: none;\n\t\t\tbackground: var(--dt-accent-dim, rgba(37, 99, 235, 0.12));\n\t\t}\n\t}\n\n\t/* ── Mobile header (flow layout) ── */\n\t.cal-m-hd.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 8px 8px 6px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t\tmin-height: 44px;\n\t}\n\n\t/* Narrow containers: the date label moves to its own row (.cal-m-titlebar),\n\t   so the controls row spreads pills and nav to the edges. */\n\t.cal-m-hd--stack.svelte-1b53e7w {\n\t\tjustify-content: space-between;\n\t}\n\t.cal-m-hd--titled.svelte-1b53e7w {\n\t\tborder-bottom: none;\n\t\tpadding-bottom: 2px;\n\t}\n\t.cal-m-titlebar.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\tpadding: 0 8px 8px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-titlebar.svelte-1b53e7w .cal-m-title:where(.svelte-1b53e7w) {\n\t\tflex: 0 1 auto;\n\t}\n\n\t.cal-m-left.svelte-1b53e7w,\n\t.cal-m-right.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 2px;\n\t\tflex-shrink: 0;\n\t}\n\n\t.cal-m-right.svelte-1b53e7w {\n\t\tjustify-content: flex-end;\n\t}\n\n\t.cal-m-nav.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 40px;\n\t\theight: 40px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tborder-radius: 50%;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms, color 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-nav.svelte-1b53e7w:hover {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent);\n\t}\n\t.cal-m-nav.svelte-1b53e7w:active {\n\t\tbackground: var(--dt-accent-dim, rgba(37, 99, 235, 0.12));\n\t}\n\t.cal-m-nav.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\toutline-offset: 2px;\n\t}\n\n\t.cal-m-pills.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tgap: 2px;\n\t\tbackground: color-mix(in srgb, var(--dt-surface, var(--dt-bg, #ffffff)) 85%, transparent);\n\t\tborder-radius: 8px;\n\t\tpadding: 2px;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-pill.svelte-1b53e7w {\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tcursor: pointer;\n\t\tfont: 600 12px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tpadding: 9px 12px;\n\t\tborder-radius: 6px;\n\t\tletter-spacing: 0.04em;\n\t\ttext-transform: uppercase;\n\t\ttransition: background 100ms, color 100ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.cal-m-pill.svelte-1b53e7w:hover:not(.cal-m-pill--active) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.cal-m-pill--active.svelte-1b53e7w {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t}\n\n\t.cal-m-title.svelte-1b53e7w {\n\t\tflex: 1;\n\t\ttext-align: center;\n\t\tfont: 600 14px / 1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmin-width: 0;\n\t}\n\n\t.cal-m-today.svelte-1b53e7w {\n\t\tfont: 600 12px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 10%, transparent);\n\t\tborder: none;\n\t\tmin-height: 40px;\n\t\tpadding: 5px 12px;\n\t\tborder-radius: 6px;\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\t\tletter-spacing: 0.04em;\n\t\ttext-transform: uppercase;\n\t\ttransition: background 120ms, color 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-today.svelte-1b53e7w:hover:not(:disabled) {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 18%, transparent);\n\t}\n\t.cal-m-today.svelte-1b53e7w:active:not(:disabled) {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 25%, transparent);\n\t}\n\t.cal-m-today.svelte-1b53e7w:disabled {\n\t\topacity: 0.45;\n\t\tcursor: default;\n\t}\n\t.cal-m-today.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\toutline-offset: 2px;\n\t}\n/*$vite$:1*/";
(function() {
	var CLEAN = 1024;
	var DIRTY = 2048;
	var MAYBE_DIRTY = 4096;
	var INERT = 8192;
	var DESTROYED = 16384;
	/** Set once a reaction has run for the first time */
	var REACTION_RAN = 32768;
	/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
	var DESTROYING = 1 << 25;
	/**
	* 'Transparent' effects do not create a transition boundary.
	* This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
	*/
	var EFFECT_TRANSPARENT = 65536;
	var EFFECT_PRESERVED = 1 << 19;
	var USER_EFFECT = 1 << 20;
	var EFFECT_OFFSCREEN = 1 << 25;
	/**
	* Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
	* Will be lifted during execution of the derived and during checking its dirty state (both are necessary
	* because a derived might be checked but not executed). This is a pure performance optimization flag and
	* should not be used for any other purpose!
	*/
	var WAS_MARKED = 65536;
	var REACTION_IS_UPDATING = 1 << 21;
	var ASYNC = 1 << 22;
	var ERROR_VALUE = 1 << 23;
	var STATE_SYMBOL = Symbol("$state");
	var LEGACY_PROPS = Symbol("legacy props");
	var LOADING_ATTR_SYMBOL = Symbol("");
	var ATTRIBUTES_CACHE = Symbol("attributes");
	var CLASS_CACHE = Symbol("class");
	var STYLE_CACHE = Symbol("style");
	var TEXT_CACHE = Symbol("text");
	/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
	var STALE_REACTION = new class StaleReactionError extends Error {
		name = "StaleReactionError";
		message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
	}();
	var IS_XHTML = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/utils.js
	var is_array = Array.isArray;
	var index_of = Array.prototype.indexOf;
	var includes = Array.prototype.includes;
	var array_from = Array.from;
	var define_property = Object.defineProperty;
	var get_descriptor = Object.getOwnPropertyDescriptor;
	var get_descriptors = Object.getOwnPropertyDescriptors;
	var object_prototype = Object.prototype;
	var array_prototype = Array.prototype;
	var get_prototype_of = Object.getPrototypeOf;
	var is_extensible = Object.isExtensible;
	/**
	* @param {any} thing
	* @returns {thing is Function}
	*/
	function is_function(thing) {
		return typeof thing === "function";
	}
	var noop = () => {};
	/** @param {Array<() => void>} arr */
	function run_all(arr) {
		for (var i = 0; i < arr.length; i++) arr[i]();
	}
	/**
	* TODO replace with Promise.withResolvers once supported widely enough
	* @template [T=void]
	*/
	function deferred() {
		/** @type {(value: T) => void} */
		var resolve;
		/** @type {(reason: any) => void} */
		var reject;
		return {
			promise: new Promise((res, rej) => {
				resolve = res;
				reject = rej;
			}),
			resolve,
			reject
		};
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/equality.js
	/** @import { Equals } from '#client' */
	/** @type {Equals} */
	function equals(value) {
		return value === this.v;
	}
	/**
	* @param {unknown} a
	* @param {unknown} b
	* @returns {boolean}
	*/
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
	}
	/** @type {Equals} */
	function safe_equals(value) {
		return !safe_not_equal(value, this.v);
	}
	/**
	* `%name%(...)` can only be used during component initialisation
	* @param {string} name
	* @returns {never}
	*/
	function lifecycle_outside_component(name) {
		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/errors.js
	/**
	* Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
	* @returns {never}
	*/
	function async_derived_orphan() {
		throw new Error(`https://svelte.dev/e/async_derived_orphan`);
	}
	/**
	* Keyed each block has duplicate key `%value%` at indexes %a% and %b%
	* @param {string} a
	* @param {string} b
	* @param {string | undefined | null} [value]
	* @returns {never}
	*/
	function each_key_duplicate(a, b, value) {
		throw new Error(`https://svelte.dev/e/each_key_duplicate`);
	}
	/**
	* `%rune%` cannot be used inside an effect cleanup function
	* @param {string} rune
	* @returns {never}
	*/
	function effect_in_teardown(rune) {
		throw new Error(`https://svelte.dev/e/effect_in_teardown`);
	}
	/**
	* Effect cannot be created inside a `$derived` value that was not itself created inside an effect
	* @returns {never}
	*/
	function effect_in_unowned_derived() {
		throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
	}
	/**
	* `%rune%` can only be used inside an effect (e.g. during component initialisation)
	* @param {string} rune
	* @returns {never}
	*/
	function effect_orphan(rune) {
		throw new Error(`https://svelte.dev/e/effect_orphan`);
	}
	/**
	* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
	* @returns {never}
	*/
	function effect_update_depth_exceeded() {
		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
	}
	/**
	* Failed to hydrate the application
	* @returns {never}
	*/
	function hydration_failed() {
		throw new Error(`https://svelte.dev/e/hydration_failed`);
	}
	/**
	* Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
	* @param {string} key
	* @returns {never}
	*/
	function props_invalid_value(key) {
		throw new Error(`https://svelte.dev/e/props_invalid_value`);
	}
	/**
	* `setContext` must be called when a component first initializes, not in a subsequent effect or after an `await` expression
	* @returns {never}
	*/
	function set_context_after_init() {
		throw new Error(`https://svelte.dev/e/set_context_after_init`);
	}
	/**
	* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
	* @returns {never}
	*/
	function state_descriptors_fixed() {
		throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
	}
	/**
	* Cannot set prototype of `$state` object
	* @returns {never}
	*/
	function state_prototype_fixed() {
		throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
	}
	/**
	* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
	* @returns {never}
	*/
	function state_unsafe_mutation() {
		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
	}
	/**
	* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
	* @returns {never}
	*/
	function svelte_boundary_reset_onerror() {
		throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/flags/index.js
	/** True if experimental.async=true */
	var async_mode_flag = false;
	/** True if we're not certain that we only have Svelte 5 code in the compilation */
	var legacy_mode_flag = false;
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/constants.js
	var HYDRATION_ERROR = {};
	var UNINITIALIZED = Symbol("uninitialized");
	var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/context.js
	/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
	/** @type {ComponentContext | null} */
	var component_context = null;
	/** @param {ComponentContext | null} context */
	function set_component_context(context) {
		component_context = context;
	}
	/**
	* Retrieves the context that belongs to the closest parent component with the specified `key`.
	* Must be called during component initialisation.
	*
	* [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
	*
	* @template T
	* @param {any} key
	* @returns {T}
	*/
	function getContext(key) {
		return get_or_init_context_map("getContext").get(key);
	}
	/**
	* Associates an arbitrary `context` object with the current component and the specified `key`
	* and returns that object. The context is then available to children of the component
	* (including slotted content) with `getContext`.
	*
	* Like lifecycle functions, this must be called during component initialisation.
	*
	* [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
	*
	* @template T
	* @param {any} key
	* @param {T} context
	* @returns {T}
	*/
	function setContext(key, context) {
		const context_map = get_or_init_context_map("setContext");
		if (async_mode_flag) {
			var flags = active_effect.f;
			if (!(!active_reaction && (flags & 32) !== 0 && !component_context.i)) set_context_after_init();
		}
		context_map.set(key, context);
		return context;
	}
	/**
	* @param {Record<string, unknown>} props
	* @param {any} runes
	* @param {Function} [fn]
	* @returns {void}
	*/
	function push(props, runes = false, fn) {
		component_context = {
			p: component_context,
			i: false,
			c: null,
			e: null,
			s: props,
			x: null,
			r: active_effect,
			l: legacy_mode_flag && !runes ? {
				s: null,
				u: null,
				$: []
			} : null
		};
	}
	/**
	* @template {Record<string, any>} T
	* @param {T} [component]
	* @returns {T}
	*/
	function pop(component) {
		var context = component_context;
		var effects = context.e;
		if (effects !== null) {
			context.e = null;
			for (var fn of effects) create_user_effect(fn);
		}
		if (component !== void 0) context.x = component;
		context.i = true;
		component_context = context.p;
		return component ?? {};
	}
	/** @returns {boolean} */
	function is_runes() {
		return !legacy_mode_flag || component_context !== null && component_context.l === null;
	}
	/**
	* @param {string} name
	* @returns {Map<unknown, unknown>}
	*/
	function get_or_init_context_map(name) {
		if (component_context === null) lifecycle_outside_component(name);
		return component_context.c ??= new Map(get_parent_context(component_context) || void 0);
	}
	/**
	* @param {ComponentContext} component_context
	* @returns {Map<unknown, unknown> | null}
	*/
	function get_parent_context(component_context) {
		let parent = component_context.p;
		while (parent !== null) {
			const context_map = parent.c;
			if (context_map !== null) return context_map;
			parent = parent.p;
		}
		return null;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/task.js
	/** @type {Array<() => void>} */
	var micro_tasks = [];
	function run_micro_tasks() {
		var tasks = micro_tasks;
		micro_tasks = [];
		run_all(tasks);
	}
	/**
	* @param {() => void} fn
	*/
	function queue_micro_task(fn) {
		if (micro_tasks.length === 0 && !is_flushing_sync) {
			var tasks = micro_tasks;
			queueMicrotask(() => {
				if (tasks === micro_tasks) run_micro_tasks();
			});
		}
		micro_tasks.push(fn);
	}
	/**
	* Synchronously run any queued tasks.
	*/
	function flush_tasks() {
		while (micro_tasks.length > 0) run_micro_tasks();
	}
	/**
	* Reading a derived belonging to a now-destroyed effect may result in stale values
	*/
	function derived_inert() {
		console.warn(`https://svelte.dev/e/derived_inert`);
	}
	/**
	* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
	* @param {string | undefined | null} [location]
	*/
	function hydration_mismatch(location) {
		console.warn(`https://svelte.dev/e/hydration_mismatch`);
	}
	/**
	* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
	*/
	function svelte_boundary_reset_noop() {
		console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/hydration.js
	/** @import { TemplateNode } from '#client' */
	/**
	* Use this variable to guard everything related to hydration code so it can be treeshaken out
	* if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
	*/
	var hydrating = false;
	/** @param {boolean} value */
	function set_hydrating(value) {
		hydrating = value;
	}
	/**
	* The node that is currently being hydrated. This starts out as the first node inside the opening
	* <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
	* When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
	* time we leave the block it is the closing comment, which serves as the block's anchor.
	* @type {TemplateNode}
	*/
	var hydrate_node;
	/** @param {TemplateNode | null} node */
	function set_hydrate_node(node) {
		if (node === null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		return hydrate_node = node;
	}
	function hydrate_next() {
		return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
	}
	/** @param {TemplateNode} node */
	function reset(node) {
		if (!hydrating) return;
		if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		hydrate_node = node;
	}
	function next(count = 1) {
		if (hydrating) {
			var i = count;
			var node = hydrate_node;
			while (i--) node = /* @__PURE__ */ get_next_sibling(node);
			hydrate_node = node;
		}
	}
	/**
	* Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
	* @param {boolean} remove
	*/
	function skip_nodes(remove = true) {
		var depth = 0;
		var node = hydrate_node;
		while (true) {
			if (node.nodeType === 8) {
				var data = node.data;
				if (data === "]") {
					if (depth === 0) return node;
					depth -= 1;
				} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
			}
			var next = /* @__PURE__ */ get_next_sibling(node);
			if (remove) node.remove();
			node = next;
		}
	}
	/**
	*
	* @param {TemplateNode} node
	*/
	function read_hydration_instruction(node) {
		if (!node || node.nodeType !== 8) {
			hydration_mismatch();
			throw HYDRATION_ERROR;
		}
		return node.data;
	}
	/**
	* @template T
	* @param {T} value
	* @returns {T}
	*/
	function proxy(value) {
		if (typeof value !== "object" || value === null || STATE_SYMBOL in value) return value;
		const prototype = get_prototype_of(value);
		if (prototype !== object_prototype && prototype !== array_prototype) return value;
		/** @type {Map<any, Source<any>>} */
		var sources = /* @__PURE__ */ new Map();
		var is_proxied_array = is_array(value);
		var version = /* @__PURE__ */ state(0);
		var stack = null;
		var parent_version = update_version;
		/**
		* Executes the proxy in the context of the reaction it was originally created in, if any
		* @template T
		* @param {() => T} fn
		*/
		var with_parent = (fn) => {
			if (update_version === parent_version) return fn();
			var reaction = active_reaction;
			var version = update_version;
			set_active_reaction(null);
			set_update_version(parent_version);
			var result = fn();
			set_active_reaction(reaction);
			set_update_version(version);
			return result;
		};
		if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(
			/** @type {any[]} */
			value.length,
			stack
		));
		return new Proxy(value, {
			defineProperty(_, prop, descriptor) {
				if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
				var s = sources.get(prop);
				if (s === void 0) with_parent(() => {
					var s = /* @__PURE__ */ state(descriptor.value, stack);
					sources.set(prop, s);
					return s;
				});
				else set(s, descriptor.value, true);
				return true;
			},
			deleteProperty(target, prop) {
				var s = sources.get(prop);
				if (s === void 0) {
					if (prop in target) {
						const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
						sources.set(prop, s);
						increment(version);
					}
				} else {
					set(s, UNINITIALIZED);
					increment(version);
				}
				return true;
			},
			get(target, prop, receiver) {
				if (prop === STATE_SYMBOL) return value;
				var s = sources.get(prop);
				var exists = prop in target;
				if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
					});
					sources.set(prop, s);
				}
				if (s !== void 0) {
					var v = get(s);
					return v === UNINITIALIZED ? void 0 : v;
				}
				return Reflect.get(target, prop, receiver);
			},
			getOwnPropertyDescriptor(target, prop) {
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				if (descriptor && "value" in descriptor) {
					var s = sources.get(prop);
					if (s) descriptor.value = get(s);
				} else if (descriptor === void 0) {
					var source = sources.get(prop);
					var value = source?.v;
					if (source !== void 0 && value !== UNINITIALIZED) return {
						enumerable: true,
						configurable: true,
						value,
						writable: true
					};
				}
				return descriptor;
			},
			has(target, prop) {
				if (prop === STATE_SYMBOL) return true;
				var s = sources.get(prop);
				var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
				if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
					if (s === void 0) {
						s = with_parent(() => {
							return /* @__PURE__ */ state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
						});
						sources.set(prop, s);
					}
					if (get(s) === UNINITIALIZED) return false;
				}
				return has;
			},
			set(target, prop, value, receiver) {
				var s = sources.get(prop);
				var has = prop in target;
				if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
					var other_s = sources.get(i + "");
					if (other_s !== void 0) set(other_s, UNINITIALIZED);
					else if (i in target) {
						other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
						sources.set(i + "", other_s);
					}
				}
				if (s === void 0) {
					if (!has || get_descriptor(target, prop)?.writable) {
						s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
						set(s, proxy(value));
						sources.set(prop, s);
					}
				} else {
					has = s.v !== UNINITIALIZED;
					var p = with_parent(() => proxy(value));
					set(s, p);
				}
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				if (descriptor?.set) descriptor.set.call(receiver, value);
				if (!has) {
					if (is_proxied_array && typeof prop === "string") {
						var ls = sources.get("length");
						var n = Number(prop);
						if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
					}
					increment(version);
				}
				return true;
			},
			ownKeys(target) {
				get(version);
				var own_keys = Reflect.ownKeys(target).filter((key) => {
					var source = sources.get(key);
					return source === void 0 || source.v !== UNINITIALIZED;
				});
				for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
				return own_keys;
			},
			setPrototypeOf() {
				state_prototype_fixed();
			}
		});
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/operations.js
	/** @import { Effect, TemplateNode } from '#client' */
	/** @type {Window} */
	var $window;
	/** @type {boolean} */
	var is_firefox;
	/** @type {() => Node | null} */
	var first_child_getter;
	/** @type {() => Node | null} */
	var next_sibling_getter;
	/**
	* Initialize these lazily to avoid issues when using the runtime in a server context
	* where these globals are not available while avoiding a separate server entry point
	*/
	function init_operations() {
		if ($window !== void 0) return;
		$window = window;
		is_firefox = /Firefox/.test(navigator.userAgent);
		var element_prototype = Element.prototype;
		var node_prototype = Node.prototype;
		var text_prototype = Text.prototype;
		first_child_getter = get_descriptor(node_prototype, "firstChild").get;
		next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
		if (is_extensible(element_prototype)) {
			/** @type {any} */ element_prototype[CLASS_CACHE] = void 0;
			/** @type {any} */ element_prototype[ATTRIBUTES_CACHE] = null;
			/** @type {any} */ element_prototype[STYLE_CACHE] = void 0;
			element_prototype.__e = void 0;
		}
		if (is_extensible(text_prototype))
 /** @type {any} */ text_prototype[TEXT_CACHE] = void 0;
	}
	/**
	* @param {string} value
	* @returns {Text}
	*/
	function create_text(value = "") {
		return document.createTextNode(value);
	}
	/**
	* @template {Node} N
	* @param {N} node
	*/
	/*@__NO_SIDE_EFFECTS__*/
	function get_first_child(node) {
		return first_child_getter.call(node);
	}
	/**
	* @template {Node} N
	* @param {N} node
	*/
	/*@__NO_SIDE_EFFECTS__*/
	function get_next_sibling(node) {
		return next_sibling_getter.call(node);
	}
	/**
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @template {Node} N
	* @param {N} node
	* @param {boolean} is_text
	* @returns {TemplateNode | null}
	*/
	function child(node, is_text) {
		if (!hydrating) return /* @__PURE__ */ get_first_child(node);
		var child = /* @__PURE__ */ get_first_child(hydrate_node);
		if (child === null) child = hydrate_node.appendChild(create_text());
		else if (is_text && child.nodeType !== 3) {
			var text = create_text();
			child?.before(text);
			set_hydrate_node(text);
			return text;
		}
		if (is_text) merge_text_nodes(child);
		set_hydrate_node(child);
		return child;
	}
	/**
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @param {TemplateNode} node
	* @param {boolean} [is_text]
	* @returns {TemplateNode | null}
	*/
	function first_child(node, is_text = false) {
		if (!hydrating) {
			var first = /* @__PURE__ */ get_first_child(node);
			if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
			return first;
		}
		if (is_text) {
			if (hydrate_node?.nodeType !== 3) {
				var text = create_text();
				hydrate_node?.before(text);
				set_hydrate_node(text);
				return text;
			}
			merge_text_nodes(hydrate_node);
		}
		return hydrate_node;
	}
	/**
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @param {TemplateNode} node
	* @param {number} count
	* @param {boolean} is_text
	* @returns {TemplateNode | null}
	*/
	function sibling(node, count = 1, is_text = false) {
		let next_sibling = hydrating ? hydrate_node : node;
		var last_sibling;
		while (count--) {
			last_sibling = next_sibling;
			next_sibling = /* @__PURE__ */ get_next_sibling(next_sibling);
		}
		if (!hydrating) return next_sibling;
		if (is_text) {
			if (next_sibling?.nodeType !== 3) {
				var text = create_text();
				if (next_sibling === null) last_sibling?.after(text);
				else next_sibling.before(text);
				set_hydrate_node(text);
				return text;
			}
			merge_text_nodes(next_sibling);
		}
		set_hydrate_node(next_sibling);
		return next_sibling;
	}
	/**
	* @template {Node} N
	* @param {N} node
	* @returns {void}
	*/
	function clear_text_content(node) {
		node.textContent = "";
	}
	/**
	* Returns `true` if we're updating the current block, for example `condition` in
	* an `{#if condition}` block just changed. In this case, the branch should be
	* appended (or removed) at the same time as other updates within the
	* current `<svelte:boundary>`
	*/
	function should_defer_append() {
		if (!async_mode_flag) return false;
		if (eager_block_effects !== null) return false;
		return (active_effect.f & REACTION_RAN) !== 0;
	}
	/**
	* Branching here is intentional and load-bearing for perf. `createElement(tag)`
	* hits a fast path in Blink that `createElementNS(NAMESPACE_HTML, tag)` doesn't,
	* and passing an explicit `undefined` as the trailing options arg measurably
	* slows both APIs. Funnelling every case through a single `createElementNS(ns,
	* tag, options)` call would be smaller but slower on the HTML path.
	*
	* @template {keyof HTMLElementTagNameMap | string} T
	* @param {T} tag
	* @param {string} [namespace]
	* @param {string} [is]
	* @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
	*/
	function create_element(tag, namespace, is) {
		if (namespace == null || namespace === "http://www.w3.org/1999/xhtml") return is ? document.createElement(tag, { is }) : document.createElement(tag);
		return is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag);
	}
	/**
	* Browsers split text nodes larger than 65536 bytes when parsing.
	* For hydration to succeed, we need to stitch them back together
	* @param {Text} text
	*/
	function merge_text_nodes(text) {
		if (text.nodeValue.length < 65536) return;
		let next = text.nextSibling;
		while (next !== null && next.nodeType === 3) {
			next.remove();
			/** @type {string} */ text.nodeValue += next.nodeValue;
			next = text.nextSibling;
		}
	}
	/**
	* @param {unknown} error
	*/
	function handle_error(error) {
		var effect = active_effect;
		if (effect === null) {
			/** @type {Derived} */ active_reaction.f |= ERROR_VALUE;
			return error;
		}
		if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
		invoke_error_boundary(error, effect);
	}
	/**
	* @param {unknown} error
	* @param {Effect | null} effect
	*/
	function invoke_error_boundary(error, effect) {
		if (effect !== null && (effect.f & 16384) !== 0) return;
		while (effect !== null) {
			if ((effect.f & 128) !== 0) {
				if ((effect.f & 32768) === 0) throw error;
				try {
					/** @type {Boundary} */ effect.b.error(error);
					return;
				} catch (e) {
					error = e;
				}
			}
			effect = effect.parent;
		}
		throw error;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/status.js
	/** @import { Derived, Signal } from '#client' */
	var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
	/**
	* @param {Signal} signal
	* @param {number} status
	*/
	function set_signal_status(signal, status) {
		signal.f = signal.f & STATUS_MASK | status;
	}
	/**
	* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
	* @param {Derived} derived
	*/
	function update_derived_status(derived) {
		if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
		else set_signal_status(derived, MAYBE_DIRTY);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/utils.js
	/** @import { Derived, Effect, Value } from '#client' */
	/**
	* @param {Value[] | null} deps
	*/
	function clear_marked(deps) {
		if (deps === null) return;
		for (const dep of deps) {
			if ((dep.f & 2) === 0 || (dep.f & 65536) === 0) continue;
			dep.f ^= WAS_MARKED;
			clear_marked(
				/** @type {Derived} */
				dep.deps
			);
		}
	}
	/**
	* @param {Effect} effect
	* @param {Set<Effect>} dirty_effects
	* @param {Set<Effect>} maybe_dirty_effects
	*/
	function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
		if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
		else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
		clear_marked(effect.deps);
		set_signal_status(effect, CLEAN);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/store.js
	/**
	* We set this to `true` when updating a store so that we correctly
	* schedule effects if the update takes place inside a `$:` effect
	*/
	var legacy_is_updating_store = false;
	/**
	* Whether or not the prop currently being read is a store binding, as in
	* `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
	* runes mode, and skip `binding_property_non_reactive` validation
	*/
	var is_store_binding = false;
	/**
	* Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
	* Used to prevent `binding_property_non_reactive` validation false positives and
	* ensure that these props are treated as mutable even in runes mode
	* @template T
	* @param {() => T} fn
	* @returns {[T, boolean]}
	*/
	function capture_store_binding(fn) {
		var previous_is_store_binding = is_store_binding;
		try {
			is_store_binding = false;
			return [fn(), is_store_binding];
		} finally {
			is_store_binding = previous_is_store_binding;
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
	/**
	* @template T
	* @param {() => T} fn
	*/
	function without_reactive_context(fn) {
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			return fn();
		} finally {
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/create-subscriber.js
	/**
	* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
	* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
	*
	* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
	* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
	*
	* If `start` returns a cleanup function, it will be called when the effect is destroyed.
	*
	* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
	* are active, and the returned teardown function will only be called when all effects are destroyed.
	*
	* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
	*
	* ```js
	* import { createSubscriber } from 'svelte/reactivity';
	* import { on } from 'svelte/events';
	*
	* export class MediaQuery {
	* 	#query;
	* 	#subscribe;
	*
	* 	constructor(query) {
	* 		this.#query = window.matchMedia(`(${query})`);
	*
	* 		this.#subscribe = createSubscriber((update) => {
	* 			// when the `change` event occurs, re-run any effects that read `this.current`
	* 			const off = on(this.#query, 'change', update);
	*
	* 			// stop listening when all the effects are destroyed
	* 			return () => off();
	* 		});
	* 	}
	*
	* 	get current() {
	* 		// This makes the getter reactive, if read in an effect
	* 		this.#subscribe();
	*
	* 		// Return the current state of the query, whether or not we're in an effect
	* 		return this.#query.matches;
	* 	}
	* }
	* ```
	* @param {(update: () => void) => (() => void) | void} start
	* @since 5.7.0
	*/
	function createSubscriber(start) {
		let subscribers = 0;
		let version = source(0);
		/** @type {(() => void) | void} */
		let stop;
		return () => {
			if (effect_tracking()) {
				get(version);
				render_effect(() => {
					if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
					subscribers += 1;
					return () => {
						queue_micro_task(() => {
							subscribers -= 1;
							if (subscribers === 0) {
								stop?.();
								stop = void 0;
								increment(version);
							}
						});
					};
				});
			}
		};
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
	/** @import { Effect, Source, TemplateNode, } from '#client' */
	/**
	* @typedef {{
	* 	 onerror?: ((error: unknown, reset: () => void) => void) | null;
	*   failed?: ((anchor: Node, error: () => unknown, reset: () => () => void) => void) | null;
	*   pending?: ((anchor: Node) => void) | null;
	* }} BoundaryProps
	*/
	var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
	/**
	* @param {TemplateNode} node
	* @param {BoundaryProps} props
	* @param {((anchor: Node) => void)} children
	* @param {((error: unknown) => unknown) | undefined} [transform_error]
	* @returns {void}
	*/
	function boundary(node, props, children, transform_error) {
		new Boundary(node, props, children, transform_error);
	}
	var Boundary = class {
		/** @type {Boundary | null} */
		parent;
		is_pending = false;
		/**
		* API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
		* Inherited from parent boundary, or defaults to identity.
		* @type {(error: unknown) => unknown}
		*/
		transform_error;
		/** @type {TemplateNode} */
		#anchor;
		/** @type {TemplateNode | null} */
		#hydrate_open = hydrating ? hydrate_node : null;
		/** @type {BoundaryProps} */
		#props;
		/** @type {((anchor: Node) => void)} */
		#children;
		/** @type {Effect} */
		#effect;
		/** @type {Effect | null} */
		#main_effect = null;
		/** @type {Effect | null} */
		#pending_effect = null;
		/** @type {Effect | null} */
		#failed_effect = null;
		/** @type {DocumentFragment | null} */
		#offscreen_fragment = null;
		#local_pending_count = 0;
		#pending_count = 0;
		#pending_count_update_queued = false;
		/** @type {Set<Effect>} */
		#dirty_effects = /* @__PURE__ */ new Set();
		/** @type {Set<Effect>} */
		#maybe_dirty_effects = /* @__PURE__ */ new Set();
		/**
		* A source containing the number of pending async deriveds/expressions.
		* Only created if `$effect.pending()` is used inside the boundary,
		* otherwise updating the source results in needless `Batch.ensure()`
		* calls followed by no-op flushes
		* @type {Source<number> | null}
		*/
		#effect_pending = null;
		#effect_pending_subscriber = createSubscriber(() => {
			this.#effect_pending = source(this.#local_pending_count);
			return () => {
				this.#effect_pending = null;
			};
		});
		/**
		* @param {TemplateNode} node
		* @param {BoundaryProps} props
		* @param {((anchor: Node) => void)} children
		* @param {((error: unknown) => unknown) | undefined} [transform_error]
		*/
		constructor(node, props, children, transform_error) {
			this.#anchor = node;
			this.#props = props;
			this.#children = (anchor) => {
				var effect = active_effect;
				effect.b = this;
				effect.f |= 128;
				children(anchor);
			};
			this.parent = active_effect.b;
			this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
			this.#effect = block(() => {
				if (hydrating) {
					const comment = this.#hydrate_open;
					hydrate_next();
					const server_rendered_pending = comment.data === "[!";
					if (comment.data.startsWith("[?")) {
						const serialized_error = JSON.parse(comment.data.slice(2));
						this.#hydrate_failed_content(serialized_error);
					} else if (server_rendered_pending) this.#hydrate_pending_content();
					else this.#hydrate_resolved_content();
				} else this.#render();
			}, flags);
			if (hydrating) this.#anchor = hydrate_node;
		}
		#hydrate_resolved_content() {
			try {
				this.#main_effect = branch(() => this.#children(this.#anchor));
			} catch (error) {
				this.error(error);
			}
		}
		/**
		* @param {unknown} error The deserialized error from the server's hydration comment
		*/
		#hydrate_failed_content(error) {
			const failed = this.#props.failed;
			const { reset, invoke_onerror } = this.#create_reset(error);
			queue_micro_task(invoke_onerror);
			if (!failed) return;
			this.#failed_effect = branch(() => {
				failed(this.#anchor, () => error, () => reset);
			});
		}
		/**
		* Creates the `reset` function for a failed boundary, along with a function
		* that invokes `onerror` with it (if provided)
		* @param {unknown} error
		* @returns {{ reset: () => void, invoke_onerror: () => void }}
		*/
		#create_reset(error) {
			var did_reset = false;
			var calling_on_error = false;
			const reset = () => {
				if (did_reset) {
					svelte_boundary_reset_noop();
					return;
				}
				did_reset = true;
				if (calling_on_error) svelte_boundary_reset_onerror();
				if (this.#failed_effect !== null) pause_effect(this.#failed_effect, () => {
					this.#failed_effect = null;
				});
				this.#run(() => {
					this.#render();
				});
			};
			const invoke_onerror = () => {
				try {
					calling_on_error = true;
					this.#props.onerror?.(error, reset);
					calling_on_error = false;
				} catch (err) {
					invoke_error_boundary(err, this.#effect && this.#effect.parent);
				}
			};
			return {
				reset,
				invoke_onerror
			};
		}
		#hydrate_pending_content() {
			const pending = this.#props.pending;
			if (!pending) return;
			this.is_pending = true;
			this.#pending_effect = branch(() => pending(this.#anchor));
			queue_micro_task(() => {
				var fragment = this.#offscreen_fragment = document.createDocumentFragment();
				var anchor = create_text();
				fragment.append(anchor);
				this.#main_effect = this.#run(() => {
					return branch(() => this.#children(anchor));
				});
				if (this.#pending_count === 0) {
					this.#anchor.before(fragment);
					this.#offscreen_fragment = null;
					pause_effect(this.#pending_effect, () => {
						this.#pending_effect = null;
					});
					this.#resolve(current_batch);
				}
			});
		}
		#render() {
			try {
				this.is_pending = this.has_pending_snippet();
				this.#pending_count = 0;
				this.#local_pending_count = 0;
				this.#main_effect = branch(() => {
					this.#children(this.#anchor);
				});
				if (this.#pending_count > 0) {
					var fragment = this.#offscreen_fragment = document.createDocumentFragment();
					move_effect(this.#main_effect, fragment);
					const pending = this.#props.pending;
					this.#pending_effect = branch(() => pending(this.#anchor));
				} else this.#resolve(current_batch);
			} catch (error) {
				this.error(error);
			}
		}
		/**
		* @param {Batch} batch
		*/
		#resolve(batch) {
			this.is_pending = false;
			batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
		}
		/**
		* Defer an effect inside a pending boundary until the boundary resolves
		* @param {Effect} effect
		*/
		defer_effect(effect) {
			defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
		}
		/**
		* Returns `false` if the effect exists inside a boundary whose pending snippet is shown
		* @returns {boolean}
		*/
		is_rendered() {
			return !this.is_pending && (!this.parent || this.parent.is_rendered());
		}
		has_pending_snippet() {
			return !!this.#props.pending;
		}
		/**
		* @template T
		* @param {() => T} fn
		*/
		#run(fn) {
			var previous_effect = active_effect;
			var previous_reaction = active_reaction;
			var previous_ctx = component_context;
			set_active_effect(this.#effect);
			set_active_reaction(this.#effect);
			set_component_context(this.#effect.ctx);
			try {
				Batch.ensure();
				return fn();
			} catch (e) {
				handle_error(e);
				return null;
			} finally {
				set_active_effect(previous_effect);
				set_active_reaction(previous_reaction);
				set_component_context(previous_ctx);
			}
		}
		/**
		* Updates the pending count associated with the currently visible pending snippet,
		* if any, such that we can replace the snippet with content once work is done
		* @param {1 | -1} d
		* @param {Batch} batch
		*/
		#update_pending_count(d, batch) {
			if (!this.has_pending_snippet()) {
				if (this.parent) this.parent.#update_pending_count(d, batch);
				return;
			}
			this.#pending_count += d;
			if (this.#pending_count === 0) {
				this.#resolve(batch);
				if (this.#pending_effect) pause_effect(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
				if (this.#offscreen_fragment) {
					this.#anchor.before(this.#offscreen_fragment);
					this.#offscreen_fragment = null;
				}
			}
		}
		/**
		* Update the source that powers `$effect.pending()` inside this boundary,
		* and controls when the current `pending` snippet (if any) is removed.
		* Do not call from inside the class
		* @param {1 | -1} d
		* @param {Batch} batch
		*/
		update_pending_count(d, batch) {
			this.#update_pending_count(d, batch);
			this.#local_pending_count += d;
			if (!this.#effect_pending || this.#pending_count_update_queued) return;
			this.#pending_count_update_queued = true;
			queue_micro_task(() => {
				this.#pending_count_update_queued = false;
				if (this.#effect_pending) internal_set(this.#effect_pending, this.#local_pending_count);
			});
		}
		get_effect_pending() {
			this.#effect_pending_subscriber();
			return get(this.#effect_pending);
		}
		/** @param {unknown} error */
		error(error) {
			if (!this.#props.onerror && !this.#props.failed) throw error;
			if (current_batch?.is_fork) {
				if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
				if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
				if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
				current_batch.oncommit(() => {
					this.#handle_error(error);
				});
			} else this.#handle_error(error);
		}
		/**
		* @param {unknown} error
		*/
		#handle_error(error) {
			if (this.#main_effect) {
				destroy_effect(this.#main_effect);
				this.#main_effect = null;
			}
			if (this.#pending_effect) {
				destroy_effect(this.#pending_effect);
				this.#pending_effect = null;
			}
			if (this.#failed_effect) {
				destroy_effect(this.#failed_effect);
				this.#failed_effect = null;
			}
			if (hydrating) {
				set_hydrate_node(this.#hydrate_open);
				next();
				set_hydrate_node(skip_nodes());
			}
			let failed = this.#props.failed;
			/** @param {unknown} transformed_error */
			const handle_error_result = (transformed_error) => {
				const { reset, invoke_onerror } = this.#create_reset(transformed_error);
				invoke_onerror();
				if (failed) this.#failed_effect = this.#run(() => {
					try {
						return branch(() => {
							var effect = active_effect;
							effect.b = this;
							effect.f |= 128;
							failed(this.#anchor, () => transformed_error, () => reset);
						});
					} catch (error) {
						invoke_error_boundary(error, this.#effect.parent);
						return null;
					}
				});
			};
			queue_micro_task(() => {
				/** @type {unknown} */
				var result;
				try {
					result = this.transform_error(error);
				} catch (e) {
					invoke_error_boundary(e, this.#effect && this.#effect.parent);
					return;
				}
				if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
					handle_error_result,
					/** @param {unknown} e */
					(e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
				);
				else handle_error_result(result);
			});
		}
	};
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/async.js
	/** @import { Blocker, Effect, Source, Value } from '#client' */
	/**
	* @param {Blocker[]} blockers
	* @param {Array<() => any>} sync
	* @param {Array<() => Promise<any>>} async
	* @param {(values: Value[]) => any} fn
	*/
	function flatten(blockers, sync, async, fn) {
		const d = is_runes() ? derived : derived_safe_equal;
		var pending = blockers.filter((b) => !b.settled);
		var deriveds = sync.map(d);
		if (async.length === 0 && pending.length === 0) {
			fn(deriveds);
			return;
		}
		var parent = active_effect;
		var restore = capture();
		var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
		/**
		* @param {Source[]} async
		*/
		function finish(async) {
			if ((parent.f & 16384) !== 0) return;
			restore();
			try {
				fn([...deriveds, ...async]);
			} catch (error) {
				invoke_error_boundary(error, parent);
			}
			unset_context();
		}
		var decrement_pending = increment_pending();
		if (async.length === 0) {
			/** @type {Promise<any>} */ blocker_promise.then(() => finish([])).finally(decrement_pending);
			return;
		}
		function run() {
			Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
		}
		if (blocker_promise) blocker_promise.then(() => {
			restore();
			run();
			unset_context();
		});
		else run();
	}
	/**
	* Captures the current effect context so that we can restore it after
	* some asynchronous work has happened (so that e.g. `await a + b`
	* causes `b` to be registered as a dependency).
	*/
	function capture() {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_component_context = component_context;
		var previous_batch = current_batch;
		return function restore(activate_batch = true) {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_component_context);
			if (activate_batch && (previous_effect.f & 16384) === 0) {
				previous_batch?.activate();
				previous_batch?.apply();
			}
		};
	}
	function unset_context(deactivate_batch = true) {
		set_active_effect(null);
		set_active_reaction(null);
		set_component_context(null);
		if (deactivate_batch) current_batch?.deactivate();
	}
	/**
	* @returns {(skip?: boolean) => void}
	*/
	function increment_pending() {
		var effect = active_effect;
		var boundary = effect.b;
		var batch = current_batch;
		var blocking = !!boundary?.is_rendered();
		boundary?.update_pending_count(1, batch);
		batch.increment(blocking, effect);
		return () => {
			boundary?.update_pending_count(-1, batch);
			batch.decrement(blocking, effect);
		};
	}
	/**
	* @template V
	* @param {() => V} fn
	* @returns {Derived<V>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function derived(fn) {
		var flags = 2 | DIRTY;
		if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
		return {
			ctx: component_context,
			deps: null,
			effects: null,
			equals,
			f: flags,
			fn,
			reactions: null,
			rv: 0,
			v: UNINITIALIZED,
			wv: 0,
			parent: active_effect,
			ac: null
		};
	}
	var OBSOLETE = Symbol("obsolete");
	/**
	* @template V
	* @param {() => V | Promise<V>} fn
	* @param {string} [label]
	* @param {string} [location] If provided, print a warning if the value is not read immediately after update
	* @returns {Promise<Source<V>>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function async_derived(fn, label, location) {
		let parent = active_effect;
		if (parent === null) async_derived_orphan();
		var promise = void 0;
		var signal = source(UNINITIALIZED);
		var should_suspend = !active_reaction;
		/** @type {Set<ReturnType<typeof deferred<V>>>} */
		var deferreds = /* @__PURE__ */ new Set();
		async_effect(() => {
			var effect = active_effect;
			/** @type {ReturnType<typeof deferred<V>>} */
			var d = deferred();
			promise = d.promise;
			try {
				Promise.resolve(fn()).then(d.resolve, (e) => {
					if (e !== STALE_REACTION) d.reject(e);
				}).finally(unset_context);
			} catch (error) {
				d.reject(error);
				unset_context();
			}
			var batch = current_batch;
			if (should_suspend) {
				if ((effect.f & 32768) !== 0) var decrement_pending = increment_pending();
				if (parent.b?.is_rendered()) batch.async_deriveds.get(effect)?.reject(OBSOLETE);
				else for (const d of deferreds.values()) d.reject(OBSOLETE);
				deferreds.add(d);
				batch.async_deriveds.set(effect, d);
			}
			/**
			* @param {any} value
			* @param {unknown} error
			*/
			const handler = (value, error = void 0) => {
				decrement_pending?.();
				deferreds.delete(d);
				if (error === OBSOLETE) return;
				batch.activate();
				if (error) {
					signal.f |= ERROR_VALUE;
					internal_set(signal, error);
				} else {
					if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
					internal_set(signal, value);
				}
				batch.deactivate();
			};
			d.promise.then(handler, (e) => handler(null, e || "unknown"));
		});
		teardown(() => {
			for (const d of deferreds) d.reject(OBSOLETE);
		});
		return new Promise((fulfil) => {
			/** @param {Promise<V>} p */
			function next(p) {
				function go() {
					if (p === promise) fulfil(signal);
					else next(promise);
				}
				p.then(go, go);
			}
			next(promise);
		});
	}
	/**
	* @template V
	* @param {() => V} fn
	* @returns {Derived<V>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function user_derived(fn) {
		const d = /* @__PURE__ */ derived(fn);
		if (!async_mode_flag) push_reaction_value(d);
		return d;
	}
	/**
	* @template V
	* @param {() => V} fn
	* @returns {Derived<V>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function derived_safe_equal(fn) {
		const signal = /* @__PURE__ */ derived(fn);
		signal.equals = safe_equals;
		return signal;
	}
	/**
	* @param {Derived} derived
	* @returns {void}
	*/
	function destroy_derived_effects(derived) {
		var effects = derived.effects;
		if (effects !== null) {
			derived.effects = null;
			for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
		}
	}
	/**
	* @template T
	* @param {Derived} derived
	* @returns {T}
	*/
	function execute_derived(derived) {
		var value;
		var prev_active_effect = active_effect;
		var parent = derived.parent;
		if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & 24576) !== 0) {
			derived_inert();
			return derived.v;
		}
		set_active_effect(parent);
		try {
			derived.f &= ~WAS_MARKED;
			destroy_derived_effects(derived);
			value = update_reaction(derived);
		} finally {
			set_active_effect(prev_active_effect);
		}
		return value;
	}
	/**
	* @param {Derived} derived
	* @returns {void}
	*/
	function update_derived(derived) {
		var value = execute_derived(derived);
		if (!derived.equals(value)) {
			derived.wv = increment_write_version();
			if (!current_batch?.is_fork || derived.deps === null) {
				if (current_batch !== null) {
					current_batch.capture(derived, value, true);
					previous_batch?.capture(derived, value, true);
				} else derived.v = value;
				if (derived.deps === null) {
					set_signal_status(derived, CLEAN);
					return;
				}
			}
		}
		if (is_destroying_effect) return;
		if (batch_values !== null) {
			if (effect_tracking() || current_batch?.is_fork) batch_values.set(derived, value);
		} else update_derived_status(derived);
	}
	/**
	* @param {Derived} derived
	*/
	function freeze_derived_effects(derived) {
		if (derived.effects === null) return;
		for (const e of derived.effects) if (e.teardown || e.ac) {
			e.teardown?.();
			if (e.ac !== null) without_reactive_context(() => {
				/** @type {AbortController} */ e.ac.abort(STALE_REACTION);
				e.ac = null;
			});
			if (e.fn !== null) e.teardown = noop;
			remove_reactions(e, 0);
			destroy_effect_children(e);
		}
	}
	/**
	* @param {Derived} derived
	*/
	function unfreeze_derived_effects(derived) {
		if (derived.effects === null) return;
		for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/batch.js
	/** @import { Fork } from 'svelte' */
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
	/** @type {Batch | null} */
	var first_batch = null;
	/** @type {Batch | null} */
	var last_batch = null;
	/** @type {Batch | null} */
	var current_batch = null;
	/**
	* This is needed to avoid overwriting inputs
	* @type {Batch | null}
	*/
	var previous_batch = null;
	/**
	* When time travelling (i.e. working in one batch, while other batches
	* still have ongoing work), we ignore the real values of affected
	* signals in favour of their values within the batch
	* @type {Map<Value, any> | null}
	*/
	var batch_values = null;
	/** @type {Effect | null} */
	var last_scheduled_effect = null;
	var is_flushing_sync = false;
	var is_processing = false;
	/**
	* During traversal, this is an array. Newly created effects are (if not immediately
	* executed) pushed to this array, rather than going through the scheduling
	* rigamarole that would cause another turn of the flush loop.
	* @type {Effect[] | null}
	*/
	var collected_effects = null;
	/**
	* An array of effects that are marked during traversal as a result of a `set`
	* (not `internal_set`) call. These will be added to the next batch and
	* trigger another `batch.process()`
	* @type {Effect[] | null}
	* @deprecated when we get rid of legacy mode and stores, we can get rid of this
	*/
	var legacy_updates = null;
	var flush_count = 0;
	var uid$1 = 1;
	var Batch = class Batch {
		id = uid$1++;
		/** True as soon as `#process` was called */
		#started = false;
		linked = true;
		/** @type {Batch | null} */
		#prev = null;
		/** @type {Batch | null} */
		#next = null;
		/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
		async_deriveds = /* @__PURE__ */ new Map();
		/**
		* The current values of any signals that are updated in this batch.
		* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
		* They keys of this map are identical to `this.#previous`
		* @type {Map<Value, [any, boolean]>}
		*/
		current = /* @__PURE__ */ new Map();
		/**
		* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
		* They keys of this map are identical to `this.#current`
		* @type {Map<Value, any>}
		*/
		previous = /* @__PURE__ */ new Map();
		/**
		* When the batch is committed (and the DOM is updated), we need to remove old branches
		* and append new ones by calling the functions added inside (if/each/key/etc) blocks
		* @type {Set<(batch: Batch) => void>}
		*/
		#commit_callbacks = /* @__PURE__ */ new Set();
		/**
		* If a fork is discarded, we need to destroy any effects that are no longer needed
		* @type {Set<(batch: Batch) => void>}
		*/
		#discard_callbacks = /* @__PURE__ */ new Set();
		/**
		* The number of async effects that are currently in flight
		*/
		#pending = 0;
		/**
		* Async effects that are currently in flight, _not_ inside a pending boundary
		* @type {Map<Effect, number>}
		*/
		#blocking_pending = /* @__PURE__ */ new Map();
		/**
		* A deferred that resolves when the batch is committed, used with `settled()`
		* TODO replace with Promise.withResolvers once supported widely enough
		* @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
		*/
		#deferred = null;
		/**
		* The root effects that need to be flushed
		* @type {Effect[]}
		*/
		#roots = [];
		/**
		* Effects created while this batch was active.
		* @type {Effect[]}
		*/
		#new_effects = [];
		/**
		* Deferred effects (which run after async work has completed) that are DIRTY
		* @type {Set<Effect>}
		*/
		#dirty_effects = /* @__PURE__ */ new Set();
		/**
		* Deferred effects that are MAYBE_DIRTY
		* @type {Set<Effect>}
		*/
		#maybe_dirty_effects = /* @__PURE__ */ new Set();
		/**
		* A map of branches that still exist, but will be destroyed when this batch
		* is committed — we skip over these during `process`.
		* The value contains child effects that were dirty/maybe_dirty before being reset,
		* so they can be rescheduled if the branch survives.
		* @type {Map<Effect, { d: Effect[], m: Effect[] }>}
		*/
		#skipped_branches = /* @__PURE__ */ new Map();
		/**
		* Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
		* @type {Set<Effect>}
		*/
		#unskipped_branches = /* @__PURE__ */ new Set();
		is_fork = false;
		#decrement_queued = false;
		constructor() {
			if (last_batch === null) first_batch = last_batch = this;
			else {
				last_batch.#next = this;
				this.#prev = last_batch;
			}
			last_batch = this;
		}
		#is_deferred() {
			if (this.is_fork) return true;
			for (const effect of this.#blocking_pending.keys()) {
				var e = effect;
				var skipped = false;
				while (e.parent !== null) {
					if (this.#skipped_branches.has(e)) {
						skipped = true;
						break;
					}
					e = e.parent;
				}
				if (!skipped) return true;
			}
			return false;
		}
		/**
		* Add an effect to the #skipped_branches map and reset its children
		* @param {Effect} effect
		*/
		skip_effect(effect) {
			if (!this.#skipped_branches.has(effect)) this.#skipped_branches.set(effect, {
				d: [],
				m: []
			});
			this.#unskipped_branches.delete(effect);
		}
		/**
		* Remove an effect from the #skipped_branches map and reschedule
		* any tracked dirty/maybe_dirty child effects
		* @param {Effect} effect
		* @param {(e: Effect) => void} callback
		*/
		unskip_effect(effect, callback = (e) => this.schedule(e)) {
			var tracked = this.#skipped_branches.get(effect);
			if (tracked) {
				this.#skipped_branches.delete(effect);
				for (var e of tracked.d) {
					set_signal_status(e, DIRTY);
					callback(e);
				}
				for (e of tracked.m) {
					set_signal_status(e, MAYBE_DIRTY);
					callback(e);
				}
			}
			this.#unskipped_branches.add(effect);
		}
		#process() {
			this.#started = true;
			if (flush_count++ > 1e3) {
				this.#unlink();
				infinite_loop_guard();
			}
			for (const e of this.#dirty_effects) {
				this.#maybe_dirty_effects.delete(e);
				set_signal_status(e, DIRTY);
				this.schedule(e);
			}
			for (const e of this.#maybe_dirty_effects) {
				set_signal_status(e, MAYBE_DIRTY);
				this.schedule(e);
			}
			const roots = this.#roots;
			this.#roots = [];
			this.apply();
			/** @type {Effect[]} */
			var effects = collected_effects = [];
			/** @type {Effect[]} */
			var render_effects = [];
			/**
			* @type {Effect[]}
			* @deprecated when we get rid of legacy mode and stores, we can get rid of this
			*/
			var updates = legacy_updates = [];
			for (const root of roots) try {
				this.#traverse(root, effects, render_effects);
			} catch (e) {
				reset_all(root);
				if (!this.#is_deferred()) this.discard();
				throw e;
			}
			current_batch = null;
			if (updates.length > 0) {
				var batch = Batch.ensure();
				for (const e of updates) batch.schedule(e);
			}
			collected_effects = null;
			legacy_updates = null;
			if (this.#is_deferred()) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);
				for (const [e, t] of this.#skipped_branches) reset_branch(e, t);
				if (updates.length > 0)
 /** @type {Batch} */ current_batch.#process();
				return;
			}
			const earlier_batch = this.#find_earlier_batch();
			if (earlier_batch) {
				this.#defer_effects(render_effects);
				this.#defer_effects(effects);
				earlier_batch.#merge(this);
				return;
			}
			this.#dirty_effects.clear();
			this.#maybe_dirty_effects.clear();
			for (const fn of this.#commit_callbacks) fn(this);
			this.#commit_callbacks.clear();
			previous_batch = this;
			flush_queued_effects(render_effects);
			flush_queued_effects(effects);
			previous_batch = null;
			this.#deferred?.resolve();
			var next_batch = current_batch;
			if (this.#pending === 0 && (this.#roots.length === 0 || next_batch !== null)) {
				this.#unlink();
				if (async_mode_flag) {
					this.#commit();
					current_batch = next_batch;
				}
			}
			if (this.#roots.length > 0) {
				if (next_batch !== null) {
					const batch = next_batch;
					batch.#roots.push(...this.#roots.filter((r) => !batch.#roots.includes(r)));
				} else next_batch = this;
			}
			if (next_batch !== null) next_batch.#process();
		}
		/**
		* Traverse the effect tree, executing effects or stashing
		* them for later execution as appropriate
		* @param {Effect} root
		* @param {Effect[]} effects
		* @param {Effect[]} render_effects
		*/
		#traverse(root, effects, render_effects) {
			root.f ^= CLEAN;
			var effect = root.first;
			while (effect !== null) {
				var flags = effect.f;
				var is_branch = (flags & 96) !== 0;
				if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || this.#skipped_branches.has(effect)) && effect.fn !== null) {
					if (is_branch) effect.f ^= CLEAN;
					else if ((flags & 4) !== 0) effects.push(effect);
					else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
					else if (is_dirty(effect)) {
						if ((flags & 16) !== 0) this.#maybe_dirty_effects.add(effect);
						update_effect(effect);
					}
					var child = effect.first;
					if (child !== null) {
						effect = child;
						continue;
					}
				}
				while (effect !== null) {
					var next = effect.next;
					if (next !== null) {
						effect = next;
						break;
					}
					effect = effect.parent;
				}
			}
		}
		#find_earlier_batch() {
			var batch = this.#prev;
			while (batch !== null) {
				if (!batch.is_fork) {
					for (const [value, [, is_derived]] of this.current) if (batch.current.has(value) && !is_derived) return batch;
				}
				batch = batch.#prev;
			}
			return null;
		}
		/**
		* @param {Batch} batch
		*/
		#merge(batch) {
			for (const [source, value] of batch.current) {
				if (!this.previous.has(source) && batch.previous.has(source)) this.previous.set(source, batch.previous.get(source));
				this.current.set(source, value);
			}
			for (const [effect, deferred] of batch.async_deriveds) {
				const d = this.async_deriveds.get(effect);
				if (d) deferred.promise.then(d.resolve).catch(d.reject);
			}
			batch.async_deriveds.clear();
			this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);
			/**
			* mark all effects that depend on `batch.current`, except the
			* async effects that we just resolved (TODO unless they depend
			* on values in this batch that are NOT in the later batch?).
			* Through this we also will populate the correct #skipped_branches,
			* oncommit callbacks etc, so we don't need to merge them separately.
			* @param {Value} value
			*/
			const mark = (value) => {
				var reactions = value.reactions;
				if (reactions === null) return;
				if ((value.f & 2) !== 0 && (value.f & 6144) === 0) return;
				for (const reaction of reactions) {
					var flags = reaction.f;
					if ((flags & 2) !== 0) mark(reaction);
					else {
						var effect = reaction;
						if (flags & 4194320 && !this.async_deriveds.has(effect)) {
							this.#maybe_dirty_effects.delete(effect);
							set_signal_status(effect, DIRTY);
							this.schedule(effect);
						}
					}
				}
			};
			for (const source of this.current.keys()) mark(source);
			this.oncommit(() => batch.discard());
			batch.#unlink();
			current_batch = this;
			this.#process();
		}
		/**
		* @param {Effect[]} effects
		*/
		#defer_effects(effects) {
			for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
		}
		/**
		* Associate a change to a given source with the current
		* batch, noting its previous and current values
		* @param {Value} source
		* @param {any} value
		* @param {boolean} [is_derived]
		*/
		capture(source, value, is_derived = false) {
			if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
			if ((source.f & 8388608) === 0) {
				this.current.set(source, [value, is_derived]);
				batch_values?.set(source, value);
			}
			if (!this.is_fork) source.v = value;
		}
		activate() {
			current_batch = this;
		}
		deactivate() {
			current_batch = null;
			batch_values = null;
		}
		flush() {
			try {
				is_processing = true;
				current_batch = this;
				this.#process();
			} finally {
				flush_count = 0;
				last_scheduled_effect = null;
				collected_effects = null;
				legacy_updates = null;
				is_processing = false;
				current_batch = null;
				batch_values = null;
				old_values.clear();
			}
		}
		discard() {
			for (const fn of this.#discard_callbacks) fn(this);
			this.#discard_callbacks.clear();
			for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
			this.#unlink();
			this.#deferred?.resolve();
		}
		/**
		* @param {Effect} effect
		*/
		register_created_effect(effect) {
			this.#new_effects.push(effect);
		}
		#commit() {
			for (let batch = first_batch; batch !== null; batch = batch.#next) {
				var is_earlier = batch.id < this.id;
				/** @type {Source[]} */
				var sources = [];
				for (const [source, [value, is_derived]] of this.current) {
					if (batch.current.has(source)) {
						var batch_value = batch.current.get(source)[0];
						if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
						else continue;
					}
					sources.push(source);
				}
				if (is_earlier) for (const [effect, deferred] of this.async_deriveds) {
					const d = batch.async_deriveds.get(effect);
					if (d) deferred.promise.then(d.resolve).catch(d.reject);
				}
				var current = [...batch.current.keys()].filter((source) => !batch.current.get(source)[1]);
				if (!batch.#started || current.length === 0) continue;
				var others = current.filter((source) => !this.current.has(source));
				if (others.length === 0) {
					if (is_earlier) batch.discard();
				} else if (sources.length > 0) {
					if (is_earlier) for (const unskipped of this.#unskipped_branches) batch.unskip_effect(unskipped, (e) => {
						if ((e.f & 4194320) !== 0) batch.schedule(e);
						else batch.#defer_effects([e]);
					});
					batch.activate();
					/** @type {Set<Value>} */
					var marked = /* @__PURE__ */ new Set();
					/** @type {Map<Reaction, boolean>} */
					var checked = /* @__PURE__ */ new Map();
					for (var source of sources) mark_effects(source, others, marked, checked);
					checked = /* @__PURE__ */ new Map();
					var current_unequal = [...batch.current].filter(([c, v1]) => {
						const v2 = this.current.get(c);
						if (!v2) return true;
						return v2[0] !== v1[0] || v2[1] !== v1[1];
					}).map(([c]) => c);
					if (current_unequal.length > 0) {
						for (const effect of this.#new_effects) if ((effect.f & 155648) === 0 && depends_on(effect, current_unequal, checked)) {
							if ((effect.f & 4194320) !== 0) {
								set_signal_status(effect, DIRTY);
								batch.schedule(effect);
							} else batch.#dirty_effects.add(effect);
						}
					}
					if (batch.#roots.length > 0 && !batch.#decrement_queued) {
						batch.apply();
						for (var root of batch.#roots) batch.#traverse(root, [], []);
						batch.#roots = [];
					}
					batch.deactivate();
				}
			}
		}
		/**
		* @param {boolean} blocking
		* @param {Effect} effect
		*/
		increment(blocking, effect) {
			this.#pending += 1;
			if (blocking) {
				let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
				this.#blocking_pending.set(effect, blocking_pending_count + 1);
			}
		}
		/**
		* @param {boolean} blocking
		* @param {Effect} effect
		*/
		decrement(blocking, effect) {
			this.#pending -= 1;
			if (blocking) {
				let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
				if (blocking_pending_count === 1) this.#blocking_pending.delete(effect);
				else this.#blocking_pending.set(effect, blocking_pending_count - 1);
			}
			if (this.#decrement_queued) return;
			this.#decrement_queued = true;
			queue_micro_task(() => {
				this.#decrement_queued = false;
				if (this.linked) this.flush();
			});
		}
		/**
		* @param {Set<Effect>} dirty_effects
		* @param {Set<Effect>} maybe_dirty_effects
		*/
		transfer_effects(dirty_effects, maybe_dirty_effects) {
			for (const e of dirty_effects) this.#dirty_effects.add(e);
			for (const e of maybe_dirty_effects) this.#maybe_dirty_effects.add(e);
			dirty_effects.clear();
			maybe_dirty_effects.clear();
		}
		/** @param {(batch: Batch) => void} fn */
		oncommit(fn) {
			this.#commit_callbacks.add(fn);
		}
		/** @param {(batch: Batch) => void} fn */
		ondiscard(fn) {
			this.#discard_callbacks.add(fn);
		}
		settled() {
			return (this.#deferred ??= deferred()).promise;
		}
		static ensure() {
			if (current_batch === null) {
				const batch = current_batch = new Batch();
				if (!is_processing && !is_flushing_sync) queue_micro_task(() => {
					if (!batch.#started) batch.flush();
				});
			}
			return current_batch;
		}
		apply() {
			if (!async_mode_flag || !this.is_fork && this.#prev === null && this.#next === null) {
				batch_values = null;
				return;
			}
			batch_values = /* @__PURE__ */ new Map();
			for (const [source, [value]] of this.current) batch_values.set(source, value);
			for (let batch = first_batch; batch !== null; batch = batch.#next) {
				if (batch === this || batch.is_fork) continue;
				var intersects = false;
				if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
					if (is_derived) continue;
					if (this.current.has(source)) {
						intersects = true;
						break;
					}
				}
				if (!intersects) {
					for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
				}
			}
		}
		/**
		*
		* @param {Effect} effect
		*/
		schedule(effect) {
			last_scheduled_effect = effect;
			if (effect.b?.is_pending && (effect.f & 16777228) !== 0 && (effect.f & 32768) === 0) {
				effect.b.defer_effect(effect);
				return;
			}
			var e = effect;
			while (e.parent !== null) {
				e = e.parent;
				var flags = e.f;
				if (collected_effects !== null && e === active_effect) {
					if (async_mode_flag) return;
					if ((active_reaction === null || (active_reaction.f & 2) === 0) && !legacy_is_updating_store) return;
				}
				if ((flags & 96) !== 0) {
					if ((flags & 1024) === 0) return;
					e.f ^= CLEAN;
				}
			}
			this.#roots.push(e);
		}
		#unlink() {
			if (!this.linked) return;
			var prev = this.#prev;
			var next = this.#next;
			if (prev === null) first_batch = next;
			else prev.#next = next;
			if (next === null) last_batch = prev;
			else next.#prev = prev;
			this.linked = false;
		}
	};
	/**
	* Synchronously flush any pending updates.
	* Returns void if no callback is provided, otherwise returns the result of calling the callback.
	* @template [T=void]
	* @param {(() => T) | undefined} [fn]
	* @returns {T}
	*/
	function flushSync(fn) {
		var was_flushing_sync = is_flushing_sync;
		is_flushing_sync = true;
		try {
			var result;
			if (fn) {
				if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
				result = fn();
			}
			while (true) {
				flush_tasks();
				if (current_batch === null) return result;
				current_batch.flush();
			}
		} finally {
			is_flushing_sync = was_flushing_sync;
		}
	}
	function infinite_loop_guard() {
		try {
			effect_update_depth_exceeded();
		} catch (error) {
			invoke_error_boundary(error, last_scheduled_effect);
		}
	}
	/** @type {Set<Effect> | null} */
	var eager_block_effects = null;
	/**
	* @param {Array<Effect>} effects
	* @returns {void}
	*/
	function flush_queued_effects(effects) {
		var length = effects.length;
		if (length === 0) return;
		var i = 0;
		while (i < length) {
			var effect = effects[i++];
			if ((effect.f & 24576) === 0 && is_dirty(effect)) {
				eager_block_effects = /* @__PURE__ */ new Set();
				update_effect(effect);
				if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
				if (eager_block_effects?.size > 0) {
					old_values.clear();
					for (const e of eager_block_effects) {
						if ((e.f & 24576) !== 0) continue;
						/** @type {Effect[]} */
						const ordered_effects = [e];
						let ancestor = e.parent;
						while (ancestor !== null) {
							if (eager_block_effects.has(ancestor)) {
								eager_block_effects.delete(ancestor);
								ordered_effects.push(ancestor);
							}
							ancestor = ancestor.parent;
						}
						for (let j = ordered_effects.length - 1; j >= 0; j--) {
							const e = ordered_effects[j];
							if ((e.f & 24576) !== 0) continue;
							update_effect(e);
						}
					}
					eager_block_effects.clear();
				}
			}
		}
		eager_block_effects = null;
	}
	/**
	* This is similar to `mark_reactions`, but it only marks async/block effects
	* depending on `value` and at least one of the other `sources`, so that
	* these effects can re-run after another batch has been committed
	* @param {Value} value
	* @param {Source[]} sources
	* @param {Set<Value>} marked
	* @param {Map<Reaction, boolean>} checked
	*/
	function mark_effects(value, sources, marked, checked) {
		if (marked.has(value)) return;
		marked.add(value);
		if (value.reactions !== null) for (const reaction of value.reactions) {
			const flags = reaction.f;
			if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
			else if ((flags & 4194320) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
				set_signal_status(reaction, DIRTY);
				schedule_effect(reaction);
			}
		}
	}
	/**
	* @param {Reaction} reaction
	* @param {Source[]} sources
	* @param {Map<Reaction, boolean>} checked
	*/
	function depends_on(reaction, sources, checked) {
		const depends = checked.get(reaction);
		if (depends !== void 0) return depends;
		if (reaction.deps !== null) for (const dep of reaction.deps) {
			if (includes.call(sources, dep)) return true;
			if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
				checked.set(dep, true);
				return true;
			}
		}
		checked.set(reaction, false);
		return false;
	}
	/**
	* @param {Effect} effect
	* @returns {void}
	*/
	function schedule_effect(effect) {
		/** @type {Batch} */ current_batch.schedule(effect);
	}
	/**
	* Mark all the effects inside a skipped branch CLEAN, so that
	* they can be correctly rescheduled later. Tracks dirty and maybe_dirty
	* effects so they can be rescheduled if the branch survives.
	* @param {Effect} effect
	* @param {{ d: Effect[], m: Effect[] }} tracked
	*/
	function reset_branch(effect, tracked) {
		if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
		if ((effect.f & 2048) !== 0) tracked.d.push(effect);
		else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
		set_signal_status(effect, CLEAN);
		var e = effect.first;
		while (e !== null) {
			reset_branch(e, tracked);
			e = e.next;
		}
	}
	/**
	* Mark an entire effect tree clean following an error
	* @param {Effect} effect
	*/
	function reset_all(effect) {
		set_signal_status(effect, CLEAN);
		var e = effect.first;
		while (e !== null) {
			reset_all(e);
			e = e.next;
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/sources.js
	/** @import { Derived, Effect, Source, Value } from '#client' */
	/** @type {Set<Effect>} */
	var eager_effects = /* @__PURE__ */ new Set();
	/** @type {Map<Source, any>} */
	var old_values = /* @__PURE__ */ new Map();
	var eager_effects_deferred = false;
	/**
	* @template V
	* @param {V} v
	* @param {Error | null} [stack]
	* @returns {Source<V>}
	*/
	function source(v, stack) {
		return {
			f: 0,
			v,
			reactions: null,
			equals,
			rv: 0,
			wv: 0
		};
	}
	/**
	* @template V
	* @param {V} v
	* @param {Error | null} [stack]
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function state(v, stack) {
		const s = source(v, stack);
		push_reaction_value(s);
		return s;
	}
	/**
	* @template V
	* @param {V} initial_value
	* @param {boolean} [immutable]
	* @returns {Source<V>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function mutable_source(initial_value, immutable = false, trackable = true) {
		const s = source(initial_value);
		if (!immutable) s.equals = safe_equals;
		if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) (component_context.l.s ??= []).push(s);
		return s;
	}
	/**
	* @template V
	* @param {Source<V>} source
	* @param {V} value
	* @param {boolean} [should_proxy]
	* @returns {V}
	*/
	function set(source, value, should_proxy = false) {
		if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
		return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
	}
	/**
	* @template V
	* @param {Source<V>} source
	* @param {V} value
	* @param {Effect[] | null} [updated_during_traversal]
	* @returns {V}
	*/
	function internal_set(source, value, updated_during_traversal = null) {
		if (!source.equals(value)) {
			old_values.set(source, is_destroying_effect ? value : source.v);
			var batch = Batch.ensure();
			batch.capture(source, value);
			if ((source.f & 2) !== 0) {
				const derived = source;
				if ((source.f & 2048) !== 0) execute_derived(derived);
				if (batch_values === null) update_derived_status(derived);
			}
			source.wv = increment_write_version();
			mark_reactions(source, DIRTY, updated_during_traversal);
			if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) {
				if (untracked_writes === null) set_untracked_writes([source]);
				else untracked_writes.push(source);
			}
			if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
		}
		return value;
	}
	function flush_eager_effects() {
		eager_effects_deferred = false;
		for (const effect of eager_effects) {
			if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
			let dirty;
			try {
				dirty = is_dirty(effect);
			} catch {
				dirty = true;
			}
			if (dirty) update_effect(effect);
		}
		eager_effects.clear();
	}
	/**
	* Silently (without using `get`) increment a source
	* @param {Source<number>} source
	*/
	function increment(source) {
		set(source, source.v + 1);
	}
	/**
	* @param {Value} signal
	* @param {number} status should be DIRTY or MAYBE_DIRTY
	* @param {Effect[] | null} updated_during_traversal
	* @returns {void}
	*/
	function mark_reactions(signal, status, updated_during_traversal) {
		var reactions = signal.reactions;
		if (reactions === null) return;
		var runes = is_runes();
		var length = reactions.length;
		for (var i = 0; i < length; i++) {
			var reaction = reactions[i];
			var flags = reaction.f;
			if (!runes && reaction === active_effect) continue;
			var not_dirty = (flags & DIRTY) === 0;
			if (not_dirty) set_signal_status(reaction, status);
			if ((flags & 131072) !== 0) eager_effects.add(reaction);
			else if ((flags & 2) !== 0) {
				var derived = reaction;
				batch_values?.delete(derived);
				if ((flags & 65536) === 0) {
					if (flags & 512 && (active_effect === null || (active_effect.f & 2097152) === 0)) reaction.f |= WAS_MARKED;
					mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
				}
			} else if (not_dirty) {
				var effect = reaction;
				if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
				if (updated_during_traversal !== null) updated_during_traversal.push(effect);
				else schedule_effect(effect);
			}
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/legacy.js
	/**
	* @type {Set<Value> | null}
	* @deprecated
	*/
	var captured_signals = null;
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/runtime.js
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
	/**
	* True if updating in an effect context that is reactive (i.e. not branch/root effects)
	*/
	var is_updating_effect = false;
	var is_destroying_effect = false;
	/** @param {boolean} value */
	function set_is_destroying_effect(value) {
		is_destroying_effect = value;
	}
	/** @type {null | Reaction} */
	var active_reaction = null;
	var untracking = false;
	/** @param {null | Reaction} reaction */
	function set_active_reaction(reaction) {
		active_reaction = reaction;
	}
	/** @type {null | Effect} */
	var active_effect = null;
	/** @param {null | Effect} effect */
	function set_active_effect(effect) {
		active_effect = effect;
	}
	/**
	* When sources are created within a reaction, reading and writing
	* them within that reaction should not cause a re-run
	* @type {null | Set<Source>}
	*/
	var current_sources = null;
	/** @param {Value} value */
	function push_reaction_value(value) {
		if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & 2) !== 0)) (current_sources ??= /* @__PURE__ */ new Set()).add(value);
	}
	/**
	* The dependencies of the reaction that is currently being executed. In many cases,
	* the dependencies are unchanged between runs, and so this will be `null` unless
	* and until a new dependency is accessed — we track this via `skipped_deps`
	* @type {null | Value[]}
	*/
	var new_deps = null;
	var skipped_deps = 0;
	/**
	* Tracks writes that the effect it's executed in doesn't listen to yet,
	* so that the dependency can be added to the effect later on if it then reads it
	* @type {null | Source[]}
	*/
	var untracked_writes = null;
	/** @param {null | Source[]} value */
	function set_untracked_writes(value) {
		untracked_writes = value;
	}
	/**
	* @type {number} Used by sources and deriveds for handling updates.
	* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
	**/
	var write_version = 1;
	/** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
	var read_version = 0;
	var update_version = read_version;
	/** @param {number} value */
	function set_update_version(value) {
		update_version = value;
	}
	function increment_write_version() {
		return ++write_version;
	}
	/**
	* Determines whether a derived or effect is dirty.
	* If it is MAYBE_DIRTY, will set the status to CLEAN
	* @param {Reaction} reaction
	* @returns {boolean}
	*/
	function is_dirty(reaction) {
		var flags = reaction.f;
		if ((flags & 2048) !== 0) return true;
		if (flags & 2) reaction.f &= ~WAS_MARKED;
		if ((flags & 4096) !== 0) {
			var dependencies = reaction.deps;
			var length = dependencies.length;
			for (var i = 0; i < length; i++) {
				var dependency = dependencies[i];
				if (is_dirty(dependency)) update_derived(dependency);
				if (dependency.wv > reaction.wv) return true;
			}
			if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
		}
		return false;
	}
	/**
	* @param {Value} signal
	* @param {Effect} effect
	* @param {boolean} [root]
	*/
	function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
		var reactions = signal.reactions;
		if (reactions === null) return;
		if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
		for (var i = 0; i < reactions.length; i++) {
			var reaction = reactions[i];
			if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
			else if (effect === reaction) {
				if (root) set_signal_status(reaction, DIRTY);
				else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
				schedule_effect(reaction);
			}
		}
	}
	/** @param {Reaction} reaction */
	function update_reaction(reaction) {
		var previous_deps = new_deps;
		var previous_skipped_deps = skipped_deps;
		var previous_untracked_writes = untracked_writes;
		var previous_reaction = active_reaction;
		var previous_sources = current_sources;
		var previous_component_context = component_context;
		var previous_untracking = untracking;
		var previous_update_version = update_version;
		var flags = reaction.f;
		new_deps = null;
		skipped_deps = 0;
		untracked_writes = null;
		active_reaction = (flags & 96) === 0 ? reaction : null;
		current_sources = null;
		set_component_context(reaction.ctx);
		untracking = false;
		update_version = ++read_version;
		if (reaction.ac !== null) {
			without_reactive_context(() => {
				/** @type {AbortController} */ reaction.ac.abort(STALE_REACTION);
			});
			reaction.ac = null;
		}
		try {
			reaction.f |= REACTION_IS_UPDATING;
			var fn = reaction.fn;
			var result = fn();
			reaction.f |= REACTION_RAN;
			var deps = reaction.deps;
			var is_fork = current_batch?.is_fork;
			if (new_deps !== null) {
				var i;
				if (!is_fork) remove_reactions(reaction, skipped_deps);
				if (deps !== null && skipped_deps > 0) {
					deps.length = skipped_deps + new_deps.length;
					for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
				} else reaction.deps = deps = new_deps;
				if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) (deps[i].reactions ??= []).push(reaction);
			} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
				remove_reactions(reaction, skipped_deps);
				deps.length = skipped_deps;
			}
			if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
			if (previous_reaction !== null && previous_reaction !== reaction) {
				read_version++;
				if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
				if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
				if (untracked_writes !== null) {
					if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
					else previous_untracked_writes.push(...untracked_writes);
				}
			}
			if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
			return result;
		} catch (error) {
			return handle_error(error);
		} finally {
			reaction.f ^= REACTION_IS_UPDATING;
			new_deps = previous_deps;
			skipped_deps = previous_skipped_deps;
			untracked_writes = previous_untracked_writes;
			active_reaction = previous_reaction;
			current_sources = previous_sources;
			set_component_context(previous_component_context);
			untracking = previous_untracking;
			update_version = previous_update_version;
		}
	}
	/**
	* @template V
	* @param {Reaction} signal
	* @param {Value<V>} dependency
	* @returns {void}
	*/
	function remove_reaction(signal, dependency) {
		let reactions = dependency.reactions;
		if (reactions !== null) {
			var index = index_of.call(reactions, signal);
			if (index !== -1) {
				var new_length = reactions.length - 1;
				if (new_length === 0) reactions = dependency.reactions = null;
				else {
					reactions[index] = reactions[new_length];
					reactions.pop();
				}
			}
		}
		if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
			var derived = dependency;
			if ((derived.f & 512) !== 0) {
				derived.f ^= 512;
				derived.f &= ~WAS_MARKED;
			}
			if (derived.v !== UNINITIALIZED) update_derived_status(derived);
			if (derived.ac !== null) without_reactive_context(() => {
				/** @type {AbortController} */ derived.ac.abort(STALE_REACTION);
				derived.ac = null;
				set_signal_status(derived, DIRTY);
			});
			freeze_derived_effects(derived);
			remove_reactions(derived, 0);
		}
	}
	/**
	* @param {Reaction} signal
	* @param {number} start_index
	* @returns {void}
	*/
	function remove_reactions(signal, start_index) {
		var dependencies = signal.deps;
		if (dependencies === null) return;
		for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
	}
	/**
	* @param {Effect} effect
	* @returns {void}
	*/
	function update_effect(effect) {
		var flags = effect.f;
		if ((flags & 16384) !== 0) return;
		set_signal_status(effect, CLEAN);
		var previous_effect = active_effect;
		var was_updating_effect = is_updating_effect;
		active_effect = effect;
		is_updating_effect = (flags & 96) === 0;
		try {
			if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
			else destroy_effect_children(effect);
			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === "function" ? teardown : null;
			effect.wv = write_version;
		} finally {
			is_updating_effect = was_updating_effect;
			active_effect = previous_effect;
		}
	}
	/**
	* @template V
	* @param {Value<V>} signal
	* @returns {V}
	*/
	function get(signal) {
		var is_derived = (signal.f & 2) !== 0;
		captured_signals?.add(signal);
		if (active_reaction !== null && !untracking) {
			if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
				var deps = active_reaction.deps;
				if ((active_reaction.f & 2097152) !== 0) {
					if (signal.rv < read_version) {
						signal.rv = read_version;
						if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
						else if (new_deps === null) new_deps = [signal];
						else new_deps.push(signal);
					}
				} else {
					active_reaction.deps ??= [];
					if (!includes.call(active_reaction.deps, signal)) active_reaction.deps.push(signal);
					var reactions = signal.reactions;
					if (reactions === null) signal.reactions = [active_reaction];
					else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
				}
			}
		}
		if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
		if (is_derived) {
			var derived = signal;
			if (is_destroying_effect) {
				var value = derived.v;
				if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
				old_values.set(derived, value);
				return value;
			}
			var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
			var is_new = (derived.f & REACTION_RAN) === 0;
			if (is_dirty(derived)) {
				if (should_connect) derived.f |= 512;
				update_derived(derived);
			}
			if (should_connect && !is_new) {
				unfreeze_derived_effects(derived);
				reconnect(derived);
			}
		}
		if (batch_values?.has(signal)) return batch_values.get(signal);
		if ((signal.f & 8388608) !== 0) throw signal.v;
		return signal.v;
	}
	/**
	* (Re)connect a disconnected derived, so that it is notified
	* of changes in `mark_reactions`
	* @param {Derived} derived
	*/
	function reconnect(derived) {
		derived.f |= 512;
		if (derived.deps === null) return;
		for (const dep of derived.deps) {
			(dep.reactions ??= []).push(derived);
			if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
				unfreeze_derived_effects(dep);
				reconnect(dep);
			}
		}
	}
	/** @param {Derived} derived */
	function depends_on_old_values(derived) {
		if (derived.v === UNINITIALIZED) return true;
		if (derived.deps === null) return false;
		for (const dep of derived.deps) {
			if (old_values.has(dep)) return true;
			if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
		}
		return false;
	}
	/**
	* When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
	* any state read inside `fn` will not be treated as a dependency.
	*
	* ```ts
	* $effect(() => {
	*   // this will run when `data` changes, but not when `time` changes
	*   save(data, {
	*     timestamp: untrack(() => time)
	*   });
	* });
	* ```
	* @template T
	* @param {() => T} fn
	* @returns {T}
	*/
	function untrack(fn) {
		var previous_untracking = untracking;
		try {
			untracking = true;
			return fn();
		} finally {
			untracking = previous_untracking;
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/effects.js
	/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */
	/**
	* @param {'$effect' | '$effect.pre' | '$inspect'} rune
	*/
	function validate_effect(rune) {
		if (active_effect === null) {
			if (active_reaction === null) effect_orphan(rune);
			effect_in_unowned_derived();
		}
		if (is_destroying_effect) effect_in_teardown(rune);
	}
	/**
	* @param {Effect} effect
	* @param {Effect} parent_effect
	*/
	function push_effect(effect, parent_effect) {
		var parent_last = parent_effect.last;
		if (parent_last === null) parent_effect.last = parent_effect.first = effect;
		else {
			parent_last.next = effect;
			effect.prev = parent_last;
			parent_effect.last = effect;
		}
	}
	/**
	* @param {number} type
	* @param {null | (() => void | (() => void))} fn
	* @returns {Effect}
	*/
	function create_effect(type, fn) {
		var parent = active_effect;
		if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
		/** @type {Effect} */
		var effect = {
			ctx: component_context,
			deps: null,
			nodes: null,
			f: type | DIRTY | 512,
			first: null,
			fn,
			last: null,
			next: null,
			parent,
			b: parent && parent.b,
			prev: null,
			teardown: null,
			wv: 0,
			ac: null
		};
		current_batch?.register_created_effect(effect);
		/** @type {Effect | null} */
		var e = effect;
		if ((type & 4) !== 0) {
			if (collected_effects !== null) collected_effects.push(effect);
			else Batch.ensure().schedule(effect);
		} else if (fn !== null) {
			try {
				update_effect(effect);
			} catch (e) {
				destroy_effect(effect);
				throw e;
			}
			if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
				e = e.first;
				if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
			}
		}
		if (e !== null) {
			e.parent = parent;
			if (parent !== null) push_effect(e, parent);
			if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
				var derived = active_reaction;
				(derived.effects ??= []).push(e);
			}
		}
		return effect;
	}
	/**
	* Internal representation of `$effect.tracking()`
	* @returns {boolean}
	*/
	function effect_tracking() {
		return active_reaction !== null && !untracking;
	}
	/**
	* @param {() => void} fn
	*/
	function teardown(fn) {
		const effect = create_effect(8, null);
		set_signal_status(effect, CLEAN);
		effect.teardown = fn;
		return effect;
	}
	/**
	* Internal representation of `$effect(...)`
	* @param {() => void | (() => void)} fn
	*/
	function user_effect(fn) {
		validate_effect("$effect");
		var flags = active_effect.f;
		if (!active_reaction && (flags & 32) !== 0 && component_context !== null && !component_context.i) {
			var context = component_context;
			(context.e ??= []).push(fn);
		} else return create_user_effect(fn);
	}
	/**
	* @param {() => void | (() => void)} fn
	*/
	function create_user_effect(fn) {
		return create_effect(4 | USER_EFFECT, fn);
	}
	/**
	* An effect root whose children can transition out
	* @param {() => void} fn
	* @returns {(options?: { outro?: boolean }) => Promise<void>}
	*/
	function component_root(fn) {
		Batch.ensure();
		const effect = create_effect(64 | EFFECT_PRESERVED, fn);
		return (options = {}) => {
			return new Promise((fulfil) => {
				if (options.outro) pause_effect(effect, () => {
					destroy_effect(effect);
					fulfil(void 0);
				});
				else {
					destroy_effect(effect);
					fulfil(void 0);
				}
			});
		};
	}
	/**
	* @param {() => void | (() => void)} fn
	* @returns {Effect}
	*/
	function effect(fn) {
		return create_effect(4, fn);
	}
	/**
	* @param {() => void | (() => void)} fn
	* @returns {Effect}
	*/
	function async_effect(fn) {
		return create_effect(ASYNC | EFFECT_PRESERVED, fn);
	}
	/**
	* @param {() => void | (() => void)} fn
	* @returns {Effect}
	*/
	function render_effect(fn, flags = 0) {
		return create_effect(8 | flags, fn);
	}
	/**
	* @param {(...expressions: any) => void | (() => void)} fn
	* @param {Array<() => any>} sync
	* @param {Array<() => Promise<any>>} async
	* @param {Blocker[]} blockers
	*/
	function template_effect(fn, sync = [], async = [], blockers = []) {
		flatten(blockers, sync, async, (values) => {
			create_effect(8, () => {
				fn(...values.map(get));
			});
		});
	}
	/**
	* @param {(() => void)} fn
	* @param {number} flags
	*/
	function block(fn, flags = 0) {
		return create_effect(16 | flags, fn);
	}
	/**
	* @param {(() => void)} fn
	*/
	function branch(fn) {
		return create_effect(32 | EFFECT_PRESERVED, fn);
	}
	/**
	* @param {Effect} effect
	*/
	function execute_effect_teardown(effect) {
		var teardown = effect.teardown;
		if (teardown !== null) {
			const previously_destroying_effect = is_destroying_effect;
			const previous_reaction = active_reaction;
			set_is_destroying_effect(true);
			set_active_reaction(null);
			try {
				teardown.call(null);
			} finally {
				set_is_destroying_effect(previously_destroying_effect);
				set_active_reaction(previous_reaction);
			}
		}
	}
	/**
	* @param {Effect} signal
	* @param {boolean} remove_dom
	* @returns {void}
	*/
	function destroy_effect_children(signal, remove_dom = false) {
		var effect = signal.first;
		signal.first = signal.last = null;
		while (effect !== null) {
			const controller = effect.ac;
			if (controller !== null) without_reactive_context(() => {
				controller.abort(STALE_REACTION);
			});
			var next = effect.next;
			if ((effect.f & 64) !== 0) effect.parent = null;
			else destroy_effect(effect, remove_dom);
			effect = next;
		}
	}
	/**
	* @param {Effect} signal
	* @returns {void}
	*/
	function destroy_block_effect_children(signal) {
		var effect = signal.first;
		while (effect !== null) {
			var next = effect.next;
			if ((effect.f & 32) === 0) destroy_effect(effect);
			effect = next;
		}
	}
	/**
	* @param {Effect} effect
	* @param {boolean} [remove_dom]
	* @returns {void}
	*/
	function destroy_effect(effect, remove_dom = true) {
		var removed = false;
		if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			removed = true;
		}
		effect.f |= DESTROYING;
		destroy_effect_children(effect, remove_dom && !removed);
		remove_reactions(effect, 0);
		var transitions = effect.nodes && effect.nodes.t;
		if (transitions !== null) for (const transition of transitions) transition.stop();
		execute_effect_teardown(effect);
		effect.f ^= DESTROYING;
		effect.f |= DESTROYED;
		var parent = effect.parent;
		if (parent !== null && parent.first !== null) unlink_effect(effect);
		effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
	}
	/**
	*
	* @param {TemplateNode | null} node
	* @param {TemplateNode} end
	*/
	function remove_effect_dom(node, end) {
		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
			node.remove();
			node = next;
		}
	}
	/**
	* Detach an effect from the effect tree, freeing up memory and
	* reducing the amount of work that happens on subsequent traversals
	* @param {Effect} effect
	*/
	function unlink_effect(effect) {
		var parent = effect.parent;
		var prev = effect.prev;
		var next = effect.next;
		if (prev !== null) prev.next = next;
		if (next !== null) next.prev = prev;
		if (parent !== null) {
			if (parent.first === effect) parent.first = next;
			if (parent.last === effect) parent.last = prev;
		}
	}
	/**
	* When a block effect is removed, we don't immediately destroy it or yank it
	* out of the DOM, because it might have transitions. Instead, we 'pause' it.
	* It stays around (in memory, and in the DOM) until outro transitions have
	* completed, and if the state change is reversed then we _resume_ it.
	* A paused effect does not update, and the DOM subtree becomes inert.
	* @param {Effect} effect
	* @param {() => void} [callback]
	* @param {boolean} [destroy]
	*/
	function pause_effect(effect, callback, destroy = true) {
		/** @type {TransitionManager[]} */
		var transitions = [];
		pause_children(effect, transitions, true);
		var fn = () => {
			if (destroy) destroy_effect(effect);
			if (callback) callback();
		};
		var remaining = transitions.length;
		if (remaining > 0) {
			var check = () => --remaining || fn();
			for (var transition of transitions) transition.out(check);
		} else fn();
	}
	/**
	* @param {Effect} effect
	* @param {TransitionManager[]} transitions
	* @param {boolean} local
	*/
	function pause_children(effect, transitions, local) {
		if ((effect.f & 8192) !== 0) return;
		effect.f ^= INERT;
		var t = effect.nodes && effect.nodes.t;
		if (t !== null) {
			for (const transition of t) if (transition.is_global || local) transitions.push(transition);
		}
		var child = effect.first;
		while (child !== null) {
			var sibling = child.next;
			if ((child.f & 64) === 0) {
				var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
				pause_children(child, transitions, transparent ? local : false);
			}
			child = sibling;
		}
	}
	/**
	* The opposite of `pause_effect`. We call this if (for example)
	* `x` becomes falsy then truthy: `{#if x}...{/if}`
	* @param {Effect} effect
	*/
	function resume_effect(effect) {
		resume_children(effect, true);
	}
	/**
	* @param {Effect} effect
	* @param {boolean} local
	*/
	function resume_children(effect, local) {
		if ((effect.f & 8192) === 0) return;
		effect.f ^= INERT;
		if ((effect.f & 1024) === 0) {
			set_signal_status(effect, DIRTY);
			Batch.ensure().schedule(effect);
		}
		var child = effect.first;
		while (child !== null) {
			var sibling = child.next;
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0;
			resume_children(child, transparent ? local : false);
			child = sibling;
		}
		var t = effect.nodes && effect.nodes.t;
		if (t !== null) {
			for (const transition of t) if (transition.is_global || local) transition.in();
		}
	}
	/**
	* @param {Effect} effect
	* @param {DocumentFragment} fragment
	*/
	function move_effect(effect, fragment) {
		if (!effect.nodes) return;
		/** @type {TemplateNode | null} */
		var node = effect.nodes.start;
		var end = effect.nodes.end;
		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
			fragment.append(node);
			node = next;
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/events.js
	/**
	* Used on elements, as a map of event type -> event handler,
	* and on events themselves to track which element handled an event
	*/
	var event_symbol = Symbol("events");
	/** @type {Set<string>} */
	var all_registered_events = /* @__PURE__ */ new Set();
	/** @type {Set<(events: Array<string>) => void>} */
	var root_event_handles = /* @__PURE__ */ new Set();
	/**
	* @param {string} event_name
	* @param {EventTarget} dom
	* @param {EventListener} [handler]
	* @param {AddEventListenerOptions} [options]
	*/
	function create_event(event_name, dom, handler, options = {}) {
		/**
		* @this {EventTarget}
		*/
		function target_handler(event) {
			if (!options.capture) handle_event_propagation.call(dom, event);
			if (!event.cancelBubble) return without_reactive_context(() => {
				return handler?.call(this, event);
			});
		}
		if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") queue_micro_task(() => {
			dom.addEventListener(event_name, target_handler, options);
		});
		else dom.addEventListener(event_name, target_handler, options);
		return target_handler;
	}
	/**
	* @param {string} event_name
	* @param {Element} dom
	* @param {EventListener} [handler]
	* @param {boolean} [capture]
	* @param {boolean} [passive]
	* @returns {void}
	*/
	function event(event_name, dom, handler, capture, passive) {
		var options = {
			capture,
			passive
		};
		var target_handler = create_event(event_name, dom, handler, options);
		if (dom === document.body || dom === window || dom === document || dom instanceof HTMLMediaElement) teardown(() => {
			dom.removeEventListener(event_name, target_handler, options);
		});
	}
	/**
	* @param {string} event_name
	* @param {Element} element
	* @param {EventListener} [handler]
	* @returns {void}
	*/
	function delegated(event_name, element, handler) {
		(element[event_symbol] ??= {})[event_name] = handler;
	}
	/**
	* @param {Array<string>} events
	* @returns {void}
	*/
	function delegate(events) {
		for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
		for (var fn of root_event_handles) fn(events);
	}
	var last_propagated_event = null;
	/**
	* @this {EventTarget}
	* @param {Event} event
	* @returns {void}
	*/
	function handle_event_propagation(event) {
		var handler_element = this;
		var owner_document = handler_element.ownerDocument;
		var event_name = event.type;
		var path = event.composedPath?.() || [];
		var current_target = path[0] || event.target;
		last_propagated_event = event;
		var path_idx = 0;
		var handled_at = last_propagated_event === event && event[event_symbol];
		if (handled_at) {
			var at_idx = path.indexOf(handled_at);
			if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
				event[event_symbol] = handler_element;
				return;
			}
			var handler_idx = path.indexOf(handler_element);
			if (handler_idx === -1) return;
			if (at_idx <= handler_idx) path_idx = at_idx;
		}
		current_target = path[path_idx] || event.target;
		if (current_target === handler_element) return;
		define_property(event, "currentTarget", {
			configurable: true,
			get() {
				return current_target || owner_document;
			}
		});
		var previous_reaction = active_reaction;
		var previous_effect = active_effect;
		set_active_reaction(null);
		set_active_effect(null);
		try {
			/**
			* @type {unknown}
			*/
			var throw_error;
			/**
			* @type {unknown[]}
			*/
			var other_errors = [];
			while (current_target !== null) {
				if (current_target === handler_element) break;
				try {
					var delegated = current_target[event_symbol]?.[event_name];
					if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
				} catch (error) {
					if (throw_error) other_errors.push(error);
					else throw_error = error;
				}
				if (event.cancelBubble) break;
				path_idx++;
				current_target = path_idx < path.length ? path[path_idx] : null;
			}
			if (throw_error) {
				for (let error of other_errors) queueMicrotask(() => {
					throw error;
				});
				throw throw_error;
			}
		} finally {
			event[event_symbol] = handler_element;
			delete event.currentTarget;
			set_active_reaction(previous_reaction);
			set_active_effect(previous_effect);
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/reconciler.js
	var policy = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { 
	/** @param {string} html */
createHTML: (html) => {
		return html;
	} });
	/** @param {string} html */
	function create_trusted_html(html) {
		return policy?.createHTML(html) ?? html;
	}
	/**
	* @param {string} html
	*/
	function create_fragment_from_html(html) {
		var elem = create_element("template");
		elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
		return elem.content;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/template.js
	/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { TemplateStructure } from './types' */
	/**
	* @param {TemplateNode} start
	* @param {TemplateNode | null} end
	*/
	function assign_nodes(start, end) {
		var effect = active_effect;
		if (effect.nodes === null) effect.nodes = {
			start,
			end,
			a: null,
			t: null
		};
	}
	/**
	* @param {string} content
	* @param {number} flags
	* @returns {() => Node | Node[]}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function from_html(content, flags) {
		var is_fragment = (flags & 1) !== 0;
		var use_import_node = (flags & 2) !== 0;
		/** @type {Node} */
		var node;
		/**
		* Whether or not the first item is a text/element node. If not, we need to
		* create an additional comment node to act as `effect.nodes.start`
		*/
		var has_start = !content.startsWith("<!>");
		return () => {
			if (hydrating) {
				assign_nodes(hydrate_node, null);
				return hydrate_node;
			}
			if (node === void 0) {
				node = create_fragment_from_html(has_start ? content : "<!>" + content);
				if (!is_fragment) node = /* @__PURE__ */ get_first_child(node);
			}
			var clone = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
			if (is_fragment) {
				var start = /* @__PURE__ */ get_first_child(clone);
				var end = clone.lastChild;
				assign_nodes(start, end);
			} else assign_nodes(clone, clone);
			return clone;
		};
	}
	/**
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @param {any} value
	*/
	function text(value = "") {
		if (!hydrating) {
			var t = create_text(value + "");
			assign_nodes(t, t);
			return t;
		}
		var node = hydrate_node;
		if (node.nodeType !== 3) {
			node.before(node = create_text());
			set_hydrate_node(node);
		} else merge_text_nodes(node);
		assign_nodes(node, node);
		return node;
	}
	/**
	* @returns {TemplateNode | DocumentFragment}
	*/
	function comment() {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		var frag = document.createDocumentFragment();
		var start = document.createComment("");
		var anchor = create_text();
		frag.append(start, anchor);
		assign_nodes(start, anchor);
		return frag;
	}
	/**
	* Assign the created (or in hydration mode, traversed) dom elements to the current block
	* and insert the elements into the dom (in client mode).
	* @param {Text | Comment | Element} anchor
	* @param {DocumentFragment | Element} dom
	*/
	function append(anchor, dom) {
		if (hydrating) {
			var effect = active_effect;
			if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
			hydrate_next();
			return;
		}
		if (anchor === null) return;
		anchor.before(dom);
	}
	/**
	* Subset of delegated events which should be passive by default.
	* These two are already passive via browser defaults on window, document and body.
	* But since
	* - we're delegating them
	* - they happen often
	* - they apply to mobile which is generally less performant
	* we're marking them as passive by default for other elements, too.
	*/
	var PASSIVE_EVENTS = ["touchstart", "touchmove"];
	/**
	* Returns `true` if `name` is a passive event
	* @param {string} name
	*/
	function is_passive_event(name) {
		return PASSIVE_EVENTS.includes(name);
	}
	/**
	* @param {Element} text
	* @param {string} value
	* @returns {void}
	*/
	function set_text(text, value) {
		var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
		if (str !== (text[TEXT_CACHE] ??= text.nodeValue)) {
			/** @type {any} */ text[TEXT_CACHE] = str;
			text.nodeValue = `${str}`;
		}
	}
	/**
	* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
	* Transitions will play during the initial render unless the `intro` option is set to `false`.
	*
	* @template {Record<string, any>} Props
	* @template {Record<string, any>} Exports
	* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
	* @param {MountOptions<Props>} options
	* @returns {Exports}
	*/
	function mount(component, options) {
		return _mount(component, options);
	}
	/**
	* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
	*
	* @template {Record<string, any>} Props
	* @template {Record<string, any>} Exports
	* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
	* @param {{} extends Props ? {
	* 		target: Document | Element | ShadowRoot;
	* 		props?: Props;
	* 		events?: Record<string, (e: any) => any>;
	*  	context?: Map<any, any>;
	* 		intro?: boolean;
	* 		recover?: boolean;
	*		transformError?: (error: unknown) => unknown;
	* 	} : {
	* 		target: Document | Element | ShadowRoot;
	* 		props: Props;
	* 		events?: Record<string, (e: any) => any>;
	*  	context?: Map<any, any>;
	* 		intro?: boolean;
	* 		recover?: boolean;
	*		transformError?: (error: unknown) => unknown;
	* 	}} options
	* @returns {Exports}
	*/
	function hydrate(component, options) {
		init_operations();
		options.intro = options.intro ?? false;
		const target = options.target;
		const was_hydrating = hydrating;
		const previous_hydrate_node = hydrate_node;
		try {
			var anchor = /* @__PURE__ */ get_first_child(target);
			while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
			if (!anchor) throw HYDRATION_ERROR;
			set_hydrating(true);
			set_hydrate_node(anchor);
			const instance = _mount(component, {
				...options,
				anchor
			});
			set_hydrating(false);
			return instance;
		} catch (error) {
			if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
			if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
			if (options.recover === false) hydration_failed();
			init_operations();
			clear_text_content(target);
			set_hydrating(false);
			return mount(component, options);
		} finally {
			set_hydrating(was_hydrating);
			set_hydrate_node(previous_hydrate_node);
		}
	}
	/** @type {Map<EventTarget, Map<string, number>>} */
	var listeners = /* @__PURE__ */ new Map();
	/**
	* @template {Record<string, any>} Exports
	* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
	* @param {MountOptions} options
	* @returns {Exports}
	*/
	function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
		init_operations();
		/** @type {Exports} */
		var component = void 0;
		var unmount = component_root(() => {
			var anchor_node = anchor ?? target.appendChild(create_text());
			boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
				push({});
				var ctx = component_context;
				if (context) ctx.c = context;
				if (events)
 /** @type {any} */ props.$$events = events;
				if (hydrating) assign_nodes(anchor_node, null);
				component = Component(anchor_node, props) || {};
				if (hydrating) {
					/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
					if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
						hydration_mismatch();
						throw HYDRATION_ERROR;
					}
				}
				pop();
			}, transformError);
			/** @type {Set<string>} */
			var registered_events = /* @__PURE__ */ new Set();
			/** @param {Array<string>} events */
			var event_handle = (events) => {
				for (var i = 0; i < events.length; i++) {
					var event_name = events[i];
					if (registered_events.has(event_name)) continue;
					registered_events.add(event_name);
					var passive = is_passive_event(event_name);
					for (const node of [target, document]) {
						var counts = listeners.get(node);
						if (counts === void 0) {
							counts = /* @__PURE__ */ new Map();
							listeners.set(node, counts);
						}
						var count = counts.get(event_name);
						if (count === void 0) {
							node.addEventListener(event_name, handle_event_propagation, { passive });
							counts.set(event_name, 1);
						} else counts.set(event_name, count + 1);
					}
				}
			};
			event_handle(array_from(all_registered_events));
			root_event_handles.add(event_handle);
			return () => {
				for (var event_name of registered_events) for (const node of [target, document]) {
					var counts = listeners.get(node);
					var count = counts.get(event_name);
					if (--count == 0) {
						node.removeEventListener(event_name, handle_event_propagation);
						counts.delete(event_name);
						if (counts.size === 0) listeners.delete(node);
					} else counts.set(event_name, count);
				}
				root_event_handles.delete(event_handle);
				if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
			};
		});
		mounted_components.set(component, unmount);
		return component;
	}
	/**
	* References of the components that were mounted or hydrated.
	* Uses a `WeakMap` to avoid memory leaks.
	*/
	var mounted_components = /* @__PURE__ */ new WeakMap();
	/**
	* Unmounts a component that was previously mounted using `mount` or `hydrate`.
	*
	* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
	*
	* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
	*
	* ```js
	* import { mount, unmount } from 'svelte';
	* import App from './App.svelte';
	*
	* const app = mount(App, { target: document.body });
	*
	* // later...
	* unmount(app, { outro: true });
	* ```
	* @param {Record<string, any>} component
	* @param {{ outro?: boolean }} [options]
	* @returns {Promise<void>}
	*/
	function unmount(component, options) {
		const fn = mounted_components.get(component);
		if (fn) {
			mounted_components.delete(component);
			return fn(options);
		}
		return Promise.resolve();
	}
	/**
	* Takes the component function and returns a Svelte 4 compatible component constructor.
	*
	* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
	*
	* @template {Record<string, any>} Props
	* @template {Record<string, any>} Exports
	* @template {Record<string, any>} Events
	* @template {Record<string, any>} Slots
	*
	* @param {SvelteComponent<Props, Events, Slots> | Component<Props>} component
	* @returns {ComponentType<SvelteComponent<Props, Events, Slots> & Exports>}
	*/
	function asClassComponent(component) {
		return class extends Svelte4Component {
			/** @param {any} options */
			constructor(options) {
				super({
					component,
					...options
				});
			}
		};
	}
	/**
	* Support using the component as both a class and function during the transition period
	* @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
	*/
	var Svelte4Component = class {
		/** @type {any} */
		#events;
		/** @type {Record<string, any>} */
		#instance;
		/**
		* @param {ComponentConstructorOptions & {
		*  component: any;
		* }} options
		*/
		constructor(options) {
			var sources = /* @__PURE__ */ new Map();
			/**
			* @param {string | symbol} key
			* @param {unknown} value
			*/
			var add_source = (key, value) => {
				var s = /* @__PURE__ */ mutable_source(value, false, false);
				sources.set(key, s);
				return s;
			};
			const props = new Proxy({
				...options.props || {},
				$$events: {}
			}, {
				get(target, prop) {
					return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
				},
				has(target, prop) {
					if (prop === LEGACY_PROPS) return true;
					get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
					return Reflect.has(target, prop);
				},
				set(target, prop, value) {
					set(sources.get(prop) ?? add_source(prop, value), value);
					return Reflect.set(target, prop, value);
				}
			});
			this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
				target: options.target,
				anchor: options.anchor,
				props,
				context: options.context,
				intro: options.intro ?? false,
				recover: options.recover,
				transformError: options.transformError
			});
			if (!async_mode_flag && (!options?.props?.$$host || options.sync === false)) flushSync();
			this.#events = props.$$events;
			for (const key of Object.keys(this.#instance)) {
				if (key === "$set" || key === "$destroy" || key === "$on") continue;
				define_property(this, key, {
					get() {
						return this.#instance[key];
					},
					/** @param {any} value */
					set(value) {
						this.#instance[key] = value;
					},
					enumerable: true
				});
			}
			this.#instance.$set = (next) => {
				Object.assign(props, next);
			};
			this.#instance.$destroy = () => {
				unmount(this.#instance);
			};
		}
		/** @param {Record<string, any>} props */
		$set(props) {
			this.#instance.$set(props);
		}
		/**
		* @param {string} event
		* @param {(...args: any[]) => any} callback
		* @returns {any}
		*/
		$on(event, callback) {
			this.#events[event] = this.#events[event] || [];
			/** @param {any[]} args */
			const cb = (...args) => callback.call(this, ...args);
			this.#events[event].push(cb);
			return () => {
				this.#events[event] = this.#events[event].filter(
					/** @param {any} fn */
					(fn) => fn !== cb
				);
			};
		}
		$destroy() {
			this.#instance.$destroy();
		}
	};
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/disclose-version.js
	if (typeof window !== "undefined") ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/branches.js
	/** @import { Effect, TemplateNode } from '#client' */
	/**
	* @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
	*/
	/**
	* @template Key
	*/
	var BranchManager = class {
		/** @type {TemplateNode} */
		anchor;
		/** @type {Map<Batch, Key>} */
		#batches = /* @__PURE__ */ new Map();
		/**
		* Map of keys to effects that are currently rendered in the DOM.
		* These effects are visible and actively part of the document tree.
		* Example:
		* ```
		* {#if condition}
		* 	foo
		* {:else}
		* 	bar
		* {/if}
		* ```
		* Can result in the entries `true->Effect` and `false->Effect`
		* @type {Map<Key, Effect>}
		*/
		#onscreen = /* @__PURE__ */ new Map();
		/**
		* Similar to #onscreen with respect to the keys, but contains branches that are not yet
		* in the DOM, because their insertion is deferred.
		* @type {Map<Key, Branch>}
		*/
		#offscreen = /* @__PURE__ */ new Map();
		/**
		* Keys of effects that are currently outroing
		* @type {Set<Key>}
		*/
		#outroing = /* @__PURE__ */ new Set();
		/**
		* Whether to pause (i.e. outro) on change, or destroy immediately.
		* This is necessary for `<svelte:element>`
		*/
		#transition = true;
		/**
		* @param {TemplateNode} anchor
		* @param {boolean} transition
		*/
		constructor(anchor, transition = true) {
			this.anchor = anchor;
			this.#transition = transition;
		}
		/**
		* @param {Batch} batch
		*/
		#commit = (batch) => {
			if (!this.#batches.has(batch)) return;
			var key = this.#batches.get(batch);
			var onscreen = this.#onscreen.get(key);
			if (onscreen) {
				resume_effect(onscreen);
				this.#outroing.delete(key);
			} else {
				var offscreen = this.#offscreen.get(key);
				if (offscreen) {
					resume_effect(offscreen.effect);
					this.#onscreen.set(key, offscreen.effect);
					this.#offscreen.delete(key);
					/** @type {TemplateNode} */ offscreen.fragment.lastChild.remove();
					this.anchor.before(offscreen.fragment);
					onscreen = offscreen.effect;
				}
			}
			for (const [b, k] of this.#batches) {
				this.#batches.delete(b);
				if (b === batch) break;
				const offscreen = this.#offscreen.get(k);
				if (offscreen) {
					destroy_effect(offscreen.effect);
					this.#offscreen.delete(k);
				}
			}
			for (const [k, effect] of this.#onscreen) {
				if (k === key || this.#outroing.has(k)) continue;
				const on_destroy = () => {
					if (Array.from(this.#batches.values()).includes(k)) {
						var fragment = document.createDocumentFragment();
						move_effect(effect, fragment);
						fragment.append(create_text());
						this.#offscreen.set(k, {
							effect,
							fragment
						});
					} else destroy_effect(effect);
					this.#outroing.delete(k);
					this.#onscreen.delete(k);
				};
				if (this.#transition || !onscreen) {
					this.#outroing.add(k);
					pause_effect(effect, on_destroy, false);
				} else on_destroy();
			}
		};
		/**
		* @param {Batch} batch
		*/
		#discard = (batch) => {
			this.#batches.delete(batch);
			const keys = Array.from(this.#batches.values());
			for (const [k, branch] of this.#offscreen) if (!keys.includes(k)) {
				destroy_effect(branch.effect);
				this.#offscreen.delete(k);
			}
		};
		/**
		*
		* @param {any} key
		* @param {null | ((target: TemplateNode) => void)} fn
		*/
		ensure(key, fn) {
			var batch = current_batch;
			var defer = should_defer_append();
			if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
				if (defer) {
					var fragment = document.createDocumentFragment();
					var target = create_text();
					fragment.append(target);
					this.#offscreen.set(key, {
						effect: branch(() => fn(target)),
						fragment
					});
				} else this.#onscreen.set(key, branch(() => fn(this.anchor)));
			}
			this.#batches.set(batch, key);
			if (defer) {
				for (const [k, effect] of this.#onscreen) if (k === key) batch.unskip_effect(effect);
				else batch.skip_effect(effect);
				for (const [k, branch] of this.#offscreen) if (k === key) batch.unskip_effect(branch.effect);
				else batch.skip_effect(branch.effect);
				batch.oncommit(this.#commit);
				batch.ondiscard(this.#discard);
			} else {
				if (hydrating) this.anchor = hydrate_node;
				this.#commit(batch);
			}
		}
	};
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/snippet.js
	/** @import { Snippet } from 'svelte' */
	/** @import { TemplateNode } from '#client' */
	/** @import { Getters } from '#shared' */
	/**
	* @template {(node: TemplateNode, ...args: any[]) => void} SnippetFn
	* @param {TemplateNode} node
	* @param {() => SnippetFn | null | undefined} get_snippet
	* @param {(() => any)[]} args
	* @returns {void}
	*/
	function snippet(node, get_snippet, ...args) {
		var branches = new BranchManager(node);
		block(() => {
			const snippet = get_snippet() ?? null;
			branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
		}, EFFECT_TRANSPARENT);
	}
	/**
	* `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
	* Unlike `$effect`, the provided function only runs once.
	*
	* It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
	* it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
	* it will be called when the component is unmounted.
	*
	* `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
	*
	* @template T
	* @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
	* @returns {void}
	*/
	function onMount(fn) {
		if (component_context === null) lifecycle_outside_component("onMount");
		if (legacy_mode_flag && component_context.l !== null) init_update_callbacks(component_context).m.push(fn);
		else user_effect(() => {
			const cleanup = untrack(fn);
			if (typeof cleanup === "function") return cleanup;
		});
	}
	/**
	* Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
	* @param {ComponentContext} context
	*/
	function init_update_callbacks(context) {
		var l = context.l;
		return l.u ??= {
			a: [],
			b: [],
			m: []
		};
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/if.js
	/** @import { TemplateNode } from '#client' */
	/**
	* @param {TemplateNode} node
	* @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
	* @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
	* @returns {void}
	*/
	function if_block(node, fn, elseif = false) {
		/** @type {TemplateNode | undefined} */
		var marker;
		if (hydrating) {
			marker = hydrate_node;
			hydrate_next();
		}
		var branches = new BranchManager(node);
		var flags = elseif ? EFFECT_TRANSPARENT : 0;
		/**
		* @param {number | false} key
		* @param {null | ((anchor: Node) => void)} fn
		*/
		function update_branch(key, fn) {
			if (hydrating) {
				var data = read_hydration_instruction(marker);
				if (key !== parseInt(data.substring(1))) {
					var anchor = skip_nodes();
					set_hydrate_node(anchor);
					branches.anchor = anchor;
					set_hydrating(false);
					branches.ensure(key, fn);
					set_hydrating(true);
					return;
				}
			}
			branches.ensure(key, fn);
		}
		block(() => {
			var has_branch = false;
			fn((fn, key = 0) => {
				has_branch = true;
				update_branch(key, fn);
			});
			if (!has_branch) update_branch(-1, null);
		}, flags);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/each.js
	/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
	/** @import { Batch } from '../../reactivity/batch.js'; */
	/**
	* @param {any} _
	* @param {number} i
	*/
	function index(_, i) {
		return i;
	}
	/**
	* Pause multiple effects simultaneously, and coordinate their
	* subsequent destruction. Used in each blocks
	* @param {EachState} state
	* @param {Effect[]} to_destroy
	* @param {null | Node} controlled_anchor
	*/
	function pause_effects(state, to_destroy, controlled_anchor) {
		/** @type {TransitionManager[]} */
		var transitions = [];
		var length = to_destroy.length;
		/** @type {EachOutroGroup} */
		var group;
		var remaining = to_destroy.length;
		for (var i = 0; i < length; i++) {
			let effect = to_destroy[i];
			pause_effect(effect, () => {
				if (group) {
					group.pending.delete(effect);
					group.done.add(effect);
					if (group.pending.size === 0) {
						var groups = state.outrogroups;
						destroy_effects(state, array_from(group.done));
						groups.delete(group);
						if (groups.size === 0) state.outrogroups = null;
					}
				} else remaining -= 1;
			}, false);
		}
		if (remaining === 0) {
			var fast_path = transitions.length === 0 && controlled_anchor !== null && state.pending.size === 0;
			if (fast_path) {
				var anchor = controlled_anchor;
				var parent_node = anchor.parentNode;
				clear_text_content(parent_node);
				parent_node.append(anchor);
				state.items.clear();
			}
			destroy_effects(state, to_destroy, !fast_path);
		} else {
			group = {
				pending: new Set(to_destroy),
				done: /* @__PURE__ */ new Set()
			};
			(state.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
		}
	}
	/**
	* @param {EachState} state
	* @param {Effect[]} to_destroy
	* @param {boolean} remove_dom
	*/
	function destroy_effects(state, to_destroy, remove_dom = true) {
		/** @type {Set<Effect> | undefined} */
		var preserved_effects;
		if (state.pending.size > 0) {
			preserved_effects = /* @__PURE__ */ new Set();
			for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(
				/** @type {EachItem} */
				state.items.get(key).e
			);
		}
		for (var i = 0; i < to_destroy.length; i++) {
			var e = to_destroy[i];
			if (preserved_effects?.has(e)) {
				e.f |= EFFECT_OFFSCREEN;
				move_effect(e, document.createDocumentFragment());
			} else destroy_effect(to_destroy[i], remove_dom);
		}
	}
	/** @type {TemplateNode} */
	var offscreen_anchor;
	/**
	* @template V
	* @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
	* @param {number} flags
	* @param {() => V[]} get_collection
	* @param {(value: V, index: number) => any} get_key
	* @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
	* @param {null | ((anchor: Node) => void)} fallback_fn
	* @returns {void}
	*/
	function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
		var anchor = node;
		/** @type {Map<any, EachItem>} */
		var items = /* @__PURE__ */ new Map();
		if ((flags & 4) !== 0) {
			var parent_node = node;
			anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
		}
		if (hydrating) hydrate_next();
		/** @type {Effect | null} */
		var fallback = null;
		var each_array = /* @__PURE__ */ derived_safe_equal(() => {
			var collection = get_collection();
			return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
		});
		/** @type {V[]} */
		var array;
		/** @type {Map<Batch, Set<any>>} */
		var pending = /* @__PURE__ */ new Map();
		var first_run = true;
		/**
		* @param {Batch} batch
		*/
		function commit(batch) {
			if ((state.effect.f & 16384) !== 0) return;
			state.pending.delete(batch);
			state.fallback = fallback;
			reconcile(state, array, anchor, flags, get_key);
			if (fallback !== null) {
				if (array.length === 0) {
					if ((fallback.f & 33554432) === 0) resume_effect(fallback);
					else {
						fallback.f ^= EFFECT_OFFSCREEN;
						move(fallback, null, anchor);
					}
				} else pause_effect(fallback, () => {
					fallback = null;
				});
			}
		}
		/**
		* @param {Batch} batch
		*/
		function discard(batch) {
			state.pending.delete(batch);
		}
		/** @type {EachState} */
		var state = {
			effect: block(() => {
				array = get(each_array);
				var length = array.length;
				/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
				let mismatch = false;
				if (hydrating) {
					if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
						anchor = skip_nodes();
						set_hydrate_node(anchor);
						set_hydrating(false);
						mismatch = true;
					}
				}
				var keys = /* @__PURE__ */ new Set();
				var batch = current_batch;
				var defer = should_defer_append();
				for (var index = 0; index < length; index += 1) {
					if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
						anchor = hydrate_node;
						mismatch = true;
						set_hydrating(false);
					}
					var value = array[index];
					var key = get_key(value, index);
					var item = first_run ? null : items.get(key);
					if (item) {
						if (item.v) internal_set(item.v, value);
						if (item.i) internal_set(item.i, index);
						if (defer) batch.unskip_effect(item.e);
					} else {
						item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key, index, render_fn, flags, get_collection);
						if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
						items.set(key, item);
					}
					keys.add(key);
				}
				if (length === 0 && fallback_fn && !fallback) {
					if (first_run) fallback = branch(() => fallback_fn(anchor));
					else {
						fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
						fallback.f |= EFFECT_OFFSCREEN;
					}
				}
				if (length > keys.size) each_key_duplicate("", "", "");
				if (hydrating && length > 0) set_hydrate_node(skip_nodes());
				if (!first_run) {
					pending.set(batch, keys);
					if (defer) {
						for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
						batch.oncommit(commit);
						batch.ondiscard(discard);
					} else commit(batch);
				}
				if (mismatch) set_hydrating(true);
				get(each_array);
			}),
			flags,
			items,
			pending,
			outrogroups: null,
			fallback
		};
		first_run = false;
		if (hydrating) anchor = hydrate_node;
	}
	/**
	* Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
	* @param {Effect | null} effect
	* @returns {Effect | null}
	*/
	function skip_to_branch(effect) {
		while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
		return effect;
	}
	/**
	* Add, remove, or reorder items output by an each block as its input changes
	* @template V
	* @param {EachState} state
	* @param {Array<V>} array
	* @param {Element | Comment | Text} anchor
	* @param {number} flags
	* @param {(value: V, index: number) => any} get_key
	* @returns {void}
	*/
	function reconcile(state, array, anchor, flags, get_key) {
		var is_animated = (flags & 8) !== 0;
		var length = array.length;
		var items = state.items;
		var current = skip_to_branch(state.effect.first);
		/** @type {undefined | Set<Effect>} */
		var seen;
		/** @type {Effect | null} */
		var prev = null;
		/** @type {undefined | Set<Effect>} */
		var to_animate;
		/** @type {Effect[]} */
		var matched = [];
		/** @type {Effect[]} */
		var stashed = [];
		/** @type {V} */
		var value;
		/** @type {any} */
		var key;
		/** @type {Effect | undefined} */
		var effect;
		/** @type {number} */
		var i;
		if (is_animated) for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = items.get(key).e;
			if ((effect.f & 33554432) === 0) {
				effect.nodes?.a?.measure();
				(to_animate ??= /* @__PURE__ */ new Set()).add(effect);
			}
		}
		for (i = 0; i < length; i += 1) {
			value = array[i];
			key = get_key(value, i);
			effect = items.get(key).e;
			if (state.outrogroups !== null) for (const group of state.outrogroups) {
				group.pending.delete(effect);
				group.done.delete(effect);
			}
			if ((effect.f & 8192) !== 0) {
				resume_effect(effect);
				if (is_animated) {
					effect.nodes?.a?.unfix();
					(to_animate ??= /* @__PURE__ */ new Set()).delete(effect);
				}
			}
			if ((effect.f & 33554432) !== 0) {
				effect.f ^= EFFECT_OFFSCREEN;
				if (effect === current) move(effect, null, anchor);
				else {
					var next = prev ? prev.next : current;
					if (effect === state.effect.last) state.effect.last = effect.prev;
					if (effect.prev) effect.prev.next = effect.next;
					if (effect.next) effect.next.prev = effect.prev;
					link(state, prev, effect);
					link(state, effect, next);
					move(effect, next, anchor);
					prev = effect;
					matched = [];
					stashed = [];
					current = skip_to_branch(prev.next);
					continue;
				}
			}
			if (effect !== current) {
				if (seen !== void 0 && seen.has(effect)) {
					if (matched.length < stashed.length) {
						var start = stashed[0];
						var j;
						prev = start.prev;
						var a = matched[0];
						var b = matched[matched.length - 1];
						for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
						for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
						link(state, a.prev, b.next);
						link(state, prev, a);
						link(state, b, start);
						current = start;
						prev = b;
						i -= 1;
						matched = [];
						stashed = [];
					} else {
						seen.delete(effect);
						move(effect, current, anchor);
						link(state, effect.prev, effect.next);
						link(state, effect, prev === null ? state.effect.first : prev.next);
						link(state, prev, effect);
						prev = effect;
					}
					continue;
				}
				matched = [];
				stashed = [];
				while (current !== null && current !== effect) {
					(seen ??= /* @__PURE__ */ new Set()).add(current);
					stashed.push(current);
					current = skip_to_branch(current.next);
				}
				if (current === null) continue;
			}
			if ((effect.f & 33554432) === 0) matched.push(effect);
			prev = effect;
			current = skip_to_branch(effect.next);
		}
		if (state.outrogroups !== null) {
			for (const group of state.outrogroups) if (group.pending.size === 0) {
				destroy_effects(state, array_from(group.done));
				state.outrogroups?.delete(group);
			}
			if (state.outrogroups.size === 0) state.outrogroups = null;
		}
		if (current !== null || seen !== void 0) {
			/** @type {Effect[]} */
			var to_destroy = [];
			if (seen !== void 0) {
				for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
			}
			while (current !== null) {
				if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
				current = skip_to_branch(current.next);
			}
			var destroy_length = to_destroy.length;
			if (destroy_length > 0) {
				var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
				if (is_animated) {
					for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
					for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
				}
				pause_effects(state, to_destroy, controlled_anchor);
			}
		}
		if (is_animated) queue_micro_task(() => {
			if (to_animate === void 0) return;
			for (effect of to_animate) effect.nodes?.a?.apply();
		});
	}
	/**
	* @template V
	* @param {Map<any, EachItem>} items
	* @param {Node} anchor
	* @param {V} value
	* @param {unknown} key
	* @param {number} index
	* @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
	* @param {number} flags
	* @param {() => V[]} get_collection
	* @returns {EachItem}
	*/
	function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
		var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
		var i = (flags & 2) !== 0 ? source(index) : null;
		return {
			v,
			i,
			e: branch(() => {
				render_fn(anchor, v ?? value, i ?? index, get_collection);
				return () => {
					items.delete(key);
				};
			})
		};
	}
	/**
	* @param {Effect} effect
	* @param {Effect | null} next
	* @param {Text | Element | Comment} anchor
	*/
	function move(effect, next, anchor) {
		if (!effect.nodes) return;
		var node = effect.nodes.start;
		var end = effect.nodes.end;
		var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
		while (node !== null) {
			var next_node = /* @__PURE__ */ get_next_sibling(node);
			dest.before(node);
			if (node === end) return;
			node = next_node;
		}
	}
	/**
	* @param {EachState} state
	* @param {Effect | null} prev
	* @param {Effect | null} next
	*/
	function link(state, prev, next) {
		if (prev === null) state.effect.first = next;
		else prev.next = next;
		if (next === null) state.effect.last = prev;
		else next.prev = prev;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
	/** @import { TemplateNode, Dom } from '#client' */
	/**
	* @template P
	* @template {(props: P) => void} C
	* @param {TemplateNode} node
	* @param {() => C} get_component
	* @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
	* @returns {void}
	*/
	function component(node, get_component, render_fn) {
		/** @type {TemplateNode | undefined} */
		var hydration_start_node;
		if (hydrating) {
			hydration_start_node = hydrate_node;
			hydrate_next();
		}
		var branches = new BranchManager(node);
		block(() => {
			var component = get_component() ?? null;
			if (hydrating) {
				if (read_hydration_instruction(hydration_start_node) === "[" !== (component !== null)) {
					var anchor = skip_nodes();
					set_hydrate_node(anchor);
					branches.anchor = anchor;
					set_hydrating(false);
					branches.ensure(component, component && ((target) => render_fn(target, component)));
					set_hydrating(true);
					return;
				}
			}
			branches.ensure(component, component && ((target) => render_fn(target, component)));
		}, EFFECT_TRANSPARENT);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/attributes.js
	var whitespace = [..." 	\n\r\f\xA0\v﻿"];
	/**
	* @param {any} value
	* @param {string | null} [hash]
	* @param {Record<string, boolean>} [directives]
	* @returns {string | null}
	*/
	function to_class(value, hash, directives) {
		var classname = value == null ? "" : "" + value;
		if (hash) classname = classname ? classname + " " + hash : hash;
		if (directives) {
			for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
			else if (classname.length) {
				var len = key.length;
				var a = 0;
				while ((a = classname.indexOf(key, a)) >= 0) {
					var b = a + len;
					if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
					else a = b;
				}
			}
		}
		return classname === "" ? null : classname;
	}
	/**
	*
	* @param {Record<string,any>} styles
	* @param {boolean} important
	*/
	function append_styles(styles, important = false) {
		var separator = important ? " !important;" : ";";
		var css = "";
		for (var key of Object.keys(styles)) {
			var value = styles[key];
			if (value != null && value !== "") css += " " + key + ": " + value + separator;
		}
		return css;
	}
	/**
	* @param {string} name
	* @returns {string}
	*/
	function to_css_name(name) {
		if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
		return name;
	}
	/**
	* @param {any} value
	* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
	* @returns {string | null}
	*/
	function to_style(value, styles) {
		if (styles) {
			var new_style = "";
			/** @type {Record<string,any> | undefined} */
			var normal_styles;
			/** @type {Record<string,any> | undefined} */
			var important_styles;
			if (Array.isArray(styles)) {
				normal_styles = styles[0];
				important_styles = styles[1];
			} else normal_styles = styles;
			if (value) {
				value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
				/** @type {boolean | '"' | "'"} */
				var in_str = false;
				var in_apo = 0;
				var in_comment = false;
				var reserved_names = [];
				if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
				if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
				var start_index = 0;
				var name_index = -1;
				const len = value.length;
				for (var i = 0; i < len; i++) {
					var c = value[i];
					if (in_comment) {
						if (c === "/" && value[i - 1] === "*") in_comment = false;
					} else if (in_str) {
						if (in_str === c) in_str = false;
					} else if (c === "/" && value[i + 1] === "*") in_comment = true;
					else if (c === "\"" || c === "'") in_str = c;
					else if (c === "(") in_apo++;
					else if (c === ")") in_apo--;
					if (!in_comment && in_str === false && in_apo === 0) {
						if (c === ":" && name_index === -1) name_index = i;
						else if (c === ";" || i === len - 1) {
							if (name_index !== -1) {
								var name = to_css_name(value.substring(start_index, name_index).trim());
								if (!reserved_names.includes(name)) {
									if (c !== ";") i++;
									var property = value.substring(start_index, i).trim();
									new_style += " " + property + ";";
								}
							}
							start_index = i + 1;
							name_index = -1;
						}
					}
				}
			}
			if (normal_styles) new_style += append_styles(normal_styles);
			if (important_styles) new_style += append_styles(important_styles, true);
			new_style = new_style.trim();
			return new_style === "" ? null : new_style;
		}
		return value == null ? null : String(value);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/class.js
	/**
	* @param {Element} dom
	* @param {boolean | number} is_html
	* @param {string | null} value
	* @param {string} [hash]
	* @param {Record<string, any>} [prev_classes]
	* @param {Record<string, any>} [next_classes]
	* @returns {Record<string, boolean> | undefined}
	*/
	function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
		var prev = dom[CLASS_CACHE];
		if (hydrating || prev !== value || prev === void 0) {
			var next_class_name = to_class(value, hash, next_classes);
			if (!hydrating || next_class_name !== dom.getAttribute("class")) {
				if (next_class_name == null) dom.removeAttribute("class");
				else if (is_html) dom.className = next_class_name;
				else dom.setAttribute("class", next_class_name);
			}
			/** @type {any} */ dom[CLASS_CACHE] = value;
		} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
			var is_present = !!next_classes[key];
			if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
		}
		return next_classes;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/style.js
	/**
	* @param {Element & ElementCSSInlineStyle} dom
	* @param {Record<string, any>} prev
	* @param {Record<string, any>} next
	* @param {string} [priority]
	*/
	function update_styles(dom, prev = {}, next, priority) {
		for (var key in next) {
			var value = next[key];
			if (prev[key] !== value) {
				if (next[key] == null) dom.style.removeProperty(key);
				else dom.style.setProperty(key, value, priority);
			}
		}
	}
	/**
	* @param {Element & ElementCSSInlineStyle} dom
	* @param {string | null} value
	* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
	* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
	*/
	function set_style(dom, value, prev_styles, next_styles) {
		var prev = dom[STYLE_CACHE];
		if (hydrating || prev !== value) {
			var next_style_attr = to_style(value, next_styles);
			if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
				if (next_style_attr == null) dom.removeAttribute("style");
				else dom.style.cssText = next_style_attr;
			}
			/** @type {any} */ dom[STYLE_CACHE] = value;
		} else if (next_styles) {
			if (Array.isArray(next_styles)) {
				update_styles(dom, prev_styles?.[0], next_styles[0]);
				update_styles(dom, prev_styles?.[1], next_styles[1], "important");
			} else update_styles(dom, prev_styles, next_styles);
		}
		return next_styles;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/attributes.js
	/** @import { Blocker, Effect } from '#client' */
	var IS_CUSTOM_ELEMENT = Symbol("is custom element");
	var IS_HTML = Symbol("is html");
	var LINK_TAG = IS_XHTML ? "link" : "LINK";
	/**
	* @param {Element} element
	* @param {string} attribute
	* @param {string | null} value
	* @param {boolean} [skip_warning]
	*/
	function set_attribute(element, attribute, value, skip_warning) {
		var attributes = get_attributes(element);
		if (hydrating) {
			attributes[attribute] = element.getAttribute(attribute);
			if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
				if (!skip_warning);
				return;
			}
		}
		if (attributes[attribute] === (attributes[attribute] = value)) return;
		if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
		if (value == null) element.removeAttribute(attribute);
		else if (typeof value !== "string" && get_setters(element).includes(attribute)) element[attribute] = value;
		else element.setAttribute(attribute, value);
	}
	/**
	*
	* @param {Element} element
	*/
	function get_attributes(element) {
		return element[ATTRIBUTES_CACHE] ??= {
			[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
			[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
		};
	}
	/** @type {Map<string, string[]>} */
	var setters_cache = /* @__PURE__ */ new Map();
	/** @param {Element} element */
	function get_setters(element) {
		var cache_key = element.getAttribute("is") || element.nodeName;
		var setters = setters_cache.get(cache_key);
		if (setters) return setters;
		setters_cache.set(cache_key, setters = []);
		var descriptors;
		var proto = element;
		var element_proto = Element.prototype;
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);
			for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.push(key);
			proto = get_prototype_of(proto);
		}
		return setters;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
	/** @import { ComponentContext, Effect } from '#client' */
	/**
	* @param {any} bound_value
	* @param {Element} element_or_component
	* @returns {boolean}
	*/
	function is_bound_this(bound_value, element_or_component) {
		return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
	}
	/**
	* @param {any} element_or_component
	* @param {(value: unknown, ...parts: unknown[]) => void} update
	* @param {(...parts: unknown[]) => unknown} get_value
	* @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
	* 										returns all the parts of the each block context that are used in the expression
	* @returns {void}
	*/
	function bind_this(element_or_component = {}, update, get_value, get_parts) {
		var component_effect = component_context.r;
		var parent = active_effect;
		effect(() => {
			/** @type {unknown[]} */
			var old_parts;
			/** @type {unknown[]} */
			var parts;
			render_effect(() => {
				old_parts = parts;
				parts = get_parts?.() || [];
				untrack(() => {
					if (!is_bound_this(get_value(...parts), element_or_component)) {
						update(element_or_component, ...parts);
						if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update(null, ...old_parts);
					}
				});
			});
			return () => {
				let p = parent;
				while (p !== component_effect && p.parent !== null && p.parent.f & 33554432) p = p.parent;
				const teardown = () => {
					if (parts && is_bound_this(get_value(...parts), element_or_component)) update(null, ...parts);
				};
				const original_teardown = p.teardown;
				p.teardown = () => {
					teardown();
					original_teardown?.();
				};
			};
		});
		return element_or_component;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/props.js
	/** @import { Derived, Effect, Source } from './types.js' */
	/**
	* The proxy handler for rest props (i.e. `const { x, ...rest } = $props()`).
	* Is passed the full `$$props` object and excludes the named props.
	* @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Set<string | symbol>, name?: string }>}}
	*/
	var rest_props_handler = {
		get(target, key) {
			if (target.exclude.has(key)) return;
			return target.props[key];
		},
		set(target, key) {
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			if (target.exclude.has(key)) return;
			if (key in target.props) return {
				enumerable: true,
				configurable: true,
				value: target.props[key]
			};
		},
		has(target, key) {
			if (target.exclude.has(key)) return false;
			return key in target.props;
		},
		ownKeys(target) {
			return Reflect.ownKeys(target.props).filter((key) => !target.exclude.has(key));
		}
	};
	/**
	* @param {Record<string, unknown>} props
	* @param {Set<string>} exclude
	* @param {string} [name]
	* @returns {Record<string, unknown>}
	*/
	/*#__NO_SIDE_EFFECTS__*/
	function rest_props(props, exclude, name) {
		return new Proxy({
			props,
			exclude
		}, rest_props_handler);
	}
	/**
	* The proxy handler for spread props. Handles the incoming array of props
	* that looks like `() => { dynamic: props }, { static: prop }, ..` and wraps
	* them so that the whole thing is passed to the component as the `$$props` argument.
	* @type {ProxyHandler<{ props: Array<Record<string | symbol, unknown> | (() => Record<string | symbol, unknown>)> }>}}
	*/
	var spread_props_handler = {
		get(target, key) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				if (typeof p === "object" && p !== null && key in p) return p[key];
			}
		},
		set(target, key, value) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				const desc = get_descriptor(p, key);
				if (desc && desc.set) {
					desc.set(value);
					return true;
				}
			}
			return false;
		},
		getOwnPropertyDescriptor(target, key) {
			let i = target.props.length;
			while (i--) {
				let p = target.props[i];
				if (is_function(p)) p = p();
				if (typeof p === "object" && p !== null && key in p) {
					const descriptor = get_descriptor(p, key);
					if (descriptor && !descriptor.configurable) descriptor.configurable = true;
					return descriptor;
				}
			}
		},
		has(target, key) {
			if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;
			for (let p of target.props) {
				if (is_function(p)) p = p();
				if (p != null && key in p) return true;
			}
			return false;
		},
		ownKeys(target) {
			/** @type {Array<string | symbol>} */
			const keys = [];
			for (let p of target.props) {
				if (is_function(p)) p = p();
				if (!p) continue;
				for (const key in p) if (!keys.includes(key)) keys.push(key);
				for (const key of Object.getOwnPropertySymbols(p)) if (!keys.includes(key)) keys.push(key);
			}
			return keys;
		}
	};
	/**
	* @param {Array<Record<string, unknown> | (() => Record<string, unknown>)>} props
	* @returns {any}
	*/
	function spread_props(...props) {
		return new Proxy({ props }, spread_props_handler);
	}
	/**
	* This function is responsible for synchronizing a possibly bound prop with the inner component state.
	* It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
	* @template V
	* @param {Record<string, unknown>} props
	* @param {string} key
	* @param {number} flags
	* @param {V | (() => V)} [fallback]
	* @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
	*/
	function prop(props, key, flags, fallback) {
		var runes = !legacy_mode_flag || (flags & 2) !== 0;
		var bindable = (flags & 8) !== 0;
		var lazy = (flags & 16) !== 0;
		var fallback_value = fallback;
		var fallback_dirty = true;
		var fallback_signal = void 0;
		var get_fallback = () => {
			if (lazy && runes) {
				fallback_signal ??= /* @__PURE__ */ derived(fallback);
				return get(fallback_signal);
			}
			if (fallback_dirty) {
				fallback_dirty = false;
				fallback_value = lazy ? untrack(fallback) : fallback;
			}
			return fallback_value;
		};
		/** @type {((v: V) => void) | undefined} */
		let setter;
		if (bindable) {
			var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
			setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
		}
		/** @type {V} */
		var initial_value;
		var is_store_sub = false;
		if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
		else initial_value = props[key];
		if (initial_value === void 0 && fallback !== void 0) {
			initial_value = get_fallback();
			if (setter) {
				if (runes) props_invalid_value(key);
				setter(initial_value);
			}
		}
		/** @type {() => V} */
		var getter;
		if (runes) getter = () => {
			var value = props[key];
			if (value === void 0) return get_fallback();
			fallback_dirty = true;
			return value;
		};
		else getter = () => {
			var value = props[key];
			if (value !== void 0) fallback_value = void 0;
			return value === void 0 ? fallback_value : value;
		};
		if (runes && (flags & 4) === 0) return getter;
		if (setter) {
			var legacy_parent = props.$$legacy;
			return (function(value, mutation) {
				if (arguments.length > 0) {
					if (!runes || !mutation || legacy_parent || is_store_sub)
 /** @type {Function} */ setter(mutation ? getter() : value);
					return value;
				}
				return getter();
			});
		}
		var overridden = false;
		var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
			overridden = false;
			return getter();
		});
		if (bindable) get(d);
		var parent_effect = active_effect;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
				set(d, new_value);
				overridden = true;
				if (fallback_value !== void 0) fallback_value = new_value;
				return value;
			}
			if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
			return get(d);
		});
	}
	if (typeof HTMLElement === "function");
	//#endregion
	//#region ../../node_modules/.pnpm/svelte@5.56.9_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/map.js
	/** @import { Source } from '#client' */
	/**
	* A reactive version of the built-in [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.
	* Reading contents of the map (by iterating, or by reading `map.size` or calling `map.get(...)` or `map.has(...)` as in the [tic-tac-toe example](https://svelte.dev/playground/0b0ff4aa49c9443f9b47fe5203c78293) below) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
	* will cause it to be re-evaluated as necessary when the map is updated.
	*
	* Note that values in a reactive map are _not_ made [deeply reactive](https://svelte.dev/docs/svelte/$state#Deep-state).
	*
	* ```svelte
	* <script>
	* 	import { SvelteMap } from 'svelte/reactivity';
	* 	import { result } from './game.js';
	*
	* 	let board = new SvelteMap();
	* 	let player = $state('x');
	* 	let winner = $derived(result(board));
	*
	* 	function reset() {
	* 		player = 'x';
	* 		board.clear();
	* 	}
	* <\/script>
	*
	* <div class="board">
	* 	{#each Array(9), i}
	* 		<button
	* 			disabled={board.has(i) || winner}
	* 			onclick={() => {
	* 				board.set(i, player);
	* 				player = player === 'x' ? 'o' : 'x';
	* 			}}
	* 		>{board.get(i)}</button>
	* 	{/each}
	* </div>
	*
	* {#if winner}
	* 	<p>{winner} wins!</p>
	* 	<button onclick={reset}>reset</button>
	* {:else}
	* 	<p>{player} is next</p>
	* {/if}
	* ```
	*
	* @template K
	* @template V
	* @extends {Map<K, V>}
	*/
	var SvelteMap = class extends Map {
		/** @type {Map<K, Source<number>>} */
		#sources = /* @__PURE__ */ new Map();
		#version = /* @__PURE__ */ state(0);
		#size = /* @__PURE__ */ state(0);
		#update_version = update_version || -1;
		/**
		* @param {Iterable<readonly [K, V]> | null | undefined} [value]
		*/
		constructor(value) {
			super();
			if (value) {
				for (var [key, v] of value) super.set(key, v);
				this.#size.v = super.size;
			}
		}
		/**
		* If the source is being created inside the same reaction as the SvelteMap instance,
		* we use `state` so that it will not be a dependency of the reaction. Otherwise we
		* use `source` so it will be.
		*
		* @template T
		* @param {T} value
		* @returns {Source<T>}
		*/
		#source(value) {
			return update_version === this.#update_version ? /* @__PURE__ */ state(value) : source(value);
		}
		/** @param {K} key */
		has(key) {
			var sources = this.#sources;
			var s = sources.get(key);
			if (s === void 0) {
				if (super.has(key)) {
					s = this.#source(0);
					sources.set(key, s);
				} else {
					get(this.#version);
					return false;
				}
			}
			get(s);
			return true;
		}
		/**
		* @param {(value: V, key: K, map: Map<K, V>) => void} callbackfn
		* @param {any} [this_arg]
		*/
		forEach(callbackfn, this_arg) {
			this.#read_all();
			super.forEach(callbackfn, this_arg);
		}
		/** @param {K} key */
		get(key) {
			var sources = this.#sources;
			var s = sources.get(key);
			if (s === void 0) {
				if (super.has(key)) {
					s = this.#source(0);
					sources.set(key, s);
				} else {
					get(this.#version);
					return;
				}
			}
			get(s);
			return super.get(key);
		}
		/**
		* @param {K} key
		* @param {V} value
		* */
		set(key, value) {
			var sources = this.#sources;
			var s = sources.get(key);
			var prev_res = super.get(key);
			var res = super.set(key, value);
			var version = this.#version;
			if (s === void 0) {
				s = this.#source(0);
				sources.set(key, s);
				set(this.#size, super.size);
				increment(version);
			} else if (prev_res !== value) {
				increment(s);
				var v_reactions = version.reactions === null ? null : new Set(version.reactions);
				if (v_reactions === null || !s.reactions?.every((r) => v_reactions.has(r))) increment(version);
			}
			return res;
		}
		/** @param {K} key */
		delete(key) {
			var sources = this.#sources;
			var s = sources.get(key);
			var res = super.delete(key);
			if (s !== void 0) {
				sources.delete(key);
				set(s, -1);
			}
			if (res) {
				set(this.#size, super.size);
				increment(this.#version);
			}
			return res;
		}
		clear() {
			if (super.size === 0) return;
			super.clear();
			var sources = this.#sources;
			set(this.#size, 0);
			for (var s of sources.values()) set(s, -1);
			increment(this.#version);
			sources.clear();
		}
		#read_all() {
			get(this.#version);
			var sources = this.#sources;
			if (this.#size.v !== sources.size) {
				for (var key of super.keys()) if (!sources.has(key)) {
					var s = this.#source(0);
					sources.set(key, s);
				}
			}
			for ([, s] of this.#sources) get(s);
		}
		keys() {
			get(this.#version);
			return super.keys();
		}
		values() {
			this.#read_all();
			return super.values();
		}
		entries() {
			this.#read_all();
			return super.entries();
		}
		[Symbol.iterator]() {
			return this.entries();
		}
		get size() {
			get(this.#size);
			return super.size;
		}
	};
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/constants.js
	/**
	* @constant
	* @name daysInYear
	* @summary Days in 1 year.
	*
	* @description
	* How many days in a year.
	*
	* One years equals 365.2425 days according to the formula:
	*
	* > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
	* > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
	*/
	var daysInYear = 365.2425;
	-(Math.pow(10, 8) * 24 * 60 * 60 * 1e3);
	/**
	* @constant
	* @name secondsInDay
	* @summary Seconds in 1 day.
	*/
	var secondsInDay = 86400;
	secondsInDay * 7;
	secondsInDay * daysInYear / 12 * 3;
	/**
	* @constant
	* @name constructFromSymbol
	* @summary Symbol enabling Date extensions to inherit properties from the reference date.
	*
	* The symbol is used to enable the `constructFrom` function to construct a date
	* using a reference date and a value. It allows to transfer extra properties
	* from the reference date to the new date. It's useful for extensions like
	* [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
	* a constructor argument.
	*/
	var constructFromSymbol = Symbol.for("constructDateFrom");
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/constructFrom.js
	/**
	* @name constructFrom
	* @category Generic Helpers
	* @summary Constructs a date using the reference date and the value
	*
	* @description
	* The function constructs a new date using the constructor from the reference
	* date and the given value. It helps to build generic functions that accept
	* date extensions.
	*
	* It defaults to `Date` if the passed reference date is a number or a string.
	*
	* Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
	* enabling to transfer extra properties from the reference date to the new date.
	* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
	* that accept a time zone as a constructor argument.
	*
	* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	*
	* @param date - The reference date to take constructor from
	* @param value - The value to create the date
	*
	* @returns Date initialized using the given date and value
	*
	* @example
	* import { constructFrom } from "./constructFrom/date-fns";
	*
	* // A function that clones a date preserving the original type
	* function cloneDate<DateType extends Date>(date: DateType): DateType {
	*   return constructFrom(
	*     date, // Use constructor from the given date
	*     date.getTime() // Use the date value to create a new date
	*   );
	* }
	*/
	function constructFrom(date, value) {
		if (typeof date === "function") return date(value);
		if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
		if (date instanceof Date) return new date.constructor(value);
		return new Date(value);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/toDate.js
	/**
	* @name toDate
	* @category Common Helpers
	* @summary Convert the given argument to an instance of Date.
	*
	* @description
	* Convert the given argument to an instance of Date.
	*
	* If the argument is an instance of Date, the function returns its clone.
	*
	* If the argument is a number, it is treated as a timestamp.
	*
	* If the argument is none of the above, the function returns Invalid Date.
	*
	* Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
	* enabling to transfer extra properties from the reference date to the new date.
	* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
	* that accept a time zone as a constructor argument.
	*
	* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	*
	* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
	*
	* @param argument - The value to convert
	*
	* @returns The parsed date in the local time zone
	*
	* @example
	* // Clone the date:
	* const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
	* //=> Tue Feb 11 2014 11:30:30
	*
	* @example
	* // Convert the timestamp to date:
	* const result = toDate(1392098430000)
	* //=> Tue Feb 11 2014 11:30:30
	*/
	function toDate$1(argument, context) {
		return constructFrom(context || argument, argument);
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addDays.js
	/**
	* The {@link addDays} function options.
	*/
	/**
	* @name addDays
	* @category Day Helpers
	* @summary Add the specified number of days to the given date.
	*
	* @description
	* Add the specified number of days to the given date.
	*
	* **You don't need date-fns\***:
	*
	* Temporal has a built-in `add` method on all its classes:
	*
	* - [`Temporal.Instant.prototype.add()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/Instant/add)
	* - [`Temporal.PlainDate.prototype.add()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate/add)
	* - [`Temporal.PlainDateTime.prototype.add()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDateTime/add)
	* - [`Temporal.PlainTime.prototype.add()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainTime/add)
	* - [`Temporal.PlainYearMonth.prototype.add()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainYearMonth/add)
	* - [`Temporal.ZonedDateTime.prototype.add()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime/add)
	*
	* \* **Not really**, see: https://date-fns.org/you-dont-need-date-fns
	*
	* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
	*
	* @param date - The date to be changed
	* @param amount - The amount of days to be added.
	* @param options - An object with options
	*
	* @returns The new date with the days added
	*
	* @example
	* // Add 10 days to 1 September 2014:
	* const result = addDays(new Date(2014, 8, 1), 10)
	* //=> Thu Sep 11 2014 00:00:00
	*
	* @example
	* // Using Temporal:
	* // Add 10 days to 1 September 2014:
	* Temporal.PlainDate.from("2014-09-01").add({ days: 10 }).toString();
	* //=> "2014-09-11"
	*/
	function addDays(date, amount, options) {
		const _date = toDate$1(date, options?.in);
		if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
		if (!amount) return _date;
		_date.setDate(_date.getDate() + amount);
		return _date;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/defaultOptions.js
	var defaultOptions = {};
	function getDefaultOptions() {
		return defaultOptions;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeek.js
	/**
	* The {@link startOfWeek} function options.
	*/
	/**
	* @name startOfWeek
	* @category Week Helpers
	* @summary Return the start of a week for the given date.
	*
	* @description
	* Return the start of a week for the given date.
	* The result will be in the local timezone.
	*
	* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
	*
	* @param date - The original date
	* @param options - An object with options
	*
	* @returns The start of a week
	*
	* @example
	* // The start of a week for 2 September 2014 11:55:00:
	* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
	* //=> Sun Aug 31 2014 00:00:00
	*
	* @example
	* // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
	* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
	* //=> Mon Sep 01 2014 00:00:00
	*/
	function startOfWeek$1(date, options) {
		const defaultOptions = getDefaultOptions();
		const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions.weekStartsOn ?? defaultOptions.locale?.options?.weekStartsOn ?? 0;
		const _date = toDate$1(date, options?.in);
		const day = _date.getDay();
		const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
		_date.setDate(_date.getDate() - diff);
		_date.setHours(0, 0, 0, 0);
		return _date;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfDay.js
	/**
	* The {@link startOfDay} function options.
	*/
	/**
	* @name startOfDay
	* @category Day Helpers
	* @summary Return the start of a day for the given date.
	*
	* @description
	* Return the start of a day for the given date.
	* The result will be in the local timezone.
	*
	* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
	* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
	*
	* @param date - The original date
	* @param options - The options
	*
	* @returns The start of a day
	*
	* @example
	* // The start of a day for 2 September 2014 11:55:00:
	* const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
	* //=> Tue Sep 02 2014 00:00:00
	*/
	function startOfDay(date, options) {
		const _date = toDate$1(date, options?.in);
		_date.setHours(0, 0, 0, 0);
		return _date;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getDate.js
	/**
	* The {@link getDate} function options.
	*/
	/**
	* @name getDate
	* @category Day Helpers
	* @summary Get the day of the month of the given date.
	*
	* @description
	* Get the day of the month of the given date.
	*
	* @param date - The given date
	* @param options - An object with options.
	*
	* @returns The day of month
	*
	* @example
	* // Which day of the month is 29 February 2012?
	* const result = getDate(new Date(2012, 1, 29))
	* //=> 29
	*/
	function getDate(date, options) {
		return toDate$1(date, options?.in).getDate();
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getHours.js
	/**
	* The {@link getHours} function options.
	*/
	/**
	* @name getHours
	* @category Hour Helpers
	* @summary Get the hours of the given date.
	*
	* @description
	* Get the hours of the given date.
	*
	* @param date - The given date
	* @param options - An object with options
	*
	* @returns The hours
	*
	* @example
	* // Get the hours of 29 February 2012 11:45:00:
	* const result = getHours(new Date(2012, 1, 29, 11, 45))
	* //=> 11
	*/
	function getHours(date, options) {
		return toDate$1(date, options?.in).getHours();
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getMinutes.js
	/**
	* The {@link getMinutes} function options.
	*/
	/**
	* @name getMinutes
	* @category Minute Helpers
	* @summary Get the minutes of the given date.
	*
	* @description
	* Get the minutes of the given date.
	*
	* @param date - The given date
	* @param options - The options
	*
	* @returns The minutes
	*
	* @example
	* // Get the minutes of 29 February 2012 11:45:05:
	* const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
	* //=> 45
	*/
	function getMinutes(date, options) {
		return toDate$1(date, options?.in).getMinutes();
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getSeconds.js
	/**
	* @name getSeconds
	* @category Second Helpers
	* @summary Get the seconds of the given date.
	*
	* @description
	* Get the seconds of the given date.
	*
	* @param date - The given date
	*
	* @returns The seconds
	*
	* @example
	* // Get the seconds of 29 February 2012 11:45:05.123:
	* const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
	* //=> 5
	*/
	function getSeconds(date) {
		return toDate$1(date).getSeconds();
	}
	//#endregion
	//#region src/lib/core/time.ts
	/**
	* Core time constants and pure date-math utilities.
	*
	* Uses date-fns for reliable calendar operations (DST-safe, tree-shakeable).
	* Re-exports commonly used date-fns functions so consumers have a single import.
	*/
	/** Milliseconds in one day */
	var DAY_MS = 864e5;
	/** Milliseconds in one hour */
	var HOUR_MS = 36e5;
	Array.from({ length: 24 }, (_, i) => i);
	/** Start-of-day timestamp (midnight, local time) */
	function sod(ms) {
		return startOfDay(ms).getTime();
	}
	/**
	* Start-of-week timestamp.
	* @param ms       Any timestamp within the target week
	* @param mondayStart  true → weeks begin Monday; false → Sunday
	*/
	function startOfWeek(ms, mondayStart = true) {
		return startOfWeek$1(ms, { weekStartsOn: mondayStart ? 1 : 0 }).getTime();
	}
	/** Add `n` days to a timestamp and return the new timestamp */
	function addDaysMs(ms, n) {
		return addDays(ms, n).getTime();
	}
	/** Zero-pad a number to 2 digits */
	function pad(n) {
		return n < 10 ? "0" + n : "" + n;
	}
	/**
	* Fractional hours elapsed since midnight for a given timestamp.
	* e.g. 14:30:00 → 14.5
	*/
	function fractionalHour(ms) {
		const d = new Date(ms);
		return getHours(d) + getMinutes(d) / 60 + getSeconds(d) / 3600;
	}
	/**
	* Format hours + minutes from a timestamp: "14:30"
	*/
	function fmtHM(ms) {
		const d = new Date(ms);
		return pad(getHours(d)) + ":" + pad(getMinutes(d));
	}
	/**
	* Format seconds from a timestamp: ":05"
	*/
	function fmtS(ms) {
		return ":" + pad(getSeconds(new Date(ms)));
	}
	/** Day-of-month number for a timestamp */
	function dayNum(ms) {
		return getDate(new Date(ms));
	}
	/** Does an event span more than one calendar day? */
	function isMultiDay(ev) {
		return sod(ev.start.getTime()) !== sod(ev.end.getTime() - 1);
	}
	/** Is an event effectively all-day? (allDay flag, or spans ≥24h with midnight boundaries) */
	function isAllDay(ev) {
		if (ev.allDay) return true;
		if (ev.end.getTime() - ev.start.getTime() < 864e5) return false;
		const s = ev.start;
		return s.getHours() === 0 && s.getMinutes() === 0 && s.getSeconds() === 0;
	}
	/**
	* Compute how an event appears on a specific day.
	* Returns null if the event doesn't overlap the day.
	*/
	function segmentForDay(ev, dayMs) {
		const dayStart = sod(dayMs);
		const dayEnd = dayStart + DAY_MS;
		const evStart = ev.start.getTime();
		const evEnd = ev.end.getTime();
		if (evStart >= dayEnd || evEnd <= dayStart) return null;
		const firstDayMs = sod(evStart);
		const lastDayMs = sod(evEnd - 1);
		const totalDays = Math.floor((lastDayMs - firstDayMs) / DAY_MS) + 1;
		const dayIndex = Math.floor((dayStart - firstDayMs) / DAY_MS) + 1;
		return {
			ev,
			start: new Date(Math.max(evStart, dayStart)),
			end: new Date(Math.min(evEnd, dayEnd)),
			isStart: dayStart === firstDayMs,
			isEnd: dayStart === lastDayMs,
			dayIndex,
			totalDays,
			allDay: isAllDay(ev)
		};
	}
	//#endregion
	//#region src/lib/engine/event-store.svelte.ts
	function createEventStore(adapter) {
		const getAdapter = typeof adapter === "function" ? adapter : () => adapter;
		let eventMap = new SvelteMap();
		let loading = /* @__PURE__ */ state(false);
		let error = /* @__PURE__ */ state(null);
		/** Guards against an older in-flight load pruning a newer one's result */
		let loadSeq = 0;
		const eventArray = /* @__PURE__ */ user_derived(() => [...eventMap.values()]);
		function overlaps(ev, start, end) {
			return ev.start < end && ev.end > start;
		}
		function removeEvent(id) {
			eventMap.delete(id);
		}
		function upsertEvent(ev) {
			eventMap.set(ev.id, ev);
		}
		return {
			get events() {
				return get(eventArray);
			},
			get loading() {
				return get(loading);
			},
			get error() {
				return get(error);
			},
			async load(range) {
				const seq = ++loadSeq;
				set(loading, true);
				set(error, null);
				try {
					const fetched = await getAdapter().fetchEvents(range);
					if (seq !== loadSeq) return;
					const keep = new Set(fetched.map((ev) => ev.id));
					for (const ev of [...eventMap.values()]) if (!keep.has(ev.id) && overlaps(ev, range.start, range.end)) removeEvent(ev.id);
					for (const ev of fetched) upsertEvent(ev);
				} catch (e) {
					set(error, e instanceof Error ? e.message : String(e), true);
				} finally {
					if (seq === loadSeq) set(loading, false);
				}
			},
			forRange(start, end) {
				return get(eventArray).filter((ev) => overlaps(ev, start, end));
			},
			forDay(date) {
				const dayStart = new Date(sod(date.getTime()));
				const dayEnd = new Date(dayStart.getTime() + DAY_MS);
				return get(eventArray).filter((ev) => overlaps(ev, dayStart, dayEnd));
			},
			byId(id) {
				return eventMap.get(id);
			},
			async add(eventData) {
				if (!getAdapter().createEvent) throw new Error("Adapter is read-only: createEvent not implemented");
				set(loading, true);
				set(error, null);
				try {
					const created = await getAdapter().createEvent(eventData);
					upsertEvent(created);
					return created;
				} catch (e) {
					set(error, e instanceof Error ? e.message : String(e), true);
					throw e;
				} finally {
					set(loading, false);
				}
			},
			async update(id, patch) {
				if (!getAdapter().updateEvent) throw new Error("Adapter is read-only: updateEvent not implemented");
				set(loading, true);
				set(error, null);
				try {
					upsertEvent(await getAdapter().updateEvent(id, patch));
				} catch (e) {
					set(error, e instanceof Error ? e.message : String(e), true);
					throw e;
				} finally {
					set(loading, false);
				}
			},
			async remove(id) {
				if (!getAdapter().deleteEvent) throw new Error("Adapter is read-only: deleteEvent not implemented");
				set(loading, true);
				set(error, null);
				try {
					await getAdapter().deleteEvent(id);
					removeEvent(id);
				} catch (e) {
					set(error, e instanceof Error ? e.message : String(e), true);
					throw e;
				} finally {
					set(loading, false);
				}
			},
			async move(id, newStart, newEnd) {
				const existing = eventMap.get(id);
				if (existing) upsertEvent({
					...existing,
					start: newStart,
					end: newEnd
				});
				try {
					await this.update(id, {
						start: newStart,
						end: newEnd
					});
				} catch (e) {
					const msg = e instanceof Error ? e.message : "";
					if (existing && !msg.includes("read-only")) upsertEvent(existing);
					throw e;
				}
			}
		};
	}
	//#endregion
	//#region src/lib/engine/view-state.svelte.ts
	function inferMode(view) {
		if (view.startsWith("day")) return "day";
		if (view.startsWith("month")) return "month";
		return "week";
	}
	function computeRange(focus, mode, mondayStart, dayCount = 7) {
		if (mode === "day") {
			const start = new Date(focus);
			start.setHours(0, 0, 0, 0);
			return {
				start,
				end: new Date(start.getTime() + DAY_MS)
			};
		}
		if (mode === "month") {
			const first = new Date(focus.getFullYear(), focus.getMonth(), 1);
			const last = new Date(focus.getFullYear(), focus.getMonth() + 1, 0);
			const gridStart = startOfWeek(first.getTime(), mondayStart);
			const gridEnd = addDaysMs(startOfWeek(last.getTime(), mondayStart), 7);
			return {
				start: new Date(gridStart),
				end: new Date(gridEnd)
			};
		}
		if (dayCount === 7) {
			const ws = startOfWeek(focus.getTime(), mondayStart);
			return {
				start: new Date(ws),
				end: new Date(addDaysMs(ws, 7))
			};
		}
		const start = new Date(focus);
		start.setHours(0, 0, 0, 0);
		return {
			start,
			end: new Date(start.getTime() + dayCount * DAY_MS)
		};
	}
	function createViewState(options = {}) {
		let view = /* @__PURE__ */ state(proxy(options.view ?? "week-planner"));
		let focusDate = /* @__PURE__ */ state(proxy(options.initialDate ?? /* @__PURE__ */ new Date()));
		let mondayStart = /* @__PURE__ */ state(proxy(options.mondayStart ?? true));
		let dayCount = /* @__PURE__ */ state(proxy(options.dayCount ?? 7));
		const timezone = options.timezone;
		const modeResolver = options.modeForView;
		const mode = /* @__PURE__ */ user_derived(() => modeResolver?.(get(view)) ?? inferMode(get(view)));
		const range = /* @__PURE__ */ user_derived(() => computeRange(get(focusDate), get(mode), get(mondayStart), get(dayCount)));
		return {
			get view() {
				return get(view);
			},
			get focusDate() {
				return get(focusDate);
			},
			get range() {
				return get(range);
			},
			get mode() {
				return get(mode);
			},
			get mondayStart() {
				return get(mondayStart);
			},
			get timezone() {
				return timezone;
			},
			get dayCount() {
				return get(dayCount);
			},
			setView(id) {
				set(view, id, true);
			},
			setMondayStart(value) {
				set(mondayStart, value, true);
			},
			setFocusDate(date) {
				set(focusDate, date, true);
			},
			setDayCount(n) {
				set(dayCount, n, true);
			},
			next() {
				if (get(mode) === "month") {
					set(focusDate, new Date(get(focusDate).getFullYear(), get(focusDate).getMonth() + 1, 1), true);
					return;
				}
				const days = get(mode) === "day" ? 1 : get(dayCount);
				set(focusDate, new Date(addDaysMs(get(focusDate).getTime(), days)), true);
			},
			prev() {
				if (get(mode) === "month") {
					set(focusDate, new Date(get(focusDate).getFullYear(), get(focusDate).getMonth() - 1, 1), true);
					return;
				}
				const days = get(mode) === "day" ? -1 : -get(dayCount);
				set(focusDate, new Date(addDaysMs(get(focusDate).getTime(), days)), true);
			},
			goToday() {
				set(focusDate, /* @__PURE__ */ new Date(), true);
			}
		};
	}
	//#endregion
	//#region src/lib/engine/selection.svelte.ts
	function createSelection() {
		let selectedId = /* @__PURE__ */ state(null);
		let hoveredId = /* @__PURE__ */ state(null);
		let selectedIds = /* @__PURE__ */ state(proxy(/* @__PURE__ */ new Set()));
		return {
			get selectedId() {
				return get(selectedId);
			},
			get hoveredId() {
				return get(hoveredId);
			},
			get selectedIds() {
				return get(selectedIds);
			},
			select(id) {
				set(selectedId, id, true);
				set(selectedIds, /* @__PURE__ */ new Set([id]), true);
			},
			deselect() {
				set(selectedId, null);
				set(selectedIds, /* @__PURE__ */ new Set(), true);
			},
			toggle(id) {
				const next = new Set(get(selectedIds));
				if (next.has(id)) next.delete(id);
				else next.add(id);
				set(selectedIds, next, true);
				set(selectedId, next.size === 1 ? [...next][0] : null, true);
			},
			clear() {
				set(selectedId, null);
				set(hoveredId, null);
				set(selectedIds, /* @__PURE__ */ new Set(), true);
			},
			hover(id) {
				set(hoveredId, id, true);
			},
			isSelected(id) {
				return get(selectedIds).has(id);
			}
		};
	}
	//#endregion
	//#region src/lib/engine/drag.svelte.ts
	function createDragState() {
		let mode = /* @__PURE__ */ state("none");
		let payload = /* @__PURE__ */ state(null);
		const active = /* @__PURE__ */ user_derived(() => get(mode) !== "none");
		function reset() {
			set(mode, "none");
			set(payload, null);
		}
		return {
			get mode() {
				return get(mode);
			},
			get payload() {
				return get(payload);
			},
			get active() {
				return get(active);
			},
			beginCreate(start, end, dayIndex = 0) {
				set(mode, "create");
				set(payload, {
					eventId: null,
					start,
					end,
					dayIndex
				}, true);
			},
			beginMove(eventId, start, end) {
				set(mode, "move");
				set(payload, {
					eventId,
					start,
					end,
					dayIndex: 0
				}, true);
			},
			beginResize(eventId, edge, start, end) {
				set(mode, edge === "start" ? "resize-start" : "resize-end", true);
				set(payload, {
					eventId,
					start,
					end,
					dayIndex: 0
				}, true);
			},
			updatePointer(start, end, dayIndex) {
				if (!get(payload)) return;
				set(payload, {
					...get(payload),
					start,
					end,
					...dayIndex !== void 0 ? { dayIndex } : {}
				}, true);
			},
			commit() {
				const result = get(payload);
				reset();
				return result;
			},
			cancel() {
				reset();
			}
		};
	}
	var _labels = {
		today: "Today",
		yesterday: "Yesterday",
		tomorrow: "Tomorrow",
		day: "Day",
		week: "Week",
		month: "Month",
		planner: "Planner",
		agenda: "Agenda",
		now: "now",
		free: "free",
		allDay: "All day",
		done: "Done",
		upNext: "Up next",
		until: "until",
		noEvents: "No events",
		nothingScheduled: "Nothing scheduled",
		nothingScheduledYet: "Nothing scheduled yet",
		nothingWasScheduled: "Nothing was scheduled",
		allDoneForToday: "All done for today",
		goToToday: "Go to today",
		previousDay: "Previous day",
		nextDay: "Next day",
		previousWeek: "Previous week",
		previousMonth: "Previous month",
		nextWeek: "Next week",
		nextMonth: "Next month",
		calendar: "Calendar",
		viewMode: "View mode",
		cancelled: "cancelled",
		tentative: "tentative",
		full: "full",
		limited: "limited",
		dayNavigation: "Day navigation",
		weekNavigation: "Week navigation",
		dayPlanner: "Day planner",
		scrollableDayPlanner: "Scrollable day planner",
		todaysLineup: "Today's lineup",
		weekAhead: "Week ahead",
		multiWeekGrid: "Multi-week calendar grid",
		currentTime: "Current time",
		createEvent: "Create event",
		happeningNow: "happening now",
		past: "past",
		completed: "completed",
		inProgress: "in progress",
		nMore: (n) => `+${n} more`,
		nEvents: (n) => `${n} event${n === 1 ? "" : "s"}`,
		nCompleted: (n) => `${n} completed`,
		showLess: "Show less",
		dayNOfTotal: (current, total) => `day ${current} of ${total}`,
		percentComplete: (pct) => `${pct}% complete`,
		inMinutes: (mins) => `in ${mins}m`,
		inHours: (hours, mins) => mins > 0 ? `in ${hours}h ${mins}m` : `in ${hours}h`,
		inDays: (days) => `in ${days}d`
	};
	/** Get the currently active labels. */
	function getLabels() {
		return _labels;
	}
	/** Module-level default locale — consumers can override via setDefaultLocale() */
	var defaultLocale = "en-US";
	/**
	* Detect whether the current locale uses 12-hour or 24-hour time.
	* Caches per locale tag for performance.
	*/
	var hourCycleCache = /* @__PURE__ */ new Map();
	function is24HourLocale(locale) {
		const loc = locale ?? defaultLocale;
		if (hourCycleCache.has(loc)) return hourCycleCache.get(loc);
		const sample = new Intl.DateTimeFormat(loc, { hour: "numeric" }).resolvedOptions();
		const is24 = sample.hourCycle === "h23" || sample.hourCycle === "h24";
		hourCycleCache.set(loc, is24);
		return is24;
	}
	/** Format hour index (0-23) as compact label: 12h ("12a", "1p") or 24h ("0", "13") */
	function fmtH(h, locale) {
		if (is24HourLocale(locale)) return String(h);
		if (h === 0) return "12a";
		if (h === 12) return "12p";
		return h < 12 ? h + "a" : h - 12 + "p";
	}
	/** Short weekday name for a timestamp: "Mon", "Tue", etc. */
	function weekdayShort(ms, locale) {
		return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { weekday: "short" });
	}
	/** Long weekday name for a timestamp: "Monday", "Tuesday", etc. */
	function weekdayLong(ms, locale) {
		return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { weekday: "long" });
	}
	/** Long month name: "January", "February", etc. */
	function monthLong(ms, locale) {
		return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { month: "long" });
	}
	/**
	* Format a week range label: "Feb 17 – 23, 2026" or "Jan 27 – Feb 2, 2026"
	*/
	function fmtWeekRange(weekStartMs, locale, weekEndMs) {
		const loc = locale ?? defaultLocale;
		const s = new Date(weekStartMs);
		const e = new Date(weekEndMs ?? weekStartMs + 5184e5);
		const sm = s.toLocaleDateString(loc, { month: "short" });
		const em = e.toLocaleDateString(loc, { month: "short" });
		const sy = s.getFullYear();
		const ey = e.getFullYear();
		if (sy !== ey) return `${sm} ${s.getDate()}, ${sy} – ${em} ${e.getDate()}, ${ey}`;
		if (sm !== em) return `${sm} ${s.getDate()} – ${em} ${e.getDate()}, ${ey}`;
		return `${sm} ${s.getDate()} – ${e.getDate()}, ${ey}`;
	}
	/**
	* Format a Date as a compact time string.
	*
	* 12-hour locales → "9a", "12:30p"
	* 24-hour locales → "9:00", "14:30"
	*/
	function fmtTime$1(d, locale) {
		if (is24HourLocale(locale)) {
			const h = d.getHours();
			const m = d.getMinutes();
			return `${h}:${String(m).padStart(2, "0")}`;
		}
		const h = d.getHours();
		const m = d.getMinutes();
		const suffix = h >= 12 ? "p" : "a";
		return `${h === 0 ? 12 : h > 12 ? h - 12 : h}:${String(m).padStart(2, "0")}${suffix}`;
	}
	/**
	* Format the duration between two Dates as a compact string.
	* e.g. "45m", "1h", "1h 30m"
	*/
	function fmtDuration(start, end) {
		const mins = Math.round((end.getTime() - start.getTime()) / 6e4);
		if (mins < 60) return `${mins}m`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	}
	//#endregion
	//#region src/lib/theme/presets.ts
	/**
	* Theme presets for timeline components.
	*
	* Each preset is a CSS inline-style string of --dt-* custom properties.
	* Pass to the `theme` prop of any timeline component.
	*
	* Presets:
	*   auto     — Transparent: inherit --dt-* from the host page (recommended default)
	*   neutral  — Explicit light theme: white bg, blue accent, works standalone
	*   midnight — Explicit dark theme: charcoal bg, red accent
	*/
	/**
	* Auto — triggers the smart auto-theme engine.
	*
	* When passed to Calendar's `theme` prop, the component will probe the host
	* page at mount time (background, fonts, accent color, light/dark mode)
	* and generate matching --dt-* CSS tokens automatically.
	*
	* Reactively watches for host theme changes (e.g. dark-mode toggle).
	*
	* If you want passive inheritance only (no probing), pass `autoTheme={false}`
	* alongside `theme={auto}`.
	*/
	var auto = ``;
	/** All available presets keyed by name */
	var presets = {
		auto,
		neutral: `
	--dt-stage-bg: #ffffff;
	--dt-bg: #ffffff;
	--dt-surface: #f9fafb;
	--dt-border: rgba(0, 0, 0, 0.08);
	--dt-border-day: rgba(0, 0, 0, 0.14);
	--dt-text: rgba(0, 0, 0, 0.87);
	--dt-text-2: rgba(0, 0, 0, 0.54);
	--dt-text-3: rgba(0, 0, 0, 0.38);
	--dt-accent: var(--asini-accent, #2563eb);
	--dt-accent-dim: color-mix(in srgb, var(--dt-accent) 12%, transparent);
	--dt-glow: color-mix(in srgb, var(--dt-accent) 25%, transparent);
	--dt-today-bg: color-mix(in srgb, var(--dt-accent) 7%, transparent);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(0, 0, 0, 0.1);
	--dt-success: rgba(22, 163, 74, 0.7);
	--dt-weekend-bg: rgba(0, 0, 0, 0.02);
	--dt-hover: rgba(0, 0, 0, 0.04);
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`,
		midnight: `
	--dt-stage-bg: #080a0f;
	--dt-bg: #0b0e14;
	--dt-surface: #10141c;
	--dt-border: rgba(148, 163, 184, 0.07);
	--dt-border-day: rgba(148, 163, 184, 0.14);
	--dt-text: rgba(226, 232, 240, 0.85);
	--dt-text-2: rgba(148, 163, 184, 0.55);
	--dt-text-3: rgba(100, 116, 139, 0.55);
	--dt-accent: #ef4444;
	--dt-accent-dim: rgba(239, 68, 68, 0.18);
	--dt-glow: rgba(239, 68, 68, 0.35);
	--dt-today-bg: rgba(239, 68, 68, 0.07);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(148, 163, 184, 0.12);
	--dt-success: rgba(74, 222, 128, 0.7);
	--dt-weekend-bg: rgba(148, 163, 184, 0.03);
	--dt-hover: rgba(148, 163, 184, 0.06);
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`
	};
	//#endregion
	//#region src/lib/theme/auto.ts
	function parseColor(raw) {
		if (!raw || raw === "transparent" || raw === "rgba(0, 0, 0, 0)") return null;
		const rgba = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
		if (rgba) return [
			+rgba[1],
			+rgba[2],
			+rgba[3]
		];
		if (raw.startsWith("#")) {
			const h = raw.replace("#", "");
			const n = h.length === 3 ? parseInt(h[0] + h[0] + h[1] + h[1] + h[2] + h[2], 16) : parseInt(h, 16);
			return [
				n >> 16 & 255,
				n >> 8 & 255,
				n & 255
			];
		}
		return null;
	}
	function luminance([r, g, b]) {
		const lin = (c) => {
			const s = c / 255;
			return s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
		};
		return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
	}
	function rgbToHsl(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b), min = Math.min(r, g, b);
		const l = (max + min) / 2;
		if (max === min) return [
			0,
			0,
			l
		];
		const d = max - min;
		const s = l > .5 ? d / (2 - max - min) : d / (max + min);
		let h = 0;
		if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
		else if (max === g) h = ((b - r) / d + 2) / 6;
		else h = ((r - g) / d + 4) / 6;
		return [
			h,
			s,
			l
		];
	}
	function hslToRgb(h, s, l) {
		h = (h % 1 + 1) % 1;
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		if (s === 0) {
			const v = Math.round(l * 255);
			return [
				v,
				v,
				v
			];
		}
		const q = l < .5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		return [
			Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
			Math.round(hue2rgb(p, q, h) * 255),
			Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
		];
	}
	function rgbStr(r, g, b) {
		return `#${[
			r,
			g,
			b
		].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
	}
	function rgba(r, g, b, a) {
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}
	/** Mix two colors. t=0 → c1, t=1 → c2. */
	function mix(c1, c2, t) {
		return [
			Math.round(c1[0] + (c2[0] - c1[0]) * t),
			Math.round(c1[1] + (c2[1] - c1[1]) * t),
			Math.round(c1[2] + (c2[2] - c1[2]) * t)
		];
	}
	/**
	* Parent element that hops shadow boundaries. When a node is a direct child
	* of a ShadowRoot, `parentElement` is null — continue the walk from the
	* shadow host so probes can still see the host page (the embeddable widget
	* mounts the calendar inside a shadow root).
	*/
	function parentAcrossShadow(node) {
		if (node.parentElement) return node.parentElement;
		const root = node.getRootNode();
		return typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host instanceof HTMLElement ? root.host : null;
	}
	/**
	* Common CSS variable names for text / foreground color used by popular frameworks.
	*/
	var TEXT_VAR_CANDIDATES = [
		"--text",
		"--text-color",
		"--color-text",
		"--foreground",
		"--color-foreground",
		"--bs-body-color",
		"--chakra-colors-text",
		"--chakra-colors-gray-800",
		"--md-sys-color-on-background",
		"--mdc-theme-on-surface",
		"--bc",
		"--gray-12",
		"--text-1"
	];
	/**
	* Probe the host page for a usable text (foreground) color.
	* Uses the same three-pass strategy as `probeBackground()`:
	*   1. CSS custom-property probe on :root (discrete, not animated)
	*   2. Inline-style walk (`element.style.color` — immune to CSS transitions)
	*   3. Computed-style walk (`getComputedStyle().color`)
	*
	* After probing, validates that the text color has adequate contrast against
	* the given background. If contrast is poor (WCAG ratio < 3:1), returns null
	* so the caller can derive text from the background luminance.
	*/
	function probeTextColor(el, bg) {
		const candidates = [];
		try {
			const rootCs = getComputedStyle(document.documentElement);
			for (const name of TEXT_VAR_CANDIDATES) {
				const val = rootCs.getPropertyValue(name).trim();
				if (val) {
					const rgb = parseColor(val);
					if (rgb) {
						candidates.push(rgb);
						break;
					}
				}
			}
		} catch {}
		let node = el;
		while (node) {
			const raw = node.style.color;
			if (raw) {
				const rgb = parseColor(raw);
				if (rgb) {
					candidates.push(rgb);
					break;
				}
			}
			node = parentAcrossShadow(node);
		}
		node = el;
		while (node) {
			try {
				const raw = getComputedStyle(node).color;
				const rgb = parseColor(raw);
				if (rgb) {
					candidates.push(rgb);
					break;
				}
			} catch {}
			node = parentAcrossShadow(node);
		}
		const bgLum = luminance(bg);
		for (const c of candidates) {
			const cLum = luminance(c);
			if ((Math.max(bgLum, cLum) + .05) / (Math.min(bgLum, cLum) + .05) >= 3) return c;
		}
		return null;
	}
	/**
	* Common CSS variable names used by popular frameworks/design systems
	* for their primary/brand accent color.
	*/
	var ACCENT_VAR_CANDIDATES = [
		"--accent",
		"--accent-color",
		"--primary",
		"--primary-color",
		"--brand",
		"--brand-color",
		"--theme-color",
		"--color-primary",
		"--color-accent",
		"--p",
		"--color-primary",
		"--primary",
		"--md-sys-color-primary",
		"--mdc-theme-primary",
		"--bs-primary",
		"--bs-primary-rgb",
		"--chakra-colors-brand-500",
		"--chakra-colors-primary",
		"--blue-6",
		"--accent-9",
		"--color-primary-500",
		"--primary-500"
	];
	/**
	* Try to extract a usable accent color from the host page.
	* Priority: CSS variables → link color → selection color → null.
	*/
	function probeAccent(root) {
		let cs;
		try {
			cs = getComputedStyle(root);
		} catch {
			return null;
		}
		for (const name of ACCENT_VAR_CANDIDATES) {
			const val = cs.getPropertyValue(name).trim();
			if (val) {
				const rgb = parseColor(val);
				if (rgb) {
					const [, s] = rgbToHsl(...rgb);
					if (s > .15) return rgb;
				}
			}
		}
		const link = root.querySelector("a[href]");
		if (link) {
			const lc = parseColor(getComputedStyle(link).color);
			if (lc) {
				const [, s] = rgbToHsl(...lc);
				if (s > .2) return lc;
			}
		}
		const accent = cs.getPropertyValue("accent-color").trim();
		if (accent && accent !== "auto") {
			const rgb = parseColor(accent);
			if (rgb) return rgb;
		}
		const btn = root.querySelector("button:not([class*=\"cal-\"])");
		if (btn) {
			const bg = parseColor(getComputedStyle(btn).backgroundColor);
			if (bg) {
				const [, s] = rgbToHsl(...bg);
				if (s > .25) return bg;
			}
		}
		return null;
	}
	/** Common CSS variable names for the host's monospace font stack. */
	var MONO_VAR_CANDIDATES = [
		"--font-mono",
		"--font-family-mono",
		"--font-monospace",
		"--mono-font",
		"--code-font"
	];
	var MONO_FALLBACK = "ui-monospace, 'SFMono-Regular', monospace";
	/**
	* Adopt the host page's fonts.
	*
	* Sans: the host element's *computed* font-family — the resolved authored
	* stack, so webfont names come through verbatim. (Declaring `--dt-sans:
	* inherit` does NOT work: a custom property with no ancestor value computes
	* to guaranteed-invalid, so `var(--dt-sans, fallback)` used the fallback and
	* the host font never applied.)
	*
	* Mono: common CSS variables on :root, then any code-ish element's computed
	* font, then a generic stack.
	*/
	function probeFonts(host) {
		let sans = "system-ui, sans-serif";
		try {
			const f = getComputedStyle(host).fontFamily;
			if (f) sans = f;
		} catch {}
		let mono = "";
		try {
			const rootCs = getComputedStyle(document.documentElement);
			for (const name of MONO_VAR_CANDIDATES) {
				const val = rootCs.getPropertyValue(name).trim();
				if (val) {
					mono = val;
					break;
				}
			}
		} catch {}
		if (!mono) {
			const code = document.querySelector("pre, code, kbd, samp");
			if (code) try {
				mono = getComputedStyle(code).fontFamily || "";
			} catch {}
		}
		return {
			sans,
			mono: mono || MONO_FALLBACK
		};
	}
	/**
	* Common CSS variable names for background color used by popular frameworks.
	*/
	var BG_VAR_CANDIDATES = [
		"--bg",
		"--background",
		"--color-bg",
		"--color-background",
		"--body-bg",
		"--bs-body-bg",
		"--chakra-colors-bg",
		"--md-sys-color-background",
		"--b1",
		"--background",
		"--color-background"
	];
	/**
	* Walk up the DOM tree to find the first non-transparent background.
	* Also probes common CSS variables for background color.
	* Returns the parsed RGB and whether this is a dark background.
	*
	* Uses a three-pass strategy:
	*   1. CSS custom-property probe on :root (instant, not animated)
	*   2. Inline-style walk (reads `element.style.background` — the *target*
	*      value, immune to CSS `transition` interpolation)
	*   3. Computed-style walk (reads `getComputedStyle().backgroundColor` —
	*      may return a mid-transition intermediate value)
	*
	* Passes 1-2 are preferred because CSS transitions animate the resolved
	* `background-color` property, making `getComputedStyle` unreliable
	* during the transition window.
	*/
	function probeBackground(el) {
		const result = (rgb) => ({
			bg: rgb,
			isDark: luminance(rgb) < .4
		});
		try {
			const rootCs = getComputedStyle(document.documentElement);
			for (const name of BG_VAR_CANDIDATES) {
				const val = rootCs.getPropertyValue(name).trim();
				if (val) {
					const rgb = parseColor(val);
					if (rgb) return result(rgb);
				}
			}
		} catch {}
		let node = el;
		while (node) {
			const raw = node.style.backgroundColor || node.style.background;
			if (raw) {
				const rgb = parseColor(raw);
				if (rgb) return result(rgb);
			}
			node = parentAcrossShadow(node);
		}
		node = el;
		while (node) {
			try {
				const raw = getComputedStyle(node).backgroundColor;
				const rgb = parseColor(raw);
				if (rgb) return result(rgb);
			} catch {}
			node = parentAcrossShadow(node);
		}
		if (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches) return {
			bg: [
				18,
				18,
				18
			],
			isDark: true
		};
		return {
			bg: [
				255,
				255,
				255
			],
			isDark: false
		};
	}
	/**
	* Probe the host page surrounding `el` and generate a complete --dt-* CSS string.
	*
	* @param el       The calendar's root element (or any element in the host page).
	* @param options  Optional overrides for mode, accent, font.
	* @returns        A CSS inline-style string of --dt-* custom properties.
	*/
	function probeHostTheme(el, options = {}) {
		const host = parentAcrossShadow(el) ?? el;
		const htmlRoot = (host.closest("body") ?? host) instanceof HTMLElement ? host.closest("body") ?? host : document.body;
		const { bg, isDark: autoDark } = probeBackground(host);
		const isDark = options.mode === "auto" || !options.mode ? autoDark : options.mode === "dark";
		let accent;
		if (options.accent) accent = parseColor(options.accent) ?? [
			37,
			99,
			235
		];
		else accent = probeAccent(htmlRoot) ?? (isDark ? [
			239,
			68,
			68
		] : [
			37,
			99,
			235
		]);
		const [aH, aS, aL] = rgbToHsl(...accent);
		const fonts = options.font ? {
			sans: options.font,
			mono: MONO_FALLBACK
		} : probeFonts(host);
		const textBase = probeTextColor(host, bg) ?? (isDark ? [
			226,
			232,
			240
		] : [
			30,
			30,
			46
		]);
		const calBg = isDark ? mix(bg, [
			255,
			255,
			255
		], .02) : mix(bg, [
			0,
			0,
			0
		], .005);
		const stageBg = bg;
		const surface = isDark ? mix(calBg, [
			255,
			255,
			255
		], .04) : mix(calBg, [
			0,
			0,
			0
		], .02);
		const borderAlpha = isDark ? .07 : .08;
		const borderDayAlpha = isDark ? .14 : .14;
		const borderRgb = isDark ? [
			148,
			163,
			184
		] : [
			0,
			0,
			0
		];
		const accentDim = isDark ? .15 : .12;
		const glow = isDark ? .3 : .25;
		const todayBg = isDark ? .07 : .07;
		const accentAdj = hslToRgb(aH, Math.max(aS, .5), isDark ? Math.max(aL, .45) : Math.min(aL, .48));
		const btnText = luminance(accentAdj) < .4 ? "#ffffff" : "#1a1a2e";
		const scrollAlpha = isDark ? .12 : .1;
		const successRgb = isDark ? [
			74,
			222,
			128
		] : [
			22,
			163,
			74
		];
		return [
			`--dt-stage-bg: ${rgbStr(...stageBg)}`,
			`--dt-bg: ${rgbStr(...calBg)}`,
			`--dt-surface: ${rgbStr(...surface)}`,
			`--dt-border: ${rgba(...borderRgb, borderAlpha)}`,
			`--dt-border-day: ${rgba(...borderRgb, borderDayAlpha)}`,
			`--dt-text: ${rgba(...textBase, isDark ? .87 : .87)}`,
			`--dt-text-2: ${rgba(...textBase, isDark ? .55 : .54)}`,
			`--dt-text-3: ${rgba(...textBase, isDark ? .38 : .38)}`,
			`--dt-accent: ${rgbStr(...accentAdj)}`,
			`--dt-accent-dim: ${rgba(...accentAdj, accentDim)}`,
			`--dt-glow: ${rgba(...accentAdj, glow)}`,
			`--dt-today-bg: ${rgba(...accentAdj, todayBg)}`,
			`--dt-btn-text: ${btnText}`,
			`--dt-scrollbar: ${rgba(...borderRgb, scrollAlpha)}`,
			`--dt-success: ${rgba(...successRgb, .7)}`,
			`--dt-weekend-bg: ${rgba(...borderRgb, isDark ? .03 : .02)}`,
			`--dt-hover: ${rgba(...borderRgb, isDark ? .06 : .04)}`,
			`--dt-sans: ${fonts.sans}`,
			`--dt-mono: ${fonts.mono}`
		].map((v) => `\t${v}`).join(";\n") + ";";
	}
	/**
	* Observe changes to the host page that might affect theming
	* (color-scheme toggle, class changes on <html>/<body>, style attribute changes).
	*
	* Returns a cleanup function to stop observing.
	*
	* @param el        The calendar's root element.
	* @param callback  Called with the new CSS string whenever the host theme changes.
	* @param options   Passthrough to probeHostTheme.
	*/
	function observeHostTheme(el, callback, options = {}) {
		let last = "";
		const update = () => {
			const next = probeHostTheme(el, options);
			if (next !== last) {
				last = next;
				callback(next);
			}
		};
		const mql = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
		const onScheme = () => update();
		mql?.addEventListener("change", onScheme);
		let rafId = 0;
		const scheduleUpdate = () => {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				rafId = requestAnimationFrame(update);
			});
		};
		const observer = new MutationObserver(scheduleUpdate);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: [
				"class",
				"style",
				"data-theme",
				"data-mode",
				"color-scheme"
			]
		});
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: [
				"class",
				"style",
				"data-theme",
				"data-mode",
				"color-scheme"
			]
		});
		if (document.readyState !== "complete") window.addEventListener("load", scheduleUpdate, { once: true });
		document.fonts?.ready?.then(scheduleUpdate).catch(() => {});
		update();
		return () => {
			cancelAnimationFrame(rafId);
			mql?.removeEventListener("change", onScheme);
			window.removeEventListener("load", scheduleUpdate);
			observer.disconnect();
		};
	}
	//#endregion
	//#region src/lib/views/shared/context.svelte.ts
	function useCalendarContext() {
		const raw = getContext("calendar");
		const disabledSet = /* @__PURE__ */ user_derived(() => new Set(raw?.disabledDates?.map((d) => sod(d.getTime())) ?? []));
		const loadRange = raw ? {
			get current() {
				return raw.loadRange;
			},
			set: (r) => raw.setLoadRange(r)
		} : void 0;
		return {
			get viewState() {
				return raw?.viewState;
			},
			get drag() {
				return raw?.drag;
			},
			get commitDrag() {
				return raw?.commitDrag;
			},
			get snapInterval() {
				return raw?.snapInterval ?? 15;
			},
			get minColumnWidth() {
				return raw?.minColumnWidth ?? 110;
			},
			get equalDays() {
				return raw?.equalDays ?? false;
			},
			get showDates() {
				return raw?.showDates ?? true;
			},
			get hideDays() {
				return raw?.hideDays;
			},
			get isMobile() {
				return raw?.mobile ?? false;
			},
			get autoHeight() {
				return raw?.autoHeight ?? false;
			},
			get compact() {
				return raw?.compact ?? false;
			},
			get columns() {
				return raw?.columns ?? false;
			},
			get readOnly() {
				return raw?.readOnly ?? false;
			},
			get blockedSlots() {
				return raw?.blockedSlots;
			},
			get dayHeaderSnippet() {
				return raw?.dayHeaderSnippet;
			},
			get minDuration() {
				return raw?.minDuration;
			},
			get maxDuration() {
				return raw?.maxDuration;
			},
			get oneventhover() {
				return raw?.oneventhover;
			},
			get oneventmove() {
				return raw?.oneventmove;
			},
			get ondayclick() {
				return raw?.ondayclick;
			},
			get timezone() {
				return raw?.timezone;
			},
			get disabledDates() {
				return raw?.disabledDates;
			},
			get disabledSet() {
				return get(disabledSet);
			},
			get loadRange() {
				return loadRange;
			},
			get eventSnippet() {
				return raw?.eventSnippet;
			},
			get emptySnippet() {
				return raw?.emptySnippet;
			},
			get labels() {
				return raw?.labels ?? getLabels();
			}
		};
	}
	//#endregion
	//#region src/lib/views/shared/EventContent.svelte
	function EventContent($$anchor, $$props) {
		push($$props, true);
		const ctx = useCalendarContext();
		const eventSnippet = /* @__PURE__ */ user_derived(() => ctx.eventSnippet);
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var fragment_1 = comment();
			snippet(first_child(fragment_1), () => get(eventSnippet), () => $$props.event);
			append($$anchor, fragment_1);
		};
		var alternate = ($$anchor) => {
			var fragment_2 = comment();
			snippet(first_child(fragment_2), () => $$props.children);
			append($$anchor, fragment_2);
		};
		if_block(node, ($$render) => {
			if (get(eventSnippet)) $$render(consequent);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
		pop();
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/tzTokenizeDate/index.js
	/**
	* Returns the [year, month, day, hour, minute, seconds] tokens of the provided
	* `date` as it will be rendered in the `timeZone`.
	*/
	function tzTokenizeDate(date, timeZone) {
		const dtf = getDateTimeFormat(timeZone);
		return "formatToParts" in dtf ? partsOffset(dtf, date) : hackyOffset(dtf, date);
	}
	var typeToPos = {
		year: 0,
		month: 1,
		day: 2,
		hour: 3,
		minute: 4,
		second: 5
	};
	function partsOffset(dtf, date) {
		try {
			const formatted = dtf.formatToParts(date);
			const filled = [];
			for (let i = 0; i < formatted.length; i++) {
				const pos = typeToPos[formatted[i].type];
				if (pos !== void 0) filled[pos] = parseInt(formatted[i].value, 10);
			}
			return filled;
		} catch (error) {
			if (error instanceof RangeError) return [NaN];
			throw error;
		}
	}
	function hackyOffset(dtf, date) {
		const formatted = dtf.format(date);
		const parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
		return [
			parseInt(parsed[3], 10),
			parseInt(parsed[1], 10),
			parseInt(parsed[2], 10),
			parseInt(parsed[4], 10),
			parseInt(parsed[5], 10),
			parseInt(parsed[6], 10)
		];
	}
	var dtfCache = {};
	var testDateFormatted = new Intl.DateTimeFormat("en-US", {
		hourCycle: "h23",
		timeZone: "America/New_York",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z"));
	var hourCycleSupported = testDateFormatted === "06/25/2014, 00:00:00" || testDateFormatted === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
	function getDateTimeFormat(timeZone) {
		if (!dtfCache[timeZone]) dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat("en-US", {
			hourCycle: "h23",
			timeZone,
			year: "numeric",
			month: "numeric",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}) : new Intl.DateTimeFormat("en-US", {
			hour12: false,
			timeZone,
			year: "numeric",
			month: "numeric",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
		return dtfCache[timeZone];
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/newDateUTC/index.js
	/**
	* Use instead of `new Date(Date.UTC(...))` to support years below 100 which doesn't work
	* otherwise due to the nature of the
	* [`Date` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#interpretation_of_two-digit_years.
	*
	* For `Date.UTC(...)`, use `newDateUTC(...).getTime()`.
	*/
	function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
		const utcDate = /* @__PURE__ */ new Date(0);
		utcDate.setUTCFullYear(fullYear, month, day);
		utcDate.setUTCHours(hour, minute, second, millisecond);
		return utcDate;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/tzParseTimezone/index.js
	var MILLISECONDS_IN_HOUR$1 = 36e5;
	var MILLISECONDS_IN_MINUTE$1 = 6e4;
	var patterns$1 = {
		timezone: /([Z+-].*)$/,
		timezoneZ: /^(Z)$/,
		timezoneHH: /^([+-]\d{2})$/,
		timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
	};
	function tzParseTimezone(timezoneString, date, isUtcDate) {
		if (!timezoneString) return 0;
		let token = patterns$1.timezoneZ.exec(timezoneString);
		if (token) return 0;
		let hours;
		let absoluteOffset;
		token = patterns$1.timezoneHH.exec(timezoneString);
		if (token) {
			hours = parseInt(token[1], 10);
			if (!validateTimezone(hours)) return NaN;
			return -(hours * MILLISECONDS_IN_HOUR$1);
		}
		token = patterns$1.timezoneHHMM.exec(timezoneString);
		if (token) {
			hours = parseInt(token[2], 10);
			const minutes = parseInt(token[3], 10);
			if (!validateTimezone(hours, minutes)) return NaN;
			absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR$1 + minutes * MILLISECONDS_IN_MINUTE$1;
			return token[1] === "+" ? -absoluteOffset : absoluteOffset;
		}
		if (isValidTimezoneIANAString(timezoneString)) {
			date = new Date(date || Date.now());
			const offset = calcOffset(isUtcDate ? date : toUtcDate(date), timezoneString);
			return -(isUtcDate ? offset : fixOffset(date, offset, timezoneString));
		}
		return NaN;
	}
	function toUtcDate(date) {
		return newDateUTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
	}
	function calcOffset(date, timezoneString) {
		const tokens = tzTokenizeDate(date, timezoneString);
		const asUTC = newDateUTC(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
		let asTS = date.getTime();
		const over = asTS % 1e3;
		asTS -= over >= 0 ? over : 1e3 + over;
		return asUTC - asTS;
	}
	function fixOffset(date, offset, timezoneString) {
		let utcGuess = date.getTime() - offset;
		const o2 = calcOffset(new Date(utcGuess), timezoneString);
		if (offset === o2) return offset;
		utcGuess -= o2 - offset;
		const o3 = calcOffset(new Date(utcGuess), timezoneString);
		if (o2 === o3) return o2;
		return Math.max(o2, o3);
	}
	function validateTimezone(hours, minutes) {
		return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
	}
	var validIANATimezoneCache = {};
	function isValidTimezoneIANAString(timeZoneString) {
		if (validIANATimezoneCache[timeZoneString]) return true;
		try {
			new Intl.DateTimeFormat(void 0, { timeZone: timeZoneString });
			validIANATimezoneCache[timeZoneString] = true;
			return true;
		} catch (error) {
			return false;
		}
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
	/**
	* Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
	* They usually appear for dates that denote time before the timezones were introduced
	* (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
	* and GMT+01:00:00 after that date)
	*
	* Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
	* which would lead to incorrect calculations.
	*
	* This function returns the timezone offset in milliseconds that takes seconds in account.
	*/
	function getTimezoneOffsetInMilliseconds(date) {
		const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
		utcDate.setUTCFullYear(date.getFullYear());
		return +date - +utcDate;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/tzPattern/index.js
	/** Regex to identify the presence of a time zone specifier in a date string */
	var tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/toDate/index.js
	var MILLISECONDS_IN_HOUR = 36e5;
	var MILLISECONDS_IN_MINUTE = 6e4;
	var DEFAULT_ADDITIONAL_DIGITS = 2;
	var patterns = {
		dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
		datePattern: /^([0-9W+-]+)(.*)/,
		plainTime: /:/,
		YY: /^(\d{2})$/,
		YYY: [
			/^([+-]\d{2})$/,
			/^([+-]\d{3})$/,
			/^([+-]\d{4})$/
		],
		YYYY: /^(\d{4})/,
		YYYYY: [
			/^([+-]\d{4})/,
			/^([+-]\d{5})/,
			/^([+-]\d{6})/
		],
		MM: /^-(\d{2})$/,
		DDD: /^-?(\d{3})$/,
		MMDD: /^-?(\d{2})-?(\d{2})$/,
		Www: /^-?W(\d{2})$/,
		WwwD: /^-?W(\d{2})-?(\d{1})$/,
		HH: /^(\d{2}([.,]\d*)?)$/,
		HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
		HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
		timeZone: tzPattern
	};
	/**
	* @name toDate
	* @category Common Helpers
	* @summary Convert the given argument to an instance of Date.
	*
	* @description
	* Convert the given argument to an instance of Date.
	*
	* If the argument is an instance of Date, the function returns its clone.
	*
	* If the argument is a number, it is treated as a timestamp.
	*
	* If an argument is a string, the function tries to parse it.
	* Function accepts complete ISO 8601 formats as well as partial implementations.
	* ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
	* If the function cannot parse the string or the values are invalid, it returns Invalid Date.
	*
	* If the argument is none of the above, the function returns Invalid Date.
	*
	* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	* All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
	*
	* @param argument the value to convert
	* @param options the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	* @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
	* @param {string} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
	*
	* @returns the parsed date in the local time zone
	* @throws {TypeError} 1 argument required
	* @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	*
	* @example
	* // Convert string '2014-02-11T11:30:30' to date:
	* const result = toDate('2014-02-11T11:30:30')
	* //=> Tue Feb 11 2014 11:30:30
	*
	* @example
	* // Convert string '+02014101' to date,
	* // if the additional number of digits in the extended year format is 1:
	* const result = toDate('+02014101', {additionalDigits: 1})
	* //=> Fri Apr 11 2014 00:00:00
	*/
	function toDate(argument, options = {}) {
		if (arguments.length < 1) throw new TypeError("1 argument required, but only " + arguments.length + " present");
		if (argument === null) return /* @__PURE__ */ new Date(NaN);
		const additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
		if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) throw new RangeError("additionalDigits must be 0, 1 or 2");
		if (argument instanceof Date || typeof argument === "object" && Object.prototype.toString.call(argument) === "[object Date]") return new Date(argument.getTime());
		else if (typeof argument === "number" || Object.prototype.toString.call(argument) === "[object Number]") return new Date(argument);
		else if (!(Object.prototype.toString.call(argument) === "[object String]")) return /* @__PURE__ */ new Date(NaN);
		const dateStrings = splitDateString(argument);
		const { year, restDateString } = parseYear(dateStrings.date, additionalDigits);
		const date = parseDate(restDateString, year);
		if (date === null || isNaN(date.getTime())) return /* @__PURE__ */ new Date(NaN);
		if (date) {
			const timestamp = date.getTime();
			let time = 0;
			let offset;
			if (dateStrings.time) {
				time = parseTime(dateStrings.time);
				if (time === null || isNaN(time)) return /* @__PURE__ */ new Date(NaN);
			}
			if (dateStrings.timeZone || options.timeZone) {
				offset = tzParseTimezone(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));
				if (isNaN(offset)) return /* @__PURE__ */ new Date(NaN);
			} else {
				offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time));
				offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time + offset));
			}
			return new Date(timestamp + time + offset);
		} else return /* @__PURE__ */ new Date(NaN);
	}
	function splitDateString(dateString) {
		const dateStrings = {};
		let parts = patterns.dateTimePattern.exec(dateString);
		let timeString;
		if (!parts) {
			parts = patterns.datePattern.exec(dateString);
			if (parts) {
				dateStrings.date = parts[1];
				timeString = parts[2];
			} else {
				dateStrings.date = null;
				timeString = dateString;
			}
		} else {
			dateStrings.date = parts[1];
			timeString = parts[3];
		}
		if (timeString) {
			const token = patterns.timeZone.exec(timeString);
			if (token) {
				dateStrings.time = timeString.replace(token[1], "");
				dateStrings.timeZone = token[1].trim();
			} else dateStrings.time = timeString;
		}
		return dateStrings;
	}
	function parseYear(dateString, additionalDigits) {
		if (dateString) {
			const patternYYY = patterns.YYY[additionalDigits];
			const patternYYYYY = patterns.YYYYY[additionalDigits];
			let token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
			if (token) {
				const yearString = token[1];
				return {
					year: parseInt(yearString, 10),
					restDateString: dateString.slice(yearString.length)
				};
			}
			token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
			if (token) {
				const centuryString = token[1];
				return {
					year: parseInt(centuryString, 10) * 100,
					restDateString: dateString.slice(centuryString.length)
				};
			}
		}
		return { year: null };
	}
	function parseDate(dateString, year) {
		if (year === null) return null;
		let date;
		let month;
		let week;
		if (!dateString || !dateString.length) {
			date = /* @__PURE__ */ new Date(0);
			date.setUTCFullYear(year);
			return date;
		}
		let token = patterns.MM.exec(dateString);
		if (token) {
			date = /* @__PURE__ */ new Date(0);
			month = parseInt(token[1], 10) - 1;
			if (!validateDate(year, month)) return /* @__PURE__ */ new Date(NaN);
			date.setUTCFullYear(year, month);
			return date;
		}
		token = patterns.DDD.exec(dateString);
		if (token) {
			date = /* @__PURE__ */ new Date(0);
			const dayOfYear = parseInt(token[1], 10);
			if (!validateDayOfYearDate(year, dayOfYear)) return /* @__PURE__ */ new Date(NaN);
			date.setUTCFullYear(year, 0, dayOfYear);
			return date;
		}
		token = patterns.MMDD.exec(dateString);
		if (token) {
			date = /* @__PURE__ */ new Date(0);
			month = parseInt(token[1], 10) - 1;
			const day = parseInt(token[2], 10);
			if (!validateDate(year, month, day)) return /* @__PURE__ */ new Date(NaN);
			date.setUTCFullYear(year, month, day);
			return date;
		}
		token = patterns.Www.exec(dateString);
		if (token) {
			week = parseInt(token[1], 10) - 1;
			if (!validateWeekDate(week)) return /* @__PURE__ */ new Date(NaN);
			return dayOfISOWeekYear(year, week);
		}
		token = patterns.WwwD.exec(dateString);
		if (token) {
			week = parseInt(token[1], 10) - 1;
			const dayOfWeek = parseInt(token[2], 10) - 1;
			if (!validateWeekDate(week, dayOfWeek)) return /* @__PURE__ */ new Date(NaN);
			return dayOfISOWeekYear(year, week, dayOfWeek);
		}
		return null;
	}
	function parseTime(timeString) {
		let hours;
		let minutes;
		let token = patterns.HH.exec(timeString);
		if (token) {
			hours = parseFloat(token[1].replace(",", "."));
			if (!validateTime(hours)) return NaN;
			return hours % 24 * MILLISECONDS_IN_HOUR;
		}
		token = patterns.HHMM.exec(timeString);
		if (token) {
			hours = parseInt(token[1], 10);
			minutes = parseFloat(token[2].replace(",", "."));
			if (!validateTime(hours, minutes)) return NaN;
			return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
		}
		token = patterns.HHMMSS.exec(timeString);
		if (token) {
			hours = parseInt(token[1], 10);
			minutes = parseInt(token[2], 10);
			const seconds = parseFloat(token[3].replace(",", "."));
			if (!validateTime(hours, minutes, seconds)) return NaN;
			return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1e3;
		}
		return null;
	}
	function dayOfISOWeekYear(isoWeekYear, week, day) {
		week = week || 0;
		day = day || 0;
		const date = /* @__PURE__ */ new Date(0);
		date.setUTCFullYear(isoWeekYear, 0, 4);
		const fourthOfJanuaryDay = date.getUTCDay() || 7;
		const diff = week * 7 + day + 1 - fourthOfJanuaryDay;
		date.setUTCDate(date.getUTCDate() + diff);
		return date;
	}
	var DAYS_IN_MONTH = [
		31,
		28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	var DAYS_IN_MONTH_LEAP_YEAR = [
		31,
		29,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	function isLeapYearIndex(year) {
		return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	}
	function validateDate(year, month, date) {
		if (month < 0 || month > 11) return false;
		if (date != null) {
			if (date < 1) return false;
			const isLeapYear = isLeapYearIndex(year);
			if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) return false;
			if (!isLeapYear && date > DAYS_IN_MONTH[month]) return false;
		}
		return true;
	}
	function validateDayOfYearDate(year, dayOfYear) {
		if (dayOfYear < 1) return false;
		const isLeapYear = isLeapYearIndex(year);
		if (isLeapYear && dayOfYear > 366) return false;
		if (!isLeapYear && dayOfYear > 365) return false;
		return true;
	}
	function validateWeekDate(week, day) {
		if (week < 0 || week > 52) return false;
		if (day != null && (day < 0 || day > 6)) return false;
		return true;
	}
	function validateTime(hours, minutes, seconds) {
		if (hours < 0 || hours >= 25) return false;
		if (minutes != null && (minutes < 0 || minutes >= 60)) return false;
		if (seconds != null && (seconds < 0 || seconds >= 60)) return false;
		return true;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/toZonedTime/index.js
	/**
	* @name toZonedTime
	* @category Time Zone Helpers
	* @summary Get a date/time representing local time in a given time zone from the UTC date
	*
	* @description
	* Returns a date instance with values representing the local time in the time zone
	* specified of the UTC time from the date provided. In other words, when the new date
	* is formatted it will show the equivalent hours in the target time zone regardless
	* of the current system time zone.
	*
	* @param date the date with the relevant UTC time
	* @param timeZone the time zone to get local time for, can be an offset or IANA time zone
	* @param options the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	* @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	*
	* @throws {TypeError} 2 arguments required
	* @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	*
	* @example
	* // In June 10am UTC is 6am in New York (-04:00)
	* const result = toZonedTime('2014-06-25T10:00:00.000Z', 'America/New_York')
	* //=> Jun 25 2014 06:00:00
	*/
	function toZonedTime$1(date, timeZone, options) {
		date = toDate(date, options);
		const offsetMilliseconds = tzParseTimezone(timeZone, date, true);
		const d = new Date(date.getTime() - offsetMilliseconds);
		const resultDate = /* @__PURE__ */ new Date(0);
		resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
		resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
		return resultDate;
	}
	//#endregion
	//#region ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/fromZonedTime/index.js
	/**
	* @name fromZonedTime
	* @category Time Zone Helpers
	* @summary Get the UTC date/time from a date representing local time in a given time zone
	*
	* @description
	* Returns a date instance with the UTC time of the provided date of which the values
	* represented the local time in the time zone specified. In other words, if the input
	* date represented local time in time zone, the timestamp of the output date will
	* give the equivalent UTC of that local time regardless of the current system time zone.
	*
	* @param date the date with values representing the local time
	* @param timeZone the time zone of this local time, can be an offset or IANA time zone
	* @param options the object with options. See [Options]{@link https://date-fns.org/docs/Options}
	* @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	* @throws {TypeError} 2 arguments required
	* @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
	*
	* @example
	* // In June 10am in Los Angeles is 5pm UTC
	* const result = fromZonedTime(new Date(2014, 5, 25, 10, 0, 0), 'America/Los_Angeles')
	* //=> 2014-06-25T17:00:00.000Z
	*/
	function fromZonedTime$1(date, timeZone, options) {
		if (typeof date === "string" && !date.match(tzPattern)) return toDate(date, {
			...options,
			timeZone
		});
		date = toDate(date, options);
		const utc = newDateUTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()).getTime();
		const offsetMilliseconds = tzParseTimezone(timeZone, new Date(utc));
		return new Date(utc + offsetMilliseconds);
	}
	//#endregion
	//#region src/lib/core/timezone.ts
	/**
	* Timezone utilities — convert between IANA timezones and local time.
	*
	* Uses date-fns-tz under the hood. All functions accept an IANA timezone
	* string (e.g. 'America/New_York', 'Europe/Warsaw', 'Asia/Tokyo').
	*
	* Usage:
	*   import { toZonedTime, fromZonedTime, nowInZone } from '@nomideusz/svelte-calendar';
	*
	*   // Convert a UTC date to display in a specific timezone
	*   const localDate = toZonedTime(utcDate, 'America/New_York');
	*
	*   // Convert a "display" date back to UTC for storage
	*   const utcDate = fromZonedTime(localDate, 'America/New_York');
	*
	*   // Get current time in a timezone
	*   const now = nowInZone('Asia/Tokyo');
	*/
	/**
	* Convert a Date (assumed UTC or local) to a Date representing
	* the same instant in the target timezone.
	*
	* The returned Date's local getters (getHours, getMinutes, etc.)
	* will return the values as they appear in the target timezone.
	*/
	function toZonedTime(date, timezone) {
		return toZonedTime$1(date, timezone);
	}
	/**
	* Convert a "zoned" Date (whose local getters represent a specific timezone)
	* back to a true UTC Date. Use this before persisting to a backend.
	*/
	function fromZonedTime(date, timezone) {
		return fromZonedTime$1(date, timezone);
	}
	function wrapAdapterWithTimezone(adapter, timezone) {
		const zoneEvent = (ev) => ({
			...ev,
			start: toZonedTime(ev.start, timezone),
			end: toZonedTime(ev.end, timezone)
		});
		const unzonePartial = (obj) => ({
			...obj,
			...obj.start instanceof Date ? { start: fromZonedTime(obj.start, timezone) } : {},
			...obj.end instanceof Date ? { end: fromZonedTime(obj.end, timezone) } : {}
		});
		const wrapped = { async fetchEvents(range) {
			return (await adapter.fetchEvents({
				start: fromZonedTime(range.start, timezone),
				end: fromZonedTime(range.end, timezone)
			})).map(zoneEvent);
		} };
		if (adapter.createEvent) wrapped.createEvent = async (event) => zoneEvent(await adapter.createEvent(unzonePartial(event)));
		if (adapter.updateEvent) wrapped.updateEvent = async (id, patch) => zoneEvent(await adapter.updateEvent(id, unzonePartial(patch)));
		if (adapter.deleteEvent) wrapped.deleteEvent = (id) => adapter.deleteEvent(id);
		return wrapped;
	}
	//#endregion
	//#region src/lib/core/clock.svelte.ts
	function createClock(timezone) {
		const now = () => timezone ? toZonedTime(Date.now(), timezone).getTime() : Date.now();
		let tick = /* @__PURE__ */ state(proxy(now()));
		let today = /* @__PURE__ */ state(proxy(sod(get(tick))));
		let intervalId = null;
		function start() {
			intervalId = setInterval(() => {
				set(tick, now(), true);
				const sd = sod(get(tick));
				if (sd !== get(today)) set(today, sd, true);
			}, 1e3);
		}
		function destroy() {
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
		}
		try {
			onMount(() => {
				start();
				return destroy;
			});
		} catch {}
		return {
			get tick() {
				return get(tick);
			},
			get today() {
				return get(today);
			},
			get hm() {
				return fmtHM(get(tick));
			},
			get s() {
				return fmtS(get(tick));
			},
			get fractionalHour() {
				return fractionalHour(get(tick));
			},
			destroy
		};
	}
	//#endregion
	//#region src/lib/views/planner/PlannerWeek.svelte
	var root_1$6 = /* @__PURE__ */ from_html(`<span class="tw-ad-cont svelte-j4rvbp" aria-hidden="true">◂</span>`);
	var root_2$6 = /* @__PURE__ */ from_html(`<span class="tw-ad-span svelte-j4rvbp" aria-hidden="true"> </span>`);
	var root_3$6 = /* @__PURE__ */ from_html(`<span class="tw-ad-arrow svelte-j4rvbp" aria-hidden="true">▸</span>`);
	var root_4$6 = /* @__PURE__ */ from_html(`<button type="button"><!> <span class="tw-ad-title svelte-j4rvbp"> </span> <!> <!></button>`);
	var root_5$6 = /* @__PURE__ */ from_html(`<span> </span>`);
	var root_6$6 = /* @__PURE__ */ from_html(`<div class="tw-hd-custom svelte-j4rvbp"><!></div>`);
	var root_7$6 = /* @__PURE__ */ from_html(`<div><span class="tw-hd-wd svelte-j4rvbp"> </span> <!> <!></div>`);
	var root_8$6 = /* @__PURE__ */ from_html(`<div class="tw-head svelte-j4rvbp"><div class="tw-corner svelte-j4rvbp" aria-hidden="true"></div> <!></div>`);
	var root_9$4 = /* @__PURE__ */ from_html(`<button type="button" class="tw-ad-more svelte-j4rvbp"> </button>`);
	var root_10$4 = /* @__PURE__ */ from_html(`<div><!> <!></div>`);
	var root_11$4 = /* @__PURE__ */ from_html(`<div class="tw-allday svelte-j4rvbp"><div class="tw-ad-gutter svelte-j4rvbp"><span class="tw-ad-gutter-lb svelte-j4rvbp"> </span></div> <!></div>`);
	var root_12$4 = /* @__PURE__ */ from_html(`<div class="tw-top svelte-j4rvbp"><!> <!></div>`);
	var root_13$3 = /* @__PURE__ */ from_html(`<span class="tw-gutter-lb svelte-j4rvbp"> </span>`);
	var root_14$3 = /* @__PURE__ */ from_html(`<span class="tw-gutter-now svelte-j4rvbp"></span>`);
	var root_15$3 = /* @__PURE__ */ from_html(`<div class="tw-line svelte-j4rvbp"></div> <div class="tw-line tw-line--half svelte-j4rvbp"></div>`, 1);
	var root_16$3 = /* @__PURE__ */ from_html(`<span class="tw-blocked-lb svelte-j4rvbp"> </span>`);
	var root_17$3 = /* @__PURE__ */ from_html(`<div class="tw-blocked svelte-j4rvbp"><!></div>`);
	var root_18$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-loc svelte-j4rvbp"> </span>`);
	var root_19$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-time svelte-j4rvbp"> </span> <span class="tw-ev-title svelte-j4rvbp"> </span> <!>`, 1);
	var root_20$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-live svelte-j4rvbp" aria-hidden="true"></span>`);
	var root_21$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-handle tw-ev-handle--start svelte-j4rvbp" aria-hidden="true"></span> <span class="tw-ev-handle tw-ev-handle--end svelte-j4rvbp" aria-hidden="true"></span>`, 1);
	var root_22$2 = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><div class="tw-ev-stripe svelte-j4rvbp" aria-hidden="true"></div> <div class="tw-ev-body svelte-j4rvbp"><!></div> <!> <!></div>`);
	var root_23$2 = /* @__PURE__ */ from_html(`<span class="tw-ghost-title svelte-j4rvbp"> </span>`);
	var root_24$2 = /* @__PURE__ */ from_html(`<span class="tw-ghost-time svelte-j4rvbp"> </span> <!>`, 1);
	var root_25$2 = /* @__PURE__ */ from_html(`<div aria-hidden="true"><!></div>`);
	var root_26$2 = /* @__PURE__ */ from_html(`<div class="tw-now svelte-j4rvbp"><span class="tw-now-dot svelte-j4rvbp" aria-hidden="true"></span></div>`);
	var root_27$2 = /* @__PURE__ */ from_html(`<div><!> <!> <!> <!></div>`);
	var root_28$2 = /* @__PURE__ */ from_html(`<div class="tw-empty svelte-j4rvbp"><!></div>`);
	var root_29$2 = /* @__PURE__ */ from_html(`<div role="region"><div class="tw-scroll svelte-j4rvbp"><div class="tw-inner svelte-j4rvbp"><!> <div class="tw-body svelte-j4rvbp"><div class="tw-gutter svelte-j4rvbp" aria-hidden="true"><!> <!></div>  <div class="tw-cols svelte-j4rvbp" role="presentation"><div class="tw-lines svelte-j4rvbp" aria-hidden="true"></div> <!></div></div></div></div> <!></div>`);
	function PlannerWeek($$anchor, $$props) {
		push($$props, true);
		const allDayChip = ($$anchor, seg = noop) => {
			var button = root_4$6();
			let classes;
			let styles;
			var node = child(button);
			var consequent = ($$anchor) => {
				append($$anchor, root_1$6());
			};
			if_block(node, ($$render) => {
				if (!seg().isStart) $$render(consequent);
			});
			var span_1 = sibling(node, 2);
			var text = child(span_1, true);
			reset(span_1);
			var node_1 = sibling(span_1, 2);
			var consequent_1 = ($$anchor) => {
				var span_2 = root_2$6();
				var text_1 = child(span_2);
				reset(span_2);
				template_effect(() => set_text(text_1, `${seg().dayIndex ?? ""}/${seg().totalDays ?? ""}`));
				append($$anchor, span_2);
			};
			if_block(node_1, ($$render) => {
				if (seg().totalDays > 1) $$render(consequent_1);
			});
			var node_2 = sibling(node_1, 2);
			var consequent_2 = ($$anchor) => {
				append($$anchor, root_3$6());
			};
			if_block(node_2, ($$render) => {
				if (!seg().isEnd && seg().totalDays > 1) $$render(consequent_2);
			});
			reset(button);
			template_effect(($0, $1) => {
				classes = set_class(button, 1, "tw-ad svelte-j4rvbp", null, classes, {
					"tw-ad--start": seg().isStart,
					"tw-ad--end": seg().isEnd,
					"tw-ad--mid": !seg().isStart && !seg().isEnd,
					"tw-ad--selected": selectedEventId() === seg().ev.id,
					"tw-ad--cancelled": seg().ev.status === "cancelled"
				});
				set_attribute(button, "aria-label", `${seg().ev.title ?? ""}${$0 ?? ""}${$1 ?? ""}`);
				styles = set_style(button, "", styles, { "--ev-color": seg().ev.color ?? "var(--dt-accent)" });
				set_text(text, seg().ev.title);
			}, [() => seg().totalDays > 1 ? `, ${get(L).dayNOfTotal(seg().dayIndex, seg().totalDays)}` : `, ${get(L).allDay}`, () => statusText(seg().ev)]);
			delegated("click", button, () => $$props.oneventclick?.(seg().ev));
			event("pointerenter", button, () => get(oneventhover)?.(seg().ev));
			append($$anchor, button);
		};
		let mode = prop($$props, "mode", 3, "week"), mondayStart = prop($$props, "mondayStart", 3, true), height = prop($$props, "height", 3, 520), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null), readOnly = prop($$props, "readOnly", 3, false);
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		const clock = createClock(ctx.timezone);
		const drag = /* @__PURE__ */ user_derived(() => ctx.drag);
		const commitDragCtx = /* @__PURE__ */ user_derived(() => ctx.commitDrag);
		const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
		const loadRangeCtx = /* @__PURE__ */ user_derived(() => ctx.loadRange);
		const equalDays = /* @__PURE__ */ user_derived(() => ctx.equalDays);
		const showDates = /* @__PURE__ */ user_derived(() => ctx.showDates);
		const hideDays = /* @__PURE__ */ user_derived(() => ctx.hideDays);
		const blockedSlots = /* @__PURE__ */ user_derived(() => ctx.blockedSlots);
		const dayHeaderSnippet = /* @__PURE__ */ user_derived(() => ctx.dayHeaderSnippet);
		const minDuration = /* @__PURE__ */ user_derived(() => ctx.minDuration);
		const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
		const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
		const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
		const SNAP_MS = /* @__PURE__ */ user_derived(() => ctx.snapInterval * 6e4);
		const HOUR_H = 48;
		const GUTTER_W = 48;
		const MIN_COL_W = /* @__PURE__ */ user_derived(() => ctx.minColumnWidth);
		const ALLDAY_MAX = 3;
		const startHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[0] ?? 0);
		const endHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[1] ?? 24);
		const hourCount = /* @__PURE__ */ user_derived(() => Math.max(1, get(endHour) - get(startHour)));
		const gridHeight = /* @__PURE__ */ user_derived(() => get(hourCount) * HOUR_H);
		let scrollEl;
		let colsEl;
		const todayMs = /* @__PURE__ */ user_derived(() => clock.today);
		const singleDay = /* @__PURE__ */ user_derived(() => mode() === "day" || get(viewState)?.mode === "day");
		const customDays = /* @__PURE__ */ user_derived(() => get(singleDay) ? 1 : get(viewState)?.dayCount ?? 7);
		const hideDayHead = /* @__PURE__ */ user_derived(() => get(singleDay) && get(showDates) && !!get(viewState) && !get(dayHeaderSnippet));
		const weekStartMs = /* @__PURE__ */ user_derived(() => {
			const r = get(viewState)?.range;
			if (r) return sod(r.start.getTime());
			const f = $$props.focusDate?.getTime() ?? get(todayMs);
			return get(customDays) === 7 ? startOfWeek(f, mondayStart()) : sod(f);
		});
		const weekEndMs = /* @__PURE__ */ user_derived(() => addDaysMs(get(weekStartMs), get(customDays)));
		const weekHasToday = /* @__PURE__ */ user_derived(() => get(todayMs) >= get(weekStartMs) && get(todayMs) < get(weekEndMs));
		const dayCols = /* @__PURE__ */ user_derived(() => {
			const cols = [];
			for (let d = 0; d < get(customDays); d++) {
				const ms = addDaysMs(get(weekStartMs), d);
				const date = new Date(ms);
				const dow = date.getDay();
				const isoDay = dow === 0 ? 7 : dow;
				if (get(hideDays)?.includes(isoDay)) continue;
				cols.push({
					ms,
					isToday: ms === get(todayMs),
					isPast: get(equalDays) ? false : ms < get(todayMs),
					isWeekend: dow === 0 || dow === 6,
					isDisabled: get(disabledSet).has(ms),
					isoDay,
					dayNum: date.getDate()
				});
			}
			return cols;
		});
		const innerMinWidth = /* @__PURE__ */ user_derived(() => GUTTER_W + get(dayCols).length * get(MIN_COL_W));
		user_effect(() => {
			if (!get(loadRangeCtx)) return;
			const rangeStart = /* @__PURE__ */ new Date(get(weekStartMs) - 7 * DAY_MS);
			const rangeEnd = new Date(get(weekEndMs) + 7 * DAY_MS);
			get(loadRangeCtx).set({
				start: rangeStart,
				end: rangeEnd
			});
			return () => get(loadRangeCtx).set(null);
		});
		const allDayByDay = /* @__PURE__ */ user_derived(() => {
			const map = /* @__PURE__ */ new Map();
			for (const day of get(dayCols)) {
				const segs = [];
				for (const ev of events()) {
					if (!isAllDay(ev) && !isMultiDay(ev)) continue;
					const seg = segmentForDay(ev, day.ms);
					if (seg) segs.push(seg);
				}
				if (segs.length) map.set(day.ms, segs);
			}
			return map;
		});
		const hasAllDayRow = /* @__PURE__ */ user_derived(() => get(allDayByDay).size > 0);
		let adExpanded = proxy({});
		const movingId = /* @__PURE__ */ user_derived(() => get(drag)?.active && get(drag).mode === "move" ? get(drag).payload?.eventId ?? null : null);
		const movingEvent = /* @__PURE__ */ user_derived(() => get(movingId) ? events().find((e) => e.id === get(movingId)) ?? null : null);
		const layoutByDay = /* @__PURE__ */ user_derived(() => {
			const rsP = get(drag)?.active && (get(drag).mode === "resize-start" || get(drag).mode === "resize-end") ? get(drag).payload : null;
			const map = /* @__PURE__ */ new Map();
			for (const day of get(dayCols)) {
				const dayEnd = day.ms + DAY_MS;
				const bandStart = day.ms + get(startHour) * HOUR_MS;
				const bandEnd = day.ms + get(endHour) * HOUR_MS;
				const infos = [];
				for (const ev of events()) {
					if (isAllDay(ev) || isMultiDay(ev)) continue;
					const isResizing = rsP?.eventId === ev.id;
					const s0 = isResizing ? rsP.start.getTime() : ev.start.getTime();
					const e0 = isResizing ? rsP.end.getTime() : ev.end.getTime();
					if (s0 >= dayEnd || e0 <= day.ms) continue;
					const sMs = Math.max(s0, bandStart);
					const eMs = Math.min(e0, bandEnd);
					if (eMs <= sMs) continue;
					infos.push({
						ev,
						startMs: sMs,
						endMs: eMs,
						isResizing,
						isMoving: ev.id === get(movingId),
						col: 0,
						totalCols: 1
					});
				}
				infos.sort((a, b) => a.startMs - b.startMs || b.endMs - a.endMs);
				const par = infos.map((_, i) => i);
				function find(i) {
					while (par[i] !== i) {
						par[i] = par[par[i]];
						i = par[i];
					}
					return i;
				}
				for (let i = 0; i < infos.length; i++) for (let j = i + 1; j < infos.length; j++) if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
				else break;
				const groups = /* @__PURE__ */ new Map();
				for (let i = 0; i < infos.length; i++) {
					const root = find(i);
					if (!groups.has(root)) groups.set(root, []);
					groups.get(root).push(i);
				}
				for (const [, indices] of groups) {
					const lanes = [];
					for (const idx of indices) {
						const inf = infos[idx];
						let lane = 0;
						for (let r = 0; r < lanes.length; r++) {
							if (lanes[r] <= inf.startMs) {
								lane = r;
								lanes[r] = inf.endMs;
								break;
							}
							lane = r + 1;
						}
						if (lane >= lanes.length) lanes.push(inf.endMs);
						infos[idx].col = lane;
					}
					for (const idx of indices) infos[idx].totalCols = lanes.length;
				}
				map.set(day.ms, infos.map((inf) => ({
					ev: inf.ev,
					top: ((inf.startMs - day.ms) / HOUR_MS - get(startHour)) * HOUR_H,
					height: Math.max(24, (inf.endMs - inf.startMs) / HOUR_MS * HOUR_H),
					col: inf.col,
					totalCols: inf.totalCols,
					isResizing: inf.isResizing,
					isMoving: inf.isMoving
				})));
			}
			return map;
		});
		const nowIds = /* @__PURE__ */ user_derived(() => {
			const now = clock.tick;
			const s = /* @__PURE__ */ new Set();
			for (const ev of events()) if (ev.start.getTime() <= now && ev.end.getTime() > now) s.add(ev.id);
			return s;
		});
		const nowFracHour = /* @__PURE__ */ user_derived(() => (clock.tick - clock.today) / HOUR_MS);
		/** Y offset of the now-line, or null when outside visibleHours */
		const nowY = /* @__PURE__ */ user_derived(() => {
			if (get(nowFracHour) < get(startHour) || get(nowFracHour) > get(endHour)) return null;
			return (get(nowFracHour) - get(startHour)) * HOUR_H;
		});
		const weekIsEmpty = /* @__PURE__ */ user_derived(() => !events().some((ev) => ev.start.getTime() < get(weekEndMs) && ev.end.getTime() > get(weekStartMs)));
		user_effect(() => {
			get(weekStartMs);
			const el = scrollEl;
			if (!el) return;
			untrack(() => {
				let targetHour;
				if (get(weekHasToday)) {
					const clamped = Math.min(Math.max(get(nowFracHour), get(startHour)), get(endHour));
					targetHour = Math.max(get(startHour), clamped - 1);
				} else targetHour = Math.max(get(startHour), Math.min(8, get(endHour) - 1));
				el.scrollTop = (targetHour - get(startHour)) * HOUR_H;
			});
		});
		let rafId = 0;
		let rafRun = null;
		let rectCache = null;
		function perFrame(handler) {
			return (e) => {
				rafRun = () => {
					rectCache = colsEl?.getBoundingClientRect() ?? null;
					try {
						handler(e);
					} finally {
						rectCache = null;
					}
				};
				if (rafId) return;
				rafId = requestAnimationFrame(flushFrame);
			};
		}
		/** Run a pending move now — pointerup must not drop the last frame. */
		function flushFrame() {
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = 0;
			}
			const run = rafRun;
			rafRun = null;
			run?.();
		}
		function cancelFrame() {
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = 0;
			}
			rafRun = null;
		}
		function colsRect() {
			return rectCache ?? colsEl.getBoundingClientRect();
		}
		/** Pointer X → index into dayCols (clamped) */
		function pointerDayIndex(clientX) {
			const r = colsRect();
			const n = get(dayCols).length;
			if (n === 0) return 0;
			const w = r.width / n;
			return Math.max(0, Math.min(n - 1, Math.floor((clientX - r.left) / w)));
		}
		/** Pointer Y → fractional hour (unclamped) */
		function pointerHour(clientY) {
			return get(startHour) + (clientY - colsRect().top) / HOUR_H;
		}
		/** Pointer → epoch ms (day from X, time from Y, clamped into the band) */
		function pointerTimeMs(clientX, clientY) {
			return (get(dayCols)[pointerDayIndex(clientX)]?.ms ?? get(weekStartMs)) + Math.min(Math.max(pointerHour(clientY), get(startHour)), get(endHour)) * HOUR_MS;
		}
		/** Clamp a timestamp into the visible band of a specific day */
		function clampToDayBand(ms, dayMs) {
			return Math.max(dayMs + get(startHour) * HOUR_MS, Math.min(dayMs + get(endHour) * HOUR_MS, ms));
		}
		function isBlockedAt(dayMs, hour) {
			if (!get(blockedSlots)?.length) return false;
			const jsDay = new Date(dayMs).getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;
			return get(blockedSlots).some((slot) => {
				if (slot.day && slot.day !== isoDay) return false;
				return hour >= slot.start && hour < slot.end;
			});
		}
		function blockedRangeLabel(dayMs, slotStart, slotEnd) {
			return `${fmtTime$1(new Date(dayMs + slotStart * HOUR_MS), $$props.locale)} – ${fmtTime$1(new Date(dayMs + slotEnd * HOUR_MS), $$props.locale)}`;
		}
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		function ghostForDay(dayMs) {
			if (!get(drag)?.active || !get(drag).payload) return null;
			const mode = get(drag).mode;
			if (mode !== "move" && mode !== "create") return null;
			const s = get(drag).payload.start.getTime();
			const e = get(drag).payload.end.getTime();
			const bandS = dayMs + get(startHour) * HOUR_MS;
			const bandE = dayMs + get(endHour) * HOUR_MS;
			const cs = Math.max(s, bandS);
			const ce = Math.min(e, bandE);
			if (ce <= cs) return null;
			return {
				top: ((cs - dayMs) / HOUR_MS - get(startHour)) * HOUR_H,
				height: Math.max(12, (ce - cs) / HOUR_MS * HOUR_H),
				start: get(drag).payload.start,
				end: get(drag).payload.end,
				create: mode === "create",
				showTime: cs === Math.max(s, dayMs)
			};
		}
		const CREATE_THRESHOLD = 4;
		const LONG_PRESS_MS = 350;
		const LONG_PRESS_TOLERANCE = 8;
		let suppressColsClick = false;
		let crStartX = 0;
		let crStartY = 0;
		let crAnchorMs = 0;
		let crDayMs = 0;
		let crStarted = false;
		let longPressTimer = null;
		function blockTouchScroll(e) {
			e.preventDefault();
		}
		function addTouchScrollBlock() {
			window.addEventListener("touchmove", blockTouchScroll, { passive: false });
		}
		function removeTouchScrollBlock() {
			window.removeEventListener("touchmove", blockTouchScroll);
		}
		function clearLongPress() {
			if (longPressTimer !== null) {
				clearTimeout(longPressTimer);
				longPressTimer = null;
			}
		}
		function startColsCreate() {
			if (!get(drag)) return;
			crStarted = true;
			crAnchorMs = clampToDayBand(Math.floor(crAnchorMs / get(SNAP_MS)) * get(SNAP_MS), crDayMs);
			get(drag).beginCreate(new Date(crAnchorMs), new Date(crAnchorMs + get(SNAP_MS)));
			addTouchScrollBlock();
		}
		function onColsPointerDown(e) {
			if (e.button !== 0 || !get(drag) || !$$props.oneventcreate || readOnly()) return;
			if (e.target.closest(".tw-ev, .tw-ghost")) return;
			const day = get(dayCols)[pointerDayIndex(e.clientX)];
			if (!day || day.isDisabled) return;
			if (isBlockedAt(day.ms, Math.min(Math.max(pointerHour(e.clientY), get(startHour)), get(endHour)))) return;
			crStartX = e.clientX;
			crStartY = e.clientY;
			crDayMs = day.ms;
			crAnchorMs = clampToDayBand(day.ms + Math.max(pointerHour(e.clientY), get(startHour)) * HOUR_MS, day.ms);
			crStarted = false;
			if (e.pointerType === "touch") longPressTimer = setTimeout(() => {
				longPressTimer = null;
				startColsCreate();
			}, LONG_PRESS_MS);
			window.addEventListener("pointermove", onColsCreateMove);
			window.addEventListener("pointerup", onColsCreateUp, { once: true });
			window.addEventListener("pointercancel", onColsCreateCancel, { once: true });
		}
		const onColsCreateMove = perFrame((e) => {
			if (!get(drag)) return;
			if (!crStarted) {
				if (longPressTimer !== null) {
					if (Math.hypot(e.clientX - crStartX, e.clientY - crStartY) > LONG_PRESS_TOLERANCE) cleanupColsCreate();
					return;
				}
				if (e.pointerType === "touch") return;
				if (Math.abs(e.clientY - crStartY) < CREATE_THRESHOLD) return;
				startColsCreate();
			}
			const raw = crDayMs + pointerHour(e.clientY) * HOUR_MS;
			const snapped = clampToDayBand(Math.round(raw / get(SNAP_MS)) * get(SNAP_MS), crDayMs);
			get(drag).updatePointer(new Date(Math.min(crAnchorMs, snapped)), new Date(Math.max(crAnchorMs + get(SNAP_MS), snapped)));
		});
		function cleanupColsCreate() {
			cancelFrame();
			clearLongPress();
			removeTouchScrollBlock();
			window.removeEventListener("pointermove", onColsCreateMove);
			window.removeEventListener("pointerup", onColsCreateUp);
			window.removeEventListener("pointercancel", onColsCreateCancel);
			crStarted = false;
		}
		function onColsCreateUp() {
			if (crStarted) flushFrame();
			if (get(drag) && crStarted) {
				suppressColsClick = true;
				get(commitDragCtx)?.();
				setTimeout(() => {
					suppressColsClick = false;
				}, 0);
			}
			cleanupColsCreate();
		}
		function onColsCreateCancel() {
			if (get(drag) && crStarted) get(drag).cancel();
			cleanupColsCreate();
		}
		function onColsContextMenu(e) {
			if (crStarted || longPressTimer !== null) e.preventDefault();
		}
		function handleColsClick(e) {
			if (suppressColsClick) {
				suppressColsClick = false;
				return;
			}
			if (!$$props.oneventcreate || readOnly()) return;
			if (e.target.closest(".tw-ev, .tw-ghost")) return;
			const day = get(dayCols)[pointerDayIndex(e.clientX)];
			if (!day || day.isDisabled) return;
			const hour = Math.min(Math.max(pointerHour(e.clientY), get(startHour)), get(endHour));
			if (isBlockedAt(day.ms, hour)) return;
			const startMs = clampToDayBand(Math.floor((day.ms + hour * HOUR_MS) / get(SNAP_MS)) * get(SNAP_MS), day.ms);
			const durMin = get(minDuration) ?? 60;
			$$props.oneventcreate({
				start: new Date(startMs),
				end: new Date(startMs + durMin * 6e4)
			});
		}
		const DRAG_THRESHOLD = 5;
		let evDragStartX = 0;
		let evDragStartY = 0;
		let evGrabOffsetMs = 0;
		let evDragStarted = false;
		let evDragMovable = false;
		let evDragEvent = null;
		let evAnchor;
		function onEventPointerDown(e, ev) {
			if (e.button !== 0) return;
			e.stopPropagation();
			evAnchor = e.currentTarget.getBoundingClientRect();
			evDragMovable = !!get(drag) && !readOnly() && !ev.data?.readOnly;
			evDragStartX = e.clientX;
			evDragStartY = e.clientY;
			evGrabOffsetMs = pointerTimeMs(e.clientX, e.clientY) - ev.start.getTime();
			evDragStarted = false;
			evDragEvent = ev;
			window.addEventListener("pointermove", onEvMove);
			window.addEventListener("pointerup", onEvUp, { once: true });
			window.addEventListener("pointercancel", onEvCancel, { once: true });
		}
		const onEvMove = perFrame((e) => {
			const ev = evDragEvent;
			if (!get(drag) || !ev || !evDragMovable) return;
			if (!evDragStarted) {
				if (Math.abs(e.clientX - evDragStartX) + Math.abs(e.clientY - evDragStartY) < DRAG_THRESHOLD) return;
				evDragStarted = true;
				get(drag).beginMove(ev.id, ev.start, ev.end);
			}
			const duration = ev.end.getTime() - ev.start.getTime();
			const raw = pointerTimeMs(e.clientX, e.clientY) - evGrabOffsetMs;
			const snapped = Math.round(raw / get(SNAP_MS)) * get(SNAP_MS);
			get(drag).updatePointer(new Date(snapped), new Date(snapped + duration));
		});
		function cleanupEvDrag() {
			cancelFrame();
			window.removeEventListener("pointermove", onEvMove);
			window.removeEventListener("pointerup", onEvUp);
			window.removeEventListener("pointercancel", onEvCancel);
			evDragStarted = false;
			evDragMovable = false;
			evDragEvent = null;
		}
		function onEvUp() {
			if (evDragStarted) flushFrame();
			if (!evDragStarted && evDragEvent) $$props.oneventclick?.(evDragEvent, evAnchor);
			else if (evDragStarted && get(drag)) {
				suppressColsClick = true;
				get(commitDragCtx)?.();
				setTimeout(() => {
					suppressColsClick = false;
				}, 0);
			}
			cleanupEvDrag();
		}
		function onEvCancel() {
			if (get(drag) && evDragStarted) get(drag).cancel();
			cleanupEvDrag();
		}
		let rsStartY = 0;
		let rsStarted = false;
		let rsEdge = "end";
		let rsEvent = null;
		function onResizePointerDown(e, ev, edge) {
			if (e.button !== 0 || !get(drag) || readOnly() || ev.data?.readOnly) return;
			e.stopPropagation();
			evAnchor = e.currentTarget.parentElement?.getBoundingClientRect();
			rsStartY = e.clientY;
			rsStarted = false;
			rsEdge = edge;
			rsEvent = ev;
			window.addEventListener("pointermove", onResizeMove);
			window.addEventListener("pointerup", onResizeUp, { once: true });
			window.addEventListener("pointercancel", onResizeCancel, { once: true });
		}
		const onResizeMove = perFrame((e) => {
			const ev = rsEvent;
			if (!get(drag) || !ev) return;
			if (!rsStarted) {
				if (Math.abs(e.clientY - rsStartY) < CREATE_THRESHOLD) return;
				rsStarted = true;
				get(drag).beginResize(ev.id, rsEdge, ev.start, ev.end);
				addTouchScrollBlock();
			}
			const evDayMs = sod(ev.start.getTime());
			const raw = evDayMs + pointerHour(e.clientY) * HOUR_MS;
			const snapped = clampToDayBand(Math.round(raw / get(SNAP_MS)) * get(SNAP_MS), evDayMs);
			if (rsEdge === "end") {
				const end = Math.max(snapped, ev.start.getTime() + get(SNAP_MS));
				get(drag).updatePointer(ev.start, new Date(end));
			} else {
				const start = Math.min(snapped, ev.end.getTime() - get(SNAP_MS));
				get(drag).updatePointer(new Date(start), ev.end);
			}
		});
		function cleanupResize() {
			cancelFrame();
			removeTouchScrollBlock();
			window.removeEventListener("pointermove", onResizeMove);
			window.removeEventListener("pointerup", onResizeUp);
			window.removeEventListener("pointercancel", onResizeCancel);
			rsStarted = false;
			rsEvent = null;
		}
		function onResizeUp() {
			if (rsStarted) flushFrame();
			if (get(drag) && rsStarted) {
				suppressColsClick = true;
				get(commitDragCtx)?.();
				setTimeout(() => {
					suppressColsClick = false;
				}, 0);
			} else if (rsEvent && !rsStarted) $$props.oneventclick?.(rsEvent, evAnchor);
			cleanupResize();
		}
		function onResizeCancel() {
			if (get(drag) && rsStarted) get(drag).cancel();
			cleanupResize();
		}
		function onWindowKeydown(e) {
			if (e.key !== "Escape" || !get(drag)?.active) return;
			get(drag).cancel();
			cleanupColsCreate();
			cleanupEvDrag();
			cleanupResize();
			suppressColsClick = true;
			window.addEventListener("pointerup", () => setTimeout(() => {
				suppressColsClick = false;
			}, 0), { once: true });
		}
		var div = root_29$2();
		event("keydown", $window, onWindowKeydown);
		let classes_1;
		let styles_1;
		var div_1 = child(div);
		var div_2 = child(div_1);
		let styles_2;
		var node_3 = child(div_2);
		var consequent_8 = ($$anchor) => {
			var div_3 = root_12$4();
			var node_4 = child(div_3);
			var consequent_5 = ($$anchor) => {
				var div_4 = root_8$6();
				var div_5 = child(div_4);
				set_style(div_5, "", {}, { width: "48px" });
				each(sibling(div_5, 2), 17, () => get(dayCols), (day) => day.ms, ($$anchor, day) => {
					var div_6 = root_7$6();
					let classes_2;
					var span_4 = child(div_6);
					var text_2 = child(span_4, true);
					reset(span_4);
					var node_6 = sibling(span_4, 2);
					var consequent_3 = ($$anchor) => {
						var span_5 = root_5$6();
						let classes_3;
						var text_3 = child(span_5, true);
						reset(span_5);
						template_effect(() => {
							classes_3 = set_class(span_5, 1, "tw-hd-num svelte-j4rvbp", null, classes_3, { "tw-hd-num--today": get(day).isToday });
							set_text(text_3, get(day).dayNum);
						});
						append($$anchor, span_5);
					};
					if_block(node_6, ($$render) => {
						if (get(showDates)) $$render(consequent_3);
					});
					var node_7 = sibling(node_6, 2);
					var consequent_4 = ($$anchor) => {
						var div_7 = root_6$6();
						var node_8 = child(div_7);
						{
							let $0 = /* @__PURE__ */ user_derived(() => ({
								date: new Date(get(day).ms),
								isToday: get(day).isToday,
								dayName: weekdayShort(get(day).ms, $$props.locale)
							}));
							snippet(node_8, () => get(dayHeaderSnippet), () => get($0));
						}
						reset(div_7);
						append($$anchor, div_7);
					};
					if_block(node_7, ($$render) => {
						if (get(dayHeaderSnippet)) $$render(consequent_4);
					});
					reset(div_6);
					template_effect(($0) => {
						classes_2 = set_class(div_6, 1, "tw-hd svelte-j4rvbp", null, classes_2, { "tw-hd--today": get(day).isToday });
						set_attribute(div_6, "aria-current", get(day).isToday ? "date" : void 0);
						set_text(text_2, $0);
					}, [() => get(singleDay) ? weekdayLong(get(day).ms, $$props.locale) : weekdayShort(get(day).ms, $$props.locale)]);
					append($$anchor, div_6);
				});
				reset(div_4);
				append($$anchor, div_4);
			};
			if_block(node_4, ($$render) => {
				if (!get(hideDayHead)) $$render(consequent_5);
			});
			var node_9 = sibling(node_4, 2);
			var consequent_7 = ($$anchor) => {
				var div_8 = root_11$4();
				var div_9 = child(div_8);
				set_style(div_9, "", {}, { width: "48px" });
				var span_6 = child(div_9);
				var text_4 = child(span_6, true);
				reset(span_6);
				reset(div_9);
				each(sibling(div_9, 2), 17, () => get(dayCols), (day) => day.ms, ($$anchor, day) => {
					const segs = /* @__PURE__ */ user_derived(() => get(allDayByDay).get(get(day).ms) ?? []);
					const isExpanded = /* @__PURE__ */ user_derived(() => adExpanded[get(day).ms] ?? false);
					const shown = /* @__PURE__ */ user_derived(() => get(isExpanded) ? get(segs) : get(segs).slice(0, ALLDAY_MAX));
					var div_10 = root_10$4();
					let classes_4;
					var node_11 = child(div_10);
					each(node_11, 17, () => get(shown), (seg) => seg.ev.id, ($$anchor, seg) => {
						allDayChip($$anchor, () => get(seg));
					});
					var node_12 = sibling(node_11, 2);
					var consequent_6 = ($$anchor) => {
						var button_1 = root_9$4();
						var text_5 = child(button_1, true);
						reset(button_1);
						template_effect(($0) => {
							set_attribute(button_1, "aria-expanded", get(isExpanded));
							set_text(text_5, $0);
						}, [() => get(isExpanded) ? get(L).showLess : get(L).nMore(get(segs).length - ALLDAY_MAX)]);
						delegated("click", button_1, () => {
							adExpanded[get(day).ms] = !get(isExpanded);
						});
						append($$anchor, button_1);
					};
					if_block(node_12, ($$render) => {
						if (get(segs).length > ALLDAY_MAX) $$render(consequent_6);
					});
					reset(div_10);
					template_effect(() => classes_4 = set_class(div_10, 1, "tw-ad-cell svelte-j4rvbp", null, classes_4, { "tw-ad-cell--today": get(day).isToday }));
					append($$anchor, div_10);
				});
				reset(div_8);
				template_effect(() => set_text(text_4, get(L).allDay));
				append($$anchor, div_8);
			};
			if_block(node_9, ($$render) => {
				if (get(hasAllDayRow)) $$render(consequent_7);
			});
			reset(div_3);
			append($$anchor, div_3);
		};
		if_block(node_3, ($$render) => {
			if (!get(hideDayHead) || get(hasAllDayRow)) $$render(consequent_8);
		});
		var div_11 = sibling(node_3, 2);
		let styles_3;
		var div_12 = child(div_11);
		set_style(div_12, "", {}, { width: "48px" });
		var node_13 = child(div_12);
		each(node_13, 17, () => ({ length: get(hourCount) }), index, ($$anchor, _, i) => {
			var fragment_1 = comment();
			var node_14 = first_child(fragment_1);
			var consequent_9 = ($$anchor) => {
				var span_7 = root_13$3();
				set_style(span_7, "", {}, { top: `${i * HOUR_H}px` });
				var text_6 = child(span_7, true);
				reset(span_7);
				template_effect(($0) => set_text(text_6, $0), [() => fmtH(get(startHour) + i, $$props.locale)]);
				append($$anchor, span_7);
			};
			if_block(node_14, ($$render) => {
				if (i > 0) $$render(consequent_9);
			});
			append($$anchor, fragment_1);
		});
		var node_15 = sibling(node_13, 2);
		var consequent_10 = ($$anchor) => {
			var span_8 = root_14$3();
			let styles_4;
			template_effect(() => styles_4 = set_style(span_8, "", styles_4, { top: `${get(nowY) ?? ""}px` }));
			append($$anchor, span_8);
		};
		if_block(node_15, ($$render) => {
			if (get(nowY) !== null && get(weekHasToday)) $$render(consequent_10);
		});
		reset(div_12);
		var div_13 = sibling(div_12, 2);
		var div_14 = child(div_13);
		each(div_14, 21, () => ({ length: get(hourCount) }), index, ($$anchor, _, i) => {
			var fragment_2 = root_15$3();
			var div_15 = first_child(fragment_2);
			set_style(div_15, "", {}, { top: `${i * HOUR_H}px` });
			set_style(sibling(div_15, 2), "", {}, { top: `${i * HOUR_H + HOUR_H / 2}px` });
			append($$anchor, fragment_2);
		});
		reset(div_14);
		each(sibling(div_14, 2), 17, () => get(dayCols), (day) => day.ms, ($$anchor, day) => {
			const positioned = /* @__PURE__ */ user_derived(() => get(layoutByDay).get(get(day).ms) ?? []);
			const ghost = /* @__PURE__ */ user_derived(() => ghostForDay(get(day).ms));
			var div_17 = root_27$2();
			let classes_5;
			var node_17 = child(div_17);
			var consequent_14 = ($$anchor) => {
				var fragment_3 = comment();
				each(first_child(fragment_3), 17, () => get(blockedSlots), index, ($$anchor, slot) => {
					var fragment_4 = comment();
					var node_19 = first_child(fragment_4);
					var consequent_13 = ($$anchor) => {
						const s = /* @__PURE__ */ user_derived(() => Math.max(get(slot).start, get(startHour)));
						const e = /* @__PURE__ */ user_derived(() => Math.min(get(slot).end, get(endHour)));
						var fragment_5 = comment();
						var node_20 = first_child(fragment_5);
						var consequent_12 = ($$anchor) => {
							const range = /* @__PURE__ */ user_derived(() => blockedRangeLabel(get(day).ms, get(slot).start, get(slot).end));
							var div_18 = root_17$3();
							let styles_5;
							var node_21 = child(div_18);
							var consequent_11 = ($$anchor) => {
								var span_9 = root_16$3();
								var text_7 = child(span_9, true);
								reset(span_9);
								template_effect(() => set_text(text_7, get(slot).label));
								append($$anchor, span_9);
							};
							if_block(node_21, ($$render) => {
								if (get(slot).label) $$render(consequent_11);
							});
							reset(div_18);
							template_effect(() => {
								set_attribute(div_18, "title", `${get(slot).label ? `${get(slot).label}, ` : ""}${get(range) ?? ""}`);
								set_attribute(div_18, "aria-label", `${(get(slot).label || "Unavailable") ?? ""}, ${get(range) ?? ""}`);
								styles_5 = set_style(div_18, "", styles_5, {
									top: `${(get(s) - get(startHour)) * HOUR_H}px`,
									height: `${(get(e) - get(s)) * HOUR_H}px`
								});
							});
							append($$anchor, div_18);
						};
						if_block(node_20, ($$render) => {
							if (get(e) > get(s)) $$render(consequent_12);
						});
						append($$anchor, fragment_5);
					};
					if_block(node_19, ($$render) => {
						if (!get(slot).day || get(slot).day === get(day).isoDay) $$render(consequent_13);
					});
					append($$anchor, fragment_4);
				});
				append($$anchor, fragment_3);
			};
			if_block(node_17, ($$render) => {
				if (get(blockedSlots)?.length) $$render(consequent_14);
			});
			var node_22 = sibling(node_17, 2);
			each(node_22, 17, () => get(positioned), (p) => p.ev.id, ($$anchor, p) => {
				const isCurrent = /* @__PURE__ */ user_derived(() => get(nowIds).has(get(p).ev.id));
				var div_19 = root_22$2();
				let classes_6;
				let styles_6;
				var div_20 = sibling(child(div_19), 2);
				EventContent(child(div_20), {
					get event() {
						return get(p).ev;
					},
					children: ($$anchor, $$slotProps) => {
						var fragment_6 = root_19$3();
						var span_10 = first_child(fragment_6);
						var text_8 = child(span_10);
						reset(span_10);
						var span_11 = sibling(span_10, 2);
						var text_9 = child(span_11, true);
						reset(span_11);
						var node_24 = sibling(span_11, 2);
						var consequent_15 = ($$anchor) => {
							var span_12 = root_18$3();
							var text_10 = child(span_12, true);
							reset(span_12);
							template_effect(() => set_text(text_10, get(p).ev.location));
							append($$anchor, span_12);
						};
						if_block(node_24, ($$render) => {
							if (get(p).ev.location && get(p).height > 56) $$render(consequent_15);
						});
						template_effect(($0, $1) => {
							set_text(text_8, `${$0 ?? ""} – ${$1 ?? ""}`);
							set_text(text_9, get(p).ev.title);
						}, [() => fmtTime$1(get(p).ev.start, $$props.locale), () => fmtTime$1(get(p).ev.end, $$props.locale)]);
						append($$anchor, fragment_6);
					},
					$$slots: { default: true }
				});
				reset(div_20);
				var node_25 = sibling(div_20, 2);
				var consequent_16 = ($$anchor) => {
					append($$anchor, root_20$3());
				};
				if_block(node_25, ($$render) => {
					if (get(isCurrent)) $$render(consequent_16);
				});
				var node_26 = sibling(node_25, 2);
				var consequent_17 = ($$anchor) => {
					var fragment_7 = root_21$3();
					var span_14 = first_child(fragment_7);
					var span_15 = sibling(span_14, 2);
					delegated("pointerdown", span_14, (e) => onResizePointerDown(e, get(p).ev, "start"));
					delegated("pointerdown", span_15, (e) => onResizePointerDown(e, get(p).ev, "end"));
					append($$anchor, fragment_7);
				};
				if_block(node_26, ($$render) => {
					if (!readOnly() && !get(p).ev.data?.readOnly) $$render(consequent_17);
				});
				reset(div_19);
				template_effect(($0, $1, $2, $3) => {
					classes_6 = set_class(div_19, 1, "tw-ev svelte-j4rvbp", null, classes_6, {
						"tw-ev--selected": selectedEventId() === get(p).ev.id,
						"tw-ev--current": get(isCurrent),
						"tw-ev--resizing": get(p).isResizing,
						"tw-ev--moving": get(p).isMoving,
						"tw-ev--readonly": get(p).ev.data?.readOnly,
						"tw-ev--cancelled": get(p).ev.status === "cancelled",
						"tw-ev--tentative": get(p).ev.status === "tentative",
						"tw-ev--full": get(p).ev.status === "full",
						"tw-ev--limited": get(p).ev.status === "limited",
						"tw-ev--short": get(p).height < 44,
						"tw-ev--compact": get(p).height < 34
					});
					set_attribute(div_19, "title", get(p).ev.title);
					set_attribute(div_19, "aria-label", `${get(p).ev.title ?? ""}, ${$0 ?? ""} – ${$1 ?? ""}, ${$2 ?? ""}${$3 ?? ""}${get(isCurrent) ? ` (${get(L).inProgress})` : ""}`);
					styles_6 = set_style(div_19, "", styles_6, {
						top: `${get(p).top ?? ""}px`,
						height: `${get(p).height ?? ""}px`,
						left: `calc(${get(p).col / get(p).totalCols * 100}% + 1px)`,
						width: `calc(${100 / get(p).totalCols}% - ${get(p).totalCols > 1 ? 3 : 8}px)`,
						"--ev-color": get(p).ev.color ?? "var(--dt-accent)"
					});
				}, [
					() => fmtTime$1(get(p).ev.start, $$props.locale),
					() => fmtTime$1(get(p).ev.end, $$props.locale),
					() => fmtDuration(get(p).ev.start, get(p).ev.end),
					() => statusText(get(p).ev)
				]);
				delegated("pointerdown", div_19, (e) => onEventPointerDown(e, get(p).ev));
				event("pointerenter", div_19, () => get(oneventhover)?.(get(p).ev));
				delegated("keydown", div_19, (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						e.stopPropagation();
						$$props.oneventclick?.(get(p).ev, e.currentTarget.getBoundingClientRect());
					}
				});
				append($$anchor, div_19);
			});
			var node_27 = sibling(node_22, 2);
			var consequent_20 = ($$anchor) => {
				var div_21 = root_25$2();
				let classes_7;
				let styles_7;
				var node_28 = child(div_21);
				var consequent_19 = ($$anchor) => {
					var fragment_8 = root_24$2();
					var span_16 = first_child(fragment_8);
					var text_11 = child(span_16);
					reset(span_16);
					var node_29 = sibling(span_16, 2);
					var consequent_18 = ($$anchor) => {
						var span_17 = root_23$2();
						var text_12 = child(span_17, true);
						reset(span_17);
						template_effect(() => set_text(text_12, get(movingEvent).title));
						append($$anchor, span_17);
					};
					if_block(node_29, ($$render) => {
						if (!get(ghost).create && get(movingEvent)) $$render(consequent_18);
					});
					template_effect(($0, $1) => set_text(text_11, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmtTime$1(get(ghost).start, $$props.locale), () => fmtTime$1(get(ghost).end, $$props.locale)]);
					append($$anchor, fragment_8);
				};
				if_block(node_28, ($$render) => {
					if (get(ghost).showTime) $$render(consequent_19);
				});
				reset(div_21);
				template_effect(() => {
					classes_7 = set_class(div_21, 1, "tw-ghost svelte-j4rvbp", null, classes_7, { "tw-ghost--create": get(ghost).create });
					styles_7 = set_style(div_21, "", styles_7, {
						top: `${get(ghost).top ?? ""}px`,
						height: `${get(ghost).height ?? ""}px`,
						"--ev-color": get(ghost).create ? "var(--dt-accent, #2563eb)" : get(movingEvent)?.color ?? "var(--dt-accent, #2563eb)"
					});
				});
				append($$anchor, div_21);
			};
			if_block(node_27, ($$render) => {
				if (get(ghost)) $$render(consequent_20);
			});
			var node_30 = sibling(node_27, 2);
			var consequent_21 = ($$anchor) => {
				var div_22 = root_26$2();
				let styles_8;
				template_effect(() => {
					set_attribute(div_22, "aria-label", get(L).currentTime);
					styles_8 = set_style(div_22, "", styles_8, { top: `${get(nowY) ?? ""}px` });
				});
				append($$anchor, div_22);
			};
			if_block(node_30, ($$render) => {
				if (get(day).isToday && get(nowY) !== null) $$render(consequent_21);
			});
			reset(div_17);
			template_effect(() => {
				classes_5 = set_class(div_17, 1, "tw-col svelte-j4rvbp", null, classes_5, {
					"tw-col--today": get(day).isToday,
					"tw-col--past": get(day).isPast,
					"tw-col--weekend": get(day).isWeekend,
					"tw-col--disabled": get(day).isDisabled
				});
				set_attribute(div_17, "data-day", get(day).ms);
			});
			append($$anchor, div_17);
		});
		reset(div_13);
		bind_this(div_13, ($$value) => colsEl = $$value, () => colsEl);
		reset(div_11);
		reset(div_2);
		reset(div_1);
		bind_this(div_1, ($$value) => scrollEl = $$value, () => scrollEl);
		var node_31 = sibling(div_1, 2);
		var consequent_22 = ($$anchor) => {
			var div_23 = root_28$2();
			snippet(child(div_23), () => ctx.emptySnippet);
			reset(div_23);
			append($$anchor, div_23);
		};
		if_block(node_31, ($$render) => {
			if (get(weekIsEmpty) && ctx.emptySnippet) $$render(consequent_22);
		});
		reset(div);
		template_effect(() => {
			classes_1 = set_class(div, 1, "tw svelte-j4rvbp", null, classes_1, { "tw--auto": get(autoHeight) });
			styles_1 = set_style(div, style() || void 0, styles_1, {
				"--tw-col-min": `${get(MIN_COL_W) ?? ""}px`,
				height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%"
			});
			set_attribute(div, "aria-label", get(L).weekAhead);
			styles_2 = set_style(div_2, "", styles_2, { "min-width": `${get(innerMinWidth) ?? ""}px` });
			styles_3 = set_style(div_11, "", styles_3, { height: `${get(gridHeight) ?? ""}px` });
		});
		delegated("click", div_13, handleColsClick);
		delegated("pointerdown", div_13, onColsPointerDown);
		delegated("contextmenu", div_13, onColsContextMenu);
		append($$anchor, div);
		pop();
	}
	delegate([
		"click",
		"pointerdown",
		"contextmenu",
		"keydown"
	]);
	//#endregion
	//#region src/lib/views/planner/Planner.svelte
	var rest_excludes$2 = /* @__PURE__ */ new Set([
		"$$slots",
		"$$events",
		"$$legacy",
		"mode"
	]);
	function Planner($$anchor, $$props) {
		let mode = prop($$props, "mode", 3, "week"), rest = /* @__PURE__ */ rest_props($$props, rest_excludes$2);
		PlannerWeek($$anchor, spread_props({ get mode() {
			return mode();
		} }, () => rest));
	}
	//#endregion
	//#region src/lib/views/shared/format.ts
	function fmtTime(d, locale) {
		return fmtTime$1(d, locale);
	}
	function duration(ev) {
		return fmtDuration(ev.start, ev.end);
	}
	function timeUntilMs(ms, now, labels) {
		const L = labels ?? getLabels();
		const diff = ms - now;
		if (diff <= 0) return L.now;
		const tMins = Math.floor(diff / 6e4);
		if (tMins < 60) return L.inMinutes(tMins);
		const hrs = Math.floor(tMins / 60);
		const rm = tMins % 60;
		if (hrs < 24) return L.inHours(hrs, rm);
		const days = Math.floor(hrs / 24);
		return L.inDays(days);
	}
	function progress(ev, now) {
		const s = ev.start.getTime();
		const e = ev.end.getTime();
		if (e <= s) return now >= s ? 1 : 0;
		return Math.min(1, Math.max(0, (now - s) / (e - s)));
	}
	function groupIntoSlots(evts) {
		const sorted = [...evts].sort((a, b) => a.start.getTime() - b.start.getTime());
		const slots = [];
		for (const ev of sorted) {
			const last = slots[slots.length - 1];
			if (last && ev.start.getTime() < last.endMs) {
				last.events.push(ev);
				last.endMs = Math.max(last.endMs, ev.end.getTime());
			} else slots.push({
				startMs: ev.start.getTime(),
				endMs: ev.end.getTime(),
				events: [ev]
			});
		}
		return slots;
	}
	//#endregion
	//#region src/lib/views/agenda/AgendaDay.svelte
	var root$4 = /* @__PURE__ */ from_html(`<span class="ag-day-head-badge svelte-n8lbn1"> </span>`);
	var root_1$5 = /* @__PURE__ */ from_html(`<span class="ag-day-head-badge ag-day-head-badge--muted svelte-n8lbn1"> </span>`);
	var root_2$5 = /* @__PURE__ */ from_html(`<div class="ag-day-head svelte-n8lbn1"><!> <span class="ag-day-head-name svelte-n8lbn1"> </span> <span class="ag-day-head-date svelte-n8lbn1"> </span></div>`);
	var root_3$5 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-allday-dot svelte-n8lbn1"></span> <span class="ag-allday-title svelte-n8lbn1"> </span></button>`);
	var root_4$5 = /* @__PURE__ */ from_html(`<div class="ag-allday svelte-n8lbn1"><div class="ag-allday-label svelte-n8lbn1"> </div> <div class="ag-allday-items svelte-n8lbn1"></div></div>`);
	var root_5$5 = /* @__PURE__ */ from_html(`<div class="ag-q-empty svelte-n8lbn1"><!></div>`);
	var root_6$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-sub svelte-n8lbn1"> </span>`);
	var root_7$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-tag svelte-n8lbn1"> </span>`);
	var root_8$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-time svelte-n8lbn1"> </span> <div class="ag-compact-row-main svelte-n8lbn1"><span class="ag-compact-row-title svelte-n8lbn1"> </span> <!> <!></div> <span class="ag-compact-row-dur svelte-n8lbn1"> </span>`, 1);
	var root_9$3 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
	var root_10$3 = /* @__PURE__ */ from_html(`<div class="ag-compact-list svelte-n8lbn1"><!></div>`);
	var root_11$3 = /* @__PURE__ */ from_html(`<div class="ag-q-now-sub svelte-n8lbn1"> </div>`);
	var root_12$3 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-q-now-dot svelte-n8lbn1"></div> <div class="ag-q-now-title svelte-n8lbn1"> </div> <!> <div class="ag-q-now-time svelte-n8lbn1"> </div> <div class="ag-q-now-track svelte-n8lbn1"><div class="ag-q-now-fill svelte-n8lbn1"></div></div></button>`);
	var root_13$2 = /* @__PURE__ */ from_html(`<div class="ag-q-free svelte-n8lbn1"><div class="ag-q-free-label svelte-n8lbn1"> </div></div>`);
	var root_14$2 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-q-done-check svelte-n8lbn1">✓</span> <span class="ag-q-done-title svelte-n8lbn1"> </span></button>`);
	var root_15$2 = /* @__PURE__ */ from_html(`<button type="button" class="ag-q-done-toggle svelte-n8lbn1"> </button>`);
	var root_16$2 = /* @__PURE__ */ from_html(`<div class="ag-q-done-section svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> </div> <!> <!></div>`);
	var root_17$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-time svelte-n8lbn1"> </span> <div class="ag-compact-row-main svelte-n8lbn1"><span class="ag-compact-row-title svelte-n8lbn1"> </span> <!></div>`, 1);
	var root_18$2 = /* @__PURE__ */ from_html(`<span class="ag-card-sub svelte-n8lbn1"> </span>`);
	var root_19$2 = /* @__PURE__ */ from_html(`<span class="ag-card-tag svelte-n8lbn1"> </span>`);
	var root_20$2 = /* @__PURE__ */ from_html(`<div class="ag-card-tags svelte-n8lbn1"></div>`);
	var root_21$2 = /* @__PURE__ */ from_html(`<div class="ag-card-top svelte-n8lbn1"><span class="ag-card-title svelte-n8lbn1"> </span> <span class="ag-card-eta svelte-n8lbn1"> </span></div> <!> <div class="ag-card-meta svelte-n8lbn1"> <span class="ag-card-dur svelte-n8lbn1"> </span></div> <!>`, 1);
	var root_22$1 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-card-body svelte-n8lbn1"><!></div></button>`);
	var root_23$1 = /* @__PURE__ */ from_html(`<div class="ag-q svelte-n8lbn1"><div class="ag-q-status svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> <span class="ag-q-clock svelte-n8lbn1"> </span></div> <!> <!></div> <div class="ag-q-queue svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> </div> <!></div></div>`);
	var root_24$1 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-log-check svelte-n8lbn1">✓</span> <span class="ag-log-time svelte-n8lbn1"> </span> <span class="ag-log-dot svelte-n8lbn1"></span> <span class="ag-log-title svelte-n8lbn1"> </span> <span class="ag-log-dur svelte-n8lbn1"> </span></button>`);
	var root_25$1 = /* @__PURE__ */ from_html(`<div class="ag-log svelte-n8lbn1"><!></div>`);
	var root_26$1 = /* @__PURE__ */ from_html(`<span class="ag-card-loc svelte-n8lbn1"> </span>`);
	var root_27$1 = /* @__PURE__ */ from_html(`<div class="ag-card-top svelte-n8lbn1"><span class="ag-card-order svelte-n8lbn1"> </span> <span class="ag-card-title svelte-n8lbn1"> </span></div> <!> <!> <div class="ag-card-meta svelte-n8lbn1"> <span class="ag-card-dur svelte-n8lbn1"> </span></div> <!>`, 1);
	var root_28$1 = /* @__PURE__ */ from_html(`<div class="ag-plan svelte-n8lbn1"><!></div>`);
	var root_29$1 = /* @__PURE__ */ from_html(`<div><div class="ag-body svelte-n8lbn1" role="group"><!> <!> <!></div></div>`);
	function AgendaDay($$anchor, $$props) {
		push($$props, true);
		/**
		* AgendaDay — single-day agenda view.
		*
		* Today ("The Queue"):
		*   3-column layout: Done | Now | Up next (hero).
		*   Answers: "What's coming up next?"
		*
		* Past day ("The Log"):
		*   Quiet chronological record of completed events.
		*
		* Future day ("The Plan"):
		*   Clean numbered schedule list.
		*/
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		const emptySnippet = /* @__PURE__ */ user_derived(() => ctx.emptySnippet);
		let events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null);
		const clock = createClock(ctx.timezone);
		const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
		const equalDays = /* @__PURE__ */ user_derived(() => ctx.equalDays);
		const showDates = /* @__PURE__ */ user_derived(() => ctx.showDates);
		const hideDayHead = /* @__PURE__ */ user_derived(() => get(showDates) && !!get(viewState));
		const isMobile = /* @__PURE__ */ user_derived(() => ctx.isMobile);
		const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
		const compact = /* @__PURE__ */ user_derived(() => ctx.compact);
		const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
		const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
		let swipeStartX = 0;
		let swipeStartY = 0;
		let swipeActive = false;
		const SWIPE_THRESHOLD = 50;
		function onPointerDown(e) {
			if (!get(isMobile) || e.pointerType !== "touch") return;
			swipeActive = true;
			swipeStartX = e.clientX;
			swipeStartY = e.clientY;
		}
		function onPointerUp(e) {
			if (!swipeActive || e.pointerType !== "touch") return;
			swipeActive = false;
			const dx = e.clientX - swipeStartX;
			const dy = e.clientY - swipeStartY;
			if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.4) {
				if (dx > 0) get(viewState)?.prev();
				else get(viewState)?.next();
			}
		}
		function onPointerCancel() {
			swipeActive = false;
		}
		const fmt = (d) => fmtTime(d, $$props.locale);
		const eta = (ms) => timeUntilMs(ms, clock.tick, get(L));
		const prog = (ev) => progress(ev, clock.tick);
		function handleClick(ev) {
			$$props.oneventclick?.(ev);
		}
		const dayMs = /* @__PURE__ */ user_derived(() => $$props.focusDate ? sod($$props.focusDate.getTime()) : clock.today);
		const dayEnd = /* @__PURE__ */ user_derived(() => get(dayMs) + DAY_MS);
		const isToday = /* @__PURE__ */ user_derived(() => get(dayMs) === clock.today);
		const isTomorrow = /* @__PURE__ */ user_derived(() => get(dayMs) === clock.today + DAY_MS);
		const isPastDay = /* @__PURE__ */ user_derived(() => get(equalDays) ? false : get(dayMs) < clock.today);
		/** All events for this day, sorted chronologically */
		const dayEvents = /* @__PURE__ */ user_derived(() => {
			return events().filter((ev) => ev.start.getTime() < get(dayEnd) && ev.end.getTime() > get(dayMs)).sort((a, b) => a.start.getTime() - b.start.getTime());
		});
		/** All-day / multi-day events shown in a separate strip */
		const allDayBanner = /* @__PURE__ */ user_derived(() => get(dayEvents).filter((ev) => isAllDay(ev) || isMultiDay(ev)));
		/** Timed events (non-all-day) for normal slot rendering */
		const timedDayEvents = /* @__PURE__ */ user_derived(() => get(dayEvents).filter((ev) => !isAllDay(ev) && !isMultiDay(ev)));
		const dayCat = /* @__PURE__ */ user_derived(() => {
			const now = clock.tick;
			const past = [];
			const current = [];
			const upcoming = [];
			for (const ev of get(timedDayEvents)) {
				const s = ev.start.getTime();
				const e = ev.end.getTime();
				if (e <= now) past.push(ev);
				else if (s <= now && e > now) current.push(ev);
				else upcoming.push(ev);
			}
			return {
				past,
				current,
				upcomingSlots: groupIntoSlots(upcoming),
				totalUp: upcoming.length
			};
		});
		/** Flat list of ALL upcoming events for the "Up next" column. The first
		*  few get card treatment; the rest render as compact rows — busy days
		*  (a city-wide feed) would otherwise drown the queue. */
		const upcomingNext = /* @__PURE__ */ user_derived(() => {
			const all = [];
			for (const slot of get(dayCat).upcomingSlots) for (const ev of slot.events) all.push(ev);
			return all;
		});
		const UPCOMING_CARDS = 4;
		/** Done list collapses past this many items (most recent stay visible). */
		const DONE_VISIBLE = 3;
		let showAllDone = /* @__PURE__ */ state(false);
		const visibleDone = /* @__PURE__ */ user_derived(() => get(showAllDone) ? get(dayCat).past : get(dayCat).past.slice(-3));
		const hiddenDoneCount = /* @__PURE__ */ user_derived(() => get(showAllDone) ? 0 : Math.max(0, get(dayCat).past.length - DONE_VISIBLE));
		var div = root_29$1();
		let classes;
		let styles;
		var div_1 = child(div);
		var node = child(div_1);
		var consequent_2 = ($$anchor) => {
			var div_2 = root_2$5();
			var node_1 = child(div_2);
			var consequent = ($$anchor) => {
				var span = root$4();
				var text = child(span, true);
				reset(span);
				template_effect(() => set_text(text, get(L).today));
				append($$anchor, span);
			};
			var consequent_1 = ($$anchor) => {
				var span_1 = root_1$5();
				var text_1 = child(span_1, true);
				reset(span_1);
				template_effect(() => set_text(text_1, get(L).tomorrow));
				append($$anchor, span_1);
			};
			if_block(node_1, ($$render) => {
				if (!get(equalDays) && get(isToday)) $$render(consequent);
				else if (!get(equalDays) && get(isTomorrow)) $$render(consequent_1, 1);
			});
			var span_2 = sibling(node_1, 2);
			var text_2 = child(span_2, true);
			reset(span_2);
			var span_3 = sibling(span_2, 2);
			var text_3 = child(span_3);
			reset(span_3);
			reset(div_2);
			template_effect(($0, $1, $2) => {
				set_text(text_2, $0);
				set_text(text_3, `${$1 ?? ""} ${$2 ?? ""}`);
			}, [
				() => weekdayLong(get(dayMs), $$props.locale),
				() => monthLong(get(dayMs), $$props.locale),
				() => dayNum(get(dayMs))
			]);
			append($$anchor, div_2);
		};
		if_block(node, ($$render) => {
			if (!get(hideDayHead)) $$render(consequent_2);
		});
		var node_2 = sibling(node, 2);
		var consequent_3 = ($$anchor) => {
			var div_3 = root_4$5();
			var div_4 = child(div_3);
			var text_4 = child(div_4, true);
			reset(div_4);
			var div_5 = sibling(div_4, 2);
			each(div_5, 21, () => get(allDayBanner), (ev) => ev.id, ($$anchor, ev) => {
				var button = root_3$5();
				let classes_1;
				let styles_1;
				var span_4 = sibling(child(button), 2);
				var text_5 = child(span_4, true);
				reset(span_4);
				reset(button);
				template_effect(() => {
					classes_1 = set_class(button, 1, "ag-allday-chip svelte-n8lbn1", null, classes_1, { "ag-allday-chip--selected": selectedEventId() === get(ev).id });
					set_attribute(button, "aria-label", `${get(ev).title ?? ""}, ${get(L).allDay ?? ""}`);
					styles_1 = set_style(button, "", styles_1, { "--ev-color": get(ev).color || "var(--dt-accent)" });
					set_text(text_5, get(ev).title);
				});
				delegated("click", button, () => handleClick(get(ev)));
				event("pointerenter", button, () => get(oneventhover)?.(get(ev)));
				append($$anchor, button);
			});
			reset(div_5);
			reset(div_3);
			template_effect(() => set_text(text_4, get(L).allDay));
			append($$anchor, div_3);
		};
		if_block(node_2, ($$render) => {
			if (get(allDayBanner).length > 0) $$render(consequent_3);
		});
		var node_3 = sibling(node_2, 2);
		var consequent_8 = ($$anchor) => {
			var div_6 = root_10$3();
			var node_4 = child(div_6);
			var consequent_5 = ($$anchor) => {
				var div_7 = root_5$5();
				var node_5 = child(div_7);
				var consequent_4 = ($$anchor) => {
					var fragment = comment();
					snippet(first_child(fragment), () => get(emptySnippet));
					append($$anchor, fragment);
				};
				var alternate = ($$anchor) => {
					var text_6 = text();
					template_effect(() => set_text(text_6, get(L).nothingScheduledYet));
					append($$anchor, text_6);
				};
				if_block(node_5, ($$render) => {
					if (get(emptySnippet)) $$render(consequent_4);
					else $$render(alternate, -1);
				});
				reset(div_7);
				append($$anchor, div_7);
			};
			var alternate_1 = ($$anchor) => {
				var fragment_2 = comment();
				each(first_child(fragment_2), 17, () => get(timedDayEvents), (ev) => ev.id, ($$anchor, ev) => {
					var button_1 = root_9$3();
					let classes_2;
					let styles_2;
					EventContent(child(button_1), {
						get event() {
							return get(ev);
						},
						children: ($$anchor, $$slotProps) => {
							var fragment_3 = root_8$5();
							var span_5 = first_child(fragment_3);
							var text_7 = child(span_5, true);
							reset(span_5);
							var div_8 = sibling(span_5, 2);
							var span_6 = child(div_8);
							var text_8 = child(span_6, true);
							reset(span_6);
							var node_9 = sibling(span_6, 2);
							var consequent_6 = ($$anchor) => {
								var span_7 = root_6$5();
								var text_9 = child(span_7, true);
								reset(span_7);
								template_effect(() => set_text(text_9, get(ev).subtitle));
								append($$anchor, span_7);
							};
							if_block(node_9, ($$render) => {
								if (get(ev).subtitle) $$render(consequent_6);
							});
							var node_10 = sibling(node_9, 2);
							var consequent_7 = ($$anchor) => {
								var fragment_4 = comment();
								each(first_child(fragment_4), 17, () => get(ev).tags, index, ($$anchor, tag) => {
									var span_8 = root_7$5();
									var text_10 = child(span_8, true);
									reset(span_8);
									template_effect(() => set_text(text_10, get(tag)));
									append($$anchor, span_8);
								});
								append($$anchor, fragment_4);
							};
							if_block(node_10, ($$render) => {
								if (get(ev).tags?.length) $$render(consequent_7);
							});
							reset(div_8);
							var span_9 = sibling(div_8, 2);
							var text_11 = child(span_9, true);
							reset(span_9);
							template_effect(($0, $1) => {
								set_text(text_7, $0);
								set_text(text_8, get(ev).title);
								set_text(text_11, $1);
							}, [() => fmt(get(ev).start), () => duration(get(ev))]);
							append($$anchor, fragment_3);
						},
						$$slots: { default: true }
					});
					reset(button_1);
					template_effect(($0, $1) => {
						classes_2 = set_class(button_1, 1, "ag-compact-row svelte-n8lbn1", null, classes_2, {
							"ag-compact-row--selected": selectedEventId() === get(ev).id,
							"ag-compact-row--cancelled": get(ev).status === "cancelled",
							"ag-compact-row--tentative": get(ev).status === "tentative"
						});
						set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
						styles_2 = set_style(button_1, "", styles_2, { "--ev-color": get(ev).color || "var(--dt-accent)" });
					}, [() => fmt(get(ev).start), () => duration(get(ev))]);
					delegated("click", button_1, () => handleClick(get(ev)));
					event("pointerenter", button_1, () => get(oneventhover)?.(get(ev)));
					append($$anchor, button_1);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_4, ($$render) => {
				if (get(timedDayEvents).length === 0 && get(allDayBanner).length === 0) $$render(consequent_5);
				else $$render(alternate_1, -1);
			});
			reset(div_6);
			append($$anchor, div_6);
		};
		var consequent_19 = ($$anchor) => {
			var div_9 = root_23$1();
			var div_10 = child(div_9);
			var div_11 = child(div_10);
			var text_12 = child(div_11);
			var span_10 = sibling(text_12);
			var text_13 = child(span_10, true);
			reset(span_10);
			reset(div_11);
			var node_12 = sibling(div_11, 2);
			var consequent_10 = ($$anchor) => {
				var fragment_5 = comment();
				each(first_child(fragment_5), 17, () => get(dayCat).current, (ev) => ev.id, ($$anchor, ev) => {
					var button_2 = root_12$3();
					let classes_3;
					let styles_3;
					var div_12 = sibling(child(button_2), 2);
					var text_14 = child(div_12, true);
					reset(div_12);
					var node_14 = sibling(div_12, 2);
					var consequent_9 = ($$anchor) => {
						var div_13 = root_11$3();
						var text_15 = child(div_13, true);
						reset(div_13);
						template_effect(() => set_text(text_15, get(ev).subtitle));
						append($$anchor, div_13);
					};
					if_block(node_14, ($$render) => {
						if (get(ev).subtitle) $$render(consequent_9);
					});
					var div_14 = sibling(node_14, 2);
					var text_16 = child(div_14);
					reset(div_14);
					var div_15 = sibling(div_14, 2);
					var div_16 = child(div_15);
					let styles_4;
					reset(div_15);
					reset(button_2);
					template_effect(($0, $1, $2) => {
						classes_3 = set_class(button_2, 1, "ag-q-now svelte-n8lbn1", null, classes_3, { "ag-q-now--selected": selectedEventId() === get(ev).id });
						set_attribute(button_2, "aria-label", `${get(ev).title ?? ""}, ${get(L).happeningNow ?? ""}, ${$0 ?? ""}`);
						styles_3 = set_style(button_2, "", styles_3, { "--ev-color": get(ev).color || "var(--dt-accent)" });
						set_text(text_14, get(ev).title);
						set_text(text_16, `${get(L).until ?? ""} ${$1 ?? ""}`);
						styles_4 = set_style(div_16, "", styles_4, $2);
					}, [
						() => get(L).percentComplete(Math.round(prog(get(ev)) * 100)),
						() => fmt(get(ev).end),
						() => ({ transform: `scaleX(${prog(get(ev)) ?? ""})` })
					]);
					delegated("click", button_2, () => handleClick(get(ev)));
					event("pointerenter", button_2, () => get(oneventhover)?.(get(ev)));
					append($$anchor, button_2);
				});
				append($$anchor, fragment_5);
			};
			var alternate_2 = ($$anchor) => {
				var div_17 = root_13$2();
				var div_18 = child(div_17);
				var text_17 = child(div_18, true);
				reset(div_18);
				reset(div_17);
				template_effect(() => set_text(text_17, get(L).free));
				append($$anchor, div_17);
			};
			if_block(node_12, ($$render) => {
				if (get(dayCat).current.length > 0) $$render(consequent_10);
				else $$render(alternate_2, -1);
			});
			var node_15 = sibling(node_12, 2);
			var consequent_12 = ($$anchor) => {
				var div_19 = root_16$2();
				var div_20 = child(div_19);
				var text_18 = child(div_20, true);
				reset(div_20);
				var node_16 = sibling(div_20, 2);
				each(node_16, 17, () => get(visibleDone), (ev) => ev.id, ($$anchor, ev) => {
					var button_3 = root_14$2();
					let classes_4;
					var span_11 = sibling(child(button_3), 2);
					var text_19 = child(span_11, true);
					reset(span_11);
					reset(button_3);
					template_effect(($0) => {
						classes_4 = set_class(button_3, 1, "ag-q-done-item svelte-n8lbn1", null, classes_4, { "ag-q-done-item--selected": selectedEventId() === get(ev).id });
						set_attribute(button_3, "aria-label", `${get(ev).title ?? ""}, ${get(L).completed ?? ""}, ${$0 ?? ""}`);
						set_text(text_19, get(ev).title);
					}, [() => fmt(get(ev).start)]);
					delegated("click", button_3, () => handleClick(get(ev)));
					append($$anchor, button_3);
				});
				var node_17 = sibling(node_16, 2);
				var consequent_11 = ($$anchor) => {
					var button_4 = root_15$2();
					var text_20 = child(button_4, true);
					reset(button_4);
					template_effect(($0) => set_text(text_20, $0), [() => get(showAllDone) ? get(L).showLess : get(L).nCompleted(get(hiddenDoneCount))]);
					delegated("click", button_4, () => set(showAllDone, !get(showAllDone)));
					append($$anchor, button_4);
				};
				if_block(node_17, ($$render) => {
					if (get(hiddenDoneCount) > 0) $$render(consequent_11);
				});
				reset(div_19);
				template_effect(() => set_text(text_18, get(L).done));
				append($$anchor, div_19);
			};
			if_block(node_15, ($$render) => {
				if (get(dayCat).past.length > 0) $$render(consequent_12);
			});
			reset(div_10);
			var div_21 = sibling(div_10, 2);
			var div_22 = child(div_21);
			var text_21 = child(div_22, true);
			reset(div_22);
			var node_18 = sibling(div_22, 2);
			var consequent_14 = ($$anchor) => {
				var div_23 = root_5$5();
				var node_19 = child(div_23);
				var consequent_13 = ($$anchor) => {
					var fragment_6 = comment();
					snippet(first_child(fragment_6), () => get(emptySnippet));
					append($$anchor, fragment_6);
				};
				var alternate_3 = ($$anchor) => {
					var text_22 = text();
					template_effect(() => set_text(text_22, get(dayCat).past.length > 0 ? get(L).allDoneForToday : get(L).nothingScheduled));
					append($$anchor, text_22);
				};
				if_block(node_19, ($$render) => {
					if (get(emptySnippet)) $$render(consequent_13);
					else $$render(alternate_3, -1);
				});
				reset(div_23);
				append($$anchor, div_23);
			};
			var alternate_5 = ($$anchor) => {
				var fragment_8 = comment();
				each(first_child(fragment_8), 19, () => get(upcomingNext), (ev) => ev.id, ($$anchor, ev, i) => {
					var fragment_9 = comment();
					var node_22 = first_child(fragment_9);
					var consequent_16 = ($$anchor) => {
						var button_5 = root_9$3();
						let classes_5;
						let styles_5;
						EventContent(child(button_5), {
							get event() {
								return get(ev);
							},
							children: ($$anchor, $$slotProps) => {
								var fragment_10 = root_17$2();
								var span_12 = first_child(fragment_10);
								var text_23 = child(span_12, true);
								reset(span_12);
								var div_24 = sibling(span_12, 2);
								var span_13 = child(div_24);
								var text_24 = child(span_13, true);
								reset(span_13);
								var node_24 = sibling(span_13, 2);
								var consequent_15 = ($$anchor) => {
									var span_14 = root_6$5();
									var text_25 = child(span_14, true);
									reset(span_14);
									template_effect(() => set_text(text_25, get(ev).subtitle));
									append($$anchor, span_14);
								};
								if_block(node_24, ($$render) => {
									if (get(ev).subtitle) $$render(consequent_15);
								});
								reset(div_24);
								template_effect(($0) => {
									set_text(text_23, $0);
									set_text(text_24, get(ev).title);
								}, [() => fmt(get(ev).start)]);
								append($$anchor, fragment_10);
							},
							$$slots: { default: true }
						});
						reset(button_5);
						template_effect(($0, $1) => {
							classes_5 = set_class(button_5, 1, "ag-compact-row ag-compact-row--queue svelte-n8lbn1", null, classes_5, { "ag-compact-row--selected": selectedEventId() === get(ev).id });
							set_attribute(button_5, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
							styles_5 = set_style(button_5, "", styles_5, { "--ev-color": get(ev).color || "var(--dt-accent)" });
						}, [() => fmt(get(ev).start), () => duration(get(ev))]);
						delegated("click", button_5, () => handleClick(get(ev)));
						event("pointerenter", button_5, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_5);
					};
					var alternate_4 = ($$anchor) => {
						var button_6 = root_22$1();
						let classes_6;
						let styles_6;
						var div_25 = child(button_6);
						EventContent(child(div_25), {
							get event() {
								return get(ev);
							},
							children: ($$anchor, $$slotProps) => {
								var fragment_11 = root_21$2();
								var div_26 = first_child(fragment_11);
								var span_15 = child(div_26);
								var text_26 = child(span_15, true);
								reset(span_15);
								var span_16 = sibling(span_15, 2);
								var text_27 = child(span_16, true);
								reset(span_16);
								reset(div_26);
								var node_26 = sibling(div_26, 2);
								var consequent_17 = ($$anchor) => {
									var span_17 = root_18$2();
									var text_28 = child(span_17, true);
									reset(span_17);
									template_effect(() => set_text(text_28, get(ev).subtitle));
									append($$anchor, span_17);
								};
								if_block(node_26, ($$render) => {
									if (get(ev).subtitle) $$render(consequent_17);
								});
								var div_27 = sibling(node_26, 2);
								var text_29 = child(div_27);
								var span_18 = sibling(text_29);
								var text_30 = child(span_18, true);
								reset(span_18);
								reset(div_27);
								var node_27 = sibling(div_27, 2);
								var consequent_18 = ($$anchor) => {
									var div_28 = root_20$2();
									each(div_28, 21, () => get(ev).tags, index, ($$anchor, tag) => {
										var span_19 = root_19$2();
										var text_31 = child(span_19, true);
										reset(span_19);
										template_effect(() => set_text(text_31, get(tag)));
										append($$anchor, span_19);
									});
									reset(div_28);
									append($$anchor, div_28);
								};
								if_block(node_27, ($$render) => {
									if (get(ev).tags?.length) $$render(consequent_18);
								});
								template_effect(($0, $1, $2, $3) => {
									set_text(text_26, get(ev).title);
									set_text(text_27, $0);
									set_text(text_29, `${$1 ?? ""} – ${$2 ?? ""} `);
									set_text(text_30, $3);
								}, [
									() => eta(get(ev).start.getTime()),
									() => fmt(get(ev).start),
									() => fmt(get(ev).end),
									() => duration(get(ev))
								]);
								append($$anchor, fragment_11);
							},
							$$slots: { default: true }
						});
						reset(div_25);
						reset(button_6);
						template_effect(($0, $1) => {
							classes_6 = set_class(button_6, 1, "ag-card ag-card--q svelte-n8lbn1", null, classes_6, {
								"ag-card--hero": get(i) === 0,
								"ag-card--selected": selectedEventId() === get(ev).id
							});
							set_attribute(button_6, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
							styles_6 = set_style(button_6, "", styles_6, { "--ev-color": get(ev).color || "var(--dt-accent)" });
						}, [() => fmt(get(ev).start), () => duration(get(ev))]);
						delegated("click", button_6, () => handleClick(get(ev)));
						event("pointerenter", button_6, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_6);
					};
					if_block(node_22, ($$render) => {
						if (get(i) >= UPCOMING_CARDS) $$render(consequent_16);
						else $$render(alternate_4, -1);
					});
					append($$anchor, fragment_9);
				});
				append($$anchor, fragment_8);
			};
			if_block(node_18, ($$render) => {
				if (get(upcomingNext).length === 0) $$render(consequent_14);
				else $$render(alternate_5, -1);
			});
			reset(div_21);
			reset(div_9);
			template_effect(() => {
				set_text(text_12, `${get(L).now ?? ""} `);
				set_text(text_13, clock.hm);
				set_text(text_21, get(L).upNext);
			});
			append($$anchor, div_9);
		};
		var consequent_22 = ($$anchor) => {
			var div_29 = root_25$1();
			var node_28 = child(div_29);
			var consequent_21 = ($$anchor) => {
				var div_30 = root_5$5();
				var node_29 = child(div_30);
				var consequent_20 = ($$anchor) => {
					var fragment_12 = comment();
					snippet(first_child(fragment_12), () => get(emptySnippet));
					append($$anchor, fragment_12);
				};
				var alternate_6 = ($$anchor) => {
					var text_32 = text();
					template_effect(() => set_text(text_32, get(L).nothingWasScheduled));
					append($$anchor, text_32);
				};
				if_block(node_29, ($$render) => {
					if (get(emptySnippet)) $$render(consequent_20);
					else $$render(alternate_6, -1);
				});
				reset(div_30);
				append($$anchor, div_30);
			};
			var alternate_7 = ($$anchor) => {
				var fragment_14 = comment();
				each(first_child(fragment_14), 17, () => get(timedDayEvents), (ev) => ev.id, ($$anchor, ev) => {
					var button_7 = root_24$1();
					let classes_7;
					let styles_7;
					var span_20 = sibling(child(button_7), 2);
					var text_33 = child(span_20, true);
					reset(span_20);
					var span_21 = sibling(span_20, 2);
					let styles_8;
					var span_22 = sibling(span_21, 2);
					var text_34 = child(span_22, true);
					reset(span_22);
					var span_23 = sibling(span_22, 2);
					var text_35 = child(span_23, true);
					reset(span_23);
					reset(button_7);
					template_effect(($0, $1, $2, $3) => {
						classes_7 = set_class(button_7, 1, "ag-log-row svelte-n8lbn1", null, classes_7, { "ag-log-row--selected": selectedEventId() === get(ev).id });
						set_attribute(button_7, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""} to ${$1 ?? ""}`);
						styles_7 = set_style(button_7, "", styles_7, { "--ev-color": get(ev).color || "var(--dt-accent)" });
						set_text(text_33, $2);
						styles_8 = set_style(span_21, "", styles_8, { background: get(ev).color || "var(--dt-accent)" });
						set_text(text_34, get(ev).title);
						set_text(text_35, $3);
					}, [
						() => fmt(get(ev).start),
						() => fmt(get(ev).end),
						() => fmt(get(ev).start),
						() => duration(get(ev))
					]);
					delegated("click", button_7, () => handleClick(get(ev)));
					event("pointerenter", button_7, () => get(oneventhover)?.(get(ev)));
					append($$anchor, button_7);
				});
				append($$anchor, fragment_14);
			};
			if_block(node_28, ($$render) => {
				if (get(timedDayEvents).length === 0 && get(allDayBanner).length === 0) $$render(consequent_21);
				else $$render(alternate_7, -1);
			});
			reset(div_29);
			append($$anchor, div_29);
		};
		var alternate_10 = ($$anchor) => {
			var div_31 = root_28$1();
			var node_32 = child(div_31);
			var consequent_24 = ($$anchor) => {
				var div_32 = root_5$5();
				var node_33 = child(div_32);
				var consequent_23 = ($$anchor) => {
					var fragment_15 = comment();
					snippet(first_child(fragment_15), () => get(emptySnippet));
					append($$anchor, fragment_15);
				};
				var alternate_8 = ($$anchor) => {
					var text_36 = text();
					template_effect(() => set_text(text_36, get(L).nothingScheduledYet));
					append($$anchor, text_36);
				};
				if_block(node_33, ($$render) => {
					if (get(emptySnippet)) $$render(consequent_23);
					else $$render(alternate_8, -1);
				});
				reset(div_32);
				append($$anchor, div_32);
			};
			var alternate_9 = ($$anchor) => {
				var fragment_17 = comment();
				each(first_child(fragment_17), 19, () => get(timedDayEvents), (ev) => ev.id, ($$anchor, ev, i) => {
					var button_8 = root_22$1();
					let classes_8;
					let styles_9;
					var div_33 = child(button_8);
					EventContent(child(div_33), {
						get event() {
							return get(ev);
						},
						children: ($$anchor, $$slotProps) => {
							var fragment_18 = root_27$1();
							var div_34 = first_child(fragment_18);
							var span_24 = child(div_34);
							var text_37 = child(span_24, true);
							reset(span_24);
							var span_25 = sibling(span_24, 2);
							var text_38 = child(span_25, true);
							reset(span_25);
							reset(div_34);
							var node_37 = sibling(div_34, 2);
							var consequent_25 = ($$anchor) => {
								var span_26 = root_18$2();
								var text_39 = child(span_26, true);
								reset(span_26);
								template_effect(() => set_text(text_39, get(ev).subtitle));
								append($$anchor, span_26);
							};
							if_block(node_37, ($$render) => {
								if (get(ev).subtitle) $$render(consequent_25);
							});
							var node_38 = sibling(node_37, 2);
							var consequent_26 = ($$anchor) => {
								var span_27 = root_26$1();
								var text_40 = child(span_27, true);
								reset(span_27);
								template_effect(() => set_text(text_40, get(ev).location));
								append($$anchor, span_27);
							};
							if_block(node_38, ($$render) => {
								if (get(ev).location) $$render(consequent_26);
							});
							var div_35 = sibling(node_38, 2);
							var text_41 = child(div_35);
							var span_28 = sibling(text_41);
							var text_42 = child(span_28, true);
							reset(span_28);
							reset(div_35);
							var node_39 = sibling(div_35, 2);
							var consequent_27 = ($$anchor) => {
								var div_36 = root_20$2();
								each(div_36, 21, () => get(ev).tags, index, ($$anchor, tag) => {
									var span_29 = root_19$2();
									var text_43 = child(span_29, true);
									reset(span_29);
									template_effect(() => set_text(text_43, get(tag)));
									append($$anchor, span_29);
								});
								reset(div_36);
								append($$anchor, div_36);
							};
							if_block(node_39, ($$render) => {
								if (get(ev).tags?.length) $$render(consequent_27);
							});
							template_effect(($0, $1, $2) => {
								set_text(text_37, get(i) + 1);
								set_text(text_38, get(ev).title);
								set_text(text_41, `${$0 ?? ""} – ${$1 ?? ""} `);
								set_text(text_42, $2);
							}, [
								() => fmt(get(ev).start),
								() => fmt(get(ev).end),
								() => duration(get(ev))
							]);
							append($$anchor, fragment_18);
						},
						$$slots: { default: true }
					});
					reset(div_33);
					reset(button_8);
					template_effect(($0, $1, $2) => {
						classes_8 = set_class(button_8, 1, "ag-card ag-card--plan svelte-n8lbn1", null, classes_8, {
							"ag-card--first": get(i) === 0,
							"ag-card--selected": selectedEventId() === get(ev).id,
							"ag-card--cancelled": get(ev).status === "cancelled",
							"ag-card--tentative": get(ev).status === "tentative",
							"ag-card--full": get(ev).status === "full",
							"ag-card--limited": get(ev).status === "limited"
						});
						set_attribute(button_8, "aria-label", `${get(ev).title ?? ""}${get(ev).status === "cancelled" ? " (cancelled)" : ""}${get(ev).status === "tentative" ? " (tentative)" : ""}${get(ev).status === "full" ? " (full)" : ""}${get(ev).status === "limited" ? " (limited)" : ""}, ${$0 ?? ""} to ${$1 ?? ""}, ${$2 ?? ""}`);
						styles_9 = set_style(button_8, "", styles_9, { "--ev-color": get(ev).color || "var(--dt-accent)" });
					}, [
						() => fmt(get(ev).start),
						() => fmt(get(ev).end),
						() => duration(get(ev))
					]);
					delegated("click", button_8, () => handleClick(get(ev)));
					event("pointerenter", button_8, () => get(oneventhover)?.(get(ev)));
					append($$anchor, button_8);
				});
				append($$anchor, fragment_17);
			};
			if_block(node_32, ($$render) => {
				if (get(timedDayEvents).length === 0 && get(allDayBanner).length === 0) $$render(consequent_24);
				else $$render(alternate_9, -1);
			});
			reset(div_31);
			append($$anchor, div_31);
		};
		if_block(node_3, ($$render) => {
			if (get(compact)) $$render(consequent_8);
			else if (get(isToday)) $$render(consequent_19, 1);
			else if (get(isPastDay)) $$render(consequent_22, 2);
			else $$render(alternate_10, -1);
		});
		reset(div_1);
		reset(div);
		template_effect(($0) => {
			classes = set_class(div, 1, "ag ag--day svelte-n8lbn1", null, classes, $0);
			styles = set_style(div, style() || void 0, styles, { height: $$props.height ? `${$$props.height}px` : void 0 });
			set_attribute(div_1, "aria-label", get(L).todaysLineup);
		}, [() => ({
			"ag--disabled": get(disabledSet).has(get(dayMs)),
			"ag--mobile": get(isMobile),
			"ag--auto": get(autoHeight)
		})]);
		delegated("pointerdown", div, onPointerDown);
		delegated("pointerup", div, onPointerUp);
		event("pointercancel", div, onPointerCancel);
		append($$anchor, div);
		pop();
	}
	delegate([
		"pointerdown",
		"pointerup",
		"click"
	]);
	//#endregion
	//#region src/lib/views/agenda/AgendaWeek.svelte
	var root$3 = /* @__PURE__ */ from_html(`<span class="ag-card-sub svelte-uhwfyj"> </span>`);
	var root_1$4 = /* @__PURE__ */ from_html(`<span class="ag-card-loc svelte-uhwfyj"> </span>`);
	var root_2$4 = /* @__PURE__ */ from_html(`<span class="ag-card-eta svelte-uhwfyj"> </span>`);
	var root_3$4 = /* @__PURE__ */ from_html(`<span class="ag-card-tag svelte-uhwfyj"> </span>`);
	var root_4$4 = /* @__PURE__ */ from_html(`<div class="ag-card-tags svelte-uhwfyj"></div>`);
	var root_5$4 = /* @__PURE__ */ from_html(`<span class="ag-card-title svelte-uhwfyj"> </span> <!> <!> <span class="ag-card-meta svelte-uhwfyj"><!> <span class="ag-card-dur svelte-uhwfyj"> </span> <!></span> <!>`, 1);
	var root_6$4 = /* @__PURE__ */ from_html(`<div class="ag-card-progress svelte-uhwfyj"><div class="ag-card-progress-fill svelte-uhwfyj"></div></div>`);
	var root_7$4 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-card-body svelte-uhwfyj"><!> <!></div></button>`);
	var root_8$4 = /* @__PURE__ */ from_html(`<span class="ag-compact-loc svelte-uhwfyj"> </span>`);
	var root_9$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-sub svelte-uhwfyj"> </span>`);
	var root_10$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-tag svelte-uhwfyj"> </span>`);
	var root_11$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-time svelte-uhwfyj"> </span> <div class="ag-compact-main svelte-uhwfyj"><span class="ag-compact-title svelte-uhwfyj"> </span> <!> <!> <!></div> <span class="ag-compact-dur svelte-uhwfyj"> </span>`, 1);
	var root_12$2 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
	var root_13$1 = /* @__PURE__ */ from_html(`<button type="button"> <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button>`);
	var root_14$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-date svelte-uhwfyj"> </span>`);
	var root_15$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-custom-header svelte-uhwfyj"><!></div>`);
	var root_16$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-compact svelte-uhwfyj"></div>`);
	var root_17$1 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_18$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-past-line ag-wday-past-line--summary svelte-uhwfyj"> </div>`);
	var root_19$1 = /* @__PURE__ */ from_html(`<div role="listitem"><div><div class="ag-wday-head-left svelte-uhwfyj"><span class="ag-wday-name svelte-uhwfyj"> </span> <!></div> <!></div> <!></div>`);
	var root_20$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-badge svelte-uhwfyj"> </span>`);
	var root_21$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-badge ag-wday-badge--muted svelte-uhwfyj"> </span>`);
	var root_22 = /* @__PURE__ */ from_html(`<span class="ag-allday-span svelte-uhwfyj"> </span>`);
	var root_23 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-allday-dot svelte-uhwfyj"></span> <span class="ag-allday-title svelte-uhwfyj"> </span> <!></button>`);
	var root_24 = /* @__PURE__ */ from_html(`<div class="ag-allday svelte-uhwfyj"></div>`);
	var root_25 = /* @__PURE__ */ from_html(`<div> </div>`);
	var root_26 = /* @__PURE__ */ from_html(`<div class="ag-wslot svelte-uhwfyj"><div></div></div>`);
	var root_27 = /* @__PURE__ */ from_html(`<div class="ag-wday-expanded svelte-uhwfyj"></div>`);
	var root_28 = /* @__PURE__ */ from_html(`<div class="ag-wslot svelte-uhwfyj"><div class="ag-wslot-header svelte-uhwfyj"><span class="ag-wslot-now svelte-uhwfyj"> </span></div> <!></div>`);
	var root_29 = /* @__PURE__ */ from_html(`<div class="ag-wday-expanded svelte-uhwfyj"><!> <!> <!></div>`);
	var root_30 = /* @__PURE__ */ from_html(`<button type="button" class="ag-compact-more svelte-uhwfyj"> </button>`);
	var root_31 = /* @__PURE__ */ from_html(`<div class="ag-wday-compact svelte-uhwfyj"><!> <!></div>`);
	var root_32 = /* @__PURE__ */ from_html(`<div role="listitem"><div><div class="ag-wday-head-left svelte-uhwfyj"><!> <span class="ag-wday-name svelte-uhwfyj"> </span> <!></div> <!></div> <!> <!></div>`);
	var root_33 = /* @__PURE__ */ from_html(`<div><div class="ag-body svelte-uhwfyj" role="list"></div></div>`);
	function AgendaWeek($$anchor, $$props) {
		push($$props, true);
		const eventCard = ($$anchor, ev = noop, isNow = noop, eta = noop) => {
			var button = root_7$4();
			let classes;
			let styles;
			var div = child(button);
			var node = child(div);
			EventContent(node, {
				get event() {
					return ev();
				},
				children: ($$anchor, $$slotProps) => {
					var fragment = root_5$4();
					var span = first_child(fragment);
					var text$1 = child(span, true);
					reset(span);
					var node_1 = sibling(span, 2);
					var consequent = ($$anchor) => {
						var span_1 = root$3();
						var text_1 = child(span_1, true);
						reset(span_1);
						template_effect(() => set_text(text_1, ev().subtitle));
						append($$anchor, span_1);
					};
					if_block(node_1, ($$render) => {
						if (ev().subtitle) $$render(consequent);
					});
					var node_2 = sibling(node_1, 2);
					var consequent_1 = ($$anchor) => {
						var span_2 = root_1$4();
						var text_2 = child(span_2, true);
						reset(span_2);
						template_effect(() => set_text(text_2, ev().location));
						append($$anchor, span_2);
					};
					if_block(node_2, ($$render) => {
						if (ev().location) $$render(consequent_1);
					});
					var span_3 = sibling(node_2, 2);
					var node_3 = child(span_3);
					var consequent_2 = ($$anchor) => {
						var text_3 = text();
						template_effect(($0) => set_text(text_3, `${get(L).until ?? ""} ${$0 ?? ""}`), [() => fmt(ev().end)]);
						append($$anchor, text_3);
					};
					var alternate = ($$anchor) => {
						var text_4 = text();
						template_effect(($0, $1) => set_text(text_4, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmt(ev().start), () => fmt(ev().end)]);
						append($$anchor, text_4);
					};
					if_block(node_3, ($$render) => {
						if (isNow()) $$render(consequent_2);
						else $$render(alternate, -1);
					});
					var span_4 = sibling(node_3, 2);
					var text_5 = child(span_4, true);
					reset(span_4);
					var node_4 = sibling(span_4, 2);
					var consequent_3 = ($$anchor) => {
						var span_5 = root_2$4();
						var text_6 = child(span_5, true);
						reset(span_5);
						template_effect(() => set_text(text_6, eta()));
						append($$anchor, span_5);
					};
					if_block(node_4, ($$render) => {
						if (eta()) $$render(consequent_3);
					});
					reset(span_3);
					var node_5 = sibling(span_3, 2);
					var consequent_4 = ($$anchor) => {
						var div_1 = root_4$4();
						each(div_1, 21, () => ev().tags, index, ($$anchor, tag) => {
							var span_6 = root_3$4();
							var text_7 = child(span_6, true);
							reset(span_6);
							template_effect(() => set_text(text_7, get(tag)));
							append($$anchor, span_6);
						});
						reset(div_1);
						append($$anchor, div_1);
					};
					if_block(node_5, ($$render) => {
						if (ev().tags?.length) $$render(consequent_4);
					});
					template_effect(($0) => {
						set_text(text$1, ev().title);
						set_text(text_5, $0);
					}, [() => duration(ev())]);
					append($$anchor, fragment);
				},
				$$slots: { default: true }
			});
			var node_6 = sibling(node, 2);
			var consequent_5 = ($$anchor) => {
				var div_2 = root_6$4();
				var div_3 = child(div_2);
				let styles_1;
				reset(div_2);
				template_effect(($0) => styles_1 = set_style(div_3, "", styles_1, $0), [() => ({ transform: `scaleX(${prog(ev()) ?? ""})` })]);
				append($$anchor, div_2);
			};
			if_block(node_6, ($$render) => {
				if (isNow()) $$render(consequent_5);
			});
			reset(div);
			reset(button);
			template_effect(($0, $1, $2, $3, $4) => {
				classes = set_class(button, 1, "ag-card svelte-uhwfyj", null, classes, $0);
				set_attribute(button, "aria-label", `${ev().title ?? ""}${ev().status === "cancelled" ? " (cancelled)" : ""}${ev().status === "tentative" ? " (tentative)" : ""}${ev().status === "full" ? " (full)" : ""}${ev().status === "limited" ? " (limited)" : ""}, ${$1 ?? ""} to ${$2 ?? ""}, ${$3 ?? ""}`);
				set_attribute(button, "draggable", $4);
				styles = set_style(button, "", styles, { "--ev-color": ev().color || "var(--dt-accent)" });
			}, [
				() => ({
					"ag-card--selected": selectedEventId() === ev().id,
					"ag-card--cancelled": ev().status === "cancelled",
					"ag-card--tentative": ev().status === "tentative",
					"ag-card--full": ev().status === "full",
					"ag-card--limited": ev().status === "limited",
					"ag-card--drag": get(dragId) === String(ev().id)
				}),
				() => fmt(ev().start),
				() => fmt(ev().end),
				() => duration(ev()),
				() => canDrag(ev())
			]);
			event("dragstart", button, (e) => onCardDragStart(e, ev()));
			event("dragend", button, () => (set(dragId, null), set(dropDay, null)));
			delegated("click", button, () => handleClick(ev()));
			event("pointerenter", button, () => get(oneventhover)?.(ev()));
			append($$anchor, button);
		};
		const compactRow = ($$anchor, ev = noop, showLoc = noop, done = noop) => {
			var button_1 = root_12$2();
			let classes_1;
			let styles_2;
			EventContent(child(button_1), {
				get event() {
					return ev();
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_3 = root_11$2();
					var span_7 = first_child(fragment_3);
					var text_8 = child(span_7, true);
					reset(span_7);
					var div_4 = sibling(span_7, 2);
					var span_8 = child(div_4);
					var text_9 = child(span_8, true);
					reset(span_8);
					var node_8 = sibling(span_8, 2);
					var consequent_6 = ($$anchor) => {
						var span_9 = root_8$4();
						var text_10 = child(span_9, true);
						reset(span_9);
						template_effect(() => set_text(text_10, ev().location));
						append($$anchor, span_9);
					};
					if_block(node_8, ($$render) => {
						if (showLoc() && ev().location) $$render(consequent_6);
					});
					var node_9 = sibling(node_8, 2);
					var consequent_7 = ($$anchor) => {
						var span_10 = root_9$2();
						var text_11 = child(span_10, true);
						reset(span_10);
						template_effect(() => set_text(text_11, ev().subtitle));
						append($$anchor, span_10);
					};
					if_block(node_9, ($$render) => {
						if (ev().subtitle) $$render(consequent_7);
					});
					var node_10 = sibling(node_9, 2);
					var consequent_8 = ($$anchor) => {
						var fragment_4 = comment();
						each(first_child(fragment_4), 17, () => ev().tags, index, ($$anchor, tag) => {
							var span_11 = root_10$2();
							var text_12 = child(span_11, true);
							reset(span_11);
							template_effect(() => set_text(text_12, get(tag)));
							append($$anchor, span_11);
						});
						append($$anchor, fragment_4);
					};
					if_block(node_10, ($$render) => {
						if (ev().tags?.length) $$render(consequent_8);
					});
					reset(div_4);
					var span_12 = sibling(div_4, 2);
					var text_13 = child(span_12, true);
					reset(span_12);
					template_effect(($0, $1) => {
						set_text(text_8, $0);
						set_text(text_9, ev().title);
						set_text(text_13, $1);
					}, [() => fmt(ev().start), () => duration(ev())]);
					append($$anchor, fragment_3);
				},
				$$slots: { default: true }
			});
			reset(button_1);
			template_effect(($0, $1) => {
				classes_1 = set_class(button_1, 1, "ag-compact svelte-uhwfyj", null, classes_1, {
					"ag-compact--selected": selectedEventId() === ev().id,
					"ag-compact--done": done(),
					"ag-compact--cancelled": ev().status === "cancelled",
					"ag-compact--tentative": ev().status === "tentative",
					"ag-compact--full": ev().status === "full",
					"ag-compact--limited": ev().status === "limited"
				});
				set_attribute(button_1, "aria-label", `${ev().title ?? ""}${done() ? `, ${get(L).completed}` : ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
				styles_2 = set_style(button_1, "", styles_2, { "--ev-color": ev().color || "var(--dt-accent)" });
			}, [() => fmt(ev().start), () => duration(ev())]);
			delegated("click", button_1, () => handleClick(ev()));
			event("pointerenter", button_1, () => get(oneventhover)?.(ev()));
			append($$anchor, button_1);
		};
		const pastToggle = ($$anchor, ms = noop, count = noop, summary = noop) => {
			const open = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(ms()));
			var button_2 = root_13$1();
			let classes_2;
			var text_14 = child(button_2);
			var svg = sibling(text_14);
			let classes_3;
			reset(button_2);
			template_effect(($0) => {
				classes_2 = set_class(button_2, 1, "ag-wday-past-line ag-past-toggle svelte-uhwfyj", null, classes_2, { "ag-wday-past-line--summary": summary() });
				set_attribute(button_2, "aria-expanded", get(open));
				set_text(text_14, `✓ ${$0 ?? ""} `);
				classes_3 = set_class(svg, 0, "ag-past-chevron svelte-uhwfyj", null, classes_3, { "ag-past-chevron--open": get(open) });
			}, [() => get(L).nCompleted(count())]);
			delegated("click", button_2, () => togglePastExpand(ms()));
			append($$anchor, button_2);
		};
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		let mondayStart = prop($$props, "mondayStart", 3, true), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null);
		const clock = createClock(ctx.timezone);
		const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
		const equalDays = /* @__PURE__ */ user_derived(() => ctx.equalDays);
		const showDates = /* @__PURE__ */ user_derived(() => ctx.showDates);
		const hideDays = /* @__PURE__ */ user_derived(() => ctx.hideDays);
		const isMobile = /* @__PURE__ */ user_derived(() => ctx.isMobile);
		const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
		const compact = /* @__PURE__ */ user_derived(() => ctx.compact);
		const cols = /* @__PURE__ */ user_derived(() => ctx.columns && !get(isMobile));
		const dayHeaderSnippet = /* @__PURE__ */ user_derived(() => ctx.dayHeaderSnippet);
		const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
		const ondayclick = /* @__PURE__ */ user_derived(() => ctx.ondayclick);
		const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
		function clickDay(ms) {
			get(ondayclick)?.(new Date(ms));
		}
		const oneventmove = /* @__PURE__ */ user_derived(() => ctx.oneventmove);
		let dragId = /* @__PURE__ */ state(null);
		let dropDay = /* @__PURE__ */ state(null);
		const canDrag = (ev) => get(cols) && !!get(oneventmove) && !ev.data?.readOnly && !isAllDay(ev) && !isMultiDay(ev);
		/** Valid drop day for the card in flight: not past, not closed. */
		const isDropDay = (day) => get(dragId) !== null && day.tier !== "past" && !get(disabledSet).has(day.ms);
		function onCardDragStart(e, ev) {
			set(dragId, String(ev.id), true);
			if (e.dataTransfer) {
				e.dataTransfer.effectAllowed = "move";
				e.dataTransfer.setData("text/plain", String(ev.id));
			}
		}
		function onDayDrop(e, day) {
			if (!isDropDay(day)) return;
			e.preventDefault();
			e.stopPropagation();
			const ev = events().find((x) => String(x.id) === get(dragId));
			set(dragId, null);
			set(dropDay, null);
			if (!ev) return;
			if (sod(ev.start.getTime()) === day.ms) return;
			const start = new Date(day.ms + (ev.start.getTime() - sod(ev.start.getTime())));
			const end = new Date(start.getTime() + (ev.end.getTime() - ev.start.getTime()));
			get(oneventmove)?.(ev, start, end);
		}
		let swipeStartX = 0;
		let swipeStartY = 0;
		let swipeActive = false;
		const SWIPE_THRESHOLD = 50;
		function onPointerDown(e) {
			if (!get(isMobile) || e.pointerType !== "touch") return;
			swipeActive = true;
			swipeStartX = e.clientX;
			swipeStartY = e.clientY;
		}
		function onPointerUp(e) {
			if (!swipeActive || e.pointerType !== "touch") return;
			swipeActive = false;
			const dx = e.clientX - swipeStartX;
			const dy = e.clientY - swipeStartY;
			if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.4) {
				if (dx > 0) get(viewState)?.prev();
				else get(viewState)?.next();
			}
		}
		function onPointerCancel() {
			swipeActive = false;
		}
		let expandedDays = /* @__PURE__ */ state(proxy([]));
		function toggleDayExpand(ms) {
			set(expandedDays, get(expandedDays).includes(ms) ? get(expandedDays).filter((m) => m !== ms) : [...get(expandedDays), ms], true);
		}
		let expandedPast = /* @__PURE__ */ state(proxy([]));
		function togglePastExpand(ms) {
			set(expandedPast, get(expandedPast).includes(ms) ? get(expandedPast).filter((m) => m !== ms) : [...get(expandedPast), ms], true);
		}
		const fmt = (d) => fmtTime(d, $$props.locale);
		const eta = (ms) => timeUntilMs(ms, clock.tick, get(L));
		const prog = (ev) => progress(ev, clock.tick);
		function handleClick(ev) {
			$$props.oneventclick?.(ev);
		}
		/** True calendar-today, independent of tier (equalDays forces tier 'upcoming') */
		const weekStartMs = /* @__PURE__ */ user_derived(() => $$props.focusDate ? get(viewState)?.dayCount === 7 ? startOfWeek(sod($$props.focusDate.getTime()), mondayStart()) : sod($$props.focusDate.getTime()) : get(viewState)?.dayCount === 7 ? startOfWeek(clock.today, mondayStart()) : clock.today);
		const customDays = /* @__PURE__ */ user_derived(() => get(viewState)?.dayCount ?? 7);
		const weekDays = /* @__PURE__ */ user_derived(() => {
			const now = clock.tick;
			const todayMs = clock.today;
			const tomorrowMs = todayMs + DAY_MS;
			const out = [];
			for (let i = 0; i < get(customDays); i++) {
				const ms = get(weekStartMs) + i * DAY_MS;
				const dEnd = ms + DAY_MS;
				const dayEvts = events().filter((ev) => ev.start.getTime() < dEnd && ev.end.getTime() > ms).sort((a, b) => a.start.getTime() - b.start.getTime());
				const allDayEvts = dayEvts.filter((ev) => isAllDay(ev) || isMultiDay(ev));
				const timedEvts = dayEvts.filter((ev) => !isAllDay(ev) && !isMultiDay(ev));
				const totalMinutes = timedEvts.reduce((sum, ev) => {
					const s = Math.max(ev.start.getTime(), ms);
					return sum + (Math.min(ev.end.getTime(), dEnd) - s) / 6e4;
				}, 0);
				const pastEvents = [];
				const currentEvents = [];
				const upcomingEvents = [];
				for (const ev of timedEvts) if (ev.end.getTime() <= now) pastEvents.push(ev);
				else if (ev.start.getTime() <= now && ev.end.getTime() > now) currentEvents.push(ev);
				else upcomingEvents.push(ev);
				let tier;
				if (get(equalDays)) tier = "upcoming";
				else if (ms === todayMs) tier = "today";
				else if (ms === tomorrowMs) tier = "tomorrow";
				else if (ms < todayMs) tier = "past";
				else tier = "upcoming";
				out.push({
					ms,
					dayName: weekdayLong(ms, $$props.locale),
					dateLabel: `${monthLong(ms, $$props.locale)} ${dayNum(ms)}`,
					tier,
					isToday: ms === todayMs,
					events: dayEvts,
					allDayEvents: allDayEvts,
					timedEvents: timedEvts,
					pastEvents,
					currentEvents,
					upcomingEvents,
					totalHours: Math.round(totalMinutes / 60 * 10) / 10
				});
			}
			if (get(hideDays)?.length) return out.filter((d) => {
				const jsDay = new Date(d.ms).getDay();
				const iso = jsDay === 0 ? 7 : jsDay;
				return !get(hideDays).includes(iso);
			});
			return out;
		});
		var div_5 = root_33();
		let classes_4;
		let styles_3;
		var div_6 = child(div_5);
		let styles_4;
		each(div_6, 21, () => get(weekDays), (day) => day.ms, ($$anchor, day) => {
			const expanded = /* @__PURE__ */ user_derived(() => get(day).tier === "today" || get(day).tier === "tomorrow");
			var fragment_5 = comment();
			var node_12 = first_child(fragment_5);
			var consequent_14 = ($$anchor) => {
				var div_7 = root_19$1();
				let classes_5;
				var div_8 = child(div_7);
				let classes_6;
				var div_9 = child(div_8);
				var span_13 = child(div_9);
				var text_15 = child(span_13, true);
				reset(span_13);
				var node_13 = sibling(span_13, 2);
				var consequent_9 = ($$anchor) => {
					var span_14 = root_14$1();
					var text_16 = child(span_14, true);
					reset(span_14);
					template_effect(() => set_text(text_16, get(day).dateLabel));
					append($$anchor, span_14);
				};
				if_block(node_13, ($$render) => {
					if (get(showDates)) $$render(consequent_9);
				});
				reset(div_9);
				var node_14 = sibling(div_9, 2);
				var consequent_10 = ($$anchor) => {
					var div_10 = root_15$1();
					snippet(child(div_10), () => get(dayHeaderSnippet), () => ({
						date: new Date(get(day).ms),
						isToday: false,
						dayName: get(day).dayName
					}));
					reset(div_10);
					append($$anchor, div_10);
				};
				if_block(node_14, ($$render) => {
					if (get(dayHeaderSnippet)) $$render(consequent_10);
				});
				reset(div_8);
				var node_16 = sibling(div_8, 2);
				var consequent_12 = ($$anchor) => {
					var fragment_6 = root_17$1();
					var node_17 = first_child(fragment_6);
					pastToggle(node_17, () => get(day).ms, () => get(day).timedEvents.length, () => true);
					var node_18 = sibling(node_17, 2);
					var consequent_11 = ($$anchor) => {
						var div_11 = root_16$1();
						each(div_11, 21, () => get(day).timedEvents, (ev) => ev.id, ($$anchor, ev) => {
							compactRow($$anchor, () => get(ev), () => false, () => true);
						});
						reset(div_11);
						append($$anchor, div_11);
					};
					var d_1 = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(get(day).ms));
					if_block(node_18, ($$render) => {
						if (get(d_1)) $$render(consequent_11);
					});
					append($$anchor, fragment_6);
				};
				var consequent_13 = ($$anchor) => {
					var div_12 = root_18$1();
					var text_17 = child(div_12, true);
					reset(div_12);
					template_effect(() => set_text(text_17, get(L).noEvents));
					append($$anchor, div_12);
				};
				if_block(node_16, ($$render) => {
					if (get(day).timedEvents.length > 0) $$render(consequent_12);
					else if (get(day).events.length === 0) $$render(consequent_13, 1);
				});
				reset(div_7);
				template_effect(($0) => {
					classes_5 = set_class(div_7, 1, "ag-wday ag-wday--past svelte-uhwfyj", null, classes_5, $0);
					set_attribute(div_7, "data-day", get(day).ms);
					classes_6 = set_class(div_8, 1, "ag-wday-head svelte-uhwfyj", null, classes_6, { "ag-wday-head--click": !!get(ondayclick) });
					set_text(text_15, get(day).dayName);
				}, [() => ({ "ag-wday--disabled": get(disabledSet).has(get(day).ms) })]);
				delegated("click", div_8, function(...$$args) {
					(get(ondayclick) ? () => clickDay(get(day).ms) : void 0)?.apply(this, $$args);
				});
				append($$anchor, div_7);
			};
			var alternate_2 = ($$anchor) => {
				var div_13 = root_32();
				let classes_7;
				var div_14 = child(div_13);
				let classes_8;
				var div_15 = child(div_14);
				var node_19 = child(div_15);
				var consequent_15 = ($$anchor) => {
					var span_15 = root_20$1();
					var text_18 = child(span_15, true);
					reset(span_15);
					template_effect(() => set_text(text_18, get(L).today));
					append($$anchor, span_15);
				};
				var consequent_16 = ($$anchor) => {
					var span_16 = root_21$1();
					var text_19 = child(span_16, true);
					reset(span_16);
					template_effect(() => set_text(text_19, get(L).tomorrow));
					append($$anchor, span_16);
				};
				if_block(node_19, ($$render) => {
					if (get(day).isToday) $$render(consequent_15);
					else if (get(day).tier === "tomorrow") $$render(consequent_16, 1);
				});
				var span_17 = sibling(node_19, 2);
				var text_20 = child(span_17, true);
				reset(span_17);
				var node_20 = sibling(span_17, 2);
				var consequent_17 = ($$anchor) => {
					var span_18 = root_14$1();
					var text_21 = child(span_18, true);
					reset(span_18);
					template_effect(() => set_text(text_21, get(day).dateLabel));
					append($$anchor, span_18);
				};
				if_block(node_20, ($$render) => {
					if (get(showDates)) $$render(consequent_17);
				});
				reset(div_15);
				var node_21 = sibling(div_15, 2);
				var consequent_18 = ($$anchor) => {
					var div_16 = root_15$1();
					snippet(child(div_16), () => get(dayHeaderSnippet), () => ({
						date: new Date(get(day).ms),
						isToday: get(day).tier === "today",
						dayName: get(day).dayName
					}));
					reset(div_16);
					append($$anchor, div_16);
				};
				if_block(node_21, ($$render) => {
					if (get(dayHeaderSnippet)) $$render(consequent_18);
				});
				reset(div_14);
				var node_23 = sibling(div_14, 2);
				var consequent_20 = ($$anchor) => {
					var div_17 = root_24();
					each(div_17, 21, () => get(day).allDayEvents, (ev) => ev.id, ($$anchor, ev) => {
						const seg = /* @__PURE__ */ user_derived(() => segmentForDay(get(ev), get(day).ms));
						const isCont = /* @__PURE__ */ user_derived(() => get(seg) !== null && get(seg).totalDays > 1);
						var button_3 = root_23();
						let classes_9;
						let styles_5;
						var span_19 = sibling(child(button_3), 2);
						var text_22 = child(span_19, true);
						reset(span_19);
						var node_24 = sibling(span_19, 2);
						var consequent_19 = ($$anchor) => {
							var span_20 = root_22();
							var text_23 = child(span_20);
							reset(span_20);
							template_effect(() => set_text(text_23, `${get(seg).dayIndex ?? ""}/${get(seg).totalDays ?? ""}`));
							append($$anchor, span_20);
						};
						if_block(node_24, ($$render) => {
							if (get(isCont) && get(seg)) $$render(consequent_19);
						});
						reset(button_3);
						template_effect(($0) => {
							classes_9 = set_class(button_3, 1, "ag-allday-chip svelte-uhwfyj", null, classes_9, { "ag-allday-chip--selected": selectedEventId() === get(ev).id });
							set_attribute(button_3, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}`);
							styles_5 = set_style(button_3, "", styles_5, { "--ev-color": get(ev).color || "var(--dt-accent)" });
							set_text(text_22, get(ev).title);
						}, [() => get(isCont) && get(seg) ? get(L).dayNOfTotal(get(seg).dayIndex, get(seg).totalDays) : get(L).allDay]);
						delegated("click", button_3, () => handleClick(get(ev)));
						event("pointerenter", button_3, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_3);
					});
					reset(div_17);
					append($$anchor, div_17);
				};
				if_block(node_23, ($$render) => {
					if (get(day).allDayEvents.length > 0) $$render(consequent_20);
				});
				var node_25 = sibling(node_23, 2);
				var consequent_21 = ($$anchor) => {
					var div_18 = root_25();
					let classes_10;
					var text_24 = child(div_18, true);
					reset(div_18);
					template_effect(() => {
						classes_10 = set_class(div_18, 1, "ag-wday-empty svelte-uhwfyj", null, classes_10, { "ag-wday-empty--click": !!get(ondayclick) });
						set_text(text_24, get(L).noEvents);
					});
					delegated("click", div_18, function(...$$args) {
						(get(ondayclick) ? () => clickDay(get(day).ms) : void 0)?.apply(this, $$args);
					});
					append($$anchor, div_18);
				};
				var consequent_22 = ($$anchor) => {
					var div_19 = root_16$1();
					each(div_19, 21, () => get(day).timedEvents, (ev) => ev.id, ($$anchor, ev) => {
						compactRow($$anchor, () => get(ev), () => false, () => false);
					});
					reset(div_19);
					append($$anchor, div_19);
				};
				var consequent_23 = ($$anchor) => {
					var div_20 = root_27();
					each(div_20, 21, () => groupIntoSlots(get(day).timedEvents), (slot) => slot.startMs, ($$anchor, slot) => {
						var div_21 = root_26();
						var div_22 = child(div_21);
						let classes_11;
						each(div_22, 21, () => get(slot).events, (ev) => ev.id, ($$anchor, ev) => {
							eventCard($$anchor, () => get(ev), () => false);
						});
						reset(div_22);
						reset(div_21);
						template_effect(() => classes_11 = set_class(div_22, 1, "ag-wslot-cards svelte-uhwfyj", null, classes_11, { "ag-wslot-cards--multi": get(slot).events.length > 1 }));
						append($$anchor, div_21);
					});
					reset(div_20);
					append($$anchor, div_20);
				};
				var consequent_27 = ($$anchor) => {
					var div_23 = root_29();
					var node_26 = child(div_23);
					var consequent_24 = ($$anchor) => {
						var fragment_10 = comment();
						each(first_child(fragment_10), 17, () => get(day).currentEvents, (ev) => ev.id, ($$anchor, ev) => {
							var div_24 = root_28();
							var div_25 = child(div_24);
							var span_21 = child(div_25);
							var text_25 = child(span_21, true);
							reset(span_21);
							reset(div_25);
							var node_28 = sibling(div_25, 2);
							eventCard(node_28, () => get(ev), () => true);
							reset(div_24);
							template_effect(() => set_text(text_25, get(L).now));
							append($$anchor, div_24);
						});
						append($$anchor, fragment_10);
					};
					if_block(node_26, ($$render) => {
						if (get(day).currentEvents.length > 0) $$render(consequent_24);
					});
					var node_29 = sibling(node_26, 2);
					each(node_29, 17, () => groupIntoSlots(get(day).upcomingEvents), (slot) => slot.startMs, ($$anchor, slot) => {
						var div_26 = root_26();
						var div_27 = child(div_26);
						let classes_12;
						each(div_27, 21, () => get(slot).events, (ev) => ev.id, ($$anchor, ev) => {
							{
								let $0 = /* @__PURE__ */ user_derived(() => get(day).tier === "today" ? eta(get(ev).start.getTime()) : void 0);
								eventCard($$anchor, () => get(ev), () => false, () => get($0));
							}
						});
						reset(div_27);
						reset(div_26);
						template_effect(() => classes_12 = set_class(div_27, 1, "ag-wslot-cards svelte-uhwfyj", null, classes_12, { "ag-wslot-cards--multi": get(slot).events.length > 1 }));
						append($$anchor, div_26);
					});
					var node_30 = sibling(node_29, 2);
					var consequent_26 = ($$anchor) => {
						var fragment_12 = root_17$1();
						var node_31 = first_child(fragment_12);
						pastToggle(node_31, () => get(day).ms, () => get(day).pastEvents.length, () => false);
						var node_32 = sibling(node_31, 2);
						var consequent_25 = ($$anchor) => {
							var fragment_13 = comment();
							each(first_child(fragment_13), 17, () => get(day).pastEvents, (ev) => ev.id, ($$anchor, ev) => {
								compactRow($$anchor, () => get(ev), () => false, () => true);
							});
							append($$anchor, fragment_13);
						};
						var d_2 = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(get(day).ms));
						if_block(node_32, ($$render) => {
							if (get(d_2)) $$render(consequent_25);
						});
						append($$anchor, fragment_12);
					};
					if_block(node_30, ($$render) => {
						if (get(day).pastEvents.length > 0) $$render(consequent_26);
					});
					reset(div_23);
					append($$anchor, div_23);
				};
				var alternate_1 = ($$anchor) => {
					const dayExpanded = /* @__PURE__ */ user_derived(() => get(expandedDays).includes(get(day).ms));
					var div_28 = root_31();
					var node_34 = child(div_28);
					each(node_34, 17, () => get(dayExpanded) ? get(day).timedEvents : get(day).timedEvents.slice(0, 4), (ev) => ev.id, ($$anchor, ev) => {
						compactRow($$anchor, () => get(ev), () => true, () => false);
					});
					var node_35 = sibling(node_34, 2);
					var consequent_28 = ($$anchor) => {
						var button_4 = root_30();
						var text_26 = child(button_4, true);
						reset(button_4);
						template_effect(($0) => {
							set_attribute(button_4, "aria-expanded", get(dayExpanded));
							set_text(text_26, $0);
						}, [() => get(dayExpanded) ? get(L).showLess : get(L).nMore(get(day).timedEvents.length - 4)]);
						delegated("click", button_4, () => toggleDayExpand(get(day).ms));
						append($$anchor, button_4);
					};
					if_block(node_35, ($$render) => {
						if (get(day).timedEvents.length > 4) $$render(consequent_28);
					});
					reset(div_28);
					append($$anchor, div_28);
				};
				if_block(node_25, ($$render) => {
					if (get(day).events.length === 0) $$render(consequent_21);
					else if (get(compact) && !get(cols)) $$render(consequent_22, 1);
					else if (get(equalDays) || get(cols) && !get(expanded)) $$render(consequent_23, 2);
					else if (get(expanded)) $$render(consequent_27, 3);
					else $$render(alternate_1, -1);
				});
				reset(div_13);
				template_effect(($0) => {
					classes_7 = set_class(div_13, 1, "ag-wday svelte-uhwfyj", null, classes_7, $0);
					set_attribute(div_13, "data-day", get(day).ms);
					classes_8 = set_class(div_14, 1, "ag-wday-head svelte-uhwfyj", null, classes_8, { "ag-wday-head--click": !!get(ondayclick) });
					set_text(text_20, get(day).dayName);
				}, [() => ({
					"ag-wday--today": get(day).tier === "today",
					"ag-wday--tomorrow": get(day).tier === "tomorrow",
					"ag-wday--equal": get(equalDays),
					"ag-wday--disabled": get(disabledSet).has(get(day).ms),
					"ag-wday--drop": get(dropDay) === get(day).ms && isDropDay(get(day))
				})]);
				event("dragover", div_13, (e) => {
					if (!isDropDay(get(day))) return;
					e.preventDefault();
					set(dropDay, get(day).ms, true);
					if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
				});
				event("dragleave", div_13, () => {
					if (get(dropDay) === get(day).ms) set(dropDay, null);
				});
				event("drop", div_13, (e) => onDayDrop(e, get(day)));
				delegated("click", div_14, function(...$$args) {
					(get(ondayclick) ? () => clickDay(get(day).ms) : void 0)?.apply(this, $$args);
				});
				append($$anchor, div_13);
			};
			if_block(node_12, ($$render) => {
				if (get(day).tier === "past") $$render(consequent_14);
				else $$render(alternate_2, -1);
			});
			append($$anchor, fragment_5);
		});
		reset(div_6);
		reset(div_5);
		template_effect(() => {
			classes_4 = set_class(div_5, 1, "ag ag--week svelte-uhwfyj", null, classes_4, {
				"ag--mobile": get(isMobile),
				"ag--auto": get(autoHeight),
				"ag--cols": get(cols)
			});
			styles_3 = set_style(div_5, style() || void 0, styles_3, { height: $$props.height ? `${$$props.height}px` : void 0 });
			set_attribute(div_6, "aria-label", get(L).weekAhead);
			styles_4 = set_style(div_6, "", styles_4, { "--ag-cols": get(weekDays).length });
		});
		delegated("pointerdown", div_5, onPointerDown);
		delegated("pointerup", div_5, onPointerUp);
		event("pointercancel", div_5, onPointerCancel);
		append($$anchor, div_5);
		pop();
	}
	delegate([
		"click",
		"pointerdown",
		"pointerup"
	]);
	//#endregion
	//#region src/lib/views/agenda/Agenda.svelte
	var rest_excludes$1 = /* @__PURE__ */ new Set([
		"$$slots",
		"$$events",
		"$$legacy",
		"mode"
	]);
	function Agenda($$anchor, $$props) {
		let mode = prop($$props, "mode", 3, "day"), rest = /* @__PURE__ */ rest_props($$props, rest_excludes$1);
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			AgendaDay($$anchor, spread_props(() => rest));
		};
		var alternate = ($$anchor) => {
			AgendaWeek($$anchor, spread_props(() => rest));
		};
		if_block(node, ($$render) => {
			if (mode() === "day") $$render(consequent);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
	}
	function createSwipe(cb) {
		let startX = 0;
		let startY = 0;
		let tracking = false;
		let dx = 0;
		function abandon() {
			tracking = false;
			if (dx !== 0) {
				dx = 0;
				cb.onmove(0);
			}
		}
		return {
			ontouchstart(e) {
				if (cb.disabled?.()) {
					tracking = false;
					return;
				}
				const t = e.touches[0];
				startX = t.clientX;
				startY = t.clientY;
				tracking = true;
				dx = 0;
			},
			ontouchmove(e) {
				if (!tracking) return;
				if (cb.disabled?.()) {
					abandon();
					return;
				}
				const t = e.touches[0];
				const mx = t.clientX - startX;
				const my = t.clientY - startY;
				if (Math.abs(my) > Math.abs(mx) * .8) {
					abandon();
					return;
				}
				dx = mx;
				cb.onmove(dx);
			},
			ontouchend() {
				if (!tracking) {
					cb.onend(0);
					return;
				}
				tracking = false;
				const dir = Math.abs(dx) > 50 ? dx > 0 ? 1 : -1 : 0;
				dx = 0;
				cb.onend(dir);
			},
			ontouchcancel() {
				if (!tracking) return;
				tracking = false;
				dx = 0;
				cb.onend(0);
			}
		};
	}
	//#endregion
	//#region src/lib/views/mobile/MobileDay.svelte
	var root_1$3 = /* @__PURE__ */ from_html(`<span class="mb-allday-span svelte-zbkzcp"> </span>`);
	var root_2$3 = /* @__PURE__ */ from_html(`<button type="button"><span class="mb-allday-dot svelte-zbkzcp"></span> <span class="mb-allday-title svelte-zbkzcp"> </span> <!></button>`);
	var root_3$3 = /* @__PURE__ */ from_html(`<button type="button" class="mb-allday-more svelte-zbkzcp"> </button>`);
	var root_4$3 = /* @__PURE__ */ from_html(`<div><!> <!></div>`);
	var root_5$3 = /* @__PURE__ */ from_html(`<span class="mb-blocked-label svelte-zbkzcp"> </span>`);
	var root_6$3 = /* @__PURE__ */ from_html(`<div><div class="mb-hour-label svelte-zbkzcp"> </div> <div class="mb-hour-line svelte-zbkzcp"></div> <!></div>`);
	var root_7$3 = /* @__PURE__ */ from_html(`<div class="mb-now svelte-zbkzcp"><span class="mb-now-label svelte-zbkzcp"> </span> <div class="mb-now-line svelte-zbkzcp"></div></div>`);
	var root_8$3 = /* @__PURE__ */ from_html(`<span class="mb-ev-time svelte-zbkzcp"> </span>`);
	var root_9$1 = /* @__PURE__ */ from_html(`<span class="mb-ev-sub svelte-zbkzcp"> </span>`);
	var root_10$1 = /* @__PURE__ */ from_html(`<span class="mb-ev-loc svelte-zbkzcp"> </span>`);
	var root_11$1 = /* @__PURE__ */ from_html(`<span class="mb-ev-tag svelte-zbkzcp"> </span>`);
	var root_12$1 = /* @__PURE__ */ from_html(`<div class="mb-ev-tags svelte-zbkzcp"></div>`);
	var root_13 = /* @__PURE__ */ from_html(`<span class="mb-ev-title svelte-zbkzcp"> </span> <!> <!> <!> <!>`, 1);
	var root_14 = /* @__PURE__ */ from_html(`<span class="mb-ev-live svelte-zbkzcp"></span>`);
	var root_15 = /* @__PURE__ */ from_html(`<span class="mb-ev-next-badge svelte-zbkzcp"> </span>`);
	var root_16 = /* @__PURE__ */ from_html(`<span class="mb-ev-handle mb-ev-handle--start svelte-zbkzcp" aria-hidden="true"></span> <span class="mb-ev-handle mb-ev-handle--end svelte-zbkzcp" aria-hidden="true"></span>`, 1);
	var root_17 = /* @__PURE__ */ from_html(`<button type="button"><div class="mb-ev-stripe svelte-zbkzcp"></div> <div class="mb-ev-body svelte-zbkzcp"><!></div> <!> <!></button>`);
	var root_18 = /* @__PURE__ */ from_html(`<div class="mb-create-ghost svelte-zbkzcp" aria-hidden="true"><span class="mb-create-ghost-time svelte-zbkzcp"> </span></div>`);
	var root_19 = /* @__PURE__ */ from_html(`<span class="mb-empty-text svelte-zbkzcp"> </span>`);
	var root_20 = /* @__PURE__ */ from_html(`<div class="mb-empty svelte-zbkzcp"><!></div>`);
	var root_21 = /* @__PURE__ */ from_html(`<div role="region"><div><!>  <div class="mb-grid svelte-zbkzcp" role="region" tabindex="0"><div class="mb-grid-inner svelte-zbkzcp"><!> <!> <!> <!></div></div> <!></div></div>`);
	function MobileDay($$anchor, $$props) {
		push($$props, true);
		let height = prop($$props, "height", 3, null), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null), readOnly = prop($$props, "readOnly", 3, false);
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
		const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
		const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
		const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
		const loadRangeCtx = /* @__PURE__ */ user_derived(() => ctx.loadRange);
		const minDuration = /* @__PURE__ */ user_derived(() => ctx.minDuration);
		const blockedSlots = /* @__PURE__ */ user_derived(() => ctx.blockedSlots);
		const drag = /* @__PURE__ */ user_derived(() => ctx.drag);
		const commitDragCtx = /* @__PURE__ */ user_derived(() => ctx.commitDrag);
		const SNAP_MS = /* @__PURE__ */ user_derived(() => ctx.snapInterval * 6e4);
		const clock = createClock(ctx.timezone);
		const HOUR_HEIGHT = 64;
		const GUTTER_W = 40;
		const startHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[0] ?? 0);
		const endHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[1] ?? 24);
		const hourCount = /* @__PURE__ */ user_derived(() => Math.max(1, get(endHour) - get(startHour)));
		const gridHeight = /* @__PURE__ */ user_derived(() => get(hourCount) * HOUR_HEIGHT);
		const dayMs = /* @__PURE__ */ user_derived(() => $$props.focusDate ? sod($$props.focusDate.getTime()) : clock.today);
		const dayEnd = /* @__PURE__ */ user_derived(() => get(dayMs) + DAY_MS);
		const isToday = /* @__PURE__ */ user_derived(() => get(dayMs) === clock.today);
		const isDisabled = /* @__PURE__ */ user_derived(() => get(disabledSet).has(get(dayMs)));
		user_effect(() => {
			if (!get(loadRangeCtx)) return;
			const rangeStart = /* @__PURE__ */ new Date(get(dayMs) - 2 * DAY_MS);
			const rangeEnd = new Date(get(dayMs) + 3 * DAY_MS);
			get(loadRangeCtx).set({
				start: rangeStart,
				end: rangeEnd
			});
			return () => get(loadRangeCtx).set(null);
		});
		const timedEvents = /* @__PURE__ */ user_derived(() => events().filter((ev) => !isAllDay(ev) && !isMultiDay(ev) && ev.start.getTime() < get(dayEnd) && ev.end.getTime() > get(dayMs)).sort((a, b) => a.start.getTime() - b.start.getTime()));
		const allDayEvents = /* @__PURE__ */ user_derived(() => {
			const segs = [];
			for (const ev of events()) {
				if (!isAllDay(ev) && !isMultiDay(ev)) continue;
				const seg = segmentForDay(ev, get(dayMs));
				if (seg) segs.push(seg);
			}
			return segs;
		});
		const isEmpty = /* @__PURE__ */ user_derived(() => get(timedEvents).length === 0 && get(allDayEvents).length === 0);
		const ALLDAY_MAX = 3;
		let allDayExpanded = /* @__PURE__ */ state(false);
		const visibleAllDay = /* @__PURE__ */ user_derived(() => get(allDayExpanded) ? get(allDayEvents) : get(allDayEvents).slice(0, ALLDAY_MAX));
		const positionedEvents = /* @__PURE__ */ user_derived(() => {
			const now = clock.tick;
			const sorted = [...get(timedEvents)];
			const rsP = get(drag)?.active && (get(drag).mode === "resize-start" || get(drag).mode === "resize-end") ? get(drag).payload : null;
			let nextEventId = null;
			if (get(isToday)) {
				for (const ev of [...sorted].sort((a, b) => a.start.getTime() - b.start.getTime())) if (ev.start.getTime() > now) {
					nextEventId = ev.id;
					break;
				}
			}
			const infos = sorted.map((ev) => {
				const resizing = rsP?.eventId === ev.id;
				const evStart = resizing ? rsP.start : ev.start;
				const evEnd = resizing ? rsP.end : ev.end;
				const sMs = Math.max(evStart.getTime(), get(dayMs) + get(startHour) * HOUR_MS);
				const eMs = Math.min(evEnd.getTime(), get(dayMs) + get(endHour) * HOUR_MS);
				const topH = (sMs - get(dayMs)) / HOUR_MS - get(startHour);
				const botH = (eMs - get(dayMs)) / HOUR_MS - get(startHour);
				return {
					ev,
					top: topH * HOUR_HEIGHT,
					height: Math.max(24, (botH - topH) * HOUR_HEIGHT),
					isCurrent: ev.start.getTime() <= now && ev.end.getTime() > now,
					isNext: ev.id === nextEventId,
					isResizing: resizing,
					startMs: sMs,
					endMs: eMs,
					col: 0,
					totalCols: 1
				};
			});
			const par = infos.map((_, i) => i);
			function find(i) {
				while (par[i] !== i) {
					par[i] = par[par[i]];
					i = par[i];
				}
				return i;
			}
			for (let i = 0; i < infos.length; i++) for (let j = i + 1; j < infos.length; j++) if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
			else break;
			const groups = /* @__PURE__ */ new Map();
			for (let i = 0; i < infos.length; i++) {
				const root = find(i);
				if (!groups.has(root)) groups.set(root, []);
				groups.get(root).push(i);
			}
			for (const [, indices] of groups) {
				const rows = [];
				for (const idx of indices) {
					let row = 0;
					for (let r = 0; r < rows.length; r++) {
						if (rows[r] <= infos[idx].startMs) {
							row = r;
							rows[r] = infos[idx].endMs;
							break;
						}
						row = r + 1;
					}
					if (row >= rows.length) rows.push(infos[idx].endMs);
					infos[idx].col = row;
				}
				for (const idx of indices) infos[idx].totalCols = rows.length;
			}
			return infos.map((info) => ({
				ev: info.ev,
				top: info.top,
				height: info.height,
				left: `calc(${GUTTER_W}px + ${info.col / info.totalCols * 100}% - ${GUTTER_W * info.col / info.totalCols}px)`,
				width: `calc(${100 / info.totalCols}% - ${GUTTER_W / info.totalCols + 2}px)`,
				isCurrent: info.isCurrent,
				isNext: info.isNext,
				isResizing: info.isResizing,
				col: info.col,
				totalCols: info.totalCols
			}));
		});
		const nowOffset = /* @__PURE__ */ user_derived(() => {
			if (!get(isToday)) return -1;
			const h = (clock.tick - get(dayMs)) / HOUR_MS - get(startHour);
			if (h < 0 || h > get(hourCount)) return -1;
			return h * HOUR_HEIGHT;
		});
		function isBlockedAt(hour) {
			if (!get(blockedSlots)?.length) return false;
			const jsDay = new Date(get(dayMs)).getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;
			return get(blockedSlots).some((slot) => {
				if (slot.day && slot.day !== isoDay) return false;
				return hour >= slot.start && hour < slot.end;
			});
		}
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		let swipeOffset = /* @__PURE__ */ state(0);
		let swipeAnimate = /* @__PURE__ */ state(false);
		const swipe = createSwipe({
			disabled: () => !!get(drag)?.active || mbCreateStarted || mbRsStarted || longPressTimer !== null,
			onmove: (dx) => {
				set(swipeAnimate, false);
				set(swipeOffset, dx, true);
			},
			onend: (dir) => {
				if (dir !== 0) {
					set(swipeAnimate, false);
					set(swipeOffset, 0);
					if (dir > 0) get(viewState)?.prev();
					else get(viewState)?.next();
				} else {
					set(swipeAnimate, true);
					set(swipeOffset, 0);
				}
			}
		});
		function handleGridClick(e) {
			if (suppressGridClick) {
				suppressGridClick = false;
				return;
			}
			if (!$$props.oneventcreate || readOnly() || get(isDisabled)) return;
			if (e.target.closest(".mb-event")) return;
			const tMs = gridTimeMs(e.clientY);
			if (isBlockedAt((tMs - get(dayMs)) / 36e5)) return;
			const startMs = clampToDay(Math.floor(tMs / get(SNAP_MS)) * get(SNAP_MS));
			const durMin = get(minDuration) ?? 60;
			$$props.oneventcreate({
				start: new Date(startMs),
				end: new Date(startMs + durMin * 6e4)
			});
		}
		function onGridKeydown(e) {
			if (e.key !== "Enter" && e.key !== " ") return;
			if (!$$props.oneventcreate || readOnly() || get(isDisabled)) return;
			e.preventDefault();
			const raw = get(isToday) ? clock.tick : get(dayMs) + get(startHour) * HOUR_MS;
			const startMs = clampToDay(Math.ceil(raw / get(SNAP_MS)) * get(SNAP_MS));
			if (isBlockedAt((startMs - get(dayMs)) / 36e5)) return;
			const durMin = get(minDuration) ?? 60;
			$$props.oneventcreate({
				start: new Date(startMs),
				end: new Date(startMs + durMin * 6e4)
			});
		}
		const CREATE_THRESHOLD = 4;
		const LONG_PRESS_MS = 350;
		const LONG_PRESS_TOLERANCE = 8;
		let suppressGridClick = false;
		let mbCreateStartX = 0;
		let mbCreateStartY = 0;
		let mbCreateAnchorMs = 0;
		let mbCreateStarted = false;
		let longPressTimer = null;
		function blockTouchScroll(e) {
			e.preventDefault();
		}
		function addTouchScrollBlock() {
			window.addEventListener("touchmove", blockTouchScroll, { passive: false });
		}
		function removeTouchScrollBlock() {
			window.removeEventListener("touchmove", blockTouchScroll);
		}
		function clearLongPress() {
			if (longPressTimer !== null) {
				clearTimeout(longPressTimer);
				longPressTimer = null;
			}
		}
		/** Pointer Y → epoch ms within the day grid (accounts for scroll). */
		function gridTimeMs(clientY) {
			const y = clientY - gridEl.getBoundingClientRect().top + gridEl.scrollTop;
			return get(dayMs) + (get(startHour) + y / HOUR_HEIGHT) * HOUR_MS;
		}
		/** Clamp a timestamp into the visible hour range of this day. */
		function clampToDay(ms) {
			return Math.max(get(dayMs) + get(startHour) * HOUR_MS, Math.min(get(dayMs) + get(endHour) * HOUR_MS, ms));
		}
		function startGridCreate() {
			if (!get(drag)) return;
			mbCreateStarted = true;
			mbCreateAnchorMs = clampToDay(Math.floor(mbCreateAnchorMs / get(SNAP_MS)) * get(SNAP_MS));
			get(drag).beginCreate(new Date(mbCreateAnchorMs), new Date(mbCreateAnchorMs + get(SNAP_MS)));
			addTouchScrollBlock();
		}
		function onGridPointerDown(e) {
			if (e.button !== 0 || !get(drag) || !$$props.oneventcreate || readOnly() || get(isDisabled)) return;
			if (e.target.closest(".mb-event")) return;
			mbCreateStartX = e.clientX;
			mbCreateStartY = e.clientY;
			mbCreateAnchorMs = gridTimeMs(e.clientY);
			mbCreateStarted = false;
			if (e.pointerType === "touch") longPressTimer = setTimeout(() => {
				longPressTimer = null;
				startGridCreate();
			}, LONG_PRESS_MS);
			window.addEventListener("pointermove", onGridCreateMove);
			window.addEventListener("pointerup", onGridCreateUp, { once: true });
			window.addEventListener("pointercancel", onGridCreateCancel, { once: true });
		}
		function onGridCreateMove(e) {
			if (!get(drag)) return;
			if (!mbCreateStarted) {
				if (longPressTimer !== null) {
					if (Math.hypot(e.clientX - mbCreateStartX, e.clientY - mbCreateStartY) > LONG_PRESS_TOLERANCE) cleanupGridCreate();
					return;
				}
				if (e.pointerType === "touch") return;
				if (Math.abs(e.clientY - mbCreateStartY) < CREATE_THRESHOLD) return;
				startGridCreate();
			}
			const snapped = clampToDay(Math.round(gridTimeMs(e.clientY) / get(SNAP_MS)) * get(SNAP_MS));
			get(drag).updatePointer(new Date(Math.min(mbCreateAnchorMs, snapped)), new Date(Math.max(mbCreateAnchorMs + get(SNAP_MS), snapped)));
		}
		function cleanupGridCreate() {
			clearLongPress();
			removeTouchScrollBlock();
			window.removeEventListener("pointermove", onGridCreateMove);
			window.removeEventListener("pointerup", onGridCreateUp);
			window.removeEventListener("pointercancel", onGridCreateCancel);
			mbCreateStarted = false;
		}
		function onGridCreateUp() {
			if (get(drag) && mbCreateStarted) {
				suppressGridClick = true;
				get(commitDragCtx)?.();
				setTimeout(() => {
					suppressGridClick = false;
				}, 0);
			}
			cleanupGridCreate();
		}
		function onGridCreateCancel() {
			if (get(drag) && mbCreateStarted) get(drag).cancel();
			cleanupGridCreate();
		}
		function onGridContextMenu(e) {
			if (mbCreateStarted || longPressTimer !== null) e.preventDefault();
		}
		let suppressEventClick = false;
		let mbRsStartY = 0;
		let mbRsStarted = false;
		let mbRsEdge = "end";
		let mbRsEvent = null;
		function onResizePointerDown(e, ev, edge) {
			if (e.button !== 0 || !get(drag) || readOnly() || ev.data?.readOnly) return;
			e.stopPropagation();
			mbRsStartY = e.clientY;
			mbRsStarted = false;
			mbRsEdge = edge;
			mbRsEvent = ev;
			window.addEventListener("pointermove", onResizeMove);
			window.addEventListener("pointerup", onResizeUp, { once: true });
			window.addEventListener("pointercancel", onResizeCancel, { once: true });
		}
		function onResizeMove(e) {
			const ev = mbRsEvent;
			if (!get(drag) || !ev) return;
			if (!mbRsStarted) {
				if (Math.abs(e.clientY - mbRsStartY) < CREATE_THRESHOLD) return;
				mbRsStarted = true;
				get(drag).beginResize(ev.id, mbRsEdge, ev.start, ev.end);
				addTouchScrollBlock();
			}
			const snapped = clampToDay(Math.round(gridTimeMs(e.clientY) / get(SNAP_MS)) * get(SNAP_MS));
			if (mbRsEdge === "end") {
				const end = Math.max(snapped, ev.start.getTime() + get(SNAP_MS));
				get(drag).updatePointer(ev.start, new Date(end));
			} else {
				const start = Math.min(snapped, ev.end.getTime() - get(SNAP_MS));
				get(drag).updatePointer(new Date(start), ev.end);
			}
		}
		function cleanupResize() {
			removeTouchScrollBlock();
			window.removeEventListener("pointermove", onResizeMove);
			window.removeEventListener("pointerup", onResizeUp);
			window.removeEventListener("pointercancel", onResizeCancel);
			mbRsStarted = false;
			mbRsEvent = null;
		}
		function onResizeUp() {
			if (get(drag) && mbRsStarted) {
				suppressEventClick = true;
				suppressGridClick = true;
				get(commitDragCtx)?.();
				setTimeout(() => {
					suppressEventClick = false;
					suppressGridClick = false;
				}, 0);
			}
			cleanupResize();
		}
		function onResizeCancel() {
			if (get(drag) && mbRsStarted) get(drag).cancel();
			cleanupResize();
		}
		let gridEl;
		user_effect(() => {
			get(dayMs);
			const el = gridEl;
			if (!el) return;
			untrack(() => {
				if (get(nowOffset) >= 0) el.scrollTop = Math.max(0, get(nowOffset) - 120);
			});
		});
		var div = root_21();
		let classes;
		let styles;
		var div_1 = child(div);
		let classes_1;
		let styles_1;
		var node = child(div_1);
		var consequent_2 = ($$anchor) => {
			var div_2 = root_4$3();
			let classes_2;
			var node_1 = child(div_2);
			each(node_1, 17, () => get(visibleAllDay), (seg) => seg.ev.id, ($$anchor, seg) => {
				var button = root_2$3();
				let classes_3;
				let styles_2;
				var span = sibling(child(button), 2);
				var text = child(span, true);
				reset(span);
				var node_2 = sibling(span, 2);
				var consequent = ($$anchor) => {
					var span_1 = root_1$3();
					var text_1 = child(span_1);
					reset(span_1);
					template_effect(() => set_text(text_1, `${get(seg).dayIndex ?? ""}/${get(seg).totalDays ?? ""}`));
					append($$anchor, span_1);
				};
				if_block(node_2, ($$render) => {
					if (get(seg).totalDays > 1) $$render(consequent);
				});
				reset(button);
				template_effect(() => {
					classes_3 = set_class(button, 1, "mb-allday-chip svelte-zbkzcp", null, classes_3, { "mb-allday-chip--selected": selectedEventId() === get(seg).ev.id });
					styles_2 = set_style(button, "", styles_2, { "--ev-color": get(seg).ev.color ?? "var(--dt-accent)" });
					set_text(text, get(seg).ev.title);
				});
				delegated("click", button, () => $$props.oneventclick?.(get(seg).ev));
				append($$anchor, button);
			});
			var node_3 = sibling(node_1, 2);
			var consequent_1 = ($$anchor) => {
				var button_1 = root_3$3();
				var text_2 = child(button_1, true);
				reset(button_1);
				template_effect(($0) => {
					set_attribute(button_1, "aria-expanded", get(allDayExpanded));
					set_text(text_2, $0);
				}, [() => get(allDayExpanded) ? get(L).showLess : get(L).nMore(get(allDayEvents).length - ALLDAY_MAX)]);
				delegated("click", button_1, () => {
					set(allDayExpanded, !get(allDayExpanded));
				});
				append($$anchor, button_1);
			};
			if_block(node_3, ($$render) => {
				if (get(allDayEvents).length > ALLDAY_MAX) $$render(consequent_1);
			});
			reset(div_2);
			template_effect(() => classes_2 = set_class(div_2, 1, "mb-allday svelte-zbkzcp", null, classes_2, { "mb-allday--expanded": get(allDayExpanded) }));
			append($$anchor, div_2);
		};
		if_block(node, ($$render) => {
			if (get(allDayEvents).length > 0) $$render(consequent_2);
		});
		var div_3 = sibling(node, 2);
		var div_4 = child(div_3);
		let styles_3;
		var node_4 = child(div_4);
		each(node_4, 17, () => ({ length: get(hourCount) }), index, ($$anchor, _, h) => {
			const hour = /* @__PURE__ */ user_derived(() => get(startHour) + h);
			const blocked = /* @__PURE__ */ user_derived(() => isBlockedAt(get(hour)));
			var div_5 = root_6$3();
			let classes_4;
			set_style(div_5, "", {}, {
				top: `${h * HOUR_HEIGHT}px`,
				height: "64px"
			});
			var div_6 = child(div_5);
			var text_3 = child(div_6, true);
			reset(div_6);
			var node_5 = sibling(div_6, 4);
			var consequent_4 = ($$anchor) => {
				const slot = /* @__PURE__ */ user_derived(() => get(blockedSlots).find((s) => (!s.day || s.day === (new Date(get(dayMs)).getDay() === 0 ? 7 : new Date(get(dayMs)).getDay())) && get(hour) >= s.start && get(hour) < s.end));
				var fragment = comment();
				var node_6 = first_child(fragment);
				var consequent_3 = ($$anchor) => {
					var span_2 = root_5$3();
					var text_4 = child(span_2, true);
					reset(span_2);
					template_effect(() => set_text(text_4, get(slot).label));
					append($$anchor, span_2);
				};
				if_block(node_6, ($$render) => {
					if (get(slot)?.label) $$render(consequent_3);
				});
				append($$anchor, fragment);
			};
			if_block(node_5, ($$render) => {
				if (get(blocked) && get(blockedSlots)) $$render(consequent_4);
			});
			reset(div_5);
			template_effect(($0) => {
				classes_4 = set_class(div_5, 1, "mb-hour svelte-zbkzcp", null, classes_4, { "mb-hour--blocked": get(blocked) });
				set_text(text_3, $0);
			}, [() => fmtH(get(hour), $$props.locale)]);
			append($$anchor, div_5);
		});
		var node_7 = sibling(node_4, 2);
		var consequent_5 = ($$anchor) => {
			var div_7 = root_7$3();
			let styles_4;
			var span_3 = child(div_7);
			var text_5 = child(span_3, true);
			reset(span_3);
			next(2);
			reset(div_7);
			template_effect(() => {
				styles_4 = set_style(div_7, "", styles_4, { top: `${get(nowOffset) ?? ""}px` });
				set_text(text_5, clock.hm);
			});
			append($$anchor, div_7);
		};
		if_block(node_7, ($$render) => {
			if (get(nowOffset) >= 0) $$render(consequent_5);
		});
		var node_8 = sibling(node_7, 2);
		each(node_8, 17, () => get(positionedEvents), (p) => p.ev.id, ($$anchor, p) => {
			var button_2 = root_17();
			let classes_5;
			let styles_5;
			var div_8 = sibling(child(button_2), 2);
			EventContent(child(div_8), {
				get event() {
					return get(p).ev;
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_1 = root_13();
					var span_4 = first_child(fragment_1);
					var text_6 = child(span_4, true);
					reset(span_4);
					var node_10 = sibling(span_4, 2);
					var consequent_6 = ($$anchor) => {
						var span_5 = root_8$3();
						var text_7 = child(span_5);
						reset(span_5);
						template_effect(($0, $1) => set_text(text_7, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmtTime$1(get(p).ev.start, $$props.locale), () => fmtTime$1(get(p).ev.end, $$props.locale)]);
						append($$anchor, span_5);
					};
					if_block(node_10, ($$render) => {
						if (get(p).height > 32) $$render(consequent_6);
					});
					var node_11 = sibling(node_10, 2);
					var consequent_7 = ($$anchor) => {
						var span_6 = root_9$1();
						var text_8 = child(span_6, true);
						reset(span_6);
						template_effect(() => set_text(text_8, get(p).ev.subtitle));
						append($$anchor, span_6);
					};
					if_block(node_11, ($$render) => {
						if (get(p).ev.subtitle && get(p).height > 56) $$render(consequent_7);
					});
					var node_12 = sibling(node_11, 2);
					var consequent_8 = ($$anchor) => {
						var span_7 = root_10$1();
						var text_9 = child(span_7, true);
						reset(span_7);
						template_effect(() => set_text(text_9, get(p).ev.location));
						append($$anchor, span_7);
					};
					if_block(node_12, ($$render) => {
						if (get(p).ev.location && get(p).height > 72) $$render(consequent_8);
					});
					var node_13 = sibling(node_12, 2);
					var consequent_9 = ($$anchor) => {
						var div_9 = root_12$1();
						each(div_9, 21, () => get(p).ev.tags, index, ($$anchor, tag) => {
							var span_8 = root_11$1();
							var text_10 = child(span_8, true);
							reset(span_8);
							template_effect(() => set_text(text_10, get(tag)));
							append($$anchor, span_8);
						});
						reset(div_9);
						append($$anchor, div_9);
					};
					if_block(node_13, ($$render) => {
						if (get(p).ev.tags?.length && get(p).height > 88) $$render(consequent_9);
					});
					template_effect(() => set_text(text_6, get(p).ev.title));
					append($$anchor, fragment_1);
				},
				$$slots: { default: true }
			});
			reset(div_8);
			var node_14 = sibling(div_8, 2);
			var consequent_10 = ($$anchor) => {
				append($$anchor, root_14());
			};
			var consequent_11 = ($$anchor) => {
				var span_10 = root_15();
				var text_11 = child(span_10, true);
				reset(span_10);
				template_effect(() => set_text(text_11, get(L).upNext));
				append($$anchor, span_10);
			};
			if_block(node_14, ($$render) => {
				if (get(p).isCurrent) $$render(consequent_10);
				else if (get(p).isNext) $$render(consequent_11, 1);
			});
			var node_15 = sibling(node_14, 2);
			var consequent_12 = ($$anchor) => {
				var fragment_2 = root_16();
				var span_11 = first_child(fragment_2);
				var span_12 = sibling(span_11, 2);
				delegated("pointerdown", span_11, (e) => onResizePointerDown(e, get(p).ev, "start"));
				delegated("pointerdown", span_12, (e) => onResizePointerDown(e, get(p).ev, "end"));
				append($$anchor, fragment_2);
			};
			if_block(node_15, ($$render) => {
				if (!readOnly() && !get(p).ev.data?.readOnly) $$render(consequent_12);
			});
			reset(button_2);
			template_effect(($0, $1, $2) => {
				classes_5 = set_class(button_2, 1, "mb-event svelte-zbkzcp", null, classes_5, {
					"mb-event--selected": selectedEventId() === get(p).ev.id,
					"mb-event--current": get(p).isCurrent,
					"mb-event--next": get(p).isNext,
					"mb-event--cancelled": get(p).ev.status === "cancelled",
					"mb-event--tentative": get(p).ev.status === "tentative",
					"mb-event--full": get(p).ev.status === "full",
					"mb-event--limited": get(p).ev.status === "limited",
					"mb-event--resizing": get(p).isResizing,
					"mb-event--short": get(p).height < 44
				});
				set_attribute(button_2, "aria-label", `${get(p).ev.title ?? ""}${$0 ?? ""}, ${$1 ?? ""} – ${$2 ?? ""}${get(p).isCurrent ? `, ${get(L).inProgress}` : ""}${get(p).isNext ? `, ${get(L).upNext}` : ""}`);
				styles_5 = set_style(button_2, "", styles_5, {
					top: `${get(p).top ?? ""}px`,
					height: `${get(p).height ?? ""}px`,
					left: get(p).left,
					width: get(p).width,
					"--ev-color": get(p).ev.color ?? "var(--dt-accent)"
				});
			}, [
				() => statusText(get(p).ev),
				() => fmtTime$1(get(p).ev.start, $$props.locale),
				() => fmtTime$1(get(p).ev.end, $$props.locale)
			]);
			delegated("click", button_2, (e) => {
				e.stopPropagation();
				if (suppressEventClick) {
					suppressEventClick = false;
					return;
				}
				$$props.oneventclick?.(get(p).ev);
			});
			event("pointerenter", button_2, () => get(oneventhover)?.(get(p).ev));
			append($$anchor, button_2);
		});
		var node_16 = sibling(node_8, 2);
		var consequent_13 = ($$anchor) => {
			const gTop = /* @__PURE__ */ user_derived(() => ((get(drag).payload.start.getTime() - get(dayMs)) / HOUR_MS - get(startHour)) * HOUR_HEIGHT);
			const gH = /* @__PURE__ */ user_derived(() => Math.max(12, (get(drag).payload.end.getTime() - get(drag).payload.start.getTime()) / HOUR_MS * HOUR_HEIGHT));
			var div_10 = root_18();
			let styles_6;
			var span_13 = child(div_10);
			var text_12 = child(span_13);
			reset(span_13);
			reset(div_10);
			template_effect(($0, $1) => {
				styles_6 = set_style(div_10, "", styles_6, {
					top: `${get(gTop) ?? ""}px`,
					height: `${get(gH) ?? ""}px`
				});
				set_text(text_12, `${$0 ?? ""} – ${$1 ?? ""}`);
			}, [() => fmtTime$1(get(drag).payload.start, $$props.locale), () => fmtTime$1(get(drag).payload.end, $$props.locale)]);
			append($$anchor, div_10);
		};
		if_block(node_16, ($$render) => {
			if (!readOnly() && get(drag)?.active && get(drag).mode === "create" && get(drag).payload) $$render(consequent_13);
		});
		reset(div_4);
		reset(div_3);
		bind_this(div_3, ($$value) => gridEl = $$value, () => gridEl);
		var node_17 = sibling(div_3, 2);
		var consequent_15 = ($$anchor) => {
			var div_11 = root_20();
			var node_18 = child(div_11);
			var consequent_14 = ($$anchor) => {
				var fragment_3 = comment();
				snippet(first_child(fragment_3), () => ctx.emptySnippet);
				append($$anchor, fragment_3);
			};
			var alternate = ($$anchor) => {
				var span_14 = root_19();
				var text_13 = child(span_14, true);
				reset(span_14);
				template_effect(() => set_text(text_13, get(L).nothingScheduled));
				append($$anchor, span_14);
			};
			if_block(node_18, ($$render) => {
				if (ctx.emptySnippet) $$render(consequent_14);
				else $$render(alternate, -1);
			});
			reset(div_11);
			append($$anchor, div_11);
		};
		if_block(node_17, ($$render) => {
			if (get(isEmpty)) $$render(consequent_15);
		});
		reset(div_1);
		reset(div);
		template_effect(() => {
			classes = set_class(div, 1, "mb svelte-zbkzcp", null, classes, { "mb--auto": get(autoHeight) });
			styles = set_style(div, style() || void 0, styles, { height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%" });
			set_attribute(div, "aria-label", get(L).dayPlanner);
			classes_1 = set_class(div_1, 1, "mb-swipe svelte-zbkzcp", null, classes_1, { "mb-swipe--animate": get(swipeAnimate) });
			styles_1 = set_style(div_1, "", styles_1, { transform: get(swipeOffset) !== 0 ? `translateX(${get(swipeOffset)}px)` : void 0 });
			set_attribute(div_3, "aria-label", get(L).scrollableDayPlanner);
			styles_3 = set_style(div_4, "", styles_3, { height: `${get(gridHeight) ?? ""}px` });
		});
		delegated("touchstart", div, function(...$$args) {
			swipe.ontouchstart?.apply(this, $$args);
		}, void 0, true);
		delegated("touchmove", div, function(...$$args) {
			swipe.ontouchmove?.apply(this, $$args);
		}, void 0, true);
		delegated("touchend", div, function(...$$args) {
			swipe.ontouchend?.apply(this, $$args);
		});
		event("touchcancel", div, function(...$$args) {
			swipe.ontouchcancel?.apply(this, $$args);
		});
		delegated("click", div_3, handleGridClick);
		delegated("pointerdown", div_3, onGridPointerDown);
		delegated("keydown", div_3, onGridKeydown);
		delegated("contextmenu", div_3, onGridContextMenu);
		append($$anchor, div);
		pop();
	}
	delegate([
		"touchstart",
		"touchmove",
		"touchend",
		"click",
		"pointerdown",
		"keydown",
		"contextmenu"
	]);
	//#endregion
	//#region src/lib/views/mobile/MobileWeek.svelte
	var root$2 = /* @__PURE__ */ from_html(`<span> </span>`);
	var root_1$2 = /* @__PURE__ */ from_html(`<span class="mw-empty svelte-1d18hkf"> </span>`);
	var root_2$2 = /* @__PURE__ */ from_html(`<span class="mw-ev-time svelte-1d18hkf"> </span>`);
	var root_3$2 = /* @__PURE__ */ from_html(`<span class="mw-ev-title svelte-1d18hkf"> </span> <!>`, 1);
	var root_4$2 = /* @__PURE__ */ from_html(`<button type="button"><span class="mw-ev-stripe svelte-1d18hkf"></span> <div class="mw-ev-body svelte-1d18hkf"><!></div></button>`);
	var root_5$2 = /* @__PURE__ */ from_html(`<button type="button" class="mw-ev-more svelte-1d18hkf"> </button>`);
	var root_6$2 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_7$2 = /* @__PURE__ */ from_html(`<div role="listitem"><button type="button" class="mw-row-target svelte-1d18hkf"></button> <div class="mw-date svelte-1d18hkf"><span> </span> <!></div> <div class="mw-events svelte-1d18hkf"><!></div> <svg class="mw-chevron svelte-1d18hkf" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M6 3l5 5-5 5"></path></svg></div>`);
	var root_8$2 = /* @__PURE__ */ from_html(`<div role="region"><div role="list"></div></div>`);
	function MobileWeek($$anchor, $$props) {
		push($$props, true);
		let mondayStart = prop($$props, "mondayStart", 3, true), height = prop($$props, "height", 3, null), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null);
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
		const equalDays = /* @__PURE__ */ user_derived(() => ctx.equalDays);
		const showDates = /* @__PURE__ */ user_derived(() => ctx.showDates);
		const hideDays = /* @__PURE__ */ user_derived(() => ctx.hideDays);
		const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
		const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
		const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
		const loadRangeCtx = /* @__PURE__ */ user_derived(() => ctx.loadRange);
		const clock = createClock(ctx.timezone);
		const MAX_EVENTS = 3;
		const customDays = /* @__PURE__ */ user_derived(() => get(viewState)?.dayCount ?? 7);
		const todayMs = /* @__PURE__ */ user_derived(() => clock.today);
		const focusMs = /* @__PURE__ */ user_derived(() => $$props.focusDate ? sod($$props.focusDate.getTime()) : get(todayMs));
		const weekStart = /* @__PURE__ */ user_derived(() => get(customDays) === 7 ? startOfWeek(get(focusMs), mondayStart()) : sod(get(focusMs)));
		user_effect(() => {
			if (!get(loadRangeCtx)) return;
			const rangeStart = /* @__PURE__ */ new Date(get(weekStart) - 7 * DAY_MS);
			const rangeEnd = new Date(get(weekStart) + (get(customDays) + 7) * DAY_MS);
			get(loadRangeCtx).set({
				start: rangeStart,
				end: rangeEnd
			});
			return () => get(loadRangeCtx).set(null);
		});
		const dayCells = /* @__PURE__ */ user_derived(() => {
			const result = [];
			const hideSet = new Set(get(hideDays) ?? []);
			for (let i = 0; i < get(customDays); i++) {
				const ms = get(weekStart) + i * DAY_MS;
				const d = new Date(ms);
				const jsDay = d.getDay();
				const isoDay = jsDay === 0 ? 7 : jsDay;
				if (hideSet.has(isoDay)) continue;
				const isToday = ms === get(todayMs);
				const isPast = get(equalDays) ? false : ms < get(todayMs);
				const isWeekend = jsDay === 0 || jsDay === 6;
				const isDisabled = get(disabledSet).has(ms);
				const dayEnd = ms + DAY_MS;
				const dayEvents = events().filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > ms).sort((a, b) => a.start.getTime() - b.start.getTime());
				const allDayCount = dayEvents.filter((ev) => isAllDay(ev) || isMultiDay(ev)).length;
				result.push({
					ms,
					dayNum: d.getDate(),
					dayName: weekdayShort(ms, $$props.locale),
					isToday,
					isPast,
					isDisabled,
					isWeekend,
					events: dayEvents,
					allDayCount,
					totalCount: dayEvents.length
				});
			}
			return result;
		});
		let expandedDays = /* @__PURE__ */ state(proxy(/* @__PURE__ */ new Set()));
		function toggleExpand(ms) {
			const next = new Set(get(expandedDays));
			if (next.has(ms)) next.delete(ms);
			else next.add(ms);
			set(expandedDays, next, true);
		}
		function fmtTime(d) {
			return fmtTime$1(d, $$props.locale);
		}
		function evTimeLabel(ev) {
			if (isAllDay(ev) || isMultiDay(ev)) return get(L).allDay;
			return `${fmtTime(ev.start)} – ${fmtTime(ev.end)}`;
		}
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		let swipeOffset = /* @__PURE__ */ state(0);
		let swipeAnimate = /* @__PURE__ */ state(false);
		const swipe = createSwipe({
			onmove: (dx) => {
				set(swipeAnimate, false);
				set(swipeOffset, dx, true);
			},
			onend: (dir) => {
				if (dir !== 0) {
					set(swipeAnimate, false);
					set(swipeOffset, 0);
					if (dir > 0) get(viewState)?.prev();
					else get(viewState)?.next();
				} else {
					set(swipeAnimate, true);
					set(swipeOffset, 0);
				}
			}
		});
		function handleDayTap(dayMs) {
			if (!get(viewState)) return;
			get(viewState).setFocusDate(new Date(dayMs));
			const currentView = get(viewState).view;
			if (!currentView.split("-").includes("week")) return;
			const dayView = currentView.split("-").map((seg) => seg === "week" ? "day" : seg).join("-");
			if (dayView !== currentView) get(viewState).setView(dayView);
		}
		function handleDayKeydown(e, dayMs) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			handleDayTap(dayMs);
		}
		var div = root_8$2();
		let classes;
		let styles;
		var div_1 = child(div);
		let classes_1;
		let styles_1;
		each(div_1, 21, () => get(dayCells), (cell) => cell.ms, ($$anchor, cell) => {
			var div_2 = root_7$2();
			let classes_2;
			var button = child(div_2);
			var div_3 = sibling(button, 2);
			var span = child(div_3);
			let classes_3;
			var text = child(span, true);
			reset(span);
			var node = sibling(span, 2);
			var consequent = ($$anchor) => {
				var span_1 = root$2();
				let classes_4;
				var text_1 = child(span_1, true);
				reset(span_1);
				template_effect(() => {
					classes_4 = set_class(span_1, 1, "mw-day-num svelte-1d18hkf", null, classes_4, { "mw-day-num--today": get(cell).isToday });
					set_text(text_1, get(cell).dayNum);
				});
				append($$anchor, span_1);
			};
			if_block(node, ($$render) => {
				if (get(showDates)) $$render(consequent);
			});
			reset(div_3);
			var div_4 = sibling(div_3, 2);
			var node_1 = child(div_4);
			var consequent_1 = ($$anchor) => {
				var span_2 = root_1$2();
				var text_2 = child(span_2, true);
				reset(span_2);
				template_effect(() => set_text(text_2, get(L).noEvents));
				append($$anchor, span_2);
			};
			var alternate_1 = ($$anchor) => {
				var fragment = root_6$2();
				var node_2 = first_child(fragment);
				each(node_2, 17, () => get(expandedDays).has(get(cell).ms) ? get(cell).events : get(cell).events.slice(0, MAX_EVENTS), (ev) => ev.id, ($$anchor, ev) => {
					var button_1 = root_4$2();
					let classes_5;
					let styles_2;
					var div_5 = sibling(child(button_1), 2);
					EventContent(child(div_5), {
						get event() {
							return get(ev);
						},
						children: ($$anchor, $$slotProps) => {
							var fragment_1 = root_3$2();
							var span_3 = first_child(fragment_1);
							var text_3 = child(span_3, true);
							reset(span_3);
							var node_4 = sibling(span_3, 2);
							var consequent_2 = ($$anchor) => {
								var span_4 = root_2$2();
								var text_4 = child(span_4, true);
								reset(span_4);
								template_effect(() => set_text(text_4, get(L).allDay));
								append($$anchor, span_4);
							};
							var d_1 = /* @__PURE__ */ user_derived(() => isAllDay(get(ev)) || isMultiDay(get(ev)));
							var alternate = ($$anchor) => {
								var span_5 = root_2$2();
								var text_5 = child(span_5, true);
								reset(span_5);
								template_effect(($0) => set_text(text_5, $0), [() => fmtTime(get(ev).start)]);
								append($$anchor, span_5);
							};
							if_block(node_4, ($$render) => {
								if (get(d_1)) $$render(consequent_2);
								else $$render(alternate, -1);
							});
							template_effect(() => set_text(text_3, get(ev).title));
							append($$anchor, fragment_1);
						},
						$$slots: { default: true }
					});
					reset(div_5);
					reset(button_1);
					template_effect(($0, $1, $2) => {
						classes_5 = set_class(button_1, 1, "mw-ev svelte-1d18hkf", null, classes_5, $0);
						set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}${$1 ?? ""}, ${$2 ?? ""}`);
						styles_2 = set_style(button_1, "", styles_2, { "--ev-color": get(ev).color ?? "var(--dt-accent)" });
					}, [
						() => ({
							"mw-ev--selected": selectedEventId() === get(ev).id,
							"mw-ev--allday": isAllDay(get(ev)) || isMultiDay(get(ev)),
							"mw-ev--current": !isAllDay(get(ev)) && !isMultiDay(get(ev)) && get(ev).start.getTime() <= clock.tick && get(ev).end.getTime() > clock.tick,
							"mw-ev--cancelled": get(ev).status === "cancelled",
							"mw-ev--tentative": get(ev).status === "tentative",
							"mw-ev--full": get(ev).status === "full",
							"mw-ev--limited": get(ev).status === "limited"
						}),
						() => statusText(get(ev)),
						() => evTimeLabel(get(ev))
					]);
					delegated("click", button_1, (e) => {
						e.stopPropagation();
						$$props.oneventclick?.(get(ev));
					});
					delegated("keydown", button_1, (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							e.stopPropagation();
							$$props.oneventclick?.(get(ev));
						}
					});
					event("pointerenter", button_1, () => get(oneventhover)?.(get(ev)));
					append($$anchor, button_1);
				});
				var node_5 = sibling(node_2, 2);
				var consequent_3 = ($$anchor) => {
					var button_2 = root_5$2();
					var text_6 = child(button_2, true);
					reset(button_2);
					template_effect(($0, $1) => {
						set_attribute(button_2, "aria-expanded", $0);
						set_text(text_6, $1);
					}, [() => get(expandedDays).has(get(cell).ms), () => get(expandedDays).has(get(cell).ms) ? get(L).showLess : get(L).nMore(get(cell).totalCount - MAX_EVENTS)]);
					delegated("click", button_2, () => toggleExpand(get(cell).ms));
					append($$anchor, button_2);
				};
				if_block(node_5, ($$render) => {
					if (get(cell).totalCount > MAX_EVENTS) $$render(consequent_3);
				});
				append($$anchor, fragment);
			};
			if_block(node_1, ($$render) => {
				if (get(cell).events.length === 0) $$render(consequent_1);
				else $$render(alternate_1, -1);
			});
			reset(div_4);
			next(2);
			reset(div_2);
			template_effect(() => {
				classes_2 = set_class(div_2, 1, "mw-row svelte-1d18hkf", null, classes_2, {
					"mw-row--today": get(cell).isToday,
					"mw-row--past": get(cell).isPast,
					"mw-row--weekend": get(cell).isWeekend,
					"mw-row--disabled": get(cell).isDisabled
				});
				set_attribute(div_2, "aria-current", get(cell).isToday ? "date" : void 0);
				button.disabled = get(cell).isDisabled;
				set_attribute(button, "aria-label", `${get(cell).dayName ?? ""} ${get(cell).dayNum ?? ""}${get(cell).isToday ? `, ${get(L).today}` : ""}`);
				classes_3 = set_class(span, 1, "mw-day-name svelte-1d18hkf", null, classes_3, { "mw-day-name--today": get(cell).isToday });
				set_text(text, get(cell).dayName);
			});
			delegated("click", button, () => handleDayTap(get(cell).ms));
			delegated("keydown", button, (e) => handleDayKeydown(e, get(cell).ms));
			append($$anchor, div_2);
		});
		reset(div_1);
		reset(div);
		template_effect(() => {
			classes = set_class(div, 1, "mw svelte-1d18hkf", null, classes, { "mw--auto": get(autoHeight) });
			styles = set_style(div, style() || void 0, styles, { height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%" });
			set_attribute(div, "aria-label", get(L).weekAhead);
			classes_1 = set_class(div_1, 1, "mw-list svelte-1d18hkf", null, classes_1, { "mw-list--animate": get(swipeAnimate) });
			styles_1 = set_style(div_1, "", styles_1, { transform: get(swipeOffset) !== 0 ? `translateX(${get(swipeOffset)}px)` : void 0 });
		});
		delegated("touchstart", div, function(...$$args) {
			swipe.ontouchstart?.apply(this, $$args);
		}, void 0, true);
		delegated("touchmove", div, function(...$$args) {
			swipe.ontouchmove?.apply(this, $$args);
		}, void 0, true);
		delegated("touchend", div, function(...$$args) {
			swipe.ontouchend?.apply(this, $$args);
		});
		event("touchcancel", div, function(...$$args) {
			swipe.ontouchcancel?.apply(this, $$args);
		});
		append($$anchor, div);
		pop();
	}
	delegate([
		"touchstart",
		"touchmove",
		"touchend",
		"click",
		"keydown"
	]);
	//#endregion
	//#region src/lib/views/mobile/Mobile.svelte
	var rest_excludes = /* @__PURE__ */ new Set([
		"$$slots",
		"$$events",
		"$$legacy",
		"mode"
	]);
	function Mobile($$anchor, $$props) {
		let mode = prop($$props, "mode", 3, "day"), rest = /* @__PURE__ */ rest_props($$props, rest_excludes);
		var fragment = comment();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			MobileDay($$anchor, spread_props(() => rest));
		};
		var alternate = ($$anchor) => {
			MobileWeek($$anchor, spread_props(() => rest));
		};
		if_block(node, ($$render) => {
			if (mode() === "day") $$render(consequent);
			else $$render(alternate, -1);
		});
		append($$anchor, fragment);
	}
	//#endregion
	//#region src/lib/views/month/MonthGrid.svelte
	var root$1 = /* @__PURE__ */ from_html(`<div class="mg-head-cell svelte-pvjuld" role="columnheader"> </div>`);
	var root_1$1 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
	var root_2$1 = /* @__PURE__ */ from_html(`<span class="mg-chip-time svelte-pvjuld"> </span>`);
	var root_3$1 = /* @__PURE__ */ from_html(`<button type="button"><span class="mg-chip-dot svelte-pvjuld" aria-hidden="true"></span> <!> <span class="mg-chip-title svelte-pvjuld"> </span></button>`);
	var root_4$1 = /* @__PURE__ */ from_html(`<button type="button" class="mg-more svelte-pvjuld"> </button>`);
	var root_5$1 = /* @__PURE__ */ from_html(`<button type="button" class="mg-more svelte-pvjuld" aria-expanded="true"> </button>`);
	var root_6$1 = /* @__PURE__ */ from_html(`<div role="gridcell"><span> </span> <div class="mg-chips svelte-pvjuld"><!> <!></div></div>`);
	var root_7$1 = /* @__PURE__ */ from_html(`<div class="mg-row svelte-pvjuld" role="row"></div>`);
	var root_8$1 = /* @__PURE__ */ from_html(`<div role="grid"><div class="mg-head svelte-pvjuld" role="row"></div> <div class="mg-body svelte-pvjuld" role="rowgroup"></div></div>`);
	function MonthGrid($$anchor, $$props) {
		push($$props, true);
		let events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), height = prop($$props, "height", 3, null), selectedEventId = prop($$props, "selectedEventId", 3, null);
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
		const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
		const isMobile = /* @__PURE__ */ user_derived(() => ctx.isMobile);
		const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
		const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
		const ondayclick = /* @__PURE__ */ user_derived(() => ctx.ondayclick);
		const eventSnippet = /* @__PURE__ */ user_derived(() => ctx.eventSnippet);
		const loadRangeCtx = /* @__PURE__ */ user_derived(() => ctx.loadRange);
		const clock = createClock(ctx.timezone);
		const todayMs = /* @__PURE__ */ user_derived(() => clock.today);
		const dotsMode = /* @__PURE__ */ user_derived(() => get(isMobile));
		const MAX_CHIPS = 3;
		const range = /* @__PURE__ */ user_derived(() => get(viewState)?.range);
		const focusMonth = /* @__PURE__ */ user_derived(() => ($$props.focusDate ?? /* @__PURE__ */ new Date()).getMonth());
		user_effect(() => {
			if (!get(loadRangeCtx) || !get(range)) return;
			get(loadRangeCtx).set({
				start: /* @__PURE__ */ new Date(get(range).start.getTime() - 7 * DAY_MS),
				end: new Date(get(range).end.getTime() + 7 * DAY_MS)
			});
			return () => get(loadRangeCtx).set(null);
		});
		/** Day (ms) whose cell is inline-expanded to show all events (no-ondayclick fallback). */
		let expandedMs = /* @__PURE__ */ state(null);
		/** Roving-tabindex anchor: the one cell reachable via Tab. */
		let focusMs = /* @__PURE__ */ state(null);
		let bodyEl = /* @__PURE__ */ state(null);
		const cellsInteractive = /* @__PURE__ */ user_derived(() => !!get(ondayclick));
		const rovingMs = /* @__PURE__ */ user_derived(() => {
			if (!get(range)) return null;
			const start = sod(get(range).start.getTime());
			const end = get(range).end.getTime();
			if (get(focusMs) !== null && get(focusMs) >= start && get(focusMs) < end) return get(focusMs);
			if (get(todayMs) >= start && get(todayMs) < end) return get(todayMs);
			return start;
		});
		function moveFocus(fromMs, deltaDays) {
			if (!get(range)) return;
			const target = fromMs + deltaDays * DAY_MS;
			if (target < sod(get(range).start.getTime()) || target >= get(range).end.getTime()) return;
			set(focusMs, target);
			(get(bodyEl)?.querySelector(`[data-ms="${target}"]`))?.focus();
		}
		function cellKeydown(e, cell) {
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault();
					moveFocus(cell.ms, 1);
					break;
				case "ArrowLeft":
					e.preventDefault();
					moveFocus(cell.ms, -1);
					break;
				case "ArrowDown":
					e.preventDefault();
					moveFocus(cell.ms, 7);
					break;
				case "ArrowUp":
					e.preventDefault();
					moveFocus(cell.ms, -7);
					break;
				case "Escape":
					if (get(expandedMs) !== null) {
						e.preventDefault();
						set(expandedMs, null);
					}
					break;
				case "Enter":
				case " ": if (!cell.isDisabled) {
					e.preventDefault();
					get(ondayclick)?.(cell.date);
				}
			}
		}
		function overflowClick(e, cell) {
			e.stopPropagation();
			if (get(ondayclick)) get(ondayclick)(cell.date);
			else set(expandedMs, get(expandedMs) === cell.ms ? null : cell.ms, true);
		}
		function cellLabel(cell) {
			return `${cell.date.toLocaleDateString($$props.locale, {
				weekday: "long",
				day: "numeric",
				month: "long"
			})}, ${get(L).nEvents(cell.all.length)}`;
		}
		function eventsForDay(ms) {
			const dayStart = ms;
			const dayEnd = ms + DAY_MS;
			return events().filter((e) => e.start.getTime() < dayEnd && e.end.getTime() > dayStart).sort((a, b) => {
				return (isAllDay(a) ? 0 : 1) - (isAllDay(b) ? 0 : 1) || a.start.getTime() - b.start.getTime();
			});
		}
		const weeks = /* @__PURE__ */ user_derived(() => {
			if (!get(range)) return [];
			const rows = [];
			for (let ms = sod(get(range).start.getTime()); ms < get(range).end.getTime(); ms += 7 * DAY_MS) {
				const row = [];
				for (let i = 0; i < 7; i++) {
					const cellMs = ms + i * DAY_MS;
					const date = new Date(cellMs);
					const jsDay = date.getDay();
					const dayEvents = eventsForDay(cellMs);
					row.push({
						ms: cellMs,
						date,
						dayNum: date.getDate(),
						inMonth: date.getMonth() === get(focusMonth),
						isToday: cellMs === get(todayMs),
						isWeekend: jsDay === 0 || jsDay === 6,
						isDisabled: get(disabledSet).has(cellMs),
						chips: dayEvents.slice(0, MAX_CHIPS),
						all: dayEvents,
						overflow: Math.max(0, dayEvents.length - MAX_CHIPS)
					});
				}
				rows.push(row);
			}
			return rows;
		});
		const weekdayLabels = /* @__PURE__ */ user_derived(() => {
			const first = get(weeks)[0];
			if (!first) return [];
			return first.map((c) => weekdayShort(c.ms, $$props.locale));
		});
		function chipTime(e) {
			return isAllDay(e) ? "" : fmtTime$1(e.start, $$props.locale);
		}
		var div = root_8$1();
		let classes;
		let styles;
		var div_1 = child(div);
		each(div_1, 21, () => get(weekdayLabels), index, ($$anchor, name) => {
			var div_2 = root$1();
			var text = child(div_2, true);
			reset(div_2);
			template_effect(() => set_text(text, get(name)));
			append($$anchor, div_2);
		});
		reset(div_1);
		var div_3 = sibling(div_1, 2);
		let styles_1;
		each(div_3, 21, () => get(weeks), index, ($$anchor, row) => {
			var div_4 = root_7$1();
			each(div_4, 21, () => get(row), (cell) => cell.ms, ($$anchor, cell) => {
				var div_5 = root_6$1();
				let classes_1;
				var span = child(div_5);
				let classes_2;
				var text_1 = child(span, true);
				reset(span);
				var div_6 = sibling(span, 2);
				var node = child(div_6);
				each(node, 17, () => get(expandedMs) === get(cell).ms ? get(cell).all : get(cell).chips, (ev) => ev.id + get(cell).ms, ($$anchor, ev) => {
					var fragment = comment();
					var node_1 = first_child(fragment);
					var consequent = ($$anchor) => {
						var button = root_1$1();
						let classes_3;
						snippet(child(button), () => get(eventSnippet), () => get(ev));
						reset(button);
						template_effect(() => classes_3 = set_class(button, 1, "mg-chip mg-chip--custom svelte-pvjuld", null, classes_3, { "mg-chip--selected": get(ev).id === selectedEventId() }));
						delegated("click", button, (e) => {
							e.stopPropagation();
							$$props.oneventclick?.(get(ev));
						});
						event("mouseenter", button, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button);
					};
					var alternate = ($$anchor) => {
						var button_1 = root_3$1();
						let classes_4;
						let styles_2;
						var node_3 = sibling(child(button_1), 2);
						var consequent_1 = ($$anchor) => {
							var span_1 = root_2$1();
							var text_2 = child(span_1, true);
							reset(span_1);
							template_effect(($0) => set_text(text_2, $0), [() => chipTime(get(ev))]);
							append($$anchor, span_1);
						};
						var d = /* @__PURE__ */ user_derived(() => chipTime(get(ev)));
						if_block(node_3, ($$render) => {
							if (get(d)) $$render(consequent_1);
						});
						var span_2 = sibling(node_3, 2);
						var text_3 = child(span_2, true);
						reset(span_2);
						reset(button_1);
						template_effect(($0) => {
							classes_4 = set_class(button_1, 1, "mg-chip svelte-pvjuld", null, classes_4, {
								"mg-chip--selected": get(ev).id === selectedEventId(),
								"mg-chip--cancelled": get(ev).status === "cancelled"
							});
							set_attribute(button_1, "title", get(ev).title);
							set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}`);
							styles_2 = set_style(button_1, "", styles_2, { "--mg-chip-color": get(ev).color ?? "var(--dt-accent)" });
							set_text(text_3, get(ev).title);
						}, [() => chipTime(get(ev)) ? `, ${chipTime(get(ev))}` : ""]);
						delegated("click", button_1, (e) => {
							e.stopPropagation();
							$$props.oneventclick?.(get(ev));
						});
						event("mouseenter", button_1, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_1);
					};
					if_block(node_1, ($$render) => {
						if (get(eventSnippet)) $$render(consequent);
						else $$render(alternate, -1);
					});
					append($$anchor, fragment);
				});
				var node_4 = sibling(node, 2);
				var consequent_2 = ($$anchor) => {
					var button_2 = root_4$1();
					var text_4 = child(button_2, true);
					reset(button_2);
					template_effect(($0, $1) => {
						set_attribute(button_2, "aria-expanded", get(ondayclick) ? void 0 : false);
						set_attribute(button_2, "aria-label", $0);
						set_text(text_4, $1);
					}, [() => get(L).nMore(get(cell).overflow), () => get(dotsMode) ? `+${get(cell).overflow}` : get(L).nMore(get(cell).overflow)]);
					delegated("click", button_2, (e) => overflowClick(e, get(cell)));
					append($$anchor, button_2);
				};
				var consequent_3 = ($$anchor) => {
					var button_3 = root_5$1();
					var text_5 = child(button_3, true);
					reset(button_3);
					template_effect(() => set_text(text_5, get(L).showLess));
					delegated("click", button_3, (e) => {
						e.stopPropagation();
						set(expandedMs, null);
					});
					append($$anchor, button_3);
				};
				if_block(node_4, ($$render) => {
					if (get(cell).overflow > 0 && get(expandedMs) !== get(cell).ms) $$render(consequent_2);
					else if (get(expandedMs) === get(cell).ms) $$render(consequent_3, 1);
				});
				reset(div_6);
				reset(div_5);
				template_effect(($0) => {
					classes_1 = set_class(div_5, 1, "mg-cell svelte-pvjuld", null, classes_1, {
						"mg-cell--out": !get(cell).inMonth,
						"mg-cell--today": get(cell).isToday,
						"mg-cell--weekend": get(cell).isWeekend,
						"mg-cell--disabled": get(cell).isDisabled,
						"mg-cell--clickable": get(cellsInteractive) && !get(cell).isDisabled,
						"mg-cell--expanded": get(expandedMs) === get(cell).ms
					});
					set_attribute(div_5, "aria-label", $0);
					set_attribute(div_5, "aria-current", get(cell).isToday ? "date" : void 0);
					set_attribute(div_5, "data-ms", get(cell).ms);
					set_attribute(div_5, "tabindex", get(cell).isDisabled ? void 0 : get(cellsInteractive) || get(cell).overflow > 0 ? get(cell).ms === get(rovingMs) ? 0 : -1 : void 0);
					classes_2 = set_class(span, 1, "mg-daynum svelte-pvjuld", null, classes_2, { "mg-daynum--today": get(cell).isToday });
					set_text(text_1, get(cell).dayNum);
				}, [() => cellLabel(get(cell))]);
				delegated("click", div_5, () => {
					if (!get(cell).isDisabled) get(ondayclick)?.(get(cell).date);
				});
				delegated("focusin", div_5, () => set(focusMs, get(cell).ms, true));
				delegated("keydown", div_5, (e) => cellKeydown(e, get(cell)));
				append($$anchor, div_5);
			});
			reset(div_4);
			append($$anchor, div_4);
		});
		reset(div_3);
		bind_this(div_3, ($$value) => set(bodyEl, $$value), () => get(bodyEl));
		reset(div);
		template_effect(() => {
			classes = set_class(div, 1, "mg svelte-pvjuld", null, classes, {
				"mg--auto": get(autoHeight),
				"mg--dots": get(dotsMode)
			});
			styles = set_style(div, style() || void 0, styles, { height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%" });
			set_attribute(div, "aria-label", get(L).month);
			styles_1 = set_style(div_3, "", styles_1, { "--mg-rows": get(weeks).length });
		});
		append($$anchor, div);
		pop();
	}
	delegate([
		"click",
		"focusin",
		"keydown"
	]);
	//#endregion
	//#region src/lib/calendar/Calendar.svelte
	var root = /* @__PURE__ */ from_html(`<button type="button" role="radio"> </button>`);
	var root_1 = /* @__PURE__ */ from_html(`<div class="cal-m-pills svelte-1b53e7w" role="radiogroup"></div>`);
	var root_2 = /* @__PURE__ */ from_html(`<span class="cal-m-title svelte-1b53e7w" role="status" aria-live="polite" aria-atomic="true"> </span>`);
	var root_3 = /* @__PURE__ */ from_html(`<button type="button" class="cal-m-today svelte-1b53e7w"> </button> <button type="button" class="cal-m-nav svelte-1b53e7w"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" class="svelte-1b53e7w"><path d="M10 3 5 8l5 5" class="svelte-1b53e7w"></path></svg></button> <button type="button" class="cal-m-nav svelte-1b53e7w"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" class="svelte-1b53e7w"><path d="M6 3l5 5-5 5" class="svelte-1b53e7w"></path></svg></button>`, 1);
	var root_4 = /* @__PURE__ */ from_html(`<div class="cal-m-titlebar svelte-1b53e7w"><span class="cal-m-title svelte-1b53e7w" role="status" aria-live="polite" aria-atomic="true"> </span></div>`);
	var root_5 = /* @__PURE__ */ from_html(`<div><div class="cal-m-left svelte-1b53e7w"><!></div> <!> <div class="cal-m-right svelte-1b53e7w"><!></div></div> <!>`, 1);
	var root_6 = /* @__PURE__ */ from_html(`<button type="button" class="cal-hd-today svelte-1b53e7w"> </button> <button type="button" class="cal-hd-btn svelte-1b53e7w"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" class="svelte-1b53e7w"><path d="M10 3 5 8l5 5" class="svelte-1b53e7w"></path></svg></button> <button type="button" class="cal-hd-btn svelte-1b53e7w"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" class="svelte-1b53e7w"><path d="M6 3l5 5-5 5" class="svelte-1b53e7w"></path></svg></button>`, 1);
	var root_7 = /* @__PURE__ */ from_html(`<div class="cal-pills cal-pills--labels svelte-1b53e7w" role="radiogroup"></div>`);
	var root_8 = /* @__PURE__ */ from_html(`<div class="cal-pills svelte-1b53e7w" role="radiogroup"></div>`);
	var root_9 = /* @__PURE__ */ from_html(`<div class="cal-hd svelte-1b53e7w"><div class="cal-hd-side svelte-1b53e7w"><!></div> <span class="cal-hd-title svelte-1b53e7w" role="status" aria-live="polite" aria-atomic="true"> </span> <div class="cal-hd-side cal-hd-side--end svelte-1b53e7w"><!> <!></div></div>`);
	var root_10 = /* @__PURE__ */ from_html(`<div class="cal-empty svelte-1b53e7w">No views registered.</div>`);
	var root_11 = /* @__PURE__ */ from_html(`<div class="cal-loading svelte-1b53e7w"></div>`);
	var root_12 = /* @__PURE__ */ from_html(`<div role="region"><!> <div class="cal-body svelte-1b53e7w"><!></div> <!></div>`);
	function Calendar($$anchor, $$props) {
		push($$props, true);
		/** Breakpoint (px) at which auto-mobile activates */
		const MOBILE_BREAKPOINT = 768;
		let views = prop($$props, "views", 3, [
			{
				id: "day-planner",
				label: "Planner",
				mode: "day",
				component: Planner
			},
			{
				id: "week-planner",
				label: "Planner",
				mode: "week",
				component: Planner
			},
			{
				id: "day-agenda",
				label: "Agenda",
				mode: "day",
				component: Agenda
			},
			{
				id: "week-agenda",
				label: "Agenda",
				mode: "week",
				component: Agenda
			},
			{
				id: "day-mobile",
				label: "Mobile",
				mode: "day",
				component: Mobile
			},
			{
				id: "week-mobile",
				label: "Mobile",
				mode: "week",
				component: Mobile
			},
			{
				id: "month-grid",
				label: "Month",
				mode: "month",
				component: MonthGrid
			}
		]), theme = prop($$props, "theme", 3, auto), mondayStart = prop($$props, "mondayStart", 3, true), heightProp = prop($$props, "height", 3, 600), borderRadius = prop($$props, "borderRadius", 3, 12), readOnly = prop($$props, "readOnly", 3, false), snapInterval = prop($$props, "snapInterval", 3, 15), minColumnWidth = prop($$props, "minColumnWidth", 3, 110), showModePills = prop($$props, "showModePills", 3, true), showNavigation = prop($$props, "showNavigation", 3, true), equalDays = prop($$props, "equalDays", 3, false), showDates = prop($$props, "showDates", 3, true), compact = prop($$props, "compact", 3, false), columns = prop($$props, "columns", 3, false), mobileProp = prop($$props, "mobile", 3, "auto");
		const unzone = (d) => $$props.timezone ? fromZonedTime(d, $$props.timezone) : d;
		const effectiveCreate = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.oneventcreate ? void 0 : (range) => $$props.oneventcreate({
			start: unzone(range.start),
			end: unzone(range.end)
		}));
		const effectiveMove = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.oneventmove ? void 0 : (ev, start, end) => $$props.oneventmove(ev, unzone(start), unzone(end)));
		function handleEventClick(ev, anchor) {
			selection.select(ev.id);
			$$props.oneventclick?.(ev, anchor);
		}
		let containerWidth = /* @__PURE__ */ state(proxy(typeof window !== "undefined" && window.matchMedia?.(`(max-width: 767px)`).matches ? window.innerWidth : 0));
		const isMobileContainer = /* @__PURE__ */ user_derived(() => get(containerWidth) > 0 && get(containerWidth) < MOBILE_BREAKPOINT);
		const useMobile = /* @__PURE__ */ user_derived(() => mobileProp() === "auto" ? get(isMobileContainer) : Boolean(mobileProp()));
		const HEADER_STACK_BREAKPOINT = 520;
		const stackHeader = /* @__PURE__ */ user_derived(() => get(useMobile) && get(containerWidth) > 0 && get(containerWidth) < HEADER_STACK_BREAKPOINT);
		let calEl = /* @__PURE__ */ state(void 0);
		let probedTheme = /* @__PURE__ */ state("");
		const needsProbe = /* @__PURE__ */ user_derived(() => theme() === auto && $$props.autoTheme !== false);
		onMount(() => {
			if (!get(calEl)) return;
			set(containerWidth, get(calEl).clientWidth, true);
			const ro = new ResizeObserver((entries) => {
				set(containerWidth, Math.round(entries[0].contentRect.width), true);
			});
			ro.observe(get(calEl));
			if (!get(needsProbe)) return () => ro.disconnect();
			const opts = typeof $$props.autoTheme === "object" ? $$props.autoTheme : {};
			const stopTheme = observeHostTheme(get(calEl), (vars) => {
				set(probedTheme, vars, true);
			}, opts);
			return () => {
				ro.disconnect();
				stopTheme?.();
			};
		});
		/** Effective theme: user-provided takes priority, otherwise probed auto. */
		const effectiveTheme = /* @__PURE__ */ user_derived(() => theme() === auto && $$props.autoTheme !== false ? get(probedTheme) : theme());
		const effectiveAdapter = /* @__PURE__ */ user_derived(() => $$props.timezone ? wrapAdapterWithTimezone($$props.adapter, $$props.timezone) : $$props.adapter);
		const store = createEventStore(() => get(effectiveAdapter));
		const viewState = createViewState(untrack(() => ({
			view: $$props.view ?? views()[0]?.id,
			mondayStart: mondayStart(),
			initialDate: $$props.initialDate && $$props.timezone ? toZonedTime($$props.initialDate, $$props.timezone) : $$props.initialDate,
			dayCount: $$props.days,
			timezone: $$props.timezone,
			modeForView: (viewId) => views().find((v) => v.id === viewId)?.mode
		})));
		const selection = createSelection();
		const drag = createDragState();
		async function commitDrag() {
			if (readOnly()) {
				drag.cancel();
				return;
			}
			const mode = drag.mode;
			const payload = drag.commit();
			if (!payload) return;
			let { start, end } = payload;
			if (mode === "create" || mode === "resize-start" || mode === "resize-end") {
				if (end.getTime() <= start.getTime()) {
					const floorMs = Math.max(1, snapInterval()) * 6e4;
					if (mode === "resize-start") start = new Date(end.getTime() - floorMs);
					else end = new Date(start.getTime() + floorMs);
				}
				const durationMin = (end.getTime() - start.getTime()) / 6e4;
				if ($$props.minDuration && durationMin < $$props.minDuration) {
					if (mode === "resize-start") start = /* @__PURE__ */ new Date(end.getTime() - $$props.minDuration * 6e4);
					else end = new Date(start.getTime() + $$props.minDuration * 6e4);
				}
				if ($$props.maxDuration && durationMin > $$props.maxDuration) {
					if (mode === "resize-start") start = /* @__PURE__ */ new Date(end.getTime() - $$props.maxDuration * 6e4);
					else end = new Date(start.getTime() + $$props.maxDuration * 6e4);
				}
			}
			if ($$props.disabledDates?.length) {
				const startDay = new Date(start);
				startDay.setHours(0, 0, 0, 0);
				const endDay = /* @__PURE__ */ new Date(end.getTime() - 1);
				endDay.setHours(0, 0, 0, 0);
				for (const dd of $$props.disabledDates) {
					const dt = new Date(dd);
					dt.setHours(0, 0, 0, 0);
					const ts = dt.getTime();
					if (ts >= startDay.getTime() && ts <= endDay.getTime()) return;
				}
			}
			if ($$props.blockedSlots?.length) {
				const startH = start.getHours() + start.getMinutes() / 60;
				const endH = end.getHours() + end.getMinutes() / 60 + (end.getDate() !== start.getDate() ? 24 : 0);
				const jsDay = start.getDay();
				const isoDay = jsDay === 0 ? 7 : jsDay;
				for (const slot of $$props.blockedSlots) {
					if (slot.day && slot.day !== isoDay) continue;
					if (startH < slot.end && endH > slot.start) return;
				}
			}
			if ((mode === "move" || mode === "resize-start" || mode === "resize-end") && payload.eventId) try {
				await store.move(payload.eventId, start, end);
				const ev = store.byId(payload.eventId);
				if (ev) get(effectiveMove)?.(ev, start, end);
			} catch (e) {
				const msg = e instanceof Error ? e.message : "";
				if (msg.includes("read-only")) {
					const ev = store.byId(payload.eventId);
					if (ev) get(effectiveMove)?.(ev, start, end);
				} else if (!msg.includes("not found")) {
					if ($$props.onerror) $$props.onerror(e instanceof Error ? e : new Error(String(e)));
					else console.warn("[calendar] drag commit failed:", e);
				}
			}
			else if (mode === "create") get(effectiveCreate)?.({
				start,
				end
			});
		}
		let viewLoadRange = /* @__PURE__ */ state(null);
		const mergedLabels = /* @__PURE__ */ user_derived(() => $$props.labels ? {
			...getLabels(),
			...$$props.labels
		} : getLabels());
		const L = /* @__PURE__ */ user_derived(() => get(mergedLabels));
		setContext("calendar", {
			get store() {
				return store;
			},
			viewState,
			selection,
			drag,
			commitDrag,
			get oneventclick() {
				return handleEventClick;
			},
			get oneventcreate() {
				return get(effectiveCreate);
			},
			get oneventmove() {
				return get(effectiveMove);
			},
			get oneventhover() {
				return $$props.oneventhover;
			},
			get ondayclick() {
				return $$props.ondayclick ?? get(defaultDayClick);
			},
			get timezone() {
				return $$props.timezone;
			},
			get readOnly() {
				return readOnly();
			},
			get visibleHours() {
				return $$props.visibleHours;
			},
			get snapInterval() {
				return snapInterval();
			},
			get minColumnWidth() {
				return minColumnWidth();
			},
			get eventSnippet() {
				return $$props.event;
			},
			get emptySnippet() {
				return $$props.empty;
			},
			get equalDays() {
				return equalDays();
			},
			get showDates() {
				return showDates();
			},
			get hideDays() {
				return $$props.hideDays;
			},
			get blockedSlots() {
				return $$props.blockedSlots;
			},
			get dayHeaderSnippet() {
				return $$props.dayHeader;
			},
			get minDuration() {
				return $$props.minDuration;
			},
			get maxDuration() {
				return $$props.maxDuration;
			},
			get disabledDates() {
				return $$props.disabledDates;
			},
			get mobile() {
				return get(useMobile);
			},
			get autoHeight() {
				return heightProp() === "auto";
			},
			get compact() {
				return compact();
			},
			get columns() {
				return columns();
			},
			get labels() {
				return get(mergedLabels);
			},
			get loadRange() {
				return get(viewLoadRange);
			},
			setLoadRange(range) {
				set(viewLoadRange, range, true);
			}
		});
		user_effect(() => {
			const range = get(viewLoadRange) ?? viewState.range;
			store.load({
				start: range.start,
				end: range.end
			});
		});
		untrack(() => store.load({
			start: viewState.range.start,
			end: viewState.range.end
		}));
		user_effect(() => {
			if ($$props.view) viewState.setView($$props.view);
		});
		user_effect(() => {
			if ($$props.currentDate) viewState.setFocusDate($$props.currentDate);
		});
		user_effect(() => {
			if ($$props.days !== void 0 && viewState.dayCount !== $$props.days) viewState.setDayCount($$props.days);
		});
		user_effect(() => {
			const d = viewState.focusDate;
			$$props.ondatechange?.(d);
		});
		user_effect(() => {
			if (viewState.mondayStart !== mondayStart()) viewState.setMondayStart(mondayStart());
		});
		user_effect(() => {
			$$props.onviewchange?.(viewState.view);
		});
		user_effect(() => {
			if (store.error && $$props.onerror) $$props.onerror(new Error(store.error));
		});
		const resolvedView = /* @__PURE__ */ user_derived(() => {
			const requested = views().find((v) => v.id === viewState.view) ?? views()[0];
			if (!get(useMobile) || !requested) return requested;
			if (requested.id.endsWith("-mobile")) return requested;
			if (requested.label === "Agenda") return requested;
			return views().find((v) => v.id === `${requested.mode}-mobile`) ?? requested;
		});
		const activeView = /* @__PURE__ */ user_derived(() => get(resolvedView));
		const desktopViews = /* @__PURE__ */ user_derived(() => views().filter((v) => !v.id.endsWith("-mobile")));
		const dateLabel = /* @__PURE__ */ user_derived(() => {
			if (!showDates()) return "";
			if (viewState.mode === "day") return viewState.focusDate.toLocaleDateString($$props.locale, {
				weekday: "long",
				month: "short",
				day: "numeric"
			});
			if (viewState.mode === "week") return fmtWeekRange(viewState.range.start.getTime(), $$props.locale, viewState.range.end.getTime() - 1);
			return viewState.focusDate.toLocaleDateString($$props.locale, {
				month: "long",
				year: "numeric"
			});
		});
		const modes = /* @__PURE__ */ user_derived(() => {
			const g = new Set(get(desktopViews).map((v) => v.mode));
			return [
				"day",
				"week",
				"month"
			].filter((key) => g.has(key));
		});
		let lastViewLabel = /* @__PURE__ */ state(void 0);
		user_effect(() => {
			const current = views().find((v) => v.id === viewState.view);
			if (current && current.mode !== "month") set(lastViewLabel, current.label, true);
		});
		/** Switch to a different mode (day/week/month), preserving the current view label. */
		function switchMode(g) {
			const currentView = get(desktopViews).find((v) => v.id === viewState.view) ?? get(activeView);
			const preferredLabel = currentView?.mode === "month" ? get(lastViewLabel) ?? currentView?.label : currentView?.label;
			const match = get(desktopViews).find((v) => v.mode === g && v.label === preferredLabel);
			const fallback = get(desktopViews).find((v) => v.mode === g);
			const target = match ?? fallback;
			if (target) viewState.setView(target.id);
		}
		const labelsForMode = /* @__PURE__ */ user_derived(() => {
			const seen = [];
			for (const v of get(desktopViews)) if (v.mode === viewState.mode && !seen.includes(v.label)) seen.push(v.label);
			return seen;
		});
		function switchLabel(label) {
			const target = get(desktopViews).find((v) => v.mode === viewState.mode && v.label === label);
			if (target) viewState.setView(target.id);
		}
		const defaultDayClick = /* @__PURE__ */ user_derived(() => {
			const target = get(desktopViews).find((v) => v.mode === "day" && v.label === get(lastViewLabel)) ?? get(desktopViews).find((v) => v.mode === "day");
			if (!target) return void 0;
			return (date) => {
				viewState.setFocusDate(date);
				viewState.setView(target.id);
			};
		});
		/** True when the current view range already includes today. */
		const viewIncludesToday = /* @__PURE__ */ user_derived(() => {
			const now = /* @__PURE__ */ new Date();
			if (viewState.mode === "month") {
				const f = viewState.focusDate;
				return f.getMonth() === now.getMonth() && f.getFullYear() === now.getFullYear();
			}
			const { start, end } = viewState.range;
			return now.getTime() >= start.getTime() && now.getTime() < end.getTime();
		});
		/** Text direction: explicit prop wins, otherwise derived from the locale. */
		const resolvedDir = /* @__PURE__ */ user_derived(() => {
			if ($$props.dir) return $$props.dir;
			if (!$$props.locale) return void 0;
			try {
				const info = new Intl.Locale($$props.locale);
				return (info.textInfo?.direction ?? info.getTextInfo?.().direction) === "rtl" ? "rtl" : void 0;
			} catch {
				return;
			}
		});
		function handleShortcuts(e) {
			if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
			const t = e.target;
			if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
			if (e.key === "t" || e.key === "T") {
				e.preventDefault();
				viewState.goToday();
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				viewState.prev();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				viewState.next();
			}
		}
		/** Header context for custom header snippet */
		const headerCtx = /* @__PURE__ */ user_derived(() => ({
			dateLabel: get(dateLabel),
			mode: viewState.mode,
			modes: get(modes),
			switchMode,
			prev: () => viewState.prev(),
			next: () => viewState.next(),
			goToday: () => viewState.goToday(),
			isViewOnToday: get(viewIncludesToday),
			focusDate: viewState.focusDate
		}));
		/** Navigation context for custom navigation snippet */
		const navCtx = /* @__PURE__ */ user_derived(() => ({
			prev: () => viewState.prev(),
			next: () => viewState.next(),
			goToday: () => viewState.goToday(),
			isViewOnToday: get(viewIncludesToday),
			focusDate: viewState.focusDate,
			mode: viewState.mode
		}));
		var div = root_12();
		let classes;
		var node = child(div);
		var consequent = ($$anchor) => {
			var fragment = comment();
			snippet(first_child(fragment), () => $$props.header, () => get(headerCtx));
			append($$anchor, fragment);
		};
		var consequent_6 = ($$anchor) => {
			const titleBelow = /* @__PURE__ */ user_derived(() => get(stackHeader) && !!get(dateLabel));
			var fragment_1 = root_5();
			var div_1 = first_child(fragment_1);
			let classes_1;
			var div_2 = child(div_1);
			var node_2 = child(div_2);
			var consequent_1 = ($$anchor) => {
				var div_3 = root_1();
				each(div_3, 20, () => get(modes), (g) => g, ($$anchor, g) => {
					var button = root();
					let classes_2;
					var text = child(button, true);
					reset(button);
					template_effect(() => {
						classes_2 = set_class(button, 1, "cal-m-pill svelte-1b53e7w", null, classes_2, { "cal-m-pill--active": viewState.mode === g });
						set_attribute(button, "aria-checked", viewState.mode === g);
						set_text(text, g === "day" ? get(L).day : g === "week" ? get(L).week : get(L).month);
					});
					delegated("click", button, () => switchMode(g));
					append($$anchor, button);
				});
				reset(div_3);
				template_effect(() => set_attribute(div_3, "aria-label", get(L).viewMode));
				append($$anchor, div_3);
			};
			if_block(node_2, ($$render) => {
				if (showModePills() && get(modes).length > 1) $$render(consequent_1);
			});
			reset(div_2);
			var node_3 = sibling(div_2, 2);
			var consequent_2 = ($$anchor) => {
				var span = root_2();
				var text_1 = child(span, true);
				reset(span);
				template_effect(() => set_text(text_1, get(dateLabel)));
				append($$anchor, span);
			};
			if_block(node_3, ($$render) => {
				if (!get(titleBelow)) $$render(consequent_2);
			});
			var div_4 = sibling(node_3, 2);
			var node_4 = child(div_4);
			var consequent_3 = ($$anchor) => {
				var fragment_2 = comment();
				snippet(first_child(fragment_2), () => $$props.navigation, () => get(navCtx));
				append($$anchor, fragment_2);
			};
			var consequent_4 = ($$anchor) => {
				var fragment_3 = root_3();
				var button_1 = first_child(fragment_3);
				var text_2 = child(button_1, true);
				reset(button_1);
				var button_2 = sibling(button_1, 2);
				var button_3 = sibling(button_2, 2);
				template_effect(() => {
					button_1.disabled = get(viewIncludesToday);
					set_attribute(button_1, "title", get(L).goToToday);
					set_text(text_2, get(L).today);
					set_attribute(button_2, "aria-label", viewState.mode === "day" ? get(L).previousDay : viewState.mode === "month" ? get(L).previousMonth : get(L).previousWeek);
					set_attribute(button_3, "aria-label", viewState.mode === "day" ? get(L).nextDay : viewState.mode === "month" ? get(L).nextMonth : get(L).nextWeek);
				});
				delegated("click", button_1, () => viewState.goToday());
				delegated("click", button_2, () => viewState.prev());
				delegated("click", button_3, () => viewState.next());
				append($$anchor, fragment_3);
			};
			if_block(node_4, ($$render) => {
				if ($$props.navigation) $$render(consequent_3);
				else if (showNavigation()) $$render(consequent_4, 1);
			});
			reset(div_4);
			reset(div_1);
			var node_6 = sibling(div_1, 2);
			var consequent_5 = ($$anchor) => {
				var div_5 = root_4();
				var span_1 = child(div_5);
				var text_3 = child(span_1, true);
				reset(span_1);
				reset(div_5);
				template_effect(() => set_text(text_3, get(dateLabel)));
				append($$anchor, div_5);
			};
			if_block(node_6, ($$render) => {
				if (get(titleBelow)) $$render(consequent_5);
			});
			template_effect(() => classes_1 = set_class(div_1, 1, "cal-m-hd svelte-1b53e7w", null, classes_1, {
				"cal-m-hd--stack": get(stackHeader),
				"cal-m-hd--titled": get(titleBelow)
			}));
			append($$anchor, fragment_1);
		};
		var consequent_11 = ($$anchor) => {
			var div_6 = root_9();
			var div_7 = child(div_6);
			var node_7 = child(div_7);
			var consequent_7 = ($$anchor) => {
				var fragment_4 = comment();
				snippet(first_child(fragment_4), () => $$props.navigation, () => get(navCtx));
				append($$anchor, fragment_4);
			};
			var consequent_8 = ($$anchor) => {
				var fragment_5 = root_6();
				var button_4 = first_child(fragment_5);
				var text_4 = child(button_4, true);
				reset(button_4);
				var button_5 = sibling(button_4, 2);
				var button_6 = sibling(button_5, 2);
				template_effect(() => {
					button_4.disabled = get(viewIncludesToday);
					set_attribute(button_4, "title", get(L).goToToday);
					set_text(text_4, get(L).today);
					set_attribute(button_5, "aria-label", viewState.mode === "day" ? get(L).previousDay : viewState.mode === "month" ? get(L).previousMonth : get(L).previousWeek);
					set_attribute(button_6, "aria-label", viewState.mode === "day" ? get(L).nextDay : viewState.mode === "month" ? get(L).nextMonth : get(L).nextWeek);
				});
				delegated("click", button_4, () => viewState.goToday());
				delegated("click", button_5, () => viewState.prev());
				delegated("click", button_6, () => viewState.next());
				append($$anchor, fragment_5);
			};
			if_block(node_7, ($$render) => {
				if ($$props.navigation) $$render(consequent_7);
				else if (showNavigation()) $$render(consequent_8, 1);
			});
			reset(div_7);
			var span_2 = sibling(div_7, 2);
			var text_5 = child(span_2, true);
			reset(span_2);
			var div_8 = sibling(span_2, 2);
			var node_9 = child(div_8);
			var consequent_9 = ($$anchor) => {
				var div_9 = root_7();
				each(div_9, 20, () => get(labelsForMode), (label) => label, ($$anchor, label) => {
					var button_7 = root();
					let classes_3;
					var text_6 = child(button_7, true);
					reset(button_7);
					template_effect(() => {
						classes_3 = set_class(button_7, 1, "cal-pill svelte-1b53e7w", null, classes_3, { "cal-pill--active": get(activeView)?.label === label });
						set_attribute(button_7, "aria-checked", get(activeView)?.label === label);
						set_text(text_6, label);
					});
					delegated("click", button_7, () => switchLabel(label));
					append($$anchor, button_7);
				});
				reset(div_9);
				template_effect(() => set_attribute(div_9, "aria-label", get(L).viewMode));
				append($$anchor, div_9);
			};
			if_block(node_9, ($$render) => {
				if (showModePills() && get(labelsForMode).length > 1) $$render(consequent_9);
			});
			var node_10 = sibling(node_9, 2);
			var consequent_10 = ($$anchor) => {
				var div_10 = root_8();
				each(div_10, 20, () => get(modes), (g) => g, ($$anchor, g) => {
					var button_8 = root();
					let classes_4;
					var text_7 = child(button_8, true);
					reset(button_8);
					template_effect(() => {
						classes_4 = set_class(button_8, 1, "cal-pill svelte-1b53e7w", null, classes_4, { "cal-pill--active": viewState.mode === g });
						set_attribute(button_8, "aria-checked", viewState.mode === g);
						set_text(text_7, g === "day" ? get(L).day : g === "week" ? get(L).week : get(L).month);
					});
					delegated("click", button_8, () => switchMode(g));
					append($$anchor, button_8);
				});
				reset(div_10);
				template_effect(() => set_attribute(div_10, "aria-label", get(L).viewMode));
				append($$anchor, div_10);
			};
			if_block(node_10, ($$render) => {
				if (showModePills() && get(modes).length > 1) $$render(consequent_10);
			});
			reset(div_8);
			reset(div_6);
			template_effect(() => set_text(text_5, get(dateLabel)));
			append($$anchor, div_6);
		};
		if_block(node, ($$render) => {
			if ($$props.header) $$render(consequent);
			else if (get(useMobile) && (showNavigation() || showModePills() && get(modes).length > 1 || get(dateLabel))) $$render(consequent_6, 1);
			else if (showNavigation() || showModePills() && get(modes).length > 1 || get(dateLabel)) $$render(consequent_11, 2);
		});
		var div_11 = sibling(node, 2);
		var node_11 = child(div_11);
		var consequent_12 = ($$anchor) => {
			const Comp = /* @__PURE__ */ user_derived(() => get(activeView).component);
			var fragment_6 = comment();
			component(first_child(fragment_6), () => get(Comp), ($$anchor, Comp_1) => {
				Comp_1($$anchor, spread_props({
					get events() {
						return store.events;
					},
					get style() {
						return get(effectiveTheme);
					},
					height: null,
					get mode() {
						return get(activeView).mode;
					},
					get mondayStart() {
						return viewState.mondayStart;
					},
					get locale() {
						return $$props.locale;
					},
					get focusDate() {
						return viewState.focusDate;
					},
					oneventclick: handleEventClick,
					get oneventcreate() {
						return get(effectiveCreate);
					},
					get readOnly() {
						return readOnly();
					},
					get visibleHours() {
						return $$props.visibleHours;
					},
					get selectedEventId() {
						return selection.selectedId;
					}
				}, () => get(activeView).props ?? {}));
			});
			append($$anchor, fragment_6);
		};
		var alternate = ($$anchor) => {
			append($$anchor, root_10());
		};
		if_block(node_11, ($$render) => {
			if (get(activeView)) $$render(consequent_12);
			else $$render(alternate, -1);
		});
		reset(div_11);
		var node_13 = sibling(div_11, 2);
		var consequent_13 = ($$anchor) => {
			append($$anchor, root_11());
		};
		if_block(node_13, ($$render) => {
			if (store.loading) $$render(consequent_13);
		});
		reset(div);
		bind_this(div, ($$value) => set(calEl, $$value), () => get(calEl));
		template_effect(() => {
			classes = set_class(div, 1, "cal svelte-1b53e7w", null, classes, { "cal--auto": heightProp() === "auto" });
			set_style(div, `${get(effectiveTheme) ?? ""}; ${heightProp() === "auto" ? "" : `--cal-h: ${heightProp()}px;`} --cal-r: ${borderRadius() ?? ""}px`);
			set_attribute(div, "aria-label", get(L).calendar);
			set_attribute(div, "aria-busy", store.loading || void 0);
			set_attribute(div, "dir", get(resolvedDir));
			set_attribute(div, "lang", $$props.locale);
			div.dir = div.dir;
		});
		delegated("keydown", div, handleShortcuts);
		append($$anchor, div);
		pop();
	}
	delegate(["keydown", "click"]);
	//#endregion
	//#region src/lib/adapters/rest.ts
	function createRestAdapter(options) {
		const { baseUrl, headers = {} } = options;
		const mapEvents = options.mapEvents ?? ((data) => data);
		const mapEvent = options.mapEvent ?? ((data) => data);
		async function request(path, init) {
			const res = await fetch(`${baseUrl}${path}`, {
				...init,
				headers: {
					"Content-Type": "application/json",
					...headers,
					...init?.headers ?? {}
				}
			});
			if (!res.ok) throw new Error(`Calendar API error: ${res.status} ${res.statusText}`);
			if (res.status === 204) return void 0;
			try {
				return await res.json();
			} catch {
				throw new Error(`Calendar API error: invalid JSON response from ${path}`);
			}
		}
		return {
			async fetchEvents(range) {
				const data = await request(`/events?${new URLSearchParams({
					start: range.start.toISOString(),
					end: range.end.toISOString()
				})}`);
				return mapEvents(data);
			},
			async createEvent(event) {
				const data = await request("/events", {
					method: "POST",
					body: JSON.stringify(event)
				});
				return mapEvent(data);
			},
			async updateEvent(id, patch) {
				const data = await request(`/events/${id}`, {
					method: "PATCH",
					body: JSON.stringify(patch)
				});
				return mapEvent(data);
			},
			async deleteEvent(id) {
				await request(`/events/${id}`, { method: "DELETE" });
			}
		};
	}
	//#endregion
	//#region src/lib/core/palette.ts
	/**
	* Smart auto-color palette generator.
	*
	* Given a base accent hex (e.g. from `--dt-accent`), generates a
	* palette of perceptually distinct colors that harmonize with the theme.
	*
	* Usage:
	*   generatePalette('#ef4444', 8)  // 8 theme-harmonious colors
	*   generatePalette(undefined, 8)  // falls back to the vivid default
	*/
	var VIVID_PALETTE = [
		"#ef4444",
		"#f97316",
		"#eab308",
		"#22c55e",
		"#14b8a6",
		"#3b82f6",
		"#6366f1",
		"#a855f7",
		"#ec4899",
		"#f43f5e",
		"#06b6d4",
		"#84cc16",
		"#d946ef",
		"#0ea5e9",
		"#10b981"
	];
	//#endregion
	//#region src/lib/adapters/memory.ts
	var counter = 0;
	function uid() {
		return `mem-${Date.now()}-${++counter}`;
	}
	function createMemoryAdapter(initial = [], options) {
		const events = [...initial];
		const palette = options?.palette ?? VIVID_PALETTE;
		const colorAssignments = /* @__PURE__ */ new Map();
		let colorIndex = 0;
		function resolveColor(ev) {
			if (ev.color) return ev.color;
			const key = ev.category ?? ev.title;
			if (!colorAssignments.has(key)) {
				colorAssignments.set(key, palette[colorIndex % palette.length]);
				colorIndex++;
			}
			return colorAssignments.get(key);
		}
		function withColor(ev) {
			const color = resolveColor(ev);
			return color ? {
				...ev,
				color
			} : ev;
		}
		function overlaps(ev, range) {
			return ev.start < range.end && ev.end > range.start;
		}
		return {
			async fetchEvents(range) {
				return events.filter((ev) => overlaps(ev, range)).map(withColor);
			},
			async createEvent(data) {
				const ev = {
					...data,
					id: uid()
				};
				events.push(ev);
				return withColor(ev);
			},
			async updateEvent(id, patch) {
				const idx = events.findIndex((e) => e.id === id);
				if (idx < 0) throw new Error(`Event not found: ${id}`);
				events[idx] = {
					...events[idx],
					...patch,
					id
				};
				return withColor(events[idx]);
			},
			async deleteEvent(id) {
				const idx = events.findIndex((e) => e.id === id);
				if (idx < 0) throw new Error(`Event not found: ${id}`);
				events.splice(idx, 1);
			}
		};
	}
	//#endregion
	//#region src/lib/widget/CalendarWidget.svelte
	function CalendarWidget($$anchor, $$props) {
		push($$props, true);
		/** REST API base URL — if provided, fetches events from this endpoint */
		/** JSON string of events for static/inline data (alternative to api) */
		/** Theme preset name: auto (default — adapts to the host page), neutral, midnight */
		/** Default view ID */
		/** Calendar height: pixels (e.g. "600") or "auto" */
		/** BCP 47 locale tag (e.g. 'en-US', 'pl-PL') */
		/** Text direction: ltr, rtl, auto */
		/** Start week on Monday (default: true) */
		/** Custom HTTP headers as JSON string for REST adapter */
		/** Read-only mode: "true" disables drag/resize/create */
		/** Show the Day/Week/Month pills (default: true) */
		/** Show prev/next/today navigation (default: true) */
		/** Mobile mode: "auto" (default), "true", "false" */
		/** Days shown in week mode, e.g. "3" or "5" */
		/** Compact agenda rendering: "true" */
		/** IANA timezone, e.g. "Europe/Warsaw" */
		let theme = prop($$props, "theme", 3, "auto"), view = prop($$props, "view", 3, "week-planner"), height = prop($$props, "height", 3, "600"), mondaystart = prop($$props, "mondaystart", 3, "true");
		const heightValue = /* @__PURE__ */ user_derived(() => {
			const trimmed = height().trim();
			if (trimmed === "auto") return "auto";
			if (/^\d+(px)?$/.test(trimmed)) return parseInt(trimmed, 10);
			console.warn(`[day-calendar] Unsupported height "${height()}" — use pixels or "auto". Falling back to 600.`);
			return 600;
		});
		const isMondayStart = /* @__PURE__ */ user_derived(() => mondaystart() !== "false");
		const themeStyle = /* @__PURE__ */ user_derived(() => theme() in presets ? presets[theme()] : presets.neutral);
		const dirValue = /* @__PURE__ */ user_derived(() => $$props.dir === "rtl" || $$props.dir === "ltr" || $$props.dir === "auto" ? $$props.dir : void 0);
		const mobileValue = /* @__PURE__ */ user_derived(() => $$props.mobile === "true" ? true : $$props.mobile === "false" ? false : "auto");
		const daysValue = /* @__PURE__ */ user_derived(() => {
			if (!$$props.days) return void 0;
			const n = parseInt($$props.days, 10);
			return Number.isNaN(n) || n < 1 || n > 7 ? void 0 : n;
		});
		function parseHeaders(json) {
			if (!json) return void 0;
			try {
				const parsed = JSON.parse(json);
				const out = {};
				for (const [k, v] of Object.entries(parsed)) out[k] = String(v);
				return out;
			} catch {
				console.warn("[day-calendar] Failed to parse headers JSON:", json);
				return;
			}
		}
		function toEvent(raw, fallbackId) {
			const start = new Date(String(raw.start ?? ""));
			const end = new Date(String(raw.end ?? ""));
			if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return null;
			return {
				id: String(raw.id ?? fallbackId),
				title: String(raw.title ?? "Untitled"),
				start,
				end,
				color: raw.color ? String(raw.color) : void 0
			};
		}
		function parseEvents(json) {
			if (!json) return [];
			try {
				const raw = JSON.parse(json);
				const parsed = raw.map((e, idx) => toEvent(e, `inline-${idx}`)).filter((ev) => ev !== null);
				if (parsed.length !== raw.length) console.warn(`[day-calendar] Ignored ${raw.length - parsed.length} invalid event(s) from events JSON.`);
				return parsed;
			} catch {
				console.warn("[day-calendar] Failed to parse events JSON:", json);
				return [];
			}
		}
		const adapter = /* @__PURE__ */ user_derived(() => {
			if ($$props.api) {
				const parsedHeaders = parseHeaders($$props.headers);
				return createRestAdapter({
					baseUrl: $$props.api,
					headers: parsedHeaders,
					mapEvents: (data) => {
						return (Array.isArray(data) ? data : data.events ?? []).map((e, idx) => toEvent(e, `api-${idx}`)).filter((ev) => ev !== null);
					}
				});
			}
			return createMemoryAdapter(parseEvents($$props.events));
		});
		{
			let $0 = /* @__PURE__ */ user_derived(() => $$props.readonly === "true");
			let $1 = /* @__PURE__ */ user_derived(() => $$props.pills !== "false");
			let $2 = /* @__PURE__ */ user_derived(() => $$props.nav !== "false");
			let $3 = /* @__PURE__ */ user_derived(() => $$props.compact === "true");
			let $4 = /* @__PURE__ */ user_derived(() => $$props.timezone || void 0);
			Calendar($$anchor, {
				get adapter() {
					return get(adapter);
				},
				get view() {
					return view();
				},
				get theme() {
					return get(themeStyle);
				},
				get height() {
					return get(heightValue);
				},
				get mondayStart() {
					return get(isMondayStart);
				},
				get dir() {
					return get(dirValue);
				},
				get locale() {
					return $$props.locale;
				},
				get readOnly() {
					return get($0);
				},
				get showModePills() {
					return get($1);
				},
				get showNavigation() {
					return get($2);
				},
				get mobile() {
					return get(mobileValue);
				},
				get days() {
					return get(daysValue);
				},
				get compact() {
					return get($3);
				},
				get timezone() {
					return get($4);
				}
			});
		}
		pop();
	}
	//#endregion
	//#region src/lib/widget/widget.ts
	/**
	* Widget entry point — registers <day-calendar> as a custom element.
	*
	* This file is the entry point for the standalone widget bundle (widget.js).
	* Import it via a <script> tag on any HTML page.
	*
	* The component mounts into an open shadow root so host-page CSS (resets,
	* theme stylesheets) cannot bleed into the calendar and calendar styles
	* cannot leak out. The bundled CSS is injected into each shadow root — see
	* `injectStyles` below and the inlineCss plugin in vite.config.widget.ts.
	*/
	var CalendarWidgetClass = asClassComponent(CalendarWidget);
	/**
	* Shared constructable stylesheet — parsed once, adopted by every
	* <day-calendar> shadow root on the page.
	*/
	var sharedSheet = null;
	/**
	* Add the bundled widget CSS to a shadow root.
	*
	* Prefers `adoptedStyleSheets` (one parse for N widgets); falls back to a
	* <style> element where constructable stylesheets are unavailable. No-op
	* when the CSS global is undefined (dev / library usage).
	*/
	function injectStyles(root) {
		const css = globalThis.__DAY_CALENDAR_CSS__;
		if (!css) return;
		if ("adoptedStyleSheets" in root && typeof CSSStyleSheet !== "undefined") try {
			if (!sharedSheet) {
				sharedSheet = new CSSStyleSheet();
				sharedSheet.replaceSync(css);
			}
			root.adoptedStyleSheets = [...root.adoptedStyleSheets, sharedSheet];
			return;
		} catch {}
		const style = document.createElement("style");
		style.setAttribute("data-day-calendar", "");
		style.textContent = css;
		root.appendChild(style);
	}
	var WIDGET_ATTRS = [
		"api",
		"events",
		"theme",
		"view",
		"height",
		"locale",
		"dir",
		"mondaystart",
		"headers",
		"readonly",
		"pills",
		"nav",
		"mobile",
		"days",
		"compact",
		"timezone"
	];
	var DayCalendarElement = class extends HTMLElement {
		instance = null;
		stylesInjected = false;
		static get observedAttributes() {
			return [...WIDGET_ATTRS];
		}
		connectedCallback() {
			if (this.instance) return;
			const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
			if (!this.stylesInjected) {
				injectStyles(root);
				this.stylesInjected = true;
			}
			this.instance = new CalendarWidgetClass({
				target: root,
				props: this.readProps()
			});
		}
		disconnectedCallback() {
			this.instance?.$destroy();
			this.instance = null;
		}
		attributeChangedCallback(name, _oldValue, newValue) {
			if (!this.instance) return;
			this.instance.$set({ [name]: newValue ?? void 0 });
		}
		readProps() {
			const props = {};
			for (const attr of WIDGET_ATTRS) {
				const value = this.getAttribute(attr);
				if (value !== null) props[attr] = value;
			}
			return props;
		}
	};
	if (!customElements.get("day-calendar")) customElements.define("day-calendar", DayCalendarElement);
	//#endregion
})();
