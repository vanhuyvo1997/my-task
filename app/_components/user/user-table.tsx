import clsx from "clsx";
import { getPagedUsersData } from "@/app/_dal/users-dal";
import Pagination from "./pagination";
import React from "react";
import { UserSearchParam } from "@/app/(authenticated)/(user)/dashboard/users/page";
import UserDetailsRow from "./user-details-row";

export default async function UserTable({ searchParams }: Readonly<{ searchParams: UserSearchParam }>) {
    const pagedUserDetailsData = await getPagedUsersData(searchParams.page ?? 1, searchParams.query);
    const userRowsData = pagedUserDetailsData.content;
    const totalPages = pagedUserDetailsData.totalPages;
    return <>
        <table className="border-collapse w-full text-left">
            <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "32%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
            </colgroup>
            <thead className="py-4">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Todo</th>
                    <th>Done</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {userRowsData.map((userRowData, index) => <UserDetailsRow className={clsx(index === userRowsData.length - 1 && "border-b-0")} key={userRowData.id} data={userRowData} />)}
            </tbody>
        </table>
        <div className="py-5">
            <Pagination totalPage={totalPages} />
        </div>
    </>
}