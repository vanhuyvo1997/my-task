import DarkModeSwitcher from "../buttons/dark-mode-switcher";
import Button from "../buttons/button";
import { auth } from "@/auth";
import BarsButton from "../buttons/bars-button";
import clsx from "clsx";
import Link from "next/link";
import Logo from "./logo";

export default async function HeaderBar() {
    const session = await auth();
    let authenticated = !!session?.user;

    return <div className={clsx(
        "fixed p-2 bg-headerbar-light dark:bg-headerbar-dark w-full top-0 flex items-center justify-between z-30 lg:right-0",
        authenticated && 'lg:w-[calc(100%-344px)]',
    )}>
        {authenticated && <div className="lg:hidden"><BarsButton toggleElementId={'side-menu'} /></div>}
        <Logo width={65} />
        <div className="flex items-center gap-2">
            <DarkModeSwitcher />
            {!authenticated && <>
                <Link href='/login'><Button size="sm" className="bg-orange-500">Login</Button></Link>
                <Link href='/register'><Button size="sm" className="bg-gray-600">Register</Button></Link>
            </>}
        </div>
    </div>
}