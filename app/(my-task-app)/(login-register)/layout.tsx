import Logo from '@/app/component/commons/logo';
import Link from 'next/link';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="mt-10 mx-auto max-w-screen-sm flex flex-col items-center gap-3">
            <Link href={'/'}><Logo width={'100'} /></Link>
            <h1 className='text-2xl'>Let&apos;s create an account</h1>
            <div className="md:rounded-lg shadow-lg w-full p-10 bg-login-form-background-light dark:bg-login-form-background-dark">
                {children}
            </div>
        </div>
    )
}