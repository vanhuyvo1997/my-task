"use client"

import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { showNotification } from "@/app/lib/utils";
import TextInput from "../commons/text-inputs/text-input";
import { CreateTaskState, TaskData } from "@/app/lib/action/task-actions";
import TaskIcon, { IconStatus } from "../tasks/task-icon";
import clsx from "clsx";
import SubmitButton from "../commons/buttons/submit-button";


export default function AddTaskForm({
    addTaskAction,
    addingTaskFormState,
}: Readonly<{
    addTaskAction: (payload: FormData) => void,
    addingTaskFormState: CreateTaskState,
}>) {

    const nameInputRef = useRef<HTMLInputElement>(null);
    const [addingTaskName, setAddingTaskName] = useState('');
    const [addingTaskState, setAddingTaskState] = useState<"typing" | "submitting" | "normal">("normal");

    let iconStatus: IconStatus = findIconStatus();

    function findIconStatus() {
        if (addingTaskState === 'typing') {
            return 'unchecked';
        } else if (addingTaskState === 'submitting') {
            return 'busy';
        } else {
            return 'add'
        }
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
        className="flex gap-2 px-2 items-center bg-add-task-background-light dark:bg-add-task-background-dark
         rounded-md shadow-sm
         hover:bg-hover-background">
        <TaskIcon onClick={() => nameInputRef.current?.focus()} status={iconStatus} />
        {addingTaskName && <PrioritySelector onChange={() => nameInputRef.current?.focus()} />}
        <TextInput
            ref={nameInputRef}
            onFocus={e => setAddingTaskState("typing")}
            onBlur={e => setAddingTaskState('normal')}
            onChange={e => setAddingTaskName(e.target.value)}
            value={addingTaskName}
            onClearText={e => setAddingTaskName('')}
            className="bg-transparent outline-none shadow-none"
            placeholder={addingTaskState === "typing" ? '' : 'Add new task'}
            name="name"
        />
        {addingTaskName && <SubmitButton size="sm" className="bg-green-500">Create</SubmitButton>}
    </form>
}

function PrioritySelector({ onChange }: Readonly<{ onChange: () => void }>) {
    const [value, setValue] = useState<TaskData['priority']>("MEDIUM");
    return <select onChange={e => { setValue(e.target.value as TaskData['priority']); onChange() }}
        className={clsx(
            value === "HIGH" && 'bg-red-800',
            value === "MEDIUM" && "bg-green-800",
            value === "LOW" && "bg-purple-800",
        )} name="priority" value={value}>
        <option className="bg-red-800" value="HIGH">HIGH</option>
        <option className="bg-green-800" value="MEDIUM">MEDIUM</option>
        <option className="bg-purple-800" value="LOW">LOW</option>
    </select>;
}