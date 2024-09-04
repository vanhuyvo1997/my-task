"use client"
import { CreateTaskState } from "@/app/(authenticated)/tasks/page";
import { useEffect, useRef, useState } from "react"
import TaskIcon, { IconStatus } from "../tasks/task-icon";
import { showNotification } from "@/app/_lib/utils";
import TextInput from "../text-inputs/text-input";


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
        className="flex px-2 items-center bg-add-task-background-light dark:bg-add-task-background-dark rounded-md shadow-sm fixed w-[98%] right-[1%] 
         hover:bg-hover-background z-40 bottom-6 
         lg:w-[calc(100%-344px-2%)]  lg:top-20 lg:bottom-auto">
        <TaskIcon onClick={() => nameInputRef.current?.focus()} status={iconStatus} />
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
    </form>
}