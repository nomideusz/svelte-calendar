/**
 * Shared TypeScript types for the timeline design system.
 */
/**
 * Convert a Date (or timestamp) to a pixel offset on the timeline.
 * Useful for external apps that need to position overlays.
 */
export function timeToX(time, rangeStartMs, hourWidth) {
    const ms = typeof time === 'number' ? time : time.getTime();
    return ((ms - rangeStartMs) / 3_600_000) * hourWidth;
}
