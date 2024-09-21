import { auth } from "@/auth";

export const PUT = auth(async (request) => {
    const session = request.auth;
    if (!session) return new Response(null, { status: 403 });
    const formData = await request.formData();
    const response = await fetch("http://localhost:8080/api/profiles/avatar", {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + session.user?.accessToken,
        },
        body: formData
    });
    if (response.ok) {
        const data = await response.json();
        return Response.json(data, { status: 200 })
    };
    return Response.json({ error: response.body }, { status: response.status });
});

