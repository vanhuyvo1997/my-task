'use client'
import { Dispatch, SetStateAction, useState } from "react";
import CompletedDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task from "./task";





export default function TaskList({
    highlightedTaskId,
    tasks,
    setTasks,
}: Readonly<{
    highlightedTaskId?: number | string,
    tasks: TaskData[] | null,
    setTasks: Dispatch<SetStateAction<TaskData[] | null>>,
}>) {



    const [showCompleted, setShowCompleted] = useState(true);

    if (tasks === null) {
        return "Loading tasks...";
    }

    if (tasks.length === 0) {
        return <div className="w-fit m-auto mt-20 text-2xl text-gray-200">{"Let's add your first task now!"}</div>
    }

    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const showCompletedDropFlag = completedTasks.length > 0;
    const todoTasks = tasks.filter(t => t.status === 'TO_DO');

    function handleCheckTask(task: TaskData) {
        const toggledTask: TaskData = { ...task, status: toggleStatus(task) };
        setTasks(
            tasks!.map(t => task.id === t.id ? toggledTask : t)
        );
    }

    function toggleStatus(task: TaskData) {
        return task.status === "COMPLETED" ? 'TO_DO' : 'COMPLETED';
    }

    return <div className="flex flex-col gap-2">
        {todoTasks.map(task => <Task onCheck={e => handleCheckTask(task)} status={task.status === "COMPLETED" ? 'checked' : 'unchecked'} key={task.id} name={task.name} />)}
        {showCompletedDropFlag && <CompletedDropMark numOfCompleted={completedTasks.length} onClick={(e => setShowCompleted(!showCompleted))} status={showCompleted ? "expanded" : "collapsed"} />}
        {showCompleted && completedTasks.map(task => <Task onCheck={e => handleCheckTask(task)} status={task.status === "COMPLETED" ? 'checked' : 'unchecked'} key={task.id} name={task.name} />)}
    </div>
}