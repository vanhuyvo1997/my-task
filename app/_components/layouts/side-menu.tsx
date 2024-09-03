import { User } from "next-auth";
import AccountInfo from "../account/account-info";
import BarsButton from "../buttons/bars-button";
import SearchBar from "../text-inputs/search-bar";

export default function SideMenu({ id, user }: Readonly<{ id: string, user: User }>) {
    return <div id={id} className="hidden lg:block h-full bg-[#6b6b6b] fixed p-2 pt-4 w-[344px] z-50 shadow-lg">
        <BarsButton toggleElementId="side-menu" className="relative top-[1.5px]" />
        <div className="flex flex-col gap-4 py-5 lg:py-0">
            <AccountInfo user={user} />
            <SearchBar className="hidden lg:flex" />
        </div>
    </div>
}