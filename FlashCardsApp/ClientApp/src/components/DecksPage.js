import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { getDecks } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Col } from 'reactstrap';
import CreateDeckModal from './CreateDeckModal';
import DeckCard from './DeckCard';
import EditDeckModal from './EditDeckModal';

const NO_DECKS = 'Create new deck and start learning';
const DECKS = 'Your decks :';

const DecksPage = () => {
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

	const renderDecks = () => {
		return decks.map((deck) => <DeckCard key={deck.id} deck={deck} />);
	};

	return (
		<div>
			<Row>
				<Col className="h3">{decks.length === 0 ? NO_DECKS : DECKS}</Col>
				<Button color="info" onClick={toggleCreateDeckModal} className="mr-0 float-right">
					Create Deck
				</Button>
			</Row>
			<Row className="mt-4">{renderDecks()}</Row>
			<CreateDeckModal />
			<EditDeckModal />
		</div>
	);
};

export default DecksPage;
