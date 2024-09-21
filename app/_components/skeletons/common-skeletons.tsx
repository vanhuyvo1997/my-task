import clsx from "clsx"

export function ButtonSkeleton({ className }: Readonly<{ className?: string }>) {
    return <div className="shadow-sm text-sm rounded-sm">
        <div className={clsx("h-5 w-5 bg-gray-200 rounded-md mx-2 my-1", className)}></div>
    </div>
}

export function TextSkeleton({ className }: Readonly<{ className?: string }>) {
    return <div className="w-full">
        <div className={clsx("bg-gray-200 w-full h-4 my-0.5", className)}></div>
    </div>
}