import { useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function DialogContainer({
    children,
    onClose,
    size = "md",
}: Readonly<{
    children: React.ReactNode,
    onClose: React.MouseEventHandler<HTMLElement>,
    size?: 'sm' | 'md' | 'lg'
}>) {


    useEffect(() => {
        const scollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scollbarWidth + "px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "";
        }
    }, []);

    return (
        <div
            className="overflow-auto bg-black/65 fixed top-0 w-full left-0 h-full z-50"
            onClick={onClose}>
            <div className={clsx(
                "bg-white dark:bg-dialog-background-dark my-20 m-auto relative rounded-md",
                size === 'sm' && "max-w-sm",
                size === 'md' && "max-w-md",
                size === 'lg' && "max-w-lg",
            )} onClick={e => e.stopPropagation()} >
                <button onClick={onClose} className="absolute top-0 right-0"><XMarkIcon height={20} width={20} /></button>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )

}