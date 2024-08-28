import { ArchiveBoxXMarkIcon, CheckIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Button from "./button";
import TextInput from "./text-input";
import { useState } from "react";

export default function EditTaskForm({ originName }: Readonly<{ originName: string }>) {

    const [newName, setNewName] = useState(originName);

    return <form className="flex w-full justify-between items-center gap-3">
        <TextInput
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onClearText={() => setNewName('')}
            className="outline-none border-none bg-transparent w-full text-white py-0.5 pl-0 shadow-none"
        />
        <Button className="bg-red-500 text-black" size="sm" ><ArchiveBoxXMarkIcon height={20} width={20} /></Button>
        <Button type="submit" className="bg-green-400" size="sm"><CheckIcon height={20} width={20} /></Button>
    </form>
}