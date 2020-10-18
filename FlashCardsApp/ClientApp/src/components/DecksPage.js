import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalContainer from './ModalContainer';
import { Context } from '../providers/global-context.provider';
const DecksPage = () => {
	const { modalIsOpen, toggleModal } = useContext(Context);

	return (
		<div>
			<Button color="info" onClick={toggleModal} className="mr-0">
				Create Deck
			</Button>
			<ModalContainer show={modalIsOpen} title="Create new deck">
				<Form onSubmit={(e) => e.preventDefault()}>
					<FormGroup>
						<Input type="text" placeholder="Name" />
					</FormGroup>{' '}
					<FormGroup>
						<Input type="textarea" placeholder="Description" />
					</FormGroup>{' '}
				</Form>
			</ModalContainer>
		</div>
	);
};

export default DecksPage;
