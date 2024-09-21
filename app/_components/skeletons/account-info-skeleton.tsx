import { ButtonSkeleton, TextSkeleton } from "./common-skeletons"

export default function AccountInfoSkeleton() {
    return <div className="animate-pulse  w-full bg-account-info-background-light dark:bg-account-info-background-dark
    rounded-md px-2 py-4 shadow-sm flex items-center justify-between">
        <AvatarSkeleton diameter="50" />
        <div className="w-[220px]">
            <TextSkeleton className="h-5" />
            <TextSkeleton className="mt-2" />
        </div>
        <ButtonSkeleton className="h-7 w-9 mx-0" />
    </div>
}

export function AvatarSkeleton({ diameter = '50' }: Readonly<{ diameter?: `${number}` }>) {
    return <div style={{ height: diameter + 'px', width: diameter + 'px' }} className="border-solid border-2 border-transparent relative overflow-hidden rounded-full bg-background-light dark:bg-background-dark">
        <div className="bg-gray-200 absolute top-0 left-0 w-full h-full rounded-full"></div>
    </div>
}