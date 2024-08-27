'use client'
import { useContext, useState } from "react";
import CompletedDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task, { TaskStatus } from "./task";
import DeleteTaskDialog from "./dialog/delete-task-dialog";
import { TasksContext, TasksDispatchContext } from "../_context/tasks-context";
import { showNotification } from "../_lib/utils";


export default function TaskList({
    highlightedTaskId,
}: Readonly<{
    highlightedTaskId?: number | string,
}>) {

    const tasks = useContext(TasksContext);
    const dispatch = useContext(TasksDispatchContext);

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
        setBusyTaskId(task.id)

        const nextStatus = task.status === "COMPLETED" ? 'TO_DO' : 'COMPLETED';

        fetch(process.env.NEXT_PUBLIC_CHANGE_TASK_STATUS_PROXY_API + `/${task.id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: nextStatus })
        }).then(rs => {
            if (rs.ok) {
                return rs.json();
            } else if (rs.status === 404) {
                throw new Error('Task not found');
            } else throw new Error('Somethings went went wrong');
        }).then(data => {
            dispatch({
                type: 'update',
                task: data
            });
        }).catch(err => {
            if (err.message === 'Task not found') {
                showNotification('warning', 'Task not found');
                dispatch({
                    type: 'delete',
                    taskId: task.id,
                })
            } else {
                showNotification('error', err.message);
            }
        }).finally(() => setBusyTaskId(0));
    }



    function showTasks(tasks: TaskData[]) {
        return tasks.map(task => {
            let taskStatus: TaskStatus = (task.status === "COMPLETED" ? 'checked' : 'unchecked');
            if (busyTaskId === task.id) {
                taskStatus = 'submitting';
            }

            return <Task
                key={task.id}
                onCheck={e => handleCheckTask(task)}
                status={taskStatus}
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