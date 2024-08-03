"use server"

import { z } from "zod";


const nameRegex = /[a-zA-Z]+/;


const RequiredStringSchema = z.coerce.string({ required_error: 'This field is required.' }).min(1, { message: 'This field is required.' });

const FirstNameSchema = RequiredStringSchema.trim()
    .max(32, { message: 'This field must not contain more than 32 characters.' }).
    regex(nameRegex, { message: 'This field must contain alphabet characters only.' });
const LastNameSchema = RequiredStringSchema.trim()
    .max(64, { message: 'This field must not contain more than 64 characters.' })
    .regex(nameRegex, { message: 'This field must contain alphabet characters only.' });
const EmailSchema = RequiredStringSchema.trim()
    .email({ message: 'This is not an valid email' }).max(124, { message: 'This field must not contain more than 124 characters.' });
const PasswordSchema = RequiredStringSchema
    .max(100, { message: 'This field must not contain more than 100 characters.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'This field must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
const RetypePasswordSchema = RequiredStringSchema;

const RegisterFormSchema = z.object({
    firstName: FirstNameSchema,
    lastName: LastNameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    retypePassword: RequiredStringSchema,
});


export type RegisterFormState = {
    success: boolean,
    fieldErrors?: {
        firstName?: string[],
        lastName?: string[],
        email?: string[],
        password?: string[],
        retypePassword?: string[],
    },
}

export async function register(state: any, RegisterFormData: FormData): Promise<RegisterFormState> {

    const validateResult = RegisterFormSchema.safeParse({
        firstName: RegisterFormData.get('firstName'),
        lastName: RegisterFormData.get('lastName'),
        email: RegisterFormData.get('email'),
        password: RegisterFormData.get('password'),
        retypePassword: RegisterFormData.get('retypePassword'),
    });

    if (!validateResult.success) {
        return {
            success: false,
            fieldErrors: validateResult.error.flatten().fieldErrors,
        }
    }

    const data = validateResult.data;

    if (data.retypePassword !== data.password) {
        return {
            success: false,
            fieldErrors: {
                retypePassword: ['Retype-Password is not match.'],
            }
        }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        success: true
    }
}