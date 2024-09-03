'use client'
import { useContext, useState } from "react";
import CompletedDropMark from "../buttons/completed-drop-mark";
import { TaskData } from "../../user/page";
import { TasksContext } from "../../_context/tasks-context";
import Task from "./task";
import clsx from "clsx";



export default function TasksList({ highlightedTaskId }: Readonly<{ highlightedTaskId?: number | string }>) {

    const tasks = useContext(TasksContext);

    const [showCompleted, setShowCompleted] = useState(true);

    if (tasks.length === 0) {
        return <div className="w-fit m-auto mt-20 text-2xl text-gray-200">{"Let's add your first task now!"}</div>
    }

    const todoTasks = tasks.filter(t => t.status === 'TO_DO');
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const showCompletedDropFlag = completedTasks.length > 0;

    function convertTaskDataToUI(tasks: TaskData[]) {
        return tasks.map(taskData => <Task key={taskData.id} {...taskData} highlighted={highlightedTaskId === taskData.id} />);
    }

    return <div className="flex flex-col gap-3 mb-20">
        {<div className="flex flex-col gap-2">{convertTaskDataToUI(todoTasks)}</div>}
        {showCompletedDropFlag && <CompletedDropMark
            numOfCompleted={completedTasks.length}
            onClick={(e => setShowCompleted(!showCompleted))}
            status={showCompleted ? "expanded" : "collapsed"}
        />}
        {<div className={clsx("flex flex-col gap-2", !showCompleted && 'hidden')}>{convertTaskDataToUI(completedTasks)}</div>}
    </div>

}


