'use client'
import { useState } from "react";
import CompletedDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task from "./task";





export default function TaskList({
    tasks,
    setTasks,
    highlightedTaskId,
}: Readonly<{
    tasks: readonly TaskData[],
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>,
    highlightedTaskId?: number | string
}>) {
    const [showCompleted, setShowCompleted] = useState(true);
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const todoTasks = tasks.filter(t => t.status === 'to_do');

    function handleCheckTask(task: TaskData) {
        const toggledTask: TaskData = { ...task, status: toggleStatus(task) };
        setTasks(
            tasks.map(t => task.id === t.id ? toggledTask : t)
        );
    }

    function toggleStatus(task: TaskData) {
        return task.status === "completed" ? 'to_do' : 'completed';
    }

    return <div className="flex flex-col gap-2">
        {todoTasks.map(task => <Task onCheck={e => handleCheckTask(task)} status={task.status === "completed" ? 'checked' : 'unchecked'} key={task.id} name={task.name} />)}
        <CompletedDropMark numOfCompleted={completedTasks.length} onClick={(e => setShowCompleted(!showCompleted))} status={showCompleted ? "expanded" : "collapsed"} />
        {showCompleted && completedTasks.map(task => <Task onCheck={e => handleCheckTask(task)} status={task.status === "completed" ? 'checked' : 'unchecked'} key={task.id} name={task.name} />)}
    </div>
}