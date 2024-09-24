import { Metadata } from 'next';
import RegisterForm from '@/app/_components/forms/register-form';


export const metadata: Metadata = {
    title: "Register"
}

export default function RegisterPage() {
    return <RegisterForm />
}