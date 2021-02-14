import { getValidationResult } from './index';

const DECK = {
	NAME_MIN_LENGTH: 1,
	NAME_MAX_LENGTH: 30,
	DESCRIPTION_MAX_LENGTH: 300
};

const ERROR_MESSAGES = {
	DECK: {
		NAME: `Name should be between ${DECK.NAME_MIN_LENGTH}
		 and ${DECK.NAME_MAX_LENGTH} characters long`,
		NAME_REQUIRED: 'Name is required',
		DESCRIPTION_LENGTH: `Description should be maximum ${DECK.DESCRIPTION_MAX_LENGTH} characters long`
	}
};

export const validateName = ({ name } : { name : string }) => {
	if (!name) {
		return getValidationResult(false, ERROR_MESSAGES.DECK.NAME_REQUIRED);
	}

	const isValid = name.length >= DECK.NAME_MIN_LENGTH && name.length <= DECK.NAME_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.DECK.NAME);
};

export const validateDescription = ({ description } : { description : string}) => {
	const isValid = description.length <= DECK.DESCRIPTION_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.DECK.DESCRIPTION_LENGTH);
};
