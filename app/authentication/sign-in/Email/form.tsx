"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import Form, {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

import { signInWithEmailCredentials } from "./actions";

const formSchema = z.object({
    password: z.string().min(8, {
        message: "Wachtwoorden zijn minstens 8 karakters lang.",
    }),
    username: z.string().email(),
});

const SignInWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ ...formData, email: formData.username });
    };
    const { isPending, isSuccess, mutate } = useMutation({
        mutationFn: signInWithEmailCredentials,
        mutationKey: ["SignInWithEmailCredentials"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: (data) => {
            toast.success("Je bent ingelogd!", {
                description: `${data.user?.email} is aangemeld.`,
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) return redirect("/", RedirectType.replace);
    }, [isSuccess]);

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            password: "",
            username: "",
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
                        name="username"
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
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wachtwoord</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="current-password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isPending} type="submit">
                        {isPending && (
                            <SpinnerBallIcon className="size-4 animate-spin" />
                        )}
                        {!isPending && "Log in"}
                    </Button>
                </form>
            </Form>
            <Link
                className={buttonVariants({ variant: "outline" })}
                href="/authentication/sign-in/"
            >
                <ArrowLeftIcon className="mr-4 size-4" />
                Ga terug
            </Link>
        </>
    );
};

export default SignInWithEmailCredentialsForm;
