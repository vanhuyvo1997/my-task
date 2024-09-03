"use client"
import { useState } from "react";
import Button from "../_components/buttons/button";
import LabelTextInput from "../_components/text-inputs/label-text-input";
import TaskIcon from "../_components/tasks/task-icon";
import TextInput from "../_components/text-inputs/text-input";
import SubmitButton from "../_components/buttons/submit-button";

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
        <Button size="sm">Button</Button><br />
        <Button size="md">Button</Button><br />
        <Button size="lg">Button</Button><br />
        <Button className="bg-blue-500 text-white"></Button>
        <Button onClick={e => alert("you clicked!")} size="lg">Clickable Button</Button>
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
            <SubmitButton >Submit button</SubmitButton>
        </form>
        <br /><br />
        <h1>Task icon</h1>
        <br />
        <div className="bg-gray-700">

            <TaskIcon status="add" />
            <TaskIcon status="checked" />
            <TaskIcon status="unchecked" />
        </div>

        <h1>Task </h1>
        <br />
        <div className="bg-gray-700">

            {/* <AddTaskForm />
            <AddTaskForm /> */}
        </div>

    </div>
}