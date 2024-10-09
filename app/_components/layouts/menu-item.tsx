"use client"
import { ChartPieIcon, UsersIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function MenuItem({ href, children, active = false }: Readonly<{ href: string, children: ReactNode, active?: boolean }>) {
    return <Link className={clsx(
        "flex h-10 items-center gap-3 text-nowrap text-ellipsis text-xl rounded-md p-2 ",
        active ? "bg-hover-background cursor-default" : " hover:bg-hover-background bg-menu-item-background-light dark:bg-menu-item-background-dark",
    )} href={href}>
        {children}
    </Link>
}

export function ManageUsersMenuItem() {
    const pathName = usePathname();
    const href = "/dashboard/users";
    return <MenuItem href={href} active={pathName.endsWith(href)} >
        <UsersIcon className="h-full" /> Manage users
    </MenuItem>
}

export function StatisticsMenuItem() {
    const pathName = usePathname();
    const href = "/dashboard";
    return <MenuItem href={href} active={pathName.endsWith(href)} >
        <ChartPieIcon className="h-full" /> Statistics
    </MenuItem>
}