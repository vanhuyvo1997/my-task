import { ReactNode, } from "react";

export default async function ManageUserLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <div className="py-2">
        {children}
    </div>
}