import React, { useState } from 'react';

type Props = {
	onSearch: (query: string) => void;
};

const SearchInput: React.FC<Props> = ({ onSearch }) => {
	const [query, setQuery] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		debounce(() => onSearch(e.target.value), 300)();
	};

	const debounce = (func: Function, delay: number) => {
		let timer: NodeJS.Timeout;
		return (...args: any) => {
			clearTimeout(timer);
			timer = setTimeout(() => func(...args), delay);
		};
	};

	return (
		<input
			type='text'
			placeholder='Search tasks...'
			value={query}
			onChange={handleChange}
			className='search-input'
		/>
	);
};

export default SearchInput;
