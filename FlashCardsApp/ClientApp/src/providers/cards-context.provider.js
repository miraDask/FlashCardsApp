import React, { useState, createContext } from 'react';

const initialState = {
	updatedCards: [],
	openedCard: null,
	saveOpenedCard: () => {},
	saveNewCard: () => {}
};

export const CardsContext = createContext(initialState);

const CardsContextProvider = ({ children }) => {
	const [ updatedCards, setUpdatedCards ] = useState([]);
	const [ openedCard, setOpenedCard ] = useState(null);

	const saveNewCard = () => setUpdatedCards([ ...updatedCards, 1 ]);
	const saveOpenedCard = (card) => setOpenedCard(card);

	return (
		<CardsContext.Provider
			value={{
				openedCard,
				saveOpenedCard,
				updatedCards,
				saveNewCard
			}}
		>
			{children}
		</CardsContext.Provider>
	);
};

export default CardsContextProvider;
