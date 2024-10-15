import { createContext, Dispatch } from "react";
import { TaskData } from "../action/task-actions";
import { TasksAction } from "../reducer/tasks-reducer";

export const TasksContext = createContext<TaskData[]>([]);
export const TasksDispatchContext = createContext<Dispatch<TasksAction>>(null!);