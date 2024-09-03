
import BarsButton from "../buttons/bars-button";
import Image from "next/image";
import logo from "../../_images/logo.png";

export default function HeaderBar({
    toggleElementId
}: Readonly<{
    toggleElementId: string
}>) {
    return <div id="header-bar" className="p-2 fixed bg-white w-full flex items-center justify-between lg:justify-normal lg:block lg:px-4 z-50">
        <BarsButton toggleElementId={toggleElementId} />
        <Image src={logo} alt="logo" height={65} width={65} />
    </div>
}