import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { ref, set, get, update, remove, push } from 'firebase/database';

type ToDo = {
	title: string;
	completed: boolean;
};

type ToDoWithId = ToDo & { id: string };

export const App: React.FC = () => {
	const [todo, setTodo] = useState<Array<ToDoWithId>>([]);
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
		const todoRef = ref(db, 'todos');
		get(todoRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					const todosArray: ToDoWithId[] = Object.keys(data).map((key) => ({
						id: key,
						...data[key],
					}));
					setTodo(todosArray);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const handleAddTodo = () => {
		if (!newTitle.trim()) return;

		const newTodo: ToDo = {
			title: newTitle,
			completed: false,
		};

		const newTodoRef = ref(db, 'todos');
		const newTodoKey = push(newTodoRef).key; // уникальный ключ

		if (newTodoKey) {
			set(ref(db, `todos/${newTodoKey}`), newTodo)
				.then(() => {
					setTodo((prevTodo) => [...prevTodo, { id: newTodoKey, ...newTodo }]);
					setNewTitle('');
				})
				.catch((error) => console.error('Error adding todo: ', error));
		}
	};

	const handleUpdateTodo = (id: string, completed: boolean) => {
		const updates: { [key: string]: boolean } = {};
		updates[`todos/${id}/completed`] = !completed;

		update(ref(db), updates)
			.then(() => {
				setTodo((prevTodo) =>
					prevTodo.map((todo) =>
						todo.id === id ? { ...todo, completed: !completed } : todo,
					),
				);
			})
			.catch((error) => console.error('Error updating todo: ', error));
	};

	const handleDeleteTodo = (id: string) => {
		const todoRef = ref(db, `todos/${id}`);
		remove(todoRef)
			.then(() => {
				setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
			})
			.catch((error) => console.error('Error deleting todo: ', error));
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
