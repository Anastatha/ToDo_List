import { useEffect, useMemo, useState } from 'react';
import SearchInput from '../../components/searchInput/SearchInput';
import { TasksList } from '../../components/task/Tasks';
import { useAppDispatch, useAppSelector } from '../../services';
import { getList } from '../../services/task/actions';
import { AddTask } from '../../components/add-task';

export const HomePage = ({}) => {
	const dispatch = useAppDispatch();
	const todos = useAppSelector((state) => state.tasks.list);
	const isLoading = useAppSelector((state) => state.tasks.loading);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [sortAlphabetically, setSortAlphabetically] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getList());
	}, [dispatch]);

	const handleSearch = (query: string) => setSearchQuery(query.toLowerCase());
	const toggleSort = () => setSortAlphabetically(!sortAlphabetically);

	const filteredAndSortedTodos = useMemo(() => {
		return todos
			.filter((t) => t.title.toLowerCase().includes(searchQuery))
			.sort((a, b) => (sortAlphabetically ? a.title.localeCompare(b.title) : 0));
	}, [todos, searchQuery, sortAlphabetically]);

	return (
		<div>
			<h1>To-Do List</h1>
			<SearchInput onSearch={handleSearch} />
			<button onClick={toggleSort}>
				{sortAlphabetically ? 'Disable Sort' : 'Sort Alphabetically'}
			</button>
			<AddTask />
			{isLoading ? (
				<div className='loader'>Loading...</div>
			) : (
				<TasksList todos={filteredAndSortedTodos} />
			)}
		</div>
	);
};
