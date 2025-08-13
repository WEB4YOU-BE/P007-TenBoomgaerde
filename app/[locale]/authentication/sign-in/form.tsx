"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { RedirectType } from "next/navigation";
import React, { useCallback } from "react";
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
import { Link, redirect } from "@/i18n/navigation";
import signInWithPassword from "@/service/authentication/signInWithPassword";
import { getQueryClient } from "@/utils/query/queryClient";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const formSchema = z.object({ password: z.string(), username: z.email() });

const SignInWithEmailCredentialsForm = () => {
    const locale = useLocale();
    const queryClient = getQueryClient();

    const redirectToChangePassword = useCallback(
        () =>
            redirect({
                href: "/authentication/change-password/",
                locale: locale,
            }),
        [locale]
    );

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        await mutateAsync({
            credentials: {
                email: formData.username,
                password: formData.password,
            },
        });
    };
    const { isPending, isSuccess, mutateAsync } = useMutation({
        mutationFn: signInWithPassword,
        mutationKey: ["SignInWithEmailCredentials"],
        networkMode: "online",
        onError: (error) => {
            return toast.error(error.name, { description: error.message });
        },
        onSuccess: (data) => {
            void queryClient.invalidateQueries({
                queryKey: ["authenticatedUser"],
            });
            if (data.weakPassword)
                return toast.info("Uw wachtwoord is zwak.", {
                    action: {
                        label: "Wijzig",
                        onClick: redirectToChangePassword,
                    },
                    description:
                        "Overweeg om uw wachtwoord te wijzigen naar een sterker wachtwoord.",
                    duration: 60000,
                });
            return toast.success("Je bent ingelogd!", {
                description: `${data.user?.email} is aangemeld.`,
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (isSuccess)
            return redirect({ href: "/", locale }, RedirectType.replace);
    }, [isSuccess, locale]);

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { password: "", username: "" },
        resolver: zodResolver(formSchema),
    });

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mailadres</FormLabel>
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
                        {!isPending && "Meld aan"}
                    </Button>
                </form>
            </Form>
            <Link
                className={buttonVariants({ variant: "outline" })}
                href="/authentication/"
            >
                <ArrowLeftIcon className="mr-4 size-4" />
                Ga terug
            </Link>
        </>
    );
};

export default SignInWithEmailCredentialsForm;
