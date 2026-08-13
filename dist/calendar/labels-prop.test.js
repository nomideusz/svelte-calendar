// The `labels` prop has to reach the views, not just the shell: yoga passes a
// fully translated set and still rendered the English "No events" in every
// empty day of the week agenda.
import { describe, it, expect } from 'vitest';
import { render } from 'svelte/server';
import Calendar from './Calendar.svelte';
import { createMemoryAdapter } from '../adapters/memory.js';
describe('Calendar labels prop', () => {
    it('reaches view empty states', () => {
        const { body } = render(Calendar, {
            props: {
                adapter: createMemoryAdapter([]),
                view: 'week-agenda',
                columns: true,
                equalDays: true,
                height: 'auto',
                labels: { noEvents: 'Brak zajęć' },
            },
        });
        expect(body).toContain('Brak zajęć');
        expect(body).not.toContain('No events');
    });
});
