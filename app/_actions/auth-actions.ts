"use server"


import { LoginFormSchema, RegisterFormSchema } from "../_lib/zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type RegisterFormState = {
    success: boolean,
    message?: string,
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

    try {
        const response = await fetch(process.env.MY_TASK_REGISTER_API, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (response.status === 409) {
            return {
                success: false,
                fieldErrors: {
                    email: ['This email was taken. Please choose another one.']
                }
            }
        }

        if (response.ok) {
            return {
                success: true,
            }
        }

        return {
            success: false,
            message: 'Something went wrong: ' + response.statusText,
        }
    } catch (e) {
        console.error(e);
        let message = '';
        if (e instanceof Error) {
            message = e.message;
        } else message = String(e);

        return {
            success: false,
            message: 'Something went wrong: ' + message,
        }
    }
}


export type LoginFormState = {
    success: boolean,
    message?: string,
}
export async function login(prevFormState: LoginFormState, FormData: FormData): Promise<LoginFormState> {
    const validateResult = LoginFormSchema.safeParse({
        email: FormData.get('email'),
        password: FormData.get('password'),
    });

    if (!validateResult.success) {
        return {
            success: false,
            message: 'Email or password is incorrect.'
        }
    }

    try {
        await signIn('credentials', { redirect: true, redirectTo: '/user', ...validateResult.data });
        return { success: true, };
    } catch (error) {
        if (error instanceof AuthError) {
            const result: LoginFormState = { success: false };
            let message = '';
            if (error.type === "CredentialsSignin") {
                message = 'Invalid credentials';
            } else {
                message = 'Something went wrong';
            }
            result.message = message;
            return result;
        }
        throw error;
    }
}