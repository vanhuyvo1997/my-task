import clsx from "clsx";
import Link from "next/link";

export default function CommonLink({ href, className, children }: Readonly<{ href: string, className?: string, children: React.ReactNode }>) {
    return <Link
        className={clsx(
            'text-blue-600 hover:text-blue-400',
            className
        )}
        href={href}>
        {children}
    </Link>
}