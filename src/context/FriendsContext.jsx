import React, { createContext } from "react";
import { useState } from "react";

export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
	const [friendsList, setFriendsList] = useState([]);

	return (
		<FriendsContext.Provider value={{ friendsList, setFriendsList }}>
			{children}
		</FriendsContext.Provider>
	);
};
