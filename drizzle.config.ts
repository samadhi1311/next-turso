import dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

const url = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!;
const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!;

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
