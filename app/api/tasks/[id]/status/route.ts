import { auth } from "@/auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {

    const session = await auth();
    if (!session) {
        return new Response('You are not authenticated', { status: 401 });
    }

    const token = session?.user?.accessToken;
    const url = process.env.MY_TASK_BASE_API + '/' + params.id + '/status';
    const body = await request.json();

    const response = await fetch(url,
        {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify(body),
        }
    );

    let responseBody = null;
    if (response.ok) {
        responseBody = await response.json();
    }

    return Response.json(responseBody, { status: response.status });
}