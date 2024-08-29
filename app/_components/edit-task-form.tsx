import { ArchiveBoxXMarkIcon, CheckIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TextInput from "./text-input";
import { useState } from "react";

export default function EditTaskForm({
    originName,
    onCancel,
}: Readonly<{
    originName: string,
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}>) {

    const [newName, setNewName] = useState(originName);

    return <form className="flex w-full justify-between items-center gap-3">
        <TextInput
            id="task-name"
            name="task-name"
            title="Task name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onClearText={() => setNewName('')}
            className="bg-transparent w-full text-white shadow-none outline-none border-none pt-0 pb-0"
        />
        <div className="flex justify-between gap-3">
            <Button onClick={onCancel} className="bg-red-500 text-black" size="sm" ><ArchiveBoxXMarkIcon height={20} width={20} /></Button>
            <Button type="submit" className="bg-green-400" size="sm"><CheckIcon height={20} width={20} /></Button>
        </div>
    </form>
}