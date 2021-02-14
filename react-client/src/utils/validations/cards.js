import { getValidationResult } from './index';

const CARD = {
	TERM_MIN_LENGTH: 1,
	TERM_MAX_LENGTH: 100,
	DEFINITION_MIN_LENGTH: 1,
	DEFINITION_MAX_LENGTH: 300
};

const ERROR_MESSAGES = {
	CARD: {
		TERM: `Term should be between ${CARD.TERM_MIN_LENGTH}
		 and ${CARD.TERM_MAX_LENGTH} characters long`,
		TERM_REQUIRED: 'Term is required',
		DEFINITION: `Definition should be between ${CARD.DEFINITION_MIN_LENGTH}
        and ${CARD.DEFINITION_MAX_LENGTH} characters long`,
		DEFINITION_REQUIRED: 'Definition is required'
	}
};

export const validateTerm = ({ term }) => {
	if (!term) {
		return getValidationResult(false, ERROR_MESSAGES.CARD.TERM_REQUIRED);
	}

	const isValid = term.length >= CARD.TERM_MIN_LENGTH && term.length <= CARD.TERM_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.CARD.TERM);
};

export const validateDefinition = ({ definition }) => {
	if (!definition) {
		return getValidationResult(false, ERROR_MESSAGES.CARD.DEFINITION_REQUIRED);
	}

	const isValid = definition.length >= CARD.DEFINITION_MIN_LENGTH && definition.length <= CARD.DEFINITION_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.CARD.DEFINITION);
};
