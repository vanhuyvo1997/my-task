import Image from 'next/image';
import Logo from '../_images/logo.png';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="mt-14 mx-auto max-w-screen-sm min-h-96 flex flex-col items-center gap-6">
            <Image src={Logo} alt='logo' priority />
            <h1 className='text-2xl'>Let&apos;s create an account</h1>
            <div className="bg-[#EFEFEF] md:rounded-lg shadow-lg w-full min-h-80 p-10">
                {children}
            </div>
        </div>
    )
}