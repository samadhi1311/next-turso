'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/db';
import { customers } from '@/lib/db/schema';
import { CustomerType } from '@/lib/types/types';
import { eq } from 'drizzle-orm';
import { useState } from 'react';

export default function View() {
	const [id, setId] = useState<number | undefined>();
	const [customerData, setCustomerData] = useState<CustomerType>();

	async function getCustomerById(id: number | undefined) {
		if (id === undefined) return;
		const result = await db.select().from(customers).where(eq(customers.id, id));
		setCustomerData(result[0]);
	}
	return (
		<main className='flex min-h-screen flex-col items-center justify-center gap-8'>
			<div className='w-full max-w-md border-input border rounded-lg px-6 py-8 space-y-4'>
				<Input type='number' onChange={(e) => setId(Number(e.target.value))} />
				<Button onClick={() => getCustomerById(id)}>View</Button>
			</div>
			<div className='w-full max-w-md border-input border rounded-lg px-6 py-8 space-y-2'>
				{customerData ? (
					<div>
						<p>
							{customerData.id}. {customerData.username}
						</p>
						<p>{customerData.email}</p>
						<p>{customerData.createdAt}</p>
					</div>
				) : (
					<p>No results found.</p>
				)}
			</div>
		</main>
	);
}
