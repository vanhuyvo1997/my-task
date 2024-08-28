"use client"
import { useEffect, useState } from "react"
import TaskIcon, { IconStatus } from "./task-icon"
import TextInput from "./text-input"
import { CreateTaskState } from "../user/page";
import { showNotification } from "../_lib/utils";

export default function AddTaskForm({
    addTaskAction,
    addingTaskFormState,
}: Readonly<{
    addTaskAction: (payload: FormData) => void,
    addingTaskFormState: CreateTaskState,
}>) {


    const [addingTaskName, setAddingTaskName] = useState('');
    const [addingTaskState, setAddingTaskState] = useState<"typing" | "submitting" | "normal">("normal");

    let iconStatus: IconStatus;
    if (addingTaskState === 'typing') {
        iconStatus = 'unchecked';
    } else if (addingTaskState === 'submitting') {
        iconStatus = 'busy';
    } else {
        iconStatus = 'add'
    }

    useEffect(() => {
        if (addingTaskFormState.success) {
            setAddingTaskName("");
        } else if (addingTaskFormState.message) {
            showNotification("error", addingTaskFormState.message);
        }
        setAddingTaskState("normal");
    }, [addingTaskFormState]);

    return <form
        action={addTaskAction}
        onSubmit={e => {
            if (!addingTaskName) {
                e.preventDefault();
            } else {
                setAddingTaskState('submitting');
            }
        }}
        className="flex px-2 items-center bg-[#414141] rounded-md shadow-sm fixed w-[95.5%] lg:w-[calc(100%-375px)] top-20 hover:opacity-70 z-40">
        <TaskIcon status={iconStatus} />
        <TextInput
            onFocus={e => setAddingTaskState("typing")}
            onBlur={e => setAddingTaskState('normal')}
            onChange={e => setAddingTaskName(e.target.value)}
            value={addingTaskName}
            onClearText={e => setAddingTaskName('')}
            className="bg-transparent outline-none shadow-none text-white"
            placeholder={addingTaskState === "typing" ? '' : 'Add new task'}
            name="name"
        />
    </form>
}