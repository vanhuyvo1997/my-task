import UserRankedList from "@/app/component/statistics/user-ranked-list";
import AdminPageSection from "@/app/component/commons/admin-page-section";
import { Suspense } from "react";
import { Metadata } from "next";
import UserRankedListSkeleton from "@/app/component/skeletons/user-ranked-list-skeleton";
import StatisticsSectionContentSkeleton from "@/app/component/skeletons/statistics-section-content-skeleton";
import StatisticsSectionContent from "@/app/component/statistics/statistics-section-content";

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