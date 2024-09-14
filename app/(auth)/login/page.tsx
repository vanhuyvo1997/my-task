'use client'

import { LabelTextInput } from "@/app/_components/text-inputs/label-text-input";
import Link from "next/link";
import AuthCommonForm from "../auth-common-form";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "@/app/_lib/utils";
import { signIn } from "next-auth/react";
import { LoginFormSchema } from "@/app/_lib/zod";
import { useSearchParams } from "next/navigation";




export default function LoginPage() {
    const [formData, setFormData] = useState<{ email?: string, password?: string }>({});
    const emailInputRef = useRef<HTMLInputElement>(null);
    const params = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (params.get('error') === 'CredentialsSignin' && params.get('code') === 'credentials') {
            setErrorMessage('Email or password is invalid');
        }
    }, [params])

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

    async function handleSignIn(signInData: typeof formData) {
        const validateResult = LoginFormSchema.safeParse({
            email: signInData.email,
            password: signInData.password,
        });

        if (!validateResult.success) {
            showNotification('error', 'Email or password is incorrect.');
            return;
        }
        await signIn('credentials', signInData);
    }

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    return (
        <AuthCommonForm
            footerContent={<>or <Link href="/register" className="text-blue-600">Create an new account</Link> now?</>}
            buttonContent="Login"
            action={async () => { await handleSignIn(formData); }}
        >
            <LabelTextInput
                className="bg-text-input-background-light dark:bg-text-input-background-dark"
                id="email"
                type="email"
                name="email"
                title="Email"
                ref={emailInputRef}
                placeholder="Your email"
                value={formData.email ?? ''}
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
                value={formData.password ?? ''}
                onChange={handleChangeFormData}
                onClearText={() => handleClearText('password')}
            />
            {errorMessage && <div aria-live='polite' className='text-red-500'>{errorMessage}</div>}
        </AuthCommonForm>
    )
}