interface Headers {
	Accept: string;
	'Content-Type': string;
	authorization : string
}
const headers : Headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	authorization : ''
};

export const getHeaders = (token: string | null) : any => {
	return token
		? {
				...headers,
				authorization: `Bearer ${token}`
			}
		: headers;
};

export const fetcher = async (url: string, method: string, headers : any, data: any | null) => {
	return fetch(url, {
		method,
		headers,
		body: data ? JSON.stringify(data) : null
	});
};
