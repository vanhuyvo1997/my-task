"use client"
import { useEffect, useRef, useState } from "react";
import TasksList from "../../../../component/tasks/tasks-list";
import { flushSync, useFormState } from "react-dom";
import AddTaskForm from "../../../../component/forms/add-task-form";
import TasksListSkeleton from "@/app/component/skeletons/tasks-list-skeleton";
import { signOut } from "next-auth/react";
import { showNotification } from "@/app/lib/utils";
import createTask, { TaskData } from "@/app/lib/action/task-actions";
import { useSearchQuery } from "@/app/lib/hook/useSearchQuery";
import { useAppDispatch, useAppSelector } from "@/redux-lib/hooks";
import { addTask, initialize } from '@/redux-lib/features/taskSlice';
import { PRIORITY_RADIO_VALUES, PriorityRadioValueType, PRORITY_QUERY_KEY as PRIORITY_QUERY_KEY } from "@/app/component/filters/priority-filter-panel";
import SearchBar, { NAME_QUERY_KEY } from "@/app/component/commons/text-inputs/search-bar";



export default function TasksPage() {
    const [addingTaskFormState, addTaskAction] = useFormState(createTask, { success: false });
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useAppDispatch()
    const [highlightedTaskId, setHighlightedTaskId] = useState<number | undefined>(undefined);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const nameQuery = useSearchQuery(NAME_QUERY_KEY);
    const priorityQuery = useSearchQuery(PRIORITY_QUERY_KEY) as PriorityRadioValueType;
    const isShowSearchTasks = tasks.length > 0 || nameQuery;
    const tasksListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoadingTasks(true);
        let tasksUrl = process.env.NEXT_PUBLIC_TASKS_PROXY_BASE_API;
        const params = new URLSearchParams();
        if (nameQuery) {
            params.append(NAME_QUERY_KEY, nameQuery);
        }

        if (PRIORITY_RADIO_VALUES.has(priorityQuery) && priorityQuery !== "ALL") {
            params.append(PRIORITY_QUERY_KEY, priorityQuery);
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
                if (response.status === 200) {
                    const data = await response.json();
                    if (!ignore) {
                        dispatch(initialize(data));
                    }
                    return;
                }
                if (response.status === 404) {
                    dispatch(initialize([]));
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
        fetchTasks();
        return () => {
            ignore = true;
        };
    }, [dispatch, nameQuery, priorityQuery]);

    useEffect(() => {
        if (addingTaskFormState.success) {
            let timeoutId: NodeJS.Timeout;
            const createdTask: TaskData = addingTaskFormState.createdTask!;

            setHighlightedTaskId(createdTask.id);
            timeoutId = setTimeout(() => setHighlightedTaskId(undefined), 3000);
            flushSync(() => dispatch(addTask(createdTask)));
            window.scrollTo({ top: 0, behavior: "smooth" });

            return () => {
                clearTimeout(timeoutId);
            }
        } else if (addingTaskFormState.message === 'RefreshAccessTokenError') {
            signOut();
        }
    }, [addingTaskFormState, dispatch]);

    return <div>
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
        <div className="mt-14 mb-24 lg:mt-14 lg:mb-16" ref={tasksListRef} >
            {
                loadingTasks ? <TasksListSkeleton /> : <TasksList highlightedTaskId={highlightedTaskId} />
            }
        </div>
    </div>

}