import React from 'react';
import AddTodoForm from '../../components/form/AddTodoForm';
import SearchInput from '../../components/searchInput/SearchInput';
import { TasksList } from '../../components/task/Tasks';
import { ToDo } from '../../type/types';

interface HomePageProps {
	todos: ToDo[];
	isLoading: boolean;
	onAdd: (title: string) => void;
	onSearch: (query: string) => void;
	toggleSort: () => void;
	sortAlphabetically: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
	todos,
	isLoading,
	onAdd,
	onSearch,
	toggleSort,
	sortAlphabetically,
}) => {
	return (
		<div>
			<h1>To-Do List</h1>
			<SearchInput onSearch={onSearch} />
			<button onClick={toggleSort}>
				{sortAlphabetically ? 'Disable Sort' : 'Sort Alphabetically'}
			</button>
			<AddTodoForm onAdd={onAdd} />
			{isLoading ? (
				<div className='loader'>Loading...</div>
			) : (
				<TasksList todos={todos} />
			)}
		</div>
	);
};
