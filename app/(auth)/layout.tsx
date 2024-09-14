import Link from 'next/link';
import Logo from '../_components/layouts/logo';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="mt-10 mx-auto max-w-screen-sm flex flex-col items-center gap-3">
            <Link href={'/'}><Logo width={'120'} /></Link>
            <h1 className='text-2xl'>Let&apos;s create an account</h1>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}