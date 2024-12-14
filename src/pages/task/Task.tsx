import { useParams, useNavigate } from 'react-router-dom';
import { deleteTodoAsync, getList, updateTodoAsync } from '../../services/task/actions';
import { useAppDispatch, useAppSelector } from '../../services';
import { getIngredientsById } from '../../services/task/slice';
import { useEffect } from 'react';
import BackButton from '../../components/back-button';

export const TaskPage = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const task = useAppSelector((state) => {
		if (!id) return undefined;
		return getIngredientsById({ ...state, id: Number(id) });
	});

	useEffect(() => {
		dispatch(getList());
	}, [dispatch]);

	if (!task) {
		return <div>Task not found</div>;
	}

	const handleDelete = () => {
		dispatch(deleteTodoAsync(task.id));
		navigate('/');
	};

	const handleUpdateTodo = (id: number, completed: boolean) => {
		dispatch(updateTodoAsync({ id, completed }));
	};

	return (
		<div>
			<div className={`todo-item ${task.completed ? 'completed' : ''}`}>
				<input
					type='checkbox'
					checked={task.completed}
					onChange={() => handleUpdateTodo(task.id, task.completed)}
				/>
				<span>{task.title}</span>
			</div>
			<button onClick={handleDelete}>Delete Task</button>
			<BackButton />
		</div>
	);
};
