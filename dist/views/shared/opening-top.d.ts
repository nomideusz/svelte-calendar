/**
 * Where a time grid opens: the y (grid px, 0 = first visible hour) to put at
 * the top of the scroller so no event is sliced there.
 *
 * Starts at the hour line `line`, moves up an hour at a time while an event
 * crosses it (looking back at most 2 h), then leaves `room` above for the
 * hour label. If an event still crosses the top, the top goes to that event's
 * start while `anchor` (the now line) stays on screen, else to the first hour
 * after it ends, else the room is dropped; only a block too long for all of
 * those is cut.
 */
export declare function openingTop(blocks: readonly {
    top: number;
    height: number;
}[], line: number, hourH: number, room: number, anchor: number, viewH: number): number;
