import NextAuth from "next-auth";
import {authenticationOptions} from "@/librairy/authentication";

const handler = NextAuth(authenticationOptions);

export {handler as GET, handler as POST};