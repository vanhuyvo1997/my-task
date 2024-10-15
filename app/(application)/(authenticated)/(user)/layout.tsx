import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SideMenu from "../../../component/commons/side-menu/side-menu";
import { ManageUsersMenuItem, StatisticsMenuItem } from "@/app/component/commons/side-menu/menu-items";
import React from "react";
import HeaderBar from "@/app/component/commons/header-bar";

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