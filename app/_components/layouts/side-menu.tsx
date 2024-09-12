import { User } from "next-auth";
import AccountInfo from "../account/account-info";
import BarsButton from "../buttons/bars-button";
import SearchBar from "../text-inputs/search-bar";

export default async function SideMenu({ id }: Readonly<{ id: string }>) {
    return <div id={id} className="hidden lg:block h-full bg-sidemenu-background-light dark:bg-sidemenu-background-dark z-40 fixed p-2 pt-4 w-[344px] shadow-lg ">
        <div className="lg:hidden"><BarsButton toggleElementId="side-menu" className="relative top-[1.5px]" /></div>
        <div className="flex flex-col gap-4 py-5 lg:py-0">
            <AccountInfo />
            <SearchBar className="hidden lg:flex" />
        </div>
    </div>
}