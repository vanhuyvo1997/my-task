import { auth } from "@/auth";
import HeaderBar from "../_components/layouts/header-bar";
import SideMenu from "../_components/layouts/side-menu";
import { redirect } from "next/navigation";
import SearchTasksContextWrapper from "../_wrapper/search-tasks-context-wrapper";


export default async function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    const user = session?.user;
    if (!user) {
        redirect('login');
    }


    return <SearchTasksContextWrapper>
        <SideMenu user={user} id="side-menu" />
        <div className="w-auto min-w-[344px] lg:pl-[344px]">
            <HeaderBar toggleElementId="side-menu" />
            <div className="px-[2%] pt-20">
                {children}
            </div>
        </div>
    </SearchTasksContextWrapper>
}