import Button from "../_components/button";

export default function TestUIPage() {
    return <div>
        <h1>Buttons</h1>
        <hr />
        <Button content="Button" size="sm" /><br />
        <Button content="Button" size="md" /><br />
        <Button content="Button" size="lg" /><br />
        <Button content="Button" className="bg-blue-500 text-white" />
    </div>
}