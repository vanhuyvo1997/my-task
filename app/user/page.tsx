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
    status: "COMPLETED" | "TO_DO",
    createdAt?: Date,
    COMPLETEDAt?: Date,
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

export default function UserPage() {
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });

    return <div>
        <AddTaskForm
            addingTaskFormState={addingTaskFormState}
            addTaskAction={addTaskAction}
        />
        <div className="mt-14">
            <TaskList highlightedTaskId={addingTaskFormState.createdTask?.id} />
        </div>
    </div>
}