import { createContext, Dispatch } from "react";
import { TaskData } from "../user/page";
import { TasksAction } from "../_reducers/tasks-reducer";

export const TasksContext = createContext<TaskData[]>([]);
export const TasksDispatchContext = createContext<Dispatch<TasksAction>>(null!);


export function TasksProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return {

    }
}