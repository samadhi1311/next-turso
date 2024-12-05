import * as schema from './schema';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const url = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!;
const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!;

if (!url || !authToken) {
	throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variable');
}

const turso = createClient({
	url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
	authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN,
});

const db = drizzle(turso, { schema });

export { db };
