export const getValidationResult = (isValid, message) => {
	if (isValid === false) {
		return {
			isValid: false,
			error: message
		};
	}

	return {
		isValid
	};
};
