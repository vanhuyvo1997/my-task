'use client'
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react"

export default function DarkModeSwitcher() {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (isOn) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isOn])

    function handleSwitch() {
        const nextIsOn = !isOn;
        if (nextIsOn) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setIsOn(nextIsOn);
    }

    return <button title="Toggle dark/light mode" onClick={handleSwitch} className="bg-gray-400 rounded-full w-[40px] h-[26px]">
        <div className={
            clsx("inline-block rounded-full", isOn ? 'float-right bg-green-500' : 'float-left bg-gray-500')
        }>
            {isOn ? <MoonIcon height={26} width={26} /> : <SunIcon height={26} width={26} />}
        </div>
    </button>
}