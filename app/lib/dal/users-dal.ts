"use server"
import { fetchData } from "./common";

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
    const url = process.env.MY_TASK_USERS_BASE_API + `?pageSize=8&pageNum=${page - 1}&sortDir=desc${query ? "&query=" + query : ''}`;
    return await fetchData<PagedUsersDetailsData>(url, "GET");
}

export async function getTopActiveUser(topNum: number) {
    return await fetchData<UserDetailsData[]>(process.env.MY_TASK_USERS_BASE_API + `/top?topNum=${topNum}`, "GET");
}