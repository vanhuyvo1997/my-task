import StatisticsColumn, { StatisticsDisplayData } from "@/app/_components/statistics/statistics-column";
import { getStatistics } from "@/app/_dal/statistics-dal";
import ChartThemeProviderWrapper from "@/app/_wrapper/chart-them-provider-wrapper";
import { ListBulletIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default async function StatisticsPage() {
    const { userStatistics, taskStatistics } = await getStatistics();

    //Rename property to display
    const { disabledUsers: Disabled, enabledUsers: Active } = userStatistics;
    const { todoTasks: Todo, completedTasks: Complete } = taskStatistics;
    const renamedUserStatistics = { Active, Disabled };
    const renamedTaskStatistics = { Todo, Complete };

    function generateStatisticDisplayData(obj: { [key: string]: number }) {
        const result: StatisticsDisplayData[] = []
        for (const [key, value] of Object.entries(obj)) {
            result.push({ id: key, label: key, value: value });
        }
        return result;
    }

    const userStatisticsDisplayedData = generateStatisticDisplayData(renamedUserStatistics);
    const taskStatisticsDisplayedData = generateStatisticDisplayData(renamedTaskStatistics);

    return <div>
        <h1 className="text-2xl">Statistics</h1>
        <br />
        <div className="flex gap-2 flex-col md:flex-row">
            <ChartThemeProviderWrapper>
                <StatisticsColumn
                    header={<> <span><UserGroupIcon className="h-6 w-6" /></span> Users</>}
                    data={userStatisticsDisplayedData}
                />
                <StatisticsColumn
                    header={<><span><ListBulletIcon className="h-6 w-6" /></span> Tasks</>}
                    data={taskStatisticsDisplayedData}
                />
            </ChartThemeProviderWrapper>
        </div>
    </div>
}