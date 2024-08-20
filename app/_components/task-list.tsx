'use client'
import { useEffect, useState } from "react";
import COMPLETEDDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task from "./task";





export default function TaskList({
    highlightedTaskId,
}: Readonly<{
    highlightedTaskId?: number | string
}>) {
    const [tasks, setTasks] = useState<TaskData[] | null>(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GET_USER_TASKS_PROXY_API)
            .then(rs => rs.json())
            .then(data => setTasks(data))
            .catch(err => console.log(err));
    }, []);


    const [showCOMPLETED, setShowCOMPLETED] = useState(true);

    if (tasks === null) {
        return "Loading tasks...";
    }

    const COMPLETEDTasks = tasks.filter(t => t.status === 'COMPLETED');
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
        <COMPLETEDDropMark numOfCompleted={COMPLETEDTasks.length} onClick={(e => setShowCOMPLETED(!showCOMPLETED))} status={showCOMPLETED ? "expanded" : "collapsed"} />
        {showCOMPLETED && COMPLETEDTasks.map(task => <Task onCheck={e => handleCheckTask(task)} status={task.status === "COMPLETED" ? 'checked' : 'unchecked'} key={task.id} name={task.name} />)}
    </div>
}