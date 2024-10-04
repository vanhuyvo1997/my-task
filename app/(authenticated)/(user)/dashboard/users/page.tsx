import Pagination from "@/app/_components/user/pagination";
import UserRow from "@/app/_components/user/user-row";

export default function ManageUsersPage() {
    return <div>
        <h1 className="text-2xl">User Mangement</h1>
        <br />
        <div>
            <table className="border-collapse w-full text-left">
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
                    <UserRow />
                    <UserRow />
                    <UserRow />
                    <UserRow />
                    <UserRow />
                    <UserRow />
                    <UserRow />
                    <UserRow className="border-b-0" />
                </tbody>
            </table>
        </div>
        <div className="py-5">
            <Pagination />
        </div>
    </div>
}