"use client";

import Button from "@/components/atoms/Button";
import Form, {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createCategory } from "./actions";

const formSchema = z.object({
    name: z.string(),
});
const CreateCategoryForm = () => {
    const queryClient = useQueryClient();

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ category: formData });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createCategory,
        mutationKey: ["CreateCategory"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De categorie is aangemaakt!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
        },
        disabled: isPending,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isSuccess) return redirect("/dashboard/categories");
    }, [isSuccess]);

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
                            disabled={isPending}
                            type="submit"
                            variant={isError ? "destructive" : "default"}
                        >
                            {isPending && (
                                <SpinnerBall className="size-4 animate-spin" />
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
