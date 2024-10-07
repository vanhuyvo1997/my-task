import StatisticsColumn from "@/app/_components/statistics/statistics-column";
import { ListBulletIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function StatisticsPage() {
    return <div>
        <h1 className="text-2xl">Statistics</h1>
        <br />
        <div className="flex gap-2 flex-col md:flex-row">
            <StatisticsColumn
                header={<> <span><UserGroupIcon className="h-6 w-6" /></span> Users</>}
                data={[
                    { id: "Active", label: "Active", value: 10 },
                    { id: "Disabled", label: "Disabled", value: 10 },
                ]}
            />
            <StatisticsColumn
                header={<><span><ListBulletIcon className="h-6 w-6" /></span> Tasks</>}
                data={[
                    { id: "Active", label: "Active", value: 10 },
                    { id: "Disabled", label: "Disabled", value: 10 },
                ]}
            />
        </div>
    </div>
}