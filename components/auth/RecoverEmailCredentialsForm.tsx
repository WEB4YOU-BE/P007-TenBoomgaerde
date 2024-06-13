"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { formSchema } from "@/schemas/auth/recoverEmailCredentials";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordForEmail } from "@/actions/auth/recover";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RecoverEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => { mutate(formData.email) }
    const { mutate, isPending } = useMutation({
        mutationKey: ["RecoverEmailCredentials"],
        mutationFn: resetPasswordForEmail,
        networkMode: "online",
        retry: false,
    })

    const form = useForm<z.infer<typeof formSchema>>
        ({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: ""
            }
        })

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    name="email"
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
                <Button type="submit" disabled={isPending}>Herstel</Button>
            </form>
        </Form>
    </>
}

export default RecoverEmailCredentialsForm