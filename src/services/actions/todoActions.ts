import { Dispatch } from 'redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../api/todoService';
import { ToDo } from '../../type/types';

export const fetchTodosAction = () => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: 'FETCH_TODOS_REQUEST' });

		try {
			const todos: ToDo[] = await fetchTodos();
			dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: todos });
		} catch (error) {
			dispatch({ type: 'FETCH_TODOS_FAILURE' });
		}
	};
};

export const addTodoAction = (title: string) => async (dispatch: Dispatch) => {
	const newTodo = await addTodo(title);
	dispatch({ type: 'ADD_TODO', payload: newTodo });
};

export const updateTodoAction =
	(id: number, completed: boolean) => async (dispatch: Dispatch) => {
		const updatedTodo = await updateTodo(id, completed);
		dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
	};

export const deleteTodoAction = (id: number) => async (dispatch: Dispatch) => {
	await deleteTodo(id);
	dispatch({ type: 'DELETE_TODO', payload: id });
};
