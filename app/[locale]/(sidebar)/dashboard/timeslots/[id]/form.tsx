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
import getTimeslotById, {
    GetTimeslotByIdResponse,
} from "@/service/timeslots/getTimeslotById";
import updateTimeslot from "@/service/timeslots/updateTimeslot";

const formSchema = z.object({
    end_time: z.string().min(1, "Eindtijd is verplicht"),
    name: z.string().min(1, "Naam is verplicht"),
    start_time: z.string().min(1, "Starttijd is verplicht"),
});

interface TimeslotFormContentProps {
    timeslot: GetTimeslotByIdResponse;
    timeslotId: string;
}

const TimeslotFormContent = ({
    timeslot,
    timeslotId,
}: TimeslotFormContentProps) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            end_time: timeslot.end_time,
            name: timeslot.name,
            start_time: timeslot.start_time,
        },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateTimeslot,
        mutationKey: ["updateTimeslot", timeslotId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Tijdsblok succesvol bijgewerkt!");
            await queryClient.invalidateQueries({ queryKey: ["timeslots"] });
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            id: timeslotId,
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

                {/* Time Section */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="start_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Starttijd</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="time" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="end_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Eindtijd</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="time" />
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

interface EditTimeslotFormProps {
    timeslotId: string;
}

const EditTimeslotForm = ({ timeslotId }: EditTimeslotFormProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getTimeslotById({ id: timeslotId, signal }),
        [timeslotId]
    );

    const { data: timeslot, isLoading } = useQuery<GetTimeslotByIdResponse>({
        queryFn,
        queryKey: ["timeslots", timeslotId],
    });

    if (isLoading || !timeslot) {
        return (
            <div className="flex items-center justify-center p-8">
                <SpinnerBallIcon className="size-8 animate-spin" />
            </div>
        );
    }

    return <TimeslotFormContent timeslot={timeslot} timeslotId={timeslotId} />;
};

export default EditTimeslotForm;
