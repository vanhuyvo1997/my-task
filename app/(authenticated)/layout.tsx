import UserPovider from "../_provider/user-provider";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <UserPovider>
        {children}
    </UserPovider>
}