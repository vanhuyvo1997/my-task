"use client"

import { TaskData } from "@/app/lib/action/task-actions";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"

type PriorityRadioValueType = TaskData['priority'] | "ALL";
const PRIORITY_RADIO_VALUES = new Set<PriorityRadioValueType>(["ALL", "HIGH", "MEDIUM", "LOW"]);

export default function PriorityFilterPanal() {
    const path = usePathname();
    const searchParam = useSearchParams();
    const { replace } = useRouter();
    const prevPrority = searchParam.get("priority") as PriorityRadioValueType;
    const [selectedValue, setSelectedValue] = useState<PriorityRadioValueType>(PRIORITY_RADIO_VALUES.has(prevPrority) ? prevPrority : "ALL");


    const handleSelect: React.ChangeEventHandler<HTMLInputElement> = e => {
        const newValue = e.target.value as PriorityRadioValueType;
        const urlParams = new URLSearchParams(searchParam);
        urlParams.set("priority", newValue);
        replace(path + '?' + urlParams.toString());
        setSelectedValue(newValue);
    }

    return <form>
        <p>Current priority:</p>
        <div className="border flex justify-between p-2 rounded-sm">
            <div>
                <input hidden id="ALL" onChange={handleSelect} defaultChecked={selectedValue === "ALL"} type="radio" name="priority" value="ALL" />
                <label className={clsx('px-2 py-1', selectedValue === "ALL" && "bg-white text-black")} htmlFor="ALL">ALL</label>
            </div>
            <div>
                <input hidden id="HIGH" onChange={handleSelect} defaultChecked={selectedValue === "HIGH"} type="radio" name="priority" value="HIGH" />
                <label className={clsx('px-2 py-1', selectedValue === "HIGH" && "bg-red-500 text-white")} htmlFor="HIGH">HIGH</label>
            </div>
            <div>
                <input hidden id="MEDIUM" onChange={handleSelect} defaultChecked={selectedValue === "MEDIUM"} type="radio" name="priority" value="MEDIUM" />
                <label className={clsx('px-2 py-1', selectedValue === "MEDIUM" && "bg-green-500 text-white")} htmlFor="MEDIUM">MEDIUM</label>
            </div>
            <div>
                <input hidden id="LOW" onChange={handleSelect} defaultChecked={selectedValue === "LOW"} type="radio" name="priority" value="LOW" />
                <label className={clsx('px-2 py-1', selectedValue === "LOW" && "bg-gray-500 text-white")} htmlFor="LOW">LOW</label>
            </div>
        </div>
    </form>
}