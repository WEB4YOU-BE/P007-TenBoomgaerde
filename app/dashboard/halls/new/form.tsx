"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBall } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/checkbox";
import Form, {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import { Input } from "@/components/atoms/input";

import { createHall } from "./actions";

const formSchema = z.object({
    day_price: z.number(),
    day_price2: z.number(),
    name: z.string(),
    private: z.boolean(),
});
const CreateHallForm = () => {
    const queryClient = useQueryClient();

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ hall: formData });
    };
    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createHall,
        mutationKey: ["CreateHall"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("De zaal is aangemaakt!");
            queryClient.invalidateQueries({ queryKey: ["halls"] });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            day_price: 0,
            day_price2: 0,
            name: "",
            private: false,
        },
        disabled: isPending,
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isSuccess) return redirect("/dashboard/halls");
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
                            name="day_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prijs per blok</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
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
                            name="day_price2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prijs per 2 blokken</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
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
                            name="private"
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
                                        <FormLabel>Privaat</FormLabel>
                                        <FormDescription>
                                            De zaal is privaat en dus enkel
                                            toegankelijk voor leden van Ten
                                            Boomgaerde.
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

export default CreateHallForm;
