"use client";

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { SignInWithCredentials } from '@/actions/auth/signIn'
import { useMutation } from '@tanstack/react-query'
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
    username: z
        .string()
        .email(),
    password: z
        .string()
        .min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang."
        })
})

const LoginForm = () => {
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: SignInWithCredentials,
        onSuccess: () => {
            toast.success("Je bent ingelogd!")
        },
        onError: ({ message }) => {
            toast.error("Mislukt", {
                description: message
            })
        },
        retry: false
    })

    useEffect(() => {
        if (isSuccess) redirect("/")
    }, [isSuccess])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate({ email: data.username, password: data.password })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" />
                            </FormControl>
                            <FormDescription>Het email adres dat je gebruikt om in te loggen.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wachtwoord</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormDescription>Het wachtwoord dat je gebruikt om in te loggen.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending} variant={isError ? "destructive" : "default"}>Log in</Button>
            </form>
        </Form>
    )
}

export default LoginForm;