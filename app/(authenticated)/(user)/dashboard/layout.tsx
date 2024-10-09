import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default async function ManageUserLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <div className="py-2">
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    </div>
}