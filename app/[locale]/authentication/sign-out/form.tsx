"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerBallIcon } from "@phosphor-icons/react/ssr";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import signOut from "@/service/authentication/signOut";
import { getQueryClient } from "@/utils/query/queryClient";

const formSchema = z.object({});
const SignOutForm = () => {
    const router = useRouter();
    const queryClient = getQueryClient();

    const onSubmit = () => {
        mutate();
    };
    const { isPending, isSuccess, mutate } = useMutation({
        mutationFn: signOut,
        mutationKey: ["SignOut"],
        networkMode: "online",
        onError: (error) => {
            toast.error(error.name, {
                description: error.message,
            });
        },
        onSuccess: () => {
            toast.success("U bent succesvol uitgelogd");
            void queryClient.invalidateQueries({
                queryKey: ["authenticatedUser"],
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) router.replace("/authentication/");
    }, [isSuccess, router]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-2"
                onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
            >
                <Button disabled={isPending} type="submit">
                    {isPending && (
                        <SpinnerBallIcon className="size-4 animate-spin" />
                    )}
                    {!isPending && "Meld af"}
                </Button>
            </form>
        </Form>
    );
};

export default SignOutForm;
