const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

export const getHeaders = (token = null) => {
	return token
		? {
				...headers,
				authorization: `Bearer ${token}`
			}
		: headers;
};

export const fetcher = async (url, method, headers, data = null) => {
	return fetch(url, {
		method,
		headers,
		body: data ? JSON.stringify(data) : null
	});
};
