'use client'
import LabelTextInput from '@/app/_components/label-text-input';
import Link from 'next/link';
import AuthCommonForm from '../auth-common-form';
import { register } from '@/app/_actions/auth-actions';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';


export default function RegisterPage() {

    const [formState, dispatch] = useFormState(register, { success: false });

    useEffect(() => {
        document.getElementById('firstName')?.focus();
    }, []);

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', retypePassword: '' });

    function handleChangeFormData(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    function handleClearText(fieldName: 'firstName' | 'lastName' | 'email' | 'password' | 'retypePassword') {
        setFormData({
            ...formData,
            [fieldName]: '',
        });
    }


    return (
        <AuthCommonForm
            footerContent={<>or Already had an account? <Link className='text-blue-600' href='/login'>Log in now.</Link></>}
            buttonContent='Register'
            action={dispatch}
        >
            <LabelTextInput
                id='firstName'
                name='firstName'
                title='First name'
                placeholder='Your first name'
                onChange={handleChangeFormData}
                value={formData.firstName}
                onClearText={() => handleClearText('firstName')}
            />
            {
                formState.fieldErrors?.firstName && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.firstName?.map(e => <><p key={e}>(*) {e}</p></>)}
                </div>
            }

            <LabelTextInput
                id='lastName'
                name='lastName'
                title='Last name'
                placeholder='Your last name'
                onChange={handleChangeFormData}
                value={formData.lastName}
                onClearText={() => handleClearText('lastName')}
            />
            {
                formState.fieldErrors?.lastName && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.lastName?.map(e => <><p key={e}>(*) {e}</p></>)}
                </div>
            }

            <LabelTextInput
                id='email'
                type='email'
                name='email'
                title='Last email'
                placeholder='Your last name'
                onChange={handleChangeFormData}
                value={formData.email}
                onClearText={() => handleClearText('email')}
            />
            {
                formState.fieldErrors?.email && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.email?.map(e => <><p key={e}>(*) {e}</p></>)}
                </div>
            }

            <LabelTextInput
                id='password'
                type='password'
                name='password'
                title='Password'
                placeholder='Your last name'
                onChange={handleChangeFormData}
                value={formData.password}
                onClearText={() => handleClearText('password')}
            />
            {
                formState.fieldErrors?.password && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.password?.map(e => <><p key={e}>(*) {e}</p></>)}
                </div>
            }

            <LabelTextInput
                id='retypePassword'
                type='password'
                name='retypePassword'
                title='Re-type password'
                placeholder='Re-type password'
                onChange={handleChangeFormData}
                value={formData.retypePassword}
                onClearText={() => handleClearText('retypePassword')}
            />
            {
                formState.fieldErrors?.retypePassword && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.retypePassword?.map(e => <><p key={e}>(*) {e}</p></>)}
                </div>
            }
        </AuthCommonForm>
    );
}