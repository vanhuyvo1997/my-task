'use client'

import SubmitButton from "../_components/buttons/submit-button";

export default function AuthCommonForm({
    children,
    footerContent,
    buttonContent,
    action,
}: Readonly<{
    children: React.ReactNode,
    footerContent: React.ReactNode,
    buttonContent: string,
    action?: (formData: FormData) => void
}>) {
    return (
        <form
            className="flex flex-col items-stretch gap-8
             bg-login-form-background-light dark:bg-login-form-background-dark 
              p-3 md:p-5 lg:p-7 rounded-md shadow-lg"
            action={action}
        >
            <div className="flex flex-col gap-3">
                {children}
            </div>
            <SubmitButton className="w-full bg-green-500">{buttonContent}</SubmitButton>
            <p className="text-center">{footerContent}</p>
        </form>
    );
}