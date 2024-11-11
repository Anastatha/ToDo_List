import { useEffect, useState } from 'react';
import './App.css';
import { ToDo } from './type/types';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from './services/todoService';
import AddTodoForm from './components/form/AddTodoForm';
import SearchInput from './components/searchInput/SearchInput';
import TodoList from './components/list/List';

export const App: React.FC = () => {
	const [todo, setTodo] = useState<ToDo[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		fetchTodos()
			.then((data) => setTodo(data))
			.finally(() => setLoading(false));
	}, []);

	const handleAddTodo = (title: string) => {
		addTodo(title).then((newToDo) => {
			setTodo((prevTodo) => [...prevTodo, newToDo]);
		});
	};

	const handleUpdateTodo = (id: number, completed: boolean) => {
		updateTodo(id, completed).then((updatedTodo) => {
			setTodo((prevTodo) =>
				prevTodo.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
			);
		});
	};

	const handleDeleteTodo = (id: number) => {
		deleteTodo(id).then(() => {
			setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
		});
	};

	const handleSearch = (query: string) => setSearchQuery(query.toLowerCase());
	const toggleSort = () => setSortAlphabetically(!sortAlphabetically);

	const filteredAndSortedTodos = todo
		.filter((t) => t.title.toLowerCase().includes(searchQuery))
		.sort((a, b) => (sortAlphabetically ? a.title.localeCompare(b.title) : 0));

	return (
		<div className='app'>
			<h1>To-Do List</h1>
			<SearchInput onSearch={handleSearch} />
			<button onClick={toggleSort}>
				{sortAlphabetically ? 'Disable Sort' : 'Sort Alphabetically'}
			</button>
			<AddTodoForm onAdd={handleAddTodo} />
			{isLoading ? (
				<div className='loader'>Loading...</div>
			) : (
				<TodoList
					todos={filteredAndSortedTodos}
					onUpdate={handleUpdateTodo}
					onDelete={handleDeleteTodo}
				/>
			)}
		</div>
	);
};

export default App;
