import { configureStore } from '@reduxjs/toolkit';
import MoviesSlice from '../slices/moviesSlice';

export const store = configureStore({
    reducer: { data: MoviesSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
