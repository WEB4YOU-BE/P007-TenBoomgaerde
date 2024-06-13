"use client";

import { useForm } from "react-hook-form"

import { z } from "zod"
import { formSchema } from "@/schemas/auth/signInWithEmailCredentials"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query";
import { SignInWithCredentials } from "@/actions/auth/signIn";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SignInWithEmailCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => { mutate({ ...formData, email: formData.username }) }
    const { mutate, isPending } = useMutation({
        mutationKey: ["SignInWithEmailCredentials"],
        mutationFn: SignInWithCredentials,
        networkMode: "online",
        retry: false,
    })

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
                            <FormMessage/>
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Log in</Button>
            </form>
        </Form>
    </>
}

export default SignInWithEmailCredentialsForm