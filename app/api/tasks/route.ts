import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const sesion = await auth();
    if (!sesion?.user) {
        throw new Error("Unauthenticated");
    }

    try {
        const response = await fetch(process.env.GET_USER_TASKS_API,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sesion.user.accessToken,
                },
            }
        );
        if (response.ok) {
            return Response.json(await response.json());
        }

        if (response.status === 404) {
            return Response.json([]);
        }

        throw new Error('Somethings went wrong.');

    } catch (error) {
        console.error(error);
        return Response.json([]);
    }
}