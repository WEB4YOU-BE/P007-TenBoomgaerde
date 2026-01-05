"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
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
import Select, {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import Switch from "@/components/atoms/Switch";
import { useRouter } from "@/i18n/navigation";
import getCategories from "@/service/categories/getCategories";
import createProduct from "@/service/products/createProduct";

const formSchema = z.object({
    category: z.string().nullable(),
    for_sale: z.boolean(),
    name: z.string().min(1, "Naam is verplicht"),
    price: z.string(),
});

const CreateProductForm = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: categories = [] } = useQuery({
        queryFn: getCategories,
        queryKey: ["categories"],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { category: null, for_sale: true, name: "", price: "" },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createProduct,
        mutationKey: ["createProduct"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async (data) => {
            toast.success("Product succesvol aangemaakt!");
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            router.push(`/dashboard/products/${data.id}`);
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            product: {
                category: formData.category,
                for_sale: formData.for_sale,
                name: formData.name,
                price: formData.price ? parseFloat(formData.price) : null,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Product Name */}
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

                {/* Category */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categorie</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value ?? undefined}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecteer een categorie" />
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* For Sale */}
                <FormField
                    control={form.control}
                    name="for_sale"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Te koop
                                </FormLabel>
                                <FormDescription>
                                    Indien ingeschakeld is dit product
                                    beschikbaar voor verkoop
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

                {/* Price */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prijs</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    type="number"
                                />
                            </FormControl>
                            <FormMessage />
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
                        {!isPending && "Aanmaken"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateProductForm;
