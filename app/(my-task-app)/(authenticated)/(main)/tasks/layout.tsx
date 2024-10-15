import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Tasks"
}
export default async function TasksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}