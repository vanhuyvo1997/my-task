import Button from "../_components/button";

export default function AuthCommonForm({
    children,
    footerContent,
    buttonContent,
}: Readonly<{
    children: React.ReactNode,
    footerContent: React.ReactNode,
    buttonContent: string,
}>) {
    return (
        <form className=" flex flex-col items-stretch gap-14">
            <div className="flex flex-col gap-4">
                {children}
            </div>
            <Button content={buttonContent} type="submit" className="w-full bg-green-500" />
            <p className="text-center">{footerContent}</p>
        </form>
    );
}