import { getValidationResult } from './index';

const USER = {
	USERNAME_MIN_LENGTH: 6,
	USERNAME_MAX_LENGTH: 20,
	PASSWORD_MIN_LENGTH: 6
};

const ERROR_MESSAGES = {
	USER: {
		USERNAME: `Username should be between ${USER.USERNAME_MIN_LENGTH}
		 and ${USER.USERNAME_MAX_LENGTH} characters long`,
		USERNAME_REQUIRED: 'Username is required',
		PASSWORD_REQUIRED: 'Password is required',
		PASSWORD_LENGTH: `Password should be at least ${USER.PASSWORD_MIN_LENGTH} characters long`,
		PASSWORDS_NOT_MATCH: 'Passwords should match',
		CONFIRM_PASSWORD_REQUIRED: 'Password confirmation is required'
	}
};

export const validateUsername = ({ username } : { username: string}) => {
	if (!username) {
		return getValidationResult(false, ERROR_MESSAGES.USER.USERNAME_REQUIRED);
	}

	const isValid = username.length >= USER.USERNAME_MIN_LENGTH && username.length <= USER.USERNAME_MAX_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.USERNAME);
};

export const validatePassword = ({ password } : { password : string}) => {
	if (!password) {
		return getValidationResult(false, ERROR_MESSAGES.USER.PASSWORD_REQUIRED);
	}
	const isValid = password.length >= USER.PASSWORD_MIN_LENGTH;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.PASSWORD_LENGTH);
};

export const validateConfirmPassword = ({ password, confirmPassword } : { password : string, confirmPassword : string}) => {
	if (!confirmPassword) {
		return getValidationResult(false, ERROR_MESSAGES.USER.CONFIRM_PASSWORD_REQUIRED);
	}

	const isValid = !password ? false : password === confirmPassword;
	return getValidationResult(isValid, ERROR_MESSAGES.USER.PASSWORDS_NOT_MATCH);
};
