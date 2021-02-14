import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';

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
		<Col sm="3" className="mt-4">
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
				<Card.Title>{deck.name}</Card.Title>
				<small>{deck.description}</small>
				<Dropdown.Divider />
				<Button variant="info" className="mt-2" onClick={() => handleClick(deck.id)}>
					See Cards
				</Button>
			</Card>
		</Col>
	);
};

export default DeckCard;
