import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { getDecks } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Col } from 'reactstrap';
import CreateDeckModal from './CreateDeckModal';
import DeckCard from './DeckCard';
import EditDeckModal from './EditDeckModal';

const CardsPage = () => {
	const { toggleCreateDeckModal } = useContext(Context);
	const [ decks, setDecks ] = useState([]);
	const { updatedDecks } = useContext(DecksContext);

	const getAllDecks = useCallback(async () => {
		const token = getCookie('x-auth-token');

		const response = await getDecks(token);
		setDecks(response.decks);
	}, []);

	useEffect(
		() => {
			getAllDecks();
		},
		[ getAllDecks, updatedDecks ]
	);

	return <div>All Cards</div>;
};

export default CardsPage;
