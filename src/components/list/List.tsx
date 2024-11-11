import React from 'react';
import { ToDo } from '../../type/types';
import './List.css';

type Props = {
	todos: ToDo[];
	onUpdate: (id: number, completed: boolean) => void;
	onDelete: (id: number) => void;
};

const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => {
	return (
		<div className='todo-list'>
			{todos.map(({ id, title, completed }) => (
				<div key={id} className={`todo-item ${completed ? 'completed' : ''}`}>
					<input
						type='checkbox'
						checked={completed}
						onChange={() => onUpdate(id, completed)}
					/>
					<span className='todo-title'>{title}</span>
					<button onClick={() => onDelete(id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
