"use server"

import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { CreateTaskState } from "../user/page";

export default async function createTask(prevState: CreateTaskState, formData: FormData): Promise<CreateTaskState> {
    try {
        const session = await auth();
        if (!session?.user) {
            redirect("/login");
        }
        const response = await fetch(process.env.CREATE_NEW_TASK_API, {
            headers: {
                "Content-Type": "application/json",
                "authorization": session.user.accessToken!,
            },
            method: 'POST',
            body: JSON.stringify({ taskName: formData.get('taskName')?.toString() })
        });
        if (!response.ok) {
            return { success: false, message: response.text.toString() }
        }

        return { success: true, createdTask: await response.json() }
    } catch (error) {
        let message = '';
        if (error instanceof Error) {
            console.log(error.message);
            message = 'Somethings went wrong.'
        }
        return {
            success: false,
            message
        }
    }
}