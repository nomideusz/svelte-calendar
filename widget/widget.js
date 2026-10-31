globalThis.__DAY_CALENDAR_CSS__ = ":host{display:block}\n\t/* ─── Container ──────────────────────────────────── */\n\t.tw.svelte-j4rvbp {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tbackground: var(--dt-paper, none), var(--dt-bg, #efebe9);\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw--auto.svelte-j4rvbp { overflow: visible; }\n\n\t/* ─── Scroll container ───────────────────────────── */\n\t.tw-scroll.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\toverflow-y: auto;\n\t\toverflow-x: auto;\n\t\t/* Horizontal stays contained (a sideways swipe must not trigger the\n\t\t   browser's back navigation); vertical chains to the page, so a wheel\n\t\t   over a page-embedded calendar scrolls on once the grid ends. */\n\t\toverscroll-behavior-x: contain;\n\t\toverscroll-behavior-y: auto;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(15, 15, 15, 0.1)) transparent;\n\t}\n\t.tw--auto.svelte-j4rvbp .tw-scroll:where(.svelte-j4rvbp) { overflow-y: visible; }\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar { width: 5px; height: 5px; }\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-scrollbar, rgba(15, 15, 15, 0.1));\n\t\tborder-radius: 0;\n\t}\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar-track { background: transparent; }\n\n\t.tw-inner.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\twidth: 100%;\n\t}\n\n\t/* ─── Sticky top (header + all-day) ──────────────── */\n\t.tw-top.svelte-j4rvbp {\n\t\tposition: sticky;\n\t\ttop: 0;\n\t\tz-index: 30;\n\t\tbackground: var(--dt-paper, none), var(--dt-bg, #efebe9);\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\n\t/* ─── Day header row ─────────────────────────────── */\n\t.tw-head.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t}\n\n\t.tw-corner.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 2;\n\t\tbackground: var(--dt-paper, none), var(--dt-bg, #efebe9);\n\t}\n\n\t.tw-hd.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: var(--tw-col-min, 110px);\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 14px 4px 12px;\n\t\tborder-left: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\n\t.tw-hd-wd.svelte-j4rvbp {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.tw-hd--today.svelte-j4rvbp .tw-hd-wd:where(.svelte-j4rvbp) {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\n\t/* The day number is the typography of the grid: large, regular weight. */\n\t.tw-hd-num.svelte-j4rvbp {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont: 400 40px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 90%;\n\t\tletter-spacing: -0.02em;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t/* Today: the numeral in the accent, nothing else. */\n\t.tw-hd-num--today.svelte-j4rvbp {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\n\t.tw-hd-custom.svelte-j4rvbp {\n\t\tmax-width: 100%;\n\t\toverflow: hidden;\n\t}\n\n\t/* ─── All-day strip ──────────────────────────────── */\n\t.tw-allday.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tborder-top: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\n\t.tw-ad-gutter.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\t/* The padding sits inside the gutter's width, so the all-day cells\n\t\t   start where the day columns and headers start. */\n\t\tbox-sizing: border-box;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 2;\n\t\tbackground: var(--dt-paper, none), var(--dt-bg, #efebe9);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: flex-end;\n\t\tpadding: 6px 8px 6px 0;\n\t}\n\t.tw-ad-gutter-lb.svelte-j4rvbp {\n\t\tfont: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\ttext-align: right;\n\t}\n\n\t.tw-ad-cell.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: var(--tw-col-min, 110px);\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tpadding: 4px 0 5px;\n\t\tborder-left: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\t.tw-ad-cell--today.svelte-j4rvbp { background: var(--dt-today-bg, rgba(29, 79, 215, 0.04)); }\n\n\t.tw-ad.svelte-j4rvbp {\n\t\tappearance: none;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 0 10px;\n\t\tmin-height: 36px;\n\t\tborder: none;\n\t\tborder-radius: 0;\n\t\t/* The paper's grain runs through the band (multiply keeps the colour). */\n\t\tbackground: var(--dt-paper, none) var(--ev-color);\n\t\tbackground-blend-mode: multiply;\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t\ttransition: filter 0.12s;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ad.svelte-j4rvbp:hover {\n\t\tfilter: brightness(1.08);\n\t}\n\t/* A span continues across its days as one band: no edge between segments. */\n\t.tw-ad--mid.svelte-j4rvbp,\n\t.tw-ad--end.svelte-j4rvbp:not(.tw-ad--start) {\n\t\tmargin-left: -1px;\n\t}\n\t.tw-ad--selected.svelte-j4rvbp {\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);\n\t}\n\t.tw-ad--cancelled.svelte-j4rvbp .tw-ad-title:where(.svelte-j4rvbp) {\n\t\ttext-decoration: line-through;\n\t}\n\t.tw-ad--cancelled.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 55%, var(--dt-bg, #efebe9));\n\t}\n\t.tw-ad.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff), 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\n\t.tw-ad-title.svelte-j4rvbp {\n\t\tfont: 500 13.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: inherit;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tunicode-bidi: plaintext;\n\t\ttext-align: left;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t/* …but it sits on the calendar's side, by the bar */\n\t.tw-ad-title.svelte-j4rvbp:dir(rtl) { text-align: right; }\n\t.tw-ad-span.svelte-j4rvbp {\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: inherit;\n\t\topacity: 0.75;\n\t\tflex-shrink: 0;\n\t}\n\t.tw-ad--mid.svelte-j4rvbp .tw-ad-title:where(.svelte-j4rvbp),\n\t.tw-ad--end.svelte-j4rvbp:not(.tw-ad--start) .tw-ad-title:where(.svelte-j4rvbp) {\n\t\tvisibility: hidden;\n\t}\n\t.tw-ad-gutter.svelte-j4rvbp + .tw-ad-cell:where(.svelte-j4rvbp) .tw-ad-title:where(.svelte-j4rvbp) {\n\t\tvisibility: visible;\n\t}\n\t.tw-ad-span.svelte-j4rvbp,\n\t.tw-ad-cont.svelte-j4rvbp,\n\t.tw-ad-arrow.svelte-j4rvbp {\n\t\tdisplay: none;\n\t}\n\t.tw-ad-arrow.svelte-j4rvbp {\n\t\tdisplay: none;\n\t\tcolor: inherit;\n\t\topacity: 0.75;\n\t\tflex-shrink: 0;\n\t}\n\t.tw-ad-arrow.svelte-j4rvbp { margin-left: auto; }\n\n\t.tw-ad-more.svelte-j4rvbp {\n\t\tappearance: none;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tborder-radius: 0;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\tpadding: 2px 6px;\n\t\tcursor: pointer;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ad-more.svelte-j4rvbp:hover { color: var(--dt-text, rgba(15, 15, 15, 0.87)); }\n\t.tw-ad-more.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\n\t/* ─── Grid body ──────────────────────────────────── */\n\t.tw-body.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tposition: relative;\n\t}\n\t.tw-body--unplaced.svelte-j4rvbp {\n\t\tvisibility: hidden;\n\t\tanimation: svelte-j4rvbp-tw-reveal 0s 1.5s forwards;\n\t}\n\t@keyframes svelte-j4rvbp-tw-reveal { to { visibility: visible; } }\n\n\t/* ─── Time gutter ────────────────────────────────── */\n\t.tw-gutter.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 20;\n\t\tbackground: var(--dt-paper, none), var(--dt-bg, #efebe9);\n\t\tborder-right: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\n\t/* Timetable hour: the numeral carries the rank, the suffix sits raised\n\t   and small beside it. */\n\t.tw-gutter-lb.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 6px;\n\t\tright: 0;\n\t\ttransform: translateY(-50%);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tgap: 2px;\n\t\tfont: 400 26px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 85%;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tletter-spacing: -0.02em;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t}\n\t.tw-gutter-lb.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tflex: 1;\n\t\tmin-width: 6px;\n\t\theight: 1px;\n\t\tmargin-left: 5px;\n\t\talign-self: center;\n\t\tbackground: var(--dt-border-day, rgba(15, 15, 15, 0.3));\n\t}\n\t/* The first hour has no room above its line: it hangs below it, the\n\t   tick still on the line. */\n\t.tw-gutter-lb.svelte-j4rvbp:first-child { transform: none; }\n\t.tw-gutter-lb.svelte-j4rvbp:first-child::after { align-self: flex-start; }\n\t.tw-gutter-lb--under.svelte-j4rvbp {\n\t\tvisibility: hidden;\n\t}\n\t.tw-gutter-lb.svelte-j4rvbp small:where(.svelte-j4rvbp) {\n\t\tfont-size: 10px;\n\t\tfont-weight: 500;\n\t\tline-height: 1;\n\t\tletter-spacing: 0;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\n\t/* The clock beside the now line, and the drag's edges while it lasts —\n\t   both sit on the surface so they cover the hour label beneath. */\n\t.tw-gutter-now.svelte-j4rvbp,\n\t.tw-gutter-drag.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tright: 3px;\n\t\ttransform: translateY(-50%);\n\t\tpadding: 2px 4px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--dt-surface, var(--dt-bg, #efebe9));\n\t\tfont: 500 11px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t\twhite-space: nowrap;\n\t\tz-index: 2;\n\t}\n\t/* The clock is a reversed plate on the accent, like a board's live time. */\n\t.tw-gutter-now.svelte-j4rvbp {\n\t\tbackground: var(--dt-accent, #1d4fd7);\n\t\tcolor: var(--dt-btn-text, #ffffff);\n\t}\n\n\t/* ─── Columns wrapper ────────────────────────────── */\n\t.tw-cols.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tdisplay: flex;\n\t\tposition: relative;\n\t\tmin-width: 0;\n\t}\n\n\t/* ─── Guide lines ────────────────────────────────── */\n\t.tw-lines.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tpointer-events: none;\n\t\t/* Above the columns' background washes, below blocked/events/now */\n\t\tz-index: 1;\n\t}\n\t.tw-line.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 1px;\n\t\tbackground: var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\t.tw-line--half.svelte-j4rvbp { opacity: 0.4; }\n\t.tw-now-week.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 0;\n\t\tborder-top: 2px solid var(--dt-accent, #1d4fd7);\n\t\topacity: 0.85;\n\t\ttransform: translateY(-1px);\n\t}\n\n\t/* ─── Day column ─────────────────────────────────── */\n\t.tw-col.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: var(--tw-col-min, 110px);\n\t\tposition: relative;\n\t\tborder-left: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tbox-sizing: border-box;\n\t}\n\t.tw-col.svelte-j4rvbp:focus-visible {\n\t\toutline: 2px solid var(--dt-text, #0f0f0f);\n\t\toutline-offset: -2px;\n\t}\n\t/* The gutter's right border already bounds the first column */\n\t.tw-lines.svelte-j4rvbp + .tw-col:where(.svelte-j4rvbp) { border-left: none; }\n\n\t/* --tw-col-wash: the column's ground, repeated under an event that the\n\t   now line crosses (that event is opaque, so the line runs beneath it). */\n\t.tw-col.svelte-j4rvbp { background: var(--tw-col-wash, transparent); }\n\t.tw-col--today.svelte-j4rvbp { --tw-col-wash: var(--dt-today-bg, rgba(29, 79, 215, 0.04)); }\n\t/* Dim past days with a wash, never a subtree opacity (event contrast) */\n\t.tw-col--past.svelte-j4rvbp {\n\t\t--tw-col-wash: color-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent);\n\t}\n\t/* What has already happened steps back; a cancelled block keeps its own look. */\n\t.tw-ev--past.svelte-j4rvbp:not(.tw-ev--cancelled) {\n\t\topacity: 0.78;\n\t}\n\t.tw-col--weekend.svelte-j4rvbp:not(.tw-col--today):not(.tw-col--past) {\n\t\t--tw-col-wash: var(--dt-weekend-bg, rgba(15, 15, 15, 0.012));\n\t}\n\t.tw-col--disabled.svelte-j4rvbp {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tvar(--dt-border, rgba(15, 15, 15, 0.08)) 6px,\n\t\t\tvar(--dt-border, rgba(15, 15, 15, 0.08)) 7px\n\t\t) !important;\n\t}\n\n\t/* ─── Blocked slot overlay ───────────────────────── */\n\t.tw-blocked.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 2;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t\tpointer-events: none;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: center;\n\t\toverflow: hidden;\n\t}\n\t.tw-blocked-lb.svelte-j4rvbp {\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t\twhite-space: nowrap;\n\t\tpadding-top: 4px;\n\t}\n\n\t/* ─── Now line ───────────────────────────────────── */\n\t/* Under the events (z 6): the one it crosses is opaque (.tw-ev--on-now),\n\t   so the line never strikes through a title. The dot stays on top. */\n\t.tw-now.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 0;\n\t\tborder-top: 2px solid var(--dt-accent, #1d4fd7);\n\t\tz-index: 5;\n\t\tpointer-events: none;\n\t\ttransform: translateY(-1px);\n\t}\n\t.tw-now-dot.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: -4px;\n\t\twidth: 8px;\n\t\theight: 8px;\n\t\tmargin-top: -4px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #1d4fd7);\n\t\tz-index: 12;\n\t\tpointer-events: none;\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.tw-ev.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tz-index: 6;\n\t\tborder-radius: 0;\n\t\tbackground: transparent;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\toverflow: hidden;\n\t\tcursor: grab;\n\t\t/* Pointer drags move the event, never scroll the grid */\n\t\ttouch-action: none;\n\t\ttransition: box-shadow 120ms, background 120ms;\n\t\tbox-sizing: border-box;\n\t\tmin-height: 24px;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ev.svelte-j4rvbp:hover {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t\tz-index: 8;\n\t}\n\t/* Short blocks keep duration-proportional height, but get a 44px\n\t   transparent hit-slop so clicks/taps still land. */\n\t.tw-ev--short.svelte-j4rvbp { overflow: visible; }\n\t.tw-ev--short.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.tw-ev--selected.svelte-j4rvbp {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t\tz-index: 9;\n\t}\n\t.tw-ev--current.svelte-j4rvbp {\n\t\tbackground-color: var(--dt-accent-dim, rgba(29, 79, 215, 0.12));\n\t}\n\t/* An event the now line crosses lays its column's ground (and its own\n\t   wash) over the paper, so the line passes beneath its text. */\n\t.tw-ev.tw-ev--on-now.svelte-j4rvbp {\n\t\tbackground:\n\t\t\tlinear-gradient(var(--_fill), var(--_fill)),\n\t\t\tlinear-gradient(var(--tw-ev-wash, transparent), var(--tw-ev-wash, transparent)),\n\t\t\tlinear-gradient(var(--tw-col-wash, transparent), var(--tw-col-wash, transparent)),\n\t\t\tvar(--dt-paper, none),\n\t\t\tvar(--dt-bg, #efebe9);\n\t}\n\t.tw-ev--on-now.tw-ev--current.svelte-j4rvbp { --tw-ev-wash: var(--dt-accent-dim, rgba(29, 79, 215, 0.12)); }\n\t.tw-ev--on-now.svelte-j4rvbp:hover { --tw-ev-wash: var(--dt-hover, rgba(15, 15, 15, 0.04)); }\n\t.tw-ev--resizing.svelte-j4rvbp {\n\t\tz-index: 50;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n\t\tcursor: ns-resize;\n\t}\n\t/* Origin of an in-flight move: still there, clearly no longer the subject. */\n\t.tw-ev--moving.svelte-j4rvbp {\n\t\topacity: 0.3;\n\t\tpointer-events: none;\n\t\tbox-shadow: none;\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — consistent with the other views. */\n\t/* Printed states: a cancelled class is struck through and stays on the\n\t   grid; a tentative one is set in grey with a dashed bar. */\n\t.tw-ev--cancelled.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.tw-ev--cancelled.svelte-j4rvbp .tw-ev-stripe:where(.svelte-j4rvbp) { opacity: 0.45; /* decorative bar only */ }\n\t.tw-ev--tentative.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp),\n\t.tw-ev--full.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.tw-ev--tentative.svelte-j4rvbp .tw-ev-stripe:where(.svelte-j4rvbp),\n\t.tw-ev--limited.svelte-j4rvbp .tw-ev-stripe:where(.svelte-j4rvbp) {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t180deg,\n\t\t\tvar(--ev-color) 0 4px,\n\t\t\ttransparent 4px 7px\n\t\t);\n\t}\n\t.tw-ev--full.svelte-j4rvbp .tw-ev-stripe:where(.svelte-j4rvbp) { opacity: 0.45; }\n\t.tw-ev--readonly.svelte-j4rvbp { cursor: default; }\n\n\t.tw-ev-stripe.svelte-j4rvbp {\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\n\t.tw-ev-body.svelte-j4rvbp {\n\t\tcontainer: tw-ev / inline-size;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 3px 7px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\toverflow: hidden;\n\t}\n\t/* Compact (< ~35min at default zoom): one line, \"Title 9:00\". The title\n\t   wins the room: the time wraps onto a second line, which the block\n\t   clips, before the title is cut; a title too long alone ellipsizes. */\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-body:where(.svelte-j4rvbp) {\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\talign-content: flex-start;\n\t\talign-items: baseline;\n\t\tgap: 24px 5px;\n\t\tpadding-top: 2px;\n\t\tpadding-bottom: 0;\n\t}\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) { flex: 0 1 auto; min-width: 0; }\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-end:where(.svelte-j4rvbp) { display: none; }\n\n\t/* Title first, time under it; both one size, rank by weight and ink. */\n\t.tw-ev-time.svelte-j4rvbp {\n\t\torder: 1;\n\t\tfont: 400 14px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t/* A narrow overlap column keeps the start time whole and drops the end. */\n\t@container tw-ev (max-width: 104px) {\n\t\t.tw-ev-end.svelte-j4rvbp { display: none; }\n\t}\n\n\t.tw-ev-title.svelte-j4rvbp {\n\t\torder: 0;\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\t/* A Latin title in an RTL calendar keeps its own direction, so the\n\t\t   ellipsis cuts its end, not its start. */\n\t\tunicode-bidi: plaintext;\n\t\ttext-align: left;\n\t}\n\t/* …but it sits on the calendar's side, by the bar */\n\t.svelte-j4rvbp:is(.tw-ev-title:where(.svelte-j4rvbp), .tw-ev-loc:where(.svelte-j4rvbp)):dir(rtl) { text-align: right; }\n\t/* A block tall enough for two title lines over the time wraps the title\n\t   to two. The parts flow in a wrapping column, so a room that no longer\n\t   fits under them moves into a second column the block clips: it gives\n\t   way whole, before the title is cut, instead of being sliced. */\n\t.tw-ev--tall.svelte-j4rvbp .tw-ev-body:where(.svelte-j4rvbp) {\n\t\tflex-wrap: wrap;\n\t\tcolumn-gap: 16px;\n\t}\n\t.tw-ev--tall.svelte-j4rvbp :is(.tw-ev-title:where(.svelte-j4rvbp), .tw-ev-time:where(.svelte-j4rvbp), .tw-ev-loc:where(.svelte-j4rvbp)) { width: 100%; }\n\t.tw-ev--tall.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) {\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\twhite-space: normal;\n\t\toverflow-wrap: break-word; /* a word wider than an overlap lane breaks, not clips */\n\t\thyphens: auto; /* …and hyphenates where the host page declares a lang */\n\t}\n\n\t.tw-ev-loc.svelte-j4rvbp {\n\t\torder: 2;\n\t\tfont: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tunicode-bidi: plaintext;\n\t\ttext-align: left;\n\t}\n\n\t.tw-ev-live.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\ttop: 4px;\n\t\tright: 4px;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tanimation: svelte-j4rvbp-tw-pulse 2s ease-in-out infinite;\n\t}\n\t@keyframes svelte-j4rvbp-tw-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t/* Resizing lives only on the centered grip column. The old full-width\n\t   edge bands (12–20px of inward slop each) covered short events\n\t   entirely — min block height is 24px, so every grab meant to move\n\t   started a resize instead. The grip is the visible affordance;\n\t   everything else on the block drags to move. */\n\t.tw-ev-handle.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 44px;\n\t\theight: 8px;\n\t\tz-index: 2;\n\t\tcursor: ns-resize;\n\t\ttouch-action: none;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp { top: 0; }\n\t.tw-ev-handle--end.svelte-j4rvbp { bottom: 0; }\n\t/* Hit-slop: ≥20px effective, extending inward so overflow clipping\n\t   can't cut it off. */\n\t.tw-ev-handle.svelte-j4rvbp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 20px;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp::before { top: 0; }\n\t.tw-ev-handle--end.svelte-j4rvbp::before { bottom: 0; }\n\t/* Short events: shrink the slop so a move-grab area survives */\n\t.tw-ev--short.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::before { height: 12px; }\n\t.tw-ev-handle.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 20px;\n\t\theight: 3px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp::after { top: 1px; }\n\t.tw-ev-handle--end.svelte-j4rvbp::after { bottom: 1px; }\n\t.tw-ev.svelte-j4rvbp:hover .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev.svelte-j4rvbp:focus-within .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev.svelte-j4rvbp:focus-visible .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev--resizing.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev--selected.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::after { opacity: 0.55; }\n\t/* Pointer on the grip column itself: brighten so the hit zone reads */\n\t.tw-ev-handle.svelte-j4rvbp:hover::after { opacity: 0.9; }\n\t/* Coarse pointers can't hover — show the grips persistently */\n\t@media (hover: none) {\n\t\t.tw-ev-handle.svelte-j4rvbp::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Move / create ghost ────────────────────────── */\n\t.tw-ghost.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 1px;\n\t\tright: 3px;\n\t\tz-index: 40;\n\t\tborder-radius: 0;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #efebe9)));\n\t\toutline: 1px solid color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t\tbox-shadow: 0 6px 18px color-mix(in srgb, var(--ev-color) 24%, rgba(0, 0, 0, 0.22));\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\tpadding: 3px 6px;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t\tcursor: grabbing;\n\t\tbox-sizing: border-box;\n\t}\n\t.tw-ghost--create.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, transparent);\n\t\toutline: 1px dashed color-mix(in srgb, var(--ev-color) 60%, transparent);\n\t\tbox-shadow: none;\n\t}\n\t.tw-ghost-time.svelte-j4rvbp {\n\t\tfont: 500 12.5px/1.15 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--ev-color, var(--dt-accent, #1d4fd7));\n\t\twhite-space: nowrap;\n\t}\n\t.tw-ghost-title.svelte-j4rvbp {\n\t\tfont: 500 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t/* ─── Empty overlay ──────────────────────────────── */\n\t.tw-empty.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpointer-events: none;\n\t\tz-index: 4;\n\t}\n\n\t/* ─── Focus-visible ──────────────────────────────── */\n\t/* box-shadow instead of outline: outlines get clipped by the\n\t   overflow: hidden scroll container. */\n\t.tw-ev.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t\tz-index: 9;\n\t}\n\n\t/* ─── Reduced motion ─────────────────────────────── */\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.tw-ev.svelte-j4rvbp,\n\t\t.tw-ad.svelte-j4rvbp,\n\t\t.tw-ev-handle.svelte-j4rvbp::after {\n\t\t\ttransition: none;\n\t\t}\n\t\t.tw-ev-live.svelte-j4rvbp { animation: none; }\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.wg.svelte-l8xuza {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t}\n\t.wg--auto.svelte-l8xuza { overflow: visible; }\n\n\t/* ─── Scrollable body ────────────────────────────── */\n\t.wg-body.svelte-l8xuza {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\t/* The prepend is compensated by hand (handleUserScroll); the browser's\n\t\t   anchoring on top of it moved the content twice. */\n\t\toverflow-anchor: none;\n\t\t/* Seven columns scroll horizontally at narrow widths instead of squishing */\n\t\toverflow-x: auto;\n\t\tbox-sizing: border-box;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(15, 15, 15, 0.1)) transparent;\n\t}\n\t.wg--auto.svelte-l8xuza .wg-body:where(.svelte-l8xuza) { overflow-y: visible; }\n\n\t.wg-body.svelte-l8xuza::-webkit-scrollbar { width: 4px; }\n\t.wg-body.svelte-l8xuza::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-scrollbar, rgba(15, 15, 15, 0.1));\n\t\tborder-radius: 0;\n\t}\n\t.wg-body.svelte-l8xuza::-webkit-scrollbar-track { background: transparent; }\n\n\t.wg-probe.svelte-l8xuza {\n\t\tposition: absolute;\n\t\tvisibility: hidden;\n\t\theight: 0;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t}\n\n\t/* ─── Week row ───────────────────────────────────── */\n\t.wg-week.svelte-l8xuza {\n\t\tdisplay: flex;\n\t\tborder-radius: 0;\n\t\tmargin: var(--wg-row-margin, 12px) 8px;\n\t\tborder: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\toverflow: hidden;\n\t}\n\n\t.wg-week--current.svelte-l8xuza {\n\t\tbackground: var(--dt-today-bg, rgba(29, 79, 215, 0.04));\n\t\t/* The current row's frame is a day rule, not the accent */\n\t\tborder-color: var(--dt-border-day, rgba(15, 15, 15, 0.3));\n\t}\n\n\t/* ─── Week body ──────────────────────────────────── */\n\t.wg-week-body.svelte-l8xuza {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t}\n\n\t/* ─── Day columns ────────────────────────────────── */\n\t.wg-days.svelte-l8xuza {\n\t\tdisplay: flex;\n\t\tflex: 1;\n\t}\n\n\t.wg-cell.svelte-l8xuza {\n\t\tflex: 1;\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tmin-width: 90px;\n\t\tbox-sizing: border-box;\n\t\tpadding: 4px 4px 8px;\n\t\tborder-right: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tcursor: pointer;\n\t\ttransition: background 0.15s;\n\t}\n\n\t.wg-cell.svelte-l8xuza:last-child { border-right: none; }\n\t/* The inset is on the contents, not the cell's padding: flex adds padding\n\t   to a basis-0 cell, and that one column would come out wider. */\n\t.wg-cell--month.svelte-l8xuza .wg-cell-events:where(.svelte-l8xuza),\n\t.wg-cell--month.svelte-l8xuza .wg-allday:where(.svelte-l8xuza) { margin-left: var(--wg-month-inset, 22px); }\n\n\t/* ─── Month labels (vertical, read bottom-to-top) ─── */\n\t.wg-month.svelte-l8xuza {\n\t\tflex: 0 0 22px;\n\t\twriting-mode: vertical-rl;\n\t\ttransform: rotate(180deg);\n\t\ttext-align: end; /* the rotation puts the end at the top */\n\t\tpadding: 6px 0;\n\t\tfont: 500 12px / 22px var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\tcolor: var(--dt-text-3, rgba(15, 15, 15, 0.38));\n\t}\n\t.wg-week--current.svelte-l8xuza .wg-month:where(.svelte-l8xuza),\n\t.wg-month--start.svelte-l8xuza {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.wg-month--inset.svelte-l8xuza {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 2px;\n\t\tpointer-events: none;\n\t}\n\t.wg-cell.svelte-l8xuza:hover { background: var(--dt-hover, rgba(15, 15, 15, 0.015)); }\n\n\t.wg-cell--today.svelte-l8xuza { background: var(--dt-today-bg, rgba(29, 79, 215, 0.04)); }\n\t.wg-cell--drop.svelte-l8xuza {\n\t\tbackground: var(--dt-accent-dim, rgba(29, 79, 215, 0.12)) !important;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.wg-cell--today.svelte-l8xuza:hover { background: var(--dt-hover, rgba(15, 15, 15, 0.04)); }\n\n\t/* Non-current weeks sit on the same paper; only the header ink softens,\n\t   and past events print a shade lighter. */\n\t.wg-week.svelte-l8xuza:not(.wg-week--current) .wg-day-num:where(.svelte-l8xuza) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.wg-cell--past.svelte-l8xuza .wg-ev:where(.svelte-l8xuza):not(.wg-ev--cancelled) {\n\t\topacity: 0.78;\n\t}\n\n\t/* equalDays: when no cells are marked past, all are full brightness */\n\n\t.wg-cell--weekend.svelte-l8xuza { background: var(--dt-weekend-bg, rgba(15, 15, 15, 0.012)); }\n\n\t/* ─── Disabled cell ──────────────────────────────── */\n\t.wg-cell--disabled.svelte-l8xuza {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tvar(--dt-border, rgba(15, 15, 15, 0.08)) 6px,\n\t\t\tvar(--dt-border, rgba(15, 15, 15, 0.08)) 7px\n\t\t) !important;\n\t}\n\n\t/* ─── Blocked slot indicator ─────────────────────── */\n\t/* A band on the time axis, behind the chips */\n\t.wg-blocked.svelte-l8xuza {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tbox-sizing: border-box;\n\t\toverflow: hidden;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tgap: 3px;\n\t\tpadding: 2px 4px;\n\t\tborder-radius: 0;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 3px,\n\t\t\ttransparent 3px,\n\t\t\ttransparent 6px\n\t\t);\n\t}\n\n\t.wg-blocked-label.svelte-l8xuza {\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ─── Custom day header ──────────────────────────── */\n\t.wg-cell-custom-header.svelte-l8xuza {\n\t\tpadding: 0 4px 2px;\n\t}\n\n\t/* ─── Cell header (day label top-right) ──────────── */\n\t.wg-cell-hd.svelte-l8xuza {\n\t\talign-self: flex-end;\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 4px;\n\t\tpadding: 3px 7px;\n\t\tmargin: 1px 0 2px;\n\t\tborder-radius: 0;\n\t}\n\n\t.wg-day-wd.svelte-l8xuza {\n\t\tfont: 500 12px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-3, rgba(15, 15, 15, 0.38));\n\t}\n\n\t.wg-week--current.svelte-l8xuza .wg-day-wd:where(.svelte-l8xuza) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\n\t.wg-day-num.svelte-l8xuza {\n\t\tfont: 400 15px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\n\t.wg-week--current.svelte-l8xuza .wg-day-num:where(.svelte-l8xuza) {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\n\t/* Today's pill — after the week rules above, which it must beat */\n\t.wg-cell-hd--today.svelte-l8xuza .wg-day-wd:where(.svelte-l8xuza),\n\t.wg-cell-hd--today.svelte-l8xuza .wg-day-num:where(.svelte-l8xuza) {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\t.wg-cell-hd--today.svelte-l8xuza .wg-day-num:where(.svelte-l8xuza) {\n\t\tbox-shadow: inset 0 -2px 0 var(--dt-accent, #1d4fd7);\n\t\tpadding-bottom: 2px;\n\t}\n\n\t/* ─── All-day / multi-day events ─────────────────── */\n\t.wg-allday.svelte-l8xuza {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: var(--wg-chip-gap, 3px);\n\t\tmargin-top: var(--wg-chip-gap, 3px);\n\t\tflex-shrink: 0;\n\t}\n\n\t.wg-ad.svelte-l8xuza {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t\tpadding: 0 5px;\n\t\theight: var(--wg-chip-h, 22px);\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\tborder-radius: 0;\n\t\tborder: none;\n\t\tbackground: var(--ev-color);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\ttransition: filter 0.12s;\n\t\tmin-height: 18px;\n\t}\n\n\t.wg-ad--drag-preview.svelte-l8xuza {\n\t\tposition: relative;\n\t\tz-index: 8;\n\t\topacity: 0.95;\n\t\tpointer-events: none;\n\t\tcursor: grabbing;\n\t}\n\n\t.wg-ad.svelte-l8xuza:hover {\n\t\tfilter: brightness(1.08);\n\t}\n\n\t.wg-ad--selected.svelte-l8xuza {\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);\n\t}\n\n\t.wg-ad.svelte-l8xuza:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff), 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\n\t.wg-ad-title.svelte-l8xuza {\n\t\tfont: 500 13.5px / 1.1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: inherit;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tflex: 1;\n\t}\n\n\t.wg-ad-cont.svelte-l8xuza {\n\t\tdisplay: flex;\n\t\tcolor: inherit;\n\t\tflex-shrink: 0;\n\t}\n\n\t.wg-ad-arrow.svelte-l8xuza {\n\t\tdisplay: flex;\n\t\tcolor: inherit;\n\t\tflex-shrink: 0;\n\t\tmargin-left: auto;\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t/* The day's time axis: chips carry their own margin-top (chipTops), and\n\t   the area fills the cell, so the all-day bars line up at the bottom. */\n\t.wg-cell-events.svelte-l8xuza {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tflex: 1 0 auto;\n\t\tmin-height: var(--wg-time-h, 100px);\n\t}\n\n\t.wg-now.svelte-l8xuza {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 2;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t\ttransform: translateY(-50%);\n\t\tpointer-events: none;\n\t}\n\t.wg-now.svelte-l8xuza::after {\n\t\tcontent: '';\n\t\tflex: 1;\n\t\tborder-top: 2px solid var(--dt-accent, #1d4fd7);\n\t}\n\t.wg-now-time.svelte-l8xuza {\n\t\tfont: 500 11px / 1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tpadding: 2px 4px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--dt-accent, #1d4fd7);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t}\n\t/* Where a dragged-in class would land: the now-line's shape, dashed */\n\t.wg-drop.svelte-l8xuza {\n\t\tz-index: 3;\n\t}\n\t.wg-drop.svelte-l8xuza::after {\n\t\tborder-top-style: dashed;\n\t}\n\n\t.wg-ev.svelte-l8xuza {\n\t\tposition: relative; /* above the blocked bands */\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tflex-wrap: nowrap;\n\t\tgap: 0 5px;\n\t\theight: var(--wg-chip-h, 22px);\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\t/* 3px bar + 6px, and 3px on the right: 12px in all (CHIP_PAD_X) */\n\t\tpadding: 0 3px 0 9px;\n\t\tborder-radius: 0;\n\t\tbackground: transparent;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\ttransition: background 0.12s, box-shadow 0.12s;\n\t}\n\t/* The start bar on the leading edge */\n\t.wg-ev.svelte-l8xuza::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tinset: 0 auto 0 0;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color);\n\t}\n\n\t.wg-ev.svelte-l8xuza:hover {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\n\t.wg-ev--drag-preview.svelte-l8xuza {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 8;\n\t\topacity: 0.95;\n\t\tpointer-events: none;\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t\tcursor: grabbing;\n\t}\n\n\t.wg-ev--selected.svelte-l8xuza {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\n\t.wg-ev--current.svelte-l8xuza {\n\t\tbackground-color: var(--dt-accent-dim, rgba(29, 79, 215, 0.12));\n\t}\n\n\t/* Printed states: struck through, grey, or a dashed bar — never a tint */\n\t.wg-ev--cancelled.svelte-l8xuza .wg-ev-title:where(.svelte-l8xuza) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.wg-ev--cancelled.svelte-l8xuza::before,\n\t.wg-ev--full.svelte-l8xuza::before {\n\t\topacity: 0.45;\n\t}\n\t.wg-ev--tentative.svelte-l8xuza .wg-ev-title:where(.svelte-l8xuza),\n\t.wg-ev--full.svelte-l8xuza .wg-ev-title:where(.svelte-l8xuza) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.wg-ev--tentative.svelte-l8xuza::before,\n\t.wg-ev--limited.svelte-l8xuza::before {\n\t\tbackground: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);\n\t}\n\t.wg-ev--readonly.svelte-l8xuza {\n\t\tcursor: default;\n\t}\n\n\t.wg-ev-time.svelte-l8xuza {\n\t\tfont: 400 14px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t}\n\n\t.wg-ev-title.svelte-l8xuza {\n\t\tfont: 500 15px / 1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmin-width: 0;\n\t\tflex: 1 1 auto;\n\t\t/* A Latin title in RTL keeps its own direction: the ellipsis cuts its end */\n\t\tunicode-bidi: plaintext;\n\t\ttext-align: left;\n\t}\n\t/* …but it sits on the calendar's side, by the bar */\n\t.wg-ev-title.svelte-l8xuza:dir(rtl) { text-align: right; }\n\n\t.wg-ev-loc.svelte-l8xuza {\n\t\tfont: 400 12.5px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0; /* shown only when measured to fit — never squeezed */\n\t}\n\n\t.wg-ev-more.svelte-l8xuza {\n\t\t/* Real button — reset chrome, keep the quiet-link look */\n\t\tappearance: none;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tborder-radius: 0;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tfont: 400 12.5px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\tpadding: 2px 8px;\n\t\tcursor: pointer;\n\t\tflex-shrink: 0;\n\t}\n\n\t.wg-ev-more.svelte-l8xuza:hover {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\n\t.wg-ev-more.svelte-l8xuza:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\n\t/* ─── Focus-visible ──────────────────────────────── */\n\t.wg-cell.svelte-l8xuza:focus-visible {\n\t\toutline: 2px solid var(--dt-text, #0f0f0f);\n\t\toutline-offset: -2px;\n\t}\n\n\t.wg-ev.svelte-l8xuza:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\n\t.wg-ev--dragging.svelte-l8xuza {\n\t\tcursor: grabbing;\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\n\t/* ═══ Container ═══ */\n\t.ag.svelte-n8lbn1 {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\tbox-sizing: border-box;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\n\t.ag--auto.svelte-n8lbn1 { height: auto; overflow: visible; }\n\n\t/* Button UA reset for interactive cards/rows (real <button>s for a11y).\n\t   Placed first so later component rules override it.\n\t   user-select is scoped here (not on .ag) so event text stays copyable. */\n\t.ag-card.svelte-n8lbn1,\n\t.ag-allday-chip.svelte-n8lbn1,\n\t.ag-compact-row.svelte-n8lbn1,\n\t.ag-q-now.svelte-n8lbn1,\n\t.ag-q-done-item.svelte-n8lbn1,\n\t.ag-log-row.svelte-n8lbn1,\n\t.ag-q-done-toggle.svelte-n8lbn1 {\n\t\tfont: inherit;\n\t\tcolor: inherit;\n\t\ttext-align: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tbox-sizing: border-box;\n\t\tuser-select: none;\n\t}\n\n\t.ag--disabled.svelte-n8lbn1 {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 12px\n\t\t);\n\t}\n\n\t/* ═══ Body ═══ */\n\t.ag-body.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\tpadding-top: 8px;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-border) transparent;\n\t}\n\n\t/* ═══ In-view date header ═══ */\n\t.ag-day-head.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 0 16px 6px;\n\t\tflex-shrink: 0;\n\t}\n\t/* The planner's header type: the day number is the typography (40/400,\n\t   narrowed), the weekday a tracked 12/500 label; today takes the accent. */\n\t.ag-day-head-num.svelte-n8lbn1 {\n\t\tfont: 400 40px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 90%;\n\t\tletter-spacing: -0.02em;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tmargin-inline-end: 4px;\n\t}\n\t.ag-day-head-badge.svelte-n8lbn1,\n\t.ag-day-head-name.svelte-n8lbn1 {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-day-head--today.svelte-n8lbn1 .ag-day-head-num:where(.svelte-n8lbn1),\n\t.ag-day-head--today.svelte-n8lbn1 .ag-day-head-name:where(.svelte-n8lbn1),\n\t.ag-day-head-badge.svelte-n8lbn1 {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-day-head.svelte-n8lbn1 .ag-day-head-badge--muted:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-day-head-date.svelte-n8lbn1 {\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag--auto.svelte-n8lbn1 .ag-body:where(.svelte-n8lbn1) { overflow-y: visible; min-height: auto; }\n\t.ag-body.svelte-n8lbn1::-webkit-scrollbar {\n\t\twidth: 4px;\n\t}\n\t.ag-body.svelte-n8lbn1::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-border);\n\t\tborder-radius: 0;\n\t}\n\n\t/* ═══ All-day strip ═══ */\n\t.ag-allday.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t\tpadding: 6px 16px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\t.ag-allday-label.svelte-n8lbn1 {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.08em;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-items.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 6px;\n\t}\n\t/* An all-day event is a solid band in its colour — no tint, no dot, no pill. */\n\t.ag-allday-chip.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tpadding: 4px 10px;\n\t\tborder-radius: 0;\n\t\tborder: none;\n\t\tbackground: var(--ev-color);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\tcursor: pointer;\n\t}\n\t@media (pointer: coarse) {\n\t\t.ag-allday-chip.svelte-n8lbn1 {\n\t\t\tmin-height: 44px;\n\t\t}\n\t\t.ag-q-done-item.svelte-n8lbn1 {\n\t\t\tmin-height: 44px;\n\t\t\talign-items: center;\n\t\t}\n\t}\n\t.ag-allday-chip.svelte-n8lbn1:hover,\n\t.ag-allday-chip.svelte-n8lbn1:active {\n\t\tfilter: brightness(1.08);\n\t}\n\t.ag-allday-chip.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff), 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-allday-chip--selected.svelte-n8lbn1 {\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);\n\t}\n\t.ag-allday-dot.svelte-n8lbn1 {\n\t\tdisplay: none;\n\t}\n\t.ag-allday-title.svelte-n8lbn1 {\n\t\tfont: 500 13.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: inherit;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ═══ Shared: event card ═══ */\n\t/* Paper, not a tinted card: a 3px start bar in the event colour, a\n\t   hairline rule beneath, ink text. Hover is a wash, selection a ring. */\n\t.ag-card.svelte-n8lbn1 {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\tborder-radius: 0;\n\t\tbackground: transparent;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tborder: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, box-shadow 150ms;\n\t}\n\t.ag-card.svelte-n8lbn1::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color);\n\t}\n\t.ag-card.svelte-n8lbn1:hover,\n\t.ag-card.svelte-n8lbn1:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.ag-card.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-card--selected.svelte-n8lbn1 {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\t.ag-card--cancelled.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-card--cancelled.svelte-n8lbn1::before,\n\t.ag-card--full.svelte-n8lbn1::before {\n\t\topacity: 0.45;\n\t}\n\t.ag-card--tentative.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1),\n\t.ag-card--limited.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1),\n\t.ag-card--full.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-card--tentative.svelte-n8lbn1::before,\n\t.ag-card--limited.svelte-n8lbn1::before {\n\t\tbackground: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);\n\t}\n\t/* Planner scale: title 15/500, time 14 tabular in ink, meta 12.5 in ink-2.\n\t   The body keeps a reading measure so meta never drifts across a wide row. */\n\t.ag-card-body.svelte-n8lbn1 {\n\t\tpadding: 10px 12px 10px 15px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 3px;\n\t\tmin-width: 0;\n\t\tmax-width: 44rem;\n\t\tflex: 1;\n\t}\n\t.ag-card-top.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 12px;\n\t\tmin-width: 0;\n\t}\n\t.ag-card-title.svelte-n8lbn1 {\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tword-break: break-word;\n\t\tmin-width: 0;\n\t}\n\t.ag-card-meta.svelte-n8lbn1 {\n\t\tfont: 400 14px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.ag-card-dur.svelte-n8lbn1,\n\t.ag-card-eta.svelte-n8lbn1,\n\t.ag-card-sub.svelte-n8lbn1,\n\t.ag-card-loc.svelte-n8lbn1,\n\t.ag-card-tag.svelte-n8lbn1 {\n\t\tfont: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-card-dur.svelte-n8lbn1 {\n\t\tmargin-left: 8px;\n\t}\n\t.ag-card-tags.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tcolumn-gap: 10px;\n\t\trow-gap: 2px;\n\t\tflex-wrap: wrap;\n\t}\n\t.ag-card-tag.svelte-n8lbn1 {\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ── Queue card variant ── */\n\t.ag-card--q.svelte-n8lbn1 {\n\t\ttransition: background 150ms, box-shadow 150ms;\n\t}\n\t.ag-compact-row--queue.svelte-n8lbn1 {\n\t\tmargin: 0;\n\t}\n\t.ag-card-eta.svelte-n8lbn1 {\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t\tfont-variant-numeric: tabular-nums;\n\t}\n\t/* The next one up: its countdown in ink. Size stays on the scale — the\n\t   happening-now item is the largest thing in the queue. */\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-eta:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\n\t/* ── Plan card variant ── */\n\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 12px 14px;\n\t}\n\t.ag-card-order.svelte-n8lbn1 {\n\t\tfont: 400 14px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tmin-width: 18px;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-top:where(.svelte-n8lbn1) {\n\t\tgap: 10px;\n\t}\n\t/* Everything under the title aligns past the order number — the\n\t   subtitle, location, time and tags share one left edge. */\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-sub:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-loc:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-meta:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-tags:where(.svelte-n8lbn1) {\n\t\tpadding-left: 28px;\n\t}\n\n\t/* ═══ The Queue: 2-column grid ═══ */\n\t.ag-q.svelte-n8lbn1 {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr 1.8fr;\n\t\tgap: 0;\n\t\tflex: 1;\n\t\tpadding: 8px 0 10px;\n\t\tmin-height: 0;\n\t}\n\t/* Mobile: one column in reading order — what's happening now first, then\n\t   \"Up next\", then the finished ones. The status column dissolves\n\t   (display: contents) so its Now and Done parts can sit either side of\n\t   the queue. */\n\t/* Horizontal swipes are ours (day navigation); the browser keeps\n\t   vertical scrolling and pinch-zoom. */\n\t.ag--mobile.svelte-n8lbn1,\n\t.ag--mobile.svelte-n8lbn1 .ag-body:where(.svelte-n8lbn1) {\n\t\ttouch-action: pan-y pinch-zoom;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q:where(.svelte-n8lbn1) {\n\t\tgrid-template-columns: 1fr;\n\t\tmin-height: auto;\n\t\tpadding-inline: 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-status:where(.svelte-n8lbn1) {\n\t\tdisplay: contents;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-queue:where(.svelte-n8lbn1) {\n\t\torder: 2;\n\t\toverflow-y: visible;\n\t\tpadding: 12px 0 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-done-section:where(.svelte-n8lbn1) {\n\t\torder: 3;\n\t}\n\t/* Mobile: larger touch targets; type is already on the planner scale. */\n\t.ag--mobile.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-row:where(.svelte-n8lbn1) {\n\t\tpadding: 12px 0;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-done-item:where(.svelte-n8lbn1) {\n\t\tpadding: 8px 0;\n\t}\n\t/* Section labels set like the planner's weekday: 12/500, tracked, ink-2. */\n\t.ag-q-label.svelte-n8lbn1 {\n\t\tfont: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tmargin-bottom: 8px;\n\t\tpadding: 0 12px;\n\t}\n\t.ag-q-empty.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tflex: 1;\n\t\tfont-size: 14px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\n\t/* ── NOW column (includes Done above) ── */\n\t.ag-q-status.svelte-n8lbn1 {\n\t\tpadding: 0 10px 0 14px;\n\t\tborder-right: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-q-status.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1 {\n\t\talign-self: flex-start;\n\t\tmargin-top: 2px;\n\t\tpadding: 3px 8px;\n\t\tborder: 1px solid var(--dt-border);\n\t\tborder-radius: 0;\n\t\tbackground: none;\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tfont-size: 12.5px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tcursor: pointer;\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1:hover,\n\t.ag-q-done-toggle.svelte-n8lbn1:active {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tborder-color: var(--dt-border-day, rgba(15, 15, 15, 0.6));\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\t.ag-q-now-sub.svelte-n8lbn1 {\n\t\tfont: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tmargin-bottom: 4px;\n\t}\n\t.ag-q-done-section.svelte-n8lbn1 {\n\t\tmargin-top: 12px;\n\t\tpadding-top: 10px;\n\t\tborder-top: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\t.ag-q-clock.svelte-n8lbn1 {\n\t\tfont: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t\tmargin-left: 4px;\n\t}\n\t/* The one happening now is the most prominent thing on the day: the\n\t   largest title in the view and the 12% accent wash the system reserves\n\t   for the current event. */\n\t.ag-q-now.svelte-n8lbn1 {\n\t\tposition: relative;\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 12px 12px 12px 15px;\n\t\tmargin-bottom: 8px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--dt-accent-dim, color-mix(in srgb, var(--dt-accent, #1d4fd7) 12%, transparent));\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tborder: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, box-shadow 150ms;\n\t}\n\t.ag-q-now.svelte-n8lbn1::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t}\n\t.ag-q-now.svelte-n8lbn1:hover,\n\t.ag-q-now.svelte-n8lbn1:active {\n\t\tbackground:\n\t\t\tlinear-gradient(var(--_fill), var(--_fill)),\n\t\t\tlinear-gradient(var(--dt-hover, rgba(15, 15, 15, 0.04)), var(--dt-hover, rgba(15, 15, 15, 0.04))),\n\t\t\tvar(--dt-accent-dim, color-mix(in srgb, var(--dt-accent, #1d4fd7) 12%, transparent));\n\t}\n\t.ag-q-now.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-q-now--selected.svelte-n8lbn1 {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color, var(--dt-accent));\n\t}\n\t.ag-q-now-dot.svelte-n8lbn1 {\n\t\twidth: 8px;\n\t\theight: 8px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent, #1d4fd7));\n\t\tmargin-bottom: 8px;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-q-now-fill.svelte-n8lbn1 {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\t.ag-q-now-title.svelte-n8lbn1 {\n\t\tfont: 500 20px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\toverflow: hidden;\n\t\tword-break: break-word;\n\t\tmargin-bottom: 4px;\n\t}\n\t.ag-q-now-time.svelte-n8lbn1 {\n\t\tfont: 400 14px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tmargin-bottom: 10px;\n\t}\n\t.ag-q-now-track.svelte-n8lbn1 {\n\t\theight: 2px;\n\t\tbackground: var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tborder-radius: 0;\n\t\toverflow: hidden;\n\t}\n\t.ag-q-now-fill.svelte-n8lbn1 {\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tbackground: var(--ev-color, var(--dt-accent, #1d4fd7));\n\t\tborder-radius: 0;\n\t\ttransform-origin: left;\n\t\ttransition: transform 1s linear;\n\t}\n\t.ag-q-free.svelte-n8lbn1 {\n\t\tpadding: 8px 10px;\n\t\tmargin-right: 10px;\n\t}\n\t.ag-q-free-label.svelte-n8lbn1 {\n\t\tfont: 400 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tmargin-bottom: 2px;\n\t}\n\n\t/* ── NEXT: hero center column ── */\n\t.ag-q-queue.svelte-n8lbn1 {\n\t\tpadding: 0 16px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 8px;\n\t}\n\t.ag-q-queue.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\n\n\t.ag-q-done-item.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 4px 0;\n\t\twidth: 100%;\n\t\tcursor: pointer;\n\t}\n\t.ag-q-done-item.svelte-n8lbn1:hover .ag-q-done-title:where(.svelte-n8lbn1),\n\t.ag-q-done-item.svelte-n8lbn1:active .ag-q-done-title:where(.svelte-n8lbn1),\n\t.ag-q-done-item--selected.svelte-n8lbn1 .ag-q-done-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.ag-q-done-item.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t\tborder-radius: 0;\n\t}\n\t.ag-q-done-check.svelte-n8lbn1 {\n\t\tfont-size: 12.5px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tflex-shrink: 0;\n\t}\n\t/* Finished: quieter ink, no strike (strikethrough means cancelled). */\n\t.ag-q-done-title.svelte-n8lbn1 {\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t}\n\n\t/* ═══ Past Day: \"The Log\" ═══\n\t   Dim comes from text tokens only (single layer) — no subtree opacity. */\n\t.ag-log.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-log.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\t.ag-log-row.svelte-n8lbn1 {\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 10px;\n\t\tpadding: 8px 0;\n\t\twidth: 100%;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tcursor: pointer;\n\t}\n\t.ag-log-row.svelte-n8lbn1:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.ag-log-row.svelte-n8lbn1:hover .ag-log-title:where(.svelte-n8lbn1),\n\t.ag-log-row.svelte-n8lbn1:active .ag-log-title:where(.svelte-n8lbn1),\n\t.ag-log-row--selected.svelte-n8lbn1 .ag-log-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.ag-log-row.svelte-n8lbn1:hover,\n\t.ag-log-row.svelte-n8lbn1:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.ag-log-row.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t\tborder-radius: 0;\n\t}\n\t.ag-log-row--selected.svelte-n8lbn1 {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t\tborder-radius: 0;\n\t}\n\t.ag-log-check.svelte-n8lbn1 {\n\t\tfont-size: 12.5px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tflex-shrink: 0;\n\t}\n\t.ag-log-time.svelte-n8lbn1 {\n\t\tfont: 400 14px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tmin-width: 4.6em;\n\t\tflex-shrink: 0;\n\t}\n\t/* The colour dot of a past row becomes its 3px start bar (dimmed: it is over). */\n\t.ag-log-dot.svelte-n8lbn1 {\n\t\talign-self: stretch;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tborder-radius: 0;\n\t\tflex-shrink: 0;\n\t\topacity: 0.45;\n\t}\n\t/* A past day is over, not struck out: quieter ink, sized like the planner.\n\t   Strikethrough is kept for cancelled events only. */\n\t.ag-log-title.svelte-n8lbn1 {\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tflex: 0 1 auto;\n\t\tmin-width: 0;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t\ttext-align: left;\n\t}\n\t.ag-log-row--cancelled.svelte-n8lbn1 .ag-log-title:where(.svelte-n8lbn1) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-log-dur.svelte-n8lbn1 {\n\t\tfont: 400 12.5px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tflex-shrink: 0;\n\t}\n\n\t/* ═══ Compact Day ═══ */\n\t.ag-compact-list.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-compact-list.svelte-n8lbn1::-webkit-scrollbar { display: none; }\n\t/* A compact row: 3px start bar, hairline beneath, ink text. */\n\t.ag-compact-row.svelte-n8lbn1 {\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 10px;\n\t\tpadding: 5px 0 5px 11px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\twidth: 100%;\n\t}\n\t.ag-compact-row.svelte-n8lbn1::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t}\n\t.ag-compact-row--selected.svelte-n8lbn1 {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\t.ag-compact-row.svelte-n8lbn1:hover .ag-compact-row-title:where(.svelte-n8lbn1),\n\t.ag-compact-row.svelte-n8lbn1:active .ag-compact-row-title:where(.svelte-n8lbn1) { color: var(--dt-text); }\n\t.ag-compact-row.svelte-n8lbn1:hover,\n\t.ag-compact-row.svelte-n8lbn1:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.ag-compact-row.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-compact-row-time.svelte-n8lbn1 {\n\t\tfont: 400 14px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tmin-width: 4.6em;\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t}\n\t/* Title + subtitle + tags cluster, sized to its content so the meta and\n\t   duration sit beside the title instead of across a wide row. One line\n\t   while it fits; on mobile the metadata wraps to a second line under the\n\t   title instead of crushing it. */\n\t.ag-compact-row-main.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 10px;\n\t\tflex: 0 1 auto;\n\t\tmin-width: 0;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-main:where(.svelte-n8lbn1) {\n\t\tflex: 1;\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t/* Mobile: size the title by its content when deciding line breaks — a long\n\t   title claims the first line whole (ellipsizing only against the full row)\n\t   and pushes subtitle/tags down instead of truncating at 35%. */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) {\n\t\tflex-basis: auto;\n\t}\n\t/* On its own wrapped line the subtitle gets the full width */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-sub:where(.svelte-n8lbn1) {\n\t\tmax-width: 100%;\n\t}\n\t.ag-compact-row-title.svelte-n8lbn1 {\n\t\tfont: 500 15px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tflex: 0 1 auto;\n\t\t/* The title is the row's identity — never let subtitle/tags/duration\n\t\t   squeeze it out on narrow screens (min-width: 0 resolves to 0px). */\n\t\tmin-width: 6em;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t\ttext-align: left;\n\t}\n\t.ag-compact-row-dur.svelte-n8lbn1,\n\t.ag-compact-row-sub.svelte-n8lbn1,\n\t.ag-compact-row-tag.svelte-n8lbn1 {\n\t\tfont: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\twhite-space: nowrap;\n\t}\n\t.ag-compact-row-dur.svelte-n8lbn1 {\n\t\tfont-variant-numeric: tabular-nums;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-compact-row-sub.svelte-n8lbn1 {\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\tmax-width: 45%;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-row-tag.svelte-n8lbn1 {\n\t\tflex-shrink: 1;\n\t\tmin-width: 2.5em;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-row--cancelled.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-compact-row--cancelled.svelte-n8lbn1::before { opacity: 0.45; }\n\t.ag-compact-row--tentative.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) { color: var(--dt-text-2, rgba(15, 15, 15, 0.54)); }\n\t.ag-compact-row--tentative.svelte-n8lbn1::before {\n\t\tbackground: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);\n\t}\n\t/* Mobile: larger touch targets for compact rows */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row:where(.svelte-n8lbn1) { padding: 8px 0 8px 11px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head:where(.svelte-n8lbn1) { padding: 0 16px 8px; }\n\n\t/* ═══ Future Day: \"The Plan\" ═══ */\n\t.ag-plan.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 6px;\n\t}\n\t.ag-plan.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\n\t/* ═══ Container ═══ */\n\t.ag.svelte-uhwfyj {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\tbox-sizing: border-box;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\t.ag--auto.svelte-uhwfyj {\n\t\theight: auto;\n\t\toverflow: visible;\n\t}\n\n\t/* Button UA reset for interactive cards/rows (real <button>s for a11y).\n\t   Placed first so later component rules override it. */\n\t.ag-card.svelte-uhwfyj,\n\t.ag-allday-chip.svelte-uhwfyj,\n\t.ag-compact.svelte-uhwfyj,\n\t.ag-compact-more.svelte-uhwfyj,\n\t.ag-past-toggle.svelte-uhwfyj {\n\t\tfont: inherit;\n\t\tcolor: inherit;\n\t\ttext-align: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tbox-sizing: border-box;\n\t}\n\n\t/* ═══ Body ═══ */\n\t.ag-body.svelte-uhwfyj {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\tbox-sizing: border-box;\n\t\t/* No padding-top here: the sticky day headers pin at the scrollport\n\t\t   edge, and container padding would leave a see-through band above\n\t\t   them where scrolled cards bleed out. */\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-border) transparent;\n\t}\n\t.ag-wday.svelte-uhwfyj:first-child .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding-top: 12px;\n\t}\n\t.ag--auto.svelte-uhwfyj .ag-body:where(.svelte-uhwfyj) {\n\t\toverflow-y: visible;\n\t}\n\t.ag-body.svelte-uhwfyj::-webkit-scrollbar {\n\t\twidth: 4px;\n\t}\n\t.ag-body.svelte-uhwfyj::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-border);\n\t\tborder-radius: 0;\n\t}\n\n\t/* ═══ All-day chips ═══ */\n\t.ag-allday.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 4px;\n\t\tpadding: 4px 14px 6px;\n\t}\n\t/* An all-day event is a solid band in its colour — no tint, no dot, no pill. */\n\t.ag-allday-chip.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 6px;\n\t\tpadding: 4px 10px;\n\t\tborder-radius: 0;\n\t\tborder: none;\n\t\tbackground: var(--ev-color);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\tcursor: pointer;\n\t}\n\t.ag-allday-chip.svelte-uhwfyj:hover,\n\t.ag-allday-chip.svelte-uhwfyj:active {\n\t\tfilter: brightness(1.08);\n\t}\n\t.ag-allday-chip.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff), 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-allday-chip--selected.svelte-uhwfyj {\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);\n\t}\n\t.ag-allday-dot.svelte-uhwfyj {\n\t\tdisplay: none;\n\t}\n\t.ag-allday-title.svelte-uhwfyj {\n\t\tfont: 500 13.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: inherit;\n\t\twhite-space: nowrap;\n\t}\n\t.ag-allday-span.svelte-uhwfyj {\n\t\tfont: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: inherit;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ═══ Shared: event card ═══ */\n\t/* Paper, not a tinted card: a 3px start bar in the event colour, a\n\t   hairline rule beneath, ink text. Hover is a wash, selection a ring. */\n\t.ag-card.svelte-uhwfyj {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\t/* A <button> shrinks to its content; the NOW card sits outside the\n\t\t   stretching slot column, so it claims the row explicitly. */\n\t\twidth: 100%;\n\t\talign-items: stretch;\n\t\tborder-radius: 0;\n\t\tbackground: transparent;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tborder: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, box-shadow 150ms;\n\t}\n\t.ag-card.svelte-uhwfyj::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color);\n\t}\n\t.ag-card.svelte-uhwfyj:hover,\n\t.ag-card.svelte-uhwfyj:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.ag-card.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-card--selected.svelte-uhwfyj {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\t.ag-card--cancelled.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-card--cancelled.svelte-uhwfyj::before,\n\t.ag-card--full.svelte-uhwfyj::before {\n\t\topacity: 0.45;\n\t}\n\t.ag-card--tentative.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj),\n\t.ag-card--limited.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj),\n\t.ag-card--full.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-card--tentative.svelte-uhwfyj::before,\n\t.ag-card--limited.svelte-uhwfyj::before {\n\t\tbackground: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);\n\t}\n\t/* Planner scale: title 15/500, time 14 tabular in ink, meta 12.5 in ink-2.\n\t   The body keeps a reading measure so meta never drifts across a wide row. */\n\t.ag-card-body.svelte-uhwfyj {\n\t\tpadding: 8px 10px 8px 13px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 3px;\n\t\tmin-width: 0;\n\t\tmax-width: 44rem;\n\t\tflex: 1;\n\t}\n\t.ag-card-title.svelte-uhwfyj {\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tword-break: break-word;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\toverflow: hidden;\n\t}\n\t.ag-card-meta.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tflex-wrap: wrap;\n\t\tcolumn-gap: 8px;\n\t\trow-gap: 2px;\n\t\tfont: 400 14px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.ag-card-dur.svelte-uhwfyj,\n\t.ag-card-eta.svelte-uhwfyj,\n\t.ag-card-sub.svelte-uhwfyj,\n\t.ag-card-loc.svelte-uhwfyj,\n\t.ag-card-tag.svelte-uhwfyj {\n\t\tfont: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-card-tags.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tcolumn-gap: 10px;\n\t\trow-gap: 2px;\n\t\tflex-wrap: wrap;\n\t}\n\t.ag-card-tag.svelte-uhwfyj {\n\t\twhite-space: nowrap;\n\t}\n\t.ag-card-progress.svelte-uhwfyj {\n\t\theight: 3px;\n\t\tbackground: var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tborder-radius: 0;\n\t\toverflow: hidden;\n\t\tmargin-top: 2px;\n\t}\n\t.ag-card-progress-fill.svelte-uhwfyj {\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tborder-radius: 0;\n\t\ttransform-origin: left;\n\t\ttransition: transform 1s linear;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-card-progress-fill.svelte-uhwfyj {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\n\t/* ═══ Week day groups ═══ */\n\t.ag-wday.svelte-uhwfyj {\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\t.ag-wday.svelte-uhwfyj:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.ag-wday--today.svelte-uhwfyj {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #1d4fd7) 2%, transparent);\n\t}\n\t/* Past days: quieter ink from the text tokens, no subtree opacity */\n\t.ag-wday--past.svelte-uhwfyj .ag-wday-num:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-wday--past.svelte-uhwfyj .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 8px 20px 2px;\n\t}\n\t.ag-wday--disabled.svelte-uhwfyj {\n\t\tposition: relative;\n\t}\n\t.ag-wday--disabled.svelte-uhwfyj::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 4px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 8%, transparent) 4px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 8%, transparent) 8px\n\t\t);\n\t\tpointer-events: none;\n\t}\n\t.ag-wday-custom-header.svelte-uhwfyj {\n\t\tpadding: 2px 0 4px;\n\t}\n\n\t.ag-wday-head--click.svelte-uhwfyj,\n\t.ag-wday-empty--click.svelte-uhwfyj {\n\t\tcursor: pointer;\n\t}\n\t.ag-wday-head--click.svelte-uhwfyj:focus-visible,\n\t.ag-wday-empty--click.svelte-uhwfyj:focus-visible {\n\t\toutline: 2px solid var(--dt-text, #0f0f0f);\n\t\toutline-offset: -2px;\n\t\tborder-radius: 0;\n\t}\n\t.ag-wday-head.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tpadding: 8px 20px;\n\t\tposition: sticky;\n\t\ttop: 0;\n\t\tbackground: var(--dt-bg, #efebe9);\n\t\tz-index: 1;\n\t\t/* Own compositor layer: without it, fast (async) scrolling repaints\n\t\t   the pinned header a frame late and a gap flashes above it. */\n\t\ttransform: translateZ(0);\n\t\twill-change: transform;\n\t}\n\t.ag-wday-head-left.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t}\n\t/* The planner's header type: the day number is the typography (40/400,\n\t   narrowed), the weekday a tracked 12/500 label; today takes the accent. */\n\t.ag-wday-num.svelte-uhwfyj {\n\t\tfont: 400 40px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 90%;\n\t\tletter-spacing: -0.02em;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tmargin-inline-end: 4px;\n\t}\n\t.ag-wday-badge.svelte-uhwfyj,\n\t.ag-wday-name.svelte-uhwfyj {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-wday--today.svelte-uhwfyj .ag-wday-num:where(.svelte-uhwfyj),\n\t.ag-wday--today.svelte-uhwfyj .ag-wday-name:where(.svelte-uhwfyj),\n\t.ag-wday-badge.svelte-uhwfyj {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-wday.svelte-uhwfyj .ag-wday-badge--muted:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t/* Set like the weekday beside it, so the heading reads in one case */\n\t.ag-wday-date.svelte-uhwfyj {\n\t\tfont: 400 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\n\t.ag-wday-empty.svelte-uhwfyj {\n\t\tpadding: 2px 20px 8px;\n\t\tfont-size: 12.5px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\n\t/* Expanded day */\n\t.ag-wday-expanded.svelte-uhwfyj {\n\t\tpadding: 0 20px 10px;\n\t}\n\t.ag-wslot.svelte-uhwfyj {\n\t\tmargin-bottom: 4px;\n\t}\n\t.ag-wslot-header.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 2px 0;\n\t}\n\t.ag-wslot-now.svelte-uhwfyj {\n\t\tfont: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-wslot-cards.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t}\n\t.ag-wslot-cards--multi.svelte-uhwfyj {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n\t\tgap: 4px;\n\t}\n\t.ag-wday-past-line.svelte-uhwfyj {\n\t\tfont-size: 12.5px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tpadding: 6px 0 0;\n\t}\n\t.ag-wday-past-line--summary.svelte-uhwfyj {\n\t\tpadding: 0 20px 8px;\n\t}\n\t/* \"✓ N completed\" is a disclosure — tap to reveal the finished events */\n\t.ag-past-toggle.svelte-uhwfyj {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tcursor: pointer;\n\t\tmin-height: 32px;\n\t\ttransition: color 150ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.ag-past-toggle.svelte-uhwfyj:hover,\n\t.ag-past-toggle.svelte-uhwfyj:active {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.ag-past-toggle.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t\tborder-radius: 0;\n\t}\n\t.ag-past-chevron.svelte-uhwfyj {\n\t\ttransition: transform 120ms;\n\t}\n\t.ag-past-chevron--open.svelte-uhwfyj {\n\t\ttransform: rotate(180deg);\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-past-chevron.svelte-uhwfyj { transition: none; }\n\t}\n\t/* Revealed completed events: quieter ink (single token layer). Strikethrough\n\t   is kept for cancelled only, so \"done\" and \"called off\" never read alike. */\n\t.ag-compact--done.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj),\n\t.ag-compact--done.svelte-uhwfyj .ag-compact-time:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.ag-compact--done.svelte-uhwfyj::before {\n\t\topacity: 0.45;\n\t}\n\n\t/* Compact day events */\n\t.ag-wday-compact.svelte-uhwfyj {\n\t\tpadding: 0 20px 8px;\n\t}\n\t/* A compact row: 3px start bar, hairline beneath, ink text. */\n\t.ag-compact.svelte-uhwfyj {\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 10px;\n\t\tpadding: 5px 0 5px 11px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\twidth: 100%;\n\t}\n\t.ag-compact.svelte-uhwfyj::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t}\n\t.ag-compact--selected.svelte-uhwfyj {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\t.ag-compact.svelte-uhwfyj:hover .ag-compact-title:where(.svelte-uhwfyj),\n\t.ag-compact.svelte-uhwfyj:active .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text);\n\t}\n\t.ag-compact.svelte-uhwfyj:hover,\n\t.ag-compact.svelte-uhwfyj:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.ag-compact.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\t.ag-compact-time.svelte-uhwfyj {\n\t\tfont: 400 14px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tmin-width: 4.4em;\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t}\n\t/* Title + location + subtitle + tags cluster, sized to its content so the\n\t   meta and duration sit beside the title instead of across a wide row.\n\t   One line while it fits; on mobile the metadata wraps to a second line\n\t   instead of crushing the title. */\n\t.ag-compact-main.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 10px;\n\t\tflex: 0 1 auto;\n\t\tmin-width: 0;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-main:where(.svelte-uhwfyj) {\n\t\tflex: 1;\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t/* Mobile: size the title by its content when deciding line breaks — a long\n\t   title claims the first line whole (ellipsizing only against the full row)\n\t   and pushes location/subtitle/tags down instead of truncating at 35%. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tflex-basis: auto;\n\t}\n\t/* On their own wrapped line the metadata gets the full width — the tight\n\t   desktop caps would truncate it beside empty space. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-loc:where(.svelte-uhwfyj),\n\t.ag--mobile.svelte-uhwfyj .ag-compact-sub:where(.svelte-uhwfyj) {\n\t\tmax-width: 100%;\n\t}\n\t.ag-compact-title.svelte-uhwfyj {\n\t\tfont: 500 15px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tflex: 0 1 auto;\n\t\t/* The title is the row's identity — never let subtitle/tags/duration\n\t\t   squeeze it out on narrow screens (min-width: 0 resolves to 0px). */\n\t\tmin-width: 6em;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t}\n\t.ag-compact-dur.svelte-uhwfyj,\n\t.ag-compact-sub.svelte-uhwfyj,\n\t.ag-compact-loc.svelte-uhwfyj,\n\t.ag-compact-tag.svelte-uhwfyj {\n\t\tfont: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\twhite-space: nowrap;\n\t}\n\t.ag-compact-dur.svelte-uhwfyj {\n\t\tfont-variant-numeric: tabular-nums;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-compact-sub.svelte-uhwfyj {\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-width: 160px;\n\t}\n\t.ag-compact-loc.svelte-uhwfyj {\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-width: 140px;\n\t}\n\t.ag-compact--cancelled.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-compact--cancelled.svelte-uhwfyj::before,\n\t.ag-compact--full.svelte-uhwfyj::before {\n\t\topacity: 0.45;\n\t}\n\t.ag-compact--tentative.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj),\n\t.ag-compact--limited.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj),\n\t.ag-compact--full.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.ag-compact--tentative.svelte-uhwfyj::before,\n\t.ag-compact--limited.svelte-uhwfyj::before {\n\t\tbackground: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);\n\t}\n\t.ag-compact-tag.svelte-uhwfyj {\n\t\tflex-shrink: 1;\n\t\tmin-width: 2.5em;\n\t\tmax-width: 120px;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-more.svelte-uhwfyj {\n\t\tfont-size: 12.5px;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t\tpadding: 4px 0 0 11px;\n\t\tcursor: pointer;\n\t\tdisplay: block;\n\t}\n\t.ag-compact-more.svelte-uhwfyj:hover,\n\t.ag-compact-more.svelte-uhwfyj:active {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.ag-compact-more.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t\tborder-radius: 0;\n\t}\n\n\t/* ═══ Day-drop drag ═══ */\n\t.ag-card--drag.svelte-uhwfyj {\n\t\topacity: 0.4;\n\t}\n\t.ag-wday--drop.svelte-uhwfyj {\n\t\tbackground: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t\tbox-shadow: inset 0 0 0 1px var(--dt-accent, #1d4fd7);\n\t}\n\n\t/* ═══ Timetable columns (desktop) ═══ */\n\t.ag--cols.svelte-uhwfyj .ag-body:where(.svelte-uhwfyj) {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(var(--ag-cols, 7), minmax(0, 1fr));\n\t}\n\t/* Columns stretch to the tallest day, so the separator runs full height */\n\t.ag--cols.svelte-uhwfyj .ag-wday:where(.svelte-uhwfyj) {\n\t\tborder-bottom: none;\n\t\tborder-inline-start: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tmin-width: 0;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-wday:where(.svelte-uhwfyj):first-child {\n\t\tborder-inline-start: none;\n\t}\n\t/* Uniform head padding — the :first-child top bump would misalign columns.\n\t   Also overrides the past-day head variant (extra class = higher specificity). */\n\t.ag--cols.svelte-uhwfyj .ag-wday:where(.svelte-uhwfyj) .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 10px 8px;\n\t}\n\t/* Badge + name + date won't fit one line in a ~160px column */\n\t.ag--cols.svelte-uhwfyj .ag-wday-head-left:where(.svelte-uhwfyj) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-wday-expanded:where(.svelte-uhwfyj),\n\t.ag--cols.svelte-uhwfyj .ag-wday-compact:where(.svelte-uhwfyj),\n\t.ag--cols.svelte-uhwfyj .ag-wday-empty:where(.svelte-uhwfyj),\n\t.ag--cols.svelte-uhwfyj .ag-wday-past-line--summary:where(.svelte-uhwfyj) {\n\t\tpadding-left: 10px;\n\t\tpadding-right: 10px;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-allday:where(.svelte-uhwfyj) {\n\t\tpadding-left: 10px;\n\t\tpadding-right: 10px;\n\t}\n\t/* Narrow cards: long titles get a third line, meta wraps instead of clipping */\n\t.ag--cols.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\t-webkit-line-clamp: 3;\n\t\tline-clamp: 3;\n\t}\n\t.ag--cols.svelte-uhwfyj .ag-card-meta:where(.svelte-uhwfyj) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 3px;\n\t}\n\n\t/* ═══ Mobile adaptations ═══ */\n\t/* Horizontal swipes are ours (week navigation); the browser keeps\n\t   vertical scrolling and pinch-zoom. */\n\t.ag--mobile.svelte-uhwfyj,\n\t.ag--mobile.svelte-uhwfyj .ag-body:where(.svelte-uhwfyj) {\n\t\ttouch-action: pan-y pinch-zoom;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 16px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-expanded:where(.svelte-uhwfyj) {\n\t\tpadding: 0 16px 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-compact:where(.svelte-uhwfyj) {\n\t\tpadding: 0 16px 12px;\n\t}\n\t/* Type is already on the planner scale; phones only get bigger targets. */\n\t.ag--mobile.svelte-uhwfyj .ag-card-body:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 14px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact:where(.svelte-uhwfyj) {\n\t\tpadding: 8px 0 8px 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-more:where(.svelte-uhwfyj) {\n\t\tpadding-top: 6px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wslot-cards--multi:where(.svelte-uhwfyj) {\n\t\tgrid-template-columns: 1fr;\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.mb.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\toverflow: hidden;\n\t\tbackground: var(--dt-bg, #efebe9);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\ttouch-action: pan-y pinch-zoom;\n\t}\n\t.mb--auto.svelte-zbkzcp { overflow: visible; }\n\n\t/* ─── Swipe wrapper (follows the finger) ─────────── */\n\t.mb-swipe.svelte-zbkzcp {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tposition: relative;\n\t}\n\t.mb-swipe--animate.svelte-zbkzcp {\n\t\ttransition: transform 180ms ease;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mb-swipe--animate.svelte-zbkzcp { transition: none; }\n\t}\n\n\t/* ─── All-day bar ────────────────────────────────── */\n\t.mb-allday.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tpadding: 4px 8px;\n\t\toverflow-x: auto;\n\t\tscrollbar-width: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tflex-shrink: 0;\n\t\talign-items: center;\n\t}\n\t.mb-allday.svelte-zbkzcp::-webkit-scrollbar { display: none; }\n\t.mb-allday--expanded.svelte-zbkzcp {\n\t\tflex-wrap: wrap;\n\t\toverflow-x: visible;\n\t}\n\n\t.mb-allday-chip.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 4px 8px;\n\t\tmin-height: 32px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--ev-color);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\tborder: none;\n\t\tcursor: pointer;\n\t\tflex-shrink: 0;\n\t\ttransition: filter 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tmax-width: 160px;\n\t\tposition: relative;\n\t}\n\t/* Hit-slop: 44px effective touch target */\n\t.mb-allday-chip.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-allday-chip.svelte-zbkzcp:hover,\n\t.mb-allday-chip.svelte-zbkzcp:active {\n\t\tfilter: brightness(1.08);\n\t}\n\t.mb-allday-chip--selected.svelte-zbkzcp {\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);\n\t}\n\t.mb-allday-chip.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff), 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\n\t/* The band is the colour; no dot. */\n\t.mb-allday-dot.svelte-zbkzcp {\n\t\tdisplay: none;\n\t}\n\n\t.mb-allday-title.svelte-zbkzcp {\n\t\tfont: 500 13.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: inherit;\n\t\twhite-space: nowrap;\n\t\tmax-width: 100px;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-allday-span.svelte-zbkzcp {\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: inherit;\n\t\topacity: 0.75;\n\t}\n\n\t.mb-allday-more.svelte-zbkzcp {\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t\tpadding: 0 6px;\n\t\tmin-height: 32px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\tposition: relative;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.mb-allday-more.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-allday-more.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\n\t/* ─── Grid ───────────────────────────────────────── */\n\t.mb-grid.svelte-zbkzcp {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\t-webkit-overflow-scrolling: touch;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(15, 15, 15, 0.1)) transparent;\n\t\tposition: relative;\n\t\tpadding-top: 8px;\n\t}\n\t.mb--auto.svelte-zbkzcp .mb-grid:where(.svelte-zbkzcp) { overflow-y: visible; }\n\t.mb-grid.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\n\t.mb-grid-inner.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tmin-width: 100%;\n\t}\n\n\t/* ─── Empty state ────────────────────────────────── */\n\t.mb-empty.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpointer-events: none;\n\t\tz-index: 4;\n\t}\n\t.mb-empty-text.svelte-zbkzcp {\n\t\tfont: 500 13px/1.4 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\n\t/* ─── Hour row ───────────────────────────────────── */\n\t.mb-hour.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t}\n\n\t/* The first hour has no room above its line: it sits on it, unclipped */\n\t.mb-hour.svelte-zbkzcp:first-child .mb-hour-label:where(.svelte-zbkzcp) { top: 0; }\n\t.mb-hour-label--under.svelte-zbkzcp {\n\t\tvisibility: hidden;\n\t}\n\t.mb-hour-label.svelte-zbkzcp small:where(.svelte-zbkzcp) {\n\t\tfont-size: 10px;\n\t\tfont-weight: 500;\n\t\tvertical-align: top;\n\t\tmargin-left: 1px;\n\t\tletter-spacing: 0;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mb-hour-label.svelte-zbkzcp {\n\t\twidth: 40px;\n\t\t/* border-box keeps the label inside the 40px gutter that events\n\t\t   start at — content-box pushed digits flush under the event edge */\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\tfont: 400 15px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 90%;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tletter-spacing: -0.02em;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\ttext-align: right;\n\t\tpadding-right: 8px;\n\t\tpadding-top: 0;\n\t\tposition: relative;\n\t\ttop: -6px;\n\t}\n\n\t.mb-hour-line.svelte-zbkzcp {\n\t\tflex: 1;\n\t\theight: 1px;\n\t\tbackground: var(--dt-border, rgba(15, 15, 15, 0.08));\n\t}\n\n\t.mb-hour--blocked.svelte-zbkzcp {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 3%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 3%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t}\n\n\t.mb-blocked-label.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 44px;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t}\n\n\t/* ─── Now line ───────────────────────────────────── */\n\t/* No stacking context of its own: the plate and the dot sit above the\n\t   events, the line under them (the event it crosses is opaque), so the\n\t   line never strikes through a title. */\n\t.mb-now.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tpointer-events: none;\n\t}\n\n\t/* The clock is a reversed plate on the accent, as in the desktop gutter. */\n\t.mb-now-label.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tz-index: 10;\n\t\twidth: 40px;\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\tpadding: 0 4px 0 0;\n\t\ttext-align: right;\n\t\twhite-space: nowrap;\n\t}\n\t.mb-now-label.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tright: -4px;\n\t\ttop: 50%;\n\t\twidth: 8px;\n\t\theight: 8px;\n\t\tmargin-top: -4px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #1d4fd7);\n\t}\n\t.mb-now-label.svelte-zbkzcp span:where(.svelte-zbkzcp) {\n\t\tdisplay: inline-block;\n\t\tpadding: 2px 3px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--dt-accent, #1d4fd7);\n\t\tfont: 500 11px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-btn-text, #ffffff);\n\t}\n\n\t.mb-now-line.svelte-zbkzcp {\n\t\tflex: 1;\n\t\theight: 0;\n\t\tborder-top: 2px solid var(--dt-accent, #1d4fd7);\n\t\tbox-shadow: none;\n\t\tposition: relative;\n\t\tz-index: 4;\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.mb-event.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tz-index: 5;\n\t\tborder-radius: 0;\n\t\tcursor: pointer;\n\t\tbackground: transparent;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tborder: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\tbox-sizing: border-box;\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\toverflow: hidden;\n\t\ttransition: box-shadow 120ms, background 120ms;\n\t\ttext-align: left;\n\t\tpadding: 0;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tmin-height: 24px;\n\t}\n\t.mb-event.svelte-zbkzcp:hover,\n\t.mb-event.svelte-zbkzcp:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t/* Short blocks keep their duration-proportional height, but get a 44px\n\t   transparent hit-slop so taps still land. */\n\t.mb-event--short.svelte-zbkzcp {\n\t\toverflow: visible;\n\t}\n\t.mb-event--short.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-event--short.svelte-zbkzcp .mb-ev-body:where(.svelte-zbkzcp) {\n\t\tpadding-top: 2px;\n\t\tpadding-bottom: 2px;\n\t}\n\t.mb-event--selected.svelte-zbkzcp {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\t/* The event in progress is the one the now line crosses: its wash is\n\t   laid over the paper, opaque, so the line runs beneath its text. */\n\t.mb-event.mb-event--current.svelte-zbkzcp {\n\t\tbackground:\n\t\t\tlinear-gradient(var(--_fill), var(--_fill)),\n\t\t\tlinear-gradient(var(--dt-accent-dim, rgba(29, 79, 215, 0.12)), var(--dt-accent-dim, rgba(29, 79, 215, 0.12))),\n\t\t\tvar(--dt-paper, none),\n\t\t\tvar(--dt-bg, #efebe9);\n\t}\n\t.mb-event.mb-event--current.svelte-zbkzcp:hover,\n\t.mb-event.mb-event--current.svelte-zbkzcp:active {\n\t\tbackground:\n\t\t\tlinear-gradient(var(--_fill), var(--_fill)),\n\t\t\tlinear-gradient(var(--dt-hover, rgba(15, 15, 15, 0.04)), var(--dt-hover, rgba(15, 15, 15, 0.04))),\n\t\t\tvar(--dt-paper, none),\n\t\t\tvar(--dt-bg, #efebe9);\n\t}\n\t/* Printed states: a cancelled class is struck through; a tentative or\n\t   limited one is set in grey with a dashed bar — never a bare opacity. */\n\t.mb-event--cancelled.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mb-event--cancelled.svelte-zbkzcp .mb-ev-stripe:where(.svelte-zbkzcp) {\n\t\topacity: 0.45; /* decorative bar only */\n\t}\n\t.mb-event--tentative.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp),\n\t.mb-event--full.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mb-event--tentative.svelte-zbkzcp .mb-ev-stripe:where(.svelte-zbkzcp),\n\t.mb-event--limited.svelte-zbkzcp .mb-ev-stripe:where(.svelte-zbkzcp) {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t180deg,\n\t\t\tvar(--ev-color) 0 4px,\n\t\t\ttransparent 4px 7px\n\t\t);\n\t}\n\t.mb-event--full.svelte-zbkzcp .mb-ev-stripe:where(.svelte-zbkzcp) {\n\t\topacity: 0.45;\n\t}\n\t.mb-event--resizing.svelte-zbkzcp {\n\t\tz-index: 50;\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t\tcursor: ns-resize;\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t/* Resizing lives only on the centered grip column. The old full-width\n\t   edge bands (24px of inward slop each) covered short events entirely —\n\t   min block height is 24px, so any tap near an edge risked starting a\n\t   resize. The grip is persistently visible on touch (hover:none below),\n\t   so the smaller target stays discoverable; taps elsewhere open. */\n\t.mb-ev-handle.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 56px;\n\t\theight: 10px;\n\t\tz-index: 2;\n\t\tcursor: ns-resize;\n\t\ttouch-action: none;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp { top: 0; }\n\t.mb-ev-handle--end.svelte-zbkzcp { bottom: 0; }\n\t/* Hit-slop: ≥24px effective, extending inward so the block's\n\t   overflow clipping can't cut it off. */\n\t.mb-ev-handle.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 24px;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp::before { top: 0; }\n\t.mb-ev-handle--end.svelte-zbkzcp::before { bottom: 0; }\n\t.mb-ev-handle.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 24px;\n\t\theight: 3px;\n\t\tborder-radius: 0;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp::after { top: 2px; }\n\t.mb-ev-handle--end.svelte-zbkzcp::after { bottom: 2px; }\n\t.mb-event.svelte-zbkzcp:hover .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event.svelte-zbkzcp:focus-within .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event--resizing.svelte-zbkzcp .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event--selected.svelte-zbkzcp .mb-ev-handle:where(.svelte-zbkzcp)::after { opacity: 0.55; }\n\t/* Finger on the grip column itself: brighten so the hit zone reads */\n\t.mb-ev-handle.svelte-zbkzcp:hover::after { opacity: 0.9; }\n\t/* Touch devices have no hover — show the handles persistently. */\n\t@media (hover: none) {\n\t\t.mb-ev-handle.svelte-zbkzcp::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Drag-to-create ghost ───────────────────────── */\n\t.mb-create-ghost.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 40px;\n\t\tright: 4px;\n\t\tz-index: 40;\n\t\tborder-radius: 0;\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #1d4fd7) 12%, transparent);\n\t\tborder: 1px dashed color-mix(in srgb, var(--dt-accent, #1d4fd7) 55%, transparent);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t}\n\t.mb-create-ghost-time.svelte-zbkzcp {\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t\tpadding: 4px 8px;\n\t\twhite-space: nowrap;\n\t}\n\n\t.mb-ev-stripe.svelte-zbkzcp {\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tborder-radius: 0;\n\t}\n\n\t.mb-ev-body.svelte-zbkzcp {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 4px 8px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\tjustify-content: center;\n\t}\n\n\t.mb-ev-title.svelte-zbkzcp {\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-time.svelte-zbkzcp {\n\t\tfont: 400 14px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\n\t.mb-ev-sub.svelte-zbkzcp {\n\t\tfont: 400 12.5px/1.1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-loc.svelte-zbkzcp {\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-tags.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tmargin-top: 2px;\n\t}\n\n\t.mb-ev-tag.svelte-zbkzcp {\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 0;\n\t\twhite-space: nowrap;\n\t}\n\n\t.mb-ev-live.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\ttop: 6px;\n\t\tright: 6px;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tanimation: svelte-zbkzcp-mb-pulse 2s ease-in-out infinite;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mb-ev-live.svelte-zbkzcp { animation: none; }\n\t}\n\t.mb-ev-next-badge.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\ttop: 4px;\n\t\tright: 4px;\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 0;\n\t\twhite-space: nowrap;\n\t}\n\n\t@keyframes svelte-zbkzcp-mb-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\n\t/* ─── Focus ──────────────────────────────────────── */\n\t.mb-event.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.mw.svelte-1d18hkf {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\toverflow: hidden;\n\t\tbackground: var(--dt-bg, #efebe9);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\ttouch-action: pan-y pinch-zoom;\n\t}\n\t.mw--auto.svelte-1d18hkf { overflow: visible; }\n\n\t/* ─── Scrollable day list ────────────────────────── */\n\t.mw-list.svelte-1d18hkf {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\t-webkit-overflow-scrolling: touch;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(15, 15, 15, 0.1)) transparent;\n\t}\n\t.mw--auto.svelte-1d18hkf .mw-list:where(.svelte-1d18hkf) { overflow-y: visible; }\n\t.mw-list--animate.svelte-1d18hkf {\n\t\ttransition: transform 180ms ease;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mw-list--animate.svelte-1d18hkf { transition: none; }\n\t}\n\n\t/* ─── Day row ────────────────────────────────────── */\n\t.mw-row.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 12px;\n\t\tposition: relative;\n\t\t/* border-box: width 100% + padding otherwise overflows the list by\n\t\t   24px, which iOS turns into a horizontal pan that clips the date\n\t\t   column off the left edge */\n\t\tbox-sizing: border-box;\n\t\tpadding: 10px 12px;\n\t\tbackground: transparent;\n\t\ttransition: background 120ms;\n\t\ttext-align: left;\n\t\twidth: 100%;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tmin-height: 56px;\n\t}\n\t.mw-row.svelte-1d18hkf:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.mw-row.svelte-1d18hkf:has(.mw-row-target:where(.svelte-1d18hkf):active) {\n\t\tbackground: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.mw-row--today.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #1d4fd7) 4%, transparent);\n\t}\n\t/* Token-based dim (not subtree opacity) so past rows stay legible/tappable */\n\t.mw-row--past.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 3%, transparent);\n\t}\n\t.mw-row--past.svelte-1d18hkf .mw-ev-title,\n\t.mw-row--past.svelte-1d18hkf .mw-ev-time,\n\t.mw-row--past.svelte-1d18hkf .mw-day-num:where(.svelte-1d18hkf) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mw-row--disabled.svelte-1d18hkf {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 12px\n\t\t);\n\t}\n\t.mw-row-target.svelte-1d18hkf {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tz-index: 0;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\tpadding: 0;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.mw-row-target.svelte-1d18hkf:disabled {\n\t\tcursor: default;\n\t}\n\t.mw-row-target.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\n\t/* ─── Date column ────────────────────────────────── */\n\t.mw-date.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\twidth: 40px;\n\t\tflex-shrink: 0;\n\t\tgap: 2px;\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tpointer-events: none;\n\t}\n\n\t.mw-day-name.svelte-1d18hkf {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mw-day-name--today.svelte-1d18hkf {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\n\t/* The date is the typography: large and regular, narrowed like the planner's */\n\t.mw-day-num.svelte-1d18hkf {\n\t\tfont: 400 22px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 90%;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tletter-spacing: -0.02em;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\t.mw-day-num--today.svelte-1d18hkf {\n\t\tcolor: var(--dt-accent, #1d4fd7);\n\t}\n\n\t/* ─── Events column ──────────────────────────────── */\n\t/* pointer-events pass through to the full-row target underneath;\n\t   only the chips (and \"+N more\") re-capture them. */\n\t.mw-events.svelte-1d18hkf {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t\tposition: relative;\n\t\tz-index: 2;\n\t\tpointer-events: none;\n\t}\n\n\t.mw-empty.svelte-1d18hkf {\n\t\tfont: 400 13px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\n\t/* ─── Event chip ─────────────────────────────────── */\n\t.mw-ev.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0;\n\t\tmin-height: 44px;\n\t\tborder-radius: 0;\n\t\tbackground: transparent;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--ev-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tborder: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));\n\t\ttext-align: left;\n\t\tpadding: 0;\n\t\tpointer-events: auto;\n\t}\n\t.mw-ev.svelte-1d18hkf:hover,\n\t.mw-ev.svelte-1d18hkf:active {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.mw-ev--selected.svelte-1d18hkf {\n\t\tbox-shadow: inset 0 0 0 1px var(--ev-color);\n\t}\n\t.mw-ev--current.svelte-1d18hkf {\n\t\tbackground-color: var(--dt-accent-dim, rgba(29, 79, 215, 0.12));\n\t}\n\t/* All day: a solid band on the event colour, no tint. */\n\t.mw-ev--allday.svelte-1d18hkf {\n\t\tbackground: var(--dt-paper, none) var(--ev-color);\n\t\tbackground-blend-mode: multiply;\n\t\tcolor: var(--dt-btn-text, #fff);\n\t}\n\t.mw-ev--allday.svelte-1d18hkf:hover,\n\t.mw-ev--allday.svelte-1d18hkf:active {\n\t\tbackground: var(--dt-paper, none) var(--ev-color);\n\t\tfilter: brightness(1.08);\n\t}\n\t.mw-ev--allday.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf),\n\t.mw-ev--allday.svelte-1d18hkf .mw-ev-time:where(.svelte-1d18hkf) {\n\t\tcolor: inherit;\n\t}\n\t.mw-ev--allday.mw-ev--selected.svelte-1d18hkf {\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);\n\t}\n\t/* Printed states: a cancelled class is struck through; a tentative or\n\t   limited one is set in grey with a dashed bar — never a bare opacity. */\n\t.mw-ev--cancelled.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mw-ev--cancelled.svelte-1d18hkf .mw-ev-stripe:where(.svelte-1d18hkf) {\n\t\topacity: 0.45; /* decorative bar only */\n\t}\n\t.mw-ev--tentative.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf),\n\t.mw-ev--full.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t}\n\t.mw-ev--tentative.svelte-1d18hkf .mw-ev-stripe:where(.svelte-1d18hkf),\n\t.mw-ev--limited.svelte-1d18hkf .mw-ev-stripe:where(.svelte-1d18hkf) {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t180deg,\n\t\t\tvar(--ev-color) 0 4px,\n\t\t\ttransparent 4px 7px\n\t\t);\n\t}\n\t.mw-ev--full.svelte-1d18hkf .mw-ev-stripe:where(.svelte-1d18hkf) {\n\t\topacity: 0.45;\n\t}\n\n\t.mw-ev-stripe.svelte-1d18hkf {\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\talign-self: stretch;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tflex-shrink: 0;\n\t\tborder-radius: 0;\n\t}\n\n\t.mw-ev-body.svelte-1d18hkf {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 5px 8px;\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t}\n\n\t.mw-ev-title.svelte-1d18hkf {\n\t\tfont: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\n\t.mw-ev-time.svelte-1d18hkf {\n\t\tfont: 400 14px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\n\t.mw-ev-more.svelte-1d18hkf {\n\t\tfont: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\tpadding: 2px 4px;\n\t\tmin-height: 32px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tposition: relative;\n\t\tpointer-events: auto;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t@media (pointer: coarse) {\n\t\t.mw-ev-more.svelte-1d18hkf {\n\t\t\tmin-height: 44px;\n\t\t\tmin-width: 44px;\n\t\t}\n\t}\n\t.mw-ev-more.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t}\n\n\t/* ─── Chevron ────────────────────────────────────── */\n\t.mw-chevron.svelte-1d18hkf {\n\t\tflex-shrink: 0;\n\t\tcolor: var(--dt-text-3, rgba(15, 15, 15, 0.38));\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tpointer-events: none;\n\t}\n\n\t/* ─── Focus ──────────────────────────────────────── */\n\t.mw-ev.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t}\n\n\t.mg.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tbackground: var(--dt-bg);\n\t\tcolor: var(--dt-text);\n\t\tfont-family: var(--dt-sans);\n\t\toverflow: hidden;\n\t\tcontainer-type: inline-size;\n\t}\n\t.mg--auto.svelte-pvjuld {\n\t\theight: auto;\n\t}\n\n\t.mg-head.svelte-pvjuld {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(7, 1fr);\n\t\tborder-bottom: 1px solid var(--dt-border);\n\t\tflex: none;\n\t}\n\t.mg-head-cell.svelte-pvjuld {\n\t\tpadding: 6px 8px;\n\t\tfont: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.08em;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\n\t.mg-body.svelte-pvjuld {\n\t\tflex: 1;\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(7, 1fr);\n\t\t/* 56px floor + scroll backstop: a 6-row month compresses instead of clipping its last week */\n\t\tgrid-template-rows: repeat(var(--mg-rows, 5), minmax(56px, 1fr));\n\t\tmin-height: 0;\n\t\toverflow-y: auto;\n\t}\n\t.mg--auto.svelte-pvjuld .mg-body:where(.svelte-pvjuld) {\n\t\tgrid-template-rows: repeat(var(--mg-rows, 5), minmax(88px, auto));\n\t}\n\t.mg-row.svelte-pvjuld {\n\t\tdisplay: contents;\n\t}\n\n\t.mg-cell.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 3px;\n\t\tpadding: 6px;\n\t\tborder-right: 1px solid var(--dt-border-day);\n\t\tborder-bottom: 1px solid var(--dt-border-day);\n\t\tmin-width: 0;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t}\n\t.mg-cell.svelte-pvjuld:nth-child(7n) {\n\t\tborder-right: none;\n\t}\n\t.mg-cell--weekend.svelte-pvjuld {\n\t\tbackground: var(--dt-weekend-bg, rgba(15, 15, 15, 0.02));\n\t}\n\t/* Dim only the day number for adjacent-month cells — their events stay\n\t   legible. text-2, not text-3: a 22px numeral still needs 4.5:1. */\n\t.mg-cell--out.svelte-pvjuld {\n\t\tbackground: var(--dt-surface, transparent);\n\t}\n\t.mg-cell--out.svelte-pvjuld .mg-daynum:where(.svelte-pvjuld) {\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.66));\n\t}\n\t.mg-cell--today.svelte-pvjuld {\n\t\tbackground: var(--dt-today-bg);\n\t}\n\t.mg-cell--expanded.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\toverflow-y: auto;\n\t}\n\t.mg-cell--disabled.svelte-pvjuld {\n\t\topacity: 0.35;\n\t\tpointer-events: none;\n\t}\n\t.mg-cell--clickable.svelte-pvjuld {\n\t\tcursor: pointer;\n\t}\n\t.mg-cell--clickable.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.mg-cell.svelte-pvjuld:focus-visible {\n\t\toutline: 2px solid var(--dt-text, #0f0f0f);\n\t\toutline-offset: -2px;\n\t}\n\n\t/* Starts where the weekday name above it starts (6px cell + 2px = the\n\t   header's 8px), and is only as wide as its digits, so today's rule is too. */\n\t.mg-daynum.svelte-pvjuld {\n\t\tflex: none;\n\t\talign-self: flex-start;\n\t\tpadding: 0 2px;\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t\tfont-size: 22px;\n\t\tfont-weight: 400;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text);\n\t\theight: 26px;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t}\n\t/* Today: accent numeral on a 2px rule — the same mark in every view. */\n\t.mg-daynum--today.svelte-pvjuld {\n\t\tcolor: var(--dt-accent);\n\t\tbox-shadow: inset 0 -2px 0 var(--dt-accent);\n\t}\n\n\t.mg-chips.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tmin-height: 0;\n\t\toverflow: hidden;\n\t}\n\t.mg-chip.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tborder: none;\n\t\tbackground: none;\n\t\t/* eventFill: a wash in the event's colour; hover/current set background-color under it */\n\t\t--_fill: color-mix(in srgb, var(--mg-chip-color) var(--dt-ev-fill, 0%), transparent);\n\t\tbackground-image: linear-gradient(var(--_fill), var(--_fill));\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 0;\n\t\tfont: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text);\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\ttext-align: left;\n\t}\n\t.mg-chip.svelte-pvjuld:hover {\n\t\tbackground-color: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t}\n\t.mg-chip.svelte-pvjuld:focus-visible {\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);\n\t\toutline: none;\n\t}\n\t.mg-chip--selected.svelte-pvjuld {\n\t\tbackground-color: var(--dt-accent-dim);\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld {\n\t\ttext-decoration: line-through;\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld .mg-chip-title:where(.svelte-pvjuld) {\n\t\tcolor: var(--dt-text-2);\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld .mg-chip-dot:where(.svelte-pvjuld) {\n\t\topacity: 0.5;\n\t}\n\t.mg-chip-dot.svelte-pvjuld {\n\t\tflex: none;\n\t\talign-self: stretch;\n\t\twidth: var(--dt-ev-bar, 3px);\n\t\tborder-radius: 0;\n\t\tbackground: var(--mg-chip-color);\n\t}\n\t.mg-chip-time.svelte-pvjuld {\n\t\tflex: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text-2);\n\t}\n\t.mg-chip-title.svelte-pvjuld {\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\twhite-space: nowrap;\n\t\t/* A Latin title in RTL keeps its own direction: the ellipsis cuts its end */\n\t\tunicode-bidi: plaintext;\n\t\ttext-align: left;\n\t}\n\t/* …but it sits on the calendar's side, by the bar */\n\t.mg-chip-title.svelte-pvjuld:dir(rtl) { text-align: right; }\n\t.mg-more.svelte-pvjuld {\n\t\talign-self: flex-start;\n\t\tborder: none;\n\t\tbackground: none;\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 0;\n\t\tfont: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-variant-numeric: tabular-nums;\n\t\tcolor: var(--dt-text-2);\n\t\tcursor: pointer;\n\t}\n\t.mg-more.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(15, 15, 15, 0.04));\n\t\tcolor: var(--dt-text);\n\t}\n\t.mg-more.svelte-pvjuld:focus-visible {\n\t\tbox-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);\n\t\toutline: none;\n\t}\n\n\t/* Container-based (the calendar adapts to its box, not the viewport) */\n\t@container (max-width: 640px) {\n\t\t.mg-chip-time.svelte-pvjuld {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t@media (hover: none) {\n\t\t.mg-chip.svelte-pvjuld,\n\t\t.mg-more.svelte-pvjuld {\n\t\t\tmin-height: 30px;\n\t\t}\n\t}\n\n\t/* ── Dots mode (mobile) ─────────────────────────────\n\t   Cells are too narrow for text chips, so events render as colored\n\t   dots in a wrapping row. The cell itself stays the tap target\n\t   (day drill-down) and its label counts the events; dots are aria-hidden. */\n\t.mg--dots.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t}\n\t/* The cell is the target: at least a 44px tap, dots never take the hit. */\n\t.mg--dots.svelte-pvjuld .mg-cell:where(.svelte-pvjuld) {\n\t\tmin-height: 44px;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\tpointer-events: none;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip:where(.svelte-pvjuld) {\n\t\tpadding: 3px;\n\t\tbackground-image: none; /* a mark, not a chip: no eventFill wash */\n\t\tmin-height: 0;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip-title:where(.svelte-pvjuld),\n\t.mg--dots.svelte-pvjuld .mg-chip-time:where(.svelte-pvjuld) {\n\t\tdisplay: none;\n\t}\n\t/* Marks are circles, like every dot in the calendar */\n\t.mg--dots.svelte-pvjuld .mg-chip-dot:where(.svelte-pvjuld) {\n\t\talign-self: center;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 50%;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-more:where(.svelte-pvjuld) {\n\t\tpadding: 0 3px;\n\t\tmin-height: 0;\n\t\talign-self: center;\n\t\tfont-size: 11px;\n\t}\n\n\t.cal.svelte-1b53e7w {\n\t\tposition: relative;\n\t\t/* Its own stacking context: the grid's z-indexes (sticky heads, the\n\t\t   now-line, drag ghosts — up to 30) stay inside the calendar instead\n\t\t   of rising over a host page's sticky header. */\n\t\tisolation: isolate;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\theight: var(--cal-h, 600px);\n\t\tbackground: var(--dt-paper, none), var(--dt-bg, inherit);\n\t\tborder-radius: var(--cal-r, 0);\n\t\toverflow: clip;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tborder: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tbox-sizing: border-box;\n\t}\n\t.cal--auto.svelte-1b53e7w {\n\t\theight: auto;\n\t\toverflow: visible;\n\t}\n\n\n\t/* ── Header: the period set large as the page's title, the view switch as\n\t   plain text, Today ‹ › in 2px ink frames, one rule to the grid. ── */\n\t.cal-hd.svelte-1b53e7w {\n\t\t/* Controls take a small corner that follows the calendar's own radius */\n\t\t--cal-ctl-r: clamp(4px, calc(var(--cal-r, 0px) / 2), 8px);\n\t\t--cal-ctl-h: 36px;\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 10px 24px;\n\t\tpadding: 14px 16px 12px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));\n\t\tflex-shrink: 0;\n\t\tbox-sizing: border-box;\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t}\n\n\t.cal-hd-title.svelte-1b53e7w {\n\t\tflex: 1 1 auto;\n\t\tmin-width: 0;\n\t\tfont: 400 32px/1.1 var(--dt-sans, system-ui, sans-serif);\n\t\tfont-stretch: 90%;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tletter-spacing: -0.02em;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.cal-sr.svelte-1b53e7w {\n\t\tposition: absolute;\n\t\twidth: 1px;\n\t\theight: 1px;\n\t\tmargin: -1px;\n\t\tpadding: 0;\n\t\toverflow: hidden;\n\t\tclip-path: inset(50%);\n\t\twhite-space: nowrap;\n\t\tborder: 0;\n\t}\n\n\t.cal-hd-nav.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t}\n\t.cal-hd-nav.svelte-1b53e7w:empty {\n\t\tdisplay: none;\n\t}\n\n\t.cal-hd-today.svelte-1b53e7w,\n\t.cal-hd-btn.svelte-1b53e7w {\n\t\tbox-sizing: border-box;\n\t\theight: var(--cal-ctl-h);\n\t\tborder: 2px solid var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tborder-radius: var(--cal-ctl-r);\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\tcursor: pointer;\n\t\ttransition: background-color 120ms, opacity 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.cal-hd-today.svelte-1b53e7w {\n\t\tpadding: 0 14px;\n\t\tfont: 400 15px/1 var(--dt-sans, system-ui, sans-serif);\n\t\twhite-space: nowrap;\n\t}\n\t.cal-hd-btn.svelte-1b53e7w {\n\t\tdisplay: grid;\n\t\tplace-items: center;\n\t\twidth: var(--cal-ctl-h);\n\t\tpadding: 0;\n\t}\n\t/* The chevrons point along the reading direction */\n\t.cal-hd-btn.svelte-1b53e7w:dir(rtl) svg:where(.svelte-1b53e7w) {\n\t\ttransform: scaleX(-1);\n\t}\n\t.cal-hd-today.svelte-1b53e7w:hover:not(:disabled),\n\t.cal-hd-btn.svelte-1b53e7w:hover {\n\t\tbackground: var(--dt-hover, color-mix(in srgb, currentColor 6%, transparent));\n\t}\n\t.cal-hd-today.svelte-1b53e7w:active:not(:disabled),\n\t.cal-hd-btn.svelte-1b53e7w:active {\n\t\tbackground: color-mix(in srgb, var(--dt-text, #0f0f0f) 12%, transparent);\n\t}\n\t/* Today is already in view: the frame stays, quietly */\n\t.cal-hd-today.svelte-1b53e7w:disabled {\n\t\topacity: 0.4;\n\t\tcursor: default;\n\t}\n\n\t.cal-hd-today.svelte-1b53e7w:focus-visible,\n\t.cal-hd-btn.svelte-1b53e7w:focus-visible,\n\t.cal-pill.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\toutline-offset: 2px;\n\t}\n\n\t/* View switch: plain text; the chosen one is ink over a 2px ink rule.\n\t   The accent keeps its three jobs. */\n\t.cal-pills.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tgap: 16px;\n\t\tflex-shrink: 0;\n\t}\n\t/* A hairline between the view-type and the day/week/month rows */\n\t.cal-pills--labels.svelte-1b53e7w + .cal-pills:where(.svelte-1b53e7w) {\n\t\talign-self: stretch;\n\t\talign-items: center;\n\t\tpadding-inline-start: 24px;\n\t\tborder-inline-start: 1px solid var(--dt-border, rgba(15, 15, 15, 0.12));\n\t}\n\t.cal-pill.svelte-1b53e7w {\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(15, 15, 15, 0.54));\n\t\tcursor: pointer;\n\t\tfont: 400 15px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tmin-height: var(--cal-ctl-h);\n\t\t/* 4px of air for the focus ring, given back so the row keeps its rhythm */\n\t\tpadding: 0 4px;\n\t\tmargin: 0 -4px;\n\t\tborder-radius: 0;\n\t\twhite-space: nowrap;\n\t\ttext-decoration: underline 2px transparent;\n\t\ttext-underline-offset: 7px;\n\t\ttransition: color 120ms, text-decoration-color 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t/* :not(--active) — iOS keeps :hover stuck after a tap */\n\t.cal-pill.svelte-1b53e7w:hover:not(.cal-pill--active) {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\ttext-decoration-color: var(--dt-border-day, var(--dt-border, rgba(15, 15, 15, 0.3)));\n\t}\n\t.cal-pill--active.svelte-1b53e7w {\n\t\tcolor: var(--dt-text, rgba(15, 15, 15, 0.87));\n\t\ttext-decoration-color: currentColor;\n\t}\n\n\t/* Compact (mobile) header: same drawing, smaller title, tighter gaps */\n\t.cal-hd--mobile.svelte-1b53e7w {\n\t\t--cal-ctl-h: 40px;\n\t\tgap: 8px 12px;\n\t\tpadding: 10px 8px 8px;\n\t}\n\t.cal-hd--mobile.svelte-1b53e7w .cal-hd-title:where(.svelte-1b53e7w) {\n\t\tfont-size: 22px;\n\t}\n\t.cal-hd--mobile.svelte-1b53e7w .cal-pills:where(.svelte-1b53e7w) {\n\t\tgap: 12px;\n\t}\n\t.cal-hd--mobile.svelte-1b53e7w .cal-pill:where(.svelte-1b53e7w) {\n\t\tfont-size: 14px;\n\t}\n\t.cal-hd--mobile.svelte-1b53e7w .cal-hd-today:where(.svelte-1b53e7w) {\n\t\tpadding: 0 10px;\n\t\tfont-size: 14px;\n\t}\n\t.cal-hd--mobile.svelte-1b53e7w .cal-hd-nav:where(.svelte-1b53e7w) {\n\t\tgap: 6px;\n\t\tmargin-inline-start: auto;\n\t}\n\t/* Narrow containers: the title takes its own row above the controls */\n\t.cal-hd--stack.svelte-1b53e7w .cal-hd-title:where(.svelte-1b53e7w):not(:empty) {\n\t\tflex-basis: 100%;\n\t}\n\n\t@media (pointer: coarse) {\n\t\t.cal-hd.svelte-1b53e7w {\n\t\t\t--cal-ctl-h: 44px;\n\t\t}\n\t\t.cal-pill.svelte-1b53e7w {\n\t\t\tmin-width: 44px;\n\t\t}\n\t}\n\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.cal-hd-today.svelte-1b53e7w,\n\t\t.cal-hd-btn.svelte-1b53e7w,\n\t\t.cal-pill.svelte-1b53e7w {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\n\t.cal-body.svelte-1b53e7w {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t}\n\t.cal--auto.svelte-1b53e7w .cal-body:where(.svelte-1b53e7w) {\n\t\toverflow: visible;\n\t}\n\t.cal-body--unmeasured.svelte-1b53e7w {\n\t\tvisibility: hidden;\n\t\tanimation: svelte-1b53e7w-cal-reveal 0s 1.5s forwards;\n\t}\n\t@keyframes svelte-1b53e7w-cal-reveal { to { visibility: visible; } }\n\n\t.cal-empty.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 100%;\n\t\tfont: 400 13px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(15, 15, 15, 0.38));\n\t}\n\n\t.cal-loading.svelte-1b53e7w {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 2px;\n\t\tbackground: linear-gradient(\n\t\t\t90deg,\n\t\t\ttransparent 0%,\n\t\t\tvar(--dt-accent, #1d4fd7) 50%,\n\t\t\ttransparent 100%\n\t\t);\n\t\tanimation: svelte-1b53e7w-cal-slide 1.2s ease-in-out infinite;\n\t}\n\n\t@keyframes svelte-1b53e7w-cal-slide {\n\t\t0% { transform: translateX(-100%); }\n\t\t100% { transform: translateX(100%); }\n\t}\n\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.cal-loading.svelte-1b53e7w {\n\t\t\tanimation: none;\n\t\t\tbackground: var(--dt-accent-dim, rgba(29, 79, 215, 0.12));\n\t\t}\n\t}\n\n/*$vite$:1*/";
(function() {
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/utils.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/constants.js
	/**
	* An effect that does not destroy its child effects when it reruns.
	* Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
	*/
	var MANAGED_EFFECT = 1 << 24;
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
	var REACTION_IS_UPDATING = 1 << 21;
	var ASYNC = 1 << 22;
	var ERROR_VALUE = 1 << 23;
	var STATE_SYMBOL = Symbol("$state");
	/** Marks component export objects, so that `proxy(...)` leaves them untouched */
	var COMPONENT_SYMBOL = Symbol("component");
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/constants.js
	var HYDRATION_ERROR = {};
	var UNINITIALIZED = Symbol("uninitialized");
	var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/hydration.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/equality.js
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
	/**
	* `setContext` must be called when a component first initializes, not in a subsequent effect or after an `await` expression
	* @returns {never}
	*/
	function set_context_after_init() {
		throw new Error(`https://svelte.dev/e/set_context_after_init`);
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/errors.js
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
	* Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
	* @param {string} key
	* @returns {never}
	*/
	function props_invalid_value(key) {
		throw new Error(`https://svelte.dev/e/props_invalid_value`);
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/flags/index.js
	/** True if experimental.async=true */
	var async_mode_flag = false;
	/** True if we're not certain that we only have Svelte 5 code in the compilation */
	var legacy_mode_flag = false;
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/context.js
	/**
	* @typedef {{ p: Context | null, c: Map<unknown, unknown> | null }} Context
	*/
	/**
	* @param {Context} context
	* @returns {Map<unknown, unknown> | null}
	*/
	function get_parent_context(context) {
		let parent = context.p;
		while (parent !== null && parent.c === null) parent = parent.p;
		return parent?.c ?? null;
	}
	/**
	* @param {Context | null} context
	* @param {string} name
	* @returns {Map<unknown, unknown>}
	*/
	function get_or_init_context_map(context, name) {
		if (context === null) lifecycle_outside_component(name);
		return context.c ??= new Map(get_parent_context(context) || void 0);
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/context.js
	/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
	/** @type {ComponentContext | null} */
	var component_context = null;
	/** @param {ComponentContext | null} context */
	function set_component_context(context) {
		component_context = context;
	}
	/**
	* Retrieves the context set with the specified `key` in the current component or any of its
	* ancestors. If multiple components set the same key, the value from the closest one is returned.
	* A `setContext` call in the current component is only visible to `getContext` calls that run after it.
	* Must be called during component initialisation.
	*
	* [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
	*
	* @template T
	* @param {any} key
	* @returns {T}
	*/
	function getContext$1(key) {
		return get_or_init_context_map(component_context, "getContext").get(key);
	}
	/**
	* Associates an arbitrary `context` object with the current component and the specified `key`
	* and returns that object. The context is then available to the component itself and all of its
	* descendants (including slotted content) with `getContext`.
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
		const context_map = get_or_init_context_map(component_context, "setContext");
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
		return mark_as_component(component);
	}
	/**
	* Add a symbol to the object (or create one if undefined) to mark it as a component so it isn't proxified.
	* @param {any} component
	*/
	function mark_as_component(component = {}) {
		define_property(component, COMPONENT_SYMBOL, { value: true });
		return component;
	}
	/** @returns {boolean} */
	function is_runes() {
		return !legacy_mode_flag || component_context !== null && component_context.l === null;
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/task.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/status.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/utils.js
	/** @import { Effect } from '#client' */
	/**
	* @param {Effect} effect
	* @param {Map<Effect, number>} dirty_reactions
	*/
	function defer_effect(effect, dirty_reactions) {
		if ((effect.f & 2048) !== 0) dirty_reactions.set(effect, DIRTY);
		else if ((effect.f & 4096) !== 0 && dirty_reactions.get(effect) !== 2048) dirty_reactions.set(effect, MAYBE_DIRTY);
		set_signal_status(effect, CLEAN);
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/async.js
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
			if ((parent.f & 16384) !== 0) {
				decrement_pending();
				return;
			}
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/batch.js
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
		started = false;
		linked = true;
		/** @type {Batch | null} */
		prev = null;
		/** @type {Batch | null} */
		next = null;
		/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
		async_deriveds = /* @__PURE__ */ new Map();
		/**
		* The current values of any signals that are updated in this batch.
		* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
		* The keys of this map are identical to `this.previous`
		* @type {Map<Value, [any, boolean]>}
		*/
		current = /* @__PURE__ */ new Map();
		/**
		* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
		* The keys of this map are identical to `this.current`
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
		* Effects that were scheduled in this batch but not yet 'resolved' into the
		* root effects that need to be flushed. Resolving — the upwards traversal that
		* marks the path to each effect on the shared effect tree (see #resolve) — is
		* deferred until the batch is processed, so that the markers are created and
		* consumed within a single traversal. Scheduling into other batches (which can
		* happen concurrently, e.g. while a batch is committed) can therefore never
		* observe (and be confused by) this batch's markers.
		* May contain duplicates — deduplication happens during resolving
		* @type {Effect[]}
		*/
		#scheduled = [];
		/**
		* Effects created while this batch was active.
		* @type {Effect[]}
		*/
		#new_effects = [];
		/**
		* Deferred effects (which run after async work has completed) and their status (DIRTY or MAYBE_DIRTY)
		* @type {Map<Effect, number>}
		*/
		#dirty_reactions = /* @__PURE__ */ new Map();
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
				last_batch.next = this;
				this.prev = last_batch;
			}
			last_batch = this;
		}
		#is_deferred() {
			if (this.is_fork) return true;
			for (const effect of this.#blocking_pending.keys()) if (!this.#is_skipped(effect)) return true;
			return false;
		}
		/**
		* Whether `effect` is inside a branch that this batch skips
		* @param {Effect} effect
		*/
		#is_skipped(effect) {
			for (var e = effect; e !== null; e = e.parent) if (this.#skipped_branches.has(e)) return true;
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
		/**
		* Convert the effects that were scheduled in this batch into the root effects
		* that need to be traversed, marking the path to each effect (by clearing the
		* `CLEAN` flag on ancestor branches) so that the traversal can find them.
		* This happens right before traversal rather than at scheduling time, so that
		* the markers left on the (shared) effect tree are created and consumed within
		* a single traversal — scheduling into other batches can never observe them
		* @returns {Effect[]}
		*/
		#resolve() {
			/** @type {Effect[]} */
			var roots = [];
			for (const effect of this.#scheduled) {
				if ((effect.f & 16384) !== 0 || (effect.f & 6144) === 0) continue;
				var e = effect;
				var covered = false;
				while (e.parent !== null) {
					e = e.parent;
					var flags = e.f;
					if ((flags & 96) !== 0) {
						if ((flags & 1024) === 0) {
							covered = true;
							break;
						}
						e.f ^= CLEAN;
					}
				}
				if (!covered) roots.push(e);
			}
			this.#scheduled = [];
			return roots;
		}
		#process() {
			this.started = true;
			for (const [e, status] of this.#dirty_reactions) {
				set_signal_status(e, status);
				this.schedule(e);
			}
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
			while (this.#scheduled.length > 0) {
				if (flush_count++ > 1e3) {
					this.#unlink();
					infinite_loop_guard();
				}
				for (const root of this.#resolve()) try {
					this.#traverse(root, effects, render_effects);
				} catch (e) {
					reset_all(root);
					if (!this.#is_deferred()) this.discard();
					throw e;
				}
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
			this.#dirty_reactions.clear();
			for (const fn of this.#commit_callbacks) fn(this);
			this.#commit_callbacks.clear();
			previous_batch = this;
			flush_queued_effects(render_effects);
			flush_queued_effects(effects);
			previous_batch = null;
			this.#deferred?.resolve();
			var next_batch = current_batch;
			if (this.#pending === 0 && (this.#scheduled.length === 0 || next_batch !== null)) {
				this.#unlink();
				if (async_mode_flag) {
					this.#commit();
					current_batch = next_batch;
				}
			}
			if (next_batch !== null) {
				old_values.clear();
				next_batch.#process();
			}
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
						if ((flags & 16) !== 0) this.add_dirty_reaction(effect, MAYBE_DIRTY);
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
			for (var batch = this.prev; batch !== null; batch = batch.prev) if (!batch.is_fork && this.#intersects(batch)) return batch;
			return null;
		}
		/** @param {Batch} batch */
		#intersects(batch) {
			for (const [source, [, is_derived]] of this.current) {
				if (is_derived) continue;
				if (batch.current.has(source)) return true;
			}
			return false;
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
			this.transfer_reactions(batch.#dirty_reactions);
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
							this.#dirty_reactions.delete(effect);
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
			for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], this.#dirty_reactions);
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
			for (let batch = first_batch; batch !== null; batch = batch.next) {
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
				if (!batch.started || current.length === 0) continue;
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
							} else batch.add_dirty_reaction(effect, DIRTY);
						}
					}
					if (batch.#scheduled.length > 0 && !batch.#decrement_queued) {
						batch.apply();
						for (var root of batch.#resolve()) batch.#traverse(root, [], []);
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
		* @param {Map<Effect, number>} dirty_reactions
		*/
		transfer_reactions(dirty_reactions) {
			for (const [effect, status] of dirty_reactions) this.add_dirty_reaction(effect, status);
			dirty_reactions.clear();
		}
		/**
		* @param {Effect} effect
		* @param {number} status
		*/
		add_dirty_reaction(effect, status) {
			if (status === 2048 || this.#dirty_reactions.get(effect) !== 2048) this.#dirty_reactions.set(effect, status);
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
					if (!batch.started) batch.flush();
				});
			}
			return current_batch;
		}
		apply() {
			if (!async_mode_flag || !this.is_fork && this.prev === null && this.next === null) {
				batch_values = null;
				return;
			}
			batch_values = /* @__PURE__ */ new Map();
			for (const [source, [value]] of this.current) batch_values.set(source, value);
			for (let batch = first_batch; batch !== null; batch = batch.next) {
				if (batch === this || batch.is_fork) continue;
				if (batch.id >= this.id || !batch.#intersects(this)) {
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
			this.#scheduled.push(effect);
		}
		#unlink() {
			if (!this.linked) return;
			var prev = this.prev;
			var next = this.next;
			if (prev === null) first_batch = next;
			else prev.next = next;
			if (next === null) last_batch = prev;
			else next.prev = prev;
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
		var prev_previous_batch = previous_batch;
		previous_batch = null;
		is_flushing_sync = true;
		try {
			var result;
			if (fn) {
				flushSync();
				result = fn();
			}
			while (true) {
				flush_tasks();
				if (current_batch === null) return result;
				current_batch.flush();
			}
		} finally {
			is_flushing_sync = was_flushing_sync;
			previous_batch = prev_previous_batch;
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/sources.js
	/** @import { Derived, Effect, Source, Value } from '#client' */
	/** @type {Set<Effect>} */
	var eager_effects = /* @__PURE__ */ new Set();
	/** @type {Map<Value, any>} */
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
	* @param {Value<V>} source
	* @param {V} value
	* @param {boolean} [should_proxy]
	* @returns {V}
	*/
	function set(source, value, should_proxy = false) {
		if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
		return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
	}
	/**
	* A set of signals we have already seen while traversing in mark_reactions.
	* Not always set to balance the common case of sources only having a couple
	* of (transitive) dependencies (where always creating a Set would be bad for perf)
	* with the edge case of extremely deep or wide dependency arrays with cycles.
	* @type {Set<any> | null}
	*/
	var seen = null;
	/** Number of transitive dependencies, see {@link seen} for more info */
	var count_deps = 0;
	/**
	* @template V
	* @param {Value<V>} source
	* @param {V} value
	* @param {Effect[] | null} [updated_during_traversal]
	* @returns {V}
	*/
	function internal_set(source, value, updated_during_traversal = null) {
		if (!source.equals(value)) {
			if (is_destroying_effect) old_values.set(source, value);
			else if (!old_values.has(source)) old_values.set(source, source.v);
			var batch = Batch.ensure();
			batch.capture(source, value);
			if ((source.f & 2) !== 0) {
				const derived = source;
				if ((source.f & 2048) !== 0) execute_derived(derived);
				if (batch_values === null) update_derived_status(derived);
			}
			source.wv = increment_write_version();
			seen = null;
			count_deps = 0;
			mark_reactions(source, DIRTY, updated_during_traversal);
			seen = null;
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
	* @template {number | bigint} T
	* @param {Source<T>} source
	* @param {1 | -1} [d]
	* @returns {T}
	*/
	function update(source, d = 1) {
		var value = get(source);
		var result = d === 1 ? value++ : value--;
		set(source, value);
		return result;
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
		count_deps += length;
		if (count_deps > 1e5 && seen === null) seen = /* @__PURE__ */ new Set();
		if (seen !== null) {
			if (seen.has(signal)) return;
			seen.add(signal);
		}
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
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			} else if (not_dirty) {
				var effect = reaction;
				if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
				if (updated_during_traversal !== null) updated_during_traversal.push(effect);
				else schedule_effect(effect);
			}
		}
	}
	/**
	* @template T
	* @param {T} value
	* @returns {T}
	*/
	function proxy(value) {
		if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) return value;
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
				this.has?.(target, prop);
				var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
				var s = sources.get(prop);
				if (s !== void 0) {
					var value = get(s);
					if (value === UNINITIALIZED) return;
					if (descriptor && "value" in descriptor) descriptor.value = value;
					else return {
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
				if (s !== void 0 || (active_effect !== null || active_reaction !== null) && (!has || get_descriptor(target, prop)?.writable)) {
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/operations.js
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
	* `child`, for the very common case of an element with exactly one child. Resetting the
	* hydration cursor is part of the same step, so the compiler doesn't have to emit a
	* separate `reset` call for every `<p>{text}</p>` in an app.
	* Don't mark this as side-effect-free, hydration needs to walk all nodes
	* @param {TemplateNode} node
	* @param {boolean} [is_text]
	* @returns {TemplateNode | null}
	*/
	function only_child(node, is_text = false) {
		if (!hydrating) return /* @__PURE__ */ get_first_child(node);
		var first = child(node, is_text);
		reset(node);
		return first;
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
		if (error === HYDRATION_ERROR) throw error;
		if (effect !== null && (effect.f & 16384) !== 0) return;
		while (effect !== null) {
			if ((effect.f & 128) !== 0 && (effect.f & 33570816) === 0) {
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/effects.js
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
	* @param {number} flags
	*/
	function managed(fn, flags = 0) {
		return create_effect(MANAGED_EFFECT | flags, fn);
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
			} catch (error) {
				invoke_error_boundary(error, effect.parent);
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
		effect.f |= 256;
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
		effect.f &= -257;
		resume_children(effect, true);
	}
	/**
	* @param {Effect} effect
	* @param {boolean} local
	*/
	function resume_children(effect, local) {
		if ((effect.f & 256) !== 0) return;
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/legacy.js
	/**
	* @type {Set<Value> | null}
	* @deprecated
	*/
	var captured_signals = null;
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/runtime.js
	/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
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
	* @type {null | Set<Value>}
	*/
	var current_sources = null;
	/** @param {Value} value */
	function push_reaction_value(value) {
		if (active_reaction !== null && (!async_mode_flag && (active_reaction.f & 2097152) !== 0 || (active_reaction.f & 2) !== 0)) (current_sources ??= /* @__PURE__ */ new Set()).add(value);
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
	* @type {null | Value[]}
	*/
	var untracked_writes = null;
	/** @param {null | Value[]} value */
	function set_untracked_writes(value) {
		untracked_writes = value;
	}
	/**
	* @type {number} Used by sources and deriveds for handling updates.
	* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
	**/
	var write_version = 1;
	/** @type {number} Used to version each read of a source of derived to avoid duplicating dependencies inside a reaction */
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
			var deps = update_dependencies(reaction);
			if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (var i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
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
			update_dependencies(reaction);
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
	* @param {Reaction} reaction
	*/
	function update_dependencies(reaction) {
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
		return deps;
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
			if ((derived.f & 512) !== 0) derived.f ^= 512;
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
		active_effect = effect;
		try {
			if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
			else destroy_effect_children(effect);
			execute_effect_teardown(effect);
			var teardown = update_reaction(effect);
			effect.teardown = typeof teardown === "function" ? teardown : null;
			effect.wv = write_version;
		} finally {
			active_effect = previous_effect;
		}
	}
	/**
	* Returns a promise that resolves once any pending state changes have been applied.
	* @returns {Promise<void>}
	*/
	async function tick() {
		if (async_mode_flag) return new Promise((f) => {
			requestAnimationFrame(() => f());
			setTimeout(() => f());
		});
		await Promise.resolve();
		flushSync();
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
			var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (active_reaction.f & 512) !== 0;
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
			var reactions = dep.reactions;
			if (reactions === null) dep.reactions = [derived];
			else if (!includes.call(reactions, derived)) reactions.push(derived);
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/events.js
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
		if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
			target_handler.__removed = false;
			queue_micro_task(() => {
				if (!target_handler.__removed) dom.addEventListener(event_name, target_handler, options);
			});
		} else dom.addEventListener(event_name, target_handler, options);
		return target_handler;
	}
	/**
	* Attaches an event handler to an element and returns a function that removes the handler. Using this
	* rather than `addEventListener` will preserve the correct order relative to handlers added declaratively
	* (with attributes like `onclick`), which use event delegation for performance reasons
	*
	* @param {EventTarget} element
	* @param {string} type
	* @param {EventListener} handler
	* @param {AddEventListenerOptions} [options]
	*/
	function on(element, type, handler, options = {}) {
		var target_handler = create_event(type, element, handler, options);
		return () => {
			target_handler.__removed = true;
			element.removeEventListener(type, target_handler, options);
		};
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
			target_handler.__removed = true;
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
	var last_propagated_event_clear_scheduled = false;
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
		if (!last_propagated_event_clear_scheduled) {
			last_propagated_event_clear_scheduled = true;
			setTimeout(() => {
				last_propagated_event_clear_scheduled = false;
				last_propagated_event = null;
			});
		}
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/reconciler.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/template.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/create-subscriber.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
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
		/** @type {Map<Effect, number>} */
		#dirty_reactions = /* @__PURE__ */ new Map();
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
					const comment_data = read_hydration_instruction(this.#hydrate_open);
					hydrate_next();
					const server_rendered_pending = comment_data === "[!";
					if (comment_data.startsWith("[?")) {
						const serialized_error = JSON.parse(comment_data.slice(2));
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
				if (this.#is_destroyed()) return;
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
				if (this.#is_destroyed()) return;
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
		#is_destroyed() {
			return (this.#effect.f & (DESTROYED | DESTROYING)) !== 0;
		}
		#hydrate_pending_content() {
			const pending = this.#props.pending;
			if (!pending) return;
			this.is_pending = true;
			this.#pending_effect = branch(() => pending(this.#anchor));
			queue_micro_task(() => {
				if (this.#is_destroyed()) return;
				var fragment = this.#offscreen_fragment = document.createDocumentFragment();
				var anchor = create_text();
				var handled = false;
				fragment.append(anchor);
				this.#main_effect = this.#run(() => {
					try {
						return branch(() => this.#children(anchor));
					} catch (error) {
						try {
							this.error(error);
							handled = true;
						} catch (error) {
							invoke_error_boundary(error, this.#effect.parent);
						}
						return null;
					}
				});
				if (this.#main_effect === null) {
					this.#offscreen_fragment = null;
					if (handled) this.#resolve(current_batch);
					return;
				}
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
			batch.transfer_reactions(this.#dirty_reactions);
		}
		/**
		* Defer an effect inside a pending boundary until the boundary resolves
		* @param {Effect} effect
		*/
		defer_effect(effect) {
			defer_effect(effect, this.#dirty_reactions);
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
			if (error === HYDRATION_ERROR) throw error;
			if (!this.#props.onerror && !this.#props.failed) throw error;
			if (current_batch?.is_fork) {
				if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
				if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
				if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
				current_batch.oncommit(() => {
					if (!this.#is_destroyed()) this.#handle_error(error);
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
				if (this.#is_destroyed()) return;
				const { reset, invoke_onerror } = this.#create_reset(transformed_error);
				invoke_onerror();
				if (failed && !this.#is_destroyed()) this.#failed_effect = this.#run(() => {
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
				if (this.#is_destroyed()) return;
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/render.js
	/** @import { ComponentContext, Effect, EffectNodes, TemplateNode } from '#client' */
	/** @import { Component, ComponentType, SvelteComponent, MountOptions } from '../../index.js' */
	/**
	* This is normally true — block effects should run their intro transitions —
	* but is false during hydration (unless `options.intro` is `true`) and
	* when creating the children of a `<svelte:element>` that just changed tag
	*/
	var should_intro = true;
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
				should_intro = intro;
				component = Component(anchor_node, props) || mark_as_component();
				should_intro = true;
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/branches.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/if.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/each.js
	/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, TemplateNode, TransitionManager } from '#client' */
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
		/** @type {Map<Batch, Set<any>>} */
		var pending = /* @__PURE__ */ new Map();
		var first_run = true;
		/**
		* @param {Batch} batch
		*/
		function commit(batch) {
			if ((state.effect.f & 16384) !== 0) return;
			state.pending.delete(batch);
			var array = get(each_array);
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
				var array = get(each_array);
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
	* @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>, collection: () => V[]) => void} render_fn
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/snippet.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/timing.js
	/** @import { Raf } from '#client' */
	var now = () => performance.now();
	/** @type {Raf} */
	var raf = {
		tick: /** @param {any} _ */ (_) => requestAnimationFrame(_),
		now: () => now(),
		tasks: /* @__PURE__ */ new Set()
	};
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/loop.js
	/** @import { TaskCallback, Task, TaskEntry } from '#client' */
	/**
	* @returns {void}
	*/
	function run_tasks() {
		const now = raf.now();
		raf.tasks.forEach((task) => {
			if (!task.c(now)) {
				raf.tasks.delete(task);
				task.f();
			}
		});
		if (raf.tasks.size !== 0) raf.tick(run_tasks);
	}
	/**
	* Creates a new task that runs on each raf frame
	* until it returns a falsy value or is aborted
	* @param {TaskCallback} callback
	* @returns {Task}
	*/
	function loop(callback) {
		/** @type {TaskEntry} */
		let task;
		if (raf.tasks.size === 0) raf.tick(run_tasks);
		return {
			promise: new Promise((fulfill) => {
				raf.tasks.add(task = {
					c: callback,
					f: fulfill
				});
			}),
			abort() {
				raf.tasks.delete(task);
			}
		};
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/transitions.js
	/** @import { AnimateFn, Animation, AnimationConfig, EachItem, Effect, EffectNodes, TransitionFn, TransitionManager } from '#client' */
	/**
	* @param {Element} element
	* @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
	* @returns {void}
	*/
	function dispatch_event(element, type) {
		without_reactive_context(() => {
			element.dispatchEvent(new CustomEvent(type));
		});
	}
	/**
	* Converts a property to the camel-case format expected by Element.animate(), KeyframeEffect(), and KeyframeEffect.setKeyframes().
	* @param {string} style
	* @returns {string}
	*/
	function css_property_to_camelcase(style) {
		if (style === "float") return "cssFloat";
		if (style === "offset") return "cssOffset";
		if (style.startsWith("--")) return style;
		const parts = style.split("-");
		if (parts.length === 1) return parts[0];
		return parts[0] + parts.slice(1).map(
			/** @param {any} word */
			(word) => word[0].toUpperCase() + word.slice(1)
		).join("");
	}
	/**
	* @param {string} css
	* @returns {Keyframe}
	*/
	function css_to_keyframe(css) {
		/** @type {Keyframe} */
		const keyframe = {};
		const parts = css.split(";");
		for (const part of parts) {
			const [property, value] = part.split(":");
			if (!property || value === void 0) break;
			const formatted_property = css_property_to_camelcase(property.trim());
			keyframe[formatted_property] = value.trim();
		}
		return keyframe;
	}
	/** @param {number} t */
	var linear = (t) => t;
	/** @type {Effect | null} */
	var animation_effect_override = null;
	/**
	* Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
	* and attaches it to the block, so that moves can be animated following reconciliation.
	* @template P
	* @param {Element} element
	* @param {() => AnimateFn<P | undefined>} get_fn
	* @param {(() => P) | null} get_params
	*/
	function animation(element, get_fn, get_params) {
		var nodes = (animation_effect_override ?? active_effect).nodes;
		/** @type {DOMRect} */
		var from;
		/** @type {DOMRect} */
		var to;
		/** @type {Animation | undefined} */
		var animation;
		/** @type {null | { position: string, width: string, height: string, transform: string }} */
		var original_styles = null;
		nodes.a ??= {
			element,
			measure() {
				from = this.element.getBoundingClientRect();
			},
			apply() {
				animation?.abort();
				to = this.element.getBoundingClientRect();
				if (from.left !== to.left || from.right !== to.right || from.top !== to.top || from.bottom !== to.bottom) {
					const options = get_fn()(this.element, {
						from,
						to
					}, get_params?.());
					animation = animate(this.element, options, void 0, 1, () => {}, () => {
						animation?.abort();
						animation = void 0;
					});
				}
			},
			fix() {
				if (element.getAnimations().length) return;
				var { position, width, height } = getComputedStyle(element);
				if (position !== "absolute" && position !== "fixed") {
					var style = element.style;
					original_styles = {
						position: style.position,
						width: style.width,
						height: style.height,
						transform: style.transform
					};
					style.position = "absolute";
					style.width = width;
					style.height = height;
					var to = element.getBoundingClientRect();
					if (from.left !== to.left || from.top !== to.top) {
						var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
						style.transform = style.transform ? `${style.transform} ${transform}` : transform;
					}
				}
			},
			unfix() {
				if (original_styles) {
					var style = element.style;
					style.position = original_styles.position;
					style.width = original_styles.width;
					style.height = original_styles.height;
					style.transform = original_styles.transform;
				}
			}
		};
		nodes.a.element = element;
	}
	/**
	* Called inside block effects as `$.transition(...)`. This creates a transition manager and
	* attaches it to the current effect — later, inside `pause_effect` and `resume_effect`, we
	* use this to create `intro` and `outro` transitions.
	* @template P
	* @param {number} flags
	* @param {HTMLElement} element
	* @param {() => TransitionFn<P | undefined>} get_fn
	* @param {(() => P) | null} get_params
	* @returns {void}
	*/
	function transition(flags, element, get_fn, get_params) {
		var is_intro = (flags & 1) !== 0;
		var is_outro = (flags & 2) !== 0;
		var is_both = is_intro && is_outro;
		var is_global = (flags & 4) !== 0;
		/** @type {'in' | 'out' | 'both'} */
		var direction = is_both ? "both" : is_intro ? "in" : "out";
		/** @type {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig) | undefined} */
		var current_options;
		var inert = element.inert;
		/**
		* The default overflow style, stashed so we can revert changes during the transition
		* that are necessary to work around a Safari <18 bug
		* TODO 6.0 remove this, if older versions of Safari have died out enough
		*/
		var overflow = element.style.overflow;
		/** @type {Animation | undefined} */
		var intro;
		/** @type {Animation | undefined} */
		var outro;
		function get_options() {
			return without_reactive_context(() => {
				return current_options ??= get_fn()(element, get_params?.() ?? {}, { direction });
			});
		}
		/** @type {TransitionManager} */
		var transition = {
			is_global,
			in() {
				element.inert = inert;
				if (!is_intro) {
					outro?.abort();
					outro?.reset?.();
					return;
				}
				if (!is_outro) intro?.abort();
				intro = animate(element, get_options(), outro, 1, () => {
					dispatch_event(element, "introstart");
				}, () => {
					dispatch_event(element, "introend");
					intro?.abort();
					intro = current_options = void 0;
					element.style.overflow = overflow;
				});
			},
			out(fn) {
				if (!is_outro) {
					fn?.();
					current_options = void 0;
					return;
				}
				element.inert = true;
				outro = animate(element, get_options(), intro, 0, () => {
					dispatch_event(element, "outrostart");
				}, () => {
					dispatch_event(element, "outroend");
					fn?.();
				});
			},
			stop: () => {
				intro?.abort();
				outro?.abort();
			}
		};
		var e = active_effect;
		(e.nodes.t ??= []).push(transition);
		if (is_intro && should_intro) {
			var run = is_global;
			if (!run) {
				var block = e.parent;
				while (block && (block.f & 65536) !== 0) while (block = block.parent) if ((block.f & 16) !== 0) break;
				run = !block || (block.f & 32768) !== 0;
			}
			if (run) effect(() => {
				untrack(() => transition.in());
			});
		}
	}
	/**
	* Animates an element, according to the provided configuration
	* @param {Element} element
	* @param {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig)} options
	* @param {Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
	* @param {number} t2 The target `t` value — `1` for intro, `0` for outro
	* @param {(() => void)} on_begin Called just before beginning the animation
	* @param {(() => void)} on_finish Called after successfully completing the animation
	* @returns {Animation}
	*/
	function animate(element, options, counterpart, t2, on_begin, on_finish) {
		var is_intro = t2 === 1;
		var aborted = false;
		if (is_function(options)) {
			/** @type {Animation} */
			var a;
			queue_micro_task(() => {
				if (aborted) return;
				a = animate(element, options({ direction: is_intro ? "in" : "out" }), counterpart, t2, on_begin, on_finish);
			});
			return {
				abort: () => {
					aborted = true;
					a?.abort();
				},
				deactivate: () => a?.deactivate(),
				reset: () => a?.reset(),
				t: () => a?.t() ?? 1 - t2
			};
		}
		counterpart?.deactivate();
		if (!options?.duration && !options?.delay) {
			on_begin();
			on_finish();
			return {
				abort: noop,
				deactivate: noop,
				reset: noop,
				t: () => t2
			};
		}
		const { delay = 0, css, tick, easing = linear } = options;
		/** @type {globalThis.Animation} */
		var animation;
		var get_t = () => 1 - t2;
		queue_micro_task(() => {
			if (aborted) return;
			var keyframes = [];
			if (is_intro && counterpart === void 0) {
				if (tick) tick(0, 1);
				if (css) {
					var styles = css_to_keyframe(css(0, 1));
					keyframes.push(styles, styles);
				}
			}
			animation = element.animate(keyframes, {
				duration: delay,
				fill: "forwards"
			});
			animation.onfinish = () => {
				animation.cancel();
				on_begin();
				var t1 = counterpart?.t() ?? 1 - t2;
				counterpart?.abort();
				var delta = t2 - t1;
				var duration = options.duration * Math.abs(delta);
				var keyframes = [];
				if (duration > 0) {
					/**
					* Whether or not the CSS includes `overflow: hidden`, in which case we need to
					* add it as an inline style to work around a Safari <18 bug
					* TODO 6.0 remove this, if possible
					*/
					var needs_overflow_hidden = false;
					if (css) {
						var n = Math.ceil(duration / (1e3 / 60));
						for (var i = 0; i <= n; i += 1) {
							var t = t1 + delta * easing(i / n);
							var styles = css_to_keyframe(css(t, 1 - t));
							keyframes.push(styles);
							needs_overflow_hidden ||= styles.overflow === "hidden";
						}
					}
					if (needs_overflow_hidden)
 /** @type {HTMLElement} */ element.style.overflow = "hidden";
					get_t = () => {
						var time = animation.currentTime;
						return t1 + delta * easing(time / duration);
					};
					if (tick) loop(() => {
						if (animation.playState !== "running") return false;
						var t = get_t();
						tick(t, 1 - t);
						return true;
					});
				}
				animation = element.animate(keyframes, {
					duration,
					fill: "forwards"
				});
				animation.onfinish = () => {
					get_t = () => t2;
					tick?.(t2, 1 - t2);
					on_finish();
				};
			};
		});
		return {
			abort: () => {
				aborted = true;
				if (animation) {
					animation.cancel();
					animation.effect = null;
					animation.onfinish = noop;
				}
			},
			deactivate: () => {
				on_finish = noop;
			},
			reset: () => {
				if (t2 === 0) tick?.(1, 0);
			},
			t: () => get_t()
		};
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/attachments.js
	/** @import { Effect } from '#client' */
	/**
	* @param {Element} node
	* @param {() => (node: Element) => void} get_fn
	*/
	function attach(node, get_fn) {
		/** @type {false | undefined | ((node: Element) => void)} */
		var fn = void 0;
		/** @type {Effect | null} */
		var e;
		managed(() => {
			if (fn !== (fn = get_fn())) {
				if (e) {
					destroy_effect(e);
					e = null;
				}
				if (fn) e = branch(() => {
					effect(() => fn(node));
				});
			}
		});
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/shared/attributes.js
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
				value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/class.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/style.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/attributes.js
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
		var previous = attributes[attribute];
		if (previous === (attributes[attribute] = value)) return;
		if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
		if (value == null) element.removeAttribute(attribute);
		else if (typeof value !== "string" && get_setters(element).has(attribute)) element[attribute] = value;
		else if (!(hydrating && (typeof value === "number" || typeof value === "boolean") && previous === String(value))) element.setAttribute(attribute, value);
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
	/** @type {Map<string, Set<string>>} */
	var setters_cache = /* @__PURE__ */ new Map();
	/** @param {Element} element */
	function get_setters(element) {
		var cache_key = element.getAttribute("is") || element.nodeName;
		var setters = setters_cache.get(cache_key);
		if (setters) return setters;
		setters_cache.set(cache_key, setters = /* @__PURE__ */ new Set());
		var descriptors;
		var proto = element;
		var element_proto = Element.prototype;
		while (element_proto !== proto) {
			descriptors = get_descriptors(proto);
			for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.add(key);
			proto = get_prototype_of(proto);
		}
		return setters;
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
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
	function bind_this(element_or_component = mark_as_component(), update, get_value, get_parts) {
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/store.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/client/reactivity/props.js
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/map.js
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
		getOrInsert(key, value) {
			if (!super.has(key)) this.set(key, value);
			return this.get(key);
		}
		/**
		* @param {K} key
		* @param {(key: K) => V} callbackFn
		*/
		getOrInsertComputed(key, callbackFn) {
			if (!super.has(key)) this.set(key, callbackFn(key));
			return this.get(key);
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/reactive-value.js
	/**
	* @template T
	*/
	var ReactiveValue = class {
		#fn;
		#subscribe;
		/**
		*
		* @param {() => T} fn
		* @param {(update: () => void) => void} onsubscribe
		*/
		constructor(fn, onsubscribe) {
			this.#fn = fn;
			this.#subscribe = createSubscriber(onsubscribe);
		}
		get current() {
			this.#subscribe();
			return this.#fn();
		}
	};
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/reactivity/media-query.js
	var parenthesis_regex = /\(.+\)/;
	var non_parenthesized_keywords = /* @__PURE__ */ new Set([
		"all",
		"print",
		"screen",
		"and",
		"or",
		"not",
		"only"
	]);
	/**
	* Creates a media query and provides a `current` property that reflects whether or not it matches.
	*
	* Use it carefully — during server-side rendering, there is no way to know what the correct value should be, potentially causing content to change upon hydration.
	* If you can use the media query in CSS to achieve the same effect, do that.
	*
	* ```svelte
	* <script>
	* 	import { MediaQuery } from 'svelte/reactivity';
	*
	* 	const large = new MediaQuery('min-width: 800px');
	* <\/script>
	*
	* <h1>{large.current ? 'large screen' : 'small screen'}</h1>
	* ```
	* @extends {ReactiveValue<boolean>}
	* @since 5.7.0
	*/
	var MediaQuery = class extends ReactiveValue {
		/**
		* @param {string} query A media query string
		* @param {boolean} [fallback] Fallback value for the server
		*/
		constructor(query, fallback) {
			let final_query = parenthesis_regex.test(query) || query.split(/[\s,]+/).some((keyword) => non_parenthesized_keywords.has(keyword.trim())) ? query : `(${query})`;
			const q = window.matchMedia(final_query);
			super(() => q.matches, (update) => on(q, "change", update));
		}
	};
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/internal/disclose-version.js
	if (typeof window !== "undefined") ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
	-(Math.pow(10, 8) * 24 * 60 * 60 * 1e3);
	/**
	* @constant
	* @name millisecondsInDay
	* @summary Milliseconds in 1 day.
	*/
	var millisecondsInDay = 864e5;
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/constructFrom.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/toDate.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/addDays.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/defaultOptions.js
	var defaultOptions = {};
	function getDefaultOptions() {
		return defaultOptions;
	}
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeek.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
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
	function getTimezoneOffsetInMilliseconds$1(date) {
		const _date = toDate$1(date);
		const utcDate = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate(), _date.getHours(), _date.getMinutes(), _date.getSeconds(), _date.getMilliseconds()));
		utcDate.setUTCFullYear(_date.getFullYear());
		return +date - +utcDate;
	}
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeDates.js
	function normalizeDates(context, ...dates) {
		const normalize = constructFrom.bind(null, context || dates.find((date) => typeof date === "object"));
		return dates.map(normalize);
	}
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfDay.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/differenceInCalendarDays.js
	/**
	* The {@link differenceInCalendarDays} function options.
	*/
	/**
	* @name differenceInCalendarDays
	* @category Day Helpers
	* @summary Get the number of calendar days between the given dates.
	*
	* @description
	* Get the number of calendar days between the given dates. This means that the times are removed
	* from the dates and then the difference in days is calculated.
	*
	* @param laterDate - The later date
	* @param earlierDate - The earlier date
	* @param options - The options object
	*
	* @returns The number of calendar days
	*
	* @example
	* // How many calendar days are between
	* // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
	* const result = differenceInCalendarDays(
	*   new Date(2012, 6, 2, 0, 0),
	*   new Date(2011, 6, 2, 23, 0)
	* )
	* //=> 366
	* // How many calendar days are between
	* // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
	* const result = differenceInCalendarDays(
	*   new Date(2011, 6, 3, 0, 1),
	*   new Date(2011, 6, 2, 23, 59)
	* )
	* //=> 1
	*/
	function differenceInCalendarDays(laterDate, earlierDate, options) {
		const [laterDate_, earlierDate_] = normalizeDates(options?.in, laterDate, earlierDate);
		const laterStartOfDay = startOfDay(laterDate_);
		const earlierStartOfDay = startOfDay(earlierDate_);
		const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds$1(laterStartOfDay);
		const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds$1(earlierStartOfDay);
		return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
	}
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getHours.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getMinutes.js
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
	// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/getSeconds.js
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
	// src/lib/core/time.ts
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
	/** Calendar-day difference between two timestamps */
	function diffDays(a, b) {
		return differenceInCalendarDays(a, b);
	}
	/**
	* Whether an event overlaps [start, end). A zero-length event (a deadline,
	* a marker) has no extent to overlap with, so it counts where it sits —
	* including exactly at `start`, which the plain interval test drops.
	*/
	function overlapsRange(ev, start, end) {
		return ev.start < end && (ev.end > start || ev.start >= start);
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
	/** Does an event span more than one calendar day? */
	function isMultiDay(ev) {
		return sod(ev.start.getTime()) !== sod(ev.end.getTime() - 1);
	}
	/** Is an event effectively all-day? (allDay flag, or spans ≥24h with midnight boundaries) */
	function isAllDay(ev) {
		if (ev.allDay) return true;
		if (ev.end.getTime() < addDaysMs(ev.start.getTime(), 1)) return false;
		const s = ev.start;
		return s.getHours() === 0 && s.getMinutes() === 0 && s.getSeconds() === 0;
	}
	/**
	* Compute how an event appears on a specific day.
	* Returns null if the event doesn't overlap the day.
	*/
	function segmentForDay(ev, dayMs) {
		const dayStart = sod(dayMs);
		const dayEnd = addDaysMs(dayStart, 1);
		const evStart = ev.start.getTime();
		const evEnd = ev.end.getTime();
		if (evStart >= dayEnd || evEnd <= dayStart) return null;
		const firstDayMs = sod(evStart);
		const lastDayMs = sod(evEnd - 1);
		const totalDays = diffDays(lastDayMs, firstDayMs) + 1;
		const dayIndex = diffDays(dayStart, firstDayMs) + 1;
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
	var _labels = {
		today: "Today",
		yesterday: "Yesterday",
		tomorrow: "Tomorrow",
		day: "Day",
		week: "Week",
		month: "Month",
		planner: "Planner",
		agenda: "Agenda",
		scroll: "Scroll",
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
		unavailable: "Unavailable",
		noViews: "No views registered.",
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
	/** Get the current default locale */
	function getDefaultLocale() {
		return defaultLocale;
	}
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
	var numCache = /* @__PURE__ */ new Map();
	/** A number in the locale's own digits ("٧" in ar-SA), optionally zero-padded. */
	function fmtNum(n, locale, minDigits = 1) {
		const loc = locale ?? defaultLocale;
		const key = `${loc}|${minDigits}`;
		let f = numCache.get(key);
		if (!f) {
			f = new Intl.NumberFormat(loc, {
				useGrouping: false,
				minimumIntegerDigits: minDigits
			});
			numCache.set(key, f);
		}
		return f.format(n);
	}
	/** Day-of-month in the locale's digits: "19", "١٩". */
	function fmtDayNum(ms, locale) {
		return fmtNum(new Date(ms).getDate(), locale);
	}
	/**
	* Whether the compact "9a" / "12:30p" style fits the locale: a 12-hour clock
	* whose day periods are Latin AM/PM. Other 12-hour locales (ar "ص"/"م")
	* get Intl's own day period instead.
	*/
	var compactCache = /* @__PURE__ */ new Map();
	function isCompact12h(locale) {
		const loc = locale ?? defaultLocale;
		if (is24HourLocale(loc)) return false;
		let c = compactCache.get(loc);
		if (c === void 0) {
			const period = new Intl.DateTimeFormat(loc, {
				hour: "numeric",
				hour12: true
			}).formatToParts(new Date(2e3, 0, 1, 9)).find((p) => p.type === "dayPeriod")?.value ?? "";
			c = /^a\W*m\W*$/i.test(period);
			compactCache.set(loc, c);
		}
		return c;
	}
	var dtfCache$1 = /* @__PURE__ */ new Map();
	function dtf(locale, withMinutes) {
		const loc = locale ?? defaultLocale;
		const key = `${loc}|${withMinutes}`;
		let f = dtfCache$1.get(key);
		if (!f) {
			f = new Intl.DateTimeFormat(loc, withMinutes ? {
				hour: "numeric",
				minute: "2-digit"
			} : { hour: "numeric" });
			dtfCache$1.set(key, f);
		}
		return f;
	}
	/**
	* Hour index (0-23) split for a timetable gutter: the numeral and the small
	* part set beside it — `['13', '00']` in 24h locales, `['1', 'pm']` in 12h.
	*/
	function fmtHParts(h, locale) {
		if (is24HourLocale(locale)) return [fmtNum(h, locale), fmtNum(0, locale, 2)];
		if (!isCompact12h(locale)) {
			const parts = dtf(locale, false).formatToParts(new Date(2e3, 0, 1, h));
			return [parts.find((p) => p.type === "hour")?.value ?? fmtNum(h % 12 || 12, locale), parts.find((p) => p.type === "dayPeriod")?.value ?? ""];
		}
		return [fmtNum(h % 12 || 12, locale), h < 12 ? "am" : "pm"];
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
	* Format a date range label in the locale's own order:
	* "Sep 21 – 27, 2026" (en-US), "21–27 wrz 2026" (pl-PL),
	* "Dec 28, 2026 – Jan 3, 2027" across a year.
	*
	* `weekEndMs` is the last day shown (inclusive); default: six days on.
	*/
	function fmtWeekRange(weekStartMs, locale, weekEndMs) {
		const loc = locale ?? defaultLocale;
		const s = new Date(weekStartMs);
		const e = new Date(weekEndMs ?? addDaysMs(weekStartMs, 6));
		return new Intl.DateTimeFormat(loc, {
			month: "short",
			day: "numeric",
			year: "numeric"
		}).formatRange(s, e).replace(/[\u2009\u202f]/g, " ");
	}
	/**
	* Format a Date as a compact time string.
	*
	* 12-hour locales → "9a", "12:30p"
	* 24-hour locales → "9:00", "14:30"
	* other 12-hour locales → Intl's own, in the locale's digits ("٧:٠٠ ص")
	*/
	function fmtTime$1(d, locale) {
		const h = d.getHours();
		const m = d.getMinutes();
		if (is24HourLocale(locale)) return `${fmtNum(h, locale)}:${fmtNum(m, locale, 2)}`;
		if (!isCompact12h(locale)) return dtf(locale, true).format(d);
		const suffix = h >= 12 ? "p" : "a";
		return `${fmtNum(h % 12 || 12, locale)}:${fmtNum(m, locale, 2)}${suffix}`;
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
	// src/lib/views/shared/context.svelte.ts
	function useCalendarContext() {
		const raw = getContext$1("calendar");
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
			},
			announce: (text) => raw?.announce(text)
		};
	}
	// src/lib/views/shared/EventContent.svelte
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/tzTokenizeDate/index.js
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/newDateUTC/index.js
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/tzParseTimezone/index.js
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/_lib/tzPattern/index.js
	/** Regex to identify the presence of a time zone specifier in a date string */
	var tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/toDate/index.js
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/toZonedTime/index.js
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
	// ../../node_modules/.pnpm/date-fns-tz@3.2.0_date-fns@4.4.0/node_modules/date-fns-tz/dist/esm/fromZonedTime/index.js
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
	// src/lib/core/timezone.ts
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
	/**
	* Get the current time as it appears in the given timezone.
	*/
	function nowInZone(timezone) {
		return toZonedTime$1(/* @__PURE__ */ new Date(), timezone);
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
		const unzoneRange = (range) => ({
			start: fromZonedTime(range.start, timezone),
			end: fromZonedTime(range.end, timezone)
		});
		const wrapped = { async fetchEvents(range) {
			return (await adapter.fetchEvents(unzoneRange(range))).map(zoneEvent);
		} };
		if (adapter.fetchEventsSync) wrapped.fetchEventsSync = (range) => adapter.fetchEventsSync(unzoneRange(range))?.map(zoneEvent);
		if (adapter.createEvent) wrapped.createEvent = async (event) => zoneEvent(await adapter.createEvent(unzonePartial(event)));
		if (adapter.updateEvent) wrapped.updateEvent = async (id, patch) => zoneEvent(await adapter.updateEvent(id, unzonePartial(patch)));
		if (adapter.deleteEvent) wrapped.deleteEvent = (id) => adapter.deleteEvent(id);
		return wrapped;
	}
	// src/lib/core/clock.svelte.ts
	function createClock(timezone) {
		const now = () => timezone ? toZonedTime(Date.now(), timezone).getTime() : Date.now();
		const t0 = now();
		let tick = /* @__PURE__ */ state(proxy(t0));
		let today = /* @__PURE__ */ state(proxy(sod(t0)));
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
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/generated/engine-break-data.js
	var classMaps = {
		"chromium/line_normal": [0, 182],
		"chromium/line_normal_cj": [1, 182],
		"apple/line_normal": [2, 183],
		"apple/line": [3, 183],
		"apple/line_cj": [4, 183],
		"chromium/char": [5, 148],
		"apple/char": [6, 149],
		"gecko/line": [7, 196],
		"gecko/east_asian_width": [8, 38],
		"chromium/script": [9, 80]
	};
	var classRunsVarints = "CC0AgAEAogEBgQEAowERLQCkAQBNADwABQAiACUABQA8AA8ApQEABQAiAE4ApgEATgCnAQlpAU4CBQBNAAUZEwAPACIAqAECBRkTAA8AIACpAQAFBS0AqgEZLQBqAEUAJQAiAFUAIgAFAQcAEAAwAC4ABQCAAQAQAAUARgBVAQcAVgAFAAcAqwEBBwAwADQCBwBFFhMABx4TAAfAAxMCBQCsAQkFADAAVgIwAFYAMAEFAAcFBQATAAcAMAEHAAUABwAFAFYEEwQFAQETBQFXAE8AJgBXACYAVwAmAFcBJgBPAiYAGAAmAE8AGACtAQ4YAiYGGAEmABgBJg8YAGsBGABrCBgArgEHGAAmAhgBWACvAQNYDCYHFAEAAxQATgAUAwAAFAAFABQABQIUAAAAFAAAExQAAD4UDQEPFIIBNQE6AU8COqUBNQAAJQEBAC8BALABAFkBAAEBAD0AACwEAFkABAABAQQAAQEEADYABAcAGjEDAAMxAQEKAASCAQBsAgoCbQCxAQCDAQEKCh0AbgCyAQFQAG4fCgBvCQoKWgkdCUcAbQFHAgoAWmIKAFAACgYdAGwACgUdAQoBHQAKAx0BCglHEwoAAACzAQAKAB0dChodAQAyCiUBCgQAAQ0ACUcgCggdAwoAgwEAUAAKAQAAHQG0ARUBAwQAAQgEAAECBAABBAQBAA4BAAAYCgIdAQAACgAACgoEAB4KAEgBggEEAACEAQcdKQoXHQBsHB0CBAAGEAEkEQAEAAYABAABAgYHBAMGACkBBgABASYBGAIEBxEBAQEEAQkJDgcBBxEAAQAEAQYAAAcBAQABAQEAAQETEQAABhEAAAARAgADEQEAAAQAAQAEAQYDBAEAAQYBAAEGACkAAQcAAAQDAAERAAAAEQEBAQQBAAkOAREBUQQBAFEAAQA9AQEABAEAAQQABgAABQEDAAEBAQAVAQAABgEAAAEBAAABAQAAAQEBAAAEAAACBgEEAwABBAEAAgQCAAAEBgADAQAAAAEGAAkOAQQCAQAEAAEJAAEEAAYAAAgBAAACAQAAAQETEQAABhEAAAERAAAEEQEAAAQAAQIGBAQAAAEEAAYAAAEGACkBAAABDgABAQEEAQAJDgABAD0GAAARBQQAAAAEAQYAAAcBAQABAQEAAQETEQAABhEAAAERAAAEEQEAAAQAAQEEAAYDBAEAAQYBAAEGACkGAAIEAwABEQAAABEBAQEEAQAJDgABABEFAQkAAAQAAQAABQECAAIBAAADAQIAAQEAAAABAAABAQIAAQECAAIBAgALAQMAAAQABgAEAQYCAAIGAAACBgAEAQAAAQUAAAQNAAkOCAEAPQABBAAABAIGAAQHAQAAAgEAAAIBExEAAA8RAQAABAABAgQDBgAAAgQAAAIEACkGAAEEAAACEQEAAAEBAAEBAQQBAAkOBgAAIQgBAAQBBgAhBwEAAAIBAAAWAQAACQEAAAQBAQAABAABAAYBBAAGAAQBBgAAAgQAAAMEBgABBAUAAQEAAAEBAQQBAAkOAAABAQAGCwABBAEGCAEAAAIBAAACASURAQQAAQAEAQYDBAAAAgYAAAIGACkAWwABAwACAQAECQEBBAEACQ4IAQBRBQEAAAAEAQYAABEBAgAXAQAACAEAAAABAQAGAQIAAAQDAAAEAQYCBAAAAAQAAAYGAAQFAAkOAQABBgABCwAvFQASABUAhQEGEgMAACIGFQcSAAEJDgEJJAABFQAAABUAAAQVAAAXFQAAABUAAAkVABIAFQCFAQgSABUBAAQVAAAAFQAABhIAAAkOAQADFR8AAAEDIQABASEAXAEhAAkAXAQ2AFwAAQA2AgEBBAUBCQ4JAQAJAAQAAQAEAAEABABwAHEAcABxAQYHAQAAIwEDAA0EALUBBAQACQEEBAEKBAAAIwQAAAEJBQEABAUBAAABAQEhAAkAIQABAwUBXCQAKh8BJwMSACoFEgAnAHIAEgEqARIAHwkOAQkDAQUfASoBEgMfAhIAHwInAR8GJwIfAxIMHwASACcAKgESBScAEgAfACcJDgInABIBFSUBAAAAAQQAAAEBACoBABMDAV+GAUeHAVeIAUgBAAADAQEABgEAAAABAAADAQEAKAEAAAMBAQAgAQAAAwEBAAYBAAAAAQAAAwEBAA4BAAA4AQAAAwEBAEIBAQACBAABAAkaAQIAGQEFAFUBAQAFAQEAAFn+BAEACRkBAHAAcQIASgECIAoBBgARAQMECAASAQIEAQkIABEBAQQLAAwBAAACAQAAAQQLADMfARIAKgYSByoAEgEqCBIAcgASAQkAtgEAFQAJAAEACQA9ABUAEgEACQ4FAAkBBQABCgFuALcBAIkBAHMACgFQAAoCHQC4AQAdCUcFAFgKBgAECgEdIQoAHQAKBABFAQkAHgEAAAIEAwYBBAIGAwABBgAEBQYCBAMAAAECAAE2CQ4dFQEABBUKACsVAwAZFQUACQ4AuQECAAEVNgEBBAEGAAQBAAEBNB8AKgASACoGEgAAAHIAJwASAScHEgUqCRIBAAAECQ4FAAkOBQANFQEAHhgOigEBAAqKAQC6ARMAAwQABgUkASsFJCArCQQDBgEEAF0HKwAAAXQJXgEJADIDCQkyCAQIMgEJAHQBBAAGHREABgMEAQYCBAApAQQBEQkOAAECEQEBJT4ABAAGAQQCBgAEAAYCBAG7AQcAJwEHBgcEAQYBBAIABAkJDgIAAgEJDiMBAQkINQG8AQQAKgEBAAoBBwACPwABDD8ABgY/AgEABQA/AwUBAQA/AQEAvQEBPwAFBAAlEwQUADUwEwQUAxMEFAwTADVFEwAUAWsKGABYKRgATwAYAFoAGABYAhj/ARMVFAEABRQBACUUAQAFFAEABxQAAAAUAAAAFAAAABQAAB4UAQA0FAAADhQAAA0UAQAFFAAAEhQBAAIUAAAGFAC+AQAUAAAGIABqAiAAvwEAwAEAwQEBLQBfAGoBXwCLAQEHAAUALgA0AEUALgDCAQDDAQBFAC4BBwEFAowBACABgQEELQDEAQBGACUBRgAlAEYBJQAFAC4ANAAHAI0BAHUFBQBOAA8AFwF1AI0BBAUAbwUFACAAJQEgAAkAIAAFAMUBASAAjgEDxgEASQktAAUAEwEAAAcHBQAPABcAMAAFAwcHBQAPABcAAAwTAgAGIgAlACIAxwEBIgBVCCIAJQMiACUBIgAlACIAJQAiDT0fGAAmDgACBQBGAAUABwIFAEYIBQAHAQUAVQkFAAcAIwIFABQCBQATADAFBQATBQUAEBMFABMEBQEHBAUABwEFAAcABQswAxMJMA4TAAcBBQMAAwcFIw4FARAmBQAHAAUAByoFAAcABQEHAgUBBwEFAAcCBQAHAAUABwEiAAUABwMFAAcBBQMHAQUABwAFAAcABQUHAAUABwQFAwcDBQEHCQUABwIFAAcEBQAHDAUBBwEFAwcBBQEHAQUBBxEFAQcBBQEHDAUABwIFAAcKBQAHGAUABy4FAIwBFwUADwAXAA8AFwUFAAcGBQEICwUAEABgAGGjAQUAEBgFAxwCEAAIAQsACAMFAhArBQI3FQAKBRQAYQcAIzsHAAVLBwMFJAcKBQ8HAQUDBwkFAQcABQYHARAFBQEHAQUAIwAHAwUBBwEFACMABwMFAgcBBQAHAMgBAAUDBw8FAwcIBQAHCgUBEAEcAAUDCwAQAQcBBQAHAwUAIwAHAAUAEAEFAQgBBwALAAUCDABKAQwAEAAFARABBQAQAgUAEAIFARAHUgAQAQsADAMFACMABQAjBAULHAoFABAAIwAHAAUAIwAHACMAEAAHAAsBBwAFAQcABQAHCgUAEAEFABAACAkFBVIBBQAQABwDEAAFABAABQEQAAUBBwAQABwEBQAQAQUBHAMFARAKBQEIBAwBCAEMAAsDBwAMABwACwAMAAsABwALAAgCBwEMAQcADAEHAgwABQAHAwUABwAjAAgEBwAjAAsBCAALAAgABwELAEoACAEHAAgDDAALAQwAHAEFAQsBFgFKAAUAEAEFABAABQAQAAUAEAUFABACBQAQBQUAHAkFARAOBQAQAQUAEAMFABwABQAcAwUCHAAFAGICBQU8AAUATQDJAQALAgUADwAXAA8AFwAPABcADwAXAA8AFwAPABcADwAXHQcABQIcCAUAEA0FABwNBQAcBAUADwAXHgUADwAXAA8AFwAPABcADwAXAA8AFw8FAMoB/gEBMwUBEEwFAA8AFwAPABcADwAXAA8AFwAPABcADwDLAQAPAMwBAA8AFwAPABcADwAXAA8AFz4FAA8AFwAPABcfBQAPABeGAgUCEBIFARwyBQAcAwUAYgMHGQUBAB8FADdoBV8BHxNuAQIEAQEEAAA2AgkAAQA2AAklAQAAAAEEAAABAQA3AQYAAAEACQ0AAAQWAQgABgEAAAYBAAAGAQAABgEAAAYBAAAGAQAABgEAAAYBAAAfOgE8AC4ANAAuADQCPAAuADQAPAAuADQHIAAFAM0BAEUAIAEFAC4ANAEFAC4ANAAPABcADwAXAA8AFwAPABcDIABNAAUBCQAFASAEBQGLAQIgAAUAXwCJAQBFAM4BBiAABQAgAAUBIAIFAU0ADwBjAA8AYwAPAGMADwBjAF8hABkNAABYDQsA1QENGQAPDQDPAQGPAQANABkAQAAZAA0AOAA5ADgAOQA4ADkAOAA5ADgAOQAZAA0AOAA5ADgAOQA4ADkAOAA5AJABANABAY8BABkIDQORAQGSAQCTAQMNANEBABkDDQFAAJMBABkADAAAABoADQAaAA0AGgANABoADQAaGA0AGh4NABoADQAaAA0AGgUNABoFDQEaAQABkQEDQAANAJABABoADQAaAA0AGgANABoADQAaGA0AGh4NABoADQAaAA0AGgUNABoFDQEaAw0AQAAaAUAADQQAKg0AAF0NAAAPGR8NIxkB0gEIAAANDxoeDQAAJxkHBw8ZHg0XGQAIABkACDUZLg0AGVcNpwEZvzMNP1KUpAENAED2CA0CADYNCAAtAQEJjAIBAAkANgAJDwEJDgEBEwAuNQM6ADUJOh81ATpPAQEEAAEECQcABxMZBWUTAgU/EwRTARMAUwATAFMEEwJTEwAAUw0TAQEABAIBAAQDAQAEFgEBBgEEAAYDAQAEAgAHAQBRAAEFADMKAXMBUAcAAQYxAQ8GAQQHAAEJCQ4FABEECQEAIQEBAAQJDhsBBwQA0wEACRYBCgQABgAECgAAARyGAQIAAgQABgQkAisCJCMrAAQBBgMEAQYBBAEGAF0FMgIJAzIAAAAJCV4DAAEyBB8AEgAVCB8JDgQfAAAoPgUEAQYBBAEGAQQIAAIJAAQHCQAEAAYBAAleAQAAMgIJDx8AFQIfBRUAHwAnABIAJwEfLxUAEgAVAhIBFQESBBUBEgAVABIAFRcABBUKEQAGAQQBBgEJAgEABgApCQAFAQEABQEBAAUBCAAGAQAABgEAACoTAAUIEwAUAxMBBQMATwEaEQcBAQYABAEGAAQBBgAJAAYABAEACQ4FAAACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwACGgMAAhoDAAIaAwsAFocBAwAwiAEDAP8PAe8wAA92AXcBABV2BAAAdgDUARJ3ApQBAHgAeQDVAQB5AHcAeADWAQDXAQCUAQB4FXkoAP8DDQYTCwAEAQQAADEABAkxAAEMMQAABDEAAAAxAAABMQAAATEAAAkxcgoPSOoCCgDYAQDZAU8KAUg1CgZIAAofAAsKAG0CCg8YANoBASgB2wEBlQEAMwAoANwBBQAAQQAYAEEAGABBABgBQQAYAEEAGABBABgAQQDdAQA6BBkAMwAoADMAKAAzACgAMwAoADMAKAAzACgAMwAoADMAKAENADMAKAYZACgAGQAoAAAB3gEBlQEAGQBgAGEAYABhAGAAYQcZAAAAGQDfAQDgAQAZAwAECgAAhgEKAQAAjgEAAACWAQEsAHoAlwEBLABkAJgBASwAmQEALACZAQosAeEBAiwAlgEALBmaAQBkACwAmwECLBmaAQBkACwAmwEALABkAJgBAJwBAOIBAOMBAJwBAOQBAEIJ5QEsQgHmAR5CAgAFQgEABUIBAAVCAQACQgIAAJcBAHoCLAF6AAAG5wEAAAhJAi0A6AEABwEACwEAABkBAAASAQAAAQEAAA4BAQANASEAegEEAAIJAwAsAQIACAFOFAAADAUCAAAULgAsBQAYgQEAHAECADABDgAAWhpvAwAjAQgAHQEEACUBBAQEAB0BAAAACSMBAwAHAQAJBAEpAJ0BAQEACQ4FACMBAwAjAQMAJwEHADMBCgALAQAADgEAAAYBAAABAQAACgEAAA4BAAAGAQAAAQFCALYCAQgAFQEJAAcBFwAFEwAAKRMAAAgTRAAFAQEAAAEAACsBAAABAQIAAAEBABYBAAAACUYBBwAIAS8AEgEAAAEBBAAgAQIAAAkZAQQAAAE/ADcBAwATAQEALQEAEQIEAAABBAQAAwQDEQAAAhEAABwRAQACBAMAACkIAQYABwkAAQYAPwEfACQBAQQDAAQBBQkA6QEIADUBAgAGCRUBAQAaAQQAGQEGAAMBCwAGAU8ASAE2ADIBDAAyAQYABQEjCgMdBwAJRwUACUseAAQeAOoB8AEAHgoAACkBAAABBABZAQABAQ8ABUgHAADrAQdIIAAChAECHScBBwAVAQoECAEVABEBAwQDASUAGwETABYBCAAABgAEAAYB7AEyJA0EAJ0BAQkEMgMAEzIJPgAEASQBBAAkCAAA7QEBBAAGLAECBgMEAQYBBAEBAJ4BAwkABAkAAJ4BAQAYAQYACQ4FAAIEIxEEBAAGBQQAKQAEAAAJDgMJABEBBgARBwAiAQAEAAEAIQABCAABBAAGLwECBggEAAYABAABAVsAAQEJAAEACQMEAAEABgAECQ4AAQAhAAECCQAAEwEKABEBAAAYAQIGAgQBBgMEAQkAAQEJAAEABAEBAAQ9AAYBAAAAAQAAAwEAAA4BAAAJAQAJBQAuAQAEAgYHBAQACQ4FAAEEAQYAAAckAQABJAEAFSQAAAYkAAABJAAABCQAAAA/AAQACQAEAAYABAMGAQABBgEAAQYAnQEBAAA+BQAABAQAAAkBPgEkAQYBAAYEAgAEBAoACWUAAABlAQAAZQAAAWUj7gEAAAB7AB4BQwUeAAAAHgEAAB4AAAIeAEMAAAFDAR4A7wEA8AEAHgJ7AAABewcAAR4cADQBAgYHBAEGAgQABgAEAwEDCQABCQ4BCQAAAAEABAIBHQAvAQAEAQYFBAAGAAQBBgAEAAYBBAAGAQQDAQcACQ6lAQAuAQAEAQYDBAEAAwYBBAAGAQQAIQEJATYCAQ4JAwEBBCEALwECBgcEAQYABAAGAQQBCQEBCgAJDgUADHMSACoBAAQABgAEAQYHBAEBBQAJDgUAE0sbABoVAQAAEgAqABIBJwMSACoEEgMACQ4BFQIJBxW4AQArAQIGCAQABgEEAAFjAD8BCQ4IAQsAAAEGKwEAACsBAAcrAAABKwAAFysABAQGAAABBgEAAgQAXQB8AAYAfAAGAAQCCQgACV5FAAcBAQAmAQIGAwQBAAEEAwYABAABACEAAQAGGgAAEQkEJxEFBAAGAAEDBAAhAAEDCQAhAAEAKQcAABEFBAEGAgQnEQVbDAQABgAEACkCCQABAiEBCQwASAEGAAkhVQAAHgBDAh4AQwAeAEOHAQAJSwUACAEAACQBAAYGBAAABQQABgAEAAEECQkACQ4SAQIAACEANh0BAQAVBAAAAAYGBAAGAQQABgEESAAGAQAAAQEAACUBBQQCAAAEAAABBAAABgQAWwAEBwAJDgUABQEAAAEBAAAfAQQGAAABBAAAAQYABAAGAAQAAQYACQ41AAlL9QEAET4ACQEEAQYBCQYAAQQAfAAGDCsAACErAQYEBAIAAQYBBABdAQkKMgk+AB5UAAABDgAcAQNREAEMAAAJmQcBZQBuAQAABAkKAMMBAcsUAGIBDADXBAECRAJMIwEATAIBAEQATABEAEzuAQEARAFMsgEBAEQGnwEAfQB+Ap8BAH0AfgB9AH4ABAUBDgSpHwDNAwEARABMdgG4NQAdoAELHgJDAh4JoAHFDQC4BAEGAB4BAAAJDgMAAQlOAQAACQ4FAB0BAQAEBAAJCQAvAQYEAgkJAQAJAAEJAAkOAAAGAQAAFAEEABIB0gMAAKEBAgADoQECAAF0CUvFAQBWAQEJAQFkAEoBAwAABAABNgYGAAMEDAE/AANAAPEBCgABkgEB8gECZggA9y8NB2b/BQ3VA2coAADzAQgNFWZgAHJm/EMAA2cAAAZnAAABZwAAogINDgAAGhwAAhoBAAAaDQADGgcAiwMNgxIAagEEAAwBAgAIAQYACQEBAAABAQQACQMt2x4A7wE3CfQBAjcCALMDNwUAFjcOABA3DgAtGAEAFhgIAHMFOwD1AQUJACYFAQA7BQF/AhgCBQV/By0HGAEFBhgdBQMYPAUUAEEUAvUBABR5ABMFCwATBQsAVlIIABZSAQWGAQBUBQAARgUAAAEFAQAABQEAAQUBAAMFAAALBQAAAAUAAAYFAABABQAAAwUBAAcFAAAGBQAAGwUAAAMFAAAEBQAAAAUCAAYFAADTAgUBAKMCBQEAMWn/AwE2BAMBMQQHAQAEDQEABAEBAwkAAQ4ABAQAAA4EzwgAHhMFAAUT1AEABgQAABAEAQAGBAAAAQQAAAQEBAA9NSAAADpvACwBAgAGBAYBAQAJDgMAAQG/AgAdAQAEEAArAQMECQ4EAAA9zwMAGwEDBAkO8wEAAR4AAAlL5wEAAB4BAAAeBgABHgQAAB7pAQAGAQAAAwEAAAEBAAAOAQAAxAEBAQAIAQYEKABDAQYEAAEDAAkOAwABRJAGADoFACUCBQAlAwVLADwFwQEAAwoAABoKAAABCgAAAAoBAAAKAAAJCgAAAwoAAAAKAAAACgUAAAoDAAAKAAAACgAAAAoAAAIKAAABCgAAAAoBAAAKAAAACgAAAAoAAAAKAAAACgAAAQoAAAAKAQADCgAABgoAAAMKAAADCgAAAAoAAAkKAAAQCgQAAgoAAAQKAAAQCjMAAQqNAgADDAAIJgwDG2MMCxsODAEbDgwAGw0MAAgAGyQMCRsMBwJoHQcBBTkHAgUCaAEjCwcBIw0HAGIBBwliEQcAaDcbGfYBAA0BCAwbCRkACBMZAAgBGQgIABkDGwgZBhsBCA0bBRmZARsgCAALAQwICwgIAAtFCAALBggAFg0IAQwBCwAMAgsBBQELFAgBHAQIABwECAIWAQgAFgEIABYBSgELBAgLCxAIAQwACwAIAAsADAALAggE9wE+CAALAAgACwEWAQgKFhQIEhYCCAAWAwgCFgAIAhYGCAAWAAgAFg0IABwACAAcAAgAHAQIABYDCAAcAAgBHEkIAAsADAAIBhwPCA0cDAgLHAoFABAACwMIAAwXCAYMAQsBDAALAUoDCwAWCwwACwEMAwsBDABKAwwBFgwMAAgACwEMAAsHDAELCAwACwQMAgsLDAILBwUCCwEMAAsADAALAwwACwUMAAsCDAALBQUAC0kIAhYCCAQWJQUCPAJ1AwUiCAAWDwgCFggIABYECAQMAAsAFgILAggBDAIIAC8CGwMIBQsCDAALAAwBCAIbAAsBDAALCAgCG3MFAgwDVAQMVAUEDAUbCwgDGwAIDhsLBQM7NwUHOwkFBTsnBQc7HQUBOwFoCVQDOwFUDTsIVCY7CwUAFgEIABYHCAcWBQgAFggICRYACAAMAhYGCAAMLwgAFjwIARYACAEWAAgAFhAIAhYACAwWIQhTBQNUBxsNDAEbDAgCGwgIAS8CGwEvLQgALwMIAhYALwAbAC8DGwAvDQgALwEbAC8ICAEvAxsALwgWBhuSAQUAADYFJDcJaQA3BAD9BxsBAP3/Aw0BAP3/Aw2BgCgAAEkALR1JX39/Se8BGI8cSf/fCwA=";
	var classRemapsPacked = "sBPUAQsLMzQDCwMLKgQLIiIqEw4LC0ALCz8wFAMqKjstAwM/BBcMCx8NA0AsA0AfKgMWKgsaIisYCwkLKywDPgoMIQMyFSoDDg4NEwsLLxMUCRADCQ0tCwsMFwMVGQMLFSAhGSssLQ8rISotCxMVAxMNCQsOFEAXBB4LCwsLKSI5DhQDBAYTEAM/GxwdBAMmJx4oLDIDAyoLNTU3LCwqLCwgExUhCwUHCA8REg8UBgsLAwMVEBADCwwEHgQVExUjCwMXJAMlFhgVBAspLgkEFBQZBDErAyoEAF4kFA4sMjYVMik3MissMioyLTgnGQQ5FR8gOToyLRMDPD0LCzQ1CvgBBEELC0AB+AEFPC0DA0AD+AEEQSwDQQz4AQE/MvgBAUEF+AEBOgT4AQFABvgBATMA+AEDNjY4JvgBAg4UFPgBBTcVMik4A/gBCjknGQQ6FR8gOjsA+AECPT5y8AMEAy0qMhbwAwMsNjY58AMEDDE1KwD4AQE1GfADABT4AQEyxgH4AQEy0AH4AQAO6AUAIPgBCgYGEhMIBgoGBwYAAwUGBgcLCAAGCQYIBgYHBwgICwENAAAOBQwKCwYDAiQAAgEBCAAMAggGAD0AAAEBAwEbAQgEHQcIBggJBgwGAj8BCwIUAQkBBwEMBUINCQMDCAMDCQYICg0ODwFyAQMAOgAGZAcICQMGDgQFAg0AARwFCAYGAwkAcgEDAGMFCgYDEBEDHAAHmgEABkAACwkECAsMCQALAwgUCHL4AQEQffgB1AE0AxUWDgMOARkIAxkZGSMlAwMuAwMuEQ0OGQwaAw40LggJKAECJg4uDQ4uAhkOLBoBFxkkKwMTNCQNDhoqKAYOIg4ZNCUlJyM0NBE0DRMcDhMmAzQaKQkOFAgOAxQyGQgkDQENJDQ0AxkjFA4jJhMDJQ0uCTQiNDQ0NCk0BSUNDggKIxw0Lh0fHgg0BxsiMw0iDg4ZNBMTJw0NGQ0NMiMUNDQgEC8PGDAPDSEBAw4UFBwcDgMoCCIIFC40MTQOCTUONiwrFAgDKAQTAw0NCAgIJA40CABeGQ0lHBwbDiIpJyIkDSIMIgMLGzQ0BRQ0NDQABAsOLRIAAAUFAAAAAAYFAAMJAgUFBg8AAxsBAwIHAAIrAQUEGAICAAoBAQUKDgQFBQADBS4ACAEBAxA0AQUAAQMABQMBAQICACUBAAQrAgMFBWsAAUkEBQUDAgEBAAmRAQQAAAUHAAEZAAcAAAcQAAAHBwEABwcDDgcAAgsABwcAEAMbBAAKBwAAJwAAWQAABwYPBwATFA8AFAMVBwsBGQIQEAAOBQAACRAHAdEBBAgLBxIBWgUWAgACFgI8CA0AEBERExQHASsBBwMFAAA7ARAACgIRCwBfAABSAAEWBwIAAwQHBwcEDQsABAQABQYMCwoHEQEwDxAQBwsHDwAOAAsLAAADDgE7BBcYAw8AhQEBAwFPBREAAAAPABgCExQBRQQHBxAHAwEEAA4AAA==";
	var scriptClassFacts = [
		1055,
		5151,
		25631,
		8,
		42015,
		12,
		10,
		1,
		479,
		351,
		287,
		31,
		415,
		159,
		4,
		2,
		2064,
		16,
		543,
		4097,
		24577,
		63,
		5121,
		-7137,
		58399
	];
	var ruleTables = {
		"chromium/line_normal": [
			65,
			63,
			11,
			365,
			null,
			"AQA+BgIAAwAEAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVAAgAFgAXABgAGQAaAAcAGwAHABsAHAAHAB0AHgAfAAcAIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAqACoALQAuAC8AMAAxADIAIgAzAAkAAgABGgABEzQECAAAADUAAwEAAAAAAAEAAAAAAAAAAAACAAMAAAADAAAAAgAAAAMAAAABAAAAAAAAARIGNgcAAAAAAAAABAABAAI3AQAKOAMAAwAAAAgAAgADAAAAADYAAAIAAQECAAEBCAQAAQ4CAAYEAAUABgAHBQ0AOQEQARIDOgsdAyADJAgqAAQFBjsREw88FDAFOwAHCAABBT0NNAQ+ATcAAws9Gj0ABwQGPxQ3DEAaPwACEwZBCAAAAABCBwgAAAcAAAAAAAEAAUMAAAIAAUILAAAAAAACAANBAAIJBkQIAAAAAEIWRQMAAUILAAhEAAQEBkYERxxGGkYAAgYGSARJBQAWSgUAFEgAAQQGSwQGHEwaSwABBQZNEQAPThQABU0ACQQGTxYXClAaTwAICAZRC1IAUwFUAVUQVgZXE1EACwQGWARJHFkaWAALBQZaDVsHXAtaGloACAUGXQReDV8OXRpdAA0FBmASCA5hEgAHYAAHBAZiDwARYxpiAA4FBmQNZQdmC2caZAARDAECBGgJCwhpAWoCGAAZCGsNKwAsAi0IaAASBwZsCQsOGQAaB20RLQhsAAEEBm4YAAhvGm4AFAgGcBtxAHIAcQEHAXMIcRFwAAIEBnQZAAd1GnQAATsBAwR2AHYDdwB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgF2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AAkFBgIUNQweEi4HAgANBQZ4BHkcegAfGXgAAgQGexQ3DHsaewAXBgECBHwSaQFqDH0afAAGBgECBH4SaQFqDH8afgAXBAaAARRqDIABGoABAAIGBoEBBEkEABeCAREACIEBABwGAQIEgwESaQFqDIQBGoMBAB0HBoUBG3EAcgBxAQcBhgEahQEACwQGhwEhiAEXIgKHAQAGBAaJASGKARciAokBAAUGBosBBAYMAA+MARQABYsBAAYEBo0BBAYcjgEajQEACQUGjwEYGQAaB5ABGo8BAAEEBpEBGAAIkgEakQEAIgYBAgSTARJpAWoMlAEakwEAKAkGlQEGCAUOBBMACAE3DJYBFDAFlQEAKAYGlwEbGwEbA5gBCCYRlwEAHQQGmQEUagyZARqZAQAKAwaaASGbARqaAQArBAacASGdARaeAQOcAQAqBAafASGgARciAp8BADEEBqEBDxERogEaoQEAFQUEowEBpAESpQEOpAEapAEAMwEbpgEAAgQGpwESqAEOpwEapwEAGAQGNhSmAQw4GjYAASIAAAAEAqMBAakBCKoBAKoBAKoBBAADqgEACAKqAQCqAQCqAQGqAQCqAQCqAQCqAQCqAQGrAQCqAQKqAQCqAQCqAQOqAQCqAQKqAQCqAQKqAQCqAQCqAQGqAQCqAQCqAQKpAQAMBwAAA6MBAToSrAEBCAw6GjoANAEbpgEABAMGOyE8GjsANQEbpgEAMgQGrQEErgEcrQEarQEANgEbpgEABAMGPyFAGj8ANwEbpgEAAAUGQgyvAQIREUIaQgADAwZBIUMaQQA5ARumAQACAwZEIUUaRAA6ARumAQABBwawAQyxAQCyAQazAQC0AQu1ARqwAQA7ARumAQBDAwtJFQcTKgAFBAZIBEkcShpIAD0BG6YBAAcDBkshTBpLAD4BG6YBAAIDBk0hThpNAD8BG6YBAAIDBk8hUBpPAEABG6YBAEkFBrYBBEkFABa3ARq2AQBCBAa4AQoAFrkBGrgBAAEIBroBBwAZuwEHAAAADwAAAAC6AQA5Bga8AQRJAwoYvQEDIRa8AQAGCAZRC1IAUwFUAVUQVgZXE1EAAgYBAgS+ARJpAWoMvwEavgEARgEbpgEADwMGWCFZGlgARwEbpgEATAMGwAEhwQEawAEARgMGwgEhwwEawgEASQEbpgEAFwcGxAEEXgjFAQQUAsYBC8cBGsQBAEsEBsgBBMkBHMgBGsgBAEsBG6YBAAEBOy4ATAEbpgEAAgMGYiFjGmIATQEbpgEAUAQGygEWAArLARrKAQABAwbMASHNARrMAQAEBQZkDWUHZgtnGmQAUAMBBRfOAQHPAQBhEwbQARfRAQnQAQPSAQDTAQDUAQDVAQDWAQLXAQDYAQDZAQDaAQDbAQDZAQDZAQDcAQLdAQLTAQLQAQAzDgEGBN4BF98BCeABA+EBAOIBAOMBAeQBAuUBAuYBAOcBAugBBeIBAt4BAAgEBmgUzwEMaxpoAFMBG6YBAAoDBmwhbRpsAFQBG6YBAAIDBm4hbxpuAFUBG6YBAAAEBnEfBwFxGnEAQwQG6QEdAAPqARrpAQAEBAZwHHIEcxpwAFgBG6YBAAYDBnQhdRp0AAABAAMAWgkM6wEF7AEA7QEB7gEB7wED8AEP8QED8gEI8wEAWQEbpgEAcwILeR0fAAUEBngEeRx6GngAWwEbpgEAWwMBBRfOAQHPAQASAwZ8IX0afABcAwEFF84BAc8BAAIDBn4hfxp+AF0BG88BAF0DAQUXzgEBzwEAAwQGgQEESRyCARqBAQBeAwEFF84BAc8BAAUDBoMBIYQBGoMBAF8BG6YBABMDBoUBIYYBGoUBAGABG6YBAA0DBocBIYgBGocBAGEDAQUXzgEBzwEABgMGiQEhigEaiQEAYgMBBRfOAQHPAQACAwaLASGMARqLAQBjAwEFF84BAc8BAAIDBo0BIY4BGo0BAGQDAQUXzgEBzwEAAgMGjwEhkAEajwEAZQMBBRfOAQHPAQACAwaRASGSARqRAQBmAwEFF84BAc8BAAIDBpMBIZQBGpMBAGcBG6YBAA4FBpUBDfQBB/UBC5YBGpUBAGgBG6YBABADBpcBIZgBGpcBAGkBG88BAGkBG6YBAAMDBpoBIZsBGpoBAGoBG6YBAAIEBpwBIZ0BFvYBA5wBAGUlAQcE9wEH+AEA+AEA+AEA+AEE+AED+AEC+AEA+AEA+AEA+AEB+AEA+AEA+AEA+AEA+AEB+QEA+AEC+AEA+AEA+AEB+AEA+AEA+AEA+AEC+AEA+AEC+AEA+AEA+AEB+AEA+AEA+AEA+AEA+AEA9wEAbAEbpgEABQMGnwEhoAEanwEAbQEbpgEAAgMGoQEhogEaoQEAAAEAAQBvARumAQBGBQb6AQT7AQ2lAQ76ARr6AQBvBAb8ARL9AQ78ARr8AQBwARumAQADBQb+AQT/AQ2oAQ7+ARr+AQBwGwEIDYACAIACAIACCIACA4ACAIACAIACAYACAIACAIACAIACAIACAoACAoACAIACAIACA4ACAIACAoACAIACAoACAIACAIACAYACAIACAIACAAABAAQABAcAAAWpAQ8AAggBCAyrARqpAQAEBQaBAgSCAg2DAg6BAhqBAgBvARumAQBnBgaEAgSuAQiFAgeGAguHAhqEAgAABAavAQ8REa8BGq8BAHEEBrABFAgMtQEasAEAeAYAAQWIAg8RBDcMiQIaiAIAVwMGigIhiwIaigIADQQGjAISgwIOjAIajAIAWAMGjQIhjgIajQIAEwQGsAEUCAy1ARqwAQBkARumAQBeAwa2ASG3ARq2AQBlARumAQBjAwa4ASG5ARq4AQBmARumAQACAwa6ASG7ARq6AQBnARumAQAGAwa8ASG9ARq8AQBnAwEFF84BAc8BAD0DBr4BIb8BGr4BAGUBG6YBAB8DBsABIcEBGsABAGYBG6YBAAIDBsIBIcMBGsIBABQDBsQBIccBGsQBABMDBo8CIZACGo8CABIDBpECIZICGpECABIDBsQBIccBGsQBAGkBG6YBAAEHBpMCDLEBAJQCBrMBAJUCC5YCGpMCAGUBG6YBAAECHRcdLgBmARumAQABAh0XHS4AZRMGlwIXmAIJlwIDmQIAmgIAmwIAnAIAnQICngIAnwIAoAIAoQIAogIAoAIAoAIAowICpAICmgIClwIAZQQGpQIS/QEOpgIapQIAZwEbpgEAuQEBAAIAsQEBAAIAsQEBAAIAsQEBAAIAsQEBAAIAsQEBAAIArwEBAAIArwEBAAIArwEBAAIArwEBAAIArwEBAAIArwEBAAIArQEBAAIAdAwBCRmmAQKnAg2oAgCpAgCqAgGrAgKsAgKtAgCuAgKvAgWpAgAOAQAGADkDBt4BIeABGt4BAA8BAAYADwEABgAPAQAGAA4BAAYADgEABgAMAQAGAAwBAAYADAEABgB3ARumAQAdAwbpASHqARrpAQDkAQEAAwDfAQEAAwC0AQEAAwDeAQEAAwDdAQEAAwC2AQEAAwDRAQEAAwAdAQADABoBAAMALwMGsAIhsQIasAIALwMGsgIhswIasgIAWAYAAQW0AhQ3DLUCFrYCA7QCAFkiAQoMtwIAtwIAtwIAtwIEtwIDtwICtwIAtwIAtwIAtwIBtwIAtwIAtwIAtwIAtwICtwICtwIAtwIAtwIBtwIAtwIAtwIAtwICtwIAtwICtwIAtwIAtwIBtwIAtwIAtwIAtwIAtwIAAAEABwAyBASjAQH3ASH5ARr3AQBVARumAQABBwa4AgyxAQC5AgazAQC6Agu7Ahq4AgBWARumAQBRBQa8AgS9Ag39AQ68Ahq8AgBWARumAQABBwa+AgyxAQC/AgazAQDAAgvBAhq+AgAAAQAIAFUBG6YBAAMHBsICBIICCMMCBKwBAsQCC8UCGsICAFcEBsYCBMcCHMYCGsYCAEADBoQCIYcCGoQCABEDBsgCIckCGsgCABEDBsoCIcsCGsoCAEADBoQCIYcCGoQCAF8GAAEFiAIPEQSmAQyJAhqIAgANBAaIAhIIDokCGogCAFgBG6YBACEDBooCIYsCGooCAFkBG6YBAFkBG6YBAAMDBo0CIY4CGo0CAEoBG6YBAAIDBo8CIZACGo8CAEsBG6YBAAIDBpECIZICGpECAA8DBpMCIZYCGpMCAA8DBswCIc0CGswCAA8DBs4CIc8CGs4CAA8DBpMCIZYCGpMCAEkBG6YBADkBAAUAOAEABQA4AQAFADgBAAUAKgEABQA5AQAFADkBAAUARwEABQAtAQAFADsBAAUAOwEABQA7AQAFAEcBAAUARwQGpQIS/QEOpgIapQIAKgMGpQIhpgIapQIADwEACQAPAQAJAA8BAAkADwEACQAOAQAJAA4BAAkADAEACQAMAQAJAAwBAAkAPAEbpgEAHwMGsAIhsQIasAIAPQEbpgEAAgMGsgIhswIasgIAPQYAAQW0AhSmAQy1AhbQAgO0AgAsBAa0AiG1Ahb2AQO0AgCYAQEABwAAAQAKACUDBrgCIbsCGrgCACUDBtECIdICGtECACUDBtMCIdQCGtMCACUDBrgCIbsCGrgCAD8BG6YBAAEHBtUCDLEBANYCBrMBANcCC9gCGtUCAAYDBr4CIcECGr4CAAYDBtkCIdoCGtkCAAYDBtsCIdwCGtsCAAYDBr4CIcECGr4CAAQDBsICIcUCGsICAAQDBt0CId4CGt0CAAQDBt8CIeACGt8CAAQDBsICIcUCGsICAEMBG6YBAAEHBuECDLEBAOICBrMBAOMCC+QCGuECAEMBG6YBABYDBsgCIckCGsgCAEQBG6YBAAIDBsoCIcsCGsoCADgBG6YBAAIDBswCIc0CGswCADkBG6YBAAIDBs4CIc8CGs4CABoBAAoAGAEbpgEAAwMG0QIh0gIa0QIAGQEbpgEAAgMG0wIh1AIa0wIAEwMG1QIh2AIa1QIAEwMG5QIh5gIa5QIAEwMG5wIh6AIa5wIAEwMG1QIh2AIa1QIAGgEbpgEABgMG2QIh2gIa2QIAGwEbpgEAAgMG2wIh3AIa2wIAGgEbpgEAAgMG3QIh3gIa3QIAGwEbpgEAAgMG3wIh4AIa3wIADAMG4QIh5AIa4QIADAMG6QIh6gIa6QIADAMG6wIh7AIa6wIADAMG4QIh5AIa4QIADwEbpgEABgMG5QIh5gIa5QIAEAEbpgEAAgMG5wIh6AIa5wIABwEbpgEAAgMG6QIh6gIa6QIACAEbpgEAAgMG6wIh7AIa6wI="
		],
		"chromium/line_normal_cj": [
			66,
			64,
			11,
			367,
			null,
			"AQA/BgIAAwAEAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVAAgAFgAXABgAGQAaAAcAGwAHABsAHAAHAB0AHgAfAAcAIAAhACIAIwAkACUAJgAnACgAKQAqACoAKwAsACoAKgAtAC4ALwAwADEAMgAiADMACQACAAEbAAETNAQIAAAANQADAQAAAAAAAQAAAAAAAAAAAAIAAwAAAAMAAAACAAAAAAADAAAAAQAAAAAAAAESBjYHAAAAAAAAAAQAAQACNwEACjgDAAMAAAAJAAIAAwAAAAA2AAACAAEBAgABAQgEAAEOAgAGBAAFAAYABwUNADkBEAESAzoLHQMgAyQJKgAEBQY7ERMPPBUwBTsABwgAAQU9DTQEPgE3AAMLPRs9AAcEBj8UNwxAGz8AARQGQQgAAAAAQgwYABkAGgQcAkMDAAAiAEIDJwAoAysALAIAAzEBIgJBAAIJBkQIAAAAAEIWRQMAAUIMAAhEAAQEBkYERxxGG0YAAgYGSARJBQAWSgUAFUgAAQQGSwQGHEwbSwABBQZNEQAPThUABU0ACQQGTxYXClAbTwAICAZRC1IAUwFUAVUQVgZXFFEACwQGWARJHFkbWAALBQZaDVsHXAtaG1oACAUGXQReDV8OXRtdAA0FBmASCA5hEwAHYAAHBAZiDwARYxtiAA4FBmQNZQdmC2cbZAARDAECBGgJCwhpAWoCGAAZCGsOKwAsAi0IaAASBwZsCQsOGQAaB20SLQhsAAEEBm4YAAhvG24AFAgGcBtxAHIAcQEHAXMIcRJwAAIEBnQZAAd1G3QAATwBAwR2AHYDdwB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgF2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYAdgB2AHYACQUGAhQ1DB4TLgcCAA0FBngEeRx6AB8aeAACBAZ7FDcMext7ABcGAQIEfBJpAWoMfRt8AAYGAQIEfhJpAWoMfxt+ABcEBoABFGoMgAEbgAEAAgYGgQEESQQAF4IBEgAIgQEAHAYBAgSDARJpAWoMhAEbgwEAHQcGhQEbcQByAHEBBwGGARuFAQALBAaHASGIARgiAocBAAYEBokBIYoBGCICiQEABQYGiwEEBgwAD4wBFQAFiwEABgQGjQEEBhyOARuNAQAJBQaPARgZABoHkAEbjwEAAQQGkQEYAAiSARuRAQAiBgECBJMBEmkBagyUARuTAQAoCQaVAQYIBQ4EEwAIATcMlgEVMAWVAQAoBgaXARsbARsDmAEIJhKXAQAdBAaZARRqDJkBG5kBAAoDBpoBIZsBG5oBACsEBpwBIZ0BF54BA5wBACoEBp8BIaABGCICnwEAMQQGoQEPERGiARuhAQAVBQSjAQGkARKlAQ6kARukAQAzARumAQACBAanARKoAQ6nARunAQAYBAY2FKYBDDgbNgABIwAAAAQCowEBqQEIqgEAqgEAqgEEAAOqAQAIAqoBAKoBAKoBAaoBAKoBAKoBAKoBAKoBAasBAKoBAqoBAKoBAKoBA6oBAKoBAqoBAKoBAKoBAqoBAKoBAKoBAaoBAKoBAKoBAqkBAAwHAAADowEBOhKsAQEIDDobOgA0ARumAQAEAwY7ITwbOwA1ARumAQAyBAatAQSuARytARutAQA2ARumAQAEAwY/IUAbPwA3ARumAQAABQZCDK8BAhERQhtCAAMDBkEhQxtBADkBG6YBAAIDBkQhRRtEADoBG6YBAAEHBrABDLEBALIBBrMBALQBC7UBG7ABADsBG6YBAEMDC0kVBxMqAAUEBkgESRxKG0gAPQEbpgEABwMGSyFMG0sAPgEbpgEAAgMGTSFOG00APwEbpgEAAgMGTyFQG08AQAEbpgEASQUGtgEESQUAFrcBG7YBAEIEBrgBCgAWuQEbuAEAAQgGugEHABm7AQcAAAAQAAAAALoBADkGBrwBBEkDChi9AQMhF7wBAAYIBlELUgBTAVQBVRBWBlcUUQACBgECBL4BEmkBagy/ARu+AQBGARumAQAPAwZYIVkbWABHARumAQBMAwbAASHBARvAAQBGAwbCASHDARvCAQBJARumAQAXBwbEAQReCMUBBBQCxgELxwEbxAEASwQGyAEEyQEcyAEbyAEASwEbpgEAAQE8LgBMARumAQACAwZiIWMbYgBNARumAQBQBAbKARYACssBG8oBAAEDBswBIc0BG8wBAAQFBmQNZQdmC2cbZABQAwEFF84BAc8BAGEUBtABF9EBCdABA9IBANMBANQBANUBANYBAtcBANgBANkBANkBANoBANsBANkBANkBANwBAt0BAtMBAtABADMPAQYE3gEX3wEJ4AED4QEA4gEA4wEB5AEC5QEC5gEA5wEA6AEC6QEF4gEC3gEACAQGaBTPAQxrG2gAUwEbpgEACgMGbCFtG2wAVAEbpgEAAgMGbiFvG24AVQEbpgEAAAQGcR8HAXEbcQBDBAbqAR0AA+sBG+oBAAQEBnAccgRzG3AAWAEbpgEABgMGdCF1G3QAAAEAAwBaCQzsAQXtAQDuAQHvAQHwAQPxAQ/yAQPzAQn0AQBZARumAQBzAgt5HR8ABQQGeAR5HHobeABbARumAQBbAwEFF84BAc8BABIDBnwhfRt8AFwDAQUXzgEBzwEAAgMGfiF/G34AXQEbzwEAXQMBBRfOAQHPAQADBAaBAQRJHIIBG4EBAF4DAQUXzgEBzwEABQMGgwEhhAEbgwEAXwEbpgEAEwMGhQEhhgEbhQEAYAEbpgEADQMGhwEhiAEbhwEAYQMBBRfOAQHPAQAGAwaJASGKARuJAQBiAwEFF84BAc8BAAIDBosBIYwBG4sBAGMDAQUXzgEBzwEAAgMGjQEhjgEbjQEAZAMBBRfOAQHPAQACAwaPASGQARuPAQBlAwEFF84BAc8BAAIDBpEBIZIBG5EBAGYDAQUXzgEBzwEAAgMGkwEhlAEbkwEAZwEbpgEADgUGlQEN9QEH9gELlgEblQEAaAEbpgEAEAMGlwEhmAEblwEAaQEbzwEAaQEbpgEAAwMGmgEhmwEbmgEAagEbpgEAAgQGnAEhnQEX9wEDnAEAZSYBBwT4AQf5AQD5AQD5AQD5AQT5AQP5AQL5AQD5AQD5AQD5AQH5AQD5AQD5AQD5AQD5AQH6AQD5AQL5AQD5AQD5AQH5AQD5AQD5AQD5AQL5AQD5AQD5AQL5AQD5AQD5AQH5AQD5AQD5AQD5AQD5AQD4AQBsARumAQAFAwafASGgARufAQBtARumAQACAwahASGiARuhAQAAAQABAG8BG6YBAEYFBvsBBPwBDaUBDvsBG/sBAG8EBv0BEv4BDv0BG/0BAHABG6YBAAMFBv8BBIACDagBDv8BG/8BAHAcAQgNgQIAgQIAgQIIgQIDgQIAgQIAgQIBgQIAgQIAgQIAgQIAgQICgQICgQIAgQIAgQIDgQIAgQICgQIAgQIAgQICgQIAgQIAgQIBgQIAgQIAgQIAAAEABAAEBwAABakBDwACCAEIDKsBG6kBAAQFBoICBIMCDYQCDoICG4ICAG8BG6YBAGcGBoUCBK4BCIYCB4cCC4gCG4UCAAAEBq8BDxERrwEbrwEAcQQGsAEUCAy1ARuwAQB4BgABBYkCDxEENwyKAhuJAgBXAwaLAiGMAhuLAgANBAaNAhKEAg6NAhuNAgBYAwaOAiGPAhuOAgATBAawARQIDLUBG7ABAGQBG6YBAF4DBrYBIbcBG7YBAGUBG6YBAGMDBrgBIbkBG7gBAGYBG6YBAAIDBroBIbsBG7oBAGcBG6YBAAYDBrwBIb0BG7wBAGcDAQUXzgEBzwEAPQMGvgEhvwEbvgEAZQEbpgEAHwMGwAEhwQEbwAEAZgEbpgEAAgMGwgEhwwEbwgEAFAMGxAEhxwEbxAEAEwMGkAIhkQIbkAIAEgMGkgIhkwIbkgIAEgMGxAEhxwEbxAEAaQEbpgEAAQcGlAIMsQEAlQIGswEAlgILlwIblAIAZQEbpgEAAQIdFx4uAGYBG6YBAAECHRceLgBlFAaYAheZAgmYAgOaAgCbAgCcAgCdAgCeAgKfAgCgAgChAgChAgCiAgCjAgChAgChAgCkAgKlAgKbAgKYAgBlBAamAhL+AQ6nAhumAgBnARumAQC5AQEAAgCxAQEAAgCxAQEAAgCxAQEAAgCxAQEAAgCxAQEAAgCvAQEAAgCvAQEAAgCvAQEAAgCvAQEAAgCvAQEAAgCvAQEAAgCtAQEAAgB0DQEJGaYBAqgCDakCAKoCAKsCAawCAq0CAq4CAK8CALACArECBaoCAA4BAAYAOQMG3gEh4AEb3gEADwEABgAPAQAGAA8BAAYADgEABgAOAQAGAA0BAAYADQEABgANAQAGAA0BAAYAeAEbpgEAHgMG6gEh6wEb6gEA5QEBAAMA4AEBAAMAtQEBAAMA3wEBAAMA3gEBAAMAtwEBAAMA0gEBAAMAHgEAAwAOAQADADADBrICIbMCG7ICADADBrQCIbUCG7QCAFkGAAEFtgIUNwy3Ahe4AgO2AgBaIwEKDLkCALkCALkCALkCBLkCA7kCArkCALkCALkCALkCAbkCALkCALkCALkCALkCArkCArkCALkCALkCAbkCALkCALkCALkCArkCALkCALkCArkCALkCALkCAbkCALkCALkCALkCALkCAAABAAcAMwQEowEB+AEh+gEb+AEAVgEbpgEAAQcGugIMsQEAuwIGswEAvAILvQIbugIAVwEbpgEAUgUGvgIEvwIN/gEOvgIbvgIAVwEbpgEAAQcGwAIMsQEAwQIGswEAwgILwwIbwAIAAAEACABWARumAQADBwbEAgSDAgjFAgSsAQLGAgvHAhvEAgBYBAbIAgTJAhzIAhvIAgBBAwaFAiGIAhuFAgARAwbKAiHLAhvKAgARAwbMAiHNAhvMAgBBAwaFAiGIAhuFAgBgBgABBYkCDxEEpgEMigIbiQIADQQGiQISCA6KAhuJAgBZARumAQAhAwaLAiGMAhuLAgBaARumAQBaARumAQADAwaOAiGPAhuOAgBLARumAQACAwaQAiGRAhuQAgBMARumAQACAwaSAiGTAhuSAgAPAwaUAiGXAhuUAgAPAwbOAiHPAhvOAgAPAwbQAiHRAhvQAgAPAwaUAiGXAhuUAgBKARumAQA6AQAFADkBAAUAOQEABQA5AQAFACoBAAUAOgEABQA6AQAFAEgBAAUALQEABQA7AQAFADsBAAUAOwEABQBIAQAFAEgEBqYCEv4BDqcCG6YCACoDBqYCIacCG6YCAA8BAAkADwEACQAPAQAJAA8BAAkADgEACQAOAQAJAA0BAAkADQEACQANAQAJAA0BAAkAPQEbpgEAIAMGsgIhswIbsgIAPgEbpgEAAgMGtAIhtQIbtAIAPgYAAQW2AhSmAQy3AhfSAgO2AgAtBAa2AiG3Ahf3AQO2AgCaAQEABwAAAQAKACYDBroCIb0CG7oCACYDBtMCIdQCG9MCACYDBtUCIdYCG9UCACYDBroCIb0CG7oCAEABG6YBAAEHBtcCDLEBANgCBrMBANkCC9oCG9cCAAYDBsACIcMCG8ACAAYDBtsCIdwCG9sCAAYDBt0CId4CG90CAAYDBsACIcMCG8ACAAQDBsQCIccCG8QCAAQDBt8CIeACG98CAAQDBuECIeICG+ECAAQDBsQCIccCG8QCAEQBG6YBAAEHBuMCDLEBAOQCBrMBAOUCC+YCG+MCAEQBG6YBABYDBsoCIcsCG8oCAEUBG6YBAAIDBswCIc0CG8wCADkBG6YBAAIDBs4CIc8CG84CADoBG6YBAAIDBtACIdECG9ACABoBAAoAGAEbpgEAAwMG0wIh1AIb0wIAGQEbpgEAAgMG1QIh1gIb1QIAEwMG1wIh2gIb1wIAEwMG5wIh6AIb5wIAEwMG6QIh6gIb6QIAEwMG1wIh2gIb1wIAGgEbpgEABgMG2wIh3AIb2wIAGwEbpgEAAgMG3QIh3gIb3QIAGgEbpgEAAgMG3wIh4AIb3wIAGwEbpgEAAgMG4QIh4gIb4QIADAMG4wIh5gIb4wIADAMG6wIh7AIb6wIADAMG7QIh7gIb7QIADAMG4wIh5gIb4wIADwEbpgEABgMG5wIh6AIb5wIAEAEbpgEAAgMG6QIh6gIb6QIABwEbpgEAAgMG6wIh7AIb6wIACAEbpgEAAgMG7QIh7gIb7QI="
		],
		"apple/line_normal": [
			65,
			63,
			11,
			365,
			"chromium/line_normal",
			"BgACOAAAKicAAjgAACoLAAI4AAAqDgACOAAAKi0AAjh2APMBAQACOAAAKhtnARumAVq2AQEAAw=="
		],
		"apple/line": [
			65,
			63,
			11,
			365,
			"apple/line_normal",
			""
		],
		"apple/line_cj": [
			65,
			63,
			11,
			365,
			"apple/line_normal",
			""
		],
		"chromium/char": [
			21,
			21,
			3,
			16,
			null,
			"AQASBgIAAgADAAQABQAEAAYABAAHAAQACAAJAAoABAAEAAkACgALAAABAAEAAQEHAgACBQsEAQQBBAMEAAQAAQQLBQMFAwUADAAFBAABBQAAAAAAAAMDCwcDDQQHAAQEEAgACQMJAAoABQIRCQAKAAEBEQAABwEXDgAIAQoFAAYDCw0CBwUNAAMCAQIVDwAAAQAC"
		],
		"apple/char": [
			21,
			21,
			3,
			16,
			"chromium/char",
			""
		]
	};
	var blinkLinePairsPacked = "5DAIgAAACAAAAAQDBAYA/+v/+/8CAQF/DBwACAEADhwCCAAUAQQfgAlAFDgAGBwAGFQAJAEANHAAKDgACBwM9hYAuP///+////9vACsAJDgADAEACIgDAA4eABiYAgDmARwANKQDAChUACQcBLyW/7kH+AMAoQLAAwDqAxwBAFm4BwCeBhwAFYAHAYAY9BMAGpAUAK4BmAIB/xYBAX/wBYwIABgBAZgC5gcBDBCMDwBQHAC2AbQCAAeIGAGGBYgYAScM3AoANIwBAH7QAgEA2wH0BQDAAXAAlg0cAA==";
	var webkitLinePairsPacked = "5DAIgAAACAAAAAQDBAYA/+v/+/8CAQF/DBwACAEADhwCCAAUAQQfgAlAFDgAGBwAGFQAJAEANHAAKDgACBwE/1cA/gTAAgAAKwQfgAnAAxAB/xg4AAwBAAiIAwAOHgAYmAIA5gEcADSkAwAoVAAkHAy8lv+5////7////2+kAsADAOoDHAEAWbgHAJ4GHAAVgAcBgBj0EwAakBQArgGYAgH/FgEBf/AFjAgAGAEBmALmBwEMEIwPAFAcALYBtAIAB4gYAYYFiBgBJwzcCgA0jAEAftACAQDbAfQFAMABcACWDRwA";
	var appleQuoteRemaps = {
		"": [
			8220,
			0,
			8221,
			1,
			8216,
			0
		],
		"agq": [8221, 1],
		"am": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"ar": [],
		"ast": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"bas": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"be": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"bg": [
			8221,
			1,
			8221,
			1
		],
		"blo": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"bm": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"br": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"bs": [
			8221,
			1,
			8216,
			0
		],
		"bua": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"ca": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"cs": [8221, 1],
		"cv": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"da": [],
		"de": [8221, 1],
		"dsb": [8221, 1],
		"dua": [
			171,
			0,
			187,
			1,
			8216,
			0
		],
		"dyo": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"el": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"eo": [
			8220,
			0,
			8221,
			1,
			171,
			0,
			187,
			1
		],
		"et": [8221, 1],
		"eu": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"ewo": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"fa": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"ff": [8221, 1],
		"fi": [],
		"fr": [
			171,
			0,
			187,
			1,
			171,
			0,
			187,
			1
		],
		"fur": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"gsw": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"he": [],
		"hr": [8221, 1],
		"hsb": [8221, 1],
		"hu": [
			8221,
			1,
			187,
			0,
			171,
			1
		],
		"hy": [
			171,
			0,
			187,
			1,
			171,
			0,
			187,
			1
		],
		"ia": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"ie": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"is": [8221, 1],
		"it": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"ja": [],
		"jgo": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"ka": [
			8221,
			1,
			171,
			0,
			187,
			1
		],
		"kab": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"kk": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"kkj": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"ksf": [
			171,
			0,
			187,
			1,
			8216,
			0
		],
		"ksh": [8221, 1],
		"ky": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"lag": [],
		"lb": [8221, 1],
		"lij": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"lt": [
			8221,
			1,
			8221,
			1
		],
		"luy": [8221, 1],
		"mg": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"mk": [8221, 1],
		"mua": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"mzn": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"nb": [
			171,
			0,
			187,
			1,
			8216,
			0
		],
		"nds": [8221, 1],
		"nl": [
			8216,
			0,
			8216,
			0
		],
		"nmg": [
			8221,
			1,
			171,
			0,
			187,
			1
		],
		"nn": [
			171,
			0,
			187,
			1,
			8216,
			0
		],
		"nnh": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"no": [
			171,
			0,
			187,
			1,
			8216,
			0
		],
		"oc": [
			171,
			0,
			187,
			1,
			171,
			0,
			187,
			1
		],
		"os": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"pl": [
			8221,
			1,
			171,
			0,
			187,
			1
		],
		"pms": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"prg": [
			8221,
			1,
			8221,
			1
		],
		"rm": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"rn": [],
		"ro": [
			8221,
			1,
			171,
			0,
			187,
			1
		],
		"ru": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"rw": [
			171,
			0,
			187,
			1,
			8216,
			0
		],
		"sah": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"sc": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"se": [],
		"sg": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"shi": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"sk": [8221, 1],
		"sl": [8221, 1],
		"sn": [],
		"sr": [8221, 1],
		"ss": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"st": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"sv": [],
		"syr": [],
		"szl": [
			8221,
			1,
			187,
			0,
			171,
			1
		],
		"ti": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"tk": [
			8220,
			0,
			8221,
			1,
			8220,
			0,
			8221,
			1
		],
		"tn": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"ts": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"tyv": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"ug": [
			187,
			0,
			171,
			1,
			8250,
			0,
			8249,
			1
		],
		"uk": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"ur": [],
		"uz": [
			8220,
			0,
			8221,
			1
		],
		"ve": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"wae": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"yav": [
			171,
			0,
			187,
			1,
			171,
			0,
			187,
			1
		],
		"yi": [],
		"yue": [],
		"zgh": [
			171,
			0,
			187,
			1,
			8221,
			1
		],
		"az_Cyrl": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"bs_Cyrl": [8221, 1],
		"ff_Adlm": [
			8220,
			0,
			8221,
			1,
			8216,
			0
		],
		"fr_CA": [
			171,
			0,
			187,
			1
		],
		"fr_CH": [
			171,
			0,
			187,
			1,
			8249,
			0,
			8250,
			1
		],
		"kk_Arab": [
			187,
			0,
			171,
			1,
			8250,
			0,
			8249,
			1
		],
		"ms_Arab": [],
		"pt_AO": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_CH": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_CV": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_FR": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_GQ": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_GW": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_LU": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_MO": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_MZ": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_PT": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_ST": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"pt_TL": [
			171,
			0,
			187,
			1,
			8220,
			0,
			8221,
			1
		],
		"ti_ER": [
			8216,
			0,
			8220,
			0,
			8221,
			1
		],
		"uz_Arab": [
			8220,
			0,
			8221,
			1,
			8216,
			0
		],
		"uz_Cyrl": [
			8220,
			0,
			8221,
			1,
			8216,
			0
		],
		"zh_Hant": []
	};
	var geckoLineBreakStatesPacked = "kCQB/QMBAf8AAgABAwABBAH9BQgAAQYB/QQKAAEEAf0EEwAHPQH/DkQB/wdEAf8BBQT///8qBEgADEQC/T8BAgAgiAEBKgEPAT5SiAEE/z//QA6IAQAWRAL/Pg/MAQH/BgIAIMwBABDUAgBAkAIABCEAIkQBPBKIAQAOoAQB/SvMAQH/BgEACAwAEQEBKhIXAf1KAQH/BKwEAAa+AQH9Bw0D/f+yFpgDACawBgA6RAAE5AQC/TtV9AYAIEQABYgBAv87ErgHAB3qAgAnLAAEiAEB/xGQAgBA1AIAPkQAJewFADQBABuIAQAEJAA4zAEB/yKQAgADoAQBPQugBAE9KdgLAB3ACAH/RLAGACpEAf9xoAQAIvQGAAREACbUAgABiwMAAiwAZqAEAEeoBQCEAQEAXdwDABuwBgArrAgBNxDACABARAAgzAEAArwBADrgDAAtRAAVswoAWkQAQNgLAAoPASs/RAEsHDABOC7gDAAL7AUBQVj0FwAOkBMB/RGQEwP9Of0qhAkB/07gDABeRAAoiQQAFagWAEyYAwAPxBMACzABNRIlAGmMCgErQ4wKABGwBgH+BQEB/wADAf8ABgH/BhIABg0C/v8EHAT//v/+CAEASZgUAf0LzBIABrAGAAUPArH9FLgYAAfxBgAb9AYAAEQBPFbQGwACVwA4sAYB/iwBAf8OEwATogIB/xAOASoFtwIAVsAIAHwBAA==";
	function getBreakLanguage(tag) {
		if (tag === null || tag.length < 2) return "root";
		if (tag.length > 2 && tag.charCodeAt(2) !== 45 && tag.charCodeAt(2) !== 95) return "root";
		const first = tag.charCodeAt(0) | 32;
		const second = tag.charCodeAt(1) | 32;
		if (first === 106 && second === 97) return "ja";
		if (first === 107 && second === 111) return "ko";
		if (first === 122 && second === 104) return "zh";
		return "root";
	}
	function unpackTable(packed) {
		const input = atob(packed);
		let at = 0;
		const varint = () => {
			let value = 0;
			let scale = 1;
			let byte;
			do {
				byte = input.charCodeAt(at++);
				value += (byte & 127) * scale;
				scale *= 128;
			} while (byte >= 128);
			return value;
		};
		const bytes = new Uint8Array(varint());
		let out = 0;
		while (at < input.length) {
			for (let n = varint(); n > 0; n--) bytes[out++] = input.charCodeAt(at++);
			if (at >= input.length) break;
			const length = varint() + 4;
			const from = out - varint();
			if (from + length <= out) bytes.copyWithin(out, from, from + length);
			else for (let k = 0; k < length; k++) bytes[out + k] = bytes[from + k];
			out += length;
		}
		if (out !== bytes.length) throw new Error("A packed table unpacked to the wrong length");
		return bytes;
	}
	function unpackVarints(base64) {
		const input = atob(base64);
		const values = new Int32Array(input.length);
		let count = 0;
		for (let i = 0; i < input.length;) {
			let byte = input.charCodeAt(i++);
			let value = byte & 127;
			for (let shift = 7; byte >= 128; shift += 7) {
				byte = input.charCodeAt(i++);
				value |= (byte & 127) << shift;
			}
			values[count++] = value;
		}
		return values.subarray(0, count);
	}
	function getClass(table, c) {
		return table.values[table.index[c >> 8] << 8 | c & 255];
	}
	function unpackClassRuns(runs, remap, blocks) {
		const index = /* @__PURE__ */ new Uint16Array(4352);
		const values = new Uint8Array(blocks << 8);
		const whole = (/* @__PURE__ */ new Int32Array(256)).fill(-1);
		let count = 0;
		let c = 0;
		let end = 0;
		let value = -1;
		for (let r = 0; r <= runs.length; r += 2) {
			const following = r < runs.length ? remap[runs[r + 1]] : -1;
			if (following !== value) {
				while (c < end) {
					const block = c >> 8;
					if ((c & 255) === 0 && end - c >= 256) {
						if (whole[value] < 0) {
							whole[value] = count;
							values.fill(value, count << 8, ++count << 8);
						}
						index.fill(whole[value], block, end >> 8);
						c = end & -256;
					} else {
						if ((c & 255) === 0) index[block] = count++;
						const stop = Math.min(end, block + 1 << 8);
						const shift = index[block] - block << 8;
						values.fill(value, c + shift, stop + shift);
						c = stop;
					}
				}
				value = following;
			}
			if (r < runs.length) end += runs[r] + 1;
		}
		if (end !== 1114112) throw new Error("The class runs don't cover U+0000..U+10FFFF");
		return {
			index,
			values
		};
	}
	var classRuns = null;
	var classRemaps = null;
	function unpackClasses(map) {
		const [row, blocks] = classMaps[map];
		classRuns ??= unpackVarints(classRunsVarints);
		classRemaps ??= unpackTable(classRemapsPacked);
		return unpackClassRuns(classRuns, classRemaps.subarray(row * 248), blocks);
	}
	function lazyRegExp(source, flags) {
		let built = null;
		return () => built ??= new RegExp(source, flags);
	}
	var PROPERTY_TESTS = [
		lazyRegExp(String.raw`^[\p{L}\p{N}]$`, "u"),
		lazyRegExp(String.raw`^\p{M}$`, "u"),
		lazyRegExp(String.raw`^\p{P}$`, "u"),
		lazyRegExp(String.raw`^[\p{Ps}\p{Pe}\p{Pi}\p{Pf}\p{Po}]$`, "u"),
		lazyRegExp(String.raw`^\p{Default_Ignorable_Code_Point}$`, "u"),
		lazyRegExp(String.raw`^\p{Emoji}$`, "u"),
		lazyRegExp(String.raw`^\p{sc=Hangul}$`, "u")
	];
	var bmpProperties = null;
	var astralProperties = /* @__PURE__ */ new Map();
	function hasProperty(cp, property) {
		const bmp = bmpProperties ??= /* @__PURE__ */ new Uint16Array(65536);
		const has = 1 << property * 2;
		let bits = cp < 65536 ? bmp[cp] : astralProperties.get(cp) ?? 0;
		if ((bits & has << 1) === 0) {
			bits |= has << 1 | (PROPERTY_TESTS[property]().test(String.fromCodePoint(cp)) ? has : 0);
			if (cp < 65536) bmp[cp] = bits;
			else astralProperties.set(cp, bits);
		}
		return (bits & has) !== 0;
	}
	var wordSegmenter = null;
	function getWordSegmenter() {
		return wordSegmenter ??= new Intl.Segmenter(void 0, { granularity: "word" });
	}
	var STOP_STATE = 0;
	var ACCEPTING_UNCONDITIONAL = 1;
	function unpackStateRows(width, states, base, differences) {
		const rows = new Uint16Array(states * width);
		if (base !== null) rows.set(base);
		for (let i = 0, row = -width; i < differences.length;) {
			row += (differences[i++] + 1) * width;
			const back = differences[i++] * width;
			if (back > 0) rows.copyWithin(row, row - back, row - back + width);
			let at = row - 1;
			for (let n = differences[i++]; n > 0; n--) {
				at += 1 + differences[i++];
				rows[at] = differences[i++];
			}
		}
		return rows;
	}
	function unpackTableRows(table) {
		const [catCount, , , states, base, differences] = ruleTables[table];
		return unpackStateRows(catCount + 3, states, base === null ? null : unpackTableRows(base), unpackVarints(differences));
	}
	var breakRules = {};
	function getBreakRules(table) {
		let rules = breakRules[table];
		if (rules === void 0) {
			const [catCount, dictCategoriesStart, lookAheadResultsSize] = ruleTables[table];
			rules = breakRules[table] = {
				catCount,
				dictCategoriesStart,
				rowWidth: catCount + 3,
				rows: unpackTableRows(table),
				lookAheadResultsSize,
				classes: unpackClasses(table)
			};
		}
		return rules;
	}
	var NO_OVERRIDES = {
		chars: [],
		categories: []
	};
	function markRuleBoundaries(r, text, flags, overrides = NO_OVERRIDES) {
		const rows = r.rows;
		const width = r.rowWidth;
		const dictionaryStart = r.dictCategoriesStart;
		const length = text.length;
		const matches = new Int32Array(r.lookAheadResultsSize).fill(-1);
		const overrideChars = overrides.chars;
		const overrideCount = overrideChars.length;
		for (let start = 0; start < length;) {
			let dictionaryCharCount = 0;
			let result = start;
			let boundary = -1;
			let pos = start;
			let c = text.charCodeAt(pos++);
			if ((c & 64512) === 55296 && pos < length) {
				const trail = text.charCodeAt(pos);
				if ((trail & 64512) === 56320) {
					pos++;
					c = (c - 55296 << 10) + trail - 56320 + 65536;
				}
			}
			let atEnd = false;
			let ended = false;
			let row = 1 * width;
			let category = 0;
			for (;;) {
				if (atEnd) {
					if (ended) break;
					ended = true;
					category = 1;
				} else {
					let overridden = false;
					for (let i = 0; i < overrideCount; i++) if (c === overrideChars[i]) {
						category = overrides.categories[i];
						overridden = true;
						break;
					}
					if (!overridden) {
						category = getClass(r.classes, c);
						if (category >= dictionaryStart) dictionaryCharCount++;
					}
				}
				const state = rows[row + 3 + category];
				row = state * width;
				const accepting = rows[row];
				if (accepting === ACCEPTING_UNCONDITIONAL) result = pos;
				else if (accepting > ACCEPTING_UNCONDITIONAL && matches[accepting] >= 0) {
					boundary = matches[accepting];
					break;
				}
				const rule = rows[row + 1];
				if (rule > ACCEPTING_UNCONDITIONAL) matches[rule] = pos;
				if (state === STOP_STATE) break;
				if (!ended) {
					if (pos >= length) atEnd = true;
					else {
						c = text.charCodeAt(pos++);
						if ((c & 64512) === 55296 && pos < length) {
							const trail = text.charCodeAt(pos);
							if ((trail & 64512) === 56320) {
								pos++;
								c = (c - 55296 << 10) + trail - 56320 + 65536;
							}
						}
					}
				}
			}
			if (boundary < 0) {
				boundary = result;
				if (result === start) {
					boundary = start + 1;
					if ((text.charCodeAt(start) & 64512) === 55296 && boundary < length && (text.charCodeAt(boundary) & 64512) === 56320) boundary++;
				}
			}
			flags[boundary] = 1;
			if (dictionaryCharCount > 0) markDictionaryWords(r, text, start, boundary, flags);
			start = boundary;
		}
	}
	function isComplexContext(rules, c) {
		return getClass(rules.classes, c) >= rules.dictCategoriesStart;
	}
	function markDictionaryWords(rules, text, start, end, flags) {
		let runStart = -1;
		for (let i = start; i <= end;) {
			let dictionary = false;
			let size = 1;
			if (i < end) {
				let c = text.charCodeAt(i);
				if ((c & 64512) === 55296 && i + 1 < text.length && (text.charCodeAt(i + 1) & 64512) === 56320) {
					c = (c - 55296 << 10) + text.charCodeAt(i + 1) - 56320 + 65536;
					size = 2;
				}
				dictionary = isComplexContext(rules, c);
			}
			if (dictionary) {
				if (runStart < 0) runStart = i;
			} else if (runStart >= 0) {
				if (i - runStart > 1) {
					for (const segment of getWordSegmenter().segment(text.slice(runStart, i))) if (segment.index > 0) flags[runStart + segment.index] = 1;
				}
				runStart = -1;
			}
			i += size;
		}
	}
	var SPACE$1 = 32;
	var TAB$1 = 9;
	var LF$1 = 10;
	var ZWSP = 8203;
	var LINE_SEPARATOR = 8232;
	var PARAGRAPH_SEPARATOR = 8233;
	var IDEOGRAPHIC_SPACE = 12288;
	var blinkPairs = null;
	var blinkDefaultLocale;
	function getBlinkDefaultLocale() {
		return blinkDefaultLocale ??= new Intl.DateTimeFormat().resolvedOptions().locale;
	}
	var NO_BREAK = 0;
	var CAN_BREAK = 1;
	var UNKNOWN = 2;
	function isBlinkBreakableSpace(c) {
		return c === SPACE$1 || c === TAB$1 || c === LF$1;
	}
	function shouldBreakFast(pairs, lastLast, last, ch) {
		if (last < 33 || ch < 33) return NO_BREAK;
		if (last === 45) {
			if (ch <= 127) {
				if (ch >= 48 && ch <= 57) {
					const lower = lastLast | 32;
					return lastLast >= 48 && lastLast <= 57 || lower >= 97 && lower <= 122 ? CAN_BREAK : NO_BREAK;
				}
			} else return UNKNOWN;
		}
		if (last <= 255 && ch <= 255) {
			const x = ch - 33;
			return (pairs[(last - 33) * 28 + (x >> 3)] & 1 << (x & 7)) !== 0 ? CAN_BREAK : NO_BREAK;
		}
		return UNKNOWN;
	}
	function shouldKeepAfterKeepAll(rules, lastLast, last, ch) {
		const pre = hasProperty(last, 1) ? lastLast : last;
		return hasProperty(pre, 0) && !isComplexContext(rules, pre) && hasProperty(ch, 0) && !isComplexContext(rules, ch);
	}
	function getBlinkLineBreaks(text, keepAll, language) {
		const length = text.length;
		const breaks = new Uint8Array(length + 1);
		if (length < 2) return breaks;
		const pairs = blinkPairs ??= unpackTable(blinkLinePairsPacked);
		const rules = getBreakRules(`chromium/${getBreakLanguage(language) === "zh" ? "line_normal_cj" : "line_normal"}`);
		let icu = null;
		let lastLast = 0;
		let last = text.charCodeAt(0);
		for (let i = 1; i < length; lastLast = last, last = text.charCodeAt(i), i++) {
			const ch = text.charCodeAt(i);
			if (isBlinkBreakableSpace(ch)) continue;
			if (isBlinkBreakableSpace(last)) {
				breaks[i] = 1;
				continue;
			}
			const fast = shouldBreakFast(pairs, lastLast, last, ch);
			if (fast === CAN_BREAK) {
				breaks[i] = 1;
				continue;
			}
			if (keepAll && shouldKeepAfterKeepAll(rules, lastLast, last, ch)) continue;
			if (fast === NO_BREAK) continue;
			if (icu === null) {
				icu = new Uint8Array(length + 1);
				markRuleBoundaries(rules, text, icu);
			}
			if (icu[i] === 1) breaks[i] = 1;
		}
		return breaks;
	}
	var AL$1 = 1;
	var ID$1 = 2;
	var CM$1 = 4;
	var OP = 8;
	var CP = 16;
	var CL = 32;
	var GL = 64;
	var QU = 128;
	var SP$1 = 256;
	var PI = 512;
	var PF = 1024;
	var WEIRD = 32768;
	var webkitPairs = null;
	var webkitLineRules = /* @__PURE__ */ new Map();
	function isWebKitBreakableSpace(c) {
		return c === SPACE$1 || c === LF$1 || c === TAB$1 || c === LINE_SEPARATOR || c === PARAGRAPH_SEPARATOR;
	}
	function isASCIIDigit(c) {
		return c >= 48 && c <= 57;
	}
	function isASCIIAlpha(c) {
		const lower = c | 32;
		return lower >= 97 && lower <= 122;
	}
	function classify(c) {
		switch (c >> 7) {
			case 0: switch (c >> 4) {
				case 0: return WEIRD;
				case 1: return CM$1;
				case 2: return c === 32 ? SP$1 : c === 34 || c === 39 ? QU : c === 40 ? OP : c === 41 ? CP : WEIRD;
				case 3: return c <= 57 ? AL$1 : WEIRD;
				case 4: return AL$1;
				case 5: return c <= 90 ? AL$1 : c === 91 ? OP : c === 93 ? CP : WEIRD;
				case 6: return AL$1;
				default: return c <= 122 ? AL$1 : c === 123 ? OP : c === 125 ? CL : WEIRD;
			}
			case 1:
				if (c === 160) return GL;
				if (c > 192) return AL$1;
				if (c === 161 || c === 191) return OP;
				if (c === 171) return 640;
				if (c === 187) return 1152;
				return WEIRD;
			case 2:
			case 3:
			case 4: return AL$1;
			case 5: return c === 712 || c === 716 || c === 735 ? WEIRD : AL$1;
			case 6:
				if (c === 847 || c >= 860 && c <= 866) return GL;
				if (c < 880) return CM$1;
				if (c === 894) return WEIRD;
				return AL$1;
			case 7:
			case 8:
			case 10: return AL$1;
			case 9: return c >= 1155 && c <= 1161 ? CM$1 : AL$1;
			case 11:
				if (c <= 1416 || c >= 1480) return AL$1;
				if (c >= 1425 && c <= 1469) return CM$1;
				return c === 1471 || c === 1473 || c === 1474 || c === 1476 || c === 1477 || c === 1479 ? CM$1 : WEIRD;
			case 64:
				if (c === 8216 || c === 8220) return 640;
				if (c === 8217 || c === 8221) return 1152;
				return WEIRD;
			default:
				if (c >= 11904 && c <= 42191) {
					if ((c & 65280) === 12288) {
						if (c <= 12351) switch (c & 31) {
							case 1:
							case 2:
							case 9:
							case 11:
							case 13:
							case 15:
							case 17:
							case 21:
							case 23:
							case 25:
							case 27:
							case 30:
							case 31: return CL;
							case 8:
							case 10:
							case 12:
							case 14:
							case 16:
							case 22:
							case 20:
							case 24:
							case 26:
							case 29: return OP;
							default: return WEIRD;
						}
						return WEIRD;
					}
					if ((c & 65520) === 12784) return WEIRD;
					if ((c & 65528) === 12872) return AL$1;
					if ((c & 65472) === 19904) return AL$1;
					if (c === 40981) return WEIRD;
					return ID$1;
				}
				if (c >= 44032 && c <= 55215) return ID$1;
				if (c >= 63744 && c <= 64255) return ID$1;
				return WEIRD;
		}
	}
	function createFactory(text, line) {
		return {
			text,
			secondToLast: 0,
			last: 0,
			priorLength: 0,
			line,
			nextBoundary: null
		};
	}
	function following(f, location) {
		let next = f.nextBoundary;
		if (next === null) {
			const text = (f.priorLength === 2 ? String.fromCharCode(f.secondToLast, f.last) : f.priorLength === 1 ? String.fromCharCode(f.last) : "") + f.text;
			const flags = new Uint8Array(text.length + 1);
			markRuleBoundaries(f.line.rules, text, flags, f.line.overrides);
			next = new Int32Array(text.length + 2);
			next[text.length + 1] = -1;
			for (let p = text.length; p >= 0; p--) next[p] = flags[p] === 1 ? p : next[p + 1];
			f.nextBoundary = next;
		}
		const o = location + f.priorLength + 1;
		if (o >= next.length) return -1;
		const b = next[o];
		return b < 0 ? -1 : b - f.priorLength;
	}
	function nextBreakablePosition(pairs, f, startPosition) {
		const s = f.text;
		const length = s.length;
		if (startPosition === 0 && f.priorLength === 0) {
			if (length <= 1) return length;
			startPosition++;
		}
		let beforeBefore = startPosition > 1 ? s.charCodeAt(startPosition - 2) : f.secondToLast;
		let before = startPosition > 0 ? s.charCodeAt(startPosition - 1) : f.last;
		let beforeType = 0;
		let after = 0;
		let afterType = 0;
		let nextBreak = -1;
		for (let i = startPosition; i < length; beforeBefore = before, before = after, beforeType = afterType, i++) {
			after = s.charCodeAt(i);
			afterType = 0;
			if (isWebKitBreakableSpace(after)) return i;
			if (before === 45 && isASCIIDigit(after)) {
				if (isASCIIDigit(beforeBefore) || isASCIIAlpha(beforeBefore)) return i;
				continue;
			}
			if (before <= 255 && after <= 255) {
				if (before >= 33 && after >= 33) {
					const x = after - 33;
					if ((pairs[(before - 33) * 28 + (x >> 3)] & 1 << (x & 7)) !== 0) return i;
				}
				continue;
			}
			if (beforeType === 0) beforeType = classify(before);
			afterType = classify(after);
			const pair = beforeType | afterType;
			if ((pair & -1922) === 0) continue;
			if ((pair | AL$1) === 3) return i;
			if ((pair & 192) !== 0 && (pair & WEIRD) === 0) {
				if ((pair & ID$1) !== 0 && (pair & QU) !== 0 && ((afterType & PI) !== 0 || (beforeType & PF) !== 0)) return i;
				continue;
			}
			if (afterType === CM$1) {
				afterType = beforeType;
				continue;
			}
			if ((pair & WEIRD) === 0 && (pair & 56) !== 0) {
				if (afterType === CL || afterType === CP || beforeType === OP) continue;
				if ((pair & ID$1) !== 0) return i;
			}
			if (nextBreak < i) nextBreak = following(f, i - 1);
			if (nextBreak >= 0 && i < nextBreak) for (const max = Math.min(nextBreak, length - 1); i < max; beforeBefore = before, before = after, beforeType = afterType, i++) {
				const lookahead = s.charCodeAt(i + 1);
				if (lookahead <= 255 && !isASCIIAlpha(lookahead)) break;
			}
			if (i === nextBreak && !isWebKitBreakableSpace(before)) return i;
		}
		return length;
	}
	function nextBreakableSpace(s, startPosition, punctuationBreaks) {
		for (let i = startPosition; i < s.length; i++) {
			const c = s.charCodeAt(i);
			if (isWebKitBreakableSpace(c) || c === ZWSP) return i;
			if (c === IDEOGRAPHIC_SPACE) return i + 1;
			if (punctuationBreaks && hasProperty(c, 3) && i + 1 < s.length) return i + 1;
		}
		return s.length;
	}
	function getWebKitLineRules(language) {
		const locale = language ?? "";
		let line = webkitLineRules.get(locale);
		if (line !== void 0) return line;
		const breakLanguage = getBreakLanguage(locale);
		const rules = getBreakRules(breakLanguage === "ja" || breakLanguage === "ko" ? "apple/line_normal" : breakLanguage === "zh" ? "apple/line_cj" : "apple/line");
		const subtags = locale.split(/[-_]/);
		let name = subtags[0].toLowerCase();
		for (let k = 1; k < subtags.length; k++) {
			const subtag = subtags[k];
			name += "_" + (subtag.length === 4 ? subtag[0].toUpperCase() + subtag.slice(1).toLowerCase() : subtag.toUpperCase());
		}
		let remap = appleQuoteRemaps[name];
		while (remap === void 0) {
			const cut = name.lastIndexOf("_");
			name = cut < 0 ? "" : name.slice(0, cut);
			remap = appleQuoteRemaps[name];
		}
		const chars = [];
		const categories = [];
		for (let k = 0; k < remap.length; k += 2) {
			chars.push(remap[k]);
			categories.push(getClass(rules.classes, remap[k + 1] === 0 ? 123 : 125));
		}
		line = {
			rules,
			overrides: {
				chars,
				categories
			}
		};
		webkitLineRules.set(locale, line);
		return line;
	}
	var TEXT$1 = 0;
	var WHITESPACE = 1;
	var SOFT_LINE_BREAK = 2;
	function getWebKitLineBreaks(source, preserveNewlines, keepAll, language) {
		const pairs = webkitPairs ??= unpackTable(webkitLinePairsPacked);
		const f = createFactory(source, getWebKitLineRules(language));
		const length = source.length;
		const breaks = new Uint8Array(length + 1);
		let sixteenBit = false;
		for (let i = 0; keepAll && i < length && !sixteenBit; i++) sixteenBit = source.charCodeAt(i) > 255;
		let previousKind = -1;
		for (let position = 0; position < length;) {
			let kind = WHITESPACE;
			let end = position;
			const c = source.charCodeAt(position);
			if (c === LINE_SEPARATOR || c === PARAGRAPH_SEPARATOR || preserveNewlines && c === LF$1) {
				kind = SOFT_LINE_BREAK;
				end++;
				if (c !== LF$1) breaks[end] = 4;
			} else {
				for (; end < length; end++) {
					const c = source.charCodeAt(end);
					if (c !== SPACE$1 && c !== TAB$1 && (preserveNewlines || c !== LF$1)) break;
				}
				if (end === position) {
					kind = TEXT$1;
					end = length;
					for (let p = position; p < length; p++) {
						const next = keepAll ? nextBreakableSpace(source, p, sixteenBit) : nextBreakablePosition(pairs, f, p);
						if (next !== position) {
							end = next;
							break;
						}
					}
				}
			}
			if (previousKind >= 0 && previousKind !== SOFT_LINE_BREAK && kind !== SOFT_LINE_BREAK) breaks[position] = 1;
			previousKind = kind;
			position = end;
		}
		return breaks;
	}
	function getWebKitBreakBetweenItems(previous, next, keepAll, language) {
		const last = previous.charCodeAt(previous.length - 1);
		const first = next.charCodeAt(0);
		if (first === LF$1 || first === LINE_SEPARATOR || first === PARAGRAPH_SEPARATOR) return false;
		if (last === SPACE$1 || last === TAB$1 || first === SPACE$1 || first === TAB$1) return true;
		if (keepAll) return nextBreakableSpace(next, 0, false) === 0;
		const pairs = webkitPairs ??= unpackTable(webkitLinePairsPacked);
		const f = createFactory(next, getWebKitLineRules(language));
		const n = previous.length;
		f.secondToLast = n > 1 ? previous.charCodeAt(n - 2) : 0;
		f.last = n > 0 ? previous.charCodeAt(n - 1) : 0;
		f.priorLength = f.last === 0 ? 0 : f.secondToLast === 0 ? 1 : 2;
		return nextBreakablePosition(pairs, f, 0) === 0;
	}
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/graphemes.js
	var CLUSTER_END = 128;
	function parseGraphemeRules(table) {
		const rules = getBreakRules(table === "gecko/char" ? "chromium/char" : table);
		const width = rules.rowWidth;
		const rows = rules.rows;
		const states = rows.length / width;
		const transitions = new Uint8Array(states * rules.catCount);
		for (let state = 0; state < states; state++) for (let category = 0; category < rules.catCount; category++) {
			const next = rows[state * width + 3 + category];
			transitions[state * rules.catCount + category] = next === 0 || rows[next * width] > 1 ? CLUSTER_END | rows[1 * width + 3 + category] : next;
		}
		return {
			rules,
			transitions,
			skipped: table === "gecko/char" ? getClass(rules.classes, 173) : -1
		};
	}
	var graphemeRules = {};
	function isBidiControl(cp) {
		return (cp & 65280) === 8192 && (cp >= 8234 && cp <= 8238 || cp >= 8294 && cp <= 8297 || (cp & -2) === 8206) || cp === 1564;
	}
	function findGraphemeEnds(table, text, start, end, ends) {
		const { rules, transitions, skipped } = graphemeRules[table] ?? (graphemeRules[table] = parseGraphemeRules(table));
		const catCount = rules.catCount;
		let state = 1;
		let count = 0;
		for (let i = start; i < end;) {
			let c = text.charCodeAt(i);
			let next = i + 1;
			if ((c & 64512) === 55296 && next < end) {
				const trail = text.charCodeAt(next);
				if ((trail & 64512) === 56320) {
					next++;
					c = (c - 55296 << 10) + trail - 56320 + 65536;
				}
			}
			const category = getClass(rules.classes, c);
			if (category === skipped && (c === 173 || isBidiControl(c))) {
				i = next;
				continue;
			}
			const transition = transitions[state * catCount + category];
			if ((transition & CLUSTER_END) !== 0) {
				if (ends !== null) ends[count] = i;
				count++;
			}
			state = transition & -129;
			i = next;
		}
		if (state !== 1) {
			if (ends !== null) ends[count] = end;
			count++;
		}
		return count;
	}
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/gecko-line-breaks.js
	var CH_SHY = 173;
	var isSurrogatePair = (a, b) => (a & 64512) === 55296 && (b & 64512) === 56320;
	var combine = (a, b) => 65536 + (a - 55296 << 10) + (b - 56320);
	var eastAsianWidths = null;
	function isClusterExtender(cp) {
		return cp >= 768 && (hasProperty(cp, 1) || cp === 8204 || cp === 8205 || cp >= 65438 && cp <= 65439 || cp >= 127995 && cp <= 127999 || cp >= 917536 && cp <= 917631);
	}
	function isClusterExtenderExcludingJoiners(cp) {
		return cp >= 768 && (hasProperty(cp, 1) || cp >= 65438 && cp <= 65439 || cp >= 127995 && cp <= 127999 || cp >= 917536 && cp <= 917631);
	}
	function isEastAsianWidthFHWExcludingEmoji(widths, cp) {
		const width = getClass(widths, cp);
		return width === 2 || width === 3 || width === 5 && !hasProperty(cp, 5);
	}
	function isSegmentBreakSkipChar(widths, cp) {
		return isEastAsianWidthFHWExcludingEmoji(widths, cp) && !hasProperty(cp, 6) && cp !== 8361;
	}
	function isEastAsianPunctuation(widths, cp) {
		return getClass(widths, cp) !== 0 && (hasProperty(cp, 2) && cp !== 8361 || cp === 65374 || cp === 12288);
	}
	function isInvalidChar(ch) {
		if (ch >= 32 && ch < 127) return false;
		if (ch <= 159) return true;
		return (ch & 65280) === 8192 && (ch === 8203 || ch === 8232 || ch === 8233 || ch === 8288) || ch === 65279 || isBidiControl(ch);
	}
	function isDiscardable(ch, is8bit) {
		return ch === CH_SHY || !is8bit && isBidiControl(ch);
	}
	var isSpaceOrTab = (ch) => ch === 32 || ch === 9;
	var isSpaceOrTabOrSegmentBreak = (ch) => ch === 32 || ch === 9 || ch === 10;
	function isSpaceCombiningSequenceTail(text, from) {
		for (let i = from; i < text.length; i++) {
			const ch = text.charCodeAt(i);
			if (isClusterExtenderExcludingJoiners(ch)) return true;
			if (!isBidiControl(ch)) return false;
		}
		return false;
	}
	function isJapaneseOrChinese(language) {
		const breakLanguage = getBreakLanguage(language);
		return (breakLanguage === "ja" || breakLanguage === "zh") && language.charCodeAt(2) !== 95;
	}
	function isEastAsianSegmentBreak(text, start, end, japaneseOrChinese) {
		if (start === 0 || end >= text.length) return false;
		const widths = eastAsianWidths ??= unpackClasses("gecko/east_asian_width");
		let before;
		let pos = start;
		do {
			const low = text.charCodeAt(pos - 1);
			const high = pos > 1 ? text.charCodeAt(pos - 2) : 0;
			if (isSurrogatePair(high, low)) {
				before = combine(high, low);
				pos -= 2;
			} else {
				before = low;
				pos--;
			}
		} while (hasProperty(before, 4) && pos > 0);
		let after;
		pos = end;
		do {
			after = text.codePointAt(pos);
			pos += after > 65535 ? 2 : 1;
		} while (hasProperty(after, 4) && pos < text.length);
		return isSegmentBreakSkipChar(widths, before) && isSegmentBreakSkipChar(widths, after) || japaneseOrChinese && (isEastAsianPunctuation(widths, before) || isEastAsianPunctuation(widths, after));
	}
	function transformText(input, is8bit, preserveWhiteSpace, frameStarts) {
		const len = input.length;
		const orig = new Int32Array(len);
		const skipped = new Uint8Array(len);
		let leftOut = null;
		let n = 0;
		let dropsBidiControl = false;
		if (preserveWhiteSpace) for (let i = 0; i < len; i++) {
			const ch = input.charCodeAt(i);
			if (!isDiscardable(ch, is8bit)) orig[n++] = i;
			else {
				skipped[i] = 1;
				dropsBidiControl ||= ch !== CH_SHY;
			}
		}
		else {
			let inWhitespace = false;
			let i = 0;
			let frame = 0;
			let frameEnd = frameStarts === null ? len : 0;
			while (i < len) {
				const ch = input.charCodeAt(i);
				if (!isSpaceOrTabOrSegmentBreak(ch) && !isDiscardable(ch, is8bit)) {
					if (ch === 12 || ch === 13 && input.charCodeAt(i + 1) !== 10) (leftOut ??= new Uint8Array(len))[i] = 1;
					orig[n++] = i;
					inWhitespace = false;
					i++;
					continue;
				}
				if (isSpaceOrTabOrSegmentBreak(ch)) {
					if (i >= frameEnd) {
						while (frame < frameStarts.length && frameStarts[frame] <= i) frame++;
						frameEnd = frame < frameStarts.length ? frameStarts[frame] : len;
					}
					let keepLastSpace = false;
					let hasSegmentBreak = ch === 10;
					let trailingDiscardables = 0;
					let dropped = 0;
					const goesOnPastDropped = inWhitespace && i > 0 && isDiscardable(input.charCodeAt(i - 1), is8bit);
					let j = i + 1;
					for (; j < frameEnd; j++) {
						const c = input.charCodeAt(j);
						if (c === 10) hasSegmentBreak = true;
						else if (isDiscardable(c, is8bit)) dropped++;
						else if (!isSpaceOrTab(c)) break;
					}
					while (isDiscardable(input.charCodeAt(j - 1), is8bit)) {
						j--;
						trailingDiscardables++;
					}
					if (!is8bit && input.charCodeAt(j - 1) === 32 && j < frameEnd && isSpaceCombiningSequenceTail(input, j)) {
						keepLastSpace = true;
						j--;
					}
					for (let k = i; k < j; k++) {
						const c = input.charCodeAt(k);
						if (isDiscardable(c, is8bit)) {
							skipped[k] = 1;
							dropsBidiControl ||= c !== CH_SHY;
						} else if (inWhitespace || hasSegmentBreak && isSpaceOrTab(c)) {
							skipped[k] = 1;
							if (dropped > trailingDiscardables || goesOnPastDropped) (leftOut ??= new Uint8Array(len))[k] = 1;
						} else {
							orig[n++] = k;
							inWhitespace = true;
						}
					}
					if (keepLastSpace) orig[n++] = j++;
					for (let k = 0; k < trailingDiscardables; k++) {
						dropsBidiControl ||= input.charCodeAt(j) !== CH_SHY;
						skipped[j++] = 1;
					}
					i = j;
					continue;
				}
				skipped[i] = 1;
				dropsBidiControl ||= ch !== CH_SHY;
				inWhitespace = false;
				i++;
			}
		}
		let text = "";
		let sliceStart = 0;
		let sliceEnd = 0;
		for (let k = 0; k < n; k++) {
			const i = orig[k];
			const ch = input.charCodeAt(i);
			if (!preserveWhiteSpace && (ch === 9 || ch === 10)) {
				text += input.slice(sliceStart, sliceEnd) + " ";
				sliceStart = sliceEnd = i + 1;
			} else if (i !== sliceEnd) {
				text += input.slice(sliceStart, sliceEnd);
				sliceStart = i;
				sliceEnd = i + 1;
			} else sliceEnd++;
		}
		text += input.slice(sliceStart, sliceEnd);
		return {
			text,
			orig: orig.subarray(0, n),
			skipped,
			leftOut,
			dropsBidiControl
		};
	}
	function isTrimmableSpace(source, pos, is8bit) {
		switch (source.charCodeAt(pos)) {
			case 32:
			case 5760: return is8bit || !isSpaceCombiningSequenceTail(source, pos + 1);
			case 10:
			case 9:
			case 13:
			case 12: return true;
			default: return false;
		}
	}
	function hasCompressedLeadingWhitespace(source, skipped, is8bit, preserveWhiteSpace) {
		if (preserveWhiteSpace || skipped[0] === 0) return false;
		for (let k = 0; k < source.length && skipped[k] === 1; k++) if (isTrimmableSpace(source, k, is8bit)) return true;
		return false;
	}
	function extendCluster(g, i) {
		g.clusterStart[i] = 0;
		g.isSpace[i] = 0;
	}
	function setupClusterBoundaries(g, text, from, to, graphemeTable, ends) {
		let ch0 = text.charCodeAt(from);
		if (to - from > 1 && isSurrogatePair(ch0, text.charCodeAt(from + 1))) ch0 = combine(ch0, text.charCodeAt(from + 1));
		if (isClusterExtender(ch0)) extendCluster(g, from);
		let low = from;
		while (low < to && text.charCodeAt(low) < 768) low++;
		const count = low === to ? 0 : findGraphemeEnds(graphemeTable, text, from, to, ends);
		for (let k = 0, pos = from; pos < to; k++) {
			const ch = text.charCodeAt(pos);
			if (ch === 32 || ch === 12288) g.isSpace[pos] = 1;
			else if (ch === 2479 && pos > from && text.charCodeAt(pos - 1) === 2509) extendCluster(g, pos);
			const end = count === 0 ? pos + 1 : ends[k];
			for (pos++; pos < end; pos++) extendCluster(g, pos);
		}
	}
	function splitAndInitTextRun(g, text, graphemeTable, ends) {
		const end = text.length;
		let wordStart = 0;
		for (let i = 0; i < end; i++) {
			const ch = text.charCodeAt(i);
			if (!((ch === 32 || ch === 160) && !(i + 1 < end && isClusterExtender(text.charCodeAt(i + 1)))) && !isInvalidChar(ch)) continue;
			if (i > wordStart) setupClusterBoundaries(g, text, wordStart, i, graphemeTable, ends);
			if (ch === 32) g.isSpace[i] = 1;
			wordStart = i + 1;
		}
		if (end > wordStart) setupClusterBoundaries(g, text, wordStart, end, graphemeTable, ends);
	}
	var lineData = null;
	function getLineBreakClass(line, c) {
		return c > 1114111 ? 0 : getClass(line.classes, c);
	}
	var AI = 1;
	var AL = 3;
	var BK = 10;
	var CJ = 12;
	var CM = 14;
	var CR = 16;
	var H2 = 21;
	var H3 = 22;
	var HY = 24;
	var ID = 25;
	var JL = 29;
	var JT = 30;
	var JV = 31;
	var LF = 32;
	var NL = 33;
	var NU = 35;
	var SA = 46;
	var SP = 47;
	var ZW = 53;
	var ZWJ = 54;
	var BREAK = 253;
	var NO_MATCH = 254;
	var KEEP = 255;
	var INTERMEDIATE = 120;
	function getComplexLanguage(u) {
		if (u >= 3585 && u <= 3711) return 1;
		if (u >= 3712 && u <= 3839) return 2;
		if (u >= 4096 && u <= 4255 || u >= 43488 && u <= 43519 || u >= 43616 && u <= 43647) return 3;
		if (u >= 6016 && u <= 6143 || u >= 6624 && u <= 6655) return 4;
		return 0;
	}
	function segmentComplex(units) {
		const result = [];
		for (let i = 0; i < units.length;) {
			const language = getComplexLanguage(units[i]);
			let j = i + 1;
			while (j < units.length && getComplexLanguage(units[j]) === language) j++;
			if (language !== 0) {
				let slice = "";
				for (let k = i; k < j; k += 4096) slice += String.fromCharCode(...units.slice(k, Math.min(j, k + 4096)));
				for (const part of getWordSegmenter().segment(slice)) if (part.index > 0) result.push(i + part.index);
			}
			result.push(j);
			i = j;
		}
		return result;
	}
	function isKeepAllLetter(p) {
		return p === AI || p === AL || p === ID || p === NU || p === HY || p === H2 || p === H3 || p === JL || p === JV || p === JT || p === CJ;
	}
	function readCodePoint(text, i, end) {
		const c = text.charCodeAt(i);
		if ((c & 64512) === 55296 && i + 1 < end) {
			const next = text.charCodeAt(i + 1);
			if ((next & 64512) === 56320) return ((c & 1023) << 10) + (next & 1023) + 65536;
		}
		return c;
	}
	function markWordBreaks(line, text, start, end, keepAll, state) {
		const len = end - start;
		const states = line.states;
		let pos = 0;
		let cp = readCodePoint(text, start, end);
		let front = cp > 65535 ? 2 : 1;
		let cache = [];
		let cacheAt = 0;
		let cacheOffset = 0;
		for (;;) {
			if (cacheAt < cache.length) {
				const firstPos = cache[cacheAt++] - cacheOffset;
				let i = 0;
				while (i !== firstPos) {
					i += cp > 65535 ? 2 : 1;
					pos = front;
					if (pos >= len) return;
					cp = readCodePoint(text, start + pos, end);
					front += cp > 65535 ? 2 : 1;
				}
				cacheOffset += i;
				state[start + pos] = 1;
				continue;
			}
			let lb9Left = -1;
			let lb8aAfterLb9 = false;
			outer: for (;;) {
				const leftCodepoint = cp;
				const leftProp = lb9Left >= 0 ? lb9Left : getLineBreakClass(line, leftCodepoint);
				const afterZwj = lb8aAfterLb9 || lb9Left < 0 && leftProp === ZWJ;
				pos = front;
				if (pos >= len) return;
				cp = readCodePoint(text, start + pos, end);
				front += cp > 65535 ? 2 : 1;
				const rightProp = getLineBreakClass(line, cp);
				if ((rightProp === CM || rightProp === ZWJ) && leftProp !== BK && leftProp !== CR && leftProp !== LF && leftProp !== NL && leftProp !== SP && leftProp !== ZW) {
					lb9Left = leftProp;
					lb8aAfterLb9 = rightProp === ZWJ;
					continue;
				}
				lb9Left = -1;
				lb8aAfterLb9 = false;
				if (keepAll && isKeepAllLetter(leftProp) && isKeepAllLetter(rightProp)) continue;
				if (getLineBreakClass(line, leftCodepoint) === SA && rightProp === SA) {
					const units = [leftCodepoint & 65535];
					for (let p = pos, c = cp;;) {
						units.push(c & 65535);
						p += c > 65535 ? 2 : 1;
						if (p >= len) break;
						c = readCodePoint(text, start + p, end);
						if (getLineBreakClass(line, c) !== SA) break;
					}
					cache = segmentComplex(units);
					cacheAt = 1;
					let i = 1;
					while (i !== cache[0]) {
						i++;
						pos = front;
						if (pos >= len) return;
						cp = readCodePoint(text, start + pos, end);
						front += cp > 65535 ? 2 : 1;
					}
					cacheOffset = i;
					break;
				}
				const breakState = states[leftProp * 68 + rightProp];
				if (breakState === BREAK || breakState === NO_MATCH) {
					if (afterZwj) continue;
					break;
				}
				if (breakState === KEEP) continue;
				let index = breakState >= INTERMEDIATE ? breakState - INTERMEDIATE : breakState;
				let prevFront = front;
				let prevPos = pos;
				let prevCp = cp;
				let previousIsAfterZwj = afterZwj;
				let leftPropPreLb9 = rightProp;
				const isIntermediateRuleNoMatch = index > 54;
				for (;;) {
					const innerAfterZwj = leftPropPreLb9 === ZWJ;
					const previousBreakStateIsCpProp = index <= 54;
					pos = front;
					if (pos >= len) {
						if (states[index * 68 + 67] !== NO_MATCH) return;
						front = prevFront;
						pos = prevPos;
						cp = prevCp;
						if (previousIsAfterZwj) continue outer;
						break outer;
					}
					cp = readCodePoint(text, start + pos, end);
					front += cp > 65535 ? 2 : 1;
					const prop = getLineBreakClass(line, cp);
					if ((prop === CM || prop === ZWJ) && leftPropPreLb9 !== BK && leftPropPreLb9 !== CR && leftPropPreLb9 !== LF && leftPropPreLb9 !== NL && leftPropPreLb9 !== SP && leftPropPreLb9 !== ZW) {
						leftPropPreLb9 = prop;
						continue;
					}
					const next = states[index * 68 + prop];
					if (next === KEEP) continue outer;
					if (next === NO_MATCH) {
						front = prevFront;
						pos = prevPos;
						cp = prevCp;
						if (innerAfterZwj) {
							if (isIntermediateRuleNoMatch && !previousIsAfterZwj) break outer;
							continue outer;
						}
						if (previousIsAfterZwj) continue outer;
						break outer;
					}
					if (next === BREAK) {
						if (innerAfterZwj) continue outer;
						break outer;
					}
					if (next >= INTERMEDIATE) {
						index = next - INTERMEDIATE;
						prevFront = front;
						prevPos = pos;
						prevCp = cp;
						previousIsAfterZwj = innerAfterZwj;
					} else {
						index = next;
						if (previousBreakStateIsCpProp) {
							prevFront = front;
							prevPos = pos;
							prevCp = cp;
							previousIsAfterZwj = innerAfterZwj;
						}
					}
					leftPropPreLb9 = prop;
				}
			}
			state[start + pos] = 1;
		}
	}
	var NON_BREAKABLE_ASCII = new Uint8Array([
		0,
		0,
		1,
		1,
		0,
		0,
		1,
		1,
		0,
		0,
		1,
		0,
		1,
		0,
		1,
		0,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		0,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		0,
		0,
		0,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		1,
		0,
		0,
		0,
		1,
		0
	]);
	function getBreakStates(line, text, is8bit, afterLeadingWhitespace, keepAll) {
		const len = text.length;
		const state = new Uint8Array(len);
		let afterBreakableSpace = afterLeadingWhitespace;
		let wordStart = 0;
		let wordMightBeBreakable = false;
		for (let offset = 0; offset <= len; offset++) {
			const ch = offset < len ? text.charCodeAt(offset) : -1;
			const isSpace = ch === 32 || ch === 9 || ch === 13;
			if (afterBreakableSpace && !isSpace && ch >= 0) state[offset] = 1;
			afterBreakableSpace = isSpace;
			if (ch >= 0 && !isSpace && (is8bit || ch !== 10)) {
				if (!(ch >= 32 && ch <= 127 && NON_BREAKABLE_ASCII[ch - 32] === 1)) wordMightBeBreakable = true;
				continue;
			}
			if (offset > wordStart && wordMightBeBreakable) markWordBreaks(line, text, wordStart, offset, keepAll, state);
			wordMightBeBreakable = false;
			wordStart = offset + 1;
		}
		return state;
	}
	function getGeckoLineBreaks(source, preserveWhiteSpace, keepAll, graphemeTable, frameStarts = null) {
		const len = source.length;
		const flags = new Uint8Array(len + 1);
		if (len === 0) return {
			breaks: flags,
			leftOut: null,
			dropsBidiControl: false
		};
		let is8bit = true;
		for (let i = 0; i < len && is8bit; i++) is8bit = source.charCodeAt(i) < 256;
		const tr = transformText(source, is8bit, preserveWhiteSpace, frameStarts);
		const n = tr.text.length;
		if (n === 0) return {
			breaks: flags,
			leftOut: null,
			dropsBidiControl: tr.dropsBidiControl
		};
		const g = {
			clusterStart: new Uint8Array(n).fill(1),
			isSpace: new Uint8Array(n)
		};
		splitAndInitTextRun(g, tr.text, graphemeTable, new Int32Array(n));
		const state = getBreakStates(lineData ??= {
			classes: unpackClasses("gecko/line"),
			states: unpackTable(geckoLineBreakStatesPacked)
		}, tr.text, is8bit, hasCompressedLeadingWhitespace(source, tr.skipped, is8bit, preserveWhiteSpace), keepAll);
		for (let t = 1; t < n; t++) {
			const rawPos = tr.orig[t];
			const normal = state[t] === 1 && (g.clusterStart[t] === 1 || g.isSpace[t - 1] === 1);
			const afterSoftHyphen = tr.skipped[rawPos - 1] === 1 && source.charCodeAt(rawPos - 1) === CH_SHY;
			if (normal || afterSoftHyphen) flags[rawPos] = normal && afterSoftHyphen ? 9 : 1;
			else if (g.clusterStart[t] === 1) flags[rawPos] = 2;
		}
		return {
			breaks: flags,
			leftOut: tr.leftOut,
			dropsBidiControl: tr.dropsBidiControl
		};
	}
	var SEGMENT_KINDS = [
		"text",
		"space",
		"zero-width-break",
		"soft-hyphen",
		"preserved-space",
		"tab",
		"zero-width-glue",
		"control",
		"hard-break"
	];
	var collapsibleWhitespaceRunRe = /[ \t\n\r\f]{2,}|[\t\n\r\f]/g;
	var needsWhitespaceNormalizationRe = /[\t\n\r\f]| {2,}|^ | $/;
	function isSegmentBreakRunSpace(code, scan) {
		return code === 32 || code === 9 || code === 10 || code === 13 && scan === "blink";
	}
	function removeSkippableSegmentBreaks(text, profile, language = null) {
		const scan = profile.lineBreakScan;
		if (scan === "webkit" || !text.includes("\n")) return text;
		const eastAsian = scan === "gecko" && maybeEastAsianRe.test(text);
		if (!eastAsian && !text.includes("​")) return text;
		const japaneseOrChinese = eastAsian && isJapaneseOrChinese(language);
		let result = "";
		let copied = 0;
		for (let newline = text.indexOf("\n"); newline !== -1;) {
			let start = newline;
			for (let index = newline - 1; index >= 0; index--) {
				const code = text.charCodeAt(index);
				if (isSegmentBreakRunSpace(code, scan)) start = index;
				else if (!(scan === "gecko" && isDiscardable(code, false))) break;
			}
			let end = newline + 1;
			let index = end;
			for (; index < text.length; index++) {
				const code = text.charCodeAt(index);
				if (isSegmentBreakRunSpace(code, scan)) end = index + 1;
				else if (!(scan === "gecko" && isDiscardable(code, false))) break;
			}
			newline = text.indexOf("\n", index);
			if (scan === "gecko" && text.charCodeAt(end - 1) === 32 && isSpaceCombiningSequenceTail(text, end)) end--;
			if (text.charCodeAt(start - 1) !== 8203 && text.charCodeAt(end) !== 8203 && !(eastAsian && isEastAsianSegmentBreak(text, start, end, japaneseOrChinese))) continue;
			result += text.slice(copied, start);
			for (let member = start; member < end; member++) if (!isSegmentBreakRunSpace(text.charCodeAt(member), scan)) result += text[member];
			copied = end;
		}
		return copied === 0 ? text : result + text.slice(copied);
	}
	function getTrailingCollapsibleStart(text, from, profile) {
		let start = text.length;
		for (let i = text.length - 1; i >= from; i--) {
			const code = text.charCodeAt(i);
			if (isCollapsibleSpaceCode(code)) start = i;
			else if (!(profile.lineBreakScan === "gecko" && isBidiControl(code))) break;
		}
		return start;
	}
	var maybeEastAsianRe = /[\u1100-\uFFFF]/;
	function collapseWhitespaceNormal(text) {
		if (!needsWhitespaceNormalizationRe.test(text)) return text;
		let normalized = text.replace(collapsibleWhitespaceRunRe, " ");
		if (normalized.charCodeAt(0) === 32) normalized = normalized.slice(1);
		if (normalized.length > 0 && normalized.charCodeAt(normalized.length - 1) === 32) normalized = normalized.slice(0, -1);
		return normalized;
	}
	function normalizeWhitespacePreWrap(text) {
		if (!/[\r\f]/.test(text)) return text;
		return text.replace(/\r\n/g, "\n").replace(/[\r\f]/g, "\n");
	}
	var combiningMarkRe = /\p{M}/u;
	function classifySegmentBreakCode(code, whiteSpace, scan) {
		if (whiteSpace === "pre-wrap") {
			if (code === 32) return 4;
			if (code === 9) return 5;
			if (code === 10) return 8;
		}
		if (code === 32) return 1;
		if (code === 8203) return 2;
		if (code === 173) return 3;
		if (code === 133 && scan === "webkit") return 7;
		return 0;
	}
	function isCollapsibleSpaceCode(code) {
		return code === 32 || code === 9 || code === 10 || code === 13 || code === 12;
	}
	function mapSourceLineBreaks(source, normalizedLength, sourceBreaks, whiteSpace, spaceSources) {
		const breaks = new Uint8Array(normalizedLength + 1);
		let normalizedIndex = 0;
		if (whiteSpace === "pre-wrap") {
			for (let i = 0; i < source.length; i++, normalizedIndex++) {
				breaks[normalizedIndex] = sourceBreaks[i];
				if (source.charCodeAt(i) === 13 && source.charCodeAt(i + 1) === 10) {
					i++;
					if ((sourceBreaks[i] & 1) !== 0) breaks[normalizedIndex] = sourceBreaks[i];
				}
			}
			breaks[normalizedLength] = sourceBreaks[source.length];
			return breaks;
		}
		let i = 0;
		while (i < source.length && isCollapsibleSpaceCode(source.charCodeAt(i))) i++;
		while (i < source.length) {
			let end = i + 1;
			if (isCollapsibleSpaceCode(source.charCodeAt(i))) {
				while (end < source.length && isCollapsibleSpaceCode(source.charCodeAt(end))) end++;
				if (end === source.length) break;
			}
			if ((sourceBreaks[i] & 1) === 0 && breaks[normalizedIndex] === 0) breaks[normalizedIndex] = sourceBreaks[i];
			if (spaceSources !== null) spaceSources[normalizedIndex] = source.charCodeAt(i);
			const start = i;
			for (; i < end; i++) if ((sourceBreaks[i] & 1) !== 0) breaks[i === start ? normalizedIndex : normalizedIndex + 1] = sourceBreaks[i];
			normalizedIndex++;
		}
		breaks[normalizedLength] = (sourceBreaks[i] & 1) === 0 ? sourceBreaks[i] : sourceBreaks[i] & 4;
		return breaks;
	}
	function classifySegmentUnit(normalized, breaks, i, code, whiteSpace, scan) {
		if ((code === 8232 || code === 8233) && (breaks[i + 1] & 4) !== 0) return 8;
		if (code === 173 && (breaks[i + 1] & 8) !== 0 && followsChunkContent(normalized, i)) return 2;
		return classifySegmentBreakCode(code, whiteSpace, scan);
	}
	function followsChunkContent(normalized, i) {
		let j = i - 1;
		while (j >= 0 && normalized.charCodeAt(j) === 173) j--;
		return j >= 0 && normalized.charCodeAt(j) !== 10;
	}
	function gathersKind(kind) {
		return kind === 0 || kind === 1 || kind === 4 || kind === 3;
	}
	function isControlSegmentCode(code) {
		return code < 32 || code >= 127 && code <= 159 || code === 8232 || code === 8233;
	}
	function segmentAtLineBreaks(normalized, spaceSources, breaks, whiteSpace, scan, hangTabs, dropsBidiControl) {
		const oneCluster = scan === "gecko" ? 128 : 0;
		const starts = [];
		const flags = [];
		let lastAlone = false;
		let markRun = false;
		let droppedEnd = -1;
		let lastKind = -1;
		for (let i = 0; i < normalized.length; i++) {
			const code = normalized.charCodeAt(i);
			if (dropsBidiControl && i < droppedEnd) continue;
			if (dropsBidiControl && isDiscardable(code, false) && (i === 0 || (breaks[i] & 16) !== 0 || !isDiscardable(normalized.charCodeAt(i - 1), false))) {
				let j = i;
				let controlEnd = -1;
				for (; j < normalized.length && isDiscardable(normalized.charCodeAt(j), false) && (j === i || (breaks[j] & 16) === 0); j++) if (isBidiControl(normalized.charCodeAt(j))) controlEnd = j + 1;
				if (controlEnd > 0) {
					const startsItem = lastKind >= 0 && lastKind !== 8 && (breaks[i] & 16) !== 0;
					const chunkStart = lastKind < 0 || lastKind === 8 || startsItem;
					if (chunkStart) {
						const endsChunk = j === normalized.length || classifySegmentUnit(normalized, breaks, j, normalized.charCodeAt(j), whiteSpace, scan) === 8;
						if (!endsChunk) {
							if (startsItem) breaks[i] = breaks[i] | breaks[j] & 1;
							breaks[j] = breaks[j] & -10;
						}
						droppedEnd = j;
						if (endsChunk && lastKind >= 0) continue;
					} else droppedEnd = controlEnd;
					if (chunkStart || lastAlone || markRun) {
						starts.push(i);
						flags.push(0 | oneCluster);
						lastKind = 0;
						lastAlone = false;
						markRun = false;
					}
					continue;
				}
			}
			const kind = classifySegmentUnit(normalized, breaks, i, code, whiteSpace, scan);
			const alone = kind === 0 && isControlSegmentCode(code);
			const unbroken = (breaks[i] & 1) === 0;
			if ((breaks[i] & 17) === 0 && !alone && !lastAlone && !(markRun && !combiningMarkRe.test(normalized[i])) && kind === lastKind && gathersKind(kind)) {
				if ((breaks[i] & 2) !== 0) flags[flags.length - 1] = flags[flags.length - 1] & -129;
				continue;
			}
			markRun = unbroken && kind === 0 && combiningMarkRe.test(normalized[i]) && (lastAlone || lastKind === 2 || lastKind === 3 || lastKind === 7);
			starts.push(i);
			flags.push(kind | oneCluster);
			lastKind = kind;
			lastAlone = alone;
		}
		let hasUnbroken = false;
		const count = flags.length;
		for (let j = count - 2; j >= 0; j--) {
			const kind = flags[j] & 15;
			const next = flags[j + 1] & 15;
			if ((breaks[starts[j + 1]] & 1) !== 0 || kind === 8) continue;
			if (!hangTabs && (next === 5 || next === 4 && kind === 5)) {
				if (kind === 3) continue;
			} else if (next === 0 || next === 6 || next === 7) {
				if (kind === 2 || kind === 3) flags[j] = flags[j] & -16 | 6;
			} else continue;
			flags[j + 1] = flags[j + 1] | 32;
			hasUnbroken = true;
		}
		if (hasUnbroken) {
			for (let j = 0; j < count; j++) if ((flags[j] & 32) === 0) flags[j] = flags[j] | 64;
		}
		const texts = [];
		for (let j = 0; j < count; j++) texts.push(normalized.slice(starts[j], j + 1 < count ? starts[j + 1] : normalized.length));
		return {
			normalized,
			spaceSources,
			texts,
			starts,
			flags,
			hasUnbroken
		};
	}
	function analyzeText(text, profile, whiteSpace = "normal", wordBreak = "normal", language = null, paragraph = null) {
		const preserve = whiteSpace === "pre-wrap";
		const scanStarts = paragraph === null ? null : [];
		let source = preserve ? text : paragraph !== null && paragraph.ownSegmentBreaks ? removeItemsSkippableSegmentBreaks(text, paragraph.starts, profile, language, scanStarts) : removeSkippableSegmentBreaks(text, profile, language);
		if (paragraph !== null && scanStarts.length === 0) for (let k = 0; k < paragraph.starts.length; k++) scanStarts.push(paragraph.starts[k]);
		let normalized = preserve ? normalizeWhitespacePreWrap(text) : collapseWhitespaceNormal(source);
		const keepAll = wordBreak === "keep-all";
		let breaks;
		let spaceSources = null;
		let dropsBidiControl = false;
		if (profile.lineBreakScan === "blink") breaks = getBlinkLineBreaks(normalized, keepAll, language);
		else {
			let sourceBreaks;
			if (profile.lineBreakScan === "webkit") {
				sourceBreaks = paragraph === null ? getWebKitLineBreaks(source, preserve, keepAll, language) : getWebKitParagraphBreaks(source, paragraph, preserve, keepAll, language);
				if (!preserve && source !== normalized && /\r(?!\n)/.test(source)) {
					let count = 0;
					for (let i = 0; i < source.length; i++) if (source.charCodeAt(i) !== 13 || source.charCodeAt(i + 1) === 10) sourceBreaks[count++] = sourceBreaks[i];
					else sourceBreaks[i + 1] = sourceBreaks[i + 1] | sourceBreaks[i];
					sourceBreaks[count] = sourceBreaks[source.length];
					source = source.replace(/\r(?!\n)/g, "");
					normalized = collapseWhitespaceNormal(source);
				}
			} else {
				const gecko = getGeckoLineBreaks(source, preserve, keepAll, profile.graphemeTable, scanStarts);
				dropsBidiControl = gecko.dropsBidiControl;
				sourceBreaks = gecko.breaks;
				if (paragraph !== null) for (let k = 0; k < paragraph.atomic.length; k++) {
					if (!paragraph.atomic[k]) continue;
					let after = scanStarts[k] + 1;
					while (after < source.length && isDiscardable(source.charCodeAt(after), false)) after++;
					sourceBreaks[after] = sourceBreaks[after] & -9;
				}
				const leftOut = gecko.leftOut;
				const trailing = !preserve && (dropsBidiControl || leftOut !== null) ? getTrailingCollapsibleStart(source, 0, profile) : source.length;
				if (leftOut !== null || trailing < source.length) {
					let runSpace = -1;
					if (leftOut !== null && trailing < source.length) for (let i = trailing - 1; i >= 0; i--) {
						const code = source.charCodeAt(i);
						if (!isSpaceOrTabOrSegmentBreak(code) && !isDiscardable(code, false)) break;
						if (isSpaceOrTabOrSegmentBreak(code) && leftOut[i] !== 1) {
							runSpace = -1;
							break;
						}
						if (isSpaceOrTabOrSegmentBreak(code)) runSpace = i;
					}
					const from = leftOut === null ? trailing : 0;
					let kept = "";
					let copied = 0;
					let count = from;
					let last = from - 1;
					for (let i = from; i < source.length; i++) {
						if (i < trailing ? leftOut !== null && leftOut[i] === 1 && i !== runSpace : isCollapsibleSpaceCode(source.charCodeAt(i))) {
							kept += source.slice(copied, i);
							copied = i + 1;
							continue;
						}
						const breakBefore = sourceBreaks[i];
						sourceBreaks[count++] = last >= 0 && last < i - 1 && (breakBefore & 1) !== 0 && source.charCodeAt(last) === 173 ? breakBefore | 8 : breakBefore;
						last = i;
					}
					sourceBreaks[count] = sourceBreaks[source.length];
					source = kept + source.slice(copied);
					normalized = collapseWhitespaceNormal(source);
				}
			}
			if (profile.lineBreakScan === "webkit" && !preserve && source !== normalized) spaceSources = new Uint16Array(normalized.length);
			breaks = source === normalized ? sourceBreaks : mapSourceLineBreaks(source, normalized.length, sourceBreaks, whiteSpace, spaceSources);
		}
		if (paragraph !== null) markItemStarts(text, normalized, breaks, paragraph, profile.lineBreakScan);
		return segmentAtLineBreaks(normalized, spaceSources, breaks, whiteSpace, profile.lineBreakScan, profile.hangTabs, dropsBidiControl);
	}
	function removeItemsSkippableSegmentBreaks(text, starts, profile, language, resultStarts) {
		if (profile.lineBreakScan === "webkit" || !text.includes("\n")) return text;
		let result = "";
		let copied = 0;
		let newline = text.indexOf("\n");
		for (let k = 0; k < starts.length; k++) {
			const start = starts[k];
			const end = k + 1 < starts.length ? starts[k + 1] : text.length;
			resultStarts.push(result.length + start - copied);
			if (newline < 0 || newline >= end) continue;
			const item = text.slice(start, end);
			const transformed = removeSkippableSegmentBreaks(item, profile, language);
			if (transformed.length !== item.length) {
				result += text.slice(copied, start) + transformed;
				copied = end;
			}
			newline = text.indexOf("\n", end);
		}
		return copied === 0 ? text : result + text.slice(copied);
	}
	function alignToSource(source, normalized, scan) {
		const offsets = new Int32Array(normalized.length);
		const cr = scan === "blink" ? -1 : 13;
		const ff = scan === "gecko" ? 12 : -1;
		let i = 0;
		for (let j = 0; j < normalized.length; j++) {
			const unit = normalized.charCodeAt(j);
			while (i < source.length) {
				const code = source.charCodeAt(i);
				if (code === unit || isCollapsibleSpaceCode(code) && (unit === 32 ? code !== cr && code !== ff : unit === 10)) break;
				i++;
			}
			offsets[j] = i++;
			if (unit === 10 && source.charCodeAt(i - 1) === 13 && source.charCodeAt(i) === 10) i++;
		}
		return offsets;
	}
	function markItemStarts(text, normalized, breaks, paragraph, scan) {
		const offsets = paragraph.sourceOffsets = alignToSource(text, normalized, scan);
		const { starts, atomic } = paragraph;
		for (let k = 0, j = 0; k < starts.length; k++) {
			while (j < normalized.length && offsets[j] < starts[k]) j++;
			if (j === normalized.length) break;
			breaks[j] = breaks[j] | 16;
			if (atomic[k] && offsets[j] === starts[k]) {
				breaks[j] = breaks[j] | 1;
				breaks[j + 1] = breaks[j + 1] | 17;
			}
		}
	}
	function getWebKitParagraphBreaks(source, paragraph, preserve, keepAll, language) {
		const { items, starts, atomic } = paragraph;
		const breaks = new Uint8Array(source.length + 1);
		let previous = -1;
		for (let k = 0; k < starts.length; k++) {
			const start = starts[k];
			const end = k + 1 < starts.length ? starts[k + 1] : source.length;
			if (start === end) continue;
			const first = source.charCodeAt(start);
			if (end - start > 1 || first === 8232 || first === 8233) {
				const itemBreaks = getWebKitLineBreaks(items[k].text, preserve, keepAll, language);
				for (let i = 1; i <= end - start; i++) breaks[start + i] = itemBreaks[i];
			}
			if (previous >= 0 && !atomic[k] && !atomic[previous]) {
				const last = source.charCodeAt(start - 1);
				if (!preserve && (first !== 13 && isCollapsibleSpaceCode(first) || last !== 13 && isCollapsibleSpaceCode(last)) || getWebKitBreakBetweenItems(items[previous].text, items[k].text, keepAll, language)) breaks[start] = breaks[start] | 1;
			}
			previous = k;
		}
		return breaks;
	}
	var webkitGenericFamilyNames = [
		"",
		"Zapfino",
		"Menlo",
		"Kefa III",
		"Geeza Pro",
		"Snell Roundhand",
		"Kohinoor Bangla",
		"Kokonor|Kailasa",
		"Kailasa",
		"Galvji",
		"Noto Sans Tagalog",
		"Kohinoor Gujarati",
		"Lucida Grande|Arial Hebrew",
		"Apple Chancery|Arial Hebrew",
		"Courier New",
		"ITF Devanagari|Kohinoor Devanagari",
		"Kohinoor Devanagari",
		"Noto Sans Armenian",
		"Euphemia UCAS",
		"Hiragino Mincho ProN",
		"Hiragino Sans",
		"Helvetica",
		"Khmer MN|Khmer Sangam MN",
		"Khmer Sangam MN",
		"Kannada MN|Noto Sans Kannada",
		"Noto Sans Kannada",
		"AppleMyungjo|Apple SD Gothic Neo",
		"Apple SD Gothic Neo",
		"Noto Nastaliq Urdu",
		"Lao MN|Lao Sangam MN",
		"Lao Sangam MN",
		"Malayalam MN|Malayalam Sangam MN",
		"Malayalam Sangam MN",
		"Noto Serif Myanmar|Noto Sans Myanmar",
		"Noto Sans Myanmar",
		"Oriya MN|Noto Sans Oriya",
		"Noto Sans Oriya",
		"Mukta Mahee",
		"Sinhala MN|Sinhala Sangam MN",
		"Sinhala Sangam MN",
		"Tamil Sangam MN",
		"Kohinoor Telugu",
		"Thonburi",
		"Songti TC|PingFang HK",
		"PingFang HK",
		"Songti SC|PingFang SC",
		"PingFang SC",
		"Songti TC|PingFang TC",
		"PingFang TC",
		"Songti TC|PingFang MO",
		"PingFang MO"
	];
	var webkitGenericFamilies = {
		"": [
			0,
			0,
			0,
			1,
			2
		],
		"am": [
			3,
			3,
			3,
			3,
			2
		],
		"ar": [
			4,
			4,
			4,
			4,
			2
		],
		"bg": [
			0,
			0,
			5,
			5,
			2
		],
		"bn": [
			6,
			6,
			6,
			6,
			2
		],
		"bo": [
			7,
			8,
			7,
			7,
			2
		],
		"chr": [
			9,
			9,
			9,
			9,
			2
		],
		"ckb": [
			4,
			4,
			4,
			4,
			2
		],
		"fa": [
			4,
			4,
			4,
			4,
			2
		],
		"fil": [
			10,
			10,
			10,
			10,
			2
		],
		"gu": [
			11,
			11,
			11,
			11,
			2
		],
		"he": [
			0,
			12,
			13,
			0,
			14
		],
		"hi": [
			15,
			16,
			16,
			16,
			2
		],
		"hy": [
			17,
			17,
			17,
			17,
			2
		],
		"iu": [
			18,
			18,
			18,
			18,
			2
		],
		"ja": [
			19,
			20,
			19,
			19,
			2
		],
		"ka": [
			21,
			0,
			21,
			21,
			2
		],
		"km": [
			22,
			23,
			22,
			22,
			2
		],
		"kn": [
			24,
			25,
			24,
			24,
			2
		],
		"ko": [
			26,
			27,
			26,
			26,
			2
		],
		"ks": [
			28,
			28,
			28,
			28,
			2
		],
		"lo": [
			29,
			30,
			29,
			29,
			2
		],
		"lrc": [
			4,
			4,
			4,
			4,
			2
		],
		"ml": [
			31,
			32,
			31,
			31,
			2
		],
		"my": [
			33,
			34,
			33,
			33,
			2
		],
		"mzn": [
			4,
			4,
			4,
			4,
			2
		],
		"or": [
			35,
			36,
			35,
			35,
			2
		],
		"pa": [
			37,
			37,
			37,
			37,
			2
		],
		"ps": [
			4,
			4,
			4,
			4,
			2
		],
		"ro": [
			0,
			0,
			5,
			5,
			2
		],
		"ru": [
			0,
			0,
			5,
			5,
			2
		],
		"sd": [
			4,
			4,
			4,
			4,
			2
		],
		"si": [
			38,
			39,
			38,
			38,
			2
		],
		"sr": [
			0,
			0,
			5,
			5,
			2
		],
		"ta": [
			40,
			40,
			40,
			40,
			2
		],
		"te": [
			41,
			41,
			41,
			41,
			2
		],
		"th": [
			42,
			42,
			42,
			42,
			2
		],
		"tr": [
			0,
			0,
			5,
			5,
			2
		],
		"ug": [
			4,
			4,
			4,
			4,
			2
		],
		"uk": [
			0,
			0,
			5,
			5,
			2
		],
		"ur": [
			28,
			28,
			28,
			28,
			2
		],
		"yi": [
			0,
			12,
			13,
			0,
			14
		],
		"yue": [
			43,
			44,
			43,
			43,
			2
		],
		"zh": [
			45,
			46,
			45,
			45,
			2
		],
		"kk-arab": [
			4,
			4,
			4,
			4,
			2
		],
		"ks-arab": [
			4,
			4,
			4,
			4,
			2
		],
		"ks-deva": [
			0,
			0,
			0,
			1,
			2
		],
		"ms-arab": [
			4,
			4,
			4,
			4,
			2
		],
		"pa-arab": [
			4,
			4,
			4,
			4,
			2
		],
		"sd-deva": [
			0,
			0,
			0,
			1,
			2
		],
		"ur-arab": [
			4,
			4,
			4,
			4,
			2
		],
		"uz-arab": [
			4,
			4,
			4,
			4,
			2
		],
		"yue-hans": [
			45,
			46,
			45,
			45,
			2
		],
		"zh-hant": [
			47,
			48,
			47,
			47,
			2
		],
		"zh-hk": [
			43,
			44,
			43,
			43,
			2
		],
		"zh-mo": [
			49,
			50,
			49,
			49,
			2
		],
		"zh-tw": [
			47,
			48,
			47,
			47,
			2
		],
		"pa-aran-pk": [
			28,
			28,
			28,
			28,
			2
		],
		"yue-hant-mo": [
			49,
			50,
			49,
			49,
			2
		],
		"zh-hant-hk": [
			43,
			44,
			43,
			43,
			2
		],
		"zh-hant-mo": [
			49,
			50,
			49,
			49,
			2
		]
	};
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/measurement.js
	var measureState = null;
	var cachedEngineProfile = null;
	var MAX_PREFIX_FIT_GRAPHEMES = 96;
	var LETTER_SPACED_SHAPING = "0.000001px";
	var MAX_CACHED_SEGMENTS = 1 << 18;
	var emojiGraphemeRe = /\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji}\uFE0F/u;
	var maybeEmojiRe = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u20E3]/u;
	var genericKeywords = [
		"serif",
		"sans-serif",
		"cursive",
		"fantasy",
		"monospace"
	];
	var familyListItemRe = /("[^"]*"|'[^']*')|(^|,)(\s*)(serif|sans-serif|cursive|fantasy|monospace)(?=\s*(?:,|$))/gi;
	var fontSizeRe = /\dpx(?:\s*\/\s*\S+)?\s+/;
	var familyRe = /(?:"[^"]*"|'[^']*'|[^,])+/g;
	function getWebKitGenericFamilies(language, ctx) {
		let tag = language.toLowerCase().replaceAll("_", "-");
		let han = null;
		for (let at = tag; han === null;) if (" aa ab ady af ak am ar as ast av ay az ba be bg bi bn bo bs ca ce ceb ch chk cs cy da de dv dz ee efi el en es et eu fa fi fil fj fo fr fur fy ga gaa gd gil gl gn gsw gu ha haw he hi hil ho hr ht hu hy id ig ii ilo inh is it iu ja jv ka kaj kam kbd kha kk kl km kn ko kok kos kpe krc ks ku kum ky la lah lb lez ln lo lt lv mai mdf mg mh mi mk ml mn mr ms mt my myv na nb ne niu nl nn nr nso ny oc om or os pa pag pap pau pl pon ps pt qu rm rn ro ru rw sa sah sat sd se sg si sid sk sl sm so sq sr ss st su sv sw ta te tet tg th ti tig tk tkl tl tn to tpi tr trv ts tt tvl tw ty tyv udm ug uk und ur uz ve vi wal war wo xh yap yo za zh zh-hk zh-tw zu ".includes(` ${at} `)) han = at === "zh";
		else {
			const cut = at.lastIndexOf("-");
			if (cut < 0 || at.endsWith("-zyyy")) return null;
			if (" arab armn bali batk beng blis bopo brah brai bugi buhd cans cham cher cirt copt cprt cyrl cyrs deva dsrt egyd egyh egyp ethi geok geor glag goth grek gujr guru hang hani hano hans hant hebr hira hmng hrkt hung inds ital java jpan kali kana khar khmr knda kore laoo latf latg latn lepc limb lina linb mand maya mero mlym mong mymr nkoo ogam orkh orya osma perm phag phnx plrd qaai roro runr sara shaw sinh sylo syrc syre syrj syrn tagb tale talu taml telu teng tfng tglg thaa thai tibt ugar vaii visp xpeo xsux yiii zxxx ".includes(` ${at.slice(cut + 1)} `)) han = at.endsWith("-hani");
			at = at.slice(0, cut);
		}
		if (han) tag = "zh-hans";
		let row = webkitGenericFamilies[tag];
		while (row === void 0) {
			tag = tag.slice(0, Math.max(0, tag.lastIndexOf("-")));
			row = webkitGenericFamilies[tag];
		}
		const families = [];
		for (let i = 0; i < row.length; i++) {
			const first = row.indexOf(row[i]);
			if (first < i) {
				families.push(families[first]);
				continue;
			}
			const name = webkitGenericFamilyNames[row[i]];
			const pair = name.indexOf("|");
			const family = pair < 0 ? name : hasFamily(ctx, name.slice(0, pair)) ? name.slice(0, pair) : name.slice(pair + 1);
			families.push(family === "" ? "" : `"${family}"`);
		}
		return families;
	}
	var familyProbeText = "Hamburg 한中 नम សួ ನಮ ສະ നമ မင ନମ ආය བཀ";
	function hasFamily(ctx, family) {
		for (const fallback of ["monospace", "serif"]) {
			ctx.font = `16px ${fallback}`;
			const width = ctx.measureText(familyProbeText).width;
			ctx.font = `16px "${family}", ${fallback}`;
			if (ctx.measureText(familyProbeText).width !== width) return true;
		}
		return false;
	}
	function getCanvasFont(font, families) {
		const size = fontSizeRe.exec(font);
		if (size === null) return font;
		const start = size.index + size[0].length;
		return font.slice(0, start) + font.slice(start).replace(familyListItemRe, (item, quoted, separator, space, keyword) => {
			const named = quoted === void 0 ? families[genericKeywords.indexOf(keyword.toLowerCase())] : "";
			return named === "" ? item : separator + space + named;
		});
	}
	function getHyphenText(measurement) {
		if (measurement.hyphenText !== null) return measurement.hyphenText;
		const font = measurement.canvasFont;
		const size = fontSizeRe.exec(font);
		let hyphenText = "-";
		if (size !== null && getSegmentMetrics("‐", measurement).width !== getSegmentMetrics("-", measurement).width) {
			const context = getContext(measurement);
			const start = size.index + size[0].length;
			const prefix = font.slice(0, start);
			const families = font.slice(start).match(familyRe) ?? [];
			const monospace = prefix + "monospace";
			const serif = prefix + "serif";
			if (measureIn(context, monospace, " ") !== measureIn(context, serif, " ") && measureIn(context, monospace, "‐") !== measureIn(context, serif, "‐")) for (let i = 0; i < families.length; i++) {
				const beforeMonospace = `${prefix}${families[i]}, monospace`;
				const beforeSerif = `${prefix}${families[i]}, serif`;
				if (measureIn(context, beforeMonospace, " ") !== measureIn(context, beforeSerif, " ")) continue;
				if (measureIn(context, beforeMonospace, "‐") === measureIn(context, beforeSerif, "‐")) hyphenText = "‐";
				break;
			}
			context.font = font;
		}
		measurement.hyphenText = hyphenText;
		return hyphenText;
	}
	function measureIn(context, font, text) {
		context.font = font;
		return context.measureText(text).width;
	}
	var localeLanguage;
	function getPreparationLanguage(profile) {
		if (measureState !== null && measureState.segments > MAX_CACHED_SEGMENTS) clearMeasurementCaches();
		let language = localeLanguage ?? null;
		if (localeLanguage === void 0 && typeof document !== "undefined") {
			const lang = document.documentElement?.lang;
			if (typeof lang === "string") language = lang;
		}
		return language === "" && profile.laysOutUnderDefaultLocale ? getBlinkDefaultLocale() : language;
	}
	var MAX_APP_UNITS = (1 << 30) - 1;
	function readLetterSpacing(letterSpacing, profile) {
		const value = letterSpacing ?? 0;
		if (!Number.isFinite(value)) throw new RangeError(`letterSpacing must be a finite number of CSS px, not ${value}`);
		if (!profile.letterSpacingInAppUnits) return value;
		const units = Math.fround(Math.fround(value) * 60);
		return Math.min(Math.round(Math.abs(units)), MAX_APP_UNITS) * Math.sign(units) / 60;
	}
	function zeros(count) {
		const out = [];
		for (let i = 0; i < count; i++) out.push(0);
		return out;
	}
	var GLYPH_COUNT_SPACING = 2 ** 20;
	var noExtraSpacings = [];
	function getExtraSpacings(seg, measurement) {
		if (!measurement.state.takesLetterSpacing) return noExtraSpacings;
		const ends = new Int32Array(seg.length);
		const count = findGraphemeEnds(getEngineProfile().graphemeTable, seg, 0, seg.length, ends);
		const prefixes = count <= MAX_PREFIX_FIT_GRAPHEMES;
		const counts = measurement.glyphCounts;
		let context = null;
		let extras = noExtraSpacings;
		try {
			let before = 0;
			for (let i = 0, start = 0; i < count; start = ends[i++]) {
				const text = seg.slice(prefixes ? 0 : start, ends[i]);
				let glyphs = counts.get(text);
				if (glyphs === void 0) {
					if (context === null) {
						context = getContext(measurement);
						context.letterSpacing = `${GLYPH_COUNT_SPACING}px`;
					}
					glyphs = Math.round(context.measureText(text).width / GLYPH_COUNT_SPACING);
					counts.set(text, glyphs);
				}
				const extra = glyphs - (prefixes ? before : 0) - 1;
				before = glyphs;
				if (extra === 0 && extras.length === 0) continue;
				if (extras.length === 0) extras = zeros(count);
				extras[i] = extra;
			}
		} finally {
			if (context !== null) context.letterSpacing = measurement.letterSpacing;
		}
		return extras;
	}
	function getSegmentMetrics(seg, measurement) {
		return measurement.metrics.get(seg) ?? addMetrics(measurement.metrics, seg, seg, measurement);
	}
	function getFollowingSpaceMetrics(seg, measurement) {
		return measurement.followingSpaceMetrics.get(seg) ?? addMetrics(measurement.followingSpaceMetrics, seg, seg + " ", measurement);
	}
	function addMetrics(cache, seg, text, measurement) {
		const metrics = {
			width: getContext(measurement).measureText(text).width,
			emojiCount: -1,
			fit: null,
			spaceKerning: null,
			extraSpacings: null
		};
		cache.set(seg, metrics);
		measurement.state.segments++;
		if (!measurement.measuredKana && kanaRe.test(seg)) measurement.measuredKana = true;
		return metrics;
	}
	var kanaRe = /[\u3041-\u30FF]/;
	var kanaPairRe = /[\u3041-\u30FF]{2}/;
	var KANA_COUNT = 191;
	var noSpaceKerning = {
		after: 0,
		before: 0
	};
	function isCanvasWordLetter(code) {
		return code >= 12353 && code <= 12438 || code >= 12449 && code <= 12538 || code >= 13312 && code <= 40959 || code >= 63744 && code <= 64255;
	}
	function takesNoSpaceKerning(code) {
		return hasProperty(code, 1) || (code & 63488) === 55296 || isCanvasWordLetter(code) || code >= 44032 && code <= 55203;
	}
	function getFontSpaceKerning(measurement) {
		if (measurement.spaceKerning === void 0) {
			const context = getContext(measurement);
			let probe = "\u2028";
			for (let code = 33; code <= 126; code++) probe += String.fromCharCode(code) + "\u2028";
			const kerned = context.measureText(probe).width;
			context.fontKerning = "none";
			const unkerned = context.measureText(probe).width;
			context.fontKerning = "auto";
			measurement.spaceKerning = kerned !== unkerned && context.measureText("\u2028").width === getSegmentMetrics(" ", measurement).width ? /* @__PURE__ */ new Map() : null;
		}
		return measurement.spaceKerning;
	}
	function getCharacterSpaceKerning(code, spaceFirst, measurement, kernings) {
		const key = code << 1 | (spaceFirst ? 1 : 0);
		let kerning = kernings.get(key);
		if (kerning === void 0) {
			kerning = 0;
			if (!takesNoSpaceKerning(code)) {
				const character = String.fromCharCode(code);
				const pairWidth = getContext(measurement).measureText(spaceFirst ? "\u2028" + character : character + "\u2028").width;
				kerning = pairWidth - getSegmentMetrics(character, measurement).width - getSegmentMetrics(" ", measurement).width;
				if (Math.abs(kerning) <= pairWidth / 4194304) kerning = 0;
			}
			kernings.set(key, kerning);
		}
		return kerning;
	}
	function getSpaceKerning(seg, metrics, measurement, kernings) {
		let first = 0;
		let last = seg.length - 1;
		while (first < last && hasProperty(seg.charCodeAt(first), 4)) first++;
		while (last > first && hasProperty(seg.charCodeAt(last), 4)) last--;
		const before = first < last && hasProperty(seg.charCodeAt(first + 1), 1) ? 0 : getCharacterSpaceKerning(seg.charCodeAt(first), true, measurement, kernings);
		const after = getCharacterSpaceKerning(seg.charCodeAt(last), false, measurement, kernings);
		return metrics.spaceKerning = after === 0 && before === 0 ? noSpaceKerning : {
			after,
			before
		};
	}
	function getSpaceWidth(measurement) {
		return measurement.spaceWidth ??= getSegmentMetrics(" ", measurement).width;
	}
	var KANA_PROBE = "プダグタノムブイメえずぺ";
	function getWholeRunContext(measurement) {
		const state = measurement.state;
		if (state.wholeRunContext === null) {
			state.wholeRunContext = createContext(state.language);
			state.wholeRunContext.textRendering = "optimizeLegibility";
		}
		if (state.wholeRunFont !== measurement.kanaFont) state.wholeRunContext.font = state.wholeRunFont = measurement.kanaFont;
		return state.wholeRunContext;
	}
	function sameInk(a, b) {
		const bound = a.width / 4194304;
		return Math.abs(a.width - b.width) <= bound && Math.abs(a.actualBoundingBoxLeft - b.actualBoundingBoxLeft) <= bound && Math.abs(a.actualBoundingBoxRight - b.actualBoundingBoxRight) <= bound;
	}
	function getFontKanaKerning(measurement) {
		if (measurement.kanaKerning === void 0) {
			measurement.kanaKerning = null;
			const font = measurement.canvasFont;
			const size = fontSizeRe.exec(font);
			const start = size === null ? 0 : size.index + size[0].length;
			const families = size === null ? null : font.slice(start).match(familyRe);
			const lists = families === null ? 1 : families.length;
			let own = null;
			for (let i = 0; i < lists; i++) {
				const list = i === 0 ? font : font.slice(0, start) + families.slice(i).join(",");
				measurement.kanaFont = list;
				const context = getWholeRunContext(measurement);
				const kerned = context.measureText(KANA_PROBE).width;
				context.fontKerning = "none";
				const unkerned = context.measureText(KANA_PROBE);
				context.fontKerning = "auto";
				if (own === null) own = unkerned;
				else if (!sameInk(own, unkerned)) break;
				if (kerned === unkerned.width) continue;
				if (i > 0) {
					let pairs = "";
					for (let code = 12353; code <= 12438; code++) pairs += String.fromCharCode(code, 12290);
					const shorter = context.measureText(pairs).width;
					measurement.kanaFont = font;
					const ownContext = getWholeRunContext(measurement);
					const ownKerned = ownContext.measureText(pairs).width;
					ownContext.fontKerning = "none";
					const ownUnkerned = ownContext.measureText(pairs).width;
					ownContext.fontKerning = "auto";
					if (ownKerned === ownUnkerned || Math.abs(shorter - ownKerned) > ownKerned / 4194304) break;
					measurement.kanaFont = list;
				}
				measurement.kanaKerning = (/* @__PURE__ */ new Float64Array(36481)).fill(NaN);
				break;
			}
			if (measurement.kanaKerning === null) measurement.kanaFont = font;
		}
		return measurement.kanaKerning;
	}
	function getKanaKerning(text, start, at, measurement, kernings) {
		const second = text.charCodeAt(at);
		if (second < 12353 || second > 12543) return 0;
		const first = text.charCodeAt(at - 1);
		if (first < 12353 || first > 12543) return 0;
		if (at > start) {
			if (!isCanvasWordLetter(second)) return 0;
			let k = at - 1;
			let code = first;
			while (code >= 12353 && code <= 12543 && !isCanvasWordLetter(code)) {
				if (k === start) return 0;
				code = text.charCodeAt(--k);
			}
			if (code >= 11904 && !isCanvasWordLetter(code)) return 0;
		}
		const index = (first - 12353) * KANA_COUNT + second - 12353;
		const kerning = kernings[index];
		return Number.isNaN(kerning) ? kernings[index] = measureKanaKerning(text.slice(at - 1, at + 1), measurement) : kerning;
	}
	function measureKanaKerning(pair, measurement) {
		const pairWidth = getWholeRunContext(measurement).measureText(pair).width;
		const kerning = pairWidth - getSegmentMetrics(pair[0], measurement).width - getSegmentMetrics(pair[1], measurement).width;
		return Math.abs(kerning) <= pairWidth / 4194304 ? 0 : kerning;
	}
	function getTextWidth(text, measurement, emojiCorrection) {
		return getCorrectedSegmentWidth(text, getSegmentMetrics(text, measurement), measurement, emojiCorrection);
	}
	function getLayoutEngine(userAgent) {
		if (userAgent.includes("Firefox/")) return "gecko";
		if (userAgent.includes("AppleWebKit/537.36")) return userAgent.includes("Chrome/") || userAgent.includes("Chromium/") ? "blink" : null;
		return userAgent.includes("AppleWebKit/") ? "webkit" : null;
	}
	function getEngineProfile() {
		return cachedEngineProfile ??= buildEngineProfile();
	}
	function buildEngineProfile() {
		const engine = getLayoutEngine(typeof navigator === "undefined" ? "" : navigator.userAgent ?? "") ?? "blink";
		return {
			lineBreakScan: engine,
			graphemeTable: engine === "webkit" ? "apple/char" : engine === "gecko" ? "gecko/char" : "chromium/char",
			lineFitEpsilon: engine === "webkit" ? 1 / 64 : .005,
			cutWordFit: engine === "blink" ? "reshaped-lines" : "segment-prefixes",
			prefixFitMinWidth: engine === "webkit" ? 0 : 80,
			cutWordKeepsLigatures: engine === "gecko",
			measureTextWithFollowingSpace: engine === "webkit",
			kernsAcrossCanvasWords: engine === "blink",
			letterSpaceDiscretionaryHyphen: engine !== "blink",
			letterSpacingInAppUnits: engine === "gecko",
			canvasLetterSpacingDropsLigatures: engine !== "webkit",
			unspacedCursive: engine === "blink" ? "run" : engine === "gecko" ? "cluster" : "none",
			letterSpacesGlyphs: engine === "webkit",
			unfitHyphenRetreat: engine === "blink" ? "reduced-width" : engine === "gecko" ? "full-width" : "full-width-or-first",
			hyphenFromPrimaryFont: engine !== "gecko",
			letterSpaceTabStops: engine !== "webkit",
			letterSpaceTabs: engine === "webkit",
			tabMinimumCharacter: engine === "gecko" ? "0" : " ",
			tabsInAppUnits: engine === "gecko",
			hangTabs: engine !== "gecko",
			zeroWidthGlueTakesLine: engine !== "gecko",
			hidesControlCharacters: engine === "gecko",
			hanKerning: engine === "blink",
			hangsIdeographicSpace: engine !== "webkit",
			laysOutUnderDefaultLocale: engine === "blink",
			namesGenericFamiliesByLanguage: engine === "webkit" && !/^(?:Linux|Win32|Haiku|$)/.test(navigator.platform),
			hardBreakItemRetreat: engine === "blink" ? "item" : engine === "webkit" ? "fit" : "last-grapheme",
			paddedOpeningFit: engine === "blink" ? "start" : engine === "webkit" ? "placed" : "both",
			emptyAtomicAlwaysFits: engine === "gecko",
			hangsSpacesPerTextFrame: engine === "gecko",
			testsHyphenBeforeAtomic: engine !== "webkit",
			transformsSegmentBreaksAcrossItems: engine === "blink"
		};
	}
	function parseFontSize(font) {
		const m = font.match(/(?:^|\D)(\d+(?:\.\d+)?)\s*px/);
		return m ? parseFloat(m[1]) : 16;
	}
	function textMayContainEmoji(text) {
		return maybeEmojiRe.test(text);
	}
	function getEmojiCorrection(font, measurement) {
		let correction = measurement.emojiCorrection;
		if (correction !== null) return correction;
		const fontSize = parseFontSize(font);
		const askedBefore = measurement.emojiWidth !== 0;
		const canvasW = measurement.emojiWidth = getContext(measurement).measureText("😀").width;
		correction = 0;
		if (canvasW > fontSize + .5 && typeof document !== "undefined") {
			const domW = readEmojiWidth(font);
			if (Number.isNaN(domW)) return 0;
			if (canvasW - domW > .5) {
				correction = canvasW - domW;
				if (askedBefore) {
					for (const metrics of measurement.metrics.values()) metrics.fit = null;
					for (const metrics of measurement.followingSpaceMetrics.values()) metrics.fit = null;
				}
			}
		}
		measurement.emojiCorrection = correction;
		return correction;
	}
	function readEmojiWidth(font) {
		const body = document.body;
		if (body === null && document.head === null) return NaN;
		const span = document.createElement("span");
		span.style.cssText = "all:initial!important;-webkit-locale:inherit!important;display:inline-block!important;visibility:hidden!important;position:absolute!important";
		span.style.setProperty("font", font, "important");
		span.textContent = "😀";
		let width = body === null ? NaN : readWidthIn(body, span);
		if (Number.isNaN(width)) width = readWidthIn(document.documentElement, span);
		return width;
	}
	function readWidthIn(parent, span) {
		parent.appendChild(span);
		const drawn = span.getBoundingClientRect().width;
		const width = parseFloat(getComputedStyle(span).width);
		parent.removeChild(span);
		return Math.abs(drawn - width) <= width * 1e-5 ? drawn : width;
	}
	var CANVAS_WIDTH_ROUNDING = 2 ** -20;
	var WORD_SUM_ROUNDING = 2 ** -17;
	function getEmojiGlyphs(text, measurement) {
		const width = getSegmentMetrics(text, measurement).width;
		const glyphs = Math.round(width / measurement.emojiWidth);
		return Math.abs(width - glyphs * measurement.emojiWidth) <= width * CANVAS_WIDTH_ROUNDING ? glyphs : 0;
	}
	var emojiStretchRe = /[\p{Extended_Pictographic}\p{Emoji_Component}\uFE0E]+/gu;
	function countEmojiGlyphs(text, measurement) {
		const ends = new Int32Array(text.length);
		const graphemeCount = findGraphemeEnds(getEngineProfile().graphemeTable, text, 0, text.length, ends);
		let count = 0;
		for (let i = 0, start = 0; i < graphemeCount; start = ends[i++]) {
			const grapheme = text.slice(start, ends[i]);
			if (!emojiGraphemeRe.test(grapheme)) continue;
			const stretches = grapheme.match(emojiStretchRe);
			for (let s = 0; s < stretches.length; s++) count += getEmojiGlyphs(stretches[s], measurement);
		}
		return count;
	}
	function getCorrectedSegmentWidth(seg, metrics, measurement, emojiCorrection) {
		if (emojiCorrection === 0) return metrics.width;
		if (metrics.emojiCount < 0) metrics.emojiCount = countEmojiGlyphs(seg, measurement);
		return metrics.width - metrics.emojiCount * emojiCorrection;
	}
	function getSegmentFit(seg, metrics, measurement, emojiCorrection, mode, followingSpaceWidth = null) {
		if (metrics.fit !== null && metrics.fit.mode === mode) return metrics.fit;
		const profile = getEngineProfile();
		const ends = new Int32Array(seg.length);
		const count = findGraphemeEnds(profile.graphemeTable, seg, 0, seg.length, ends);
		if (count <= 1) return metrics.fit = {
			mode,
			advances: null,
			lineStartExtras: null
		};
		let advances;
		let lineStartExtras = null;
		let pairs = false;
		if (mode === "reshaped-lines") {
			const width = getCorrectedSegmentWidth(seg, metrics, measurement, emojiCorrection) - (followingSpaceWidth ?? 0);
			const alone = measureFitAdvances(seg, ends, count, "sum-graphemes", metrics, measurement, emojiCorrection, followingSpaceWidth);
			advances = alone;
			if (!addUpTo(alone, width)) {
				advances = measureFitAdvances(seg, ends, count, "pair-context", metrics, measurement, emojiCorrection, followingSpaceWidth);
				pairs = count > MAX_PREFIX_FIT_GRAPHEMES || addUpTo(advances, width);
				if (!pairs) advances = measureFitAdvances(seg, ends, count, "segment-prefixes", metrics, measurement, emojiCorrection, followingSpaceWidth);
				lineStartExtras = [0];
				for (let i = 1; i < count; i++) lineStartExtras.push(alone[i] - advances[i]);
			}
		} else {
			const prefixes = mode === "segment-prefixes" && count <= MAX_PREFIX_FIT_GRAPHEMES;
			pairs = mode !== "sum-graphemes" && !prefixes;
			advances = measureFitAdvances(seg, ends, count, pairs ? "pair-context" : mode, metrics, measurement, emojiCorrection, followingSpaceWidth);
			if (prefixes && profile.cutWordKeepsLigatures) countLigaturesOnFirstLetter(seg, ends, advances, measurement, emojiCorrection);
		}
		if (profile.kernsAcrossCanvasWords && measurement.kanaKerning !== null && kanaPairRe.test(seg)) {
			const kernings = getFontKanaKerning(measurement);
			if (kernings !== null) for (let g = 1; g < count; g++) {
				const kerning = getKanaKerning(seg, pairs && g > 1 ? ends[g - 2] : 0, ends[g - 1], measurement, kernings);
				if (kerning > 0) advances[g - 1] = advances[g - 1] + kerning;
				else if (kerning < 0) {
					advances[g] = advances[g] + kerning;
					lineStartExtras ??= zeros(count);
					lineStartExtras[g] = lineStartExtras[g] - kerning;
				}
			}
		}
		return metrics.fit = {
			mode,
			advances,
			lineStartExtras
		};
	}
	function countLigaturesOnFirstLetter(seg, ends, advances, measurement, emojiCorrection) {
		if (!measurement.state.shapesLetterSpaced || measurement.letterSpacing !== "0px") return;
		let first = 0;
		for (let i = 1; i < advances.length; i++) {
			const start = ends[i - 1];
			const alone = getTextWidth(seg.slice(start, ends[i]), measurement, emojiCorrection);
			if (Math.round((advances[i] - alone) * 60) !== 0 && isLigature(seg.slice(i === 1 ? 0 : ends[i - 2], ends[i]), measurement)) {
				advances[first] = advances[first] + advances[i];
				advances[i] = 0;
			} else first = i;
		}
	}
	function isLigature(pair, measurement) {
		let ligature = measurement.ligaturePairs.get(pair);
		if (ligature === void 0) {
			const context = getContext(measurement);
			const width = getSegmentMetrics(pair, measurement).width;
			context.letterSpacing = LETTER_SPACED_SHAPING;
			ligature = context.measureText(pair).width !== width;
			context.letterSpacing = "0px";
			measurement.ligaturePairs.set(pair, ligature);
		}
		return ligature;
	}
	function addUpTo(advances, width) {
		let sum = 0;
		for (let i = 0; i < advances.length; i++) sum += advances[i];
		return Math.abs(sum - width) <= width * WORD_SUM_ROUNDING;
	}
	function measureFitAdvances(seg, ends, count, from, metrics, measurement, emojiCorrection, followingSpaceWidth) {
		const prefixes = from === "segment-prefixes";
		const pairs = from === "pair-context";
		const advances = [];
		let previousStart = 0;
		let previousWidth = 0;
		for (let i = 0, start = 0; i < count; start = ends[i++]) {
			const end = ends[i];
			if (prefixes) {
				const width = followingSpaceWidth !== null && i === count - 1 ? getCorrectedSegmentWidth(seg, metrics, measurement, emojiCorrection) - followingSpaceWidth : getTextWidth(seg.slice(0, end), measurement, emojiCorrection);
				advances.push(width - previousWidth);
				previousWidth = width;
				continue;
			}
			const width = getTextWidth(seg.slice(start, end), measurement, emojiCorrection);
			advances.push(pairs && i > 0 ? getTextWidth(seg.slice(previousStart, end), measurement, emojiCorrection) - previousWidth : width);
			previousStart = start;
			previousWidth = width;
		}
		if (followingSpaceWidth !== null && !prefixes) advances[count - 1] = advances[count - 1] + metrics.width - getSegmentMetrics(seg, measurement).width - followingSpaceWidth;
		return advances;
	}
	function getFontMeasurement(font, language, letterSpaced) {
		if (measureState === null || measureState.language !== language) measureState = createMeasureState(language);
		const state = measureState;
		const shaped = letterSpaced && state.shapesLetterSpaced;
		const fonts = shaped ? state.letterSpacedFonts : state.fonts;
		state.font = "";
		let measurement = fonts.get(font);
		if (measurement === void 0) {
			const canvasFont = state.genericFamilies === null ? font : getCanvasFont(font, state.genericFamilies);
			if (!contextTakesFont(state.context, canvasFont)) throw new RangeError(`font must be a font string Canvas takes, a size in px then a family, such as 16px Inter, not "${font}"`);
			measurement = {
				state,
				canvasFont,
				letterSpacing: shaped ? LETTER_SPACED_SHAPING : "0px",
				metrics: /* @__PURE__ */ new Map(),
				followingSpaceMetrics: /* @__PURE__ */ new Map(),
				spaceKerning: void 0,
				measuredKana: false,
				kanaKerning: void 0,
				kanaFont: canvasFont,
				emojiCorrection: null,
				emojiWidth: 0,
				hyphenText: null,
				spaceWidth: null,
				hanKerning: void 0,
				ligaturePairs: /* @__PURE__ */ new Map(),
				glyphCounts: /* @__PURE__ */ new Map()
			};
			fonts.set(font, measurement);
		}
		return measurement;
	}
	function contextTakesFont(context, font) {
		context.font = "1px serif";
		context.font = font;
		if (context.font !== "1px serif") return true;
		context.font = "2px serif";
		context.font = font;
		return context.font !== "2px serif";
	}
	function getContext(measurement) {
		const state = measurement.state;
		if (state.font !== measurement.canvasFont) state.context.font = state.font = measurement.canvasFont;
		if (state.letterSpacing !== measurement.letterSpacing) state.context.letterSpacing = state.letterSpacing = measurement.letterSpacing;
		return state.context;
	}
	function createContext(language) {
		let context = null;
		if (typeof OffscreenCanvas !== "undefined") context = new OffscreenCanvas(1, 1).getContext("2d");
		else if (typeof document !== "undefined") context = document.createElement("canvas").getContext("2d");
		if (context === null) throw new Error("Text measurement requires OffscreenCanvas or a DOM canvas context.");
		if (language !== null && "lang" in context) context.lang = language;
		return context;
	}
	function createMeasureState(language) {
		const context = createContext(language);
		const profile = getEngineProfile();
		const takesLetterSpacing = typeof context.letterSpacing === "string";
		return {
			language,
			context,
			font: "",
			letterSpacing: "0px",
			wholeRunContext: null,
			wholeRunFont: "",
			genericFamilies: language !== null && profile.namesGenericFamiliesByLanguage ? getWebKitGenericFamilies(language, context) : null,
			takesLetterSpacing,
			shapesLetterSpaced: takesLetterSpacing && profile.canvasLetterSpacingDropsLigatures,
			fonts: /* @__PURE__ */ new Map(),
			letterSpacedFonts: /* @__PURE__ */ new Map(),
			segments: 0
		};
	}
	function clearMeasurementCaches() {
		if (measureState === null) return;
		measureState.fonts.clear();
		measureState.letterSpacedFonts.clear();
		measureState.segments = 0;
	}
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/han-kerning.js
	var OTHER = 0;
	var OPEN = 1;
	var CLOSE = 2;
	var MIDDLE = 3;
	var OPEN_NARROW = 4;
	var CLOSE_NARROW = 5;
	var DOT = 6;
	var COLON = 7;
	var SEMICOLON = 8;
	var OPEN_QUOTE = 9;
	var CLOSE_QUOTE = 10;
	var openPunctuationRe = /\p{Ps}/uy;
	var closePunctuationRe = /\p{Pe}/uy;
	var maybeHanKerningRe = /[\u2018-\u301F\uFF08-\uFF60]/;
	function maybeHanKerns(c) {
		return c >= 8216 && c <= 12319 || c >= 65288 && c <= 65376;
	}
	function textMayHanKern(text) {
		return maybeHanKerningRe.test(text);
	}
	function getStaticCharType(text, index) {
		const c = text.charCodeAt(index);
		switch (c) {
			case 8216:
			case 8220: return OPEN_QUOTE;
			case 8217:
			case 8221: return CLOSE_QUOTE;
			case 12289:
			case 12290:
			case 65292:
			case 65294: return DOT;
			case 65306: return COLON;
			case 65307: return SEMICOLON;
			case 183:
			case 8231:
			case 12288:
			case 12539: return MIDDLE;
			default: {
				if (c < 40 || !hasProperty(c, 2)) return OTHER;
				const wide = c >= 12288 && c <= 12351 || c >= 65281 && c <= 65376 || c >= 65504 && c <= 65510;
				openPunctuationRe.lastIndex = closePunctuationRe.lastIndex = index;
				if (openPunctuationRe.test(text)) return wide ? OPEN : OPEN_NARROW;
				if (closePunctuationRe.test(text)) return wide ? CLOSE : CLOSE_NARROW;
				return OTHER;
			}
		}
	}
	function getTypeFromBounds(ctx, c, hanWidth) {
		const s = String.fromCharCode(c);
		let advance;
		let left;
		let right;
		if (isCanvasCjkSymbol(c)) {
			const after = ctx.measureText("中" + s);
			advance = after.width - hanWidth;
			right = after.actualBoundingBoxRight - hanWidth;
			left = -ctx.measureText(s + "中").actualBoundingBoxLeft;
		} else {
			const metrics = ctx.measureText(s);
			advance = metrics.width;
			left = -metrics.actualBoundingBoxLeft;
			right = metrics.actualBoundingBoxRight;
		}
		const halfEm = advance / 2;
		const type = right <= halfEm ? CLOSE : left >= halfEm ? OPEN : right - left <= halfEm && left >= halfEm / 2 ? MIDDLE : OTHER;
		return {
			advance,
			type
		};
	}
	function getTrim(data, c, measurement) {
		let trim = data.trims.get(c);
		if (trim === void 0) {
			const one = String.fromCharCode(c);
			trim = 2 * getSegmentMetrics(one, measurement).width - getSegmentMetrics(one + one, measurement).width;
			data.trims.set(c, trim);
		}
		return trim;
	}
	function getFontData(measurement) {
		if (measurement.hanKerning !== void 0) return measurement.hanKerning;
		const data = {
			typeForDot: OTHER,
			typeForColon: OTHER,
			typeForSemicolon: OTHER,
			quoteFullwidth: false,
			trims: /* @__PURE__ */ new Map()
		};
		if (getTrim(data, 12300, measurement) <= .001) {
			measurement.hanKerning = null;
			return null;
		}
		const hanWidth = getSegmentMetrics("中", measurement).width;
		const ctx = getContext(measurement);
		const glyphs = [
			12289,
			12290,
			65292,
			65294,
			65306,
			65307,
			8220,
			8216,
			8221,
			8217
		].map((c) => getTypeFromBounds(ctx, c, hanWidth));
		const group = (from, to) => {
			for (let i = from + 1; i < to; i++) if (glyphs[i].advance !== glyphs[from].advance || glyphs[i].type !== glyphs[from].type) return OTHER;
			return glyphs[from].type;
		};
		data.typeForDot = group(0, 4);
		data.typeForColon = glyphs[4].type;
		data.typeForSemicolon = glyphs[5].type;
		data.quoteFullwidth = group(6, 8) === OPEN && group(8, 10) === CLOSE;
		measurement.hanKerning = data;
		return data;
	}
	function getCharType(data, text, index) {
		const type = getStaticCharType(text, index);
		switch (type) {
			case DOT: return data.typeForDot;
			case COLON: return data.typeForColon;
			case SEMICOLON: return data.typeForSemicolon;
			case OPEN_QUOTE: return data.quoteFullwidth ? OPEN : OPEN_NARROW;
			case CLOSE_QUOTE: return data.quoteFullwidth ? CLOSE : CLOSE_NARROW;
			default: return type;
		}
	}
	function haltedSide(earlier, later) {
		if (later === OPEN && (earlier === OPEN || earlier === MIDDLE || earlier === CLOSE || earlier === OPEN_NARROW)) return 1;
		if (earlier === CLOSE && (later === CLOSE || later === MIDDLE || later === CLOSE_NARROW)) return -1;
		return 0;
	}
	function isCanvasCjkSymbol(c) {
		return c >= 12288 && c <= 12543 || c >= 65072 && c <= 65135 || c >= 65280 && c <= 65519 && c !== 65307;
	}
	function getHanKerningTrims(measurement, analysis, from, to) {
		const out = {
			widthTrims: null,
			lineStartExtras: null,
			lineEndTrims: null,
			overflowLineEndTrims: null
		};
		const data = getFontData(measurement);
		if (data === null) return out;
		const { flags, starts, normalized } = analysis;
		const count = flags.length;
		const addWidthTrim = (i, trim) => {
			out.widthTrims ??= zeros(to - from);
			out.widthTrims[i - from] = out.widthTrims[i - from] + trim;
		};
		for (let i = from; i < to; i++) {
			if ((flags[i] & 15) !== 0) continue;
			const start = starts[i];
			const end = i + 1 < count ? starts[i + 1] : normalized.length;
			const first = normalized.charCodeAt(start);
			if (i > 0 && maybeHanKerns(first) && haltedSide(getCharType(data, normalized, start - 1), getCharType(data, normalized, start)) === 1) {
				const trim = getTrim(data, first, measurement);
				out.lineStartExtras ??= zeros(to - from);
				out.lineStartExtras[i - from] = trim;
				addWidthTrim(i, trim);
			}
			for (let k = start + 1; k < end; k++) {
				const earlier = normalized.charCodeAt(k - 1);
				const later = normalized.charCodeAt(k);
				if (!(maybeHanKerns(earlier) || maybeHanKerns(later)) || isCanvasCjkSymbol(earlier) === isCanvasCjkSymbol(later)) continue;
				const side = haltedSide(getCharType(data, normalized, k - 1), getCharType(data, normalized, k));
				if (side !== 0) addWidthTrim(i, getTrim(data, side === 1 ? later : earlier, measurement));
			}
			const last = normalized.charCodeAt(end - 1);
			if (!maybeHanKerns(last)) continue;
			const atEnd = i + 1 === count;
			if (!atEnd && haltedSide(getCharType(data, normalized, end - 1), getCharType(data, normalized, end)) === -1) {
				addWidthTrim(i, getTrim(data, last, measurement));
				continue;
			}
			const lastType = getStaticCharType(normalized, end - 1);
			if (lastType !== CLOSE && lastType !== CLOSE_QUOTE || getCharType(data, normalized, end - 1) !== CLOSE) continue;
			if (atEnd || (flags[i + 1] & 15) === 0 && (flags[i + 1] & 32) === 0) {
				out.lineEndTrims ??= zeros(to - from);
				out.lineEndTrims[i - from] = getTrim(data, last, measurement);
			} else {
				out.overflowLineEndTrims ??= zeros(to - from);
				out.overflowLineEndTrims[i - from] = getTrim(data, last, measurement);
			}
		}
		return out;
	}
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/prepare.js
	function countRenderedSpacingGraphemes(text, kind, graphemeTable) {
		return kind === 2 ? 0 : findGraphemeEnds(graphemeTable, text, 0, text.length, null);
	}
	function addInternalLetterSpacing(width, graphemeCount, letterSpacing) {
		return graphemeCount > 1 ? width + (graphemeCount - 1) * letterSpacing : width;
	}
	var complexTextPathRanges = [
		741,
		745,
		768,
		879,
		1425,
		1469,
		1471,
		1487,
		1536,
		4255,
		4352,
		4607,
		4957,
		4959,
		5888,
		6319,
		6400,
		6479,
		6528,
		6623,
		6656,
		7423,
		7616,
		7679,
		8400,
		8447,
		9977,
		9977,
		11503,
		11505,
		12330,
		12335,
		12441,
		12444,
		42620,
		42621,
		42736,
		42737,
		43008,
		44031,
		55216,
		55295,
		65024,
		65039,
		65056,
		65071,
		68096,
		68191,
		69632,
		69839,
		69888,
		70111,
		70144,
		70223,
		70320,
		70527,
		70656,
		70879,
		71040,
		71263,
		71296,
		71375,
		71424,
		72895,
		92928,
		93071,
		125184,
		125279,
		127462,
		127487,
		127995,
		127999,
		917504,
		917631,
		917760,
		917999
	];
	var extendedPictographicRe = /\p{Extended_Pictographic}/u;
	var leadingCombiningMarkRe = lazyRegExp(String.raw`^\p{M}`, "u");
	var numericRunRe = /^[\p{Nd}:\-/×,.+\u2013\u2014]+$/u;
	var controlCharacterRe = /^[\p{Cc}\u2028\u2029]$/u;
	function needsComplexTextPath(text) {
		let previousIsEmoji = false;
		for (let i = 0; i < text.length;) {
			const codePoint = text.codePointAt(i);
			i += codePoint > 65535 ? 2 : 1;
			if (codePoint === 8205 && previousIsEmoji) return true;
			previousIsEmoji = codePoint > 65535 && extendedPictographicRe.test(String.fromCodePoint(codePoint));
			for (let range = 0; range < complexTextPathRanges.length && codePoint >= complexTextPathRanges[range]; range += 2) if (codePoint <= complexTextPathRanges[range + 1]) return true;
		}
		return false;
	}
	var mixedDirectionRe = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF\u200F\u{10800}-\u{10FFF}\u{1E800}-\u{1EFFF}\u202A-\u202E\u2066-\u2069]/u;
	function isSpaceKind(kind) {
		return kind === 1 || kind === 4;
	}
	var scriptClasses = null;
	function getScriptFacts(c) {
		return scriptClassFacts[getClass(scriptClasses ??= unpackClasses("chromium/script"), c)];
	}
	function getScriptFactsAt(text, i) {
		const c = text.codePointAt(i);
		const facts = getScriptFacts(c);
		const next = i + (c > 65535 ? 2 : 1);
		if ((facts & 1024) !== 0 && next < text.length) {
			const markScripts = getScriptFacts(text.codePointAt(next)) >> 5 & 31;
			if (markScripts !== 0) return facts & -32 | markScripts;
		}
		return facts;
	}
	function mayHoldCursive(text) {
		for (let i = 0; i < text.length; i++) {
			if (text.charCodeAt(i) < 128) continue;
			const facts = getScriptFacts(text.codePointAt(i));
			if ((facts & 31) === 16 || (facts >> 5 & 31) === 16) return true;
		}
		return false;
	}
	function readScriptRuns(runs, text, to) {
		const { openBrackets } = runs;
		while (runs.read < to || runs.scripts === 31 && runs.read < text.length) {
			const c = text.codePointAt(runs.read);
			const facts = getScriptFactsAt(text, runs.read);
			let scripts = facts & 31;
			const opened = (facts & 8192) !== 0 ? openBrackets.lastIndexOf(c - (facts >> 14)) : -1;
			if (opened >= 0) {
				if (openBrackets[opened + 1] !== 0) scripts = openBrackets[opened + 1];
				openBrackets.length = opened + 2;
			}
			if ((runs.scripts & scripts) !== 0) runs.scripts &= scripts;
			else {
				for (let k = openBrackets.length - 1; k > 0 && openBrackets[k] === 0; k -= 2) openBrackets[k] = runs.scripts & -runs.scripts;
				runs.scripts = scripts;
			}
			if ((facts & 4096) !== 0) {
				if (openBrackets.length === 64) openBrackets.splice(0, 2);
				openBrackets.push(c, 0);
			}
			runs.read += c > 65535 ? 2 : 1;
		}
		return runs.scripts;
	}
	function spaceSharesScriptRun(runs, text, at, end) {
		let scripts = getScriptFactsAt(text, at) & 31;
		for (let first = at; scripts === 31 && first + 1 < end && hasProperty(text.charCodeAt(first), 4); first++) scripts = getScriptFactsAt(text, first + 1) & 31;
		if (scripts === 31) return true;
		for (let i = at - 2; i >= 0; i--) {
			if ((text.charCodeAt(i) & 64512) === 56320 && i > 0) i--;
			const facts = getScriptFactsAt(text, i);
			if ((facts & 8192) !== 0) break;
			const before = facts & 31;
			if (before === 31) continue;
			if ((before & before - 1) === 0) return (before & scripts) !== 0;
			break;
		}
		return (readScriptRuns(runs, text, at) & scripts) !== 0;
	}
	function getUnspacedGraphemes(text, start, end, graphemeTable, runs) {
		const ends = new Int32Array(end - start);
		const count = findGraphemeEnds(graphemeTable, text, start, end, ends);
		let unspaced = null;
		for (let g = 0, at = start; g < count; at = ends[g++]) if (runs === null ? (getScriptFacts(text.codePointAt(at)) & 2048) !== 0 : readScriptRuns(runs, text, at + 1) === 16 && text.charCodeAt(at) !== 160) (unspaced ??= []).push(g);
		return unspaced;
	}
	function getFollowingSpaceTail(analysis, analysisIndex, to) {
		const { normalized, spaceSources, starts, flags } = analysis;
		let next = analysisIndex + 1;
		while (next < to && (flags[next] & 15) === 2) next++;
		if (next >= to) return null;
		const nextKind = flags[next] & 15;
		const spaceStart = starts[next];
		if (nextKind !== 1 && nextKind !== 4 || (spaceSources === null ? normalized.charCodeAt(spaceStart) : spaceSources[spaceStart]) !== 32) return null;
		return normalized.slice(starts[analysisIndex + 1], spaceStart);
	}
	function getTailKerning(item, measurement, spaceWidth) {
		return getFollowingSpaceMetrics(item, measurement).width - getSegmentMetrics(item, measurement).width - spaceWidth;
	}
	function getJoinedNarrowing(analysis, analysisIndex, to, before, beforeMetrics, measurement, emojiCorrection, lineFitEpsilon) {
		if (before === null) return 0;
		const { texts, flags } = analysis;
		let next = analysisIndex + 1;
		while (next < to && (flags[next] & 15) === 3) next++;
		if (next >= to || (flags[next] & 15) !== 0) return 0;
		const after = texts[next];
		const apart = getCorrectedSegmentWidth(before, beforeMetrics, measurement, emojiCorrection) + getTextWidth(after, measurement, emojiCorrection);
		const together = getTextWidth(before + after, measurement, emojiCorrection);
		return apart - together > lineFitEpsilon ? apart - together : 0;
	}
	function getTextSegmentWidth(text, textMetrics, measurement, emojiCorrection, followingSpaceWidth, followingSpaceKerning) {
		return getCorrectedSegmentWidth(text, textMetrics, measurement, emojiCorrection) - followingSpaceWidth + followingSpaceKerning;
	}
	function measureAnalysis(analysis, from, to, font, includeSegments, letterSpacing, engineProfile, language, overflowBreaks, paragraph) {
		const { normalized, texts, starts, flags } = analysis;
		const ownStart = from === 0 ? 0 : starts[from];
		const own = from === 0 && to === flags.length ? normalized : to === from + 1 ? texts[from] : normalized.slice(ownStart, to < flags.length ? starts[to] : normalized.length);
		const widths = paragraph === null ? [] : paragraph.widths;
		const segmentFlags = paragraph === null ? new Uint8Array(to - from) : paragraph.segmentFlags;
		const breakableFitAdvances = paragraph === null ? [] : paragraph.breakableFitAdvances;
		const segments = includeSegments ? [] : null;
		const base = widths.length;
		const hasLetterSpacing = letterSpacing !== 0;
		const fontMeasurement = getFontMeasurement(font, language, hasLetterSpacing);
		const emojiCorrection = textMayContainEmoji(own) ? getEmojiCorrection(font, fontMeasurement) : 0;
		const hasSpace = own.includes(" ");
		const spaceWidth = hasSpace || own.includes("	") ? getSpaceWidth(fontMeasurement) : 0;
		const tabStopSpacing = engineProfile.letterSpaceTabStops ? letterSpacing : 0;
		const tabStopAdvance = engineProfile.tabsInAppUnits ? (Math.round(spaceWidth * 60) + Math.round(tabStopSpacing * 60)) * 8 / 60 : (spaceWidth + tabStopSpacing) * 8;
		let minimumTabAdvance = 0;
		let fontSpaceKerning = engineProfile.kernsAcrossCanvasWords && own.includes(" ") ? getFontSpaceKerning(fontMeasurement) : null;
		if (fontSpaceKerning !== null && mixedDirectionRe.test(own)) fontSpaceKerning = null;
		const scriptRuns = {
			read: 0,
			scripts: 31,
			openBrackets: []
		};
		let spaceShare = 0;
		const cursiveSpacing = hasLetterSpacing && engineProfile.unspacedCursive !== "none" && mayHoldCursive(own);
		let simpleKinds = !hasLetterSpacing;
		let breakableLineStartExtras = null;
		let discretionaryHyphenContexts = null;
		let previousJoinablePiece = null;
		let previousJoinableMetrics = null;
		const returnFitsEachSideAlone = engineProfile.unfitHyphenRetreat === "full-width-or-first";
		for (let mi = from, at = base; mi < to; mi++, at++) {
			const text = texts[mi];
			const segment = flags[mi];
			const kind = segment & 15;
			let width = 0;
			let spacingGraphemeCount = 0;
			let fitAdvances = null;
			switch (kind) {
				case 0: {
					if (engineProfile.hidesControlCharacters && controlCharacterRe.test(text)) {
						spacingGraphemeCount = 1;
						break;
					}
					const followingSpaceTail = engineProfile.measureTextWithFollowingSpace && hasSpace ? getFollowingSpaceTail(analysis, mi, to) : null;
					const measuredWithSpace = followingSpaceTail === "";
					const textMetrics = measuredWithSpace ? getFollowingSpaceMetrics(text, fontMeasurement) : getSegmentMetrics(text, fontMeasurement);
					previousJoinablePiece = text;
					previousJoinableMetrics = textMetrics;
					let followingSpaceKerning = followingSpaceTail === null || measuredWithSpace ? 0 : getTailKerning(text + followingSpaceTail, fontMeasurement, spaceWidth);
					if (fontSpaceKerning !== null && textMetrics.spaceKerning !== noSpaceKerning) {
						const spaceBefore = mi > from && isSpaceKind(flags[mi - 1] & 15);
						const spaceAfter = mi + 1 < to && isSpaceKind(flags[mi + 1] & 15);
						if (spaceBefore || spaceAfter) {
							const kerning = textMetrics.spaceKerning ?? getSpaceKerning(text, textMetrics, fontMeasurement, fontSpaceKerning);
							if (spaceAfter) {
								followingSpaceKerning = Math.max(kerning.after, 0);
								spaceShare = Math.min(kerning.after, 0);
							}
							if (spaceBefore && kerning.before !== 0 && !((flags[mi - 1] & 15) === 4 && (mi === from + 1 || (flags[mi - 2] & 15) === 8)) && spaceSharesScriptRun(scriptRuns, own, starts[mi] - ownStart, starts[mi] - ownStart + text.length)) widths[at - 1] = widths[at - 1] + kerning.before;
						}
					}
					width = getTextSegmentWidth(text, textMetrics, fontMeasurement, emojiCorrection, measuredWithSpace ? spaceWidth : 0, followingSpaceKerning);
					let unspaced = null;
					let extraSpacings = noExtraSpacings;
					if (hasLetterSpacing) {
						spacingGraphemeCount = countRenderedSpacingGraphemes(text, kind, engineProfile.graphemeTable);
						if (cursiveSpacing) {
							unspaced = getUnspacedGraphemes(own, starts[mi] - ownStart, starts[mi] - ownStart + text.length, engineProfile.graphemeTable, engineProfile.unspacedCursive === "run" ? scriptRuns : null);
							if (unspaced !== null) width -= unspaced.length * letterSpacing;
						}
						if (engineProfile.letterSpacesGlyphs) {
							extraSpacings = textMetrics.extraSpacings ??= needsComplexTextPath(text) ? getExtraSpacings(text, fontMeasurement) : noExtraSpacings;
							for (let k = 0; k < extraSpacings.length; k++) width += extraSpacings[k] * letterSpacing;
						}
					}
					if (!overflowBreaks || (segment & 128) !== 0 || text.length === 1) break;
					const fit = getSegmentFit(text, textMetrics, fontMeasurement, emojiCorrection, letterSpacing !== 0 ? "segment-prefixes" : numericRunRe.test(text) ? "pair-context" : textMetrics.width < engineProfile.prefixFitMinWidth ? "sum-graphemes" : engineProfile.cutWordFit, measuredWithSpace ? spaceWidth : null);
					fitAdvances = fit.advances;
					if (fitAdvances === null) break;
					if (fit.lineStartExtras !== null) (breakableLineStartExtras ??= new Array(to - from).fill(null))[mi - from] = fit.lineStartExtras;
					if (followingSpaceKerning !== 0) {
						fitAdvances = fitAdvances.slice();
						fitAdvances[fitAdvances.length - 1] = fitAdvances[fitAdvances.length - 1] + followingSpaceKerning;
					}
					if (extraSpacings.length !== 0) {
						fitAdvances = fitAdvances.slice();
						for (let k = 0; k < extraSpacings.length; k++) fitAdvances[k] = fitAdvances[k] + extraSpacings[k] * letterSpacing;
					}
					if (unspaced !== null) {
						fitAdvances = fitAdvances.slice();
						for (let k = 0; k < unspaced.length; k++) fitAdvances[unspaced[k]] = fitAdvances[unspaced[k]] - letterSpacing;
					}
					break;
				}
				case 1:
				case 4:
				case 2:
					width = getTextWidth(text, fontMeasurement, emojiCorrection) + spaceShare;
					spaceShare = 0;
					if (hasLetterSpacing) spacingGraphemeCount = countRenderedSpacingGraphemes(text, kind, engineProfile.graphemeTable);
					break;
				case 5:
					if (engineProfile.letterSpaceTabs) spacingGraphemeCount = 1;
					if (minimumTabAdvance === 0) minimumTabAdvance = getTextWidth(engineProfile.tabMinimumCharacter, fontMeasurement, emojiCorrection) / 2;
					break;
				case 7: {
					width = getTextWidth(text, fontMeasurement, emojiCorrection);
					const nextText = mi + 1 < to ? texts[mi + 1] : "";
					if (hasLetterSpacing && (mi > from && (flags[mi - 1] & 15) === 0 && needsComplexTextPath(texts[mi - 1]) || leadingCombiningMarkRe().test(nextText) && needsComplexTextPath(nextText))) spacingGraphemeCount = 1;
					break;
				}
			}
			if (kind !== 0 && kind !== 1 && kind !== 2) simpleKinds = false;
			if (kind !== 0 && kind !== 3) previousJoinablePiece = null;
			segmentFlags[at] = segment & -129 | (hasLetterSpacing && spacingGraphemeCount > 0 ? 16 : 0);
			widths[at] = addInternalLetterSpacing(width, spacingGraphemeCount, letterSpacing);
			breakableFitAdvances[at] = fitAdvances;
			if (segments !== null) segments[mi - from] = text;
			if (kind !== 0 && text.charCodeAt(0) === 173) {
				discretionaryHyphenContexts ??= zeros(mi - from);
				discretionaryHyphenContexts[mi - from] = returnFitsEachSideAlone ? 0 : getJoinedNarrowing(analysis, mi, to, previousJoinablePiece, previousJoinableMetrics, fontMeasurement, emojiCorrection, engineProfile.lineFitEpsilon);
			} else if (discretionaryHyphenContexts !== null) discretionaryHyphenContexts[mi - from] = 0;
		}
		const discretionaryHyphenWidth = getTextWidth(discretionaryHyphenContexts === null ? "-" : engineProfile.hyphenFromPrimaryFont ? getHyphenText(fontMeasurement) : "‐", fontMeasurement, emojiCorrection) + (letterSpacing === 0 ? 0 : letterSpacing * (engineProfile.letterSpaceDiscretionaryHyphen ? 2 : 1));
		let hanKerning = {
			widthTrims: null,
			lineStartExtras: null,
			lineEndTrims: null,
			overflowLineEndTrims: null
		};
		if (engineProfile.hanKerning && textMayHanKern(own)) {
			hanKerning = getHanKerningTrims(fontMeasurement, analysis, from, to);
			const trims = hanKerning.widthTrims;
			if (trims !== null) for (let i = 0; i < trims.length; i++) widths[base + i] = widths[base + i] - trims[i];
		}
		let lineStartExtras = hanKerning.lineStartExtras;
		if (engineProfile.kernsAcrossCanvasWords && fontMeasurement.measuredKana && fontMeasurement.kanaKerning !== null && kanaPairRe.test(own)) {
			const kanaKerning = getFontKanaKerning(fontMeasurement);
			if (kanaKerning !== null) lineStartExtras = addKanaKerning(lineStartExtras, widths, base, analysis, from, to, fontMeasurement, kanaKerning);
		}
		let lineEndTrims = hanKerning.lineEndTrims;
		if (engineProfile.hangsIdeographicSpace && own.includes("　")) lineEndTrims = addIdeographicSpaceHangs(lineEndTrims, analysis, fontMeasurement, letterSpacing, discretionaryHyphenWidth, from, to);
		const prepared = {
			widths,
			segmentFlags,
			simpleLineWalkFastPath: simpleKinds && !analysis.hasUnbroken,
			simpleLineCountFastPath: simpleKinds,
			breakableFitAdvances,
			letterSpacing,
			discretionaryHyphenWidth,
			discretionaryHyphenContexts,
			breakableLineStartExtras,
			lineStartExtras,
			lineEndTrims,
			overflowLineEndTrims: hanKerning.overflowLineEndTrims,
			tabStopAdvance,
			minimumTabAdvance
		};
		if (segments !== null) prepared.segments = segments;
		return prepared;
	}
	function addKanaKerning(extras, widths, base, analysis, from, to, measurement, kernings) {
		const { normalized, starts, flags } = analysis;
		for (let i = from; i < to; i++) {
			if ((flags[i] & 15) !== 0) continue;
			const start = starts[i];
			const end = i + 1 < flags.length ? starts[i + 1] : normalized.length;
			const at = base + i - from;
			for (let k = i > from ? start : start + 1; k < end; k++) {
				const kerning = getKanaKerning(normalized, start, k, measurement, kernings);
				if (kerning === 0) continue;
				if (k > start) widths[at] = widths[at] + kerning;
				else if (kerning > 0) widths[at - 1] = widths[at - 1] + kerning;
				else {
					widths[at] = widths[at] + kerning;
					extras ??= zeros(to - from);
					extras[i - from] = extras[i - from] - kerning;
				}
			}
		}
		return extras;
	}
	function addIdeographicSpaceHangs(trims, analysis, measurement, letterSpacing, hyphenWidth, from, to) {
		const { normalized, starts, flags } = analysis;
		for (let i = from; i < to; i++) {
			const end = i + 1 < flags.length ? starts[i + 1] : normalized.length;
			if ((flags[i] & 15) !== 0 || normalized.charCodeAt(end - 1) !== 12288) continue;
			if (i + 1 < to) {
				const next = flags[i + 1] & 15;
				if (next !== 8 && next !== 1 && !(next === 0 && (flags[i + 1] & 32) === 0)) continue;
			}
			let start = end - 1;
			while (start > starts[i] && normalized.charCodeAt(start - 1) === 12288) start--;
			const run = normalized.slice(start, end);
			const afterSoftHyphen = i > 0 && start === starts[i] && normalized.charCodeAt(start - 1) === 173;
			const hang = getSegmentMetrics(run, measurement).width + run.length * letterSpacing - (afterSoftHyphen ? hyphenWidth : 0);
			if (hang <= 0) continue;
			trims ??= zeros(to - from);
			trims[i - from] = trims[i - from] + hang;
		}
		return trims;
	}
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/line-break.js
	var BREAK_AFTER_KINDS = 62;
	function breaksAfterKind(kind) {
		return (1 << kind & BREAK_AFTER_KINDS) !== 0;
	}
	function isDiscretionaryLineEnd(segmentFlags, segmentCount, endSegmentIndex, endGraphemeIndex) {
		return endGraphemeIndex === 0 && endSegmentIndex > 0 && endSegmentIndex < segmentCount && (segmentFlags[endSegmentIndex - 1] & 15) === 3;
	}
	function consumesAtLineStart(kind, atChunkStart) {
		return kind === 1 || kind === 3 || kind === 2 && !atChunkStart;
	}
	function getTabAdvance(position, tabStopAdvance, minimumAdvance, appUnits) {
		if (appUnits) {
			const stop = Math.round(tabStopAdvance * 60);
			if (stop <= 0) return 0;
			const x = Math.round(position * 60);
			return (Math.ceil((x + Math.round(minimumAdvance * 120) / 2) / stop) * stop - x) / 60;
		}
		if (tabStopAdvance <= 0) return 0;
		const advance = tabStopAdvance - (position - Math.floor(position / tabStopAdvance) * tabStopAdvance);
		return advance < minimumAdvance ? advance + tabStopAdvance : advance;
	}
	function getItemTabAdvance(prepared, items, index, lineWidth, appUnits) {
		const stopAdvance = items.tabStopAdvances === null ? prepared.tabStopAdvance : items.tabStopAdvances[index];
		const minimumAdvance = items.minimumTabAdvances === null ? prepared.minimumTabAdvance : items.minimumTabAdvances[index];
		return getTabAdvance(lineWidth - (items.insideExtras === null ? 0 : items.insideExtras[index] / 2), stopAdvance, minimumAdvance, appUnits) + prepared.widths[index];
	}
	function getTerminalLetterSpacing(prepared, openingEdges, hangingKinds, startSegmentIndex, startGraphemeIndex, endSegmentIndex, endGraphemeIndex) {
		const { letterSpacing, segmentFlags } = prepared;
		if (letterSpacing === 0) return 0;
		if (endGraphemeIndex > 0) return (segmentFlags[endSegmentIndex] & 16) !== 0 ? letterSpacing : 0;
		const segmentCount = prepared.widths.length;
		if (isDiscretionaryLineEnd(segmentFlags, segmentCount, endSegmentIndex, endGraphemeIndex)) return 0;
		if (endSegmentIndex > startSegmentIndex && endSegmentIndex < segmentCount && (segmentFlags[endSegmentIndex] & 15) !== 8 && (1 << (segmentFlags[endSegmentIndex - 1] & 15) & hangingKinds) !== 0) return 0;
		for (let i = endSegmentIndex - 1; i >= startSegmentIndex; i--) {
			const flags = segmentFlags[i];
			const kind = flags & 15;
			if (kind === 1 || kind !== 7 && kind !== 5 && (flags & 16) === 0 && kind !== 9 && (openingEdges === null || openingEdges[i] === 0)) continue;
			if (i === startSegmentIndex && startGraphemeIndex > 0) return letterSpacing;
			return (flags & 16) !== 0 ? letterSpacing : 0;
		}
		return 0;
	}
	function normalizeMaxWidth(maxWidth) {
		return maxWidth <= Infinity ? maxWidth : Infinity;
	}
	function normalizePreparedLineStart(prepared, cursor) {
		const { segmentFlags } = prepared;
		const segmentCount = prepared.widths.length;
		let segmentIndex = cursor.segmentIndex;
		if (segmentIndex >= segmentCount) return false;
		if (cursor.graphemeIndex > 0) return true;
		let atChunkStart = segmentIndex === 0 || (segmentFlags[segmentIndex - 1] & 15) === 8;
		while (true) {
			const kind = segmentFlags[segmentIndex] & 15;
			if (kind === 8) {
				if (atChunkStart) {
					cursor.segmentIndex = segmentIndex;
					cursor.graphemeIndex = 0;
					return true;
				}
				if (++segmentIndex >= segmentCount) return false;
				cursor.segmentIndex = segmentIndex;
				cursor.graphemeIndex = 0;
				atChunkStart = true;
			} else if (consumesAtLineStart(kind, atChunkStart)) {
				if (++segmentIndex >= segmentCount) return false;
			} else {
				cursor.segmentIndex = segmentIndex;
				cursor.graphemeIndex = 0;
				return true;
			}
		}
	}
	function walkPreparedLinesRaw(prepared, maxWidth, onLine, stats = {
		lineCount: 0,
		maxLineWidth: 0
	}) {
		const cursor = {
			segmentIndex: 0,
			graphemeIndex: 0
		};
		if (!prepared.simpleLineWalkFastPath) {
			if (normalizePreparedLineStart(prepared, cursor)) walkPreparedComplexLines(prepared, cursor, maxWidth, onLine, stats);
			return stats.lineCount;
		}
		const { segmentFlags } = prepared;
		const segmentCount = prepared.widths.length;
		while (true) {
			let startSegmentIndex = cursor.segmentIndex;
			const atTextStart = startSegmentIndex === 0;
			while (startSegmentIndex < segmentCount && consumesAtLineStart(segmentFlags[startSegmentIndex] & 15, atTextStart)) startSegmentIndex++;
			if (startSegmentIndex >= segmentCount) return stats.lineCount;
			const startGraphemeIndex = cursor.graphemeIndex;
			cursor.segmentIndex = startSegmentIndex;
			const width = stepPreparedSimpleLineGeometry(prepared, cursor, maxWidth);
			stats.lineCount++;
			if (width > stats.maxLineWidth) stats.maxLineWidth = width;
			onLine?.(width, startSegmentIndex, startGraphemeIndex, cursor.segmentIndex, cursor.graphemeIndex);
		}
	}
	function staysAfterObject(segmentFlags, segmentCount, start, hangingKinds) {
		let after = start + 1;
		while (after < segmentCount && (1 << (segmentFlags[after] & 15) & hangingKinds) !== 0) after++;
		return after === segmentCount || (segmentFlags[after] & 15) !== 5;
	}
	function returnsFromUnfitHyphen(prepared, lineStartSegmentIndex, breakSegmentIndex, breakWidth, fitLimit, endKeepsJoin) {
		const { discretionaryHyphenContexts, segmentFlags } = prepared;
		const softHyphenIndex = breakSegmentIndex - 1;
		if (softHyphenIndex < lineStartSegmentIndex || (segmentFlags[softHyphenIndex] & 15) !== 3 || breakWidth <= fitLimit) return false;
		const overflow = breakWidth - fitLimit;
		let narrowing = 0;
		const last = endKeepsJoin ? softHyphenIndex : softHyphenIndex - 1;
		if (discretionaryHyphenContexts !== null) for (let i = lineStartSegmentIndex; i <= last; i++) narrowing += discretionaryHyphenContexts[i];
		return narrowing < overflow;
	}
	function walkPreparedComplexLines(prepared, cursor, maxWidth, onLine, stats, singleLine = false) {
		const { widths, segmentFlags, breakableFitAdvances, discretionaryHyphenWidth, letterSpacing, lineStartExtras, lineEndTrims, overflowLineEndTrims, tabStopAdvance, minimumTabAdvance } = prepared;
		const segmentCount = widths.length;
		const items = prepared.items;
		const hyphenWidths = items === void 0 ? null : items.hyphenWidths;
		const hyphenRooms = items === void 0 ? null : items.hyphenRooms;
		const itemEndHalts = items === void 0 ? null : items.itemEndHalts;
		const insideExtras = items === void 0 ? null : items.insideExtras;
		const fillExtras = items === void 0 ? null : items.fillExtras;
		const openingEdges = items === void 0 ? null : items.openingEdges;
		const emptyObjectSpaces = items === void 0 ? null : items.emptyObjectSpaces;
		const emptyObjectReturns = items === void 0 ? null : items.emptyObjectReturns;
		const engineProfile = getEngineProfile();
		const hangingKinds = 16 | (engineProfile.hangTabs ? 32 : 0);
		const hangGoesOnPastEmpty = items !== void 0 && engineProfile.hangsSpacesPerTextFrame;
		const testsHyphenBeforeAtomic = engineProfile.testsHyphenBeforeAtomic;
		const zeroWidthGlueTakesLine = engineProfile.zeroWidthGlueTakesLine;
		const tabsInAppUnits = engineProfile.tabsInAppUnits;
		const paddedOpeningFit = engineProfile.paddedOpeningFit;
		const hardBreakItemRetreat = engineProfile.hardBreakItemRetreat;
		const availableWidth = Math.max(0, maxWidth);
		const fitLimit = availableWidth + engineProfile.lineFitEpsilon;
		const retreatsFromUnfitHyphen = prepared.discretionaryHyphenContexts !== null;
		const reservesHyphenWidth = engineProfile.unfitHyphenRetreat === "reduced-width";
		const reservedHyphenWidth = reservesHyphenWidth ? discretionaryHyphenWidth : 0;
		const keepsFirstBreak = retreatsFromUnfitHyphen && engineProfile.unfitHyphenRetreat === "full-width-or-first";
		const hyphenEndKeepsJoin = engineProfile.unfitHyphenRetreat === "full-width";
		let lastLineWidth = null;
		while (true) {
			const lineStartSegmentIndex = cursor.segmentIndex;
			const lineStartGraphemeIndex = cursor.graphemeIndex;
			let lineW = 0;
			let hasContent = false;
			let lineEndSegmentIndex = lineStartSegmentIndex;
			let lineEndGraphemeIndex = lineStartGraphemeIndex;
			let pendingBreakSegmentIndex = -1;
			let pendingBreakWidth = 0;
			let fitBreakSegmentIndex = -1;
			let fitBreakPaintWidth = 0;
			let hangEndSegmentIndex = -1;
			let hangStartWidth = 0;
			let hangStays = false;
			let hangEdgesWidth = 0;
			let lineEndTrimmed = 0;
			let zeroWidthPrefix = true;
			let afterUnspacedControl = false;
			let endSegmentIndex = -1;
			let endGraphemeIndex = 0;
			let endWidth = 0;
			let returnsFromHyphen = false;
			let lineWidth = null;
			if ((segmentFlags[lineStartSegmentIndex] & 15) === 8) {
				cursor.segmentIndex = lineStartSegmentIndex + 1;
				cursor.graphemeIndex = 0;
				lineWidth = lineStartExtras === null ? 0 : lineStartExtras[lineStartSegmentIndex];
			} else {
				decided: {
					let consumedEndSegmentIndex;
					for (let i = lineStartSegmentIndex;; i++) {
						if (i >= segmentCount) {
							consumedEndSegmentIndex = segmentCount;
							break;
						}
						let fillStart;
						let fillSpacing = 0;
						const flags = segmentFlags[i];
						const kind = flags & 15;
						if (kind === 8) {
							consumedEndSegmentIndex = i + 1;
							break;
						}
						const spaced = (flags & 16) !== 0;
						const breakAfter = (1 << kind & BREAK_AFTER_KINDS) !== 0;
						const startGraphemeIndex = i === lineStartSegmentIndex ? lineStartGraphemeIndex : 0;
						const gap = letterSpacing !== 0 && hasContent && !zeroWidthPrefix && !afterUnspacedControl ? letterSpacing : 0;
						let leadingSpacing = 0;
						if (letterSpacing !== 0 && (spaced || kind === 7 || kind === 5 || kind === 9 || openingEdges !== null && openingEdges[i] !== 0)) {
							leadingSpacing = gap;
							afterUnspacedControl = !spaced;
						}
						if (kind !== 2 && kind !== 6) zeroWidthPrefix = false;
						const w = kind !== 5 ? widths[i] : items === void 0 ? getTabAdvance(lineW + leadingSpacing, tabStopAdvance, minimumTabAdvance, tabsInAppUnits) : getItemTabAdvance(prepared, items, i, hasContent ? lineW + leadingSpacing : lineStartExtras === null ? 0 : lineStartExtras[i], tabsInAppUnits);
						const advance = leadingSpacing + w;
						const endTrim = lineEndTrims === null ? 0 : lineEndTrims[i];
						if (kind === 3 && startGraphemeIndex === 0) {
							if (hasContent) {
								let hyphenWidth = discretionaryHyphenWidth;
								let fitsHyphen = true;
								if (items !== void 0) {
									if (retreatsFromUnfitHyphen && i > lineStartSegmentIndex && (segmentFlags[i - 1] & 15) === 9) {
										fitBreakSegmentIndex = i;
										fitBreakPaintWidth = lineW;
									}
									if (hangGoesOnPastEmpty && hangEndSegmentIndex === i) {
										hangEndSegmentIndex = i + 1;
										hangStartWidth = Math.max(hangStartWidth, Math.min(lineW, availableWidth));
									}
									if (hyphenWidths !== null) hyphenWidth = hyphenWidths[i];
									fitsHyphen = testsHyphenBeforeAtomic || i + 1 === segmentCount || (segmentFlags[i + 1] & 15) !== 9 || openingEdges !== null && openingEdges[i + 1] !== 0;
								}
								lineEndSegmentIndex = i + 1;
								lineEndGraphemeIndex = 0;
								if (i + 1 < segmentCount && (segmentFlags[i + 1] & 15) !== 8) {
									pendingBreakSegmentIndex = i + 1;
									pendingBreakWidth = lineW + hyphenWidth;
									if (retreatsFromUnfitHyphen && ((fitsHyphen ? pendingBreakWidth : lineW) <= fitLimit || keepsFirstBreak && fitBreakSegmentIndex < 0)) {
										fitBreakSegmentIndex = pendingBreakSegmentIndex;
										fitBreakPaintWidth = pendingBreakWidth;
									}
								}
							}
							continue;
						}
						let fitAdvance = 0;
						if (letterSpacing !== 0 && !spaced && !breakAfter && kind !== 7) fitAdvance = gap + w;
						else if (breakAfter ? kind === 5 : w !== 0 || kind === 7) {
							const contribution = w + (spaced ? letterSpacing : 0);
							if (contribution !== 0) fitAdvance = leadingSpacing + contribution;
						}
						let hangs = (1 << kind & hangingKinds) !== 0;
						if (hangGoesOnPastEmpty && kind === 2 && hangEndSegmentIndex === i) hangs = true;
						if (hangs) {
							if (hangEndSegmentIndex !== i) {
								hangStartWidth = lineW - lineEndTrimmed + leadingSpacing;
								hangStays = false;
								if (items !== void 0 && i > lineStartSegmentIndex && (segmentFlags[i - 1] & 15) === 9) {
									hangStays = staysAfterObject(segmentFlags, segmentCount, i, hangingKinds);
									if (!hangStays) {
										pendingBreakSegmentIndex = i;
										pendingBreakWidth = lineW - lineEndTrimmed;
									}
								}
								hangEdgesWidth = 0;
							}
							hangEndSegmentIndex = i + 1;
							if (openingEdges !== null) {
								hangStartWidth += openingEdges[i];
								hangEdgesWidth += openingEdges[i];
							}
						}
						if (!hasContent && kind === 6 && !zeroWidthGlueTakesLine) {
							lineEndSegmentIndex = i + 1;
							lineEndGraphemeIndex = 0;
							continue;
						}
						if (!hasContent) {
							if (startGraphemeIndex > 0) fillStart = startGraphemeIndex;
							else {
								const startExtra = lineStartExtras === null ? 0 : lineStartExtras[i];
								const startTrim = overflowLineEndTrims !== null && fitAdvance + startExtra - overflowLineEndTrims[i] <= fitLimit ? overflowLineEndTrims[i] : endTrim;
								if (fitAdvance + startExtra - startTrim > fitLimit && breakableFitAdvances[i] !== null && !hangs) fillStart = 0;
								else {
									hasContent = true;
									lineEndSegmentIndex = i + 1;
									lineEndGraphemeIndex = 0;
									lineW = w + startExtra;
									if (hangs) hangStartWidth += startExtra;
									lineEndTrimmed = fitAdvance + startExtra > fitLimit && kind !== 9 ? startTrim : 0;
									if (itemEndHalts !== null && lineEndTrimmed !== 0 && itemEndHalts[i] !== 0) {
										lineW -= lineEndTrimmed;
										lineEndTrimmed = 0;
									}
									if (breakAfter && (i + 1 === segmentCount || (segmentFlags[i + 1] & 32) === 0)) {
										pendingBreakSegmentIndex = i + 1;
										pendingBreakWidth = hangs ? hangStartWidth : kind === 5 ? lineW : lineW - advance;
									}
									if (retreatsFromUnfitHyphen && breakAfter && pendingBreakWidth + (hyphenRooms === null || pendingBreakSegmentIndex < 0 ? reservedHyphenWidth : hyphenRooms[pendingBreakSegmentIndex]) <= fitLimit) {
										fitBreakSegmentIndex = pendingBreakSegmentIndex;
										fitBreakPaintWidth = pendingBreakWidth;
									}
									continue;
								}
							}
						} else {
							const newFitW = hangs ? hangStartWidth - hangEdgesWidth : lineW + fitAdvance;
							let overflows = newFitW - endTrim > fitLimit;
							if (items !== void 0) {
								let placesEmptyObject = false;
								if (emptyObjectSpaces !== null && kind === 9 && w === 0 && newFitW > fitLimit) {
									const contentW = hangEndSegmentIndex === i ? hangStartWidth : lineW;
									const space = emptyObjectSpaces[i];
									placesEmptyObject = contentW <= fitLimit || !(space >= 0 && contentW - space > fitLimit || emptyObjectReturns[i] === 1);
								}
								const narrowsOverflow = fitAdvance < 0 && lineW - lineEndTrimmed > fitLimit;
								overflows = (overflows || narrowsOverflow) && !(hangs && hangStays) && !placesEmptyObject;
								if (hangGoesOnPastEmpty && !overflows && hangEndSegmentIndex === i && kind === 9 && w === 0) {
									hangEndSegmentIndex = i + 1;
									hangStartWidth = Math.max(hangStartWidth, Math.min(lineW + advance, availableWidth));
								}
							}
							if (overflows) {
								const contentW = lineW - lineEndTrimmed;
								if (breakAfter && (hangs || kind !== 5) && (contentW <= fitLimit || pendingBreakSegmentIndex < 0 && (kind === 1 || kind === 2) || kind === 2 && (segmentFlags[i - 1] & 15) === 9)) {
									endWidth = hangs ? hangStartWidth : contentW;
									lineW += advance;
									endSegmentIndex = i + 1;
									endGraphemeIndex = 0;
									break decided;
								}
								if (kind === 5 && !hangs && pendingBreakSegmentIndex < 0) {
									endSegmentIndex = i;
									endGraphemeIndex = 0;
									endWidth = hangEndSegmentIndex === i && i > lineStartSegmentIndex ? hangStartWidth : contentW;
									break decided;
								}
								const unbroken = (flags & 32) !== 0;
								if (kind === 9 && unbroken && hangEndSegmentIndex === i && (paddedOpeningFit === "start" ? hangStartWidth - hangEdgesWidth / 2 <= fitLimit && lineW - hangEdgesWidth / 2 > fitLimit : paddedOpeningFit === "placed" && hangStartWidth - hangEdgesWidth + w - endTrim <= fitLimit)) {
									hangEndSegmentIndex = i + 1;
									hangStartWidth += w;
									hangEdgesWidth += w;
									lineW += advance;
									lineEndSegmentIndex = i + 1;
									lineEndGraphemeIndex = 0;
									continue;
								}
								if (unbroken && pendingBreakSegmentIndex >= 0) {
									lineEndSegmentIndex = pendingBreakSegmentIndex;
									lineEndGraphemeIndex = 0;
								}
								if (!unbroken || pendingBreakSegmentIndex >= 0) {
									returnsFromHyphen = true;
									break decided;
								}
								if (overflowLineEndTrims !== null && newFitW - overflowLineEndTrims[i] <= fitLimit) {
									lineW += advance;
									lineEndSegmentIndex = i + 1;
									lineEndGraphemeIndex = 0;
									lineEndTrimmed = overflowLineEndTrims[i];
									if (itemEndHalts !== null && itemEndHalts[i] !== 0) {
										lineW -= lineEndTrimmed;
										lineEndTrimmed = 0;
									}
									continue;
								}
								if (kind === 9 && hardBreakItemRetreat !== "item" && i + 1 < segmentCount && (segmentFlags[i + 1] & 15) === 8) {
									const beforeFlags = segmentFlags[i - 1];
									const beforeKind = beforeFlags & 15;
									const spaceAdvances = beforeKind === 4 ? breakableFitAdvances[i - 1] : null;
									if (spaceAdvances !== null) {
										const count = spaceAdvances.length;
										const spaceAdvance = spaceAdvances[0];
										const moved = hardBreakItemRetreat !== "fit" || lineW <= fitLimit ? 1 : spaceAdvance > 0 ? Math.min(count, Math.ceil((lineW - fitLimit) / spaceAdvance)) : count;
										const contentStart = openingEdges !== null && openingEdges[lineStartSegmentIndex] !== 0 ? lineStartSegmentIndex + 1 : lineStartSegmentIndex;
										if (i - 1 > contentStart || count - moved > lineStartGraphemeIndex) {
											endSegmentIndex = i - 1;
											endGraphemeIndex = count - moved;
											endWidth = hangStartWidth;
											break decided;
										}
									}
									const beforeAdvances = beforeKind === 0 || beforeKind === 7 ? breakableFitAdvances[i - 1] : null;
									const spacing = (beforeFlags & 16) !== 0 ? letterSpacing : 0;
									if (beforeAdvances !== null && (i - 1 > lineStartSegmentIndex || beforeAdvances.length - 1 > lineStartGraphemeIndex)) {
										endSegmentIndex = i - 1;
										endGraphemeIndex = beforeAdvances.length - 1;
										endWidth = lineW - beforeAdvances[endGraphemeIndex] - spacing;
										break decided;
									}
									if (beforeAdvances === null && (beforeKind === 0 || beforeKind === 7) && i - 1 > lineStartSegmentIndex) {
										endSegmentIndex = i - 1;
										endGraphemeIndex = 0;
										endWidth = lineW - widths[i - 1] - spacing;
										break decided;
									}
									if (spaceAdvances !== null || beforeKind !== 4 && beforeKind !== 5) {
										lineW += advance;
										lineEndSegmentIndex = i + 1;
										lineEndGraphemeIndex = 0;
										lineEndTrimmed = 0;
										continue;
									}
								}
								if (breakableFitAdvances[i] === null) {
									returnsFromHyphen = true;
									break decided;
								}
								fillStart = 0;
								fillSpacing = leadingSpacing;
							} else {
								if ((flags & 64) !== 0 && !breakAfter && pendingBreakSegmentIndex !== i) {
									pendingBreakSegmentIndex = i;
									pendingBreakWidth = lineW;
								}
								if (retreatsFromUnfitHyphen && !breakAfter && (flags & 32) === 0 && i > lineStartSegmentIndex && !breaksAfterKind(segmentFlags[i - 1] & 15) && (!reservesHyphenWidth || lineW + (hyphenRooms === null ? discretionaryHyphenWidth : hyphenRooms[i]) <= fitLimit)) {
									fitBreakSegmentIndex = i;
									fitBreakPaintWidth = lineW;
								}
								lineEndSegmentIndex = i + 1;
								lineEndGraphemeIndex = 0;
								if (itemEndHalts !== null && newFitW > fitLimit && itemEndHalts[i] !== 0) {
									lineW += advance - endTrim;
									lineEndTrimmed = 0;
								} else {
									lineW += advance;
									if (fitAdvance !== 0 && !hangs) lineEndTrimmed = newFitW > fitLimit && kind !== 9 ? endTrim : 0;
								}
								if (breakAfter && (i + 1 === segmentCount || (segmentFlags[i + 1] & 32) === 0)) {
									pendingBreakSegmentIndex = i + 1;
									pendingBreakWidth = hangs ? hangStartWidth : kind === 5 ? lineW : lineW - advance - lineEndTrimmed;
								}
								if (retreatsFromUnfitHyphen && breakAfter && pendingBreakWidth + (hyphenRooms === null || pendingBreakSegmentIndex < 0 ? reservedHyphenWidth : hyphenRooms[pendingBreakSegmentIndex]) <= fitLimit) {
									fitBreakSegmentIndex = pendingBreakSegmentIndex;
									fitBreakPaintWidth = pendingBreakWidth;
								}
								continue;
							}
						}
						const fitAdvances = breakableFitAdvances[i];
						const fitCount = fitAdvances.length;
						for (let g = fillStart; g < fitCount; g++) {
							const baseGw = fitAdvances[g];
							if (!hasContent) {
								hasContent = true;
								lineEndSegmentIndex = i;
								lineEndGraphemeIndex = g + 1;
								const startExtras = prepared.breakableLineStartExtras?.[i] ?? null;
								lineW = startExtras === null ? baseGw : baseGw + startExtras[g];
								if (g > 0 ? insideExtras !== null : fillExtras !== null) lineW += g > 0 ? insideExtras[i] : fillExtras[i];
							} else {
								const candidatePaintWidth = lineW + (baseGw + (g > fillStart ? letterSpacing : fillSpacing));
								if (candidatePaintWidth + letterSpacing > fitLimit) break decided;
								lineW = candidatePaintWidth;
								lineEndSegmentIndex = i;
								lineEndGraphemeIndex = g + 1;
							}
						}
						if (hasContent && lineEndSegmentIndex === i && lineEndGraphemeIndex === fitCount) {
							lineEndSegmentIndex = i + 1;
							lineEndGraphemeIndex = 0;
						}
					}
					endSegmentIndex = consumedEndSegmentIndex;
					endGraphemeIndex = 0;
					if (pendingBreakSegmentIndex === consumedEndSegmentIndex && lineEndGraphemeIndex === 0) {
						endWidth = pendingBreakWidth;
						returnsFromHyphen = true;
					} else endWidth = lineW - lineEndTrimmed;
				}
				if (hasContent) {
					if (returnsFromHyphen && fitBreakSegmentIndex >= 0 && pendingBreakSegmentIndex === lineEndSegmentIndex && lineEndGraphemeIndex === 0 && returnsFromUnfitHyphen(prepared, lineStartSegmentIndex, lineEndSegmentIndex, pendingBreakWidth, fitLimit, hyphenEndKeepsJoin)) {
						endSegmentIndex = fitBreakSegmentIndex;
						endGraphemeIndex = 0;
						endWidth = fitBreakPaintWidth;
					} else if (endSegmentIndex < 0) {
						endSegmentIndex = lineEndSegmentIndex;
						endGraphemeIndex = lineEndGraphemeIndex;
						endWidth = pendingBreakSegmentIndex === lineEndSegmentIndex && lineEndGraphemeIndex === 0 ? pendingBreakWidth : items !== void 0 && hangEndSegmentIndex === lineEndSegmentIndex && lineEndGraphemeIndex === 0 ? hangStartWidth : lineW - lineEndTrimmed;
					}
					cursor.segmentIndex = endSegmentIndex;
					cursor.graphemeIndex = endGraphemeIndex;
					const hangsWhereUnfit = endGraphemeIndex === 0 && hangEndSegmentIndex >= 0 && (endSegmentIndex === hangEndSegmentIndex || endSegmentIndex === hangEndSegmentIndex + 1) && (hangEndSegmentIndex === segmentCount || (segmentFlags[hangEndSegmentIndex] & 15) === 8);
					const paintWidth = (hangsWhereUnfit ? lineW - lineEndTrimmed : endWidth) + getTerminalLetterSpacing(prepared, openingEdges, hangingKinds, lineStartSegmentIndex, lineStartGraphemeIndex, endSegmentIndex, endGraphemeIndex);
					lineWidth = hangsWhereUnfit ? Math.max(hangStartWidth, Math.min(paintWidth, availableWidth)) : paintWidth;
				}
			}
			if (lineWidth === null) break;
			lastLineWidth = lineWidth;
			if (stats !== null) {
				stats.lineCount++;
				if (lineWidth > stats.maxLineWidth) stats.maxLineWidth = lineWidth;
			}
			onLine?.(lineWidth, lineStartSegmentIndex, lineStartGraphemeIndex, cursor.segmentIndex, cursor.graphemeIndex);
			if (singleLine || !normalizePreparedLineStart(prepared, cursor)) break;
		}
		return lastLineWidth;
	}
	function stepPreparedSimpleLineGeometry(prepared, cursor, maxWidth) {
		const { widths, segmentFlags, breakableFitAdvances, lineStartExtras, lineEndTrims, overflowLineEndTrims } = prepared;
		const fitLimit = Math.max(0, maxWidth) + getEngineProfile().lineFitEpsilon;
		const start = cursor.segmentIndex;
		const startAdvances = breakableFitAdvances[start];
		const startW = lineStartExtras === null ? widths[start] : widths[start] + lineStartExtras[start];
		const startEndTrim = lineEndTrims === null ? 0 : lineEndTrims[start];
		const startTrim = overflowLineEndTrims !== null && startW - overflowLineEndTrims[start] <= fitLimit ? overflowLineEndTrims[start] : startEndTrim;
		let lineW;
		let endTrimmed = 0;
		if (cursor.graphemeIndex > 0 || startW - startTrim > fitLimit && startAdvances !== null) {
			const fitAdvances = startAdvances;
			const startExtras = prepared.breakableLineStartExtras?.[start] ?? null;
			let g = cursor.graphemeIndex + 1;
			lineW = startExtras === null ? fitAdvances[g - 1] : fitAdvances[g - 1] + startExtras[g - 1];
			const items = prepared.items;
			if (items !== void 0 && (g > 1 ? items.insideExtras !== null : items.fillExtras !== null)) lineW += g > 1 ? items.insideExtras[start] : items.fillExtras[start];
			for (; g < fitAdvances.length; g++) {
				if (lineW + fitAdvances[g] > fitLimit) {
					cursor.graphemeIndex = g;
					return lineW;
				}
				lineW += fitAdvances[g];
			}
		} else {
			lineW = startW;
			if (startW > fitLimit) endTrimmed = startTrim;
		}
		for (let i = start + 1; i < widths.length; i++) {
			const w = widths[i];
			const endTrim = lineEndTrims === null ? 0 : lineEndTrims[i];
			if (lineW + w - endTrim > fitLimit) {
				const hangs = breaksAfterKind(segmentFlags[i] & 15);
				cursor.segmentIndex = hangs ? i + 1 : i;
				cursor.graphemeIndex = 0;
				return !hangs && breaksAfterKind(segmentFlags[i - 1] & 15) ? lineW - widths[i - 1] : lineW - endTrimmed;
			}
			lineW += w;
			endTrimmed = lineW > fitLimit ? endTrim : 0;
		}
		cursor.segmentIndex = widths.length;
		cursor.graphemeIndex = 0;
		return lineW - endTrimmed;
	}
	// ../../node_modules/.pnpm/@chenglou+pretext@1.0.0/node_modules/@chenglou/pretext/dist/layout.js
	function prepareInternal(text, font, includeSegments, options) {
		const wordBreak = options?.wordBreak ?? "normal";
		const engineProfile = getEngineProfile();
		const letterSpacing = readLetterSpacing(options?.letterSpacing, engineProfile);
		const language = getPreparationLanguage(engineProfile);
		const analysis = analyzeText(text, engineProfile, options?.whiteSpace, wordBreak, language);
		return measureAnalysis(analysis, 0, analysis.flags.length, font, includeSegments, letterSpacing, engineProfile, language, true, null);
	}
	function prepareWithSegments(text, font, options) {
		const prepared = prepareInternal(text, font, true, options);
		const kinds = [];
		for (let i = 0; i < prepared.segmentFlags.length; i++) kinds.push(SEGMENT_KINDS[prepared.segmentFlags[i] & 15]);
		prepared.kinds = kinds;
		return prepared;
	}
	function getInternalPrepared(prepared) {
		return prepared;
	}
	function measureLineStats(prepared, maxWidth) {
		const stats = {
			lineCount: 0,
			maxLineWidth: 0
		};
		walkPreparedLinesRaw(getInternalPrepared(prepared), normalizeMaxWidth(maxWidth), void 0, stats);
		return stats;
	}
	function measureNaturalWidth(prepared) {
		return measureLineStats(prepared, Number.POSITIVE_INFINITY).maxLineWidth;
	}
	typeof Intl !== "undefined" && "Segmenter" in Intl;
	/** Natural (unwrapped) width of `text` in `font`, px. */
	function textWidth(text, font) {
		return measureNaturalWidth(prepareWithSegments(text, font));
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
	function fitParts(parts, budget, measure = textWidth) {
		const shown = {};
		for (const p of parts) shown[p.key] = false;
		const present = parts.filter((p) => p.size !== void 0 || !!p.text);
		const anchors = present.filter((p) => (p.priority ?? 1) === 0);
		for (const p of anchors) shown[p.key] = true;
		if (!(budget > 0)) return shown;
		const cost = (p) => (p.size ?? measure(p.text, p.font ?? "")) + (p.extra ?? 0);
		let used = 0;
		for (const p of anchors) used += cost(p);
		const optional = present.filter((p) => (p.priority ?? 1) !== 0).sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1));
		for (const p of optional) {
			const c = cost(p);
			if (used + c > budget) break;
			used += c;
			shown[p.key] = true;
		}
		return shown;
	}
	/** The element's computed font as a canvas font string. */
	function fontOf(el) {
		const s = getComputedStyle(el);
		return `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
	}
	// src/lib/views/shared/format.ts
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
	/** A day in full, in the locale's own order: "Monday, October 19" (en-US),
	*  "poniedziałek, 19 października" (pl-PL). For screen-reader names. */
	function dateLong(ms, locale) {
		return new Date(ms).toLocaleDateString(locale ?? getDefaultLocale(), {
			weekday: "long",
			month: "long",
			day: "numeric"
		});
	}
	// src/lib/views/shared/opening-top.ts
	/**
	* Where a time grid opens: the y (grid px, 0 = first visible hour) to put at
	* the top of the scroller so no event is sliced there.
	*
	* Starts at the hour line `line`, moves up an hour at a time while an event
	* crosses it (looking back at most 2 h), then leaves `room` above for the
	* hour label. If an event still crosses the top, the top goes to that event's
	* start while `anchor` (the now line) stays on screen, else to the first hour
	* after it ends, else the room is dropped; only a block too long for all of
	* those is cut.
	*/
	function openingTop(blocks, line, hourH, room, anchor, viewH) {
		const cuts = (y) => blocks.filter((b) => b.top < y && b.top + b.height > y);
		const floor = line - 2 * hourH;
		for (let c = cuts(line).filter((b) => b.top >= floor); c.length; c = cuts(line).filter((b) => b.top >= floor)) line = Math.floor(Math.min(...c.map((b) => b.top)) / hourH) * hourH;
		const fits = (y) => anchor >= y && anchor <= y + viewH - hourH / 2;
		let y = line;
		for (let guard = 0; guard < 8; guard++) {
			const above = cuts(y - room);
			if (!above.length) return Math.max(0, y - room);
			const start = Math.min(...above.map((b) => b.top));
			if (start < y && fits(start)) {
				y = start;
				continue;
			}
			const across = cuts(y);
			if (!across.length) return Math.max(0, y);
			const after = Math.ceil(Math.max(...across.map((b) => b.top + b.height)) / hourH) * hourH;
			if (after > y && fits(after)) {
				y = after;
				continue;
			}
			break;
		}
		return Math.max(0, y);
	}
	// src/lib/views/planner/PlannerWeek.svelte
	var root_1$7 = /* @__PURE__ */ from_html(`<span class="tw-ad-cont svelte-j4rvbp" aria-hidden="true"><svg viewBox="0 0 8 8" width="8" height="8" class="svelte-j4rvbp"><path d="M5.5 1.5 2.5 4l3 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="svelte-j4rvbp"></path></svg></span>`);
	var root_2$7 = /* @__PURE__ */ from_html(`<span class="tw-ad-span svelte-j4rvbp" aria-hidden="true"> </span>`);
	var root_3$7 = /* @__PURE__ */ from_html(`<span class="tw-ad-arrow svelte-j4rvbp" aria-hidden="true"><svg viewBox="0 0 8 8" width="8" height="8" class="svelte-j4rvbp"><path d="M2.5 1.5 5.5 4l-3 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="svelte-j4rvbp"></path></svg></span>`);
	var root_4$7 = /* @__PURE__ */ from_html(`<button type="button"><!> <span class="tw-ad-title svelte-j4rvbp"> </span> <!> <!></button>`);
	var root_5$7 = /* @__PURE__ */ from_html(`<span> </span>`);
	var root_6$7 = /* @__PURE__ */ from_html(`<div class="tw-hd-custom svelte-j4rvbp"><!></div>`);
	var root_7$7 = /* @__PURE__ */ from_html(`<div><span class="tw-hd-wd svelte-j4rvbp"> </span> <!> <!></div>`);
	var root_8$6 = /* @__PURE__ */ from_html(`<div class="tw-head svelte-j4rvbp"><div class="tw-corner svelte-j4rvbp" aria-hidden="true"></div> <!></div>`);
	var root_9$5 = /* @__PURE__ */ from_html(`<button type="button" class="tw-ad-more svelte-j4rvbp"> </button>`);
	var root_10$5 = /* @__PURE__ */ from_html(`<div><!> <!></div>`);
	var root_11$4 = /* @__PURE__ */ from_html(`<div class="tw-allday svelte-j4rvbp"><div class="tw-ad-gutter svelte-j4rvbp"><span class="tw-ad-gutter-lb svelte-j4rvbp"> </span></div> <!></div>`);
	var root_12$4 = /* @__PURE__ */ from_html(`<div class="tw-top svelte-j4rvbp"><!> <!></div>`);
	var root_13$4 = /* @__PURE__ */ from_html(`<span> <small class="svelte-j4rvbp"> </small></span>`);
	var root_14$4 = /* @__PURE__ */ from_html(`<span class="tw-gutter-drag svelte-j4rvbp"> </span> <span class="tw-gutter-drag svelte-j4rvbp"> </span>`, 1);
	var root_15$4 = /* @__PURE__ */ from_html(`<span class="tw-gutter-now svelte-j4rvbp"> </span>`);
	var root_16$4 = /* @__PURE__ */ from_html(`<div class="tw-line svelte-j4rvbp"></div> <div class="tw-line tw-line--half svelte-j4rvbp"></div>`, 1);
	var root_17$4 = /* @__PURE__ */ from_html(`<div class="tw-now-week svelte-j4rvbp"></div>`);
	var root_18$4 = /* @__PURE__ */ from_html(`<span class="tw-blocked-lb svelte-j4rvbp"> </span>`);
	var root_19$4 = /* @__PURE__ */ from_html(`<div class="tw-blocked svelte-j4rvbp"><!></div>`);
	var root_20$4 = /* @__PURE__ */ from_html(`<span class="tw-ev-loc svelte-j4rvbp"> </span>`);
	var root_21$4 = /* @__PURE__ */ from_html(`<span class="tw-ev-time svelte-j4rvbp"> <span class="tw-ev-end svelte-j4rvbp"> </span></span> <span class="tw-ev-title svelte-j4rvbp"> </span> <!>`, 1);
	var root_22$4 = /* @__PURE__ */ from_html(`<span class="tw-ev-live svelte-j4rvbp" aria-hidden="true"></span>`);
	var root_23$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-handle tw-ev-handle--start svelte-j4rvbp" aria-hidden="true"></span>`);
	var root_24$2 = /* @__PURE__ */ from_html(`<span class="tw-ev-handle tw-ev-handle--end svelte-j4rvbp" aria-hidden="true"></span>`);
	var root_25$2 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_26$2 = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><div class="tw-ev-stripe svelte-j4rvbp" aria-hidden="true"></div> <div class="tw-ev-body svelte-j4rvbp"><!></div> <!> <!></div>`);
	var root_27$2 = /* @__PURE__ */ from_html(`<span class="tw-ghost-title svelte-j4rvbp"> </span>`);
	var root_28$2 = /* @__PURE__ */ from_html(`<span class="tw-ghost-time svelte-j4rvbp"> </span> <!>`, 1);
	var root_29$2 = /* @__PURE__ */ from_html(`<div aria-hidden="true"><!></div>`);
	var root_30$1 = /* @__PURE__ */ from_html(`<div class="tw-now svelte-j4rvbp"></div> <span class="tw-now-dot svelte-j4rvbp" aria-hidden="true"></span>`, 1);
	var root_31$1 = /* @__PURE__ */ from_html(`<div><!> <!> <!> <!></div>`);
	var root_32$1 = /* @__PURE__ */ from_html(`<div class="tw-empty svelte-j4rvbp"><!></div>`);
	var root_33$1 = /* @__PURE__ */ from_html(`<div role="region"><div class="tw-scroll svelte-j4rvbp"><div class="tw-inner svelte-j4rvbp"><!> <div><div class="tw-gutter svelte-j4rvbp" aria-hidden="true"><!> <!> <!></div>  <div class="tw-cols svelte-j4rvbp" role="presentation"><div class="tw-lines svelte-j4rvbp" aria-hidden="true"><!> <!></div> <!></div></div></div></div> <!></div>`);
	function PlannerWeek($$anchor, $$props) {
		push($$props, true);
		const allDayChip = ($$anchor, seg = noop) => {
			var button = root_4$7();
			let classes;
			let styles;
			var node = child(button);
			var consequent = ($$anchor) => {
				append($$anchor, root_1$7());
			};
			if_block(node, ($$render) => {
				if (!seg().isStart) $$render(consequent);
			});
			var span_1 = sibling(node, 2);
			var text = only_child(span_1, true);
			var node_1 = sibling(span_1, 2);
			var consequent_1 = ($$anchor) => {
				var span_2 = root_2$7();
				var text_1 = only_child(span_2);
				template_effect(() => set_text(text_1, `${seg().dayIndex ?? ""}/${seg().totalDays ?? ""}`));
				append($$anchor, span_2);
			};
			if_block(node_1, ($$render) => {
				if (seg().totalDays > 1) $$render(consequent_1);
			});
			var node_2 = sibling(node_1, 2);
			var consequent_2 = ($$anchor) => {
				append($$anchor, root_3$7());
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
		function atHour(dayMs, hour) {
			return new Date(dayMs).setHours(0, 0, 0, Math.round(hour * HOUR_MS));
		}
		/** Epoch ms → fractional wall-clock hour counted from the day at `dayMs`
		*  (24 = the next midnight; calendar days, not 24 h steps). */
		function hourOf(ms, dayMs) {
			const d = new Date(ms);
			return diffDays(ms, dayMs) * 24 + d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600 + d.getMilliseconds() / HOUR_MS;
		}
		/** Snap a fractional hour to the snap interval, in wall-clock minutes of
		*  the local day (not UTC multiples — those are off in +05:30 zones). */
		function snapHour(hour, how) {
			const step = Math.max(1, ctx.snapInterval);
			const units = hour * 60 / step;
			return (how === "floor" ? Math.floor(units + 1e-9) : Math.round(units)) * step / 60;
		}
		/** Snap an instant, relative to its own local day. */
		function snapMs(ms, how) {
			const day = sod(ms);
			return atHour(day, snapHour(hourOf(ms, day), how));
		}
		/** Timed events at least a (wall-clock) day long, and all-day ones, sit in
		*  the all-day strip; a shorter overnight event is drawn as a clamped
		*  segment on each day it touches. */
		function inAllDayStrip(ev) {
			return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
		}
		const HOUR_H = 64;
		/** Half a gutter label plus a gap: what a scroll needs above an hour line */
		const LABEL_ROOM = 18;
		const GUTTER_W = 60;
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
		/** Today, drawn as today: off in a dateless weekly template (showDates=false) */
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
					markToday: get(showDates) && ms === get(todayMs),
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
			const rangeStart = new Date(addDaysMs(get(weekStartMs), -7));
			const rangeEnd = new Date(addDaysMs(get(weekEndMs), 7));
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
					if (!inAllDayStrip(ev)) continue;
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
		/** This day holds the event's start / end (an overnight event is two
		*  segments; each resize grip lives only on the segment it moves). */
		/** Lane extent — a zero-length event claims its minimum block height. */
		/** The clamped end the block is drawn to. */
		const layoutByDay = /* @__PURE__ */ user_derived(() => {
			const rsP = get(drag)?.active && (get(drag).mode === "resize-start" || get(drag).mode === "resize-end") ? get(drag).payload : null;
			const map = /* @__PURE__ */ new Map();
			for (const day of get(dayCols)) {
				const dayEnd = addDaysMs(day.ms, 1);
				const bandStart = atHour(day.ms, get(startHour));
				const bandEnd = atHour(day.ms, get(endHour));
				const infos = [];
				for (const ev of events()) {
					if (inAllDayStrip(ev)) continue;
					const isResizing = rsP?.eventId === ev.id;
					const s0 = isResizing ? rsP.start.getTime() : ev.start.getTime();
					const e0 = isResizing ? rsP.end.getTime() : ev.end.getTime();
					if (e0 < s0) continue;
					const hasStart = s0 >= day.ms && s0 < dayEnd;
					const hasEnd = e0 > day.ms && e0 <= dayEnd;
					if (e0 === s0) {
						if (!hasStart || s0 < bandStart || s0 >= bandEnd) continue;
						const laneEnd = Math.min(bandEnd, s0 + HOUR_MS / 2);
						infos.push({
							ev,
							startMs: s0,
							endMs: laneEnd,
							drawEndMs: s0,
							hasStart,
							hasEnd: true,
							isResizing,
							isMoving: ev.id === get(movingId),
							col: 0,
							totalCols: 1
						});
						continue;
					}
					if (s0 >= dayEnd || e0 <= day.ms) continue;
					const sMs = Math.max(s0, bandStart);
					const eMs = Math.min(e0, bandEnd);
					if (eMs <= sMs) continue;
					infos.push({
						ev,
						startMs: sMs,
						endMs: eMs,
						drawEndMs: eMs,
						hasStart: hasStart && s0 >= bandStart,
						hasEnd: hasEnd && e0 <= bandEnd,
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
					top: (hourOf(inf.startMs, day.ms) - get(startHour)) * HOUR_H,
					height: Math.max(24, (hourOf(inf.drawEndMs, day.ms) - hourOf(inf.startMs, day.ms)) * HOUR_H),
					col: inf.col,
					totalCols: inf.totalCols,
					isResizing: inf.isResizing,
					isMoving: inf.isMoving,
					hasStart: inf.hasStart,
					hasEnd: inf.hasEnd
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
		const nowFracHour = /* @__PURE__ */ user_derived(() => hourOf(clock.tick, clock.today));
		/** Y offset of the now-line, or null when outside visibleHours */
		const nowY = /* @__PURE__ */ user_derived(() => {
			if (get(nowFracHour) < get(startHour) || get(nowFracHour) > get(endHour)) return null;
			return (get(nowFracHour) - get(startHour)) * HOUR_H;
		});
		const weekIsEmpty = /* @__PURE__ */ user_derived(() => !events().some((ev) => ev.start.getTime() < get(weekEndMs) && ev.end.getTime() > get(weekStartMs)));
		let placed = /* @__PURE__ */ state(false);
		user_effect(() => {
			get(weekStartMs);
			get(startHour);
			get(endHour);
			const el = scrollEl;
			if (!el) return;
			untrack(() => {
				let targetHour;
				let anchorHour;
				if (get(weekHasToday)) {
					anchorHour = Math.min(Math.max(get(nowFracHour), get(startHour)), get(endHour));
					targetHour = Math.max(get(startHour), anchorHour - 1);
				} else targetHour = anchorHour = Math.max(get(startHour), Math.min(8, get(endHour) - 1));
				const topH = el.querySelector(".tw-top")?.offsetHeight ?? 0;
				el.scrollTop = openingTop([...get(layoutByDay).values()].flat(), (Math.floor(targetHour) - get(startHour)) * HOUR_H, HOUR_H, LABEL_ROOM, (anchorHour - get(startHour)) * HOUR_H, el.clientHeight - topH);
				set(placed, true);
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
		/** Pointer X → index into dayCols (clamped). Under `dir="rtl"` the flex
		*  row runs right-to-left, so the first day is the rightmost column. */
		function pointerDayIndex(clientX) {
			const r = colsRect();
			const n = get(dayCols).length;
			if (n === 0) return 0;
			const w = r.width / n;
			const i = Math.max(0, Math.min(n - 1, Math.floor((clientX - r.left) / w)));
			return isRtl() ? n - 1 - i : i;
		}
		function isRtl() {
			return !!colsEl && getComputedStyle(colsEl).direction === "rtl";
		}
		/** Pointer Y → fractional hour (unclamped) */
		function pointerHour(clientY) {
			return get(startHour) + (clientY - colsRect().top) / HOUR_H;
		}
		/** Pointer → epoch ms (day from X, time from Y, clamped into the band) */
		function pointerTimeMs(clientX, clientY) {
			return atHour(get(dayCols)[pointerDayIndex(clientX)]?.ms ?? get(weekStartMs), Math.min(Math.max(pointerHour(clientY), get(startHour)), get(endHour)));
		}
		/** Clamp a timestamp into the visible band of a specific day */
		function clampToDayBand(ms, dayMs) {
			return Math.max(atHour(dayMs, get(startHour)), Math.min(atHour(dayMs, get(endHour)), ms));
		}
		/** The blocked slot covering `hour` on the day, if any (truthy = blocked). */
		function isBlockedAt(dayMs, hour) {
			if (!get(blockedSlots)?.length) return void 0;
			const jsDay = new Date(dayMs).getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;
			return get(blockedSlots).find((slot) => {
				if (slot.day && slot.day !== isoDay) return false;
				return hour >= slot.start && hour < slot.end;
			});
		}
		function blockedRangeLabel(dayMs, slotStart, slotEnd) {
			return `${fmtTime$1(new Date(atHour(dayMs, slotStart)), $$props.locale)} – ${fmtTime$1(new Date(atHour(dayMs, slotEnd)), $$props.locale)}`;
		}
		const BODY_PAD_Y = 6;
		const TIME_LINE = 11 * 1.1;
		/** Tall enough for two title lines over the time (.tw-ev--tall), in the
		*  CSS's own line boxes: title 15px/1.25, time 14px/1.2. */
		const TWO_LINE_H = 61.3;
		function blockParts(ev, height) {
			return fitParts([
				{
					key: "time",
					size: TIME_LINE,
					priority: 0
				},
				{
					key: "title",
					size: 15.399999999999999,
					priority: 0
				},
				{
					key: "room",
					text: ev.location ?? "",
					size: 22,
					priority: 1
				}
			], height - BODY_PAD_Y);
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
			const bandS = atHour(dayMs, get(startHour));
			const bandE = atHour(dayMs, get(endHour));
			const cs = Math.max(s, bandS);
			const ce = Math.min(e, bandE);
			const zero = e === s;
			if (zero ? s < bandS || s >= bandE : ce <= cs) return null;
			return {
				top: (hourOf(cs, dayMs) - get(startHour)) * HOUR_H,
				height: Math.max(zero ? 24 : 12, (hourOf(ce, dayMs) - hourOf(cs, dayMs)) * HOUR_H),
				start: get(drag).payload.start,
				end: get(drag).payload.end,
				create: mode === "create",
				showTime: cs === Math.max(s, dayMs)
			};
		}
		/** The drag as the time axis sees it: the segment holding its start. */
		const axisGhost = /* @__PURE__ */ user_derived(() => {
			if (!get(drag)?.active || !get(drag).payload) return null;
			const s = get(drag).payload.start.getTime();
			const day = get(dayCols).find((d) => s >= d.ms && s < addDaysMs(d.ms, 1));
			return day ? ghostForDay(day.ms) : null;
		});
		const CREATE_THRESHOLD = 4;
		const LONG_PRESS_MS = 350;
		const LONG_PRESS_TOLERANCE = 8;
		let suppressColsClick = false;
		let crStartX = 0;
		let crStartY = 0;
		let crAnchorMs = 0;
		/** The press's wall-clock hour (clamped into the band) — snapped on start. */
		let crAnchorHour = 0;
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
			crAnchorMs = clampToDayBand(atHour(crDayMs, snapHour(crAnchorHour, "floor")), crDayMs);
			get(drag).beginCreate(new Date(crAnchorMs), new Date(crAnchorMs + get(SNAP_MS)));
			addTouchScrollBlock();
		}
		function onColsDragOver(e) {
			if (!$$props.onexternaldrop || readOnly()) return;
			const day = get(dayCols)[pointerDayIndex(e.clientX)];
			if (!day || day.isDisabled) return;
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
		}
		function onColsDrop(e) {
			if (!$$props.onexternaldrop || readOnly() || !e.dataTransfer) return;
			const day = get(dayCols)[pointerDayIndex(e.clientX)];
			if (!day || day.isDisabled) return;
			e.preventDefault();
			const hour = Math.min(Math.max(pointerHour(e.clientY), get(startHour)), get(endHour));
			const snapped = clampToDayBand(atHour(day.ms, snapHour(hour, "floor")), day.ms);
			$$props.onexternaldrop({
				start: new Date(snapped),
				dataTransfer: e.dataTransfer
			});
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
			crAnchorHour = Math.min(Math.max(pointerHour(e.clientY), get(startHour)), get(endHour));
			crAnchorMs = atHour(day.ms, crAnchorHour);
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
			const snapped = clampToDayBand(atHour(crDayMs, snapHour(pointerHour(e.clientY), "round")), crDayMs);
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
			const startMs = clampToDayBand(atHour(day.ms, snapHour(hour, "floor")), day.ms);
			const durMin = Math.max(60, get(minDuration) ?? 0);
			$$props.oneventcreate({
				start: new Date(startMs),
				end: new Date(startMs + durMin * 6e4)
			});
		}
		let focusedColMs = /* @__PURE__ */ state(null);
		const tabbableColMs = /* @__PURE__ */ user_derived(() => (get(dayCols).find((d) => d.ms === get(focusedColMs)) ?? get(dayCols).find((d) => d.isToday) ?? get(dayCols)[0])?.ms);
		const colsCreate = /* @__PURE__ */ user_derived(() => !!$$props.oneventcreate && !readOnly());
		let createFocus = null;
		user_effect(() => {
			const list = events();
			untrack(() => {
				if (!createFocus) return;
				const { startMs, known } = createFocus;
				const ev = list.find((e) => !known.has(e.id) && e.start.getTime() === startMs);
				const block = ev && colsEl?.querySelector(`.tw-ev[data-event-id="${CSS.escape(ev.id)}"]`);
				if (block) block.focus();
				if (block || --createFocus.tries <= 0) createFocus = null;
			});
		});
		function onColKeydown(e, i) {
			if (e.target !== e.currentTarget) return;
			const day = get(dayCols)[i];
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (!$$props.oneventcreate || readOnly()) return;
				if (day.isDisabled) return ctx.announce(`${dateLong(day.ms, $$props.locale)}, ${get(L).unavailable}`);
				const step = Math.max(1, ctx.snapInterval) / 60;
				const want = day.isToday ? snapHour(get(nowFracHour), "floor") + step : 9;
				const hour = Math.min(Math.max(want, get(startHour)), get(endHour) - step);
				const slot = isBlockedAt(day.ms, hour);
				if (slot) return ctx.announce(`${slot.label || get(L).unavailable}, ${blockedRangeLabel(day.ms, slot.start, slot.end)}`);
				const startMs = atHour(day.ms, hour);
				createFocus = {
					startMs,
					known: new Set(events().map((ev) => ev.id)),
					tries: 2
				};
				$$props.oneventcreate({
					start: new Date(startMs),
					end: new Date(startMs + Math.max(60, get(minDuration) ?? 0) * 6e4)
				});
				return;
			}
			const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
			if (!dir) return;
			e.preventDefault();
			const next = get(dayCols)[i + (isRtl() ? -dir : dir)];
			if (!next) return;
			set(focusedColMs, next.ms, true);
			colsEl?.querySelector(`.tw-col[data-day="${next.ms}"]`)?.focus();
		}
		async function onEventKeydown(e, ev) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				e.stopPropagation();
				$$props.oneventclick?.(ev, e.currentTarget.getBoundingClientRect());
				return;
			}
			if (!e.altKey || !get(drag) || readOnly() || ev.data?.readOnly) return;
			const vert = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;
			const horiz = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
			if (!vert && (!horiz || e.shiftKey)) return;
			let start = ev.start.getTime();
			let end = ev.end.getTime();
			const nudge = (ms) => vert < 0 ? snapMs(ms - 1, "floor") : snapMs(ms, "floor") + get(SNAP_MS);
			if (e.shiftKey) end = nudge(end);
			else if (vert) {
				start = nudge(start);
				end = start + (ev.end.getTime() - ev.start.getTime());
			} else {
				const fromDay = sod(start);
				const i = get(dayCols).findIndex((d) => d.ms === fromDay);
				const to = get(dayCols)[i + (isRtl() ? -horiz : horiz)];
				if (i < 0 || !to) return;
				start = atHour(to.ms, hourOf(start, fromDay));
				end = start + (ev.end.getTime() - ev.start.getTime());
			}
			e.preventDefault();
			e.stopPropagation();
			if (e.shiftKey) get(drag).beginResize(ev.id, "end", ev.start, ev.end);
			else get(drag).beginMove(ev.id, ev.start, ev.end);
			get(drag).updatePointer(new Date(start), new Date(end));
			await get(commitDragCtx)?.();
			await tick();
			(colsEl?.querySelector(`.tw-ev[data-event-id="${CSS.escape(ev.id)}"]`) ?? colsEl?.querySelector(`.tw-col[data-day="${sod(start)}"]`))?.focus();
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
			const snapped = snapMs(pointerTimeMs(e.clientX, e.clientY) - evGrabOffsetMs, "round");
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
		/** The day column whose segment holds the grabbed grip — an overnight
		*  event's end grip sits on the next day. */
		let rsDayMs = 0;
		function onResizePointerDown(e, ev, edge, dayMs) {
			if (e.button !== 0 || !get(drag) || readOnly() || ev.data?.readOnly) return;
			e.stopPropagation();
			evAnchor = e.currentTarget.parentElement?.getBoundingClientRect();
			rsStartY = e.clientY;
			rsStarted = false;
			rsEdge = edge;
			rsEvent = ev;
			rsDayMs = dayMs;
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
			const snapped = clampToDayBand(atHour(rsDayMs, snapHour(pointerHour(e.clientY), "round")), rsDayMs);
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
		user_effect(() => () => {
			const live = crStarted || evDragStarted || rsStarted;
			cleanupColsCreate();
			cleanupEvDrag();
			cleanupResize();
			if (live && get(drag)?.active) get(drag).cancel();
		});
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
		var div = root_33$1();
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
				set_style(div_5, "", {}, { width: "60px" });
				each(sibling(div_5, 2), 17, () => get(dayCols), (day) => day.ms, ($$anchor, day) => {
					var div_6 = root_7$7();
					let classes_2;
					var span_4 = child(div_6);
					var text_2 = only_child(span_4, true);
					var node_6 = sibling(span_4, 2);
					var consequent_3 = ($$anchor) => {
						var span_5 = root_5$7();
						let classes_3;
						var text_3 = only_child(span_5, true);
						template_effect(($0) => {
							classes_3 = set_class(span_5, 1, "tw-hd-num svelte-j4rvbp", null, classes_3, { "tw-hd-num--today": get(day).markToday });
							set_text(text_3, $0);
						}, [() => fmtDayNum(get(day).ms, $$props.locale)]);
						append($$anchor, span_5);
					};
					if_block(node_6, ($$render) => {
						if (get(showDates)) $$render(consequent_3);
					});
					var node_7 = sibling(node_6, 2);
					var consequent_4 = ($$anchor) => {
						var div_7 = root_6$7();
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
						classes_2 = set_class(div_6, 1, "tw-hd svelte-j4rvbp", null, classes_2, { "tw-hd--today": get(day).markToday });
						set_attribute(div_6, "aria-current", get(day).markToday ? "date" : void 0);
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
				set_style(div_9, "", {}, { width: "60px" });
				var text_4 = only_child(child(div_9), true);
				reset(div_9);
				each(sibling(div_9, 2), 17, () => get(dayCols), (day) => day.ms, ($$anchor, day) => {
					const segs = /* @__PURE__ */ user_derived(() => get(allDayByDay).get(get(day).ms) ?? []);
					const isExpanded = /* @__PURE__ */ user_derived(() => adExpanded[get(day).ms] ?? false);
					const shown = /* @__PURE__ */ user_derived(() => get(isExpanded) ? get(segs) : get(segs).slice(0, ALLDAY_MAX));
					var div_10 = root_10$5();
					let classes_4;
					var node_11 = child(div_10);
					each(node_11, 17, () => get(shown), (seg) => seg.ev.id, ($$anchor, seg) => {
						allDayChip($$anchor, () => get(seg));
					});
					var node_12 = sibling(node_11, 2);
					var consequent_6 = ($$anchor) => {
						var button_1 = root_9$5();
						var text_5 = only_child(button_1, true);
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
					template_effect(() => classes_4 = set_class(div_10, 1, "tw-ad-cell svelte-j4rvbp", null, classes_4, { "tw-ad-cell--today": get(day).markToday }));
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
		let classes_5;
		let styles_3;
		var div_12 = child(div_11);
		set_style(div_12, "", {}, { width: "60px" });
		var node_13 = child(div_12);
		each(node_13, 17, () => ({ length: get(hourCount) }), index, ($$anchor, _, i) => {
			const computed_const = /* @__PURE__ */ user_derived(() => {
				const [hNum, hSuf] = fmtHParts(get(startHour) + i, $$props.locale);
				return {
					hNum,
					hSuf
				};
			});
			var span_7 = root_13$4();
			let classes_6;
			set_style(span_7, "", {}, { top: `${i * HOUR_H}px` });
			var text_6 = child(span_7, true);
			var text_7 = only_child(sibling(text_6), true);
			reset(span_7);
			template_effect(($0) => {
				classes_6 = set_class(span_7, 1, "tw-gutter-lb svelte-j4rvbp", null, classes_6, { "tw-gutter-lb--under": $0 });
				set_text(text_6, get(computed_const).hNum);
				set_text(text_7, get(computed_const).hSuf);
			}, [() => get(nowY) !== null && get(weekHasToday) && Math.abs(i * HOUR_H - get(nowY)) < 18]);
			append($$anchor, span_7);
		});
		var node_14 = sibling(node_13, 2);
		var consequent_9 = ($$anchor) => {
			var fragment_1 = root_14$4();
			var span_8 = first_child(fragment_1);
			let styles_4;
			var text_8 = only_child(span_8, true);
			var span_9 = sibling(span_8, 2);
			let styles_5;
			var text_9 = only_child(span_9, true);
			template_effect(($0, $1) => {
				styles_4 = set_style(span_8, "", styles_4, { top: `${get(axisGhost).top ?? ""}px` });
				set_text(text_8, $0);
				styles_5 = set_style(span_9, "", styles_5, { top: `${get(axisGhost).top + get(axisGhost).height}px` });
				set_text(text_9, $1);
			}, [() => fmtTime$1(get(axisGhost).start, $$props.locale), () => fmtTime$1(get(axisGhost).end, $$props.locale)]);
			append($$anchor, fragment_1);
		};
		if_block(node_14, ($$render) => {
			if (get(axisGhost)) $$render(consequent_9);
		});
		var node_15 = sibling(node_14, 2);
		var consequent_10 = ($$anchor) => {
			var span_10 = root_15$4();
			let styles_6;
			var text_10 = only_child(span_10, true);
			template_effect(($0) => {
				styles_6 = set_style(span_10, "", styles_6, { top: `${get(nowY) ?? ""}px` });
				set_text(text_10, $0);
			}, [() => fmtTime$1(new Date(clock.tick), $$props.locale)]);
			append($$anchor, span_10);
		};
		if_block(node_15, ($$render) => {
			if (get(nowY) !== null && get(weekHasToday)) $$render(consequent_10);
		});
		reset(div_12);
		var div_13 = sibling(div_12, 2);
		var div_14 = child(div_13);
		var node_16 = child(div_14);
		each(node_16, 17, () => ({ length: get(hourCount) }), index, ($$anchor, _, i) => {
			var fragment_2 = root_16$4();
			var div_15 = first_child(fragment_2);
			set_style(div_15, "", {}, { top: `${i * HOUR_H}px` });
			set_style(sibling(div_15, 2), "", {}, { top: `${i * HOUR_H + HOUR_H / 2}px` });
			append($$anchor, fragment_2);
		});
		var node_17 = sibling(node_16, 2);
		var consequent_11 = ($$anchor) => {
			var div_17 = root_17$4();
			let styles_7;
			template_effect(() => styles_7 = set_style(div_17, "", styles_7, { top: `${get(nowY) ?? ""}px` }));
			append($$anchor, div_17);
		};
		if_block(node_17, ($$render) => {
			if (get(nowY) !== null && get(weekHasToday)) $$render(consequent_11);
		});
		reset(div_14);
		each(sibling(div_14, 2), 19, () => get(dayCols), (day) => day.ms, ($$anchor, day, di) => {
			const positioned = /* @__PURE__ */ user_derived(() => get(layoutByDay).get(get(day).ms) ?? []);
			const ghost = /* @__PURE__ */ user_derived(() => ghostForDay(get(day).ms));
			var div_18 = root_31$1();
			let classes_7;
			var node_19 = child(div_18);
			var consequent_15 = ($$anchor) => {
				var fragment_3 = comment();
				each(first_child(fragment_3), 17, () => get(blockedSlots), index, ($$anchor, slot) => {
					var fragment_4 = comment();
					var node_21 = first_child(fragment_4);
					var consequent_14 = ($$anchor) => {
						const s = /* @__PURE__ */ user_derived(() => Math.max(get(slot).start, get(startHour)));
						const e = /* @__PURE__ */ user_derived(() => Math.min(get(slot).end, get(endHour)));
						var fragment_5 = comment();
						var node_22 = first_child(fragment_5);
						var consequent_13 = ($$anchor) => {
							const range = /* @__PURE__ */ user_derived(() => blockedRangeLabel(get(day).ms, get(slot).start, get(slot).end));
							var div_19 = root_19$4();
							let styles_8;
							var node_23 = child(div_19);
							var consequent_12 = ($$anchor) => {
								var span_11 = root_18$4();
								var text_11 = only_child(span_11, true);
								template_effect(() => set_text(text_11, get(slot).label));
								append($$anchor, span_11);
							};
							if_block(node_23, ($$render) => {
								if (get(slot).label) $$render(consequent_12);
							});
							reset(div_19);
							template_effect(() => {
								set_attribute(div_19, "title", `${get(slot).label ? `${get(slot).label}, ` : ""}${get(range) ?? ""}`);
								set_attribute(div_19, "aria-label", `${(get(slot).label || get(L).unavailable) ?? ""}, ${get(range) ?? ""}`);
								styles_8 = set_style(div_19, "", styles_8, {
									top: `${(get(s) - get(startHour)) * HOUR_H}px`,
									height: `${(get(e) - get(s)) * HOUR_H}px`
								});
							});
							append($$anchor, div_19);
						};
						if_block(node_22, ($$render) => {
							if (get(e) > get(s)) $$render(consequent_13);
						});
						append($$anchor, fragment_5);
					};
					if_block(node_21, ($$render) => {
						if (!get(slot).day || get(slot).day === get(day).isoDay) $$render(consequent_14);
					});
					append($$anchor, fragment_4);
				});
				append($$anchor, fragment_3);
			};
			if_block(node_19, ($$render) => {
				if (get(blockedSlots)?.length) $$render(consequent_15);
			});
			var node_24 = sibling(node_19, 2);
			each(node_24, 17, () => get(positioned), (p) => p.ev.id, ($$anchor, p) => {
				const isCurrent = /* @__PURE__ */ user_derived(() => get(nowIds).has(get(p).ev.id));
				var div_20 = root_26$2();
				let classes_8;
				let styles_9;
				var div_21 = sibling(child(div_20), 2);
				EventContent(child(div_21), {
					get event() {
						return get(p).ev;
					},
					children: ($$anchor, $$slotProps) => {
						const parts = /* @__PURE__ */ user_derived(() => blockParts(get(p).ev, get(p).height));
						var fragment_6 = root_21$4();
						var span_12 = first_child(fragment_6);
						var text_12 = child(span_12, true);
						var text_13 = only_child(sibling(text_12), true);
						reset(span_12);
						var span_14 = sibling(span_12, 2);
						var text_14 = only_child(span_14, true);
						var node_26 = sibling(span_14, 2);
						var consequent_16 = ($$anchor) => {
							var span_15 = root_20$4();
							var text_15 = only_child(span_15, true);
							template_effect(() => set_text(text_15, get(p).ev.location));
							append($$anchor, span_15);
						};
						if_block(node_26, ($$render) => {
							if (get(parts).room) $$render(consequent_16);
						});
						template_effect(($0, $1) => {
							set_text(text_12, $0);
							set_text(text_13, $1);
							set_text(text_14, get(p).ev.title);
						}, [() => fmtTime$1(get(p).ev.start, $$props.locale), () => ` – ${fmtTime$1(get(p).ev.end, $$props.locale)}`]);
						append($$anchor, fragment_6);
					},
					$$slots: { default: true }
				});
				reset(div_21);
				var node_27 = sibling(div_21, 2);
				var consequent_17 = ($$anchor) => {
					append($$anchor, root_22$4());
				};
				if_block(node_27, ($$render) => {
					if (get(isCurrent)) $$render(consequent_17);
				});
				var node_28 = sibling(node_27, 2);
				var consequent_20 = ($$anchor) => {
					var fragment_7 = root_25$2();
					var node_29 = first_child(fragment_7);
					var consequent_18 = ($$anchor) => {
						var span_17 = root_23$3();
						delegated("pointerdown", span_17, (e) => onResizePointerDown(e, get(p).ev, "start", get(day).ms));
						append($$anchor, span_17);
					};
					if_block(node_29, ($$render) => {
						if (get(p).hasStart) $$render(consequent_18);
					});
					var node_30 = sibling(node_29, 2);
					var consequent_19 = ($$anchor) => {
						var span_18 = root_24$2();
						delegated("pointerdown", span_18, (e) => onResizePointerDown(e, get(p).ev, "end", get(day).ms));
						append($$anchor, span_18);
					};
					if_block(node_30, ($$render) => {
						if (get(p).hasEnd) $$render(consequent_19);
					});
					append($$anchor, fragment_7);
				};
				if_block(node_28, ($$render) => {
					if (!readOnly() && !get(p).ev.data?.readOnly) $$render(consequent_20);
				});
				reset(div_20);
				template_effect(($0, $1, $2, $3, $4) => {
					classes_8 = set_class(div_20, 1, "tw-ev svelte-j4rvbp", null, classes_8, {
						"tw-ev--selected": selectedEventId() === get(p).ev.id,
						"tw-ev--current": get(isCurrent),
						"tw-ev--resizing": get(p).isResizing,
						"tw-ev--moving": get(p).isMoving,
						"tw-ev--readonly": get(p).ev.data?.readOnly,
						"tw-ev--cancelled": get(p).ev.status === "cancelled",
						"tw-ev--tentative": get(p).ev.status === "tentative",
						"tw-ev--full": get(p).ev.status === "full",
						"tw-ev--limited": get(p).ev.status === "limited",
						"tw-ev--past": $0,
						"tw-ev--short": get(p).height < 44,
						"tw-ev--compact": get(p).height < 34,
						"tw-ev--tall": get(p).height >= TWO_LINE_H,
						"tw-ev--on-now": get(weekHasToday) && get(nowY) !== null && get(p).top < get(nowY) && get(p).top + get(p).height > get(nowY)
					});
					set_attribute(div_20, "data-event-id", get(p).ev.id);
					set_attribute(div_20, "aria-keyshortcuts", !readOnly() && !get(p).ev.data?.readOnly ? "Alt+ArrowUp Alt+ArrowDown Alt+ArrowLeft Alt+ArrowRight Alt+Shift+ArrowUp Alt+Shift+ArrowDown" : void 0);
					set_attribute(div_20, "title", get(p).ev.title);
					set_attribute(div_20, "aria-label", `${get(p).ev.title ?? ""}, ${$1 ?? ""} – ${$2 ?? ""}, ${$3 ?? ""}${$4 ?? ""}${get(isCurrent) ? ` (${get(L).inProgress})` : ""}`);
					styles_9 = set_style(div_20, "", styles_9, {
						top: `${get(p).top ?? ""}px`,
						height: `${get(p).height ?? ""}px`,
						left: `calc(${get(p).col / get(p).totalCols * 100}% + 1px)`,
						width: `calc(${100 / get(p).totalCols}% - ${get(p).totalCols > 1 ? 3 : 8}px)`,
						"--ev-color": get(p).ev.color ?? "var(--dt-event, var(--dt-accent))"
					});
				}, [
					() => get(p).ev.end.getTime() < clock.tick,
					() => fmtTime$1(get(p).ev.start, $$props.locale),
					() => fmtTime$1(get(p).ev.end, $$props.locale),
					() => fmtDuration(get(p).ev.start, get(p).ev.end),
					() => statusText(get(p).ev)
				]);
				delegated("pointerdown", div_20, (e) => onEventPointerDown(e, get(p).ev));
				event("pointerenter", div_20, () => get(oneventhover)?.(get(p).ev));
				delegated("keydown", div_20, (e) => onEventKeydown(e, get(p).ev));
				append($$anchor, div_20);
			});
			var node_31 = sibling(node_24, 2);
			var consequent_23 = ($$anchor) => {
				var div_22 = root_29$2();
				let classes_9;
				let styles_10;
				var node_32 = child(div_22);
				var consequent_22 = ($$anchor) => {
					var fragment_8 = root_28$2();
					var span_19 = first_child(fragment_8);
					var text_16 = only_child(span_19);
					var node_33 = sibling(span_19, 2);
					var consequent_21 = ($$anchor) => {
						var span_20 = root_27$2();
						var text_17 = only_child(span_20, true);
						template_effect(() => set_text(text_17, get(movingEvent).title));
						append($$anchor, span_20);
					};
					if_block(node_33, ($$render) => {
						if (!get(ghost).create && get(movingEvent)) $$render(consequent_21);
					});
					template_effect(($0, $1) => set_text(text_16, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmtTime$1(get(ghost).start, $$props.locale), () => fmtTime$1(get(ghost).end, $$props.locale)]);
					append($$anchor, fragment_8);
				};
				if_block(node_32, ($$render) => {
					if (get(ghost).showTime) $$render(consequent_22);
				});
				reset(div_22);
				template_effect(() => {
					classes_9 = set_class(div_22, 1, "tw-ghost svelte-j4rvbp", null, classes_9, { "tw-ghost--create": get(ghost).create });
					styles_10 = set_style(div_22, "", styles_10, {
						top: `${get(ghost).top ?? ""}px`,
						height: `${get(ghost).height ?? ""}px`,
						"--ev-color": get(ghost).create ? "var(--dt-accent, #1d4fd7)" : get(movingEvent)?.color ?? "var(--dt-event, var(--dt-accent))"
					});
				});
				append($$anchor, div_22);
			};
			if_block(node_31, ($$render) => {
				if (get(ghost)) $$render(consequent_23);
			});
			var node_34 = sibling(node_31, 2);
			var consequent_24 = ($$anchor) => {
				var fragment_9 = root_30$1();
				var div_23 = first_child(fragment_9);
				let styles_11;
				var span_21 = sibling(div_23, 2);
				let styles_12;
				template_effect(() => {
					set_attribute(div_23, "aria-label", get(L).currentTime);
					styles_11 = set_style(div_23, "", styles_11, { top: `${get(nowY) ?? ""}px` });
					styles_12 = set_style(span_21, "", styles_12, { top: `${get(nowY) ?? ""}px` });
				});
				append($$anchor, fragment_9);
			};
			if_block(node_34, ($$render) => {
				if (get(day).isToday && get(nowY) !== null) $$render(consequent_24);
			});
			reset(div_18);
			template_effect(($0) => {
				classes_7 = set_class(div_18, 1, "tw-col svelte-j4rvbp", null, classes_7, {
					"tw-col--today": get(day).markToday,
					"tw-col--past": get(day).isPast,
					"tw-col--weekend": get(day).isWeekend,
					"tw-col--disabled": get(day).isDisabled
				});
				set_attribute(div_18, "data-day", get(day).ms);
				set_attribute(div_18, "role", get(colsCreate) ? "group" : void 0);
				set_attribute(div_18, "aria-label", $0);
				set_attribute(div_18, "aria-keyshortcuts", get(colsCreate) && !get(day).isDisabled ? "Enter" : void 0);
				set_attribute(div_18, "tabindex", get(colsCreate) ? get(day).ms === get(tabbableColMs) ? 0 : -1 : void 0);
			}, [() => get(colsCreate) ? `${dateLong(get(day).ms, $$props.locale)}, ${get(day).isDisabled ? get(L).unavailable : get(L).createEvent}` : void 0]);
			delegated("focusin", div_18, () => set(focusedColMs, get(day).ms, true));
			delegated("keydown", div_18, function(...$$args) {
				(get(colsCreate) ? (e) => onColKeydown(e, get(di)) : void 0)?.apply(this, $$args);
			});
			append($$anchor, div_18);
		});
		reset(div_13);
		bind_this(div_13, ($$value) => colsEl = $$value, () => colsEl);
		reset(div_11);
		reset(div_2);
		reset(div_1);
		bind_this(div_1, ($$value) => scrollEl = $$value, () => scrollEl);
		var node_35 = sibling(div_1, 2);
		var consequent_25 = ($$anchor) => {
			var div_24 = root_32$1();
			snippet(child(div_24), () => ctx.emptySnippet);
			reset(div_24);
			append($$anchor, div_24);
		};
		if_block(node_35, ($$render) => {
			if (get(weekIsEmpty) && ctx.emptySnippet) $$render(consequent_25);
		});
		reset(div);
		template_effect(($0) => {
			classes_1 = set_class(div, 1, "tw svelte-j4rvbp", null, classes_1, { "tw--auto": get(autoHeight) });
			styles_1 = set_style(div, style() || void 0, styles_1, {
				"--tw-col-min": `${get(MIN_COL_W) ?? ""}px`,
				height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%"
			});
			set_attribute(div, "aria-label", `${(get(singleDay) ? get(L).dayPlanner : get(L).weekAhead) ?? ""}${$0 ?? ""}`);
			styles_2 = set_style(div_2, "", styles_2, { "min-width": `${get(innerMinWidth) ?? ""}px` });
			classes_5 = set_class(div_11, 1, "tw-body svelte-j4rvbp", null, classes_5, { "tw-body--unplaced": !get(placed) });
			styles_3 = set_style(div_11, "", styles_3, { height: `${get(gridHeight) ?? ""}px` });
		}, [() => get(dayCols).length ? `, ${get(singleDay) ? dateLong(get(dayCols)[0].ms, $$props.locale) : fmtWeekRange(get(dayCols)[0].ms, $$props.locale, get(dayCols)[get(dayCols).length - 1].ms)}` : ""]);
		delegated("click", div_13, handleColsClick);
		delegated("pointerdown", div_13, onColsPointerDown);
		event("dragover", div_13, onColsDragOver);
		event("drop", div_13, onColsDrop);
		delegated("contextmenu", div_13, onColsContextMenu);
		append($$anchor, div);
		pop();
	}
	delegate([
		"click",
		"pointerdown",
		"contextmenu",
		"focusin",
		"keydown"
	]);
	// src/lib/views/planner/Planner.svelte
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
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/easing/index.js
	/**
	* Cubic scaling, decelerate towards end.
	*
	* @param {number} t
	* @returns {number}
	*/
	function cubicOut(t) {
		const f = t - 1;
		return f * f * f + 1;
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/animate/index.js
	/** @import { FlipParams, AnimationConfig } from './public.js' */
	/**
	* The flip function calculates the start and end position of an element and animates between them, translating the x and y values.
	* `flip` stands for [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/).
	*
	* @param {Element} node
	* @param {{ from: DOMRect; to: DOMRect }} fromTo
	* @param {FlipParams} params
	* @returns {AnimationConfig}
	*/
	function flip(node, { from, to }, params = {}) {
		var { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
		var style = getComputedStyle(node);
		var transform = style.transform === "none" ? "" : style.transform;
		var [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
		ox /= node.clientWidth;
		oy /= node.clientHeight;
		var zoom = get_zoom(node);
		var sx = node.clientWidth / to.width / zoom;
		var sy = node.clientHeight / to.height / zoom;
		var fx = from.left + from.width * ox;
		var fy = from.top + from.height * oy;
		var tx = to.left + to.width * ox;
		var ty = to.top + to.height * oy;
		var dx = (fx - tx) * sx;
		var dy = (fy - ty) * sy;
		var dsx = from.width / to.width;
		var dsy = from.height / to.height;
		return {
			delay,
			duration: typeof duration === "function" ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
			easing,
			css: (t, u) => {
				return `transform: ${transform} translate(${u * dx}px, ${u * dy}px) scale(${t + u * dsx}, ${t + u * dsy});`;
			}
		};
	}
	/**
	* @param {Element} element
	*/
	function get_zoom(element) {
		if ("currentCSSZoom" in element) return element.currentCSSZoom;
		/** @type {Element | null} */
		var current = element;
		var zoom = 1;
		while (current !== null) {
			zoom *= +getComputedStyle(current).zoom;
			current = current.parentElement;
		}
		return zoom;
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/transition/index.js
	/** @param {number} t */
	function cubic_out(t) {
		const f = t - 1;
		return f * f * f + 1;
	}
	/**
	* @template T
	* @template S
	* @param {T} tar
	* @param {S} src
	* @returns {T & S}
	*/
	function assign(tar, src) {
		for (const k in src) tar[k] = src[k];
		return tar;
	}
	/**
	* The `crossfade` function creates a pair of [transitions](https://svelte.dev/docs/svelte/transition) called `send` and `receive`. When an element is 'sent', it looks for a corresponding element being 'received', and generates a transition that transforms the element to its counterpart's position and fades it out. When an element is 'received', the reverse happens. If there is no counterpart, the `fallback` transition is used.
	*
	* @param {CrossfadeParams & {
	* 	fallback?: (node: Element, params: CrossfadeParams, intro: boolean) => TransitionConfig;
	* }} params
	* @returns {[(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig, (node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig]}
	*/
	function crossfade({ fallback, ...defaults }) {
		/** @type {Map<any, Element>} */
		const to_receive = /* @__PURE__ */ new Map();
		/** @type {Map<any, Element>} */
		const to_send = /* @__PURE__ */ new Map();
		/**
		* @param {Element} from_node
		* @param {Element} node
		* @param {CrossfadeParams} params
		* @returns {TransitionConfig}
		*/
		function crossfade(from_node, node, params) {
			const { delay = 0, duration = (d) => Math.sqrt(d) * 30, easing = cubic_out } = assign(assign({}, defaults), params);
			const from = from_node.getBoundingClientRect();
			const to = node.getBoundingClientRect();
			const dx = from.left - to.left;
			const dy = from.top - to.top;
			const dw = from.width / to.width;
			const dh = from.height / to.height;
			const d = Math.sqrt(dx * dx + dy * dy);
			const style = getComputedStyle(node);
			const transform = style.transform === "none" ? "" : style.transform;
			const opacity = +style.opacity;
			return {
				delay,
				duration: typeof duration === "function" ? duration(d) : duration,
				easing,
				css: (t, u) => `
			   opacity: ${t * opacity};
			   transform-origin: top left;
			   transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
		   `
			};
		}
		/**
		* @param {Map<any, Element>} items
		* @param {Map<any, Element>} counterparts
		* @param {boolean} intro
		* @returns {(node: any, params: CrossfadeParams & { key: any; }) => () => TransitionConfig}
		*/
		function transition(items, counterparts, intro) {
			return (node, params) => {
				items.set(params.key, node);
				return () => {
					if (counterparts.has(params.key)) {
						const other_node = counterparts.get(params.key);
						counterparts.delete(params.key);
						return crossfade(other_node, node, params);
					}
					items.delete(params.key);
					return fallback && fallback(node, params, intro);
				};
			};
		}
		return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
	}
	// ../../node_modules/.pnpm/svelte@5.57.3_@typescript-eslint+types@8.62.1/node_modules/svelte/src/motion/index.js
	/**
	* A [media query](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery) that matches if the user [prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
	*
	* ```svelte
	* <script>
	* 	import { prefersReducedMotion } from 'svelte/motion';
	* 	import { fly } from 'svelte/transition';
	*
	* 	let visible = $state(false);
	* <\/script>
	*
	* <button onclick={() => visible = !visible}>
	* 	toggle
	* </button>
	*
	* {#if visible}
	* 	<p transition:fly={{ y: prefersReducedMotion.current ? 0 : 200 }}>
	* 		flies in, unless the user prefers reduced motion
	* 	</p>
	* {/if}
	* ```
	* @type {MediaQuery}
	* @since 5.7.0
	*/
	var prefersReducedMotion = /*@__PURE__*/ new MediaQuery("(prefers-reduced-motion: reduce)");
	// src/lib/views/shared/chip-fit.svelte.ts
	function createChipFit(options) {
		let width = /* @__PURE__ */ state(0);
		let fonts = /* @__PURE__ */ state(proxy({}));
		const widths = /* @__PURE__ */ new Map();
		const measure = (text, font) => {
			const key = `${font} ${text}`;
			let w = widths.get(key);
			if (w === void 0) widths.set(key, w = textWidth(text, font));
			return w;
		};
		function read(root) {
			const slot = root.querySelector(options.slot);
			if (slot) {
				const cs = getComputedStyle(slot);
				set(width, slot.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
			}
			const next = {};
			let changed = false;
			for (const [key, selector] of Object.entries(options.fonts)) {
				const el = root.querySelector(selector);
				next[key] = el ? fontOf(el) : get(fonts)[key] ?? "";
				if (next[key] !== get(fonts)[key]) changed = true;
			}
			if (changed) {
				widths.clear();
				set(fonts, next, true);
			}
		}
		return {
			get width() {
				return get(width);
			},
			get fonts() {
				return get(fonts);
			},
			watch(root) {
				const ro = new ResizeObserver(() => read(root));
				ro.observe(root);
				const raf = requestAnimationFrame(() => read(root));
				document.fonts?.ready.then(() => {
					widths.clear();
					read(root);
				});
				return () => {
					cancelAnimationFrame(raf);
					ro.disconnect();
				};
			},
			parts(list, reserve = 0) {
				return fitParts(list, get(width) - reserve, measure);
			}
		};
	}
	// src/lib/views/planner/PlannerScroll.svelte
	var allDaySegmentContent = ($$anchor, seg = noop) => {
		var fragment = root_4$6();
		var node = first_child(fragment);
		var consequent = ($$anchor) => {
			var span = root_1$6();
			var text = only_child(span, true);
			template_effect(() => set_text(text, seg().ev.title));
			append($$anchor, span);
		};
		var alternate = ($$anchor) => {
			var fragment_1 = root_2$6();
			var text_1 = only_child(sibling(first_child(fragment_1), 2), true);
			template_effect(() => set_text(text_1, seg().ev.title));
			append($$anchor, fragment_1);
		};
		if_block(node, ($$render) => {
			if (seg().isStart) $$render(consequent);
			else $$render(alternate, -1);
		});
		var node_1 = sibling(node, 2);
		var consequent_1 = ($$anchor) => {
			append($$anchor, root_3$6());
		};
		if_block(node_1, ($$render) => {
			if (!seg().isEnd && seg().totalDays > 1) $$render(consequent_1);
		});
		append($$anchor, fragment);
	};
	var root_1$6 = /* @__PURE__ */ from_html(`<span class="wg-ad-title svelte-l8xuza"> </span>`);
	var root_2$6 = /* @__PURE__ */ from_html(`<span class="wg-ad-cont svelte-l8xuza" aria-hidden="true"><svg viewBox="0 0 8 8" width="8" height="8"><path d="M5.5 1.5 2.5 4l3 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span> <span class="wg-ad-title svelte-l8xuza"> </span>`, 1);
	var root_3$6 = /* @__PURE__ */ from_html(`<span class="wg-ad-arrow svelte-l8xuza" aria-hidden="true"><svg viewBox="0 0 8 8" width="8" height="8"><path d="M2.5 1.5 5.5 4l-3 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>`);
	var root_4$6 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_5$6 = /* @__PURE__ */ from_html(`<span class="wg-ev-time svelte-l8xuza"> </span>`);
	var root_6$6 = /* @__PURE__ */ from_html(`<span class="wg-ev-loc svelte-l8xuza"> </span>`);
	var root_7$6 = /* @__PURE__ */ from_html(`<!> <span class="wg-ev-title svelte-l8xuza"> </span> <!>`, 1);
	var root_8$5 = /* @__PURE__ */ from_html(`<div class="wg-month wg-month--start wg-month--inset svelte-l8xuza" aria-hidden="true"> </div>`);
	var root_9$4 = /* @__PURE__ */ from_html(`<span class="wg-day-num svelte-l8xuza"> </span>`);
	var root_10$4 = /* @__PURE__ */ from_html(`<div class="wg-cell-custom-header svelte-l8xuza"><!></div>`);
	var root_11$3 = /* @__PURE__ */ from_html(`<span class="wg-blocked-label svelte-l8xuza"> </span>`);
	var root_12$3 = /* @__PURE__ */ from_html(`<div class="wg-blocked svelte-l8xuza"><!></div>`);
	var root_13$3 = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><!></div>`);
	var root_14$3 = /* @__PURE__ */ from_html(`<button type="button" class="wg-ev-more svelte-l8xuza"> </button>`);
	var root_15$3 = /* @__PURE__ */ from_html(`<div class="wg-ev wg-ev--drag-preview svelte-l8xuza" aria-hidden="true"><!></div>`);
	var root_16$3 = /* @__PURE__ */ from_html(`<div class="wg-now wg-drop svelte-l8xuza" aria-hidden="true"><span class="wg-now-time svelte-l8xuza"> </span></div>`);
	var root_17$3 = /* @__PURE__ */ from_html(`<div class="wg-now svelte-l8xuza" aria-hidden="true"><span class="wg-now-time svelte-l8xuza"> </span></div>`);
	var root_18$3 = /* @__PURE__ */ from_html(`<div aria-hidden="true"><!></div>`);
	var root_19$3 = /* @__PURE__ */ from_html(`<div class="wg-allday svelte-l8xuza"><!> <!></div>`);
	var root_20$3 = /* @__PURE__ */ from_html(`<div role="gridcell"><!> <div><span class="wg-day-wd svelte-l8xuza"> </span> <!></div> <!> <div class="wg-cell-events svelte-l8xuza"><!> <!> <!> <!> <!> <!></div> <!></div>`);
	var root_21$3 = /* @__PURE__ */ from_html(`<div role="presentation"><div aria-hidden="true"> </div> <div class="wg-week-body svelte-l8xuza" role="presentation"><div class="wg-days svelte-l8xuza" role="row"></div></div></div>`);
	var root_22$3 = /* @__PURE__ */ from_html(`<div><div class="wg-body svelte-l8xuza" role="grid"><div class="wg-probe svelte-l8xuza" aria-hidden="true"><span class="wg-ev-time svelte-l8xuza"></span><span class="wg-ev-title svelte-l8xuza"></span><span class="wg-ev-loc svelte-l8xuza"></span></div> <!></div></div>`);
	function PlannerScroll($$anchor, $$props) {
		push($$props, true);
		const timedEventContent = ($$anchor, ev = noop, inset = noop) => {
			const parts = /* @__PURE__ */ user_derived(() => chipParts(ev(), inset()));
			EventContent($$anchor, {
				get event() {
					return ev();
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_3 = root_7$6();
					var node_2 = first_child(fragment_3);
					var consequent_2 = ($$anchor) => {
						var span_3 = root_5$6();
						var text_2 = only_child(span_3, true);
						template_effect(($0) => set_text(text_2, $0), [() => fmtAmPm(ev().start)]);
						append($$anchor, span_3);
					};
					if_block(node_2, ($$render) => {
						if (get(parts).time) $$render(consequent_2);
					});
					var span_4 = sibling(node_2, 2);
					var text_3 = only_child(span_4, true);
					var node_3 = sibling(span_4, 2);
					var consequent_3 = ($$anchor) => {
						var span_5 = root_6$6();
						var text_4 = only_child(span_5, true);
						template_effect(() => set_text(text_4, ev().location));
						append($$anchor, span_5);
					};
					if_block(node_3, ($$render) => {
						if (get(parts).room) $$render(consequent_3);
					});
					template_effect(() => set_text(text_3, ev().title));
					append($$anchor, fragment_3);
				},
				$$slots: { default: true }
			});
		};
		let mondayStart = prop($$props, "mondayStart", 3, true), height = prop($$props, "height", 3, 520), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null), readOnly = prop($$props, "readOnly", 3, false);
		const ctx = useCalendarContext();
		const L = /* @__PURE__ */ user_derived(() => ctx.labels);
		const clock = createClock(ctx.timezone);
		const [previewSend, previewReceive] = crossfade({ duration: () => prefersReducedMotion.current ? 0 : 160 });
		const drag = /* @__PURE__ */ user_derived(() => ctx.drag);
		const ANIM = /* @__PURE__ */ user_derived(() => prefersReducedMotion.current || !get(drag)?.active ? 0 : 180);
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
		const INITIAL_BUFFER = 8;
		const EXTEND_BY = 8;
		const EDGE_PX = 200;
		let bufferBefore = /* @__PURE__ */ state(INITIAL_BUFFER);
		let bufferAfter = /* @__PURE__ */ state(INITIAL_BUFFER);
		const MAX_EVENTS_SHOWN = 5;
		const CHIP_H = 22;
		const CHIP_GAP = 3;
		const NOW_H = 18;
		function rowPitch() {
			const rows = el?.querySelectorAll("[data-week]");
			return rows && rows.length > 1 ? rows[1].offsetTop - rows[0].offsetTop : 132;
		}
		/** Fractional wall-clock hour `hour` on the day starting at `dayMs` → epoch ms. */
		function atHour(dayMs, hour) {
			return new Date(dayMs).setHours(0, 0, 0, Math.round(hour * HOUR_MS));
		}
		/** Epoch ms → fractional wall-clock hour counted from the day at `dayMs`. */
		function hourOf(ms, dayMs) {
			const d = new Date(ms);
			return diffDays(ms, dayMs) * 24 + d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600 + d.getMilliseconds() / HOUR_MS;
		}
		/** All-day events and timed ones a (wall-clock) day or longer are bars;
		*  a shorter overnight event is a chip on the day it starts. */
		function inAllDayStrip(ev) {
			return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
		}
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		const eventHours = /* @__PURE__ */ user_derived(() => {
			let lo = 24;
			let hi = -1;
			for (const ev of events()) {
				if (inAllDayStrip(ev)) continue;
				const h = ev.start.getHours() + ev.start.getMinutes() / 60;
				lo = Math.min(lo, h);
				hi = Math.max(hi, h);
			}
			return hi < 0 ? [0, 24] : [Math.floor(lo), Math.min(24, Math.floor(hi) + 1)];
		});
		const startHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[0] ?? get(eventHours)[0]);
		const endHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[1] ?? get(eventHours)[1]);
		/** Where a chip starting this many wall-clock hours into the day sits, px
		*  from the axis top. A chip at the last hour still ends inside the floor height. */
		function timeTop(hoursIntoDay) {
			const f = (hoursIntoDay - get(startHour)) / Math.max(1, get(endHour) - get(startHour));
			return Math.min(Math.max(f, 0), 1) * 98;
		}
		/** Each chip at its start time, or just under the chip before it when that
		*  one is in the way: the order is time, the height is time, nothing overlaps.
		*  On today the now line is one more item on the axis: at the clock's
		*  height, under every chip that has started (pushed-down chips would read
		*  as still to come), and it pushes the chips to come down by its plate,
		*  so the plate never covers a chip's text. `end` is where the last item ends. */
		function chipTops(list, dayMs, withNow = false) {
			const tops = [];
			let min = 0;
			let nowY = null;
			const placeNow = () => {
				nowY = Math.max(timeTop(hourOf(clock.tick, dayMs)), min - CHIP_GAP + NOW_H / 2);
				min = nowY + NOW_H / 2 + CHIP_GAP;
			};
			for (const ev of list) {
				if (withNow && nowY === null && ev.start.getTime() > clock.tick) placeNow();
				const top = Math.max(timeTop(hourOf(ev.start.getTime(), dayMs)), min);
				tops.push(top);
				min = top + CHIP_H + CHIP_GAP;
			}
			if (withNow && nowY === null) placeNow();
			return {
				tops,
				nowY,
				end: Math.max(0, min - CHIP_GAP)
			};
		}
		const _initMs = untrack(() => sod($$props.focusDate?.getTime() ?? Date.now()));
		let internalFocusMs = /* @__PURE__ */ state(proxy(_initMs));
		let lastExternalMs = _initMs;
		let el;
		function scrollWeekIntoContainer(targetMs, behavior = "auto") {
			if (!el) return;
			let target = null;
			if (targetMs !== void 0) {
				const rows = el.querySelectorAll("[data-week]");
				for (const row of rows) {
					const weekMs = Number(row.dataset.week);
					if (weekMs <= targetMs && targetMs < addDaysMs(weekMs, get(customDays))) {
						target = row;
						break;
					}
				}
			}
			if (!target) target = el.querySelector(".wg-week--current");
			if (!target) return;
			const targetTop = target.offsetTop - (el.clientHeight - target.offsetHeight) / 2;
			el.scrollTo({
				top: Math.max(0, targetTop),
				behavior
			});
		}
		const todayMs = /* @__PURE__ */ user_derived(() => clock.today);
		const customDays = /* @__PURE__ */ user_derived(() => get(viewState)?.dayCount ?? 7);
		const anchorPeriodStart = /* @__PURE__ */ user_derived(() => get(customDays) === 7 ? startOfWeek(get(internalFocusMs), mondayStart()) : sod(get(internalFocusMs)));
		user_effect(() => {
			if (!get(loadRangeCtx)) return;
			const rangeStart = new Date(addDaysMs(get(anchorPeriodStart), -get(bufferBefore) * get(customDays)));
			const rangeEnd = new Date(addDaysMs(get(anchorPeriodStart), (get(bufferAfter) + 1) * get(customDays)));
			get(loadRangeCtx).set({
				start: rangeStart,
				end: rangeEnd
			});
			return () => get(loadRangeCtx).set(null);
		});
		/** The gutter's month — that of the row's first shown day. */
		/** The row opens a month: the gutter label carries the year and ink. */
		/** "OCTOBER 2026" on the day a month begins mid-row; null elsewhere. */
		/** All-day or multi-day event segments for this day */
		const weeks = /* @__PURE__ */ user_derived(() => {
			const result = [];
			for (let w = -get(bufferBefore); w <= get(bufferAfter); w++) {
				const periodStart = addDaysMs(get(anchorPeriodStart), w * get(customDays));
				const isCurrent = get(todayMs) >= periodStart && get(todayMs) < addDaysMs(periodStart, get(customDays));
				const days = [];
				for (let d = 0; d < get(customDays); d++) {
					const ms = addDaysMs(periodStart, d);
					const date = new Date(ms);
					const dayNum = date.getDate();
					const dow = date.getDay();
					const isWeekend = dow === 0 || dow === 6;
					const isToday = ms === get(todayMs);
					const isPast = get(equalDays) ? false : ms < get(todayMs);
					const dayEnd = addDaysMs(ms, 1);
					const dayEventsAll = events().filter((ev) => ev.start.getTime() < dayEnd && (ev.end.getTime() > ms || ev.start.getTime() >= ms)).sort((a, b) => a.start.getTime() - b.start.getTime());
					const timedEvents = [];
					const allDaySegments = [];
					for (const ev of dayEventsAll) if (inAllDayStrip(ev)) {
						const seg = segmentForDay(ev, ms);
						if (seg) allDaySegments.push(seg);
					} else if (ev.start.getTime() >= ms && ev.end.getTime() >= ev.start.getTime()) timedEvents.push(ev);
					days.push({
						ms,
						dayNum,
						isToday,
						isPast,
						isWeekend,
						monthLabel: null,
						events: timedEvents,
						allDaySegments
					});
				}
				result.push({
					weekStart: periodStart,
					isCurrent,
					monthLabel: "",
					monthStart: false,
					days
				});
			}
			if (get(hideDays)?.length) for (const row of result) row.days = row.days.filter((d) => {
				const isoDay = new Date(d.ms).getDay();
				const iso = isoDay === 0 ? 7 : isoDay;
				return !get(hideDays).includes(iso);
			});
			for (const row of result) {
				let prev = new Date(addDaysMs(row.weekStart, -1)).getMonth();
				row.days.forEach((day, i) => {
					const date = new Date(day.ms);
					const starts = date.getMonth() !== prev;
					prev = date.getMonth();
					const label = monthLong(day.ms, $$props.locale).toUpperCase() + (starts ? ` ${date.getFullYear()}` : "");
					if (i === 0) {
						row.monthLabel = label;
						row.monthStart = starts;
					} else if (starts) day.monthLabel = label;
				});
			}
			return result;
		});
		function fmtAmPm(d) {
			return fmtTime$1(d, $$props.locale);
		}
		onMount(() => {
			tick().then(() => scrollWeekIntoContainer());
			return () => {
				cancelAnimationFrame(syncRaf);
				const live = evDragStarted;
				cleanupEvDrag();
				if (live && get(drag)?.active) get(drag).cancel();
			};
		});
		let settled = /* @__PURE__ */ state(false);
		user_effect(() => {
			if (get(settled) || !events().length) return;
			set(settled, true);
			tick().then(() => {
				if (!touched) scrollWeekIntoContainer(get(internalFocusMs));
			});
		});
		/** A real reader gesture (wheel or press), as opposed to a scroll we caused
		*  ourselves. Keyboard is not watched: the re-centre happens milliseconds
		*  after mount, before anyone has reached for a key, and a keydown handler
		*  on the grid element would need a tabindex it should not have. */
		let touched = false;
		/** Attached, not bound in markup: a handler on the `role="grid"` element
		*  would demand a tabindex the scroller should not carry. */
		function watchTouch(root) {
			const on = () => {
				touched = true;
			};
			root.addEventListener("wheel", on, { passive: true });
			root.addEventListener("pointerdown", on);
			return () => {
				root.removeEventListener("wheel", on);
				root.removeEventListener("pointerdown", on);
			};
		}
		const periodOf = (ms) => get(customDays) === 7 ? startOfWeek(ms, mondayStart()) : sod(ms);
		user_effect(() => {
			const ext = $$props.focusDate ? sod($$props.focusDate.getTime()) : clock.today;
			if (periodOf(ext) !== periodOf(lastExternalMs)) {
				lastExternalMs = ext;
				set(internalFocusMs, ext, true);
				set(bufferBefore, INITIAL_BUFFER);
				set(bufferAfter, INITIAL_BUFFER);
				tick().then(() => scrollWeekIntoContainer(ext));
			}
		});
		/** Push the week at the viewport centre to viewState (drives the header label + Today button). */
		function syncFocusFromScroll() {
			if (!el || !get(viewState)) return;
			const centerY = el.scrollTop + el.clientHeight / 2;
			const rows = el.querySelectorAll("[data-week]");
			for (const row of rows) if (row.offsetTop + row.offsetHeight >= centerY) {
				const ms = Number(row.dataset.week);
				if (Number.isFinite(ms) && ms !== lastExternalMs) {
					lastExternalMs = ms;
					get(viewState).setFocusDate(new Date(ms));
				}
				return;
			}
		}
		let extending = false;
		let syncRaf = 0;
		function handleUserScroll() {
			if (!syncRaf) syncRaf = requestAnimationFrame(() => {
				syncRaf = 0;
				if (!extending) syncFocusFromScroll();
			});
			if (!el || extending) return;
			if (el.scrollTop < EDGE_PX) {
				extending = true;
				const first = el.querySelector("[data-week]");
				const key = first?.dataset.week;
				const offset = first ? first.offsetTop - el.scrollTop : 0;
				set(bufferBefore, get(bufferBefore) + EXTEND_BY);
				tick().then(() => {
					const row = key ? el.querySelector(`[data-week="${key}"]`) : null;
					el.scrollTop = row ? row.offsetTop - offset : el.scrollTop + EXTEND_BY * rowPitch();
					extending = false;
				});
			} else if (el.scrollHeight - el.clientHeight - el.scrollTop < EDGE_PX) set(bufferAfter, get(bufferAfter) + EXTEND_BY);
		}
		/** The time at a pointer's height on a day's axis — timeTop read backwards,
		*  the pointer at the chip's middle. Half hours: the whole day is ~100px.
		*  Wall-clock ms into the local day; dayDropStart makes it an instant. */
		function pointerTime(cell, clientY) {
			const area = cell.querySelector(".wg-cell-events");
			if (!area) return get(startHour) * HOUR_MS;
			const y = clientY - area.getBoundingClientRect().top - CHIP_H / 2;
			const f = Math.min(Math.max(y / 98, 0), 1);
			const hours = get(startHour) + f * Math.max(1, get(endHour) - get(startHour));
			return Math.round(hours * 2) * (HOUR_MS / 2);
		}
		/** Where a new thing lands on this day, or null when the day (or that hour
		*  of it) refuses it. `at` is the pointer's time into the day; without one
		*  (the keyboard) it is the first hour of the axis. One rule, so an
		*  empty-cell click and a drop from outside can never disagree. */
		function dayDropStart(ms, at = get(startHour) * HOUR_MS) {
			if (get(disabledSet).has(ms)) return null;
			const hour = at / HOUR_MS;
			if (get(blockedSlots)?.length) {
				const jsDay = new Date(ms).getDay();
				const isoDay = jsDay === 0 ? 7 : jsDay;
				if (get(blockedSlots).some((slot) => {
					if (slot.day && slot.day !== isoDay) return false;
					return hour >= slot.start && hour < slot.end;
				})) return null;
			}
			return new Date(atHour(ms, hour));
		}
		function handleDayCellClick(ms, e) {
			if (e.target.closest(".wg-ev, .wg-ad, .wg-ev-more")) return;
			if (readOnly() || !$$props.oneventcreate) return;
			const start = dayDropStart(ms, e instanceof MouseEvent ? pointerTime(e.currentTarget, e.clientY) : void 0);
			if (!start) return;
			const durMin = Math.max(60, get(minDuration) ?? 0);
			$$props.oneventcreate({
				start,
				end: new Date(start.getTime() + durMin * 6e4)
			});
		}
		let drop = /* @__PURE__ */ state(null);
		function onCellDragOver(e, ms) {
			if (!$$props.onexternaldrop || readOnly()) return;
			const at = pointerTime(e.currentTarget, e.clientY);
			if (!dayDropStart(ms, at)) {
				set(drop, null);
				return;
			}
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
			if (get(drop)?.day !== ms || get(drop).at !== at) set(drop, {
				day: ms,
				at
			}, true);
		}
		function onCellDragLeave(e, ms) {
			if (e.currentTarget.contains(e.relatedTarget)) return;
			if (get(drop)?.day === ms) set(drop, null);
		}
		function onCellDrop(e, ms) {
			set(drop, null);
			if (!$$props.onexternaldrop || readOnly() || !e.dataTransfer) return;
			const start = dayDropStart(ms, pointerTime(e.currentTarget, e.clientY));
			if (!start) return;
			e.preventDefault();
			$$props.onexternaldrop({
				start,
				dataTransfer: e.dataTransfer
			});
		}
		const DRAG_THRESHOLD = 8;
		let evDragStartX = 0;
		let evDragStartY = 0;
		let evDragStarted = false;
		let evDragging = /* @__PURE__ */ state(false);
		let evDragId = /* @__PURE__ */ state(null);
		let evDragEvent = null;
		/** The pressed chip's rect, caught before any re-render can move it. */
		let evAnchor;
		/** Whether THIS press may become a move (see onEventPointerDown). */
		let evDragMovable = false;
		let evLastX = 0;
		let evLastY = 0;
		let evCellW = 100;
		/** The week the press started in — rows differ in height, so the vertical
		*  step is the row under the pointer, found by hit-test, not by division.
		*  Held as a timestamp: an extension can renumber rows mid-drag. */
		let evStartWeekMs = 0;
		/** The day cell the press landed in; the drag moves the event by the days
		*  between it and the cell now under the pointer. */
		let evPressDayMs = 0;
		/** The grid runs right-to-left (`dir="rtl"`): a rightward drag goes back. */
		let evRtl = false;
		const dragPreviewEvent = /* @__PURE__ */ user_derived(() => {
			const payload = get(drag)?.active && get(drag).mode === "move" ? get(drag).payload : null;
			if (!payload?.eventId) return null;
			const ev = events().find((event) => event.id === payload.eventId);
			if (!ev) return null;
			return {
				...ev,
				start: payload.start,
				end: payload.end
			};
		});
		function isDraggedEvent(eventId) {
			return get(dragPreviewEvent)?.id === eventId;
		}
		function timedEventsForDay(day) {
			if (!get(dragPreviewEvent)) return day.events;
			return day.events.filter((ev) => ev.id !== get(dragPreviewEvent).id);
		}
		const previewKeySnapshot = /* @__PURE__ */ new Map();
		function dragPreviewTimedForDay(dayMs) {
			const ev = get(dragPreviewEvent);
			if (!ev || inAllDayStrip(ev)) return null;
			const dayEnd = addDaysMs(dayMs, 1);
			const hit = ev.start.getTime() >= dayMs && ev.start.getTime() < dayEnd;
			if (hit) previewKeySnapshot.set("timed", ev.id);
			return hit ? ev : null;
		}
		function dragPreviewSegmentForDay(dayMs) {
			const ev = get(dragPreviewEvent);
			if (!ev || !inAllDayStrip(ev)) return null;
			const seg = segmentForDay(ev, dayMs);
			if (seg) previewKeySnapshot.set(dayMs, `${ev.id}:${seg.dayIndex}`);
			return seg;
		}
		const CHIP_PAD_X = 12;
		const CHIP_GAP_X = 5;
		const fit = createChipFit({
			slot: ".wg-cell",
			fonts: {
				title: ".wg-probe .wg-ev-title",
				time: ".wg-probe .wg-ev-time",
				room: ".wg-probe .wg-ev-loc"
			}
		});
		/** A cell that carries a month label is this much narrower (.wg-cell--month). */
		const MONTH_INSET = 22;
		function chipParts(ev, inset = 0) {
			return fit.parts([
				{
					key: "time",
					text: fmtAmPm(ev.start),
					font: fit.fonts.time,
					priority: 0,
					extra: CHIP_GAP_X
				},
				{
					key: "title",
					text: ev.title,
					font: fit.fonts.title,
					priority: 0
				},
				{
					key: "room",
					text: ev.location ?? "",
					font: fit.fonts.room,
					priority: 1,
					extra: CHIP_GAP_X
				}
			], CHIP_PAD_X + inset);
		}
		function getCellWidth() {
			const cell = el?.querySelector(".wg-cell");
			return cell ? cell.getBoundingClientRect().width : 100;
		}
		/** The week row under this viewport Y, as its start timestamp. */
		function weekMsAtY(clientY) {
			const rows = el?.querySelectorAll("[data-week]");
			if (!rows?.length) return 0;
			for (const row of rows) if (clientY < row.getBoundingClientRect().bottom) return Number(row.dataset.week);
			return Number(rows[rows.length - 1].dataset.week);
		}
		function onEventPointerDown(e, ev) {
			if (e.button !== 0) return;
			e.stopPropagation();
			evAnchor = e.currentTarget.getBoundingClientRect();
			evDragMovable = !!get(drag) && !readOnly() && !ev.data?.readOnly;
			evDragStartX = e.clientX;
			evDragStartY = e.clientY;
			evLastX = e.clientX;
			evLastY = e.clientY;
			evDragStarted = false;
			set(evDragId, ev.id, true);
			evDragEvent = ev;
			const cellMs = Number(e.currentTarget.closest("[data-day]")?.dataset.day);
			evPressDayMs = Number.isFinite(cellMs) ? cellMs : sod(ev.start.getTime());
			window.addEventListener("pointermove", onEvWindowPointerMove);
			window.addEventListener("pointerup", onEvWindowPointerUp, { once: true });
			window.addEventListener("pointercancel", onEvWindowPointerCancel, { once: true });
		}
		/** The day `cols` rendered columns away from the press cell, in the row
		*  whose start is `rowMs`. Columns are counted over the days actually shown
		*  (hideDays leaves gaps in the dates, not in the columns); running off a
		*  row's end carries into the neighbouring row. */
		function dayAtColumn(rowMs, cols) {
			const startRow = get(weeks).findIndex((w) => w.weekStart === evStartWeekMs);
			let r = get(weeks).findIndex((w) => w.weekStart === rowMs);
			if (startRow < 0 || r < 0) return null;
			const pressCol = get(weeks)[startRow].days.findIndex((d) => d.ms === evPressDayMs);
			if (pressCol < 0) return null;
			let col = pressCol + cols;
			while (col < 0 && r > 0) {
				r--;
				col += get(weeks)[r].days.length;
			}
			while (col >= get(weeks)[r].days.length && r < get(weeks).length - 1) {
				col -= get(weeks)[r].days.length;
				r++;
			}
			const days = get(weeks)[r].days;
			if (!days.length) return null;
			return days[Math.max(0, Math.min(days.length - 1, col))].ms;
		}
		/** Where the dragged event sits for the pointer's current offset. */
		function updateDragFromPointer() {
			const ev = evDragEvent;
			if (!get(drag) || !ev) return;
			const dx = (evLastX - evDragStartX) * (evRtl ? -1 : 1);
			const colOffset = Math.round(dx / evCellW);
			const nowWeekMs = weekMsAtY(evLastY);
			const target = evStartWeekMs && nowWeekMs ? dayAtColumn(nowWeekMs, colOffset) : null;
			const deltaDays = target === null ? 0 : diffDays(target, evPressDayMs);
			get(drag).updatePointer(new Date(addDaysMs(ev.start.getTime(), deltaDays)), new Date(addDaysMs(ev.end.getTime(), deltaDays)));
		}
		const AUTO_EDGE = 56;
		const AUTO_STEP = 14;
		let autoDir = 0;
		let autoRaf = 0;
		function autoScrollTick() {
			autoRaf = 0;
			if (!autoDir || !el) return;
			const before = el.scrollTop;
			el.scrollTop += autoDir * AUTO_STEP;
			if (el.scrollTop !== before) updateDragFromPointer();
			autoRaf = requestAnimationFrame(autoScrollTick);
		}
		function setAutoScroll(clientY) {
			if (!el) return;
			const r = el.getBoundingClientRect();
			const dir = clientY < r.top + AUTO_EDGE ? -1 : clientY > r.bottom - AUTO_EDGE ? 1 : 0;
			if (dir === autoDir) return;
			autoDir = dir;
			if (dir && !autoRaf) autoRaf = requestAnimationFrame(autoScrollTick);
		}
		function stopAutoScroll() {
			autoDir = 0;
			if (autoRaf) cancelAnimationFrame(autoRaf);
			autoRaf = 0;
		}
		function onEvWindowPointerMove(e) {
			const ev = evDragEvent;
			if (!evDragMovable || !get(drag) || !ev || get(evDragId) !== ev.id) return;
			evLastX = e.clientX;
			evLastY = e.clientY;
			const dx = e.clientX - evDragStartX;
			const dy = e.clientY - evDragStartY;
			if (!evDragStarted && Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;
			if (!evDragStarted) {
				evDragStarted = true;
				set(evDragging, true);
				evCellW = getCellWidth();
				evStartWeekMs = weekMsAtY(evDragStartY);
				evRtl = !!el && getComputedStyle(el).direction === "rtl";
				get(drag).beginMove(ev.id, ev.start, ev.end);
			}
			setAutoScroll(e.clientY);
			updateDragFromPointer();
		}
		function cleanupEvDrag() {
			window.removeEventListener("pointermove", onEvWindowPointerMove);
			window.removeEventListener("pointerup", onEvWindowPointerUp);
			window.removeEventListener("pointercancel", onEvWindowPointerCancel);
			stopAutoScroll();
			evDragStarted = false;
			set(evDragging, false);
			set(evDragId, null);
			evDragEvent = null;
			evAnchor = void 0;
			evDragMovable = false;
			evStartWeekMs = 0;
			evPressDayMs = 0;
			evRtl = false;
		}
		function onEvWindowPointerUp() {
			if (!evDragStarted) {
				if (evDragEvent) $$props.oneventclick?.(evDragEvent, evAnchor);
			} else if (get(drag)) get(commitDragCtx)?.();
			cleanupEvDrag();
		}
		function onEvWindowPointerCancel() {
			if (get(drag) && evDragStarted) get(drag).cancel();
			cleanupEvDrag();
		}
		function onWindowKeydown(e) {
			if (e.key !== "Escape" || !get(drag)?.active) return;
			get(drag).cancel();
			cleanupEvDrag();
		}
		let expandedCells = proxy({});
		let focusedCellMs = /* @__PURE__ */ state(null);
		const tabbableCellMs = /* @__PURE__ */ user_derived(() => {
			let fallback = null;
			let anchorFirst = null;
			let focusedShown = false;
			let todayShown = false;
			for (const w of get(weeks)) {
				if (!w.days.length) continue;
				fallback ??= w.days[0].ms;
				if (w.weekStart === get(anchorPeriodStart)) anchorFirst = w.days[0].ms;
				for (const d of w.days) {
					if (d.ms === get(focusedCellMs)) focusedShown = true;
					if (d.ms === get(todayMs)) todayShown = true;
				}
			}
			if (focusedShown) return get(focusedCellMs);
			if (todayShown) return get(todayMs);
			return anchorFirst ?? fallback;
		});
		function onCellKeydown(e, ms) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handleDayCellClick(ms, e);
				return;
			}
			let step = 0;
			if (e.key === "ArrowRight") step = 1;
			else if (e.key === "ArrowLeft") step = -1;
			else if (e.key === "ArrowDown") step = get(customDays);
			else if (e.key === "ArrowUp") step = -get(customDays);
			if (step === 0) return;
			e.preventDefault();
			let target = addDaysMs(ms, step);
			for (let i = 0; i < 7; i++) {
				const cell = el?.querySelector(`[data-day="${target}"]`);
				if (cell) {
					set(focusedCellMs, target, true);
					cell.focus();
					cell.scrollIntoView({ block: "nearest" });
					return;
				}
				target = addDaysMs(target, step < 0 ? -1 : 1);
			}
		}
		var div = root_22$3();
		event("keydown", $window, onWindowKeydown);
		let classes;
		let styles;
		var div_1 = child(div);
		each(sibling(child(div_1), 2), 17, () => get(weeks), (week) => week.weekStart, ($$anchor, week) => {
			var div_2 = root_21$3();
			let classes_1;
			var div_3 = child(div_2);
			let classes_2;
			var text_5 = only_child(div_3, true);
			var div_4 = sibling(div_3, 2);
			var div_5 = child(div_4);
			each(div_5, 21, () => get(week).days, (day) => day.ms, ($$anchor, day) => {
				const visibleAllDaySegments = /* @__PURE__ */ user_derived(() => get(day).allDaySegments.filter((seg) => !isDraggedEvent(seg.ev.id)));
				const visibleTimedEvents = /* @__PURE__ */ user_derived(() => timedEventsForDay(get(day)));
				const isExpanded = /* @__PURE__ */ user_derived(() => expandedCells[get(day).ms] ?? false);
				const timedCap = /* @__PURE__ */ user_derived(() => Math.max(0, MAX_EVENTS_SHOWN - get(visibleAllDaySegments).length));
				const hiddenCount = /* @__PURE__ */ user_derived(() => Math.max(0, get(visibleTimedEvents).length - get(timedCap)));
				const previewTimedEvent = /* @__PURE__ */ user_derived(() => dragPreviewTimedForDay(get(day).ms));
				const previewSegment = /* @__PURE__ */ user_derived(() => dragPreviewSegmentForDay(get(day).ms));
				const shownTimed = /* @__PURE__ */ user_derived(() => get(visibleTimedEvents).slice(0, get(isExpanded) ? get(visibleTimedEvents).length : get(timedCap)));
				const axis = /* @__PURE__ */ user_derived(() => chipTops(get(shownTimed), get(day).ms, get(day).isToday));
				const tops = /* @__PURE__ */ user_derived(() => get(axis).tops);
				const nowY = /* @__PURE__ */ user_derived(() => get(axis).nowY);
				const inset = /* @__PURE__ */ user_derived(() => get(day).monthLabel ? MONTH_INSET : 0);
				var div_6 = root_20$3();
				let classes_3;
				var node_5 = child(div_6);
				var consequent_4 = ($$anchor) => {
					var div_7 = root_8$5();
					var text_6 = only_child(div_7, true);
					template_effect(() => set_text(text_6, get(day).monthLabel));
					append($$anchor, div_7);
				};
				if_block(node_5, ($$render) => {
					if (get(day).monthLabel) $$render(consequent_4);
				});
				var div_8 = sibling(node_5, 2);
				let classes_4;
				var span_6 = child(div_8);
				var text_7 = only_child(span_6, true);
				var node_6 = sibling(span_6, 2);
				var consequent_5 = ($$anchor) => {
					var span_7 = root_9$4();
					var text_8 = only_child(span_7, true);
					template_effect(($0) => set_text(text_8, $0), [() => fmtDayNum(get(day).ms, $$props.locale)]);
					append($$anchor, span_7);
				};
				if_block(node_6, ($$render) => {
					if (get(showDates)) $$render(consequent_5);
				});
				reset(div_8);
				var node_7 = sibling(div_8, 2);
				var consequent_6 = ($$anchor) => {
					var div_9 = root_10$4();
					var node_8 = child(div_9);
					{
						let $0 = /* @__PURE__ */ user_derived(() => ({
							date: new Date(get(day).ms),
							isToday: get(day).isToday,
							dayName: weekdayShort(get(day).ms, $$props.locale)
						}));
						snippet(node_8, () => get(dayHeaderSnippet), () => get($0));
					}
					reset(div_9);
					append($$anchor, div_9);
				};
				if_block(node_7, ($$render) => {
					if (get(dayHeaderSnippet)) $$render(consequent_6);
				});
				var div_10 = sibling(node_7, 2);
				var node_9 = child(div_10);
				var consequent_9 = ($$anchor) => {
					const jsDay = /* @__PURE__ */ user_derived(() => new Date(get(day).ms).getDay());
					const isoDay = /* @__PURE__ */ user_derived(() => get(jsDay) === 0 ? 7 : get(jsDay));
					var fragment_4 = comment();
					each(first_child(fragment_4), 17, () => get(blockedSlots), index, ($$anchor, slot) => {
						var fragment_5 = comment();
						var node_11 = first_child(fragment_5);
						var consequent_8 = ($$anchor) => {
							const slotRange = /* @__PURE__ */ user_derived(() => `${fmtTime$1(new Date(atHour(get(day).ms, get(slot).start)), $$props.locale)} – ${fmtTime$1(new Date(atHour(get(day).ms, get(slot).end)), $$props.locale)}`);
							const bandTop = /* @__PURE__ */ user_derived(() => timeTop(get(slot).start));
							const bandH = /* @__PURE__ */ user_derived(() => Math.max(14, timeTop(get(slot).end) - get(bandTop)));
							const covered = /* @__PURE__ */ user_derived(() => get(tops).some((t) => t < get(bandTop) + get(bandH) && t + CHIP_H > get(bandTop)));
							var div_11 = root_12$3();
							let styles_1;
							var node_12 = child(div_11);
							var consequent_7 = ($$anchor) => {
								var span_8 = root_11$3();
								var text_9 = only_child(span_8, true);
								template_effect(() => set_text(text_9, get(slot).label));
								append($$anchor, span_8);
							};
							if_block(node_12, ($$render) => {
								if (get(slot).label && !get(covered)) $$render(consequent_7);
							});
							reset(div_11);
							template_effect(() => {
								set_attribute(div_11, "title", `${get(slot).label ? `${get(slot).label}, ` : ""}${get(slotRange) ?? ""}`);
								set_attribute(div_11, "aria-label", `${(get(slot).label || get(L).unavailable) ?? ""}, ${get(slotRange) ?? ""}`);
								styles_1 = set_style(div_11, "", styles_1, {
									top: `${get(bandTop) ?? ""}px`,
									height: `${get(bandH) ?? ""}px`
								});
							});
							append($$anchor, div_11);
						};
						if_block(node_11, ($$render) => {
							if ((!get(slot).day || get(slot).day === get(isoDay)) && get(slot).end > get(startHour) && get(slot).start < get(endHour)) $$render(consequent_8);
						});
						append($$anchor, fragment_5);
					});
					append($$anchor, fragment_4);
				};
				if_block(node_9, ($$render) => {
					if (get(blockedSlots)?.length) $$render(consequent_9);
				});
				var node_13 = sibling(node_9, 2);
				each(node_13, 27, () => get(shownTimed), (ev) => ev.id, ($$anchor, ev, i) => {
					var div_12 = root_13$3();
					let classes_5;
					let styles_2;
					var node_14 = child(div_12);
					timedEventContent(node_14, () => get(ev), () => get(inset));
					reset(div_12);
					template_effect(($0, $1, $2, $3, $4) => {
						classes_5 = set_class(div_12, 1, "wg-ev svelte-l8xuza", null, classes_5, {
							"wg-ev--selected": selectedEventId() === get(ev).id,
							"wg-ev--current": $0,
							"wg-ev--dragging": get(evDragging) && get(evDragId) === get(ev).id,
							"wg-ev--readonly": get(ev).data?.readOnly,
							"wg-ev--cancelled": get(ev).status === "cancelled",
							"wg-ev--tentative": get(ev).status === "tentative",
							"wg-ev--full": get(ev).status === "full",
							"wg-ev--limited": get(ev).status === "limited"
						});
						set_attribute(div_12, "aria-label", `${get(ev).title ?? ""}, ${$1 ?? ""} – ${$2 ?? ""}${$3 ?? ""}${$4 ?? ""}`);
						styles_2 = set_style(div_12, "", styles_2, {
							"--ev-color": get(ev).color ?? "var(--dt-event, var(--dt-accent))",
							"margin-top": `${get(tops)[get(i)] - (get(i) ? get(tops)[get(i) - 1] + CHIP_H : 0)}px`
						});
					}, [
						() => get(ev).start.getTime() <= clock.tick && get(ev).end.getTime() > clock.tick,
						() => fmtAmPm(get(ev).start),
						() => fmtAmPm(get(ev).end),
						() => statusText(get(ev)),
						() => get(ev).start.getTime() <= clock.tick && get(ev).end.getTime() > clock.tick ? ` (${get(L).inProgress})` : ""
					]);
					delegated("pointerdown", div_12, (e) => onEventPointerDown(e, get(ev)));
					event("pointerenter", div_12, () => get(oneventhover)?.(get(ev)));
					delegated("keydown", div_12, (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							e.stopPropagation();
							$$props.oneventclick?.(get(ev), e.currentTarget.getBoundingClientRect());
						}
					});
					animation(div_12, () => flip, () => ({ duration: get(ANIM) }));
					transition(1, div_12, () => previewReceive, () => ({ key: get(ev).id }));
					transition(2, div_12, () => previewSend, () => ({ key: get(ev).id }));
					append($$anchor, div_12);
				});
				var node_15 = sibling(node_13, 2);
				var consequent_10 = ($$anchor) => {
					var button = root_14$3();
					let styles_3;
					var text_10 = only_child(button, true);
					template_effect(($0) => {
						set_attribute(button, "aria-expanded", get(isExpanded));
						styles_3 = set_style(button, "", styles_3, { "margin-top": `${get(axis).end - (get(tops).length ? get(tops)[get(tops).length - 1] + CHIP_H : 0) + 2}px` });
						set_text(text_10, $0);
					}, [() => get(isExpanded) ? get(L).showLess : get(L).nMore(get(hiddenCount))]);
					delegated("click", button, (e) => {
						e.stopPropagation();
						expandedCells[get(day).ms] = !get(isExpanded);
					});
					append($$anchor, button);
				};
				if_block(node_15, ($$render) => {
					if (get(hiddenCount) > 0) $$render(consequent_10);
				});
				var node_16 = sibling(node_15, 2);
				var consequent_11 = ($$anchor) => {
					var div_13 = root_15$3();
					let styles_4;
					var node_17 = child(div_13);
					timedEventContent(node_17, () => get(previewTimedEvent), () => get(inset));
					reset(div_13);
					template_effect(($0) => styles_4 = set_style(div_13, "", styles_4, {
						"--ev-color": get(previewTimedEvent).color ?? "var(--dt-event, var(--dt-accent))",
						top: $0
					}), [() => `${timeTop(hourOf(get(previewTimedEvent).start.getTime(), get(day).ms)) ?? ""}px`]);
					transition(1, div_13, () => previewReceive, () => ({ key: previewKeySnapshot.get("timed") ?? "" }));
					transition(2, div_13, () => previewSend, () => ({ key: previewKeySnapshot.get("timed") ?? "" }));
					append($$anchor, div_13);
				};
				if_block(node_16, ($$render) => {
					if (get(previewTimedEvent)) $$render(consequent_11);
				});
				var node_18 = sibling(node_16, 2);
				var consequent_12 = ($$anchor) => {
					var div_14 = root_16$3();
					let styles_5;
					var text_11 = only_child(child(div_14), true);
					reset(div_14);
					template_effect(($0, $1) => {
						styles_5 = set_style(div_14, "", styles_5, { top: $0 });
						set_text(text_11, $1);
					}, [() => `${timeTop(get(drop).at / HOUR_MS) + CHIP_H / 2}px`, () => fmtAmPm(new Date(atHour(get(day).ms, get(drop).at / HOUR_MS)))]);
					append($$anchor, div_14);
				};
				if_block(node_18, ($$render) => {
					if (get(drop)?.day === get(day).ms) $$render(consequent_12);
				});
				var node_19 = sibling(node_18, 2);
				var consequent_13 = ($$anchor) => {
					var div_15 = root_17$3();
					let styles_6;
					var text_12 = only_child(child(div_15), true);
					reset(div_15);
					template_effect(($0) => {
						styles_6 = set_style(div_15, "", styles_6, { top: `${get(nowY) ?? ""}px` });
						set_text(text_12, $0);
					}, [() => fmtAmPm(new Date(clock.tick))]);
					append($$anchor, div_15);
				};
				if_block(node_19, ($$render) => {
					if (get(nowY) !== null) $$render(consequent_13);
				});
				reset(div_10);
				var node_20 = sibling(div_10, 2);
				var consequent_15 = ($$anchor) => {
					var div_16 = root_19$3();
					var node_21 = child(div_16);
					each(node_21, 25, () => get(visibleAllDaySegments), (seg) => seg.ev.id, ($$anchor, seg) => {
						var div_17 = root_13$3();
						let classes_6;
						let styles_7;
						allDaySegmentContent(child(div_17), () => get(seg));
						reset(div_17);
						template_effect(($0) => {
							classes_6 = set_class(div_17, 1, "wg-ad svelte-l8xuza", null, classes_6, {
								"wg-ad--start": get(seg).isStart,
								"wg-ad--end": get(seg).isEnd,
								"wg-ad--mid": !get(seg).isStart && !get(seg).isEnd,
								"wg-ad--selected": selectedEventId() === get(seg).ev.id
							});
							set_attribute(div_17, "aria-label", `${get(seg).ev.title ?? ""}${$0 ?? ""}`);
							styles_7 = set_style(div_17, "", styles_7, { "--ev-color": get(seg).ev.color ?? "var(--dt-accent)" });
						}, [() => get(seg).totalDays > 1 ? `, ${get(L).dayNOfTotal(get(seg).dayIndex, get(seg).totalDays)}` : `, ${get(L).allDay}`]);
						delegated("pointerdown", div_17, (e) => onEventPointerDown(e, get(seg).ev));
						delegated("keydown", div_17, (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								e.stopPropagation();
								$$props.oneventclick?.(get(seg).ev, e.currentTarget.getBoundingClientRect());
							}
						});
						animation(div_17, () => flip, () => ({ duration: get(ANIM) }));
						transition(1, div_17, () => previewReceive, () => ({ key: `${get(seg).ev.id}:${get(seg).dayIndex}` }));
						transition(2, div_17, () => previewSend, () => ({ key: `${get(seg).ev.id}:${get(seg).dayIndex}` }));
						append($$anchor, div_17);
					});
					var node_23 = sibling(node_21, 2);
					var consequent_14 = ($$anchor) => {
						var div_18 = root_18$3();
						let classes_7;
						let styles_8;
						allDaySegmentContent(child(div_18), () => get(previewSegment));
						reset(div_18);
						template_effect(() => {
							classes_7 = set_class(div_18, 1, "wg-ad wg-ad--drag-preview svelte-l8xuza", null, classes_7, {
								"wg-ad--start": get(previewSegment).isStart,
								"wg-ad--end": get(previewSegment).isEnd,
								"wg-ad--mid": !get(previewSegment).isStart && !get(previewSegment).isEnd
							});
							styles_8 = set_style(div_18, "", styles_8, { "--ev-color": get(previewSegment).ev.color ?? "var(--dt-accent)" });
						});
						transition(1, div_18, () => previewReceive, () => ({ key: previewKeySnapshot.get(get(day).ms) ?? "" }));
						transition(2, div_18, () => previewSend, () => ({ key: previewKeySnapshot.get(get(day).ms) ?? "" }));
						append($$anchor, div_18);
					};
					if_block(node_23, ($$render) => {
						if (get(previewSegment)) $$render(consequent_14);
					});
					reset(div_16);
					append($$anchor, div_16);
				};
				if_block(node_20, ($$render) => {
					if (get(visibleAllDaySegments).length > 0 || get(previewSegment)) $$render(consequent_15);
				});
				reset(div_6);
				template_effect(($0, $1, $2, $3, $4) => {
					classes_3 = set_class(div_6, 1, "wg-cell svelte-l8xuza", null, classes_3, {
						"wg-cell--month": !!get(day).monthLabel,
						"wg-cell--today": get(day).isToday,
						"wg-cell--past": get(day).isPast,
						"wg-cell--weekend": get(day).isWeekend,
						"wg-cell--disabled": $0,
						"wg-cell--expanded": get(isExpanded),
						"wg-cell--drop": get(drop)?.day === get(day).ms
					});
					set_attribute(div_6, "data-day", get(day).ms);
					set_attribute(div_6, "tabindex", get(day).ms === get(tabbableCellMs) ? 0 : -1);
					set_attribute(div_6, "aria-label", `${$1 ?? ""}${$2 ?? ""}, ${$3 ?? ""}`);
					classes_4 = set_class(div_8, 1, "wg-cell-hd svelte-l8xuza", null, classes_4, { "wg-cell-hd--today": get(day).isToday });
					set_text(text_7, $4);
				}, [
					() => get(disabledSet).has(get(day).ms),
					() => new Date(get(day).ms).toLocaleDateString($$props.locale ?? "en-US", {
						weekday: "long",
						month: "short",
						day: "numeric"
					}),
					() => get(day).isToday ? ` (${get(L).today.toLowerCase()})` : "",
					() => get(L).nEvents(get(day).events.length + get(day).allDaySegments.length),
					() => weekdayShort(get(day).ms, $$props.locale)
				]);
				delegated("click", div_6, (e) => handleDayCellClick(get(day).ms, e));
				event("dragover", div_6, (e) => onCellDragOver(e, get(day).ms));
				event("dragleave", div_6, (e) => onCellDragLeave(e, get(day).ms));
				event("drop", div_6, (e) => onCellDrop(e, get(day).ms));
				event("focus", div_6, () => {
					set(focusedCellMs, get(day).ms, true);
				});
				delegated("keydown", div_6, (e) => onCellKeydown(e, get(day).ms));
				append($$anchor, div_6);
			});
			reset(div_5);
			reset(div_4);
			reset(div_2);
			template_effect(() => {
				classes_1 = set_class(div_2, 1, "wg-week svelte-l8xuza", null, classes_1, { "wg-week--current": get(week).isCurrent });
				set_attribute(div_2, "data-week", get(week).weekStart);
				classes_2 = set_class(div_3, 1, "wg-month svelte-l8xuza", null, classes_2, { "wg-month--start": get(week).monthStart });
				set_text(text_5, get(week).monthLabel);
			});
			append($$anchor, div_2);
		});
		reset(div_1);
		bind_this(div_1, ($$value) => el = $$value, () => el);
		attach(div_1, () => fit.watch);
		attach(div_1, () => watchTouch);
		reset(div);
		template_effect(() => {
			classes = set_class(div, 1, "wg svelte-l8xuza", null, classes, { "wg--auto": get(autoHeight) });
			styles = set_style(div, style() || void 0, styles, {
				height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%",
				"--wg-time-h": "120px",
				"--wg-month-inset": "22px",
				"--wg-chip-h": "22px",
				"--wg-chip-gap": "3px",
				"--wg-row-margin": "12px"
			});
			set_attribute(div_1, "aria-label", get(L).multiWeekGrid);
		});
		event("scroll", div_1, handleUserScroll);
		append($$anchor, div);
		pop();
	}
	delegate([
		"click",
		"keydown",
		"pointerdown"
	]);
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
				if (e.touches.length > 1) {
					abandon();
					return;
				}
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
				if (e.touches.length > 1 || cb.disabled?.()) {
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
	// src/lib/views/agenda/AgendaDay.svelte
	var root$4 = /* @__PURE__ */ from_html(`<span class="ag-day-head-badge svelte-n8lbn1"> </span>`);
	var root_1$5 = /* @__PURE__ */ from_html(`<span class="ag-day-head-badge ag-day-head-badge--muted svelte-n8lbn1"> </span>`);
	var root_2$5 = /* @__PURE__ */ from_html(`<div><span class="ag-day-head-num svelte-n8lbn1"> </span> <!> <span class="ag-day-head-name svelte-n8lbn1"> </span> <span class="ag-day-head-date svelte-n8lbn1"> </span></div>`);
	var root_3$5 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-allday-dot svelte-n8lbn1"></span> <span class="ag-allday-title svelte-n8lbn1"> </span></button>`);
	var root_4$5 = /* @__PURE__ */ from_html(`<div class="ag-allday svelte-n8lbn1"><div class="ag-allday-label svelte-n8lbn1"> </div> <div class="ag-allday-items svelte-n8lbn1"></div></div>`);
	var root_5$5 = /* @__PURE__ */ from_html(`<div class="ag-q-empty svelte-n8lbn1"><!></div>`);
	var root_6$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-sub svelte-n8lbn1"> </span>`);
	var root_7$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-tag svelte-n8lbn1"> </span>`);
	var root_8$4 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-time svelte-n8lbn1"> </span> <div class="ag-compact-row-main svelte-n8lbn1"><span class="ag-compact-row-title svelte-n8lbn1"> </span> <!> <!></div> <span class="ag-compact-row-dur svelte-n8lbn1"> </span>`, 1);
	var root_9$3 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
	var root_10$3 = /* @__PURE__ */ from_html(`<div class="ag-compact-list svelte-n8lbn1"><!></div>`);
	var root_11$2 = /* @__PURE__ */ from_html(`<div class="ag-q-now-sub svelte-n8lbn1"> </div>`);
	var root_12$2 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-q-now-dot svelte-n8lbn1"></div> <div class="ag-q-now-title svelte-n8lbn1"> </div> <!> <div class="ag-q-now-time svelte-n8lbn1"> </div> <div class="ag-q-now-track svelte-n8lbn1"><div class="ag-q-now-fill svelte-n8lbn1"></div></div></button>`);
	var root_13$2 = /* @__PURE__ */ from_html(`<div class="ag-q-free svelte-n8lbn1"><div class="ag-q-free-label svelte-n8lbn1"> </div></div>`);
	var root_14$2 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-q-done-check svelte-n8lbn1" aria-hidden="true">✓</span> <span class="ag-q-done-title svelte-n8lbn1"> </span></button>`);
	var root_15$2 = /* @__PURE__ */ from_html(`<button type="button" class="ag-q-done-toggle svelte-n8lbn1"> </button>`);
	var root_16$2 = /* @__PURE__ */ from_html(`<div class="ag-q-done-section svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> </div> <!> <!></div>`);
	var root_17$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-time svelte-n8lbn1"> </span> <div class="ag-compact-row-main svelte-n8lbn1"><span class="ag-compact-row-title svelte-n8lbn1"> </span> <!></div>`, 1);
	var root_18$2 = /* @__PURE__ */ from_html(`<span class="ag-card-sub svelte-n8lbn1"> </span>`);
	var root_19$2 = /* @__PURE__ */ from_html(`<span class="ag-card-tag svelte-n8lbn1"> </span>`);
	var root_20$2 = /* @__PURE__ */ from_html(`<div class="ag-card-tags svelte-n8lbn1"></div>`);
	var root_21$2 = /* @__PURE__ */ from_html(`<div class="ag-card-top svelte-n8lbn1"><span class="ag-card-title svelte-n8lbn1"> </span> <span class="ag-card-eta svelte-n8lbn1"> </span></div> <div class="ag-card-meta svelte-n8lbn1"> <span class="ag-card-dur svelte-n8lbn1"> </span></div> <!> <!>`, 1);
	var root_22$2 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-card-body svelte-n8lbn1"><!></div></button>`);
	var root_23$2 = /* @__PURE__ */ from_html(`<div class="ag-q svelte-n8lbn1"><div class="ag-q-status svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> <span class="ag-q-clock svelte-n8lbn1"> </span></div> <!> <!></div> <div class="ag-q-queue svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> </div> <!></div></div>`);
	var root_24$1 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-log-check svelte-n8lbn1" aria-hidden="true">✓</span> <span class="ag-log-time svelte-n8lbn1"> </span> <span class="ag-log-dot svelte-n8lbn1"></span> <span class="ag-log-title svelte-n8lbn1"> </span> <span class="ag-log-dur svelte-n8lbn1"> </span></button>`);
	var root_25$1 = /* @__PURE__ */ from_html(`<div class="ag-log svelte-n8lbn1"><!></div>`);
	var root_26$1 = /* @__PURE__ */ from_html(`<span class="ag-card-loc svelte-n8lbn1"> </span>`);
	var root_27$1 = /* @__PURE__ */ from_html(`<div class="ag-card-top svelte-n8lbn1"><span class="ag-card-order svelte-n8lbn1"> </span> <span class="ag-card-title svelte-n8lbn1"> </span></div> <div class="ag-card-meta svelte-n8lbn1"> <span class="ag-card-dur svelte-n8lbn1"> </span></div> <!> <!> <!>`, 1);
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
		const swipe = createSwipe({
			disabled: () => !get(isMobile),
			onmove: () => {},
			onend: (dir) => {
				if (dir > 0) get(viewState)?.prev();
				else if (dir < 0) get(viewState)?.next();
			}
		});
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		/** All-day events and timed ones at least a (wall-clock) day long go to
		*  the all-day strip; a shorter overnight event is listed with its time. */
		function inAllDayStrip(ev) {
			return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
		}
		const fmt = (d) => fmtTime(d, $$props.locale);
		const eta = (ms) => timeUntilMs(ms, clock.tick, get(L));
		const prog = (ev) => progress(ev, clock.tick);
		function handleClick(ev) {
			$$props.oneventclick?.(ev);
		}
		const dayMs = /* @__PURE__ */ user_derived(() => $$props.focusDate ? sod($$props.focusDate.getTime()) : clock.today);
		const dayEnd = /* @__PURE__ */ user_derived(() => addDaysMs(get(dayMs), 1));
		const isToday = /* @__PURE__ */ user_derived(() => get(dayMs) === clock.today);
		const isTomorrow = /* @__PURE__ */ user_derived(() => get(dayMs) === addDaysMs(clock.today, 1));
		const isPastDay = /* @__PURE__ */ user_derived(() => get(equalDays) ? false : get(dayMs) < clock.today);
		/** All events for this day, sorted chronologically */
		const dayEvents = /* @__PURE__ */ user_derived(() => {
			return events().filter((ev) => ev.start.getTime() < get(dayEnd) && ev.end.getTime() > get(dayMs)).sort((a, b) => a.start.getTime() - b.start.getTime());
		});
		/** All-day / multi-day events shown in a separate strip */
		const allDayBanner = /* @__PURE__ */ user_derived(() => get(dayEvents).filter(inAllDayStrip));
		/** Timed events (non-all-day) for normal slot rendering */
		const timedDayEvents = /* @__PURE__ */ user_derived(() => get(dayEvents).filter((ev) => !inAllDayStrip(ev)));
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
			let classes_1;
			var span = child(div_2);
			var text = only_child(span, true);
			var node_1 = sibling(span, 2);
			var consequent = ($$anchor) => {
				var span_1 = root$4();
				var text_1 = only_child(span_1, true);
				template_effect(() => set_text(text_1, get(L).today));
				append($$anchor, span_1);
			};
			var consequent_1 = ($$anchor) => {
				var span_2 = root_1$5();
				var text_2 = only_child(span_2, true);
				template_effect(() => set_text(text_2, get(L).tomorrow));
				append($$anchor, span_2);
			};
			if_block(node_1, ($$render) => {
				if (!get(equalDays) && get(isToday)) $$render(consequent);
				else if (!get(equalDays) && get(isTomorrow)) $$render(consequent_1, 1);
			});
			var span_3 = sibling(node_1, 2);
			var text_3 = only_child(span_3, true);
			var text_4 = only_child(sibling(span_3, 2), true);
			reset(div_2);
			template_effect(($0, $1, $2) => {
				classes_1 = set_class(div_2, 1, "ag-day-head svelte-n8lbn1", null, classes_1, { "ag-day-head--today": !get(equalDays) && get(isToday) });
				set_text(text, $0);
				set_text(text_3, $1);
				set_text(text_4, $2);
			}, [
				() => fmtDayNum(get(dayMs), $$props.locale),
				() => weekdayLong(get(dayMs), $$props.locale),
				() => monthLong(get(dayMs), $$props.locale)
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
			var text_5 = only_child(div_4, true);
			var div_5 = sibling(div_4, 2);
			each(div_5, 21, () => get(allDayBanner), (ev) => ev.id, ($$anchor, ev) => {
				var button = root_3$5();
				let classes_2;
				let styles_1;
				var text_6 = only_child(sibling(child(button), 2), true);
				reset(button);
				template_effect(($0) => {
					classes_2 = set_class(button, 1, "ag-allday-chip svelte-n8lbn1", null, classes_2, { "ag-allday-chip--selected": selectedEventId() === get(ev).id });
					set_attribute(button, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}, ${get(L).allDay ?? ""}`);
					styles_1 = set_style(button, "", styles_1, { "--ev-color": get(ev).color || "var(--dt-accent)" });
					set_text(text_6, get(ev).title);
				}, [() => statusText(get(ev))]);
				delegated("click", button, () => handleClick(get(ev)));
				event("pointerenter", button, () => get(oneventhover)?.(get(ev)));
				append($$anchor, button);
			});
			reset(div_5);
			reset(div_3);
			template_effect(() => set_text(text_5, get(L).allDay));
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
					var text_7 = text();
					template_effect(() => set_text(text_7, get(L).nothingScheduledYet));
					append($$anchor, text_7);
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
					let classes_3;
					let styles_2;
					EventContent(child(button_1), {
						get event() {
							return get(ev);
						},
						children: ($$anchor, $$slotProps) => {
							var fragment_3 = root_8$4();
							var span_6 = first_child(fragment_3);
							var text_8 = only_child(span_6, true);
							var div_8 = sibling(span_6, 2);
							var span_7 = child(div_8);
							var text_9 = only_child(span_7, true);
							var node_9 = sibling(span_7, 2);
							var consequent_6 = ($$anchor) => {
								var span_8 = root_6$5();
								var text_10 = only_child(span_8, true);
								template_effect(() => set_text(text_10, get(ev).subtitle));
								append($$anchor, span_8);
							};
							if_block(node_9, ($$render) => {
								if (get(ev).subtitle) $$render(consequent_6);
							});
							var node_10 = sibling(node_9, 2);
							var consequent_7 = ($$anchor) => {
								var fragment_4 = comment();
								each(first_child(fragment_4), 17, () => get(ev).tags, index, ($$anchor, tag) => {
									var span_9 = root_7$5();
									var text_11 = only_child(span_9, true);
									template_effect(() => set_text(text_11, get(tag)));
									append($$anchor, span_9);
								});
								append($$anchor, fragment_4);
							};
							if_block(node_10, ($$render) => {
								if (get(ev).tags?.length) $$render(consequent_7);
							});
							reset(div_8);
							var text_12 = only_child(sibling(div_8, 2), true);
							template_effect(($0, $1) => {
								set_text(text_8, $0);
								set_text(text_9, get(ev).title);
								set_text(text_12, $1);
							}, [() => fmt(get(ev).start), () => duration(get(ev))]);
							append($$anchor, fragment_3);
						},
						$$slots: { default: true }
					});
					reset(button_1);
					template_effect(($0, $1, $2) => {
						classes_3 = set_class(button_1, 1, "ag-compact-row svelte-n8lbn1", null, classes_3, {
							"ag-compact-row--selected": selectedEventId() === get(ev).id,
							"ag-compact-row--cancelled": get(ev).status === "cancelled",
							"ag-compact-row--tentative": get(ev).status === "tentative"
						});
						set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}, ${$1 ?? ""}, ${$2 ?? ""}`);
						styles_2 = set_style(button_1, "", styles_2, { "--ev-color": get(ev).color || "var(--dt-event, var(--dt-accent))" });
					}, [
						() => statusText(get(ev)),
						() => fmt(get(ev).start),
						() => duration(get(ev))
					]);
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
			var div_9 = root_23$2();
			var div_10 = child(div_9);
			var div_11 = child(div_10);
			var text_13 = child(div_11);
			var text_14 = only_child(sibling(text_13), true);
			reset(div_11);
			var node_12 = sibling(div_11, 2);
			var consequent_10 = ($$anchor) => {
				var fragment_5 = comment();
				each(first_child(fragment_5), 17, () => get(dayCat).current, (ev) => ev.id, ($$anchor, ev) => {
					var button_2 = root_12$2();
					let classes_4;
					let styles_3;
					var div_12 = sibling(child(button_2), 2);
					var text_15 = only_child(div_12, true);
					var node_14 = sibling(div_12, 2);
					var consequent_9 = ($$anchor) => {
						var div_13 = root_11$2();
						var text_16 = only_child(div_13, true);
						template_effect(() => set_text(text_16, get(ev).subtitle));
						append($$anchor, div_13);
					};
					if_block(node_14, ($$render) => {
						if (get(ev).subtitle) $$render(consequent_9);
					});
					var div_14 = sibling(node_14, 2);
					var text_17 = only_child(div_14);
					var div_15 = sibling(div_14, 2);
					var div_16 = child(div_15);
					let styles_4;
					reset(div_15);
					reset(button_2);
					template_effect(($0, $1, $2) => {
						classes_4 = set_class(button_2, 1, "ag-q-now svelte-n8lbn1", null, classes_4, { "ag-q-now--selected": selectedEventId() === get(ev).id });
						set_attribute(button_2, "aria-label", `${get(ev).title ?? ""}, ${get(L).happeningNow ?? ""}, ${$0 ?? ""}`);
						styles_3 = set_style(button_2, "", styles_3, { "--ev-color": get(ev).color || "var(--dt-event, var(--dt-accent))" });
						set_text(text_15, get(ev).title);
						set_text(text_17, `${get(L).until ?? ""} ${$1 ?? ""}`);
						styles_4 = set_style(div_16, "", styles_4, { transform: $2 });
					}, [
						() => get(L).percentComplete(Math.round(prog(get(ev)) * 100)),
						() => fmt(get(ev).end),
						() => `scaleX(${prog(get(ev)) ?? ""})`
					]);
					delegated("click", button_2, () => handleClick(get(ev)));
					event("pointerenter", button_2, () => get(oneventhover)?.(get(ev)));
					append($$anchor, button_2);
				});
				append($$anchor, fragment_5);
			};
			var alternate_2 = ($$anchor) => {
				var div_17 = root_13$2();
				var text_18 = only_child(child(div_17), true);
				reset(div_17);
				template_effect(() => set_text(text_18, get(L).free));
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
				var text_19 = only_child(div_20, true);
				var node_16 = sibling(div_20, 2);
				each(node_16, 17, () => get(visibleDone), (ev) => ev.id, ($$anchor, ev) => {
					var button_3 = root_14$2();
					let classes_5;
					var text_20 = only_child(sibling(child(button_3), 2), true);
					reset(button_3);
					template_effect(($0) => {
						classes_5 = set_class(button_3, 1, "ag-q-done-item svelte-n8lbn1", null, classes_5, { "ag-q-done-item--selected": selectedEventId() === get(ev).id });
						set_attribute(button_3, "aria-label", `${get(ev).title ?? ""}, ${get(L).completed ?? ""}, ${$0 ?? ""}`);
						set_text(text_20, get(ev).title);
					}, [() => fmt(get(ev).start)]);
					delegated("click", button_3, () => handleClick(get(ev)));
					append($$anchor, button_3);
				});
				var node_17 = sibling(node_16, 2);
				var consequent_11 = ($$anchor) => {
					var button_4 = root_15$2();
					var text_21 = only_child(button_4, true);
					template_effect(($0) => set_text(text_21, $0), [() => get(showAllDone) ? get(L).showLess : get(L).nCompleted(get(hiddenDoneCount))]);
					delegated("click", button_4, () => set(showAllDone, !get(showAllDone)));
					append($$anchor, button_4);
				};
				if_block(node_17, ($$render) => {
					if (get(hiddenDoneCount) > 0) $$render(consequent_11);
				});
				reset(div_19);
				template_effect(() => set_text(text_19, get(L).done));
				append($$anchor, div_19);
			};
			if_block(node_15, ($$render) => {
				if (get(dayCat).past.length > 0) $$render(consequent_12);
			});
			reset(div_10);
			var div_21 = sibling(div_10, 2);
			var div_22 = child(div_21);
			var text_22 = only_child(div_22, true);
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
					var text_23 = text();
					template_effect(() => set_text(text_23, get(dayCat).past.length > 0 ? get(L).allDoneForToday : get(L).nothingScheduled));
					append($$anchor, text_23);
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
						let classes_6;
						let styles_5;
						EventContent(child(button_5), {
							get event() {
								return get(ev);
							},
							children: ($$anchor, $$slotProps) => {
								var fragment_10 = root_17$2();
								var span_13 = first_child(fragment_10);
								var text_24 = only_child(span_13, true);
								var div_24 = sibling(span_13, 2);
								var span_14 = child(div_24);
								var text_25 = only_child(span_14, true);
								var node_24 = sibling(span_14, 2);
								var consequent_15 = ($$anchor) => {
									var span_15 = root_6$5();
									var text_26 = only_child(span_15, true);
									template_effect(() => set_text(text_26, get(ev).subtitle));
									append($$anchor, span_15);
								};
								if_block(node_24, ($$render) => {
									if (get(ev).subtitle) $$render(consequent_15);
								});
								reset(div_24);
								template_effect(($0) => {
									set_text(text_24, $0);
									set_text(text_25, get(ev).title);
								}, [() => fmt(get(ev).start)]);
								append($$anchor, fragment_10);
							},
							$$slots: { default: true }
						});
						reset(button_5);
						template_effect(($0, $1, $2) => {
							classes_6 = set_class(button_5, 1, "ag-compact-row ag-compact-row--queue svelte-n8lbn1", null, classes_6, { "ag-compact-row--selected": selectedEventId() === get(ev).id });
							set_attribute(button_5, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}, ${$1 ?? ""}, ${$2 ?? ""}`);
							styles_5 = set_style(button_5, "", styles_5, { "--ev-color": get(ev).color || "var(--dt-event, var(--dt-accent))" });
						}, [
							() => statusText(get(ev)),
							() => fmt(get(ev).start),
							() => duration(get(ev))
						]);
						delegated("click", button_5, () => handleClick(get(ev)));
						event("pointerenter", button_5, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_5);
					};
					var alternate_4 = ($$anchor) => {
						var button_6 = root_22$2();
						let classes_7;
						let styles_6;
						var div_25 = child(button_6);
						EventContent(child(div_25), {
							get event() {
								return get(ev);
							},
							children: ($$anchor, $$slotProps) => {
								var fragment_11 = root_21$2();
								var div_26 = first_child(fragment_11);
								var span_16 = child(div_26);
								var text_27 = only_child(span_16, true);
								var text_28 = only_child(sibling(span_16, 2), true);
								reset(div_26);
								var div_27 = sibling(div_26, 2);
								var text_29 = child(div_27);
								var text_30 = only_child(sibling(text_29), true);
								reset(div_27);
								var node_26 = sibling(div_27, 2);
								var consequent_17 = ($$anchor) => {
									var span_19 = root_18$2();
									var text_31 = only_child(span_19, true);
									template_effect(() => set_text(text_31, get(ev).subtitle));
									append($$anchor, span_19);
								};
								if_block(node_26, ($$render) => {
									if (get(ev).subtitle) $$render(consequent_17);
								});
								var node_27 = sibling(node_26, 2);
								var consequent_18 = ($$anchor) => {
									var div_28 = root_20$2();
									each(div_28, 21, () => get(ev).tags, index, ($$anchor, tag) => {
										var span_20 = root_19$2();
										var text_32 = only_child(span_20, true);
										template_effect(() => set_text(text_32, get(tag)));
										append($$anchor, span_20);
									});
									reset(div_28);
									append($$anchor, div_28);
								};
								if_block(node_27, ($$render) => {
									if (get(ev).tags?.length) $$render(consequent_18);
								});
								template_effect(($0, $1, $2, $3) => {
									set_text(text_27, get(ev).title);
									set_text(text_28, $0);
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
						template_effect(($0, $1, $2) => {
							classes_7 = set_class(button_6, 1, "ag-card ag-card--q svelte-n8lbn1", null, classes_7, {
								"ag-card--hero": get(i) === 0,
								"ag-card--selected": selectedEventId() === get(ev).id
							});
							set_attribute(button_6, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}, ${$1 ?? ""}, ${$2 ?? ""}`);
							styles_6 = set_style(button_6, "", styles_6, { "--ev-color": get(ev).color || "var(--dt-event, var(--dt-accent))" });
						}, [
							() => statusText(get(ev)),
							() => fmt(get(ev).start),
							() => duration(get(ev))
						]);
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
				set_text(text_13, `${get(L).now ?? ""} `);
				set_text(text_14, clock.hm);
				set_text(text_22, get(L).upNext);
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
					var text_33 = text();
					template_effect(() => set_text(text_33, get(L).nothingWasScheduled));
					append($$anchor, text_33);
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
					let classes_8;
					let styles_7;
					var span_21 = sibling(child(button_7), 2);
					var text_34 = only_child(span_21, true);
					var span_22 = sibling(span_21, 2);
					let styles_8;
					var span_23 = sibling(span_22, 2);
					var text_35 = only_child(span_23, true);
					var text_36 = only_child(sibling(span_23, 2), true);
					reset(button_7);
					template_effect(($0, $1, $2, $3, $4) => {
						classes_8 = set_class(button_7, 1, "ag-log-row svelte-n8lbn1", null, classes_8, {
							"ag-log-row--selected": selectedEventId() === get(ev).id,
							"ag-log-row--cancelled": get(ev).status === "cancelled"
						});
						set_attribute(button_7, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}, ${$1 ?? ""} – ${$2 ?? ""}`);
						styles_7 = set_style(button_7, "", styles_7, { "--ev-color": get(ev).color || "var(--dt-event, var(--dt-accent))" });
						set_text(text_34, $3);
						styles_8 = set_style(span_22, "", styles_8, { background: get(ev).color || "var(--dt-event, var(--dt-accent))" });
						set_text(text_35, get(ev).title);
						set_text(text_36, $4);
					}, [
						() => statusText(get(ev)),
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
					var text_37 = text();
					template_effect(() => set_text(text_37, get(L).nothingScheduledYet));
					append($$anchor, text_37);
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
					var button_8 = root_22$2();
					let classes_9;
					let styles_9;
					var div_33 = child(button_8);
					EventContent(child(div_33), {
						get event() {
							return get(ev);
						},
						children: ($$anchor, $$slotProps) => {
							var fragment_18 = root_27$1();
							var div_34 = first_child(fragment_18);
							var span_25 = child(div_34);
							var text_38 = only_child(span_25, true);
							var text_39 = only_child(sibling(span_25, 2), true);
							reset(div_34);
							var div_35 = sibling(div_34, 2);
							var text_40 = child(div_35);
							var text_41 = only_child(sibling(text_40), true);
							reset(div_35);
							var node_37 = sibling(div_35, 2);
							var consequent_25 = ($$anchor) => {
								var span_28 = root_18$2();
								var text_42 = only_child(span_28, true);
								template_effect(() => set_text(text_42, get(ev).subtitle));
								append($$anchor, span_28);
							};
							if_block(node_37, ($$render) => {
								if (get(ev).subtitle) $$render(consequent_25);
							});
							var node_38 = sibling(node_37, 2);
							var consequent_26 = ($$anchor) => {
								var span_29 = root_26$1();
								var text_43 = only_child(span_29, true);
								template_effect(() => set_text(text_43, get(ev).location));
								append($$anchor, span_29);
							};
							if_block(node_38, ($$render) => {
								if (get(ev).location) $$render(consequent_26);
							});
							var node_39 = sibling(node_38, 2);
							var consequent_27 = ($$anchor) => {
								var div_36 = root_20$2();
								each(div_36, 21, () => get(ev).tags, index, ($$anchor, tag) => {
									var span_30 = root_19$2();
									var text_44 = only_child(span_30, true);
									template_effect(() => set_text(text_44, get(tag)));
									append($$anchor, span_30);
								});
								reset(div_36);
								append($$anchor, div_36);
							};
							if_block(node_39, ($$render) => {
								if (get(ev).tags?.length) $$render(consequent_27);
							});
							template_effect(($0, $1, $2) => {
								set_text(text_38, get(i) + 1);
								set_text(text_39, get(ev).title);
								set_text(text_40, `${$0 ?? ""} – ${$1 ?? ""} `);
								set_text(text_41, $2);
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
					template_effect(($0, $1, $2, $3) => {
						classes_9 = set_class(button_8, 1, "ag-card ag-card--plan svelte-n8lbn1", null, classes_9, {
							"ag-card--first": get(i) === 0,
							"ag-card--selected": selectedEventId() === get(ev).id,
							"ag-card--cancelled": get(ev).status === "cancelled",
							"ag-card--tentative": get(ev).status === "tentative",
							"ag-card--full": get(ev).status === "full",
							"ag-card--limited": get(ev).status === "limited"
						});
						set_attribute(button_8, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}, ${$1 ?? ""} – ${$2 ?? ""}, ${$3 ?? ""}`);
						styles_9 = set_style(button_8, "", styles_9, { "--ev-color": get(ev).color || "var(--dt-event, var(--dt-accent))" });
					}, [
						() => statusText(get(ev)),
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
			classes = set_class(div, 1, "ag ag--day svelte-n8lbn1", null, classes, {
				"ag--disabled": $0,
				"ag--mobile": get(isMobile),
				"ag--auto": get(autoHeight)
			});
			styles = set_style(div, style() || void 0, styles, { height: $$props.height ? `${$$props.height}px` : void 0 });
			set_attribute(div_1, "aria-label", get(L).todaysLineup);
		}, [() => get(disabledSet).has(get(dayMs))]);
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
		"click"
	]);
	// src/lib/views/agenda/AgendaWeek.svelte
	var root$3 = /* @__PURE__ */ from_html(`<span class="ag-card-eta svelte-uhwfyj"> </span>`);
	var root_1$4 = /* @__PURE__ */ from_html(`<span class="ag-card-sub svelte-uhwfyj"> </span>`);
	var root_2$4 = /* @__PURE__ */ from_html(`<span class="ag-card-loc svelte-uhwfyj"> </span>`);
	var root_3$4 = /* @__PURE__ */ from_html(`<span class="ag-card-tag svelte-uhwfyj"> </span>`);
	var root_4$4 = /* @__PURE__ */ from_html(`<div class="ag-card-tags svelte-uhwfyj"></div>`);
	var root_5$4 = /* @__PURE__ */ from_html(`<span class="ag-card-title svelte-uhwfyj"> </span> <span class="ag-card-meta svelte-uhwfyj"><!> <span class="ag-card-dur svelte-uhwfyj"> </span> <!></span> <!> <!> <!>`, 1);
	var root_6$4 = /* @__PURE__ */ from_html(`<div class="ag-card-progress svelte-uhwfyj"><div class="ag-card-progress-fill svelte-uhwfyj"></div></div>`);
	var root_7$4 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-card-body svelte-uhwfyj"><!> <!></div></button>`);
	var root_8$3 = /* @__PURE__ */ from_html(`<span class="ag-compact-loc svelte-uhwfyj"> </span>`);
	var root_9$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-sub svelte-uhwfyj"> </span>`);
	var root_10$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-tag svelte-uhwfyj"> </span>`);
	var root_11$1 = /* @__PURE__ */ from_html(`<span class="ag-compact-time svelte-uhwfyj"> </span> <div class="ag-compact-main svelte-uhwfyj"><span class="ag-compact-title svelte-uhwfyj"> </span> <!> <!> <!></div> <span class="ag-compact-dur svelte-uhwfyj"> </span>`, 1);
	var root_12$1 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
	var root_13$1 = /* @__PURE__ */ from_html(`<button type="button"> <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button>`);
	var root_14$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-num svelte-uhwfyj"> </span>`);
	var root_15$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-date svelte-uhwfyj"> </span>`);
	var root_16$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-custom-header svelte-uhwfyj"><!></div>`);
	var root_17$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-compact svelte-uhwfyj"></div>`);
	var root_18$1 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_19$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-past-line ag-wday-past-line--summary svelte-uhwfyj"> </div>`);
	var root_20$1 = /* @__PURE__ */ from_html(`<div role="listitem"><div><div class="ag-wday-head-left svelte-uhwfyj"><!> <span class="ag-wday-name svelte-uhwfyj"> </span> <!></div> <!></div> <!></div>`);
	var root_21$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-badge svelte-uhwfyj"> </span>`);
	var root_22$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-badge ag-wday-badge--muted svelte-uhwfyj"> </span>`);
	var root_23$1 = /* @__PURE__ */ from_html(`<span class="ag-allday-span svelte-uhwfyj"> </span>`);
	var root_24 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-allday-dot svelte-uhwfyj"></span> <span class="ag-allday-title svelte-uhwfyj"> </span> <!></button>`);
	var root_25 = /* @__PURE__ */ from_html(`<div class="ag-allday svelte-uhwfyj"></div>`);
	var root_26 = /* @__PURE__ */ from_html(`<div> </div>`);
	var root_27 = /* @__PURE__ */ from_html(`<div class="ag-wslot svelte-uhwfyj"><div></div></div>`);
	var root_28 = /* @__PURE__ */ from_html(`<div class="ag-wday-expanded svelte-uhwfyj"></div>`);
	var root_29 = /* @__PURE__ */ from_html(`<div class="ag-wslot svelte-uhwfyj"><div class="ag-wslot-header svelte-uhwfyj"><span class="ag-wslot-now svelte-uhwfyj"> </span></div> <!></div>`);
	var root_30 = /* @__PURE__ */ from_html(`<div class="ag-wday-expanded svelte-uhwfyj"><!> <!> <!></div>`);
	var root_31 = /* @__PURE__ */ from_html(`<button type="button" class="ag-compact-more svelte-uhwfyj"> </button>`);
	var root_32 = /* @__PURE__ */ from_html(`<div class="ag-wday-compact svelte-uhwfyj"><!> <!></div>`);
	var root_33 = /* @__PURE__ */ from_html(`<div role="listitem"><div><div class="ag-wday-head-left svelte-uhwfyj"><!> <!> <span class="ag-wday-name svelte-uhwfyj"> </span> <!></div> <!></div> <!> <!></div>`);
	var root_34 = /* @__PURE__ */ from_html(`<div><div class="ag-body svelte-uhwfyj" role="list"></div></div>`);
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
					var text$1 = only_child(span, true);
					var span_1 = sibling(span, 2);
					var node_1 = child(span_1);
					var consequent = ($$anchor) => {
						var text_1 = text();
						template_effect(($0) => set_text(text_1, `${get(L).until ?? ""} ${$0 ?? ""}`), [() => fmt(ev().end)]);
						append($$anchor, text_1);
					};
					var alternate = ($$anchor) => {
						var text_2 = text();
						template_effect(($0, $1) => set_text(text_2, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmt(ev().start), () => fmt(ev().end)]);
						append($$anchor, text_2);
					};
					if_block(node_1, ($$render) => {
						if (isNow()) $$render(consequent);
						else $$render(alternate, -1);
					});
					var span_2 = sibling(node_1, 2);
					var text_3 = only_child(span_2, true);
					var node_2 = sibling(span_2, 2);
					var consequent_1 = ($$anchor) => {
						var span_3 = root$3();
						var text_4 = only_child(span_3, true);
						template_effect(() => set_text(text_4, eta()));
						append($$anchor, span_3);
					};
					if_block(node_2, ($$render) => {
						if (eta()) $$render(consequent_1);
					});
					reset(span_1);
					var node_3 = sibling(span_1, 2);
					var consequent_2 = ($$anchor) => {
						var span_4 = root_1$4();
						var text_5 = only_child(span_4, true);
						template_effect(() => set_text(text_5, ev().subtitle));
						append($$anchor, span_4);
					};
					if_block(node_3, ($$render) => {
						if (ev().subtitle) $$render(consequent_2);
					});
					var node_4 = sibling(node_3, 2);
					var consequent_3 = ($$anchor) => {
						var span_5 = root_2$4();
						var text_6 = only_child(span_5, true);
						template_effect(() => set_text(text_6, ev().location));
						append($$anchor, span_5);
					};
					if_block(node_4, ($$render) => {
						if (ev().location) $$render(consequent_3);
					});
					var node_5 = sibling(node_4, 2);
					var consequent_4 = ($$anchor) => {
						var div_1 = root_4$4();
						each(div_1, 21, () => ev().tags, index, ($$anchor, tag) => {
							var span_6 = root_3$4();
							var text_7 = only_child(span_6, true);
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
						set_text(text_3, $0);
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
				template_effect(($0) => styles_1 = set_style(div_3, "", styles_1, { transform: $0 }), [() => `scaleX(${prog(ev()) ?? ""})`]);
				append($$anchor, div_2);
			};
			if_block(node_6, ($$render) => {
				if (isNow()) $$render(consequent_5);
			});
			reset(div);
			reset(button);
			template_effect(($0, $1, $2, $3, $4, $5) => {
				classes = set_class(button, 1, "ag-card svelte-uhwfyj", null, classes, {
					"ag-card--selected": selectedEventId() === ev().id,
					"ag-card--cancelled": ev().status === "cancelled",
					"ag-card--tentative": ev().status === "tentative",
					"ag-card--full": ev().status === "full",
					"ag-card--limited": ev().status === "limited",
					"ag-card--drag": $0
				});
				set_attribute(button, "aria-label", `${ev().title ?? ""}${$1 ?? ""}, ${$2 ?? ""} – ${$3 ?? ""}, ${$4 ?? ""}`);
				set_attribute(button, "draggable", $5);
				styles = set_style(button, "", styles, { "--ev-color": ev().color || "var(--dt-event, var(--dt-accent))" });
			}, [
				() => get(dragId) === String(ev().id),
				() => statusText(ev()),
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
			var button_1 = root_12$1();
			let classes_1;
			let styles_2;
			EventContent(child(button_1), {
				get event() {
					return ev();
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_3 = root_11$1();
					var span_7 = first_child(fragment_3);
					var text_8 = only_child(span_7, true);
					var div_4 = sibling(span_7, 2);
					var span_8 = child(div_4);
					var text_9 = only_child(span_8, true);
					var node_8 = sibling(span_8, 2);
					var consequent_6 = ($$anchor) => {
						var span_9 = root_8$3();
						var text_10 = only_child(span_9, true);
						template_effect(() => set_text(text_10, ev().location));
						append($$anchor, span_9);
					};
					if_block(node_8, ($$render) => {
						if (showLoc() && ev().location) $$render(consequent_6);
					});
					var node_9 = sibling(node_8, 2);
					var consequent_7 = ($$anchor) => {
						var span_10 = root_9$2();
						var text_11 = only_child(span_10, true);
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
							var text_12 = only_child(span_11, true);
							template_effect(() => set_text(text_12, get(tag)));
							append($$anchor, span_11);
						});
						append($$anchor, fragment_4);
					};
					if_block(node_10, ($$render) => {
						if (ev().tags?.length) $$render(consequent_8);
					});
					reset(div_4);
					var text_13 = only_child(sibling(div_4, 2), true);
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
			template_effect(($0, $1, $2) => {
				classes_1 = set_class(button_1, 1, "ag-compact svelte-uhwfyj", null, classes_1, {
					"ag-compact--selected": selectedEventId() === ev().id,
					"ag-compact--done": done(),
					"ag-compact--cancelled": ev().status === "cancelled",
					"ag-compact--tentative": ev().status === "tentative",
					"ag-compact--full": ev().status === "full",
					"ag-compact--limited": ev().status === "limited"
				});
				set_attribute(button_1, "aria-label", `${ev().title ?? ""}${$0 ?? ""}${done() ? `, ${get(L).completed}` : ""}, ${$1 ?? ""}, ${$2 ?? ""}`);
				styles_2 = set_style(button_1, "", styles_2, { "--ev-color": ev().color || "var(--dt-event, var(--dt-accent))" });
			}, [
				() => statusText(ev()),
				() => fmt(ev().start),
				() => duration(ev())
			]);
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
		/** Keyboard activation for the day header / empty-day row (role="button").
		*  Keys aimed at a control inside a custom dayHeader snippet stay its own. */
		function dayKeydown(e, ms) {
			if (e.target !== e.currentTarget) return;
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			clickDay(ms);
		}
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		/** All-day events and timed ones at least a (wall-clock) day long go to
		*  the all-day chips; a shorter overnight event is listed with its time on
		*  each day it touches. */
		function inAllDayStrip(ev) {
			return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
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
			const s = ev.start;
			const start = new Date(new Date(day.ms).setHours(s.getHours(), s.getMinutes(), s.getSeconds(), s.getMilliseconds()));
			const end = new Date(start.getTime() + (ev.end.getTime() - ev.start.getTime()));
			get(oneventmove)?.(ev, start, end);
		}
		const swipe = createSwipe({
			disabled: () => !get(isMobile),
			onmove: () => {},
			onend: (dir) => {
				if (dir > 0) get(viewState)?.prev();
				else if (dir < 0) get(viewState)?.next();
			}
		});
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
			const tomorrowMs = addDaysMs(todayMs, 1);
			const out = [];
			for (let i = 0; i < get(customDays); i++) {
				const ms = addDaysMs(get(weekStartMs), i);
				const dEnd = addDaysMs(ms, 1);
				const dayEvts = events().filter((ev) => ev.start.getTime() < dEnd && ev.end.getTime() > ms).sort((a, b) => a.start.getTime() - b.start.getTime());
				const allDayEvts = dayEvts.filter(inAllDayStrip);
				const timedEvts = dayEvts.filter((ev) => !inAllDayStrip(ev));
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
					month: monthLong(ms, $$props.locale),
					num: fmtDayNum(ms, $$props.locale),
					tier,
					isToday: get(showDates) && ms === todayMs,
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
		var div_5 = root_34();
		let classes_4;
		let styles_3;
		var div_6 = child(div_5);
		let styles_4;
		each(div_6, 21, () => get(weekDays), (day) => day.ms, ($$anchor, day) => {
			const expanded = /* @__PURE__ */ user_derived(() => get(day).tier === "today" || get(day).tier === "tomorrow");
			var fragment_5 = comment();
			var node_12 = first_child(fragment_5);
			var consequent_15 = ($$anchor) => {
				var div_7 = root_20$1();
				let classes_5;
				var div_8 = child(div_7);
				let classes_6;
				var div_9 = child(div_8);
				var node_13 = child(div_9);
				var consequent_9 = ($$anchor) => {
					var span_13 = root_14$1();
					var text_15 = only_child(span_13, true);
					template_effect(() => set_text(text_15, get(day).num));
					append($$anchor, span_13);
				};
				if_block(node_13, ($$render) => {
					if (get(showDates)) $$render(consequent_9);
				});
				var span_14 = sibling(node_13, 2);
				var text_16 = only_child(span_14, true);
				var node_14 = sibling(span_14, 2);
				var consequent_10 = ($$anchor) => {
					var span_15 = root_15$1();
					var text_17 = only_child(span_15, true);
					template_effect(() => set_text(text_17, get(day).month));
					append($$anchor, span_15);
				};
				if_block(node_14, ($$render) => {
					if (get(showDates)) $$render(consequent_10);
				});
				reset(div_9);
				var node_15 = sibling(div_9, 2);
				var consequent_11 = ($$anchor) => {
					var div_10 = root_16$1();
					snippet(child(div_10), () => get(dayHeaderSnippet), () => ({
						date: new Date(get(day).ms),
						isToday: false,
						dayName: get(day).dayName
					}));
					reset(div_10);
					append($$anchor, div_10);
				};
				if_block(node_15, ($$render) => {
					if (get(dayHeaderSnippet)) $$render(consequent_11);
				});
				reset(div_8);
				var node_17 = sibling(div_8, 2);
				var consequent_13 = ($$anchor) => {
					var fragment_6 = root_18$1();
					var node_18 = first_child(fragment_6);
					pastToggle(node_18, () => get(day).ms, () => get(day).timedEvents.length, () => true);
					var node_19 = sibling(node_18, 2);
					var consequent_12 = ($$anchor) => {
						var div_11 = root_17$1();
						each(div_11, 21, () => get(day).timedEvents, (ev) => ev.id, ($$anchor, ev) => {
							compactRow($$anchor, () => get(ev), () => false, () => true);
						});
						reset(div_11);
						append($$anchor, div_11);
					};
					var d_1 = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(get(day).ms));
					if_block(node_19, ($$render) => {
						if (get(d_1)) $$render(consequent_12);
					});
					append($$anchor, fragment_6);
				};
				var consequent_14 = ($$anchor) => {
					var div_12 = root_19$1();
					var text_18 = only_child(div_12, true);
					template_effect(() => set_text(text_18, get(L).noEvents));
					append($$anchor, div_12);
				};
				if_block(node_17, ($$render) => {
					if (get(day).timedEvents.length > 0) $$render(consequent_13);
					else if (get(day).events.length === 0) $$render(consequent_14, 1);
				});
				reset(div_7);
				template_effect(($0) => {
					classes_5 = set_class(div_7, 1, "ag-wday ag-wday--past svelte-uhwfyj", null, classes_5, { "ag-wday--disabled": $0 });
					set_attribute(div_7, "data-day", get(day).ms);
					classes_6 = set_class(div_8, 1, "ag-wday-head svelte-uhwfyj", null, classes_6, { "ag-wday-head--click": !!get(ondayclick) });
					set_attribute(div_8, "role", get(ondayclick) ? "button" : void 0);
					set_attribute(div_8, "tabindex", get(ondayclick) ? 0 : void 0);
					set_text(text_16, get(day).dayName);
				}, [() => get(disabledSet).has(get(day).ms)]);
				delegated("click", div_8, function(...$$args) {
					(get(ondayclick) ? () => clickDay(get(day).ms) : void 0)?.apply(this, $$args);
				});
				delegated("keydown", div_8, function(...$$args) {
					(get(ondayclick) ? (e) => dayKeydown(e, get(day).ms) : void 0)?.apply(this, $$args);
				});
				append($$anchor, div_7);
			};
			var alternate_2 = ($$anchor) => {
				var div_13 = root_33();
				let classes_7;
				var div_14 = child(div_13);
				let classes_8;
				var div_15 = child(div_14);
				var node_20 = child(div_15);
				var consequent_16 = ($$anchor) => {
					var span_16 = root_14$1();
					var text_19 = only_child(span_16, true);
					template_effect(() => set_text(text_19, get(day).num));
					append($$anchor, span_16);
				};
				if_block(node_20, ($$render) => {
					if (get(showDates)) $$render(consequent_16);
				});
				var node_21 = sibling(node_20, 2);
				var consequent_17 = ($$anchor) => {
					var span_17 = root_21$1();
					var text_20 = only_child(span_17, true);
					template_effect(() => set_text(text_20, get(L).today));
					append($$anchor, span_17);
				};
				var consequent_18 = ($$anchor) => {
					var span_18 = root_22$1();
					var text_21 = only_child(span_18, true);
					template_effect(() => set_text(text_21, get(L).tomorrow));
					append($$anchor, span_18);
				};
				if_block(node_21, ($$render) => {
					if (get(day).isToday) $$render(consequent_17);
					else if (get(showDates) && get(day).tier === "tomorrow") $$render(consequent_18, 1);
				});
				var span_19 = sibling(node_21, 2);
				var text_22 = only_child(span_19, true);
				var node_22 = sibling(span_19, 2);
				var consequent_19 = ($$anchor) => {
					var span_20 = root_15$1();
					var text_23 = only_child(span_20, true);
					template_effect(() => set_text(text_23, get(day).month));
					append($$anchor, span_20);
				};
				if_block(node_22, ($$render) => {
					if (get(showDates)) $$render(consequent_19);
				});
				reset(div_15);
				var node_23 = sibling(div_15, 2);
				var consequent_20 = ($$anchor) => {
					var div_16 = root_16$1();
					snippet(child(div_16), () => get(dayHeaderSnippet), () => ({
						date: new Date(get(day).ms),
						isToday: get(day).tier === "today",
						dayName: get(day).dayName
					}));
					reset(div_16);
					append($$anchor, div_16);
				};
				if_block(node_23, ($$render) => {
					if (get(dayHeaderSnippet)) $$render(consequent_20);
				});
				reset(div_14);
				var node_25 = sibling(div_14, 2);
				var consequent_22 = ($$anchor) => {
					var div_17 = root_25();
					each(div_17, 21, () => get(day).allDayEvents, (ev) => ev.id, ($$anchor, ev) => {
						const seg = /* @__PURE__ */ user_derived(() => segmentForDay(get(ev), get(day).ms));
						const isCont = /* @__PURE__ */ user_derived(() => get(seg) !== null && get(seg).totalDays > 1);
						var button_3 = root_24();
						let classes_9;
						let styles_5;
						var span_21 = sibling(child(button_3), 2);
						var text_24 = only_child(span_21, true);
						var node_26 = sibling(span_21, 2);
						var consequent_21 = ($$anchor) => {
							var span_22 = root_23$1();
							var text_25 = only_child(span_22);
							template_effect(() => set_text(text_25, `${get(seg).dayIndex ?? ""}/${get(seg).totalDays ?? ""}`));
							append($$anchor, span_22);
						};
						if_block(node_26, ($$render) => {
							if (get(isCont) && get(seg)) $$render(consequent_21);
						});
						reset(button_3);
						template_effect(($0) => {
							classes_9 = set_class(button_3, 1, "ag-allday-chip svelte-uhwfyj", null, classes_9, { "ag-allday-chip--selected": selectedEventId() === get(ev).id });
							set_attribute(button_3, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}`);
							styles_5 = set_style(button_3, "", styles_5, { "--ev-color": get(ev).color || "var(--dt-accent)" });
							set_text(text_24, get(ev).title);
						}, [() => get(isCont) && get(seg) ? get(L).dayNOfTotal(get(seg).dayIndex, get(seg).totalDays) : get(L).allDay]);
						delegated("click", button_3, () => handleClick(get(ev)));
						event("pointerenter", button_3, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_3);
					});
					reset(div_17);
					append($$anchor, div_17);
				};
				if_block(node_25, ($$render) => {
					if (get(day).allDayEvents.length > 0) $$render(consequent_22);
				});
				var node_27 = sibling(node_25, 2);
				var consequent_23 = ($$anchor) => {
					var div_18 = root_26();
					let classes_10;
					var text_26 = only_child(div_18, true);
					template_effect(() => {
						classes_10 = set_class(div_18, 1, "ag-wday-empty svelte-uhwfyj", null, classes_10, { "ag-wday-empty--click": !!get(ondayclick) });
						set_attribute(div_18, "role", get(ondayclick) ? "button" : void 0);
						set_attribute(div_18, "tabindex", get(ondayclick) ? 0 : void 0);
						set_text(text_26, get(L).noEvents);
					});
					delegated("click", div_18, function(...$$args) {
						(get(ondayclick) ? () => clickDay(get(day).ms) : void 0)?.apply(this, $$args);
					});
					delegated("keydown", div_18, function(...$$args) {
						(get(ondayclick) ? (e) => dayKeydown(e, get(day).ms) : void 0)?.apply(this, $$args);
					});
					append($$anchor, div_18);
				};
				var consequent_24 = ($$anchor) => {
					var div_19 = root_17$1();
					each(div_19, 21, () => get(day).timedEvents, (ev) => ev.id, ($$anchor, ev) => {
						compactRow($$anchor, () => get(ev), () => false, () => false);
					});
					reset(div_19);
					append($$anchor, div_19);
				};
				var consequent_25 = ($$anchor) => {
					var div_20 = root_28();
					each(div_20, 21, () => groupIntoSlots(get(day).timedEvents), (slot) => slot.startMs, ($$anchor, slot) => {
						var div_21 = root_27();
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
				var consequent_29 = ($$anchor) => {
					var div_23 = root_30();
					var node_28 = child(div_23);
					var consequent_26 = ($$anchor) => {
						var fragment_10 = comment();
						each(first_child(fragment_10), 17, () => get(day).currentEvents, (ev) => ev.id, ($$anchor, ev) => {
							var div_24 = root_29();
							var div_25 = child(div_24);
							var text_27 = only_child(child(div_25), true);
							reset(div_25);
							var node_30 = sibling(div_25, 2);
							eventCard(node_30, () => get(ev), () => true);
							reset(div_24);
							template_effect(() => set_text(text_27, get(L).now));
							append($$anchor, div_24);
						});
						append($$anchor, fragment_10);
					};
					if_block(node_28, ($$render) => {
						if (get(day).currentEvents.length > 0) $$render(consequent_26);
					});
					var node_31 = sibling(node_28, 2);
					each(node_31, 17, () => groupIntoSlots(get(day).upcomingEvents), (slot) => slot.startMs, ($$anchor, slot) => {
						var div_26 = root_27();
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
					var node_32 = sibling(node_31, 2);
					var consequent_28 = ($$anchor) => {
						var fragment_12 = root_18$1();
						var node_33 = first_child(fragment_12);
						pastToggle(node_33, () => get(day).ms, () => get(day).pastEvents.length, () => false);
						var node_34 = sibling(node_33, 2);
						var consequent_27 = ($$anchor) => {
							var fragment_13 = comment();
							each(first_child(fragment_13), 17, () => get(day).pastEvents, (ev) => ev.id, ($$anchor, ev) => {
								compactRow($$anchor, () => get(ev), () => false, () => true);
							});
							append($$anchor, fragment_13);
						};
						var d_2 = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(get(day).ms));
						if_block(node_34, ($$render) => {
							if (get(d_2)) $$render(consequent_27);
						});
						append($$anchor, fragment_12);
					};
					if_block(node_32, ($$render) => {
						if (get(day).pastEvents.length > 0) $$render(consequent_28);
					});
					reset(div_23);
					append($$anchor, div_23);
				};
				var alternate_1 = ($$anchor) => {
					const dayExpanded = /* @__PURE__ */ user_derived(() => get(expandedDays).includes(get(day).ms));
					var div_28 = root_32();
					var node_36 = child(div_28);
					each(node_36, 17, () => get(dayExpanded) ? get(day).timedEvents : get(day).timedEvents.slice(0, 4), (ev) => ev.id, ($$anchor, ev) => {
						compactRow($$anchor, () => get(ev), () => true, () => false);
					});
					var node_37 = sibling(node_36, 2);
					var consequent_30 = ($$anchor) => {
						var button_4 = root_31();
						var text_28 = only_child(button_4, true);
						template_effect(($0) => {
							set_attribute(button_4, "aria-expanded", get(dayExpanded));
							set_text(text_28, $0);
						}, [() => get(dayExpanded) ? get(L).showLess : get(L).nMore(get(day).timedEvents.length - 4)]);
						delegated("click", button_4, () => toggleDayExpand(get(day).ms));
						append($$anchor, button_4);
					};
					if_block(node_37, ($$render) => {
						if (get(day).timedEvents.length > 4) $$render(consequent_30);
					});
					reset(div_28);
					append($$anchor, div_28);
				};
				if_block(node_27, ($$render) => {
					if (get(day).events.length === 0) $$render(consequent_23);
					else if (get(compact) && !get(cols)) $$render(consequent_24, 1);
					else if (get(equalDays) || get(cols) && !get(expanded)) $$render(consequent_25, 2);
					else if (get(expanded)) $$render(consequent_29, 3);
					else $$render(alternate_1, -1);
				});
				reset(div_13);
				template_effect(($0, $1) => {
					classes_7 = set_class(div_13, 1, "ag-wday svelte-uhwfyj", null, classes_7, {
						"ag-wday--today": get(day).tier === "today",
						"ag-wday--tomorrow": get(day).tier === "tomorrow",
						"ag-wday--equal": get(equalDays),
						"ag-wday--disabled": $0,
						"ag-wday--drop": $1
					});
					set_attribute(div_13, "data-day", get(day).ms);
					classes_8 = set_class(div_14, 1, "ag-wday-head svelte-uhwfyj", null, classes_8, { "ag-wday-head--click": !!get(ondayclick) });
					set_attribute(div_14, "role", get(ondayclick) ? "button" : void 0);
					set_attribute(div_14, "tabindex", get(ondayclick) ? 0 : void 0);
					set_text(text_22, get(day).dayName);
				}, [() => get(disabledSet).has(get(day).ms), () => get(dropDay) === get(day).ms && isDropDay(get(day))]);
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
				delegated("keydown", div_14, function(...$$args) {
					(get(ondayclick) ? (e) => dayKeydown(e, get(day).ms) : void 0)?.apply(this, $$args);
				});
				append($$anchor, div_13);
			};
			if_block(node_12, ($$render) => {
				if (get(day).tier === "past") $$render(consequent_15);
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
		delegated("touchstart", div_5, function(...$$args) {
			swipe.ontouchstart?.apply(this, $$args);
		}, void 0, true);
		delegated("touchmove", div_5, function(...$$args) {
			swipe.ontouchmove?.apply(this, $$args);
		}, void 0, true);
		delegated("touchend", div_5, function(...$$args) {
			swipe.ontouchend?.apply(this, $$args);
		});
		event("touchcancel", div_5, function(...$$args) {
			swipe.ontouchcancel?.apply(this, $$args);
		});
		append($$anchor, div_5);
		pop();
	}
	delegate([
		"click",
		"touchstart",
		"touchmove",
		"touchend",
		"keydown"
	]);
	// src/lib/views/agenda/Agenda.svelte
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
	// src/lib/views/mobile/MobileDay.svelte
	var root_1$3 = /* @__PURE__ */ from_html(`<span class="mb-allday-span svelte-zbkzcp"> </span>`);
	var root_2$3 = /* @__PURE__ */ from_html(`<button type="button"><span class="mb-allday-dot svelte-zbkzcp"></span> <span class="mb-allday-title svelte-zbkzcp"> </span> <!></button>`);
	var root_3$3 = /* @__PURE__ */ from_html(`<button type="button" class="mb-allday-more svelte-zbkzcp"> </button>`);
	var root_4$3 = /* @__PURE__ */ from_html(`<div><!> <!></div>`);
	var root_5$3 = /* @__PURE__ */ from_html(`<span class="mb-blocked-label svelte-zbkzcp"> </span>`);
	var root_6$3 = /* @__PURE__ */ from_html(`<div><div> <small class="svelte-zbkzcp"> </small></div> <div class="mb-hour-line svelte-zbkzcp"></div> <!></div>`);
	var root_7$3 = /* @__PURE__ */ from_html(`<div class="mb-now svelte-zbkzcp"><span class="mb-now-label svelte-zbkzcp"><span class="svelte-zbkzcp"> </span></span> <div class="mb-now-line svelte-zbkzcp"></div></div>`);
	var root_8$2 = /* @__PURE__ */ from_html(`<span class="mb-ev-time svelte-zbkzcp"> </span>`);
	var root_9$1 = /* @__PURE__ */ from_html(`<span class="mb-ev-sub svelte-zbkzcp"> </span>`);
	var root_10$1 = /* @__PURE__ */ from_html(`<span class="mb-ev-loc svelte-zbkzcp"> </span>`);
	var root_11 = /* @__PURE__ */ from_html(`<span class="mb-ev-tag svelte-zbkzcp"> </span>`);
	var root_12 = /* @__PURE__ */ from_html(`<div class="mb-ev-tags svelte-zbkzcp"></div>`);
	var root_13 = /* @__PURE__ */ from_html(`<span class="mb-ev-title svelte-zbkzcp"> </span> <!> <!> <!> <!>`, 1);
	var root_14 = /* @__PURE__ */ from_html(`<span class="mb-ev-live svelte-zbkzcp"></span>`);
	var root_15 = /* @__PURE__ */ from_html(`<span class="mb-ev-next-badge svelte-zbkzcp"> </span>`);
	var root_16 = /* @__PURE__ */ from_html(`<span class="mb-ev-handle mb-ev-handle--start svelte-zbkzcp" aria-hidden="true"></span>`);
	var root_17 = /* @__PURE__ */ from_html(`<span class="mb-ev-handle mb-ev-handle--end svelte-zbkzcp" aria-hidden="true"></span>`);
	var root_18 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_19 = /* @__PURE__ */ from_html(`<button type="button"><div class="mb-ev-stripe svelte-zbkzcp"></div> <div class="mb-ev-body svelte-zbkzcp"><!></div> <!> <!></button>`);
	var root_20 = /* @__PURE__ */ from_html(`<div class="mb-create-ghost svelte-zbkzcp" aria-hidden="true"><span class="mb-create-ghost-time svelte-zbkzcp"> </span></div>`);
	var root_21 = /* @__PURE__ */ from_html(`<span class="mb-empty-text svelte-zbkzcp"> </span>`);
	var root_22 = /* @__PURE__ */ from_html(`<div class="mb-empty svelte-zbkzcp"><!></div>`);
	var root_23 = /* @__PURE__ */ from_html(`<div role="region"><div><!>  <div class="mb-grid svelte-zbkzcp" role="region" tabindex="0"><div class="mb-grid-inner svelte-zbkzcp"><!> <!> <!> <!></div></div> <!></div></div>`);
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
		/** Fractional wall-clock hour `hour` on the day starting at `dayMs` → epoch ms. */
		function atHour(day, hour) {
			return new Date(day).setHours(0, 0, 0, Math.round(hour * HOUR_MS));
		}
		/** Epoch ms → fractional wall-clock hour counted from the day at `day`
		*  (24 = the next midnight; calendar days, not 24 h steps). */
		function hourOf(ms, day) {
			const d = new Date(ms);
			return diffDays(ms, day) * 24 + d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600 + d.getMilliseconds() / HOUR_MS;
		}
		/** Snap a fractional hour to the snap interval in wall-clock minutes of
		*  the local day (not UTC multiples — those are off in +05:30 zones). */
		function snapHour(hour, how) {
			const step = Math.max(1, ctx.snapInterval);
			const units = hour * 60 / step;
			return (how === "floor" ? Math.floor(units + 1e-9) : how === "ceil" ? Math.ceil(units - 1e-9) : Math.round(units)) * step / 60;
		}
		/** Timed events at least a (wall-clock) day long, and all-day ones, sit in
		*  the all-day strip; a shorter overnight event is drawn in the grid,
		*  clipped to this day. */
		function inAllDayStrip(ev) {
			return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
		}
		const HOUR_HEIGHT = 64;
		const GUTTER_W = 40;
		const startHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[0] ?? 0);
		const endHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[1] ?? 24);
		const hourCount = /* @__PURE__ */ user_derived(() => Math.max(1, get(endHour) - get(startHour)));
		const gridHeight = /* @__PURE__ */ user_derived(() => get(hourCount) * HOUR_HEIGHT);
		const dayMs = /* @__PURE__ */ user_derived(() => $$props.focusDate ? sod($$props.focusDate.getTime()) : clock.today);
		const dayEnd = /* @__PURE__ */ user_derived(() => addDaysMs(get(dayMs), 1));
		const isToday = /* @__PURE__ */ user_derived(() => get(dayMs) === clock.today);
		const isDisabled = /* @__PURE__ */ user_derived(() => get(disabledSet).has(get(dayMs)));
		user_effect(() => {
			if (!get(loadRangeCtx)) return;
			const rangeStart = new Date(addDaysMs(get(dayMs), -2));
			const rangeEnd = new Date(addDaysMs(get(dayMs), 3));
			get(loadRangeCtx).set({
				start: rangeStart,
				end: rangeEnd
			});
			return () => get(loadRangeCtx).set(null);
		});
		const timedEvents = /* @__PURE__ */ user_derived(() => events().filter((ev) => !inAllDayStrip(ev) && ev.start.getTime() < get(dayEnd) && ev.end.getTime() > get(dayMs)).sort((a, b) => a.start.getTime() - b.start.getTime()));
		const allDayEvents = /* @__PURE__ */ user_derived(() => {
			const segs = [];
			for (const ev of events()) {
				if (!inAllDayStrip(ev)) continue;
				const seg = segmentForDay(ev, get(dayMs));
				if (seg) segs.push(seg);
			}
			return segs;
		});
		const isEmpty = /* @__PURE__ */ user_derived(() => get(timedEvents).length === 0 && get(allDayEvents).length === 0);
		const ALLDAY_MAX = 3;
		let allDayExpanded = /* @__PURE__ */ state(false);
		const visibleAllDay = /* @__PURE__ */ user_derived(() => get(allDayExpanded) ? get(allDayEvents) : get(allDayEvents).slice(0, ALLDAY_MAX));
		/** The event's own start / end is on this day, inside the visible hours */
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
			const bandStart = atHour(get(dayMs), get(startHour));
			const bandEnd = atHour(get(dayMs), get(endHour));
			const infos = sorted.flatMap((ev) => {
				const resizing = rsP?.eventId === ev.id;
				const evStart = resizing ? rsP.start : ev.start;
				const evEnd = resizing ? rsP.end : ev.end;
				const s0 = evStart.getTime();
				const e0 = evEnd.getTime();
				const sMs = Math.max(s0, bandStart);
				const eMs = Math.min(e0, bandEnd);
				if (eMs < sMs || eMs === sMs && (s0 !== e0 || s0 < bandStart || s0 >= bandEnd)) return [];
				const topH = hourOf(sMs, get(dayMs)) - get(startHour);
				const botH = hourOf(eMs, get(dayMs)) - get(startHour);
				return [{
					ev,
					top: topH * HOUR_HEIGHT,
					height: Math.max(24, (botH - topH) * HOUR_HEIGHT),
					isCurrent: ev.start.getTime() <= now && ev.end.getTime() > now,
					isNext: ev.id === nextEventId,
					isResizing: resizing,
					hasStart: s0 >= Math.max(get(dayMs), bandStart),
					hasEnd: e0 <= Math.min(get(dayEnd), bandEnd),
					startMs: sMs,
					endMs: eMs,
					col: 0,
					totalCols: 1
				}];
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
				hasStart: info.hasStart,
				hasEnd: info.hasEnd,
				col: info.col,
				totalCols: info.totalCols
			}));
		});
		const nowOffset = /* @__PURE__ */ user_derived(() => {
			if (!get(isToday)) return -1;
			const h = hourOf(clock.tick, get(dayMs)) - get(startHour);
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
			disabled: () => !!get(drag)?.active || mbCreateStarted || mbRsStarted,
			onmove: (dx) => {
				if (longPressTimer !== null && !mbCreateStarted && Math.abs(dx) > LONG_PRESS_TOLERANCE) cleanupGridCreate();
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
			const hour = gridHour(e.clientY);
			if (isBlockedAt(hour)) return;
			const startMs = clampToDay(atHour(get(dayMs), snapHour(hour, "floor")));
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
			const rawHour = get(isToday) ? hourOf(clock.tick, get(dayMs)) : get(startHour);
			const startMs = clampToDay(atHour(get(dayMs), snapHour(rawHour, "ceil")));
			if (isBlockedAt(hourOf(startMs, get(dayMs)))) return;
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
		/** Pointer Y → fractional wall-clock hour of this day (accounts for scroll). */
		function gridHour(clientY) {
			const y = clientY - gridEl.getBoundingClientRect().top + gridEl.scrollTop;
			return get(startHour) + y / HOUR_HEIGHT;
		}
		/** Pointer Y → wall-clock time snapped to the interval, clamped to the band. */
		function gridSnapped(clientY, how) {
			return clampToDay(atHour(get(dayMs), snapHour(gridHour(clientY), how)));
		}
		/** Clamp a timestamp into the visible hour range of this day. */
		function clampToDay(ms) {
			return Math.max(atHour(get(dayMs), get(startHour)), Math.min(atHour(get(dayMs), get(endHour)), ms));
		}
		function startGridCreate() {
			if (!get(drag)) return;
			mbCreateStarted = true;
			get(drag).beginCreate(new Date(mbCreateAnchorMs), new Date(mbCreateAnchorMs + get(SNAP_MS)));
			addTouchScrollBlock();
		}
		function onGridPointerDown(e) {
			if (e.button !== 0 || !get(drag) || !$$props.oneventcreate || readOnly() || get(isDisabled)) return;
			if (e.target.closest(".mb-event")) return;
			mbCreateStartX = e.clientX;
			mbCreateStartY = e.clientY;
			mbCreateAnchorMs = gridSnapped(e.clientY, "floor");
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
			const snapped = gridSnapped(e.clientY, "round");
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
			const snapped = gridSnapped(e.clientY, "round");
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
				if (get(nowOffset) < 0) return;
				const line = Math.max(0, Math.floor(get(nowOffset) / HOUR_HEIGHT - 1)) * HOUR_HEIGHT;
				const y = openingTop(get(positionedEvents), line, HOUR_HEIGHT, 8, get(nowOffset), el.clientHeight - 8);
				el.scrollTop = y && y + 8;
			});
		});
		var div = root_23();
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
				var text = only_child(span, true);
				var node_2 = sibling(span, 2);
				var consequent = ($$anchor) => {
					var span_1 = root_1$3();
					var text_1 = only_child(span_1);
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
				var text_2 = only_child(button_1, true);
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
			const computed_const = /* @__PURE__ */ user_derived(() => {
				const [hNum, hSuf] = fmtHParts(get(hour), $$props.locale);
				return {
					hNum,
					hSuf
				};
			});
			var div_5 = root_6$3();
			let classes_4;
			set_style(div_5, "", {}, {
				top: `${h * HOUR_HEIGHT}px`,
				height: "64px"
			});
			var div_6 = child(div_5);
			let classes_5;
			var text_3 = child(div_6, true);
			var text_4 = only_child(sibling(text_3), true);
			reset(div_6);
			var node_5 = sibling(div_6, 4);
			var consequent_4 = ($$anchor) => {
				const slot = /* @__PURE__ */ user_derived(() => get(blockedSlots).find((s) => (!s.day || s.day === (new Date(get(dayMs)).getDay() === 0 ? 7 : new Date(get(dayMs)).getDay())) && get(hour) >= s.start && get(hour) < s.end));
				var fragment = comment();
				var node_6 = first_child(fragment);
				var consequent_3 = ($$anchor) => {
					var span_2 = root_5$3();
					var text_5 = only_child(span_2, true);
					template_effect(() => set_text(text_5, get(slot).label));
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
				classes_5 = set_class(div_6, 1, "mb-hour-label svelte-zbkzcp", null, classes_5, { "mb-hour-label--under": $0 });
				set_text(text_3, get(computed_const).hNum);
				set_text(text_4, get(computed_const).hSuf);
			}, [() => get(nowOffset) >= 0 && Math.abs(h * HOUR_HEIGHT - get(nowOffset)) < 16]);
			append($$anchor, div_5);
		});
		var node_7 = sibling(node_4, 2);
		var consequent_5 = ($$anchor) => {
			var div_7 = root_7$3();
			let styles_4;
			var span_3 = child(div_7);
			var text_6 = only_child(child(span_3), true);
			reset(span_3);
			next(2);
			reset(div_7);
			template_effect(() => {
				styles_4 = set_style(div_7, "", styles_4, { top: `${get(nowOffset) ?? ""}px` });
				set_text(text_6, clock.hm);
			});
			append($$anchor, div_7);
		};
		if_block(node_7, ($$render) => {
			if (get(nowOffset) >= 0) $$render(consequent_5);
		});
		var node_8 = sibling(node_7, 2);
		each(node_8, 17, () => get(positionedEvents), (p) => p.ev.id, ($$anchor, p) => {
			var button_2 = root_19();
			let classes_6;
			let styles_5;
			var div_8 = sibling(child(button_2), 2);
			EventContent(child(div_8), {
				get event() {
					return get(p).ev;
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_1 = root_13();
					var span_5 = first_child(fragment_1);
					var text_7 = only_child(span_5, true);
					var node_10 = sibling(span_5, 2);
					var consequent_6 = ($$anchor) => {
						var span_6 = root_8$2();
						var text_8 = only_child(span_6);
						template_effect(($0, $1) => set_text(text_8, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmtTime$1(get(p).ev.start, $$props.locale), () => fmtTime$1(get(p).ev.end, $$props.locale)]);
						append($$anchor, span_6);
					};
					if_block(node_10, ($$render) => {
						if (get(p).height > 36) $$render(consequent_6);
					});
					var node_11 = sibling(node_10, 2);
					var consequent_7 = ($$anchor) => {
						var span_7 = root_9$1();
						var text_9 = only_child(span_7, true);
						template_effect(() => set_text(text_9, get(p).ev.subtitle));
						append($$anchor, span_7);
					};
					if_block(node_11, ($$render) => {
						if (get(p).ev.subtitle && get(p).height > 56) $$render(consequent_7);
					});
					var node_12 = sibling(node_11, 2);
					var consequent_8 = ($$anchor) => {
						var span_8 = root_10$1();
						var text_10 = only_child(span_8, true);
						template_effect(() => set_text(text_10, get(p).ev.location));
						append($$anchor, span_8);
					};
					if_block(node_12, ($$render) => {
						if (get(p).ev.location && get(p).height > 72) $$render(consequent_8);
					});
					var node_13 = sibling(node_12, 2);
					var consequent_9 = ($$anchor) => {
						var div_9 = root_12();
						each(div_9, 21, () => get(p).ev.tags, index, ($$anchor, tag) => {
							var span_9 = root_11();
							var text_11 = only_child(span_9, true);
							template_effect(() => set_text(text_11, get(tag)));
							append($$anchor, span_9);
						});
						reset(div_9);
						append($$anchor, div_9);
					};
					if_block(node_13, ($$render) => {
						if (get(p).ev.tags?.length && get(p).height > 88) $$render(consequent_9);
					});
					template_effect(() => set_text(text_7, get(p).ev.title));
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
				var span_11 = root_15();
				var text_12 = only_child(span_11, true);
				template_effect(() => set_text(text_12, get(L).upNext));
				append($$anchor, span_11);
			};
			if_block(node_14, ($$render) => {
				if (get(p).isCurrent) $$render(consequent_10);
				else if (get(p).isNext) $$render(consequent_11, 1);
			});
			var node_15 = sibling(node_14, 2);
			var consequent_14 = ($$anchor) => {
				var fragment_2 = root_18();
				var node_16 = first_child(fragment_2);
				var consequent_12 = ($$anchor) => {
					var span_12 = root_16();
					delegated("pointerdown", span_12, (e) => onResizePointerDown(e, get(p).ev, "start"));
					append($$anchor, span_12);
				};
				if_block(node_16, ($$render) => {
					if (get(p).hasStart) $$render(consequent_12);
				});
				var node_17 = sibling(node_16, 2);
				var consequent_13 = ($$anchor) => {
					var span_13 = root_17();
					delegated("pointerdown", span_13, (e) => onResizePointerDown(e, get(p).ev, "end"));
					append($$anchor, span_13);
				};
				if_block(node_17, ($$render) => {
					if (get(p).hasEnd) $$render(consequent_13);
				});
				append($$anchor, fragment_2);
			};
			if_block(node_15, ($$render) => {
				if (!readOnly() && !get(p).ev.data?.readOnly) $$render(consequent_14);
			});
			reset(button_2);
			template_effect(($0, $1, $2) => {
				classes_6 = set_class(button_2, 1, "mb-event svelte-zbkzcp", null, classes_6, {
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
					"--ev-color": get(p).ev.color ?? "var(--dt-event, var(--dt-accent))"
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
		var node_18 = sibling(node_8, 2);
		var consequent_15 = ($$anchor) => {
			const gTopH = /* @__PURE__ */ user_derived(() => hourOf(get(drag).payload.start.getTime(), get(dayMs)));
			const gTop = /* @__PURE__ */ user_derived(() => (get(gTopH) - get(startHour)) * HOUR_HEIGHT);
			const gH = /* @__PURE__ */ user_derived(() => Math.max(12, (hourOf(get(drag).payload.end.getTime(), get(dayMs)) - get(gTopH)) * HOUR_HEIGHT));
			var div_10 = root_20();
			let styles_6;
			var text_13 = only_child(child(div_10));
			reset(div_10);
			template_effect(($0, $1) => {
				styles_6 = set_style(div_10, "", styles_6, {
					top: `${get(gTop) ?? ""}px`,
					height: `${get(gH) ?? ""}px`
				});
				set_text(text_13, `${$0 ?? ""} – ${$1 ?? ""}`);
			}, [() => fmtTime$1(get(drag).payload.start, $$props.locale), () => fmtTime$1(get(drag).payload.end, $$props.locale)]);
			append($$anchor, div_10);
		};
		if_block(node_18, ($$render) => {
			if (!readOnly() && get(drag)?.active && get(drag).mode === "create" && get(drag).payload) $$render(consequent_15);
		});
		reset(div_4);
		reset(div_3);
		bind_this(div_3, ($$value) => gridEl = $$value, () => gridEl);
		var node_19 = sibling(div_3, 2);
		var consequent_17 = ($$anchor) => {
			var div_11 = root_22();
			var node_20 = child(div_11);
			var consequent_16 = ($$anchor) => {
				var fragment_3 = comment();
				snippet(first_child(fragment_3), () => ctx.emptySnippet);
				append($$anchor, fragment_3);
			};
			var alternate = ($$anchor) => {
				var span_15 = root_21();
				var text_14 = only_child(span_15, true);
				template_effect(() => set_text(text_14, get(L).nothingScheduled));
				append($$anchor, span_15);
			};
			if_block(node_20, ($$render) => {
				if (ctx.emptySnippet) $$render(consequent_16);
				else $$render(alternate, -1);
			});
			reset(div_11);
			append($$anchor, div_11);
		};
		if_block(node_19, ($$render) => {
			if (get(isEmpty)) $$render(consequent_17);
		});
		reset(div_1);
		reset(div);
		template_effect(($0) => {
			classes = set_class(div, 1, "mb svelte-zbkzcp", null, classes, { "mb--auto": get(autoHeight) });
			styles = set_style(div, style() || void 0, styles, { height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%" });
			set_attribute(div, "aria-label", `${get(L).dayPlanner ?? ""}, ${$0 ?? ""}`);
			classes_1 = set_class(div_1, 1, "mb-swipe svelte-zbkzcp", null, classes_1, { "mb-swipe--animate": get(swipeAnimate) });
			styles_1 = set_style(div_1, "", styles_1, { transform: get(swipeOffset) !== 0 ? `translateX(${get(swipeOffset)}px)` : void 0 });
			set_attribute(div_3, "aria-label", get(L).scrollableDayPlanner);
			styles_3 = set_style(div_4, "", styles_3, { height: `${get(gridHeight) ?? ""}px` });
		}, [() => dateLong(get(dayMs), $$props.locale)]);
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
	// src/lib/views/mobile/MobileWeek.svelte
	var root$2 = /* @__PURE__ */ from_html(`<span> </span>`);
	var root_1$2 = /* @__PURE__ */ from_html(`<span class="mw-empty svelte-1d18hkf"> </span>`);
	var root_2$2 = /* @__PURE__ */ from_html(`<span class="mw-ev-title svelte-1d18hkf"> </span> <span class="mw-ev-time svelte-1d18hkf"> </span>`, 1);
	var root_3$2 = /* @__PURE__ */ from_html(`<button type="button"><span class="mw-ev-stripe svelte-1d18hkf"></span> <div class="mw-ev-body svelte-1d18hkf"><!></div></button>`);
	var root_4$2 = /* @__PURE__ */ from_html(`<button type="button" class="mw-ev-more svelte-1d18hkf"> </button>`);
	var root_5$2 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
	var root_6$2 = /* @__PURE__ */ from_html(`<div role="listitem"><button type="button" class="mw-row-target svelte-1d18hkf"></button> <div class="mw-date svelte-1d18hkf"><span> </span> <!></div> <div class="mw-events svelte-1d18hkf"><!></div> <svg class="mw-chevron svelte-1d18hkf" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M6 3l5 5-5 5"></path></svg></div>`);
	var root_7$2 = /* @__PURE__ */ from_html(`<div role="region"><div role="list"></div></div>`);
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
			const rangeStart = new Date(addDaysMs(get(weekStart), -7));
			const rangeEnd = new Date(addDaysMs(get(weekStart), get(customDays) + 7));
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
				const ms = addDaysMs(get(weekStart), i);
				const d = new Date(ms);
				const jsDay = d.getDay();
				const isoDay = jsDay === 0 ? 7 : jsDay;
				if (hideSet.has(isoDay)) continue;
				const isToday = get(showDates) && ms === get(todayMs);
				const isPast = get(equalDays) ? false : ms < get(todayMs);
				const isWeekend = jsDay === 0 || jsDay === 6;
				const isDisabled = get(disabledSet).has(ms);
				const dayEnd = addDaysMs(ms, 1);
				const dayEvents = events().filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > ms).sort((a, b) => a.start.getTime() - b.start.getTime());
				const allDayCount = dayEvents.filter(inAllDayStrip).length;
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
		/** All-day events and timed ones at least a (wall-clock) day long read as
		*  "All day"; a shorter overnight event keeps its time on both days. */
		function inAllDayStrip(ev) {
			return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
		}
		function evTimeLabel(ev) {
			if (inAllDayStrip(ev)) return get(L).allDay;
			return `${fmtTime(ev.start)} – ${fmtTime(ev.end)}`;
		}
		/** Visible time on a day row: the start, or "until 01:00" on the day an
		*  overnight event runs into. */
		function evRowTime(ev, dayMs) {
			if (inAllDayStrip(ev)) return get(dayCells).find((c) => c.events.includes(ev))?.ms === dayMs ? get(L).allDay : "";
			if (ev.start.getTime() < dayMs) return `${get(L).until} ${fmtTime(ev.end)}`;
			return fmtTime(ev.start);
		}
		function statusText(ev) {
			if (ev.status === "cancelled") return ` (${get(L).cancelled})`;
			if (ev.status === "tentative") return ` (${get(L).tentative})`;
			if (ev.status === "full") return ` (${get(L).full})`;
			if (ev.status === "limited") return ` (${get(L).limited})`;
			return "";
		}
		let listEl = /* @__PURE__ */ state(null);
		user_effect(() => {
			get(weekStart);
			if (get(listEl)) get(listEl).scrollTop = 0;
		});
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
		var div = root_7$2();
		let classes;
		let styles;
		var div_1 = child(div);
		let classes_1;
		let styles_1;
		each(div_1, 21, () => get(dayCells), (cell) => cell.ms, ($$anchor, cell) => {
			var div_2 = root_6$2();
			let classes_2;
			var button = child(div_2);
			var div_3 = sibling(button, 2);
			var span = child(div_3);
			let classes_3;
			var text = only_child(span, true);
			var node = sibling(span, 2);
			var consequent = ($$anchor) => {
				var span_1 = root$2();
				let classes_4;
				var text_1 = only_child(span_1, true);
				template_effect(($0) => {
					classes_4 = set_class(span_1, 1, "mw-day-num svelte-1d18hkf", null, classes_4, { "mw-day-num--today": get(cell).isToday });
					set_text(text_1, $0);
				}, [() => fmtDayNum(get(cell).ms, $$props.locale)]);
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
				var text_2 = only_child(span_2, true);
				template_effect(() => set_text(text_2, get(L).noEvents));
				append($$anchor, span_2);
			};
			var alternate = ($$anchor) => {
				var fragment = root_5$2();
				var node_2 = first_child(fragment);
				each(node_2, 17, () => get(expandedDays).has(get(cell).ms) ? get(cell).events : get(cell).events.slice(0, MAX_EVENTS), (ev) => ev.id, ($$anchor, ev) => {
					var button_1 = root_3$2();
					let classes_5;
					let styles_2;
					var div_5 = sibling(child(button_1), 2);
					EventContent(child(div_5), {
						get event() {
							return get(ev);
						},
						children: ($$anchor, $$slotProps) => {
							var fragment_1 = root_2$2();
							var span_3 = first_child(fragment_1);
							var text_3 = only_child(span_3, true);
							var text_4 = only_child(sibling(span_3, 2), true);
							template_effect(($0) => {
								set_text(text_3, get(ev).title);
								set_text(text_4, $0);
							}, [() => evRowTime(get(ev), get(cell).ms)]);
							append($$anchor, fragment_1);
						},
						$$slots: { default: true }
					});
					reset(div_5);
					reset(button_1);
					template_effect(($0, $1, $2, $3, $4, $5) => {
						classes_5 = set_class(button_1, 1, "mw-ev svelte-1d18hkf", null, classes_5, {
							"mw-ev--selected": selectedEventId() === get(ev).id,
							"mw-ev--allday": $0,
							"mw-ev--current": $1,
							"mw-ev--cancelled": get(ev).status === "cancelled",
							"mw-ev--tentative": get(ev).status === "tentative",
							"mw-ev--full": get(ev).status === "full",
							"mw-ev--limited": get(ev).status === "limited"
						});
						set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}${$2 ?? ""}, ${$3 ?? ""}, ${$4 ?? ""}`);
						styles_2 = set_style(button_1, "", styles_2, { "--ev-color": $5 });
					}, [
						() => inAllDayStrip(get(ev)),
						() => !inAllDayStrip(get(ev)) && get(ev).start.getTime() <= clock.tick && get(ev).end.getTime() > clock.tick,
						() => statusText(get(ev)),
						() => dateLong(get(cell).ms, $$props.locale),
						() => evTimeLabel(get(ev)),
						() => get(ev).color ?? (inAllDayStrip(get(ev)) ? "var(--dt-accent)" : "var(--dt-event, var(--dt-accent))")
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
				var node_4 = sibling(node_2, 2);
				var consequent_2 = ($$anchor) => {
					var button_2 = root_4$2();
					var text_5 = only_child(button_2, true);
					template_effect(($0, $1, $2, $3) => {
						set_attribute(button_2, "aria-expanded", $0);
						set_attribute(button_2, "aria-label", `${$1 ?? ""}, ${$2 ?? ""}`);
						set_text(text_5, $3);
					}, [
						() => get(expandedDays).has(get(cell).ms),
						() => get(expandedDays).has(get(cell).ms) ? get(L).showLess : get(L).nMore(get(cell).totalCount - MAX_EVENTS),
						() => dateLong(get(cell).ms, $$props.locale),
						() => get(expandedDays).has(get(cell).ms) ? get(L).showLess : get(L).nMore(get(cell).totalCount - MAX_EVENTS)
					]);
					delegated("click", button_2, () => toggleExpand(get(cell).ms));
					append($$anchor, button_2);
				};
				if_block(node_4, ($$render) => {
					if (get(cell).totalCount > MAX_EVENTS) $$render(consequent_2);
				});
				append($$anchor, fragment);
			};
			if_block(node_1, ($$render) => {
				if (get(cell).events.length === 0) $$render(consequent_1);
				else $$render(alternate, -1);
			});
			reset(div_4);
			next(2);
			reset(div_2);
			template_effect(($0) => {
				classes_2 = set_class(div_2, 1, "mw-row svelte-1d18hkf", null, classes_2, {
					"mw-row--today": get(cell).isToday,
					"mw-row--past": get(cell).isPast,
					"mw-row--weekend": get(cell).isWeekend,
					"mw-row--disabled": get(cell).isDisabled
				});
				set_attribute(div_2, "aria-current", get(cell).isToday ? "date" : void 0);
				button.disabled = get(cell).isDisabled;
				set_attribute(button, "aria-label", `${$0 ?? ""}${get(cell).isToday ? `, ${get(L).today}` : ""}`);
				classes_3 = set_class(span, 1, "mw-day-name svelte-1d18hkf", null, classes_3, { "mw-day-name--today": get(cell).isToday });
				set_text(text, get(cell).dayName);
			}, [() => dateLong(get(cell).ms, $$props.locale)]);
			delegated("click", button, () => handleDayTap(get(cell).ms));
			delegated("keydown", button, (e) => handleDayKeydown(e, get(cell).ms));
			append($$anchor, div_2);
		});
		reset(div_1);
		bind_this(div_1, ($$value) => set(listEl, $$value), () => get(listEl));
		reset(div);
		template_effect(($0) => {
			classes = set_class(div, 1, "mw svelte-1d18hkf", null, classes, { "mw--auto": get(autoHeight) });
			styles = set_style(div, style() || void 0, styles, { height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%" });
			set_attribute(div, "aria-label", `${get(L).weekAhead ?? ""}${$0 ?? ""}`);
			classes_1 = set_class(div_1, 1, "mw-list svelte-1d18hkf", null, classes_1, { "mw-list--animate": get(swipeAnimate) });
			styles_1 = set_style(div_1, "", styles_1, { transform: get(swipeOffset) !== 0 ? `translateX(${get(swipeOffset)}px)` : void 0 });
		}, [() => get(dayCells).length ? `, ${fmtWeekRange(get(dayCells)[0].ms, $$props.locale, get(dayCells)[get(dayCells).length - 1].ms)}` : ""]);
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
	// src/lib/views/mobile/Mobile.svelte
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
	// src/lib/views/month/MonthGrid.svelte
	var root$1 = /* @__PURE__ */ from_html(`<div class="mg-head-cell svelte-pvjuld" role="columnheader"> </div>`);
	var root_1$1 = /* @__PURE__ */ from_html(`<span><span class="mg-chip-dot svelte-pvjuld"></span></span>`);
	var root_2$1 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
	var root_3$1 = /* @__PURE__ */ from_html(`<span class="mg-chip-time svelte-pvjuld"> </span>`);
	var root_4$1 = /* @__PURE__ */ from_html(`<button type="button"><span class="mg-chip-dot svelte-pvjuld" aria-hidden="true"></span> <!> <span class="mg-chip-title svelte-pvjuld"> </span></button>`);
	var root_5$1 = /* @__PURE__ */ from_html(`<span class="mg-more svelte-pvjuld"> </span>`);
	var root_6$1 = /* @__PURE__ */ from_html(`<button type="button" class="mg-more svelte-pvjuld"> </button>`);
	var root_7$1 = /* @__PURE__ */ from_html(`<button type="button" class="mg-more svelte-pvjuld" aria-expanded="true"> </button>`);
	var root_8$1 = /* @__PURE__ */ from_html(`<div role="gridcell"><span> </span> <div class="mg-chips svelte-pvjuld"><!> <!></div></div>`);
	var root_9 = /* @__PURE__ */ from_html(`<div class="mg-row svelte-pvjuld" role="row"></div>`);
	var root_10 = /* @__PURE__ */ from_html(`<div role="grid"><div class="mg-head svelte-pvjuld" role="row"></div> <div class="mg-body svelte-pvjuld" role="rowgroup"></div></div>`);
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
		let fitAll = /* @__PURE__ */ state(MAX_CHIPS);
		let fitMore = /* @__PURE__ */ state(MAX_CHIPS);
		function measureFit() {
			const cell = get(bodyEl)?.querySelector(".mg-cell");
			const chip = get(bodyEl)?.querySelector(".mg-chip");
			if (!cell || !chip) return;
			const num = cell.querySelector(".mg-daynum");
			const chips = cell.querySelector(".mg-chips");
			const cs = getComputedStyle(cell);
			const gap = chips ? parseFloat(getComputedStyle(chips).rowGap) || 0 : 0;
			const room = cell.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - (num?.offsetHeight ?? 0) - (parseFloat(cs.rowGap) || 0);
			const chipH = chip.offsetHeight;
			const moreH = get(bodyEl)?.querySelector(".mg-more")?.offsetHeight ?? chipH;
			if (!chipH) return;
			set(fitAll, Math.max(0, Math.floor((room + gap) / (chipH + gap))), true);
			set(fitMore, Math.max(0, Math.floor((room - moreH) / (chipH + gap))), true);
		}
		user_effect(() => {
			if (!get(bodyEl) || get(autoHeight) || get(dotsMode)) {
				set(fitAll, set(fitMore, MAX_CHIPS), true);
				return;
			}
			events();
			measureFit();
			const ro = new ResizeObserver(measureFit);
			ro.observe(get(bodyEl));
			document.fonts?.ready.then(measureFit);
			return () => ro.disconnect();
		});
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
		/** A cell takes focus when it can act: drill down, or open its overflow. */
		function isFocusable(cell) {
			return !cell.isDisabled && (get(cellsInteractive) || cell.overflow > 0);
		}
		/** Focusable cells by day, in grid order. */
		const focusable = /* @__PURE__ */ user_derived(() => {
			const map = /* @__PURE__ */ new Map();
			for (const row of get(weeks)) for (const cell of row) if (isFocusable(cell)) map.set(cell.ms, cell);
			return map;
		});
		const rovingMs = /* @__PURE__ */ user_derived(() => {
			if (get(focusMs) !== null && get(focusable).has(get(focusMs))) return get(focusMs);
			if (get(focusable).has(get(todayMs))) return get(todayMs);
			const first = get(focusable).keys().next();
			return first.done ? null : first.value;
		});
		function moveFocus(fromMs, deltaDays) {
			if (!get(range)) return;
			const lo = sod(get(range).start.getTime());
			const hi = get(range).end.getTime();
			let target = addDaysMs(fromMs, deltaDays);
			while (target >= lo && target < hi && !get(focusable).has(target)) target = addDaysMs(target, deltaDays);
			if (target < lo || target >= hi) return;
			set(focusMs, target, true);
			(get(bodyEl)?.querySelector(`[data-ms="${target}"]`))?.focus();
		}
		function cellKeydown(e, cell) {
			if (!(e.target === e.currentTarget) && (e.key === "Enter" || e.key === " ")) return;
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
					activateCell(cell);
				}
			}
		}
		/** The cell's own action: drill into the day; on phones (dots, no
		*  ondayclick) the whole cell opens its overflow instead of a tiny "+N". */
		function activateCell(cell) {
			if (cell.isDisabled) return;
			if (get(ondayclick)) get(ondayclick)(cell.date);
			else if (get(dotsMode) && cell.overflow > 0) set(expandedMs, get(expandedMs) === cell.ms ? null : cell.ms, true);
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
			const dayEnd = addDaysMs(ms, 1);
			return events().filter((e) => e.start.getTime() < dayEnd && e.end.getTime() > dayStart).sort((a, b) => {
				return (isAllDay(a) ? 0 : 1) - (isAllDay(b) ? 0 : 1) || a.start.getTime() - b.start.getTime();
			});
		}
		const weeks = /* @__PURE__ */ user_derived(() => {
			if (!get(range)) return [];
			const rows = [];
			for (let ms = sod(get(range).start.getTime()); ms < get(range).end.getTime(); ms = addDaysMs(ms, 7)) {
				const row = [];
				for (let i = 0; i < 7; i++) {
					const cellMs = addDaysMs(ms, i);
					const date = new Date(cellMs);
					const jsDay = date.getDay();
					const dayEvents = eventsForDay(cellMs);
					const shown = dayEvents.length <= get(fitAll) ? dayEvents.length : get(fitMore);
					row.push({
						ms: cellMs,
						date,
						dayNum: date.getDate(),
						inMonth: date.getMonth() === get(focusMonth),
						isToday: cellMs === get(todayMs),
						isWeekend: jsDay === 0 || jsDay === 6,
						isDisabled: get(disabledSet).has(cellMs),
						chips: dayEvents.slice(0, shown),
						all: dayEvents,
						overflow: dayEvents.length - shown
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
		var div = root_10();
		let classes;
		let styles;
		var div_1 = child(div);
		each(div_1, 21, () => get(weekdayLabels), index, ($$anchor, name) => {
			var div_2 = root$1();
			var text = only_child(div_2, true);
			template_effect(() => set_text(text, get(name)));
			append($$anchor, div_2);
		});
		reset(div_1);
		var div_3 = sibling(div_1, 2);
		let styles_1;
		each(div_3, 21, () => get(weeks), index, ($$anchor, row) => {
			var div_4 = root_9();
			each(div_4, 21, () => get(row), (cell) => cell.ms, ($$anchor, cell) => {
				var div_5 = root_8$1();
				let classes_1;
				var span = child(div_5);
				let classes_2;
				var text_1 = only_child(span, true);
				var div_6 = sibling(span, 2);
				var node = child(div_6);
				each(node, 17, () => get(expandedMs) === get(cell).ms ? get(cell).all : get(cell).chips, (ev) => ev.id + get(cell).ms, ($$anchor, ev) => {
					var fragment = comment();
					var node_1 = first_child(fragment);
					var consequent = ($$anchor) => {
						var span_1 = root_1$1();
						let classes_3;
						let styles_2;
						template_effect(($0) => {
							classes_3 = set_class(span_1, 1, "mg-chip svelte-pvjuld", null, classes_3, {
								"mg-chip--selected": get(ev).id === selectedEventId(),
								"mg-chip--cancelled": get(ev).status === "cancelled"
							});
							styles_2 = set_style(span_1, "", styles_2, { "--mg-chip-color": $0 });
						}, [() => get(ev).color ?? (isAllDay(get(ev)) ? "var(--dt-accent)" : "var(--dt-event, var(--dt-accent))")]);
						append($$anchor, span_1);
					};
					var consequent_1 = ($$anchor) => {
						var button = root_2$1();
						let classes_4;
						snippet(child(button), () => get(eventSnippet), () => get(ev));
						reset(button);
						template_effect(() => classes_4 = set_class(button, 1, "mg-chip mg-chip--custom svelte-pvjuld", null, classes_4, { "mg-chip--selected": get(ev).id === selectedEventId() }));
						delegated("click", button, (e) => {
							e.stopPropagation();
							$$props.oneventclick?.(get(ev), e.currentTarget.getBoundingClientRect());
						});
						event("mouseenter", button, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button);
					};
					var alternate = ($$anchor) => {
						var button_1 = root_4$1();
						let classes_5;
						let styles_3;
						var node_3 = sibling(child(button_1), 2);
						var consequent_2 = ($$anchor) => {
							var span_2 = root_3$1();
							var text_2 = only_child(span_2, true);
							template_effect(($0) => set_text(text_2, $0), [() => chipTime(get(ev))]);
							append($$anchor, span_2);
						};
						var d = /* @__PURE__ */ user_derived(() => chipTime(get(ev)));
						if_block(node_3, ($$render) => {
							if (get(d)) $$render(consequent_2);
						});
						var text_3 = only_child(sibling(node_3, 2), true);
						reset(button_1);
						template_effect(($0, $1, $2) => {
							classes_5 = set_class(button_1, 1, "mg-chip svelte-pvjuld", null, classes_5, {
								"mg-chip--selected": get(ev).id === selectedEventId(),
								"mg-chip--cancelled": get(ev).status === "cancelled"
							});
							set_attribute(button_1, "title", get(ev).title);
							set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}${$1 ?? ""}`);
							styles_3 = set_style(button_1, "", styles_3, { "--mg-chip-color": $2 });
							set_text(text_3, get(ev).title);
						}, [
							() => dateLong(get(cell).ms, $$props.locale),
							() => chipTime(get(ev)) ? `, ${chipTime(get(ev))}` : "",
							() => get(ev).color ?? (isAllDay(get(ev)) ? "var(--dt-accent)" : "var(--dt-event, var(--dt-accent))")
						]);
						delegated("click", button_1, (e) => {
							e.stopPropagation();
							$$props.oneventclick?.(get(ev), e.currentTarget.getBoundingClientRect());
						});
						event("mouseenter", button_1, () => get(oneventhover)?.(get(ev)));
						append($$anchor, button_1);
					};
					if_block(node_1, ($$render) => {
						if (get(dotsMode)) $$render(consequent);
						else if (get(eventSnippet)) $$render(consequent_1, 1);
						else $$render(alternate, -1);
					});
					append($$anchor, fragment);
				});
				var node_4 = sibling(node, 2);
				var consequent_4 = ($$anchor) => {
					var fragment_1 = comment();
					var node_5 = first_child(fragment_1);
					var consequent_3 = ($$anchor) => {
						var span_4 = root_5$1();
						var text_4 = only_child(span_4);
						template_effect(() => set_text(text_4, `+${get(cell).overflow ?? ""}`));
						append($$anchor, span_4);
					};
					if_block(node_5, ($$render) => {
						if (get(cell).overflow > 0 && get(expandedMs) !== get(cell).ms) $$render(consequent_3);
					});
					append($$anchor, fragment_1);
				};
				var consequent_5 = ($$anchor) => {
					var button_2 = root_6$1();
					var text_5 = only_child(button_2, true);
					template_effect(($0, $1, $2) => {
						set_attribute(button_2, "aria-expanded", get(ondayclick) ? void 0 : false);
						set_attribute(button_2, "aria-label", `${$0 ?? ""}, ${$1 ?? ""}`);
						set_text(text_5, $2);
					}, [
						() => get(L).nMore(get(cell).overflow),
						() => dateLong(get(cell).ms, $$props.locale),
						() => get(L).nMore(get(cell).overflow)
					]);
					delegated("click", button_2, (e) => overflowClick(e, get(cell)));
					append($$anchor, button_2);
				};
				var consequent_6 = ($$anchor) => {
					var button_3 = root_7$1();
					var text_6 = only_child(button_3, true);
					template_effect(() => set_text(text_6, get(L).showLess));
					delegated("click", button_3, (e) => {
						e.stopPropagation();
						set(expandedMs, null);
					});
					append($$anchor, button_3);
				};
				if_block(node_4, ($$render) => {
					if (get(dotsMode)) $$render(consequent_4);
					else if (get(cell).overflow > 0 && get(expandedMs) !== get(cell).ms) $$render(consequent_5, 1);
					else if (get(expandedMs) === get(cell).ms) $$render(consequent_6, 2);
				});
				reset(div_6);
				reset(div_5);
				template_effect(($0, $1, $2) => {
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
					set_attribute(div_5, "tabindex", $1);
					classes_2 = set_class(span, 1, "mg-daynum svelte-pvjuld", null, classes_2, { "mg-daynum--today": get(cell).isToday });
					set_text(text_1, $2);
					set_attribute(div_6, "aria-hidden", get(dotsMode) || void 0);
				}, [
					() => cellLabel(get(cell)),
					() => isFocusable(get(cell)) ? get(cell).ms === get(rovingMs) ? 0 : -1 : void 0,
					() => fmtDayNum(get(cell).ms, $$props.locale)
				]);
				delegated("click", div_5, () => activateCell(get(cell)));
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
	// src/lib/adapters/errors.ts
	/**
	* The two refusals the calendar tells apart when a write fails.
	*
	* Throw `CalendarReadOnlyError` from an adapter that holds an event but
	* cannot store a change to it: the Calendar keeps the dragged block where it
	* was dropped and hands the move to the host (`oneventmove`), which owns the
	* write. Throw `EventNotFoundError` when an id is not yours: a composite
	* adapter then asks its next child, and a drag of it ends quietly.
	*
	* Plain `Error`s whose message contains "read-only" / "not found" are read
	* the same way, so adapters written before these classes keep working.
	*/
	var CalendarReadOnlyError = class extends Error {
		constructor(message = "read-only: this adapter cannot store changes") {
			super(message.includes("read-only") ? message : `read-only: ${message}`);
			this.name = "CalendarReadOnlyError";
		}
	};
	var EventNotFoundError = class extends Error {
		constructor(id) {
			super(`Event not found: ${id}`);
			this.name = "EventNotFoundError";
		}
	};
	/** Whether an adapter refused a write it could not store. */
	function isReadOnlyError(e) {
		return e instanceof CalendarReadOnlyError || e instanceof Error && /read-only/i.test(e.message);
	}
	/** Whether an adapter answered "not my event". */
	function isNotFoundError(e) {
		return e instanceof EventNotFoundError || e instanceof Error && /not found/i.test(e.message);
	}
	// src/lib/engine/event-store.svelte.ts
	function createEventStore(adapter) {
		const getAdapter = typeof adapter === "function" ? adapter : () => adapter;
		let eventMap = new SvelteMap();
		/** The latest load is async and has not resolved yet */
		let loadPending = /* @__PURE__ */ state(false);
		/** Mutations in flight — a counter, since several can overlap */
		let mutationsPending = /* @__PURE__ */ state(0);
		const loading = /* @__PURE__ */ user_derived(() => get(loadPending) || get(mutationsPending) > 0);
		let error = /* @__PURE__ */ state(null);
		/** Guards against an older in-flight load pruning a newer one's result */
		let loadSeq = 0;
		/**
		* Mutation clock. A load that was already in flight when an event was
		* added, moved or removed must not undo that write when it lands — its
		* snapshot predates it. Each mutation stamps its id; a load skips ids
		* stamped after it started.
		*/
		let epoch = 0;
		const touched = /* @__PURE__ */ new Map();
		function touch(id) {
			touched.set(id, ++epoch);
		}
		const eventArray = /* @__PURE__ */ user_derived(() => [...eventMap.values()]);
		function overlaps(ev, start, end) {
			return overlapsRange(ev, start, end);
		}
		function removeEvent(id) {
			eventMap.delete(id);
		}
		function upsertEvent(ev) {
			eventMap.set(ev.id, ev);
		}
		function merge(fetched, range, since = epoch) {
			const stale = (id) => (touched.get(id) ?? 0) > since;
			const keep = new Set(fetched.map((ev) => ev.id));
			for (const ev of [...eventMap.values()]) if (!keep.has(ev.id) && !stale(ev.id) && overlaps(ev, range.start, range.end)) removeEvent(ev.id);
			for (const ev of fetched) if (!stale(ev.id)) upsertEvent(ev);
			for (const [id, at] of touched) if (at <= since) touched.delete(id);
		}
		async function mutate(run) {
			update(mutationsPending);
			set(error, null);
			try {
				return await run();
			} catch (e) {
				if (!isReadOnlyError(e) && !isNotFoundError(e)) set(error, e instanceof Error ? e.message : String(e), true);
				throw e;
			} finally {
				update(mutationsPending, -1);
			}
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
				const since = epoch;
				const adapter = getAdapter();
				let sync;
				try {
					sync = adapter.fetchEventsSync?.(range);
				} catch (e) {
					set(loadPending, false);
					set(error, e instanceof Error ? e.message : String(e), true);
					return;
				}
				if (sync) {
					set(error, null);
					set(loadPending, false);
					untrack(() => merge(sync, range, since));
					return;
				}
				set(loadPending, true);
				set(error, null);
				try {
					const fetched = await adapter.fetchEvents(range);
					if (seq !== loadSeq) return;
					merge(fetched, range, since);
				} catch (e) {
					if (seq === loadSeq) set(error, e instanceof Error ? e.message : String(e), true);
				} finally {
					if (seq === loadSeq) set(loadPending, false);
				}
			},
			forRange(start, end) {
				return get(eventArray).filter((ev) => overlaps(ev, start, end));
			},
			forDay(date) {
				const dayStart = new Date(sod(date.getTime()));
				const dayEnd = new Date(addDaysMs(dayStart.getTime(), 1));
				return get(eventArray).filter((ev) => overlaps(ev, dayStart, dayEnd));
			},
			byId(id) {
				return eventMap.get(id);
			},
			async add(eventData) {
				const adapter = getAdapter();
				if (!adapter.createEvent) throw new CalendarReadOnlyError("Adapter is read-only: createEvent not implemented");
				return mutate(async () => {
					const created = await adapter.createEvent(eventData);
					upsertEvent(created);
					touch(created.id);
					return created;
				});
			},
			async update(id, patch) {
				const adapter = getAdapter();
				if (!adapter.updateEvent) throw new CalendarReadOnlyError("Adapter is read-only: updateEvent not implemented");
				await mutate(async () => {
					upsertEvent(await adapter.updateEvent(id, patch));
					touch(id);
				});
			},
			async remove(id) {
				const adapter = getAdapter();
				if (!adapter.deleteEvent) throw new CalendarReadOnlyError("Adapter is read-only: deleteEvent not implemented");
				await mutate(async () => {
					await adapter.deleteEvent(id);
					removeEvent(id);
					touch(id);
				});
			},
			async move(id, newStart, newEnd) {
				const existing = eventMap.get(id);
				if (existing) {
					upsertEvent({
						...existing,
						start: newStart,
						end: newEnd
					});
					touch(id);
				}
				try {
					await this.update(id, {
						start: newStart,
						end: newEnd
					});
				} catch (e) {
					if (existing && !isReadOnlyError(e)) {
						upsertEvent(existing);
						touch(id);
					}
					throw e;
				}
			}
		};
	}
	// src/lib/engine/view-state.svelte.ts
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
				end: new Date(addDaysMs(start.getTime(), 1))
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
			end: new Date(addDaysMs(start.getTime(), dayCount))
		};
	}
	function createViewState(options = {}) {
		const timezone = options.timezone;
		const today = () => timezone ? nowInZone(timezone) : /* @__PURE__ */ new Date();
		let view = /* @__PURE__ */ state(proxy(options.view ?? "week-planner"));
		let focusDate = /* @__PURE__ */ state(proxy(options.initialDate ?? today()));
		let mondayStart = /* @__PURE__ */ state(proxy(options.mondayStart ?? true));
		let dayCount = /* @__PURE__ */ state(proxy(options.dayCount ?? 7));
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
				set(focusDate, today(), true);
			}
		};
	}
	// src/lib/engine/selection.svelte.ts
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
	// src/lib/engine/drag.svelte.ts
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
	/** All available presets keyed by name */
	var presets = {
		auto: "",
		neutral: `
	--dt-stage-bg: #efebe9;
	--dt-bg: #efebe9;
	--dt-surface: #f4f1ee;
	--dt-border: rgba(15, 15, 15, 0.3);
	--dt-border-day: rgba(15, 15, 15, 0.6);
	--dt-text: #0f0f0f;
	--dt-text-2: rgba(15, 15, 15, 0.66);
	--dt-text-3: rgba(15, 15, 15, 0.54);
	--dt-accent: var(--asini-accent, #1d4fd7);
	--dt-accent-dim: color-mix(in srgb, var(--dt-accent) 12%, transparent);
	--dt-glow: color-mix(in srgb, var(--dt-accent) 25%, transparent);
	--dt-today-bg: transparent;
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(15, 15, 15, 0.18);
	--dt-weekend-bg: rgba(15, 15, 15, 0.035);
	--dt-hover: rgba(15, 15, 15, 0.05);
	--dt-event: var(--dt-text);
	--dt-paper: none;
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`,
		midnight: `
	--dt-stage-bg: #080a0f;
	--dt-bg: #0b0e14;
	--dt-surface: #10141c;
	--dt-border: rgba(148, 163, 184, 0.07);
	--dt-border-day: rgba(148, 163, 184, 0.14);
	--dt-text: rgba(226, 232, 240, 0.85);
	--dt-text-2: rgba(148, 163, 184, 0.75);
	--dt-text-3: rgba(148, 163, 184, 0.65);
	--dt-accent: #ef4444;
	--dt-accent-dim: rgba(239, 68, 68, 0.18);
	--dt-glow: rgba(239, 68, 68, 0.35);
	--dt-today-bg: transparent;
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(148, 163, 184, 0.12);
	--dt-success: rgba(74, 222, 128, 0.7);
	--dt-weekend-bg: rgba(148, 163, 184, 0.03);
	--dt-hover: rgba(148, 163, 184, 0.06);
	--dt-event: var(--dt-text);
	--dt-paper: none;
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`
	};
	// src/lib/theme/auto.ts
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
	var DARK_TEXT = [
		15,
		15,
		15
	];
	function contrast(a, b) {
		const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
		return (hi + .05) / (lo + .05);
	}
	/**
	* Text colour for an accent fill (all-day band, now plate): white when it
	* reaches 4.5:1 on the accent, else whichever of white / dark ink contrasts more.
	*/
	function accentTextFor(accent) {
		const white = contrast(accent, [
			255,
			255,
			255
		]);
		if (white >= 4.5) return "#ffffff";
		return contrast(accent, DARK_TEXT) > white ? "#0f0f0f" : "#ffffff";
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
		const borderAlpha = isDark ? .16 : .3;
		const borderDayAlpha = isDark ? .32 : .6;
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
		const accentAdj = hslToRgb(aH, Math.max(aS, .5), isDark ? Math.max(aL, .45) : Math.min(aL, .48));
		const btnText = accentTextFor(accentAdj);
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
			`--dt-text: ${rgba(...textBase, isDark ? .92 : 1)}`,
			`--dt-text-2: ${rgba(...textBase, isDark ? .62 : .66)}`,
			`--dt-text-3: ${rgba(...textBase, isDark ? .46 : .54)}`,
			`--dt-accent: ${rgbStr(...accentAdj)}`,
			`--dt-accent-dim: ${rgba(...accentAdj, accentDim)}`,
			`--dt-glow: ${rgba(...accentAdj, glow)}`,
			`--dt-today-bg: transparent`,
			`--dt-btn-text: ${btnText}`,
			`--dt-scrollbar: ${rgba(...borderRgb, scrollAlpha)}`,
			`--dt-success: ${rgba(...successRgb, .7)}`,
			`--dt-weekend-bg: ${rgba(...borderRgb, isDark ? .03 : .02)}`,
			`--dt-hover: ${rgba(...borderRgb, isDark ? .06 : .04)}`,
			`--dt-event: ${rgba(...textBase, isDark ? .92 : 1)}`,
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
		const onTransitionEnd = (e) => {
			const t = e.target;
			if (t !== document.documentElement && t !== document.body) return;
			const prop = e.propertyName;
			if (prop === void 0 || /^(background|color)/.test(prop)) scheduleUpdate();
		};
		document.addEventListener("transitionend", onTransitionEnd);
		document.addEventListener("animationend", onTransitionEnd);
		if (document.readyState !== "complete") window.addEventListener("load", scheduleUpdate, { once: true });
		document.fonts?.ready?.then(scheduleUpdate).catch(() => {});
		update();
		return () => {
			cancelAnimationFrame(rafId);
			mql?.removeEventListener("change", onScheme);
			window.removeEventListener("load", scheduleUpdate);
			observer.disconnect();
			document.removeEventListener("transitionend", onTransitionEnd);
			document.removeEventListener("animationend", onTransitionEnd);
		};
	}
	// src/lib/calendar/Calendar.svelte
	var defaultViews = [
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
			id: "week-scroll",
			label: "Scroll",
			mode: "week",
			component: PlannerScroll
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
	];
	var root = /* @__PURE__ */ from_html(`<button type="button" role="radio"> </button>`);
	var root_1 = /* @__PURE__ */ from_html(`<div class="cal-pills cal-pills--labels svelte-1b53e7w" role="radiogroup"></div>`);
	var root_2 = /* @__PURE__ */ from_html(`<div class="cal-pills svelte-1b53e7w" role="radiogroup"></div>`);
	var root_3 = /* @__PURE__ */ from_html(`<button type="button" class="cal-hd-today svelte-1b53e7w"> </button> <button type="button" class="cal-hd-btn svelte-1b53e7w"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" class="svelte-1b53e7w"><path d="M10 3 5 8l5 5" class="svelte-1b53e7w"></path></svg></button> <button type="button" class="cal-hd-btn svelte-1b53e7w"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true" class="svelte-1b53e7w"><path d="M6 3l5 5-5 5" class="svelte-1b53e7w"></path></svg></button>`, 1);
	var root_4 = /* @__PURE__ */ from_html(`<div><span class="cal-hd-title svelte-1b53e7w" aria-hidden="true"> </span> <span class="cal-sr svelte-1b53e7w" role="status" aria-live="polite" aria-atomic="true"> </span> <!> <!> <div class="cal-hd-nav svelte-1b53e7w"><!></div></div>`);
	var root_5 = /* @__PURE__ */ from_html(`<span class="cal-sr svelte-1b53e7w" role="status" aria-live="polite" aria-atomic="true"> </span>`);
	var root_6 = /* @__PURE__ */ from_html(`<div class="cal-empty svelte-1b53e7w"> </div>`);
	var root_7 = /* @__PURE__ */ from_html(`<div class="cal-loading svelte-1b53e7w"></div>`);
	var root_8 = /* @__PURE__ */ from_html(`<div role="region"><!> <!> <div><!></div> <!></div>`);
	function Calendar($$anchor, $$props) {
		push($$props, true);
		/** Breakpoint (px) at which auto-mobile activates */
		const MOBILE_BREAKPOINT = 768;
		let views = prop($$props, "views", 3, defaultViews), theme = prop($$props, "theme", 3, ""), mondayStart = prop($$props, "mondayStart", 3, true), heightProp = prop($$props, "height", 3, 600), borderRadius = prop($$props, "borderRadius", 3, 0), readOnly = prop($$props, "readOnly", 3, false), snapInterval = prop($$props, "snapInterval", 3, 15), minColumnWidth = prop($$props, "minColumnWidth", 3, 110), showModePills = prop($$props, "showModePills", 3, true), showNavigation = prop($$props, "showNavigation", 3, true), equalDays = prop($$props, "equalDays", 3, false), showDates = prop($$props, "showDates", 3, true), compact = prop($$props, "compact", 3, false), columns = prop($$props, "columns", 3, false), mobileProp = prop($$props, "mobile", 3, "auto");
		const unzone = (d) => $$props.timezone ? fromZonedTime(d, $$props.timezone) : d;
		const zoneIn = (d) => d && $$props.timezone ? toZonedTime(d, $$props.timezone) : d;
		const effectiveCreate = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.oneventcreate ? void 0 : (range) => $$props.oneventcreate({
			start: unzone(range.start),
			end: unzone(range.end)
		}));
		const effectiveExternalDrop = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.onexternaldrop ? void 0 : (info) => $$props.onexternaldrop({
			start: unzone(info.start),
			dataTransfer: info.dataTransfer
		}));
		const effectiveMove = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.oneventmove ? void 0 : (ev, start, end) => $$props.oneventmove(ev, unzone(start), unzone(end)));
		function handleEventClick(ev, anchor) {
			selection.select(ev.id);
			$$props.oneventclick?.(ev, anchor);
		}
		let containerWidth = /* @__PURE__ */ state(0);
		const isMobileContainer = /* @__PURE__ */ user_derived(() => get(containerWidth) > 0 && get(containerWidth) < MOBILE_BREAKPOINT);
		const useMobile = /* @__PURE__ */ user_derived(() => mobileProp() === "auto" ? get(isMobileContainer) : Boolean(mobileProp()));
		const HEADER_STACK_BREAKPOINT = 520;
		const stackHeader = /* @__PURE__ */ user_derived(() => get(useMobile) && get(containerWidth) > 0 && get(containerWidth) < HEADER_STACK_BREAKPOINT);
		let calEl = /* @__PURE__ */ state(void 0);
		let probedTheme = /* @__PURE__ */ state("");
		const needsProbe = /* @__PURE__ */ user_derived(() => theme() === "" && $$props.autoTheme !== false);
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
		const effectiveTheme = /* @__PURE__ */ user_derived(() => theme() === "" && $$props.autoTheme !== false ? get(probedTheme) : theme());
		const effectiveAdapter = /* @__PURE__ */ user_derived(() => $$props.timezone ? wrapAdapterWithTimezone($$props.adapter, $$props.timezone) : $$props.adapter);
		const store = createEventStore(() => get(effectiveAdapter));
		const viewState = createViewState(untrack(() => ({
			view: $$props.view ?? views()[0]?.id,
			mondayStart: mondayStart(),
			initialDate: zoneIn($$props.currentDate ?? $$props.initialDate),
			dayCount: $$props.days,
			timezone: $$props.timezone,
			modeForView: (viewId) => views().find((v) => v.id === viewId)?.mode
		})));
		const selection = createSelection();
		const drag = createDragState();
		function validateRange(mode, start, end) {
			if (mode === "create" || mode === "resize-start" || mode === "resize-end") {
				if (end.getTime() <= start.getTime()) {
					const floorMs = Math.max(1, snapInterval()) * 6e4;
					if (mode === "resize-start") start = new Date(end.getTime() - floorMs);
					else end = new Date(start.getTime() + floorMs);
				}
				const durationMin = (end.getTime() - start.getTime()) / 6e4;
				const clampTo = $$props.minDuration && durationMin < $$props.minDuration ? $$props.minDuration : $$props.maxDuration && durationMin > $$props.maxDuration ? $$props.maxDuration : null;
				if (clampTo !== null) {
					if (mode === "resize-start") start = /* @__PURE__ */ new Date(end.getTime() - clampTo * 6e4);
					else end = new Date(start.getTime() + clampTo * 6e4);
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
					if (ts >= startDay.getTime() && ts <= endDay.getTime()) return null;
				}
			}
			if ($$props.blockedSlots?.length) {
				const startH = start.getHours() + start.getMinutes() / 60;
				const endH = end.getHours() + end.getMinutes() / 60 + (end.getDate() !== start.getDate() ? 24 : 0);
				const jsDay = start.getDay();
				const isoDay = jsDay === 0 ? 7 : jsDay;
				for (const slot of $$props.blockedSlots) {
					if (slot.day && slot.day !== isoDay) continue;
					if (startH < slot.end && endH > slot.start) return null;
				}
			}
			return {
				start,
				end
			};
		}
		const checkedCreate = /* @__PURE__ */ user_derived(() => {
			const create = get(effectiveCreate);
			if (!create) return void 0;
			return (range) => {
				const ok = validateRange("create", range.start, range.end);
				if (ok) create(ok);
			};
		});
		async function commitDrag() {
			if (readOnly()) {
				drag.cancel();
				return;
			}
			const mode = drag.mode;
			const payload = drag.commit();
			if (!payload || mode === "none") return;
			const checked = validateRange(mode, payload.start, payload.end);
			if (!checked) return;
			const { start, end } = checked;
			if ((mode === "move" || mode === "resize-start" || mode === "resize-end") && payload.eventId) try {
				await store.move(payload.eventId, start, end);
				const ev = store.byId(payload.eventId);
				if (ev) get(effectiveMove)?.(ev, start, end);
			} catch (e) {
				if (isReadOnlyError(e)) {
					const ev = store.byId(payload.eventId);
					if (ev) get(effectiveMove)?.(ev, start, end);
				} else if (!isNotFoundError(e) && !$$props.onerror) console.warn("[calendar] drag commit failed:", e);
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
				return get(checkedCreate);
			},
			get oneventmove() {
				return get(effectiveMove);
			},
			get oneventhover() {
				return $$props.oneventhover;
			},
			get ondayclick() {
				return $$props.ondayclick ? (d) => $$props.ondayclick(unzone(d)) : get(defaultDayClick);
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
			announce,
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
		untrack(() => {
			if (get(effectiveAdapter).fetchEventsSync) store.load({
				start: viewState.range.start,
				end: viewState.range.end
			});
		});
		user_effect(() => {
			if ($$props.view) viewState.setView($$props.view);
		});
		user_effect(() => {
			const d = zoneIn($$props.currentDate);
			if (d && untrack(() => viewState.focusDate.getTime()) !== d.getTime()) untrack(() => viewState.setFocusDate(d));
		});
		user_effect(() => {
			if ($$props.days !== void 0 && viewState.dayCount !== $$props.days) viewState.setDayCount($$props.days);
		});
		user_effect(() => {
			const d = unzone(viewState.focusDate);
			untrack(() => $$props.ondatechange?.(d));
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
			if (requested.component === Agenda || requested.id.endsWith("-agenda")) return requested;
			return views().find((v) => v.id === `${requested.mode}-mobile`) ?? requested;
		});
		const activeView = /* @__PURE__ */ user_derived(() => get(resolvedView));
		const desktopViews = /* @__PURE__ */ user_derived(() => views().filter((v) => !v.id.endsWith("-mobile")));
		const dateLabel = /* @__PURE__ */ user_derived(() => {
			if (!showDates()) return "";
			if (viewState.mode === "day") return viewState.focusDate.toLocaleDateString($$props.locale ?? getDefaultLocale(), {
				weekday: "long",
				month: "short",
				day: "numeric"
			});
			if (viewState.mode === "week") return fmtWeekRange(viewState.range.start.getTime(), $$props.locale, viewState.range.end.getTime() - 1);
			return viewState.focusDate.toLocaleDateString($$props.locale ?? getDefaultLocale(), {
				month: "long",
				year: "numeric"
			});
		});
		let note = /* @__PURE__ */ state(null);
		function announce(text) {
			set(note, {
				text: get(note)?.text === text ? `${text}\u00a0` : text,
				label: get(dateLabel)
			}, true);
		}
		const noteText = /* @__PURE__ */ user_derived(() => get(note) && get(note).label === get(dateLabel) ? get(note).text : "");
		const periodTitle = /* @__PURE__ */ user_derived(() => {
			if (!showDates()) return "";
			const loc = $$props.locale ?? getDefaultLocale();
			if (viewState.mode === "day") return viewState.focusDate.toLocaleDateString(loc, {
				weekday: get(useMobile) ? "short" : "long",
				month: "long",
				day: "numeric",
				year: "numeric"
			});
			const s = viewState.mode === "week" ? viewState.range.start : viewState.focusDate;
			const e = viewState.mode === "week" ? /* @__PURE__ */ new Date(viewState.range.end.getTime() - 1) : s;
			if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) return s.toLocaleDateString(loc, {
				month: "long",
				year: "numeric"
			});
			return new Intl.DateTimeFormat(loc, {
				month: "short",
				year: "numeric"
			}).formatRange(s, e).replace(/[  ]/g, " ");
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
		/** Built-in view-type names are shown in the calendar's language. */
		function viewLabel(label) {
			if (label === "Planner") return get(L).planner;
			if (label === "Agenda") return get(L).agenda;
			if (label === "Scroll") return get(L).scroll;
			return label;
		}
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
		const clock = createClock(untrack(() => $$props.timezone));
		const viewIncludesToday = /* @__PURE__ */ user_derived(() => {
			const now = new Date(clock.tick);
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
			const inRadio = t?.getAttribute("role") === "radio";
			const rtl = !!get(calEl) && getComputedStyle(get(calEl)).direction === "rtl";
			if (e.key === "t" || e.key === "T") {
				e.preventDefault();
				viewState.goToday();
			} else if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && !inRadio) {
				e.preventDefault();
				if (e.key === "ArrowRight" !== rtl) viewState.next();
				else viewState.prev();
			}
		}
		function pillKeys(e) {
			const radios = [...e.currentTarget.querySelectorAll("[role=\"radio\"]")];
			const i = radios.indexOf(e.target);
			if (i < 0) return;
			const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
			const step = {
				ArrowRight: rtl ? -1 : 1,
				ArrowLeft: rtl ? 1 : -1,
				ArrowDown: 1,
				ArrowUp: -1
			};
			let n;
			if (e.key === "Home") n = 0;
			else if (e.key === "End") n = radios.length - 1;
			else if (e.key in step) n = (i + step[e.key] + radios.length) % radios.length;
			else return;
			e.preventDefault();
			radios[n].focus();
			radios[n].click();
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
		var div = root_8();
		let classes;
		var node = child(div);
		var consequent = ($$anchor) => {
			var fragment = comment();
			snippet(first_child(fragment), () => $$props.header, () => get(headerCtx));
			append($$anchor, fragment);
		};
		var consequent_5 = ($$anchor) => {
			var div_1 = root_4();
			let classes_1;
			var span = child(div_1);
			var text_1 = only_child(span, true);
			var span_1 = sibling(span, 2);
			var text_2 = only_child(span_1, true);
			var node_2 = sibling(span_1, 2);
			var consequent_1 = ($$anchor) => {
				const activeLabel = /* @__PURE__ */ user_derived(() => get(labelsForMode).includes(get(activeView)?.label ?? "") ? get(activeView)?.label : get(labelsForMode)[0]);
				var div_2 = root_1();
				each(div_2, 20, () => get(labelsForMode), (label) => label, ($$anchor, label) => {
					var button = root();
					let classes_2;
					var text_3 = only_child(button, true);
					template_effect(($0) => {
						classes_2 = set_class(button, 1, "cal-pill svelte-1b53e7w", null, classes_2, { "cal-pill--active": get(activeView)?.label === label });
						set_attribute(button, "aria-checked", get(activeView)?.label === label);
						set_attribute(button, "tabindex", label === get(activeLabel) ? 0 : -1);
						set_text(text_3, $0);
					}, [() => viewLabel(label)]);
					delegated("click", button, () => switchLabel(label));
					append($$anchor, button);
				});
				reset(div_2);
				template_effect(() => set_attribute(div_2, "aria-label", get(L).viewMode));
				delegated("keydown", div_2, pillKeys);
				append($$anchor, div_2);
			};
			if_block(node_2, ($$render) => {
				if (showModePills() && !get(useMobile) && get(labelsForMode).length > 1) $$render(consequent_1);
			});
			var node_3 = sibling(node_2, 2);
			var consequent_2 = ($$anchor) => {
				const activeMode = /* @__PURE__ */ user_derived(() => get(modes).includes(viewState.mode) ? viewState.mode : get(modes)[0]);
				var div_3 = root_2();
				each(div_3, 20, () => get(modes), (g) => g, ($$anchor, g) => {
					var button_1 = root();
					let classes_3;
					var text_4 = only_child(button_1, true);
					template_effect(() => {
						classes_3 = set_class(button_1, 1, "cal-pill svelte-1b53e7w", null, classes_3, { "cal-pill--active": viewState.mode === g });
						set_attribute(button_1, "aria-checked", viewState.mode === g);
						set_attribute(button_1, "tabindex", g === get(activeMode) ? 0 : -1);
						set_text(text_4, g === "day" ? get(L).day : g === "week" ? get(L).week : get(L).month);
					});
					delegated("click", button_1, () => switchMode(g));
					append($$anchor, button_1);
				});
				reset(div_3);
				template_effect(() => set_attribute(div_3, "aria-label", get(L).viewMode));
				delegated("keydown", div_3, pillKeys);
				append($$anchor, div_3);
			};
			if_block(node_3, ($$render) => {
				if (showModePills() && get(modes).length > 1) $$render(consequent_2);
			});
			var div_4 = sibling(node_3, 2);
			var node_4 = child(div_4);
			var consequent_3 = ($$anchor) => {
				var fragment_1 = comment();
				snippet(first_child(fragment_1), () => $$props.navigation, () => get(navCtx));
				append($$anchor, fragment_1);
			};
			var consequent_4 = ($$anchor) => {
				var fragment_2 = root_3();
				var button_2 = first_child(fragment_2);
				var text_5 = only_child(button_2, true);
				var button_3 = sibling(button_2, 2);
				var button_4 = sibling(button_3, 2);
				template_effect(() => {
					button_2.disabled = get(viewIncludesToday);
					set_attribute(button_2, "title", get(L).goToToday);
					set_text(text_5, get(L).today);
					set_attribute(button_3, "aria-label", viewState.mode === "day" ? get(L).previousDay : viewState.mode === "month" ? get(L).previousMonth : get(L).previousWeek);
					set_attribute(button_4, "aria-label", viewState.mode === "day" ? get(L).nextDay : viewState.mode === "month" ? get(L).nextMonth : get(L).nextWeek);
				});
				delegated("click", button_2, () => viewState.goToday());
				delegated("click", button_3, () => viewState.prev());
				delegated("click", button_4, () => viewState.next());
				append($$anchor, fragment_2);
			};
			if_block(node_4, ($$render) => {
				if ($$props.navigation) $$render(consequent_3);
				else if (showNavigation()) $$render(consequent_4, 1);
			});
			reset(div_4);
			reset(div_1);
			template_effect(() => {
				classes_1 = set_class(div_1, 1, "cal-hd svelte-1b53e7w", null, classes_1, {
					"cal-hd--mobile": get(useMobile),
					"cal-hd--stack": get(stackHeader)
				});
				set_text(text_1, get(periodTitle));
				set_text(text_2, get(noteText) || get(dateLabel));
			});
			append($$anchor, div_1);
		};
		if_block(node, ($$render) => {
			if ($$props.header) $$render(consequent);
			else if (showNavigation() || showModePills() && get(modes).length > 1 || get(dateLabel)) $$render(consequent_5, 1);
		});
		var node_6 = sibling(node, 2);
		var consequent_6 = ($$anchor) => {
			var span_2 = root_5();
			var text_6 = only_child(span_2, true);
			template_effect(() => set_text(text_6, get(noteText)));
			append($$anchor, span_2);
		};
		if_block(node_6, ($$render) => {
			if ($$props.header || !(showNavigation() || showModePills() && get(modes).length > 1 || get(dateLabel))) $$render(consequent_6);
		});
		var div_5 = sibling(node_6, 2);
		let classes_4;
		var node_7 = child(div_5);
		var consequent_7 = ($$anchor) => {
			const Comp = /* @__PURE__ */ user_derived(() => get(activeView).component);
			var fragment_3 = comment();
			component(first_child(fragment_3), () => get(Comp), ($$anchor, Comp_1) => {
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
						return get(checkedCreate);
					},
					get onexternaldrop() {
						return get(effectiveExternalDrop);
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
			append($$anchor, fragment_3);
		};
		var alternate = ($$anchor) => {
			var div_6 = root_6();
			var text_7 = only_child(div_6, true);
			template_effect(() => set_text(text_7, get(L).noViews));
			append($$anchor, div_6);
		};
		if_block(node_7, ($$render) => {
			if (get(activeView)) $$render(consequent_7);
			else $$render(alternate, -1);
		});
		reset(div_5);
		var node_9 = sibling(div_5, 2);
		var consequent_8 = ($$anchor) => {
			append($$anchor, root_7());
		};
		if_block(node_9, ($$render) => {
			if (store.loading) $$render(consequent_8);
		});
		reset(div);
		bind_this(div, ($$value) => set(calEl, $$value), () => get(calEl));
		template_effect(() => {
			classes = set_class(div, 1, "cal svelte-1b53e7w", null, classes, { "cal--auto": heightProp() === "auto" });
			set_style(div, `${get(effectiveTheme) ?? ""}; ${heightProp() === "auto" ? "" : `--cal-h: ${heightProp()}px;`} --cal-r: ${borderRadius() ?? ""}px;${$$props.eventFill == null ? "" : ` --dt-ev-fill: ${$$props.eventFill * 100}%;`}${$$props.eventBar == null ? "" : ` --dt-ev-bar: ${$$props.eventBar}px;`}`);
			set_attribute(div, "aria-label", get(L).calendar);
			set_attribute(div, "aria-busy", store.loading || void 0);
			set_attribute(div, "dir", get(resolvedDir));
			set_attribute(div, "lang", $$props.locale);
			classes_4 = set_class(div_5, 1, "cal-body svelte-1b53e7w", null, classes_4, { "cal-body--unmeasured": mobileProp() === "auto" && get(containerWidth) === 0 });
			div.dir = div.dir;
		});
		delegated("keydown", div, handleShortcuts);
		append($$anchor, div);
		pop();
	}
	delegate(["keydown", "click"]);
	// src/lib/adapters/memory.ts
	var counter = 0;
	function uid() {
		return `mem-${Date.now()}-${++counter}`;
	}
	function createMemoryAdapter(initial = [], options) {
		const events = [...initial];
		const palette = options?.palette;
		const colorAssignments = /* @__PURE__ */ new Map();
		let colorIndex = 0;
		function resolveColor(ev) {
			if (ev.color || !palette?.length) return ev.color;
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
			return overlapsRange(ev, range.start, range.end);
		}
		const fetchEventsSync = (range) => events.filter((ev) => overlaps(ev, range)).map(withColor);
		return {
			fetchEventsSync,
			async fetchEvents(range) {
				return fetchEventsSync(range);
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
				if (idx < 0) throw new EventNotFoundError(id);
				events[idx] = {
					...events[idx],
					...patch,
					id
				};
				return withColor(events[idx]);
			},
			async deleteEvent(id) {
				const idx = events.findIndex((e) => e.id === id);
				if (idx < 0) throw new EventNotFoundError(id);
				events.splice(idx, 1);
			}
		};
	}
	// src/lib/widget/CalendarWidget.svelte
	function CalendarWidget($$anchor, $$props) {
		push($$props, true);
		/** Events endpoint — fetched as `GET {api}?start=…&end=…` (ISO instants); answers an array of events or `{ events: [...] }` */
		/** JSON string of events for static/inline data (alternative to api) */
		/** Theme preset name: auto (default — adapts to the host page), neutral, midnight */
		/** Default view ID */
		/** Calendar height: pixels (e.g. "600") or "auto" */
		/** BCP 47 locale tag (e.g. 'en-US', 'pl-PL') */
		/** Text direction: ltr, rtl, auto */
		/** Start week on Monday (default: true) */
		/** Custom HTTP headers as JSON string for REST adapter */
		/** Read-only unless explicitly "false" — an anonymous embed has nowhere to store an edit */
		/** Show the Day/Week/Month pills (default: true) */
		/** Show prev/next/today navigation (default: true) */
		/** Mobile mode: "auto" (default), "true", "false" */
		/** Days shown in week mode, e.g. "3" or "5" */
		/** Compact agenda rendering: "true" */
		/** IANA timezone, e.g. "Europe/Warsaw" */
		/** Minimum day-column width in px for the week grid (default: 110) — a narrower container scrolls sideways */
		/** Visible hours of the time grids, "start-end" in whole hours (e.g. "6-22") */
		/** UI words as a JSON object over the English defaults, e.g. '{"today":"Dziś"}' */
		/** Set by the <day-calendar> element: fires its `eventclick` / `eventmove` DOM events */
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
		const minColumnWidthValue = /* @__PURE__ */ user_derived(() => {
			if (!$$props.mincolumnwidth) return void 0;
			const n = parseInt($$props.mincolumnwidth, 10);
			return Number.isNaN(n) || n < 0 ? void 0 : n;
		});
		const hoursValue = /* @__PURE__ */ user_derived(() => {
			const m = $$props.hours?.trim().match(/^(\d{1,2})\s*-\s*(\d{1,2})$/);
			if (!m) return void 0;
			const [from, to] = [Number(m[1]), Number(m[2])];
			return from < to && to <= 24 ? [from, to] : void 0;
		});
		const labelsValue = /* @__PURE__ */ user_derived(() => {
			if (!$$props.labels) return void 0;
			try {
				const parsed = JSON.parse($$props.labels);
				if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
			} catch {}
			console.warn("[day-calendar] Failed to parse labels JSON:", $$props.labels);
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
				color: raw.color ? String(raw.color) : void 0,
				allDay: raw.allDay === true ? true : void 0,
				subtitle: typeof raw.subtitle === "string" ? raw.subtitle : void 0,
				location: typeof raw.location === "string" ? raw.location : void 0
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
		/**
		* The documented widget contract: `GET {api}?start=…&end=…`, answered by
		* an array of events or `{ events: [...] }` with ISO date strings. Read
		* only — there is no write endpoint to call. No Content-Type on the GET,
		* so a cross-origin embed stays a simple request (no CORS preflight)
		* unless the page adds its own `headers`.
		*/
		function createApiAdapter(url, extraHeaders) {
			return { async fetchEvents(range) {
				const params = new URLSearchParams({
					start: range.start.toISOString(),
					end: range.end.toISOString()
				});
				const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}${params}`, { headers: {
					Accept: "application/json",
					...extraHeaders
				} });
				if (!res.ok) throw new Error(`[day-calendar] ${url} answered ${res.status} ${res.statusText}`);
				const data = await res.json();
				return (Array.isArray(data) ? data : data && typeof data === "object" && Array.isArray(data.events) ? data.events : []).map((e, idx) => e && typeof e === "object" ? toEvent(e, `api-${idx}`) : null).filter((ev) => ev !== null);
			} };
		}
		const adapter = /* @__PURE__ */ user_derived(() => {
			if ($$props.api) return createApiAdapter($$props.api, parseHeaders($$props.headers));
			return createMemoryAdapter(parseEvents($$props.events));
		});
		{
			let $0 = /* @__PURE__ */ user_derived(() => $$props.readonly !== "false");
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
				},
				get minColumnWidth() {
					return get(minColumnWidthValue);
				},
				get visibleHours() {
					return get(hoursValue);
				},
				get labels() {
					return get(labelsValue);
				},
				oneventclick: (event, anchor) => $$props.emit?.("eventclick", {
					event,
					anchor
				}),
				oneventmove: (event, start, end) => $$props.emit?.("eventmove", {
					event,
					start,
					end
				})
			});
		}
		pop();
	}
	// src/lib/widget/widget.ts
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
		"timezone",
		"mincolumnwidth",
		"hours",
		"labels"
	];
	/**
	* Attribute values as reactive props for `mount()`. A plain .ts module has
	* no `$state`, so each getter reports a read through its own
	* `createSubscriber` and `set()` invalidates that attribute's readers only —
	* the component re-renders what changed without a remount (view, focus date
	* and loaded events survive; changing `view` does not rebuild the adapter).
	*/
	function createReactiveProps(initial) {
		const values = { ...initial };
		const invalidators = /* @__PURE__ */ new Map();
		const props = {};
		for (const attr of WIDGET_ATTRS) {
			const track = createSubscriber((update) => {
				invalidators.set(attr, update);
				return () => invalidators.delete(attr);
			});
			Object.defineProperty(props, attr, {
				enumerable: true,
				get() {
					track();
					return values[attr];
				}
			});
		}
		return {
			props,
			set(name, value) {
				if (values[name] === value) return;
				values[name] = value;
				invalidators.get(name)?.();
			}
		};
	}
	function isWidgetAttr(name) {
		return WIDGET_ATTRS.includes(name);
	}
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
			const attrs = createReactiveProps(this.readProps());
			const emit = (type, detail) => this.dispatchEvent(new CustomEvent(type, {
				detail,
				bubbles: true
			}));
			const component = mount(CalendarWidget, {
				target: root,
				props: Object.assign(attrs.props, { emit })
			});
			this.instance = {
				component,
				attrs
			};
		}
		disconnectedCallback() {
			if (this.instance) unmount(this.instance.component);
			this.instance = null;
		}
		attributeChangedCallback(name, _oldValue, newValue) {
			if (!this.instance || !isWidgetAttr(name)) return;
			this.instance.attrs.set(name, newValue ?? void 0);
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
	if (!customElements.get("day-calendar")) {
		customElements.define("day-calendar", DayCalendarElement);
		const registry = customElements;
		for (const el of document.querySelectorAll("day-calendar")) {
			if (el instanceof DayCalendarElement) continue;
			try {
				registry.initialize?.(el);
			} catch {}
			customElements.upgrade(el);
		}
	}
})();
