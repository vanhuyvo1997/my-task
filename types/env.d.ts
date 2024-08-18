declare namespace NodeJS {
    interface ProcessEnv {
        MY_TASK_REGISTER_API: string;
        MY_TASK_LOGIN_API: string;
        PUBLIC_KEY_FILE: string;
        CREATE_NEW_TASK_API: string;
    }
}