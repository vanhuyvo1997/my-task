import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { join } from "path";

export const GET = auth(async (req) => {

    const sesion = req.auth;
    if (!sesion?.user) {
        return NextResponse.json('You are not authenticated', { status: 401 })
    }

    const params = req.nextUrl.searchParams;

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
            return Response.json(await response.json(), { status: 200 });
        }

        if (response.status === 404) {
            return Response.json("No tasks found", { status: 404 });
        }

        throw new Error('Somethings went wrong.');

    } catch (error) {
        console.error(error);
        return Response.json(null, { status: 500 });
    }
})