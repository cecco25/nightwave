'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import DatePicker from '@/Components/DatePicker';
import RadioButtons from '@/Components/RadioButtons';
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
    name: z.string().nonempty({ message: 'Il nome è obbligatorio' }),
    surname: z.string().nonempty({ message: 'Il cognome è obbligatorio' }),
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
    date_of_birth: z
        .date({ required_error: 'La data di nascita è obbligatoria' })
        .refine((date) => date <= new Date(), {
            message: 'La data non può essere nel futuro',
        }),
    gender: z.enum(['M', 'F', '-'], {
        message: 'Seleziona un genere valido',
    }),
});

export default function Register() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            date_of_birth: undefined,
            gender: '-',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const csrfTokenMeta = document.querySelector(
                'meta[name="csrf-token"]',
            );
            const csrfToken = csrfTokenMeta?.getAttribute('content') || '';

            const response = await fetch('/registrati', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                toast({
                    title: 'Account creato',
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
                description:
                    'Si è verificato un errore durante la registrazione',
                variant: 'destructive',
            });
        }
    }

    return (
        <>
            <Head title="Registrati" />
            <Toaster></Toaster>
            <div className="flex min-h-screen items-center justify-center">
                <Card className="mx-auto w-full max-w-xl">
                    <CardHeader>
                        <CardTitle className="text-2x font-title">
                            Registrati
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div className="grid gap-4">
                                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="grid flex-1 gap-2">
                                                    <FormLabel htmlFor="name">
                                                        Nome
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="name"
                                                            placeholder="Il tuo nome"
                                                            autoComplete="name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="surname"
                                            render={({ field }) => (
                                                <FormItem className="grid flex-1 gap-2">
                                                    <FormLabel htmlFor="surname">
                                                        Cognome
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="surname"
                                                            placeholder="Il tuo cognome"
                                                            autoComplete="family-name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
                                                <FormLabel htmlFor="password">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <PasswordInput
                                                        id="password"
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                                        <FormField
                                            control={form.control}
                                            name="date_of_birth"
                                            render={({ field }) => (
                                                <FormItem className="grid flex-1 gap-2">
                                                    <FormLabel htmlFor="date_of_birth">
                                                        Data di nascita
                                                    </FormLabel>
                                                    <FormControl>
                                                        <DatePicker
                                                            id="date_of_birth"
                                                            text="La tua data di nascita"
                                                            {...field}
                                                            onChange={(date) =>
                                                                field.onChange(
                                                                    date,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem className="grid flex-1 gap-2">
                                                    <FormLabel htmlFor="gender">
                                                        Genere
                                                    </FormLabel>
                                                    <FormControl>
                                                        <RadioButtons
                                                            options={[
                                                                {
                                                                    value: 'M',
                                                                    label: 'Maschio',
                                                                },
                                                                {
                                                                    value: 'F',
                                                                    label: 'Femmina',
                                                                },
                                                                {
                                                                    value: '-',
                                                                    label: 'Altro',
                                                                },
                                                            ]}
                                                            {...field}
                                                        ></RadioButtons>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Registrati
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className="mt-4 text-center text-sm">
                            Hai gia un account?{' '}
                            <Link href="/login" className="underline">
                                Accedi
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
