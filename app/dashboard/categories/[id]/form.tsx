"use client";

import { Button } from "@/components/atoms/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Tables } from "@/types/supabase/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { getCategoryById, updateCategoryById } from "./actions";

const formSchema = z.object({
    name: z.string(),
});
interface Props {
    id: string;
    initialData?: Tables<"categories">;
}
const UpdateCategoryForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: category, isPending: isPendingCategory } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getCategoryById(id),
        queryKey: ["category", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ category: formData, id: id });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateCategoryById,
        mutationKey: ["UpdateCategory"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De categorië is bijgewerkt!");
            queryClient.invalidateQueries({ queryKey: ["category", id] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
        },
        disabled: isPendingCategory || isPendingUpdate,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (category)
            form.reset({
                name: category.name,
            });
    }, [category, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <Button
                            disabled={isPendingCategory || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingCategory ||
                                (isPendingUpdate && (
                                    <LoaderPinwheel className="h-4 w-4 animate-spin" />
                                ))}
                            {!isPendingCategory &&
                                !isPendingUpdate &&
                                "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateCategoryForm;

// Ik was fucking moe, doe morgen wel verder.
