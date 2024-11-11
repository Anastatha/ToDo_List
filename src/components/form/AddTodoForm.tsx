import React, { useState } from 'react';

type Props = {
	onAdd: (title: string) => void;
};

const AddTodoForm: React.FC<Props> = ({ onAdd }) => {
	const [title, setTitle] = useState<string>('');

	const handleAdd = () => {
		if (title.trim()) {
			onAdd(title);
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
