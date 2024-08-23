'use client'
import { Dispatch, SetStateAction, useState } from "react";
import CompletedDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task from "./task";
import ConfirmDialog from "./dialog/confirm-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeleteTaskDialog from "./dialog/delete-task-dialog";


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

    //if there is no selected task to delete, the id is 0
    const [deletingTaskId, setDeletingTaskId] = useState(0);
    const isShowDeleteTaskConfirmDialog = deletingTaskId > 0;

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

    function showTasks(tasks: TaskData[]) {
        return tasks.map(task => <Task
            onCheck={e => handleCheckTask(task)}
            status={task.status === "COMPLETED" ? 'checked' : 'unchecked'}
            key={task.id}
            name={task.name}
            highlighted={task.id === highlightedTaskId}
            onDelete={() => handleShowDeletingConfirmDialog(task.id)}
        />)
    }

    function handleShowDeletingConfirmDialog(taskId: number) {
        setDeletingTaskId(taskId);
    }

    return <div className="flex flex-col gap-2">
        {showTasks(todoTasks)}
        {
            showCompletedDropFlag && <CompletedDropMark
                numOfCompleted={completedTasks.length}
                onClick={(e => setShowCompleted(!showCompleted))}
                status={showCompleted ? "expanded" : "collapsed"}
            />
        }
        {showCompleted && showTasks(completedTasks)}
        {isShowDeleteTaskConfirmDialog && <DeleteTaskDialog onClose={_ => { setDeletingTaskId(0) }} />}
    </div>
}