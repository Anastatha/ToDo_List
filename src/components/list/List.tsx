import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './List.css';
import { RootState } from '../../services/store';
import { updateTodoAction, deleteTodoAction } from '../../services/actions/todoActions';

type Props = {
	searchQuery: string;
	sortAlphabetically: boolean;
};

const TodoList: React.FC<Props> = ({ searchQuery, sortAlphabetically }) => {
	const { todos, isLoading } = useSelector((state: RootState) => state.todos);
	const dispatch = useDispatch();

	const filteredAndSortedTodos = todos
		.filter((t: { title: string }) => t.title.toLowerCase().includes(searchQuery))
		.sort((a: { title: string }, b: { title: any }) =>
			sortAlphabetically ? a.title.localeCompare(b.title) : 0,
		);

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
						onChange={() => dispatch(updateTodoAction(id, completed) as any)}
					/>
					<span className='todo-title'>{title}</span>
					<button onClick={() => dispatch(deleteTodoAction(id) as any) as any}>
						Delete
					</button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
