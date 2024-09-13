"use client"

import { toggleHiddenElementById } from "../buttons/bars-button"

export default function SideMenuWrapper({ id, children }: Readonly<{ id: string, children: React.ReactNode }>) {
    return <div id={id} onClick={(e) => { e.stopPropagation(); toggleHiddenElementById(id) }}
        className="hidden lg:block h-full w-full lg:w-fit 
         bg-sidemenu-background-light/50 dark:bg-sidemenu-background-dark/50
            backdrop-blur-sm lg:backdrop-blur-none
            z-40 fixed">
        <div className="h-full p-2 pt-4  w-[344px] bg-sidemenu-background-light dark:bg-sidemenu-background-dark shadow-lg"
            onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
}