'use client'

import Image from 'next/image';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import avatar from '@/app/_images/logo-light.png';
import { useState } from 'react';
import clsx from 'clsx';
import { showNotification } from '@/app/_lib/utils';
export default function Avatar({ diameter = '50' }: Readonly<{ diameter?: `${number}` }>) {
    const [busy, setBusy] = useState(false);
    const [avatarFileUrl, setAvatarFileUrl] = useState('');

    return <div style={{ height: diameter + 'px', width: diameter + 'px' }}
        className={
            clsx(
                `avatar-container border-solid border-2 border-transparent relative overflow-hidden rounded-full bg-background-light dark:bg-background-dark`,
            )
        }>
        <Image alt="avatar" className='h-full w-auto' src={avatarFileUrl ?? avatar} width={200} height={200} />
        <div className={
            clsx(
                'absolute top-0 left-0 w-full h-full hover:bg-slate-900/50 opacity-50 rounded-full',
                !busy && 'edit-avatar-panel',
                busy && 'border-4 border-t-red-500 border-b-purple-500 border-r-yellow-500 border-blue-500 animate-spin'
            )}
            title='select another avatar'
        >

            {!busy && <button
                className='w-full h-full p-[10%]'
                onClick={() => { document.getElementById('avatar-file-selector')?.click() }}>
                <PencilSquareIcon className='w-full h-full' />
            </button>}

            <input onChange={(e) => {
                setBusy(true);
                const selectedFile = e.target.files?.item(0);
                if (selectedFile) {
                    const body = new FormData();
                    body.append('avatar', selectedFile);
                    fetch('https://a8025dac-e97f-4b23-a884-4d6442f85827.mock.pstmn.io/api/users/avatar', {
                        method: 'POST',
                        headers: {
                            "Content-type": "multipart/form-data",
                        },
                        body: body,
                    }).then(async rs => {
                        if (rs.ok) {
                            const data = await rs.json();
                            setAvatarFileUrl(data.avatarUrl);
                        }
                    }).catch(err => {
                        showNotification("error", "Couldn't change avatar now");
                    }).finally(
                        () => setBusy(false)
                    )
                } else {

                }
            }} id='avatar-file-selector' accept='image/png, image/jpeg' type='file' className='h-full w-full hidden' />
        </div>
    </div>
}