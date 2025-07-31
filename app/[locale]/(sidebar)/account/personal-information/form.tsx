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
import { Separator } from "@/components/atoms/separator";
import updateProfile from "@/service/authentication/updateProfile";
import { Tables } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

const formSchema = z.object({
    address_city: z.string(),
    address_number: z.string(),
    address_postal_code: z.string(),
    address_street: z.string(),
    email: z.email("Ongeldig e-mailadres"),
    firstname: z.string().min(1, "Voornaam is verplicht"),
    lastname: z.string().min(1, "Achternaam is verplicht"),
    phone: z
        .string()
        .refine(isMobilePhone, { message: "Ongeldig telefoonnummer" }),
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
        mutate({
            id: account.id,
            user: formData,
        });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateProfile,
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
            address_city: "",
            address_number: "",
            address_postal_code: "",
            address_street: "",
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
        },
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (profile)
            form.reset({
                address_city: profile.address_city ?? "",
                address_number: profile.address_number ?? "",
                address_postal_code: profile.address_postal_code ?? "",
                address_street: profile.address_street ?? "",
                email: profile.email,
                firstname: profile.firstname ?? "",
                lastname: profile.lastname ?? "",
                phone: profile.phone ?? "",
            });
    }, [profile, form]);

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-4 mx-auto"
                    onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
                >
                    {/* Personal Info Section */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex flex-col gap-2">
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
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
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
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex flex-col gap-2">
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
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
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
                        </div>
                    </div>

                    {/* Separator between personal info and address */}
                    <Separator />

                    {/* Address Section */}
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="address_street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Straat</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="address_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Huisnummer</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="address_postal_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postcode</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="address_city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stad</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-2">
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
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateProfileForm;
