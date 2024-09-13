"use server"

import { auth } from "@/auth";


export type TaskData = {
    id: number,
    name: string,
    status: "COMPLETED" | "TO_DO",
    createdAt?: Date,
    completedAt?: Date,
    ownerId?: string
}

type CreateTaskSuccessfulState = {
    success: true,
    createdTask?: TaskData,
}

type CreateTaskFailedState = {
    success: false,
    message?: string,
}

export type CreateTaskState = CreateTaskFailedState | CreateTaskSuccessfulState;

export default async function createTask(prevState: CreateTaskState, formData: FormData): Promise<CreateTaskState> {
    try {
        const session = await auth();
        if (!session || session.error === 'RefreshAccessTokenError') {
            return { success: false, message: session?.error }
        }
        const response = await fetch(process.env.MY_TASK_TASKS_BASE_API, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.user?.accessToken,
            },
            method: 'POST',
            body: JSON.stringify({ name: formData.get('name')?.toString() })
        });

        if (!response.ok) {
            return { success: false, message: response.status.toString() }
        }

        return { success: true, createdTask: await response.json() }
    } catch (error) {
        console.error(error);
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