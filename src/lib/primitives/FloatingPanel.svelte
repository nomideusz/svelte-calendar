<script module lang="ts">
	import type { Snippet } from 'svelte';

	/** What a FloatingPanel opens beside: a viewport rect (a clicked block's `getBoundingClientRect()`), or a bare point. */
	export type FloatingPanelAnchor = { x: number; y: number; width?: number; height?: number };

	export interface FloatingPanelProps {
		title?: string;
		/** What to open beside: the clicked block's viewport rect, or a bare point. */
		anchor?: FloatingPanelAnchor;
		/** Panel width in px (default 440). Below 640px viewport width it is a bottom sheet. */
		width?: number;
		/** The same `--dt-*` theme string a Calendar takes. */
		theme?: string;
		closeLabel?: string;
		/** A pointerdown outside closes the panel and goes no further. */
		closeOnOutside?: boolean;
		onclose?: () => void;
		children: Snippet;
	}

	// Phone sheet scroll-lock: nested panels each take a lock; the page behind
	// unlocks when the last one closes.
	let sheetLocks = 0;

	// Open panels, oldest first. Escape and the outside tap belong to the
	// topmost one only, so a nested panel closes without its parent.
	const openPanels: symbol[] = [];
	// Events a panel already acted on — the next panel down must not act on
	// the same keydown/pointerdown once the top one unmounts mid-dispatch.
	const handled = new WeakSet<Event>();

	/**
	 * Spend the click a closing tap synthesizes. `onclose` usually unmounts the
	 * panel before that click arrives, so the listener lives on `window`,
	 * outside the component: it eats the next click (capture phase, before any
	 * calendar handler) and removes itself then, on the next pointerdown, on a
	 * pointercancel (no click follows), or after a timeout.
	 */
	function swallowNextClick() {
		const eat = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			done();
		};
		const done = () => {
			clearTimeout(timer);
			window.removeEventListener('click', eat, true);
			window.removeEventListener('pointerdown', done, true);
			window.removeEventListener('pointercancel', done, true);
		};
		const timer = setTimeout(done, 1500);
		window.addEventListener('click', eat, true);
		window.addEventListener('pointercancel', done, true);
		// Armed after this pointerdown has finished dispatching.
		setTimeout(() => window.addEventListener('pointerdown', done, true), 0);
	}
</script>

<script lang="ts">
	// A non-modal window that floats over the calendar: opened beside the
	// block that was clicked (right of it, left when the right edge is near,
	// clamped to the viewport), dragged by its header, closed by Escape, its
	// own button, or a click anywhere outside — that outside click is spent on
	// closing, so a block under it is not opened by the same tap. Below 640px
	// it is a bottom sheet instead.
	import { untrack } from 'svelte';

	type Anchor = FloatingPanelAnchor;

	let {
		title = '',
		anchor = { x: 24, y: 24 },
		width = 440,
		theme = '',
		closeLabel = 'Close',
		closeOnOutside = true,
		onclose,
		children,
	}: FloatingPanelProps = $props();

	const GAP = 10;
	const EDGE = 8;
	let el = $state<HTMLElement | null>(null);
	// Placed by the effect below once the panel has a size to clamp against.
	let left = $state(EDGE);
	let top = $state(EDGE);

	const clamp = (v: number, size: number, max: number) => Math.max(EDGE, Math.min(v, max - size - EDGE));
	function place(px: number, py: number) {
		if (!el) return;
		left = clamp(px, el.offsetWidth, window.innerWidth);
		top = clamp(py, el.offsetHeight, window.innerHeight);
	}
	// Beside the anchor: to its right, else to its left, else over it.
	function beside(a: Anchor) {
		if (!el) return;
		const w = el.offsetWidth;
		const aw = a.width ?? 0;
		const right = a.x + aw + GAP;
		const px =
			right + w + EDGE <= window.innerWidth ? right : a.x - GAP - w >= EDGE ? a.x - GAP - w : a.x;
		place(px, a.y);
	}
	// Where focus goes back to when the panel closes: whatever held it when
	// the panel opened (or when a new anchor re-focused it).
	let returnFocus: HTMLElement | null = null;
	// Set once the user drags the panel: from then on a size change re-clamps
	// it where it is instead of jumping back beside the anchor.
	let dragged = false;

	// A new anchor (the next click) re-places the panel; each run focuses it.
	$effect(() => {
		dragged = false;
		beside(anchor);
		const active = document.activeElement;
		if (active instanceof HTMLElement && active !== document.body && !el?.contains(active)) {
			returnFocus = active;
		}
		el?.focus({ preventScroll: true });
	});

	// Content that grows (or shrinks) after opening — a form section, loaded
	// data — must stay inside the viewport; so must a resized window.
	$effect(() => {
		if (!el) return;
		const reclamp = () => {
			if (dragged) place(left, top);
			else beside(anchor);
		};
		const ro = new ResizeObserver(reclamp);
		ro.observe(el);
		window.addEventListener('resize', reclamp);
		return () => {
			ro.disconnect();
			window.removeEventListener('resize', reclamp);
		};
	});

	// Topmost-panel stack + focus restore on close.
	const myId = Symbol('floating-panel');
	const isTopmost = () => openPanels[openPanels.length - 1] === myId;
	$effect(() => {
		const id = myId;
		openPanels.push(id);
		const panel = untrack(() => el);
		return () => {
			const i = openPanels.indexOf(id);
			if (i !== -1) openPanels.splice(i, 1);
			// Only pull focus back when it would otherwise be lost (inside the
			// closing panel, or dropped to <body>) — not from where the user
			// has since moved it.
			const active = document.activeElement;
			const lost = !active || active === document.body || (!!panel && panel.contains(active));
			const target = returnFocus;
			if (lost && target && target.isConnected) {
				target.focus({ preventScroll: true });
			} else if (lost && target) {
				// The opener may be re-rendered by the close (a view refresh);
				// try once more after the DOM settles.
				queueMicrotask(() => {
					const a = document.activeElement;
					if ((!a || a === document.body) && target.isConnected) target.focus({ preventScroll: true });
				});
			}
		};
	});

	// In sheet mode the page behind must not scroll — drags on the sheet
	// chrome, or reaching the end of the sheet body, would otherwise reach it.
	$effect(() => {
		if (typeof window === 'undefined') return;
		if (!window.matchMedia('(max-width: 640px)').matches) return;
		document.body.classList.add('fp-sheet-lock');
		document.documentElement.classList.add('fp-sheet-lock');
		sheetLocks++;
		return () => {
			sheetLocks--;
			if (sheetLocks === 0) {
				document.body.classList.remove('fp-sheet-lock');
				document.documentElement.classList.remove('fp-sheet-lock');
			}
		};
	});

	let grab: { dx: number; dy: number } | null = null;
	function down(e: PointerEvent) {
		if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
		grab = { dx: e.clientX - left, dy: e.clientY - top };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!grab) return;
		dragged = true;
		place(e.clientX - grab.dx, e.clientY - grab.dy);
	}
	function up() {
		grab = null;
	}

	// The outside pointerdown is swallowed here, before any calendar handler,
	// and so is the click it would synthesize — one tap closes, the next acts.
	// With nested panels only the topmost reacts: a tap outside it (even on
	// the panel beneath) closes it alone.
	function outsideDown(e: PointerEvent) {
		if (!closeOnOutside || !el || el.contains(e.target as Node)) return;
		if (handled.has(e) || !isTopmost()) return;
		handled.add(e);
		e.stopPropagation();
		e.preventDefault();
		swallowNextClick();
		onclose?.();
	}
	function onKeydown(e: KeyboardEvent) {
		// defaultPrevented: a control inside the panel (a combobox, a menu)
		// already used this Escape to close itself.
		if (e.key !== 'Escape' || e.defaultPrevented || handled.has(e) || !isTopmost()) return;
		handled.add(e);
		onclose?.();
	}
</script>

<svelte:window onkeydown={onKeydown} onpointerdowncapture={outsideDown} />

<div
	class="fp"
	role="dialog"
	aria-label={title}
	tabindex="-1"
	bind:this={el}
	style="{theme}; left: {left}px; top: {top}px; width: {width}px"
>
	<div class="fp-head" role="presentation" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>
		<span class="fp-title">{title}</span>
		<button class="fp-close" type="button" aria-label={closeLabel} onclick={onclose}>
			<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
				<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</button>
	</div>
	<div class="fp-body">{@render children()}</div>
</div>

<style>
	.fp {
		position: fixed;
		z-index: 60;
		max-width: calc(100vw - 16px);
		max-height: calc(100vh - 16px);
		display: flex;
		flex-direction: column;
		background: var(--dt-surface, #fff);
		color: var(--dt-text, #111);
		border: 1px solid var(--dt-border, #e2e2e2);
		border-radius: var(--dt-radius, 8px);
		box-shadow: var(--dt-shadow, 0 16px 48px rgba(0, 0, 0, 0.18));
		font-family: var(--dt-sans, system-ui, sans-serif);
		outline: none;
	}
	.fp-head {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 8px 8px 14px;
		border-bottom: 1px solid var(--dt-border, #e2e2e2);
		cursor: grab;
		user-select: none;
		touch-action: none;
	}
	.fp-head:active {
		cursor: grabbing;
	}
	.fp-title {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
	}
	.fp-close {
		display: inline-grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border: 0;
		border-radius: 6px;
		background: transparent;
		color: var(--dt-text-2, #555);
		cursor: pointer;
	}
	.fp-close:hover {
		background: var(--dt-hover, rgba(0, 0, 0, 0.06));
		color: var(--dt-text, #111);
	}
	.fp-body {
		/* A flex child defaults to min-height:auto and never shrinks below its
		   content — so a tall form ran past the panel's max-height, into the
		   part of a fixed element nothing can scroll to. This is what lets the
		   body scroll instead. */
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
		overscroll-behavior: contain;
	}
	:global(.fp-sheet-lock) {
		overflow: hidden !important;
	}
	@media (max-width: 640px) {
		.fp {
			left: 0 !important;
			right: 0;
			top: auto !important;
			bottom: 0;
			width: auto !important;
			max-width: none;
			max-height: 85vh;
			border-radius: var(--dt-radius, 12px) var(--dt-radius, 12px) 0 0;
		}
		.fp-head {
			cursor: default;
		}
	}
</style>
