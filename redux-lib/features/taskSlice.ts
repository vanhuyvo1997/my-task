import { TaskData } from '@/app/lib/action/task-actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: TaskData[] = []

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        initialize: (state, action: PayloadAction<TaskData[]>) => {
            state.push(...action.payload);
        },

        addTask: (state, action: PayloadAction<TaskData>) => {
            state.unshift(action.payload);
        },

        deleteTask: (state, action: PayloadAction<number>) => {
            const index = state.findIndex(t => t.id === action.payload);
            if (index != -1) state.splice(index, 1);
        },

        updateTask: (state, action: PayloadAction<TaskData>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            if (index != -1) state.splice(index, 1, action.payload);
        },
    }
});

export const { initialize, addTask, deleteTask, updateTask } = taskSlice.actions;
export const taskSeclector = (state: RootState) => state.tasks.values;
export default taskSlice.reducer;