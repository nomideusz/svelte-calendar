import { fmtTime as _fmtTime, fmtDuration, getLabels } from '../../core/locale.js';
export function fmtTime(d, locale) {
    return _fmtTime(d, locale);
}
export function duration(ev) {
    return fmtDuration(ev.start, ev.end);
}
export function timeUntilMs(ms, now, labels) {
    const L = labels ?? getLabels();
    const diff = ms - now;
    if (diff <= 0)
        return L.now;
    const tMins = Math.floor(diff / 60000);
    if (tMins < 60)
        return L.inMinutes(tMins);
    const hrs = Math.floor(tMins / 60);
    const rm = tMins % 60;
    if (hrs < 24)
        return L.inHours(hrs, rm);
    const days = Math.floor(hrs / 24);
    return L.inDays(days);
}
export function progress(ev, now) {
    const s = ev.start.getTime();
    const e = ev.end.getTime();
    // Zero-length (or inverted) event: fully "done" once its start has passed.
    if (e <= s)
        return now >= s ? 1 : 0;
    return Math.min(1, Math.max(0, (now - s) / (e - s)));
}
export function groupIntoSlots(evts) {
    const sorted = [...evts].sort((a, b) => a.start.getTime() - b.start.getTime());
    const slots = [];
    for (const ev of sorted) {
        const last = slots[slots.length - 1];
        if (last && ev.start.getTime() < last.endMs) {
            last.events.push(ev);
            last.endMs = Math.max(last.endMs, ev.end.getTime());
        }
        else {
            slots.push({
                startMs: ev.start.getTime(),
                endMs: ev.end.getTime(),
                events: [ev],
            });
        }
    }
    return slots;
}
