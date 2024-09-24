import { Metadata } from "next";
import SearchTasksProvider from "../../../_provider/search-tasks-provider";

export const metadata: Metadata = {
    title: "Tasks"
}
export default async function TasksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <SearchTasksProvider>
        {children}
    </SearchTasksProvider>
}