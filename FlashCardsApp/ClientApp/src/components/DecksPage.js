import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import CreateDeckModal from './CreateDeckModal';
import { Context } from '../providers/global-context.provider';
const DecksPage = () => {
	const { toggleModal } = useContext(Context);

	return (
		<div>
			<Button color="info" onClick={toggleModal} className="mr-0">
				Create Deck
			</Button>
			<CreateDeckModal />
		</div>
	);
};

export default DecksPage;
