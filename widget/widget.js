globalThis.__DAY_CALENDAR_CSS__ = ":host{display:block}\n\t/* ─── Container ──────────────────────────────────── */\n\t.fs.svelte-mrwdy7 {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\t/* The track is px-sized from the container width; never let it feed\n\t\t   back into our own intrinsic size (host flex/grid min-width:auto\n\t\t   would otherwise loop container → hourWidth → track → container). */\n\t\tcontain: inline-size;\n\t}\n\t.fs--auto.svelte-mrwdy7 { overflow: visible; }\n\n\t/* ─── Horizontal scroll ──────────────────────────── */\n\t.fs-scroll.svelte-mrwdy7 {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\toverflow-x: auto;\n\t\toverflow-y: hidden;\n\t\ttouch-action: pan-x;\n\t\tcursor: default;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t}\n\t/* Auto height grows vertically, but horizontal containment must stay —\n\t   overflow: visible here painted the whole track outside the calendar. */\n\t.fs--auto.svelte-mrwdy7 .fs-scroll:where(.svelte-mrwdy7) { height: auto; overflow-x: auto; overflow-y: hidden; }\n\t.fs-scroll.svelte-mrwdy7::-webkit-scrollbar { height: 5px; }\n\t.fs-scroll.svelte-mrwdy7::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-scrollbar, rgba(0, 0, 0, 0.1));\n\t\tborder-radius: 4px;\n\t}\n\t.fs-scroll.svelte-mrwdy7::-webkit-scrollbar-track { background: transparent; }\n\t.fs-readonly.svelte-mrwdy7 { cursor: grab; }\n\t.fs-grabbing.svelte-mrwdy7 { cursor: grabbing; }\n\n\t.fs-track.svelte-mrwdy7 {\n\t\tposition: relative;\n\t\theight: 100%;\n\t}\n\n\t/* ─── Day block ──────────────────────────────────── */\n\t.fs-day.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\theight: 100%;\n\t\tborder-left: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.14));\n\t\tbox-sizing: border-box;\n\t}\n\t.fs-today.svelte-mrwdy7 { background: var(--dt-today-bg, color-mix(in srgb, var(--dt-accent, #2563eb) 8%, transparent)); }\n\t/* Past days: dim via a background wash instead of a subtree opacity so\n\t   event text keeps full contrast. */\n\t.fs-past.svelte-mrwdy7 { background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent); }\n\n\t/* ─── Disabled day ───────────────────────────────── */\n\t.fs-disabled.svelte-mrwdy7 {\n\t\topacity: 0.35;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tvar(--dt-border, rgba(0, 0, 0, 0.08)) 6px,\n\t\t\tvar(--dt-border, rgba(0, 0, 0, 0.08)) 7px\n\t\t) !important;\n\t}\n\n\t/* ─── Blocked slot overlay ───────────────────────── */\n\t.fs-blocked.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 18px;\n\t\tbottom: 0;\n\t\tz-index: 3;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t\tborder-radius: 4px;\n\t\tpointer-events: none;\n\t\tdisplay: flex;\n\t\talign-items: flex-end;\n\t\tjustify-content: center;\n\t\tpadding-bottom: 6px;\n\t}\n\n\t.fs-blocked-label.svelte-mrwdy7 {\n\t\tfont: 500 9px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ─── Custom day header ──────────────────────────── */\n\t.fs-day-header-custom.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 16px;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\tz-index: 4;\n\t\tpointer-events: auto;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ─── Hour ticks ─────────────────────────────────── */\n\t.fs-tick.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: 0;\n\t}\n\t.fs-tick.svelte-mrwdy7::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\ttop: 18px;\n\t\tbottom: 0;\n\t\twidth: 1px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.fs-tick-lb.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 2px;\n\t\tleft: 5px;\n\t\tfont: 500 10px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\twhite-space: nowrap;\n\t\tpointer-events: none;\n\t}\n\t/* Half-hour guide: full-height line at low opacity through the event area */\n\t.fs-tick--half.svelte-mrwdy7::before {\n\t\ttop: 18px;\n\t\tbottom: 0;\n\t\topacity: 0.35;\n\t}\n\n\t/* ─── Now-line ────────────────────────────────────── */\n\t.fs-now.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\tz-index: 10;\n\t\tpointer-events: none;\n\t\ttransform: translateX(-1px);\n\t}\n\t.fs-now-line.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\twidth: 2px;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tbox-shadow: 0 0 8px var(--dt-glow, rgba(37, 99, 235, 0.25));\n\t}\n\t.fs-now-tag.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\t/* Below the hour-label row (labels sit at top: 2px) so the tag never\n\t\t   collides with an hour label near hour boundaries. */\n\t\ttop: 20px;\n\t\tleft: 8px;\n\t\tfont: 700 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-bg, #ffffff) 92%, var(--dt-accent, #2563eb));\n\t\tborder: 1px solid var(--dt-accent-dim, rgba(37, 99, 235, 0.12));\n\t\tpadding: 3px 6px;\n\t\tborder-radius: 4px;\n\t\twhite-space: nowrap;\n\t\tz-index: 1;\n\t}\n\t/* ─── All-day strip ─────────────────────────────── */\n\t/* The container is a full-width overlay — let clicks pass through it and\n\t   only the chips themselves capture pointer events. */\n\t.fs-allday.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tdisplay: flex;\n\t\tgap: 6px;\n\t\tpadding: 0 8px;\n\t\tz-index: 7;\n\t\toverflow-x: auto;\n\t\tscrollbar-width: none;\n\t\tpointer-events: none;\n\t}\n\t.fs-allday.svelte-mrwdy7::-webkit-scrollbar { display: none; }\n\n\t.fs-ad.svelte-mrwdy7 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 2px 8px;\n\t\tborder-radius: 4px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-left: 3px solid var(--ev-color);\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t\tmin-width: 0;\n\t\tmax-width: 320px;\n\t\tcursor: pointer;\n\t\ttransition: background 0.15s;\n\t\tpointer-events: auto;\n\t}\n\t.fs-ad.svelte-mrwdy7:hover {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 28%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.fs-ad.svelte-mrwdy7:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.fs-ad--selected.svelte-mrwdy7 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 30%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-left-width: 4px;\n\t}\n\n\t.fs-ad-dot.svelte-mrwdy7 {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\n\t.fs-ad-title.svelte-mrwdy7 {\n\t\tfont-size: 0.7rem;\n\t\tfont-weight: 500;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tflex: 0 1 auto;\n\t\tmin-width: 0;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.fs-ad-span.svelte-mrwdy7 {\n\t\tfont-size: 0.6rem;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex-shrink: 0;\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.fs-event.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\tz-index: 6;\n\t\tborder-radius: 6px;\n\t\t/* Editable events are grabbable; touch drags move the event instead of\n\t\t   scrolling the strip. */\n\t\tcursor: grab;\n\t\ttouch-action: none;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t\t/* Solid stripe at the start edge — matches the week view, keeps the\n\t\t   pure tour color visible while the body stays a readable tint. */\n\t\tborder-left: 3px solid var(--ev-color);\n\t\toverflow: hidden;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\t/* top/height only: lane reflow animates on drop; left/width stay instant so\n\t\t   mount-time width measurement and infinite-scroll rebases don't slide cards */\n\t\ttransition: box-shadow 120ms, background 120ms,\n\t\t\ttop 180ms cubic-bezier(0.2, 0.8, 0.2, 1), height 180ms cubic-bezier(0.2, 0.8, 0.2, 1);\n\t}\n\t.fs-event.svelte-mrwdy7:hover {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 32%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tbox-shadow: 0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t}\n\t.fs-event--selected.svelte-mrwdy7 {\n\t\tbox-shadow: 0 0 0 2px var(--ev-color), 0 2px 14px color-mix(in srgb, var(--ev-color) 35%, transparent);\n\t}\n\t.fs-event--current.svelte-mrwdy7 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tbox-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ev-color) 20%, transparent);\n\t}\n\t.fs-event--next.svelte-mrwdy7 {\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 75%, transparent);\n\t}\n\t.fs-event--dragging.svelte-mrwdy7 {\n\t\topacity: 0.85;\n\t\tz-index: 50;\n\t\tbox-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);\n\t\tcursor: grabbing;\n\t\t/* fast ease toward the snapped cursor position */\n\t\ttransition: left 80ms ease-out, width 80ms ease-out;\n\t}\n\t.fs-event--resizing.svelte-mrwdy7 {\n\t\tcursor: ew-resize;\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t.fs-ev-handle.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\twidth: 6px;\n\t\tz-index: 2;\n\t\tcursor: ew-resize;\n\t\ttouch-action: none;\n\t}\n\t/* Hit-slop: ~20px effective grab zone while the visual stays 6px */\n\t.fs-ev-handle.svelte-mrwdy7::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tbottom: 0;\n\t\tleft: -7px;\n\t\tright: -7px;\n\t}\n\t.fs-ev-handle--start.svelte-mrwdy7 { left: 0; }\n\t.fs-ev-handle--end.svelte-mrwdy7 { right: 0; }\n\t.fs-ev-handle.svelte-mrwdy7::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\ttop: 20%;\n\t\tbottom: 20%;\n\t\tleft: 2px;\n\t\twidth: 2px;\n\t\tborder-radius: 2px;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.fs-event.svelte-mrwdy7:hover .fs-ev-handle:where(.svelte-mrwdy7)::after,\n\t.fs-event.svelte-mrwdy7:focus-within .fs-ev-handle:where(.svelte-mrwdy7)::after { opacity: 0.55; }\n\t/* Coarse pointers can't hover — show the grips persistently */\n\t@media (hover: none) {\n\t\t.fs-ev-handle.svelte-mrwdy7::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Drag-to-create ghost ───────────────────────── */\n\t.fs-create-ghost.svelte-mrwdy7 {\n\t\tposition: absolute;\n\t\tz-index: 40;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 14%, transparent);\n\t\tborder: 1px dashed color-mix(in srgb, var(--dt-accent, #2563eb) 60%, transparent);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: center;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t}\n\t.fs-create-ghost-time.svelte-mrwdy7 {\n\t\tfont: 600 10px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tpadding: 6px 4px;\n\t\twhite-space: nowrap;\n\t}\n\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.fs-event.svelte-mrwdy7,\n\t\t.fs-event--dragging.svelte-mrwdy7 {\n\t\t\ttransition: box-shadow 120ms, background 120ms;\n\t\t}\n\t\t.fs-create-ghost.svelte-mrwdy7,\n\t\t.fs-ad.svelte-mrwdy7,\n\t\t.fs-ev-handle.svelte-mrwdy7::after {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\t/* Cancelled: strikethrough + secondary text, not a subtree opacity dim */\n\t.fs-event--cancelled.svelte-mrwdy7 .fs-ev-title:where(.svelte-mrwdy7) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.fs-event--tentative.svelte-mrwdy7 {\n\t\topacity: 0.65;\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t}\n\t.fs-event--full.svelte-mrwdy7 {\n\t\topacity: 0.55;\n\t}\n\t.fs-event--limited.svelte-mrwdy7 {\n\t\topacity: 0.65;\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t}\n\t.fs-event--readonly.svelte-mrwdy7,\n\t.fs-readonly.svelte-mrwdy7 .fs-event:where(.svelte-mrwdy7) {\n\t\tcursor: default;\n\t}\n\n\t/* Event inner — vertical text along lane height (day filmstrip) */\n\t.fs-ev-inner.svelte-mrwdy7 {\n\t\twriting-mode: vertical-rl;\n\t\ttext-orientation: mixed;\n\t\ttransform: rotate(180deg);\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tgap: 6px;\n\t\theight: 100%;\n\t\tmax-width: 100%;\n\t\toverflow: hidden;\n\t\tbox-sizing: border-box;\n\t\tpadding: 8px 4px;\n\t}\n\t.fs-ev-live.svelte-mrwdy7 {\n\t\tflex-shrink: 0;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t}\n\t.fs-ev-next-badge.svelte-mrwdy7 {\n\t\tflex-shrink: 0;\n\t\tfont: 600 8px/1 var(--dt-sans, system-ui, sans-serif);\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\t.fs-ev-title.svelte-mrwdy7 {\n\t\tfont: 600 13px/1.15 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\t/* In vertical writing mode line boxes stack as columns — allow a\n\t\t   second column before truncating so overlapping (short) cards keep\n\t\t   readable names. Full name is in the title tooltip. */\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\twhite-space: normal;\n\t\tmax-height: 100%;\n\t\tflex-shrink: 0;\n\t}\n\t.fs-ev-time.svelte-mrwdy7 {\n\t\tfont: 400 10px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t.fs-ev-sub.svelte-mrwdy7 {\n\t\tfont: 400 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-height: 100%;\n\t\tflex-shrink: 0;\n\t}\n\t.fs-ev-loc.svelte-mrwdy7 {\n\t\tfont: 400 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-height: 100%;\n\t\tflex-shrink: 0;\n\t}\n\t.fs-ev-tags.svelte-mrwdy7 {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tgap: 4px;\n\t\tflex-shrink: 0;\n\t}\n\t.fs-ev-tag.svelte-mrwdy7 {\n\t\tfont: 500 8px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 18%, transparent);\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ─── Focus-visible ──────────────────────────────── */\n\t/* box-shadow instead of outline: outlines get clipped by the\n\t   overflow: hidden scroll container. */\n\t.fs-event.svelte-mrwdy7:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.tw.svelte-j4rvbp {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw--auto.svelte-j4rvbp { overflow: visible; }\n\n\t/* ─── Scroll container ───────────────────────────── */\n\t.tw-scroll.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\toverflow-y: auto;\n\t\toverflow-x: auto;\n\t\toverscroll-behavior: contain;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t}\n\t.tw--auto.svelte-j4rvbp .tw-scroll:where(.svelte-j4rvbp) { overflow-y: visible; }\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar { width: 5px; height: 5px; }\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-scrollbar, rgba(0, 0, 0, 0.1));\n\t\tborder-radius: 4px;\n\t}\n\t.tw-scroll.svelte-j4rvbp::-webkit-scrollbar-track { background: transparent; }\n\n\t.tw-inner.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\twidth: 100%;\n\t}\n\n\t/* ─── Sticky top (header + all-day) ──────────────── */\n\t.tw-top.svelte-j4rvbp {\n\t\tposition: sticky;\n\t\ttop: 0;\n\t\tz-index: 30;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t/* ─── Day header row ─────────────────────────────── */\n\t.tw-head.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t}\n\n\t.tw-corner.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 2;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t}\n\n\t.tw-hd.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: 110px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tgap: 2px;\n\t\tpadding: 8px 4px 6px;\n\t\tborder-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.tw-hd-wd.svelte-j4rvbp {\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.06em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.tw-hd--today.svelte-j4rvbp .tw-hd-wd:where(.svelte-j4rvbp) {\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tfont-weight: 600;\n\t}\n\n\t.tw-hd-num.svelte-j4rvbp {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tmin-width: 26px;\n\t\theight: 26px;\n\t\tborder-radius: 50%;\n\t\tfont: 600 14px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.tw-hd-num--today.svelte-j4rvbp {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-accent-fg, #ffffff);\n\t\tfont-weight: 700;\n\t}\n\n\t.tw-hd-custom.svelte-j4rvbp {\n\t\tmax-width: 100%;\n\t\toverflow: hidden;\n\t}\n\n\t/* ─── All-day strip ──────────────────────────────── */\n\t.tw-allday.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tborder-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.tw-ad-gutter.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 2;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: flex-end;\n\t\tpadding: 4px 6px 4px 0;\n\t}\n\t.tw-ad-gutter-lb.svelte-j4rvbp {\n\t\tfont: 500 10px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-align: right;\n\t}\n\n\t.tw-ad-cell.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: 110px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tpadding: 3px 3px 4px;\n\t\tborder-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.tw-ad-cell--today.svelte-j4rvbp { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }\n\n\t.tw-ad.svelte-j4rvbp {\n\t\tappearance: none;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t\tpadding: 2px 6px;\n\t\tmin-height: 18px;\n\t\tborder: none;\n\t\tborder-radius: 3px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-left: 2.5px solid var(--ev-color);\n\t\tcursor: pointer;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t\ttransition: background 0.12s;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ad.svelte-j4rvbp:hover {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 32%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.tw-ad--mid.svelte-j4rvbp,\n\t.tw-ad--end.svelte-j4rvbp:not(.tw-ad--start) {\n\t\tborder-left: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t\tborder-radius: 0 3px 3px 0;\n\t}\n\t.tw-ad--selected.svelte-j4rvbp {\n\t\tbox-shadow: 0 0 0 1.5px var(--ev-color);\n\t}\n\t.tw-ad--cancelled.svelte-j4rvbp .tw-ad-title:where(.svelte-j4rvbp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.tw-ad.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.tw-ad-title.svelte-j4rvbp {\n\t\tfont: 500 11px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.tw-ad-span.svelte-j4rvbp {\n\t\tfont: 400 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex-shrink: 0;\n\t}\n\t.tw-ad-cont.svelte-j4rvbp,\n\t.tw-ad-arrow.svelte-j4rvbp {\n\t\tfont-size: 10px;\n\t\tcolor: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tline-height: 1;\n\t}\n\t.tw-ad-arrow.svelte-j4rvbp { margin-left: auto; }\n\n\t.tw-ad-more.svelte-j4rvbp {\n\t\tappearance: none;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tborder-radius: 3px;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tpadding: 2px 6px;\n\t\tcursor: pointer;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ad-more.svelte-j4rvbp:hover { color: var(--dt-text, rgba(0, 0, 0, 0.87)); }\n\t.tw-ad-more.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Grid body ──────────────────────────────────── */\n\t.tw-body.svelte-j4rvbp {\n\t\tdisplay: flex;\n\t\tposition: relative;\n\t}\n\n\t/* ─── Time gutter ────────────────────────────────── */\n\t.tw-gutter.svelte-j4rvbp {\n\t\tflex-shrink: 0;\n\t\tposition: sticky;\n\t\tleft: 0;\n\t\tz-index: 20;\n\t\tbackground: var(--dt-bg, #ffffff);\n\t\tborder-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.tw-gutter-lb.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tright: 6px;\n\t\ttransform: translateY(-50%);\n\t\tfont: 500 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\twhite-space: nowrap;\n\t}\n\n\t.tw-gutter-now.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tright: -3px;\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\ttransform: translateY(-50%);\n\t\tz-index: 2;\n\t}\n\n\t/* ─── Columns wrapper ────────────────────────────── */\n\t.tw-cols.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tdisplay: flex;\n\t\tposition: relative;\n\t\tmin-width: 0;\n\t}\n\n\t/* ─── Guide lines ────────────────────────────────── */\n\t.tw-lines.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tpointer-events: none;\n\t\t/* Above the columns' background washes, below blocked/events/now */\n\t\tz-index: 1;\n\t}\n\t.tw-line.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 1px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.tw-line--half.svelte-j4rvbp { opacity: 0.4; }\n\n\t/* ─── Day column ─────────────────────────────────── */\n\t.tw-col.svelte-j4rvbp {\n\t\tflex: 1 1 0;\n\t\tmin-width: 110px;\n\t\tposition: relative;\n\t\tborder-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tbox-sizing: border-box;\n\t}\n\t/* The gutter's right border already bounds the first column */\n\t.tw-lines.svelte-j4rvbp + .tw-col:where(.svelte-j4rvbp) { border-left: none; }\n\n\t.tw-col--today.svelte-j4rvbp { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }\n\t/* Dim past days with a wash, never a subtree opacity (event contrast) */\n\t.tw-col--past.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 2.5%, transparent);\n\t}\n\t.tw-col--weekend.svelte-j4rvbp:not(.tw-col--today):not(.tw-col--past) {\n\t\tbackground: var(--dt-weekend-bg, rgba(0, 0, 0, 0.012));\n\t}\n\t.tw-col--disabled.svelte-j4rvbp {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tvar(--dt-border, rgba(0, 0, 0, 0.08)) 6px,\n\t\t\tvar(--dt-border, rgba(0, 0, 0, 0.08)) 7px\n\t\t) !important;\n\t}\n\n\t/* ─── Blocked slot overlay ───────────────────────── */\n\t.tw-blocked.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 2;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t\tpointer-events: none;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\tjustify-content: center;\n\t\toverflow: hidden;\n\t}\n\t.tw-blocked-lb.svelte-j4rvbp {\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t\twhite-space: nowrap;\n\t\tpadding-top: 4px;\n\t}\n\n\t/* ─── Now line ───────────────────────────────────── */\n\t.tw-now.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 2px;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tbox-shadow: 0 0 6px var(--dt-glow, rgba(37, 99, 235, 0.25));\n\t\tz-index: 12;\n\t\tpointer-events: none;\n\t\ttransform: translateY(-1px);\n\t}\n\t.tw-now-dot.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: -4px;\n\t\ttop: -3px;\n\t\twidth: 8px;\n\t\theight: 8px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.tw-ev.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tz-index: 6;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 14%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\toverflow: hidden;\n\t\tcursor: grab;\n\t\t/* Pointer drags move the event, never scroll the grid */\n\t\ttouch-action: none;\n\t\ttransition: box-shadow 120ms, background 120ms;\n\t\tbox-sizing: border-box;\n\t\tmin-height: 24px;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.tw-ev.svelte-j4rvbp:hover {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 24%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tz-index: 8;\n\t}\n\t/* Short blocks keep duration-proportional height, but get a 44px\n\t   transparent hit-slop so clicks/taps still land. */\n\t.tw-ev--short.svelte-j4rvbp { overflow: visible; }\n\t.tw-ev--short.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.tw-ev--selected.svelte-j4rvbp {\n\t\tbox-shadow: 0 0 0 2px var(--ev-color),\n\t\t\t0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t\tz-index: 9;\n\t}\n\t.tw-ev--current.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.tw-ev--resizing.svelte-j4rvbp {\n\t\tz-index: 50;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n\t\tcursor: ns-resize;\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — consistent with the other views. */\n\t.tw-ev--cancelled.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.tw-ev--cancelled.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.tw-ev--cancelled.svelte-j4rvbp .tw-ev-stripe:where(.svelte-j4rvbp) { opacity: 0.45; /* decorative bar only */ }\n\t.tw-ev--tentative.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.tw-ev--full.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.tw-ev--full.svelte-j4rvbp .tw-ev-title:where(.svelte-j4rvbp) { color: var(--dt-text-2, rgba(0, 0, 0, 0.54)); }\n\t.tw-ev--limited.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.tw-ev--readonly.svelte-j4rvbp { cursor: default; }\n\n\t.tw-ev-stripe.svelte-j4rvbp {\n\t\twidth: 3px;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tborder-radius: 5px 0 0 5px;\n\t}\n\n\t.tw-ev-body.svelte-j4rvbp {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 3px 6px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\toverflow: hidden;\n\t}\n\t/* Compact (< ~35min at default zoom): single inline line \"9:00 Title\" */\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-body:where(.svelte-j4rvbp) {\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding-top: 1px;\n\t\tpadding-bottom: 1px;\n\t}\n\n\t.tw-ev-time.svelte-j4rvbp {\n\t\tfont: 400 11px/1.1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t.tw-ev--compact.svelte-j4rvbp .tw-ev-time:where(.svelte-j4rvbp) { order: 0; }\n\n\t.tw-ev-title.svelte-j4rvbp {\n\t\tfont: 600 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.tw-ev-loc.svelte-j4rvbp {\n\t\tfont: 400 10px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.tw-ev-live.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\ttop: 4px;\n\t\tright: 4px;\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tanimation: svelte-j4rvbp-tw-pulse 2s ease-in-out infinite;\n\t}\n\t@keyframes svelte-j4rvbp-tw-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t.tw-ev-handle.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 8px;\n\t\tz-index: 2;\n\t\tcursor: ns-resize;\n\t\ttouch-action: none;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp { top: 0; }\n\t.tw-ev-handle--end.svelte-j4rvbp { bottom: 0; }\n\t/* Hit-slop: ≥20px effective, extending inward so overflow clipping\n\t   can't cut it off. */\n\t.tw-ev-handle.svelte-j4rvbp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 20px;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp::before { top: 0; }\n\t.tw-ev-handle--end.svelte-j4rvbp::before { bottom: 0; }\n\t/* Short events: shrink the slop so a move-grab area survives */\n\t.tw-ev--short.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::before { height: 12px; }\n\t.tw-ev-handle.svelte-j4rvbp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 20px;\n\t\theight: 3px;\n\t\tborder-radius: 2px;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.tw-ev-handle--start.svelte-j4rvbp::after { top: 1px; }\n\t.tw-ev-handle--end.svelte-j4rvbp::after { bottom: 1px; }\n\t.tw-ev.svelte-j4rvbp:hover .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev.svelte-j4rvbp:focus-within .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev.svelte-j4rvbp:focus-visible .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev--resizing.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::after,\n\t.tw-ev--selected.svelte-j4rvbp .tw-ev-handle:where(.svelte-j4rvbp)::after { opacity: 0.55; }\n\t/* Coarse pointers can't hover — show the grips persistently */\n\t@media (hover: none) {\n\t\t.tw-ev-handle.svelte-j4rvbp::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Move / create ghost ────────────────────────── */\n\t.tw-ghost.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tleft: 1px;\n\t\tright: 3px;\n\t\tz-index: 40;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\toutline: 1px solid color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t\tbox-shadow: 0 6px 18px color-mix(in srgb, var(--ev-color) 24%, rgba(0, 0, 0, 0.22));\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\tpadding: 3px 6px;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t\tcursor: grabbing;\n\t\tbox-sizing: border-box;\n\t}\n\t.tw-ghost--create.svelte-j4rvbp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, transparent);\n\t\toutline: 1px dashed color-mix(in srgb, var(--ev-color) 60%, transparent);\n\t\tbox-shadow: none;\n\t}\n\t.tw-ghost-time.svelte-j4rvbp {\n\t\tfont: 600 11px/1.1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--ev-color, var(--dt-accent, #2563eb));\n\t\twhite-space: nowrap;\n\t}\n\t.tw-ghost-title.svelte-j4rvbp {\n\t\tfont: 600 12px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t/* ─── Empty overlay ──────────────────────────────── */\n\t.tw-empty.svelte-j4rvbp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpointer-events: none;\n\t\tz-index: 4;\n\t}\n\n\t/* ─── Focus-visible ──────────────────────────────── */\n\t/* box-shadow instead of outline: outlines get clipped by the\n\t   overflow: hidden scroll container. */\n\t.tw-ev.svelte-j4rvbp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tz-index: 9;\n\t}\n\n\t/* ─── Reduced motion ─────────────────────────────── */\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.tw-ev.svelte-j4rvbp,\n\t\t.tw-ad.svelte-j4rvbp,\n\t\t.tw-ev-handle.svelte-j4rvbp::after {\n\t\t\ttransition: none;\n\t\t}\n\t\t.tw-ev-live.svelte-j4rvbp { animation: none; }\n\t}\n\n\t/* ═══ Container ═══ */\n\t.ag.svelte-n8lbn1 {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\tbox-sizing: border-box;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\n\t.ag--auto.svelte-n8lbn1 { height: auto; overflow: visible; }\n\n\t/* Button UA reset for interactive cards/rows (real <button>s for a11y).\n\t   Placed first so later component rules override it.\n\t   user-select is scoped here (not on .ag) so event text stays copyable. */\n\t.ag-card.svelte-n8lbn1,\n\t.ag-allday-chip.svelte-n8lbn1,\n\t.ag-compact-row.svelte-n8lbn1,\n\t.ag-q-now.svelte-n8lbn1,\n\t.ag-q-done-item.svelte-n8lbn1,\n\t.ag-log-row.svelte-n8lbn1,\n\t.ag-q-done-toggle.svelte-n8lbn1 {\n\t\tfont: inherit;\n\t\tcolor: inherit;\n\t\ttext-align: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tbox-sizing: border-box;\n\t\tuser-select: none;\n\t}\n\n\t.ag--disabled.svelte-n8lbn1 {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 12px\n\t\t);\n\t}\n\n\t/* ═══ Body ═══ */\n\t.ag-body.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\tpadding-top: 8px;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-border) transparent;\n\t}\n\n\t/* ═══ In-view date header ═══ */\n\t.ag-day-head.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 0 16px 6px;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-day-head-badge.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);\n\t\tpadding: 2px 7px;\n\t\tborder-radius: 3px;\n\t}\n\t.ag-day-head-badge--muted.svelte-n8lbn1 {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tbackground: color-mix(in srgb, var(--dt-text-2, rgba(0, 0, 0, 0.54)) 10%, transparent);\n\t}\n\t.ag-day-head-name.svelte-n8lbn1 {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.2;\n\t}\n\t.ag-day-head-date.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1.2;\n\t}\n\t.ag--auto.svelte-n8lbn1 .ag-body:where(.svelte-n8lbn1) { overflow-y: visible; min-height: auto; }\n\t.ag-body.svelte-n8lbn1::-webkit-scrollbar {\n\t\twidth: 4px;\n\t}\n\t.ag-body.svelte-n8lbn1::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-border);\n\t\tborder-radius: 2px;\n\t}\n\n\t/* ═══ All-day strip ═══ */\n\t.ag-allday.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t\tpadding: 6px 16px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.ag-allday-label.svelte-n8lbn1 {\n\t\tfont: 600 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-items.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 6px;\n\t}\n\t.ag-allday-chip.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tpadding: 3px 10px;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 20%, transparent);\n\t\tcursor: pointer;\n\t\ttransition: background 0.15s, border-color 0.15s;\n\t}\n\t.ag-allday-chip.svelte-n8lbn1:hover,\n\t.ag-allday-chip.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 35%, transparent);\n\t}\n\t.ag-allday-chip.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-allday-chip--selected.svelte-n8lbn1 {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-allday-dot.svelte-n8lbn1 {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-title.svelte-n8lbn1 {\n\t\tfont: 500 0.75rem/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ═══ Shared: event card ═══ */\n\t.ag-card.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\tborder-radius: 10px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 10%, var(--dt-border, rgba(0, 0, 0, 0.08)));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, border-color 150ms;\n\t}\n\t.ag-card.svelte-n8lbn1:hover,\n\t.ag-card.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 40%, transparent);\n\t}\n\t.ag-card.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-card--selected.svelte-n8lbn1 {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-card--cancelled.svelte-n8lbn1 {\n\t\topacity: 0.5;\n\t}\n\t.ag-card--cancelled.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-card--tentative.svelte-n8lbn1 {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card--full.svelte-n8lbn1 {\n\t\topacity: 0.55;\n\t}\n\t.ag-card--limited.svelte-n8lbn1 {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card-body.svelte-n8lbn1 {\n\t\tpadding: 10px 12px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t\tmin-width: 0;\n\t\tflex: 1;\n\t}\n\t.ag-card-top.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: flex-start;\n\t\tgap: 8px;\n\t\tmin-width: 0;\n\t}\n\t.ag-card-title.svelte-n8lbn1 {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.3;\n\t\tword-break: break-word;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.ag-card-meta.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tline-height: 1;\n\t}\n\t.ag-card-dur.svelte-n8lbn1 {\n\t\tmargin-left: 6px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.ag-card-sub.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tline-height: 1;\n\t}\n\t.ag-card-loc.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1;\n\t}\n\t.ag-card-tags.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tflex-wrap: wrap;\n\t}\n\t.ag-card-tag.svelte-n8lbn1 {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ── Queue card variant ── */\n\t.ag-card--q.svelte-n8lbn1 {\n\t\ttransition: border-color 150ms, transform 100ms;\n\t}\n\t.ag-compact-row--queue.svelte-n8lbn1 {\n\t\tmargin: 0;\n\t}\n\n\t.ag-card--q.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tgap: 3px;\n\t}\n\t.ag-card--q.svelte-n8lbn1 .ag-card-tags:where(.svelte-n8lbn1) {\n\t\tmargin-top: 2px;\n\t}\n\t.ag-card-eta.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.04em;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t}\n\t.ag-card--hero.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 16px;\n\t\tfont-weight: 700;\n\t}\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-eta:where(.svelte-n8lbn1) {\n\t\tfont-size: 11px;\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 18%, transparent);\n\t\tpadding: 2px 7px;\n\t\tborder-radius: 4px;\n\t}\n\t.ag-card--hero.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\n\t/* ── Plan card variant ── */\n\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 12px 14px;\n\t\tgap: 3px;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-top:where(.svelte-n8lbn1) {\n\t\talign-items: baseline;\n\t}\n\t.ag-card-order.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-weight: 700;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tflex-shrink: 0;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 14px;\n\t}\n\t.ag-card--first.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t}\n\t.ag-card--first.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 16px;\n\t\tfont-weight: 700;\n\t}\n\t/* Everything under the title aligns past the order number — the\n\t   subtitle, location, time and tags share one left edge. */\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-sub:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-loc:where(.svelte-n8lbn1),\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-meta:where(.svelte-n8lbn1) {\n\t\tpadding-left: 22px;\n\t}\n\t.ag-card--plan.svelte-n8lbn1 .ag-card-tags:where(.svelte-n8lbn1) {\n\t\tpadding-left: 22px;\n\t\tmargin-top: 2px;\n\t}\n\n\t/* ═══ The Queue: 2-column grid ═══ */\n\t.ag-q.svelte-n8lbn1 {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr 1.8fr;\n\t\tgap: 0;\n\t\tflex: 1;\n\t\tpadding: 8px 0 10px;\n\t\tmin-height: 0;\n\t}\n\t/* Mobile: stack queue columns vertically — \"Up next\" (hero) first,\n\t   Now/Done status column second */\n\t.ag--mobile.svelte-n8lbn1 .ag-q:where(.svelte-n8lbn1) {\n\t\tgrid-template-columns: 1fr;\n\t\tmin-height: auto;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-status:where(.svelte-n8lbn1) {\n\t\torder: 2;\n\t\tborder-right: none;\n\t\tborder-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tpadding-top: 10px;\n\t\tmargin-top: 8px;\n\t\toverflow-y: visible;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-queue:where(.svelte-n8lbn1) {\n\t\torder: 1;\n\t\toverflow-y: visible;\n\t\tpadding-bottom: 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-meta:where(.svelte-n8lbn1) {\n\t\tline-height: 1.3;\n\t\tpadding-bottom: 1px;\n\t}\n\t/* Mobile: larger touch targets */\n\t.ag--mobile.svelte-n8lbn1 .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 15px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--hero:where(.svelte-n8lbn1) .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 18px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--hero:where(.svelte-n8lbn1) .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 16px 18px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-row:where(.svelte-n8lbn1) {\n\t\tpadding: 12px 0;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--plan:where(.svelte-n8lbn1) .ag-card-body:where(.svelte-n8lbn1) {\n\t\tpadding: 14px 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card--plan:where(.svelte-n8lbn1) .ag-card-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 15px;\n\t}\n\t/* Mobile: Now/Done status subtree type scale */\n\t.ag--mobile.svelte-n8lbn1 .ag-q-label:where(.svelte-n8lbn1) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-clock:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-now-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 16px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-now-sub:where(.svelte-n8lbn1) {\n\t\tfont-size: 13px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-now-time:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-free-label:where(.svelte-n8lbn1) {\n\t\tfont-size: 13px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-done-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 13px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-q-done-check:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-eta:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-sub:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-loc:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-card-tag:where(.svelte-n8lbn1) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-time:where(.svelte-n8lbn1),\n\t.ag--mobile.svelte-n8lbn1 .ag-log-dur:where(.svelte-n8lbn1) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-log-title:where(.svelte-n8lbn1) {\n\t\tfont-size: 15px;\n\t}\n\t.ag-q-label.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.14em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tmargin-bottom: 8px;\n\t\tpadding: 0 12px;\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\t.ag-q-empty.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tflex: 1;\n\t\tfont-size: 13px;\n\t\tfont-weight: 300;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\n\t/* ── NOW column (includes Done above) ── */\n\t.ag-q-status.svelte-n8lbn1 {\n\t\tpadding: 0 10px 0 14px;\n\t\tborder-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-q-status.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1 {\n\t\talign-self: flex-start;\n\t\tmargin-top: 2px;\n\t\tpadding: 3px 8px;\n\t\tborder: 1px solid var(--dt-border);\n\t\tborder-radius: 999px;\n\t\tbackground: none;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-3);\n\t\tcursor: pointer;\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1:hover,\n\t.ag-q-done-toggle.svelte-n8lbn1:active {\n\t\tcolor: var(--dt-text);\n\t\tborder-color: var(--dt-text-3);\n\t}\n\t.ag-q-done-toggle.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-q-now-sub.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tcolor: var(--dt-text-2);\n\t\tmargin-top: 1px;\n\t}\n\t.ag-q-done-section.svelte-n8lbn1 {\n\t\tmargin-top: 12px;\n\t\tpadding-top: 10px;\n\t\tborder-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.ag-q-clock.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tmargin-left: 4px;\n\t}\n\t.ag-q-now.svelte-n8lbn1 {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\tpadding: 8px 10px;\n\t\tmargin-bottom: 8px;\n\t\tborder-radius: 8px;\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, border-color 150ms;\n\t}\n\t.ag-q-now.svelte-n8lbn1:hover,\n\t.ag-q-now.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 35%, transparent);\n\t}\n\t.ag-q-now.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-q-now--selected.svelte-n8lbn1 {\n\t\tborder-color: var(--ev-color, var(--dt-accent));\n\t}\n\t.ag-q-now-dot.svelte-n8lbn1 {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent, #2563eb));\n\t\tmargin-bottom: 6px;\n\t\tanimation: svelte-n8lbn1-ag-pulse 2.5s ease-in-out infinite;\n\t}\n\t@keyframes svelte-n8lbn1-ag-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-q-now-dot.svelte-n8lbn1 {\n\t\t\tanimation: none;\n\t\t}\n\t\t.ag-q-now-fill.svelte-n8lbn1 {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\t.ag-q-now-title.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.25;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\toverflow: hidden;\n\t\tword-break: break-word;\n\t\tmargin-bottom: 3px;\n\t}\n\t.ag-q-now-time.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tmargin-bottom: 6px;\n\t}\n\t.ag-q-now-track.svelte-n8lbn1 {\n\t\theight: 2px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tborder-radius: 1px;\n\t\toverflow: hidden;\n\t}\n\t.ag-q-now-fill.svelte-n8lbn1 {\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tbackground: var(--ev-color, var(--dt-accent, #2563eb));\n\t\tborder-radius: 1px;\n\t\ttransform-origin: left;\n\t\ttransition: transform 1s linear;\n\t}\n\t.ag-q-free.svelte-n8lbn1 {\n\t\tpadding: 8px 10px;\n\t\tmargin-right: 10px;\n\t}\n\t.ag-q-free-label.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tfont-weight: 300;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tmargin-bottom: 2px;\n\t}\n\n\t/* ── NEXT: hero center column ── */\n\t.ag-q-queue.svelte-n8lbn1 {\n\t\tpadding: 0 16px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 8px;\n\t}\n\t.ag-q-queue.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\n\n\t.ag-q-done-item.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tpadding: 3px 0;\n\t\twidth: 100%;\n\t\tcursor: pointer;\n\t}\n\t.ag-q-done-item.svelte-n8lbn1:hover .ag-q-done-title:where(.svelte-n8lbn1),\n\t.ag-q-done-item.svelte-n8lbn1:active .ag-q-done-title:where(.svelte-n8lbn1),\n\t.ag-q-done-item--selected.svelte-n8lbn1 .ag-q-done-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.ag-q-done-item.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-q-done-check.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-success, rgba(22, 163, 74, 0.7));\n\t\tflex-shrink: 0;\n\t}\n\t.ag-q-done-title.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tline-height: 1.2;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttext-decoration: line-through;\n\t\ttext-decoration-color: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttransition: color 150ms;\n\t}\n\n\t/* ═══ Past Day: \"The Log\" ═══\n\t   Dim comes from text tokens only (single layer) — no subtree opacity. */\n\t.ag-log.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-log.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\t.ag-log-row.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 10px;\n\t\tpadding: 8px 0;\n\t\twidth: 100%;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tcursor: pointer;\n\t}\n\t.ag-log-row.svelte-n8lbn1:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.ag-log-row.svelte-n8lbn1:hover .ag-log-title:where(.svelte-n8lbn1),\n\t.ag-log-row.svelte-n8lbn1:active .ag-log-title:where(.svelte-n8lbn1),\n\t.ag-log-row--selected.svelte-n8lbn1 .ag-log-title:where(.svelte-n8lbn1) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.ag-log-row.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 6px;\n\t}\n\t.ag-log-row--selected.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, transparent);\n\t\tborder-radius: 6px;\n\t\tpadding-left: 8px;\n\t\tpadding-right: 8px;\n\t\tmargin-left: -8px;\n\t\tmargin-right: -8px;\n\t\twidth: calc(100% + 16px);\n\t}\n\t.ag-log-check.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-success, rgba(22, 163, 74, 0.7));\n\t\tflex-shrink: 0;\n\t}\n\t.ag-log-time.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\twidth: 64px;\n\t\tflex-shrink: 0;\n\t}\n\t.ag-log-dot.svelte-n8lbn1 {\n\t\twidth: 5px;\n\t\theight: 5px;\n\t\tborder-radius: 50%;\n\t\tflex-shrink: 0;\n\t\topacity: 0.6;\n\t}\n\t.ag-log-title.svelte-n8lbn1 {\n\t\tfont-size: 13px;\n\t\tfont-weight: 500;\n\t\tline-height: 1.2;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex: 1;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttext-decoration: line-through;\n\t\ttext-decoration-color: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\ttransition: color 150ms;\n\t\ttext-align: left;\n\t}\n\t.ag-log-dur.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 0;\n\t}\n\n\t/* ═══ Compact Day ═══ */\n\t.ag-compact-list.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t}\n\t.ag-compact-list.svelte-n8lbn1::-webkit-scrollbar { display: none; }\n\t.ag-compact-row.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 4px 0;\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\twidth: 100%;\n\t}\n\t.ag-compact-row--selected.svelte-n8lbn1 {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 10%, transparent);\n\t\tborder-radius: 4px;\n\t\t/* Highlight gutter comes from negative margins so the row's content\n\t\t   stays aligned with its unselected siblings (no tap-shift). */\n\t\tpadding-left: 6px;\n\t\tpadding-right: 6px;\n\t\tmargin-left: -6px;\n\t\tmargin-right: -6px;\n\t\twidth: calc(100% + 12px);\n\t}\n\t.ag-compact-row.svelte-n8lbn1:hover .ag-compact-row-title:where(.svelte-n8lbn1),\n\t.ag-compact-row.svelte-n8lbn1:active .ag-compact-row-title:where(.svelte-n8lbn1) { color: var(--dt-text); }\n\t.ag-compact-row.svelte-n8lbn1:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, transparent);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-compact-row.svelte-n8lbn1:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-compact-row-dot.svelte-n8lbn1 {\n\t\twidth: 5px;\n\t\theight: 5px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tflex-shrink: 0;\n\t\talign-self: center;\n\t}\n\t.ag-compact-row-time.svelte-n8lbn1 {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tmin-width: 64px;\n\t\tflex-shrink: 0;\n\t\tline-height: 1.4;\n\t}\n\t/* Title + subtitle + tags cluster. One line while it fits; on mobile the\n\t   metadata wraps to a second line under the title instead of crushing it. */\n\t.ag-compact-row-main.svelte-n8lbn1 {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-main:where(.svelte-n8lbn1) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t/* Mobile: size the title by its content when deciding line breaks — a long\n\t   title claims the first line whole (ellipsizing only against the full row)\n\t   and pushes subtitle/tags down instead of truncating at 35%. */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) {\n\t\tflex-basis: auto;\n\t}\n\t/* On its own wrapped line the subtitle gets the full width */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-sub:where(.svelte-n8lbn1) {\n\t\tmax-width: 100%;\n\t}\n\t/* Wrapped rows are two lines tall — center-aligning the dot floats it\n\t   between lines; pin it optically to the first (title) line instead. */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-dot:where(.svelte-n8lbn1) {\n\t\talign-self: flex-start;\n\t\tmargin-top: 8px;\n\t}\n\t.ag-compact-row-title.svelte-n8lbn1 {\n\t\tfont-size: 12px;\n\t\tfont-weight: 500;\n\t\tcolor: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 82%, transparent);\n\t\tflex: 1;\n\t\t/* The title is the row's identity — never let subtitle/tags/duration\n\t\t   squeeze it out on narrow screens (flex: 1 alone resolves to 0px). */\n\t\tmin-width: 35%;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t\tline-height: 1.4;\n\t\ttext-align: left;\n\t}\n\t.ag-compact-row-dur.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 0;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-row-sub.svelte-n8lbn1 {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\tmax-width: 45%;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-row-tag.svelte-n8lbn1 {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 1;\n\t\tmin-width: 2.5em;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-row--cancelled.svelte-n8lbn1 { opacity: 0.5; }\n\t.ag-compact-row--cancelled.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) { text-decoration: line-through; }\n\t.ag-compact-row--tentative.svelte-n8lbn1 { opacity: 0.65; }\n\t/* Mobile: larger touch targets for compact rows */\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row:where(.svelte-n8lbn1) { padding: 8px 0; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-title:where(.svelte-n8lbn1) { font-size: 15px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-time:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-dur:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-sub:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-compact-row-tag:where(.svelte-n8lbn1) { font-size: 11px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head:where(.svelte-n8lbn1) { padding: 0 16px 8px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head-name:where(.svelte-n8lbn1) { font-size: 15px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head-date:where(.svelte-n8lbn1) { font-size: 12px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-day-head-badge:where(.svelte-n8lbn1) { font-size: 11px; }\n\t.ag--mobile.svelte-n8lbn1 .ag-allday-title:where(.svelte-n8lbn1) { font-size: 0.85rem; }\n\t.ag--mobile.svelte-n8lbn1 .ag-allday-label:where(.svelte-n8lbn1) { font-size: 11px; }\n\n\t/* ═══ Future Day: \"The Plan\" ═══ */\n\t.ag-plan.svelte-n8lbn1 {\n\t\tflex: 1;\n\t\tpadding: 8px 20px 12px;\n\t\toverflow-y: auto;\n\t\tscrollbar-width: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 6px;\n\t}\n\t.ag-plan.svelte-n8lbn1::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}\n\n\t/* ═══ Container ═══ */\n\t.ag.svelte-uhwfyj {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\tuser-select: none;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\tbox-sizing: border-box;\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tfont-family: var(--dt-sans, system-ui, sans-serif);\n\t}\n\t.ag--auto.svelte-uhwfyj {\n\t\theight: auto;\n\t\toverflow: visible;\n\t}\n\n\t/* Button UA reset for interactive cards/rows (real <button>s for a11y).\n\t   Placed first so later component rules override it. */\n\t.ag-card.svelte-uhwfyj,\n\t.ag-allday-chip.svelte-uhwfyj,\n\t.ag-compact.svelte-uhwfyj,\n\t.ag-compact-more.svelte-uhwfyj,\n\t.ag-past-toggle.svelte-uhwfyj {\n\t\tfont: inherit;\n\t\tcolor: inherit;\n\t\ttext-align: left;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tbox-sizing: border-box;\n\t}\n\n\t/* ═══ Body ═══ */\n\t.ag-body.svelte-uhwfyj {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\tbox-sizing: border-box;\n\t\t/* No padding-top here: the sticky day headers pin at the scrollport\n\t\t   edge, and container padding would leave a see-through band above\n\t\t   them where scrolled cards bleed out. */\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-border) transparent;\n\t}\n\t.ag-wday.svelte-uhwfyj:first-child .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding-top: 12px;\n\t}\n\t.ag--auto.svelte-uhwfyj .ag-body:where(.svelte-uhwfyj) {\n\t\toverflow-y: visible;\n\t}\n\t.ag-body.svelte-uhwfyj::-webkit-scrollbar {\n\t\twidth: 4px;\n\t}\n\t.ag-body.svelte-uhwfyj::-webkit-scrollbar-thumb {\n\t\tbackground: var(--dt-border);\n\t\tborder-radius: 2px;\n\t}\n\n\t/* ═══ All-day chips ═══ */\n\t.ag-allday.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 4px;\n\t\tpadding: 4px 14px 6px;\n\t}\n\t.ag-allday-chip.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 2px 8px;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 18%, transparent);\n\t\tcursor: pointer;\n\t\ttransition: background 0.15s, border-color 0.15s;\n\t}\n\t.ag-allday-chip.svelte-uhwfyj:hover,\n\t.ag-allday-chip.svelte-uhwfyj:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.ag-allday-chip.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-allday-chip--selected.svelte-uhwfyj {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-allday-dot.svelte-uhwfyj {\n\t\twidth: 5px;\n\t\theight: 5px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\t.ag-allday-title.svelte-uhwfyj {\n\t\tfont: 500 0.7rem/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t}\n\t.ag-allday-span.svelte-uhwfyj {\n\t\tfont: 500 10px/1.2 var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t}\n\n\t/* ═══ Shared: event card ═══ */\n\t.ag-card.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 8%, var(--dt-border, rgba(0, 0, 0, 0.08)));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 150ms, border-color 150ms;\n\t}\n\t.ag-card.svelte-uhwfyj:hover,\n\t.ag-card.svelte-uhwfyj:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t\tborder-color: color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.ag-card.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\t.ag-card--selected.svelte-uhwfyj {\n\t\tborder-color: var(--ev-color);\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));\n\t}\n\t.ag-card--cancelled.svelte-uhwfyj {\n\t\topacity: 0.5;\n\t}\n\t.ag-card--cancelled.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-card--tentative.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card--full.svelte-uhwfyj {\n\t\topacity: 0.55;\n\t}\n\t.ag-card--limited.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t\tborder-style: dashed;\n\t}\n\t.ag-card-body.svelte-uhwfyj {\n\t\tpadding: 7px 10px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tmin-width: 0;\n\t\tflex: 1;\n\t}\n\t.ag-card-title.svelte-uhwfyj {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.3;\n\t\tword-break: break-word;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: 2;\n\t\tline-clamp: 2;\n\t\toverflow: hidden;\n\t}\n\t.ag-card-meta.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tline-height: 1;\n\t}\n\t.ag-card-dur.svelte-uhwfyj {\n\t\tmargin-left: 6px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.ag-card-eta.svelte-uhwfyj {\n\t\tmargin-left: auto;\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\tcolor: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 60%, var(--ev-color));\n\t\tletter-spacing: 0.02em;\n\t}\n\t.ag-card-sub.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tline-height: 1;\n\t}\n\t.ag-card-loc.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1;\n\t}\n\t.ag-card-tags.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tflex-wrap: wrap;\n\t}\n\t.ag-card-tag.svelte-uhwfyj {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\t.ag-card-progress.svelte-uhwfyj {\n\t\theight: 3px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tborder-radius: 2px;\n\t\toverflow: hidden;\n\t\tmargin-top: 2px;\n\t}\n\t.ag-card-progress-fill.svelte-uhwfyj {\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tborder-radius: 2px;\n\t\ttransform-origin: left;\n\t\ttransition: transform 1s linear;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-card-progress-fill.svelte-uhwfyj {\n\t\t\ttransition: none;\n\t\t}\n\t}\n\n\t/* ═══ Week day groups ═══ */\n\t.ag-wday.svelte-uhwfyj {\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\t.ag-wday.svelte-uhwfyj:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.ag-wday--today.svelte-uhwfyj {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 2%, transparent);\n\t}\n\t.ag-wday--tomorrow.svelte-uhwfyj .ag-card:where(.svelte-uhwfyj) {\n\t\topacity: 0.82;\n\t}\n\t/* Past days: token-based text dim instead of subtree opacity (readability) */\n\t.ag-wday--past.svelte-uhwfyj .ag-wday-name:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tfont-weight: 500;\n\t}\n\t.ag-wday--past.svelte-uhwfyj .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 8px 20px 2px;\n\t}\n\t.ag-wday--disabled.svelte-uhwfyj {\n\t\tposition: relative;\n\t}\n\t.ag-wday--disabled.svelte-uhwfyj::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tbackground: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 4px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent) 4px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent) 8px\n\t\t);\n\t\tpointer-events: none;\n\t}\n\t.ag-wday-custom-header.svelte-uhwfyj {\n\t\tpadding: 2px 0 4px;\n\t}\n\n\t.ag-wday-head.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tpadding: 8px 20px;\n\t\tposition: sticky;\n\t\ttop: 0;\n\t\tbackground: var(--dt-bg, #fff);\n\t\tz-index: 1;\n\t\t/* Own compositor layer: without it, fast (async) scrolling repaints\n\t\t   the pinned header a frame late and a gap flashes above it. */\n\t\ttransform: translateZ(0);\n\t\twill-change: transform;\n\t}\n\t.ag-wday-head-left.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t}\n\t.ag-wday-badge.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tfont-weight: 600;\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);\n\t\tpadding: 2px 7px;\n\t\tborder-radius: 3px;\n\t}\n\t.ag-wday-badge--muted.svelte-uhwfyj {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tbackground: color-mix(\n\t\t\tin srgb,\n\t\t\tvar(--dt-text-2, rgba(0, 0, 0, 0.54)) 10%,\n\t\t\ttransparent\n\t\t);\n\t}\n\t.ag-wday-name.svelte-uhwfyj {\n\t\tfont-size: 13px;\n\t\tfont-weight: 600;\n\t\tline-height: 1.2;\n\t}\n\t.ag-wday-date.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tline-height: 1.2;\n\t}\n\n\t.ag-wday-empty.svelte-uhwfyj {\n\t\tpadding: 2px 20px 6px;\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tfont-style: italic;\n\t}\n\n\t/* Expanded day */\n\t.ag-wday-expanded.svelte-uhwfyj {\n\t\tpadding: 0 20px 10px;\n\t}\n\t.ag-wslot.svelte-uhwfyj {\n\t\tmargin-bottom: 4px;\n\t}\n\t.ag-wslot-header.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 8px;\n\t\tpadding: 2px 0;\n\t}\n\t.ag-wslot-now.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tfont-weight: 700;\n\t\tletter-spacing: 0.08em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-accent, #2563eb);\n\t}\n\t.ag-wslot-cards.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t}\n\t.ag-wslot-cards--multi.svelte-uhwfyj {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n\t\tgap: 4px;\n\t}\n\t.ag-wday-past-line.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tpadding: 6px 0 0;\n\t}\n\t.ag-wday-past-line--summary.svelte-uhwfyj {\n\t\tpadding: 0 20px 8px;\n\t}\n\t/* \"✓ N completed\" is a disclosure — tap to reveal the finished events */\n\t.ag-past-toggle.svelte-uhwfyj {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tcursor: pointer;\n\t\tmin-height: 32px;\n\t\ttransition: color 150ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.ag-past-toggle.svelte-uhwfyj:hover,\n\t.ag-past-toggle.svelte-uhwfyj:active {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.ag-past-toggle.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-past-chevron.svelte-uhwfyj {\n\t\ttransition: transform 120ms;\n\t}\n\t.ag-past-chevron--open.svelte-uhwfyj {\n\t\ttransform: rotate(180deg);\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.ag-past-chevron.svelte-uhwfyj { transition: none; }\n\t}\n\t/* Revealed completed events: dim + strike, single token layer */\n\t.ag-compact--done.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t\ttext-decoration-color: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\t.ag-compact--done.svelte-uhwfyj .ag-compact-dot:where(.svelte-uhwfyj) {\n\t\topacity: 0.5;\n\t}\n\n\t/* Compact day events */\n\t.ag-wday-compact.svelte-uhwfyj {\n\t\tpadding: 0 20px 8px;\n\t}\n\t.ag-compact.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t\tpadding: 3px 0;\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\twidth: 100%;\n\t}\n\t.ag-compact--selected.svelte-uhwfyj {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 10%, transparent);\n\t\tborder-radius: 4px;\n\t\t/* Highlight gutter comes from negative margins so the row's content\n\t\t   stays aligned with its unselected siblings (no tap-shift). */\n\t\tpadding-left: 6px;\n\t\tpadding-right: 6px;\n\t\tmargin-left: -6px;\n\t\tmargin-right: -6px;\n\t\twidth: calc(100% + 12px);\n\t}\n\t.ag-compact.svelte-uhwfyj:hover .ag-compact-title:where(.svelte-uhwfyj),\n\t.ag-compact.svelte-uhwfyj:active .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tcolor: var(--dt-text);\n\t}\n\t.ag-compact.svelte-uhwfyj:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, transparent);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-compact.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\t.ag-compact-dot.svelte-uhwfyj {\n\t\twidth: 5px;\n\t\theight: 5px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tflex-shrink: 0;\n\t\talign-self: center;\n\t}\n\t.ag-compact-time.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tmin-width: 40px;\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t\tline-height: 1.4;\n\t}\n\t/* Title + location + subtitle + tags cluster. One line while it fits; on\n\t   mobile the metadata wraps to a second line instead of crushing the title. */\n\t.ag-compact-main.svelte-uhwfyj {\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-main:where(.svelte-uhwfyj) {\n\t\tflex-wrap: wrap;\n\t\trow-gap: 2px;\n\t}\n\t/* Mobile: size the title by its content when deciding line breaks — a long\n\t   title claims the first line whole (ellipsizing only against the full row)\n\t   and pushes location/subtitle/tags down instead of truncating at 35%. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tflex-basis: auto;\n\t}\n\t/* On their own wrapped line the metadata gets the full width — the tight\n\t   desktop caps would truncate it beside empty space. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-loc:where(.svelte-uhwfyj),\n\t.ag--mobile.svelte-uhwfyj .ag-compact-sub:where(.svelte-uhwfyj) {\n\t\tmax-width: 100%;\n\t}\n\t/* Wrapped rows are two/three lines tall — center-aligning the dot floats\n\t   it between lines; pin it optically to the first (title) line instead. */\n\t.ag--mobile.svelte-uhwfyj .ag-compact-dot:where(.svelte-uhwfyj) {\n\t\talign-self: flex-start;\n\t\tmargin-top: 8px;\n\t}\n\t.ag-compact-title.svelte-uhwfyj {\n\t\tfont-size: 12px;\n\t\tfont-weight: 500;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tflex: 1;\n\t\t/* The title is the row's identity — never let subtitle/tags/duration\n\t\t   squeeze it out on narrow screens (min-width: 0 resolves to 0px). */\n\t\tmin-width: 35%;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\ttransition: color 150ms;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-dur.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tfont-family: var(--dt-mono, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 0;\n\t\twhite-space: nowrap;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-sub.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-width: 120px;\n\t\tline-height: 1.4;\n\t}\n\t.ag-compact-loc.svelte-uhwfyj {\n\t\tfont-size: 10px;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tflex-shrink: 3;\n\t\tmin-width: 0;\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmax-width: 100px;\n\t}\n\t.ag-compact--cancelled.svelte-uhwfyj {\n\t\topacity: 0.5;\n\t}\n\t.ag-compact--cancelled.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\ttext-decoration: line-through;\n\t}\n\t.ag-compact--tentative.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t}\n\t.ag-compact--full.svelte-uhwfyj {\n\t\topacity: 0.55;\n\t}\n\t.ag-compact--limited.svelte-uhwfyj {\n\t\topacity: 0.65;\n\t}\n\t.ag-compact-tag.svelte-uhwfyj {\n\t\tfont: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 1;\n\t\tmin-width: 2.5em;\n\t\tmax-width: 80px;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\t.ag-compact-more.svelte-uhwfyj {\n\t\tfont-size: 11px;\n\t\tcolor: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 72%, transparent);\n\t\tpadding: 2px 0 0 13px;\n\t\tcursor: pointer;\n\t\tdisplay: block;\n\t}\n\t.ag-compact-more.svelte-uhwfyj:hover,\n\t.ag-compact-more.svelte-uhwfyj:active {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.ag-compact-more.svelte-uhwfyj:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\tborder-radius: 4px;\n\t}\n\n\t/* ═══ Mobile adaptations ═══ */\n\t.ag--mobile.svelte-uhwfyj .ag-wday-head:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 16px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-expanded:where(.svelte-uhwfyj) {\n\t\tpadding: 0 16px 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-compact:where(.svelte-uhwfyj) {\n\t\tpadding: 0 16px 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-body:where(.svelte-uhwfyj) {\n\t\tpadding: 12px 14px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-title:where(.svelte-uhwfyj) {\n\t\tfont-size: 15px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-meta:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-sub:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-loc:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-eta:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-card-tag:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact:where(.svelte-uhwfyj) {\n\t\tpadding: 8px 0;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-title:where(.svelte-uhwfyj) {\n\t\tfont-size: 15px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-time:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-dur:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-sub:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-loc:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-tag:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-compact-more:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t\tpadding-top: 6px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-allday-span:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-badge:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wslot-now:where(.svelte-uhwfyj) {\n\t\tfont-size: 11px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-empty:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wday-past-line:where(.svelte-uhwfyj) {\n\t\tfont-size: 12px;\n\t}\n\t.ag--mobile.svelte-uhwfyj .ag-wslot-cards--multi:where(.svelte-uhwfyj) {\n\t\tgrid-template-columns: 1fr;\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.mb.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\toverflow: hidden;\n\t\tbackground: var(--dt-bg, #fff);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\ttouch-action: pan-y;\n\t}\n\t.mb--auto.svelte-zbkzcp { overflow: visible; }\n\n\t/* ─── Swipe wrapper (follows the finger) ─────────── */\n\t.mb-swipe.svelte-zbkzcp {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tposition: relative;\n\t}\n\t.mb-swipe--animate.svelte-zbkzcp {\n\t\ttransition: transform 180ms ease;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mb-swipe--animate.svelte-zbkzcp { transition: none; }\n\t}\n\n\t/* ─── All-day bar ────────────────────────────────── */\n\t.mb-allday.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tpadding: 4px 8px;\n\t\toverflow-x: auto;\n\t\tscrollbar-width: none;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t\talign-items: center;\n\t}\n\t.mb-allday.svelte-zbkzcp::-webkit-scrollbar { display: none; }\n\t.mb-allday--expanded.svelte-zbkzcp {\n\t\tflex-wrap: wrap;\n\t\toverflow-x: visible;\n\t}\n\n\t.mb-allday-chip.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 4px 8px;\n\t\tmin-height: 32px;\n\t\tborder-radius: 5px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));\n\t\tborder: none;\n\t\tcursor: pointer;\n\t\tflex-shrink: 0;\n\t\ttransition: background 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tmax-width: 160px;\n\t\tposition: relative;\n\t}\n\t/* Hit-slop: 44px effective touch target */\n\t.mb-allday-chip.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-allday-chip.svelte-zbkzcp:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, #f9fafb));\n\t}\n\t.mb-allday-chip--selected.svelte-zbkzcp {\n\t\tbox-shadow: 0 0 0 1.5px var(--ev-color);\n\t}\n\t.mb-allday-chip.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.mb-allday-dot.svelte-zbkzcp {\n\t\twidth: 6px;\n\t\theight: 6px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t}\n\n\t.mb-allday-title.svelte-zbkzcp {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\tmax-width: 100px;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-allday-span.svelte-zbkzcp {\n\t\tfont: 400 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t.mb-allday-more.svelte-zbkzcp {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t\tpadding: 0 6px;\n\t\tmin-height: 32px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\tposition: relative;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.mb-allday-more.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-allday-more.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Grid ───────────────────────────────────────── */\n\t.mb-grid.svelte-zbkzcp {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\t-webkit-overflow-scrolling: touch;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t\tposition: relative;\n\t\tpadding-top: 8px;\n\t}\n\t.mb--auto.svelte-zbkzcp .mb-grid:where(.svelte-zbkzcp) { overflow-y: visible; }\n\t.mb-grid.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.mb-grid-inner.svelte-zbkzcp {\n\t\tposition: relative;\n\t\tmin-width: 100%;\n\t}\n\n\t/* ─── Empty state ────────────────────────────────── */\n\t.mb-empty.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpointer-events: none;\n\t\tz-index: 4;\n\t}\n\t.mb-empty-text.svelte-zbkzcp {\n\t\tfont: 500 13px/1.4 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t/* ─── Hour row ───────────────────────────────────── */\n\t.mb-hour.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t}\n\n\t.mb-hour-label.svelte-zbkzcp {\n\t\twidth: 40px;\n\t\t/* border-box keeps the label inside the 40px gutter that events\n\t\t   start at — content-box pushed digits flush under the event edge */\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\tfont: 500 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\ttext-align: right;\n\t\tpadding-right: 8px;\n\t\tpadding-top: 0;\n\t\tposition: relative;\n\t\ttop: -6px;\n\t}\n\n\t.mb-hour-line.svelte-zbkzcp {\n\t\tflex: 1;\n\t\theight: 1px;\n\t\tbackground: var(--dt-border, rgba(0, 0, 0, 0.08));\n\t}\n\n\t.mb-hour--blocked.svelte-zbkzcp {\n\t\tbackground: repeating-linear-gradient(\n\t\t\t-45deg,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent),\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent) 4px,\n\t\t\ttransparent 4px,\n\t\t\ttransparent 8px\n\t\t);\n\t}\n\n\t.mb-blocked-label.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 44px;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\tfont: 500 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.04em;\n\t}\n\n\t/* ─── Now line ───────────────────────────────────── */\n\t.mb-now.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: 10;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tpointer-events: none;\n\t}\n\n\t.mb-now-label.svelte-zbkzcp {\n\t\twidth: 40px;\n\t\tbox-sizing: border-box;\n\t\tflex-shrink: 0;\n\t\ttext-align: right;\n\t\tpadding-right: 6px;\n\t\tfont: 700 10px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t}\n\n\t.mb-now-line.svelte-zbkzcp {\n\t\tflex: 1;\n\t\theight: 2px;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tbox-shadow: 0 0 6px var(--dt-glow, rgba(37, 99, 235, 0.25));\n\t\tposition: relative;\n\t}\n\n\t.mb-now-line.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: -4px;\n\t\ttop: -4px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Events ─────────────────────────────────────── */\n\t.mb-event.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tz-index: 5;\n\t\tborder-radius: 8px;\n\t\tcursor: pointer;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));\n\t\tborder: none;\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t\toverflow: hidden;\n\t\ttransition: box-shadow 120ms, background 120ms;\n\t\ttext-align: left;\n\t\tpadding: 0;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tmin-height: 24px;\n\t}\n\t.mb-event.svelte-zbkzcp:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, #f9fafb));\n\t}\n\t/* Short blocks keep their duration-proportional height, but get a 44px\n\t   transparent hit-slop so taps still land. */\n\t.mb-event--short.svelte-zbkzcp {\n\t\toverflow: visible;\n\t}\n\t.mb-event--short.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mb-event--short.svelte-zbkzcp .mb-ev-body:where(.svelte-zbkzcp) {\n\t\tpadding-top: 2px;\n\t\tpadding-bottom: 2px;\n\t}\n\t.mb-event--selected.svelte-zbkzcp {\n\t\tbox-shadow: 0 0 0 2px var(--ev-color),\n\t\t\t0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);\n\t}\n\t.mb-event--current.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, #f9fafb));\n\t}\n\t.mb-event--next.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 35%, transparent);\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — never a bare opacity on the block. */\n\t.mb-event--cancelled.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #f9fafb));\n\t}\n\t.mb-event--cancelled.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mb-event--cancelled.svelte-zbkzcp .mb-ev-stripe:where(.svelte-zbkzcp) {\n\t\topacity: 0.45; /* decorative bar only */\n\t}\n\t.mb-event--tentative.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.mb-event--full.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.mb-event--full.svelte-zbkzcp .mb-ev-title:where(.svelte-zbkzcp) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mb-event--limited.svelte-zbkzcp {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.mb-event--resizing.svelte-zbkzcp {\n\t\tz-index: 50;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n\t\tcursor: ns-resize;\n\t}\n\n\t/* ─── Resize handles ─────────────────────────────── */\n\t.mb-ev-handle.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 10px;\n\t\tz-index: 2;\n\t\tcursor: ns-resize;\n\t\ttouch-action: none;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp { top: 0; }\n\t.mb-ev-handle--end.svelte-zbkzcp { bottom: 0; }\n\t/* Hit-slop: ≥24px effective, extending inward so the block's\n\t   overflow clipping can't cut it off. */\n\t.mb-ev-handle.svelte-zbkzcp::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 24px;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp::before { top: 0; }\n\t.mb-ev-handle--end.svelte-zbkzcp::before { bottom: 0; }\n\t.mb-ev-handle.svelte-zbkzcp::after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\twidth: 24px;\n\t\theight: 3px;\n\t\tborder-radius: 2px;\n\t\tbackground: var(--ev-color);\n\t\topacity: 0;\n\t\ttransition: opacity 120ms;\n\t}\n\t.mb-ev-handle--start.svelte-zbkzcp::after { top: 2px; }\n\t.mb-ev-handle--end.svelte-zbkzcp::after { bottom: 2px; }\n\t.mb-event.svelte-zbkzcp:hover .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event.svelte-zbkzcp:focus-within .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event--resizing.svelte-zbkzcp .mb-ev-handle:where(.svelte-zbkzcp)::after,\n\t.mb-event--selected.svelte-zbkzcp .mb-ev-handle:where(.svelte-zbkzcp)::after { opacity: 0.55; }\n\t/* Touch devices have no hover — show the handles persistently. */\n\t@media (hover: none) {\n\t\t.mb-ev-handle.svelte-zbkzcp::after { opacity: 0.55; }\n\t}\n\n\t/* ─── Drag-to-create ghost ───────────────────────── */\n\t.mb-create-ghost.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\tleft: 40px;\n\t\tright: 4px;\n\t\tz-index: 40;\n\t\tborder-radius: 8px;\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);\n\t\tborder: 1px dashed color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\toverflow: hidden;\n\t\tpointer-events: none;\n\t}\n\t.mb-create-ghost-time.svelte-zbkzcp {\n\t\tfont: 600 11px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tpadding: 4px 8px;\n\t\twhite-space: nowrap;\n\t}\n\n\t.mb-ev-stripe.svelte-zbkzcp {\n\t\twidth: 4px;\n\t\tbackground: var(--ev-color);\n\t\tflex-shrink: 0;\n\t\tborder-radius: 8px 0 0 8px;\n\t}\n\n\t.mb-ev-body.svelte-zbkzcp {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 4px 8px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1px;\n\t\tjustify-content: center;\n\t}\n\n\t.mb-ev-title.svelte-zbkzcp {\n\t\tfont: 600 15px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-time.svelte-zbkzcp {\n\t\tfont: 400 12px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t.mb-ev-sub.svelte-zbkzcp {\n\t\tfont: 400 12px/1.1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-loc.svelte-zbkzcp {\n\t\tfont: 400 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.mb-ev-tags.svelte-zbkzcp {\n\t\tdisplay: flex;\n\t\tgap: 4px;\n\t\tmargin-top: 2px;\n\t}\n\n\t.mb-ev-tag.svelte-zbkzcp {\n\t\tfont: 500 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t.mb-ev-live.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\ttop: 6px;\n\t\tright: 6px;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 50%;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tanimation: svelte-zbkzcp-mb-pulse 2s ease-in-out infinite;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mb-ev-live.svelte-zbkzcp { animation: none; }\n\t}\n\t.mb-ev-next-badge.svelte-zbkzcp {\n\t\tposition: absolute;\n\t\ttop: 4px;\n\t\tright: 4px;\n\t\tfont: 600 10px/1 var(--dt-sans, system-ui, sans-serif);\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--ev-color, var(--dt-accent));\n\t\tbackground: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);\n\t\tpadding: 2px 5px;\n\t\tborder-radius: 3px;\n\t\twhite-space: nowrap;\n\t}\n\n\t@keyframes svelte-zbkzcp-mb-pulse {\n\t\t0%, 100% { opacity: 1; }\n\t\t50% { opacity: 0.4; }\n\t}\n\n\t/* ─── Focus ──────────────────────────────────────── */\n\t.mb-event.svelte-zbkzcp:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Container ──────────────────────────────────── */\n\t.mw.svelte-1d18hkf {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tuser-select: none;\n\t\tfont-variant-numeric: tabular-nums;\n\t\toverflow: hidden;\n\t\tbackground: var(--dt-bg, #fff);\n\t\t-webkit-tap-highlight-color: transparent;\n\t\ttouch-action: pan-y;\n\t}\n\t.mw--auto.svelte-1d18hkf { overflow: visible; }\n\n\t/* ─── Scrollable day list ────────────────────────── */\n\t.mw-list.svelte-1d18hkf {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\toverscroll-behavior: contain;\n\t\t-webkit-overflow-scrolling: touch;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;\n\t}\n\t.mw--auto.svelte-1d18hkf .mw-list:where(.svelte-1d18hkf) { overflow-y: visible; }\n\t.mw-list--animate.svelte-1d18hkf {\n\t\ttransition: transform 180ms ease;\n\t}\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.mw-list--animate.svelte-1d18hkf { transition: none; }\n\t}\n\n\t/* ─── Day row ────────────────────────────────────── */\n\t.mw-row.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 12px;\n\t\tposition: relative;\n\t\t/* border-box: width 100% + padding otherwise overflows the list by\n\t\t   24px, which iOS turns into a horizontal pan that clips the date\n\t\t   column off the left edge */\n\t\tbox-sizing: border-box;\n\t\tpadding: 10px 12px;\n\t\tbackground: transparent;\n\t\ttransition: background 120ms;\n\t\ttext-align: left;\n\t\twidth: 100%;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tmin-height: 56px;\n\t}\n\t.mw-row.svelte-1d18hkf:last-child {\n\t\tborder-bottom: none;\n\t}\n\t.mw-row.svelte-1d18hkf:has(.mw-row-target:where(.svelte-1d18hkf):active) {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 6%, transparent);\n\t}\n\t.mw-row--today.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 4%, transparent);\n\t}\n\t/* Token-based dim (not subtree opacity) so past rows stay legible/tappable */\n\t.mw-row--past.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent);\n\t}\n\t.mw-row--past.svelte-1d18hkf .mw-ev-title,\n\t.mw-row--past.svelte-1d18hkf .mw-day-num:where(.svelte-1d18hkf) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-row--disabled.svelte-1d18hkf {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t135deg,\n\t\t\ttransparent,\n\t\t\ttransparent 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 6px,\n\t\t\tcolor-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 12px\n\t\t);\n\t}\n\t.mw-row-target.svelte-1d18hkf {\n\t\tposition: absolute;\n\t\tinset: 0;\n\t\tz-index: 0;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\tpadding: 0;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.mw-row-target.svelte-1d18hkf:disabled {\n\t\tcursor: default;\n\t}\n\t.mw-row-target.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Date column ────────────────────────────────── */\n\t.mw-date.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\twidth: 40px;\n\t\tflex-shrink: 0;\n\t\tgap: 2px;\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tpointer-events: none;\n\t}\n\n\t.mw-day-name.svelte-1d18hkf {\n\t\tfont: 600 11px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tletter-spacing: 0.06em;\n\t\ttext-transform: uppercase;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-day-name--today.svelte-1d18hkf {\n\t\tcolor: var(--dt-accent, #2563eb);\n\t}\n\n\t.mw-day-num.svelte-1d18hkf {\n\t\tfont: 700 18px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.mw-day-num--today.svelte-1d18hkf {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tborder-radius: 50%;\n\t\tfont-size: 15px;\n\t}\n\n\t/* ─── Events column ──────────────────────────────── */\n\t/* pointer-events pass through to the full-row target underneath;\n\t   only the chips (and \"+N more\") re-capture them. */\n\t.mw-events.svelte-1d18hkf {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 4px;\n\t\tposition: relative;\n\t\tz-index: 2;\n\t\tpointer-events: none;\n\t}\n\n\t.mw-empty.svelte-1d18hkf {\n\t\tfont: 400 13px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\n\t/* ─── Event chip ─────────────────────────────────── */\n\t.mw-ev.svelte-1d18hkf {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0;\n\t\tmin-height: 44px;\n\t\tborder-radius: 6px;\n\t\tbackground: color-mix(in srgb, var(--ev-color) 10%, var(--dt-surface, #f9fafb));\n\t\toverflow: hidden;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tborder: none;\n\t\ttext-align: left;\n\t\tpadding: 0;\n\t\tpointer-events: auto;\n\t}\n\t.mw-ev.svelte-1d18hkf:active {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, #f9fafb));\n\t}\n\t.mw-ev--selected.svelte-1d18hkf {\n\t\tbox-shadow: 0 0 0 1.5px var(--ev-color);\n\t}\n\t.mw-ev--current.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 16%, var(--dt-surface, #f9fafb));\n\t}\n\t.mw-ev--allday.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 14%, var(--dt-surface, #f9fafb));\n\t}\n\t/* Status treatments: token-level dims + a non-opacity signal\n\t   (strikethrough / border style) — never a bare opacity on the chip. */\n\t.mw-ev--cancelled.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #f9fafb));\n\t}\n\t.mw-ev--cancelled.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf) {\n\t\ttext-decoration: line-through;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-ev--cancelled.svelte-1d18hkf .mw-ev-stripe:where(.svelte-1d18hkf) {\n\t\topacity: 0.45; /* decorative bar only */\n\t}\n\t.mw-ev--tentative.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\t.mw-ev--full.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);\n\t}\n\t.mw-ev--full.svelte-1d18hkf .mw-ev-title:where(.svelte-1d18hkf) {\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.mw-ev--limited.svelte-1d18hkf {\n\t\tbackground: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));\n\t\tborder: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);\n\t}\n\n\t.mw-ev-stripe.svelte-1d18hkf {\n\t\twidth: 3px;\n\t\talign-self: stretch;\n\t\tbackground: var(--ev-color, var(--dt-accent));\n\t\tflex-shrink: 0;\n\t\tborder-radius: 6px 0 0 6px;\n\t}\n\n\t.mw-ev-body.svelte-1d18hkf {\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t\tpadding: 5px 8px;\n\t\tdisplay: flex;\n\t\talign-items: baseline;\n\t\tgap: 6px;\n\t}\n\n\t.mw-ev-title.svelte-1d18hkf {\n\t\tfont: 500 15px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\n\t.mw-ev-time.svelte-1d18hkf {\n\t\tfont: 400 12px/1 var(--dt-mono, ui-monospace, monospace);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\twhite-space: nowrap;\n\t\tflex-shrink: 0;\n\t}\n\n\t.mw-ev-more.svelte-1d18hkf {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tpadding: 2px 4px;\n\t\tmin-height: 32px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcursor: pointer;\n\t\ttext-align: left;\n\t\talign-self: flex-start;\n\t\tposition: relative;\n\t\tpointer-events: auto;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t/* Hit-slop: 44px effective touch target */\n\t.mw-ev-more.svelte-1d18hkf::before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 50%;\n\t\ttransform: translateY(-50%);\n\t\theight: 44px;\n\t}\n\t.mw-ev-more.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t/* ─── Chevron ────────────────────────────────────── */\n\t.mw-chevron.svelte-1d18hkf {\n\t\tflex-shrink: 0;\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t\tposition: relative;\n\t\tz-index: 1;\n\t\tpointer-events: none;\n\t}\n\n\t/* ─── Focus ──────────────────────────────────────── */\n\t.mw-ev.svelte-1d18hkf:focus-visible {\n\t\toutline: none;\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t}\n\n\t.mg.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tbackground: var(--dt-bg);\n\t\tcolor: var(--dt-text);\n\t\tfont-family: var(--dt-sans);\n\t\toverflow: hidden;\n\t\tcontainer-type: inline-size;\n\t}\n\t.mg--auto.svelte-pvjuld {\n\t\theight: auto;\n\t}\n\n\t.mg-head.svelte-pvjuld {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(7, 1fr);\n\t\tborder-bottom: 1px solid var(--dt-border);\n\t\tflex: none;\n\t}\n\t.mg-head-cell.svelte-pvjuld {\n\t\tpadding: 6px 8px;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tfont-weight: 600;\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.06em;\n\t\tcolor: var(--dt-text-3);\n\t}\n\n\t.mg-body.svelte-pvjuld {\n\t\tflex: 1;\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(7, 1fr);\n\t\t/* 56px floor + scroll backstop: a 6-row month compresses instead of clipping its last week */\n\t\tgrid-template-rows: repeat(var(--mg-rows, 5), minmax(56px, 1fr));\n\t\tmin-height: 0;\n\t\toverflow-y: auto;\n\t}\n\t.mg--auto.svelte-pvjuld .mg-body:where(.svelte-pvjuld) {\n\t\tgrid-template-rows: repeat(var(--mg-rows, 5), minmax(88px, auto));\n\t}\n\t.mg-row.svelte-pvjuld {\n\t\tdisplay: contents;\n\t}\n\n\t.mg-cell.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 3px;\n\t\tpadding: 6px;\n\t\tborder-right: 1px solid var(--dt-border-day);\n\t\tborder-bottom: 1px solid var(--dt-border-day);\n\t\tmin-width: 0;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t}\n\t.mg-cell.svelte-pvjuld:nth-child(7n) {\n\t\tborder-right: none;\n\t}\n\t.mg-cell--weekend.svelte-pvjuld {\n\t\tbackground: var(--dt-weekend-bg, rgba(0, 0, 0, 0.02));\n\t}\n\t/* Dim only the day number for adjacent-month cells — their events stay legible */\n\t.mg-cell--out.svelte-pvjuld {\n\t\tbackground: var(--dt-surface, transparent);\n\t}\n\t.mg-cell--out.svelte-pvjuld .mg-daynum:where(.svelte-pvjuld) {\n\t\tcolor: var(--dt-text-3);\n\t}\n\t.mg-cell--today.svelte-pvjuld {\n\t\tbackground: var(--dt-today-bg);\n\t}\n\t.mg-cell--expanded.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\toverflow-y: auto;\n\t}\n\t.mg-cell--disabled.svelte-pvjuld {\n\t\topacity: 0.35;\n\t\tpointer-events: none;\n\t}\n\t.mg-cell--clickable.svelte-pvjuld {\n\t\tcursor: pointer;\n\t}\n\t.mg-cell--clickable.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(0, 0, 0, 0.04));\n\t}\n\t.mg-cell.svelte-pvjuld:focus-visible {\n\t\toutline: 2px solid var(--dt-accent, #2563eb);\n\t\toutline-offset: -2px;\n\t}\n\n\t.mg-daynum.svelte-pvjuld {\n\t\tflex: none;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 12px;\n\t\tfont-weight: 600;\n\t\tcolor: var(--dt-text-2);\n\t\twidth: 22px;\n\t\theight: 22px;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tborder-radius: 999px;\n\t}\n\t.mg-daynum--today.svelte-pvjuld {\n\t\tbackground: var(--dt-accent);\n\t\tcolor: var(--dt-btn-text);\n\t}\n\n\t.mg-chips.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 2px;\n\t\tmin-height: 0;\n\t\toverflow: hidden;\n\t}\n\t.mg-chip.svelte-pvjuld {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 5px;\n\t\tborder: none;\n\t\tbackground: none;\n\t\tpadding: 2px 4px;\n\t\tborder-radius: 5px;\n\t\tfont-family: var(--dt-sans);\n\t\tfont-size: 12px;\n\t\tline-height: 1.3;\n\t\tcolor: var(--dt-text);\n\t\tcursor: pointer;\n\t\tmin-width: 0;\n\t\ttext-align: left;\n\t}\n\t.mg-chip.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(0, 0, 0, 0.04));\n\t}\n\t.mg-chip.svelte-pvjuld:focus-visible {\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\toutline: none;\n\t}\n\t.mg-chip--selected.svelte-pvjuld {\n\t\tbackground: var(--dt-accent-dim);\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld {\n\t\ttext-decoration: line-through;\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld .mg-chip-title:where(.svelte-pvjuld) {\n\t\tcolor: var(--dt-text-2);\n\t}\n\t.mg-chip--cancelled.svelte-pvjuld .mg-chip-dot:where(.svelte-pvjuld) {\n\t\topacity: 0.5;\n\t}\n\t.mg-chip-dot.svelte-pvjuld {\n\t\tflex: none;\n\t\twidth: 7px;\n\t\theight: 7px;\n\t\tborder-radius: 999px;\n\t\tbackground: var(--mg-chip-color);\n\t}\n\t.mg-chip-time.svelte-pvjuld {\n\t\tflex: none;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2);\n\t}\n\t.mg-chip-title.svelte-pvjuld {\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\twhite-space: nowrap;\n\t}\n\t.mg-more.svelte-pvjuld {\n\t\talign-self: flex-start;\n\t\tborder: none;\n\t\tbackground: none;\n\t\tpadding: 1px 4px;\n\t\tborder-radius: 5px;\n\t\tfont-family: var(--dt-mono);\n\t\tfont-size: 11px;\n\t\tcolor: var(--dt-text-2);\n\t\tcursor: pointer;\n\t}\n\t.mg-more.svelte-pvjuld:hover {\n\t\tbackground: var(--dt-hover, rgba(0, 0, 0, 0.04));\n\t\tcolor: var(--dt-text);\n\t}\n\t.mg-more.svelte-pvjuld:focus-visible {\n\t\tbox-shadow: 0 0 0 2px var(--dt-accent, #2563eb);\n\t\toutline: none;\n\t}\n\n\t/* Container-based (the calendar adapts to its box, not the viewport) */\n\t@container (max-width: 640px) {\n\t\t.mg-chip-time.svelte-pvjuld {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n\n\t@media (hover: none) {\n\t\t.mg-chip.svelte-pvjuld,\n\t\t.mg-more.svelte-pvjuld {\n\t\t\tmin-height: 30px;\n\t\t}\n\t}\n\n\t/* ── Dots mode (mobile) ─────────────────────────────\n\t   Cells are too narrow for text chips, so events render as colored\n\t   dots in a wrapping row. The cell itself stays the tap target\n\t   (day drill-down); dots keep their title/aria-label for a11y. */\n\t.mg--dots.svelte-pvjuld .mg-chips:where(.svelte-pvjuld) {\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 3px;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip:where(.svelte-pvjuld) {\n\t\tpadding: 3px;\n\t\tmin-height: 0;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip-title:where(.svelte-pvjuld),\n\t.mg--dots.svelte-pvjuld .mg-chip-time:where(.svelte-pvjuld) {\n\t\tdisplay: none;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-chip-dot:where(.svelte-pvjuld) {\n\t\twidth: 8px;\n\t\theight: 8px;\n\t}\n\t.mg--dots.svelte-pvjuld .mg-more:where(.svelte-pvjuld) {\n\t\tpadding: 0 3px;\n\t\tmin-height: 0;\n\t\talign-self: center;\n\t\tfont-size: 10px;\n\t}\n\n\t.cal.svelte-1b53e7w {\n\t\tposition: relative;\n\t\twidth: 100%;\n\t\tmin-width: 0;\n\t\theight: var(--cal-h, 600px);\n\t\tbackground: var(--dt-bg, inherit);\n\t\tborder-radius: var(--cal-r, 12px);\n\t\toverflow: clip;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tbox-sizing: border-box;\n\t}\n\t.cal--auto.svelte-1b53e7w {\n\t\theight: auto;\n\t\toverflow: visible;\n\t}\n\n\n\t/* ── Desktop header ── */\n\t.cal-hd.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 8px;\n\t\tpadding: 8px 12px;\n\t\tmin-height: 48px;\n\t\tbox-sizing: border-box;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\n\t.cal-hd-side.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tflex: 1;\n\t\tmin-width: 0;\n\t}\n\n\t.cal-hd-side--end.svelte-1b53e7w {\n\t\tjustify-content: flex-end;\n\t}\n\n\t.cal-hd-title.svelte-1b53e7w {\n\t\tfont: 600 14px/1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t}\n\n\t.cal-hd-btn.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 28px;\n\t\theight: 28px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tborder-radius: 6px;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms, color 120ms;\n\t}\n\n\t.cal-hd-btn.svelte-1b53e7w:hover {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent);\n\t}\n\n\t.cal-hd-btn.svelte-1b53e7w:focus-visible,\n\t.cal-hd-today.svelte-1b53e7w:focus-visible,\n\t.cal-pill.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\toutline-offset: 2px;\n\t}\n\n\t.cal-hd-today.svelte-1b53e7w {\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tbackground: transparent;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tpadding: 6px 10px;\n\t\tborder-radius: 6px;\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\t\tmargin-right: 2px;\n\t\ttransition: background 120ms, color 120ms, border-color 120ms;\n\t}\n\n\t.cal-hd-today.svelte-1b53e7w:hover:not(:disabled) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tborder-color: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t}\n\t.cal-hd-today.svelte-1b53e7w:disabled {\n\t\topacity: 0.45;\n\t\tcursor: default;\n\t}\n\n\t.cal-pills.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tgap: 2px;\n\t\tbackground: color-mix(in srgb, var(--dt-surface, var(--dt-bg, #ffffff)) 85%, transparent);\n\t\tborder-radius: 8px;\n\t\tpadding: 2px;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\n\t.cal-pill.svelte-1b53e7w {\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tcursor: pointer;\n\t\tfont: 500 12px/1 var(--dt-sans, system-ui, sans-serif);\n\t\tpadding: 5px 12px;\n\t\tborder-radius: 6px;\n\t\ttransition: background 100ms, color 100ms;\n\t}\n\n\t/* :not(--active) — the hover rule otherwise outranks the active color,\n\t   and iOS keeps :hover stuck after a tap (dark text on the accent). */\n\t.cal-pill.svelte-1b53e7w:hover:not(.cal-pill--active) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\n\t.cal-pill--active.svelte-1b53e7w {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t}\n\n\t.cal-body.svelte-1b53e7w {\n\t\tflex: 1;\n\t\tmin-height: 0;\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t}\n\t.cal--auto.svelte-1b53e7w .cal-body:where(.svelte-1b53e7w) {\n\t\toverflow: visible;\n\t}\n\n\t.cal-empty.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 100%;\n\t\tfont: 400 13px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text-3, rgba(0, 0, 0, 0.38));\n\t}\n\n\t.cal-loading.svelte-1b53e7w {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\theight: 2px;\n\t\tbackground: linear-gradient(\n\t\t\t90deg,\n\t\t\ttransparent 0%,\n\t\t\tvar(--dt-accent, #2563eb) 50%,\n\t\t\ttransparent 100%\n\t\t);\n\t\tanimation: svelte-1b53e7w-cal-slide 1.2s ease-in-out infinite;\n\t}\n\n\t@keyframes svelte-1b53e7w-cal-slide {\n\t\t0% { transform: translateX(-100%); }\n\t\t100% { transform: translateX(100%); }\n\t}\n\n\t@media (prefers-reduced-motion: reduce) {\n\t\t.cal-loading.svelte-1b53e7w {\n\t\t\tanimation: none;\n\t\t\tbackground: var(--dt-accent-dim, rgba(37, 99, 235, 0.12));\n\t\t}\n\t}\n\n\t/* ── Mobile header (flow layout) ── */\n\t.cal-m-hd.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 4px;\n\t\tpadding: 8px 8px 6px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t\tmin-height: 44px;\n\t}\n\n\t/* Narrow containers: the date label moves to its own row (.cal-m-titlebar),\n\t   so the controls row spreads pills and nav to the edges. */\n\t.cal-m-hd--stack.svelte-1b53e7w {\n\t\tjustify-content: space-between;\n\t}\n\t.cal-m-hd--titled.svelte-1b53e7w {\n\t\tborder-bottom: none;\n\t\tpadding-bottom: 2px;\n\t}\n\t.cal-m-titlebar.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\tpadding: 0 8px 8px;\n\t\tborder-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-titlebar.svelte-1b53e7w .cal-m-title:where(.svelte-1b53e7w) {\n\t\tflex: 0 1 auto;\n\t}\n\n\t.cal-m-left.svelte-1b53e7w,\n\t.cal-m-right.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 2px;\n\t\tflex-shrink: 0;\n\t}\n\n\t.cal-m-right.svelte-1b53e7w {\n\t\tjustify-content: flex-end;\n\t}\n\n\t.cal-m-nav.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 40px;\n\t\theight: 40px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tborder-radius: 50%;\n\t\tcursor: pointer;\n\t\ttransition: background 120ms, color 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-nav.svelte-1b53e7w:hover {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\tbackground: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent);\n\t}\n\t.cal-m-nav.svelte-1b53e7w:active {\n\t\tbackground: var(--dt-accent-dim, rgba(37, 99, 235, 0.12));\n\t}\n\t.cal-m-nav.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\toutline-offset: 2px;\n\t}\n\n\t.cal-m-pills.svelte-1b53e7w {\n\t\tdisplay: flex;\n\t\tgap: 2px;\n\t\tbackground: color-mix(in srgb, var(--dt-surface, var(--dt-bg, #ffffff)) 85%, transparent);\n\t\tborder-radius: 8px;\n\t\tpadding: 2px;\n\t\tborder: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-pill.svelte-1b53e7w {\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tcolor: var(--dt-text-2, rgba(0, 0, 0, 0.54));\n\t\tcursor: pointer;\n\t\tfont: 600 12px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tpadding: 9px 12px;\n\t\tborder-radius: 6px;\n\t\tletter-spacing: 0.04em;\n\t\ttext-transform: uppercase;\n\t\ttransition: background 100ms, color 100ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t}\n\t.cal-m-pill.svelte-1b53e7w:hover:not(.cal-m-pill--active) {\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t}\n\t.cal-m-pill--active.svelte-1b53e7w {\n\t\tbackground: var(--dt-accent, #2563eb);\n\t\tcolor: var(--dt-btn-text, #fff);\n\t}\n\n\t.cal-m-title.svelte-1b53e7w {\n\t\tflex: 1;\n\t\ttext-align: center;\n\t\tfont: 600 14px / 1.2 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-text, rgba(0, 0, 0, 0.87));\n\t\twhite-space: nowrap;\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\tmin-width: 0;\n\t}\n\n\t.cal-m-today.svelte-1b53e7w {\n\t\tfont: 600 12px / 1 var(--dt-sans, system-ui, sans-serif);\n\t\tcolor: var(--dt-accent, #2563eb);\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 10%, transparent);\n\t\tborder: none;\n\t\tmin-height: 40px;\n\t\tpadding: 5px 12px;\n\t\tborder-radius: 6px;\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\t\tletter-spacing: 0.04em;\n\t\ttext-transform: uppercase;\n\t\ttransition: background 120ms, color 120ms;\n\t\t-webkit-tap-highlight-color: transparent;\n\t\tflex-shrink: 0;\n\t}\n\t.cal-m-today.svelte-1b53e7w:hover:not(:disabled) {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 18%, transparent);\n\t}\n\t.cal-m-today.svelte-1b53e7w:active:not(:disabled) {\n\t\tbackground: color-mix(in srgb, var(--dt-accent, #2563eb) 25%, transparent);\n\t}\n\t.cal-m-today.svelte-1b53e7w:disabled {\n\t\topacity: 0.45;\n\t\tcursor: default;\n\t}\n\t.cal-m-today.svelte-1b53e7w:focus-visible {\n\t\toutline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);\n\t\toutline-offset: 2px;\n\t}\n";
(function() {
  "use strict";
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const MANAGED_EFFECT = 1 << 24;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const CONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const REACTION_RAN = 1 << 15;
  const DESTROYING = 1 << 25;
  const EFFECT_TRANSPARENT = 1 << 16;
  const EAGER_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const USER_EFFECT = 1 << 20;
  const EFFECT_OFFSCREEN = 1 << 25;
  const WAS_MARKED = 1 << 16;
  const REACTION_IS_UPDATING = 1 << 21;
  const ASYNC = 1 << 22;
  const ERROR_VALUE = 1 << 23;
  const STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
  const LEGACY_PROPS = /* @__PURE__ */ Symbol("legacy props");
  const LOADING_ATTR_SYMBOL = /* @__PURE__ */ Symbol("");
  const ATTRIBUTES_CACHE = /* @__PURE__ */ Symbol("attributes");
  const CLASS_CACHE = /* @__PURE__ */ Symbol("class");
  const STYLE_CACHE = /* @__PURE__ */ Symbol("style");
  const TEXT_CACHE = /* @__PURE__ */ Symbol("text");
  const STALE_REACTION = new class StaleReactionError extends Error {
    name = "StaleReactionError";
    message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
  }();
  const IS_XHTML = (
    // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
    !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
  );
  const TEXT_NODE = 3;
  const COMMENT_NODE = 8;
  const DEV = false;
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
  function is_function(thing) {
    return typeof thing === "function";
  }
  const noop = () => {
  };
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  function deferred() {
    var resolve;
    var reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  function lifecycle_outside_component(name) {
    {
      throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    }
  }
  function async_derived_orphan() {
    {
      throw new Error(`https://svelte.dev/e/async_derived_orphan`);
    }
  }
  function each_key_duplicate(a, b, value) {
    {
      throw new Error(`https://svelte.dev/e/each_key_duplicate`);
    }
  }
  function effect_in_teardown(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function hydration_failed() {
    {
      throw new Error(`https://svelte.dev/e/hydration_failed`);
    }
  }
  function props_invalid_value(key) {
    {
      throw new Error(`https://svelte.dev/e/props_invalid_value`);
    }
  }
  function state_descriptors_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  function svelte_boundary_reset_onerror() {
    {
      throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
    }
  }
  let tracing_mode_flag = false;
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_IS_CONTROLLED = 1 << 2;
  const EACH_IS_ANIMATED = 1 << 3;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const PROPS_IS_IMMUTABLE = 1;
  const PROPS_IS_UPDATED = 1 << 2;
  const PROPS_IS_BINDABLE = 1 << 3;
  const PROPS_IS_LAZY_INITIAL = 1 << 4;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const HYDRATION_START = "[";
  const HYDRATION_START_ELSE = "[!";
  const HYDRATION_START_FAILED = "[?";
  const HYDRATION_END = "]";
  const HYDRATION_ERROR = {};
  const UNINITIALIZED = /* @__PURE__ */ Symbol("uninitialized");
  const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  function getContext(key) {
    const context_map = get_or_init_context_map();
    const result = (
      /** @type {T} */
      context_map.get(key)
    );
    return result;
  }
  function setContext(key, context) {
    const context_map = get_or_init_context_map();
    context_map.set(key, context);
    return context;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      i: false,
      c: null,
      e: null,
      s: props,
      x: null,
      r: (
        /** @type {Effect} */
        active_effect
      ),
      l: null
    };
  }
  function pop(component2) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    context.i = true;
    component_context = context.p;
    return (
      /** @type {T} */
      {}
    );
  }
  function is_runes() {
    return true;
  }
  function get_or_init_context_map(name) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    return component_context.c ??= new Map(get_parent_context(component_context) || void 0);
  }
  function get_parent_context(component_context2) {
    let parent = component_context2.p;
    while (parent !== null) {
      const context_map = parent.c;
      if (context_map !== null) {
        return context_map;
      }
      parent = parent.p;
    }
    return null;
  }
  let micro_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0 && !is_flushing_sync) {
      var tasks = micro_tasks;
      queueMicrotask(() => {
        if (tasks === micro_tasks) run_micro_tasks();
      });
    }
    micro_tasks.push(fn);
  }
  function flush_tasks() {
    while (micro_tasks.length > 0) {
      run_micro_tasks();
    }
  }
  function derived_inert() {
    {
      console.warn(`https://svelte.dev/e/derived_inert`);
    }
  }
  function hydration_mismatch(location) {
    {
      console.warn(`https://svelte.dev/e/hydration_mismatch`);
    }
  }
  function svelte_boundary_reset_noop() {
    {
      console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
    }
  }
  let hydrating = false;
  function set_hydrating(value) {
    hydrating = value;
  }
  let hydrate_node;
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
      while (i--) {
        node = /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node);
      }
      hydrate_node = node;
    }
  }
  function skip_nodes(remove = true) {
    var depth = 0;
    var node = hydrate_node;
    while (true) {
      if (node.nodeType === COMMENT_NODE) {
        var data = (
          /** @type {Comment} */
          node.data
        );
        if (data === HYDRATION_END) {
          if (depth === 0) return node;
          depth -= 1;
        } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE || // "[1", "[2", etc. for if blocks
        data[0] === "[" && !isNaN(Number(data.slice(1)))) {
          depth += 1;
        }
      }
      var next2 = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      if (remove) node.remove();
      node = next2;
    }
  }
  function read_hydration_instruction(node) {
    if (!node || node.nodeType !== COMMENT_NODE) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    return (
      /** @type {Comment} */
      node.data
    );
  }
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = /* @__PURE__ */ state(0);
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", /* @__PURE__ */ state(
        /** @type {any[]} */
        value.length
      ));
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            with_parent(() => {
              var s2 = /* @__PURE__ */ state(descriptor.value);
              sources.set(prop2, s2);
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(prop2, s2);
              increment(version);
            }
          } else {
            set(s, UNINITIALIZED);
            increment(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop2] : UNINITIALIZED);
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2?.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop2]) : UNINITIALIZED;
                var s2 = /* @__PURE__ */ state(p);
                return s2;
              });
              sources.set(prop2, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || get_descriptor(target, prop2)?.writable) {
              s = with_parent(() => /* @__PURE__ */ state(void 0));
              set(s, proxy(value2));
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor?.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  var $window;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype[CLASS_CACHE] = void 0;
      element_prototype[ATTRIBUTES_CACHE] = null;
      element_prototype[STYLE_CACHE] = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype[TEXT_CACHE] = void 0;
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return (
      /** @type {TemplateNode | null} */
      first_child_getter.call(node)
    );
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return (
      /** @type {TemplateNode | null} */
      next_sibling_getter.call(node)
    );
  }
  function child(node, is_text) {
    if (!hydrating) {
      return /* @__PURE__ */ get_first_child(node);
    }
    var child2 = /* @__PURE__ */ get_first_child(hydrate_node);
    if (child2 === null) {
      child2 = hydrate_node.appendChild(create_text());
    } else if (is_text && child2.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      child2?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    if (is_text) {
      merge_text_nodes(
        /** @type {Text} */
        child2
      );
    }
    set_hydrate_node(child2);
    return child2;
  }
  function first_child(node, is_text = false) {
    if (!hydrating) {
      var first = /* @__PURE__ */ get_first_child(node);
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
    if (is_text) {
      if (hydrate_node?.nodeType !== TEXT_NODE) {
        var text2 = create_text();
        hydrate_node?.before(text2);
        set_hydrate_node(text2);
        return text2;
      }
      merge_text_nodes(
        /** @type {Text} */
        hydrate_node
      );
    }
    return hydrate_node;
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = hydrating ? hydrate_node : node;
    var last_sibling;
    while (count--) {
      last_sibling = next_sibling;
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    if (!hydrating) {
      return next_sibling;
    }
    if (is_text) {
      if (next_sibling?.nodeType !== TEXT_NODE) {
        var text2 = create_text();
        if (next_sibling === null) {
          last_sibling?.after(text2);
        } else {
          next_sibling.before(text2);
        }
        set_hydrate_node(text2);
        return text2;
      }
      merge_text_nodes(
        /** @type {Text} */
        next_sibling
      );
    }
    set_hydrate_node(next_sibling);
    return next_sibling;
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  function should_defer_append() {
    return false;
  }
  function create_element(tag, namespace, is) {
    {
      return (
        /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
        is ? document.createElement(tag, { is }) : document.createElement(tag)
      );
    }
  }
  function merge_text_nodes(text2) {
    if (
      /** @type {string} */
      text2.nodeValue.length < 65536
    ) {
      return;
    }
    let next2 = text2.nextSibling;
    while (next2 !== null && next2.nodeType === TEXT_NODE) {
      next2.remove();
      text2.nodeValue += /** @type {string} */
      next2.nodeValue;
      next2 = text2.nextSibling;
    }
  }
  function handle_error(error) {
    var effect2 = active_effect;
    if (effect2 === null) {
      active_reaction.f |= ERROR_VALUE;
      return error;
    }
    if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
      throw error;
    }
    invoke_error_boundary(error, effect2);
  }
  function invoke_error_boundary(error, effect2) {
    if (effect2 !== null && (effect2.f & DESTROYED) !== 0) {
      return;
    }
    while (effect2 !== null) {
      if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
        if ((effect2.f & REACTION_RAN) === 0) {
          throw error;
        }
        try {
          effect2.b.error(error);
          return;
        } catch (e) {
          error = e;
        }
      }
      effect2 = effect2.parent;
    }
    throw error;
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function update_derived_status(derived2) {
    if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
      set_signal_status(derived2, CLEAN);
    } else {
      set_signal_status(derived2, MAYBE_DIRTY);
    }
  }
  function clear_marked(deps) {
    if (deps === null) return;
    for (const dep of deps) {
      if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
        continue;
      }
      dep.f ^= WAS_MARKED;
      clear_marked(
        /** @type {Derived} */
        dep.deps
      );
    }
  }
  function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
    if ((effect2.f & DIRTY) !== 0) {
      dirty_effects.add(effect2);
    } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
      maybe_dirty_effects.add(effect2);
    }
    clear_marked(effect2.deps);
    set_signal_status(effect2, CLEAN);
  }
  let is_store_binding = false;
  function capture_store_binding(fn) {
    var previous_is_store_binding = is_store_binding;
    try {
      is_store_binding = false;
      return [fn(), is_store_binding];
    } finally {
      is_store_binding = previous_is_store_binding;
    }
  }
  function createSubscriber(start) {
    let subscribers = 0;
    let version = source(0);
    let stop;
    return () => {
      if (effect_tracking()) {
        get(version);
        render_effect(() => {
          if (subscribers === 0) {
            stop = untrack(() => start(() => increment(version)));
          }
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
  var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
  function boundary(node, props, children, transform_error) {
    new Boundary(node, props, children, transform_error);
  }
  class Boundary {
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
        var effect2 = (
          /** @type {Effect} */
          active_effect
        );
        effect2.b = this;
        effect2.f |= BOUNDARY_EFFECT;
        children(anchor);
      };
      this.parent = /** @type {Effect} */
      active_effect.b;
      this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
      this.#effect = block(() => {
        if (hydrating) {
          const comment2 = (
            /** @type {Comment} */
            this.#hydrate_open
          );
          hydrate_next();
          const server_rendered_pending = comment2.data === HYDRATION_START_ELSE;
          const server_rendered_failed = comment2.data.startsWith(HYDRATION_START_FAILED);
          if (server_rendered_failed) {
            const serialized_error = JSON.parse(comment2.data.slice(HYDRATION_START_FAILED.length));
            this.#hydrate_failed_content(serialized_error);
          } else if (server_rendered_pending) {
            this.#hydrate_pending_content();
          } else {
            this.#hydrate_resolved_content();
          }
        } else {
          this.#render();
        }
      }, flags);
      if (hydrating) {
        this.#anchor = hydrate_node;
      }
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
      if (!failed) return;
      this.#failed_effect = branch(() => {
        failed(
          this.#anchor,
          () => error,
          () => () => {
          }
        );
      });
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
          pause_effect(
            /** @type {Effect} */
            this.#pending_effect,
            () => {
              this.#pending_effect = null;
            }
          );
          this.#resolve(
            /** @type {Batch} */
            current_batch
          );
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
          const pending = (
            /** @type {(anchor: Node) => void} */
            this.#props.pending
          );
          this.#pending_effect = branch(() => pending(this.#anchor));
        } else {
          this.#resolve(
            /** @type {Batch} */
            current_batch
          );
        }
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
    defer_effect(effect2) {
      defer_effect(effect2, this.#dirty_effects, this.#maybe_dirty_effects);
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
        if (this.parent) {
          this.parent.#update_pending_count(d, batch);
        }
        return;
      }
      this.#pending_count += d;
      if (this.#pending_count === 0) {
        this.#resolve(batch);
        if (this.#pending_effect) {
          pause_effect(this.#pending_effect, () => {
            this.#pending_effect = null;
          });
        }
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
        if (this.#effect_pending) {
          internal_set(this.#effect_pending, this.#local_pending_count);
        }
      });
    }
    get_effect_pending() {
      this.#effect_pending_subscriber();
      return get(
        /** @type {Source<number>} */
        this.#effect_pending
      );
    }
    /** @param {unknown} error */
    error(error) {
      if (!this.#props.onerror && !this.#props.failed) {
        throw error;
      }
      if (current_batch?.is_fork) {
        if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
        if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
        if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
        current_batch.oncommit(() => {
          this.#handle_error(error);
        });
      } else {
        this.#handle_error(error);
      }
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
        set_hydrate_node(
          /** @type {TemplateNode} */
          this.#hydrate_open
        );
        next();
        set_hydrate_node(skip_nodes());
      }
      var onerror = this.#props.onerror;
      let failed = this.#props.failed;
      var did_reset = false;
      var calling_on_error = false;
      const reset2 = () => {
        if (did_reset) {
          svelte_boundary_reset_noop();
          return;
        }
        did_reset = true;
        if (calling_on_error) {
          svelte_boundary_reset_onerror();
        }
        if (this.#failed_effect !== null) {
          pause_effect(this.#failed_effect, () => {
            this.#failed_effect = null;
          });
        }
        this.#run(() => {
          this.#render();
        });
      };
      const handle_error_result = (transformed_error) => {
        try {
          calling_on_error = true;
          onerror?.(transformed_error, reset2);
          calling_on_error = false;
        } catch (error2) {
          invoke_error_boundary(error2, this.#effect && this.#effect.parent);
        }
        if (failed) {
          this.#failed_effect = this.#run(() => {
            try {
              return branch(() => {
                var effect2 = (
                  /** @type {Effect} */
                  active_effect
                );
                effect2.b = this;
                effect2.f |= BOUNDARY_EFFECT;
                failed(
                  this.#anchor,
                  () => transformed_error,
                  () => reset2
                );
              });
            } catch (error2) {
              invoke_error_boundary(
                error2,
                /** @type {Effect} */
                this.#effect.parent
              );
              return null;
            }
          });
        }
      };
      queue_micro_task(() => {
        var result;
        try {
          result = this.transform_error(error);
        } catch (e) {
          invoke_error_boundary(e, this.#effect && this.#effect.parent);
          return;
        }
        if (result !== null && typeof result === "object" && typeof /** @type {any} */
        result.then === "function") {
          result.then(
            handle_error_result,
            /** @param {unknown} e */
            (e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
          );
        } else {
          handle_error_result(result);
        }
      });
    }
  }
  function flatten(blockers, sync, async, fn) {
    const d = derived;
    var pending = blockers.filter((b) => !b.settled);
    var deriveds = sync.map(d);
    if (async.length === 0 && pending.length === 0) {
      fn(deriveds);
      return;
    }
    var parent = (
      /** @type {Effect} */
      active_effect
    );
    var restore = capture();
    var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
    function finish(async2) {
      if ((parent.f & DESTROYED) !== 0) {
        return;
      }
      restore();
      try {
        fn([...deriveds, ...async2]);
      } catch (error) {
        invoke_error_boundary(error, parent);
      }
      unset_context();
    }
    var decrement_pending = increment_pending();
    if (async.length === 0) {
      blocker_promise.then(() => finish([])).finally(decrement_pending);
      return;
    }
    function run() {
      Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
    }
    if (blocker_promise) {
      blocker_promise.then(() => {
        restore();
        run();
        unset_context();
      });
    } else {
      run();
    }
  }
  function capture() {
    var previous_effect = (
      /** @type {Effect} */
      active_effect
    );
    var previous_reaction = active_reaction;
    var previous_component_context = component_context;
    var previous_batch2 = (
      /** @type {Batch} */
      current_batch
    );
    return function restore(activate_batch = true) {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_component_context);
      if (activate_batch && (previous_effect.f & DESTROYED) === 0) {
        previous_batch2?.activate();
        previous_batch2?.apply();
      }
    };
  }
  function unset_context(deactivate_batch = true) {
    set_active_effect(null);
    set_active_reaction(null);
    set_component_context(null);
    if (deactivate_batch) current_batch?.deactivate();
  }
  function increment_pending() {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    var boundary2 = effect2.b;
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var blocking = !!boundary2?.is_rendered();
    boundary2?.update_pending_count(1, batch);
    batch.increment(blocking, effect2);
    return () => {
      boundary2?.update_pending_count(-1, batch);
      batch.decrement(blocking, effect2);
    };
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags2 = DERIVED | DIRTY;
    if (active_effect !== null) {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags2,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        UNINITIALIZED
      ),
      wv: 0,
      parent: active_effect,
      ac: null
    };
    return signal;
  }
  const OBSOLETE = /* @__PURE__ */ Symbol("obsolete");
  // @__NO_SIDE_EFFECTS__
  function async_derived(fn, label, location) {
    let parent = (
      /** @type {Effect | null} */
      active_effect
    );
    if (parent === null) {
      async_derived_orphan();
    }
    var promise = (
      /** @type {Promise<V>} */
      /** @type {unknown} */
      void 0
    );
    var signal = source(
      /** @type {V} */
      UNINITIALIZED
    );
    var should_suspend = !active_reaction;
    var deferreds = /* @__PURE__ */ new Set();
    async_effect(() => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
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
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      if (should_suspend) {
        if ((effect2.f & REACTION_RAN) !== 0) {
          var decrement_pending = increment_pending();
        }
        if (
          // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
          parent.b?.is_rendered()
        ) {
          batch.async_deriveds.get(effect2)?.reject(OBSOLETE);
        } else {
          for (const d2 of deferreds.values()) {
            d2.reject(OBSOLETE);
          }
        }
        deferreds.add(d);
        batch.async_deriveds.set(effect2, d);
      }
      const handler = (value, error = void 0) => {
        decrement_pending?.();
        deferreds.delete(d);
        if (error === OBSOLETE) return;
        batch.activate();
        if (error) {
          signal.f |= ERROR_VALUE;
          internal_set(signal, error);
        } else {
          if ((signal.f & ERROR_VALUE) !== 0) {
            signal.f ^= ERROR_VALUE;
          }
          internal_set(signal, value);
        }
        batch.deactivate();
      };
      d.promise.then(handler, (e) => handler(null, e || "unknown"));
    });
    teardown(() => {
      for (const d of deferreds) {
        d.reject(OBSOLETE);
      }
    });
    return new Promise((fulfil) => {
      function next2(p) {
        function go() {
          if (p === promise) {
            fulfil(signal);
          } else {
            next2(promise);
          }
        }
        p.then(go, go);
      }
      next2(promise);
    });
  }
  // @__NO_SIDE_EFFECTS__
  function user_derived(fn) {
    const d = /* @__PURE__ */ derived(fn);
    push_reaction_value(d);
    return d;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    var parent = derived2.parent;
    if (!is_destroying_effect && parent !== null && derived2.v !== UNINITIALIZED && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
    (parent.f & (DESTROYED | INERT)) !== 0) {
      derived_inert();
      return derived2.v;
    }
    set_active_effect(parent);
    {
      try {
        derived2.f &= ~WAS_MARKED;
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.wv = increment_write_version();
      if (!current_batch?.is_fork || derived2.deps === null) {
        if (current_batch !== null) {
          current_batch.capture(derived2, value, true);
          previous_batch?.capture(derived2, value, true);
        } else {
          derived2.v = value;
        }
        if (derived2.deps === null) {
          set_signal_status(derived2, CLEAN);
          return;
        }
      }
    }
    if (is_destroying_effect) {
      return;
    }
    if (batch_values !== null) {
      if (effect_tracking() || current_batch?.is_fork) {
        batch_values.set(derived2, value);
      }
    } else {
      update_derived_status(derived2);
    }
  }
  function freeze_derived_effects(derived2) {
    if (derived2.effects === null) return;
    for (const e of derived2.effects) {
      if (e.teardown || e.ac) {
        e.teardown?.();
        e.ac?.abort(STALE_REACTION);
        if (e.fn !== null) e.teardown = noop;
        e.ac = null;
        remove_reactions(e, 0);
        destroy_effect_children(e);
      }
    }
  }
  function unfreeze_derived_effects(derived2) {
    if (derived2.effects === null) return;
    for (const e of derived2.effects) {
      if (e.teardown && e.fn !== null) {
        update_effect(e);
      }
    }
  }
  let first_batch = null;
  let last_batch = null;
  let current_batch = null;
  let previous_batch = null;
  let batch_values = null;
  let last_scheduled_effect = null;
  let is_flushing_sync = false;
  let is_processing = false;
  let collected_effects = null;
  let legacy_updates = null;
  var flush_count = 0;
  var source_stacks = /* @__PURE__ */ new Set();
  let uid$1 = 1;
  class Batch {
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
      if (last_batch === null) {
        first_batch = last_batch = this;
      } else {
        last_batch.#next = this;
        this.#prev = last_batch;
      }
      last_batch = this;
    }
    #is_deferred() {
      if (this.is_fork) return true;
      for (const effect2 of this.#blocking_pending.keys()) {
        var e = effect2;
        var skipped = false;
        while (e.parent !== null) {
          if (this.#skipped_branches.has(e)) {
            skipped = true;
            break;
          }
          e = e.parent;
        }
        if (!skipped) {
          return true;
        }
      }
      return false;
    }
    /**
     * Add an effect to the #skipped_branches map and reset its children
     * @param {Effect} effect
     */
    skip_effect(effect2) {
      if (!this.#skipped_branches.has(effect2)) {
        this.#skipped_branches.set(effect2, { d: [], m: [] });
      }
      this.#unskipped_branches.delete(effect2);
    }
    /**
     * Remove an effect from the #skipped_branches map and reschedule
     * any tracked dirty/maybe_dirty child effects
     * @param {Effect} effect
     * @param {(e: Effect) => void} callback
     */
    unskip_effect(effect2, callback = (e) => this.schedule(e)) {
      var tracked = this.#skipped_branches.get(effect2);
      if (tracked) {
        this.#skipped_branches.delete(effect2);
        for (var e of tracked.d) {
          set_signal_status(e, DIRTY);
          callback(e);
        }
        for (e of tracked.m) {
          set_signal_status(e, MAYBE_DIRTY);
          callback(e);
        }
      }
      this.#unskipped_branches.add(effect2);
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
      var effects = collected_effects = [];
      var render_effects = [];
      var updates = legacy_updates = [];
      for (const root2 of roots) {
        try {
          this.#traverse(root2, effects, render_effects);
        } catch (e) {
          reset_all(root2);
          if (!this.#is_deferred()) this.discard();
          throw e;
        }
      }
      current_batch = null;
      if (updates.length > 0) {
        var batch = Batch.ensure();
        for (const e of updates) {
          batch.schedule(e);
        }
      }
      collected_effects = null;
      legacy_updates = null;
      if (this.#is_deferred()) {
        this.#defer_effects(render_effects);
        this.#defer_effects(effects);
        for (const [e, t] of this.#skipped_branches) {
          reset_branch(e, t);
        }
        if (updates.length > 0) {
          /** @type {unknown} */
          current_batch.#process();
        }
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
      var next_batch = (
        /** @type {Batch | null} */
        /** @type {unknown} */
        current_batch
      );
      if (this.#pending === 0 && (this.#roots.length === 0 || next_batch !== null)) {
        this.#unlink();
      }
      if (this.#roots.length > 0) {
        if (next_batch !== null) {
          const batch2 = next_batch;
          batch2.#roots.push(...this.#roots.filter((r) => !batch2.#roots.includes(r)));
        } else {
          next_batch = this;
        }
      }
      if (next_batch !== null) {
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
    #traverse(root2, effects, render_effects) {
      root2.f ^= CLEAN;
      var effect2 = root2.first;
      while (effect2 !== null) {
        var flags2 = effect2.f;
        var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
        var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
        var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.#skipped_branches.has(effect2);
        if (!skip && effect2.fn !== null) {
          if (is_branch) {
            effect2.f ^= CLEAN;
          } else if ((flags2 & EFFECT) !== 0) {
            effects.push(effect2);
          } else if (is_dirty(effect2)) {
            if ((flags2 & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect2);
            update_effect(effect2);
          }
          var child2 = effect2.first;
          if (child2 !== null) {
            effect2 = child2;
            continue;
          }
        }
        while (effect2 !== null) {
          var next2 = effect2.next;
          if (next2 !== null) {
            effect2 = next2;
            break;
          }
          effect2 = effect2.parent;
        }
      }
    }
    #find_earlier_batch() {
      var batch = this.#prev;
      while (batch !== null) {
        if (!batch.is_fork) {
          for (const [value, [, is_derived]] of this.current) {
            if (batch.current.has(value) && !is_derived) {
              return batch;
            }
          }
        }
        batch = batch.#prev;
      }
      return null;
    }
    /**
     * @param {Batch} batch
     */
    #merge(batch) {
      for (const [source2, value] of batch.current) {
        if (!this.previous.has(source2) && batch.previous.has(source2)) {
          this.previous.set(source2, batch.previous.get(source2));
        }
        this.current.set(source2, value);
      }
      for (const [effect2, deferred2] of batch.async_deriveds) {
        const d = this.async_deriveds.get(effect2);
        if (d) deferred2.promise.then(d.resolve).catch(d.reject);
      }
      batch.async_deriveds.clear();
      this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);
      const mark = (value) => {
        var reactions = value.reactions;
        if (reactions === null) return;
        for (const reaction of reactions) {
          var flags2 = reaction.f;
          if ((flags2 & DERIVED) !== 0) {
            mark(
              /** @type {Derived} */
              reaction
            );
          } else {
            var effect2 = (
              /** @type {Effect} */
              reaction
            );
            if (flags2 & (ASYNC | BLOCK_EFFECT) && !this.async_deriveds.has(effect2)) {
              this.#maybe_dirty_effects.delete(effect2);
              set_signal_status(effect2, DIRTY);
              this.schedule(effect2);
            }
          }
        }
      };
      for (const source2 of this.current.keys()) {
        mark(source2);
      }
      this.oncommit(() => batch.discard());
      batch.#unlink();
      current_batch = this;
      this.#process();
    }
    /**
     * @param {Effect[]} effects
     */
    #defer_effects(effects) {
      for (var i = 0; i < effects.length; i += 1) {
        defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
      }
    }
    /**
     * Associate a change to a given source with the current
     * batch, noting its previous and current values
     * @param {Value} source
     * @param {any} value
     * @param {boolean} [is_derived]
     */
    capture(source2, value, is_derived = false) {
      if (source2.v !== UNINITIALIZED && !this.previous.has(source2)) {
        this.previous.set(source2, source2.v);
      }
      if ((source2.f & ERROR_VALUE) === 0) {
        this.current.set(source2, [value, is_derived]);
        batch_values?.set(source2, value);
      }
      if (!this.is_fork) {
        source2.v = value;
      }
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
        if (DEV) ;
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
      for (const deferred2 of this.async_deriveds.values()) {
        deferred2.reject(OBSOLETE);
      }
      this.#unlink();
      this.#deferred?.resolve();
    }
    /**
     * @param {Effect} effect
     */
    register_created_effect(effect2) {
      this.#new_effects.push(effect2);
    }
    #commit() {
      for (let batch = first_batch; batch !== null; batch = batch.#next) {
        var is_earlier = batch.id < this.id;
        var sources = [];
        for (const [source3, [value, is_derived]] of this.current) {
          if (batch.current.has(source3)) {
            var batch_value = (
              /** @type {[any, boolean]} */
              batch.current.get(source3)[0]
            );
            if (is_earlier && value !== batch_value) {
              batch.current.set(source3, [value, is_derived]);
            } else {
              continue;
            }
          }
          sources.push(source3);
        }
        if (is_earlier) {
          for (const [effect2, deferred2] of this.async_deriveds) {
            const d = batch.async_deriveds.get(effect2);
            if (d) deferred2.promise.then(d.resolve).catch(d.reject);
          }
        }
        var current = [...batch.current.keys()].filter(
          (source3) => !/** @type {[any, boolean]} */
          batch.current.get(source3)[1]
        );
        if (!batch.#started || current.length === 0) continue;
        var others = current.filter((source3) => !this.current.has(source3));
        if (others.length === 0) {
          if (is_earlier) {
            batch.discard();
          }
        } else if (sources.length > 0) {
          if (is_earlier) {
            for (const unskipped of this.#unskipped_branches) {
              batch.unskip_effect(unskipped, (e) => {
                if ((e.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
                  batch.schedule(e);
                } else {
                  batch.#defer_effects([e]);
                }
              });
            }
          }
          batch.activate();
          var marked = /* @__PURE__ */ new Set();
          var checked = /* @__PURE__ */ new Map();
          for (var source2 of sources) {
            mark_effects(source2, others, marked, checked);
          }
          checked = /* @__PURE__ */ new Map();
          var current_unequal = [...batch.current].filter(([c, v1]) => {
            const v2 = this.current.get(c);
            if (!v2) return true;
            return v2[0] !== v1[0] || v2[1] !== v1[1];
          }).map(([c]) => c);
          if (current_unequal.length > 0) {
            for (const effect2 of this.#new_effects) {
              if ((effect2.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 && depends_on(effect2, current_unequal, checked)) {
                if ((effect2.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
                  set_signal_status(effect2, DIRTY);
                  batch.schedule(effect2);
                } else {
                  batch.#dirty_effects.add(effect2);
                }
              }
            }
          }
          if (batch.#roots.length > 0 && !batch.#decrement_queued) {
            batch.apply();
            for (var root2 of batch.#roots) {
              batch.#traverse(root2, [], []);
            }
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
    increment(blocking, effect2) {
      this.#pending += 1;
      if (blocking) {
        let blocking_pending_count = this.#blocking_pending.get(effect2) ?? 0;
        this.#blocking_pending.set(effect2, blocking_pending_count + 1);
      }
    }
    /**
     * @param {boolean} blocking
     * @param {Effect} effect
     */
    decrement(blocking, effect2) {
      this.#pending -= 1;
      if (blocking) {
        let blocking_pending_count = this.#blocking_pending.get(effect2) ?? 0;
        if (blocking_pending_count === 1) {
          this.#blocking_pending.delete(effect2);
        } else {
          this.#blocking_pending.set(effect2, blocking_pending_count - 1);
        }
      }
      if (this.#decrement_queued) return;
      this.#decrement_queued = true;
      queue_micro_task(() => {
        this.#decrement_queued = false;
        if (this.linked) {
          this.flush();
        }
      });
    }
    /**
     * @param {Set<Effect>} dirty_effects
     * @param {Set<Effect>} maybe_dirty_effects
     */
    transfer_effects(dirty_effects, maybe_dirty_effects) {
      for (const e of dirty_effects) {
        this.#dirty_effects.add(e);
      }
      for (const e of maybe_dirty_effects) {
        this.#maybe_dirty_effects.add(e);
      }
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
        if (!is_processing && !is_flushing_sync) {
          queue_micro_task(() => {
            if (!batch.#started) {
              batch.flush();
            }
          });
        }
      }
      return current_batch;
    }
    apply() {
      {
        batch_values = null;
        return;
      }
    }
    /**
     *
     * @param {Effect} effect
     */
    schedule(effect2) {
      last_scheduled_effect = effect2;
      if (effect2.b?.is_pending && (effect2.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (effect2.f & REACTION_RAN) === 0) {
        effect2.b.defer_effect(effect2);
        return;
      }
      var e = effect2;
      while (e.parent !== null) {
        e = e.parent;
        var flags2 = e.f;
        if (collected_effects !== null && e === active_effect) {
          if ((active_reaction === null || (active_reaction.f & DERIVED) === 0) && true) {
            return;
          }
        }
        if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
          if ((flags2 & CLEAN) === 0) {
            return;
          }
          e.f ^= CLEAN;
        }
      }
      this.#roots.push(e);
    }
    #unlink() {
      if (!this.linked) return;
      var prev = this.#prev;
      var next2 = this.#next;
      if (prev === null) {
        first_batch = next2;
      } else {
        prev.#next = next2;
      }
      if (next2 === null) {
        last_batch = prev;
      } else {
        next2.#prev = prev;
      }
      this.linked = false;
    }
  }
  function flushSync(fn) {
    var was_flushing_sync = is_flushing_sync;
    is_flushing_sync = true;
    try {
      var result;
      if (fn) ;
      while (true) {
        flush_tasks();
        if (current_batch === null) {
          return (
            /** @type {T} */
            result
          );
        }
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
  let eager_block_effects = null;
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    var i = 0;
    while (i < length) {
      var effect2 = effects[i++];
      if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
        eager_block_effects = /* @__PURE__ */ new Set();
        update_effect(effect2);
        if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
          unlink_effect(effect2);
        }
        if (eager_block_effects?.size > 0) {
          old_values.clear();
          for (const e of eager_block_effects) {
            if ((e.f & (DESTROYED | INERT)) !== 0) continue;
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
              const e2 = ordered_effects[j];
              if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
              update_effect(e2);
            }
          }
          eager_block_effects.clear();
        }
      }
    }
    eager_block_effects = null;
  }
  function mark_effects(value, sources, marked, checked) {
    if (marked.has(value)) return;
    marked.add(value);
    if (value.reactions !== null) {
      for (const reaction of value.reactions) {
        const flags2 = reaction.f;
        if ((flags2 & DERIVED) !== 0) {
          mark_effects(
            /** @type {Derived} */
            reaction,
            sources,
            marked,
            checked
          );
        } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
          set_signal_status(reaction, DIRTY);
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  function depends_on(reaction, sources, checked) {
    const depends = checked.get(reaction);
    if (depends !== void 0) return depends;
    if (reaction.deps !== null) {
      for (const dep of reaction.deps) {
        if (includes.call(sources, dep)) {
          return true;
        }
        if ((dep.f & DERIVED) !== 0 && depends_on(
          /** @type {Derived} */
          dep,
          sources,
          checked
        )) {
          checked.set(
            /** @type {Derived} */
            dep,
            true
          );
          return true;
        }
      }
    }
    checked.set(reaction, false);
    return false;
  }
  function schedule_effect(effect2) {
    current_batch.schedule(effect2);
  }
  function reset_branch(effect2, tracked) {
    if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
      return;
    }
    if ((effect2.f & DIRTY) !== 0) {
      tracked.d.push(effect2);
    } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
      tracked.m.push(effect2);
    }
    set_signal_status(effect2, CLEAN);
    var e = effect2.first;
    while (e !== null) {
      reset_branch(e, tracked);
      e = e.next;
    }
  }
  function reset_all(effect2) {
    set_signal_status(effect2, CLEAN);
    var e = effect2.first;
    while (e !== null) {
      reset_all(e);
      e = e.next;
    }
  }
  let eager_effects = /* @__PURE__ */ new Set();
  const old_values = /* @__PURE__ */ new Map();
  let eager_effects_deferred = false;
  function source(v, stack) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function state(v, stack) {
    const s = source(v);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false, trackable = true) {
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    return s;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
    // to ensure we error if state is set inside an inspect effect
    (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !current_sources.has(source2))) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    return internal_set(source2, new_value, legacy_updates);
  }
  function internal_set(source2, value, updated_during_traversal = null) {
    if (!source2.equals(value)) {
      old_values.set(source2, is_destroying_effect ? value : source2.v);
      var batch = Batch.ensure();
      batch.capture(source2, value);
      if ((source2.f & DERIVED) !== 0) {
        const derived2 = (
          /** @type {Derived} */
          source2
        );
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(derived2);
        }
        if (batch_values === null) {
          update_derived_status(derived2);
        }
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY, updated_during_traversal);
      if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
        flush_eager_effects();
      }
    }
    return value;
  }
  function flush_eager_effects() {
    eager_effects_deferred = false;
    for (const effect2 of eager_effects) {
      if ((effect2.f & CLEAN) !== 0) {
        set_signal_status(effect2, MAYBE_DIRTY);
      }
      let dirty;
      try {
        dirty = is_dirty(effect2);
      } catch {
        dirty = true;
      }
      if (dirty) {
        update_effect(effect2);
      }
    }
    eager_effects.clear();
  }
  function increment(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status, updated_during_traversal) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags2 = reaction.f;
      var not_dirty = (flags2 & DIRTY) === 0;
      if (not_dirty) {
        set_signal_status(reaction, status);
      }
      if ((flags2 & EAGER_EFFECT) !== 0) {
        eager_effects.add(
          /** @type {Effect} */
          reaction
        );
      } else if ((flags2 & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          reaction
        );
        batch_values?.delete(derived2);
        if ((flags2 & WAS_MARKED) === 0) {
          if (flags2 & CONNECTED && (active_effect === null || (active_effect.f & REACTION_IS_UPDATING) === 0)) {
            reaction.f |= WAS_MARKED;
          }
          mark_reactions(derived2, MAYBE_DIRTY, updated_during_traversal);
        }
      } else if (not_dirty) {
        var effect2 = (
          /** @type {Effect} */
          reaction
        );
        if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
          eager_block_effects.add(effect2);
        }
        if (updated_during_traversal !== null) {
          updated_during_traversal.push(effect2);
        } else {
          schedule_effect(effect2);
        }
      }
    }
  }
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
  let is_updating_effect = false;
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && true) {
      (current_sources ??= /* @__PURE__ */ new Set()).add(value);
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  function increment_write_version() {
    return ++write_version;
  }
  function is_dirty(reaction) {
    var flags2 = reaction.f;
    if ((flags2 & DIRTY) !== 0) {
      return true;
    }
    if (flags2 & DERIVED) {
      reaction.f &= ~WAS_MARKED;
    }
    if ((flags2 & MAYBE_DIRTY) !== 0) {
      var dependencies = (
        /** @type {Value[]} */
        reaction.deps
      );
      var length = dependencies.length;
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i];
        if (is_dirty(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.wv > reaction.wv) {
          return true;
        }
      }
      if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
      // traversal of the graph in the other batches still happens
      batch_values === null) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources !== null && current_sources.has(signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags2 = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    if (reaction.ac !== null) {
      without_reactive_context(() => {
        reaction.ac.abort(STALE_REACTION);
      });
      reaction.ac = null;
    }
    try {
      reaction.f |= REACTION_IS_UPDATING;
      var fn = (
        /** @type {Function} */
        reaction.fn
      );
      var result = fn();
      reaction.f |= REACTION_RAN;
      var deps = reaction.deps;
      var is_fork = current_batch?.is_fork;
      if (new_deps !== null) {
        var i;
        if (!is_fork) {
          remove_reactions(reaction, skipped_deps);
        }
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
          for (i = skipped_deps; i < deps.length; i++) {
            (deps[i].reactions ??= []).push(reaction);
          }
        }
      } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (previous_reaction.deps !== null) {
          for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
            previous_reaction.deps[i2].rv = read_version;
          }
        }
        if (previous_deps !== null) {
          for (const dep of previous_deps) {
            dep.rv = read_version;
          }
        }
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      if ((reaction.f & ERROR_VALUE) !== 0) {
        reaction.f ^= ERROR_VALUE;
      }
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
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index2 = index_of.call(reactions, signal);
      if (index2 !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index2] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !includes.call(new_deps, dependency))) {
      var derived2 = (
        /** @type {Derived} */
        dependency
      );
      if ((derived2.f & CONNECTED) !== 0) {
        derived2.f ^= CONNECTED;
        derived2.f &= ~WAS_MARKED;
      }
      if (derived2.v !== UNINITIALIZED) {
        update_derived_status(derived2);
      }
      freeze_derived_effects(derived2);
      remove_reactions(derived2, 0);
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags2 = effect2.f;
    if ((flags2 & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    try {
      if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
    }
  }
  async function tick() {
    await Promise.resolve();
    flushSync();
  }
  function get(signal) {
    var flags2 = signal.f;
    var is_derived = (flags2 & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
      if (!destroyed && (current_sources === null || !current_sources.has(signal))) {
        var deps = active_reaction.deps;
        if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
          if (signal.rv < read_version) {
            signal.rv = read_version;
            if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
              skipped_deps++;
            } else if (new_deps === null) {
              new_deps = [signal];
            } else {
              new_deps.push(signal);
            }
          }
        } else {
          active_reaction.deps ??= [];
          if (!includes.call(active_reaction.deps, signal)) {
            active_reaction.deps.push(signal);
          }
          var reactions = signal.reactions;
          if (reactions === null) {
            signal.reactions = [active_reaction];
          } else if (!includes.call(reactions, active_reaction)) {
            reactions.push(active_reaction);
          }
        }
      }
    }
    if (is_destroying_effect && old_values.has(signal)) {
      return old_values.get(signal);
    }
    if (is_derived) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      if (is_destroying_effect) {
        var value = derived2.v;
        if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
      var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
      var is_new = (derived2.f & REACTION_RAN) === 0;
      if (is_dirty(derived2)) {
        if (should_connect) {
          derived2.f |= CONNECTED;
        }
        update_derived(derived2);
      }
      if (should_connect && !is_new) {
        unfreeze_derived_effects(derived2);
        reconnect(derived2);
      }
    }
    if (batch_values?.has(signal)) {
      return batch_values.get(signal);
    }
    if ((signal.f & ERROR_VALUE) !== 0) {
      throw signal.v;
    }
    return signal.v;
  }
  function reconnect(derived2) {
    derived2.f |= CONNECTED;
    if (derived2.deps === null) return;
    for (const dep of derived2.deps) {
      (dep.reactions ??= []).push(derived2);
      if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
        unfreeze_derived_effects(
          /** @type {Derived} */
          dep
        );
        reconnect(
          /** @type {Derived} */
          dep
        );
      }
    }
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
        /** @type {Derived} */
        dep
      )) {
        return true;
      }
    }
    return false;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  function validate_effect(rune) {
    if (active_effect === null) {
      if (active_reaction === null) {
        effect_orphan();
      }
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown();
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn) {
    var parent = active_effect;
    if (parent !== null && (parent.f & INERT) !== 0) {
      type |= INERT;
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes: null,
      f: type | DIRTY | CONNECTED,
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
    current_batch?.register_created_effect(effect2);
    var e = effect2;
    if ((type & EFFECT) !== 0) {
      if (collected_effects !== null) {
        collected_effects.push(effect2);
      } else {
        Batch.ensure().schedule(effect2);
      }
    } else if (fn !== null) {
      try {
        update_effect(effect2);
      } catch (e2) {
        destroy_effect(effect2);
        throw e2;
      }
      if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
      (e.f & EFFECT_PRESERVED) === 0) {
        e = e.first;
        if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
          e.f |= EFFECT_TRANSPARENT;
        }
      }
    }
    if (e !== null) {
      e.parent = parent;
      if (parent !== null) {
        push_effect(e, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ??= []).push(e);
      }
    }
    return effect2;
  }
  function effect_tracking() {
    return active_reaction !== null && !untracking;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect();
    var flags2 = (
      /** @type {Effect} */
      active_effect.f
    );
    var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.i;
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ??= []).push(fn);
    } else {
      return create_user_effect(fn);
    }
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn);
  }
  function component_root(fn) {
    Batch.ensure();
    const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn);
  }
  function async_effect(fn) {
    return create_effect(ASYNC | EFFECT_PRESERVED, fn);
  }
  function render_effect(fn, flags2 = 0) {
    return create_effect(RENDER_EFFECT | flags2, fn);
  }
  function template_effect(fn, sync = [], async = [], blockers = []) {
    flatten(blockers, sync, async, (values) => {
      create_effect(RENDER_EFFECT, () => {
        fn(...values.map(get));
      });
    });
  }
  function block(fn, flags2 = 0) {
    var effect2 = create_effect(BLOCK_EFFECT | flags2, fn);
    return effect2;
  }
  function branch(fn) {
    return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      const controller = effect2.ac;
      if (controller !== null) {
        without_reactive_context(() => {
          controller.abort(STALE_REACTION);
        });
      }
      var next2 = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next2;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next2 = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next2;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
      remove_effect_dom(
        effect2.nodes.start,
        /** @type {TemplateNode} */
        effect2.nodes.end
      );
      removed = true;
    }
    effect2.f |= DESTROYING;
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    var transitions = effect2.nodes && effect2.nodes.t;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    effect2.f ^= DESTROYING;
    effect2.f |= DESTROYED;
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = effect2.b = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next2 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
      node.remove();
      node = next2;
    }
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next2 = effect2.next;
    if (prev !== null) prev.next = next2;
    if (next2 !== null) next2.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next2;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback, destroy = true) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    var fn = () => {
      if (destroy) destroy_effect(effect2);
      if (callback) callback();
    };
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    var t = effect2.nodes && effect2.nodes.t;
    if (t !== null) {
      for (const transition of t) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      if ((child2.f & ROOT_EFFECT) === 0) {
        var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
        pause_children(child2, transitions, transparent ? local : false);
      }
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if ((effect2.f & CLEAN) === 0) {
      set_signal_status(effect2, DIRTY);
      Batch.ensure().schedule(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    var t = effect2.nodes && effect2.nodes.t;
    if (t !== null) {
      for (const transition of t) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  function move_effect(effect2, fragment) {
    if (!effect2.nodes) return;
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    while (node !== null) {
      var next2 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
      fragment.append(node);
      node = next2;
    }
  }
  const event_symbol = /* @__PURE__ */ Symbol("events");
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler?.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture2, passive) {
    var options = { capture: capture2, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || // @ts-ignore
    dom === window || // @ts-ignore
    dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    dom instanceof HTMLMediaElement) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegated(event_name, element, handler) {
    (element[event_symbol] ??= {})[event_name] = handler;
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  let last_propagated_event = null;
  function handle_event_propagation(event2) {
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = event2.composedPath?.() || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    last_propagated_event = event2;
    var path_idx = 0;
    var handled_at = last_propagated_event === event2 && event2[event_symbol];
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2[event_symbol] = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
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
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        if (current_target === handler_element) break;
        try {
          var delegated2 = current_target[event_symbol]?.[event_name];
          if (delegated2 != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            delegated2.call(current_target, event2);
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble) break;
        path_idx++;
        current_target = path_idx < path.length ? (
          /** @type {Element} */
          path[path_idx]
        ) : null;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2[event_symbol] = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  const policy = (
    // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
    globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
      /** @param {string} html */
      createHTML: (html) => {
        return html;
      }
    })
  );
  function create_trusted_html(html) {
    return (
      /** @type {string} */
      policy?.createHTML(html) ?? html
    );
  }
  function create_fragment_from_html(html) {
    var elem = create_element("template");
    elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes === null) {
      effect2.nodes = { start, end, a: null, t: null };
    }
  }
  // @__NO_SIDE_EFFECTS__
  function from_html(content, flags2) {
    var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (hydrating) {
        assign_nodes(hydrate_node, null);
        return hydrate_node;
      }
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  function text(value = "") {
    if (!hydrating) {
      var t = create_text(value + "");
      assign_nodes(t, t);
      return t;
    }
    var node = hydrate_node;
    if (node.nodeType !== TEXT_NODE) {
      node.before(node = create_text());
      set_hydrate_node(node);
    } else {
      merge_text_nodes(
        /** @type {Text} */
        node
      );
    }
    assign_nodes(node, node);
    return node;
  }
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
  function append(anchor, dom) {
    if (hydrating) {
      var effect2 = (
        /** @type {Effect & { nodes: EffectNodes }} */
        active_effect
      );
      if ((effect2.f & REACTION_RAN) === 0 || effect2.nodes.end === null) {
        effect2.nodes.end = hydrate_node;
      }
      hydrate_next();
      return;
    }
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  function set_text(text2, value) {
    var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
    if (str !== /** @type {any} */
    (text2[TEXT_CACHE] ??= text2.nodeValue)) {
      text2[TEXT_CACHE] = str;
      text2.nodeValue = `${str}`;
    }
  }
  function mount(component2, options) {
    return _mount(component2, options);
  }
  function hydrate(component2, options) {
    init_operations();
    options.intro = options.intro ?? false;
    const target = options.target;
    const was_hydrating = hydrating;
    const previous_hydrate_node = hydrate_node;
    try {
      var anchor = /* @__PURE__ */ get_first_child(target);
      while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
      anchor.data !== HYDRATION_START)) {
        anchor = /* @__PURE__ */ get_next_sibling(anchor);
      }
      if (!anchor) {
        throw HYDRATION_ERROR;
      }
      set_hydrating(true);
      set_hydrate_node(
        /** @type {Comment} */
        anchor
      );
      const instance = _mount(component2, { ...options, anchor });
      set_hydrating(false);
      return (
        /**  @type {Exports} */
        instance
      );
    } catch (error) {
      if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) {
        throw error;
      }
      if (error !== HYDRATION_ERROR) {
        console.warn("Failed to hydrate: ", error);
      }
      if (options.recover === false) {
        hydration_failed();
      }
      init_operations();
      clear_text_content(target);
      set_hydrating(false);
      return mount(component2, options);
    } finally {
      set_hydrating(was_hydrating);
      set_hydrate_node(previous_hydrate_node);
    }
  }
  const listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
    init_operations();
    var component2 = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      boundary(
        /** @type {TemplateNode} */
        anchor_node,
        {
          pending: () => {
          }
        },
        (anchor_node2) => {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          if (context) ctx.c = context;
          if (events) {
            props.$$events = events;
          }
          if (hydrating) {
            assign_nodes(
              /** @type {TemplateNode} */
              anchor_node2,
              null
            );
          }
          component2 = Component(anchor_node2, props) || {};
          if (hydrating) {
            active_effect.nodes.end = hydrate_node;
            if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
            hydrate_node.data !== HYDRATION_END) {
              hydration_mismatch();
              throw HYDRATION_ERROR;
            }
          }
          pop();
        },
        transformError
      );
      var registered_events = /* @__PURE__ */ new Set();
      var event_handle = (events2) => {
        for (var i = 0; i < events2.length; i++) {
          var event_name = events2[i];
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
            } else {
              counts.set(event_name, count + 1);
            }
          }
        }
      };
      event_handle(array_from(all_registered_events));
      root_event_handles.add(event_handle);
      return () => {
        for (var event_name of registered_events) {
          for (const node of [target, document]) {
            var counts = (
              /** @type {Map<string, number>} */
              listeners.get(node)
            );
            var count = (
              /** @type {number} */
              counts.get(event_name)
            );
            if (--count == 0) {
              node.removeEventListener(event_name, handle_event_propagation);
              counts.delete(event_name);
              if (counts.size === 0) {
                listeners.delete(node);
              }
            } else {
              counts.set(event_name, count);
            }
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          anchor_node.parentNode?.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component2, unmount2);
    return component2;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component2, options) {
    const fn = mounted_components.get(component2);
    if (fn) {
      mounted_components.delete(component2);
      return fn(options);
    }
    return Promise.resolve();
  }
  function asClassComponent(component2) {
    return class extends Svelte4Component {
      /** @param {any} options */
      constructor(options) {
        super({
          component: component2,
          ...options
        });
      }
    };
  }
  class Svelte4Component {
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
      var add_source = (key, value) => {
        var s = /* @__PURE__ */ mutable_source(value, false, false);
        sources.set(key, s);
        return s;
      };
      const props = new Proxy(
        { ...options.props || {}, $$events: {} },
        {
          get(target, prop2) {
            return get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          },
          has(target, prop2) {
            if (prop2 === LEGACY_PROPS) return true;
            get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
            return Reflect.has(target, prop2);
          },
          set(target, prop2, value) {
            set(sources.get(prop2) ?? add_source(prop2, value), value);
            return Reflect.set(target, prop2, value);
          }
        }
      );
      this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
        target: options.target,
        anchor: options.anchor,
        props,
        context: options.context,
        intro: options.intro ?? false,
        recover: options.recover,
        transformError: options.transformError
      });
      if (!options?.props?.$$host || options.sync === false) {
        flushSync();
      }
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
      this.#instance.$set = /** @param {Record<string, any>} next */
      (next2) => {
        Object.assign(props, next2);
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
    $on(event2, callback) {
      this.#events[event2] = this.#events[event2] || [];
      const cb = (...args) => callback.call(this, ...args);
      this.#events[event2].push(cb);
      return () => {
        this.#events[event2] = this.#events[event2].filter(
          /** @param {any} fn */
          (fn) => fn !== cb
        );
      };
    }
    $destroy() {
      this.#instance.$destroy();
    }
  }
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
  }
  class BranchManager {
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
      var key = (
        /** @type {Key} */
        this.#batches.get(batch)
      );
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
          offscreen.fragment.lastChild.remove();
          this.anchor.before(offscreen.fragment);
          onscreen = offscreen.effect;
        }
      }
      for (const [b, k] of this.#batches) {
        this.#batches.delete(b);
        if (b === batch) {
          break;
        }
        const offscreen2 = this.#offscreen.get(k);
        if (offscreen2) {
          destroy_effect(offscreen2.effect);
          this.#offscreen.delete(k);
        }
      }
      for (const [k, effect2] of this.#onscreen) {
        if (k === key || this.#outroing.has(k)) continue;
        const on_destroy = () => {
          const keys = Array.from(this.#batches.values());
          if (keys.includes(k)) {
            var fragment = document.createDocumentFragment();
            move_effect(effect2, fragment);
            fragment.append(create_text());
            this.#offscreen.set(k, { effect: effect2, fragment });
          } else {
            destroy_effect(effect2);
          }
          this.#outroing.delete(k);
          this.#onscreen.delete(k);
        };
        if (this.#transition || !onscreen) {
          this.#outroing.add(k);
          pause_effect(effect2, on_destroy, false);
        } else {
          on_destroy();
        }
      }
    };
    /**
     * @param {Batch} batch
     */
    #discard = (batch) => {
      this.#batches.delete(batch);
      const keys = Array.from(this.#batches.values());
      for (const [k, branch2] of this.#offscreen) {
        if (!keys.includes(k)) {
          destroy_effect(branch2.effect);
          this.#offscreen.delete(k);
        }
      }
    };
    /**
     *
     * @param {any} key
     * @param {null | ((target: TemplateNode) => void)} fn
     */
    ensure(key, fn) {
      var batch = (
        /** @type {Batch} */
        current_batch
      );
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
        } else {
          this.#onscreen.set(
            key,
            branch(() => fn(this.anchor))
          );
        }
      }
      this.#batches.set(batch, key);
      if (defer) {
        for (const [k, effect2] of this.#onscreen) {
          if (k === key) {
            batch.unskip_effect(effect2);
          } else {
            batch.skip_effect(effect2);
          }
        }
        for (const [k, branch2] of this.#offscreen) {
          if (k === key) {
            batch.unskip_effect(branch2.effect);
          } else {
            batch.skip_effect(branch2.effect);
          }
        }
        batch.oncommit(this.#commit);
        batch.ondiscard(this.#discard);
      } else {
        if (hydrating) {
          this.anchor = hydrate_node;
        }
        this.#commit(batch);
      }
    }
  }
  function snippet(node, get_snippet, ...args) {
    var branches = new BranchManager(node);
    block(() => {
      const snippet2 = get_snippet() ?? null;
      branches.ensure(snippet2, snippet2 && ((anchor) => snippet2(anchor, ...args)));
    }, EFFECT_TRANSPARENT);
  }
  function onMount(fn) {
    if (component_context === null) {
      lifecycle_outside_component();
    }
    {
      user_effect(() => {
        const cleanup = untrack(fn);
        if (typeof cleanup === "function") return (
          /** @type {() => void} */
          cleanup
        );
      });
    }
  }
  function if_block(node, fn, elseif = false) {
    var marker;
    if (hydrating) {
      marker = hydrate_node;
      hydrate_next();
    }
    var branches = new BranchManager(node);
    var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
    function update_branch(key, fn2) {
      if (hydrating) {
        var data = read_hydration_instruction(
          /** @type {TemplateNode} */
          marker
        );
        if (key !== parseInt(data.substring(1))) {
          var anchor = skip_nodes();
          set_hydrate_node(anchor);
          branches.anchor = anchor;
          set_hydrating(false);
          branches.ensure(key, fn2);
          set_hydrating(true);
          return;
        }
      }
      branches.ensure(key, fn2);
    }
    block(() => {
      var has_branch = false;
      fn((fn2, key = 0) => {
        has_branch = true;
        update_branch(key, fn2);
      });
      if (!has_branch) {
        update_branch(-1, null);
      }
    }, flags2);
  }
  function index(_, i) {
    return i;
  }
  function pause_effects(state2, to_destroy, controlled_anchor) {
    var transitions = [];
    var length = to_destroy.length;
    var group;
    var remaining = to_destroy.length;
    for (var i = 0; i < length; i++) {
      let effect2 = to_destroy[i];
      pause_effect(
        effect2,
        () => {
          if (group) {
            group.pending.delete(effect2);
            group.done.add(effect2);
            if (group.pending.size === 0) {
              var groups = (
                /** @type {Set<EachOutroGroup>} */
                state2.outrogroups
              );
              destroy_effects(state2, array_from(group.done));
              groups.delete(group);
              if (groups.size === 0) {
                state2.outrogroups = null;
              }
            }
          } else {
            remaining -= 1;
          }
        },
        false
      );
    }
    if (remaining === 0) {
      var fast_path = transitions.length === 0 && controlled_anchor !== null;
      if (fast_path) {
        var anchor = (
          /** @type {Element} */
          controlled_anchor
        );
        var parent_node = (
          /** @type {Element} */
          anchor.parentNode
        );
        clear_text_content(parent_node);
        parent_node.append(anchor);
        state2.items.clear();
      }
      destroy_effects(state2, to_destroy, !fast_path);
    } else {
      group = {
        pending: new Set(to_destroy),
        done: /* @__PURE__ */ new Set()
      };
      (state2.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
    }
  }
  function destroy_effects(state2, to_destroy, remove_dom = true) {
    var preserved_effects;
    if (state2.pending.size > 0) {
      preserved_effects = /* @__PURE__ */ new Set();
      for (const keys of state2.pending.values()) {
        for (const key of keys) {
          preserved_effects.add(
            /** @type {EachItem} */
            state2.items.get(key).e
          );
        }
      }
    }
    for (var i = 0; i < to_destroy.length; i++) {
      var e = to_destroy[i];
      if (preserved_effects?.has(e)) {
        e.f |= EFFECT_OFFSCREEN;
        const fragment = document.createDocumentFragment();
        move_effect(e, fragment);
      } else {
        destroy_effect(to_destroy[i], remove_dom);
      }
    }
  }
  var offscreen_anchor;
  function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
    var anchor = node;
    var items = /* @__PURE__ */ new Map();
    var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
    }
    if (hydrating) {
      hydrate_next();
    }
    var fallback = null;
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return (
        /** @type {V[]} */
        is_array(collection) ? collection : collection == null ? [] : array_from(collection)
      );
    });
    var array;
    var pending = /* @__PURE__ */ new Map();
    var first_run = true;
    function commit(batch) {
      if ((state2.effect.f & DESTROYED) !== 0) {
        return;
      }
      state2.pending.delete(batch);
      state2.fallback = fallback;
      reconcile(state2, array, anchor, flags2, get_key);
      if (fallback !== null) {
        if (array.length === 0) {
          if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
            resume_effect(fallback);
          } else {
            fallback.f ^= EFFECT_OFFSCREEN;
            move(fallback, null, anchor);
          }
        } else {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
    }
    function discard(batch) {
      state2.pending.delete(batch);
    }
    var effect2 = block(() => {
      array = /** @type {V[]} */
      get(each_array);
      var length = array.length;
      let mismatch = false;
      if (hydrating) {
        var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
        if (is_else !== (length === 0)) {
          anchor = skip_nodes();
          set_hydrate_node(anchor);
          set_hydrating(false);
          mismatch = true;
        }
      }
      var keys = /* @__PURE__ */ new Set();
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var defer = should_defer_append();
      for (var index2 = 0; index2 < length; index2 += 1) {
        if (hydrating && hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          anchor = /** @type {Comment} */
          hydrate_node;
          mismatch = true;
          set_hydrating(false);
        }
        var value = array[index2];
        var key = get_key(value, index2);
        var item = first_run ? null : items.get(key);
        if (item) {
          if (item.v) internal_set(item.v, value);
          if (item.i) internal_set(item.i, index2);
          if (defer) {
            batch.unskip_effect(item.e);
          }
        } else {
          item = create_item(
            items,
            first_run ? anchor : offscreen_anchor ??= create_text(),
            value,
            key,
            index2,
            render_fn,
            flags2,
            get_collection
          );
          if (!first_run) {
            item.e.f |= EFFECT_OFFSCREEN;
          }
          items.set(key, item);
        }
        keys.add(key);
      }
      if (length === 0 && fallback_fn && !fallback) {
        if (first_run) {
          fallback = branch(() => fallback_fn(anchor));
        } else {
          fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
          fallback.f |= EFFECT_OFFSCREEN;
        }
      }
      if (length > keys.size) {
        {
          each_key_duplicate();
        }
      }
      if (hydrating && length > 0) {
        set_hydrate_node(skip_nodes());
      }
      if (!first_run) {
        pending.set(batch, keys);
        if (defer) {
          for (const [key2, item2] of items) {
            if (!keys.has(key2)) {
              batch.skip_effect(item2.e);
            }
          }
          batch.oncommit(commit);
          batch.ondiscard(discard);
        } else {
          commit(batch);
        }
      }
      if (mismatch) {
        set_hydrating(true);
      }
      get(each_array);
    });
    var state2 = { effect: effect2, items, pending, outrogroups: null, fallback };
    first_run = false;
    if (hydrating) {
      anchor = hydrate_node;
    }
  }
  function skip_to_branch(effect2) {
    while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
      effect2 = effect2.next;
    }
    return effect2;
  }
  function reconcile(state2, array, anchor, flags2, get_key) {
    var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
    var length = array.length;
    var items = state2.items;
    var current = skip_to_branch(state2.effect.first);
    var seen;
    var prev = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var effect2;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        effect2 = /** @type {EachItem} */
        items.get(key).e;
        if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
          effect2.nodes?.a?.measure();
          (to_animate ??= /* @__PURE__ */ new Set()).add(effect2);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key).e;
      if (state2.outrogroups !== null) {
        for (const group of state2.outrogroups) {
          group.pending.delete(effect2);
          group.done.delete(effect2);
        }
      }
      if ((effect2.f & INERT) !== 0) {
        resume_effect(effect2);
        if (is_animated) {
          effect2.nodes?.a?.unfix();
          (to_animate ??= /* @__PURE__ */ new Set()).delete(effect2);
        }
      }
      if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
        effect2.f ^= EFFECT_OFFSCREEN;
        if (effect2 === current) {
          move(effect2, null, anchor);
        } else {
          var next2 = prev ? prev.next : current;
          if (effect2 === state2.effect.last) {
            state2.effect.last = effect2.prev;
          }
          if (effect2.prev) effect2.prev.next = effect2.next;
          if (effect2.next) effect2.next.prev = effect2.prev;
          link(state2, prev, effect2);
          link(state2, effect2, next2);
          move(effect2, next2, anchor);
          prev = effect2;
          matched = [];
          stashed = [];
          current = skip_to_branch(prev.next);
          continue;
        }
      }
      if (effect2 !== current) {
        if (seen !== void 0 && seen.has(effect2)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(effect2);
            move(effect2, current, anchor);
            link(state2, effect2.prev, effect2.next);
            link(state2, effect2, prev === null ? state2.effect.first : prev.next);
            link(state2, prev, effect2);
            prev = effect2;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current !== effect2) {
          (seen ??= /* @__PURE__ */ new Set()).add(current);
          stashed.push(current);
          current = skip_to_branch(current.next);
        }
        if (current === null) {
          continue;
        }
      }
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        matched.push(effect2);
      }
      prev = effect2;
      current = skip_to_branch(effect2.next);
    }
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        if (group.pending.size === 0) {
          destroy_effects(state2, array_from(group.done));
          state2.outrogroups?.delete(group);
        }
      }
      if (state2.outrogroups.size === 0) {
        state2.outrogroups = null;
      }
    }
    if (current !== null || seen !== void 0) {
      var to_destroy = [];
      if (seen !== void 0) {
        for (effect2 of seen) {
          if ((effect2.f & INERT) === 0) {
            to_destroy.push(effect2);
          }
        }
      }
      while (current !== null) {
        if ((current.f & INERT) === 0 && current !== state2.fallback) {
          to_destroy.push(current);
        }
        current = skip_to_branch(current.next);
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].nodes?.a?.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            to_destroy[i].nodes?.a?.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        if (to_animate === void 0) return;
        for (effect2 of to_animate) {
          effect2.nodes?.a?.apply();
        }
      });
    }
  }
  function create_item(items, anchor, value, key, index2, render_fn, flags2, get_collection) {
    var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
    var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
    return {
      v,
      i,
      e: branch(() => {
        render_fn(anchor, v ?? value, i ?? index2, get_collection);
        return () => {
          items.delete(key);
        };
      })
    };
  }
  function move(effect2, next2, anchor) {
    if (!effect2.nodes) return;
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    var dest = next2 && (next2.f & EFFECT_OFFSCREEN) === 0 ? (
      /** @type {EffectNodes} */
      next2.nodes.start
    ) : anchor;
    while (node !== null) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      if (node === end) {
        return;
      }
      node = next_node;
    }
  }
  function link(state2, prev, next2) {
    if (prev === null) {
      state2.effect.first = next2;
    } else {
      prev.next = next2;
    }
    if (next2 === null) {
      state2.effect.last = prev;
    } else {
      next2.prev = prev;
    }
  }
  function component(node, get_component, render_fn) {
    var hydration_start_node;
    if (hydrating) {
      hydration_start_node = hydrate_node;
      hydrate_next();
    }
    var branches = new BranchManager(node);
    block(() => {
      var component2 = get_component() ?? null;
      if (hydrating) {
        var data = read_hydration_instruction(
          /** @type {TemplateNode} */
          hydration_start_node
        );
        var server_had_component = data === HYDRATION_START;
        var client_has_component = component2 !== null;
        if (server_had_component !== client_has_component) {
          var anchor = skip_nodes();
          set_hydrate_node(anchor);
          branches.anchor = anchor;
          set_hydrating(false);
          branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
          set_hydrating(true);
          return;
        }
      }
      branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
    }, EFFECT_TRANSPARENT);
  }
  const whitespace = [..." 	\n\r\f \v\uFEFF"];
  function to_class(value, hash, directives) {
    var classname = value == null ? "" : "" + value;
    if (directives) {
      for (var key of Object.keys(directives)) {
        if (directives[key]) {
          classname = classname ? classname + " " + key : key;
        } else if (classname.length) {
          var len = key.length;
          var a = 0;
          while ((a = classname.indexOf(key, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function append_styles(styles, important = false) {
    var separator = important ? " !important;" : ";";
    var css = "";
    for (var key of Object.keys(styles)) {
      var value = styles[key];
      if (value != null && value !== "") {
        css += " " + key + ": " + value + separator;
      }
    }
    return css;
  }
  function to_css_name(name) {
    if (name[0] !== "-" || name[1] !== "-") {
      return name.toLowerCase();
    }
    return name;
  }
  function to_style(value, styles) {
    if (styles) {
      var new_style = "";
      var normal_styles;
      var important_styles;
      if (Array.isArray(styles)) {
        normal_styles = styles[0];
        important_styles = styles[1];
      } else {
        normal_styles = styles;
      }
      if (value) {
        value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
        var in_str = false;
        var in_apo = 0;
        var in_comment = false;
        var reserved_names = [];
        if (normal_styles) {
          reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
        }
        if (important_styles) {
          reserved_names.push(...Object.keys(important_styles).map(to_css_name));
        }
        var start_index = 0;
        var name_index = -1;
        const len = value.length;
        for (var i = 0; i < len; i++) {
          var c = value[i];
          if (in_comment) {
            if (c === "/" && value[i - 1] === "*") {
              in_comment = false;
            }
          } else if (in_str) {
            if (in_str === c) {
              in_str = false;
            }
          } else if (c === "/" && value[i + 1] === "*") {
            in_comment = true;
          } else if (c === '"' || c === "'") {
            in_str = c;
          } else if (c === "(") {
            in_apo++;
          } else if (c === ")") {
            in_apo--;
          }
          if (!in_comment && in_str === false && in_apo === 0) {
            if (c === ":" && name_index === -1) {
              name_index = i;
            } else if (c === ";" || i === len - 1) {
              if (name_index !== -1) {
                var name = to_css_name(value.substring(start_index, name_index).trim());
                if (!reserved_names.includes(name)) {
                  if (c !== ";") {
                    i++;
                  }
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
      if (normal_styles) {
        new_style += append_styles(normal_styles);
      }
      if (important_styles) {
        new_style += append_styles(important_styles, true);
      }
      new_style = new_style.trim();
      return new_style === "" ? null : new_style;
    }
    return value == null ? null : String(value);
  }
  function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    var prev = (
      /** @type {any} */
      dom[CLASS_CACHE]
    );
    if (hydrating || prev !== value || prev === void 0) {
      var next_class_name = to_class(value, hash, next_classes);
      if (!hydrating || next_class_name !== dom.getAttribute("class")) {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else if (is_html) {
          dom.className = next_class_name;
        } else {
          dom.setAttribute("class", next_class_name);
        }
      }
      dom[CLASS_CACHE] = value;
    } else if (next_classes && prev_classes !== next_classes) {
      for (var key in next_classes) {
        var is_present = !!next_classes[key];
        if (prev_classes == null || is_present !== !!prev_classes[key]) {
          dom.classList.toggle(key, is_present);
        }
      }
    }
    return next_classes;
  }
  function update_styles(dom, prev = {}, next2, priority) {
    for (var key in next2) {
      var value = next2[key];
      if (prev[key] !== value) {
        if (next2[key] == null) {
          dom.style.removeProperty(key);
        } else {
          dom.style.setProperty(key, value, priority);
        }
      }
    }
  }
  function set_style(dom, value, prev_styles, next_styles) {
    var prev = (
      /** @type {any} */
      dom[STYLE_CACHE]
    );
    if (hydrating || prev !== value) {
      var next_style_attr = to_style(value, next_styles);
      if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
        if (next_style_attr == null) {
          dom.removeAttribute("style");
        } else {
          dom.style.cssText = next_style_attr;
        }
      }
      dom[STYLE_CACHE] = value;
    } else if (next_styles) {
      if (Array.isArray(next_styles)) {
        update_styles(dom, prev_styles?.[0], next_styles[0]);
        update_styles(dom, prev_styles?.[1], next_styles[1], "important");
      } else {
        update_styles(dom, prev_styles, next_styles);
      }
    }
    return next_styles;
  }
  const IS_CUSTOM_ELEMENT = /* @__PURE__ */ Symbol("is custom element");
  const IS_HTML = /* @__PURE__ */ Symbol("is html");
  const LINK_TAG = IS_XHTML ? "link" : "LINK";
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = get_attributes(element);
    if (hydrating) {
      attributes[attribute] = element.getAttribute(attribute);
      if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
        return;
      }
    }
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function get_attributes(element) {
    return (
      /** @type {Record<string | symbol, unknown>} **/
      /** @type {any} */
      element[ATTRIBUTES_CACHE] ??= {
        [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
        [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
      }
    );
  }
  var setters_cache = /* @__PURE__ */ new Map();
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
      for (var key in descriptors) {
        if (descriptors[key].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
        key !== "innerHTML" && key !== "textContent" && key !== "innerText") {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
  }
  function bind_this(element_or_component = {}, update, get_value, get_parts) {
    var component_effect = (
      /** @type {ComponentContext} */
      component_context.r
    );
    var parent = (
      /** @type {Effect} */
      active_effect
    );
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = [];
        untrack(() => {
          if (!is_bound_this(get_value(...parts), element_or_component)) {
            update(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        let p = parent;
        while (p !== component_effect && p.parent !== null && p.parent.f & DESTROYING) {
          p = p.parent;
        }
        const teardown2 = () => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update(null, ...parts);
          }
        };
        const original_teardown = p.teardown;
        p.teardown = () => {
          teardown2();
          original_teardown?.();
        };
      };
    });
    return element_or_component;
  }
  const rest_props_handler = {
    get(target, key) {
      if (target.exclude.has(key)) return;
      return target.props[key];
    },
    set(target, key) {
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      if (target.exclude.has(key)) return;
      if (key in target.props) {
        return {
          enumerable: true,
          configurable: true,
          value: target.props[key]
        };
      }
    },
    has(target, key) {
      if (target.exclude.has(key)) return false;
      return key in target.props;
    },
    ownKeys(target) {
      return Reflect.ownKeys(target.props).filter((key) => !target.exclude.has(key));
    }
  };
  // @__NO_SIDE_EFFECTS__
  function rest_props(props, exclude, name) {
    return new Proxy(
      { props, exclude },
      rest_props_handler
    );
  }
  const spread_props_handler = {
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
          if (descriptor && !descriptor.configurable) {
            descriptor.configurable = true;
          }
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
      const keys = [];
      for (let p of target.props) {
        if (is_function(p)) p = p();
        if (!p) continue;
        for (const key in p) {
          if (!keys.includes(key)) keys.push(key);
        }
        for (const key of Object.getOwnPropertySymbols(p)) {
          if (!keys.includes(key)) keys.push(key);
        }
      }
      return keys;
    }
  };
  function spread_props(...props) {
    return new Proxy({ props }, spread_props_handler);
  }
  function prop(props, key, flags2, fallback) {
    var runes = true;
    var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
    var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
    var fallback_value = (
      /** @type {V} */
      fallback
    );
    var fallback_dirty = true;
    var fallback_signal = (
      /** @type {Derived<V> | undefined} */
      void 0
    );
    var get_fallback = () => {
      if (lazy && runes) {
        fallback_signal ??= /* @__PURE__ */ derived(
          /** @type {() => V} */
          fallback
        );
        return get(fallback_signal);
      }
      if (fallback_dirty) {
        fallback_dirty = false;
        fallback_value = lazy ? untrack(
          /** @type {() => V} */
          fallback
        ) : (
          /** @type {V} */
          fallback
        );
      }
      return fallback_value;
    };
    let setter;
    if (bindable) {
      var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
      setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
    }
    var initial_value;
    var is_store_sub = false;
    if (bindable) {
      [initial_value, is_store_sub] = capture_store_binding(() => (
        /** @type {V} */
        props[key]
      ));
    } else {
      initial_value = /** @type {V} */
      props[key];
    }
    if (initial_value === void 0 && fallback !== void 0) {
      initial_value = get_fallback();
      if (setter) {
        props_invalid_value();
        setter(initial_value);
      }
    }
    var getter;
    {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        return value;
      };
    }
    if ((flags2 & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    if (setter) {
      var legacy_parent = props.$$legacy;
      return (
        /** @type {() => V} */
        (function(value, mutation) {
          if (arguments.length > 0) {
            if (!mutation || legacy_parent || is_store_sub) {
              setter(mutation ? getter() : value);
            }
            return value;
          }
          return getter();
        })
      );
    }
    var overridden = false;
    var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
      overridden = false;
      return getter();
    });
    if (bindable) get(d);
    var parent_effect = (
      /** @type {Effect} */
      active_effect
    );
    return (
      /** @type {() => V} */
      (function(value, mutation) {
        if (arguments.length > 0) {
          const new_value = mutation ? get(d) : bindable ? proxy(value) : value;
          set(d, new_value);
          overridden = true;
          if (fallback_value !== void 0) {
            fallback_value = new_value;
          }
          return value;
        }
        if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
          return d.v;
        }
        return get(d);
      })
    );
  }
  class SvelteMap extends Map {
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
        for (var [key, v] of value) {
          super.set(key, v);
        }
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
          return void 0;
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
        var needs_version_increase = v_reactions === null || !s.reactions?.every(
          (r) => (
            /** @type {NonNullable<typeof v_reactions>} */
            v_reactions.has(r)
          )
        );
        if (needs_version_increase) {
          increment(version);
        }
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
      if (super.size === 0) {
        return;
      }
      super.clear();
      var sources = this.#sources;
      set(this.#size, 0);
      for (var s of sources.values()) {
        set(s, -1);
      }
      increment(this.#version);
      sources.clear();
    }
    #read_all() {
      get(this.#version);
      var sources = this.#sources;
      if (this.#size.v !== sources.size) {
        for (var key of super.keys()) {
          if (!sources.has(key)) {
            var s = this.#source(0);
            sources.set(key, s);
          }
        }
      }
      for ([, s] of this.#sources) {
        get(s);
      }
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
  }
  const constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");
  function constructFrom(date, value) {
    if (typeof date === "function") return date(value);
    if (date && typeof date === "object" && constructFromSymbol in date)
      return date[constructFromSymbol](value);
    if (date instanceof Date) return new date.constructor(value);
    return new Date(value);
  }
  function toDate$1(argument, context) {
    return constructFrom(context || argument, argument);
  }
  function addDays(date, amount, options) {
    const _date = toDate$1(date, options?.in);
    if (isNaN(amount)) return constructFrom(date, NaN);
    if (!amount) return _date;
    _date.setDate(_date.getDate() + amount);
    return _date;
  }
  let defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }
  function startOfWeek$1(date, options) {
    const defaultOptions2 = getDefaultOptions();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
    const _date = toDate$1(date, options?.in);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function startOfDay(date, options) {
    const _date = toDate$1(date, options?.in);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  function getDate(date, options) {
    return toDate$1(date, options?.in).getDate();
  }
  function getHours(date, options) {
    return toDate$1(date, options?.in).getHours();
  }
  function getMinutes(date, options) {
    return toDate$1(date, options?.in).getMinutes();
  }
  function getSeconds(date) {
    return toDate$1(date).getSeconds();
  }
  const DAY_MS = 864e5;
  const HOUR_MS = 36e5;
  Array.from({ length: 24 }, (_, i) => i);
  function sod(ms) {
    return startOfDay(ms).getTime();
  }
  function startOfWeek(ms, mondayStart = true) {
    return startOfWeek$1(ms, { weekStartsOn: mondayStart ? 1 : 0 }).getTime();
  }
  function addDaysMs(ms, n) {
    return addDays(ms, n).getTime();
  }
  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  function fractionalHour(ms) {
    const d = new Date(ms);
    return getHours(d) + getMinutes(d) / 60 + getSeconds(d) / 3600;
  }
  function fmtHM(ms) {
    const d = new Date(ms);
    return pad(getHours(d)) + ":" + pad(getMinutes(d));
  }
  function fmtS(ms) {
    return ":" + pad(getSeconds(new Date(ms)));
  }
  function dayNum(ms) {
    return getDate(new Date(ms));
  }
  function isMultiDay(ev) {
    return sod(ev.start.getTime()) !== sod(ev.end.getTime() - 1);
  }
  function isAllDay(ev) {
    if (ev.allDay) return true;
    const duration2 = ev.end.getTime() - ev.start.getTime();
    if (duration2 < DAY_MS) return false;
    const s = ev.start;
    return s.getHours() === 0 && s.getMinutes() === 0 && s.getSeconds() === 0;
  }
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
  function createEventStore(adapter) {
    let eventMap = new SvelteMap();
    let loading = /* @__PURE__ */ state(false);
    let error = /* @__PURE__ */ state(null);
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
        set(loading, true);
        set(error, null);
        try {
          const fetched = await adapter.fetchEvents(range);
          for (const ev of fetched) {
            upsertEvent(ev);
          }
        } catch (e) {
          set(error, e instanceof Error ? e.message : String(e), true);
        } finally {
          set(loading, false);
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
        if (!adapter.createEvent) throw new Error("Adapter is read-only: createEvent not implemented");
        set(loading, true);
        set(error, null);
        try {
          const created = await adapter.createEvent(eventData);
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
        if (!adapter.updateEvent) throw new Error("Adapter is read-only: updateEvent not implemented");
        set(loading, true);
        set(error, null);
        try {
          const updated = await adapter.updateEvent(id, patch);
          upsertEvent(updated);
        } catch (e) {
          set(error, e instanceof Error ? e.message : String(e), true);
          throw e;
        } finally {
          set(loading, false);
        }
      },
      async remove(id) {
        if (!adapter.deleteEvent) throw new Error("Adapter is read-only: deleteEvent not implemented");
        set(loading, true);
        set(error, null);
        try {
          await adapter.deleteEvent(id);
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
        if (existing) {
          upsertEvent({ ...existing, start: newStart, end: newEnd });
        }
        try {
          await this.update(id, { start: newStart, end: newEnd });
        } catch (e) {
          if (existing) upsertEvent(existing);
          throw e;
        }
      }
    };
  }
  function inferMode(view) {
    if (view.startsWith("day")) return "day";
    if (view.startsWith("month")) return "month";
    return "week";
  }
  function computeRange(focus, mode, mondayStart, dayCount = 7) {
    if (mode === "day") {
      const start2 = new Date(focus);
      start2.setHours(0, 0, 0, 0);
      const end = new Date(start2.getTime() + DAY_MS);
      return { start: start2, end };
    }
    if (mode === "month") {
      const first = new Date(focus.getFullYear(), focus.getMonth(), 1);
      const last = new Date(focus.getFullYear(), focus.getMonth() + 1, 0);
      const gridStart = startOfWeek(first.getTime(), mondayStart);
      const gridEnd = addDaysMs(startOfWeek(last.getTime(), mondayStart), 7);
      return { start: new Date(gridStart), end: new Date(gridEnd) };
    }
    if (dayCount === 7) {
      const ws = startOfWeek(focus.getTime(), mondayStart);
      return { start: new Date(ws), end: new Date(addDaysMs(ws, 7)) };
    }
    const start = new Date(focus);
    start.setHours(0, 0, 0, 0);
    return { start, end: new Date(start.getTime() + dayCount * DAY_MS) };
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
        const next2 = new Set(get(selectedIds));
        if (next2.has(id)) {
          next2.delete(id);
        } else {
          next2.add(id);
        }
        set(selectedIds, next2, true);
        set(selectedId, next2.size === 1 ? [...next2][0] : null, true);
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
  function createDragState() {
    let mode = /* @__PURE__ */ state("none");
    let payload = /* @__PURE__ */ state(null);
    const active = /* @__PURE__ */ user_derived(() => get(mode) !== "none");
    function reset2() {
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
        set(payload, { eventId: null, start, end, dayIndex }, true);
      },
      beginMove(eventId, start, end) {
        set(mode, "move");
        set(payload, { eventId, start, end, dayIndex: 0 }, true);
      },
      beginResize(eventId, edge, start, end) {
        set(mode, edge === "start" ? "resize-start" : "resize-end", true);
        set(payload, { eventId, start, end, dayIndex: 0 }, true);
      },
      updatePointer(start, end, dayIndex) {
        if (!get(payload)) return;
        set(
          payload,
          {
            ...get(payload),
            start,
            end,
            ...dayIndex !== void 0 ? { dayIndex } : {}
          },
          true
        );
      },
      commit() {
        const result = get(payload);
        reset2();
        return result;
      },
      cancel() {
        reset2();
      }
    };
  }
  const defaultLabels = {
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
  let _labels = { ...defaultLabels };
  function getLabels() {
    return _labels;
  }
  let defaultLocale = "en-US";
  const hourCycleCache = /* @__PURE__ */ new Map();
  function is24HourLocale(locale) {
    const loc = locale ?? defaultLocale;
    if (hourCycleCache.has(loc)) return hourCycleCache.get(loc);
    const sample = new Intl.DateTimeFormat(loc, { hour: "numeric" }).resolvedOptions();
    const is24 = sample.hourCycle === "h23" || sample.hourCycle === "h24";
    hourCycleCache.set(loc, is24);
    return is24;
  }
  function fmtH(h, locale) {
    if (is24HourLocale(locale)) {
      return String(h);
    }
    if (h === 0) return "12a";
    if (h === 12) return "12p";
    return h < 12 ? h + "a" : h - 12 + "p";
  }
  function weekdayShort(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { weekday: "short" });
  }
  function weekdayLong(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { weekday: "long" });
  }
  function monthLong(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { month: "long" });
  }
  function fmtWeekRange(weekStartMs, locale, weekEndMs) {
    const loc = locale ?? defaultLocale;
    const s = new Date(weekStartMs);
    const e = new Date(weekEndMs ?? weekStartMs + 6 * DAY_MS);
    const sm = s.toLocaleDateString(loc, { month: "short" });
    const em = e.toLocaleDateString(loc, { month: "short" });
    const sy = s.getFullYear();
    const ey = e.getFullYear();
    if (sy !== ey) {
      return `${sm} ${s.getDate()}, ${sy} – ${em} ${e.getDate()}, ${ey}`;
    }
    if (sm !== em) {
      return `${sm} ${s.getDate()} – ${em} ${e.getDate()}, ${ey}`;
    }
    return `${sm} ${s.getDate()} – ${e.getDate()}, ${ey}`;
  }
  function fmtTime$1(d, locale) {
    if (is24HourLocale(locale)) {
      const h2 = d.getHours();
      const m2 = d.getMinutes();
      return `${h2}:${String(m2).padStart(2, "0")}`;
    }
    const h = d.getHours();
    const m = d.getMinutes();
    const suffix = h >= 12 ? "p" : "a";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${h12}:${String(m).padStart(2, "0")}${suffix}`;
  }
  function fmtDuration(start, end) {
    const mins = Math.round((end.getTime() - start.getTime()) / 6e4);
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  const auto = ``;
  const neutral = `
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
	--dt-sans: inherit;
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`;
  const midnight = `
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
	--dt-sans: inherit;
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`;
  const presets = { auto, neutral, midnight };
  function parseColor(raw) {
    if (!raw || raw === "transparent" || raw === "rgba(0, 0, 0, 0)") return null;
    const rgba2 = raw.match(
      /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/
    );
    if (rgba2) return [+rgba2[1], +rgba2[2], +rgba2[3]];
    if (raw.startsWith("#")) {
      const h = raw.replace("#", "");
      const n = h.length === 3 ? parseInt(h[0] + h[0] + h[1] + h[1] + h[2] + h[2], 16) : parseInt(h, 16);
      return [n >> 16 & 255, n >> 8 & 255, n & 255];
    }
    return null;
  }
  function luminance([r, g, b]) {
    const lin = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  }
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return [h, s, l];
  }
  function hslToRgb(h, s, l) {
    h = (h % 1 + 1) % 1;
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    if (s === 0) {
      const v = Math.round(l * 255);
      return [v, v, v];
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return [
      Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      Math.round(hue2rgb(p, q, h) * 255),
      Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
    ];
  }
  function rgbStr(r, g, b) {
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  }
  function rgba(r, g, b, a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  function mix(c1, c2, t) {
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * t),
      Math.round(c1[1] + (c2[1] - c1[1]) * t),
      Math.round(c1[2] + (c2[2] - c1[2]) * t)
    ];
  }
  function parentAcrossShadow(node) {
    if (node.parentElement) return node.parentElement;
    const root2 = node.getRootNode();
    return typeof ShadowRoot !== "undefined" && root2 instanceof ShadowRoot && root2.host instanceof HTMLElement ? root2.host : null;
  }
  const TEXT_VAR_CANDIDATES = [
    // Generic
    "--text",
    "--text-color",
    "--color-text",
    "--foreground",
    // Shadcn/ui
    "--color-foreground",
    // Bootstrap
    "--bs-body-color",
    // Chakra
    "--chakra-colors-text",
    "--chakra-colors-gray-800",
    // Material
    "--md-sys-color-on-background",
    "--mdc-theme-on-surface",
    // DaisyUI
    "--bc",
    // DaisyUI base-content
    // Radix
    "--gray-12",
    // Open Props
    "--text-1"
  ];
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
    } catch {
    }
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
      } catch {
      }
      node = parentAcrossShadow(node);
    }
    const bgLum = luminance(bg);
    for (const c of candidates) {
      const cLum = luminance(c);
      const ratio = (Math.max(bgLum, cLum) + 0.05) / (Math.min(bgLum, cLum) + 0.05);
      if (ratio >= 3) return c;
    }
    return null;
  }
  const ACCENT_VAR_CANDIDATES = [
    // Generic
    "--accent",
    "--accent-color",
    "--primary",
    "--primary-color",
    "--brand",
    "--brand-color",
    "--theme-color",
    "--color-primary",
    "--color-accent",
    // Tailwind / DaisyUI
    "--p",
    // DaisyUI primary
    "--color-primary",
    // Shadcn/ui
    "--primary",
    // MUI / Material
    "--md-sys-color-primary",
    "--mdc-theme-primary",
    // Bootstrap
    "--bs-primary",
    "--bs-primary-rgb",
    // Chakra
    "--chakra-colors-brand-500",
    "--chakra-colors-primary",
    // Open Props
    "--blue-6",
    // Radix
    "--accent-9",
    // Generic numbered
    "--color-primary-500",
    "--primary-500"
  ];
  function probeAccent(root2) {
    let cs;
    try {
      cs = getComputedStyle(root2);
    } catch {
      return null;
    }
    for (const name of ACCENT_VAR_CANDIDATES) {
      const val = cs.getPropertyValue(name).trim();
      if (val) {
        const rgb = parseColor(val);
        if (rgb) {
          const [, s] = rgbToHsl(...rgb);
          if (s > 0.15) return rgb;
        }
      }
    }
    const link2 = root2.querySelector("a[href]");
    if (link2) {
      const lc = parseColor(getComputedStyle(link2).color);
      if (lc) {
        const [, s] = rgbToHsl(...lc);
        if (s > 0.2) return lc;
      }
    }
    const accent = cs.getPropertyValue("accent-color").trim();
    if (accent && accent !== "auto") {
      const rgb = parseColor(accent);
      if (rgb) return rgb;
    }
    const btn = root2.querySelector('button:not([class*="cal-"])');
    if (btn) {
      const bg = parseColor(getComputedStyle(btn).backgroundColor);
      if (bg) {
        const [, s] = rgbToHsl(...bg);
        if (s > 0.25) return bg;
      }
    }
    return null;
  }
  const BG_VAR_CANDIDATES = [
    "--bg",
    "--background",
    "--color-bg",
    "--color-background",
    "--body-bg",
    "--bs-body-bg",
    // Bootstrap
    "--chakra-colors-bg",
    // Chakra
    "--md-sys-color-background",
    // Material
    "--b1",
    // DaisyUI base
    "--background",
    // Shadcn/ui
    "--color-background"
    // Radix / generic
  ];
  function probeBackground(el) {
    const result = (rgb) => ({ bg: rgb, isDark: luminance(rgb) < 0.4 });
    try {
      const rootCs = getComputedStyle(document.documentElement);
      for (const name of BG_VAR_CANDIDATES) {
        const val = rootCs.getPropertyValue(name).trim();
        if (val) {
          const rgb = parseColor(val);
          if (rgb) return result(rgb);
        }
      }
    } catch {
    }
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
      } catch {
      }
      node = parentAcrossShadow(node);
    }
    if (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return { bg: [18, 18, 18], isDark: true };
    }
    return { bg: [255, 255, 255], isDark: false };
  }
  function probeHostTheme(el, options = {}) {
    const host = parentAcrossShadow(el) ?? el;
    const htmlRoot = (host.closest("body") ?? host) instanceof HTMLElement ? host.closest("body") ?? host : document.body;
    const { bg, isDark: autoDark } = probeBackground(host);
    const isDark = options.mode === "auto" || !options.mode ? autoDark : options.mode === "dark";
    let accent;
    if (options.accent) {
      accent = parseColor(options.accent) ?? [37, 99, 235];
    } else {
      accent = probeAccent(htmlRoot) ?? (isDark ? [239, 68, 68] : [37, 99, 235]);
    }
    const [aH, aS, aL] = rgbToHsl(...accent);
    const fonts = options.font ? { sans: options.font, mono: "ui-monospace, 'SFMono-Regular', monospace" } : { sans: "inherit", mono: "ui-monospace, 'SFMono-Regular', monospace" };
    const probedText = probeTextColor(host, bg);
    const textBase = probedText ?? (isDark ? [226, 232, 240] : [30, 30, 46]);
    const calBg = isDark ? mix(bg, [255, 255, 255], 0.02) : mix(bg, [0, 0, 0], 5e-3);
    const stageBg = bg;
    const surface = isDark ? mix(calBg, [255, 255, 255], 0.04) : mix(calBg, [0, 0, 0], 0.02);
    const borderAlpha = isDark ? 0.07 : 0.08;
    const borderDayAlpha = isDark ? 0.14 : 0.14;
    const borderRgb = isDark ? [148, 163, 184] : [0, 0, 0];
    const accentDim = isDark ? 0.15 : 0.12;
    const glow = isDark ? 0.3 : 0.25;
    const todayBg = isDark ? 0.07 : 0.07;
    const accentL = isDark ? Math.max(aL, 0.45) : Math.min(aL, 0.48);
    const accentAdj = hslToRgb(aH, Math.max(aS, 0.5), accentL);
    const accentLum = luminance(accentAdj);
    const btnText = accentLum < 0.4 ? "#ffffff" : "#1a1a2e";
    const scrollAlpha = isDark ? 0.12 : 0.1;
    const successRgb = isDark ? [74, 222, 128] : [22, 163, 74];
    const vars = [
      `--dt-stage-bg: ${rgbStr(...stageBg)}`,
      `--dt-bg: ${rgbStr(...calBg)}`,
      `--dt-surface: ${rgbStr(...surface)}`,
      `--dt-border: ${rgba(...borderRgb, borderAlpha)}`,
      `--dt-border-day: ${rgba(...borderRgb, borderDayAlpha)}`,
      `--dt-text: ${rgba(...textBase, isDark ? 0.87 : 0.87)}`,
      `--dt-text-2: ${rgba(...textBase, isDark ? 0.55 : 0.54)}`,
      `--dt-text-3: ${rgba(...textBase, isDark ? 0.38 : 0.38)}`,
      `--dt-accent: ${rgbStr(...accentAdj)}`,
      `--dt-accent-dim: ${rgba(...accentAdj, accentDim)}`,
      `--dt-glow: ${rgba(...accentAdj, glow)}`,
      `--dt-today-bg: ${rgba(...accentAdj, todayBg)}`,
      `--dt-btn-text: ${btnText}`,
      `--dt-scrollbar: ${rgba(...borderRgb, scrollAlpha)}`,
      `--dt-success: ${rgba(...successRgb, 0.7)}`,
      `--dt-weekend-bg: ${rgba(...borderRgb, isDark ? 0.03 : 0.02)}`,
      `--dt-hover: ${rgba(...borderRgb, isDark ? 0.06 : 0.04)}`,
      `--dt-sans: ${fonts.sans}`,
      `--dt-mono: ${fonts.mono}`
    ];
    return vars.map((v) => `	${v}`).join(";\n") + ";";
  }
  function observeHostTheme(el, callback, options = {}) {
    let last = "";
    const update = () => {
      const next2 = probeHostTheme(el, options);
      if (next2 !== last) {
        last = next2;
        callback(next2);
      }
    };
    const hasMQL = typeof window.matchMedia === "function";
    const mql = hasMQL ? window.matchMedia("(prefers-color-scheme: dark)") : null;
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
      attributeFilter: ["class", "style", "data-theme", "data-mode", "color-scheme"]
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme", "data-mode", "color-scheme"]
    });
    update();
    return () => {
      cancelAnimationFrame(rafId);
      mql?.removeEventListener("change", onScheme);
      observer.disconnect();
    };
  }
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
  function EventContent($$anchor, $$props) {
    push($$props, true);
    const ctx = useCalendarContext();
    const eventSnippet = /* @__PURE__ */ user_derived(() => ctx.eventSnippet);
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        var fragment_1 = comment();
        var node_1 = first_child(fragment_1);
        snippet(node_1, () => get(eventSnippet), () => $$props.event);
        append($$anchor2, fragment_1);
      };
      var alternate = ($$anchor2) => {
        var fragment_2 = comment();
        var node_2 = first_child(fragment_2);
        snippet(node_2, () => $$props.children);
        append($$anchor2, fragment_2);
      };
      if_block(node, ($$render) => {
        if (get(eventSnippet)) $$render(consequent);
        else $$render(alternate, -1);
      });
    }
    append($$anchor, fragment);
    pop();
  }
  function tzTokenizeDate(date, timeZone) {
    const dtf = getDateTimeFormat(timeZone);
    return "formatToParts" in dtf ? partsOffset(dtf, date) : hackyOffset(dtf, date);
  }
  const typeToPos = {
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
        if (pos !== void 0) {
          filled[pos] = parseInt(formatted[i].value, 10);
        }
      }
      return filled;
    } catch (error) {
      if (error instanceof RangeError) {
        return [NaN];
      }
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
  const dtfCache = {};
  const testDateFormatted = new Intl.DateTimeFormat("en-US", {
    hourCycle: "h23",
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z"));
  const hourCycleSupported = testDateFormatted === "06/25/2014, 00:00:00" || testDateFormatted === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
  function getDateTimeFormat(timeZone) {
    if (!dtfCache[timeZone]) {
      dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat("en-US", {
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
    }
    return dtfCache[timeZone];
  }
  function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
    const utcDate = /* @__PURE__ */ new Date(0);
    utcDate.setUTCFullYear(fullYear, month, day);
    utcDate.setUTCHours(hour, minute, second, millisecond);
    return utcDate;
  }
  const MILLISECONDS_IN_HOUR$1 = 36e5;
  const MILLISECONDS_IN_MINUTE$1 = 6e4;
  const patterns$1 = {
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-]\d{2})$/,
    timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
  };
  function tzParseTimezone(timezoneString, date, isUtcDate) {
    if (!timezoneString) {
      return 0;
    }
    let token = patterns$1.timezoneZ.exec(timezoneString);
    if (token) {
      return 0;
    }
    let hours;
    let absoluteOffset;
    token = patterns$1.timezoneHH.exec(timezoneString);
    if (token) {
      hours = parseInt(token[1], 10);
      if (!validateTimezone(hours)) {
        return NaN;
      }
      return -(hours * MILLISECONDS_IN_HOUR$1);
    }
    token = patterns$1.timezoneHHMM.exec(timezoneString);
    if (token) {
      hours = parseInt(token[2], 10);
      const minutes = parseInt(token[3], 10);
      if (!validateTimezone(hours, minutes)) {
        return NaN;
      }
      absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR$1 + minutes * MILLISECONDS_IN_MINUTE$1;
      return token[1] === "+" ? -absoluteOffset : absoluteOffset;
    }
    if (isValidTimezoneIANAString(timezoneString)) {
      date = new Date(date || Date.now());
      const utcDate = isUtcDate ? date : toUtcDate(date);
      const offset = calcOffset(utcDate, timezoneString);
      const fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString);
      return -fixedOffset;
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
    const localTS = date.getTime();
    let utcGuess = localTS - offset;
    const o2 = calcOffset(new Date(utcGuess), timezoneString);
    if (offset === o2) {
      return offset;
    }
    utcGuess -= o2 - offset;
    const o3 = calcOffset(new Date(utcGuess), timezoneString);
    if (o2 === o3) {
      return o2;
    }
    return Math.max(o2, o3);
  }
  function validateTimezone(hours, minutes) {
    return -23 <= hours && hours <= 23 && (minutes == null || 0 <= minutes && minutes <= 59);
  }
  const validIANATimezoneCache = {};
  function isValidTimezoneIANAString(timeZoneString) {
    if (validIANATimezoneCache[timeZoneString])
      return true;
    try {
      new Intl.DateTimeFormat(void 0, { timeZone: timeZoneString });
      validIANATimezoneCache[timeZoneString] = true;
      return true;
    } catch (error) {
      return false;
    }
  }
  function getTimezoneOffsetInMilliseconds(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return +date - +utcDate;
  }
  const tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
  const MILLISECONDS_IN_HOUR = 36e5;
  const MILLISECONDS_IN_MINUTE = 6e4;
  const DEFAULT_ADDITIONAL_DIGITS = 2;
  const patterns = {
    dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
    datePattern: /^([0-9W+-]+)(.*)/,
    // year tokens
    YY: /^(\d{2})$/,
    YYY: [
      /^([+-]\d{2})$/,
      // 0 additional digits
      /^([+-]\d{3})$/,
      // 1 additional digit
      /^([+-]\d{4})$/
      // 2 additional digits
    ],
    YYYY: /^(\d{4})/,
    YYYYY: [
      /^([+-]\d{4})/,
      // 0 additional digits
      /^([+-]\d{5})/,
      // 1 additional digit
      /^([+-]\d{6})/
      // 2 additional digits
    ],
    // date tokens
    MM: /^-(\d{2})$/,
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,
    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
    // time zone tokens (to identify the presence of a tz)
    timeZone: tzPattern
  };
  function toDate(argument, options = {}) {
    if (arguments.length < 1) {
      throw new TypeError("1 argument required, but only " + arguments.length + " present");
    }
    if (argument === null) {
      return /* @__PURE__ */ new Date(NaN);
    }
    const additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    }
    if (argument instanceof Date || typeof argument === "object" && Object.prototype.toString.call(argument) === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || Object.prototype.toString.call(argument) === "[object Number]") {
      return new Date(argument);
    } else if (!(Object.prototype.toString.call(argument) === "[object String]")) {
      return /* @__PURE__ */ new Date(NaN);
    }
    const dateStrings = splitDateString(argument);
    const { year, restDateString } = parseYear(dateStrings.date, additionalDigits);
    const date = parseDate(restDateString, year);
    if (date === null || isNaN(date.getTime())) {
      return /* @__PURE__ */ new Date(NaN);
    }
    if (date) {
      const timestamp = date.getTime();
      let time = 0;
      let offset;
      if (dateStrings.time) {
        time = parseTime(dateStrings.time);
        if (time === null || isNaN(time)) {
          return /* @__PURE__ */ new Date(NaN);
        }
      }
      if (dateStrings.timeZone || options.timeZone) {
        offset = tzParseTimezone(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));
        if (isNaN(offset)) {
          return /* @__PURE__ */ new Date(NaN);
        }
      } else {
        offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time));
        offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time + offset));
      }
      return new Date(timestamp + time + offset);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
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
      } else {
        dateStrings.time = timeString;
      }
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
    return {
      year: null
    };
  }
  function parseDate(dateString, year) {
    if (year === null) {
      return null;
    }
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
      if (!validateDate(year, month)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      date.setUTCFullYear(year, month);
      return date;
    }
    token = patterns.DDD.exec(dateString);
    if (token) {
      date = /* @__PURE__ */ new Date(0);
      const dayOfYear = parseInt(token[1], 10);
      if (!validateDayOfYearDate(year, dayOfYear)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      date.setUTCFullYear(year, 0, dayOfYear);
      return date;
    }
    token = patterns.MMDD.exec(dateString);
    if (token) {
      date = /* @__PURE__ */ new Date(0);
      month = parseInt(token[1], 10) - 1;
      const day = parseInt(token[2], 10);
      if (!validateDate(year, month, day)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      date.setUTCFullYear(year, month, day);
      return date;
    }
    token = patterns.Www.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      if (!validateWeekDate(week)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      return dayOfISOWeekYear(year, week);
    }
    token = patterns.WwwD.exec(dateString);
    if (token) {
      week = parseInt(token[1], 10) - 1;
      const dayOfWeek = parseInt(token[2], 10) - 1;
      if (!validateWeekDate(week, dayOfWeek)) {
        return /* @__PURE__ */ new Date(NaN);
      }
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
      if (!validateTime(hours)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR;
    }
    token = patterns.HHMM.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseFloat(token[2].replace(",", "."));
      if (!validateTime(hours, minutes)) {
        return NaN;
      }
      return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
    }
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
      hours = parseInt(token[1], 10);
      minutes = parseInt(token[2], 10);
      const seconds = parseFloat(token[3].replace(",", "."));
      if (!validateTime(hours, minutes, seconds)) {
        return NaN;
      }
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
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  function validateDate(year, month, date) {
    if (month < 0 || month > 11) {
      return false;
    }
    if (date != null) {
      if (date < 1) {
        return false;
      }
      const isLeapYear = isLeapYearIndex(year);
      if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
        return false;
      }
      if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
        return false;
      }
    }
    return true;
  }
  function validateDayOfYearDate(year, dayOfYear) {
    if (dayOfYear < 1) {
      return false;
    }
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && dayOfYear > 366) {
      return false;
    }
    if (!isLeapYear && dayOfYear > 365) {
      return false;
    }
    return true;
  }
  function validateWeekDate(week, day) {
    if (week < 0 || week > 52) {
      return false;
    }
    if (day != null && (day < 0 || day > 6)) {
      return false;
    }
    return true;
  }
  function validateTime(hours, minutes, seconds) {
    if (hours < 0 || hours >= 25) {
      return false;
    }
    if (minutes != null && (minutes < 0 || minutes >= 60)) {
      return false;
    }
    if (seconds != null && (seconds < 0 || seconds >= 60)) {
      return false;
    }
    return true;
  }
  function toZonedTime$1(date, timeZone, options) {
    date = toDate(date, options);
    const offsetMilliseconds = tzParseTimezone(timeZone, date, true);
    const d = new Date(date.getTime() - offsetMilliseconds);
    const resultDate = /* @__PURE__ */ new Date(0);
    resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    return resultDate;
  }
  function fromZonedTime$1(date, timeZone, options) {
    if (typeof date === "string" && !date.match(tzPattern)) {
      return toDate(date, { ...options, timeZone });
    }
    date = toDate(date, options);
    const utc = newDateUTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()).getTime();
    const offsetMilliseconds = tzParseTimezone(timeZone, new Date(utc));
    return new Date(utc + offsetMilliseconds);
  }
  function toZonedTime(date, timezone) {
    return toZonedTime$1(date, timezone);
  }
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
    const wrapped = {
      async fetchEvents(range) {
        const events = await adapter.fetchEvents({
          start: fromZonedTime(range.start, timezone),
          end: fromZonedTime(range.end, timezone)
        });
        return events.map(zoneEvent);
      }
    };
    if (adapter.createEvent) {
      wrapped.createEvent = async (event2) => zoneEvent(await adapter.createEvent(unzonePartial(event2)));
    }
    if (adapter.updateEvent) {
      wrapped.updateEvent = async (id, patch) => zoneEvent(await adapter.updateEvent(id, unzonePartial(patch)));
    }
    if (adapter.deleteEvent) {
      wrapped.deleteEvent = (id) => adapter.deleteEvent(id);
    }
    return wrapped;
  }
  function createClock(timezone) {
    const now = () => timezone ? toZonedTime(Date.now(), timezone).getTime() : Date.now();
    let tick2 = /* @__PURE__ */ state(proxy(now()));
    let today = /* @__PURE__ */ state(proxy(sod(get(tick2))));
    let intervalId = null;
    function start() {
      intervalId = setInterval(
        () => {
          set(tick2, now(), true);
          const sd = sod(get(tick2));
          if (sd !== get(today)) set(today, sd, true);
        },
        1e3
      );
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
    } catch {
    }
    return {
      get tick() {
        return get(tick2);
      },
      get today() {
        return get(today);
      },
      get hm() {
        return fmtHM(get(tick2));
      },
      get s() {
        return fmtS(get(tick2));
      },
      get fractionalHour() {
        return fractionalHour(get(tick2));
      },
      destroy
    };
  }
  const DEFAULTS = {
    titleFont: "500 12px system-ui, sans-serif",
    secondaryFont: "400 10px system-ui, sans-serif",
    tagFont: "500 8px system-ui, sans-serif",
    titleLineHeight: 16,
    secondaryLineHeight: 13,
    contentGap: 3
  };
  function createTextMeasure(opts = {}) {
    const config = { ...DEFAULTS, ...opts };
    let pretext = null;
    let loadAttempted = false;
    let pretextAvailable = false;
    const cache = /* @__PURE__ */ new Map();
    function tryLoadPretext() {
      if (loadAttempted) return pretextAvailable;
      loadAttempted = true;
      try {
        const mod = globalThis.__pretextModule;
        if (mod) {
          pretext = mod;
          pretextAvailable = true;
        }
      } catch {
      }
      return pretextAvailable;
    }
    function getPrepared(text2, font) {
      const key = `${font}\0${text2}`;
      let prepared = cache.get(key);
      if (!prepared) {
        prepared = pretext.prepare(text2, font);
        cache.set(key, prepared);
      }
      return prepared;
    }
    function heuristicMeasure(text2, maxWidth, lineHeight, font) {
      const sizeMatch = font.match(/(\d+)px/);
      const fontSize = sizeMatch ? parseInt(sizeMatch[1]) : 12;
      const avgCharWidth = fontSize * 0.55;
      const charsPerLine = Math.max(1, Math.floor(maxWidth / avgCharWidth));
      const lineCount = Math.max(1, Math.ceil(text2.length / charsPerLine));
      return { height: lineCount * lineHeight, lineCount };
    }
    function measureOne(text2, maxWidth, lineHeight, font) {
      if (!text2) return { height: 0, lineCount: 0 };
      if (pretextAvailable && pretext) {
        const prepared = getPrepared(text2, font);
        return pretext.layout(prepared, maxWidth, lineHeight);
      }
      return heuristicMeasure(text2, maxWidth, lineHeight, font);
    }
    return {
      get available() {
        tryLoadPretext();
        return pretextAvailable;
      },
      measure(text2, maxWidth, lineHeight) {
        tryLoadPretext();
        return measureOne(text2, maxWidth, lineHeight, config.titleFont);
      },
      fits(text2, maxWidth, lineHeight) {
        tryLoadPretext();
        const { lineCount } = measureOne(text2, maxWidth, lineHeight, config.titleFont);
        return lineCount <= 1;
      },
      measureStack(items, maxWidth, gap = config.contentGap) {
        tryLoadPretext();
        const breakdown = [];
        let totalHeight = 0;
        for (const item of items) {
          if (!item.text) {
            breakdown.push({ height: 0, lineCount: 0 });
            continue;
          }
          const font = item.font ?? config.secondaryFont;
          const lh = item.lineHeight ?? config.secondaryLineHeight;
          const result = measureOne(item.text, maxWidth, lh, font);
          breakdown.push(result);
          if (result.height > 0) {
            totalHeight += (totalHeight > 0 ? gap : 0) + result.height;
          }
        }
        return { height: totalHeight, breakdown };
      },
      fitContent(opts2) {
        tryLoadPretext();
        const { title, subtitle, location, time, tags, maxWidth, maxHeight } = opts2;
        const gap = config.contentGap;
        const titleResult = measureOne(title, maxWidth, config.titleLineHeight, config.titleFont);
        let used = titleResult.height;
        const result = {
          title: true,
          titleLines: titleResult.lineCount,
          subtitle: false,
          location: false,
          time: false,
          tags: false,
          totalHeight: used
        };
        if (time) {
          const h = measureOne(time, maxWidth, config.secondaryLineHeight, config.secondaryFont);
          if (used + gap + h.height <= maxHeight) {
            result.time = true;
            used += gap + h.height;
          }
        }
        if (subtitle) {
          const h = measureOne(subtitle, maxWidth, config.secondaryLineHeight, config.secondaryFont);
          if (used + gap + h.height <= maxHeight) {
            result.subtitle = true;
            used += gap + h.height;
          }
        }
        if (location) {
          const h = measureOne(location, maxWidth, config.secondaryLineHeight, config.secondaryFont);
          if (used + gap + h.height <= maxHeight) {
            result.location = true;
            used += gap + h.height;
          }
        }
        if (tags?.length) {
          const tagText = tags.join("  ");
          const h = measureOne(tagText, maxWidth, config.secondaryLineHeight, config.tagFont);
          if (used + gap + h.height <= maxHeight) {
            result.tags = true;
            used += gap + h.height;
          }
        }
        result.totalHeight = used;
        return result;
      },
      clear() {
        cache.clear();
        if (pretextAvailable && pretext) {
          pretext.clearCache();
        }
      }
    };
  }
  var root_1$7 = /* @__PURE__ */ from_html(`<div class="fs-tick svelte-mrwdy7"><span class="fs-tick-lb svelte-mrwdy7"> </span></div> <div class="fs-tick fs-tick--half svelte-mrwdy7"></div>`, 1);
  var root_2$7 = /* @__PURE__ */ from_html(`<span class="fs-blocked-label svelte-mrwdy7"> </span>`);
  var root_3$7 = /* @__PURE__ */ from_html(`<div class="fs-blocked svelte-mrwdy7"><!></div>`);
  var root_4$7 = /* @__PURE__ */ from_html(`<div class="fs-day-header-custom svelte-mrwdy7"><!></div>`);
  var root_5$7 = /* @__PURE__ */ from_html(`<div><!> <!> <!></div>`);
  var root_6$7 = /* @__PURE__ */ from_html(`<div class="fs-now svelte-mrwdy7"><span class="fs-now-tag svelte-mrwdy7"> </span> <div class="fs-now-line svelte-mrwdy7"></div></div>`);
  var root_7$7 = /* @__PURE__ */ from_html(`<span class="fs-ev-live svelte-mrwdy7" aria-hidden="true"></span>`);
  var root_8$7 = /* @__PURE__ */ from_html(`<span class="fs-ev-next-badge svelte-mrwdy7" aria-hidden="true"> </span>`);
  var root_9$5 = /* @__PURE__ */ from_html(`<span class="fs-ev-time svelte-mrwdy7"> </span>`);
  var root_10$5 = /* @__PURE__ */ from_html(`<span class="fs-ev-sub svelte-mrwdy7"> </span>`);
  var root_11$5 = /* @__PURE__ */ from_html(`<span class="fs-ev-loc svelte-mrwdy7"> </span>`);
  var root_12$5 = /* @__PURE__ */ from_html(`<span class="fs-ev-tag svelte-mrwdy7"> </span>`);
  var root_13$4 = /* @__PURE__ */ from_html(`<span class="fs-ev-tags svelte-mrwdy7"></span>`);
  var root_14$4 = /* @__PURE__ */ from_html(`<!> <span class="fs-ev-title svelte-mrwdy7"> </span> <!> <!> <!>`, 1);
  var root_15$4 = /* @__PURE__ */ from_html(`<div class="fs-ev-handle fs-ev-handle--start svelte-mrwdy7" aria-hidden="true"></div> <div class="fs-ev-handle fs-ev-handle--end svelte-mrwdy7" aria-hidden="true"></div>`, 1);
  var root_16$4 = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><div class="fs-ev-inner svelte-mrwdy7"><!> <!></div> <!></div>`);
  var root_17$4 = /* @__PURE__ */ from_html(`<div class="fs-create-ghost svelte-mrwdy7" aria-hidden="true"><span class="fs-create-ghost-time svelte-mrwdy7"> </span></div>`);
  var root_18$4 = /* @__PURE__ */ from_html(`<span class="fs-ad-span svelte-mrwdy7"> </span>`);
  var root_19$4 = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><span class="fs-ad-dot svelte-mrwdy7" aria-hidden="true"></span> <span class="fs-ad-title svelte-mrwdy7"> </span> <!></div>`);
  var root_20$4 = /* @__PURE__ */ from_html(`<div class="fs-allday svelte-mrwdy7"></div>`);
  var root_21$4 = /* @__PURE__ */ from_html(`<div role="region"><div role="region"><div class="fs-track svelte-mrwdy7" role="presentation"><!> <!> <!> <!></div></div> <!></div>`);
  function PlannerDay($$anchor, $$props) {
    push($$props, true);
    let height = prop($$props, "height", 3, 520), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null), readOnly = prop($$props, "readOnly", 3, false);
    const ctx = useCalendarContext();
    const L = /* @__PURE__ */ user_derived(() => ctx.labels);
    const clock = createClock(ctx.timezone);
    const drag = /* @__PURE__ */ user_derived(() => ctx.drag);
    const commitDragCtx = /* @__PURE__ */ user_derived(() => ctx.commitDrag);
    const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
    const loadRangeCtx = /* @__PURE__ */ user_derived(() => ctx.loadRange);
    const blockedSlots = /* @__PURE__ */ user_derived(() => ctx.blockedSlots);
    const dayHeaderSnippet = /* @__PURE__ */ user_derived(() => ctx.dayHeaderSnippet);
    const minDuration = /* @__PURE__ */ user_derived(() => ctx.minDuration);
    const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
    const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
    const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
    const SNAP_MS = /* @__PURE__ */ user_derived(() => ctx.snapInterval * 6e4);
    let following = /* @__PURE__ */ state(true);
    let scrollDragging = /* @__PURE__ */ state(false);
    let wasDragging = false;
    let el;
    let containerW = /* @__PURE__ */ state(0);
    let containerH = /* @__PURE__ */ state(520);
    let dragStartX = 0;
    let dragScrollStart = 0;
    let rafId = 0;
    const BUFFER_DAYS = 7;
    const EDGE_DAYS = 2;
    const SHIFT_DAYS = 5;
    const _initMs = untrack(() => sod($$props.focusDate?.getTime() ?? Date.now()));
    let internalCenterMs = /* @__PURE__ */ state(proxy(_initMs));
    let lastExternalMs = _initMs;
    let rebasing = false;
    let visibleDayMs = /* @__PURE__ */ state(proxy(_initMs));
    const startHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[0] ?? 0);
    const endHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[1] ?? 24);
    const hourCount = /* @__PURE__ */ user_derived(() => Math.max(1, get(endHour) - get(startHour)));
    const DAY_GAP = 2;
    const count = 1 + 2 * BUFFER_DAYS;
    const origin = /* @__PURE__ */ user_derived(() => get(internalCenterMs) - BUFFER_DAYS * DAY_MS);
    user_effect(() => {
      if (!get(loadRangeCtx)) return;
      const rangeStart = new Date(get(internalCenterMs) - BUFFER_DAYS * DAY_MS);
      const rangeEnd = new Date(get(internalCenterMs) + (BUFFER_DAYS + 1) * DAY_MS);
      get(loadRangeCtx).set({ start: rangeStart, end: rangeEnd });
      return () => get(loadRangeCtx).set(null);
    });
    const MIN_HOUR_W = 60;
    const hourWidth = /* @__PURE__ */ user_derived(() => get(containerW) > 0 ? Math.max(MIN_HOUR_W, get(containerW) / get(hourCount)) : 110);
    const dayWidth = /* @__PURE__ */ user_derived(() => get(hourCount) * get(hourWidth));
    const totalWidth = /* @__PURE__ */ user_derived(() => count * (get(dayWidth) + DAY_GAP));
    const days = /* @__PURE__ */ user_derived(() => {
      const result = [];
      for (let i = 0; i < count; i++) {
        const ms = get(origin) + i * DAY_MS;
        result.push({
          ms,
          today: ms === clock.today,
          past: ms < clock.today,
          x: i * (get(dayWidth) + DAY_GAP)
        });
      }
      return result;
    });
    function timeToPx(ms) {
      const elapsed = ms - get(origin);
      const dayIndex = Math.floor(elapsed / DAY_MS);
      const hourInDay = (elapsed - dayIndex * DAY_MS) / HOUR_MS;
      const clamped = Math.min(Math.max(hourInDay, get(startHour)), get(endHour));
      return dayIndex * (get(dayWidth) + DAY_GAP) + (clamped - get(startHour)) * get(hourWidth);
    }
    function pxToTime(px) {
      const dayStride = get(dayWidth) + DAY_GAP;
      const dayIndex = Math.max(0, Math.min(count - 1, Math.floor(px / dayStride)));
      const localPx = px - dayIndex * dayStride;
      const hour = get(startHour) + localPx / get(hourWidth);
      return get(origin) + dayIndex * DAY_MS + hour * HOUR_MS;
    }
    const nowPx = /* @__PURE__ */ user_derived(() => timeToPx(clock.tick));
    const nowHour = /* @__PURE__ */ user_derived(() => (clock.tick - clock.today) / HOUR_MS);
    const nowInBand = /* @__PURE__ */ user_derived(() => get(nowHour) >= get(startHour) && get(nowHour) < get(endHour));
    const timedEvents = /* @__PURE__ */ user_derived(() => events().filter((ev) => !isAllDay(ev) && !isMultiDay(ev)));
    const allDayEvents = /* @__PURE__ */ user_derived(() => {
      const segs = [];
      for (const ev of events()) {
        if (!isAllDay(ev) && !isMultiDay(ev)) continue;
        const seg = segmentForDay(ev, get(visibleDayMs));
        if (seg) segs.push(seg);
      }
      return segs;
    });
    const CONTENT_TOP = 56;
    const ALLDAY_H = 24;
    const contentTop = /* @__PURE__ */ user_derived(() => CONTENT_TOP + (get(allDayEvents).length > 0 ? ALLDAY_H + 4 : 0));
    const EVENT_GAP = 5;
    const MIN_EVENT_H = 32;
    const measure = createTextMeasure({
      titleFont: "600 13px system-ui, sans-serif",
      secondaryFont: "400 10px system-ui, sans-serif",
      tagFont: "500 8px system-ui, sans-serif",
      titleLineHeight: 16,
      secondaryLineHeight: 13,
      contentGap: 6
    });
    const nowInfo = /* @__PURE__ */ user_derived(() => {
      const now = clock.tick;
      const current = /* @__PURE__ */ new Set();
      const todayStart = clock.today;
      const todayEnd = todayStart + DAY_MS;
      let nextId = null;
      let nextStart = Infinity;
      for (const ev of get(timedEvents)) {
        const s = ev.start.getTime();
        const e = ev.end.getTime();
        if (s <= now && e > now) current.add(ev.id);
        else if (s >= todayStart && s < todayEnd && s > now && s < nextStart) {
          nextStart = s;
          nextId = ev.id;
        }
      }
      return { current, nextId };
    });
    const positionedEvents = /* @__PURE__ */ user_derived(() => {
      const dragP = get(drag)?.active && (get(drag).mode === "move" || get(drag).mode === "resize-start" || get(drag).mode === "resize-end") ? get(drag).payload : null;
      const staticEvents = [];
      let draggedEv = null;
      for (const ev of get(timedEvents)) {
        if (dragP?.eventId === ev.id) draggedEv = ev;
        else staticEvents.push(ev);
      }
      const sorted = [...staticEvents].sort((a, b) => a.start.getTime() - b.start.getTime());
      const infos = sorted.map((ev) => {
        const s = ev.start.getTime();
        const e = ev.end.getTime();
        const x = timeToPx(s);
        const xEnd = timeToPx(e);
        return {
          ev,
          x,
          width: Math.max(xEnd - x, 28),
          row: 0,
          groupMaxRow: 1,
          isDragged: false,
          startMs: s,
          endMs: e,
          clippedWidth: xEnd - x
        };
      }).filter((info) => info.clippedWidth > 0);
      const par = infos.map((_, i) => i);
      function find(i) {
        while (par[i] !== i) {
          par[i] = par[par[i]];
          i = par[i];
        }
        return i;
      }
      for (let i = 0; i < infos.length; i++) {
        for (let j = i + 1; j < infos.length; j++) {
          if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
          else break;
        }
      }
      const groups = /* @__PURE__ */ new Map();
      for (let i = 0; i < infos.length; i++) {
        const root2 = find(i);
        if (!groups.has(root2)) groups.set(root2, []);
        groups.get(root2).push(i);
      }
      for (const [, indices] of groups) {
        const rows = [];
        for (const idx of indices) {
          const inf = infos[idx];
          let row = 0;
          for (let r = 0; r < rows.length; r++) {
            if (rows[r] <= inf.startMs) {
              row = r;
              rows[r] = inf.endMs;
              break;
            }
            row = r + 1;
          }
          if (row >= rows.length) rows.push(inf.endMs);
          infos[idx].row = row;
        }
        for (const idx of indices) infos[idx].groupMaxRow = rows.length;
      }
      const availH = get(containerH) - get(contentTop) - 8;
      const result = infos.map(({ startMs: _s, endMs: _e, clippedWidth: _c, ...info }) => {
        const laneH = Math.max(MIN_EVENT_H, availH / info.groupMaxRow - EVENT_GAP);
        const topPx = get(contentTop) + info.row * (availH / info.groupMaxRow);
        const fit = measure.fitContent({
          title: info.ev.title,
          subtitle: info.ev.subtitle,
          location: info.ev.location,
          time: `${fmtTime$1(info.ev.start, $$props.locale)} – ${fmtTime$1(info.ev.end, $$props.locale)}`,
          tags: info.ev.tags,
          maxWidth: laneH - 16,
          maxHeight: info.width - 16
        });
        return { ...info, topPx, heightPx: laneH, fit };
      });
      if (draggedEv && dragP) {
        const x = timeToPx(dragP.start.getTime());
        const xEnd = timeToPx(dragP.end.getTime());
        const dragH = Math.max(MIN_EVENT_H, availH - EVENT_GAP);
        const dragW = Math.max(xEnd - x, 28);
        result.push({
          ev: draggedEv,
          x,
          width: dragW,
          row: 0,
          groupMaxRow: 1,
          topPx: get(contentTop),
          heightPx: dragH,
          isDragged: true,
          fit: measure.fitContent({
            title: draggedEv.title,
            subtitle: draggedEv.subtitle,
            location: draggedEv.location,
            tags: draggedEv.tags,
            maxWidth: dragH - 16,
            maxHeight: dragW - 16
          })
        });
      }
      return result;
    });
    user_effect(() => {
      const ext = $$props.focusDate ? sod($$props.focusDate.getTime()) : clock.today;
      if (ext !== lastExternalMs && !rebasing) {
        lastExternalMs = ext;
        set(internalCenterMs, ext, true);
        set(visibleDayMs, ext, true);
        set(following, ext === clock.today);
        tick().then(() => {
          if (el) {
            const focusX = BUFFER_DAYS * (get(dayWidth) + DAY_GAP);
            el.scrollLeft = focusX + get(dayWidth) / 2 - el.clientWidth / 2;
          }
        });
      }
    });
    function checkEdges() {
      if (!el || !get(viewState) || rebasing) return;
      const stride = get(dayWidth) + DAY_GAP;
      const threshold = stride * EDGE_DAYS;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft < threshold) {
        rebase(-1);
      } else if (maxScroll > 0 && maxScroll - el.scrollLeft < threshold) {
        rebase(1);
      }
    }
    function rebase(direction) {
      if (rebasing) return;
      rebasing = true;
      const shift = SHIFT_DAYS * direction;
      const stride = get(dayWidth) + DAY_GAP;
      const adj = -shift * stride;
      if (el) el.scrollLeft += adj;
      dragScrollStart += adj;
      set(internalCenterMs, get(internalCenterMs) + shift * DAY_MS);
      lastExternalMs = get(internalCenterMs);
      get(viewState)?.setFocusDate(new Date(get(internalCenterMs)));
      tick().then(() => {
        rebasing = false;
      });
    }
    function syncFocusFromScroll() {
      if (!el || !get(viewState) || get(following) || rebasing) return;
      const centerX = el.scrollLeft + el.clientWidth / 2;
      const centerDayMs = sod(pxToTime(centerX));
      set(visibleDayMs, centerDayMs, true);
      if (centerDayMs !== lastExternalMs) {
        lastExternalMs = centerDayMs;
        get(viewState).setFocusDate(new Date(centerDayMs));
      }
    }
    let scrollRaf = 0;
    function handleScroll() {
      if (get(following) || rebasing || scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        if (!el || get(following) || rebasing) return;
        checkEdges();
        syncFocusFromScroll();
      });
    }
    user_effect(() => {
      if (!get(following)) return;
      function frame() {
        if (el && !get(scrollDragging)) {
          if (get(internalCenterMs) !== clock.today) {
            set(internalCenterMs, clock.today, true);
            lastExternalMs = clock.today;
            get(viewState)?.goToday();
          }
          set(visibleDayMs, clock.today, true);
          const todayD = get(days).find((d) => d.today);
          if (todayD) {
            el.scrollLeft = todayD.x + get(dayWidth) / 2 - el.clientWidth / 2;
          }
        }
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(rafId);
    });
    onMount(() => {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          set(containerW, entry.contentRect.width, true);
          set(containerH, entry.contentRect.height, true);
        }
      });
      ro.observe(el);
      return () => {
        cancelAnimationFrame(scrollRaf);
        ro.disconnect();
      };
    });
    const SCROLL_THRESHOLD = 3;
    function onPointerDown(e) {
      if (e.button !== 0) return;
      if (e.target.closest(".fs-event")) return;
      if (readOnly()) {
        dragStartX = e.clientX;
        dragScrollStart = el.scrollLeft;
        window.addEventListener("pointermove", onScrollMove);
        window.addEventListener("pointerup", onScrollUp, { once: true });
        window.addEventListener("pointercancel", onScrollUp, { once: true });
        return;
      }
      onCreatePointerDown(e);
    }
    function onScrollMove(e) {
      const dx = e.clientX - dragStartX;
      if (!get(scrollDragging) && Math.abs(dx) >= SCROLL_THRESHOLD) {
        set(scrollDragging, true);
        wasDragging = true;
        set(following, false);
      }
      if (get(scrollDragging)) el.scrollLeft = dragScrollStart - dx;
    }
    function onScrollUp() {
      window.removeEventListener("pointermove", onScrollMove);
      window.removeEventListener("pointerup", onScrollUp);
      window.removeEventListener("pointercancel", onScrollUp);
      set(scrollDragging, false);
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
    function handleTrackClick(e) {
      if (wasDragging) {
        wasDragging = false;
        return;
      }
      if (!$$props.oneventcreate || readOnly()) return;
      if (e.target.closest(".fs-event")) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left + el.scrollLeft;
      for (const d of get(days)) {
        if (clickX >= d.x && clickX < d.x + get(dayWidth)) {
          if (get(disabledSet).has(d.ms)) return;
          const frac = (clickX - d.x) / get(dayWidth);
          const clickHour = get(startHour) + frac * get(hourCount);
          if (isBlockedAt(d.ms, clickHour)) return;
          const hour = Math.floor(clickHour);
          const durMin = get(minDuration) ? Math.max(60, get(minDuration)) : 60;
          const start = new Date(d.ms + hour * HOUR_MS);
          const end = new Date(start.getTime() + durMin * 6e4);
          $$props.oneventcreate({ start, end });
          return;
        }
      }
    }
    const CREATE_THRESHOLD = 4;
    let createStartX = 0;
    let createAnchorMs = 0;
    let createStarted = false;
    function trackX(e) {
      return e.clientX - el.getBoundingClientRect().left + el.scrollLeft;
    }
    function onCreatePointerDown(e) {
      if (!get(drag) || !$$props.oneventcreate) return;
      createStartX = e.clientX;
      createAnchorMs = pxToTime(trackX(e));
      createStarted = false;
      window.addEventListener("pointermove", onCreateMove);
      window.addEventListener("pointerup", onCreateUp, { once: true });
      window.addEventListener("pointercancel", onCreateCancel, { once: true });
    }
    function onCreateMove(e) {
      if (!get(drag)) return;
      if (!createStarted) {
        if (Math.abs(e.clientX - createStartX) < CREATE_THRESHOLD) return;
        if (get(disabledSet).has(sod(createAnchorMs))) return;
        createStarted = true;
        wasDragging = true;
        createAnchorMs = Math.floor(createAnchorMs / get(SNAP_MS)) * get(SNAP_MS);
        get(drag).beginCreate(new Date(createAnchorMs), new Date(createAnchorMs + get(SNAP_MS)));
      }
      const snapped = Math.round(pxToTime(trackX(e)) / get(SNAP_MS)) * get(SNAP_MS);
      get(drag).updatePointer(new Date(Math.min(createAnchorMs, snapped)), new Date(Math.max(createAnchorMs + get(SNAP_MS), snapped)));
    }
    function cleanupCreateDrag() {
      window.removeEventListener("pointermove", onCreateMove);
      window.removeEventListener("pointerup", onCreateUp);
      window.removeEventListener("pointercancel", onCreateCancel);
      createStarted = false;
    }
    function onCreateUp() {
      if (get(drag) && createStarted) {
        get(commitDragCtx)?.();
        setTimeout(
          () => {
            wasDragging = false;
          },
          0
        );
      }
      cleanupCreateDrag();
    }
    function onCreateCancel() {
      if (get(drag) && createStarted) {
        get(drag).cancel();
        setTimeout(
          () => {
            wasDragging = false;
          },
          0
        );
      }
      cleanupCreateDrag();
    }
    const DRAG_THRESHOLD = 5;
    let evDragStartX = 0;
    let evDragOriginPx = 0;
    let evDragStarted = false;
    let evDragging = /* @__PURE__ */ state(false);
    let evDragId = /* @__PURE__ */ state(null);
    let evDragEvent = null;
    function onEventPointerDown(e, ev) {
      if (e.button !== 0 || !get(drag) || readOnly() || ev.data?.readOnly) return;
      e.stopPropagation();
      evDragStartX = e.clientX;
      evDragOriginPx = timeToPx(ev.start.getTime());
      evDragStarted = false;
      set(evDragId, ev.id, true);
      evDragEvent = ev;
      window.addEventListener("pointermove", onEvMove);
      window.addEventListener("pointerup", onEvUp, { once: true });
      window.addEventListener("pointercancel", onEvCancel, { once: true });
    }
    function onEvMove(e) {
      const ev = evDragEvent;
      if (!get(drag) || !ev || get(evDragId) !== ev.id) return;
      const dx = e.clientX - evDragStartX;
      if (!evDragStarted && Math.abs(dx) < DRAG_THRESHOLD) return;
      if (!evDragStarted) {
        evDragStarted = true;
        set(evDragging, true);
        get(drag).beginMove(ev.id, ev.start, ev.end);
      }
      const duration2 = ev.end.getTime() - ev.start.getTime();
      const raw = pxToTime(evDragOriginPx + dx);
      const snapped = Math.round(raw / get(SNAP_MS)) * get(SNAP_MS);
      get(drag).updatePointer(new Date(snapped), new Date(snapped + duration2));
    }
    function cleanupEvDrag() {
      window.removeEventListener("pointermove", onEvMove);
      window.removeEventListener("pointerup", onEvUp);
      window.removeEventListener("pointercancel", onEvCancel);
      evDragStarted = false;
      set(evDragging, false);
      set(evDragId, null);
      evDragEvent = null;
    }
    function onEvUp() {
      if (!get(drag)) {
        cleanupEvDrag();
        return;
      }
      if (!evDragStarted && evDragEvent) $$props.oneventclick?.(evDragEvent);
      else if (evDragStarted) get(commitDragCtx)?.();
      cleanupEvDrag();
    }
    function onEvCancel() {
      if (get(drag) && evDragStarted) get(drag).cancel();
      cleanupEvDrag();
    }
    let rsStartX = 0;
    let rsStarted = false;
    let rsEdge = "end";
    let rsEvent = null;
    function onResizePointerDown(e, ev, edge) {
      if (e.button !== 0 || !get(drag) || readOnly() || ev.data?.readOnly) return;
      e.stopPropagation();
      rsStartX = e.clientX;
      rsStarted = false;
      rsEdge = edge;
      rsEvent = ev;
      window.addEventListener("pointermove", onResizeMove);
      window.addEventListener("pointerup", onResizeUp, { once: true });
      window.addEventListener("pointercancel", onResizeCancel, { once: true });
    }
    function onResizeMove(e) {
      const ev = rsEvent;
      if (!get(drag) || !ev) return;
      if (!rsStarted) {
        if (Math.abs(e.clientX - rsStartX) < CREATE_THRESHOLD) return;
        rsStarted = true;
        get(drag).beginResize(ev.id, rsEdge, ev.start, ev.end);
      }
      const snapped = Math.round(pxToTime(trackX(e)) / get(SNAP_MS)) * get(SNAP_MS);
      if (rsEdge === "end") {
        const end = Math.max(snapped, ev.start.getTime() + get(SNAP_MS));
        get(drag).updatePointer(ev.start, new Date(end));
      } else {
        const start = Math.min(snapped, ev.end.getTime() - get(SNAP_MS));
        get(drag).updatePointer(new Date(start), ev.end);
      }
    }
    function cleanupResize() {
      window.removeEventListener("pointermove", onResizeMove);
      window.removeEventListener("pointerup", onResizeUp);
      window.removeEventListener("pointercancel", onResizeCancel);
      rsStarted = false;
      rsEvent = null;
    }
    function onResizeUp() {
      if (get(drag) && rsStarted) {
        wasDragging = true;
        get(commitDragCtx)?.();
        setTimeout(
          () => {
            wasDragging = false;
          },
          0
        );
      } else if (rsEvent && !rsStarted) {
        $$props.oneventclick?.(rsEvent);
      }
      cleanupResize();
    }
    function onResizeCancel() {
      if (get(drag) && rsStarted) get(drag).cancel();
      cleanupResize();
    }
    function onWindowKeydown(e) {
      if (e.key !== "Escape" || !get(drag)?.active) return;
      get(drag).cancel();
      cleanupCreateDrag();
      cleanupEvDrag();
      cleanupResize();
      wasDragging = true;
      window.addEventListener(
        "pointerup",
        () => setTimeout(
          () => {
            wasDragging = false;
          },
          0
        ),
        { once: true }
      );
    }
    var div = root_21$4();
    event("keydown", $window, onWindowKeydown);
    let classes;
    let styles;
    var div_1 = child(div);
    let classes_1;
    var div_2 = child(div_1);
    let styles_1;
    var node = child(div_2);
    each(node, 17, () => get(days), (d) => d.ms, ($$anchor2, d) => {
      var div_3 = root_5$7();
      let classes_2;
      let styles_2;
      var node_1 = child(div_3);
      each(node_1, 17, () => ({ length: get(hourCount) }), index, ($$anchor3, _, h) => {
        const hour = /* @__PURE__ */ user_derived(() => get(startHour) + h);
        const x = /* @__PURE__ */ user_derived(() => h * get(hourWidth));
        var fragment = root_1$7();
        var div_4 = first_child(fragment);
        let styles_3;
        var span = child(div_4);
        var text2 = child(span, true);
        reset(span);
        reset(div_4);
        var div_5 = sibling(div_4, 2);
        let styles_4;
        template_effect(
          ($0) => {
            styles_3 = set_style(div_4, "", styles_3, { left: `${get(x) ?? ""}px` });
            set_text(text2, $0);
            styles_4 = set_style(div_5, "", styles_4, { left: `${get(x) + get(hourWidth) * 0.5}px` });
          },
          [() => fmtH(get(hour), $$props.locale)]
        );
        append($$anchor3, fragment);
      });
      var node_2 = sibling(node_1, 2);
      {
        var consequent_3 = ($$anchor3) => {
          const jsDay = /* @__PURE__ */ user_derived(() => new Date(get(d).ms).getDay());
          const isoDay = /* @__PURE__ */ user_derived(() => get(jsDay) === 0 ? 7 : get(jsDay));
          var fragment_1 = comment();
          var node_3 = first_child(fragment_1);
          each(node_3, 17, () => get(blockedSlots), index, ($$anchor4, slot) => {
            var fragment_2 = comment();
            var node_4 = first_child(fragment_2);
            {
              var consequent_2 = ($$anchor5) => {
                const s = /* @__PURE__ */ user_derived(() => Math.max(get(slot).start, get(startHour)));
                const e = /* @__PURE__ */ user_derived(() => Math.min(get(slot).end, get(endHour)));
                var fragment_3 = comment();
                var node_5 = first_child(fragment_3);
                {
                  var consequent_1 = ($$anchor6) => {
                    var div_6 = root_3$7();
                    let styles_5;
                    var node_6 = child(div_6);
                    {
                      var consequent = ($$anchor7) => {
                        var span_1 = root_2$7();
                        var text_1 = child(span_1, true);
                        reset(span_1);
                        template_effect(() => set_text(text_1, get(slot).label));
                        append($$anchor7, span_1);
                      };
                      if_block(node_6, ($$render) => {
                        if (get(slot).label) $$render(consequent);
                      });
                    }
                    reset(div_6);
                    template_effect(() => {
                      set_attribute(div_6, "aria-label", get(slot).label || "Unavailable");
                      styles_5 = set_style(div_6, "", styles_5, {
                        left: `${(get(s) - get(startHour)) * get(hourWidth)}px`,
                        width: `${(get(e) - get(s)) * get(hourWidth)}px`
                      });
                    });
                    append($$anchor6, div_6);
                  };
                  if_block(node_5, ($$render) => {
                    if (get(e) > get(s)) $$render(consequent_1);
                  });
                }
                append($$anchor5, fragment_3);
              };
              if_block(node_4, ($$render) => {
                if (!get(slot).day || get(slot).day === get(isoDay)) $$render(consequent_2);
              });
            }
            append($$anchor4, fragment_2);
          });
          append($$anchor3, fragment_1);
        };
        if_block(node_2, ($$render) => {
          if (get(blockedSlots)?.length) $$render(consequent_3);
        });
      }
      var node_7 = sibling(node_2, 2);
      {
        var consequent_4 = ($$anchor3) => {
          var div_7 = root_4$7();
          var node_8 = child(div_7);
          {
            let $0 = /* @__PURE__ */ user_derived(() => ({
              date: new Date(get(d).ms),
              isToday: get(d).today,
              dayName: weekdayShort(get(d).ms, $$props.locale)
            }));
            snippet(node_8, () => get(dayHeaderSnippet), () => get($0));
          }
          reset(div_7);
          append($$anchor3, div_7);
        };
        if_block(node_7, ($$render) => {
          if (get(dayHeaderSnippet)) $$render(consequent_4);
        });
      }
      reset(div_3);
      template_effect(
        ($0) => {
          classes_2 = set_class(div_3, 1, "fs-day svelte-mrwdy7", null, classes_2, $0);
          styles_2 = set_style(div_3, "", styles_2, {
            left: `${get(d).x ?? ""}px`,
            width: `${get(dayWidth) ?? ""}px`
          });
        },
        [
          () => ({
            "fs-today": get(d).today,
            "fs-past": get(d).past,
            "fs-disabled": get(disabledSet).has(get(d).ms)
          })
        ]
      );
      append($$anchor2, div_3);
    });
    var node_9 = sibling(node, 2);
    {
      var consequent_5 = ($$anchor2) => {
        var div_8 = root_6$7();
        let styles_6;
        var span_2 = child(div_8);
        var text_2 = child(span_2, true);
        reset(span_2);
        next(2);
        reset(div_8);
        template_effect(() => {
          styles_6 = set_style(div_8, "", styles_6, { left: `${get(nowPx) ?? ""}px` });
          set_text(text_2, clock.hm);
        });
        append($$anchor2, div_8);
      };
      if_block(node_9, ($$render) => {
        if (get(nowInBand)) $$render(consequent_5);
      });
    }
    var node_10 = sibling(node_9, 2);
    each(node_10, 17, () => get(positionedEvents), (p) => p.ev.id, ($$anchor2, p) => {
      const isCurrent = /* @__PURE__ */ user_derived(() => get(nowInfo).current.has(get(p).ev.id));
      const isNext = /* @__PURE__ */ user_derived(() => !get(p).isDragged && get(p).ev.id === get(nowInfo).nextId);
      var div_9 = root_16$4();
      let classes_3;
      let styles_7;
      var div_10 = child(div_9);
      var node_11 = child(div_10);
      {
        var consequent_6 = ($$anchor3) => {
          var span_3 = root_7$7();
          append($$anchor3, span_3);
        };
        var consequent_7 = ($$anchor3) => {
          var span_4 = root_8$7();
          var text_3 = child(span_4, true);
          reset(span_4);
          template_effect(() => set_text(text_3, get(L).upNext));
          append($$anchor3, span_4);
        };
        if_block(node_11, ($$render) => {
          if (get(isCurrent)) $$render(consequent_6);
          else if (get(isNext)) $$render(consequent_7, 1);
        });
      }
      var node_12 = sibling(node_11, 2);
      EventContent(node_12, {
        get event() {
          return get(p).ev;
        },
        children: ($$anchor3, $$slotProps) => {
          var fragment_4 = root_14$4();
          var node_13 = first_child(fragment_4);
          {
            var consequent_8 = ($$anchor4) => {
              var span_5 = root_9$5();
              var text_4 = child(span_5);
              reset(span_5);
              template_effect(($0, $1) => set_text(text_4, `${$0 ?? ""} – ${$1 ?? ""}`), [
                () => fmtTime$1(get(p).ev.start, $$props.locale),
                () => fmtTime$1(get(p).ev.end, $$props.locale)
              ]);
              append($$anchor4, span_5);
            };
            if_block(node_13, ($$render) => {
              if (get(p).fit.time) $$render(consequent_8);
            });
          }
          var span_6 = sibling(node_13, 2);
          var text_5 = child(span_6, true);
          reset(span_6);
          var node_14 = sibling(span_6, 2);
          {
            var consequent_9 = ($$anchor4) => {
              var span_7 = root_10$5();
              var text_6 = child(span_7, true);
              reset(span_7);
              template_effect(() => set_text(text_6, get(p).ev.subtitle));
              append($$anchor4, span_7);
            };
            if_block(node_14, ($$render) => {
              if (get(p).ev.subtitle && get(p).fit.subtitle) $$render(consequent_9);
            });
          }
          var node_15 = sibling(node_14, 2);
          {
            var consequent_10 = ($$anchor4) => {
              var span_8 = root_11$5();
              var text_7 = child(span_8, true);
              reset(span_8);
              template_effect(() => set_text(text_7, get(p).ev.location));
              append($$anchor4, span_8);
            };
            if_block(node_15, ($$render) => {
              if (get(p).ev.location && get(p).fit.location) $$render(consequent_10);
            });
          }
          var node_16 = sibling(node_15, 2);
          {
            var consequent_11 = ($$anchor4) => {
              var span_9 = root_13$4();
              each(span_9, 21, () => get(p).ev.tags, index, ($$anchor5, tag) => {
                var span_10 = root_12$5();
                var text_8 = child(span_10, true);
                reset(span_10);
                template_effect(() => set_text(text_8, get(tag)));
                append($$anchor5, span_10);
              });
              reset(span_9);
              append($$anchor4, span_9);
            };
            if_block(node_16, ($$render) => {
              if (get(p).ev.tags?.length && get(p).fit.tags) $$render(consequent_11);
            });
          }
          template_effect(() => set_text(text_5, get(p).ev.title));
          append($$anchor3, fragment_4);
        },
        $$slots: { default: true }
      });
      reset(div_10);
      var node_17 = sibling(div_10, 2);
      {
        var consequent_12 = ($$anchor3) => {
          var fragment_5 = root_15$4();
          var div_11 = first_child(fragment_5);
          var div_12 = sibling(div_11, 2);
          delegated("pointerdown", div_11, (e) => onResizePointerDown(e, get(p).ev, "start"));
          delegated("pointerdown", div_12, (e) => onResizePointerDown(e, get(p).ev, "end"));
          append($$anchor3, fragment_5);
        };
        if_block(node_17, ($$render) => {
          if (!readOnly() && !get(p).ev.data?.readOnly && !get(p).isDragged) $$render(consequent_12);
        });
      }
      reset(div_9);
      template_effect(
        ($0, $1, $2) => {
          classes_3 = set_class(div_9, 1, "fs-event svelte-mrwdy7", null, classes_3, {
            "fs-event--selected": selectedEventId() === get(p).ev.id,
            "fs-event--current": get(isCurrent),
            "fs-event--next": get(isNext),
            "fs-event--dragging": get(p).isDragged,
            "fs-event--resizing": get(p).isDragged && get(drag)?.mode !== "move",
            "fs-event--readonly": get(p).ev.data?.readOnly,
            "fs-event--cancelled": get(p).ev.status === "cancelled",
            "fs-event--tentative": get(p).ev.status === "tentative",
            "fs-event--full": get(p).ev.status === "full",
            "fs-event--limited": get(p).ev.status === "limited"
          });
          set_attribute(div_9, "title", get(p).ev.title);
          set_attribute(div_9, "aria-label", `${get(p).ev.title ?? ""}, ${$0 ?? ""} – ${$1 ?? ""}, ${$2 ?? ""}${get(p).ev.status === "cancelled" ? " (cancelled)" : ""}${get(p).ev.status === "tentative" ? " (tentative)" : ""}${get(p).ev.status === "full" ? " (full)" : ""}${get(p).ev.status === "limited" ? " (limited)" : ""}${get(isCurrent) ? ` (${get(L).inProgress})` : ""}${get(isNext) ? ` (${get(L).upNext})` : ""}`);
          styles_7 = set_style(div_9, "", styles_7, {
            left: `${get(p).x ?? ""}px`,
            width: `${get(p).width ?? ""}px`,
            top: `${get(p).topPx ?? ""}px`,
            height: `${get(p).heightPx ?? ""}px`,
            "--ev-color": get(p).ev.color ?? "var(--dt-accent)"
          });
        },
        [
          () => fmtTime$1(get(p).ev.start, $$props.locale),
          () => fmtTime$1(get(p).ev.end, $$props.locale),
          () => fmtDuration(get(p).ev.start, get(p).ev.end)
        ]
      );
      delegated("pointerdown", div_9, (e) => onEventPointerDown(e, get(p).ev));
      event("pointerenter", div_9, () => get(oneventhover)?.(get(p).ev));
      delegated("keydown", div_9, (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          $$props.oneventclick?.(get(p).ev);
        }
      });
      append($$anchor2, div_9);
    });
    var node_18 = sibling(node_10, 2);
    {
      var consequent_13 = ($$anchor2) => {
        const gx = /* @__PURE__ */ user_derived(() => timeToPx(get(drag).payload.start.getTime()));
        const gw = /* @__PURE__ */ user_derived(() => Math.max(timeToPx(get(drag).payload.end.getTime()) - get(gx), 8));
        const gh = /* @__PURE__ */ user_derived(() => Math.max(MIN_EVENT_H, get(containerH) - get(contentTop) - 8 - EVENT_GAP));
        var div_13 = root_17$4();
        let styles_8;
        var span_11 = child(div_13);
        var text_9 = child(span_11);
        reset(span_11);
        reset(div_13);
        template_effect(
          ($0, $1) => {
            styles_8 = set_style(div_13, "", styles_8, {
              left: `${get(gx) ?? ""}px`,
              width: `${get(gw) ?? ""}px`,
              top: `${get(contentTop) ?? ""}px`,
              height: `${get(gh) ?? ""}px`
            });
            set_text(text_9, `${$0 ?? ""} – ${$1 ?? ""}`);
          },
          [
            () => fmtTime$1(get(drag).payload.start, $$props.locale),
            () => fmtTime$1(get(drag).payload.end, $$props.locale)
          ]
        );
        append($$anchor2, div_13);
      };
      if_block(node_18, ($$render) => {
        if (!readOnly() && get(drag)?.active && get(drag).mode === "create" && get(drag).payload) $$render(consequent_13);
      });
    }
    reset(div_2);
    reset(div_1);
    bind_this(div_1, ($$value) => el = $$value, () => el);
    var node_19 = sibling(div_1, 2);
    {
      var consequent_15 = ($$anchor2) => {
        var div_14 = root_20$4();
        set_style(div_14, "", {}, { top: "56px" });
        each(div_14, 21, () => get(allDayEvents), (seg) => seg.ev.id, ($$anchor3, seg) => {
          var div_15 = root_19$4();
          let classes_4;
          let styles_9;
          var span_12 = sibling(child(div_15), 2);
          var text_10 = child(span_12, true);
          reset(span_12);
          var node_20 = sibling(span_12, 2);
          {
            var consequent_14 = ($$anchor4) => {
              var span_13 = root_18$4();
              var text_11 = child(span_13);
              reset(span_13);
              template_effect(() => set_text(text_11, `${get(L).day ?? ""} ${get(seg).dayIndex ?? ""}/${get(seg).totalDays ?? ""}`));
              append($$anchor4, span_13);
            };
            var alternate = ($$anchor4) => {
              var span_14 = root_18$4();
              var text_12 = child(span_14, true);
              reset(span_14);
              template_effect(() => set_text(text_12, get(L).allDay));
              append($$anchor4, span_14);
            };
            if_block(node_20, ($$render) => {
              if (get(seg).totalDays > 1) $$render(consequent_14);
              else $$render(alternate, -1);
            });
          }
          reset(div_15);
          template_effect(
            ($0) => {
              classes_4 = set_class(div_15, 1, "fs-ad svelte-mrwdy7", null, classes_4, {
                "fs-ad--start": get(seg).isStart,
                "fs-ad--selected": selectedEventId() === get(seg).ev.id
              });
              set_attribute(div_15, "aria-label", `${get(seg).ev.title ?? ""}${$0 ?? ""}`);
              styles_9 = set_style(div_15, "", styles_9, { "--ev-color": get(seg).ev.color ?? "var(--dt-accent)" });
              set_text(text_10, get(seg).ev.title);
            },
            [
              () => get(seg).totalDays > 1 ? `, ${get(L).dayNOfTotal(get(seg).dayIndex, get(seg).totalDays)}` : `, ${get(L).allDay}`
            ]
          );
          delegated("click", div_15, () => $$props.oneventclick?.(get(seg).ev));
          delegated("keydown", div_15, (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              $$props.oneventclick?.(get(seg).ev);
            }
          });
          append($$anchor3, div_15);
        });
        reset(div_14);
        append($$anchor2, div_14);
      };
      if_block(node_19, ($$render) => {
        if (get(allDayEvents).length > 0) $$render(consequent_15);
      });
    }
    reset(div);
    template_effect(() => {
      classes = set_class(div, 1, "fs svelte-mrwdy7", null, classes, { "fs--auto": get(autoHeight) });
      styles = set_style(div, style() || void 0, styles, {
        height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%"
      });
      set_attribute(div, "aria-label", get(L).dayPlanner);
      classes_1 = set_class(div_1, 1, "fs-scroll svelte-mrwdy7", null, classes_1, {
        "fs-grabbing": get(scrollDragging),
        "fs-readonly": readOnly()
      });
      set_attribute(div_1, "aria-label", get(L).scrollableDayPlanner);
      styles_1 = set_style(div_2, "", styles_1, { width: `${get(totalWidth) ?? ""}px` });
    });
    event("wheel", div_1, (e) => {
      const delta = e.deltaY || e.deltaX;
      if (delta === 0) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const canConsume = delta < 0 ? el.scrollLeft > 0 : el.scrollLeft < maxScroll - 1;
      if (!canConsume) return;
      e.preventDefault();
      el.scrollLeft += delta;
      set(following, false);
    });
    event("scroll", div_1, handleScroll);
    delegated("pointerdown", div_1, onPointerDown);
    delegated("click", div_2, handleTrackClick);
    append($$anchor, div);
    pop();
  }
  delegate(["pointerdown", "click", "keydown"]);
  var root_1$6 = /* @__PURE__ */ from_html(`<span class="tw-ad-cont svelte-j4rvbp" aria-hidden="true">◂</span>`);
  var root_2$6 = /* @__PURE__ */ from_html(`<span class="tw-ad-span svelte-j4rvbp" aria-hidden="true"> </span>`);
  var root_3$6 = /* @__PURE__ */ from_html(`<span class="tw-ad-arrow svelte-j4rvbp" aria-hidden="true">▸</span>`);
  var root_4$6 = /* @__PURE__ */ from_html(`<button type="button"><!> <span class="tw-ad-title svelte-j4rvbp"> </span> <!> <!></button>`);
  var root_5$6 = /* @__PURE__ */ from_html(`<span> </span>`);
  var root_6$6 = /* @__PURE__ */ from_html(`<div class="tw-hd-custom svelte-j4rvbp"><!></div>`);
  var root_7$6 = /* @__PURE__ */ from_html(`<div><span class="tw-hd-wd svelte-j4rvbp"> </span> <!> <!></div>`);
  var root_8$6 = /* @__PURE__ */ from_html(`<button type="button" class="tw-ad-more svelte-j4rvbp"> </button>`);
  var root_9$4 = /* @__PURE__ */ from_html(`<div><!> <!></div>`);
  var root_10$4 = /* @__PURE__ */ from_html(`<div class="tw-allday svelte-j4rvbp"><div class="tw-ad-gutter svelte-j4rvbp"><span class="tw-ad-gutter-lb svelte-j4rvbp"> </span></div> <!></div>`);
  var root_11$4 = /* @__PURE__ */ from_html(`<span class="tw-gutter-lb svelte-j4rvbp"> </span>`);
  var root_12$4 = /* @__PURE__ */ from_html(`<span class="tw-gutter-now svelte-j4rvbp"></span>`);
  var root_13$3 = /* @__PURE__ */ from_html(`<div class="tw-line svelte-j4rvbp"></div> <div class="tw-line tw-line--half svelte-j4rvbp"></div>`, 1);
  var root_14$3 = /* @__PURE__ */ from_html(`<span class="tw-blocked-lb svelte-j4rvbp"> </span>`);
  var root_15$3 = /* @__PURE__ */ from_html(`<div class="tw-blocked svelte-j4rvbp"><!></div>`);
  var root_16$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-loc svelte-j4rvbp"> </span>`);
  var root_17$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-time svelte-j4rvbp"> </span> <span class="tw-ev-title svelte-j4rvbp"> </span> <!>`, 1);
  var root_18$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-live svelte-j4rvbp" aria-hidden="true"></span>`);
  var root_19$3 = /* @__PURE__ */ from_html(`<span class="tw-ev-handle tw-ev-handle--start svelte-j4rvbp" aria-hidden="true"></span> <span class="tw-ev-handle tw-ev-handle--end svelte-j4rvbp" aria-hidden="true"></span>`, 1);
  var root_20$3 = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><div class="tw-ev-stripe svelte-j4rvbp" aria-hidden="true"></div> <div class="tw-ev-body svelte-j4rvbp"><!></div> <!> <!></div>`);
  var root_21$3 = /* @__PURE__ */ from_html(`<span class="tw-ghost-title svelte-j4rvbp"> </span>`);
  var root_22$2 = /* @__PURE__ */ from_html(`<span class="tw-ghost-time svelte-j4rvbp"> </span> <!>`, 1);
  var root_23$2 = /* @__PURE__ */ from_html(`<div aria-hidden="true"><!></div>`);
  var root_24$2 = /* @__PURE__ */ from_html(`<div class="tw-now svelte-j4rvbp"><span class="tw-now-dot svelte-j4rvbp" aria-hidden="true"></span></div>`);
  var root_25$2 = /* @__PURE__ */ from_html(`<div><!> <!> <!> <!></div>`);
  var root_26$2 = /* @__PURE__ */ from_html(`<div class="tw-empty svelte-j4rvbp"><!></div>`);
  var root_27$2 = /* @__PURE__ */ from_html(`<div role="region"><div class="tw-scroll svelte-j4rvbp"><div class="tw-inner svelte-j4rvbp"><div class="tw-top svelte-j4rvbp"><div class="tw-head svelte-j4rvbp"><div class="tw-corner svelte-j4rvbp" aria-hidden="true"></div> <!></div> <!></div> <div class="tw-body svelte-j4rvbp"><div class="tw-gutter svelte-j4rvbp" aria-hidden="true"><!> <!></div>  <div class="tw-cols svelte-j4rvbp" role="presentation"><div class="tw-lines svelte-j4rvbp" aria-hidden="true"></div> <!></div></div></div></div> <!></div>`);
  function PlannerWeek($$anchor, $$props) {
    push($$props, true);
    const allDayChip = ($$anchor2, seg = noop) => {
      var button = root_4$6();
      let classes;
      let styles;
      var node = child(button);
      {
        var consequent = ($$anchor3) => {
          var span = root_1$6();
          append($$anchor3, span);
        };
        if_block(node, ($$render) => {
          if (!seg().isStart) $$render(consequent);
        });
      }
      var span_1 = sibling(node, 2);
      var text2 = child(span_1, true);
      reset(span_1);
      var node_1 = sibling(span_1, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var span_2 = root_2$6();
          var text_1 = child(span_2);
          reset(span_2);
          template_effect(() => set_text(text_1, `${seg().dayIndex ?? ""}/${seg().totalDays ?? ""}`));
          append($$anchor3, span_2);
        };
        if_block(node_1, ($$render) => {
          if (seg().totalDays > 1) $$render(consequent_1);
        });
      }
      var node_2 = sibling(node_1, 2);
      {
        var consequent_2 = ($$anchor3) => {
          var span_3 = root_3$6();
          append($$anchor3, span_3);
        };
        if_block(node_2, ($$render) => {
          if (!seg().isEnd && seg().totalDays > 1) $$render(consequent_2);
        });
      }
      reset(button);
      template_effect(
        ($0, $1) => {
          classes = set_class(button, 1, "tw-ad svelte-j4rvbp", null, classes, {
            "tw-ad--start": seg().isStart,
            "tw-ad--end": seg().isEnd,
            "tw-ad--mid": !seg().isStart && !seg().isEnd,
            "tw-ad--selected": selectedEventId() === seg().ev.id,
            "tw-ad--cancelled": seg().ev.status === "cancelled"
          });
          set_attribute(button, "aria-label", `${seg().ev.title ?? ""}${$0 ?? ""}${$1 ?? ""}`);
          styles = set_style(button, "", styles, { "--ev-color": seg().ev.color ?? "var(--dt-accent)" });
          set_text(text2, seg().ev.title);
        },
        [
          () => seg().totalDays > 1 ? `, ${get(L).dayNOfTotal(seg().dayIndex, seg().totalDays)}` : `, ${get(L).allDay}`,
          () => statusText(seg().ev)
        ]
      );
      delegated("click", button, () => $$props.oneventclick?.(seg().ev));
      event("pointerenter", button, () => get(oneventhover)?.(seg().ev));
      append($$anchor2, button);
    };
    let mondayStart = prop($$props, "mondayStart", 3, true), height = prop($$props, "height", 3, 520), events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null), readOnly = prop($$props, "readOnly", 3, false);
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
    const MIN_COL_W = 110;
    const ALLDAY_MAX = 3;
    const startHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[0] ?? 0);
    const endHour = /* @__PURE__ */ user_derived(() => $$props.visibleHours?.[1] ?? 24);
    const hourCount = /* @__PURE__ */ user_derived(() => Math.max(1, get(endHour) - get(startHour)));
    const gridHeight = /* @__PURE__ */ user_derived(() => get(hourCount) * HOUR_H);
    let scrollEl;
    let colsEl;
    const todayMs = /* @__PURE__ */ user_derived(() => clock.today);
    const customDays = /* @__PURE__ */ user_derived(() => get(viewState)?.dayCount ?? 7);
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
    const innerMinWidth = /* @__PURE__ */ user_derived(() => GUTTER_W + get(dayCols).length * MIN_COL_W);
    user_effect(() => {
      if (!get(loadRangeCtx)) return;
      const rangeStart = new Date(get(weekStartMs) - 7 * DAY_MS);
      const rangeEnd = new Date(get(weekEndMs) + 7 * DAY_MS);
      get(loadRangeCtx).set({ start: rangeStart, end: rangeEnd });
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
        let find = function(i) {
          while (par[i] !== i) {
            par[i] = par[par[i]];
            i = par[i];
          }
          return i;
        };
        const dayEnd = day.ms + DAY_MS;
        const bandStart = day.ms + get(startHour) * HOUR_MS;
        const bandEnd = day.ms + get(endHour) * HOUR_MS;
        const infos = [];
        for (const ev of events()) {
          if (isAllDay(ev) || isMultiDay(ev)) continue;
          if (ev.id === get(movingId)) continue;
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
            col: 0,
            totalCols: 1
          });
        }
        infos.sort((a, b) => a.startMs - b.startMs || b.endMs - a.endMs);
        const par = infos.map((_, i) => i);
        for (let i = 0; i < infos.length; i++) {
          for (let j = i + 1; j < infos.length; j++) {
            if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
            else break;
          }
        }
        const groups = /* @__PURE__ */ new Map();
        for (let i = 0; i < infos.length; i++) {
          const root2 = find(i);
          if (!groups.has(root2)) groups.set(root2, []);
          groups.get(root2).push(i);
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
          isResizing: inf.isResizing
        })));
      }
      return map;
    });
    const nowIds = /* @__PURE__ */ user_derived(() => {
      const now = clock.tick;
      const s = /* @__PURE__ */ new Set();
      for (const ev of events()) {
        if (ev.start.getTime() <= now && ev.end.getTime() > now) s.add(ev.id);
      }
      return s;
    });
    const nowFracHour = /* @__PURE__ */ user_derived(() => (clock.tick - clock.today) / HOUR_MS);
    const nowY = /* @__PURE__ */ user_derived(() => {
      if (get(nowFracHour) < get(startHour) || get(nowFracHour) > get(endHour)) return null;
      return (get(nowFracHour) - get(startHour)) * HOUR_H;
    });
    const weekIsEmpty = /* @__PURE__ */ user_derived(() => !events().some((ev) => ev.start.getTime() < get(weekEndMs) && ev.end.getTime() > get(weekStartMs)));
    user_effect(() => {
      void get(weekStartMs);
      const el = scrollEl;
      if (!el) return;
      untrack(() => {
        let targetHour;
        if (get(weekHasToday)) {
          const clamped = Math.min(Math.max(get(nowFracHour), get(startHour)), get(endHour));
          targetHour = Math.max(get(startHour), clamped - 1);
        } else {
          targetHour = Math.max(get(startHour), Math.min(8, get(endHour) - 1));
        }
        el.scrollTop = (targetHour - get(startHour)) * HOUR_H;
      });
    });
    function colsRect() {
      return colsEl.getBoundingClientRect();
    }
    function pointerDayIndex(clientX) {
      const r = colsRect();
      const n = get(dayCols).length;
      if (n === 0) return 0;
      const w = r.width / n;
      return Math.max(0, Math.min(n - 1, Math.floor((clientX - r.left) / w)));
    }
    function pointerHour(clientY) {
      return get(startHour) + (clientY - colsRect().top) / HOUR_H;
    }
    function pointerTimeMs(clientX, clientY) {
      const dayMs = get(dayCols)[pointerDayIndex(clientX)]?.ms ?? get(weekStartMs);
      const hour = Math.min(Math.max(pointerHour(clientY), get(startHour)), get(endHour));
      return dayMs + hour * HOUR_MS;
    }
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
        // Only the segment containing the start shows the readout
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
      if (e.pointerType === "touch") {
        longPressTimer = setTimeout(
          () => {
            longPressTimer = null;
            startColsCreate();
          },
          LONG_PRESS_MS
        );
      }
      window.addEventListener("pointermove", onColsCreateMove);
      window.addEventListener("pointerup", onColsCreateUp, { once: true });
      window.addEventListener("pointercancel", onColsCreateCancel, { once: true });
    }
    function onColsCreateMove(e) {
      if (!get(drag)) return;
      if (!crStarted) {
        if (longPressTimer !== null) {
          const moved = Math.hypot(e.clientX - crStartX, e.clientY - crStartY);
          if (moved > LONG_PRESS_TOLERANCE) cleanupColsCreate();
          return;
        }
        if (e.pointerType === "touch") return;
        if (Math.abs(e.clientY - crStartY) < CREATE_THRESHOLD) return;
        startColsCreate();
      }
      const raw = crDayMs + pointerHour(e.clientY) * HOUR_MS;
      const snapped = clampToDayBand(Math.round(raw / get(SNAP_MS)) * get(SNAP_MS), crDayMs);
      get(drag).updatePointer(new Date(Math.min(crAnchorMs, snapped)), new Date(Math.max(crAnchorMs + get(SNAP_MS), snapped)));
    }
    function cleanupColsCreate() {
      clearLongPress();
      removeTouchScrollBlock();
      window.removeEventListener("pointermove", onColsCreateMove);
      window.removeEventListener("pointerup", onColsCreateUp);
      window.removeEventListener("pointercancel", onColsCreateCancel);
      crStarted = false;
    }
    function onColsCreateUp() {
      if (get(drag) && crStarted) {
        suppressColsClick = true;
        get(commitDragCtx)?.();
        setTimeout(
          () => {
            suppressColsClick = false;
          },
          0
        );
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
    function onEventPointerDown(e, ev) {
      if (e.button !== 0) return;
      e.stopPropagation();
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
    function onEvMove(e) {
      const ev = evDragEvent;
      if (!get(drag) || !ev || !evDragMovable) return;
      if (!evDragStarted) {
        const moved = Math.abs(e.clientX - evDragStartX) + Math.abs(e.clientY - evDragStartY);
        if (moved < DRAG_THRESHOLD) return;
        evDragStarted = true;
        get(drag).beginMove(ev.id, ev.start, ev.end);
      }
      const duration2 = ev.end.getTime() - ev.start.getTime();
      const raw = pointerTimeMs(e.clientX, e.clientY) - evGrabOffsetMs;
      const snapped = Math.round(raw / get(SNAP_MS)) * get(SNAP_MS);
      get(drag).updatePointer(new Date(snapped), new Date(snapped + duration2));
    }
    function cleanupEvDrag() {
      window.removeEventListener("pointermove", onEvMove);
      window.removeEventListener("pointerup", onEvUp);
      window.removeEventListener("pointercancel", onEvCancel);
      evDragStarted = false;
      evDragMovable = false;
      evDragEvent = null;
    }
    function onEvUp() {
      if (!evDragStarted && evDragEvent) {
        $$props.oneventclick?.(evDragEvent);
      } else if (evDragStarted && get(drag)) {
        suppressColsClick = true;
        get(commitDragCtx)?.();
        setTimeout(
          () => {
            suppressColsClick = false;
          },
          0
        );
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
      rsStartY = e.clientY;
      rsStarted = false;
      rsEdge = edge;
      rsEvent = ev;
      window.addEventListener("pointermove", onResizeMove);
      window.addEventListener("pointerup", onResizeUp, { once: true });
      window.addEventListener("pointercancel", onResizeCancel, { once: true });
    }
    function onResizeMove(e) {
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
    }
    function cleanupResize() {
      removeTouchScrollBlock();
      window.removeEventListener("pointermove", onResizeMove);
      window.removeEventListener("pointerup", onResizeUp);
      window.removeEventListener("pointercancel", onResizeCancel);
      rsStarted = false;
      rsEvent = null;
    }
    function onResizeUp() {
      if (get(drag) && rsStarted) {
        suppressColsClick = true;
        get(commitDragCtx)?.();
        setTimeout(
          () => {
            suppressColsClick = false;
          },
          0
        );
      } else if (rsEvent && !rsStarted) {
        $$props.oneventclick?.(rsEvent);
      }
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
      window.addEventListener(
        "pointerup",
        () => setTimeout(
          () => {
            suppressColsClick = false;
          },
          0
        ),
        { once: true }
      );
    }
    var div = root_27$2();
    event("keydown", $window, onWindowKeydown);
    let classes_1;
    let styles_1;
    var div_1 = child(div);
    var div_2 = child(div_1);
    let styles_2;
    var div_3 = child(div_2);
    var div_4 = child(div_3);
    var div_5 = child(div_4);
    set_style(div_5, "", {}, { width: "48px" });
    var node_3 = sibling(div_5, 2);
    each(node_3, 17, () => get(dayCols), (day) => day.ms, ($$anchor2, day) => {
      var div_6 = root_7$6();
      let classes_2;
      var span_4 = child(div_6);
      var text_2 = child(span_4, true);
      reset(span_4);
      var node_4 = sibling(span_4, 2);
      {
        var consequent_3 = ($$anchor3) => {
          var span_5 = root_5$6();
          let classes_3;
          var text_3 = child(span_5, true);
          reset(span_5);
          template_effect(() => {
            classes_3 = set_class(span_5, 1, "tw-hd-num svelte-j4rvbp", null, classes_3, { "tw-hd-num--today": get(day).isToday });
            set_text(text_3, get(day).dayNum);
          });
          append($$anchor3, span_5);
        };
        if_block(node_4, ($$render) => {
          if (get(showDates)) $$render(consequent_3);
        });
      }
      var node_5 = sibling(node_4, 2);
      {
        var consequent_4 = ($$anchor3) => {
          var div_7 = root_6$6();
          var node_6 = child(div_7);
          {
            let $0 = /* @__PURE__ */ user_derived(() => ({
              date: new Date(get(day).ms),
              isToday: get(day).isToday,
              dayName: weekdayShort(get(day).ms, $$props.locale)
            }));
            snippet(node_6, () => get(dayHeaderSnippet), () => get($0));
          }
          reset(div_7);
          append($$anchor3, div_7);
        };
        if_block(node_5, ($$render) => {
          if (get(dayHeaderSnippet)) $$render(consequent_4);
        });
      }
      reset(div_6);
      template_effect(
        ($0) => {
          classes_2 = set_class(div_6, 1, "tw-hd svelte-j4rvbp", null, classes_2, { "tw-hd--today": get(day).isToday });
          set_attribute(div_6, "aria-current", get(day).isToday ? "date" : void 0);
          set_text(text_2, $0);
        },
        [() => weekdayShort(get(day).ms, $$props.locale)]
      );
      append($$anchor2, div_6);
    });
    reset(div_4);
    var node_7 = sibling(div_4, 2);
    {
      var consequent_6 = ($$anchor2) => {
        var div_8 = root_10$4();
        var div_9 = child(div_8);
        set_style(div_9, "", {}, { width: "48px" });
        var span_6 = child(div_9);
        var text_4 = child(span_6, true);
        reset(span_6);
        reset(div_9);
        var node_8 = sibling(div_9, 2);
        each(node_8, 17, () => get(dayCols), (day) => day.ms, ($$anchor3, day) => {
          const segs = /* @__PURE__ */ user_derived(() => get(allDayByDay).get(get(day).ms) ?? []);
          const isExpanded = /* @__PURE__ */ user_derived(() => adExpanded[get(day).ms] ?? false);
          const shown = /* @__PURE__ */ user_derived(() => get(isExpanded) ? get(segs) : get(segs).slice(0, ALLDAY_MAX));
          var div_10 = root_9$4();
          let classes_4;
          var node_9 = child(div_10);
          each(node_9, 17, () => get(shown), (seg) => seg.ev.id, ($$anchor4, seg) => {
            allDayChip($$anchor4, () => get(seg));
          });
          var node_10 = sibling(node_9, 2);
          {
            var consequent_5 = ($$anchor4) => {
              var button_1 = root_8$6();
              var text_5 = child(button_1, true);
              reset(button_1);
              template_effect(
                ($0) => {
                  set_attribute(button_1, "aria-expanded", get(isExpanded));
                  set_text(text_5, $0);
                },
                [
                  () => get(isExpanded) ? get(L).showLess : get(L).nMore(get(segs).length - ALLDAY_MAX)
                ]
              );
              delegated("click", button_1, () => {
                adExpanded[get(day).ms] = !get(isExpanded);
              });
              append($$anchor4, button_1);
            };
            if_block(node_10, ($$render) => {
              if (get(segs).length > ALLDAY_MAX) $$render(consequent_5);
            });
          }
          reset(div_10);
          template_effect(() => classes_4 = set_class(div_10, 1, "tw-ad-cell svelte-j4rvbp", null, classes_4, { "tw-ad-cell--today": get(day).isToday }));
          append($$anchor3, div_10);
        });
        reset(div_8);
        template_effect(() => set_text(text_4, get(L).allDay));
        append($$anchor2, div_8);
      };
      if_block(node_7, ($$render) => {
        if (get(hasAllDayRow)) $$render(consequent_6);
      });
    }
    reset(div_3);
    var div_11 = sibling(div_3, 2);
    let styles_3;
    var div_12 = child(div_11);
    set_style(div_12, "", {}, { width: "48px" });
    var node_11 = child(div_12);
    each(node_11, 17, () => ({ length: get(hourCount) }), index, ($$anchor2, _, i) => {
      var fragment_1 = comment();
      var node_12 = first_child(fragment_1);
      {
        var consequent_7 = ($$anchor3) => {
          var span_7 = root_11$4();
          set_style(span_7, "", {}, { top: `${i * HOUR_H}px` });
          var text_6 = child(span_7, true);
          reset(span_7);
          template_effect(($0) => set_text(text_6, $0), [() => fmtH(get(startHour) + i, $$props.locale)]);
          append($$anchor3, span_7);
        };
        if_block(node_12, ($$render) => {
          if (i > 0) $$render(consequent_7);
        });
      }
      append($$anchor2, fragment_1);
    });
    var node_13 = sibling(node_11, 2);
    {
      var consequent_8 = ($$anchor2) => {
        var span_8 = root_12$4();
        let styles_4;
        template_effect(() => styles_4 = set_style(span_8, "", styles_4, { top: `${get(nowY) ?? ""}px` }));
        append($$anchor2, span_8);
      };
      if_block(node_13, ($$render) => {
        if (get(nowY) !== null && get(weekHasToday)) $$render(consequent_8);
      });
    }
    reset(div_12);
    var div_13 = sibling(div_12, 2);
    var div_14 = child(div_13);
    each(div_14, 21, () => ({ length: get(hourCount) }), index, ($$anchor2, _, i) => {
      var fragment_2 = root_13$3();
      var div_15 = first_child(fragment_2);
      set_style(div_15, "", {}, { top: `${i * HOUR_H}px` });
      var div_16 = sibling(div_15, 2);
      set_style(div_16, "", {}, { top: `${i * HOUR_H + HOUR_H / 2}px` });
      append($$anchor2, fragment_2);
    });
    reset(div_14);
    var node_14 = sibling(div_14, 2);
    each(node_14, 17, () => get(dayCols), (day) => day.ms, ($$anchor2, day) => {
      const positioned = /* @__PURE__ */ user_derived(() => get(layoutByDay).get(get(day).ms) ?? []);
      const ghost = /* @__PURE__ */ user_derived(() => ghostForDay(get(day).ms));
      var div_17 = root_25$2();
      let classes_5;
      var node_15 = child(div_17);
      {
        var consequent_12 = ($$anchor3) => {
          var fragment_3 = comment();
          var node_16 = first_child(fragment_3);
          each(node_16, 17, () => get(blockedSlots), index, ($$anchor4, slot) => {
            var fragment_4 = comment();
            var node_17 = first_child(fragment_4);
            {
              var consequent_11 = ($$anchor5) => {
                const s = /* @__PURE__ */ user_derived(() => Math.max(get(slot).start, get(startHour)));
                const e = /* @__PURE__ */ user_derived(() => Math.min(get(slot).end, get(endHour)));
                var fragment_5 = comment();
                var node_18 = first_child(fragment_5);
                {
                  var consequent_10 = ($$anchor6) => {
                    const range = /* @__PURE__ */ user_derived(() => blockedRangeLabel(get(day).ms, get(slot).start, get(slot).end));
                    var div_18 = root_15$3();
                    let styles_5;
                    var node_19 = child(div_18);
                    {
                      var consequent_9 = ($$anchor7) => {
                        var span_9 = root_14$3();
                        var text_7 = child(span_9, true);
                        reset(span_9);
                        template_effect(() => set_text(text_7, get(slot).label));
                        append($$anchor7, span_9);
                      };
                      if_block(node_19, ($$render) => {
                        if (get(slot).label) $$render(consequent_9);
                      });
                    }
                    reset(div_18);
                    template_effect(() => {
                      set_attribute(div_18, "title", `${get(slot).label ? `${get(slot).label}, ` : ""}${get(range) ?? ""}`);
                      set_attribute(div_18, "aria-label", `${(get(slot).label || "Unavailable") ?? ""}, ${get(range) ?? ""}`);
                      styles_5 = set_style(div_18, "", styles_5, {
                        top: `${(get(s) - get(startHour)) * HOUR_H}px`,
                        height: `${(get(e) - get(s)) * HOUR_H}px`
                      });
                    });
                    append($$anchor6, div_18);
                  };
                  if_block(node_18, ($$render) => {
                    if (get(e) > get(s)) $$render(consequent_10);
                  });
                }
                append($$anchor5, fragment_5);
              };
              if_block(node_17, ($$render) => {
                if (!get(slot).day || get(slot).day === get(day).isoDay) $$render(consequent_11);
              });
            }
            append($$anchor4, fragment_4);
          });
          append($$anchor3, fragment_3);
        };
        if_block(node_15, ($$render) => {
          if (get(blockedSlots)?.length) $$render(consequent_12);
        });
      }
      var node_20 = sibling(node_15, 2);
      each(node_20, 17, () => get(positioned), (p) => p.ev.id, ($$anchor3, p) => {
        const isCurrent = /* @__PURE__ */ user_derived(() => get(nowIds).has(get(p).ev.id));
        var div_19 = root_20$3();
        let classes_6;
        let styles_6;
        var div_20 = sibling(child(div_19), 2);
        var node_21 = child(div_20);
        EventContent(node_21, {
          get event() {
            return get(p).ev;
          },
          children: ($$anchor4, $$slotProps) => {
            var fragment_6 = root_17$3();
            var span_10 = first_child(fragment_6);
            var text_8 = child(span_10);
            reset(span_10);
            var span_11 = sibling(span_10, 2);
            var text_9 = child(span_11, true);
            reset(span_11);
            var node_22 = sibling(span_11, 2);
            {
              var consequent_13 = ($$anchor5) => {
                var span_12 = root_16$3();
                var text_10 = child(span_12, true);
                reset(span_12);
                template_effect(() => set_text(text_10, get(p).ev.location));
                append($$anchor5, span_12);
              };
              if_block(node_22, ($$render) => {
                if (get(p).ev.location && get(p).height > 56) $$render(consequent_13);
              });
            }
            template_effect(
              ($0, $1) => {
                set_text(text_8, `${$0 ?? ""} – ${$1 ?? ""}`);
                set_text(text_9, get(p).ev.title);
              },
              [
                () => fmtTime$1(get(p).ev.start, $$props.locale),
                () => fmtTime$1(get(p).ev.end, $$props.locale)
              ]
            );
            append($$anchor4, fragment_6);
          },
          $$slots: { default: true }
        });
        reset(div_20);
        var node_23 = sibling(div_20, 2);
        {
          var consequent_14 = ($$anchor4) => {
            var span_13 = root_18$3();
            append($$anchor4, span_13);
          };
          if_block(node_23, ($$render) => {
            if (get(isCurrent)) $$render(consequent_14);
          });
        }
        var node_24 = sibling(node_23, 2);
        {
          var consequent_15 = ($$anchor4) => {
            var fragment_7 = root_19$3();
            var span_14 = first_child(fragment_7);
            var span_15 = sibling(span_14, 2);
            delegated("pointerdown", span_14, (e) => onResizePointerDown(e, get(p).ev, "start"));
            delegated("pointerdown", span_15, (e) => onResizePointerDown(e, get(p).ev, "end"));
            append($$anchor4, fragment_7);
          };
          if_block(node_24, ($$render) => {
            if (!readOnly() && !get(p).ev.data?.readOnly) $$render(consequent_15);
          });
        }
        reset(div_19);
        template_effect(
          ($0, $1, $2, $3) => {
            classes_6 = set_class(div_19, 1, "tw-ev svelte-j4rvbp", null, classes_6, {
              "tw-ev--selected": selectedEventId() === get(p).ev.id,
              "tw-ev--current": get(isCurrent),
              "tw-ev--resizing": get(p).isResizing,
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
          },
          [
            () => fmtTime$1(get(p).ev.start, $$props.locale),
            () => fmtTime$1(get(p).ev.end, $$props.locale),
            () => fmtDuration(get(p).ev.start, get(p).ev.end),
            () => statusText(get(p).ev)
          ]
        );
        delegated("pointerdown", div_19, (e) => onEventPointerDown(e, get(p).ev));
        event("pointerenter", div_19, () => get(oneventhover)?.(get(p).ev));
        delegated("keydown", div_19, (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            $$props.oneventclick?.(get(p).ev);
          }
        });
        append($$anchor3, div_19);
      });
      var node_25 = sibling(node_20, 2);
      {
        var consequent_18 = ($$anchor3) => {
          var div_21 = root_23$2();
          let classes_7;
          let styles_7;
          var node_26 = child(div_21);
          {
            var consequent_17 = ($$anchor4) => {
              var fragment_8 = root_22$2();
              var span_16 = first_child(fragment_8);
              var text_11 = child(span_16);
              reset(span_16);
              var node_27 = sibling(span_16, 2);
              {
                var consequent_16 = ($$anchor5) => {
                  var span_17 = root_21$3();
                  var text_12 = child(span_17, true);
                  reset(span_17);
                  template_effect(() => set_text(text_12, get(movingEvent).title));
                  append($$anchor5, span_17);
                };
                if_block(node_27, ($$render) => {
                  if (!get(ghost).create && get(movingEvent)) $$render(consequent_16);
                });
              }
              template_effect(($0, $1) => set_text(text_11, `${$0 ?? ""} – ${$1 ?? ""}`), [
                () => fmtTime$1(get(ghost).start, $$props.locale),
                () => fmtTime$1(get(ghost).end, $$props.locale)
              ]);
              append($$anchor4, fragment_8);
            };
            if_block(node_26, ($$render) => {
              if (get(ghost).showTime) $$render(consequent_17);
            });
          }
          reset(div_21);
          template_effect(() => {
            classes_7 = set_class(div_21, 1, "tw-ghost svelte-j4rvbp", null, classes_7, { "tw-ghost--create": get(ghost).create });
            styles_7 = set_style(div_21, "", styles_7, {
              top: `${get(ghost).top ?? ""}px`,
              height: `${get(ghost).height ?? ""}px`,
              "--ev-color": get(ghost).create ? "var(--dt-accent, #2563eb)" : get(movingEvent)?.color ?? "var(--dt-accent, #2563eb)"
            });
          });
          append($$anchor3, div_21);
        };
        if_block(node_25, ($$render) => {
          if (get(ghost)) $$render(consequent_18);
        });
      }
      var node_28 = sibling(node_25, 2);
      {
        var consequent_19 = ($$anchor3) => {
          var div_22 = root_24$2();
          let styles_8;
          template_effect(() => {
            set_attribute(div_22, "aria-label", get(L).currentTime);
            styles_8 = set_style(div_22, "", styles_8, { top: `${get(nowY) ?? ""}px` });
          });
          append($$anchor3, div_22);
        };
        if_block(node_28, ($$render) => {
          if (get(day).isToday && get(nowY) !== null) $$render(consequent_19);
        });
      }
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
      append($$anchor2, div_17);
    });
    reset(div_13);
    bind_this(div_13, ($$value) => colsEl = $$value, () => colsEl);
    reset(div_11);
    reset(div_2);
    reset(div_1);
    bind_this(div_1, ($$value) => scrollEl = $$value, () => scrollEl);
    var node_29 = sibling(div_1, 2);
    {
      var consequent_20 = ($$anchor2) => {
        var div_23 = root_26$2();
        var node_30 = child(div_23);
        snippet(node_30, () => ctx.emptySnippet);
        reset(div_23);
        append($$anchor2, div_23);
      };
      if_block(node_29, ($$render) => {
        if (get(weekIsEmpty) && ctx.emptySnippet) $$render(consequent_20);
      });
    }
    reset(div);
    template_effect(() => {
      classes_1 = set_class(div, 1, "tw svelte-j4rvbp", null, classes_1, { "tw--auto": get(autoHeight) });
      styles_1 = set_style(div, style() || void 0, styles_1, {
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
  delegate(["click", "pointerdown", "contextmenu", "keydown"]);
  var rest_excludes$2 = /* @__PURE__ */ new Set(["$$slots", "$$events", "$$legacy", "mode"]);
  function Planner($$anchor, $$props) {
    let mode = prop($$props, "mode", 3, "week"), rest = /* @__PURE__ */ rest_props($$props, rest_excludes$2);
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        PlannerDay($$anchor2, spread_props(() => rest));
      };
      var alternate = ($$anchor2) => {
        PlannerWeek($$anchor2, spread_props(() => rest));
      };
      if_block(node, ($$render) => {
        if (mode() === "day") $$render(consequent);
        else $$render(alternate, -1);
      });
    }
    append($$anchor, fragment);
  }
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
      } else {
        slots.push({
          startMs: ev.start.getTime(),
          endMs: ev.end.getTime(),
          events: [ev]
        });
      }
    }
    return slots;
  }
  var root$4 = /* @__PURE__ */ from_html(`<span class="ag-day-head-badge svelte-n8lbn1"> </span>`);
  var root_1$5 = /* @__PURE__ */ from_html(`<span class="ag-day-head-badge ag-day-head-badge--muted svelte-n8lbn1"> </span>`);
  var root_2$5 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-allday-dot svelte-n8lbn1"></span> <span class="ag-allday-title svelte-n8lbn1"> </span></button>`);
  var root_3$5 = /* @__PURE__ */ from_html(`<div class="ag-allday svelte-n8lbn1"><div class="ag-allday-label svelte-n8lbn1"> </div> <div class="ag-allday-items svelte-n8lbn1"></div></div>`);
  var root_4$5 = /* @__PURE__ */ from_html(`<div class="ag-q-empty svelte-n8lbn1"><!></div>`);
  var root_5$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-sub svelte-n8lbn1"> </span>`);
  var root_6$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-tag svelte-n8lbn1"> </span>`);
  var root_7$5 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-dot svelte-n8lbn1"></span> <span class="ag-compact-row-time svelte-n8lbn1"> </span> <div class="ag-compact-row-main svelte-n8lbn1"><span class="ag-compact-row-title svelte-n8lbn1"> </span> <!> <!></div> <span class="ag-compact-row-dur svelte-n8lbn1"> </span>`, 1);
  var root_8$5 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
  var root_9$3 = /* @__PURE__ */ from_html(`<div class="ag-compact-list svelte-n8lbn1"><!></div>`);
  var root_10$3 = /* @__PURE__ */ from_html(`<div class="ag-q-now-sub svelte-n8lbn1"> </div>`);
  var root_11$3 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-q-now-dot svelte-n8lbn1"></div> <div class="ag-q-now-title svelte-n8lbn1"> </div> <!> <div class="ag-q-now-time svelte-n8lbn1"> </div> <div class="ag-q-now-track svelte-n8lbn1"><div class="ag-q-now-fill svelte-n8lbn1"></div></div></button>`);
  var root_12$3 = /* @__PURE__ */ from_html(`<div class="ag-q-free svelte-n8lbn1"><div class="ag-q-free-label svelte-n8lbn1"> </div></div>`);
  var root_13$2 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-q-done-check svelte-n8lbn1">✓</span> <span class="ag-q-done-title svelte-n8lbn1"> </span></button>`);
  var root_14$2 = /* @__PURE__ */ from_html(`<button type="button" class="ag-q-done-toggle svelte-n8lbn1"> </button>`);
  var root_15$2 = /* @__PURE__ */ from_html(`<div class="ag-q-done-section svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> </div> <!> <!></div>`);
  var root_16$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-row-dot svelte-n8lbn1"></span> <span class="ag-compact-row-time svelte-n8lbn1"> </span> <div class="ag-compact-row-main svelte-n8lbn1"><span class="ag-compact-row-title svelte-n8lbn1"> </span> <!></div>`, 1);
  var root_17$2 = /* @__PURE__ */ from_html(`<span class="ag-card-sub svelte-n8lbn1"> </span>`);
  var root_18$2 = /* @__PURE__ */ from_html(`<span class="ag-card-tag svelte-n8lbn1"> </span>`);
  var root_19$2 = /* @__PURE__ */ from_html(`<div class="ag-card-tags svelte-n8lbn1"></div>`);
  var root_20$2 = /* @__PURE__ */ from_html(`<div class="ag-card-top svelte-n8lbn1"><span class="ag-card-title svelte-n8lbn1"> </span> <span class="ag-card-eta svelte-n8lbn1"> </span></div> <!> <div class="ag-card-meta svelte-n8lbn1"> <span class="ag-card-dur svelte-n8lbn1"> </span></div> <!>`, 1);
  var root_21$2 = /* @__PURE__ */ from_html(`<button type="button"><div class="ag-card-body svelte-n8lbn1"><!></div></button>`);
  var root_22$1 = /* @__PURE__ */ from_html(`<div class="ag-q svelte-n8lbn1"><div class="ag-q-status svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> <span class="ag-q-clock svelte-n8lbn1"> </span></div> <!> <!></div> <div class="ag-q-queue svelte-n8lbn1"><div class="ag-q-label svelte-n8lbn1"> </div> <!></div></div>`);
  var root_23$1 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-log-check svelte-n8lbn1">✓</span> <span class="ag-log-time svelte-n8lbn1"> </span> <span class="ag-log-dot svelte-n8lbn1"></span> <span class="ag-log-title svelte-n8lbn1"> </span> <span class="ag-log-dur svelte-n8lbn1"> </span></button>`);
  var root_24$1 = /* @__PURE__ */ from_html(`<div class="ag-log svelte-n8lbn1"><!></div>`);
  var root_25$1 = /* @__PURE__ */ from_html(`<span class="ag-card-loc svelte-n8lbn1"> </span>`);
  var root_26$1 = /* @__PURE__ */ from_html(`<div class="ag-card-top svelte-n8lbn1"><span class="ag-card-order svelte-n8lbn1"> </span> <span class="ag-card-title svelte-n8lbn1"> </span></div> <!> <!> <div class="ag-card-meta svelte-n8lbn1"> <span class="ag-card-dur svelte-n8lbn1"> </span></div> <!>`, 1);
  var root_27$1 = /* @__PURE__ */ from_html(`<div class="ag-plan svelte-n8lbn1"><!></div>`);
  var root_28$1 = /* @__PURE__ */ from_html(`<div><div class="ag-body svelte-n8lbn1" role="group"><div class="ag-day-head svelte-n8lbn1"><!> <span class="ag-day-head-name svelte-n8lbn1"> </span> <span class="ag-day-head-date svelte-n8lbn1"> </span></div> <!> <!></div></div>`);
  function AgendaDay($$anchor, $$props) {
    push($$props, true);
    const ctx = useCalendarContext();
    const L = /* @__PURE__ */ user_derived(() => ctx.labels);
    const emptySnippet = /* @__PURE__ */ user_derived(() => ctx.emptySnippet);
    let events = prop($$props, "events", 19, () => []), style = prop($$props, "style", 3, ""), selectedEventId = prop($$props, "selectedEventId", 3, null);
    const clock = createClock(ctx.timezone);
    const viewState = /* @__PURE__ */ user_derived(() => ctx.viewState);
    const equalDays = /* @__PURE__ */ user_derived(() => ctx.equalDays);
    const isMobile = /* @__PURE__ */ user_derived(() => ctx.isMobile);
    const autoHeight = /* @__PURE__ */ user_derived(() => ctx.autoHeight);
    const compact = /* @__PURE__ */ user_derived(() => ctx.compact);
    const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
    const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeActive = false;
    const SWIPE_THRESHOLD2 = 50;
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
      if (Math.abs(dx) > SWIPE_THRESHOLD2 && Math.abs(dx) > Math.abs(dy) * 1.4) {
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
    const dayEvents = /* @__PURE__ */ user_derived(() => {
      return events().filter((ev) => ev.start.getTime() < get(dayEnd) && ev.end.getTime() > get(dayMs)).sort((a, b) => a.start.getTime() - b.start.getTime());
    });
    const allDayBanner = /* @__PURE__ */ user_derived(() => get(dayEvents).filter((ev) => isAllDay(ev) || isMultiDay(ev)));
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
    const upcomingNext = /* @__PURE__ */ user_derived(() => {
      const all = [];
      for (const slot of get(dayCat).upcomingSlots) {
        for (const ev of slot.events) all.push(ev);
      }
      return all;
    });
    const UPCOMING_CARDS = 4;
    const DONE_VISIBLE = 3;
    let showAllDone = /* @__PURE__ */ state(false);
    const visibleDone = /* @__PURE__ */ user_derived(() => get(showAllDone) ? get(dayCat).past : get(dayCat).past.slice(-DONE_VISIBLE));
    const hiddenDoneCount = /* @__PURE__ */ user_derived(() => get(showAllDone) ? 0 : Math.max(0, get(dayCat).past.length - DONE_VISIBLE));
    var div = root_28$1();
    let classes;
    let styles;
    var div_1 = child(div);
    var div_2 = child(div_1);
    var node = child(div_2);
    {
      var consequent = ($$anchor2) => {
        var span = root$4();
        var text2 = child(span, true);
        reset(span);
        template_effect(() => set_text(text2, get(L).today));
        append($$anchor2, span);
      };
      var consequent_1 = ($$anchor2) => {
        var span_1 = root_1$5();
        var text_1 = child(span_1, true);
        reset(span_1);
        template_effect(() => set_text(text_1, get(L).tomorrow));
        append($$anchor2, span_1);
      };
      if_block(node, ($$render) => {
        if (!get(equalDays) && get(isToday)) $$render(consequent);
        else if (!get(equalDays) && get(isTomorrow)) $$render(consequent_1, 1);
      });
    }
    var span_2 = sibling(node, 2);
    var text_2 = child(span_2, true);
    reset(span_2);
    var span_3 = sibling(span_2, 2);
    var text_3 = child(span_3);
    reset(span_3);
    reset(div_2);
    var node_1 = sibling(div_2, 2);
    {
      var consequent_2 = ($$anchor2) => {
        var div_3 = root_3$5();
        var div_4 = child(div_3);
        var text_4 = child(div_4, true);
        reset(div_4);
        var div_5 = sibling(div_4, 2);
        each(div_5, 21, () => get(allDayBanner), (ev) => ev.id, ($$anchor3, ev) => {
          var button = root_2$5();
          let classes_1;
          let styles_1;
          var span_4 = sibling(child(button), 2);
          var text_5 = child(span_4, true);
          reset(span_4);
          reset(button);
          template_effect(() => {
            classes_1 = set_class(button, 1, "ag-allday-chip svelte-n8lbn1", null, classes_1, {
              "ag-allday-chip--selected": selectedEventId() === get(ev).id
            });
            set_attribute(button, "aria-label", `${get(ev).title ?? ""}, ${get(L).allDay ?? ""}`);
            styles_1 = set_style(button, "", styles_1, { "--ev-color": get(ev).color || "var(--dt-accent)" });
            set_text(text_5, get(ev).title);
          });
          delegated("click", button, () => handleClick(get(ev)));
          event("pointerenter", button, () => get(oneventhover)?.(get(ev)));
          append($$anchor3, button);
        });
        reset(div_5);
        reset(div_3);
        template_effect(() => set_text(text_4, get(L).allDay));
        append($$anchor2, div_3);
      };
      if_block(node_1, ($$render) => {
        if (get(allDayBanner).length > 0) $$render(consequent_2);
      });
    }
    var node_2 = sibling(node_1, 2);
    {
      var consequent_7 = ($$anchor2) => {
        var div_6 = root_9$3();
        var node_3 = child(div_6);
        {
          var consequent_4 = ($$anchor3) => {
            var div_7 = root_4$5();
            var node_4 = child(div_7);
            {
              var consequent_3 = ($$anchor4) => {
                var fragment = comment();
                var node_5 = first_child(fragment);
                snippet(node_5, () => get(emptySnippet));
                append($$anchor4, fragment);
              };
              var alternate = ($$anchor4) => {
                var text_6 = text();
                template_effect(() => set_text(text_6, get(L).nothingScheduledYet));
                append($$anchor4, text_6);
              };
              if_block(node_4, ($$render) => {
                if (get(emptySnippet)) $$render(consequent_3);
                else $$render(alternate, -1);
              });
            }
            reset(div_7);
            append($$anchor3, div_7);
          };
          var alternate_1 = ($$anchor3) => {
            var fragment_2 = comment();
            var node_6 = first_child(fragment_2);
            each(node_6, 17, () => get(timedDayEvents), (ev) => ev.id, ($$anchor4, ev) => {
              var button_1 = root_8$5();
              let classes_2;
              let styles_2;
              var node_7 = child(button_1);
              EventContent(node_7, {
                get event() {
                  return get(ev);
                },
                children: ($$anchor5, $$slotProps) => {
                  var fragment_3 = root_7$5();
                  var span_5 = sibling(first_child(fragment_3), 2);
                  var text_7 = child(span_5, true);
                  reset(span_5);
                  var div_8 = sibling(span_5, 2);
                  var span_6 = child(div_8);
                  var text_8 = child(span_6, true);
                  reset(span_6);
                  var node_8 = sibling(span_6, 2);
                  {
                    var consequent_5 = ($$anchor6) => {
                      var span_7 = root_5$5();
                      var text_9 = child(span_7, true);
                      reset(span_7);
                      template_effect(() => set_text(text_9, get(ev).subtitle));
                      append($$anchor6, span_7);
                    };
                    if_block(node_8, ($$render) => {
                      if (get(ev).subtitle) $$render(consequent_5);
                    });
                  }
                  var node_9 = sibling(node_8, 2);
                  {
                    var consequent_6 = ($$anchor6) => {
                      var fragment_4 = comment();
                      var node_10 = first_child(fragment_4);
                      each(node_10, 17, () => get(ev).tags, index, ($$anchor7, tag) => {
                        var span_8 = root_6$5();
                        var text_10 = child(span_8, true);
                        reset(span_8);
                        template_effect(() => set_text(text_10, get(tag)));
                        append($$anchor7, span_8);
                      });
                      append($$anchor6, fragment_4);
                    };
                    if_block(node_9, ($$render) => {
                      if (get(ev).tags?.length) $$render(consequent_6);
                    });
                  }
                  reset(div_8);
                  var span_9 = sibling(div_8, 2);
                  var text_11 = child(span_9, true);
                  reset(span_9);
                  template_effect(
                    ($0, $1) => {
                      set_text(text_7, $0);
                      set_text(text_8, get(ev).title);
                      set_text(text_11, $1);
                    },
                    [() => fmt(get(ev).start), () => duration(get(ev))]
                  );
                  append($$anchor5, fragment_3);
                },
                $$slots: { default: true }
              });
              reset(button_1);
              template_effect(
                ($0, $1) => {
                  classes_2 = set_class(button_1, 1, "ag-compact-row svelte-n8lbn1", null, classes_2, {
                    "ag-compact-row--selected": selectedEventId() === get(ev).id,
                    "ag-compact-row--cancelled": get(ev).status === "cancelled",
                    "ag-compact-row--tentative": get(ev).status === "tentative"
                  });
                  set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
                  styles_2 = set_style(button_1, "", styles_2, { "--ev-color": get(ev).color || "var(--dt-accent)" });
                },
                [() => fmt(get(ev).start), () => duration(get(ev))]
              );
              delegated("click", button_1, () => handleClick(get(ev)));
              event("pointerenter", button_1, () => get(oneventhover)?.(get(ev)));
              append($$anchor4, button_1);
            });
            append($$anchor3, fragment_2);
          };
          if_block(node_3, ($$render) => {
            if (get(timedDayEvents).length === 0 && get(allDayBanner).length === 0) $$render(consequent_4);
            else $$render(alternate_1, -1);
          });
        }
        reset(div_6);
        append($$anchor2, div_6);
      };
      var consequent_18 = ($$anchor2) => {
        var div_9 = root_22$1();
        var div_10 = child(div_9);
        var div_11 = child(div_10);
        var text_12 = child(div_11);
        var span_10 = sibling(text_12);
        var text_13 = child(span_10, true);
        reset(span_10);
        reset(div_11);
        var node_11 = sibling(div_11, 2);
        {
          var consequent_9 = ($$anchor3) => {
            var fragment_5 = comment();
            var node_12 = first_child(fragment_5);
            each(node_12, 17, () => get(dayCat).current, (ev) => ev.id, ($$anchor4, ev) => {
              var button_2 = root_11$3();
              let classes_3;
              let styles_3;
              var div_12 = sibling(child(button_2), 2);
              var text_14 = child(div_12, true);
              reset(div_12);
              var node_13 = sibling(div_12, 2);
              {
                var consequent_8 = ($$anchor5) => {
                  var div_13 = root_10$3();
                  var text_15 = child(div_13, true);
                  reset(div_13);
                  template_effect(() => set_text(text_15, get(ev).subtitle));
                  append($$anchor5, div_13);
                };
                if_block(node_13, ($$render) => {
                  if (get(ev).subtitle) $$render(consequent_8);
                });
              }
              var div_14 = sibling(node_13, 2);
              var text_16 = child(div_14);
              reset(div_14);
              var div_15 = sibling(div_14, 2);
              var div_16 = child(div_15);
              let styles_4;
              reset(div_15);
              reset(button_2);
              template_effect(
                ($0, $1, $2) => {
                  classes_3 = set_class(button_2, 1, "ag-q-now svelte-n8lbn1", null, classes_3, { "ag-q-now--selected": selectedEventId() === get(ev).id });
                  set_attribute(button_2, "aria-label", `${get(ev).title ?? ""}, ${get(L).happeningNow ?? ""}, ${$0 ?? ""}`);
                  styles_3 = set_style(button_2, "", styles_3, { "--ev-color": get(ev).color || "var(--dt-accent)" });
                  set_text(text_14, get(ev).title);
                  set_text(text_16, `${get(L).until ?? ""} ${$1 ?? ""}`);
                  styles_4 = set_style(div_16, "", styles_4, $2);
                },
                [
                  () => get(L).percentComplete(Math.round(prog(get(ev)) * 100)),
                  () => fmt(get(ev).end),
                  () => ({ transform: `scaleX(${prog(get(ev)) ?? ""})` })
                ]
              );
              delegated("click", button_2, () => handleClick(get(ev)));
              event("pointerenter", button_2, () => get(oneventhover)?.(get(ev)));
              append($$anchor4, button_2);
            });
            append($$anchor3, fragment_5);
          };
          var alternate_2 = ($$anchor3) => {
            var div_17 = root_12$3();
            var div_18 = child(div_17);
            var text_17 = child(div_18, true);
            reset(div_18);
            reset(div_17);
            template_effect(() => set_text(text_17, get(L).free));
            append($$anchor3, div_17);
          };
          if_block(node_11, ($$render) => {
            if (get(dayCat).current.length > 0) $$render(consequent_9);
            else $$render(alternate_2, -1);
          });
        }
        var node_14 = sibling(node_11, 2);
        {
          var consequent_11 = ($$anchor3) => {
            var div_19 = root_15$2();
            var div_20 = child(div_19);
            var text_18 = child(div_20, true);
            reset(div_20);
            var node_15 = sibling(div_20, 2);
            each(node_15, 17, () => get(visibleDone), (ev) => ev.id, ($$anchor4, ev) => {
              var button_3 = root_13$2();
              let classes_4;
              var span_11 = sibling(child(button_3), 2);
              var text_19 = child(span_11, true);
              reset(span_11);
              reset(button_3);
              template_effect(
                ($0) => {
                  classes_4 = set_class(button_3, 1, "ag-q-done-item svelte-n8lbn1", null, classes_4, {
                    "ag-q-done-item--selected": selectedEventId() === get(ev).id
                  });
                  set_attribute(button_3, "aria-label", `${get(ev).title ?? ""}, ${get(L).completed ?? ""}, ${$0 ?? ""}`);
                  set_text(text_19, get(ev).title);
                },
                [() => fmt(get(ev).start)]
              );
              delegated("click", button_3, () => handleClick(get(ev)));
              append($$anchor4, button_3);
            });
            var node_16 = sibling(node_15, 2);
            {
              var consequent_10 = ($$anchor4) => {
                var button_4 = root_14$2();
                var text_20 = child(button_4, true);
                reset(button_4);
                template_effect(($0) => set_text(text_20, $0), [
                  () => get(showAllDone) ? get(L).showLess : get(L).nCompleted(get(hiddenDoneCount))
                ]);
                delegated("click", button_4, () => set(showAllDone, !get(showAllDone)));
                append($$anchor4, button_4);
              };
              if_block(node_16, ($$render) => {
                if (get(hiddenDoneCount) > 0) $$render(consequent_10);
              });
            }
            reset(div_19);
            template_effect(() => set_text(text_18, get(L).done));
            append($$anchor3, div_19);
          };
          if_block(node_14, ($$render) => {
            if (get(dayCat).past.length > 0) $$render(consequent_11);
          });
        }
        reset(div_10);
        var div_21 = sibling(div_10, 2);
        var div_22 = child(div_21);
        var text_21 = child(div_22, true);
        reset(div_22);
        var node_17 = sibling(div_22, 2);
        {
          var consequent_13 = ($$anchor3) => {
            var div_23 = root_4$5();
            var node_18 = child(div_23);
            {
              var consequent_12 = ($$anchor4) => {
                var fragment_6 = comment();
                var node_19 = first_child(fragment_6);
                snippet(node_19, () => get(emptySnippet));
                append($$anchor4, fragment_6);
              };
              var alternate_3 = ($$anchor4) => {
                var text_22 = text();
                template_effect(() => set_text(text_22, get(dayCat).past.length > 0 ? get(L).allDoneForToday : get(L).nothingScheduled));
                append($$anchor4, text_22);
              };
              if_block(node_18, ($$render) => {
                if (get(emptySnippet)) $$render(consequent_12);
                else $$render(alternate_3, -1);
              });
            }
            reset(div_23);
            append($$anchor3, div_23);
          };
          var alternate_5 = ($$anchor3) => {
            var fragment_8 = comment();
            var node_20 = first_child(fragment_8);
            each(node_20, 19, () => get(upcomingNext), (ev) => ev.id, ($$anchor4, ev, i) => {
              var fragment_9 = comment();
              var node_21 = first_child(fragment_9);
              {
                var consequent_15 = ($$anchor5) => {
                  var button_5 = root_8$5();
                  let classes_5;
                  let styles_5;
                  var node_22 = child(button_5);
                  EventContent(node_22, {
                    get event() {
                      return get(ev);
                    },
                    children: ($$anchor6, $$slotProps) => {
                      var fragment_10 = root_16$2();
                      var span_12 = sibling(first_child(fragment_10), 2);
                      var text_23 = child(span_12, true);
                      reset(span_12);
                      var div_24 = sibling(span_12, 2);
                      var span_13 = child(div_24);
                      var text_24 = child(span_13, true);
                      reset(span_13);
                      var node_23 = sibling(span_13, 2);
                      {
                        var consequent_14 = ($$anchor7) => {
                          var span_14 = root_5$5();
                          var text_25 = child(span_14, true);
                          reset(span_14);
                          template_effect(() => set_text(text_25, get(ev).subtitle));
                          append($$anchor7, span_14);
                        };
                        if_block(node_23, ($$render) => {
                          if (get(ev).subtitle) $$render(consequent_14);
                        });
                      }
                      reset(div_24);
                      template_effect(
                        ($0) => {
                          set_text(text_23, $0);
                          set_text(text_24, get(ev).title);
                        },
                        [() => fmt(get(ev).start)]
                      );
                      append($$anchor6, fragment_10);
                    },
                    $$slots: { default: true }
                  });
                  reset(button_5);
                  template_effect(
                    ($0, $1) => {
                      classes_5 = set_class(button_5, 1, "ag-compact-row ag-compact-row--queue svelte-n8lbn1", null, classes_5, {
                        "ag-compact-row--selected": selectedEventId() === get(ev).id
                      });
                      set_attribute(button_5, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
                      styles_5 = set_style(button_5, "", styles_5, { "--ev-color": get(ev).color || "var(--dt-accent)" });
                    },
                    [() => fmt(get(ev).start), () => duration(get(ev))]
                  );
                  delegated("click", button_5, () => handleClick(get(ev)));
                  event("pointerenter", button_5, () => get(oneventhover)?.(get(ev)));
                  append($$anchor5, button_5);
                };
                var alternate_4 = ($$anchor5) => {
                  var button_6 = root_21$2();
                  let classes_6;
                  let styles_6;
                  var div_25 = child(button_6);
                  var node_24 = child(div_25);
                  EventContent(node_24, {
                    get event() {
                      return get(ev);
                    },
                    children: ($$anchor6, $$slotProps) => {
                      var fragment_11 = root_20$2();
                      var div_26 = first_child(fragment_11);
                      var span_15 = child(div_26);
                      var text_26 = child(span_15, true);
                      reset(span_15);
                      var span_16 = sibling(span_15, 2);
                      var text_27 = child(span_16, true);
                      reset(span_16);
                      reset(div_26);
                      var node_25 = sibling(div_26, 2);
                      {
                        var consequent_16 = ($$anchor7) => {
                          var span_17 = root_17$2();
                          var text_28 = child(span_17, true);
                          reset(span_17);
                          template_effect(() => set_text(text_28, get(ev).subtitle));
                          append($$anchor7, span_17);
                        };
                        if_block(node_25, ($$render) => {
                          if (get(ev).subtitle) $$render(consequent_16);
                        });
                      }
                      var div_27 = sibling(node_25, 2);
                      var text_29 = child(div_27);
                      var span_18 = sibling(text_29);
                      var text_30 = child(span_18, true);
                      reset(span_18);
                      reset(div_27);
                      var node_26 = sibling(div_27, 2);
                      {
                        var consequent_17 = ($$anchor7) => {
                          var div_28 = root_19$2();
                          each(div_28, 21, () => get(ev).tags, index, ($$anchor8, tag) => {
                            var span_19 = root_18$2();
                            var text_31 = child(span_19, true);
                            reset(span_19);
                            template_effect(() => set_text(text_31, get(tag)));
                            append($$anchor8, span_19);
                          });
                          reset(div_28);
                          append($$anchor7, div_28);
                        };
                        if_block(node_26, ($$render) => {
                          if (get(ev).tags?.length) $$render(consequent_17);
                        });
                      }
                      template_effect(
                        ($0, $1, $2, $3) => {
                          set_text(text_26, get(ev).title);
                          set_text(text_27, $0);
                          set_text(text_29, `${$1 ?? ""} – ${$2 ?? ""} `);
                          set_text(text_30, $3);
                        },
                        [
                          () => eta(get(ev).start.getTime()),
                          () => fmt(get(ev).start),
                          () => fmt(get(ev).end),
                          () => duration(get(ev))
                        ]
                      );
                      append($$anchor6, fragment_11);
                    },
                    $$slots: { default: true }
                  });
                  reset(div_25);
                  reset(button_6);
                  template_effect(
                    ($0, $1) => {
                      classes_6 = set_class(button_6, 1, "ag-card ag-card--q svelte-n8lbn1", null, classes_6, {
                        "ag-card--hero": get(i) === 0,
                        "ag-card--selected": selectedEventId() === get(ev).id
                      });
                      set_attribute(button_6, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}, ${$1 ?? ""}`);
                      styles_6 = set_style(button_6, "", styles_6, { "--ev-color": get(ev).color || "var(--dt-accent)" });
                    },
                    [() => fmt(get(ev).start), () => duration(get(ev))]
                  );
                  delegated("click", button_6, () => handleClick(get(ev)));
                  event("pointerenter", button_6, () => get(oneventhover)?.(get(ev)));
                  append($$anchor5, button_6);
                };
                if_block(node_21, ($$render) => {
                  if (get(i) >= UPCOMING_CARDS) $$render(consequent_15);
                  else $$render(alternate_4, -1);
                });
              }
              append($$anchor4, fragment_9);
            });
            append($$anchor3, fragment_8);
          };
          if_block(node_17, ($$render) => {
            if (get(upcomingNext).length === 0) $$render(consequent_13);
            else $$render(alternate_5, -1);
          });
        }
        reset(div_21);
        reset(div_9);
        template_effect(() => {
          set_text(text_12, `${get(L).now ?? ""} `);
          set_text(text_13, clock.hm);
          set_text(text_21, get(L).upNext);
        });
        append($$anchor2, div_9);
      };
      var consequent_21 = ($$anchor2) => {
        var div_29 = root_24$1();
        var node_27 = child(div_29);
        {
          var consequent_20 = ($$anchor3) => {
            var div_30 = root_4$5();
            var node_28 = child(div_30);
            {
              var consequent_19 = ($$anchor4) => {
                var fragment_12 = comment();
                var node_29 = first_child(fragment_12);
                snippet(node_29, () => get(emptySnippet));
                append($$anchor4, fragment_12);
              };
              var alternate_6 = ($$anchor4) => {
                var text_32 = text();
                template_effect(() => set_text(text_32, get(L).nothingWasScheduled));
                append($$anchor4, text_32);
              };
              if_block(node_28, ($$render) => {
                if (get(emptySnippet)) $$render(consequent_19);
                else $$render(alternate_6, -1);
              });
            }
            reset(div_30);
            append($$anchor3, div_30);
          };
          var alternate_7 = ($$anchor3) => {
            var fragment_14 = comment();
            var node_30 = first_child(fragment_14);
            each(node_30, 17, () => get(timedDayEvents), (ev) => ev.id, ($$anchor4, ev) => {
              var button_7 = root_23$1();
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
              template_effect(
                ($0, $1, $2, $3) => {
                  classes_7 = set_class(button_7, 1, "ag-log-row svelte-n8lbn1", null, classes_7, { "ag-log-row--selected": selectedEventId() === get(ev).id });
                  set_attribute(button_7, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""} to ${$1 ?? ""}`);
                  styles_7 = set_style(button_7, "", styles_7, { "--ev-color": get(ev).color || "var(--dt-accent)" });
                  set_text(text_33, $2);
                  styles_8 = set_style(span_21, "", styles_8, { background: get(ev).color || "var(--dt-accent)" });
                  set_text(text_34, get(ev).title);
                  set_text(text_35, $3);
                },
                [
                  () => fmt(get(ev).start),
                  () => fmt(get(ev).end),
                  () => fmt(get(ev).start),
                  () => duration(get(ev))
                ]
              );
              delegated("click", button_7, () => handleClick(get(ev)));
              event("pointerenter", button_7, () => get(oneventhover)?.(get(ev)));
              append($$anchor4, button_7);
            });
            append($$anchor3, fragment_14);
          };
          if_block(node_27, ($$render) => {
            if (get(timedDayEvents).length === 0 && get(allDayBanner).length === 0) $$render(consequent_20);
            else $$render(alternate_7, -1);
          });
        }
        reset(div_29);
        append($$anchor2, div_29);
      };
      var alternate_10 = ($$anchor2) => {
        var div_31 = root_27$1();
        var node_31 = child(div_31);
        {
          var consequent_23 = ($$anchor3) => {
            var div_32 = root_4$5();
            var node_32 = child(div_32);
            {
              var consequent_22 = ($$anchor4) => {
                var fragment_15 = comment();
                var node_33 = first_child(fragment_15);
                snippet(node_33, () => get(emptySnippet));
                append($$anchor4, fragment_15);
              };
              var alternate_8 = ($$anchor4) => {
                var text_36 = text();
                template_effect(() => set_text(text_36, get(L).nothingScheduledYet));
                append($$anchor4, text_36);
              };
              if_block(node_32, ($$render) => {
                if (get(emptySnippet)) $$render(consequent_22);
                else $$render(alternate_8, -1);
              });
            }
            reset(div_32);
            append($$anchor3, div_32);
          };
          var alternate_9 = ($$anchor3) => {
            var fragment_17 = comment();
            var node_34 = first_child(fragment_17);
            each(node_34, 19, () => get(timedDayEvents), (ev) => ev.id, ($$anchor4, ev, i) => {
              var button_8 = root_21$2();
              let classes_8;
              let styles_9;
              var div_33 = child(button_8);
              var node_35 = child(div_33);
              EventContent(node_35, {
                get event() {
                  return get(ev);
                },
                children: ($$anchor5, $$slotProps) => {
                  var fragment_18 = root_26$1();
                  var div_34 = first_child(fragment_18);
                  var span_24 = child(div_34);
                  var text_37 = child(span_24, true);
                  reset(span_24);
                  var span_25 = sibling(span_24, 2);
                  var text_38 = child(span_25, true);
                  reset(span_25);
                  reset(div_34);
                  var node_36 = sibling(div_34, 2);
                  {
                    var consequent_24 = ($$anchor6) => {
                      var span_26 = root_17$2();
                      var text_39 = child(span_26, true);
                      reset(span_26);
                      template_effect(() => set_text(text_39, get(ev).subtitle));
                      append($$anchor6, span_26);
                    };
                    if_block(node_36, ($$render) => {
                      if (get(ev).subtitle) $$render(consequent_24);
                    });
                  }
                  var node_37 = sibling(node_36, 2);
                  {
                    var consequent_25 = ($$anchor6) => {
                      var span_27 = root_25$1();
                      var text_40 = child(span_27, true);
                      reset(span_27);
                      template_effect(() => set_text(text_40, get(ev).location));
                      append($$anchor6, span_27);
                    };
                    if_block(node_37, ($$render) => {
                      if (get(ev).location) $$render(consequent_25);
                    });
                  }
                  var div_35 = sibling(node_37, 2);
                  var text_41 = child(div_35);
                  var span_28 = sibling(text_41);
                  var text_42 = child(span_28, true);
                  reset(span_28);
                  reset(div_35);
                  var node_38 = sibling(div_35, 2);
                  {
                    var consequent_26 = ($$anchor6) => {
                      var div_36 = root_19$2();
                      each(div_36, 21, () => get(ev).tags, index, ($$anchor7, tag) => {
                        var span_29 = root_18$2();
                        var text_43 = child(span_29, true);
                        reset(span_29);
                        template_effect(() => set_text(text_43, get(tag)));
                        append($$anchor7, span_29);
                      });
                      reset(div_36);
                      append($$anchor6, div_36);
                    };
                    if_block(node_38, ($$render) => {
                      if (get(ev).tags?.length) $$render(consequent_26);
                    });
                  }
                  template_effect(
                    ($0, $1, $2) => {
                      set_text(text_37, get(i) + 1);
                      set_text(text_38, get(ev).title);
                      set_text(text_41, `${$0 ?? ""} – ${$1 ?? ""} `);
                      set_text(text_42, $2);
                    },
                    [
                      () => fmt(get(ev).start),
                      () => fmt(get(ev).end),
                      () => duration(get(ev))
                    ]
                  );
                  append($$anchor5, fragment_18);
                },
                $$slots: { default: true }
              });
              reset(div_33);
              reset(button_8);
              template_effect(
                ($0, $1, $2) => {
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
                },
                [
                  () => fmt(get(ev).start),
                  () => fmt(get(ev).end),
                  () => duration(get(ev))
                ]
              );
              delegated("click", button_8, () => handleClick(get(ev)));
              event("pointerenter", button_8, () => get(oneventhover)?.(get(ev)));
              append($$anchor4, button_8);
            });
            append($$anchor3, fragment_17);
          };
          if_block(node_31, ($$render) => {
            if (get(timedDayEvents).length === 0 && get(allDayBanner).length === 0) $$render(consequent_23);
            else $$render(alternate_9, -1);
          });
        }
        reset(div_31);
        append($$anchor2, div_31);
      };
      if_block(node_2, ($$render) => {
        if (get(compact)) $$render(consequent_7);
        else if (get(isToday)) $$render(consequent_18, 1);
        else if (get(isPastDay)) $$render(consequent_21, 2);
        else $$render(alternate_10, -1);
      });
    }
    reset(div_1);
    reset(div);
    template_effect(
      ($0, $1, $2, $3) => {
        classes = set_class(div, 1, "ag ag--day svelte-n8lbn1", null, classes, $0);
        styles = set_style(div, style() || void 0, styles, { height: $$props.height ? `${$$props.height}px` : void 0 });
        set_attribute(div_1, "aria-label", get(L).todaysLineup);
        set_text(text_2, $1);
        set_text(text_3, `${$2 ?? ""} ${$3 ?? ""}`);
      },
      [
        () => ({
          "ag--disabled": get(disabledSet).has(get(dayMs)),
          "ag--mobile": get(isMobile),
          "ag--auto": get(autoHeight)
        }),
        () => weekdayLong(get(dayMs), $$props.locale),
        () => monthLong(get(dayMs), $$props.locale),
        () => dayNum(get(dayMs))
      ]
    );
    delegated("pointerdown", div, onPointerDown);
    delegated("pointerup", div, onPointerUp);
    event("pointercancel", div, onPointerCancel);
    append($$anchor, div);
    pop();
  }
  delegate(["pointerdown", "pointerup", "click"]);
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
  var root_11$2 = /* @__PURE__ */ from_html(`<span class="ag-compact-dot svelte-uhwfyj"></span> <span class="ag-compact-time svelte-uhwfyj"> </span> <div class="ag-compact-main svelte-uhwfyj"><span class="ag-compact-title svelte-uhwfyj"> </span> <!> <!> <!></div> <span class="ag-compact-dur svelte-uhwfyj"> </span>`, 1);
  var root_12$2 = /* @__PURE__ */ from_html(`<button type="button"><!></button>`);
  var root_13$1 = /* @__PURE__ */ from_html(`<button type="button"> <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4"></path></svg></button>`);
  var root_14$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-date svelte-uhwfyj"> </span>`);
  var root_15$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-custom-header svelte-uhwfyj"><!></div>`);
  var root_16$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-compact svelte-uhwfyj"></div>`);
  var root_17$1 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  var root_18$1 = /* @__PURE__ */ from_html(`<div class="ag-wday-past-line ag-wday-past-line--summary svelte-uhwfyj"> </div>`);
  var root_19$1 = /* @__PURE__ */ from_html(`<div role="listitem"><div class="ag-wday-head svelte-uhwfyj"><div class="ag-wday-head-left svelte-uhwfyj"><span class="ag-wday-name svelte-uhwfyj"> </span> <!></div> <!></div> <!></div>`);
  var root_20$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-badge svelte-uhwfyj"> </span>`);
  var root_21$1 = /* @__PURE__ */ from_html(`<span class="ag-wday-badge ag-wday-badge--muted svelte-uhwfyj"> </span>`);
  var root_22 = /* @__PURE__ */ from_html(`<span class="ag-allday-span svelte-uhwfyj"> </span>`);
  var root_23 = /* @__PURE__ */ from_html(`<button type="button"><span class="ag-allday-dot svelte-uhwfyj"></span> <span class="ag-allday-title svelte-uhwfyj"> </span> <!></button>`);
  var root_24 = /* @__PURE__ */ from_html(`<div class="ag-allday svelte-uhwfyj"></div>`);
  var root_25 = /* @__PURE__ */ from_html(`<div class="ag-wday-empty svelte-uhwfyj"> </div>`);
  var root_26 = /* @__PURE__ */ from_html(`<div class="ag-wslot svelte-uhwfyj"><div></div></div>`);
  var root_27 = /* @__PURE__ */ from_html(`<div class="ag-wday-expanded svelte-uhwfyj"></div>`);
  var root_28 = /* @__PURE__ */ from_html(`<div class="ag-wslot svelte-uhwfyj"><div class="ag-wslot-header svelte-uhwfyj"><span class="ag-wslot-now svelte-uhwfyj"> </span></div> <!></div>`);
  var root_29 = /* @__PURE__ */ from_html(`<div class="ag-wday-expanded svelte-uhwfyj"><!> <!> <!></div>`);
  var root_30 = /* @__PURE__ */ from_html(`<button type="button" class="ag-compact-more svelte-uhwfyj"> </button>`);
  var root_31 = /* @__PURE__ */ from_html(`<div class="ag-wday-compact svelte-uhwfyj"><!> <!></div>`);
  var root_32 = /* @__PURE__ */ from_html(`<div role="listitem"><div class="ag-wday-head svelte-uhwfyj"><div class="ag-wday-head-left svelte-uhwfyj"><!> <span class="ag-wday-name svelte-uhwfyj"> </span> <!></div> <!></div> <!> <!></div>`);
  var root_33 = /* @__PURE__ */ from_html(`<div><div class="ag-body svelte-uhwfyj" role="list"></div></div>`);
  function AgendaWeek($$anchor, $$props) {
    push($$props, true);
    const eventCard = ($$anchor2, ev = noop, isNow = noop, eta2 = noop) => {
      var button = root_7$4();
      let classes;
      let styles;
      var div = child(button);
      var node = child(div);
      EventContent(node, {
        get event() {
          return ev();
        },
        children: ($$anchor3, $$slotProps) => {
          var fragment = root_5$4();
          var span = first_child(fragment);
          var text$1 = child(span, true);
          reset(span);
          var node_1 = sibling(span, 2);
          {
            var consequent = ($$anchor4) => {
              var span_1 = root$3();
              var text_1 = child(span_1, true);
              reset(span_1);
              template_effect(() => set_text(text_1, ev().subtitle));
              append($$anchor4, span_1);
            };
            if_block(node_1, ($$render) => {
              if (ev().subtitle) $$render(consequent);
            });
          }
          var node_2 = sibling(node_1, 2);
          {
            var consequent_1 = ($$anchor4) => {
              var span_2 = root_1$4();
              var text_2 = child(span_2, true);
              reset(span_2);
              template_effect(() => set_text(text_2, ev().location));
              append($$anchor4, span_2);
            };
            if_block(node_2, ($$render) => {
              if (ev().location) $$render(consequent_1);
            });
          }
          var span_3 = sibling(node_2, 2);
          var node_3 = child(span_3);
          {
            var consequent_2 = ($$anchor4) => {
              var text_3 = text();
              template_effect(($0) => set_text(text_3, `${get(L).until ?? ""} ${$0 ?? ""}`), [() => fmt(ev().end)]);
              append($$anchor4, text_3);
            };
            var alternate = ($$anchor4) => {
              var text_4 = text();
              template_effect(($0, $1) => set_text(text_4, `${$0 ?? ""} – ${$1 ?? ""}`), [() => fmt(ev().start), () => fmt(ev().end)]);
              append($$anchor4, text_4);
            };
            if_block(node_3, ($$render) => {
              if (isNow()) $$render(consequent_2);
              else $$render(alternate, -1);
            });
          }
          var span_4 = sibling(node_3, 2);
          var text_5 = child(span_4, true);
          reset(span_4);
          var node_4 = sibling(span_4, 2);
          {
            var consequent_3 = ($$anchor4) => {
              var span_5 = root_2$4();
              var text_6 = child(span_5, true);
              reset(span_5);
              template_effect(() => set_text(text_6, eta2()));
              append($$anchor4, span_5);
            };
            if_block(node_4, ($$render) => {
              if (eta2()) $$render(consequent_3);
            });
          }
          reset(span_3);
          var node_5 = sibling(span_3, 2);
          {
            var consequent_4 = ($$anchor4) => {
              var div_1 = root_4$4();
              each(div_1, 21, () => ev().tags, index, ($$anchor5, tag) => {
                var span_6 = root_3$4();
                var text_7 = child(span_6, true);
                reset(span_6);
                template_effect(() => set_text(text_7, get(tag)));
                append($$anchor5, span_6);
              });
              reset(div_1);
              append($$anchor4, div_1);
            };
            if_block(node_5, ($$render) => {
              if (ev().tags?.length) $$render(consequent_4);
            });
          }
          template_effect(
            ($0) => {
              set_text(text$1, ev().title);
              set_text(text_5, $0);
            },
            [() => duration(ev())]
          );
          append($$anchor3, fragment);
        },
        $$slots: { default: true }
      });
      var node_6 = sibling(node, 2);
      {
        var consequent_5 = ($$anchor3) => {
          var div_2 = root_6$4();
          var div_3 = child(div_2);
          let styles_1;
          reset(div_2);
          template_effect(($0) => styles_1 = set_style(div_3, "", styles_1, $0), [() => ({ transform: `scaleX(${prog(ev()) ?? ""})` })]);
          append($$anchor3, div_2);
        };
        if_block(node_6, ($$render) => {
          if (isNow()) $$render(consequent_5);
        });
      }
      reset(div);
      reset(button);
      template_effect(
        ($0, $1, $2) => {
          classes = set_class(button, 1, "ag-card svelte-uhwfyj", null, classes, {
            "ag-card--selected": selectedEventId() === ev().id,
            "ag-card--cancelled": ev().status === "cancelled",
            "ag-card--tentative": ev().status === "tentative",
            "ag-card--full": ev().status === "full",
            "ag-card--limited": ev().status === "limited"
          });
          set_attribute(button, "aria-label", `${ev().title ?? ""}${ev().status === "cancelled" ? " (cancelled)" : ""}${ev().status === "tentative" ? " (tentative)" : ""}${ev().status === "full" ? " (full)" : ""}${ev().status === "limited" ? " (limited)" : ""}, ${$0 ?? ""} to ${$1 ?? ""}, ${$2 ?? ""}`);
          styles = set_style(button, "", styles, { "--ev-color": ev().color || "var(--dt-accent)" });
        },
        [
          () => fmt(ev().start),
          () => fmt(ev().end),
          () => duration(ev())
        ]
      );
      delegated("click", button, () => handleClick(ev()));
      event("pointerenter", button, () => get(oneventhover)?.(ev()));
      append($$anchor2, button);
    };
    const compactRow = ($$anchor2, ev = noop, showLoc = noop, done = noop) => {
      var button_1 = root_12$2();
      let classes_1;
      let styles_2;
      var node_7 = child(button_1);
      EventContent(node_7, {
        get event() {
          return ev();
        },
        children: ($$anchor3, $$slotProps) => {
          var fragment_3 = root_11$2();
          var span_7 = sibling(first_child(fragment_3), 2);
          var text_8 = child(span_7, true);
          reset(span_7);
          var div_4 = sibling(span_7, 2);
          var span_8 = child(div_4);
          var text_9 = child(span_8, true);
          reset(span_8);
          var node_8 = sibling(span_8, 2);
          {
            var consequent_6 = ($$anchor4) => {
              var span_9 = root_8$4();
              var text_10 = child(span_9, true);
              reset(span_9);
              template_effect(() => set_text(text_10, ev().location));
              append($$anchor4, span_9);
            };
            if_block(node_8, ($$render) => {
              if (showLoc() && ev().location) $$render(consequent_6);
            });
          }
          var node_9 = sibling(node_8, 2);
          {
            var consequent_7 = ($$anchor4) => {
              var span_10 = root_9$2();
              var text_11 = child(span_10, true);
              reset(span_10);
              template_effect(() => set_text(text_11, ev().subtitle));
              append($$anchor4, span_10);
            };
            if_block(node_9, ($$render) => {
              if (ev().subtitle) $$render(consequent_7);
            });
          }
          var node_10 = sibling(node_9, 2);
          {
            var consequent_8 = ($$anchor4) => {
              var fragment_4 = comment();
              var node_11 = first_child(fragment_4);
              each(node_11, 17, () => ev().tags, index, ($$anchor5, tag) => {
                var span_11 = root_10$2();
                var text_12 = child(span_11, true);
                reset(span_11);
                template_effect(() => set_text(text_12, get(tag)));
                append($$anchor5, span_11);
              });
              append($$anchor4, fragment_4);
            };
            if_block(node_10, ($$render) => {
              if (ev().tags?.length) $$render(consequent_8);
            });
          }
          reset(div_4);
          var span_12 = sibling(div_4, 2);
          var text_13 = child(span_12, true);
          reset(span_12);
          template_effect(
            ($0, $1) => {
              set_text(text_8, $0);
              set_text(text_9, ev().title);
              set_text(text_13, $1);
            },
            [() => fmt(ev().start), () => duration(ev())]
          );
          append($$anchor3, fragment_3);
        },
        $$slots: { default: true }
      });
      reset(button_1);
      template_effect(
        ($0, $1) => {
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
        },
        [() => fmt(ev().start), () => duration(ev())]
      );
      delegated("click", button_1, () => handleClick(ev()));
      event("pointerenter", button_1, () => get(oneventhover)?.(ev()));
      append($$anchor2, button_1);
    };
    const pastToggle = ($$anchor2, ms = noop, count = noop, summary = noop) => {
      const open = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(ms()));
      var button_2 = root_13$1();
      let classes_2;
      var text_14 = child(button_2);
      var svg = sibling(text_14);
      let classes_3;
      reset(button_2);
      template_effect(
        ($0) => {
          classes_2 = set_class(button_2, 1, "ag-wday-past-line ag-past-toggle svelte-uhwfyj", null, classes_2, { "ag-wday-past-line--summary": summary() });
          set_attribute(button_2, "aria-expanded", get(open));
          set_text(text_14, `✓ ${$0 ?? ""} `);
          classes_3 = set_class(svg, 0, "ag-past-chevron svelte-uhwfyj", null, classes_3, { "ag-past-chevron--open": get(open) });
        },
        [() => get(L).nCompleted(count())]
      );
      delegated("click", button_2, () => togglePastExpand(ms()));
      append($$anchor2, button_2);
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
    const dayHeaderSnippet = /* @__PURE__ */ user_derived(() => ctx.dayHeaderSnippet);
    const oneventhover = /* @__PURE__ */ user_derived(() => ctx.oneventhover);
    const disabledSet = /* @__PURE__ */ user_derived(() => ctx.disabledSet);
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeActive = false;
    const SWIPE_THRESHOLD2 = 50;
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
      if (Math.abs(dx) > SWIPE_THRESHOLD2 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx > 0) get(viewState)?.prev();
        else get(viewState)?.next();
      }
    }
    function onPointerCancel() {
      swipeActive = false;
    }
    let expandedDays = /* @__PURE__ */ state(proxy([]));
    function toggleDayExpand(ms) {
      set(
        expandedDays,
        get(expandedDays).includes(ms) ? get(expandedDays).filter((m) => m !== ms) : [...get(expandedDays), ms],
        true
      );
    }
    let expandedPast = /* @__PURE__ */ state(proxy([]));
    function togglePastExpand(ms) {
      set(
        expandedPast,
        get(expandedPast).includes(ms) ? get(expandedPast).filter((m) => m !== ms) : [...get(expandedPast), ms],
        true
      );
    }
    const fmt = (d) => fmtTime(d, $$props.locale);
    const eta = (ms) => timeUntilMs(ms, clock.tick, get(L));
    const prog = (ev) => progress(ev, clock.tick);
    function handleClick(ev) {
      $$props.oneventclick?.(ev);
    }
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
        const totalMinutes = timedEvts.reduce(
          (sum, ev) => {
            const s = Math.max(ev.start.getTime(), ms);
            const e = Math.min(ev.end.getTime(), dEnd);
            return sum + (e - s) / 6e4;
          },
          0
        );
        const pastEvents = [];
        const currentEvents = [];
        const upcomingEvents = [];
        for (const ev of timedEvts) {
          if (ev.end.getTime() <= now) pastEvents.push(ev);
          else if (ev.start.getTime() <= now && ev.end.getTime() > now) currentEvents.push(ev);
          else upcomingEvents.push(ev);
        }
        let tier;
        if (get(equalDays)) {
          tier = "upcoming";
        } else if (ms === todayMs) {
          tier = "today";
        } else if (ms === tomorrowMs) {
          tier = "tomorrow";
        } else if (ms < todayMs) {
          tier = "past";
        } else {
          tier = "upcoming";
        }
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
      if (get(hideDays)?.length) {
        return out.filter((d) => {
          const jsDay = new Date(d.ms).getDay();
          const iso = jsDay === 0 ? 7 : jsDay;
          return !get(hideDays).includes(iso);
        });
      }
      return out;
    });
    var div_5 = root_33();
    let classes_4;
    let styles_3;
    var div_6 = child(div_5);
    each(div_6, 21, () => get(weekDays), (day) => day.ms, ($$anchor2, day) => {
      const expanded = /* @__PURE__ */ user_derived(() => get(day).tier === "today" || get(day).tier === "tomorrow");
      var fragment_5 = comment();
      var node_12 = first_child(fragment_5);
      {
        var consequent_14 = ($$anchor3) => {
          var div_7 = root_19$1();
          let classes_5;
          var div_8 = child(div_7);
          var div_9 = child(div_8);
          var span_13 = child(div_9);
          var text_15 = child(span_13, true);
          reset(span_13);
          var node_13 = sibling(span_13, 2);
          {
            var consequent_9 = ($$anchor4) => {
              var span_14 = root_14$1();
              var text_16 = child(span_14, true);
              reset(span_14);
              template_effect(() => set_text(text_16, get(day).dateLabel));
              append($$anchor4, span_14);
            };
            if_block(node_13, ($$render) => {
              if (get(showDates)) $$render(consequent_9);
            });
          }
          reset(div_9);
          var node_14 = sibling(div_9, 2);
          {
            var consequent_10 = ($$anchor4) => {
              var div_10 = root_15$1();
              var node_15 = child(div_10);
              snippet(node_15, () => get(dayHeaderSnippet), () => ({
                date: new Date(get(day).ms),
                isToday: false,
                dayName: get(day).dayName
              }));
              reset(div_10);
              append($$anchor4, div_10);
            };
            if_block(node_14, ($$render) => {
              if (get(dayHeaderSnippet)) $$render(consequent_10);
            });
          }
          reset(div_8);
          var node_16 = sibling(div_8, 2);
          {
            var consequent_12 = ($$anchor4) => {
              var fragment_6 = root_17$1();
              var node_17 = first_child(fragment_6);
              pastToggle(node_17, () => get(day).ms, () => get(day).timedEvents.length, () => true);
              var node_18 = sibling(node_17, 2);
              {
                var consequent_11 = ($$anchor5) => {
                  var div_11 = root_16$1();
                  each(div_11, 21, () => get(day).timedEvents, (ev) => ev.id, ($$anchor6, ev) => {
                    compactRow($$anchor6, () => get(ev), () => false, () => true);
                  });
                  reset(div_11);
                  append($$anchor5, div_11);
                };
                var d_1 = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(get(day).ms));
                if_block(node_18, ($$render) => {
                  if (get(d_1)) $$render(consequent_11);
                });
              }
              append($$anchor4, fragment_6);
            };
            var consequent_13 = ($$anchor4) => {
              var div_12 = root_18$1();
              var text_17 = child(div_12, true);
              reset(div_12);
              template_effect(() => set_text(text_17, get(L).noEvents));
              append($$anchor4, div_12);
            };
            if_block(node_16, ($$render) => {
              if (get(day).timedEvents.length > 0) $$render(consequent_12);
              else if (get(day).events.length === 0) $$render(consequent_13, 1);
            });
          }
          reset(div_7);
          template_effect(
            ($0) => {
              classes_5 = set_class(div_7, 1, "ag-wday ag-wday--past svelte-uhwfyj", null, classes_5, $0);
              set_text(text_15, get(day).dayName);
            },
            [
              () => ({ "ag-wday--disabled": get(disabledSet).has(get(day).ms) })
            ]
          );
          append($$anchor3, div_7);
        };
        var alternate_2 = ($$anchor3) => {
          var div_13 = root_32();
          let classes_6;
          var div_14 = child(div_13);
          var div_15 = child(div_14);
          var node_19 = child(div_15);
          {
            var consequent_15 = ($$anchor4) => {
              var span_15 = root_20$1();
              var text_18 = child(span_15, true);
              reset(span_15);
              template_effect(() => set_text(text_18, get(L).today));
              append($$anchor4, span_15);
            };
            var consequent_16 = ($$anchor4) => {
              var span_16 = root_21$1();
              var text_19 = child(span_16, true);
              reset(span_16);
              template_effect(() => set_text(text_19, get(L).tomorrow));
              append($$anchor4, span_16);
            };
            if_block(node_19, ($$render) => {
              if (get(day).isToday) $$render(consequent_15);
              else if (get(day).tier === "tomorrow") $$render(consequent_16, 1);
            });
          }
          var span_17 = sibling(node_19, 2);
          var text_20 = child(span_17, true);
          reset(span_17);
          var node_20 = sibling(span_17, 2);
          {
            var consequent_17 = ($$anchor4) => {
              var span_18 = root_14$1();
              var text_21 = child(span_18, true);
              reset(span_18);
              template_effect(() => set_text(text_21, get(day).dateLabel));
              append($$anchor4, span_18);
            };
            if_block(node_20, ($$render) => {
              if (get(showDates)) $$render(consequent_17);
            });
          }
          reset(div_15);
          var node_21 = sibling(div_15, 2);
          {
            var consequent_18 = ($$anchor4) => {
              var div_16 = root_15$1();
              var node_22 = child(div_16);
              snippet(node_22, () => get(dayHeaderSnippet), () => ({
                date: new Date(get(day).ms),
                isToday: get(day).tier === "today",
                dayName: get(day).dayName
              }));
              reset(div_16);
              append($$anchor4, div_16);
            };
            if_block(node_21, ($$render) => {
              if (get(dayHeaderSnippet)) $$render(consequent_18);
            });
          }
          reset(div_14);
          var node_23 = sibling(div_14, 2);
          {
            var consequent_20 = ($$anchor4) => {
              var div_17 = root_24();
              each(div_17, 21, () => get(day).allDayEvents, (ev) => ev.id, ($$anchor5, ev) => {
                const seg = /* @__PURE__ */ user_derived(() => segmentForDay(get(ev), get(day).ms));
                const isCont = /* @__PURE__ */ user_derived(() => get(seg) !== null && get(seg).totalDays > 1);
                var button_3 = root_23();
                let classes_7;
                let styles_4;
                var span_19 = sibling(child(button_3), 2);
                var text_22 = child(span_19, true);
                reset(span_19);
                var node_24 = sibling(span_19, 2);
                {
                  var consequent_19 = ($$anchor6) => {
                    var span_20 = root_22();
                    var text_23 = child(span_20);
                    reset(span_20);
                    template_effect(() => set_text(text_23, `${get(seg).dayIndex ?? ""}/${get(seg).totalDays ?? ""}`));
                    append($$anchor6, span_20);
                  };
                  if_block(node_24, ($$render) => {
                    if (get(isCont) && get(seg)) $$render(consequent_19);
                  });
                }
                reset(button_3);
                template_effect(
                  ($0) => {
                    classes_7 = set_class(button_3, 1, "ag-allday-chip svelte-uhwfyj", null, classes_7, {
                      "ag-allday-chip--selected": selectedEventId() === get(ev).id
                    });
                    set_attribute(button_3, "aria-label", `${get(ev).title ?? ""}, ${$0 ?? ""}`);
                    styles_4 = set_style(button_3, "", styles_4, { "--ev-color": get(ev).color || "var(--dt-accent)" });
                    set_text(text_22, get(ev).title);
                  },
                  [
                    () => get(isCont) && get(seg) ? get(L).dayNOfTotal(get(seg).dayIndex, get(seg).totalDays) : get(L).allDay
                  ]
                );
                delegated("click", button_3, () => handleClick(get(ev)));
                event("pointerenter", button_3, () => get(oneventhover)?.(get(ev)));
                append($$anchor5, button_3);
              });
              reset(div_17);
              append($$anchor4, div_17);
            };
            if_block(node_23, ($$render) => {
              if (get(day).allDayEvents.length > 0) $$render(consequent_20);
            });
          }
          var node_25 = sibling(node_23, 2);
          {
            var consequent_21 = ($$anchor4) => {
              var div_18 = root_25();
              var text_24 = child(div_18, true);
              reset(div_18);
              template_effect(() => set_text(text_24, get(L).noEvents));
              append($$anchor4, div_18);
            };
            var consequent_22 = ($$anchor4) => {
              var div_19 = root_16$1();
              each(div_19, 21, () => get(day).timedEvents, (ev) => ev.id, ($$anchor5, ev) => {
                compactRow($$anchor5, () => get(ev), () => false, () => false);
              });
              reset(div_19);
              append($$anchor4, div_19);
            };
            var consequent_23 = ($$anchor4) => {
              var div_20 = root_27();
              each(div_20, 21, () => groupIntoSlots(get(day).timedEvents), (slot) => slot.startMs, ($$anchor5, slot) => {
                var div_21 = root_26();
                var div_22 = child(div_21);
                let classes_8;
                each(div_22, 21, () => get(slot).events, (ev) => ev.id, ($$anchor6, ev) => {
                  eventCard($$anchor6, () => get(ev), () => false);
                });
                reset(div_22);
                reset(div_21);
                template_effect(() => classes_8 = set_class(div_22, 1, "ag-wslot-cards svelte-uhwfyj", null, classes_8, { "ag-wslot-cards--multi": get(slot).events.length > 1 }));
                append($$anchor5, div_21);
              });
              reset(div_20);
              append($$anchor4, div_20);
            };
            var consequent_27 = ($$anchor4) => {
              var div_23 = root_29();
              var node_26 = child(div_23);
              {
                var consequent_24 = ($$anchor5) => {
                  var fragment_10 = comment();
                  var node_27 = first_child(fragment_10);
                  each(node_27, 17, () => get(day).currentEvents, (ev) => ev.id, ($$anchor6, ev) => {
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
                    append($$anchor6, div_24);
                  });
                  append($$anchor5, fragment_10);
                };
                if_block(node_26, ($$render) => {
                  if (get(day).currentEvents.length > 0) $$render(consequent_24);
                });
              }
              var node_29 = sibling(node_26, 2);
              each(node_29, 17, () => groupIntoSlots(get(day).upcomingEvents), (slot) => slot.startMs, ($$anchor5, slot) => {
                var div_26 = root_26();
                var div_27 = child(div_26);
                let classes_9;
                each(div_27, 21, () => get(slot).events, (ev) => ev.id, ($$anchor6, ev) => {
                  {
                    let $0 = /* @__PURE__ */ user_derived(() => get(day).tier === "today" ? eta(get(ev).start.getTime()) : void 0);
                    eventCard($$anchor6, () => get(ev), () => false, () => get($0));
                  }
                });
                reset(div_27);
                reset(div_26);
                template_effect(() => classes_9 = set_class(div_27, 1, "ag-wslot-cards svelte-uhwfyj", null, classes_9, { "ag-wslot-cards--multi": get(slot).events.length > 1 }));
                append($$anchor5, div_26);
              });
              var node_30 = sibling(node_29, 2);
              {
                var consequent_26 = ($$anchor5) => {
                  var fragment_12 = root_17$1();
                  var node_31 = first_child(fragment_12);
                  pastToggle(node_31, () => get(day).ms, () => get(day).pastEvents.length, () => false);
                  var node_32 = sibling(node_31, 2);
                  {
                    var consequent_25 = ($$anchor6) => {
                      var fragment_13 = comment();
                      var node_33 = first_child(fragment_13);
                      each(node_33, 17, () => get(day).pastEvents, (ev) => ev.id, ($$anchor7, ev) => {
                        compactRow($$anchor7, () => get(ev), () => false, () => true);
                      });
                      append($$anchor6, fragment_13);
                    };
                    var d_2 = /* @__PURE__ */ user_derived(() => get(expandedPast).includes(get(day).ms));
                    if_block(node_32, ($$render) => {
                      if (get(d_2)) $$render(consequent_25);
                    });
                  }
                  append($$anchor5, fragment_12);
                };
                if_block(node_30, ($$render) => {
                  if (get(day).pastEvents.length > 0) $$render(consequent_26);
                });
              }
              reset(div_23);
              append($$anchor4, div_23);
            };
            var alternate_1 = ($$anchor4) => {
              const dayExpanded = /* @__PURE__ */ user_derived(() => get(expandedDays).includes(get(day).ms));
              var div_28 = root_31();
              var node_34 = child(div_28);
              each(
                node_34,
                17,
                () => get(dayExpanded) ? get(day).timedEvents : get(day).timedEvents.slice(0, 4),
                (ev) => ev.id,
                ($$anchor5, ev) => {
                  compactRow($$anchor5, () => get(ev), () => true, () => false);
                }
              );
              var node_35 = sibling(node_34, 2);
              {
                var consequent_28 = ($$anchor5) => {
                  var button_4 = root_30();
                  var text_26 = child(button_4, true);
                  reset(button_4);
                  template_effect(
                    ($0) => {
                      set_attribute(button_4, "aria-expanded", get(dayExpanded));
                      set_text(text_26, $0);
                    },
                    [
                      () => get(dayExpanded) ? get(L).showLess : get(L).nMore(get(day).timedEvents.length - 4)
                    ]
                  );
                  delegated("click", button_4, () => toggleDayExpand(get(day).ms));
                  append($$anchor5, button_4);
                };
                if_block(node_35, ($$render) => {
                  if (get(day).timedEvents.length > 4) $$render(consequent_28);
                });
              }
              reset(div_28);
              append($$anchor4, div_28);
            };
            if_block(node_25, ($$render) => {
              if (get(day).events.length === 0) $$render(consequent_21);
              else if (get(compact)) $$render(consequent_22, 1);
              else if (get(equalDays)) $$render(consequent_23, 2);
              else if (get(expanded)) $$render(consequent_27, 3);
              else $$render(alternate_1, -1);
            });
          }
          reset(div_13);
          template_effect(
            ($0) => {
              classes_6 = set_class(div_13, 1, "ag-wday svelte-uhwfyj", null, classes_6, $0);
              set_text(text_20, get(day).dayName);
            },
            [
              () => ({
                "ag-wday--today": get(day).tier === "today",
                "ag-wday--tomorrow": get(day).tier === "tomorrow",
                "ag-wday--equal": get(equalDays),
                "ag-wday--disabled": get(disabledSet).has(get(day).ms)
              })
            ]
          );
          append($$anchor3, div_13);
        };
        if_block(node_12, ($$render) => {
          if (get(day).tier === "past") $$render(consequent_14);
          else $$render(alternate_2, -1);
        });
      }
      append($$anchor2, fragment_5);
    });
    reset(div_6);
    reset(div_5);
    template_effect(() => {
      classes_4 = set_class(div_5, 1, "ag ag--week svelte-uhwfyj", null, classes_4, { "ag--mobile": get(isMobile), "ag--auto": get(autoHeight) });
      styles_3 = set_style(div_5, style() || void 0, styles_3, { height: $$props.height ? `${$$props.height}px` : void 0 });
      set_attribute(div_6, "aria-label", get(L).weekAhead);
    });
    delegated("pointerdown", div_5, onPointerDown);
    delegated("pointerup", div_5, onPointerUp);
    event("pointercancel", div_5, onPointerCancel);
    append($$anchor, div_5);
    pop();
  }
  delegate(["click", "pointerdown", "pointerup"]);
  var rest_excludes$1 = /* @__PURE__ */ new Set(["$$slots", "$$events", "$$legacy", "mode"]);
  function Agenda($$anchor, $$props) {
    let mode = prop($$props, "mode", 3, "day"), rest = /* @__PURE__ */ rest_props($$props, rest_excludes$1);
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        AgendaDay($$anchor2, spread_props(() => rest));
      };
      var alternate = ($$anchor2) => {
        AgendaWeek($$anchor2, spread_props(() => rest));
      };
      if_block(node, ($$render) => {
        if (mode() === "day") $$render(consequent);
        else $$render(alternate, -1);
      });
    }
    append($$anchor, fragment);
  }
  const SWIPE_THRESHOLD = 50;
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
        if (Math.abs(my) > Math.abs(mx) * 0.8) {
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
        const dir = Math.abs(dx) > SWIPE_THRESHOLD ? dx > 0 ? 1 : -1 : 0;
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
      const rangeStart = new Date(get(dayMs) - 2 * DAY_MS);
      const rangeEnd = new Date(get(dayMs) + 3 * DAY_MS);
      get(loadRangeCtx).set({ start: rangeStart, end: rangeEnd });
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
        for (const ev of [...sorted].sort((a, b) => a.start.getTime() - b.start.getTime())) {
          const s = ev.start.getTime();
          if (s > now) {
            nextEventId = ev.id;
            break;
          }
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
      for (let i = 0; i < infos.length; i++) {
        for (let j = i + 1; j < infos.length; j++) {
          if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
          else break;
        }
      }
      const groups = /* @__PURE__ */ new Map();
      for (let i = 0; i < infos.length; i++) {
        const root2 = find(i);
        if (!groups.has(root2)) groups.set(root2, []);
        groups.get(root2).push(i);
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
      if (isBlockedAt((tMs - get(dayMs)) / HOUR_MS)) return;
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
      if (isBlockedAt((startMs - get(dayMs)) / HOUR_MS)) return;
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
    function gridTimeMs(clientY) {
      const rect = gridEl.getBoundingClientRect();
      const y = clientY - rect.top + gridEl.scrollTop;
      return get(dayMs) + (get(startHour) + y / HOUR_HEIGHT) * HOUR_MS;
    }
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
      if (e.pointerType === "touch") {
        longPressTimer = setTimeout(
          () => {
            longPressTimer = null;
            startGridCreate();
          },
          LONG_PRESS_MS
        );
      }
      window.addEventListener("pointermove", onGridCreateMove);
      window.addEventListener("pointerup", onGridCreateUp, { once: true });
      window.addEventListener("pointercancel", onGridCreateCancel, { once: true });
    }
    function onGridCreateMove(e) {
      if (!get(drag)) return;
      if (!mbCreateStarted) {
        if (longPressTimer !== null) {
          const moved = Math.hypot(e.clientX - mbCreateStartX, e.clientY - mbCreateStartY);
          if (moved > LONG_PRESS_TOLERANCE) cleanupGridCreate();
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
        setTimeout(
          () => {
            suppressGridClick = false;
          },
          0
        );
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
        setTimeout(
          () => {
            suppressEventClick = false;
            suppressGridClick = false;
          },
          0
        );
      }
      cleanupResize();
    }
    function onResizeCancel() {
      if (get(drag) && mbRsStarted) get(drag).cancel();
      cleanupResize();
    }
    let gridEl;
    user_effect(() => {
      void get(dayMs);
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
    {
      var consequent_2 = ($$anchor2) => {
        var div_2 = root_4$3();
        let classes_2;
        var node_1 = child(div_2);
        each(node_1, 17, () => get(visibleAllDay), (seg) => seg.ev.id, ($$anchor3, seg) => {
          var button = root_2$3();
          let classes_3;
          let styles_2;
          var span = sibling(child(button), 2);
          var text2 = child(span, true);
          reset(span);
          var node_2 = sibling(span, 2);
          {
            var consequent = ($$anchor4) => {
              var span_1 = root_1$3();
              var text_1 = child(span_1);
              reset(span_1);
              template_effect(() => set_text(text_1, `${get(seg).dayIndex ?? ""}/${get(seg).totalDays ?? ""}`));
              append($$anchor4, span_1);
            };
            if_block(node_2, ($$render) => {
              if (get(seg).totalDays > 1) $$render(consequent);
            });
          }
          reset(button);
          template_effect(() => {
            classes_3 = set_class(button, 1, "mb-allday-chip svelte-zbkzcp", null, classes_3, {
              "mb-allday-chip--selected": selectedEventId() === get(seg).ev.id
            });
            styles_2 = set_style(button, "", styles_2, { "--ev-color": get(seg).ev.color ?? "var(--dt-accent)" });
            set_text(text2, get(seg).ev.title);
          });
          delegated("click", button, () => $$props.oneventclick?.(get(seg).ev));
          append($$anchor3, button);
        });
        var node_3 = sibling(node_1, 2);
        {
          var consequent_1 = ($$anchor3) => {
            var button_1 = root_3$3();
            var text_2 = child(button_1, true);
            reset(button_1);
            template_effect(
              ($0) => {
                set_attribute(button_1, "aria-expanded", get(allDayExpanded));
                set_text(text_2, $0);
              },
              [
                () => get(allDayExpanded) ? get(L).showLess : get(L).nMore(get(allDayEvents).length - ALLDAY_MAX)
              ]
            );
            delegated("click", button_1, () => {
              set(allDayExpanded, !get(allDayExpanded));
            });
            append($$anchor3, button_1);
          };
          if_block(node_3, ($$render) => {
            if (get(allDayEvents).length > ALLDAY_MAX) $$render(consequent_1);
          });
        }
        reset(div_2);
        template_effect(() => classes_2 = set_class(div_2, 1, "mb-allday svelte-zbkzcp", null, classes_2, { "mb-allday--expanded": get(allDayExpanded) }));
        append($$anchor2, div_2);
      };
      if_block(node, ($$render) => {
        if (get(allDayEvents).length > 0) $$render(consequent_2);
      });
    }
    var div_3 = sibling(node, 2);
    var div_4 = child(div_3);
    let styles_3;
    var node_4 = child(div_4);
    each(node_4, 17, () => ({ length: get(hourCount) }), index, ($$anchor2, _, h) => {
      const hour = /* @__PURE__ */ user_derived(() => get(startHour) + h);
      const blocked = /* @__PURE__ */ user_derived(() => isBlockedAt(get(hour)));
      var div_5 = root_6$3();
      let classes_4;
      set_style(div_5, "", {}, { top: `${h * HOUR_HEIGHT}px`, height: "64px" });
      var div_6 = child(div_5);
      var text_3 = child(div_6, true);
      reset(div_6);
      var node_5 = sibling(div_6, 4);
      {
        var consequent_4 = ($$anchor3) => {
          const slot = /* @__PURE__ */ user_derived(() => get(blockedSlots).find((s) => (!s.day || s.day === (new Date(get(dayMs)).getDay() === 0 ? 7 : new Date(get(dayMs)).getDay())) && get(hour) >= s.start && get(hour) < s.end));
          var fragment = comment();
          var node_6 = first_child(fragment);
          {
            var consequent_3 = ($$anchor4) => {
              var span_2 = root_5$3();
              var text_4 = child(span_2, true);
              reset(span_2);
              template_effect(() => set_text(text_4, get(slot).label));
              append($$anchor4, span_2);
            };
            if_block(node_6, ($$render) => {
              if (get(slot)?.label) $$render(consequent_3);
            });
          }
          append($$anchor3, fragment);
        };
        if_block(node_5, ($$render) => {
          if (get(blocked) && get(blockedSlots)) $$render(consequent_4);
        });
      }
      reset(div_5);
      template_effect(
        ($0) => {
          classes_4 = set_class(div_5, 1, "mb-hour svelte-zbkzcp", null, classes_4, { "mb-hour--blocked": get(blocked) });
          set_text(text_3, $0);
        },
        [() => fmtH(get(hour), $$props.locale)]
      );
      append($$anchor2, div_5);
    });
    var node_7 = sibling(node_4, 2);
    {
      var consequent_5 = ($$anchor2) => {
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
        append($$anchor2, div_7);
      };
      if_block(node_7, ($$render) => {
        if (get(nowOffset) >= 0) $$render(consequent_5);
      });
    }
    var node_8 = sibling(node_7, 2);
    each(node_8, 17, () => get(positionedEvents), (p) => p.ev.id, ($$anchor2, p) => {
      var button_2 = root_17();
      let classes_5;
      let styles_5;
      var div_8 = sibling(child(button_2), 2);
      var node_9 = child(div_8);
      EventContent(node_9, {
        get event() {
          return get(p).ev;
        },
        children: ($$anchor3, $$slotProps) => {
          var fragment_1 = root_13();
          var span_4 = first_child(fragment_1);
          var text_6 = child(span_4, true);
          reset(span_4);
          var node_10 = sibling(span_4, 2);
          {
            var consequent_6 = ($$anchor4) => {
              var span_5 = root_8$3();
              var text_7 = child(span_5);
              reset(span_5);
              template_effect(($0, $1) => set_text(text_7, `${$0 ?? ""} – ${$1 ?? ""}`), [
                () => fmtTime$1(get(p).ev.start, $$props.locale),
                () => fmtTime$1(get(p).ev.end, $$props.locale)
              ]);
              append($$anchor4, span_5);
            };
            if_block(node_10, ($$render) => {
              if (get(p).height > 32) $$render(consequent_6);
            });
          }
          var node_11 = sibling(node_10, 2);
          {
            var consequent_7 = ($$anchor4) => {
              var span_6 = root_9$1();
              var text_8 = child(span_6, true);
              reset(span_6);
              template_effect(() => set_text(text_8, get(p).ev.subtitle));
              append($$anchor4, span_6);
            };
            if_block(node_11, ($$render) => {
              if (get(p).ev.subtitle && get(p).height > 56) $$render(consequent_7);
            });
          }
          var node_12 = sibling(node_11, 2);
          {
            var consequent_8 = ($$anchor4) => {
              var span_7 = root_10$1();
              var text_9 = child(span_7, true);
              reset(span_7);
              template_effect(() => set_text(text_9, get(p).ev.location));
              append($$anchor4, span_7);
            };
            if_block(node_12, ($$render) => {
              if (get(p).ev.location && get(p).height > 72) $$render(consequent_8);
            });
          }
          var node_13 = sibling(node_12, 2);
          {
            var consequent_9 = ($$anchor4) => {
              var div_9 = root_12$1();
              each(div_9, 21, () => get(p).ev.tags, index, ($$anchor5, tag) => {
                var span_8 = root_11$1();
                var text_10 = child(span_8, true);
                reset(span_8);
                template_effect(() => set_text(text_10, get(tag)));
                append($$anchor5, span_8);
              });
              reset(div_9);
              append($$anchor4, div_9);
            };
            if_block(node_13, ($$render) => {
              if (get(p).ev.tags?.length && get(p).height > 88) $$render(consequent_9);
            });
          }
          template_effect(() => set_text(text_6, get(p).ev.title));
          append($$anchor3, fragment_1);
        },
        $$slots: { default: true }
      });
      reset(div_8);
      var node_14 = sibling(div_8, 2);
      {
        var consequent_10 = ($$anchor3) => {
          var span_9 = root_14();
          append($$anchor3, span_9);
        };
        var consequent_11 = ($$anchor3) => {
          var span_10 = root_15();
          var text_11 = child(span_10, true);
          reset(span_10);
          template_effect(() => set_text(text_11, get(L).upNext));
          append($$anchor3, span_10);
        };
        if_block(node_14, ($$render) => {
          if (get(p).isCurrent) $$render(consequent_10);
          else if (get(p).isNext) $$render(consequent_11, 1);
        });
      }
      var node_15 = sibling(node_14, 2);
      {
        var consequent_12 = ($$anchor3) => {
          var fragment_2 = root_16();
          var span_11 = first_child(fragment_2);
          var span_12 = sibling(span_11, 2);
          delegated("pointerdown", span_11, (e) => onResizePointerDown(e, get(p).ev, "start"));
          delegated("pointerdown", span_12, (e) => onResizePointerDown(e, get(p).ev, "end"));
          append($$anchor3, fragment_2);
        };
        if_block(node_15, ($$render) => {
          if (!readOnly() && !get(p).ev.data?.readOnly) $$render(consequent_12);
        });
      }
      reset(button_2);
      template_effect(
        ($0, $1, $2) => {
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
        },
        [
          () => statusText(get(p).ev),
          () => fmtTime$1(get(p).ev.start, $$props.locale),
          () => fmtTime$1(get(p).ev.end, $$props.locale)
        ]
      );
      delegated("click", button_2, (e) => {
        e.stopPropagation();
        if (suppressEventClick) {
          suppressEventClick = false;
          return;
        }
        $$props.oneventclick?.(get(p).ev);
      });
      event("pointerenter", button_2, () => get(oneventhover)?.(get(p).ev));
      append($$anchor2, button_2);
    });
    var node_16 = sibling(node_8, 2);
    {
      var consequent_13 = ($$anchor2) => {
        const gTop = /* @__PURE__ */ user_derived(() => ((get(drag).payload.start.getTime() - get(dayMs)) / HOUR_MS - get(startHour)) * HOUR_HEIGHT);
        const gH = /* @__PURE__ */ user_derived(() => Math.max(12, (get(drag).payload.end.getTime() - get(drag).payload.start.getTime()) / HOUR_MS * HOUR_HEIGHT));
        var div_10 = root_18();
        let styles_6;
        var span_13 = child(div_10);
        var text_12 = child(span_13);
        reset(span_13);
        reset(div_10);
        template_effect(
          ($0, $1) => {
            styles_6 = set_style(div_10, "", styles_6, {
              top: `${get(gTop) ?? ""}px`,
              height: `${get(gH) ?? ""}px`
            });
            set_text(text_12, `${$0 ?? ""} – ${$1 ?? ""}`);
          },
          [
            () => fmtTime$1(get(drag).payload.start, $$props.locale),
            () => fmtTime$1(get(drag).payload.end, $$props.locale)
          ]
        );
        append($$anchor2, div_10);
      };
      if_block(node_16, ($$render) => {
        if (!readOnly() && get(drag)?.active && get(drag).mode === "create" && get(drag).payload) $$render(consequent_13);
      });
    }
    reset(div_4);
    reset(div_3);
    bind_this(div_3, ($$value) => gridEl = $$value, () => gridEl);
    var node_17 = sibling(div_3, 2);
    {
      var consequent_15 = ($$anchor2) => {
        var div_11 = root_20();
        var node_18 = child(div_11);
        {
          var consequent_14 = ($$anchor3) => {
            var fragment_3 = comment();
            var node_19 = first_child(fragment_3);
            snippet(node_19, () => ctx.emptySnippet);
            append($$anchor3, fragment_3);
          };
          var alternate = ($$anchor3) => {
            var span_14 = root_19();
            var text_13 = child(span_14, true);
            reset(span_14);
            template_effect(() => set_text(text_13, get(L).nothingScheduled));
            append($$anchor3, span_14);
          };
          if_block(node_18, ($$render) => {
            if (ctx.emptySnippet) $$render(consequent_14);
            else $$render(alternate, -1);
          });
        }
        reset(div_11);
        append($$anchor2, div_11);
      };
      if_block(node_17, ($$render) => {
        if (get(isEmpty)) $$render(consequent_15);
      });
    }
    reset(div_1);
    reset(div);
    template_effect(() => {
      classes = set_class(div, 1, "mb svelte-zbkzcp", null, classes, { "mb--auto": get(autoHeight) });
      styles = set_style(div, style() || void 0, styles, {
        height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%"
      });
      set_attribute(div, "aria-label", get(L).dayPlanner);
      classes_1 = set_class(div_1, 1, "mb-swipe svelte-zbkzcp", null, classes_1, { "mb-swipe--animate": get(swipeAnimate) });
      styles_1 = set_style(div_1, "", styles_1, {
        transform: get(swipeOffset) !== 0 ? `translateX(${get(swipeOffset)}px)` : void 0
      });
      set_attribute(div_3, "aria-label", get(L).scrollableDayPlanner);
      styles_3 = set_style(div_4, "", styles_3, { height: `${get(gridHeight) ?? ""}px` });
    });
    delegated(
      "touchstart",
      div,
      function(...$$args) {
        swipe.ontouchstart?.apply(this, $$args);
      }
    );
    delegated(
      "touchmove",
      div,
      function(...$$args) {
        swipe.ontouchmove?.apply(this, $$args);
      }
    );
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
      const rangeStart = new Date(get(weekStart) - 7 * DAY_MS);
      const rangeEnd = new Date(get(weekStart) + (get(customDays) + 7) * DAY_MS);
      get(loadRangeCtx).set({ start: rangeStart, end: rangeEnd });
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
      const next2 = new Set(get(expandedDays));
      if (next2.has(ms)) next2.delete(ms);
      else next2.add(ms);
      set(expandedDays, next2, true);
    }
    function fmtTime2(d) {
      return fmtTime$1(d, $$props.locale);
    }
    function evTimeLabel(ev) {
      if (isAllDay(ev) || isMultiDay(ev)) return get(L).allDay;
      return `${fmtTime2(ev.start)} – ${fmtTime2(ev.end)}`;
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
    each(div_1, 21, () => get(dayCells), (cell) => cell.ms, ($$anchor2, cell) => {
      var div_2 = root_7$2();
      let classes_2;
      var button = child(div_2);
      var div_3 = sibling(button, 2);
      var span = child(div_3);
      let classes_3;
      var text2 = child(span, true);
      reset(span);
      var node = sibling(span, 2);
      {
        var consequent = ($$anchor3) => {
          var span_1 = root$2();
          let classes_4;
          var text_1 = child(span_1, true);
          reset(span_1);
          template_effect(() => {
            classes_4 = set_class(span_1, 1, "mw-day-num svelte-1d18hkf", null, classes_4, { "mw-day-num--today": get(cell).isToday });
            set_text(text_1, get(cell).dayNum);
          });
          append($$anchor3, span_1);
        };
        if_block(node, ($$render) => {
          if (get(showDates)) $$render(consequent);
        });
      }
      reset(div_3);
      var div_4 = sibling(div_3, 2);
      var node_1 = child(div_4);
      {
        var consequent_1 = ($$anchor3) => {
          var span_2 = root_1$2();
          var text_2 = child(span_2, true);
          reset(span_2);
          template_effect(() => set_text(text_2, get(L).noEvents));
          append($$anchor3, span_2);
        };
        var alternate_1 = ($$anchor3) => {
          var fragment = root_6$2();
          var node_2 = first_child(fragment);
          each(
            node_2,
            17,
            () => get(expandedDays).has(get(cell).ms) ? get(cell).events : get(cell).events.slice(0, MAX_EVENTS),
            (ev) => ev.id,
            ($$anchor4, ev) => {
              var button_1 = root_4$2();
              let classes_5;
              let styles_2;
              var div_5 = sibling(child(button_1), 2);
              var node_3 = child(div_5);
              EventContent(node_3, {
                get event() {
                  return get(ev);
                },
                children: ($$anchor5, $$slotProps) => {
                  var fragment_1 = root_3$2();
                  var span_3 = first_child(fragment_1);
                  var text_3 = child(span_3, true);
                  reset(span_3);
                  var node_4 = sibling(span_3, 2);
                  {
                    var consequent_2 = ($$anchor6) => {
                      var span_4 = root_2$2();
                      var text_4 = child(span_4, true);
                      reset(span_4);
                      template_effect(() => set_text(text_4, get(L).allDay));
                      append($$anchor6, span_4);
                    };
                    var d_1 = /* @__PURE__ */ user_derived(() => isAllDay(get(ev)) || isMultiDay(get(ev)));
                    var alternate = ($$anchor6) => {
                      var span_5 = root_2$2();
                      var text_5 = child(span_5, true);
                      reset(span_5);
                      template_effect(($0) => set_text(text_5, $0), [() => fmtTime2(get(ev).start)]);
                      append($$anchor6, span_5);
                    };
                    if_block(node_4, ($$render) => {
                      if (get(d_1)) $$render(consequent_2);
                      else $$render(alternate, -1);
                    });
                  }
                  template_effect(() => set_text(text_3, get(ev).title));
                  append($$anchor5, fragment_1);
                },
                $$slots: { default: true }
              });
              reset(div_5);
              reset(button_1);
              template_effect(
                ($0, $1, $2) => {
                  classes_5 = set_class(button_1, 1, "mw-ev svelte-1d18hkf", null, classes_5, $0);
                  set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}${$1 ?? ""}, ${$2 ?? ""}`);
                  styles_2 = set_style(button_1, "", styles_2, { "--ev-color": get(ev).color ?? "var(--dt-accent)" });
                },
                [
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
                ]
              );
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
              append($$anchor4, button_1);
            }
          );
          var node_5 = sibling(node_2, 2);
          {
            var consequent_3 = ($$anchor4) => {
              var button_2 = root_5$2();
              var text_6 = child(button_2, true);
              reset(button_2);
              template_effect(
                ($0, $1) => {
                  set_attribute(button_2, "aria-expanded", $0);
                  set_text(text_6, $1);
                },
                [
                  () => get(expandedDays).has(get(cell).ms),
                  () => get(expandedDays).has(get(cell).ms) ? get(L).showLess : get(L).nMore(get(cell).totalCount - MAX_EVENTS)
                ]
              );
              delegated("click", button_2, () => toggleExpand(get(cell).ms));
              append($$anchor4, button_2);
            };
            if_block(node_5, ($$render) => {
              if (get(cell).totalCount > MAX_EVENTS) $$render(consequent_3);
            });
          }
          append($$anchor3, fragment);
        };
        if_block(node_1, ($$render) => {
          if (get(cell).events.length === 0) $$render(consequent_1);
          else $$render(alternate_1, -1);
        });
      }
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
        set_text(text2, get(cell).dayName);
      });
      delegated("click", button, () => handleDayTap(get(cell).ms));
      delegated("keydown", button, (e) => handleDayKeydown(e, get(cell).ms));
      append($$anchor2, div_2);
    });
    reset(div_1);
    reset(div);
    template_effect(() => {
      classes = set_class(div, 1, "mw svelte-1d18hkf", null, classes, { "mw--auto": get(autoHeight) });
      styles = set_style(div, style() || void 0, styles, {
        height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%"
      });
      set_attribute(div, "aria-label", get(L).weekAhead);
      classes_1 = set_class(div_1, 1, "mw-list svelte-1d18hkf", null, classes_1, { "mw-list--animate": get(swipeAnimate) });
      styles_1 = set_style(div_1, "", styles_1, {
        transform: get(swipeOffset) !== 0 ? `translateX(${get(swipeOffset)}px)` : void 0
      });
    });
    delegated(
      "touchstart",
      div,
      function(...$$args) {
        swipe.ontouchstart?.apply(this, $$args);
      }
    );
    delegated(
      "touchmove",
      div,
      function(...$$args) {
        swipe.ontouchmove?.apply(this, $$args);
      }
    );
    delegated("touchend", div, function(...$$args) {
      swipe.ontouchend?.apply(this, $$args);
    });
    event("touchcancel", div, function(...$$args) {
      swipe.ontouchcancel?.apply(this, $$args);
    });
    append($$anchor, div);
    pop();
  }
  delegate(["touchstart", "touchmove", "touchend", "click", "keydown"]);
  var rest_excludes = /* @__PURE__ */ new Set(["$$slots", "$$events", "$$legacy", "mode"]);
  function Mobile($$anchor, $$props) {
    let mode = prop($$props, "mode", 3, "day"), rest = /* @__PURE__ */ rest_props($$props, rest_excludes);
    var fragment = comment();
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        MobileDay($$anchor2, spread_props(() => rest));
      };
      var alternate = ($$anchor2) => {
        MobileWeek($$anchor2, spread_props(() => rest));
      };
      if_block(node, ($$render) => {
        if (mode() === "day") $$render(consequent);
        else $$render(alternate, -1);
      });
    }
    append($$anchor, fragment);
  }
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
        start: new Date(get(range).start.getTime() - 7 * DAY_MS),
        end: new Date(get(range).end.getTime() + 7 * DAY_MS)
      });
      return () => get(loadRangeCtx).set(null);
    });
    let expandedMs = /* @__PURE__ */ state(null);
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
      const el = get(bodyEl)?.querySelector(`[data-ms="${target}"]`);
      el?.focus();
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
        case " ":
          if (!cell.isDisabled) {
            e.preventDefault();
            get(ondayclick)?.(cell.date);
          }
          break;
      }
    }
    function overflowClick(e, cell) {
      e.stopPropagation();
      if (get(ondayclick)) get(ondayclick)(cell.date);
      else set(expandedMs, get(expandedMs) === cell.ms ? null : cell.ms, true);
    }
    function cellLabel(cell) {
      const date = cell.date.toLocaleDateString($$props.locale, { weekday: "long", day: "numeric", month: "long" });
      return `${date}, ${get(L).nEvents(cell.all.length)}`;
    }
    function eventsForDay(ms) {
      const dayStart = ms;
      const dayEnd = ms + DAY_MS;
      return events().filter((e) => e.start.getTime() < dayEnd && e.end.getTime() > dayStart).sort((a, b) => {
        const aAll = isAllDay(a) ? 0 : 1;
        const bAll = isAllDay(b) ? 0 : 1;
        return aAll - bAll || a.start.getTime() - b.start.getTime();
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
    each(div_1, 21, () => get(weekdayLabels), index, ($$anchor2, name) => {
      var div_2 = root$1();
      var text2 = child(div_2, true);
      reset(div_2);
      template_effect(() => set_text(text2, get(name)));
      append($$anchor2, div_2);
    });
    reset(div_1);
    var div_3 = sibling(div_1, 2);
    let styles_1;
    each(div_3, 21, () => get(weeks), index, ($$anchor2, row) => {
      var div_4 = root_7$1();
      each(div_4, 21, () => get(row), (cell) => cell.ms, ($$anchor3, cell) => {
        var div_5 = root_6$1();
        let classes_1;
        var span = child(div_5);
        let classes_2;
        var text_1 = child(span, true);
        reset(span);
        var div_6 = sibling(span, 2);
        var node = child(div_6);
        each(node, 17, () => get(expandedMs) === get(cell).ms ? get(cell).all : get(cell).chips, (ev) => ev.id + get(cell).ms, ($$anchor4, ev) => {
          var fragment = comment();
          var node_1 = first_child(fragment);
          {
            var consequent = ($$anchor5) => {
              var button = root_1$1();
              let classes_3;
              var node_2 = child(button);
              snippet(node_2, () => get(eventSnippet), () => get(ev));
              reset(button);
              template_effect(() => classes_3 = set_class(button, 1, "mg-chip mg-chip--custom svelte-pvjuld", null, classes_3, { "mg-chip--selected": get(ev).id === selectedEventId() }));
              delegated("click", button, (e) => {
                e.stopPropagation();
                $$props.oneventclick?.(get(ev));
              });
              event("mouseenter", button, () => get(oneventhover)?.(get(ev)));
              append($$anchor5, button);
            };
            var alternate = ($$anchor5) => {
              var button_1 = root_3$1();
              let classes_4;
              let styles_2;
              var node_3 = sibling(child(button_1), 2);
              {
                var consequent_1 = ($$anchor6) => {
                  var span_1 = root_2$1();
                  var text_2 = child(span_1, true);
                  reset(span_1);
                  template_effect(($0) => set_text(text_2, $0), [() => chipTime(get(ev))]);
                  append($$anchor6, span_1);
                };
                var d = /* @__PURE__ */ user_derived(() => chipTime(get(ev)));
                if_block(node_3, ($$render) => {
                  if (get(d)) $$render(consequent_1);
                });
              }
              var span_2 = sibling(node_3, 2);
              var text_3 = child(span_2, true);
              reset(span_2);
              reset(button_1);
              template_effect(
                ($0) => {
                  classes_4 = set_class(button_1, 1, "mg-chip svelte-pvjuld", null, classes_4, {
                    "mg-chip--selected": get(ev).id === selectedEventId(),
                    "mg-chip--cancelled": get(ev).status === "cancelled"
                  });
                  set_attribute(button_1, "title", get(ev).title);
                  set_attribute(button_1, "aria-label", `${get(ev).title ?? ""}${$0 ?? ""}`);
                  styles_2 = set_style(button_1, "", styles_2, { "--mg-chip-color": get(ev).color ?? "var(--dt-accent)" });
                  set_text(text_3, get(ev).title);
                },
                [() => chipTime(get(ev)) ? `, ${chipTime(get(ev))}` : ""]
              );
              delegated("click", button_1, (e) => {
                e.stopPropagation();
                $$props.oneventclick?.(get(ev));
              });
              event("mouseenter", button_1, () => get(oneventhover)?.(get(ev)));
              append($$anchor5, button_1);
            };
            if_block(node_1, ($$render) => {
              if (get(eventSnippet)) $$render(consequent);
              else $$render(alternate, -1);
            });
          }
          append($$anchor4, fragment);
        });
        var node_4 = sibling(node, 2);
        {
          var consequent_2 = ($$anchor4) => {
            var button_2 = root_4$1();
            var text_4 = child(button_2, true);
            reset(button_2);
            template_effect(
              ($0, $1) => {
                set_attribute(button_2, "aria-expanded", get(ondayclick) ? void 0 : false);
                set_attribute(button_2, "aria-label", $0);
                set_text(text_4, $1);
              },
              [
                () => get(L).nMore(get(cell).overflow),
                () => get(dotsMode) ? `+${get(cell).overflow}` : get(L).nMore(get(cell).overflow)
              ]
            );
            delegated("click", button_2, (e) => overflowClick(e, get(cell)));
            append($$anchor4, button_2);
          };
          var consequent_3 = ($$anchor4) => {
            var button_3 = root_5$1();
            var text_5 = child(button_3, true);
            reset(button_3);
            template_effect(() => set_text(text_5, get(L).showLess));
            delegated("click", button_3, (e) => {
              e.stopPropagation();
              set(expandedMs, null);
            });
            append($$anchor4, button_3);
          };
          if_block(node_4, ($$render) => {
            if (get(cell).overflow > 0 && get(expandedMs) !== get(cell).ms) $$render(consequent_2);
            else if (get(expandedMs) === get(cell).ms) $$render(consequent_3, 1);
          });
        }
        reset(div_6);
        reset(div_5);
        template_effect(
          ($0) => {
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
          },
          [() => cellLabel(get(cell))]
        );
        delegated("click", div_5, () => {
          if (!get(cell).isDisabled) get(ondayclick)?.(get(cell).date);
        });
        delegated("focusin", div_5, () => set(focusMs, get(cell).ms, true));
        delegated("keydown", div_5, (e) => cellKeydown(e, get(cell)));
        append($$anchor3, div_5);
      });
      reset(div_4);
      append($$anchor2, div_4);
    });
    reset(div_3);
    bind_this(div_3, ($$value) => set(bodyEl, $$value), () => get(bodyEl));
    reset(div);
    template_effect(() => {
      classes = set_class(div, 1, "mg svelte-pvjuld", null, classes, { "mg--auto": get(autoHeight), "mg--dots": get(dotsMode) });
      styles = set_style(div, style() || void 0, styles, {
        height: get(autoHeight) ? void 0 : height() ? `${height()}px` : "100%"
      });
      set_attribute(div, "aria-label", get(L).month);
      styles_1 = set_style(div_3, "", styles_1, { "--mg-rows": get(weeks).length });
    });
    append($$anchor, div);
    pop();
  }
  delegate(["click", "focusin", "keydown"]);
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
    const MOBILE_BREAKPOINT = 768;
    const DEFAULT_VIEWS = [
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
    ];
    let views = prop($$props, "views", 3, DEFAULT_VIEWS), theme = prop($$props, "theme", 3, auto), mondayStart = prop($$props, "mondayStart", 3, true), heightProp = prop($$props, "height", 3, 600), borderRadius = prop($$props, "borderRadius", 3, 12), readOnly = prop($$props, "readOnly", 3, false), snapInterval = prop($$props, "snapInterval", 3, 15), showModePills = prop($$props, "showModePills", 3, true), showNavigation = prop($$props, "showNavigation", 3, true), equalDays = prop($$props, "equalDays", 3, false), showDates = prop($$props, "showDates", 3, true), compact = prop($$props, "compact", 3, false), mobileProp = prop($$props, "mobile", 3, "auto");
    const unzone = (d) => $$props.timezone ? fromZonedTime(d, $$props.timezone) : d;
    const effectiveCreate = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.oneventcreate ? void 0 : (range) => $$props.oneventcreate({ start: unzone(range.start), end: unzone(range.end) }));
    const effectiveMove = /* @__PURE__ */ user_derived(() => readOnly() || !$$props.oneventmove ? void 0 : (ev, start, end) => $$props.oneventmove(ev, unzone(start), unzone(end)));
    function handleEventClick(ev) {
      selection.select(ev.id);
      $$props.oneventclick?.(ev);
    }
    let containerWidth = /* @__PURE__ */ state(proxy(typeof window !== "undefined" && window.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches ? window.innerWidth : 0));
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
      const stopTheme = observeHostTheme(
        get(calEl),
        (vars) => {
          set(probedTheme, vars, true);
        },
        opts
      );
      return () => {
        ro.disconnect();
        stopTheme?.();
      };
    });
    const effectiveTheme = /* @__PURE__ */ user_derived(() => theme() === auto && $$props.autoTheme !== false ? get(probedTheme) : theme());
    const effectiveAdapter = /* @__PURE__ */ user_derived(() => $$props.timezone ? wrapAdapterWithTimezone($$props.adapter, $$props.timezone) : $$props.adapter);
    const store = /* @__PURE__ */ user_derived(() => createEventStore(get(effectiveAdapter)));
    const viewState = createViewState(untrack(() => ({
      view: $$props.view ?? views()[0]?.id,
      mondayStart: mondayStart(),
      // Focus lives on the zoned plane too — day boundaries follow the zone.
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
        const durationMs = end.getTime() - start.getTime();
        const durationMin = durationMs / 6e4;
        if ($$props.minDuration && durationMin < $$props.minDuration) {
          if (mode === "resize-start") {
            start = new Date(end.getTime() - $$props.minDuration * 6e4);
          } else {
            end = new Date(start.getTime() + $$props.minDuration * 6e4);
          }
        }
        if ($$props.maxDuration && durationMin > $$props.maxDuration) {
          if (mode === "resize-start") {
            start = new Date(end.getTime() - $$props.maxDuration * 6e4);
          } else {
            end = new Date(start.getTime() + $$props.maxDuration * 6e4);
          }
        }
      }
      if ($$props.disabledDates?.length) {
        const startDay = new Date(start);
        startDay.setHours(0, 0, 0, 0);
        const endDay = new Date(end.getTime() - 1);
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
      if ((mode === "move" || mode === "resize-start" || mode === "resize-end") && payload.eventId) {
        try {
          await get(store).move(payload.eventId, start, end);
          const ev = get(store).byId(payload.eventId);
          if (ev) get(effectiveMove)?.(ev, start, end);
        } catch (e) {
          const msg = e instanceof Error ? e.message : "";
          if (msg.includes("read-only")) {
            const ev = get(store).byId(payload.eventId);
            if (ev) get(effectiveMove)?.(ev, start, end);
          } else if (!msg.includes("not found")) {
            if ($$props.onerror) $$props.onerror(e instanceof Error ? e : new Error(String(e)));
            else console.warn("[calendar] drag commit failed:", e);
          }
        }
      } else if (mode === "create") {
        get(effectiveCreate)?.({ start, end });
      }
    }
    let viewLoadRange = /* @__PURE__ */ state(null);
    setContext("calendar", {
      // Engine objects (hold $state internally)
      get store() {
        return get(store);
      },
      viewState,
      selection,
      drag,
      commitDrag,
      // Callbacks
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
      // Config (reactive via getters)
      get readOnly() {
        return readOnly();
      },
      get visibleHours() {
        return $$props.visibleHours;
      },
      get snapInterval() {
        return snapInterval();
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
      get labels() {
        return get(mergedLabels);
      },
      // Load range (read/write)
      get loadRange() {
        return get(viewLoadRange);
      },
      setLoadRange(range) {
        set(viewLoadRange, range, true);
      }
    });
    user_effect(() => {
      const range = get(viewLoadRange) ?? viewState.range;
      get(store).load({ start: range.start, end: range.end });
    });
    untrack(() => get(store).load({ start: viewState.range.start, end: viewState.range.end }));
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
      if (viewState.mondayStart !== mondayStart()) {
        viewState.setMondayStart(mondayStart());
      }
    });
    user_effect(() => {
      $$props.onviewchange?.(viewState.view);
    });
    user_effect(() => {
      if (get(store).error && $$props.onerror) $$props.onerror(new Error(get(store).error));
    });
    const resolvedView = /* @__PURE__ */ user_derived(() => {
      const requested = views().find((v) => v.id === viewState.view) ?? views()[0];
      if (!get(useMobile) || !requested) return requested;
      if (requested.id.endsWith("-mobile")) return requested;
      if (requested.label === "Agenda") return requested;
      const mobileVariant = views().find((v) => v.id === `${requested.mode}-mobile`);
      return mobileVariant ?? requested;
    });
    const activeView = /* @__PURE__ */ user_derived(() => get(resolvedView));
    const desktopViews = /* @__PURE__ */ user_derived(() => views().filter((v) => !v.id.endsWith("-mobile")));
    const dateLabel = /* @__PURE__ */ user_derived(() => {
      if (!showDates()) {
        return "";
      }
      if (viewState.mode === "day") {
        return viewState.focusDate.toLocaleDateString($$props.locale, { weekday: "long", month: "short", day: "numeric" });
      }
      if (viewState.mode === "week") {
        return fmtWeekRange(viewState.range.start.getTime(), $$props.locale, viewState.range.end.getTime() - 1);
      }
      return viewState.focusDate.toLocaleDateString($$props.locale, { month: "long", year: "numeric" });
    });
    const modes = /* @__PURE__ */ user_derived(() => {
      const g = new Set(get(desktopViews).map((v) => v.mode));
      return ["day", "week", "month"].filter((key) => g.has(key));
    });
    const mergedLabels = /* @__PURE__ */ user_derived(() => $$props.labels ? { ...getLabels(), ...$$props.labels } : getLabels());
    const L = /* @__PURE__ */ user_derived(() => get(mergedLabels));
    let lastViewLabel = /* @__PURE__ */ state(void 0);
    user_effect(() => {
      const current = views().find((v) => v.id === viewState.view);
      if (current && current.mode !== "month") set(lastViewLabel, current.label, true);
    });
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
      for (const v of get(desktopViews)) {
        if (v.mode === viewState.mode && !seen.includes(v.label)) seen.push(v.label);
      }
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
    const viewIncludesToday = /* @__PURE__ */ user_derived(() => {
      const now = /* @__PURE__ */ new Date();
      if (viewState.mode === "month") {
        const f = viewState.focusDate;
        return f.getMonth() === now.getMonth() && f.getFullYear() === now.getFullYear();
      }
      const { start, end } = viewState.range;
      return now.getTime() >= start.getTime() && now.getTime() < end.getTime();
    });
    const resolvedDir = /* @__PURE__ */ user_derived(() => {
      if ($$props.dir) return $$props.dir;
      if (!$$props.locale) return void 0;
      try {
        const info = new Intl.Locale($$props.locale);
        const direction = info.textInfo?.direction ?? info.getTextInfo?.().direction;
        return direction === "rtl" ? "rtl" : void 0;
      } catch {
        return void 0;
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
    {
      var consequent = ($$anchor2) => {
        var fragment = comment();
        var node_1 = first_child(fragment);
        snippet(node_1, () => $$props.header, () => get(headerCtx));
        append($$anchor2, fragment);
      };
      var consequent_6 = ($$anchor2) => {
        const titleBelow = /* @__PURE__ */ user_derived(() => get(stackHeader) && !!get(dateLabel));
        var fragment_1 = root_5();
        var div_1 = first_child(fragment_1);
        let classes_1;
        var div_2 = child(div_1);
        var node_2 = child(div_2);
        {
          var consequent_1 = ($$anchor3) => {
            var div_3 = root_1();
            each(div_3, 20, () => get(modes), (g) => g, ($$anchor4, g) => {
              var button = root();
              let classes_2;
              var text2 = child(button, true);
              reset(button);
              template_effect(() => {
                classes_2 = set_class(button, 1, "cal-m-pill svelte-1b53e7w", null, classes_2, { "cal-m-pill--active": viewState.mode === g });
                set_attribute(button, "aria-checked", viewState.mode === g);
                set_text(text2, g === "day" ? get(L).day : g === "week" ? get(L).week : get(L).month);
              });
              delegated("click", button, () => switchMode(g));
              append($$anchor4, button);
            });
            reset(div_3);
            template_effect(() => set_attribute(div_3, "aria-label", get(L).viewMode));
            append($$anchor3, div_3);
          };
          if_block(node_2, ($$render) => {
            if (showModePills() && get(modes).length > 1) $$render(consequent_1);
          });
        }
        reset(div_2);
        var node_3 = sibling(div_2, 2);
        {
          var consequent_2 = ($$anchor3) => {
            var span = root_2();
            var text_1 = child(span, true);
            reset(span);
            template_effect(() => set_text(text_1, get(dateLabel)));
            append($$anchor3, span);
          };
          if_block(node_3, ($$render) => {
            if (!get(titleBelow)) $$render(consequent_2);
          });
        }
        var div_4 = sibling(node_3, 2);
        var node_4 = child(div_4);
        {
          var consequent_3 = ($$anchor3) => {
            var fragment_2 = comment();
            var node_5 = first_child(fragment_2);
            snippet(node_5, () => $$props.navigation, () => get(navCtx));
            append($$anchor3, fragment_2);
          };
          var consequent_4 = ($$anchor3) => {
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
            append($$anchor3, fragment_3);
          };
          if_block(node_4, ($$render) => {
            if ($$props.navigation) $$render(consequent_3);
            else if (showNavigation()) $$render(consequent_4, 1);
          });
        }
        reset(div_4);
        reset(div_1);
        var node_6 = sibling(div_1, 2);
        {
          var consequent_5 = ($$anchor3) => {
            var div_5 = root_4();
            var span_1 = child(div_5);
            var text_3 = child(span_1, true);
            reset(span_1);
            reset(div_5);
            template_effect(() => set_text(text_3, get(dateLabel)));
            append($$anchor3, div_5);
          };
          if_block(node_6, ($$render) => {
            if (get(titleBelow)) $$render(consequent_5);
          });
        }
        template_effect(() => classes_1 = set_class(div_1, 1, "cal-m-hd svelte-1b53e7w", null, classes_1, {
          "cal-m-hd--stack": get(stackHeader),
          "cal-m-hd--titled": get(titleBelow)
        }));
        append($$anchor2, fragment_1);
      };
      var consequent_11 = ($$anchor2) => {
        var div_6 = root_9();
        var div_7 = child(div_6);
        var node_7 = child(div_7);
        {
          var consequent_7 = ($$anchor3) => {
            var fragment_4 = comment();
            var node_8 = first_child(fragment_4);
            snippet(node_8, () => $$props.navigation, () => get(navCtx));
            append($$anchor3, fragment_4);
          };
          var consequent_8 = ($$anchor3) => {
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
            append($$anchor3, fragment_5);
          };
          if_block(node_7, ($$render) => {
            if ($$props.navigation) $$render(consequent_7);
            else if (showNavigation()) $$render(consequent_8, 1);
          });
        }
        reset(div_7);
        var span_2 = sibling(div_7, 2);
        var text_5 = child(span_2, true);
        reset(span_2);
        var div_8 = sibling(span_2, 2);
        var node_9 = child(div_8);
        {
          var consequent_9 = ($$anchor3) => {
            var div_9 = root_7();
            each(div_9, 20, () => get(labelsForMode), (label) => label, ($$anchor4, label) => {
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
              append($$anchor4, button_7);
            });
            reset(div_9);
            template_effect(() => set_attribute(div_9, "aria-label", get(L).viewMode));
            append($$anchor3, div_9);
          };
          if_block(node_9, ($$render) => {
            if (showModePills() && get(labelsForMode).length > 1) $$render(consequent_9);
          });
        }
        var node_10 = sibling(node_9, 2);
        {
          var consequent_10 = ($$anchor3) => {
            var div_10 = root_8();
            each(div_10, 20, () => get(modes), (g) => g, ($$anchor4, g) => {
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
              append($$anchor4, button_8);
            });
            reset(div_10);
            template_effect(() => set_attribute(div_10, "aria-label", get(L).viewMode));
            append($$anchor3, div_10);
          };
          if_block(node_10, ($$render) => {
            if (showModePills() && get(modes).length > 1) $$render(consequent_10);
          });
        }
        reset(div_8);
        reset(div_6);
        template_effect(() => set_text(text_5, get(dateLabel)));
        append($$anchor2, div_6);
      };
      if_block(node, ($$render) => {
        if ($$props.header) $$render(consequent);
        else if (get(useMobile) && (showNavigation() || showModePills() && get(modes).length > 1 || get(dateLabel))) $$render(consequent_6, 1);
        else if (showNavigation() || showModePills() && get(modes).length > 1 || get(dateLabel)) $$render(consequent_11, 2);
      });
    }
    var div_11 = sibling(node, 2);
    var node_11 = child(div_11);
    {
      var consequent_12 = ($$anchor2) => {
        const Comp = /* @__PURE__ */ user_derived(() => get(activeView).component);
        var fragment_6 = comment();
        var node_12 = first_child(fragment_6);
        component(node_12, () => get(Comp), ($$anchor3, Comp_1) => {
          Comp_1($$anchor3, spread_props(
            {
              get events() {
                return get(store).events;
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
            },
            () => get(activeView).props ?? {}
          ));
        });
        append($$anchor2, fragment_6);
      };
      var alternate = ($$anchor2) => {
        var div_12 = root_10();
        append($$anchor2, div_12);
      };
      if_block(node_11, ($$render) => {
        if (get(activeView)) $$render(consequent_12);
        else $$render(alternate, -1);
      });
    }
    reset(div_11);
    var node_13 = sibling(div_11, 2);
    {
      var consequent_13 = ($$anchor2) => {
        var div_13 = root_11();
        append($$anchor2, div_13);
      };
      if_block(node_13, ($$render) => {
        if (get(store).loading) $$render(consequent_13);
      });
    }
    reset(div);
    bind_this(div, ($$value) => set(calEl, $$value), () => get(calEl));
    template_effect(() => {
      classes = set_class(div, 1, "cal svelte-1b53e7w", null, classes, { "cal--auto": heightProp() === "auto" });
      set_style(div, `${get(effectiveTheme) ?? ""}; ${heightProp() === "auto" ? "" : `--cal-h: ${heightProp()}px;`} --cal-r: ${borderRadius() ?? ""}px`);
      set_attribute(div, "aria-label", get(L).calendar);
      set_attribute(div, "aria-busy", get(store).loading || void 0);
      set_attribute(div, "dir", get(resolvedDir));
      set_attribute(div, "lang", $$props.locale);
      div.dir = div.dir;
    });
    delegated("keydown", div, handleShortcuts);
    append($$anchor, div);
    pop();
  }
  delegate(["keydown", "click"]);
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
      if (!res.ok) {
        throw new Error(`Calendar API error: ${res.status} ${res.statusText}`);
      }
      if (res.status === 204) return void 0;
      try {
        return await res.json();
      } catch {
        throw new Error(`Calendar API error: invalid JSON response from ${path}`);
      }
    }
    return {
      async fetchEvents(range) {
        const params = new URLSearchParams({
          start: range.start.toISOString(),
          end: range.end.toISOString()
        });
        const data = await request(`/events?${params}`);
        return mapEvents(data);
      },
      async createEvent(event2) {
        const data = await request("/events", {
          method: "POST",
          body: JSON.stringify(event2)
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
  const VIVID_PALETTE = [
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
  let counter = 0;
  function uid() {
    return `mem-${Date.now()}-${++counter}`;
  }
  function createMemoryAdapter(initial = [], options) {
    const events = [...initial];
    const palette = VIVID_PALETTE;
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
      return color ? { ...ev, color } : ev;
    }
    function overlaps(ev, range) {
      return ev.start < range.end && ev.end > range.start;
    }
    return {
      async fetchEvents(range) {
        return events.filter((ev) => overlaps(ev, range)).map(withColor);
      },
      async createEvent(data) {
        const ev = { ...data, id: uid() };
        events.push(ev);
        return withColor(ev);
      },
      async updateEvent(id, patch) {
        const idx = events.findIndex((e) => e.id === id);
        if (idx < 0) throw new Error(`Event not found: ${id}`);
        events[idx] = { ...events[idx], ...patch, id };
        return withColor(events[idx]);
      },
      async deleteEvent(id) {
        const idx = events.findIndex((e) => e.id === id);
        if (idx < 0) throw new Error(`Event not found: ${id}`);
        events.splice(idx, 1);
      }
    };
  }
  function CalendarWidget($$anchor, $$props) {
    push($$props, true);
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
        for (const [k, v] of Object.entries(parsed)) {
          out[k] = String(v);
        }
        return out;
      } catch {
        console.warn("[day-calendar] Failed to parse headers JSON:", json);
        return void 0;
      }
    }
    function toEvent(raw, fallbackId) {
      const start = new Date(String(raw.start ?? ""));
      const end = new Date(String(raw.end ?? ""));
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
        return null;
      }
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
        if (parsed.length !== raw.length) {
          console.warn(`[day-calendar] Ignored ${raw.length - parsed.length} invalid event(s) from events JSON.`);
        }
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
            const arr = Array.isArray(data) ? data : data.events ?? [];
            return arr.map((e, idx) => toEvent(e, `api-${idx}`)).filter((ev) => ev !== null);
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
  const CalendarWidgetClass = asClassComponent(CalendarWidget);
  let sharedSheet = null;
  function injectStyles(root2) {
    const css = globalThis.__DAY_CALENDAR_CSS__;
    if (!css) return;
    if ("adoptedStyleSheets" in root2 && typeof CSSStyleSheet !== "undefined") {
      try {
        if (!sharedSheet) {
          sharedSheet = new CSSStyleSheet();
          sharedSheet.replaceSync(css);
        }
        root2.adoptedStyleSheets = [...root2.adoptedStyleSheets, sharedSheet];
        return;
      } catch {
      }
    }
    const style = document.createElement("style");
    style.setAttribute("data-day-calendar", "");
    style.textContent = css;
    root2.appendChild(style);
  }
  const WIDGET_ATTRS = [
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
  class DayCalendarElement extends HTMLElement {
    instance = null;
    stylesInjected = false;
    static get observedAttributes() {
      return [...WIDGET_ATTRS];
    }
    connectedCallback() {
      if (this.instance) return;
      const root2 = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      if (!this.stylesInjected) {
        injectStyles(root2);
        this.stylesInjected = true;
      }
      this.instance = new CalendarWidgetClass({
        target: root2,
        props: this.readProps()
      });
    }
    disconnectedCallback() {
      this.instance?.$destroy();
      this.instance = null;
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (!this.instance) return;
      this.instance.$set({
        [name]: newValue ?? void 0
      });
    }
    readProps() {
      const props = {};
      for (const attr of WIDGET_ATTRS) {
        const value = this.getAttribute(attr);
        if (value !== null) props[attr] = value;
      }
      return props;
    }
  }
  if (!customElements.get("day-calendar")) {
    customElements.define("day-calendar", DayCalendarElement);
  }
})();
