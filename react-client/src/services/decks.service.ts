import { fetcher, getHeaders } from './common';
import { IDeck } from '../contracts/deck'
const API_URL = 'https://localhost:44387/api/user/decks';

export const createDeck = async (data : IDeck, token : string | null) => {
	await fetchDeck('POST', token, data);
};

export const updateDeck = async (data : IDeck, token : string | null) => {
	await fetchDeck('PATCH', token, data);
};

export const deleteDeck = async (data : {id : string}, token : string | null) => {
	await fetchDeck('DELETE', token, data);
};

export const getDecks = async (token: string | null) => {
	const headers = getHeaders(token);

	try {
		const response = await fetcher(API_URL, 'GET', headers, null);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const fetchDeck = async (method : string, token: string | null, data : {id : string}) => {
	const headers = getHeaders(token);
	try {
		await fetcher(API_URL, method, headers, data);
	} catch (error) {
		console.log(error);
		return error;
	}
};
