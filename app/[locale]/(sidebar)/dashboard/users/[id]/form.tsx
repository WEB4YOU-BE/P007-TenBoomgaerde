"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Switch from "@/components/atoms/Switch";
import getUserById, { GetUserByIdResponse } from "@/service/users/getUserById";
import updateUser from "@/service/users/updateUser";

const formSchema = z.object({
    address_city: z.string(),
    address_number: z.string(),
    address_postal_code: z.string(),
    address_street: z.string(),
    firstname: z.string(),
    is_admin: z.boolean(),
    lastname: z.string(),
    phone: z.string(),
});

interface UserFormContentProps {
    user: GetUserByIdResponse;
    userId: string;
}

const UserFormContent = ({ user, userId }: UserFormContentProps) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            address_city: user.address_city ?? "",
            address_number: user.address_number ?? "",
            address_postal_code: user.address_postal_code ?? "",
            address_street: user.address_street ?? "",
            firstname: user.firstname ?? "",
            is_admin: user.is_admin,
            lastname: user.lastname ?? "",
            phone: user.phone ?? "",
        },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateUser,
        mutationKey: ["updateUser", userId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Gebruiker succesvol bijgewerkt!");
            await queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            id: userId,
            user: {
                address_city: formData.address_city || null,
                address_number: formData.address_number || null,
                address_postal_code: formData.address_postal_code || null,
                address_street: formData.address_street || null,
                firstname: formData.firstname || null,
                is_admin: formData.is_admin,
                lastname: formData.lastname || null,
                phone: formData.phone || null,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Email (readonly) */}
                <div className="flex flex-col gap-2">
                    <FormLabel>E-mail</FormLabel>
                    <Input readOnly value={user.email} />
                    <p className="text-sm text-muted-foreground">
                        E-mailadres kan niet worden gewijzigd via dit formulier.
                    </p>
                </div>

                {/* Name Fields */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Voornaam</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Achternaam</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefoon</FormLabel>
                            <FormControl>
                                <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Address Fields */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="address_street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Straat</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full md:w-32">
                        <FormField
                            control={form.control}
                            name="address_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nummer</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full md:w-32">
                        <FormField
                            control={form.control}
                            name="address_postal_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postcode</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="address_city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gemeente</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Admin Toggle */}
                <FormField
                    control={form.control}
                    name="is_admin"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Administrator</FormLabel>
                                <FormDescription>
                                    Geef deze gebruiker beheerdersrechten.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

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
    );
};

interface EditUserFormProps {
    userId: string;
}

const EditUserForm = ({ userId }: EditUserFormProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getUserById({ signal, userId }),
        [userId]
    );

    const { data: user, isLoading } = useQuery<GetUserByIdResponse>({
        queryFn,
        queryKey: ["users", userId],
    });

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center p-8">
                <SpinnerBallIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return <UserFormContent user={user} userId={userId} />;
};

export default EditUserForm;
