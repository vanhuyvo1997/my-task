"use client"


import clsx from "clsx"
import { useState } from "react"
import { XMarkIcon } from '@heroicons/react/16/solid'
type TextInputProps = {
    value?: string,
    className?: string,
    type?: "text" | "password",
    placeholder?: string,
    onChange?: (val: string) => void,
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
    const [internalValue, setInternalValue] = useState(value);
    const isEmpty = !internalValue;


    return <div className="relative inline-block">
        <input
            id={id}
            name={name}
            className={clsx(
                className,
                'shadow-md rounded-md pl-3 pr-5 py-2 border-none',
            )}
            onChange={(e) => {
                if (onChange) {
                    onChange(e.target.value);
                }
                setInternalValue(e.target.value);

            }}
            type={type}
            value={internalValue}
            placeholder={placeholder}
        />
        {!isEmpty && <XMarkIcon
            title="clear"
            className="hover:transition-colors hover:text-black text-gray-500 absolute top-1/2 right-0.5 -translate-y-1/2"
            onClick={e => {
                if (onChange) {
                    onChange('');
                }
                setInternalValue('');
            }}
            height={20}
            width={20}
        />}
    </div>
}