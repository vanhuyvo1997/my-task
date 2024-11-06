import { auth } from "@/auth";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError') {
        return new Response('You are not authenticated', { status: 401 });
    }

    const deletedId = params.id;
    const url = process.env.MY_TASK_TASKS_BASE_API + '/' + deletedId;
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + session.user?.accessToken,
        },
        method: 'DELETE'
    });

    return new Response(null, { status: response.status });
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError') {
        return new Response('You are not authenticated', { status: 401 });
    }

    const url = process.env.MY_TASK_TASKS_BASE_API + `/${params.id}`;
    const body = await request.json();

    const response = await fetch(url, {
        method: 'PUT',
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

    return Response.json(data, { status: response.status });
}