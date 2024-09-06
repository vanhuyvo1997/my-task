import { useSearchTermContext } from "@/app/_context/search-tasks-context";
import EmptyBoxLight from '@/app/_images/box-light.png';
import EmptyBoxDark from '@/app/_images/box-dark.png';
import Image from "next/image";
import { useDarkModeContext } from "@/app/_context/dark-mode-context";

export default function EmptyTasksBanner() {
    const searchTerm = useSearchTermContext();
    const isDarkMode = useDarkModeContext();
    return <div className="w-fit m-auto mt-20 text-2xl">
        <Image className="m-auto my-10" src={isDarkMode ? EmptyBoxDark : EmptyBoxLight} height={100} alt="empty box" />
        {!searchTerm ? <>Let&apos;s add your first task now!</> : <>This is no result matches &quot;<b>{searchTerm}</b>&quot;</>}
    </div>
}