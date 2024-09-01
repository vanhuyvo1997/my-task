"use client"
import { useEffect, useReducer, useState } from "react";
import AddTaskForm from "../_components/add-task-form";
import TasksList from "../_components/tasks-list";
import { useFormState } from "react-dom";
import createTask from "../_actions/task-actions";
import { tasksReducer } from "../_reducers/tasks-reducer";
import { TasksContext, TasksDispatchContext } from "../_context/tasks-context";
import { useSearchParams } from "next/navigation";

export type TaskData = {
    id: number,
    name: string,
    status: "COMPLETED" | "TO_DO",
    createdAt?: Date,
    completedAt?: Date,
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
    const searchParams = useSearchParams();
    const query = searchParams.get('query');


    useEffect(() => {
        let tasksUrl = process.env.NEXT_PUBLIC_PROXY_TASKS_BASE_API;

        const params = new URLSearchParams();
        if (query) {
            params.append('query', query);
        }

        if (params.size > 0) {
            tasksUrl += `?${params.toString()}`;
        }

        let ignore = false;

        fetch(tasksUrl)
            .then(rs => rs.json())
            .then(data => {
                if (!ignore) {
                    dispatch({
                        type: "initialize",
                        tasks: data,
                    })
                    setLoadingTasks(false);
                }
            })
            .catch(err => console.error(err));

        return () => { ignore = true; };
    }, [query]);

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

    return <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
            <div>
                <AddTaskForm
                    addingTaskFormState={addingTaskFormState}
                    addTaskAction={addTaskAction}
                />
                <div className="mt-14">
                    {
                        loadingTasks ? 'Loading tasks...' : <TasksList highlightedTaskId={highlightedTaskId} />
                    }

                </div>
            </div>
        </TasksDispatchContext.Provider>
    </TasksContext.Provider>
}