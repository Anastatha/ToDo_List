import React from 'react';
import './List.css';
import { useTodoContext } from '../../Context';

type Props = {
	searchQuery: string;
	sortAlphabetically: boolean;
};

const TodoList: React.FC<Props> = ({ searchQuery, sortAlphabetically }) => {
	const { todos, isLoading, handleUpdateTodo, handleDeleteTodo } = useTodoContext();

	const filteredAndSortedTodos = todos
		.filter((t) => t.title.toLowerCase().includes(searchQuery))
		.sort((a, b) => (sortAlphabetically ? a.title.localeCompare(b.title) : 0));

	if (isLoading) {
		return <div className='loader'>Loading...</div>;
	}

	return (
		<div className='todo-list'>
			{filteredAndSortedTodos.map(({ id, title, completed }) => (
				<div key={id} className={`todo-item ${completed ? 'completed' : ''}`}>
					<input
						type='checkbox'
						checked={completed}
						onChange={() => handleUpdateTodo(id, completed)}
					/>
					<span className='todo-title'>{title}</span>
					<button onClick={() => handleDeleteTodo(id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
