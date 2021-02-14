import { validateDefinition, validateTerm } from '../validations/cards';

export const getEmptyInputsErrorsObject = (inputsObject : any) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'term') {
				const { error } = validateTerm({ term: value });
				errorsObject = { ...errorsObject, term: error };
			} else if (key === 'definition') {
				const { error } = validateDefinition({ definition: value });
				errorsObject = { ...errorsObject, definition: error };
			}
		}
	});
	return errorsObject;
};
