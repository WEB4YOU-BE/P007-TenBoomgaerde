"use client";

import { Button, buttonVariants } from "@/components/atoms/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { signUpWithEmailCredentials } from "./actions";

const formSchema = z
    .object({
        email: z.string(),
        password: z.string().min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang.",
        }),
        passwordConfirmation: z.string().min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang.",
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Wachtwoorden komen niet overeen!",
        path: ["passwordConfirmation"],
    });

const SignUpWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate(formData);
    };
    const { isPending, isSuccess, mutate } = useMutation({
        mutationFn: signUpWithEmailCredentials,
        mutationKey: ["SignUpWithEmailCredentials"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: (data) => {
            toast.success("Jouw account is aangemaakt!", {
                description: `${data.user?.email || "Je"} kreeg een email. Klik de link om jouw emailadres te verifiëren.`,
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) redirect("/authentication/sign-in/");
    }, [isSuccess]);

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        resolver: zodResolver(formSchema),
    });

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="username"
                                        type="email"
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
                            <FormItem>
                                <FormLabel>Nieuw wachtwoord</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="new-password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Herhaal wachtwoord</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="new-password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} type="submit">
                        {isPending && (
                            <SpinnerBall className="size-4 animate-spin" />
                        )}
                        {!isPending && "Maak account"}
                    </Button>
                </form>
            </Form>
            <Link
                className={buttonVariants({ variant: "outline" })}
                href="/authentication/sign-up/"
            >
                <ArrowLeft className="mr-4 size-4" />
                Ga terug
            </Link>
        </>
    );
};

export default SignUpWithEmailCredentialsForm;
