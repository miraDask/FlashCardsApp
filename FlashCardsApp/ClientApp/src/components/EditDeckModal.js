import React, { useContext } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { updateDeck } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

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

	return (
		<ModalContainer show={editDeckModalIsOpen} toggle={toggleEditDeckModal} title="Update deck">
			<DeckForm handleFetchData={handleUpdate} deck={openedDeck} successFunc={toggleEditDeckModal}>
				<div className="form-group">
					<input type="submit" className="btn btn-info btn-lg btn-block" value="Update" />
				</div>
			</DeckForm>
		</ModalContainer>
	);
};

export default EditDeckModal;
