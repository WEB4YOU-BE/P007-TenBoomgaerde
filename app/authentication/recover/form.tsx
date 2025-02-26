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

import { resetPasswordForEmail } from "./actions";

const formSchema = z.object({
    email: z.string().email(),
});

const ResetWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate(formData.email);
    };
    const { isPending, mutate } = useMutation({
        mutationFn: resetPasswordForEmail,
        mutationKey: ["ResetPasswordForEmail"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: (_, variables) => {
            form.reset({ email: "" });
            toast.success("Ga verder in jouw mailbox!", {
                description: `Je hebt een mail gehad op ${variables}`,
                duration: Infinity,
            });
        },
        retry: false,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
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
        </>
    );
};

export default ResetWithEmailCredentialsForm;
