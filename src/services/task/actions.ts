import { createAsyncThunk } from '@reduxjs/toolkit';
import { ToDo } from '../../type/types';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '../../api/todoService';

export const getList = createAsyncThunk<ToDo[], undefined>('tasks/getList', async () => {
	return await fetchTodos();
});

export const addTodoAsync = createAsyncThunk<ToDo, string>(
	'tasks/addTodo',
	async (title) => {
		return await addTodo(title);
	},
);

export const updateTodoAsync = createAsyncThunk<ToDo, { id: number; completed: boolean }>(
	'tasks/updateTodo',
	async ({ id, completed }) => {
		return await updateTodo(id, completed);
	},
);

export const deleteTodoAsync = createAsyncThunk<number, number>(
	'tasks/deleteTodo',
	async (id) => {
		await deleteTodo(id);
		return id;
	},
);
