import {getServerSession, NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {db} from "@/librairy/db";
import {PrismaAdapter} from "@next-auth/prisma-adapter";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        Credentials({
            type: "credentials",
            name: "credentials",
            credentials: {},
            authorize(credentials, req) {
                const {username, password} = credentials as { username: String, password: String };
                if (username !== "Jens" || password !== "1234")
                    throw new Error("Gebruikersnaam of wachtwoord is incorrect");
                return {id: "1", name: "Jens", email: "geen-idee@gmail.com"};
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
};

export const getAuthSession = () => getServerSession(authOptions);