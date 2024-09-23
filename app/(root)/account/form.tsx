"use client";

import { Button } from "@/components/atoms/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import createClient from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";

import { updateUser } from "./action";

const formSchema = z.object({
    city: z.string().min(1),
    email: z.string().email("Ongeldig e-mailadres"),
    firstname: z.string().min(1, "Voornaam is verplicht"),
    lastname: z.string().min(1, "Achternaam is verplicht"),
    phone: z.string().refine(isMobilePhone),
    postcode: z.string().min(1),
    street: z.string().min(1),
});
const UpdateProfileForm = () => {
    const [account, setAccount] = React.useState<null | User>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            setAccount(data.user);
        };
        fetchAccount();
    }, [setAccount]);

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        if (!account)
            return toast.error("Update mislukt", {
                description: "We konden je profiel niet vinden.",
            });
        mutate({ id: account.id, user: formData });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateUser,
        mutationKey: ["UpdateProfile"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("Je profiel is bijgewerkt!");
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
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
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Voornaam</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Achternaam</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefoonnummer</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Straat</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Postcode</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stad</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant={
                            isSuccess
                                ? "outline"
                                : isError
                                  ? "destructive"
                                  : "default"
                        }
                    >
                        {isPending && (
                            <LoaderPinwheel className="h-4 w-4 animate-spin" />
                        )}
                        {!isPending && "Bijwerken"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default UpdateProfileForm;
