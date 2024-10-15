import TaskSkeleton from "./task-skeleton";

const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function TasksListSkeleton() {
    return <div className={`animate-pulse flex flex-col gap-3`}>
        <div className="flex flex-col gap-2">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
        </div>
        <CompletedDropMarkSkeleton />
        <div className="flex flex-col gap-2">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
        </div>
    </div>
}

function CompletedDropMarkSkeleton() {
    return <div className="shadow-sm text-sm rounded-sm py-1 w-fit bg-showtask-button-background-light dark:bg-showtask-button-background-dark flex items-center gap-3 px-2">
        <div className="block w-2 h-2 border-r-2 border-b-2 border-solid rotate-45 -translate-y-1/3"></div>
        <div className="h-4 w-16 bg-gray-200"></div>
    </div>
}