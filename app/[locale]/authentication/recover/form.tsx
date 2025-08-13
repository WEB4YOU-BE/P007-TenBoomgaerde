"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import React from "react";
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
import { Link } from "@/i18n/navigation";
import recoverPassword from "@/service/authentication/recoverPassword";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const formSchema = z.object({ email: z.email() });

const RecoverPasswordWithEmailForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            email: formData.email,
            siteURL: new URL(window.location.href).origin,
        });
    };
    const { isPending, mutate } = useMutation({
        mutationFn: recoverPassword,
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: (_, variables) => {
            form.reset({ email: "" });
            toast.success("Ga verder in jouw mailbox!", {
                description: `Je hebt een mail gehad op ${variables.email}`,
                duration: Infinity,
            });
        },
        retry: false,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { email: "" },
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
                        name="email"
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
                    <Button disabled={isPending} type="submit">
                        Herstel
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

export default RecoverPasswordWithEmailForm;
