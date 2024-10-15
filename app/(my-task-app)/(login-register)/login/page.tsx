import { Metadata } from "next";
import LoginForm from "@/app/component/forms/login-form";

export const metadata: Metadata = {
    title: "Login"
}

export default function LoginPage() {
    return <LoginForm />
}