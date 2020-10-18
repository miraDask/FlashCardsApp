import { fetcher, getHeaders } from './common';
const API_URL = 'api/user/decks';

export const createDeck = async (data, token) => {
	const headers = getHeaders(token);

	try {
		await fetcher(API_URL, 'POST', headers, data);
	} catch (error) {
		console.log(error);
		return error;
	}
};
