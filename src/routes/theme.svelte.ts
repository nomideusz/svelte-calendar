/**
 * Demo-site theme state.
 *
 * The library ships only `auto` (inherit), `neutral` (light) and `midnight` (dark).
 * Demo themes here simulate different host pages / design systems so `auto` can
 * be tested against varied palettes. They are NOT the same as package presets.
 */
import { neutral } from '#lib/theme/presets.js';

// ── Demo-only theme CSS strings ───────────────────────────
// --dt-text-2 alphas, and every accent as text, hold ≥4.5:1 on both
// --dt-stage-bg and --dt-bg (today's 4% accent wash included). Each accent is
// already what `auto` makes of it (lightness ≤0.48 on light pages, ≥0.45 on
// dark), so the swatch, the chrome and the calendar show one colour.
// Ocean and Rose bring their own type (a humanist sans, a serif; loaded in
// +layout.svelte): the body sets --dt-sans, so `auto` has a host font to find.

/** Slate — steel-blue dark page with violet accent (distinct from package midnight) */
const slate = `
	--dt-stage-bg: #0c0f17;
	--dt-bg: #10131d;
	--dt-surface: #161a28;
	--dt-border: rgba(130, 148, 196, 0.08);
	--dt-border-day: rgba(130, 148, 196, 0.14);
	--dt-text: rgba(210, 218, 235, 0.85);
	--dt-text-2: rgba(150, 162, 196, 0.75);
	--dt-text-3: rgba(100, 112, 148, 0.50);
	--dt-accent: #9266f7;
	--dt-accent-dim: rgba(146, 102, 247, 0.15);
	--dt-glow: rgba(146, 102, 247, 0.30);
	--dt-today-bg: rgba(146, 102, 247, 0.03);
	--dt-btn-text: #0f0f0f;
	--dt-scrollbar: rgba(130, 148, 196, 0.10);
	--dt-success: rgba(74, 222, 128, 0.7);
`;

const forest = `
	--dt-stage-bg: #060d09;
	--dt-bg: #081210;
	--dt-surface: #0d1a16;
	--dt-border: rgba(74, 222, 128, 0.07);
	--dt-border-day: rgba(74, 222, 128, 0.14);
	--dt-text: rgba(200, 230, 210, 0.85);
	--dt-text-2: rgba(134, 188, 160, 0.68);
	--dt-text-3: rgba(90, 140, 115, 0.55);
	--dt-accent: #12d393;
	--dt-accent-dim: rgba(18, 211, 147, 0.15);
	--dt-glow: rgba(18, 211, 147, 0.30);
	--dt-today-bg: rgba(18, 211, 147, 0.03);
	--dt-btn-text: #0f0f0f;
	--dt-scrollbar: rgba(74, 222, 128, 0.10);
	--dt-success: rgba(74, 222, 128, 0.7);
`;

const ocean = `
	--dt-stage-bg: #f0f7ff;
	--dt-bg: #f6faff;
	--dt-surface: #eaf3ff;
	--dt-border: rgba(0, 100, 180, 0.08);
	--dt-border-day: rgba(0, 100, 180, 0.14);
	--dt-text: rgba(0, 30, 60, 0.87);
	--dt-text-2: rgba(0, 50, 100, 0.68);
	--dt-text-3: rgba(0, 60, 120, 0.35);
	--dt-accent: #067590;
	--dt-accent-dim: rgba(6, 117, 144, 0.12);
	--dt-glow: rgba(6, 117, 144, 0.25);
	--dt-today-bg: rgba(6, 117, 144, 0.04);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(0, 100, 180, 0.08);
	--dt-success: rgba(22, 163, 74, 0.7);
	--dt-sans: 'Source Sans 3', 'Segoe UI', system-ui, sans-serif;
`;

const rose = `
	--dt-stage-bg: #fff5f5;
	--dt-bg: #fffafa;
	--dt-surface: #fef2f2;
	--dt-border: rgba(180, 50, 80, 0.07);
	--dt-border-day: rgba(180, 50, 80, 0.13);
	--dt-text: rgba(60, 10, 20, 0.87);
	--dt-text-2: rgba(120, 40, 60, 0.74);
	--dt-text-3: rgba(140, 60, 80, 0.38);
	--dt-accent: #d11b43;
	--dt-accent-dim: rgba(209, 27, 67, 0.12);
	--dt-glow: rgba(209, 27, 67, 0.25);
	--dt-today-bg: rgba(209, 27, 67, 0.03);
	--dt-btn-text: #fff;
	--dt-scrollbar: rgba(180, 50, 80, 0.08);
	--dt-success: rgba(22, 163, 74, 0.7);
	--dt-sans: Newsreader, 'Iowan Old Style', Georgia, serif;
`;

// ── Demo theme registry ───────────────────────────────────

export type DemoThemeName = 'slate' | 'light' | 'forest' | 'ocean' | 'rose';

export interface DemoTheme {
	label: string;
	vars: string;
	dark: boolean;
	stageBg: string;
	accent: string;
	/** Printed on the engraving-paper plate (the package's neutral look) */
	paper?: boolean;
}

export const demoThemes: Record<DemoThemeName, DemoTheme> = {
	slate:    { label: 'Slate',    vars: slate,    dark: true,  stageBg: '#0c0f17', accent: '#9266f7' },
	light:    { label: 'Paper',    vars: neutral,  dark: false, stageBg: '#efebe9', accent: '#1d4fd7', paper: true },

	forest:   { label: 'Forest',   vars: forest,    dark: true,  stageBg: '#060d09', accent: '#12d393' },
	ocean:    { label: 'Ocean',    vars: ocean,     dark: false, stageBg: '#f0f7ff', accent: '#067590' },
	rose:     { label: 'Rose',     vars: rose,      dark: false, stageBg: '#fff5f5', accent: '#d11b43' },
};

export const demoThemeNames: DemoThemeName[] = ['slate', 'light', 'forest', 'ocean', 'rose'];

// ── Persistent state ──────────────────────────────────────

export const STORAGE_KEY = 'svelte-calendar-theme';

const isTheme = (v: string | null): v is DemoThemeName => !!v && Object.hasOwn(demoThemes, v);

/** A `?host=` link, else the stored pick, else the OS colour scheme. `chosen`
 *  is false only for the OS fallback: then the URL leaves the host out.
 *  The inline head script in +layout.svelte makes the same choice before paint. */
function initial(): { current: DemoThemeName; chosen: boolean } {
	if (typeof window === 'undefined') return { current: 'slate', chosen: false };
	const linked = new URLSearchParams(location.search).get('host');
	if (isTheme(linked)) return { current: linked, chosen: true };
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (isTheme(stored)) return { current: stored, chosen: true };
	} catch {
		// storage blocked: fall through to the OS preference
	}
	return { current: matchMedia('(prefers-color-scheme: dark)').matches ? 'slate' : 'light', chosen: false };
}

export const themeStore = $state<{ current: DemoThemeName; chosen: boolean }>(initial());

export function setTheme(name: DemoThemeName) {
	themeStore.current = name;
	themeStore.chosen = true;
	try {
		localStorage.setItem(STORAGE_KEY, name);
	} catch {
		// storage blocked: the pick lasts this visit
	}
}

// ── Board clock ───────────────────────────────────────────
// The demo page sets the calendar's timezone here so the header clock reads
// the same zone the calendar does. Empty = the visitor's own.
export const boardStore = $state<{ timezone: string }>({ timezone: '' });
