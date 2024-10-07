import clsx from "clsx";
import { getPagedUsersData } from "@/app/_dal/users-dal";
import Pagination from "./pagination";
import React from "react";
import { UserSearchParam } from "@/app/(authenticated)/(user)/dashboard/users/page";
import UserDetailsRow from "./user-details-row";
import EmptyBanner from "../tasks/empty-banner";

export default async function UserTable({ searchParams }: Readonly<{ searchParams: UserSearchParam }>) {
    const pagedUserDetailsData = await getPagedUsersData(searchParams.page ?? 1, searchParams.query);
    const userRowsData = pagedUserDetailsData.content;
    const totalPages = pagedUserDetailsData.totalPages;

    if (pagedUserDetailsData.totalElements === 0) {
        return <EmptyBanner message="There is no users." />
    }
    return <>
        <table className="table-fixed border-collapse w-full text-left">
            <colgroup>
                <col className="w-[30%] md:w-[35%]" />
                <col className="w-[20%] md:w-[25%]" />
                <col className="w-[12%] md:w-[11%]" />
                <col className="w-[12%] md:w-[11%]" />
                <col className="w-[12%] md:w-[11%]" />
                <col className="w-[14%] md:w-[7%]" />
            </colgroup>
            <thead className="py-4">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Todo</th>
                    <th>Done</th>
                    <th>Total</th>
                    <th>Enabled</th>
                </tr>
            </thead>
            <tbody>
                {userRowsData.map((userRowData, index) => <UserDetailsRow className={clsx(index === userRowsData.length - 1 && "border-b-0")} key={userRowData.id} data={userRowData} />)}
            </tbody>
        </table>
        <div className="w-fit mx-auto py-5">
            <Pagination totalPage={totalPages} />
        </div>
    </>
}