import React, { useState, useContext, useEffect, useCallback } from 'react';

import { CardsContext } from '../providers/cards-context.provider';
import { Context } from '../providers/global-context.provider';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import '../custom.css';
import {ICard} from '../contracts/card'

const CARD_HEADER_TEXT = {
	TERM: 'Term',
	DEFINITION: 'Definition'
};

interface Props {
	card: ICard
}

const CardContainer = ({ card } : Props) => {
	const [ text, setText ] = useState(card.term);
	const [ headerText, setHeaderText ] = useState(CARD_HEADER_TEXT.TERM);
	const { saveOpenedCard, updatedCards } = useContext(CardsContext);
	const { toggleEditCardModal } = useContext(Context);

	const showFrontSite = useCallback(
		() => {
			setText(card.term);
			setHeaderText(CARD_HEADER_TEXT.TERM);
		},
		[ card.term ]
	);

	const showBackSite = () => {
		setText(card.definition);
		setHeaderText(CARD_HEADER_TEXT.DEFINITION);
	};

	useEffect(
		() => {
			showFrontSite();
		},
		[ updatedCards, showFrontSite ]
	);

	const handleFlipCard = () => {
		if (text === card.term) {
			showBackSite();
		} else {
			showFrontSite();
		}
	};

	const openEditCardModal = (card : ICard) => {
		saveOpenedCard(card);
		toggleEditCardModal();
	};

	return (
		<Col sm="4" className="mt-4">
			<Card className="card">
				<Card.Header>
					<Row>
						<Col lg="10">{headerText} :</Col>
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
				</Card.Header>
				<Card.Body>
					<Card.Title className="text-center">{text}</Card.Title>
					<div className="text-center">
						<Button variant="outline-info" className="col-4 mt-4" onClick={handleFlipCard}>
							Flip
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default CardContainer;
