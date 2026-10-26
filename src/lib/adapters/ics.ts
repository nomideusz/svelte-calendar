/**
 * iCalendar (.ics, RFC 5545) — read and write the format every calendar app
 * speaks: Google Calendar, Apple Calendar / iCloud, Outlook / Microsoft 365,
 * Thunderbird, Proton, Fastmail, Nextcloud. A file import, a subscription URL
 * ("secret address in iCal format", "publish calendar", webcal://) and an
 * export are all this one format.
 *
 * Usage:
 *   import { createIcsAdapter, parseIcs, toIcs } from '@nomideusz/svelte-calendar';
 *
 *   const adapter = createIcsAdapter(await file.text());          // a dropped .ics file
 *   const feed = createIcsAdapter({ url: '/api/google-feed' });     // a subscription
 *   const download = toIcs(events, { name: 'Studio' });             // back out
 *
 * Recurrence: RRULE (DAILY, WEEKLY, MONTHLY, YEARLY with INTERVAL, COUNT,
 * UNTIL, BYDAY incl. ordinals, BYMONTHDAY, BYMONTH, BYSETPOS, WKST), RDATE,
 * EXDATE and RECURRENCE-ID overrides. Times: UTC, floating, IANA TZIDs and
 * the VTIMEZONE blocks Outlook writes under Windows zone names.
 */
import { getTimezoneOffset } from 'date-fns-tz';
import type { TimelineEvent, EventStatus } from '../core/types.js';
import type { CalendarAdapter, DateRange } from './types.js';
import { CalendarReadOnlyError, EventNotFoundError } from './errors.js';

// ── Lines → components ──────────────────────────────────

interface Prop {
	name: string;
	params: Record<string, string>;
	value: string;
}
interface Component {
	name: string;
	props: Prop[];
	children: Component[];
}

/** One content line: NAME;PARAM=a;PARAM="b:c":value */
function parseLine(line: string): Prop | null {
	let i = 0;
	while (i < line.length && line[i] !== ';' && line[i] !== ':') i++;
	const name = line.slice(0, i).toUpperCase();
	const params: Record<string, string> = {};
	while (line[i] === ';') {
		const eq = line.indexOf('=', i);
		if (eq < 0) return null;
		const key = line.slice(i + 1, eq).toUpperCase();
		let val = '';
		let quoted = false;
		for (i = eq + 1; i < line.length; i++) {
			const ch = line[i];
			if (ch === '"') quoted = !quoted;
			else if (!quoted && (ch === ';' || ch === ':')) break;
			else val += ch;
		}
		params[key] = val;
	}
	if (line[i] !== ':') return null;
	return { name, params, value: line.slice(i + 1) };
}

function parseComponents(text: string): Component {
	const root: Component = { name: 'ROOT', props: [], children: [] };
	const stack = [root];
	// Unfold: a line starting with a space or tab continues the previous one.
	const lines = text.replace(/\r\n?/g, '\n').replace(/\n[ \t]/g, '').split('\n');
	for (const line of lines) {
		if (!line.trim()) continue;
		const prop = parseLine(line);
		if (!prop) continue;
		const top = stack[stack.length - 1];
		if (prop.name === 'BEGIN') {
			const child: Component = { name: prop.value.trim().toUpperCase(), props: [], children: [] };
			top.children.push(child);
			stack.push(child);
		} else if (prop.name === 'END') {
			if (stack.length > 1) stack.pop();
		} else {
			top.props.push(prop);
		}
	}
	return root;
}

const prop = (c: Component, name: string) => c.props.find((p) => p.name === name);
const props = (c: Component, name: string) => c.props.filter((p) => p.name === name);

function unescapeText(v: string): string {
	return v.replace(/\\([\\;,nN])/g, (_, ch: string) => (ch === 'n' || ch === 'N' ? '\n' : ch));
}
const text = (c: Component, name: string) => {
	const p = prop(c, name);
	return p ? unescapeText(p.value) : undefined;
};

// ── Time ────────────────────────────────────────────────
// A "wall" is a wall-clock time stored as UTC milliseconds: its UTC getters
// read the local fields. Day math on walls is plain DAY steps, DST-free; a
// wall only becomes an instant through its zone.

const DAY = 86_400_000;

type Zone = (wall: number) => number;
interface IcsTime {
	wall: number;
	/** VALUE=DATE: an all-day date, no time */
	date: boolean;
	zone: Zone;
}

const UTC_ZONE: Zone = (wall) => wall;
/** A floating time: the browser's own wall clock. */
const LOCAL_ZONE: Zone = (wall) => {
	const d = new Date(wall);
	return new Date(
		d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),
		d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(),
	).getTime();
};

function ianaZone(tz: string): Zone | undefined {
	if (Number.isNaN(getTimezoneOffset(tz, new Date(0)))) return undefined;
	return (wall) => {
		// Two passes: the offset at the guessed instant settles DST edges.
		const guess = wall - getTimezoneOffset(tz, new Date(wall));
		return wall - getTimezoneOffset(tz, new Date(guess));
	};
}

/** "20261026" or "20261026T090000" (Z dropped) → wall */
function parseWall(v: string): number | undefined {
	const m = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?)?/.exec(v.trim());
	if (!m) return undefined;
	return Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0), +(m[6] ?? 0));
}

/** "-PT15M", "P1DT2H", "P1W" → ms */
function parseDuration(v: string): number | undefined {
	const m = /^([+-])?P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(v.trim());
	if (!m) return undefined;
	const ms = (+(m[2] ?? 0) * 7 + +(m[3] ?? 0)) * DAY + (+(m[4] ?? 0) * 3600 + +(m[5] ?? 0) * 60 + +(m[6] ?? 0)) * 1000;
	return m[1] === '-' ? -ms : ms;
}

// ── Recurrence ──────────────────────────────────────────

const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

interface Rule {
	freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
	interval: number;
	count?: number;
	until?: IcsTime;
	/** weekday 0 = Sunday; n = ordinal (0 = every) */
	byDay?: { n: number; wd: number }[];
	byMonthDay?: number[];
	/** months 0–11 */
	byMonth?: number[];
	bySetPos?: number[];
	wkst: number;
}

function parseRule(v: string, zoneOf: (tzid?: string) => Zone): Rule | undefined {
	const parts: Record<string, string> = {};
	for (const kv of v.split(';')) {
		const [k, val] = kv.split('=');
		if (k && val) parts[k.toUpperCase()] = val.toUpperCase();
	}
	const freq = parts.FREQ;
	// ponytail: HOURLY/MINUTELY/SECONDLY and BYHOUR/BYMINUTE/BYYEARDAY/BYWEEKNO are
	// not expanded (calendar apps don't write them); such an event shows its DTSTART only.
	if (freq !== 'DAILY' && freq !== 'WEEKLY' && freq !== 'MONTHLY' && freq !== 'YEARLY') return undefined;
	const nums = (s?: string) => s?.split(',').map(Number).filter((n) => Number.isInteger(n) && n !== 0);
	let until: IcsTime | undefined;
	if (parts.UNTIL) {
		const wall = parseWall(parts.UNTIL);
		if (wall != null) until = { wall, date: !parts.UNTIL.includes('T'), zone: parts.UNTIL.endsWith('Z') ? UTC_ZONE : zoneOf() };
	}
	return {
		freq,
		interval: Math.max(1, Number(parts.INTERVAL) || 1),
		count: parts.COUNT ? Number(parts.COUNT) : undefined,
		until,
		byDay: parts.BYDAY?.split(',').flatMap((s) => {
			const m = /^([+-]?\d+)?([A-Z]{2})$/.exec(s);
			const wd = m ? WEEKDAYS.indexOf(m[2]) : -1;
			return m && wd >= 0 ? [{ n: Number(m[1] ?? 0), wd }] : [];
		}),
		byMonthDay: nums(parts.BYMONTHDAY),
		byMonth: nums(parts.BYMONTH)?.map((m) => m - 1),
		bySetPos: nums(parts.BYSETPOS),
		wkst: Math.max(0, WEEKDAYS.indexOf(parts.WKST ?? 'MO')),
	};
}

const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const weekday = (wall: number) => new Date(wall).getUTCDay();

/** Day offsets in a span of `len` days from `start` matching BYDAY (ordinals count within the span). */
function pickWeekdays(start: number, len: number, byDay: { n: number; wd: number }[]): number[] {
	const out: number[] = [];
	for (const { n, wd } of byDay) {
		const all: number[] = [];
		for (let d = (wd - weekday(start) + 7) % 7; d < len; d += 7) all.push(d);
		if (!n) out.push(...all);
		else {
			const pick = n > 0 ? all[n - 1] : all[all.length + n];
			if (pick != null) out.push(pick);
		}
	}
	return out;
}

/** Days (walls at midnight) of month y/m the rule selects; `dtDay` when it names none. */
function monthDays(y: number, m: number, r: Rule, dtDay: number): number[] {
	const len = daysInMonth(y, m);
	const start = Date.UTC(y, m, 1);
	let days: number[] | undefined;
	if (r.byMonthDay?.length) {
		days = r.byMonthDay.map((d) => (d < 0 ? len + d + 1 : d)).filter((d) => d >= 1 && d <= len).map((d) => d - 1);
	}
	if (r.byDay?.length) {
		const picked = pickWeekdays(start, len, r.byDay);
		days = days ? days.filter((d) => picked.includes(d)) : picked;
	}
	// RFC 5545: a date that doesn't exist (31 Feb) is skipped, not clamped.
	days ??= dtDay <= len ? [dtDay - 1] : [];
	return days.map((d) => start + d * DAY);
}

/**
 * Occurrence walls of a rule, in order, from DTSTART (always the first) until
 * the rule ends or a period starts after `to`. `from` lets a rule without
 * COUNT skip the periods that end before it.
 */
function* expandRule(dt: number, r: Rule, from: number, to: number): Generator<number> {
	const tod = ((dt % DAY) + DAY) % DAY;
	const dtDate = new Date(dt - tod);
	const dtY = dtDate.getUTCFullYear();
	const dtM = dtDate.getUTCMonth();
	const dtD = dtDate.getUTCDate();
	let emitted = 0;
	const limit = r.count ?? Infinity;
	yield dt;
	if (++emitted >= limit) return;

	const inMonth = (w: number) => !r.byMonth?.length || r.byMonth.includes(new Date(w).getUTCMonth());
	for (let p = 0; ; p += r.interval) {
		let periodStart: number;
		let days: number[];
		switch (r.freq) {
			case 'DAILY': {
				periodStart = dt - tod + p * DAY;
				if (r.count == null && periodStart < from - DAY) {
					p += Math.floor((from - DAY - periodStart) / DAY / r.interval) * r.interval;
					periodStart = dt - tod + p * DAY;
				}
				const d = new Date(periodStart);
				const ok =
					inMonth(periodStart) &&
					(!r.byDay?.length || r.byDay.some((b) => b.wd === d.getUTCDay())) &&
					(!r.byMonthDay?.length ||
						r.byMonthDay.some((md) => (md < 0 ? daysInMonth(d.getUTCFullYear(), d.getUTCMonth()) + md + 1 : md) === d.getUTCDate()));
				days = ok ? [periodStart] : [];
				break;
			}
			case 'WEEKLY': {
				const week0 = dt - tod - ((weekday(dt) - r.wkst + 7) % 7) * DAY;
				periodStart = week0 + p * 7 * DAY;
				if (r.count == null && periodStart < from - 7 * DAY) {
					p += Math.floor((from - 7 * DAY - periodStart) / (7 * DAY) / r.interval) * r.interval;
					periodStart = week0 + p * 7 * DAY;
				}
				const wds = r.byDay?.length ? r.byDay.map((b) => b.wd) : [weekday(dt)];
				days = wds.map((wd) => periodStart + ((wd - r.wkst + 7) % 7) * DAY).filter(inMonth);
				break;
			}
			case 'MONTHLY': {
				const y = dtY + Math.floor((dtM + p) / 12);
				const m = (dtM + p) % 12;
				periodStart = Date.UTC(y, m, 1);
				days = r.byMonth?.length && !r.byMonth.includes(m) ? [] : monthDays(y, m, r, dtD);
				break;
			}
			case 'YEARLY': {
				const y = dtY + p;
				periodStart = Date.UTC(y, 0, 1);
				if (r.byDay?.length && !r.byMonth?.length && !r.byMonthDay?.length) {
					// BYDAY alone ranges over the whole year (20MO = 20th Monday).
					const len = (Date.UTC(y + 1, 0, 1) - periodStart) / DAY;
					days = pickWeekdays(periodStart, len, r.byDay).map((d) => periodStart + d * DAY);
				} else {
					const months = r.byMonth?.length ? r.byMonth : r.byMonthDay?.length ? [...Array(12).keys()] : [dtM];
					days = months.flatMap((m) => monthDays(y, m, r, dtD));
				}
				break;
			}
		}
		if (periodStart > to) return;
		if (r.until && periodStart > r.until.wall + DAY) return;
		let walls = [...new Set(days)].sort((a, b) => a - b).map((d) => d + tod);
		if (r.bySetPos?.length) {
			const all = walls;
			walls = r.bySetPos.map((i) => all[i > 0 ? i - 1 : all.length + i]).filter((w) => w != null).sort((a, b) => a - b);
		}
		for (const w of walls) {
			if (w <= dt) continue;
			yield w;
			if (++emitted >= limit) return;
		}
	}
}

// ── VTIMEZONE ───────────────────────────────────────────

const parseOffset = (v: string) => {
	const m = /^([+-])(\d{2})(\d{2})(\d{2})?$/.exec(v.trim());
	return m ? (m[1] === '-' ? -1 : 1) * ((+m[2] * 60 + +m[3]) * 60 + +(m[4] ?? 0)) * 1000 : 0;
};

/** A zone built from a VTIMEZONE's STANDARD/DAYLIGHT onsets (Outlook's Windows-named zones). */
function vtimezoneZone(tz: Component): Zone | undefined {
	const parts = tz.children.flatMap((c) => {
		const start = parseWall(prop(c, 'DTSTART')?.value ?? '');
		const to = prop(c, 'TZOFFSETTO');
		if (start == null || !to) return [];
		const rrule = prop(c, 'RRULE');
		return [{
			start,
			to: parseOffset(to.value),
			from: parseOffset(prop(c, 'TZOFFSETFROM')?.value ?? to.value),
			rule: rrule ? parseRule(rrule.value, () => UTC_ZONE) : undefined,
			rdates: props(c, 'RDATE').flatMap((p) => p.value.split(',')).map(parseWall).filter((w): w is number => w != null),
		}];
	});
	if (!parts.length) return undefined;
	const byYear = new Map<number, { at: number; to: number }[]>();
	const onsets = (year: number) => {
		let list = byYear.get(year);
		if (!list) {
			const from = Date.UTC(year - 1, 0, 1);
			const to = Date.UTC(year + 1, 0, 1);
			list = [];
			for (const part of parts) {
				const walls = part.rule ? expandRule(part.start, part.rule, from, to) : [part.start];
				for (const at of walls) if (at >= from && at < to) list.push({ at, to: part.to });
				for (const at of part.rdates) if (at >= from && at < to) list.push({ at, to: part.to });
			}
			list.sort((a, b) => a.at - b.at);
			byYear.set(year, list);
		}
		return list;
	};
	const first = parts.reduce((a, b) => (b.start < a.start ? b : a));
	return (wall) => {
		const list = onsets(new Date(wall).getUTCFullYear());
		let offset = first.from;
		for (const o of list) if (o.at <= wall) offset = o.to;
		return wall - offset;
	};
}

// ── Events ──────────────────────────────────────────────

interface IcsEventDef {
	uid: string;
	start: IcsTime;
	/** ms for a timed event, days × DAY for an all-day one */
	duration: number;
	rule?: Rule;
	rdates: IcsTime[];
	exdates: Set<number>;
	/** RECURRENCE-ID: the occurrence of its master this row replaces */
	recurrence?: IcsTime;
	title: string;
	location?: string;
	status?: EventStatus;
	category?: string;
	color?: string;
	data: Record<string, unknown>;
}

const instant = (t: IcsTime) => t.zone(t.wall);
/** An all-day date is midnight in the browser's zone; a time is its instant. */
const toDate = (t: IcsTime) => new Date(t.date ? LOCAL_ZONE(t.wall) : instant(t));

/** UNTIL is inclusive; a date UNTIL keeps that whole day. */
function pastUntil(t: IcsTime, until: IcsTime | undefined): boolean {
	if (!until) return false;
	if (until.date) return t.wall >= until.wall + DAY;
	return t.date ? t.wall > until.wall : instant(t) > instant(until);
}

const STATUS: Record<string, EventStatus> = { CANCELLED: 'cancelled', TENTATIVE: 'tentative', CONFIRMED: 'confirmed' };

export interface IcsCalendar {
	/** The calendar's name (X-WR-CALNAME / NAME), when the file has one */
	name?: string;
	/** The calendar's colour (X-APPLE-CALENDAR-COLOR / COLOR), when the file has one */
	color?: string;
	/** Every event overlapping `range`, recurrences expanded */
	events(range: DateRange): TimelineEvent[];
}

/**
 * Parse an iCalendar text (.ics, .ical, .ifb; a .vcs reads as far as its
 * events go). Recurring events are expanded per range by `events(range)`.
 * A malformed line or event is skipped, never thrown.
 */
export function parseIcs(input: string): IcsCalendar {
	const root = parseComponents(input);
	const cal = root.children.find((c) => c.name === 'VCALENDAR') ?? root;
	const zones = new Map<string, Zone>();
	for (const tz of cal.children.filter((c) => c.name === 'VTIMEZONE')) {
		const id = prop(tz, 'TZID')?.value;
		const zone = id ? vtimezoneZone(tz) : undefined;
		if (id && zone) zones.set(id, zone);
	}
	// Floating times read in the calendar's own zone when it names one (Google does).
	const calTz = prop(cal, 'X-WR-TIMEZONE')?.value;
	const floating = (calTz && ianaZone(calTz)) || LOCAL_ZONE;
	const zoneOf = (tzid?: string): Zone => {
		if (!tzid) return floating;
		const id = tzid.replace(/^\//, '');
		return ianaZone(id) ?? zones.get(tzid) ?? floating;
	};
	const timeOf = (p: Prop | undefined): IcsTime | undefined => {
		if (!p) return undefined;
		const wall = parseWall(p.value);
		if (wall == null) return undefined;
		return {
			wall,
			date: p.params.VALUE === 'DATE' || !p.value.includes('T'),
			zone: p.value.trim().endsWith('Z') ? UTC_ZONE : zoneOf(p.params.TZID),
		};
	};
	const timesOf = (ps: Prop[]): IcsTime[] =>
		ps.flatMap((p) => p.value.split(',').map((value) => timeOf({ ...p, value }))).filter((t): t is IcsTime => !!t);

	const defs: IcsEventDef[] = [];
	for (const ve of cal.children.filter((c) => c.name === 'VEVENT')) {
		const start = timeOf(prop(ve, 'DTSTART'));
		if (!start) continue;
		const end = timeOf(prop(ve, 'DTEND'));
		const dur = prop(ve, 'DURATION');
		let duration = end
			? start.date ? end.wall - start.wall : instant(end) - instant(start)
			: dur ? (parseDuration(dur.value) ?? 0) : start.date ? DAY : 0;
		if (duration < 0) duration = 0;
		const rrule = prop(ve, 'RRULE');
		const recurrenceId = timeOf(prop(ve, 'RECURRENCE-ID'));
		const status = prop(ve, 'STATUS')?.value.trim().toUpperCase();
		const data: Record<string, unknown> = { readOnly: true };
		const description = text(ve, 'DESCRIPTION');
		if (description) data.description = description;
		const url = prop(ve, 'URL')?.value.trim();
		if (url) data.url = url;
		defs.push({
			uid: prop(ve, 'UID')?.value.trim() || `ics-${defs.length}`,
			start,
			duration,
			rule: rrule ? parseRule(rrule.value, zoneOf) : undefined,
			rdates: timesOf(props(ve, 'RDATE')),
			exdates: new Set(timesOf(props(ve, 'EXDATE')).map(instant)),
			recurrence: recurrenceId,
			title: text(ve, 'SUMMARY')?.trim() || '(No title)',
			location: text(ve, 'LOCATION')?.trim() || undefined,
			status: status ? STATUS[status] : undefined,
			category: text(ve, 'CATEGORIES')?.split(',')[0]?.trim() || undefined,
			color: prop(ve, 'COLOR')?.value.trim() || undefined,
			data,
		});
	}

	// RECURRENCE-ID rows replace one occurrence of their master.
	const overrides = new Map<string, Map<number, IcsEventDef>>();
	for (const d of defs) {
		if (!d.recurrence) continue;
		let m = overrides.get(d.uid);
		if (!m) overrides.set(d.uid, (m = new Map()));
		m.set(instant(d.recurrence), d);
	}
	const masters = defs.filter((d) => !d.recurrence);
	const mastered = new Set(masters.map((d) => d.uid));
	// An override whose master isn't in the file still stands alone.
	const orphans = defs.filter((d) => d.recurrence && !mastered.has(d.uid));

	const calColor = prop(cal, 'X-APPLE-CALENDAR-COLOR')?.value.trim() || prop(cal, 'COLOR')?.value.trim() || undefined;

	const toEvent = (d: IcsEventDef, start: IcsTime, id: string): TimelineEvent => {
		const s = toDate(start);
		const e = start.date
			? toDate({ ...start, wall: start.wall + d.duration })
			: new Date(s.getTime() + d.duration);
		const ev: TimelineEvent = { id, title: d.title, start: s, end: e, externalId: d.uid, data: { ...d.data } };
		if (start.date) ev.allDay = true;
		if (d.location) ev.location = d.location;
		if (d.status) ev.status = d.status;
		if (d.category) ev.category = d.category;
		if (d.color) ev.color = d.color;
		return ev;
	};
	const key = (t: IcsTime) => new Date(t.wall).toISOString().replace(/[-:]|\.\d+Z$/g, '').replace(t.date ? /T.*$/ : /$/, '');

	return {
		name: text(cal, 'X-WR-CALNAME') ?? text(cal, 'NAME'),
		color: calColor,
		events(range: DateRange): TimelineEvent[] {
			const out: TimelineEvent[] = [];
			const lo = range.start.getTime();
			const hi = range.end.getTime();
			const push = (ev: TimelineEvent) => {
				const s = ev.start.getTime();
				const e = Math.max(ev.end.getTime(), s + 1); // a zero-length event still sits at its time
				if (s < hi && e > lo) out.push(ev);
			};
			for (const d of masters) {
				if (!d.rule && !d.rdates.length) {
					push(toEvent(d, d.start, d.uid));
					continue;
				}
				const own = overrides.get(d.uid);
				const seen = new Set<number>();
				const occurrence = (t: IcsTime) => {
					const at = instant(t);
					if (seen.has(at) || d.exdates.has(at)) return;
					seen.add(at);
					const id = `${d.uid}--${key(t)}`;
					const over = own?.get(at);
					push(over ? toEvent(over, over.start, id) : toEvent(d, t, id));
				};
				// Walls run ±14 h from instants, and an occurrence can start a
				// duration before the range: widen by both, trim in push().
				const from = lo - d.duration - 2 * DAY + (d.start.wall - instant(d.start));
				const to = hi + 2 * DAY + (d.start.wall - instant(d.start));
				if (d.rule) {
					for (const wall of expandRule(d.start.wall, d.rule, from, to)) {
						const t = { ...d.start, wall };
						if (wall > to || pastUntil(t, d.rule.until)) break;
						if (wall >= from) occurrence(t);
					}
				} else {
					occurrence(d.start);
				}
				for (const t of d.rdates) occurrence(t);
				// An override moved into the range from an occurrence outside it.
				for (const over of own?.values() ?? []) {
					const at = instant(over.recurrence!);
					if (seen.has(at) || d.exdates.has(at)) continue;
					push(toEvent(over, over.start, `${d.uid}--${key(over.recurrence!)}`));
				}
			}
			for (const d of orphans) push(toEvent(d, d.start, `${d.uid}--${key(d.recurrence!)}`));
			return out;
		},
	};
}

// ── Adapter ─────────────────────────────────────────────

export type IcsSource =
	| string
	| {
			/** An https:// or webcal:// feed URL (Google's "secret address in iCal format", Outlook's published ICS, an iCloud public calendar) */
			url: string;
			/** Your own fetch — e.g. one that adds headers or goes through your server */
			fetch?: typeof fetch;
			/** Refetch on the next load once the copy is older than this many ms (default: never) */
			refreshInterval?: number;
	  }
	| (() => Promise<string>);

export interface IcsAdapterOptions {
	/** Colour for events that name none (default: the calendar's own colour, else ink) */
	color?: string;
}

/**
 * A read-only CalendarAdapter over iCalendar data: a file's text, a feed URL,
 * or a function that loads the text. Each occurrence carries `data.readOnly`,
 * and a write throws CalendarReadOnlyError, so a composite hands a drag to
 * `oneventmove`.
 *
 * Feeds from Google, Outlook and iCloud send no CORS headers: in a browser,
 * fetch them through your own server route.
 */
export function createIcsAdapter(source: IcsSource, options: IcsAdapterOptions = {}): CalendarAdapter {
	let parsed: IcsCalendar | undefined = typeof source === 'string' ? parseIcs(source) : undefined;
	let loading: Promise<IcsCalendar> | undefined;
	let loadedAt = 0;
	// Ids this adapter has handed out: a write to one is refused as read-only,
	// any other id is "not mine" (a composite asks its next child).
	const known = new Set<string>();

	const load = (): Promise<IcsCalendar> => {
		if (typeof source === 'string') return Promise.resolve(parsed!);
		const stale = typeof source === 'object' && source.refreshInterval != null && Date.now() - loadedAt > source.refreshInterval;
		if (!loading || (stale && parsed)) {
			loadedAt = Date.now();
			const request =
				typeof source === 'function'
					? source()
					: (source.fetch ?? fetch)(source.url.replace(/^webcal:/i, 'https:')).then((r) => {
							if (!r.ok) throw new Error(`ICS feed ${source.url}: HTTP ${r.status}`);
							return r.text();
						});
			loading = request.then(
				(t) => (parsed = parseIcs(t)),
				(e) => {
					loading = undefined; // the next load tries again
					throw e;
				},
			);
		}
		return parsed && !stale ? Promise.resolve(parsed) : loading;
	};

	const paint = (events: TimelineEvent[], cal: IcsCalendar) => {
		const color = options.color ?? cal.color;
		for (const e of events) known.add(e.id);
		return color ? events.map((e) => (e.color ? e : { ...e, color })) : events;
	};

	return {
		fetchEventsSync(range) {
			return parsed && typeof source === 'string' ? paint(parsed.events(range), parsed) : undefined;
		},
		async fetchEvents(range) {
			const cal = await load();
			return paint(cal.events(range), cal);
		},
		async updateEvent(id) {
			if (!known.has(id)) throw new EventNotFoundError(id);
			throw new CalendarReadOnlyError(`read-only: ${id} comes from an iCalendar source`);
		},
	};
}

// ── Export ──────────────────────────────────────────────

function escapeText(v: string): string {
	return v.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Fold a content line at 75 octets (RFC 5545 §3.1), never inside a character. */
function fold(line: string): string {
	const out: string[] = [];
	let cur = '';
	let bytes = 0;
	for (const ch of line) {
		const cp = ch.codePointAt(0)!;
		const n = cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
		if (bytes + n > (out.length ? 74 : 75)) {
			out.push(cur);
			cur = '';
			bytes = 0;
		}
		cur += ch;
		bytes += n;
	}
	out.push(cur);
	return out.join('\r\n ');
}

const pad = (n: number) => String(n).padStart(2, '0');
const utcStamp = (d: Date) => d.toISOString().replace(/[-:]|\.\d+/g, '');
const localDate = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;

export interface ToIcsOptions {
	/** Calendar name (X-WR-CALNAME), shown by Google, Apple and Outlook */
	name?: string;
	/** PRODID (default: -//nomideusz//svelte-calendar//EN) */
	prodId?: string;
}

/**
 * Write events as an iCalendar file that Google Calendar, Apple Calendar and
 * Outlook import (or subscribe to, served from a URL). Times go out in UTC;
 * all-day events as dates. UID is `externalId ?? id`. A string
 * `data.description` / `data.url` becomes DESCRIPTION / URL.
 */
export function toIcs(events: TimelineEvent[], options: ToIcsOptions = {}): string {
	const stamp = utcStamp(new Date());
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		`PRODID:${options.prodId ?? '-//nomideusz//svelte-calendar//EN'}`,
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
	];
	if (options.name) lines.push(`X-WR-CALNAME:${escapeText(options.name)}`);
	for (const ev of events) {
		lines.push('BEGIN:VEVENT', `UID:${escapeText(ev.externalId ?? ev.id)}`, `DTSTAMP:${stamp}`);
		if (ev.allDay) {
			// An all-day end is exclusive: a one-day event ends the next midnight.
			const end = ev.end > ev.start ? ev.end : new Date(ev.start.getFullYear(), ev.start.getMonth(), ev.start.getDate() + 1);
			const endDay = end.getHours() || end.getMinutes() ? new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1) : end;
			lines.push(`DTSTART;VALUE=DATE:${localDate(ev.start)}`, `DTEND;VALUE=DATE:${localDate(endDay)}`);
		} else {
			lines.push(`DTSTART:${utcStamp(ev.start)}`, `DTEND:${utcStamp(ev.end)}`);
		}
		lines.push(`SUMMARY:${escapeText(ev.title)}`);
		if (ev.location) lines.push(`LOCATION:${escapeText(ev.location)}`);
		const description = ev.data?.description ?? ev.subtitle;
		if (typeof description === 'string' && description) lines.push(`DESCRIPTION:${escapeText(description)}`);
		if (typeof ev.data?.url === 'string') lines.push(`URL:${ev.data.url}`);
		if (ev.category) lines.push(`CATEGORIES:${escapeText(ev.category)}`);
		if (ev.status === 'cancelled' || ev.status === 'tentative') lines.push(`STATUS:${ev.status.toUpperCase()}`);
		lines.push('END:VEVENT');
	}
	lines.push('END:VCALENDAR');
	return lines.map(fold).join('\r\n') + '\r\n';
}

// ── One-event links ─────────────────────────────────────

const detailsOf = (ev: TimelineEvent) => {
	const d = ev.data?.description ?? ev.subtitle;
	return typeof d === 'string' ? d : '';
};

/** An "add to Google Calendar" link for one event. */
export function googleCalendarUrl(ev: TimelineEvent): string {
	const dates = ev.allDay
		? `${localDate(ev.start)}/${localDate(ev.end > ev.start ? ev.end : new Date(ev.start.getFullYear(), ev.start.getMonth(), ev.start.getDate() + 1))}`
		: `${utcStamp(ev.start)}/${utcStamp(ev.end)}`;
	const q = new URLSearchParams({ action: 'TEMPLATE', text: ev.title, dates });
	if (ev.location) q.set('location', ev.location);
	const details = detailsOf(ev);
	if (details) q.set('details', details);
	return `https://calendar.google.com/calendar/render?${q}`;
}

/**
 * An "add to Outlook" link for one event: outlook.live.com (personal), or
 * `work: true` for outlook.office.com (Microsoft 365).
 */
export function outlookCalendarUrl(ev: TimelineEvent, options: { work?: boolean } = {}): string {
	const iso = (d: Date) => (ev.allDay ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : d.toISOString());
	const q = new URLSearchParams({
		path: '/calendar/action/compose',
		rru: 'addevent',
		subject: ev.title,
		startdt: iso(ev.start),
		enddt: iso(ev.end),
		allday: String(!!ev.allDay),
	});
	if (ev.location) q.set('location', ev.location);
	const details = detailsOf(ev);
	if (details) q.set('body', details);
	return `https://${options.work ? 'outlook.office.com' : 'outlook.live.com'}/calendar/0/deeplink/compose?${q}`;
}
