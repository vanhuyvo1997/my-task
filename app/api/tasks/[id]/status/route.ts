import { auth } from "@/auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    const token = session?.user?.accessToken;

    const response = await fetch(process.env.CHANGE_TASK_STATUS_API + '/' + params.id + '/status',
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            method: 'PATCH',
        }
    );

    let body = null;

    if (response.ok) {
        body = await response.json();
    }

    return new Response(body, { status: response.status });
}