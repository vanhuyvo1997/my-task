'use client'

import { LabelTextInput } from "@/app/_components/text-inputs/label-text-input";
import Link from "next/link";
import AuthCommonForm from "../auth-common-form";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { login, LoginFormState } from "@/app/_actions/auth-actions";
import { showNotification } from "@/app/_lib/utils";

const initialState: LoginFormState = { success: false, message: '' };

export default function LoginPage() {
    const [formData, setFormData] = useState<{ email?: string, password?: string }>({});
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [formStatus, action] = useFormState(login, initialState);

    function handleChangeFormData(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    function handleClearText(field: keyof typeof formData) {
        setFormData({
            ...formData,
            [field]: '',
        })
    }

    useEffect(() => {
        if (!formStatus.success && formStatus.message) {
            showNotification('error', formStatus.message);
        }
        emailInputRef.current?.focus();
    }, [formStatus]);

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    return (
        <AuthCommonForm
            footerContent={<>or <Link href="/register" className="text-blue-600">Create an new account</Link> now?</>}
            buttonContent="Login"
            action={action}
        >
            <LabelTextInput
                className="bg-text-input-background-light dark:bg-text-input-background-dark"
                id="email"
                type="email"
                name="email"
                title="Email"
                ref={emailInputRef}
                placeholder="Your email"
                value={formData.email}
                onChange={handleChangeFormData}
                onClearText={() => handleClearText('email')}
            />
            <LabelTextInput
                className="bg-text-input-background-light dark:bg-text-input-background-dark"
                id="password"
                type="password"
                name="password"
                title="Password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChangeFormData}
                onClearText={() => handleClearText('password')}
            />
        </AuthCommonForm>
    )
}