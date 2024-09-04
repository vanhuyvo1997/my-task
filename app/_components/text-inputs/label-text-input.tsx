"use client"

import { forwardRef } from "react"
import TextInput, { CommonTextInputProps } from "./text-input"

type LabelTextInputProps = CommonTextInputProps & {
    title: string,
}

export const LabelTextInput = forwardRef<HTMLInputElement, Readonly<LabelTextInputProps>>(({
    id,
    value,
    name,
    title,
    className,
    placeholder,
    onChange,
    type = 'text',
    onClearText,
    tabIndex,
}, ref) => {
    return <div>
        <label htmlFor={id}>{title}</label><br />
        <TextInput
            ref={ref}
            placeholder={placeholder}
            className={className}
            id={id}
            value={value}
            onChange={onChange}
            onClearText={onClearText}
            type={type}
            name={name}
            tabIndex={tabIndex}
        />
    </div>
});

LabelTextInput.displayName = 'LabelTextInput';