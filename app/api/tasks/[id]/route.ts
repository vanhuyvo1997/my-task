import { auth } from "@/auth";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    const deletedId = params.id;
    const response = await fetch(process.env.DELETE_USER_TASK_BASE_API + '/' + deletedId, {
        headers: {
            'Authorization': 'Bearer ' + session?.user?.accessToken,
        },
        method: 'DELETE'
    });
    return new Response(null, { status: response.status });
}