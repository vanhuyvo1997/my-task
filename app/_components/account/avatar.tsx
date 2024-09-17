'use client'

import Image from 'next/image';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import avatar from '@/app/_images/logo-light.png';
import { useSession } from 'next-auth/react';
export default function Avatar({ diameter = '50' }: Readonly<{ diameter?: `${number}` }>) {

    return <div style={{ height: diameter + 'px', width: diameter + 'px' }}
        className={`border-solid border-2 border-orange-400 avatar-container relative overflow-hidden rounded-full bg-background-light dark:bg-background-dark`}>
        <Image alt="avatar" className='h-full w-auto' src={avatar} />
        <div className='edit-avatar-panel absolute top-0 left-0 w-full h-full hover:bg-slate-900/50 opacity-50' title='select another avatar'>
            <button
                className='w-full h-full p-[10%]'
                onClick={() => { document.getElementById('avatar-file-selector')?.click() }}>
                <PencilSquareIcon className='w-full h-full' />
            </button>
            <input id='avatar-file-selector' type='file' className='h-full w-full hidden' />
        </div>
    </div>
}