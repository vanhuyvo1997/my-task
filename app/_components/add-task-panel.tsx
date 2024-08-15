import { useState } from "react"
import TaskIcon from "./task-icon"
import TextInput from "./text-input"

export default function AddTaskPanel({

}: Readonly<{

}>) {
    const [taskContent, setTaskContent] = useState('');
    const [currentState, setCurrentState] = useState<"adding" | "normal">("normal");


    return <div className="flex px-4 items-center">
        <TaskIcon state={currentState === 'adding' ? "unchecked" : "add"} />
        <TextInput
            onFocus={e => setCurrentState("adding")}
            onBlur={e => setCurrentState('normal')}
            onChange={e => setTaskContent(e.target.value)}
            value={taskContent}
            onClearText={e => setTaskContent('')}
            className="bg-transparent outline-none shadow-none text-white"
            placeholder={currentState === "adding" ? '' : 'Add new task'}
        />
    </div>
}