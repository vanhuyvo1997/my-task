import { createContext, Dispatch } from "react";
import { TasksAction } from "../_reducers/tasks-reducer";
import { TaskData } from "../_actions/task-actions";

export const TasksContext = createContext<TaskData[]>([]);
export const TasksDispatchContext = createContext<Dispatch<TasksAction>>(null!);


export function TasksProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return {

    }
}