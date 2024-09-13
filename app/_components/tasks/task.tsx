import { TasksDispatchContext } from "@/app/_context/tasks-context";
import clsx from "clsx";
import { FormEvent, ForwardedRef, forwardRef, useContext, useState } from "react";
import TaskIcon, { IconStatus } from "./task-icon";
import { showNotification } from "@/app/_lib/utils";
import EditTaskForm from "../forms/edit-task-form";
import Button from "../buttons/button";
import DeleteTaskDialog from "../dialog/delete-task-dialog";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import { TaskData } from "@/app/_actions/task-actions";
import { TaskNameSchema } from "@/app/_lib/zod";


export const Task = forwardRef<HTMLDivElement, Readonly<TaskData & { highlighted: boolean }>>(TaskComponent);

type TaskUiStatus = 'normal' | 'submiting' | 'deleting' | 'editing';

function TaskComponent({ id, status, name, highlighted }: Readonly<TaskData & { highlighted: boolean }>, ref: ForwardedRef<HTMLDivElement>) {
    const taskDispatch = useContext(TasksDispatchContext);

    const [currentUiStatus, setCurrentUiStatus] = useState<TaskUiStatus>('normal');

    const isSubmiting = currentUiStatus === 'submiting';
    const isDeleting = currentUiStatus === 'deleting';
    const isEditing = currentUiStatus === 'editing';

    function changeToSubmiting() {
        setCurrentUiStatus('submiting');
    }

    function changeToEditing() {
        setCurrentUiStatus('editing');
    }

    function changeToDeleting() {
        setCurrentUiStatus('deleting');
    }

    function changeToNormal() {
        setCurrentUiStatus('normal');
    }

    function findTaskIconStatus(): IconStatus {
        if (isSubmiting) {
            return 'busy';
        }
        return status === 'COMPLETED' ? 'checked' : 'unchecked';
    }

    async function handleChangeTaskSatus() {
        changeToSubmiting();

        const nextStatus = status === "COMPLETED" ? 'TO_DO' : 'COMPLETED';

        const url = process.env.NEXT_PUBLIC_PROXY_TASKS_BASE_API + `/${id}/status`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify({ status: nextStatus })
            });
            if (response.status === 401) {
                signOut();
            } else if (response.ok) {
                const updatedTask = await response.json();
                taskDispatch({
                    type: 'updated',
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
                    taskDispatch({
                        type: 'deleted',
                        taskId: id,
                    })
                } else {
                    showNotification('error', error.message);
                }
            }
        } finally {
            changeToNormal();
        }
    }

    async function handleDeleteTask() {
        changeToSubmiting();

        const url = process.env.NEXT_PUBLIC_PROXY_TASKS_BASE_API + '/' + id;

        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.status === 401) {
                signOut();
            } else if (response.status === 204) {
                taskDispatch({
                    type: "deleted",
                    taskId: id,
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
                    taskDispatch({
                        type: "deleted",
                        taskId: id,
                    });
                } else {
                    showNotification('error', 'Something went wrong. Could delete task.');
                }
            }

        } finally {
            changeToNormal();
        }
    }

    async function handleChangeTaskName(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        changeToSubmiting();
        const fomrData = new FormData(e.currentTarget);
        const newName = fomrData.get('task-name');
        try {
            const validateResult = TaskNameSchema.safeParse(newName);
            if (!validateResult.success) {
                throw Error('TooLongTaskNameError');
            }
            const url = process.env.NEXT_PUBLIC_PROXY_TASKS_BASE_API + `/${id}/name`;
            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify({ name: newName })
            });

            if (response.status === 401) {
                signOut();
            } else if (response.ok) {
                const updatedTask = await response.json();
                taskDispatch({
                    type: "updated",
                    task: updatedTask,
                })
            } else if (response.status === 404) {
                throw Error('TaskNotFoundError');
            } else {
                throw Error('UnexpectedError');
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'TaskNotFoundError') {
                    showNotification('warning', 'Task not found');
                    taskDispatch({
                        type: 'deleted',
                        taskId: id,
                    });
                } else if (error.message === 'TooLongTaskNameError') {
                    showNotification("error", "Task name must bee less than 255 character.");
                } else {
                    showNotification('error', error.message);
                }
            }
        } finally {
            changeToNormal();
        }
    }

    return <>
        <div className={
            clsx(
                "bg-task-background-light hover:bg-hover-background dark:bg-task-background-dark rounded-md p-1 flex items-center justify-between gap-2 w-full",
                highlighted && "animate-pulse"
            )
        }
            ref={ref}
        >

            {isEditing ? <EditTaskForm onSubmit={handleChangeTaskName} onCancel={changeToNormal} originName={name} /> : <>
                <div className="flex items-center gap-2 w-[calc(100%-80px)]">
                    <TaskIcon className="shrink-0" onClick={handleChangeTaskSatus} status={findTaskIconStatus()} />
                    <span className="overflow-hidden text-ellipsis" title={name}>{name}</span>
                </div>
                <div className="flex">
                    <Button onClick={changeToEditing} disabled={isSubmiting} size="sm" ><PencilSquareIcon height={20} width={20} /></Button>
                    <Button onClick={changeToDeleting} disabled={isSubmiting} size="sm" ><TrashIcon height={20} width={20} /></Button>
                </div>
            </>}
        </div>
        {isDeleting && <DeleteTaskDialog
            onClose={changeToNormal}
            onConfirm={handleDeleteTask} />}
    </>
}