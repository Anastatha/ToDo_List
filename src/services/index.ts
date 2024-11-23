import { useDispatch, useSelector } from 'react-redux';
import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { sliceTasks } from './task/slice';

const rootReducer = combineSlices(sliceTasks);

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
