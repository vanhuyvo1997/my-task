import { auth } from "@/auth"

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
    const session = await auth();
    const url = process.env.TASKS_BASE_API + `/${params.id}/name`;
    const body = await request.json();

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + session?.user?.accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    let data = null;
    if (response.ok) {
        data = await response.json();
    }

    return new Response(JSON.stringify(data), { status: response.status });
}