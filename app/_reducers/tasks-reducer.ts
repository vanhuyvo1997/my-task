import { TaskData } from "../user/page";


type DeleteTaskAction = {
    type: 'delete',
    taskId: number,
}

type AddTaskAction = {
    type: 'add',
    task: TaskData,
}

type CheckTaskAction = {
    type: 'check',
    taskId: number,
}

type InitializeTasksAction = {
    type: 'initialize',
    tasks: TaskData[]
}

export type TasksAction = InitializeTasksAction | DeleteTaskAction | AddTaskAction | CheckTaskAction;

export function tasksReducer(tasks: TaskData[], action: TasksAction): TaskData[] {

    switch (action.type) {
        case "initialize": {
            return action.tasks;
        }
        case "add": {
            return [
                action.task,
                ...tasks,
            ];
        }
        case "delete": {
            return tasks.filter(t => t.id !== action.taskId);
        }
        case "check": {
            return tasks.map(t => {
                if (t.id === action.taskId) {
                    const nextStatus = t.status === "COMPLETED" ? 'TO_DO' : 'COMPLETED';
                    return { ...t, status: nextStatus }
                } else {
                    return t;
                }
            });
        }
        default: {
            return tasks;
        }
    }
}