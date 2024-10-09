import UserTableSkeleton from "@/app/_components/skeletons/admin/user-table-skeleton";
import SearchBarV2 from "@/app/_components/text-inputs/search-bar-v2";
import AdminPageSection from "@/app/_components/user/admin-page-section";
import UserTable from "@/app/_components/user/user-table";
import { Suspense } from "react";

export type UserSearchParam = { page: number, query: string };

export default async function ManageUserPage({ searchParams }: Readonly<{ searchParams: UserSearchParam }>) {
    return <AdminPageSection title="User Mangement">
        <div className="md:relative mb-2">
            <SearchBarV2 className="md:absolute md:right-4 md:-top-14" />
        </div>
        <Suspense key={searchParams.query + searchParams.page} fallback={<UserTableSkeleton />}>
            <UserTable searchParams={searchParams} />
        </Suspense>
    </AdminPageSection>
}