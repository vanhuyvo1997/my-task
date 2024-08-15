import { User } from "next-auth";
import AccountInfo from "./account-info";
import BarsButton from "./bars-button";

export default function SideMenu({ id, user }: Readonly<{ id: string, user: User }>) {
    return <div id={id} className="hidden lg:block h-full bg-[#6b6b6b] fixed p-2 pt-4 w-[344px] z-10 shadow-lg">
        <BarsButton toggleElementId="side-menu" className="relative top-[1.5px]" />
        <div className="flex py-5 lg:py-0">
            <AccountInfo user={user} />
        </div>
    </div>
}