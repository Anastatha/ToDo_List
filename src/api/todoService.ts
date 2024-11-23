import { ToDo } from '../type/types';

const API_URL = 'http://localhost:3005/todo';

export const fetchTodos = async (): Promise<ToDo[]> => {
	const response = await fetch(API_URL);
	return response.json();
};

export const addTodo = async (title: string): Promise<ToDo> => {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, completed: false }),
	});
	return response.json();
};

export const updateTodo = async (id: number, completed: boolean): Promise<ToDo> => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ completed: !completed }),
	});
	return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
	await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
