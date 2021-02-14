export const getValidationResult = (isValid : boolean, message : string) => {
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
