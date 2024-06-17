"use client";

import { useForm } from "react-hook-form"

import { z } from "zod"
import { formSchema } from "@/schemas/auth/updatePasswordCredentials"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query"
import { updatePassword } from "@/actions/auth/update-password"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const UpdatePasswordCredentialsForm = () => {
    const onSubmit = (formData: z.infer<typeof formSchema>) => { mutate(formData.password) }
    const { mutate, isPending } = useMutation({
        mutationKey: ["UpdatePasswordCredential"],
        mutationFn: updatePassword,
        networkMode: "online",
        retry: false,
    })

    const form = useForm<z.infer<typeof formSchema>>
        ({
            resolver: zodResolver(formSchema),
            defaultValues: {
                password: ""
            }
        })

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nieuw wachtwoord</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="passwordConfirmation"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Herhaal wachtwoord</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" autoComplete="new-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Update wachtwoord</Button>
            </form>
        </Form>
    </>
}

export default UpdatePasswordCredentialsForm