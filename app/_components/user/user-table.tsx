import clsx from "clsx";
import UserRow from "./user-row";

export type UserRowData = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    avatarUrl: string,
    enabled: boolean,
    numOfCompleted: number,
    numOfTodo: number,
    totalTasks: number,
}

export default function UserTable({ userRowsData }: Readonly<{ userRowsData: UserRowData[] }>) {
    return <table className="border-collapse w-full text-left">
        <thead className="py-4">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Todo</th>
                <th>Done</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {userRowsData.map((userRowData, index) => <UserRow className={clsx(index === userRowsData.length - 1 && "border-b-0")} key={userRowData.id} data={userRowData} />)}
        </tbody>
    </table>
}