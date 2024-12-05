import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
	throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variable');
}

export default {
	schema: './lib/db/schema.ts',
	out: './lib/db/migrations',
	dialect: 'turso',
	dbCredentials: {
		url: url,
		authToken: authToken,
	},
} satisfies Config;
