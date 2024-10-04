import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { pageSize, pageNum, sortDir }: { pageSize: number, pageNum: number, sortDir: "asc" | "desc" }) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError' || session.user?.role !== "ADMIN") {
        return NextResponse.json('You are not authenticated', { status: 401 })
    }

    const url = process.env.MY_TASK_USERS_BASE_API + `?pageSize=${pageSize}&pageNum=${pageNum}&sortDir=${sortDir}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + session.user.accessToken,
        }
    });

    if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
    }
    console.error(await response.json())
    return NextResponse.json({ error: "Couldn't load users" }, { status: response.status });

}