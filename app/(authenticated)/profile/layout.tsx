import HeaderBar from "@/app/_components/layouts/header-bar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    if (!session) redirect("/");
    return <>
        <HeaderBar mode="full" />
        <div className="md:w-1/3 mx-auto mt-24 bg-task-background-light dark:bg-task-background-dark rounded-md">
            {children}
        </div>
    </>
}