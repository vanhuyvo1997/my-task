'use client'
import { useDarkModeContext, useSetDarkModeContext } from "@/app/_context/dark-mode-context";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react"

export default function DarkModeSwitcher() {
    const isOn = useDarkModeContext();
    const changeMode = useSetDarkModeContext();
    return <button title="Toggle dark/light mode" onClick={() => changeMode(!isOn)} className="bg-gray-400 rounded-full w-[40px] h-[26px]">
        <div className={
            clsx("inline-block rounded-full", isOn ? 'float-right bg-gray-800' : 'float-left bg-yellow-200')
        }>
            {isOn ? <MoonIcon height={26} width={26} className="text-yellow-200" /> : <SunIcon height={26} width={26} className="text-yellow-500" />}
        </div>
    </button>
}