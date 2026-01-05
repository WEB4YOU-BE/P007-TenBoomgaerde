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
import Select, {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import Switch from "@/components/atoms/Switch";
import getCategories, {
    GetCategoriesResponse,
} from "@/service/categories/getCategories";
import getProductById from "@/service/products/getProductById";
import updateProduct from "@/service/products/updateProduct";

const formSchema = z.object({
    category: z.string().nullable(),
    for_sale: z.boolean(),
    name: z.string().min(1, "Naam is verplicht"),
    price: z.string(),
});

type ProductData = Awaited<ReturnType<typeof getProductById>>;

interface ProductFormContentProps {
    categories: NonNullable<GetCategoriesResponse>;
    product: ProductData;
    productId: string;
}

const ProductFormContent = ({
    categories,
    product,
    productId,
}: ProductFormContentProps) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            category: product.category?.id ?? null,
            for_sale: product.for_sale ?? false,
            name: product.name,
            price: product.price?.toString() ?? "",
        },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateProduct,
        mutationKey: ["updateProduct", productId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Product succesvol bijgewerkt!");
            await queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            id: productId,
            product: {
                category: formData.category,
                for_sale: formData.for_sale,
                name: formData.name,
                price: formData.price === "" ? null : Number(formData.price),
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

                {/* Category Select */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categorie</FormLabel>
                            <Select
                                value={field.value ?? ""}
                                onValueChange={(value) => {
                                    field.onChange(value === "" ? null : value);
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecteer een categorie" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
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

                {/* For Sale Toggle */}
                <FormField
                    control={form.control}
                    name="for_sale"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Te koop</FormLabel>
                                <FormDescription>
                                    Wanneer ingeschakeld, is dit product
                                    beschikbaar voor verkoop.
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
                                    min={0}
                                    step={0.01}
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
                        {!isPending && "Bijwerken"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

interface EditProductFormProps {
    productId: string;
}

const EditProductForm = ({ productId }: EditProductFormProps) => {
    const productQueryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getProductById({ id: productId, signal }),
        [productId]
    );

    const { data: product, isLoading: isLoadingProduct } = useQuery({
        queryFn: productQueryFn,
        queryKey: ["products", productId],
    });

    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryFn: getCategories,
        queryKey: ["categories"],
    });

    if (isLoadingProduct || isLoadingCategories || !product || !categories) {
        return (
            <div className="flex items-center justify-center p-8">
                <SpinnerBallIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return (
        <ProductFormContent
            categories={categories}
            product={product}
            productId={productId}
        />
    );
};

export default EditProductForm;
