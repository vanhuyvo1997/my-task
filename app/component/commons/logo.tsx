'use client'

import { useDarkModeContext } from "@/app/lib/context/dark-mode-context";
import logo_dark from "@/app/image/logo-dark.png";
import logo_light from "@/app/image/logo-light.png";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
export default function Logo({ height, width }: Readonly<{ height?: number | `${number}` | undefined, width: number | `${number}` | undefined }>) {
    const isDarkMode = useDarkModeContext();
    const logo: StaticImageData = isDarkMode ? logo_dark : logo_light;
    return <Image src={logo} alt="logo" height={height} width={width} priority />
}