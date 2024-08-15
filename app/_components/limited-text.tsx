import clsx from "clsx";

export default function LimitedText({ children, className, title }: Readonly<{ children: React.ReactNode, className: string, title?: string }>) {
    return <p title={title} className={clsx(
        "cursor-default text-nowrap overflow-hidden text-ellipsis",
        className
    )}>{children}</p>
}