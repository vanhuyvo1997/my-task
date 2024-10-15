import { auth } from "@/auth";

export async function fetchData<T>(url: string, method: "POST" | "GET", body?: BodyInit | null | undefined) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError' || session.user?.role !== "ADMIN") {
        throw new Error("PermissionDeniedError");
    }

    const response = await fetch(url,
        {
            headers: { "Authorization": "Bearer " + session.user.accessToken, },
            method: method,
            body: body,
        }
    );

    if (!response.ok) {
        throw new Error("Fail to fetch: " + response.status);
    }

    const data = await response.json();
    return data as T;
}