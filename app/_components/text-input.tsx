"use client"


import clsx from "clsx"
import { useState } from "react"
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { CommonButtonProps } from "./button"

export type CommonTextInputProps = {
    id?: string,
    name?: string,
    value?: string,
    className?: string,
    type?: "text" | "password",
    placeholder?: string,
    onChange?: (val: string) => void,
}


type TextInputProps = CommonTextInputProps;

export default function TextInput({
    value,
    type = "text",
    className,
    placeholder,
    onChange,
    id,
    name,
}: Readonly<TextInputProps>) {
    const [internalValue, setInternalValue] = useState(value);
    const [internalType, setInternalType] = useState(type);
    const isEmpty = !internalValue;
    const isPassword = type === "password";
    const isShowPossword = internalType === "text";

    return <div className="relative inline-block">
        <input
            id={id}
            name={name}
            className={clsx(
                className,
                'shadow-md rounded-md pl-3 pr-5 py-2 border-none',
                isPassword && 'pr-12'
            )}
            onChange={(e) => {
                if (onChange) {
                    onChange(e.target.value);
                }
                setInternalValue(e.target.value);

            }}
            type={internalType}
            value={internalValue}
            placeholder={placeholder}
        />
        {!isEmpty && <ClearButton
            onClick={e => {
                if (onChange) {
                    onChange('');
                }
                setInternalValue('');
            }}
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