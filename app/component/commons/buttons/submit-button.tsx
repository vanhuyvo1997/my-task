import { useFormStatus } from "react-dom";
import PrimaryButton, { CommonButtonProps } from "./primary-button";

export default function SubmitButton({ children, className, onClick }: Readonly<CommonButtonProps>) {

    const { pending } = useFormStatus();

    return <PrimaryButton type="submit" disabled={pending} onClick={onClick} className={className} >
        {pending ? "Submitting..." : children}
    </PrimaryButton>
}