import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { Button, Row, Card, Col, CardTitle, DropdownItem } from 'reactstrap';

import { DecksContext } from '../providers/decks-context.provider';
import { Context } from '../providers/global-context.provider';

import '../custom.css';

const DeckCard = ({ deck }) => {
	const { saveOpenedDeck } = useContext(DecksContext);
	const { toggleEditDeckModal } = useContext(Context);
	const history = useHistory();

	const openEditDeckModal = (deck) => {
		saveOpenedDeck(deck);
		toggleEditDeckModal();
	};

	const handleClick = (id) => {
		history.push(`/user/decks/${id}/cards`);
	};

	return (
		<Col sm="3" className="mt-4 h-100">
			<Card body>
				<Row>
					<Col lg="10" />
					<Col
						lg="1"
						className="custom-btn float-right"
						onClick={() => {
							openEditDeckModal(deck);
						}}
					>
						<EditIcon />
					</Col>
				</Row>
				<CardTitle>{deck.name}</CardTitle>
				<small>{deck.description}</small>
				<DropdownItem divider />
				<Button color="info" outline className="mt-2" onClick={() => handleClick(deck.id)}>
					See Cards
				</Button>
			</Card>
		</Col>
	);
};

export default DeckCard;
