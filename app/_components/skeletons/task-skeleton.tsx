export default function TaskSkeleton() {

    return <div className={`bg-task-background-light dark:bg-task-background-dark rounded-md p-1 flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-2 w-full">
            <div className="shrink-0 rounded-full h-6 w-6 relative p-0.5 border-2 border-white"></div>
            <div className="bg-gray-200 w-full">
                <div className="w-full h-5"></div>
            </div>
        </div>
        <div className="flex">
            <div className="shadow-sm text-sm rounded-sm px-2 py-1">
                <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
            </div>
            <div className="shadow-sm text-sm rounded-sm px-2 py-1">
                <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
            </div>
        </div>
    </div>
}