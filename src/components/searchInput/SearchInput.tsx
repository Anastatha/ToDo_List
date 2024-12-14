import React, { useState } from 'react';

type Props = {
	onSearch: (query: string) => void;
};

const SearchInput: React.FC<Props> = ({ onSearch }) => {
	const [query, setQuery] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		onSearch(e.target.value);
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
