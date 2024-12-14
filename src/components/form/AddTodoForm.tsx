import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAction } from '../../services/actions/todoActions';

const AddTodoForm: React.FC = () => {
	const [title, setTitle] = useState<string>('');
	const dispatch = useDispatch();

	const handleAdd = () => {
		if (title.trim()) {
			dispatch(addTodoAction(title) as any);
			setTitle('');
		}
	};

	return (
		<div>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Enter task title'
			/>
			<button onClick={handleAdd}>Add Task</button>
		</div>
	);
};

export default AddTodoForm;
