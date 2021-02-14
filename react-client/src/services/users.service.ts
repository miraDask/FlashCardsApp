import { getHeaders } from './common';
const API_URL = 'https://localhost:44387/api/user/';

export const registerUser = async (data : {username: string, password: string}) => {
	return fetchUser(data, API_URL + 'register', null);
};

export const loginUser = async (data: {username: string, password: string}) => {
	return fetchUser(data, API_URL + 'login', null);
};

const fetchUser = async (data : any, url : string, token: string | null) => {
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
