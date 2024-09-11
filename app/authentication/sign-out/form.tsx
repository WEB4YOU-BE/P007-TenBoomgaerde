"use client";

import { Button } from "@/components/atoms/button";
import { Form } from "@/components/atoms/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { signOut } from "./action";

const formSchema = z.object({});
const SignOutForm = () => {
    const router = useRouter();

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
            toast.success("Je bent uitgelogd!", {
                description: "Jammer dat je weg bent. Tot de volgende keer!",
            });
        },
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) router.replace("/authentication/sign-in/");
    }, [isSuccess]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    return (
        <>
            <Form {...form}>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <Button disabled={isPending} type="submit">
                        {isPending ? <LoaderPinwheel /> : "Log uit"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SignOutForm;
