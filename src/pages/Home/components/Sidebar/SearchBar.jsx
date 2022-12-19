import React from "react";

const SearchBar = () => {
	return (
		<div>
			<input
				className='w-full'
				type='text'
				name='search'
				id='search'
				placeholder='Search your chats...'
			/>
		</div>
	);
};

export default SearchBar;
