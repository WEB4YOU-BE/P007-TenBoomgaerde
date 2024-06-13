"use client";

import { useForm } from "react-hook-form"

import { z } from "zod"
import { formSchema } from "@/schemas/auth/signInWithEmailCredentials"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query";
import { SignInWithCredentials } from "@/actions/auth/signIn";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";

import Link from "next/link";
import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";

const SignInWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => { mutate({ ...formData, email: formData.username }) }
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["SignInWithEmailCredentials"],
        mutationFn: SignInWithCredentials,
        networkMode: "online",
        retry: false,
    })
    {/* TODO: Add error states */ }

    useEffect(() => {
        if (isSuccess) redirect("/", RedirectType.replace)
    }, [isSuccess])

    const form = useForm<z.infer<typeof formSchema>>
        ({
            resolver: zodResolver(formSchema),
            defaultValues: {
                username: "",
                password: "",
            }
        })

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" />
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
                            <FormLabel>Wachtwoord</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" autoComplete="current-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Log in</Button>
                <Link
                    href="/recover"
                    className={buttonVariants({ variant: "link" })}
                >
                    Wachtwoord vergeten
                </Link>
            </form>
        </Form>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Of maak een nieuw
                </span>
            </div>
        </div>
        <Link
            href="/sign-up"
            className={buttonVariants({ variant: "outline" })}
        >
            Maak account
        </Link>
    </>
}

export default SignInWithEmailCredentialsForm