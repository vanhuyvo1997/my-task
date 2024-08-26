'use client'
import { Dispatch, useState } from "react";
import CompletedDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task, { TaskStatus } from "./task";
import DeleteTaskDialog from "./dialog/delete-task-dialog";
import { TasksAction } from "../_reducers/tasks-reducer";


export default function TaskList({
    highlightedTaskId,
    tasks,
    dispatch,
}: Readonly<{
    highlightedTaskId?: number | string,
    tasks: TaskData[],
    dispatch: Dispatch<TasksAction>
}>) {
    const [showCompleted, setShowCompleted] = useState(true);

    //if there is no selected task to delete, the id is 0
    const [deletingTaskId, setDeletingTaskId] = useState(0);
    const isShowDeleteTaskConfirmDialog = deletingTaskId > 0;
    const [busyTaskId, setBusyTaskId] = useState(0);

    if (tasks.length === 0) {
        return <div className="w-fit m-auto mt-20 text-2xl text-gray-200">{"Let's add your first task now!"}</div>
    }

    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const showCompletedDropFlag = completedTasks.length > 0;
    const todoTasks = tasks.filter(t => t.status === 'TO_DO');

    function handleCheckTask(task: TaskData) {
        dispatch({
            type: 'check',
            taskId: task.id,
        })
    }



    function showTasks(tasks: TaskData[]) {
        return tasks.map(task => {
            let taskStatus: TaskStatus = (task.status === "COMPLETED" ? 'checked' : 'unchecked');
            if (busyTaskId === task.id) {
                taskStatus = 'submitting';
            }

            return <Task
                onCheck={e => handleCheckTask(task)}
                status={taskStatus}
                key={task.id}
                name={task.name}
                highlighted={task.id === highlightedTaskId}
                onDelete={() => handleShowDeletingConfirmDialog(task.id)}
            />
        })
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

        {isShowDeleteTaskConfirmDialog && <DeleteTaskDialog
            onClose={() => { setDeletingTaskId(0) }}
            deletingTaskId={deletingTaskId}
            beforeConfirm={() => setBusyTaskId(deletingTaskId)}
            afterDelete={() => setBusyTaskId(0)}
            afterConfirm={() => {
                setDeletingTaskId(0);
            }}
            deleteSuccess={() => {
                dispatch({
                    type: "delete",
                    taskId: deletingTaskId,
                });
            }}
        />}
    </div>
}