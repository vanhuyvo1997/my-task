import LabelTextInput from "@/app/_components/label-text-input";
import Link from "next/link";
import AuthCommonForm from "../auth-common-form";

export default function RegisterPage() {
    return (
        <AuthCommonForm
            footerContent={<>or Already had an account? <Link className="text-blue-600" href="/login">Log in now.</Link></>}
            buttonContent="Register"
        >
            <LabelTextInput id="fistName" name="firstName" title="First name" placeholder="Your first name" />
            <LabelTextInput id="lastName" name="lastName" title="Last name" placeholder="Your last name" />
            <LabelTextInput id="email" type="email" name="email" title="Last email" placeholder="Your last name" />
            <LabelTextInput id="password" type="password" name="password" title="Password" placeholder="Your last name" />
            <LabelTextInput id="retypePassword" type="password" name="retypePassword" title="Re-type password" placeholder="Re-type password" />
        </AuthCommonForm>
    );
}