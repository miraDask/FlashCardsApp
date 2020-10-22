import React, { useState, useContext, useEffect, useCallback } from 'react';

import { CardsContext } from '../providers/cards-context.provider';
import { Context } from '../providers/global-context.provider';

import { Card, Button, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import '../custom.css';

const CARD_HEADER_TEXT = {
	TERM: 'Term',
	DEFINITION: 'Definition'
};

const Example = ({ card }) => {
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

	const openEditCardModal = (card) => {
		saveOpenedCard(card);
		toggleEditCardModal();
	};

	return (
		<Col sm="4" className="mt-4">
			<Card>
				<CardHeader>
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
				</CardHeader>
				<CardBody>
					<CardTitle className="text-center">{text}</CardTitle>
					<div className="text-center">
						<Button className="btn-info col-md-4" onClick={handleFlipCard}>
							Flip card
						</Button>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default Example;
