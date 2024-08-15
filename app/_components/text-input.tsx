"use client"


import clsx from "clsx"
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState } from "react"
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { CommonButtonProps } from "./button"

export type CommonTextInputProps = {
    id?: string,
    name?: string,
    value?: string,
    className?: string,
    type?: "text" | "password" | "email",
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClearText?: MouseEventHandler<HTMLButtonElement>,
    onFocus?: FocusEventHandler<HTMLInputElement>,
    onBlur?: FocusEventHandler<HTMLInputElement>,
}


type TextInputProps = CommonTextInputProps;

export default function TextInput({
    value,
    type = "text",
    className,
    placeholder,
    onChange,
    onClearText,
    id,
    name,
    onFocus,
    onBlur,
}: Readonly<TextInputProps>) {
    const isPassword = type === "password";
    const [internalType, setInternalType] = useState(type);
    const isShowPossword = internalType === "text";
    const isEmpty = !value;

    return <div className="relative w-full">
        <input
            id={id}
            name={name}
            className={clsx(
                className,
                isPassword ? 'pr-12' : 'pr-5',
                'shadow-md rounded-md pl-3 py-2 border-none w-full',
            )}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            type={internalType}
            value={value}
            placeholder={placeholder}
        />
        {!isEmpty && <ClearButton
            onClick={onClearText}
            className={clsx(
                'hover:transition-colors hover:text-black text-gray-500 absolute top-1/2 right-0.5 -translate-y-1/2',
                isPassword && 'right-7'
            )}

        />}
        {isPassword && <ShowPasswordButton
            onClick={() => { setInternalType(isShowPossword ? "password" : "text") }}
            isCloseEye={!isShowPossword}
            className="top-1/2 -translate-y-1/2 absolute right-2"
        />}
    </div>
}


type ClearButtonProps = CommonButtonProps;

function ClearButton({ onClick, className }: Readonly<ClearButtonProps>) {
    return <button
        title="clear"
        className={className}
        onClick={onClick}
        type="button"
    >
        <XMarkIcon
            height={20}
            width={20}
        />
    </button>
}




type ShowPasswordButtonProps = CommonButtonProps & {
    isCloseEye?: boolean,
}
function ShowPasswordButton({
    onClick,
    isCloseEye = true,
    className,
}: Readonly<ShowPasswordButtonProps>) {

    return <button
        title={isCloseEye ? "show" : "hide"}
        onClick={onClick}
        type="button"
        className={className}
    >
        {!isCloseEye ? <EyeIcon height={20} width={20} /> : <EyeSlashIcon height={20} width={20} />}

    </button>

}