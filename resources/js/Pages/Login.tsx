'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
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
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    email: z.string().email({ message: 'Email non valida' }),
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
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const csrfTokenMeta = document.querySelector(
                'meta[name="csrf-token"]',
            );
            const csrfToken = csrfTokenMeta?.getAttribute('content') || '';

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                toast({
                    title: 'Login effettuato',
                    variant: 'success',
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                const errorData = await response.json();
                toast({
                    title: errorData.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Form submission error', error);
            toast({
                title: 'Errore',
                description: 'Si è verificato un errore durante il login',
                variant: 'destructive',
            });
        }
    }

    return (
        <>
            <Head title="Accedi" />
            <Toaster />
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
                            <Link href="/registrati" className="underline">
                                Registrati
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
