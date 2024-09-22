import clsx from "clsx"

export function ButtonSkeleton({ className }: Readonly<{ className?: string }>) {
    return <div className={clsx("shadow-sm rounded-sm h-5 w-5 bg-gray-200", className)}></div>
}

export function TextSkeleton({ className }: Readonly<{ className?: string }>) {
    return <div className={clsx("bg-gray-200 w-full h-5", className)}></div>
}
