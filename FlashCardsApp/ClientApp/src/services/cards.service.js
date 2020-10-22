import { fetcher, getHeaders } from './common';

export const createCard = async (data, token, id) => {
	await fetchCards('POST', token, data, id);
};

export const updateCard = async (data, token, id) => {
	await fetchCards('PATCH', token, data, id);
};

export const deleteCard = async (data, token, id) => {
	await fetchCards('DELETE', token, data, id);
};

export const getCards = async (token, id) => {
	const headers = getHeaders(token);
	const url = getUrl(id);

	try {
		const response = await fetcher(url, 'GET', headers);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const fetchCards = async (method, token, data, id) => {
	const headers = getHeaders(token);
	const url = getUrl(id);
	await fetcher(url, method, headers, data);
};

const getUrl = (id) => {
	return `api/user/decks/${id}/cards`;
};
