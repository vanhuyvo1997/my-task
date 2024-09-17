"use client"
import { useEffect, useReducer, useState } from "react";

import TasksList from "../../_components/tasks/tasks-list";
import { useFormState } from "react-dom";
import createTask, { TaskData } from "../../_actions/task-actions";
import { tasksReducer } from "../../_reducers/tasks-reducer";
import { TasksContext, TasksDispatchContext } from "../../_context/tasks-context";
import SearchBar from "../../_components/text-inputs/search-bar";
import AddTaskForm from "../../_components/forms/add-task-form";
import TasksListSkeleton from "@/app/_components/skeletons/tasks-list-skeleton";
import { signOut } from "next-auth/react";
import { showNotification } from "@/app/_lib/utils";
import { useSearchTermContext } from "@/app/_context/search-tasks-context";

export default function TasksPage() {
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [highlightedTaskId, setHighlightedTaskId] = useState<number | undefined>(undefined);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const query = useSearchTermContext();
    const isShowSearchTasks = tasks.length > 0 || query;


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
        async function fetchTasks() {
            try {
                const response = await fetch(tasksUrl);
                if (response.status === 401) {
                    signOut();
                    return;
                }
                if (response.status === 200 && !ignore) {
                    const data = await response.json();
                    dispatch({
                        type: "initialized",
                        tasks: data,
                    })
                    return;
                }
                if (response.status === 404) {
                    dispatch({
                        type: "initialized",
                        tasks: [],
                    })
                    return;
                }
                throw Error('LoadTasksError');
            } catch (error) {
                showNotification("error", "Couldn't load tasks now")
                console.error(error);
            } finally {
                setLoadingTasks(false)
            };
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
        } else if (addingTaskFormState.message === 'RefreshAccessTokenError') {
            signOut();
        }
    }, [addingTaskFormState]);

    return <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
            <div>
                <div className="fixed pb-6 pt-4 px-[2%] w-full right-0 lg:top-16
                 lg:bottom-auto lg:w-[calc(100%-344px)] lg:pb-3 lg:pt-4 lg:px-[1%]
                 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm bottom-0 z-20">
                    <AddTaskForm
                        addingTaskFormState={addingTaskFormState}
                        addTaskAction={addTaskAction}
                    />
                </div>
                {isShowSearchTasks && <div className="bg-dialog-background-light/75 dark:bg-dialog-background-dark/75 backdrop-blur-sm fixed w-[98%] right-[1%] top-20 z-20
                 lg:w-[200px] lg:top-4 lg:right-28 lg:z-30">
                    <SearchBar placeholder="Search for tasks..." />
                </div>
                }
                <div className="mt-14 mb-24 lg:mt-14 lg:mb-16">
                    {
                        loadingTasks ? <TasksListSkeleton /> : <TasksList highlightedTaskId={highlightedTaskId} />
                    }
                </div>
            </div>
        </TasksDispatchContext.Provider>
    </TasksContext.Provider>
}