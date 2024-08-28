declare namespace NodeJS {
    interface ProcessEnv {
        PUBLIC_KEY_FILE: string;

        MY_TASK_REGISTER_API: string;
        MY_TASK_LOGIN_API: string;

        TASKS_BASE_API: string;

        NEXT_PUBLIC_PROXY_TASKS_BASE_API: string;
    }
}