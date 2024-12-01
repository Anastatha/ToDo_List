import React, { useState } from 'react';
import { useTodoContext } from '../../Context';

const AddTodoForm: React.FC = () => {
	const [title, setTitle] = useState<string>('');
	const { handleAddTodo } = useTodoContext();

	const handleAdd = () => {
		if (title.trim()) {
			handleAddTodo(title);
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
