import { fetcher, getHeaders } from './common';
import { ICard } from '../contracts/card';
import { IDeck } from '../contracts/deck';

export const createCard = async (data : IDeck, token : string | null, id: string) => {
	await fetchCards('POST', token, data, id);
};

export const updateCard = async (data : ICard, token: string | null, id: string) => {
	await fetchCards('PATCH', token, data, id);
};

export const deleteCard = async (data : {id : string}, token: string | null, id: string) => {
	await fetchCards('DELETE', token, data, id);
};

export const getCards = async (token: string | null, id: string) => {
	const headers = getHeaders(token);
	const url = getUrl(id);

	try {
		const response = await fetcher(url, 'GET', headers, null);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const fetchCards = async (method: string, token: string | null, data: any, id: string) => {
	const headers = getHeaders(token);
	const url = getUrl(id);
	await fetcher(url, method, headers, data);
};

const getUrl = (id : string) => {
	return `https://localhost:44387/api/user/decks/${id}/cards`;
};
