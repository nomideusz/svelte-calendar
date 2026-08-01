/**
 * Shared horizontal-swipe tracker for the mobile views.
 *
 * Tracks touch gestures on a container and reports the live horizontal
 * offset (so the view can follow the finger) plus a commit direction on
 * release. Vertical-dominant movement hands the gesture back to native
 * scrolling immediately.
 */

/** Unified swipe commit threshold (px) across mobile day + week views. */
export const SWIPE_THRESHOLD = 50;

export interface SwipeCallbacks {
	/** Live horizontal offset (px) while the finger is down. Reset to 0 when the gesture is abandoned. */
	onmove: (dx: number) => void;
	/**
	 * Gesture finished.
	 * `dir` is `1` (swiped right → previous period), `-1` (swiped left → next period),
	 * or `0` (below threshold — snap back).
	 */
	onend: (dir: -1 | 0 | 1) => void;
	/** Return true to ignore the gesture entirely (e.g. while a drag-create/resize is active). */
	disabled?: () => boolean;
}

export interface SwipeHandlers {
	ontouchstart: (e: TouchEvent) => void;
	ontouchmove: (e: TouchEvent) => void;
	ontouchend: () => void;
	ontouchcancel: () => void;
}

export function createSwipe(cb: SwipeCallbacks): SwipeHandlers {
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
		ontouchstart(e: TouchEvent) {
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

		ontouchmove(e: TouchEvent) {
			if (!tracking) return;
			if (cb.disabled?.()) {
				abandon();
				return;
			}
			const t = e.touches[0];
			const mx = t.clientX - startX;
			const my = t.clientY - startY;
			// Vertical movement dominates → this is a scroll, not a swipe.
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
			const dir: -1 | 0 | 1 = Math.abs(dx) > SWIPE_THRESHOLD ? (dx > 0 ? 1 : -1) : 0;
			dx = 0;
			cb.onend(dir);
		},

		ontouchcancel() {
			// The browser took over the gesture (scroll, edge-swipe, system UI).
			// Without this, the view stays stuck at the last swipe offset.
			if (!tracking) return;
			tracking = false;
			dx = 0;
			cb.onend(0);
		},
	};
}
