/**
 * Theme presets for timeline components.
 *
 * Each preset is a CSS inline-style string of --dt-* custom properties.
 * Pass to the `style` prop of any timeline component.
 */
/** Midnight Industrial — dark charcoal + red accent, tech monitoring */
export const midnight = `
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
	--dt-today-bg: rgba(239, 68, 68, 0.02);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(148, 163, 184, 0.12);
	--dt-success: rgba(74, 222, 128, 0.7);
	--dt-serif: Georgia, 'Times New Roman', serif;
	--dt-hm-empty: rgba(80, 80, 120, 0.06);
	--dt-hm-low: rgba(239, 68, 68, 0.15);
	--dt-hm-mid: rgba(239, 68, 68, 0.3);
	--dt-hm-high: rgba(239, 68, 68, 0.5);
	--dt-hm-max: rgba(239, 68, 68, 0.72);
`;
/** Desert Parchment — warm analog planner, burnt sienna on aged paper */
export const parchment = `
	--dt-bg: #f0e9dd;
	--dt-surface: #e8dfd0;
	--dt-border: rgba(139, 110, 70, 0.12);
	--dt-border-day: rgba(139, 110, 70, 0.22);
	--dt-text: rgba(55, 40, 22, 0.88);
	--dt-text-2: rgba(110, 85, 52, 0.62);
	--dt-text-3: rgba(139, 110, 70, 0.42);
	--dt-accent: #b85c2f;
	--dt-accent-dim: rgba(184, 92, 47, 0.14);
	--dt-glow: rgba(184, 92, 47, 0.25);
	--dt-today-bg: rgba(184, 92, 47, 0.04);
	--dt-btn-text: #fdf6ee;
	--dt-scrollbar: rgba(139, 110, 70, 0.15);
	--dt-success: rgba(76, 153, 76, 0.7);
	--dt-serif: Georgia, 'Times New Roman', serif;
	--dt-mono: 'Courier New', 'Courier', monospace;
	--dt-sans: 'Outfit', Georgia, serif;
	--dt-hm-empty: rgba(139, 110, 70, 0.06);
	--dt-hm-low: rgba(184, 92, 47, 0.15);
	--dt-hm-mid: rgba(184, 92, 47, 0.3);
	--dt-hm-high: rgba(184, 92, 47, 0.5);
	--dt-hm-max: rgba(184, 92, 47, 0.72);
`;
/** Soft Indigo — calm productivity, muted lavender with indigo markers */
export const indigo = `
	--dt-bg: #f7f6fc;
	--dt-surface: #eeedf8;
	--dt-border: rgba(99, 102, 241, 0.08);
	--dt-border-day: rgba(99, 102, 241, 0.14);
	--dt-text: rgba(30, 27, 55, 0.82);
	--dt-text-2: rgba(75, 70, 120, 0.55);
	--dt-text-3: rgba(99, 102, 241, 0.3);
	--dt-accent: #6366f1;
	--dt-accent-dim: rgba(99, 102, 241, 0.12);
	--dt-glow: rgba(99, 102, 241, 0.25);
	--dt-today-bg: rgba(99, 102, 241, 0.03);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(99, 102, 241, 0.1);
	--dt-success: rgba(34, 197, 94, 0.7);
	--dt-serif: Georgia, 'Times New Roman', serif;
	--dt-sans: 'Outfit', system-ui, sans-serif;
	--dt-hm-empty: rgba(99, 102, 241, 0.04);
	--dt-hm-low: rgba(99, 102, 241, 0.12);
	--dt-hm-mid: rgba(99, 102, 241, 0.28);
	--dt-hm-high: rgba(99, 102, 241, 0.48);
	--dt-hm-max: rgba(99, 102, 241, 0.7);
`;
/**
 * Neutral — inherits fonts from host page, uses standard grays + safe blue accent.
 * Drop-in preset that blends into any website without fighting its design.
 */
export const neutral = `
	--dt-bg: #ffffff;
	--dt-surface: #f9fafb;
	--dt-border: rgba(0, 0, 0, 0.08);
	--dt-border-day: rgba(0, 0, 0, 0.14);
	--dt-text: rgba(0, 0, 0, 0.87);
	--dt-text-2: rgba(0, 0, 0, 0.54);
	--dt-text-3: rgba(0, 0, 0, 0.38);
	--dt-accent: #2563eb;
	--dt-accent-dim: rgba(37, 99, 235, 0.12);
	--dt-glow: rgba(37, 99, 235, 0.25);
	--dt-today-bg: rgba(37, 99, 235, 0.04);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(0, 0, 0, 0.1);
	--dt-success: rgba(22, 163, 74, 0.7);
	--dt-serif: inherit;
	--dt-sans: inherit;
	--dt-mono: ui-monospace, 'SFMono-Regular', monospace;
	--dt-hm-empty: rgba(0, 0, 0, 0.03);
	--dt-hm-low: rgba(37, 99, 235, 0.12);
	--dt-hm-mid: rgba(37, 99, 235, 0.28);
	--dt-hm-high: rgba(37, 99, 235, 0.48);
	--dt-hm-max: rgba(37, 99, 235, 0.7);
`;
/**
 * Bare — transparent skeleton that inherits everything from the host page.
 * All colors use currentColor/transparent/inherit so the calendar fully absorbs
 * the parent site's design. Override individual --dt-* tokens as needed.
 */
export const bare = `
	--dt-bg: transparent;
	--dt-surface: transparent;
	--dt-border: currentColor;
	--dt-border-day: currentColor;
	--dt-text: inherit;
	--dt-text-2: inherit;
	--dt-text-3: inherit;
	--dt-accent: currentColor;
	--dt-accent-dim: transparent;
	--dt-glow: transparent;
	--dt-today-bg: transparent;
	--dt-btn-text: inherit;
	--dt-scrollbar: currentColor;
	--dt-success: currentColor;
	--dt-serif: inherit;
	--dt-sans: inherit;
	--dt-mono: inherit;
	--dt-hm-empty: transparent;
	--dt-hm-low: currentColor;
	--dt-hm-mid: currentColor;
	--dt-hm-high: currentColor;
	--dt-hm-max: currentColor;
`;
/** All available presets keyed by name */
export const presets = { midnight, parchment, indigo, neutral, bare };
/**
 * Stage background color matching each theme.
 * Useful for the container behind the timeline component.
 */
export const stageBg = {
    midnight: '#080a0f',
    parchment: '#e4dace',
    indigo: '#efedf8',
    neutral: '#ffffff',
    bare: 'transparent',
};
