import type {Session, User} from "next-auth";
import type {JWT} from "next-auth/jwt";

type userId = String

declare module "next-auth/jwt" {
    interface JWT {
        id: userId,
        username: string | null
    }
}

declare module "next-auth" {
    interface Session {
        id: userId,
        username: string | null
    }
}