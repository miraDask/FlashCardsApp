import React, { useContext } from 'react';
import { Context } from '../providers/global-context.provider';

import { createDeck } from '../services/decks.service';
import { getCookie } from '../utils/cookie';

import ModalContainer from './ModalContainer';
import DeckForm from './DeckForm';

const CreateDeckModal = () => {
	const { modalIsOpen } = useContext(Context);

	const handleCreate = async (deck) => {
		console.log('deck', deck);
		const token = getCookie('x-auth-token');
		try {
			await createDeck({ ...deck }, token);
			return true;
		} catch (error) {
			return false;
		}
	};

	return (
		<ModalContainer show={modalIsOpen} title="Create new deck">
			<DeckForm btnTitle="Create" handleFetchData={handleCreate}>
				<div className="form-group">
					<input type="submit" className="btn btn-info btn-lg btn-block" value="Create" />
				</div>
			</DeckForm>
		</ModalContainer>
	);
};

export default CreateDeckModal;
