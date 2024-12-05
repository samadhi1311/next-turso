import { db } from '.';
import path from 'path';
import { migrate } from 'drizzle-orm/libsql/migrator';

(async () => {
	console.log('Migrating...');
	await migrate(db, { migrationsFolder: path.join(__dirname, './migrations') });
	console.log('Migration complete.');
})();
