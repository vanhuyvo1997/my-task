import { AvatarSkeleton } from "./account-info-skeleton";
import { TextSkeleton } from "./common-skeletons";

export default function ProfileSkeleton() {
    return <div className="animate-pulse py-4 px-4 rounded-md bg-[#888888]">
        <div className="py-4">
            <div className="w-fit h-fit mx-auto">
                <AvatarSkeleton diameter="200" />
            </div>
        </div>
        <div className="flex flex-col gap-5 mx-auto w-full items-center">
            <div className="w-1/2 text-center"><TextSkeleton className="h-8" /></div>
            <div className="w-5/6 p-2">
                <TextSkeleton className="h-6 my-1" />
                <TextSkeleton className="h-6 my-1" />
            </div>
        </div>
    </div>
}