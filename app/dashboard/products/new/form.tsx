"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { createProduct } from "./actions";

const formSchema = z.object({
    categorie_id: z.string().uuid(),
    for_sale: z.boolean(),
    name: z.string(),
    price: z.number(),
});
const CreateCategoryForm = () => {
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({
        networkMode: "online",
        queryFn: () => fetchCategories(),
        queryKey: ["categories"],
        retry: true,
        staleTime: 1000 * 60, // 1 minute
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ product: formData });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createProduct,
        mutationKey: ["CreateProduct"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("Het product is aangemaakt!");
            void queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            categorie_id: "",
            for_sale: false,
            name: "",
            price: 0,
        },
        disabled: isPending,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isSuccess) return redirect("/dashboard/products");
    }, [isSuccess]);

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
                            disabled={isPending}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPending && (
                                <SpinnerBallIcon className="size-4 animate-spin" />
                            )}
                            {!isPending && "Toevoegen"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default CreateCategoryForm;
