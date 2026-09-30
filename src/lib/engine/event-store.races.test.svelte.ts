// @vitest-environment jsdom
/**
 * Loads and writes interleave: a fetch that started before a write must not
 * undo it when it lands, and `loading` must settle whatever the order.
 */
import { describe, it, expect } from 'vitest';
import { createEventStore } from './event-store.svelte.js';
import type { CalendarAdapter } from '../adapters/types.js';
import type { TimelineEvent } from '../core/types.js';

function deferred<T>() {
	let resolve!: (v: T) => void;
	const promise = new Promise<T>((r) => (resolve = r));
	return { promise, resolve };
}
const R = { start: new Date(2026, 8, 1), end: new Date(2026, 8, 8) };
const at = (id: string, h: number): TimelineEvent => ({
	id,
	title: id,
	start: new Date(2026, 8, 2, h),
	end: new Date(2026, 8, 2, h + 1),
});

function withStore(adapter: CalendarAdapter, run: (store: ReturnType<typeof createEventStore>) => Promise<void>) {
	let store!: ReturnType<typeof createEventStore>;
	const destroy = $effect.root(() => {
		store = createEventStore(adapter);
	});
	return run(store).finally(destroy);
}

describe('event store — loads racing writes', () => {
	it('settles loading when a sync load supersedes an async one', async () => {
		const pending = deferred<TimelineEvent[]>();
		let cached = false;
		const adapter: CalendarAdapter = {
			fetchEventsSync: () => (cached ? [] : undefined),
			fetchEvents: () => pending.promise,
		};
		await withStore(adapter, async (store) => {
			const first = store.load(R);
			expect(store.loading).toBe(true);
			cached = true;
			await store.load(R);
			pending.resolve([]);
			await first;
			expect(store.loading).toBe(false);
		});
	});

	it('keeps an event created while an older load was in flight', async () => {
		const pending = deferred<TimelineEvent[]>();
		const adapter: CalendarAdapter = {
			fetchEvents: () => pending.promise,
			createEvent: async (e) => ({ ...e, id: 'new' }),
		};
		await withStore(adapter, async (store) => {
			const load = store.load(R);
			await store.add({ title: 'n', start: new Date(2026, 8, 2, 9), end: new Date(2026, 8, 2, 10) });
			pending.resolve([]); // snapshot from before the create
			await load;
			expect(store.byId('new')).toBeDefined();
		});
	});

	it('keeps a move made while an older load was in flight', async () => {
		const pending = deferred<TimelineEvent[]>();
		let first = true;
		const adapter: CalendarAdapter = {
			fetchEvents: () => (first ? ((first = false), Promise.resolve([at('a', 9)])) : pending.promise),
			updateEvent: async (id, patch) => ({ ...at('a', 9), ...patch, id }),
		};
		await withStore(adapter, async (store) => {
			await store.load(R);
			const reload = store.load(R);
			await store.move('a', new Date(2026, 8, 2, 14), new Date(2026, 8, 2, 15));
			pending.resolve([at('a', 9)]); // stale
			await reload;
			expect(store.byId('a')!.start.getHours()).toBe(14);
		});
	});

	it('stays loading while a load is in flight, even after a write finishes', async () => {
		const pending = deferred<TimelineEvent[]>();
		const adapter: CalendarAdapter = {
			fetchEvents: () => pending.promise,
			createEvent: async (e) => ({ ...e, id: 'n' }),
		};
		await withStore(adapter, async (store) => {
			const load = store.load(R);
			await store.add({ title: 'n', start: new Date(2026, 8, 2, 9), end: new Date(2026, 8, 2, 10) });
			expect(store.loading).toBe(true);
			pending.resolve([]);
			await load;
			expect(store.loading).toBe(false);
		});
	});

	it('still lets a newer load drop an event deleted elsewhere', async () => {
		let data = [at('a', 9), at('b', 11)];
		const adapter: CalendarAdapter = { fetchEvents: async () => data };
		await withStore(adapter, async (store) => {
			await store.load(R);
			data = [at('a', 9)];
			await store.load(R);
			expect(store.byId('b')).toBeUndefined();
		});
	});

	it('puts a synchronous adapter throw in error instead of rejecting', async () => {
		const adapter: CalendarAdapter = {
			fetchEventsSync: () => { throw new Error('Invalid time format "7:00 PM"'); },
			fetchEvents: async () => [],
		};
		await withStore(adapter, async (store) => {
			await expect(store.load(R)).resolves.toBeUndefined();
			expect(store.error).toContain('7:00 PM');
			expect(store.loading).toBe(false);
		});
	});

	it('does not report a read-only refusal as an error', async () => {
		const adapter: CalendarAdapter = {
			fetchEvents: async () => [at('a', 9)],
			updateEvent: async () => { throw new Error('read-only: host stores it'); },
		};
		await withStore(adapter, async (store) => {
			await store.load(R);
			await expect(store.move('a', new Date(2026, 8, 2, 14), new Date(2026, 8, 2, 15))).rejects.toThrow('read-only');
			expect(store.error).toBeNull();
			expect(store.byId('a')!.start.getHours()).toBe(14);
		});
	});
});
