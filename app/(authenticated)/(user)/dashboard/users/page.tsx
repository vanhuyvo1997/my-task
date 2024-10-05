import SearchBarV2 from "@/app/_components/text-inputs/search-bar-v2";
import Pagination from "@/app/_components/user/pagination";
import UserTable, { UserRowData } from "@/app/_components/user/user-table";
import { auth } from "@/auth";

export default async function ManageUserPage({ searchParams }: Readonly<{ searchParams: { page: number, query: string } }>) {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError' || session.user?.role !== "ADMIN") {
        throw new Error("Permission denied");
    }
    const page = searchParams.page ?? 1;
    const query = searchParams.query;
    const response = await fetch(`http://localhost:8080/api/users?pageSize=8&pageNum=${page - 1}&sortDir=desc${query ? "&query=" + query : ''}`,
        {
            headers: { "Authorization": "Bearer " + session.user.accessToken, },
        }
    );
    if (!response.ok) {
        throw new Error("Fail to fetch: " + response.status);
    }
    const data = await response.json();
    const rowsData = data.content as UserRowData[];

    return <div>
        <h1 className="text-2xl">User Mangement</h1>
        <br />
        <div className="md:relative">
            <SearchBarV2 className="md:absolute md:right-4 md:-top-16" />
        </div>
        <br />
        <UserTable userRowsData={rowsData} />
        <div className="py-5">
            <Pagination totalPage={data.totalPages} />
        </div>
    </div>
}