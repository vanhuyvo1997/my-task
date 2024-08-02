"use client"

import TextInput, { CommonTextInputProps } from "./text-input"

type LabelTextInputProps = CommonTextInputProps & {
    title: string,
}

export default function LabelTextInput({
    id,
    value,
    title,
    className,
    placeholder,
    onChange,
    type = 'text'
}: Readonly<LabelTextInputProps>) {
    return <div>
        <label htmlFor={id}><small>{title}</small></label><br />
        <TextInput
            placeholder={placeholder}
            className={className}
            id={id}
            value={value}
            onChange={onChange}
            type={type}
        />
    </div>
}