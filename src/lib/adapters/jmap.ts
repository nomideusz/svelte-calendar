import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from './types.js';
import { addDaysMs } from '../core/time.js';

export interface JmapClient {
	request(calls: any[]): Promise<{
		methodResponses: [string, any, string][];
	}>;
}

export interface JmapCalendarAdapterOptions {
	getAccountId: () => string;
	calendarId?: string;
	timeZone?: string;
	/** Map JMAP calendar color/category names */
	calendars?: { id: string; name: string; color: string }[] | (() => { id: string; name: string; color: string }[]);
}

export function createJmapAdapter(
	client: JmapClient,
	options: JmapCalendarAdapterOptions
): CalendarAdapter {
	const getAccountId = options.getAccountId;
	const timeZone = options.timeZone ?? 'Etc/UTC';

	/**
	 * Parse an RFC 8601/JSCalendar duration into its calendar part (weeks and
	 * days — whole days on the wall clock, which a DST change makes 23 or 25
	 * hours long) and its exact part (hours, minutes, seconds).
	 */
	function parseIsoDuration(duration: string): { days: number; ms: number } {
		const match =
			/^P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/i.exec(duration);
		if (!match) return { days: 0, ms: 0 };

		const weeks = Number(match[1] ?? 0);
		const days = Number(match[2] ?? 0);
		const hours = Number(match[3] ?? 0);
		const minutes = Number(match[4] ?? 0);
		const seconds = Number(match[5] ?? 0);

		return { days: weeks * 7 + days, ms: ((hours * 60 + minutes) * 60 + seconds) * 1000 };
	}

	function parseEventStart(event: any): Date {
		// An all-day event is floating: it sits on its date wherever the viewer
		// is. utcStart would pin it to the server zone's midnight instead.
		if (event.start && event.showWithoutTime) {
			const [datePart] = event.start.split('T');
			const [year, month, day] = datePart.split('-').map(Number);
			return new Date(year, month - 1, day);
		}
		if (event.utcStart) return new Date(event.utcStart);
		if (event.start) return new Date(event.start);
		return new Date();
	}

	function parseEventEnd(event: any, start: Date): Date {
		if (event.utcEnd && !event.showWithoutTime) return new Date(event.utcEnd);
		if (event.duration) {
			const { days, ms } = parseIsoDuration(event.duration);
			return new Date(addDaysMs(start.getTime(), days) + ms);
		}
		if (event.showWithoutTime) {
			return new Date(addDaysMs(start.getTime(), 1));
		}
		return new Date(start.getTime() + 60 * 60 * 1000);
	}

	function firstLocation(event: any): string | undefined {
		if (!event.locations) return undefined;
		for (const location of Object.values(event.locations) as any[]) {
			if (location.name) return location.name;
			if (location.description) return location.description;
		}
		return undefined;
	}

	function resolveCalendars() {
		const cal = options.calendars;
		if (typeof cal === 'function') return cal();
		return cal ?? [];
	}

	return {
		async fetchEvents(range: DateRange): Promise<TimelineEvent[]> {
			const accountId = getAccountId();
			if (!accountId) return [];

			const filter: Record<string, any> = {
				after: range.start.toISOString(),
				before: range.end.toISOString()
			};
			if (options.calendarId) {
				filter.inCalendar = options.calendarId;
			}

			const response = await client.request([
				[
					'CalendarEvent/query',
					{
						accountId,
						filter,
						expandRecurrences: true,
						timeZone,
						limit: 500
					},
					'ceq'
				],
				[
					'CalendarEvent/get',
					{
						accountId,
						'#ids': { resultOf: 'ceq', name: 'CalendarEvent/query', path: '/ids' },
						properties: [
							'id',
							'calendarIds',
							'title',
							'description',
							'start',
							'duration',
							'timeZone',
							'showWithoutTime',
							'utcStart',
							'utcEnd',
							'locations'
						]
					},
					'ceg'
				]
			]);

			const queryResponse = response.methodResponses?.find(r => r[0] === 'CalendarEvent/query' || r[2] === 'ceq');
			const getResponse = response.methodResponses?.find(r => r[0] === 'CalendarEvent/get' || r[2] === 'ceg');

			if (queryResponse?.[0] === 'error') {
				const error = queryResponse[1] as { type?: string; description?: string };
				throw new Error(error.description ?? error.type ?? 'CalendarEvent/query failed');
			}

			if (!getResponse || getResponse[0] === 'error') {
				return [];
			}

			const jmapEvents = (getResponse[1].list as any[]) ?? [];
			const currentCalendars = resolveCalendars();

			return jmapEvents.map((jmapEvent) => {
				const start = parseEventStart(jmapEvent);
				const end = parseEventEnd(jmapEvent, start);
				const calendarIds = Object.keys(jmapEvent.calendarIds ?? {});
				const associatedCal = currentCalendars.find((c) => calendarIds.includes(c.id));

				return {
					id: jmapEvent.id,
					title: jmapEvent.title?.trim() || '(No title)',
					start,
					end,
					allDay: !!jmapEvent.showWithoutTime,
					location: firstLocation(jmapEvent),
					color: associatedCal?.color,
					category: associatedCal?.name
				};
			});
		}
	};
}
