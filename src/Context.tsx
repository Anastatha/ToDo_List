import React, { createContext, useContext, useEffect, useState } from 'react';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from './services/todoService';
import { ToDo } from './type/types';

type TodoContextType = {
	todos: ToDo[];
	isLoading: boolean;
	handleAddTodo: (title: string) => void;
	handleUpdateTodo: (id: number, completed: boolean) => void;
	handleDeleteTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [todos, setTodos] = useState<ToDo[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		fetchTodos()
			.then((data) => setTodos(data))
			.finally(() => setLoading(false));
	}, []);

	const handleAddTodo = (title: string) => {
		addTodo(title).then((newTodo) => setTodos((prev) => [...prev, newTodo]));
	};

	const handleUpdateTodo = (id: number, completed: boolean) => {
		updateTodo(id, completed).then((updatedTodo) =>
			setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo))),
		);
	};

	const handleDeleteTodo = (id: number) => {
		deleteTodo(id).then(() =>
			setTodos((prev) => prev.filter((todo) => todo.id !== id)),
		);
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				isLoading,
				handleAddTodo,
				handleUpdateTodo,
				handleDeleteTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error('useTodoContext must be used within a TodoProvider');
	}
	return context;
};
