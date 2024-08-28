'use client'
import { useContext, useState } from "react";
import CompletedDropMark from "./completed-drop-mark";
import { TaskData } from "../user/page";
import Task, { TaskStatus } from "./task";
import DeleteTaskDialog from "./dialog/delete-task-dialog";
import { TasksContext, TasksDispatchContext } from "../_context/tasks-context";
import { showNotification } from "../_lib/utils";


export default function TasksList({ highlightedTaskId }: Readonly<{ highlightedTaskId?: number | string }>) {

    const tasks = useContext(TasksContext);
    const dispatch = useContext(TasksDispatchContext);

    const [showCompleted, setShowCompleted] = useState(true);

    const [busyTaskIds, setBusyTaskIds] = useState<number[]>([]);

    //if there is no selected task to delete, the id is 0
    const [deletingTaskId, setDeletingTaskId] = useState(0);
    const isShowDeleteTaskConfirmDialog = deletingTaskId > 0;

    if (tasks.length === 0) {
        return <div className="w-fit m-auto mt-20 text-2xl text-gray-200">{"Let's add your first task now!"}</div>
    }

    const todoTasks = tasks.filter(t => t.status === 'TO_DO');

    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const showCompletedDropFlag = completedTasks.length > 0;

    async function toggleTaskStatus(task: TaskData) {

        setBusyTaskIds([...busyTaskIds, task.id]);

        const nextStatus = task.status === "COMPLETED" ? 'TO_DO' : 'COMPLETED';

        const url = process.env.NEXT_PUBLIC_CHANGE_TASK_STATUS_PROXY_API + `/${task.id}/status`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: nextStatus })
            });

            if (response.ok) {
                const updatedTask = await response.json();
                dispatch({
                    type: 'update',
                    task: updatedTask,
                });
            } else if (response.status === 404) {
                throw new Error('Task not found');
            } else {
                throw new Error('Somethings went went wrong');
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Task not found') {
                    showNotification('warning', 'Task not found');
                    dispatch({
                        type: 'delete',
                        taskId: task.id,
                    })
                } else {
                    showNotification('error', error.message);
                }
            }
        } finally {
            setBusyTaskIds(ids => ids.filter(id => id !== task.id));
        };
    }

    function convertTasks(tasks: TaskData[]) {
        return tasks.map(task => {

            let taskStatus: TaskStatus = (task.status === "COMPLETED" ? 'checked' : 'unchecked');

            if (busyTaskIds.includes(task.id)) {
                taskStatus = 'submitting';
            }

            return <Task
                key={task.id}
                onCheck={() => toggleTaskStatus(task)}
                status={taskStatus}
                name={task.name}
                highlighted={task.id === highlightedTaskId}
                onDelete={() => setDeletingTaskId(task.id)}
            />
        })
    }

    return <>
        <div className="flex flex-col gap-2">
            {
                convertTasks(todoTasks)
            }

            {
                showCompletedDropFlag && <CompletedDropMark
                    numOfCompleted={completedTasks.length}
                    onClick={(e => setShowCompleted(!showCompleted))}
                    status={showCompleted ? "expanded" : "collapsed"}
                />
            }

            {
                showCompleted && convertTasks(completedTasks)
            }
        </div>

        {
            isShowDeleteTaskConfirmDialog && <DeleteTaskDialog
                onConfirm={
                    async () => {

                        setBusyTaskIds([...busyTaskIds, deletingTaskId]);

                        setDeletingTaskId(0);

                        const url = process.env.NEXT_PUBLIC_DELETE_USER_TASKS_PROXY_API + '/' + deletingTaskId;

                        try {

                            const response = await fetch(url, {
                                method: 'DELETE'
                            });

                            if (response.status === 204) {
                                dispatch({
                                    type: "delete",
                                    taskId: deletingTaskId,
                                });
                                showNotification('success', 'The task has been removed successfully.');
                            } else if (response.status === 404) {
                                throw new Error('Task not found');
                            } else {
                                throw new Error('Somethings went wrong');
                            }

                        } catch (error) {

                            if (error instanceof Error) {
                                if (error.message === 'Task not found') {
                                    showNotification('warning', "The task doesn't exist.");
                                    dispatch({
                                        type: "delete",
                                        taskId: deletingTaskId,
                                    });
                                } else {
                                    showNotification('error', 'Something went wrong. Could delete task.');
                                }
                            }

                        } finally {
                            setBusyTaskIds(ids => ids.filter(id => id !== deletingTaskId));
                        }


                    }
                }
                onClose={() => { setDeletingTaskId(0) }}
            />
        }
    </>
}