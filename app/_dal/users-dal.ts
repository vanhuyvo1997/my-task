"use server"
import { auth } from "@/auth";

export type UserDetailsData = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatarUrl: string,
    enabled: boolean,
    numOfCompleted: number,
    numOfTodo: number,
    totalTasks: number,
}

export type PagedUsersDetailsData = {
    totalPages: number,
    totalElements: number,
    content: UserDetailsData[],
}

export async function getPagedUsersData(page: number, query: string) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError' || session.user?.role !== "ADMIN") {
        throw new Error("Permission denied");
    }

    const response = await fetch(`http://localhost:8080/api/users?pageSize=8&pageNum=${page - 1}&sortDir=desc${query ? "&query=" + query : ''}`,
        {
            headers: { "Authorization": "Bearer " + session.user.accessToken, },
        }
    );

    if (!response.ok) {
        throw new Error("Fail to fetch: " + response.status);
    }
    const data = await response.json();
    return data as PagedUsersDetailsData;
}