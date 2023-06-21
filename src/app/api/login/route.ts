import prisma from "@/librairy/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string;
    password: string;
}

export async function Post(request: Request) {
    const body: RequestBody = await request.json();

    const user = await prisma.user.findFirst({where: {email: body.username}});

    if (!user) return new Response(JSON.stringify(null));
    if (!await bcrypt.compare(body.password, user.password)) return new Response(JSON.stringify(null));

    const {password, ...userWithoutPassword} = user;
    return new Response(JSON.stringify(userWithoutPassword));

}