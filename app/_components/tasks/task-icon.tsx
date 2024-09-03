import Image from "next/image";
import clsx from "clsx";
import AddIcon from "../../_images/add-Icon.png";

export type IconStatus = 'add' | 'unchecked' | 'checked' | 'busy';

export default function TaskIcon({
    disabled,
    status,
    onClick,
    className,
}: Readonly<{
    status: IconStatus,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
}>) {

    const isDisabled = disabled || status === 'busy';

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isDisabled}
            className={clsx(
                'rounded-full h-6 w-6 relative p-0.5',
                status === 'busy' && 'animate-spin border-dotted border-[5px] border-t-emerald-200 border-r-lime-500 border-l-red-500',
                (status === 'checked' || status === 'unchecked') && 'border-2 border-white',
                status === 'checked' && 'bg-green-500',
                className,
            )}
        >

            {
                status === 'checked' && <span className="h-3/4 w-1/2 absolute top-0 left-1/4 border-b-4 border-r-4 rotate-45"></span>
            }

            {
                status === 'add' && <Image src={AddIcon} alt="icon" className="w-full h-full" />
            }
        </button >
    );
}


