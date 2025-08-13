"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { RedirectType } from "next/navigation";
import React, { useEffect } from "react";
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
import { redirect } from "@/i18n/navigation";
import changePassword from "@/service/authentication/changePassword";

const formSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Wachtwoorden zijn minstens 8 karakters lang." })
            .regex(/[0-9]/, {
                message: "Wachtwoord moet minstens één cijfer bevatten.",
            })
            .regex(/[a-z]/, {
                message: "Wachtwoord moet minstens één kleine letter bevatten.",
            })
            .regex(/[A-Z]/, {
                message: "Wachtwoord moet minstens één hoofdletter bevatten.",
            })
            // eslint-disable-next-line no-useless-escape
            .regex(/[!@#$%^&*()_+\-=[\]{};\\':"\\|<>?,.\/`~]/, {
                message:
                    "Wachtwoord moet minstens één speciaal teken bevatten: !@#$%^&*()_+-=[]{};':\"|<>?,./`~",
            }),
        verifyPassword: z
            .string()
            .min(8, {
                message: "Wachtwoorden zijn minstens 8 karakters lang.",
            }),
    })
    .refine((data) => data.password === data.verifyPassword, {
        message: "Wachtwoorden komen niet overeen.",
        path: ["verifyPassword"],
    });

const ChangePasswordForm = () => {
    const locale = useLocale();

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        await mutateAsync({ password: formData.password });
    };
    const { isPending, isSuccess, mutateAsync } = useMutation({
        mutationFn: changePassword,
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
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
        defaultValues: { password: "", verifyPassword: "" },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isSuccess)
            return redirect({ href: "/", locale }, RedirectType.replace);
    }, [isSuccess, locale]);

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
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
                        {isPending && (
                            <SpinnerBallIcon className="size-4 animate-spin" />
                        )}
                        {!isPending && "Wijzig wachtwoord"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ChangePasswordForm;
