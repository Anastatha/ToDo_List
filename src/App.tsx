import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/Home';
import { useEffect, useState } from 'react';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from './api/todoService';
import { ToDo } from './type/types';
import { TaskPage } from './pages/task/Task';
import { ErrorPage } from './pages/error/Error';

const App: React.FC = () => {
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
			<Routes>
				<Route
					path='/'
					element={
						<HomePage
							todos={filteredAndSortedTodos}
							isLoading={isLoading}
							onAdd={handleAddTodo}
							onSearch={handleSearch}
							toggleSort={toggleSort}
							sortAlphabetically={sortAlphabetically}
						/>
					}
				/>
				<Route
					path='/task/:id'
					element={
						<TaskPage
							todos={todo}
							onDelete={handleDeleteTodo}
							onUpdate={handleUpdateTodo}
						/>
					}
				/>
				<Route path='/404' element={<ErrorPage />} />
				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
		</div>
	);
};

export default App;
