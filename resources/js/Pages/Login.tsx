'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { PasswordInput } from '@/Components/ui/password-input';

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: 'La password deve essere almeno di 8 caratteri' })
        .regex(/[a-z]/, {
            message: 'La password deve contenere almeno una lettera minuscola',
        })
        .regex(/[A-Z]/, {
            message: 'La password deve contenere almeno una lettera maiuscola',
        })
        .regex(/[0-9]/, {
            message: 'La password deve contenere almeno un numero',
        })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'La password deve contenere almeno un simbolo',
        }),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>,
            );
        } catch (error) {
            console.error('Form submission error', error);
            toast.error('Failed to submit the form. Please try again.');
        }
    }

    return (
        <>
            <Head title="Accedi" />
            <div className="flex min-h-screen items-center justify-center">
                <Card className="mx-auto w-96 max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2x font-title">
                            Accedi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2 text-sm">
                                                <FormLabel htmlFor="email">
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        placeholder="example@example.com"
                                                        type="email"
                                                        autoComplete="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <div className="flex items-center justify-between">
                                                    <FormLabel htmlFor="password">
                                                        Password
                                                    </FormLabel>
                                                    <Link
                                                        href="#"
                                                        className="ml-auto inline-block text-sm underline"
                                                    >
                                                        Password Dimenticata?
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <PasswordInput
                                                        id="password"
                                                        placeholder="********"
                                                        autoComplete="current-password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">
                                        Accedi
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            Non hai un account?{' '}
                            <Link href="#" className="underline">
                                Registrati
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
