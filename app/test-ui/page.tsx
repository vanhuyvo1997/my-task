"use client"
import { useState } from "react";
import Button from "../_components/button";
import TextInput from "../_components/text-input";
import LabelTextInput from "../_components/label-text-input";
import SubmitButton from "../_components/submit-button";
import TaskIcon from "../_components/task-icon";
import AddTaskPanel from "../_components/add-task-panel";

export default function TestUIPage() {

    const [changableValue, setChangableValue] = useState("");

    function handleClearText(e: React.MouseEvent<HTMLButtonElement>) {
        setChangableValue('');
    }

    function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
        setChangableValue(e.target.value);
    }

    return <div>
        <h1>Buttons</h1>
        <hr />
        <Button content="Button" size="sm" /><br />
        <Button content="Button" size="md" /><br />
        <Button content="Button" size="lg" /><br />
        <Button content="Button" className="bg-blue-500 text-white" />
        <Button content="Clickable Button" onClick={e => alert("you clicked!")} size="lg" />
        <br />
        <hr />
        <h1>Text input</h1>
        <br />
        <TextInput
            onClearText={handleClearText} onChange={handleChangeText} value={changableValue}
        />

        <TextInput

        />

        <br />
        <h1>Text input</h1>
        <br />
        <LabelTextInput onClearText={handleClearText} onChange={handleChangeText} value={changableValue} title="Label input" id="label-input-1" />
        <LabelTextInput
            onClearText={handleClearText} onChange={handleChangeText} value={changableValue}
            title="Label input with place holder"
            id="label-input-2"
            placeholder="this is place holder"
        />

        <LabelTextInput
            onClearText={handleClearText} onChange={handleChangeText} value={changableValue}
            title="Customed label input"
            id="label-input-3"
            placeholder="this is place holder"
            className="bg-orange-500 text-white placeholder-white"
        />

        <LabelTextInput
            title="Use state label input"
            id="label-input-4"
            placeholder="this is place holder"
            value={changableValue}
            onClearText={handleClearText} onChange={handleChangeText}
        />

        <LabelTextInput
            type="password"
            title="Password label in put field"
            id="label-input-4"
            placeholder="this is place holder"
            onClearText={handleClearText} onChange={handleChangeText} value={changableValue}
        />

        <br />
        <br />
        <h1>Submit button</h1>
        <br />
        <form action={async (data) => { await new Promise(resolve => setTimeout(resolve, 3000)); }}>
            <SubmitButton content="Submit button" />
        </form>
        <br /><br />
        <h1>Task icon</h1>
        <br />
        <div className="bg-gray-700">

            <TaskIcon state="add" />
            <TaskIcon state="checked" />
            <TaskIcon state="unchecked" />
        </div>

        <h1>Task </h1>
        <br />
        <div className="bg-gray-700">

            <AddTaskPanel />
            <AddTaskPanel />
        </div>

    </div>
}