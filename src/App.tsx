import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/Home';
import { useEffect, useState } from 'react';
import { TaskPage } from './pages/task/Task';
import { ErrorPage } from './pages/error/Error';
import { useAppDispatch, useAppSelector } from './services';
import {
	getList,
	addTodoAsync,
	updateTodoAsync,
	deleteTodoAsync,
} from './services/task/actions';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const todos = useAppSelector((state) => state.tasks.list);
	const isLoading = useAppSelector((state) => state.tasks.loading);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getList());
	}, [dispatch]);

	const handleAddTodo = (title: string) => {
		dispatch(addTodoAsync(title));
	};

	const handleUpdateTodo = (id: number, completed: boolean) => {
		dispatch(updateTodoAsync({ id, completed }));
	};

	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodoAsync(id));
	};

	const handleSearch = (query: string) => setSearchQuery(query.toLowerCase());
	const toggleSort = () => setSortAlphabetically(!sortAlphabetically);

	const filteredAndSortedTodos = todos
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
							todos={todos}
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
