import NextAuth from "next-auth";
import {authOptions} from "@/librairy/authenticationOptions";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};