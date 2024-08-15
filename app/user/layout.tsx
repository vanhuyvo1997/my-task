import HeaderBar from "../_components/header-bar";
import SideMenu from "../_components/side-menu";


export default async function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="bg-white">
        <SideMenu id="side-menu" />
        <div className="w-auto min-w-[344px] lg:pl-[344px]">
            <HeaderBar toggleElementId="side-menu" />
            <div className="px-4 pt-20">
                {children}
            </div>
        </div>
    </div>
}