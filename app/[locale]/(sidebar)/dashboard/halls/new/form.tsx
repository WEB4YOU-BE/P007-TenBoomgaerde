"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import Switch from "@/components/atoms/Switch";
import { useRouter } from "@/i18n/navigation";
import createHall from "@/service/halls/createHall";

const formSchema = z.object({
    is_private: z.boolean(),
    name: z.string().min(1, "Naam is verplicht"),
    price_per_day: z.string(),
    price_per_day_discount: z.string(),
});

const CreateHallForm = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            is_private: false,
            name: "",
            price_per_day: "",
            price_per_day_discount: "",
        },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createHall,
        mutationKey: ["createHall"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async (data) => {
            toast.success("Zaal succesvol aangemaakt!");
            await queryClient.invalidateQueries({ queryKey: ["halls"] });
            router.push(`/dashboard/halls/${data.id}`);
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            hall: {
                is_private: formData.is_private,
                name: formData.name,
                price_per_day: formData.price_per_day
                    ? parseFloat(formData.price_per_day)
                    : null,
                price_per_day_discount: formData.price_per_day_discount
                    ? parseFloat(formData.price_per_day_discount)
                    : null,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Hall Name */}
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

                {/* Is Private */}
                <FormField
                    control={form.control}
                    name="is_private"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Privé
                                </FormLabel>
                                <FormDescription>
                                    Indien ingeschakeld is deze zaal enkel
                                    zichtbaar voor beheerders
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

                {/* Price per Day */}
                <FormField
                    control={form.control}
                    name="price_per_day"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prijs per tijdsblok</FormLabel>
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

                {/* Price per Day Discount */}
                <FormField
                    control={form.control}
                    name="price_per_day_discount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Korting per tijdsblok</FormLabel>
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

export default CreateHallForm;
