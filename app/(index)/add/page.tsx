'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerSchema } from '@/lib/types/types';
import { db } from '@/lib/db';
import { customers } from '@/lib/db/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CircleCheck, Loader2, Send } from 'lucide-react';

export default function Add() {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	const form = useForm<z.infer<typeof CustomerSchema>>({
		resolver: zodResolver(CustomerSchema),
		defaultValues: {
			username: '',
			email: '',
		},
	});

	async function onSubmit(values: z.infer<typeof CustomerSchema>) {
		setSuccess(false);
		setSubmitting(true);
		const newCustomer = {
			username: values.username,
			email: values.email,
		};
		try {
			await db.insert(customers).values(newCustomer).returning();
			setSuccess(true);
		} catch (error) {
			console.error(error);
			setSuccess(false);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center'>
			<div className='w-full max-w-md border-input border rounded-lg px-6 py-8'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder='Username' {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='Email' {...field} />
									</FormControl>
									<FormDescription>This is where you will receive messages.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit'>
							{success ? (
								<span className='flex items-center gap-2 text-emerald-200'>
									<CircleCheck className='size-5' />
									<span>Success</span>
								</span>
							) : submitting ? (
								<span className='flex items-center gap-2'>
									<Loader2 className='animate-spin size-5' />
									<span>Submitting...</span>
								</span>
							) : (
								<span className='flex items-center gap-2'>
									<Send className='size-4' />
									<span>Submit</span>
								</span>
							)}
						</Button>
					</form>
				</Form>
			</div>
		</main>
	);
}
