import Image from 'next/image';
import Logo from '../_images/logo.png';
import Link from 'next/link';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="mt-10 mx-auto max-w-screen-sm flex flex-col items-center gap-3">
            <Link href={'/'}><Image src={Logo} alt='logo' priority /></Link>
            <h1 className='text-2xl'>Let&apos;s create an account</h1>
            <div className="bg-[#a9a9a9] md:rounded-lg shadow-lg w-full p-10">
                {children}
            </div>
        </div>
    )
}