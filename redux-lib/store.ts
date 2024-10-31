import { configureStore } from '@reduxjs/toolkit';
import tasks from './features/taskSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            tasks,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']