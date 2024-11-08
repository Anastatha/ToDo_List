import { useEffect, useState } from 'react';
import './App.css';

type ToDo = {
	id: number;
	title: string;
	completed: boolean;
};

export const App: React.FC = () => {
	const [todo, setTodo] = useState<Array<ToDo>>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>('');

	const debounce = (func: Function, delay: number) => {
		let timer: NodeJS.Timeout;
		return (...args: any) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	useEffect(() => {
		setLoading(true);
		fetch('http://localhost:3005/todo')
			.then((response) => response.json())
			.then((data) => {
				setTodo(data);
			})
			.finally(() => setLoading(false));
	}, []);

	const handleAddTodo = () => {
		if (!newTitle.trim()) return;

		fetch('http://localhost:3005/todo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTitle,
				completed: false,
			}),
		})
			.then((response) => response.json())
			.then((newToDo) => {
				setTodo((prevTodo) => [...prevTodo, newToDo]);
				setNewTitle('');
			});
	};

	const handleUpdateTodo = (id: number, completed: boolean) => {
		fetch(`http://localhost:3005/todo/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: !completed,
			}),
		})
			.then((response) => response.json())
			.then((updatedTodo) => {
				setTodo((prevTodo) =>
					prevTodo.map((todo) =>
						todo.id === updatedTodo.id ? updatedTodo : todo,
					),
				);
			});
	};

	const handleDeleteTodo = (id: number) => {
		fetch(`http://localhost:3005/todo/${id}`, {
			method: 'DELETE',
		}).then(() => {
			setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
		});
	};

	const handleSearch = debounce((query: string) => {
		setSearchQuery(query.toLowerCase());
	}, 300);

	const toggleSort = () => {
		setSortAlphabetically(!sortAlphabetically);
	};

	const filteredAndSortedTodos = todo
		.filter(({ title }) => title.toLowerCase().includes(searchQuery))
		.sort((a, b) => (sortAlphabetically ? a.title.localeCompare(b.title) : 0));

	return (
		<div className='app'>
			<h1>To-Do List</h1>
			<input
				type='text'
				placeholder='Поиск задач...'
				onChange={(e) => handleSearch(e.target.value)}
				className='search-input'
			/>

			<button onClick={toggleSort}>
				{sortAlphabetically ? 'Отключить сортировку' : 'Сортировать по алфавиту'}
			</button>

			<input
				type='text'
				value={newTitle}
				onChange={(e) => setNewTitle(e.target.value)}
				placeholder='Введите название задачи'
			/>
			<button onClick={handleAddTodo}>Добавить задачу</button>

			{isLoading ? (
				<div className='loader'>Loading...</div>
			) : (
				<div className='todo-list'>
					{filteredAndSortedTodos.map(({ id, title, completed }) => (
						<div
							key={id}
							className={`todo-item ${completed ? 'completed' : ''}`}
						>
							<input
								type='checkbox'
								checked={completed}
								onChange={() => handleUpdateTodo(id, completed)}
							/>
							<span className='todo-title'>{title}</span>
							<button onClick={() => handleDeleteTodo(id)}>Удалить</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
