import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addTodoAsync, deleteTodoAsync, getList, updateTodoAsync } from './actions';
import { ToDo } from '../../type/types';

interface initialState {
	list: ToDo[];
	loading: boolean;
}

const initialState: initialState = {
	list: [],
	loading: false,
};

export const sliceTasks = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	selectors: {
		getStateTasks: (state) => state,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getList.pending, (state) => {
				state.loading = true;
			})
			.addCase(getList.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(getList.rejected, (state) => {
				state.loading = false;
			})
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.list.push(action.payload);
			})
			.addCase(updateTodoAsync.fulfilled, (state, action) => {
				state.list = state.list.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo,
				);
			})
			.addCase(deleteTodoAsync.fulfilled, (state, action) => {
				state.list = state.list.filter((todo) => todo.id !== action.payload);
			});
	},
});

export const { getStateTasks } = sliceTasks.selectors;

export const getIngredientsById = createSelector(
	[getStateTasks, (idObj: { id: number }) => idObj.id],
	(state, id) => {
		return state.list.find((el) => el.id === id);
	},
);
