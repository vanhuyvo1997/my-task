'use client'
import LabelTextInput from '@/app/_components/text-inputs/label-text-input';
import AuthCommonForm from '../auth-common-form';
import { register } from '@/app/_actions/auth-actions';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { showNotification } from '@/app/_lib/utils';
import CommonLink from '@/app/_components/layouts/common-link';

type RegisterFormData = { firstName: string, lastName: string, email: string, password: string, retypePassword: string };
const initialFormData = { lastName: '', firstName: '', email: '', password: '', retypePassword: '' };

export default function RegisterPage() {

    const [formState, dispatch] = useFormState(register, { success: false });
    const [formData, setFormData] = useState<RegisterFormData>(initialFormData);

    //focus first element on first load
    useEffect(() => {
        document.getElementById('firstName')?.focus();
    }, []);

    //clear form affter submitting successfully
    useEffect(() => {
        if (formState.success) {
            showNotification('success', <>Congratulation! You have registered successfully.<CommonLink className='text-blue-600' href='/login'> Log in now.</CommonLink></>)
            setFormData(initialFormData);
        } else if (formState.message) {
            showNotification('error', <>Failed! <br />  {formState.message}</>);
        }
    }, [formState])


    //Handle change form data
    function handleChangeFormData(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    //handle clear all text in a input filed 
    function handleClearText(fieldName: keyof typeof formData) {
        setFormData({
            ...formData,
            [fieldName]: '',
        });
    }

    return (
        <AuthCommonForm
            footerContent={<>or Already had an account? <CommonLink className='text-blue-600' href='/login'>Log in now.</CommonLink></>}
            buttonContent='Register'
            action={dispatch}
        >
            <div className='flex justify-between gap-4'>
                <div className='w-1/2'>
                    <LabelTextInput
                        className='dark:bg-text-input-background-dark'
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
                            {formState.fieldErrors?.firstName?.map(e => <p key={e}>(*) {e}</p>)}
                        </div>
                    }
                </div>

                <div className='w-1/2'>
                    <LabelTextInput
                        className='dark:bg-text-input-background-dark'
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
                            {formState.fieldErrors?.lastName?.map(e => <p key={e}>(*) {e}</p>)}
                        </div>
                    }
                </div>
            </div>

            <LabelTextInput
                className='dark:bg-text-input-background-dark'
                id='email'
                type='email'
                name='email'
                title='Email'
                placeholder='Your email'
                onChange={handleChangeFormData}
                value={formData.email}
                onClearText={() => handleClearText('email')}
            />
            {
                formState.fieldErrors?.email && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.email?.map(e => <p key={e}>(*) {e}</p>)}
                </div>
            }

            <LabelTextInput
                className='dark:bg-text-input-background-dark'
                id='password'
                type='password'
                name='password'
                title='Password'
                placeholder='Your password'
                onChange={handleChangeFormData}
                value={formData.password}
                onClearText={() => handleClearText('password')}
            />
            {
                formState.fieldErrors?.password && <div aria-live='polite' className='text-red-500'>
                    {formState.fieldErrors?.password?.map(e => <p key={e}>(*) {e}</p>)}
                </div>
            }

            <LabelTextInput
                className='dark:bg-text-input-background-dark'
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
                    {formState.fieldErrors?.retypePassword?.map(e => <p key={e}>(*) {e}</p>)}
                </div>
            }
        </AuthCommonForm>
    );
}