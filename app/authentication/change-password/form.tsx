"use client";

import Button from "@/components/atoms/button";
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
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { changePassword } from "./actions";

const formSchema = z
    .object({
        password: z.string().min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang.",
        }),
        verifyPassword: z.string().min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang.",
        }),
    })
    .refine((data) => data.password === data.verifyPassword, {
        message: "Wachtwoorden komen niet overeen.",
    });

const ChangePasswordForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate(formData.password);
    };
    const { isPending, mutate } = useMutation({
        mutationFn: changePassword,
        mutationKey: ["ResetPasswordForEmail"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            form.reset({ password: "", verifyPassword: "" });
            toast.success("Resetten gelukt!", {
                description: `Jouw nieuw wachtwoord is ingesteld.`,
            });
        },
        retry: false,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            password: "",
            verifyPassword: "",
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wachtwoord</FormLabel>
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
                        name="verifyPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wachtwoord herhalen</FormLabel>
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
                        Herstel
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ChangePasswordForm;
