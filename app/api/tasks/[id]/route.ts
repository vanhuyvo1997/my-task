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