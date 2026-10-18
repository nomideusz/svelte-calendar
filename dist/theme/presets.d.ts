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
export declare const auto = "";
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
export declare const neutral = "\n\t--dt-stage-bg: #efebe9;\n\t--dt-bg: #efebe9;\n\t--dt-surface: #f4f1ee;\n\t--dt-border: rgba(15, 15, 15, 0.3);\n\t--dt-border-day: rgba(15, 15, 15, 0.6);\n\t--dt-text: #0f0f0f;\n\t--dt-text-2: rgba(15, 15, 15, 0.66);\n\t--dt-text-3: rgba(15, 15, 15, 0.54);\n\t--dt-accent: var(--asini-accent, #1d4fd7);\n\t--dt-accent-dim: color-mix(in srgb, var(--dt-accent) 12%, transparent);\n\t--dt-glow: color-mix(in srgb, var(--dt-accent) 25%, transparent);\n\t--dt-today-bg: transparent;\n\t--dt-btn-text: #fff;\n\t--dt-scrollbar: rgba(15, 15, 15, 0.18);\n\t--dt-weekend-bg: rgba(15, 15, 15, 0.035);\n\t--dt-hover: rgba(15, 15, 15, 0.05);\n\t--dt-event: var(--dt-text);\n\t--dt-paper: none;\n\t--dt-mono: ui-monospace, 'SFMono-Regular', monospace;\n";
/** Midnight Industrial — dark charcoal + red accent, tech monitoring */
export declare const midnight = "\n\t--dt-stage-bg: #080a0f;\n\t--dt-bg: #0b0e14;\n\t--dt-surface: #10141c;\n\t--dt-border: rgba(148, 163, 184, 0.07);\n\t--dt-border-day: rgba(148, 163, 184, 0.14);\n\t--dt-text: rgba(226, 232, 240, 0.85);\n\t--dt-text-2: rgba(148, 163, 184, 0.55);\n\t--dt-text-3: rgba(100, 116, 139, 0.55);\n\t--dt-accent: #ef4444;\n\t--dt-accent-dim: rgba(239, 68, 68, 0.18);\n\t--dt-glow: rgba(239, 68, 68, 0.35);\n\t--dt-today-bg: transparent;\n\t--dt-btn-text: #fff;\n\t--dt-scrollbar: rgba(148, 163, 184, 0.12);\n\t--dt-success: rgba(74, 222, 128, 0.7);\n\t--dt-weekend-bg: rgba(148, 163, 184, 0.03);\n\t--dt-hover: rgba(148, 163, 184, 0.06);\n\t--dt-event: var(--dt-text);\n\t--dt-paper: none;\n\t--dt-mono: ui-monospace, 'SFMono-Regular', monospace;\n";
/** All available presets keyed by name */
export declare const presets: {
    readonly auto: "";
    readonly neutral: "\n\t--dt-stage-bg: #efebe9;\n\t--dt-bg: #efebe9;\n\t--dt-surface: #f4f1ee;\n\t--dt-border: rgba(15, 15, 15, 0.3);\n\t--dt-border-day: rgba(15, 15, 15, 0.6);\n\t--dt-text: #0f0f0f;\n\t--dt-text-2: rgba(15, 15, 15, 0.66);\n\t--dt-text-3: rgba(15, 15, 15, 0.54);\n\t--dt-accent: var(--asini-accent, #1d4fd7);\n\t--dt-accent-dim: color-mix(in srgb, var(--dt-accent) 12%, transparent);\n\t--dt-glow: color-mix(in srgb, var(--dt-accent) 25%, transparent);\n\t--dt-today-bg: transparent;\n\t--dt-btn-text: #fff;\n\t--dt-scrollbar: rgba(15, 15, 15, 0.18);\n\t--dt-weekend-bg: rgba(15, 15, 15, 0.035);\n\t--dt-hover: rgba(15, 15, 15, 0.05);\n\t--dt-event: var(--dt-text);\n\t--dt-paper: none;\n\t--dt-mono: ui-monospace, 'SFMono-Regular', monospace;\n";
    readonly midnight: "\n\t--dt-stage-bg: #080a0f;\n\t--dt-bg: #0b0e14;\n\t--dt-surface: #10141c;\n\t--dt-border: rgba(148, 163, 184, 0.07);\n\t--dt-border-day: rgba(148, 163, 184, 0.14);\n\t--dt-text: rgba(226, 232, 240, 0.85);\n\t--dt-text-2: rgba(148, 163, 184, 0.55);\n\t--dt-text-3: rgba(100, 116, 139, 0.55);\n\t--dt-accent: #ef4444;\n\t--dt-accent-dim: rgba(239, 68, 68, 0.18);\n\t--dt-glow: rgba(239, 68, 68, 0.35);\n\t--dt-today-bg: transparent;\n\t--dt-btn-text: #fff;\n\t--dt-scrollbar: rgba(148, 163, 184, 0.12);\n\t--dt-success: rgba(74, 222, 128, 0.7);\n\t--dt-weekend-bg: rgba(148, 163, 184, 0.03);\n\t--dt-hover: rgba(148, 163, 184, 0.06);\n\t--dt-event: var(--dt-text);\n\t--dt-paper: none;\n\t--dt-mono: ui-monospace, 'SFMono-Regular', monospace;\n";
};
export type PresetName = keyof typeof presets;
