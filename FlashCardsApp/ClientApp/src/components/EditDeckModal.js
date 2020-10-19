import React, { useContext } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { updateDeck, deleteDeck } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import { FormGroup } from 'reactstrap';
import ModalContainer from './ModalContainer';
import DeckForm from './DeckForm';

const EditDeckModal = () => {
	const { editDeckModalIsOpen, toggleEditDeckModal } = useContext(Context);
	const { saveNewDecks, openedDeck } = useContext(DecksContext);

	const handleUpdate = async (deck) => {
		const token = getCookie('x-auth-token');
		try {
			await updateDeck({ ...deck }, token);
			saveNewDecks();
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleDeleteDeck = async (id) => {
		const token = getCookie('x-auth-token');
		try {
			await deleteDeck({ id }, token);
			saveNewDecks();
			toggleEditDeckModal();
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer show={editDeckModalIsOpen} toggle={toggleEditDeckModal} title="Update deck">
			<DeckForm handleFetchData={handleUpdate} deck={openedDeck} successFunc={toggleEditDeckModal}>
				<FormGroup>
					<input type="submit" className="btn btn-info btn-lg btn-block" value="Update" />
				</FormGroup>
				<FormGroup>
					<input
						className="btn btn-danger btn-lg btn-block"
						value="Delete"
						onClick={() => handleDeleteDeck(openedDeck.id)}
					/>
				</FormGroup>
			</DeckForm>
		</ModalContainer>
	);
};

export default EditDeckModal;
