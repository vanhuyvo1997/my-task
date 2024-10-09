import UserTableSkeleton from "@/app/_components/skeletons/admin/user-table-skeleton";
import SearchBarV2 from "@/app/_components/text-inputs/search-bar-v2";
import UserTable from "@/app/_components/user/user-table";
import { Suspense } from "react";

export type UserSearchParam = { page: number, query: string };

export default async function ManageUserPage({ searchParams }: Readonly<{ searchParams: UserSearchParam }>) {
    return <div>
        <h1 className="text-2xl font-semibold text-orange-400">User Mangement</h1>
        <br />
        <div className="md:relative">
            <SearchBarV2 className="md:absolute md:right-4 md:-top-16" />
        </div>
        <br />
        <Suspense key={searchParams.query + searchParams.page} fallback={<UserTableSkeleton />}>
            <UserTable searchParams={searchParams} />
        </Suspense>
    </div>
}