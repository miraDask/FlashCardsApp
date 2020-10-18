import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { getDecks } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Card, Col, CardTitle, CardText } from 'reactstrap';
import CreateDeckModal from './CreateDeckModal';
import DeckCard from './DeckCard';

const DecksPage = () => {
	const { toggleModal } = useContext(Context);
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

	return (
		<div>
			<Row>
				<Col />
				<Button color="info" onClick={toggleModal} className="mr-0 float-right">
					Create Deck
				</Button>
			</Row>
			<Row className="mt-4">{decks.map((deck) => <DeckCard deck={deck} />)}</Row>
			<CreateDeckModal />
		</div>
	);
};

export default DecksPage;
