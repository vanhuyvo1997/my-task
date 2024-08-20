"use client"
import { useEffect, useState } from "react"
import TaskIcon from "./task-icon"
import TextInput from "./text-input"
import { CreateTaskState } from "../user/page";
import { showNotification } from "../_lib/utils";


type TaskState = "adding" | "normal";

export default function AddTaskForm({
    addTaskAction,
    addingTaskFormState,
}: Readonly<{
    addTaskAction: (payload: FormData) => void,
    addingTaskFormState: CreateTaskState,
}>) {


    const [addingTaskName, setAddingTaskName] = useState('');
    const [addingTaskState, setAddingTaskState] = useState<"adding" | "normal">("normal");

    useEffect(() => {
        if (addingTaskFormState.success) {
            setAddingTaskName("");
            setAddingTaskState("normal");
            showNotification("success", "Add task success");
        } else if (addingTaskFormState.message) {
            showNotification("error", addingTaskFormState.message);
        }
    }, [addingTaskFormState]);

    return <form action={addTaskAction} onSubmit={e => { if (!addingTaskName) { e.preventDefault() } }}
        className="flex px-2 items-center bg-[#414141] rounded-md shadow-sm fixed w-[95.5%] lg:w-[calc(100%-375px)] top-20 hover:opacity-70 z-40">
        <TaskIcon status={addingTaskState === 'adding' ? "unchecked" : "add"} />
        <TextInput
            onFocus={e => setAddingTaskState("adding")}
            onBlur={e => setAddingTaskState('normal')}
            onChange={e => setAddingTaskName(e.target.value)}
            value={addingTaskName}
            onClearText={e => setAddingTaskName('')}
            className="bg-transparent outline-none shadow-none text-white"
            placeholder={addingTaskState === "adding" ? '' : 'Add new task'}
            name="name"
        />
    </form>
}