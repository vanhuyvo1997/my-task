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
    type = 'text',
    onClearText,
}: Readonly<LabelTextInputProps>) {
    return <div>
        <label htmlFor={id}>{title}</label><br />
        <TextInput
            placeholder={placeholder}
            className={className}
            id={id}
            value={value}
            onChange={onChange}
            onClearText={onClearText}
            type={type}
        />
    </div>
}