import { fetcher, getHeaders } from './common';
const API_URL = 'api/user/decks';

export const createDeck = async (data, token) => {
	await fetchDeck('POST', token, data);
};

export const updateDeck = async (data, token) => {
	await fetchDeck('PATCH', token, data);
};

export const deleteDeck = async (data, token) => {
	await fetchDeck('DELETE', token, data);
};

export const getDecks = async (token) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL, 'GET', headers);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const fetchDeck = async (method, token, data) => {
	const headers = getHeaders(token);
	try {
		await fetcher(API_URL, method, headers, data);
	} catch (error) {
		console.log(error);
		return error;
	}
};
