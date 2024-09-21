'use client'

import Image from 'next/image';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import clsx from 'clsx';
import { showNotification } from '@/app/_lib/utils';
import defaultAvatar from "@/app/_images/logo-light.png";
import { useRefreshUserContext } from '@/app/_context/user-context';

export default function Avatar({ diameter = '50', avatarUrl }: Readonly<{ diameter?: `${number}`, avatarUrl?: string }>) {
    const [busy, setBusy] = useState(false);
    const refreshUser = useRefreshUserContext();


    return <div style={{ height: diameter + 'px', width: diameter + 'px' }}
        className="avatar-container border-solid border-2 border-transparent relative overflow-hidden rounded-full bg-background-light dark:bg-background-dark">
        <Image alt="avatar" className='h-full w-auto' src={avatarUrl ?? defaultAvatar} width={diameter} height={diameter} />
        <div className={
            clsx(
                'absolute top-0 left-0 w-full h-full hover:bg-slate-900/50 opacity-50 rounded-full',
                !busy && 'edit-avatar-panel',
                busy && 'border-8 border-t-red-500 border-b-purple-500 border-r-yellow-500 border-blue-500 animate-spin'
            )}
            title='select another avatar'
        >

            {!busy && <button
                className='w-full h-full p-[10%]'
                onClick={() => { document.getElementById('avatar-file-selector')?.click() }}>
                <PencilSquareIcon className='w-full h-full' />
            </button>}

            <input
                id='avatar-file-selector' accept='image/png,image/jpeg' type='file' className='h-full w-full hidden'
                onChange={(e) => {
                    const selectedFile = e.target.files?.item(0);

                    if (!selectedFile) return;

                    setBusy(true);
                    const body = new FormData();
                    body.append('avatarFile', selectedFile);
                    fetch('/api/profiles/avatar', {
                        method: 'PUT',
                        body: body,
                    }).then(rs => {
                        if (rs.ok) {
                            refreshUser();
                        }
                    }).catch(err => {
                        console.error(err);
                        showNotification("error", "Couldn't change avatar now");
                    }).finally(() => setBusy(false))
                }} />

        </div>
    </div>
}