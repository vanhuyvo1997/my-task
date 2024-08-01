"use client"
import { useState } from "react";
import Button from "../_components/button";
import TextInput from "../_components/text-input";

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
        <TextInput value={changableValue} onChange={(e) => setChangableValue(e.target.value)} type="text" placeholder="Change by event" />
    </div>
}