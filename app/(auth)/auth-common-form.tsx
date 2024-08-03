'use client'
import SubmitButton from "../_components/submit-button";

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
            className=" flex flex-col items-stretch gap-14"
            action={action}
        >
            <div className="flex flex-col gap-3">
                {children}
            </div>
            <SubmitButton content={buttonContent} className="w-full bg-green-500" />
            <p className="text-center">{footerContent}</p>
        </form>
    );
}