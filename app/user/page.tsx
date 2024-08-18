"use client"
import { useEffect, useState } from "react";
import AddTaskForm from "../_components/add-task-form";
import TaskList from "../_components/task-list";
import { useFormState } from "react-dom";
import createTask from "../_actions/task-actions";
import { showNotification } from "../_lib/utils";

export type TaskData = {
    id: number,
    name: string,
    status: "completed" | "to_do"
    createdAt?: Date,
    doneAt?: Date,
    ownerId?: string
}


export type CreateTaskState = {
    success: boolean,
    message?: string,
    createdTask?: {
        id: string,
        title: string,
    }
}

const initialData: TaskData[] = [
    { id: 1, name: 'Task 1', status: "completed" },
    { id: 2, name: 'Task 2', status: "completed" },
    { id: 3, name: 'Task 3', status: "completed" },
    { id: 4, name: 'Task 4', status: "completed" },
    { id: 5, name: 'Task 5', status: "completed" },
    { id: 6, name: 'Task 6', status: "completed" },
    { id: 7, name: 'Task 7', status: "completed" },
    { id: 8, name: 'Task 8', status: "to_do" },
    { id: 9, name: 'Task 9', status: "to_do" },
    { id: 10, name: 'Task 10', status: "completed" },
    { id: 11, name: 'Task 11', status: "completed" },
    { id: 12, name: 'Task 12', status: "completed" },
]

export default function UserPage() {
    const [tasks, setTasks] = useState(initialData);
    const [addingTaskName, setAddingTaskName] = useState('');
    const [addingTaskState, setaddingTaskState] = useState<"adding" | "normal">("normal");
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });

    useEffect(() => {
        if (addingTaskFormState.success) {
            setAddingTaskName("");
            setaddingTaskState("normal");
            showNotification("success", "Add task success");
        } else if (addingTaskFormState.message) {
            showNotification("error", addingTaskFormState.message);
        }
    }, [addingTaskFormState]);

    useEffect(() => {


    }, []);


    return <div>
        <AddTaskForm
            addingTaskName={addingTaskName}
            setAddingTaskName={setAddingTaskName}
            addTaskAction={addTaskAction}
            addingTaskState={addingTaskState}
            setAddingTaskState={setaddingTaskState}
        />
        <div className="mt-14">
            <TaskList tasks={tasks} setTasks={setTasks} highlightedTaskId={addingTaskFormState.createdTask?.id} />
        </div>
    </div>
}