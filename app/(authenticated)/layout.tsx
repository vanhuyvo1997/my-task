import UserPovider from "../_provider/user-provider";

export default async function Layout({ children, modal }: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>) {
    return <UserPovider>
        {children}
        {modal}
    </UserPovider>
}