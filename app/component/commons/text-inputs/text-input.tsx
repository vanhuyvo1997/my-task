"use client"

import clsx from "clsx"
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState, forwardRef } from "react"
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useFormStatus } from "react-dom"
import { CommonButtonProps } from "../buttons/primary-button"


export type CommonTextInputProps = {
    id?: string,
    name?: string,
    value: string,
    defaultValue?: string,
    className?: string,
    type?: "text" | "password" | "email",
    placeholder?: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onClearText: MouseEventHandler<HTMLButtonElement>,
    onFocus?: FocusEventHandler<HTMLInputElement>,
    onBlur?: FocusEventHandler<HTMLInputElement>,
    disabled?: boolean,
    title?: string,
    tabIndex?: number,
}


type TextInputProps = CommonTextInputProps;



const TextInput = forwardRef<HTMLInputElement, Readonly<TextInputProps>>(({
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
    defaultValue,
    disabled,
    title,
    tabIndex,
}, ref) => {
    const isPassword = type === "password";
    const [internalType, setInternalType] = useState(type);
    const isShowPossword = internalType === "text";
    const isEmpty = !value;
    const { pending } = useFormStatus();

    const isDisabled = pending || disabled;

    return <div className="relative w-full">
        <input
            ref={ref}
            id={id}
            name={name}
            className={clsx(
                isPassword ? 'pr-12' : 'pr-5',
                'shadow-md rounded-md pl-3 py-1.5 border-none w-full disabled:opacity-60',
                className,
            )}
            disabled={isDisabled}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            type={internalType}
            value={typeof value !== 'string' ? '' : value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            title={title}
            tabIndex={tabIndex}
            autoComplete="off"
        />
        {!isDisabled && !isEmpty && <ClearButton
            disabled={isDisabled}
            onClick={e => {
                onClearText && onClearText(e);
                const input = e.currentTarget.previousElementSibling;
                if (input && input.tagName === 'INPUT') {
                    (input as HTMLInputElement).focus();
                }
            }}
            className={clsx(
                'hover:transition-colors hover:text-black absolute top-1/2 right-0.5 -translate-y-1/2',
                isPassword && 'right-7'
            )}

        />}
        {isPassword && <ShowPasswordButton
            disabled={isDisabled}
            onClick={() => { setInternalType(isShowPossword ? "password" : "text") }}
            isCloseEye={!isShowPossword}
            className="top-1/2 -translate-y-1/2 absolute right-2"
        />}
    </div>
});

TextInput.displayName = 'TextInput';
export default TextInput;


type ClearButtonProps = CommonButtonProps;

function ClearButton({ onClick, className, disabled }: Readonly<ClearButtonProps>) {
    return <button
        title="clear"
        className={className}
        onClick={onClick}
        type="button"
        disabled={disabled}
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
    disabled,
}: Readonly<ShowPasswordButtonProps>) {

    return <button
        title={isCloseEye ? "show" : "hide"}
        onClick={onClick}
        type="button"
        className={className}
        disabled={disabled}
    >
        {!isCloseEye ? <EyeIcon height={20} width={20} /> : <EyeSlashIcon height={20} width={20} />}

    </button>

}