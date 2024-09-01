import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const sesion = await auth();
    if (!sesion?.user) {
        throw new Error("Unauthenticated");
    }

    const params = request.nextUrl.searchParams;

    let url = process.env.TASKS_BASE_API;
    if (params.size > 0) {
        url += '?' + params.toString();
    }

    try {
        const response = await fetch(url,
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