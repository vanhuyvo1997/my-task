import { AvatarSkeleton } from "./account-info-skeleton"
import { TextSkeleton } from "./common-skeletons"

export default function UserRankedListSkeleton() {
    return <div className="w-full flex flex-col gap-1 border shadow-md animate-pulse">
        <table className="text-center">
            <colgroup>
                <col width={"10%"} />
                <col width={"45%"} />
                <col width={"15%"} />
                <col width={"15%"} />
                <col width={"15%"} />
            </colgroup>
            <thead className="bg-gray-200 dark:bg-gray-700">
                <tr className="text-lg ">
                    <th>TOP</th>
                    <th>Name</th>
                    <th>Todo</th>
                    <th>Complete</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <UserReankedListItemSkeleton index={1} />
                <UserReankedListItemSkeleton index={2} />
                <UserReankedListItemSkeleton index={3} />
                <UserReankedListItemSkeleton index={4} />
                <UserReankedListItemSkeleton index={5} />
            </tbody>
        </table>
    </div>
}


function UserReankedListItemSkeleton({ index }: Readonly<{ index: number }>) {
    return <tr className="border" >
        <td className="font-semibold">{`#${index}`}</td>
        <td className="flex items-center gap-7 font-medium"><span><AvatarSkeleton diameter="50" /></span><TextSkeleton className="h-7" /></td>
        <td><TextSkeleton className="h-7" /></td>
        <td><TextSkeleton className="h-7" /></td>
        <td><TextSkeleton className="h-7" /></td>
    </tr>
}