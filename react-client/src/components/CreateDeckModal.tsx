import React, { useContext } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { createDeck } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import FormGroup from 'react-bootstrap/FormGroup';
import ModalContainer from './ModalContainer';
import DeckForm from './DeckForm';

import { IDeck } from '../contracts/deck'

const CreateDeckModal = () => {
	const { createDeckModalIsOpen, toggleCreateDeckModal } = useContext(Context);
	const { saveNewDecks } = useContext(DecksContext);

	const handleCreate = async (deck : IDeck) => {
		const token = getCookie('x-auth-token');
		try {
			await createDeck({ ...deck }, token);
			saveNewDecks();
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer show={createDeckModalIsOpen} toggle={toggleCreateDeckModal} title="Create new deck">
			<DeckForm handleFetchData={handleCreate} successFunc={toggleCreateDeckModal} deck={null}>
				<FormGroup>
					<input type="submit" className="btn btn-info btn-lg btn-block" value="Create" />
				</FormGroup>
			</DeckForm>
		</ModalContainer>
	);
};

export default CreateDeckModal;
