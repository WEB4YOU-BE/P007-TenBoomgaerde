import { z } from "zod";

export const formSchema = z.object({
    password: z
        .string()
        .min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang.",
        }),
    passwordConfirmation: z
        .string()
        .min(8, {
            message: "Wachtwoorden zijn minstens 8 karakters lang.",
        }),
})
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Wachtwoorden komen niet overeen!",
        path: ["passwordConfirmation"],
    });
