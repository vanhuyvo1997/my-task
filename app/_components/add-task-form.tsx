"use client"
import { SetStateAction } from "react"
import TaskIcon from "./task-icon"
import TextInput from "./text-input"


type TaskState = "adding" | "normal";

export default function AddTaskForm({
    addingTaskName,
    setAddingTaskName,
    addingTaskState,
    setAddingTaskState,
    addTaskAction,
}
    : Readonly<{
        addingTaskName: string,
        setAddingTaskName: React.Dispatch<SetStateAction<string>>,
        addingTaskState: TaskState,
        setAddingTaskState: React.Dispatch<SetStateAction<TaskState>>,
        addTaskAction: (payload: FormData) => void
    }>) {





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
            name="taskName"
        />
    </form>
}