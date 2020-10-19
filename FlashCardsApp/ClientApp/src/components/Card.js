import React, { useState } from 'react';
import { Card, Button, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import '../custom.css';

const Example = ({ card }) => {
	const [ text, setText ] = useState(card.term);

	const handleFlipCard = () => {
		if (text === card.term) {
			setText(card.definition);
		} else {
			setText(card.term);
		}
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
								//openEditCardModal(deck);
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
