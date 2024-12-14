import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/searchInput/SearchInput';
import AddTodoForm from './components/form/AddTodoForm';
import TodoList from './components/list/List';
import { useDispatch } from 'react-redux';
import { fetchTodosAction } from './services/actions/todoActions';

export const App: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);
	const dispatch = useDispatch();

	const handleSearch = (query: string) => setSearchQuery(query.toLowerCase());
	const toggleSort = () => setSortAlphabetically(!sortAlphabetically);

	React.useEffect(() => {
		dispatch(fetchTodosAction() as any);
	}, [dispatch]);

	return (
		<div className='app'>
			<h1>To-Do List</h1>
			<SearchInput onSearch={handleSearch} />
			<button onClick={toggleSort}>
				{sortAlphabetically ? 'Disable Sort' : 'Sort Alphabetically'}
			</button>
			<AddTodoForm />
			<TodoList searchQuery={searchQuery} sortAlphabetically={sortAlphabetically} />
		</div>
	);
};

export default App;
