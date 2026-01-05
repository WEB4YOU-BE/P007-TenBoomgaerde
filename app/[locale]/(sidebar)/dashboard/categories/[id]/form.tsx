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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import getCategoryById, {
    GetCategoryByIdResponse,
} from "@/service/categories/getCategoryById";
import updateCategory from "@/service/categories/updateCategory";

const formSchema = z.object({ name: z.string().min(1, "Naam is verplicht") });

interface CategoryFormContentProps {
    category: GetCategoryByIdResponse;
    categoryId: string;
}

const CategoryFormContent = ({
    category,
    categoryId,
}: CategoryFormContentProps) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { name: category.name },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateCategory,
        mutationKey: ["updateCategory", categoryId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Categorie succesvol bijgewerkt!");
            await queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ category: { name: formData.name }, id: categoryId });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Category Name */}
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

interface EditCategoryFormProps {
    categoryId: string;
}

const EditCategoryForm = ({ categoryId }: EditCategoryFormProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getCategoryById({ id: categoryId, signal }),
        [categoryId]
    );

    const { data: category, isLoading } = useQuery<GetCategoryByIdResponse>({
        queryFn,
        queryKey: ["categories", categoryId],
    });

    if (isLoading || !category) {
        return (
            <div className="flex items-center justify-center p-8">
                <SpinnerBallIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return <CategoryFormContent category={category} categoryId={categoryId} />;
};

export default EditCategoryForm;
