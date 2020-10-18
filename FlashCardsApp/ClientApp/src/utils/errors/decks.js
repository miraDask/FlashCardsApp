import { validateName } from '../validations/decks';

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'name') {
				const { error } = validateName({ value });
				errorsObject = { ...errorsObject, name: error };
			}
		}
	});
	return errorsObject;
};
