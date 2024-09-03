import { useFormStatus } from "react-dom";
import Button, { CommonButtonProps } from "./button";

export default function SubmitButton({ children, className, onClick }: Readonly<CommonButtonProps>) {

    const { pending } = useFormStatus();

    return <Button type="submit" disabled={pending} onClick={onClick} className={className} >
        {pending ? "Submitting..." : children}
    </Button>
}