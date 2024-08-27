import { TaskData } from "../user/page";


type DeleteTaskAction = {
    type: 'delete',
    taskId: number,
}

type AddTaskAction = {
    type: 'add',
    task: TaskData,
}

type UpdateTaskAction = {
    type: 'update',
    task: TaskData,
}

type InitializeTasksAction = {
    type: 'initialize',
    tasks: TaskData[]
}

export type TasksAction = InitializeTasksAction | DeleteTaskAction | AddTaskAction | UpdateTaskAction;

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
        case "update": {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
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