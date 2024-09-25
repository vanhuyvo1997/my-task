import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(rq: NextRequest) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError') {
        return new Response('You are not authenticated', { status: 401 });
    }

    const response = await fetch(process.env.MY_TASK_PROFILES_BASE_API, {
        headers: {
            "Authorization": "Bearer " + session.user?.accessToken,
        }
    });

    if (response.ok) {
        const data = await response.json();
        return Response.json(data, { status: 200 });
    }

    return Response.json({ error: response.body, }, { status: response.status });

}