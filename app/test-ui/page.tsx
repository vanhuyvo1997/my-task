"use client"
import { useState } from "react";
import Button from "../_components/button";
import TextInput from "../_components/text-input";
import LabelTextInput from "../_components/label-text-input";

export default function TestUIPage() {

    const [changableValue, setChangableValue] = useState("");

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

        <TextInput type="text" placeholder="this is text field" />
        <TextInput type="password" placeholder="this is pasword" />
        <TextInput className="bg-orange-200 text-green-400" type="text" placeholder="this is customed text field" />
        <TextInput value={changableValue} onChange={(val) => setChangableValue(val)} type="text" placeholder="Change by event" />
        <br />
        <h1>Text input</h1>
        <br />
        <LabelTextInput title="Label input" id="label-input-1" />
        <LabelTextInput
            title="Label input with place holder"
            id="label-input-2"
            placeholder="this is place holder"
        />

        <LabelTextInput
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
            onChange={setChangableValue}
        />

        <LabelTextInput
            type="password"
            title="Password label in put field"
            id="label-input-4"
            placeholder="this is place holder"
            value={changableValue}
            onChange={setChangableValue}
        />

    </div>
}