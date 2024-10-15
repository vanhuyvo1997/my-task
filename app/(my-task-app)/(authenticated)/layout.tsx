import UserProvider from "@/app/lib/provider/user-provider";


export default async function Layout({ children, modal }: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>) {
    return <UserProvider>
        {children}
        {modal}
    </UserProvider>
}