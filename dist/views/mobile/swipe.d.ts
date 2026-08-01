/**
 * Shared horizontal-swipe tracker for the mobile views.
 *
 * Tracks touch gestures on a container and reports the live horizontal
 * offset (so the view can follow the finger) plus a commit direction on
 * release. Vertical-dominant movement hands the gesture back to native
 * scrolling immediately.
 */
/** Unified swipe commit threshold (px) across mobile day + week views. */
export declare const SWIPE_THRESHOLD = 50;
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
export declare function createSwipe(cb: SwipeCallbacks): SwipeHandlers;
