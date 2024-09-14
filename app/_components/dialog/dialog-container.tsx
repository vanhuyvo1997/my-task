import { useCallback, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function DialogContainer({
    children,
    onClose,
    size = "md",
}: Readonly<{
    children: React.ReactNode,
    onClose?: () => void,
    size?: 'sm' | 'md' | 'lg'
}>) {

    const handleKeyDown = useCallback((e: any) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            onClose && onClose();
        }
    }, [onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const scollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scollbarWidth + "px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "";
            removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);



    return (
        <div
            className="overflow-auto bg-[#888888]/50 backdrop-blur-sm fixed top-0 w-full left-0 h-full z-50"
            onClick={onClose}
            onKeyDown={handleKeyDown}
        >
            <div className={clsx(
                "bg-dialog-background-light dark:bg-dialog-background-dark my-20 m-auto relative rounded-md",
                size === 'sm' && "max-w-sm",
                size === 'md' && "max-w-md",
                size === 'lg' && "max-w-lg",
            )} onClick={e => e.stopPropagation()} >
                <button
                    title="Escape"
                    onClick={onClose}
                    className="absolute top-0 right-0">
                    <XMarkIcon height={20} width={20} />
                </button>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )

}