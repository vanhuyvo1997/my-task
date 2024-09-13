import clsx from "clsx";

export default function OneLineLimitedText({ children, className, title }: Readonly<{ children: React.ReactNode, className?: string, title?: string }>) {
    return <p title={title} className={clsx(
        "text-nowrap overflow-hidden text-ellipsis",
        className
    )}>{children}</p>
}