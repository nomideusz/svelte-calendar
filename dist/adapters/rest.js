export function createRestAdapter(options) {
    const { baseUrl, headers = {} } = options;
    const mapEvents = options.mapEvents ?? ((data) => data);
    const mapEvent = options.mapEvent ?? ((data) => data);
    async function request(path, init) {
        const res = await fetch(`${baseUrl}${path}`, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...(init?.headers ?? {}),
            },
        });
        if (!res.ok) {
            throw new Error(`Calendar API error: ${res.status} ${res.statusText}`);
        }
        if (res.status === 204)
            return undefined;
        return res.json();
    }
    return {
        async fetchEvents(range) {
            const params = new URLSearchParams({
                start: range.start.toISOString(),
                end: range.end.toISOString(),
            });
            const data = await request(`/events?${params}`);
            return mapEvents(data);
        },
        async createEvent(event) {
            const data = await request('/events', {
                method: 'POST',
                body: JSON.stringify(event),
            });
            return mapEvent(data);
        },
        async updateEvent(id, patch) {
            const data = await request(`/events/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(patch),
            });
            return mapEvent(data);
        },
        async deleteEvent(id) {
            await request(`/events/${id}`, { method: 'DELETE' });
        },
    };
}
