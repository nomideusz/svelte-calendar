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
export const auto = ``;

/**
 * Neutral — explicit light theme: warm paper ground, ink text, hairline
 * rules, one accent (the host's `--asini-accent`, else blue) for the all-day
 * band, the now line and today. Events are marked in ink (`--dt-event`), so
 * the accent keeps those three jobs. System font stack: set --dt-sans on an
 * ancestor or via CSS to use a custom font. Use when embedding standalone
 * without ancestor --dt-* vars.
 *
 * `--dt-paper` is an optional background-image layer (a paper texture) that
 * every opaque calendar surface paints over `--dt-bg`; default none.
 */
export const neutral = `
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
`;

/** Midnight Industrial — dark charcoal + red accent, tech monitoring */
export const midnight = `
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
	--dt-today-bg: transparent;
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(148, 163, 184, 0.12);
	--dt-success: rgba(74, 222, 128, 0.7);
	--dt-weekend-bg: rgba(148, 163, 184, 0.03);
	--dt-hover: rgba(148, 163, 184, 0.06);
	--dt-event: var(--dt-text);
	--dt-paper: none;
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
`;

/** All available presets keyed by name */
export const presets = { auto, neutral, midnight } as const;
export type PresetName = keyof typeof presets;
