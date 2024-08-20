import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const sesion = await auth();
    if (!sesion?.user) {
        throw new Error("Unauthenticated");
    }

    const response = await fetch(process.env.GET_USER_TASKS_API,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sesion.user.accessToken,
            },
        }
    );
    return Response.json(await response.json());
}