import AccountInfo from "../account/account-info";
import BarsButton from "../buttons/bars-button";
import SideMenuWrapper from "./side-menu-wrapper";

export default async function SideMenu({ id, children }: Readonly<{ id: string, children?: React.ReactNode }>) {
    return <SideMenuWrapper id={id}>
        <div className="lg:hidden">
            <BarsButton toggleElementId={id} className="relative top-[1.5px]" />
        </div>
        <div className="flex flex-col gap-4 py-5 lg:py-0">
            <AccountInfo />
            <div>
                {children}
            </div>
        </div>
    </SideMenuWrapper>
}