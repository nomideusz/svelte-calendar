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
export function openingTop(blocks, line, hourH, room, anchor, viewH) {
    const cuts = (y) => blocks.filter((b) => b.top < y && b.top + b.height > y);
    const floor = line - 2 * hourH;
    for (let c = cuts(line).filter((b) => b.top >= floor); c.length; c = cuts(line).filter((b) => b.top >= floor)) {
        line = Math.floor(Math.min(...c.map((b) => b.top)) / hourH) * hourH;
    }
    // The anchor must stay on screen, with half an hour under it.
    const fits = (y) => anchor >= y && anchor <= y + viewH - hourH / 2;
    let y = line;
    for (let guard = 0; guard < 8; guard++) {
        const above = cuts(y - room);
        if (!above.length)
            return Math.max(0, y - room);
        const start = Math.min(...above.map((b) => b.top));
        if (start < y && fits(start)) {
            y = start;
            continue;
        }
        const across = cuts(y);
        if (!across.length)
            return Math.max(0, y);
        const after = Math.ceil(Math.max(...across.map((b) => b.top + b.height)) / hourH) * hourH;
        if (after > y && fits(after)) {
            y = after;
            continue;
        }
        break;
    }
    return Math.max(0, y);
}
