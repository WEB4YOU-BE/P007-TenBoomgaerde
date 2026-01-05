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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import { useRouter } from "@/i18n/navigation";
import createTimeslot from "@/service/timeslots/createTimeslot";

const formSchema = z.object({
    end_time: z.string().min(1, "Eindtijd is verplicht"),
    name: z.string().min(1, "Naam is verplicht"),
    start_time: z.string().min(1, "Starttijd is verplicht"),
});

const CreateTimeslotForm = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { end_time: "", name: "", start_time: "" },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createTimeslot,
        mutationKey: ["createTimeslot"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async (data) => {
            toast.success("Tijdsblok succesvol aangemaakt!");
            await queryClient.invalidateQueries({ queryKey: ["timeslots"] });
            router.push(`/dashboard/timeslots/${data.id}`);
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            timeslot: {
                end_time: formData.end_time,
                name: formData.name,
                start_time: formData.start_time,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Timeslot Name */}
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

                {/* Start Time */}
                <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Starttijd</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="HH:MM"
                                    type="time"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* End Time */}
                <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Eindtijd</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="HH:MM"
                                    type="time"
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

export default CreateTimeslotForm;
