import Pagination from "@/app/_components/user/pagination";
import UserTable, { UserRowData } from "@/app/_components/user/user-table";
import { auth } from "@/auth";

export default async function ManageUserPage({ searchParams }: Readonly<{ searchParams: { page: number } }>) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError' || session.user?.role !== "ADMIN") {
        throw new Error("Permission denied");
    }
    const page = searchParams.page ?? 1;
    const response = await fetch(`http://localhost:8080/api/users?pageSize=8&pageNum=${page - 1}&sortDir=desc`,
        { headers: { "Authorization": "Bearer " + session.user.accessToken, } }
    );
    if (!response.ok) {
        throw new Error("Fail to fetch: " + response.status);
    }
    const data = await response.json();
    const rowsData = data.content as UserRowData[];

    return <div>
        <h1 className="text-2xl">User Mangement</h1>
        <br />
        <UserTable userRowsData={rowsData} />
        <div className="py-5">
            <Pagination totalPage={data.totalPages} />
        </div>
    </div>
}