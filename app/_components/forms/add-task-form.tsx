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
        className="flex px-2 items-center bg-add-task-background-light dark:bg-add-task-background-dark
         rounded-md shadow-sm
         hover:bg-hover-background">
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