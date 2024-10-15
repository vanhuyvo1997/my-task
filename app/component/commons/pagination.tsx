"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation"
import PrimaryButton from "../commons/buttons/primary-button";
import { ReactNode, useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Pagination({ totalPage }: Readonly<{ totalPage: number }>) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") ?? 1);
    const pathname = usePathname();
    const allPaginationButtons = useMemo(
        () => generatePaginationLinkButtons(totalPage, currentPage, pathname, new URLSearchParams(searchParams)),
        [totalPage, currentPage, pathname, searchParams]
    );

    return <div className="h-4 w-fit flex items-center gap-1">
        {allPaginationButtons}
    </div>
}

function generatePaginationLinkButtons(totalPages: number, currentPage: number, pathname: string, searchParams: URLSearchParams) {
    let result = [];
    if (!totalPages || totalPages <= 0) return null;
    const hasMoreSymbol = "...";

    const createPageUrl = (page: number) => {
        searchParams.set("page", page + "");
        return `${pathname}?${searchParams.toString()}`;
    }

    function addPaginationLinkButtons(begin: number, end: number) {
        for (let i = begin; i <= end; i++) {
            result.push(<PaginationLinkButton key={i} href={createPageUrl(i)} active={currentPage === i}>{i}</PaginationLinkButton>);
        }
    }


    result.push(<PaginationLinkButton key={"back"} href={createPageUrl(currentPage - 1)} disabled={currentPage === 1}><ArrowLeftIcon className="h-6" /></PaginationLinkButton>);
    if (totalPages <= 7 && totalPages >= 1) {
        addPaginationLinkButtons(1, totalPages);
    } else if (currentPage <= 3) {
        addPaginationLinkButtons(1, 3);
        result.push(<PaginationLinkButton key={hasMoreSymbol} disabled>{hasMoreSymbol}</PaginationLinkButton>)
        addPaginationLinkButtons(totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
        addPaginationLinkButtons(1, 2);
        result.push(<PaginationLinkButton key={hasMoreSymbol} disabled>{hasMoreSymbol}</PaginationLinkButton>)
        addPaginationLinkButtons(totalPages - 2, totalPages);
    } else {
        addPaginationLinkButtons(1, 1);
        result.push(<PaginationLinkButton key={hasMoreSymbol + 1} disabled>{hasMoreSymbol}</PaginationLinkButton>);
        addPaginationLinkButtons(currentPage - 1, currentPage + 1);
        result.push(<PaginationLinkButton key={hasMoreSymbol + 2} disabled>{hasMoreSymbol}</PaginationLinkButton>);
        addPaginationLinkButtons(totalPages, totalPages);
    }
    result.push(<PaginationLinkButton key={"next"} href={createPageUrl(currentPage + 1)} disabled={currentPage === totalPages}><ArrowRightIcon className="h-6" /></PaginationLinkButton>);
    return result;
}


function PaginationLinkButton({ children, active = false, disabled, href }: Readonly<{ children: ReactNode, active?: boolean, disabled?: boolean, href?: string }>) {
    const buttonClassName = clsx("border-[1px]");
    if (disabled || active) {
        return <PrimaryButton disabled className={clsx(buttonClassName, active && "bg-hover-background")}>{children}</PrimaryButton>
    }
    return <Link href={href ?? ''} >
        <PrimaryButton className={buttonClassName}>
            {children}
        </PrimaryButton>
    </Link>;
}
