"use client"

import clsx from 'clsx';

type ButtonProps = {
    content: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string,
    size?: 'sm' | 'md' | 'lg';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
    content,
    size = 'md',
    type = 'button',
    className,
    onClick,
}: Readonly<ButtonProps>) {
    return <button
        onClick={onClick}
        type={type}
        className={clsx(
            'hover:bg-gray-600 hover:text-white transition-colors',
            className,
            (size === 'sm') && 'shadow-sm text-sm rounded-sm px-2 py-1',
            (size === 'md') && 'shadow-md text-base rounded-md px-3 py-2',
            (size === 'lg') && 'shadow-lg text-lg rounded-lg px-4 py-2',
        )}
    >
        {content}
    </button>
}