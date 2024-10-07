declare namespace NodeJS {
    interface ProcessEnv {
        PUBLIC_KEY_FILE: string;

        MY_TASK_REGISTER_API: string;
        MY_TASK_LOGIN_API: string;
        MY_TASK_REFRESH_TOKEN: string;

        MY_TASK_TASKS_BASE_API: string;
        MY_TASK_PROFILES_BASE_API: string;
        MY_TASK_USERS_BASE_API: string;
        MY_TASK_STATISTICS_API: string;

        NEXT_PUBLIC_PROXY_BASE_API: string;
        NEXT_PUBLIC_TASKS_PROXY_BASE_API: string;
        NEXT_PUBLIC_PROFILES_PROXY_BASE_API: string;
    }
}