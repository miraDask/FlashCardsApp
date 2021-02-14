import { validatePassword, validateConfirmPassword, validateUsername } from '../validations/auth';

export const getEmptyInputsErrorsObject = (inputsObject : any) => {
	let errorsObject = {};
	Object.keys(inputsObject).forEach((key) => {
		const value : string = inputsObject[key];
		if (!value) {
			if (key === 'username') {
				const { error } = validateUsername({ username : value });
				errorsObject = { ...errorsObject, username: error };
			} else if (key === 'password') {
				const { error } = validatePassword({ password : value });
				errorsObject = { ...errorsObject, password: error };
			} else {
				const { error } = validateConfirmPassword({ password: "", confirmPassword: value });
				errorsObject = { ...errorsObject, confirmPassword: error };
			}
		}
	});
	return errorsObject;
};
