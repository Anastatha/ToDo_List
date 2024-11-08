import { useEffect, useState } from 'react';
import './App.css';

type ToDo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export const App: React.FC = () => {
	const [todo, setTodo] = useState<Array<ToDo>>([]);
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((data) => {
				setTodo(data);
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className='app'>
			<h1>To-Do List</h1>
			{isLoading ? (
				<div className='loader'>Loading...</div>
			) : (
				<div className='todo-list'>
					{todo.map(({ id, title, completed }) => (
						<div
							key={id}
							className={`todo-item ${completed ? 'completed' : ''}`}
						>
							<input type='checkbox' checked={completed} readOnly />
							<span className='todo-title'>{title}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
