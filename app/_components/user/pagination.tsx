"use client"

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation"
import Button from "../buttons/button";
import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Pagination({ totalPage = 8 }: Readonly<{ totalPage?: number }>) {
    const searchQuery = useSearchParams();
    const currentPage = Number(searchQuery.get("page") ?? '1');
    const pathname = usePathname();
    const allPaginationButtons = generatePaginationLinkButtons(totalPage, currentPage, pathname);

    return <div className="h-4 max-w-80 flex items-center m-auto gap-1">
        {allPaginationButtons}
    </div>
}

function PaginationLinkButton({ children, active = false, disabled, href }: Readonly<{ children: ReactNode, active?: boolean, disabled?: boolean, href?: string }>) {
    const buttonClassName = clsx("border-[1px]", active && "bg-hover-background");
    if (disabled || active) {
        return <Button disabled className={buttonClassName}>{children}</Button>
    }
    return <Link href={href ?? ''} >
        <Button className={buttonClassName}>
            {children}
        </Button>
    </Link>;
}

function generatePaginationLinkButtons(totalPages: number, currentPage: number, pathname: string) {
    let result = [];
    if (totalPages <= 0) return [];

    result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (currentPage - 1)} disabled={currentPage === 1}><ArrowLeftIcon className="h-6" /></PaginationLinkButton>);

    if (totalPages <= 7 && totalPages >= 1) {
        addPaginationButtonsOnSmallTotalPage(totalPages, currentPage, result, pathname);
    } else if (currentPage <= 3) {
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + 1} active={currentPage === 1}>{1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + 2} active={currentPage === 2}>{2}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + 3} active={currentPage === 3}>{3}</PaginationLinkButton>);
        result.push(<PaginationLinkButton disabled>...</PaginationLinkButton>)
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (totalPages - 1)} active={currentPage === totalPages - 1}>{totalPages - 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + totalPages} active={currentPage === totalPages}>{totalPages}</PaginationLinkButton>);
    } else if (currentPage >= totalPages - 2) {
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + 1} active={currentPage === 1}>{1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + 2} active={currentPage === 2}>{2}</PaginationLinkButton>);
        result.push(<PaginationLinkButton disabled>...</PaginationLinkButton>)
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (totalPages - 2)} active={currentPage === totalPages - 2}>{totalPages - 2}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (totalPages - 1)} active={currentPage === totalPages - 1}>{totalPages - 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + totalPages} active={currentPage === totalPages}>{totalPages}</PaginationLinkButton>);
    } else {
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + 1} active={currentPage === 1}>{1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton disabled>...</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (currentPage - 1)}>{currentPage - 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + currentPage} active>{currentPage}</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (currentPage + 1)}>{currentPage + 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton disabled>...</PaginationLinkButton>);
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + totalPages} active={currentPage === totalPages}>{totalPages}</PaginationLinkButton>);
    }
    result.push(<PaginationLinkButton href={pathname + "?" + "page=" + (currentPage + 1)} disabled={currentPage === totalPages}><ArrowRightIcon className="h-6" /></PaginationLinkButton>);
    return result;
}

function addPaginationButtonsOnSmallTotalPage(totalPages: number, currentPage: number, result: JSX.Element[], pathname: string) {
    for (let i = 1; i <= totalPages; i++) {
        result.push(<PaginationLinkButton href={pathname + "?" + "page=" + i} key={i} active={currentPage === i}>{i}</PaginationLinkButton>);
    }
}