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
import { useRouter } from "@/i18n/navigation";
import addMemberToOrganisation from "@/service/organisations/addMemberToOrganisation";

const formSchema = z.object({ email: z.email("Ongeldig e-mailadres") });

interface AddMemberFormProps {
    organisationId: string;
}

const AddMemberForm = ({ organisationId }: AddMemberFormProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { email: "" },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: addMemberToOrganisation,
        mutationKey: ["addMemberToOrganisation", organisationId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Lid succesvol toegevoegd aan de organisatie!");
            await queryClient.invalidateQueries({
                queryKey: ["organisation-members", organisationId],
            });
            router.push(`/organisations/${organisationId}/members`);
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({ email: formData.email, organisationId });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mailadres</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="naam@voorbeeld.be"
                                    type="email"
                                />
                            </FormControl>
                            <FormDescription>
                                Voer het e-mailadres in van de gebruiker die je
                                wilt toevoegen. De gebruiker moet al een account
                                hebben.
                            </FormDescription>
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
                        {!isPending && "Toevoegen"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AddMemberForm;
