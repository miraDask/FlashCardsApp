import React, { useContext, Fragment } from 'react';
import { Context } from '../providers/global-context.provider';
import { DecksContext } from '../providers/decks-context.provider';

import { updateDeck, deleteDeck } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import Form from 'react-bootstrap/Form';
import ModalContainer from './ModalContainer';
import DeckForm from './DeckForm';
import { IDeck } from '../contracts/deck';

const EditDeckModal = () => {
	const { editDeckModalIsOpen, toggleEditDeckModal } = useContext(Context);
	const { saveNewDecks, openedDeck } = useContext(DecksContext);

	const handleUpdate = async (deck : IDeck) => {
		const token = getCookie('x-auth-token');
		try {
			await updateDeck({ ...deck }, token);
			saveNewDecks();
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleDeleteDeck = async (id : string) => {
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
				<Fragment>
				<Form.Group>
					<Form.Control type="submit" className="btn btn-info btn-lg btn-block" value="Update" />
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="button"
						className="btn btn-danger btn-lg btn-block"
						value="Delete"
						onClick={() => handleDeleteDeck(openedDeck.id)}
					/>
				</Form.Group>
				</Fragment>
			</DeckForm>
		</ModalContainer>
	);
};

export default EditDeckModal;
