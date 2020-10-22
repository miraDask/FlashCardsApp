import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, NavLink, Row } from 'reactstrap';

const ERROR = {
	TYPE: '404',
	TEXT: 'The page you are looking for was not found.'
};

const ErrorPage = ({ errorType = null, errorText = null }) => {
	const [ error, setError ] = useState(ERROR.TYPE);
	const [ text, setText ] = useState(ERROR.TEXT);

	useEffect(
		() => {
			if (errorType && errorText) {
				setError(errorType);
				setText(errorText);
			}
		},
		[ errorText, errorType ]
	);

	return (
		<div className="d-flex flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<Col md="12" className="text-center">
						<span className="display-1 d-block">{error}</span>
						<div className="mb-4 lead">{text}</div>
						<NavLink tag={Link} className="btn btn-link" to="/">
							Back to Home
						</NavLink>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ErrorPage;
