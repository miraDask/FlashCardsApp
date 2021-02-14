import React, { useState, createContext } from 'react';
import { ICard } from '../contracts/card';

const initialCard = {
	id: "",
	term: "",
	definition: ""
}

const initialState = {
	updatedCards: false,
	openedCard: initialCard,
	saveOpenedCard: (card : ICard) => {},
	saveNewCard: () => {}
};

interface Props{
	children: JSX.Element;
}

export const CardsContext = createContext(initialState);

const CardsContextProvider = ({ children } : Props) => {
	const [ updatedCards, setUpdatedCards ] = useState<boolean>(false);
	const [ openedCard, setOpenedCard ] = useState<ICard>(initialCard);

	const saveNewCard = () => setUpdatedCards(!updatedCards);
	const saveOpenedCard = (card : ICard) => setOpenedCard(card);

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
