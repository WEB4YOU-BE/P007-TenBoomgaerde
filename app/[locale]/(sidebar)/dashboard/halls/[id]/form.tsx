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
import Switch from "@/components/atoms/Switch";
import getHallById, { GetHallByIdResponse } from "@/service/halls/getHallById";
import updateHall from "@/service/halls/updateHall";

const formSchema = z.object({
    is_private: z.boolean(),
    name: z.string().min(1, "Naam is verplicht"),
    price_per_day: z.string(),
    price_per_day_discount: z.string(),
});

interface HallFormContentProps {
    hall: GetHallByIdResponse;
    hallId: string;
}

const HallFormContent = ({ hall, hallId }: HallFormContentProps) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            is_private: hall.is_private,
            name: hall.name,
            price_per_day: hall.price_per_day?.toString() ?? "",
            price_per_day_discount:
                hall.price_per_day_discount?.toString() ?? "",
        },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateHall,
        mutationKey: ["updateHall", hallId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Zaal succesvol bijgewerkt!");
            await queryClient.invalidateQueries({ queryKey: ["halls"] });
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            hall: {
                is_private: formData.is_private,
                name: formData.name,
                price_per_day:
                    formData.price_per_day === ""
                        ? null
                        : Number(formData.price_per_day),
                price_per_day_discount:
                    formData.price_per_day_discount === ""
                        ? null
                        : Number(formData.price_per_day_discount),
            },
            id: hallId,
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

                {/* Private Toggle */}
                <FormField
                    control={form.control}
                    name="is_private"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Privé</FormLabel>
                                <FormDescription>
                                    Wanneer privé, is deze zaal alleen
                                    beschikbaar voor specifieke organisaties.
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

                {/* Pricing Section */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="price_per_day"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prijs per tijdsblok</FormLabel>
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
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="price_per_day_discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Korting per tijdsblok</FormLabel>
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
                    </div>
                </div>

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

interface EditHallFormProps {
    hallId: string;
}

const EditHallForm = ({ hallId }: EditHallFormProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getHallById({ id: hallId, signal }),
        [hallId]
    );

    const { data: hall, isLoading } = useQuery<GetHallByIdResponse>({
        queryFn,
        queryKey: ["halls", hallId],
    });

    if (isLoading || !hall) {
        return (
            <div className="flex items-center justify-center p-8">
                <SpinnerBallIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return <HallFormContent hall={hall} hallId={hallId} />;
};

export default EditHallForm;
