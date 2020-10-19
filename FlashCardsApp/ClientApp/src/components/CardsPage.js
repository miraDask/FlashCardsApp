import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../providers/global-context.provider';
import { CardsContext } from '../providers/cards-context.provider';
import { useParams } from 'react-router-dom';
import { getCards } from '../services/cards.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Col } from 'reactstrap';
import CreateCardModal from './CreateCardModal';
//import Card from './Card';
//import EditCardModal from './EditCardModal';
const NO_CARDS = 'Create cards and start learning';
const CARDS = 'All cards:';

const CardsPage = () => {
	const { toggleCreateCardModal } = useContext(Context);
	const [ cards, setCards ] = useState([]);
	const { updatedCards } = useContext(CardsContext);
	const { deckId } = useParams();

	const getAllCards = useCallback(
		async () => {
			const token = getCookie('x-auth-token');
			const response = await getCards(token, deckId);
			setCards(response.cards);
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
		return cards.map((c) => (
			<div className="col-4">
				{c.term} , {c.definition} , {c.id}
			</div>
		));
	};

	return (
		<Row>
			<Col className="h3">{cards.length === 0 ? NO_CARDS : CARDS}</Col>
			<Button color="success" onClick={toggleCreateCardModal} className="mr-0 float-right">
				Add new Card
			</Button>
			<CreateCardModal deckId={deckId} />
			<Row className="mt-4">{renderCards()}</Row>
		</Row>
	);
};

export default CardsPage;
