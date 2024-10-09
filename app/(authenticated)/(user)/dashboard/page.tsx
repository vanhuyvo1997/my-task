import StatisticsSectionContentSkeleton from "@/app/_components/skeletons/admin/statistics-section-content-skeleton";
import UserRankedListSkeleton from "@/app/_components/skeletons/admin/user-ranked-list-skeleton";
import UserRankedList from "@/app/_components/statistics/user-ranked-list";
import AdminPageSection from "@/app/_components/user/admin-page-section";
import StatisticsSectionContent from "@/app/_components/user/statistics-section-content";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statistics"
}

export default async function StatisticsPage() {
    return <div className="flex flex-col gap-6">
        <AdminPageSection title="Top active users">
            <Suspense fallback={<UserRankedListSkeleton />}>
                <UserRankedList />
            </Suspense>
        </AdminPageSection>
        <AdminPageSection title="Statistics">
            <Suspense fallback={<StatisticsSectionContentSkeleton />}>
                <StatisticsSectionContent />
            </Suspense>
        </AdminPageSection>
    </div>
}