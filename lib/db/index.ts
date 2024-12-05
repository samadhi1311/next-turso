import 'dotenv/config';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
	throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN environment variable');
}

const turso = createClient({
	url: url,
	authToken: authToken,
});

const db = drizzle(turso, { schema });

export { db };
