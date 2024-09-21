import { ButtonSkeleton, TextSkeleton } from "./common-skeletons";

export default function TaskSkeleton() {

    return <div className={`bg-task-background-light dark:bg-task-background-dark rounded-md p-1 flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-2 w-full">
            <div className="shrink-0 rounded-full h-6 w-6 relative p-0.5 border-2 border-white"></div>
            <TextSkeleton />
        </div>
        <div className="flex">
            <ButtonSkeleton />
            <ButtonSkeleton />
        </div>
    </div>
}

