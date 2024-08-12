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

export const RegisterFormSchema = z.object({
    firstName: FirstNameSchema,
    lastName: LastNameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    retypePassword: RequiredStringSchema,
});

export const LoginFormSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema,
})