export const getCookie = (name : string) => {
	const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return cookieValue ? cookieValue[2] : null;
};

export const deleteCookie = (name : string) => {
	document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const setCookie = (name : string, value: string) => {
	document.cookie = `${name}=${value}`;
};
