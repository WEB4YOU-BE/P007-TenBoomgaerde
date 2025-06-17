"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
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
import { Input } from "@/components/atoms/input";

import { createOrganisation } from "./actions";

const formSchema = z.object({
    btw_number: z.string(),
    name: z.string(),
});
const CreateOrganisationForm = () => {
    const queryClient = useQueryClient();

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ organisation: formData });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createOrganisation,
        mutationKey: ["CreateOrganisation"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De organisatie is aangemaakt!");
            queryClient.invalidateQueries({ queryKey: ["organisations"] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            btw_number: "",
            name: "",
        },
        disabled: isPending,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isSuccess) return redirect("/dashboard/organisations");
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

export default CreateOrganisationForm;
