"use client"

import TextInput from "./text-input"

type LabelTextInputProps = {
    id: string,
    onChange?: (val: string) => void,
    value?: string,
    title: string,
    className?: string,
    placeholder?: string,
    type?: 'password' | 'text',
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