import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HeaderBar from "../../_components/layouts/header-bar";
import SideMenu from "../../_components/layouts/side-menu";
import { ManageUsersMenuItem, StatisticsMenuItem } from "@/app/_components/layouts/menu-item";
import React from "react";

export default async function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    if (!session) {
        redirect('/');
    }
    return <>
        <HeaderBar mode={session ? 'short' : 'full'} />
        <SideMenu id='side-menu'>
            {session.user?.role === "ADMIN" && <>
                <StatisticsMenuItem />
                <ManageUsersMenuItem />
            </>}
        </SideMenu>
        <div className="w-auto min-w-[344px] lg:pl-[344px]">
            <div className="px-[2%] pt-20">
                {children}
            </div>
        </div>
    </>
}