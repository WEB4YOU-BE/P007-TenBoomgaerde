"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import type { Tables } from "@/types/supabase/database";

import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";

import { fetchCategories } from "../../categories/actions";
import { getProductById, updateProductById } from "./actions";

const formSchema = z.object({
    categorie_id: z.string(),
    for_sale: z.boolean(),
    name: z.string(),
    price: z.number(),
});
interface Props {
    id: string;
    initialData?: Tables<"products">;
}
const UpdateProductForm = ({ id, initialData }: Props) => {
    const queryClient = useQueryClient();

    const { data: product, isPending: isPendingProduct } = useQuery({
        initialData,
        networkMode: "online",
        queryFn: () => getProductById(id),
        queryKey: ["product", id],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const { data: categories } = useQuery({
        networkMode: "online",
        queryFn: () => fetchCategories(),
        queryKey: ["categories"],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ id: id, product: formData });
    };
    const {
        isError,
        isPending: isPendingUpdate,
        mutate,
    } = useMutation({
        mutationFn: updateProductById,
        mutationKey: ["UpdateProduct"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("Het product is bijgewerkt!");
            queryClient.invalidateQueries({ queryKey: ["product", id] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            categorie_id: product?.categorie_id ?? "",
            for_sale: product?.for_sale ?? false,
            name: product?.name ?? "",
            price: product?.price ?? 0,
        },
        disabled: isPendingProduct || isPendingUpdate,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (product)
            form.reset({
                categorie_id: product.categorie_id ?? "",
                for_sale: product.for_sale ?? false,
                name: product.name,
                price: product.price ?? 0,
            });
    }, [product, form]);

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
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prijs</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber
                                                )
                                            }
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categorie_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categorie</FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Kies een categorie" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Wijzig de categorieën in de{" "}
                                        <Link href="/dashboard/categories/">
                                            Categorie-instellingen
                                        </Link>
                                        .
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="for_sale"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            disabled={field.disabled}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Te koop</FormLabel>
                                        <FormDescription>
                                            Dit item is enkel te koop, in plaats
                                            van te huur.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPendingProduct || isPendingUpdate}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPendingProduct ||
                                (isPendingUpdate && (
                                    <SpinnerBall className="size-4 animate-spin" />
                                ))}
                            {!isPendingProduct &&
                                !isPendingUpdate &&
                                "Bijwerken"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default UpdateProductForm;
