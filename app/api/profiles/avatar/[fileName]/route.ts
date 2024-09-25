import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { fileName: string } }) {
    const session = await auth();
    if (!session) return new Response(null, { status: 403 });

    console.log(params.fileName);
    const response = await fetch(process.env.MY_TASK_PROFILES_BASE_API + "/avatar/" + params.fileName, {
        headers: {
            "Authorization": "Bearer " + session.user?.accessToken,
        },
    });

    if (response.ok) {
        const body = response.body;
        return new Response(body, {
            status: 200, headers: {
                "Content-Type": response.headers.get("Content-Type")!,
                'Content-Disposition': response.headers.get("Content-Disposition")!,
            }
        });
    }

    return new Response(null, { status: response.status });
};