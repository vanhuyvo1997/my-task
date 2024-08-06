import LabelTextInput from "@/app/_components/label-text-input";
import Link from "next/link";
import AuthCommonForm from "../auth-common-form";

export default function LoginPage() {
    return (
        <AuthCommonForm
            footerContent={<>or <Link href="/register" className="text-blue-600">Create an new account</Link> now?</>}
            buttonContent="Login"
        >
            <LabelTextInput id="email" type="email" name="email" title="Last email" placeholder="Your last name" />
            <LabelTextInput id="password" type="password" name="password" title="Password" placeholder="Your last name" />
        </AuthCommonForm>
    )
}