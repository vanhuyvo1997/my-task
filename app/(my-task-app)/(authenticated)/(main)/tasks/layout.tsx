import StoreProvider from "@/app/lib/provider/store-provider";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Tasks"
}
export default async function TasksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <StoreProvider>
        {children}
    </StoreProvider>;
}