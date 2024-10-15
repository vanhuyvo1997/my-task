import DarkModeSwitcher from "../commons/switchers/dark-mode-switcher";
import PrimaryButton from "../commons/buttons/primary-button";
import { auth } from "@/auth";
import BurgerButton from "../commons/buttons/burger-button";
import clsx from "clsx";
import Link from "next/link";
import Logo from "./logo";

export default async function HeaderBar({ mode = "full" }: Readonly<{ mode?: "short" | "full" }>) {
    const session = await auth();
    const authenticated = !!session;
    return <div className={clsx(
        "fixed p-2 bg-headerbar-light dark:bg-headerbar-dark w-full top-0 flex items-center justify-between z-30 lg:right-0",
        mode === 'short' && 'lg:w-[calc(100%-344px)]',
    )}>
        {authenticated && <div className="lg:hidden"><BurgerButton toggleElementId={'side-menu'} /></div>}
        <Link href={"/"}><Logo width={65} /></Link>
        <div className="flex items-center gap-2">
            <DarkModeSwitcher />
            {!authenticated && <>
                <Link href='/login'><PrimaryButton size="sm" className="bg-orange-500">Login</PrimaryButton></Link>
                <Link href='/register'><PrimaryButton size="sm" className="bg-gray-600">Register</PrimaryButton></Link>
            </>}
        </div>
    </div>
}