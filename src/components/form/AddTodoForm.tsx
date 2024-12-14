import React, { useState } from 'react';

type Props = {
	onAdd: (title: string) => void;
	placeholder: string;
};

const AddTodoForm: React.FC<Props> = ({ onAdd, placeholder }) => {
	const [value, setValue] = useState<string>('');

	const handleAdd = () => {
		if (value.trim()) {
			onAdd(value);
			setValue('');
		}
	};

	return (
		<div>
			<input
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
			/>
			<button onClick={handleAdd}>Add Task</button>
		</div>
	);
};

export default AddTodoForm;
