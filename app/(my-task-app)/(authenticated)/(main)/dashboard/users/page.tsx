import SearchBarV2 from "@/app/component/commons/text-inputs/search-bar";
import AdminPageSection from "@/app/component/commons/admin-page-section";
import UserTable from "@/app/component/user-table/user-table";
import { Metadata } from "next";
import { Suspense } from "react";
import UserTableSkeleton from "@/app/component/skeletons/user-table-skeleton";

export type UserSearchParam = { page: number, query: string };

export const metadata: Metadata = {
    title: "Users Mangement"
}

export default async function ManageUserPage({ searchParams }: Readonly<{ searchParams: UserSearchParam }>) {
    return <AdminPageSection title="Users Mangement">
        <div className="md:relative mb-2">
            <SearchBarV2 className="md:absolute md:right-4 md:-top-14" />
        </div>
        <Suspense key={searchParams.query + searchParams.page} fallback={<UserTableSkeleton />}>
            <UserTable searchParams={searchParams} />
        </Suspense>
    </AdminPageSection>
}