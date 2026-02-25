import { describe, it, expect } from 'vitest';
import { createRecurringAdapter } from './recurring.js';
const schedule = [
    {
        id: 'yoga-mon',
        title: 'Morning Yoga',
        dayOfWeek: 1, // Monday
        startTime: '07:00',
        endTime: '08:30',
        color: '#34d399',
    },
    {
        id: 'pilates-wed',
        title: 'Pilates',
        dayOfWeek: 3, // Wednesday
        startTime: '18:00',
        endTime: '19:00',
    },
    {
        id: 'vinyasa-fri',
        title: 'Vinyasa Flow',
        dayOfWeek: 5, // Friday
        startTime: '09:00',
        endTime: '10:30',
        subtitle: 'With Anna',
        tags: ['Intermediate'],
        category: 'yoga',
    },
];
// Helper: Monday 2025-03-03 at midnight
function mondayMs(offset = 0) {
    return new Date(2025, 2, 3 + offset * 7); // March 3, 2025 is a Monday
}
describe('createRecurringAdapter', () => {
    it('projects events onto the correct days within a week', async () => {
        const adapter = createRecurringAdapter(schedule);
        const monday = mondayMs();
        const nextMonday = mondayMs(1);
        const events = await adapter.fetchEvents({ start: monday, end: nextMonday });
        expect(events).toHaveLength(3);
        // Monday yoga
        const yoga = events.find((e) => e.title === 'Morning Yoga');
        expect(yoga).toBeDefined();
        expect(yoga.start.getDay()).toBe(1); // Monday
        expect(yoga.start.getHours()).toBe(7);
        expect(yoga.start.getMinutes()).toBe(0);
        expect(yoga.end.getHours()).toBe(8);
        expect(yoga.end.getMinutes()).toBe(30);
        expect(yoga.color).toBe('#34d399');
        // Wednesday pilates
        const pilates = events.find((e) => e.title === 'Pilates');
        expect(pilates).toBeDefined();
        expect(pilates.start.getDay()).toBe(3); // Wednesday
        expect(pilates.start.getHours()).toBe(18);
        // Friday vinyasa
        const vinyasa = events.find((e) => e.title === 'Vinyasa Flow');
        expect(vinyasa).toBeDefined();
        expect(vinyasa.start.getDay()).toBe(5); // Friday
        expect(vinyasa.start.getHours()).toBe(9);
        expect(vinyasa.end.getHours()).toBe(10);
        expect(vinyasa.end.getMinutes()).toBe(30);
    });
    it('projects across multiple weeks', async () => {
        const adapter = createRecurringAdapter(schedule);
        const monday = mondayMs();
        const threeWeeksLater = mondayMs(3);
        const events = await adapter.fetchEvents({ start: monday, end: threeWeeksLater });
        // 3 events per week × 3 weeks = 9
        expect(events).toHaveLength(9);
    });
    it('generates unique IDs per projected instance', async () => {
        const adapter = createRecurringAdapter(schedule);
        const monday = mondayMs();
        const twoWeeksLater = mondayMs(2);
        const events = await adapter.fetchEvents({ start: monday, end: twoWeeksLater });
        const ids = events.map((e) => e.id);
        const unique = new Set(ids);
        expect(unique.size).toBe(ids.length);
    });
    it('includes subtitle and tags in data', async () => {
        const adapter = createRecurringAdapter(schedule);
        const monday = mondayMs();
        const nextMonday = mondayMs(1);
        const events = await adapter.fetchEvents({ start: monday, end: nextMonday });
        const vinyasa = events.find((e) => e.title === 'Vinyasa Flow');
        expect(vinyasa.data?.subtitle).toBe('With Anna');
        expect(vinyasa.data?.tags).toEqual(['Intermediate']);
        expect(vinyasa.data?.recurringId).toBe('vinyasa-fri');
    });
    it('applies colorMap', async () => {
        const adapter = createRecurringAdapter(schedule, {
            colorMap: { yoga: '#ff6600', Pilates: '#0066ff' },
        });
        const monday = mondayMs();
        const nextMonday = mondayMs(1);
        const events = await adapter.fetchEvents({ start: monday, end: nextMonday });
        const vinyasa = events.find((e) => e.title === 'Vinyasa Flow');
        expect(vinyasa.color).toBe('#ff6600'); // matched by category 'yoga'
        const pilates = events.find((e) => e.title === 'Pilates');
        expect(pilates.color).toBe('#0066ff'); // matched by title 'Pilates'
    });
    it('applies autoColor', async () => {
        const noColorSchedule = [
            { id: '1', title: 'A', dayOfWeek: 1, startTime: '09:00', endTime: '10:00' },
            { id: '2', title: 'B', dayOfWeek: 2, startTime: '09:00', endTime: '10:00' },
            { id: '3', title: 'A', dayOfWeek: 3, startTime: '09:00', endTime: '10:00' },
        ];
        const adapter = createRecurringAdapter(noColorSchedule, { autoColor: true });
        const monday = mondayMs();
        const nextMonday = mondayMs(1);
        const events = await adapter.fetchEvents({ start: monday, end: nextMonday });
        // 'A' events should share the same auto-assigned color
        const aEvents = events.filter((e) => e.title === 'A');
        expect(aEvents[0].color).toBe(aEvents[1].color);
        // 'B' should get a different color
        const bEvent = events.find((e) => e.title === 'B');
        expect(bEvent.color).not.toBe(aEvents[0].color);
    });
    it('is read-only: create/update/delete throw', async () => {
        const adapter = createRecurringAdapter(schedule);
        await expect(adapter.createEvent({ title: 'x', start: new Date(), end: new Date() })).rejects.toThrow('read-only');
        await expect(adapter.updateEvent('yoga-mon', { title: 'y' })).rejects.toThrow('read-only');
        await expect(adapter.deleteEvent('yoga-mon')).rejects.toThrow('read-only');
    });
    it('only returns events within the requested range', async () => {
        const adapter = createRecurringAdapter(schedule);
        // Query Wednesday only
        const wed = new Date(2025, 2, 5, 0, 0);
        const thu = new Date(2025, 2, 6, 0, 0);
        const events = await adapter.fetchEvents({ start: wed, end: thu });
        expect(events).toHaveLength(1);
        expect(events[0].title).toBe('Pilates');
    });
});
