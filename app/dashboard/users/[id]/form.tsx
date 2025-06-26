"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { Tables } from "@/types/supabase/database";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/atoms/Form";
import Form from "@/components/atoms/Form/Form";
import { Input } from "@/components/atoms/input";

import { getUserById, updateUserById } from "./actions";

const formSchema = z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    firstName: z.string().min(1, "Voornaam is verplicht"),
    isAdmin: z.boolean(),
    lastName: z.string().min(1, "Achternaam is verplicht"),
    phone: z.string().optional(),
    postalCode: z.string().optional(),
});
interface Props {
    id: string;
    initialData?: Tables<"users">;
}
const UpdateUserForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: user, isPending: isPendingUser } = useQuery({
        initialData,
        queryFn: () => getUserById(id),
        queryKey: ["user", id],
        retry: true,
        staleTime: 1000 * 60 * 1, // 1 minutes
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        if (!user) return toast.error("Gebruiker niet gevonden");
        mutate({
            id,
            user: {
                address_city: formData.city,
                address_postal_code: formData.postalCode,
                address_street: formData.address,
                email: user.email,
                firstname: formData.firstName,
                is_admin: formData.isAdmin,
                lastname: formData.lastName,
                phone: formData.phone,
                type: user.type,
            },
        });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateUserById,
        mutationKey: ["UpdateUser"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De gebruiker is bijgewerkt!");
            void queryClient.invalidateQueries({
                queryKey: ["user", id],
            });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            address: user?.address_street || "",
            city: user?.address_city || "",
            firstName: user?.firstname || "",
            isAdmin: !!user?.is_admin,
            lastName: user?.lastname || "",
            phone: user?.phone || "",
            postalCode: user?.address_postal_code || "",
        },
        disabled: isPendingUser || isPendingUpdate,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (user) form.reset({});
    }, [user, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2 w-full">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel>Voornaam</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel>Achternaam</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GSM</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adres</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row gap-2 w-full">
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({ field }) => (
                                    <FormItem className="grow">
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
                                    <FormItem className="grow">
                                        <FormLabel>Stad</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="isAdmin"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={!!field.value}
                                            disabled={field.disabled}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Is administrator</FormLabel>
                                        <FormDescription>
                                            Vink deze optie aan als de gebruiker
                                            een administrator is.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPendingUser || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingUser ||
                                (isPendingUpdate && (
                                    <SpinnerBallIcon className="size-4 animate-spin" />
                                ))}
                            {!isPendingUser && !isPendingUpdate && "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateUserForm;
