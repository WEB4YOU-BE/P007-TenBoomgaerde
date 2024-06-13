"use client";

import { useForm } from "react-hook-form"

import { z } from "zod"
import { formSchema } from "@/schemas/auth/signUpWithEmailCredentials"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query"
import { SignUpWithCredentials } from "@/actions/auth/signUp"
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button, buttonVariants } from "../ui/button";

import Link from "next/link";

const SignUpWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => { mutate(formData) }
    const { mutate, isPending } = useMutation({
        mutationKey: ["SignUpWithEmailCredentials"],
        mutationFn: SignUpWithCredentials,
        networkMode: "online",
        retry: false,
        onError: ({ name, message }) => {
            toast.error(name, {
                description: message
            })
        },
    })

    const form = useForm<z.infer<typeof formSchema>>
        ({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: "",
                password: "",
                passwordConfirmation: "",
            }
        })

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" autoComplete="username" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nieuw wachtwoord</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="passwordConfirmation"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Herhaal wachtwoord</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Maak account</Button>
            </form>
        </Form>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Of gebruik een bestaand
                </span>
            </div>
        </div>
        <Link
            href="/sign-in"
            className={buttonVariants({ variant: "outline" })}
        >
            Log in
        </Link>
    </>
}

export default SignUpWithEmailCredentialsForm