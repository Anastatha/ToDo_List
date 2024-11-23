import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToDo } from '../../type/types';

interface TaskPageProps {
	todos: ToDo[];
	onDelete: (id: number) => void;
	onUpdate: (id: number, completed: boolean) => void;
}

export const TaskPage: React.FC<TaskPageProps> = ({ todos, onDelete, onUpdate }) => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const task = todos.find((todo) => todo.id === Number(id));

	if (!task) {
		return <div>Task not found</div>;
	}

	const handleDelete = () => {
		onDelete(task.id);
		navigate('/');
	};

	return (
		<div>
			<div className={`todo-item ${task.completed ? 'completed' : ''}`}>
				<input
					type='checkbox'
					checked={task.completed}
					onChange={() => onUpdate(task.id, task.completed)}
				/>
				<span>{task.title}</span>
			</div>
			<button onClick={handleDelete}>Delete Task</button>
			<button onClick={() => navigate(-1)}>← Back</button>
		</div>
	);
};
