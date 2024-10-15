import { auth } from "@/auth";

export type StatisticsData = {
    userStatistics: { totalUsers: number, enabledUsers: number, disabledUsers: number },
    taskStatistics: { totalTasks: number, todoTasks: number, completedTasks: number }
}

export async function getStatistics() {
    const session = await auth();
    if (!session || session.error === 'RefreshAccessTokenError' || session.user?.role !== "ADMIN") {
        throw new Error("PermissionDeniedError");
    }

    const response = await fetch(process.env.MY_TASK_STATISTICS_API, {
        headers: {
            "Authorization": "Bearer " + session.user?.accessToken,
        }
    });

    if (!response.ok) {
        throw new Error("Fail to fetch: " + response.status);
    }

    return await response.json() as StatisticsData;
}