import React, { createContext, useReducer } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const INITIAL_STATE = { receiver: null };

	const chatReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_USER":
				return {
					receiver: action.payload,
				};

			case "RESET_USER":
				return {
					receiver: null,
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

	return (
		<ChatContext.Provider value={{ data: state, dispatch }}>
			{children}
		</ChatContext.Provider>
	);
};
