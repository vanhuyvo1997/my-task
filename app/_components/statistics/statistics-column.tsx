import { PieChart } from "@mui/x-charts";
import Card from "./card";

export default function StatisticsColumn({ header, data }:
    Readonly<{
        header: React.ReactNode,
        data: {
            id: number | string,
            label: string,
            value: number,
        }[],
    }>) {
    return <div className="w-full border border-gray-300 p-1 shadow-lg rounded-sm flex flex-col gap-1">
        <div className="text-xl p-3 flex items-center gap-2">
            {header}
        </div>
        <div className="flex gap-3">
            {data.map(e => <Card key={e.id} title={e.label}>{e.value}</Card>)}
            <Card key="total" title="Total">
                {data.map(e => e.value).reduce((v1, v2) => v1 + v2, 0)}
            </Card>
        </div>
        {data.length >= 2 && <div className="h-48 py-5 w-full">
            <PieChart
                series={[
                    {
                        data: data
                    }
                ]}
            />
        </div>}
    </div>
}