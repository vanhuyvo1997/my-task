import { TextSkeleton } from "../common-skeletons"

export default function StatisticsSectionContentSkeleton() {
    return <div className="flex gap-2 flex-col lg:flex-row animate-pulse">
        <StatisticsColumnSkeleton />
        <StatisticsColumnSkeleton />
    </div>
}

export function StatisticsColumnSkeleton() {
    return <div className="w-full border border-gray-300 p-1 shadow-lg rounded-sm flex flex-col gap-1">
        <div className="p-3 flex items-center gap-2">
            <div className="h-7 w-7 bg-gray-200" /><TextSkeleton className="h-7 w-20" />
        </div>
        <div className="flex gap-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
        <br />
        <div className="p-3 flex items-center gap-2">
            <div className="h-7 w-7 bg-gray-200" /><TextSkeleton className="h-7 w-20" />
        </div>
        <div className="h-60 py-6 w-full">
        </div>
    </div>
}

function CardSkeleton() {
    return <div className="bg-gray-200 dark:bg-gray-800 py-1 px-2 rounded-md w-full shadow-md border">
        <div className="p-1">
            <TextSkeleton className="h-7" />
        </div>
        <div className="bg-gray-50 dark:bg-gray-950 rounded-md p-2 border">
            <TextSkeleton className="h-7" />
        </div>
    </div>
}