"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { signUpWithEmailCredentials } from "./actions";
import { toast } from "sonner";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formSchema = z
  .object({
    email: z.string(),
    password: z.string().min(8, {
      message: "Wachtwoorden zijn minstens 8 karakters lang.",
    }),
    passwordConfirmation: z.string().min(8, {
      message: "Wachtwoorden zijn minstens 8 karakters lang.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Wachtwoorden komen niet overeen!",
    path: ["passwordConfirmation"],
  });

const SignUpWithEmailCredentialsForm = () => {
  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    mutate(formData);
  };
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["SignUpWithEmailCredentials"],
    mutationFn: signUpWithEmailCredentials,
    networkMode: "online",
    retry: false,
    onError: (error) => {
      toast.error(error.name, {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success("Jouw account is aangemaakt!", {
        description: `${data.user?.email || "Je"} kreeg een email. Klik de link om jouw emailadres te verifiëren.`,
        duration: 300
      });
    },
  });

  useEffect(() => {
    if (isSuccess) redirect("/authentication/sign-in/");
  }, [isSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nieuw wachtwoord</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="passwordConfirmation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Herhaal wachtwoord</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Maak account
          </Button>
        </form>
      </Form>
      <Link
        href="/authentication/sign-up/"
        className={buttonVariants({ variant: "outline" })}
      >
        <ArrowLeft className="mr-4 h-4 w-4" />
        Ga terug
      </Link>
    </>
  );
};

export default SignUpWithEmailCredentialsForm;
