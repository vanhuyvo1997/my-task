import { useFormStatus } from "react-dom";
import PrimaryButton, { ButtonProps } from "./primary-button";

export default function SubmitButton({ children, className, onClick, size }: Readonly<ButtonProps>) {

    const { pending } = useFormStatus();

    return <PrimaryButton type="submit" size={size} disabled={pending} onClick={onClick} className={className} >
        {pending ? "Submitting..." : children}
    </PrimaryButton>
}