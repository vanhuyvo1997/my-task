import ChartThemeProviderWrapper from "@/app/lib/wrapper/chart-them-provider-wrapper";
import StatisticsColumn, { StatisticsDisplayData } from "../statistics/statistics-column";
import { getStatistics } from "@/app/lib/dal/statistics-dal";
import { UserGroupIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default async function StatisticsSectionContent() {
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

    return <div className="flex gap-2 flex-col lg:flex-row">
        <ChartThemeProviderWrapper>
            <StatisticsColumn
                header={<><span><UserGroupIcon className="h-6 w-6" /></span> Users</>}
                data={userStatisticsDisplayedData}
            />
            <StatisticsColumn
                header={<><span><ListBulletIcon className="h-6 w-6" /></span> Tasks</>}
                data={taskStatisticsDisplayedData}
            />
        </ChartThemeProviderWrapper>
    </div>
}