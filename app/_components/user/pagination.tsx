"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation"
import Button from "../buttons/button";
import { ReactNode, useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Pagination({ totalPage }: Readonly<{ totalPage: number }>) {
    const searchQuery = useSearchParams();
    const currentPage = Number(searchQuery.get("page") ?? '1');
    const pathname = usePathname();
    const allPaginationButtons = useMemo(() => generatePaginationLinkButtons(totalPage, currentPage, pathname), [totalPage, currentPage, pathname]);

    return <div className="h-4 max-w-80 flex items-center m-auto gap-1">
        {allPaginationButtons}
    </div>
}

function PaginationLinkButton({ children, active = false, disabled, href }: Readonly<{ children: ReactNode, active?: boolean, disabled?: boolean, href?: string }>) {
    const buttonClassName = clsx("border-[1px]");
    if (disabled || active) {
        return <Button disabled className={clsx(buttonClassName, active && "bg-hover-background")}>{children}</Button>
    }
    return <Link href={href ?? ''} >
        <Button className={buttonClassName}>
            {children}
        </Button>
    </Link>;
}

const commonCreatePageUrl = (page: number, pathname?: string) => `${pathname}?page=${page}`;

function generatePaginationLinkButtons(totalPages: number, currentPage: number, pathname: string) {
    let result = [];
    if (!totalPages || totalPages <= 0) return null;
    const hasMoreSymbol = "...";

    const createPageUrl = (page: number) => commonCreatePageUrl(page, pathname);
    function addPaginationLinkButtons(begin: number, end: number) {
        for (let i = begin; i <= end; i++) {
            result.push(<PaginationLinkButton key={i} href={createPageUrl(i)} active={currentPage === i}>{i}</PaginationLinkButton>);
        }
    }

    result.push(<PaginationLinkButton key={"back"} href={pathname + "?" + "page=" + (currentPage - 1)} disabled={currentPage === 1}><ArrowLeftIcon className="h-6" /></PaginationLinkButton>);
    if (totalPages <= 7 && totalPages >= 1) {
        addPaginationLinkButtonsOnSmallTotalPage(totalPages, currentPage, result, pathname);
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

function addPaginationLinkButtonsOnSmallTotalPage(totalPages: number, currentPage: number, result: JSX.Element[], pathname: string) {
    for (let i = 1; i <= totalPages; i++) {
        result.push(<PaginationLinkButton href={commonCreatePageUrl(i, pathname)} key={i} active={currentPage === i}>{i}</PaginationLinkButton>);
    }
}