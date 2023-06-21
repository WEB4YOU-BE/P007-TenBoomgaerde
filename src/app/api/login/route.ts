import prisma from "@/librairy/prisma";
import {compare} from "bcrypt";

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const user = await prisma.user.findFirst({where: {email: body.username}});

    if (!user) return new Response(JSON.stringify(null));
    if (!await compare(body.password, user.password)) return new Response(JSON.stringify(null));

    const {password, ...userWithoutPassword} = user;
    return new Response(JSON.stringify(userWithoutPassword));
}