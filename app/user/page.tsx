"use client"
import { useEffect, useReducer, useState } from "react";
import AddTaskForm from "../_components/add-task-form";
import TaskList from "../_components/task-list";
import { useFormState } from "react-dom";
import createTask from "../_actions/task-actions";
import { tasksReducer } from "../_reducers/tasks-reducer";

export type TaskData = {
    id: number,
    name: string,
    status: "COMPLETED" | "TO_DO",
    createdAt?: Date,
    COMPLETEDAt?: Date,
    ownerId?: string
}

export type CreateTaskState = {
    success: boolean,
    message?: string,
    createdTask?: TaskData
}

export default function UserPage() {
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [highlightedTaskId, setHighlightedTaskId] = useState<number | undefined>(undefined);
    const [loadingTasks, setLoadingTasks] = useState(true);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GET_USER_TASKS_PROXY_API)
            .then(rs => rs.json())
            .then(data => {
                dispatch({
                    type: "initialize",
                    tasks: data,
                })
                setLoadingTasks(false);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (addingTaskFormState.success) {
            let timeoutId: NodeJS.Timeout;
            const createdTask: TaskData = addingTaskFormState.createdTask!;

            setHighlightedTaskId(createdTask.id);
            timeoutId = setTimeout(() => setHighlightedTaskId(undefined), 3000);

            dispatch({
                type: 'add',
                task: createdTask,
            })

            return () => {
                clearTimeout(timeoutId);
            }
        }
    }, [addingTaskFormState]);

    return <div>
        <AddTaskForm
            addingTaskFormState={addingTaskFormState}
            addTaskAction={addTaskAction}
        />
        <div className="mt-14">
            {
                loadingTasks ? 'Loading tasks...' : <TaskList dispatch={dispatch} tasks={tasks} highlightedTaskId={highlightedTaskId} />
            }

        </div>
    </div>
}