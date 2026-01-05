"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
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
import getUser from "@/service/authentication/getUser";
import requestOrganisation from "@/service/organisations/requestOrganisation";

const formSchema = z.object({
    name: z
        .string()
        .min(1, "Naam is verplicht")
        .min(2, "Naam moet minimaal 2 karakters bevatten"),
});

const RequestOrganisationForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryFn: getUser,
        queryKey: ["authenticatedUser"],
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { name: "" },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: requestOrganisation,
        mutationKey: ["requestOrganisation"],
        networkMode: "online",
        onError: (error) => {
            // Check for unique constraint violation
            if (
                error.message.includes("duplicate") ||
                error.message.includes("unique")
            ) {
                toast.error("Organisatienaam bestaat al", {
                    description: "Kies een andere naam voor uw organisatie.",
                });
            } else {
                toast.error(error.name, { description: error.message });
            }
        },
        onSuccess: async (organisation) => {
            toast.success("Organisatie succesvol aangevraagd!", {
                description:
                    "Uw aanvraag wordt zo snel mogelijk beoordeeld door een beheerder.",
            });
            await queryClient.invalidateQueries({
                queryKey: ["myOrganisations"],
            });
            router.push(`/organisations/${organisation.id}/reservations/`);
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        if (!user?.id) {
            toast.error("Niet ingelogd", {
                description:
                    "U moet ingelogd zijn om een organisatie aan te vragen.",
            });
            return;
        }
        mutate({ name: formData.name, userId: user.id });
    };

    if (isLoadingUser) {
        return (
            <div className="flex items-center justify-center p-8">
                <SpinnerBallIcon className="size-8 animate-spin" />
            </div>
        );
    }

    if (!user?.id) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Niet ingelogd</CardTitle>
                    <CardDescription>
                        U moet ingelogd zijn om een organisatie aan te vragen.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Organisatie aanvragen</CardTitle>
                <CardDescription>
                    Vraag een nieuwe organisatie aan. Na goedkeuring door een
                    beheerder kunt u reserveringen maken namens deze
                    organisatie.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Naam van de organisatie
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Bijv. Sportclub De Boomgaard"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        De naam moet uniek zijn en nog niet
                                        bestaan in ons systeem.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                {!isPending && "Aanvragen"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default RequestOrganisationForm;
