"use client";

import { useForm } from "react-hook-form"

import { z } from "zod"
import { formSchema } from "@/schemas/auth/signUpWithEmailCredentials"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query"
import { SignUpWithCredentials } from "@/actions/auth/signUp"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button";

const SignUpWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => { mutate(formData) }
    const { mutate, isPending } = useMutation({
        mutationKey: ["SignUpWithEmailCredentials"],
        mutationFn: SignUpWithCredentials,
        networkMode: "online",
        retry: false,
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" autoComplete="username" />
                            </FormControl>
                            <FormDescription>Voer jouw emailadres in.</FormDescription>
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
                            <FormDescription>Voer jouw nieuw wachtwoord in.</FormDescription>
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
                            <FormDescription>Herhaal jouw nieuw wachtwoord.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Maak account</Button>
            </form>
        </Form>
    </>
}

export default SignUpWithEmailCredentialsForm