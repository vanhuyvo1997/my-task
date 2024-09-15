import SearchTasksProvider from "../../_provider/search-tasks-provider";

export default async function TasksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <SearchTasksProvider>
        {children}
    </SearchTasksProvider>
}