'use client'

import { useContext, useState } from "react";
import CompletedDropButton from "../commons/buttons/completed-drop-button";
import clsx from "clsx";
import { TasksContext } from "@/app/lib/context/tasks-context";
import { TaskData } from "@/app/lib/action/task-actions";
import EmptyBanner from "../commons/empty-banner";
import { Task } from "./task";

export default function TasksList({ highlightedTaskId }: Readonly<{ highlightedTaskId?: number | string }>) {

    const tasks = useContext(TasksContext);

    const [showCompleted, setShowCompleted] = useState(true);

    if (tasks.length === 0) {
        return <EmptyBanner />
    }

    const todoTasks = tasks.filter(t => t.status === 'TO_DO');
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const showCompletedDropFlag = completedTasks.length > 0;

    function convertTaskDataToUI(tasks: TaskData[]) {
        return tasks.map(taskData => <Task key={taskData.id} {...taskData} highlighted={highlightedTaskId === taskData.id} />);
    }

    return <div className="flex flex-col gap-3">
        {<div className="flex flex-col gap-2">{convertTaskDataToUI(todoTasks)}</div>}
        {showCompletedDropFlag && <CompletedDropButton
            numOfCompleted={completedTasks.length}
            onClick={(e => setShowCompleted(!showCompleted))}
            status={showCompleted ? "expanded" : "collapsed"}
        />}
        {<div className={clsx("flex flex-col gap-2", !showCompleted && 'hidden')}>{convertTaskDataToUI(completedTasks)}</div>}
    </div>

}


