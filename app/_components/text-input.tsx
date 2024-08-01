"use client"


import clsx from "clsx"
import { ChangeEventHandler } from "react"

type TextInputProps = {
    value?: string,
    className?: string,
    type?: "text" | "password",
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    id?: string,
    name?: string,
}

export default function TextInput({
    value,
    type = "text",
    className,
    placeholder,
    onChange,
    id,
    name,
}: Readonly<TextInputProps>) {
    return <input
        id={id}
        name={name}
        className={clsx(
            className,
            'shadow-md rounded-md px-3 py-2 border-none',
        )}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder} />
}