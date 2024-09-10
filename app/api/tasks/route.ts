import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {

    const session = req.auth;
    if (!session?.user) {
        return NextResponse.json('You are not authenticated', { status: 401 })
    }

    const params = req.nextUrl.searchParams;

    let url = process.env.MY_TASK_TASKS_BASE_API;
    if (params.size > 0) {
        url += '?' + params.toString();
    }

    try {
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session.user.accessToken,
                },
            }
        );

        if (response.ok) {
            return Response.json(await response.json(), { status: 200 });
        }

        if (response.status === 404) {
            return Response.json("No tasks found", { status: 404 });
        }

        if (response.status === 403) {
            return new Response(null, { status: 403 });
        }

        throw new Error('Somethings went wrong:' + response.status);

    } catch (error) {
        console.error(error);
        return Response.json(null, { status: 500 });
    }
})