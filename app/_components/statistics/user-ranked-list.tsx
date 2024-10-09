import { getTopActiveUser } from "@/app/_dal/users-dal";
import Avatar from "../account/avatar";

export default async function UserRankedList() {
    const rankedList = await getTopActiveUser(5);

    return <div className="w-full flex flex-col gap-1  border shadow-md">
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
                {rankedList.map((u, index) => <tr className="text-lg hover:bg-hover-background border" key={u.id}>
                    <td className="font-semibold">{`#${(index + 1)}`}</td>
                    <td className="flex items-center gap-7 font-medium text-left"><span><Avatar selectable={false} diameter="50" avatarUrl={u.avatarUrl} /></span><span>{u.lastName + " " + u.firstName}</span></td>
                    <td>{u.numOfTodo}</td>
                    <td>{u.numOfCompleted}</td>
                    <td>{u.totalTasks}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}