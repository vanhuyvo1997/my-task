import { Metadata } from 'next';
import RegisterForm from '@/app/component/forms/register-form';


export const metadata: Metadata = {
    title: "Register"
}

export default function RegisterPage() {
    return <RegisterForm />
}