"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { type User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import Form, {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";
import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

import { updateUser } from "./actions";

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
    const [profile, setProfile] = React.useState<null | Tables<"users">>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            setAccount(data.user);
        };
        void fetchAccount();
    }, [setAccount]);

    useEffect(() => {
        if (!account) return;
        const fetchProfile = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", account?.id ?? "")
                .single();
            if (error) throw error;
            setProfile(data);
        };
        void fetchProfile();
    }, [setProfile, account]);

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        if (!account)
            return toast.error("Update mislukt", {
                description: "We konden je profiel niet vinden.",
            });
        mutate({ user: { id: account.id, ...formData } });
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
        defaultValues: {
            city: "",
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            postcode: "",
            street: "",
        },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (profile)
            form.reset({
                city: profile.city ?? "",
                email: profile.email,
                firstname: profile.firstname ?? "",
                lastname: profile.lastname ?? "",
                phone: profile.phone ?? "",
                postcode: profile.postcode ?? "",
                street: profile.street ?? "",
            });
    }, [profile, form]);

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-2 mx-auto"
                    onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
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
                            <SpinnerBallIcon className="size-4 animate-spin" />
                        )}
                        {!isPending && "Bijwerken"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default UpdateProfileForm;
