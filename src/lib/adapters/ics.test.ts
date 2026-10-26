import { describe, it, expect } from 'vitest';
import { parseIcs, createIcsAdapter, toIcs, googleCalendarUrl, outlookCalendarUrl } from './ics.js';
import { createCompositeAdapter } from './composite.js';
import { createMemoryAdapter } from './memory.js';
import { isReadOnlyError } from './errors.js';

const cal = (...body: string[]) => ['BEGIN:VCALENDAR', 'VERSION:2.0', ...body, 'END:VCALENDAR'].join('\r\n');
const range = (a: string, b: string) => ({ start: new Date(a), end: new Date(b) });
const iso = (d: Date) => d.toISOString();

// What a Google "secret address in iCal format" feed looks like.
const GOOGLE = cal(
	'X-WR-CALNAME:Studio',
	'X-WR-TIMEZONE:Europe/Warsaw',
	'BEGIN:VEVENT',
	'DTSTART;TZID=Europe/Warsaw:20261005T180000',
	'DTEND;TZID=Europe/Warsaw:20261005T191500',
	'RRULE:FREQ=WEEKLY;BYDAY=MO,WE',
	'EXDATE;TZID=Europe/Warsaw:20261012T180000',
	'UID:yoga@google.com',
	'SUMMARY:Hatha\\, evening',
	'LOCATION:Sala A\\; 1st floor',
	'DESCRIPTION:Bring a mat.\\nWater too.',
	'END:VEVENT',
	'BEGIN:VEVENT',
	'DTSTART;TZID=Europe/Warsaw:20261014T190000',
	'DTEND;TZID=Europe/Warsaw:20261014T200000',
	'RECURRENCE-ID;TZID=Europe/Warsaw:20261014T180000',
	'UID:yoga@google.com',
	'SUMMARY:Hatha (moved)',
	'END:VEVENT',
);

describe('parseIcs', () => {
	it('expands a weekly rule in its zone, with EXDATE and a moved occurrence', () => {
		const c = parseIcs(GOOGLE);
		expect(c.name).toBe('Studio');
		const evs = c.events(range('2026-10-05T00:00:00Z', '2026-10-19T00:00:00Z'));
		expect(evs.map((e) => [e.title, iso(e.start)])).toEqual([
			['Hatha, evening', '2026-10-05T16:00:00.000Z'], // CEST, UTC+2
			['Hatha, evening', '2026-10-07T16:00:00.000Z'],
			// 12th excluded
			['Hatha (moved)', '2026-10-14T17:00:00.000Z'],
		]);
		expect(evs[0].location).toBe('Sala A; 1st floor');
		expect(evs[0].data?.description).toBe('Bring a mat.\nWater too.');
		expect(evs[0].data?.readOnly).toBe(true);
		expect(evs[0].end.getTime() - evs[0].start.getTime()).toBe(75 * 60_000);
		expect(evs[2].id).toBe('yoga@google.com--20261014T180000');
	});

	it('keeps the wall time across DST', () => {
		const evs = parseIcs(GOOGLE).events(range('2026-10-26T00:00:00Z', '2026-10-27T00:00:00Z'));
		expect(iso(evs[0].start)).toBe('2026-10-26T17:00:00.000Z'); // CET, UTC+1
	});

	it('reads Outlook Windows zones from their VTIMEZONE', () => {
		const c = parseIcs(cal(
			'BEGIN:VTIMEZONE',
			'TZID:Central European Standard Time',
			'BEGIN:STANDARD',
			'DTSTART:16010101T030000',
			'TZOFFSETFROM:+0200',
			'TZOFFSETTO:+0100',
			'RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1SU;BYMONTH=10',
			'END:STANDARD',
			'BEGIN:DAYLIGHT',
			'DTSTART:16010101T020000',
			'TZOFFSETFROM:+0100',
			'TZOFFSETTO:+0200',
			'RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1SU;BYMONTH=3',
			'END:DAYLIGHT',
			'END:VTIMEZONE',
			'BEGIN:VEVENT',
			'UID:a',
			'SUMMARY:Summer',
			'DTSTART;TZID="Central European Standard Time":20260710T090000',
			'DTEND;TZID="Central European Standard Time":20260710T100000',
			'END:VEVENT',
			'BEGIN:VEVENT',
			'UID:b',
			'SUMMARY:Winter',
			'DTSTART;TZID="Central European Standard Time":20261210T090000',
			'DURATION:PT30M',
			'END:VEVENT',
		));
		const evs = c.events(range('2026-01-01T00:00:00Z', '2027-01-01T00:00:00Z'));
		expect(evs.map((e) => iso(e.start))).toEqual(['2026-07-10T07:00:00.000Z', '2026-12-10T08:00:00.000Z']);
		expect(iso(evs[1].end)).toBe('2026-12-10T08:30:00.000Z');
	});

	it('reads all-day dates as local midnights, end exclusive, yearly', () => {
		const c = parseIcs(cal(
			'X-APPLE-CALENDAR-COLOR:#FF2968',
			'BEGIN:VEVENT',
			'UID:bday',
			'SUMMARY:Ola',
			'DTSTART;VALUE=DATE:20200229',
			'RRULE:FREQ=YEARLY',
			'END:VEVENT',
		));
		expect(c.color).toBe('#FF2968');
		// 29 Feb exists only in leap years: skipped, not clamped
		expect(c.events(range('2027-01-01', '2028-01-01'))).toEqual([]);
		const [ev] = c.events({ start: new Date(2028, 0, 1), end: new Date(2029, 0, 1) });
		expect(ev.allDay).toBe(true);
		expect(ev.start).toEqual(new Date(2028, 1, 29));
		expect(ev.end).toEqual(new Date(2028, 2, 1));
	});

	it('handles monthly ordinals, BYSETPOS, COUNT and UNTIL', () => {
		const ev = (rule: string, start = '20260102T100000Z') => cal(
			'BEGIN:VEVENT', 'UID:r', 'SUMMARY:R', `DTSTART:${start}`, 'DURATION:PT1H', `RRULE:${rule}`, 'END:VEVENT',
		);
		const days = (text: string, a = '2026-01-01T00:00:00Z', b = '2026-07-01T00:00:00Z') =>
			parseIcs(text).events(range(a, b)).map((e) => iso(e.start).slice(0, 10));

		// last Friday of each month
		expect(days(ev('FREQ=MONTHLY;BYDAY=-1FR;COUNT=3', '20260130T100000Z'))).toEqual(['2026-01-30', '2026-02-27', '2026-03-27']);
		// last weekday of the month (Outlook writes BYSETPOS)
		expect(days(ev('FREQ=MONTHLY;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1;UNTIL=20260401T000000Z', '20260130T100000Z')))
			.toEqual(['2026-01-30', '2026-02-27', '2026-03-31']);
		// every other day, five times
		expect(days(ev('FREQ=DAILY;INTERVAL=2;COUNT=5'))).toEqual(['2026-01-02', '2026-01-04', '2026-01-06', '2026-01-08', '2026-01-10']);
		// biweekly Tue/Thu until a date, inclusive
		expect(days(ev('FREQ=WEEKLY;INTERVAL=2;BYDAY=TU,TH;UNTIL=20260122', '20260106T100000Z')))
			.toEqual(['2026-01-06', '2026-01-08', '2026-01-20', '2026-01-22']);
		// the 15th and the last day
		expect(days(ev('FREQ=MONTHLY;BYMONTHDAY=15,-1;COUNT=4', '20260115T100000Z'))).toEqual(['2026-01-15', '2026-01-31', '2026-02-15', '2026-02-28']);
	});

	it('expands an old daily rule into a range years later', () => {
		const text = cal('BEGIN:VEVENT', 'UID:d', 'SUMMARY:D', 'DTSTART:20100101T080000Z', 'DTEND:20100101T081500Z', 'RRULE:FREQ=DAILY', 'END:VEVENT');
		const evs = parseIcs(text).events(range('2026-10-26T00:00:00Z', '2026-10-28T00:00:00Z'));
		expect(evs.map((e) => iso(e.start))).toEqual(['2026-10-26T08:00:00.000Z', '2026-10-27T08:00:00.000Z']);
	});

	it('maps status, categories and colour; survives junk', () => {
		const c = parseIcs(cal(
			'BEGIN:VEVENT', 'UID:x', 'SUMMARY:Off', 'DTSTART:20261026T100000Z', 'DTEND:20261026T110000Z',
			'STATUS:CANCELLED', 'CATEGORIES:Work,Team', 'COLOR:teal', 'END:VEVENT',
			'this is not a line',
			'BEGIN:VEVENT', 'UID:no-start', 'SUMMARY:Broken', 'END:VEVENT',
		));
		const [ev, ...rest] = c.events(range('2026-10-26T00:00:00Z', '2026-10-27T00:00:00Z'));
		expect(rest).toEqual([]);
		expect(ev).toMatchObject({ status: 'cancelled', category: 'Work', color: 'teal', externalId: 'x' });
	});

	it('unfolds long lines', () => {
		const c = parseIcs(cal('BEGIN:VEVENT', 'UID:f', 'DTSTART:20261026T100000Z', 'SUMMARY:Very long', '  title here', 'END:VEVENT'));
		expect(c.events(range('2026-10-26T00:00:00Z', '2026-10-27T00:00:00Z'))[0].title).toBe('Very long title here');
	});
});

describe('createIcsAdapter', () => {
	const r = range('2026-10-05T00:00:00Z', '2026-10-12T00:00:00Z');

	it('answers synchronously for text, refuses writes as read-only', async () => {
		const a = createIcsAdapter(GOOGLE, { color: '#123456' });
		const sync = a.fetchEventsSync!(r)!;
		expect(sync).toHaveLength(2);
		expect(sync[0].color).toBe('#123456');
		await expect(a.updateEvent!(sync[0].id, {})).rejects.toSatisfy(isReadOnlyError);
	});

	it('hands a drag of its event to the host inside a composite', async () => {
		const ics = createIcsAdapter(GOOGLE);
		const both = createCompositeAdapter([createMemoryAdapter([]), ics]);
		const [ev] = await both.fetchEvents(r);
		await expect(both.updateEvent!(ev.id, { start: new Date() })).rejects.toSatisfy(isReadOnlyError);
	});

	it('loads a webcal URL once, through the given fetch, and retries after a failure', async () => {
		const urls: string[] = [];
		let fail = true;
		const fetchStub = (async (url: string) => {
			urls.push(url);
			if (fail) return new Response('', { status: 503 });
			return new Response(GOOGLE);
		}) as unknown as typeof fetch;
		const a = createIcsAdapter({ url: 'webcal://example.com/basic.ics', fetch: fetchStub });
		expect(a.fetchEventsSync!(r)).toBeUndefined();
		await expect(a.fetchEvents(r)).rejects.toThrow('HTTP 503');
		fail = false;
		expect(await a.fetchEvents(r)).toHaveLength(2);
		expect(await a.fetchEvents(r)).toHaveLength(2);
		expect(urls).toEqual(['https://example.com/basic.ics', 'https://example.com/basic.ics']);
	});
});

describe('toIcs', () => {
	const events = [
		{ id: '1', title: 'Yoga, gentle; ąę', start: new Date('2026-10-26T17:00:00Z'), end: new Date('2026-10-26T18:00:00Z'), location: 'Studio', data: { description: 'Line 1\nLine 2' } },
		{ id: '2', title: 'Retreat', start: new Date(2026, 10, 6), end: new Date(2026, 10, 8), allDay: true, status: 'cancelled' as const },
		{ id: '3', title: 'x'.repeat(200), start: new Date('2026-10-27T10:00:00Z'), end: new Date('2026-10-27T11:00:00Z') },
	];

	it('round-trips through parseIcs', () => {
		const text = toIcs(events, { name: 'Studio' });
		expect(text.split('\r\n').every((l) => new TextEncoder().encode(l).length <= 75)).toBe(true);
		const c = parseIcs(text);
		expect(c.name).toBe('Studio');
		const back = c.events({ start: new Date(2026, 9, 1), end: new Date(2026, 11, 1) });
		expect(back.map((e) => [e.id, e.title, e.start.getTime(), e.end.getTime(), !!e.allDay])).toEqual(
			events.map((e) => [e.id, e.title, e.start.getTime(), e.end.getTime(), !!e.allDay]),
		);
		expect(back[0].data?.description).toBe('Line 1\nLine 2');
		expect(back[1].status).toBe('cancelled');
	});
});

describe('add-event links', () => {
	const ev = { id: '1', title: 'Yoga', start: new Date('2026-10-26T17:00:00Z'), end: new Date('2026-10-26T18:00:00Z'), location: 'Studio' };

	it('builds a Google template link', () => {
		const u = new URL(googleCalendarUrl(ev));
		expect(u.searchParams.get('action')).toBe('TEMPLATE');
		expect(u.searchParams.get('dates')).toBe('20261026T170000Z/20261026T180000Z');
		expect(u.searchParams.get('location')).toBe('Studio');
	});

	it('builds Outlook links, personal and work', () => {
		const u = new URL(outlookCalendarUrl(ev));
		expect(u.host).toBe('outlook.live.com');
		expect(u.searchParams.get('startdt')).toBe('2026-10-26T17:00:00.000Z');
		expect(new URL(outlookCalendarUrl({ ...ev, allDay: true }, { work: true })).host).toBe('outlook.office.com');
	});
});
