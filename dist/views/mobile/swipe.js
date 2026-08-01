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
export function createSwipe(cb) {
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
            if (!tracking)
                return;
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
            const dir = Math.abs(dx) > SWIPE_THRESHOLD ? (dx > 0 ? 1 : -1) : 0;
            dx = 0;
            cb.onend(dir);
        },
    };
}
