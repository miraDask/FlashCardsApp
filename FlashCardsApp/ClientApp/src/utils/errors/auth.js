import { validatePassword, validateConfirmPassword, validateUsername } from '../validations/auth';

export const getEmptyInputsErrorsObject = (inputsObject) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value = inputsObject[key];
		if (!value) {
			if (key === 'username') {
				const { error } = validateUsername({ value });
				errorsObject = { ...errorsObject, username: error };
			} else if (key === 'password') {
				const { error } = validatePassword({ value });
				errorsObject = { ...errorsObject, password: error };
			} else {
				const { error } = validateConfirmPassword({ value });
				errorsObject = { ...errorsObject, confirmPassword: error };
			}
		}
	});
	return errorsObject;
};
