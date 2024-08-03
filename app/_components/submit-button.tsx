import { useFormStatus } from "react-dom";
import Button, { CommonButtonProps } from "./button";

export default function SubmitButton({ content, className, onClick }: Readonly<CommonButtonProps & { content: React.ReactNode }>) {

    const { pending } = useFormStatus();

    return <Button type="submit" disabled={pending} onClick={onClick} content={pending ? "Submitting..." : content} className={className} />
}