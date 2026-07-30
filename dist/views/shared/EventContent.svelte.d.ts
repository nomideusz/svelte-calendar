import type { Snippet } from 'svelte';
import type { TimelineEvent } from '../../core/types.js';
type $$ComponentProps = {
    event: TimelineEvent;
    children: Snippet;
};
declare const EventContent: import("svelte").Component<$$ComponentProps, {}, "">;
type EventContent = ReturnType<typeof EventContent>;
export default EventContent;
