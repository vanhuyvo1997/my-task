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

    function handleChangeName(newName: string) {
        setAddingTaskName(newName);
        if (newName) {
            setAddingTaskState("typing");
        } else {
            setAddingTaskState("normal");
        }
    }

    useEffect(() => {
        if (addingTaskFormState.success) {
            handleChangeName("");
            nameInputRef.current?.focus();
        } else if (addingTaskFormState.message) {
            showNotification("error", addingTaskFormState.message);
            setAddingTaskState("normal");
        }
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
        {addingTaskState === "typing" && <PrioritySelector defaultValue="MEDIUM" />}
        <TextInput
            ref={nameInputRef}
            onChange={e => handleChangeName(e.target.value)}
            value={addingTaskName}
            onClearText={e => handleChangeName('')}
            className="bg-transparent outline-none shadow-none"
            placeholder={addingTaskState === "typing" ? '' : 'Add new task'}
            name="name"
        />
        {addingTaskState === "typing" && <SubmitButton size="sm" className="bg-green-500">Create</SubmitButton>}
    </form>
}

export function PrioritySelector({ defaultValue, onSelect }: Readonly<{ defaultValue: TaskData["priority"], onSelect?: (p: TaskData["priority"]) => void }>) {
    const [value, setValue] = useState<TaskData['priority']>(defaultValue);

    const handleChangeOption: ChangeEventHandler<HTMLSelectElement> = e => {
        const newOption = e.target.value as TaskData['priority'];
        setValue(e.target.value as TaskData['priority']);
        onSelect && onSelect(newOption);
    }

    return <select onChange={handleChangeOption}
        className={clsx(
            value === "HIGH" && 'bg-red-500',
            value === "MEDIUM" && "bg-green-500",
            value === "LOW" && "bg-gray-500",
        )} name="priority" value={value}>
        <option className="text-red-500 bg-white" value="HIGH">HIGH</option>
        <option className="text-green-500 bg-white" value="MEDIUM">MEDIUM</option>
        <option className="text-gray-500 bg-white" value="LOW">LOW</option>
    </select>;
}