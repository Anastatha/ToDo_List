import { useAppDispatch } from '../../services';
import { addTodoAsync } from '../../services/task/actions';
import AddTodoForm from '../form/AddTodoForm';

export function AddTask() {
	const dispatch = useAppDispatch();

	const handleAddTodo = (title: string) => {
		dispatch(addTodoAsync(title));
	};
	return <AddTodoForm placeholder='Enter task title' onAdd={handleAddTodo} />;
}
