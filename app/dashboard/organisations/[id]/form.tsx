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
import Form, {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";

import { getOrganisationById, updateOrganisationById } from "./actions";

const formSchema = z.object({
    btw_number: z.string(),
    name: z.string(),
});
interface Props {
    id: string;
    initialData?: Tables<"organizations">;
}
const UpdateOrganisationForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: organisation, isPending: isPendingOrganisation } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getOrganisationById(id),
        queryKey: ["Organisation", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ id: id, organisation: formData });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateOrganisationById,
        mutationKey: ["UpdateOrganisation"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De organisatie is bijgewerkt!");
            void queryClient.invalidateQueries({
                queryKey: ["Organisation", id],
            });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            btw_number: "",
            name: "",
        },
        disabled: isPendingOrganisation || isPendingUpdate,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (organisation)
            form.reset({
                btw_number: organisation.btw_number || "",
                name: organisation.name || "",
            });
    }, [organisation, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
                    <div className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Naam</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="btw_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>BTW-nummer</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPendingOrganisation || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingOrganisation ||
                                (isPendingUpdate && (
                                    <SpinnerBallIcon className="size-4 animate-spin" />
                                ))}
                            {!isPendingOrganisation &&
                                !isPendingUpdate &&
                                "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateOrganisationForm;
