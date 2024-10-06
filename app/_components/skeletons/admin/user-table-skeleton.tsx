import clsx from "clsx"
import { AvatarSkeleton } from "../account-info-skeleton"
import { ButtonSkeleton, TextSkeleton } from "../common-skeletons"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react"

export default function UserTableSkeleton() {
    return <div className="animate-pulse">
        <table className="border-collapse w-full text-left">
            <colgroup>
                <col style={{ width: "40%" }} />
                <col style={{ width: "32%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "7%" }} />
            </colgroup>
            <thead className="py-4">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Todo</th>
                    <th>Done</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
                <UserDetailsRowSkeleton />
            </tbody>
        </table>
        <div className="py-5">
            <PageinationSkeleton />
        </div>
    </div>
}

function UserDetailsRowSkeleton() {
    return <tr className="border-b-[0.5px] border-opacity-20 border-y-black dark:border-gray-700 border-x-transparent">
        <td className="py-2 flex items-center gap-2">
            <span><AvatarSkeleton diameter="37" /></span><TextSkeleton />
        </td>
        <td className="py-2"><TextSkeleton /></td>
        <td className="py-2"><TextSkeleton /></td>
        <td className="py-2"><TextSkeleton /></td>
        <td className="py-2"><TextSkeleton /></td>
        <td className="py-2">
            <SwitcherSkeleton />
        </td>
    </tr>
}

function SwitcherSkeleton() {
    return <div className="w-8 bg-gray-200 h-4 rounded-full relative">
        <div className={clsx(
            "h-5 w-5  rounded-full absolute top-1/2 -translate-y-1/2 bg-gray-200 ",
            Math.random() > 0.5 ? "right-0" :
                "left-0"
        )}>
        </div>
    </div>
}

function PageinationSkeleton() {
    return <div className="h-4 max-w-80 flex items-center m-auto gap-1">
        <PaginationLinkButtonSkeleton>
            <ArrowLeftIcon className="h-6" />
        </PaginationLinkButtonSkeleton>
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton />
        <PaginationLinkButtonSkeleton >
            <ArrowRightIcon className="h-6" />
        </PaginationLinkButtonSkeleton>
    </div>
}

function PaginationLinkButtonSkeleton({ children }: { children?: ReactNode }) {
    return <div className="border-[1px] shadow-md text-base rounded-md px-3 py-2">
        {children ? children : <div className="w-2 h-6"></div>}
    </div>
}
