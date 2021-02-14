import { getHeaders } from './common';
const API_URL = 'https://localhost:44387/api/user/';

export const registerUser = async (data) => {
	return fetchUser(data, API_URL + 'register');
};

export const loginUser = async (data) => {
	return fetchUser(data, API_URL + 'login');
};

const fetchUser = async (data, url, token = null) => {
	try {
		const result = await fetch(url, {
			method: 'POST',
			headers: getHeaders(token),
			body: JSON.stringify(data)
		});

		try {
			const dataToReturn = await result.json();
			return dataToReturn;
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};
