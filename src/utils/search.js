export const filterArray = (array, searchText, currentName) => {
	return array.filter((user) => {
		const { names } = user;

		const query = searchText.toLowerCase();

		const sameLoggedInUser = currentName
			.toLowerCase()
			.includes(names.toLowerCase());

		const searchNamesMatches = names.toLowerCase().includes(query);

		return searchNamesMatches && !sameLoggedInUser;
	});
};
