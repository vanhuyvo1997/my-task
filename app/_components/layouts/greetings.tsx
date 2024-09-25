'use client'
import { useDarkModeContext } from "@/app/_context/dark-mode-context";
import logo_dark from "@/app/_images/logo-dark.png";
import logo_light from "@/app/_images/logo-light.png";
import Image from "next/image";

export default function Greetings() {
    const isDarkMode = useDarkModeContext();
    const logo = isDarkMode ? logo_dark : logo_light;

    return <div className="flex flex-col items-center gap-5 lg:items-start md:w-fit">
        <Image src={logo} height={125} alt="Logo" />
        <div className="text-center  md:text-left">
            <h1 className="text-3xl text-gray-700 dark:text-gray-300 text-nowrap">Manage tasks, manage life.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-nowrap"><span className="text-orange-400"><b>Tasks</b></span> helps you manage day-to-day tasks easier.</p>
        </div>
    </div>
}