'use client'
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react"

export default function DarkModeSwitcher() {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsOn(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsOn(false);
        }
    }, []);

    function handleSwitch() {
        const nextIsOn = !isOn;
        if (nextIsOn) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
        setIsOn(nextIsOn);
    }

    return <button title="Toggle dark/light mode" onClick={handleSwitch} className="bg-gray-400 rounded-full w-[40px] h-[26px]">
        <div className={
            clsx("inline-block rounded-full", isOn ? 'float-right bg-gray-800' : 'float-left bg-yellow-200')
        }>
            {isOn ? <MoonIcon height={26} width={26} className="text-yellow-200" /> : <SunIcon height={26} width={26} className="text-yellow-500" />}
        </div>
    </button>
}