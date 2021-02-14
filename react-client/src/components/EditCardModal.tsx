import React, { useContext, Fragment } from 'react';
import { Context } from '../providers/global-context.provider';
import { CardsContext } from '../providers/cards-context.provider';

import { updateCard, deleteCard } from '../services/cards.service';
import { getCookie } from '../utils/cookie';

import Form from 'react-bootstrap/Form';
import ModalContainer from './ModalContainer';
import CardForm from './CardForm';
import { ICard } from '../contracts/card';

const EditDeckModal = ({ deckId }: { deckId : string}) => {
	const { editCardModalIsOpen, toggleEditCardModal } = useContext(Context);
	const { saveNewCard, openedCard } = useContext(CardsContext);

	const handleUpdate = async (card : ICard) => {
		const token = getCookie('x-auth-token');
		try {
			await updateCard(card, token, deckId);
			saveNewCard();
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleDeleteDeck = async (id : string) => {
		const token = getCookie('x-auth-token');
		try {
			await deleteCard({ id }, token, deckId);
			saveNewCard();
			toggleEditCardModal();
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer show={editCardModalIsOpen} toggle={toggleEditCardModal} title="Update card">
			<CardForm handleFetchData={handleUpdate} card={openedCard} successFunc={toggleEditCardModal}>
			<Fragment>
				<Form.Group>
					<Form.Control type="submit" className="btn btn-info btn-lg btn-block" value="Update" />
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="button"
						className="btn btn-danger btn-lg btn-block"
						value="Delete"
						onClick={() => handleDeleteDeck(openedCard.id)}
					/>
				</Form.Group>
			</Fragment>
				</CardForm>
		</ModalContainer>
	);
};

export default EditDeckModal;
