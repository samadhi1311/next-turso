import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

import { customers } from '../db/schema';

const CustomerSchema = createInsertSchema(customers, {
	email: z.string({ required_error: 'Email is required' }).trim().email({ message: 'Invalid email' }).max(255, { message: 'Email must be at most 255 characters' }),
	username: z
		.string({ required_error: 'Username is required' })
		.trim()
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(255, { message: 'Username must be at most 255 characters' }),
}).omit({ id: true, createdAt: true });

export { CustomerSchema };
