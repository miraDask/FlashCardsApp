import React, { useState, createContext } from 'react';
import { IDeck } from '../contracts/deck';

const initialDeck = {
	id: "",
	name: "",
	description: ""
}

const initialState = {
	updatedDecks: false,
	openedDeck: initialDeck,
	saveOpenedDeck: (deck : IDeck) => {},
	saveNewDecks: () => {}
};

interface Props{
	children: JSX.Element;
}

export const DecksContext = createContext(initialState);

const DecksContextProvider = ({ children } : Props) => {
	const [ updatedDecks, setUpdatedDecks ] = useState(false);
	const [ openedDeck, setOpenedDecks ] = useState<IDeck>(initialDeck);

	const saveNewDecks = () => setUpdatedDecks(!updatedDecks);
	const saveOpenedDeck = (deck : IDeck) => setOpenedDecks(deck);

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
