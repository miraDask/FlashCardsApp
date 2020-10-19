import React, { useContext } from 'react';
import { Context } from '../providers/global-context.provider';
import { CardsContext } from '../providers/cards-context.provider';

import { createCard } from '../services/cards.service';
import { getCookie } from '../utils/cookie';

import { FormGroup } from 'reactstrap';
import ModalContainer from './ModalContainer';
import CardForm from './CardForm';

const CreateCardModal = ({ deckId }) => {
	const { createCardModalIsOpen, toggleCreateCardModal } = useContext(Context);
	const { saveNewCard } = useContext(CardsContext);

	const handleCreate = async (deck) => {
		const token = getCookie('x-auth-token');
		try {
			await createCard({ ...deck }, token, deckId);
			saveNewCard();
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer show={createCardModalIsOpen} toggle={toggleCreateCardModal} title="Create new card">
			<CardForm handleFetchData={handleCreate} successFunc={toggleCreateCardModal}>
				<FormGroup>
					<input type="submit" className="btn btn-info btn-lg btn-block" value="Create" />
				</FormGroup>
			</CardForm>
		</ModalContainer>
	);
};

export default CreateCardModal;
