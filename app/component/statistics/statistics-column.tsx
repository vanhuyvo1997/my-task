"use client"
import { PieChart } from "@mui/x-charts";
import Card from "./card";
import { ChartPieIcon } from "@heroicons/react/24/outline";


export type StatisticsDisplayData = {
    id: number | string,
    label: string,
    value: number,
}

export default function StatisticsColumn({ header, data }:
    Readonly<{
        header: React.ReactNode,
        data: StatisticsDisplayData[],
    }>) {

    const total = data.map(e => e.value).reduce((v1, v2) => v1 + v2, 0);

    return <div className="w-full border border-gray-300 p-1 shadow-lg rounded-sm flex flex-col gap-1">
        <div className="text-xl p-3 flex items-center gap-2">
            {header}
        </div>
        <div className="flex gap-3">
            {data.map(e => <Card key={e.id} title={e.label}>{e.value}</Card>)}
            <Card key="total" title="Total">
                {total}
            </Card>
        </div>
        <br />
        <div className="text-xl p-3 flex items-center gap-2">
            <span><ChartPieIcon className="h-6 w-6" /></span> Pie chart
        </div>
        {data.length >= 2 && <div className="h-60 py-6 w-full">
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `${(item.value * 100 / total).toFixed(2)}%`,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 0, additionalRadius: -10, color: 'gray' },
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '65%',
                        data: data,
                        innerRadius: 20,
                        outerRadius: 90,
                        paddingAngle: 2,
                        cornerRadius: 5,
                    }
                ]}
            />
        </div>}
    </div>
}