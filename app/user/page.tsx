"use client"
import { useEffect, useState } from "react";
import AddTaskForm from "../_components/add-task-form";
import TaskList from "../_components/task-list";
import { useFormState } from "react-dom";
import createTask from "../_actions/task-actions";

export type TaskData = {
    id: number,
    name: string,
    status: "COMPLETED" | "TO_DO",
    createdAt?: Date,
    COMPLETEDAt?: Date,
    ownerId?: string
}


export type CreateTaskState = {
    success: boolean,
    message?: string,
    createdTask?: TaskData
}

export default function UserPage() {
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });
    const [tasks, setTasks] = useState<TaskData[] | null>(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GET_USER_TASKS_PROXY_API)
            .then(rs => rs.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (addingTaskFormState.success) {
            setTasks(tasks => {
                const createdTask: TaskData = addingTaskFormState.createdTask!;
                const nextTasks = tasks ? [
                    createdTask,
                    ...tasks,
                ] : [createdTask]
                return nextTasks;
            });
        }
    }, [addingTaskFormState]);

    return <div>
        <AddTaskForm
            addingTaskFormState={addingTaskFormState}
            addTaskAction={addTaskAction}
        />
        <div className="mt-14">
            <TaskList tasks={tasks} setTasks={setTasks} highlightedTaskId={addingTaskFormState.createdTask?.id} />
        </div>
    </div>
}