import React, { useState, useContext, useEffect } from 'react';

import { CardsContext } from '../providers/cards-context.provider';
import { Context } from '../providers/global-context.provider';

import { Card, Button, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import '../custom.css';

const Example = ({ card }) => {
	const [ text, setText ] = useState(card.term);
	const { saveOpenedCard, updatedCards } = useContext(CardsContext);
	const { toggleEditCardModal } = useContext(Context);

	useEffect(
		() => {
			setText(card.term);
		},
		[ updatedCards, card.term ]
	);

	const handleFlipCard = () => {
		console.log('text', text);
		console.log('term', card.term);

		if (text === card.term) {
			setText(card.definition);
		} else {
			setText(card.term);
		}
	};

	const openEditCardModal = (card) => {
		saveOpenedCard(card);
		toggleEditCardModal();
	};

	return (
		<Col sm="4" className="mt-4">
			<Card>
				<CardHeader>
					<Row>
						<Col lg="10" />
						<Col
							lg="1"
							className="custom-btn float-right"
							onClick={() => {
								openEditCardModal(card);
							}}
						>
							<EditIcon />
						</Col>
					</Row>
				</CardHeader>
				<CardBody>
					<CardTitle>{text}</CardTitle>
					<Button className="btn-info" onClick={handleFlipCard}>
						Flip card
					</Button>
				</CardBody>
			</Card>
		</Col>
	);
};

export default Example;
