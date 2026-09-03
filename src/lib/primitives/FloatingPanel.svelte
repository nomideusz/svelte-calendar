<script module lang="ts">
	// Phone sheet scroll-lock: nested panels each take a lock; the page behind
	// unlocks when the last one closes.
	let sheetLocks = 0;
</script>

<script lang="ts">
	// A non-modal window that floats over the calendar: opened beside the
	// block that was clicked (right of it, left when the right edge is near,
	// clamped to the viewport), dragged by its header, closed by Escape, its
	// own button, or a click anywhere outside — that outside click is spent on
	// closing, so a block under it is not opened by the same tap. Below 640px
	// it is a bottom sheet instead.
	import type { Snippet } from 'svelte';

	type Anchor = { x: number; y: number; width?: number; height?: number };

	let {
		title = '',
		anchor = { x: 24, y: 24 },
		width = 440,
		theme = '',
		closeLabel = 'Close',
		closeOnOutside = true,
		onclose,
		children,
	}: {
		title?: string;
		/** What to open beside: the clicked block's viewport rect, or a bare point. */
		anchor?: Anchor;
		width?: number;
		/** The same `--dt-*` theme string a Calendar takes. */
		theme?: string;
		closeLabel?: string;
		/** A pointerdown outside closes the panel and goes no further. */
		closeOnOutside?: boolean;
		onclose?: () => void;
		children: Snippet;
	} = $props();

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
	// A new anchor (the next click) re-places the panel; each run focuses it.
	$effect(() => {
		beside(anchor);
		el?.focus({ preventScroll: true });
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
		if (grab) place(e.clientX - grab.dx, e.clientY - grab.dy);
	}
	function up() {
		grab = null;
	}

	// The outside pointerdown is swallowed here, before any calendar handler,
	// and so is the click it would synthesize — one tap closes, the next acts.
	let swallowClick = false;
	function outsideDown(e: PointerEvent) {
		if (!closeOnOutside || !el || el.contains(e.target as Node)) return;
		e.stopPropagation();
		e.preventDefault();
		swallowClick = true;
		onclose?.();
	}
	function outsideClick(e: MouseEvent) {
		if (!swallowClick) return;
		swallowClick = false;
		e.stopPropagation();
		e.preventDefault();
	}
</script>

<svelte:window
	onkeydown={(e) => e.key === 'Escape' && onclose?.()}
	onpointerdowncapture={outsideDown}
	onclickcapture={outsideClick}
/>

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
