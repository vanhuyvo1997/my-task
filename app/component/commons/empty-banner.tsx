"use client"

import EmptyBoxLight from '@/app/image/box-light.png';
import EmptyBoxDark from '@/app/image/box-dark.png';
import Image from "next/image";
import { useSearchQuery } from '@/app/lib/hook/useSearchQuery';
import { SearchQueryKey } from './text-inputs/search-bar';
import { useDarkModeContext } from '@/app/lib/context/dark-mode-context';


export default function EmptyBanner({ message = "Let's add your first task now!" }: Readonly<{ message?: string }>) {
    const searchTerm = useSearchQuery(SearchQueryKey);
    const isDarkMode = useDarkModeContext();
    return <div className="w-fit m-auto mt-20 text-2xl">
        <Image className="m-auto my-10" src={isDarkMode ? EmptyBoxDark : EmptyBoxLight} height={100} alt="empty box" />
        {!searchTerm ? <>{message}</> : <>This is no result matches &quot;<b>{searchTerm}</b>&quot;</>}
    </div>
}