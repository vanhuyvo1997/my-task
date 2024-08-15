"use client"

import clsx from 'clsx';

export type CommonButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode,
    title?: string,
}

type ButtonProps = CommonButtonProps & {
    type?: 'button' | 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({
    children,
    size = 'md',
    type = 'button',
    className,
    onClick,
    disabled,
    title,
}: Readonly<ButtonProps>) {
    return <button
        title={title}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={clsx(
            !disabled && 'hover:bg-gray-600 hover:text-white transition-colors',
            disabled && 'opacity-80',
            className,
            (size === 'sm') && 'shadow-sm text-sm rounded-sm px-2 py-1',
            (size === 'md') && 'shadow-md text-base rounded-md px-3 py-2',
            (size === 'lg') && 'shadow-lg text-lg rounded-lg px-4 py-2',
        )}
    >
        {children}
    </button>
}