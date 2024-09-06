import { auth } from "@/auth";
import SideMenu from "../../_components/layouts/side-menu";
import { redirect } from "next/navigation";
import SearchTasksProvider from "../../_provider/search-tasks-provider";


export default async function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <SearchTasksProvider>
        <SideMenu id="side-menu" />
        <div className="w-auto min-w-[344px] lg:pl-[344px]">
            <div className="px-[2%] pt-20">
                {children}
            </div>
        </div>
    </SearchTasksProvider>
}