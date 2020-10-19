import React, { useState, createContext } from 'react';

const initialState = {
	updatedDecks: [],
	openedDeck: null,
	saveOpenedDeck: () => {},
	saveNewDecks: () => {}
};

export const DecksContext = createContext(initialState);

const DecksContextProvider = ({ children }) => {
	const [ updatedDecks, setUpdatedDecks ] = useState([]);
	const [ openedDeck, setOpenedDecks ] = useState(null);

	const saveNewDecks = () => setUpdatedDecks([ ...updatedDecks, 1 ]);
	const saveOpenedDeck = (deck) => setOpenedDecks(deck);

	return (
		<DecksContext.Provider
			value={{
				updatedDecks,
				saveNewDecks,
				openedDeck,
				saveOpenedDeck
			}}
		>
			{children}
		</DecksContext.Provider>
	);
};

export default DecksContextProvider;
