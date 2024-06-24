"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordForEmail } from "./actions";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
});

const ResetWithEmailCredentialsForm = () => {
  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    mutate(formData.email);
  };
  const { mutate, isPending } = useMutation({
    mutationKey: ["ResetPasswordForEmail"],
    mutationFn: resetPasswordForEmail,
    networkMode: "online",
    retry: false,
    onError: (error) => {
      toast.error(error.name, {
        description: error.message,
      });
    },
    onSuccess: (_, variables) => {
      form.reset({ email: "" });
      toast.success("Ga verder in jouw mailbox!", {
        description: `Je hebt een mail gehad op ${variables}`,
        important: true,
        duration: Infinity,
      });
    },
  });

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
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Herstel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetWithEmailCredentialsForm;
