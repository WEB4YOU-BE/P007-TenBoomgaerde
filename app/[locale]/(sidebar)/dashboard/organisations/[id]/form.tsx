"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Form, {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Select, {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import getOrganisationById, {
    GetOrganisationByIdResponse,
} from "@/service/organisations/getOrganisationById";
import updateOrganisation from "@/service/organisations/updateOrganisation";
import { Enums } from "@/types/supabase/database";
import { BadgeVariantProps } from "@/utils/tailwindcss/variants/badgeVariants";

const STATUS_TO_BADGE_VARIANT: Record<
    Enums<"organization_acceptance_status">,
    BadgeVariantProps["variant"]
> = { ACCEPTED: "default", DECLINED: "destructive", PENDING: "secondary" };

const STATUS_LABEL_NL: Record<
    Enums<"organization_acceptance_status">,
    string
> = {
    ACCEPTED: "Goedgekeurd",
    DECLINED: "Afgewezen",
    PENDING: "In afwachting",
};

const formSchema = z.object({
    acceptance_status: z.enum(["ACCEPTED", "DECLINED", "PENDING"]),
    name: z.string().min(1, "Naam is verplicht"),
    vat: z.string(),
});

interface OrganisationFormContentProps {
    organisation: GetOrganisationByIdResponse;
    organisationId: string;
}

const OrganisationFormContent = ({
    organisation,
    organisationId,
}: OrganisationFormContentProps) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            acceptance_status: organisation.acceptance_status,
            name: organisation.name,
            vat: organisation.vat,
        },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: updateOrganisation,
        mutationKey: ["updateOrganisation", organisationId],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async () => {
            toast.success("Organisatie succesvol bijgewerkt!");
            await queryClient.invalidateQueries({
                queryKey: ["organisations"],
            });
            await queryClient.invalidateQueries({
                queryKey: ["organisation", organisationId],
            });
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            id: organisationId,
            organisation: {
                acceptance_status: formData.acceptance_status,
                name: formData.name,
                vat: formData.vat,
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Organisatie details</CardTitle>
                        <CardDescription>
                            Bewerk de gegevens van deze organisatie
                        </CardDescription>
                    </div>
                    <Badge
                        variant={
                            STATUS_TO_BADGE_VARIANT[
                                organisation.acceptance_status
                            ]
                        }
                    >
                        {STATUS_LABEL_NL[organisation.acceptance_status]}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                name="vat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>BTW-nummer</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="BE0123456789"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="acceptance_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecteer een status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="PENDING">
                                                In afwachting
                                            </SelectItem>
                                            <SelectItem value="ACCEPTED">
                                                Goedgekeurd
                                            </SelectItem>
                                            <SelectItem value="DECLINED">
                                                Afgewezen
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                {!isPending && "Bijwerken"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

interface EditOrganisationFormProps {
    organisationId: string;
}

const EditOrganisationForm = ({
    organisationId,
}: EditOrganisationFormProps) => {
    const queryFn = useCallback(
        ({ signal }: { signal: AbortSignal }) =>
            getOrganisationById({ id: organisationId, signal }),
        [organisationId]
    );

    const { data: organisation, isLoading } =
        useQuery<GetOrganisationByIdResponse>({
            queryFn,
            queryKey: ["organisation", organisationId],
        });

    if (isLoading || !organisation) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center p-8">
                    <SpinnerBallIcon className="size-8 animate-spin" />
                </CardContent>
            </Card>
        );
    }

    return (
        <OrganisationFormContent
            organisation={organisation}
            organisationId={organisationId}
        />
    );
};

export default EditOrganisationForm;
