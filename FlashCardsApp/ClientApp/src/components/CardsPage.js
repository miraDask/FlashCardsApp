import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../providers/global-context.provider';
import { CardsContext } from '../providers/cards-context.provider';
import { useParams } from 'react-router-dom';
import { getCards } from '../services/cards.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Col } from 'reactstrap';
import CreateCardModal from './CreateCardModal';
import Card from './Card';
import EditCardModal from './EditCardModal';

const CardsPage = () => {
	const { toggleCreateCardModal } = useContext(Context);
	const [ cards, setCards ] = useState([]);
	const [ deckName, setDeckName ] = useState('');
	const { updatedCards } = useContext(CardsContext);
	const { deckId } = useParams();

	const getAllCards = useCallback(
		async () => {
			const token = getCookie('x-auth-token');
			const response = await getCards(token, deckId);
			setCards(response.cards);
			setDeckName(response.deckName);
		},
		[ deckId ]
	);

	useEffect(
		() => {
			getAllCards();
		},
		[ getAllCards, updatedCards ]
	);

	const renderCards = () => {
		return cards.map((c) => <Card card={c} key={c.id} />);
	};

	return (
		<Row>
			<Col className="h3">{`All cards in : ${deckName}`}</Col>
			<Button color="success" onClick={toggleCreateCardModal} className="mr-0 float-right">
				Add new Card
			</Button>
			<Row className="mt-4">{renderCards()}</Row>
			<CreateCardModal deckId={deckId} />
			<EditCardModal deckId={deckId} />
		</Row>
	);
};

export default CardsPage;
