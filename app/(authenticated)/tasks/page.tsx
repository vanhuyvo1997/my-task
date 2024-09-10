"use client"
import { useEffect, useReducer, useState } from "react";

import TasksList from "../../_components/tasks/tasks-list";
import { useFormState } from "react-dom";
import createTask from "../../_actions/task-actions";
import { tasksReducer } from "../../_reducers/tasks-reducer";
import { TasksContext, TasksDispatchContext } from "../../_context/tasks-context";
import { useSearchParams } from "next/navigation";
import SearchBar from "../../_components/text-inputs/search-bar";
import AddTaskForm from "../../_components/forms/add-task-form";
import TasksListSkeleton from "@/app/_components/skeletons/tasks-list-skeleton";

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

export default function TasksPage() {
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [highlightedTaskId, setHighlightedTaskId] = useState<number | undefined>(undefined);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';


    useEffect(() => {
        setLoadingTasks(true);

        let tasksUrl = process.env.NEXT_PUBLIC_PROXY_TASKS_BASE_API;

        const params = new URLSearchParams();
        if (query) {
            params.append('query', query);
        }

        if (params.size > 0) {
            tasksUrl += `?${params.toString()}`;
        }

        let ignore = false;

        function fetchTasks() {
            fetch(tasksUrl)
                .then(rs => {
                    return rs.status !== 200 ? [] : rs.json();
                })
                .then(data => {
                    if (!ignore) {
                        dispatch({
                            type: "initialized",
                            tasks: data,
                        })
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setLoadingTasks(false));
        }

        const timeoutId = setTimeout(fetchTasks, query ? 1000 : 0);

        return () => {
            ignore = true;
            clearTimeout(timeoutId);
        };
    }, [query]);

    useEffect(() => {
        if (addingTaskFormState.success) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            let timeoutId: NodeJS.Timeout;
            const createdTask: TaskData = addingTaskFormState.createdTask!;

            setHighlightedTaskId(createdTask.id);
            timeoutId = setTimeout(() => setHighlightedTaskId(undefined), 3000);
            dispatch({
                type: 'added',
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
                <div className="fixed pb-6 pt-4 px-[2%] w-full right-0 lg:top-16
                 lg:bottom-auto lg:w-[calc(100%-344px)] lg:pb-3 lg:pt-4 lg:px-[1%]
                 bg-background-light/75 dark:bg-background-dark/75 backdrop-blur-sm bottom-0 z-40">
                    <AddTaskForm
                        addingTaskFormState={addingTaskFormState}
                        addTaskAction={addTaskAction}
                    />
                </div>
                <SearchBar className="fixed w-[98%] right-[1%] top-20 lg:hidden bg-gray-500 z-40" />
                <div className="mt-14 mb-24 lg:mt-14 lg:mb-16">
                    {
                        loadingTasks ? <TasksListSkeleton /> : <TasksList highlightedTaskId={highlightedTaskId} />
                    }

                </div>
            </div>
        </TasksDispatchContext.Provider>
    </TasksContext.Provider>
}