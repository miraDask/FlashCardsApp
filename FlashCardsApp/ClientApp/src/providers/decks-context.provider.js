import React, { useState, createContext } from 'react';

const initialState = {
	updatedDecks: [],
	saveNewDecks: () => {}
};

export const DecksContext = createContext(initialState);

const DecksContextProvider = ({ children }) => {
	const [ updatedDecks, setUpdatedDecks ] = useState([]);

	const saveNewDecks = () => setUpdatedDecks([ ...updatedDecks, 1 ]);

	return (
		<DecksContext.Provider
			value={{
				updatedDecks,
				saveNewDecks
			}}
		>
			{children}
		</DecksContext.Provider>
	);
};

export default DecksContextProvider;
