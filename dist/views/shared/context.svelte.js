/**
 * Shared context reader for calendar views.
 *
 * Calendar.svelte sets a single 'calendar' context with reactive getters.
 * This module reads it and returns a typed interface for views.
 */
import { getContext } from 'svelte';
import { getLabels } from '../../core/locale.js';
import { sod } from '../../core/time.js';
/**
 * Read the calendar context.
 * Call at component init time (top-level script).
 * Returns an object with getters that delegate to the raw context.
 */
export function useCalendarContext() {
    const raw = getContext('calendar');
    // Memoized: views read these per-cell per-render (often at 1Hz), so avoid
    // allocating a fresh Set / wrapper object on every access.
    const disabledSet = $derived(new Set(raw?.disabledDates?.map(d => sod(d.getTime())) ?? []));
    const loadRange = raw
        ? {
            get current() { return raw.loadRange; },
            set: (r) => raw.setLoadRange(r),
        }
        : undefined;
    return {
        get viewState() { return raw?.viewState; },
        get drag() { return raw?.drag; },
        get commitDrag() { return raw?.commitDrag; },
        get snapInterval() { return raw?.snapInterval ?? 15; },
        get equalDays() { return raw?.equalDays ?? false; },
        get showDates() { return raw?.showDates ?? true; },
        get hideDays() { return raw?.hideDays; },
        get isMobile() { return raw?.mobile ?? false; },
        get autoHeight() { return raw?.autoHeight ?? false; },
        get compact() { return raw?.compact ?? false; },
        get readOnly() { return raw?.readOnly ?? false; },
        get blockedSlots() { return raw?.blockedSlots; },
        get dayHeaderSnippet() { return raw?.dayHeaderSnippet; },
        get minDuration() { return raw?.minDuration; },
        get maxDuration() { return raw?.maxDuration; },
        get oneventhover() { return raw?.oneventhover; },
        get ondayclick() { return raw?.ondayclick; },
        get timezone() { return raw?.timezone; },
        get disabledDates() { return raw?.disabledDates; },
        get disabledSet() { return disabledSet; },
        get loadRange() { return loadRange; },
        get eventSnippet() { return raw?.eventSnippet; },
        get emptySnippet() { return raw?.emptySnippet; },
        get labels() { return raw?.labels ?? getLabels(); },
    };
}
