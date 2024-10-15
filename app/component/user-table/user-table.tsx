import { getPagedUsersData } from "@/app/lib/dal/users-dal";
import React from "react";
import { UserSearchParam } from "@/app/(my-task-app)/(authenticated)/(main)/dashboard/users/page";
import UserDetailsRow from "./user-details-row";
import EmptyBanner from "../commons/empty-banner";
import Pagination from "../commons/pagination";


export default async function UserTable({ searchParams }: Readonly<{ searchParams: UserSearchParam }>) {
    const pagedUserDetailsData = await getPagedUsersData(searchParams.page ?? 1, searchParams.query);
    const userRowsData = pagedUserDetailsData.content;
    const totalPages = pagedUserDetailsData.totalPages;

    if (pagedUserDetailsData.totalElements === 0) {
        return <EmptyBanner message="There is no users." />
    }
    return <>
        <table className="table-fixed border-collapse w-full text-center">
            <colgroup>
                <col className="w-[30%] md:w-[35%]" />
                <col className="w-[20%] md:w-[25%]" />
                <col className="w-[12%] md:w-[11%]" />
                <col className="w-[12%] md:w-[11%]" />
                <col className="w-[12%] md:w-[11%]" />
                <col className="w-[14%] md:w-[7%]" />
            </colgroup>
            <thead className="py-4 bg-gray-200 dark:bg-gray-800">
                <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Email</th>
                    <th>Todo</th>
                    <th>Done</th>
                    <th>Total</th>
                    <th>Enabled</th>
                </tr>
            </thead>
            <tbody>
                {userRowsData.map((userRowData, index) => <UserDetailsRow key={userRowData.id} data={userRowData} />)}
            </tbody>
        </table>
        <div className="w-fit mx-auto py-5">
            <Pagination totalPage={totalPages} />
        </div>
    </>
}