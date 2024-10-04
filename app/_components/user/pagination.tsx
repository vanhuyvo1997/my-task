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

    const createPageUrl = (page: number) => commonCreatePageUrl(page, pathname);

    result.push(<PaginationLinkButton key={"back"} href={pathname + "?" + "page=" + (currentPage - 1)} disabled={currentPage === 1}><ArrowLeftIcon className="h-6" /></PaginationLinkButton>);

    if (totalPages <= 7 && totalPages >= 1) {
        addPaginationButtonsOnSmallTotalPage(totalPages, currentPage, result, pathname);
    } else if (currentPage <= 3) {
        result.push(<PaginationLinkButton key={1} href={createPageUrl(1)} active={currentPage === 1}>{1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={2} href={createPageUrl(2)} active={currentPage === 2}>{2}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={3} href={createPageUrl(3)} active={currentPage === 3}>{3}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={"..."} disabled>...</PaginationLinkButton>)
        result.push(<PaginationLinkButton key={totalPages - 1} href={createPageUrl(totalPages - 1)} active={currentPage === totalPages - 1}>{totalPages - 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={totalPages} href={createPageUrl(totalPages)} active={currentPage === totalPages}>{totalPages}</PaginationLinkButton>);
    } else if (currentPage >= totalPages - 2) {
        result.push(<PaginationLinkButton key={1} href={createPageUrl(1)} active={currentPage === 1}>{1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={2} href={createPageUrl(2)} active={currentPage === 2}>{2}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={"..."} disabled>...</PaginationLinkButton>)
        result.push(<PaginationLinkButton key={totalPages - 2} href={createPageUrl(totalPages - 2)} active={currentPage === totalPages - 2}>{totalPages - 2}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={totalPages - 1} href={createPageUrl(totalPages - 1)} active={currentPage === totalPages - 1}>{totalPages - 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={totalPages} href={createPageUrl(totalPages)} active={currentPage === totalPages}>{totalPages}</PaginationLinkButton>);
    } else {
        result.push(<PaginationLinkButton key={1} href={createPageUrl(1)} active={currentPage === 1}>{1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={"...1"} disabled>...</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={currentPage - 1} href={createPageUrl(currentPage - 1)}>{currentPage - 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={currentPage} href={createPageUrl(currentPage)} active>{currentPage}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={currentPage + 1} href={createPageUrl(currentPage + 1)}>{currentPage + 1}</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={"...2"} disabled>...</PaginationLinkButton>);
        result.push(<PaginationLinkButton key={totalPages} href={createPageUrl(totalPages)} active={currentPage === totalPages}>{totalPages}</PaginationLinkButton>);
    }
    result.push(<PaginationLinkButton key={"next"} href={createPageUrl(currentPage + 1)} disabled={currentPage === totalPages}><ArrowRightIcon className="h-6" /></PaginationLinkButton>);
    return result;
}

function addPaginationButtonsOnSmallTotalPage(totalPages: number, currentPage: number, result: JSX.Element[], pathname: string) {
    for (let i = 1; i <= totalPages; i++) {
        result.push(<PaginationLinkButton href={commonCreatePageUrl(i, pathname)} key={i} active={currentPage === i}>{i}</PaginationLinkButton>);
    }
}