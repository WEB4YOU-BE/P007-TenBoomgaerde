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
import Select, {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import { useRouter } from "@/i18n/navigation";
import createOrganisation from "@/service/organisations/createOrganisation";

const formSchema = z.object({
    acceptance_status: z.enum(["PENDING", "ACCEPTED", "DECLINED"]),
    name: z.string().min(1, "Naam is verplicht"),
    vat: z.string().min(1, "BTW-nummer is verplicht"),
});

const CreateOrganisationForm = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: { acceptance_status: "ACCEPTED", name: "", vat: "" },
        resolver: zodResolver(formSchema),
    });

    const { isError, isPending, isSuccess, mutate } = useMutation({
        mutationFn: createOrganisation,
        mutationKey: ["createOrganisation"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, { description: error.message });
        },
        onSuccess: async (data) => {
            toast.success("Organisatie succesvol aangemaakt!");
            await queryClient.invalidateQueries({
                queryKey: ["organisations"],
            });
            router.push(`/dashboard/organisations/${data.id}`);
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        mutate({
            organisation: {
                acceptance_status: formData.acceptance_status,
                name: formData.name,
                vat: formData.vat,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4 mx-auto"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                {/* Organisation Name */}
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

                {/* VAT Number */}
                <FormField
                    control={form.control}
                    name="vat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>BTW-nummer</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="BE0123456789" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Acceptance Status */}
                <FormField
                    control={form.control}
                    name="acceptance_status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
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

export default CreateOrganisationForm;
