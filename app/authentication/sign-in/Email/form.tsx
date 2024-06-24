"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { signInWithEmailCredentials } from "./actions";
import { toast } from "sonner";

import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";

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
import { ArrowLeft, Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8, {
    message: "Wachtwoorden zijn minstens 8 karakters lang.",
  }),
});

const SignInWithEmailCredentialsForm = () => {
  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    mutate({ ...formData, email: formData.username });
  };
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["SignInWithEmailCredentials"],
    mutationFn: signInWithEmailCredentials,
    networkMode: "online",
    retry: false,
    onError: (error) => {
      toast.error(error.name, {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success("Je bent ingelogd!", {
        description: `${data.user?.email} is aangemeld.`,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) return redirect("/", RedirectType.replace);
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
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
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
                <FormLabel>Wachtwoord</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {!isPending && "Log in"}
          </Button>
        </form>
      </Form>
      <Link
        href="/authentication/sign-in/"
        className={buttonVariants({ variant: "outline" })}
      >
        <ArrowLeft className="mr-4 h-4 w-4" />
        Ga terug
      </Link>
    </>
  );
};

export default SignInWithEmailCredentialsForm;
