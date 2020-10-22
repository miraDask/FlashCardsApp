import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from '../providers/global-context.provider';
import { CardsContext } from '../providers/cards-context.provider';
import { useParams } from 'react-router-dom';
import { getCards } from '../services/cards.service';
import { getCookie } from '../utils/cookie';

import { Button, Row, Col, Badge, Spinner } from 'reactstrap';
import CreateCardModal from './CreateCardModal';
import CardContainer from './Card';
import EditCardModal from './EditCardModal';
import EmptyCollection from './EmptyCollection';

const PAGE_TEXT = 'All cards in : ';

const CardsPage = () => {
	const { toggleCreateCardModal } = useContext(Context);
	const [ cards, setCards ] = useState([]);
	const [ deckName, setDeckName ] = useState('');
	const [ isLoading, setIsLoading ] = useState(true);
	const { updatedCards } = useContext(CardsContext);
	const history = useHistory();
	const { deckId } = useParams();

	const getAllCards = useCallback(
		async () => {
			const token = getCookie('x-auth-token');
			const response = await getCards(token, deckId);

			if (response.deckName === null) {
				history.push(`/error`);
			} else {
				setCards(response.cards);
				setDeckName(response.deckName);
				setTimeout(() => {
					setIsLoading(false);
				}, 100);
			}
		},
		[ deckId, history ]
	);

	useEffect(
		() => {
			getAllCards();
		},
		[ getAllCards, updatedCards ]
	);

	const renderCards = () => {
		return cards.map((c) => <CardContainer card={c} key={c.id} />);
	};

	const renderCollection = () => {
		if (isLoading) {
			return <Spinner color="info" />;
		}

		return cards.length === 0 ? <EmptyCollection collectionName="cards" /> : renderCards();
	};

	return (
		<div>
			<Row>
				<Col className="h3">
					{PAGE_TEXT}
					<Badge color="warning" pill>
						{deckName}
					</Badge>
				</Col>
				<Button color="success" onClick={toggleCreateCardModal} className="mr-0 float-right">
					Add Card
				</Button>
			</Row>
			<Row className="mt-4">{renderCollection()}</Row>
			<CreateCardModal deckId={deckId} />
			<EditCardModal deckId={deckId} />
		</div>
	);
};

export default CardsPage;
