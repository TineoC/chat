export const filterArray = (array, searchText, currentUser = null) => {
    if (currentUser === null)
        return array.filter((user) => {
            const { names } = user

            const query = searchText.toLowerCase()

            const searchNamesMatches = names.toLowerCase().includes(query)

            return searchNamesMatches
        })

    const { names: currentName } = currentUser

    return array.filter((user) => {
        const { names } = user

        const query = searchText.toLowerCase()

        const sameLoggedInUser = currentName
            .toLowerCase()
            .includes(names.toLowerCase())

        const searchNamesMatches = names.toLowerCase().includes(query)

        return searchNamesMatches && !sameLoggedInUser
    })
}
