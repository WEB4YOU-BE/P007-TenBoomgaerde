import {getServerSession, NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authenticationOptions: NextAuthOptions = {
    session: {strategy: "jwt"},
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Gebruikersnaam", type: "text", placeholder: "Jouw gebruikersnaam"},
                password: {label: "Wachtwoord", type: "password"},
            },
            async authorize(credentials, req) {
                const result = await fetch((process.env.VERCEL ? process.env.VERCEL_URL : "http://localhost:3000") + "/api/login", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });
                const user = await result.json();

                if (!user) return null;
                else return user;
            },
        }),
    ],
};

export const getAuthSession = () => getServerSession(authenticationOptions);