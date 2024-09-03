import HeaderBar from "../_components/layouts/header-bar";

export default async function AuthenticatedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>
        <HeaderBar />
        {children}
    </>
}