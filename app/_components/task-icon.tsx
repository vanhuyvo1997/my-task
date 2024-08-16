import Image from "next/image";
import clsx from "clsx";
import AddIcon from "../_images/add-Icon.png";

export default function TaskIcon({
    state,
    onClick,
}: Readonly<{
    state: 'add' | 'unchecked' | 'checked',
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}>) {

    return (
        <button

            onClick={onClick}

            className={clsx(
                'rounded-full h-6 w-6 relative p-0.5',
                (state === 'checked' || state == 'unchecked') && 'border-2 border-white',
                state === 'checked' && 'bg-green-500',
            )}
        >

            {
                state === 'checked' && <span className="h-3/4 w-1/2 absolute top-0 left-1/4 border-b-4 border-r-4 rotate-45"></span>
            }

            {
                state === 'add' && <Image src={AddIcon} alt="icon" className="w-full h-full" />
            }
        </button >
    );
}


