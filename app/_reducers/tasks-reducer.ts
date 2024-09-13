import { TaskData } from "../_actions/task-actions"



type DeleteTaskAction = {
    type: 'deleted',
    taskId: number,
}

type AddTaskAction = {
    type: 'added',
    task: TaskData,
}

type UpdateTaskAction = {
    type: 'updated',
    task: TaskData,
}

type InitializeTasksAction = {
    type: 'initialized',
    tasks: TaskData[]
}

type SearchTasksAction = {
    type: 'searched',
    term: string,
}

export type TasksAction = InitializeTasksAction | DeleteTaskAction | AddTaskAction | UpdateTaskAction | SearchTasksAction;

export function tasksReducer(tasks: TaskData[], action: TasksAction): TaskData[] {

    switch (action.type) {
        case "initialized": {
            return action.tasks;
        }
        case "added": {
            return [
                action.task,
                ...tasks,
            ];
        }
        case "deleted": {
            return tasks.filter(t => t.id !== action.taskId);
        }
        case "updated": {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case "searched": {
            return tasks.filter(task => task.name.includes(action.term));
        }
        default: {
            return tasks;
        }
    }
}