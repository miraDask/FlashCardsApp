import React from 'react';
import { Container, Col, Row } from 'reactstrap';

const TEXT = 'Create some and start learning';

const EmptyCollection = ({ collectionName }) => {
	const getMessage = () => {
		return `Your ${collectionName} collection is empty at the moment`;
	};

	return (
		<div className="d-flex flex-row align-items-center">
			<Container>
				<Row className="justify-content-center p-3 m-5">
					<Col md="12" className="text-center">
						<span className="display-4 d-block">{getMessage()}</span>
						<div className="mb-4 lead">{TEXT}</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default EmptyCollection;
