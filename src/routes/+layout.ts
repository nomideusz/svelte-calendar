import { dev } from '$app/env';
// Core inject, not `@vercel/analytics/sveltekit` — that wrapper still imports
// `$app/stores`, which kit 3 removed.
import { inject } from '@vercel/analytics';

inject({ mode: dev ? 'development' : 'production' });
