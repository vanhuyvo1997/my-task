import { TaskData } from "@/app/lib/action/task-actions"
import clsx from "clsx"
export default function PriorityDot({ priority, diameter = 10 }: Readonly<{ priority: TaskData['priority'], diameter?: number }>) {
    return <span style={{ height: diameter + 'px', width: diameter + 'px' }} className={clsx(
        "rounded-full border shadow-sm",
        priority === "HIGH" && "bg-red-800",
        priority === "MEDIUM" && "bg-green-800",
        priority === "LOW" && "bg-purple-800"
    )}>
    </span>
}