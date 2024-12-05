import { sql } from 'drizzle-orm/sql';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const customers = sqliteTable('customers', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	username: text('username', { length: 255 }).notNull(),
	email: text('email', { length: 255 }).unique().notNull(),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});
