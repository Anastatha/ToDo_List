import React from 'react';
import { ToDo } from '../../type/types';
import './Tasks.css';
import { Link } from 'react-router-dom';

type Props = {
	todos: ToDo[];
};

export const TasksList: React.FC<Props> = ({ todos }) => {
	return (
		<div className='todo-list'>
			{todos.map(({ id, title, completed }) => (
				<div key={id} className={`todo-item ${completed ? 'completed' : ''}`}>
					<Link to={`/task/${id}`} className='todo-title'>
						{title}
					</Link>
				</div>
			))}
		</div>
	);
};
