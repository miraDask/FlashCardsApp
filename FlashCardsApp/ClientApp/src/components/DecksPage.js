import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { getDecks } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Col, Spinner } from 'reactstrap';
import CreateDeckModal from './CreateDeckModal';
import DeckCard from './DeckCard';
import EditDeckModal from './EditDeckModal';
import EmptyCollection from './EmptyCollection';

const DECKS = 'Your decks :';

const DecksPage = () => {
	const [ decks, setDecks ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const { toggleCreateDeckModal } = useContext(Context);
	const { updatedDecks } = useContext(DecksContext);

	const getAllDecks = useCallback(async () => {
		const token = getCookie('x-auth-token');
		const response = await getDecks(token);
		setDecks(response.decks);
	}, []);

	useEffect(
		() => {
			getAllDecks();
			setIsLoading(false);
		},
		[ getAllDecks, updatedDecks ]
	);

	const renderDecks = () => {
		return decks.map((deck) => <DeckCard key={deck.id} deck={deck} />);
	};

	const renderCollection = () => {
		if (isLoading) {
			return <Spinner color="info" />;
		}

		return decks.length === 0 ? <EmptyCollection collectionName="decks" /> : renderDecks();
	};

	return (
		<div>
			<Row>
				<Col className="h3">{DECKS}</Col>
				<Button color="info" onClick={toggleCreateDeckModal} className="mr-0 float-right">
					Create Deck
				</Button>
			</Row>
			<Row className="mt-4">{renderCollection()}</Row>
			<CreateDeckModal />
			<EditDeckModal />
		</div>
	);
};

export default DecksPage;
