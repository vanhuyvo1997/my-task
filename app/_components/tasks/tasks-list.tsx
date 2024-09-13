'use client'
import { useContext, useState } from "react";
import CompletedDropMark from "../buttons/completed-drop-mark";
import { TasksContext } from "../../_context/tasks-context";
import { Task } from "./task";
import clsx from "clsx";
import EmptyTasksBanner from "./empty-tasks-banner";
import { TaskData } from "@/app/_actions/task-actions";



export default function TasksList({ highlightedTaskId }: Readonly<{ highlightedTaskId?: number | string }>) {

    const tasks = useContext(TasksContext);

    const [showCompleted, setShowCompleted] = useState(true);

    if (tasks.length === 0) {
        return <EmptyTasksBanner />
    }

    const todoTasks = tasks.filter(t => t.status === 'TO_DO');
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const showCompletedDropFlag = completedTasks.length > 0;

    function convertTaskDataToUI(tasks: TaskData[]) {
        return tasks.map(taskData => <Task key={taskData.id} {...taskData} highlighted={highlightedTaskId === taskData.id} />);
    }

    return <div className="flex flex-col gap-3">
        {<div className="flex flex-col gap-2">{convertTaskDataToUI(todoTasks)}</div>}
        {showCompletedDropFlag && <CompletedDropMark
            numOfCompleted={completedTasks.length}
            onClick={(e => setShowCompleted(!showCompleted))}
            status={showCompleted ? "expanded" : "collapsed"}
        />}
        {<div className={clsx("flex flex-col gap-2", !showCompleted && 'hidden')}>{convertTaskDataToUI(completedTasks)}</div>}
    </div>

}


