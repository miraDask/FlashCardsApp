import React, { useState, createContext, useEffect } from 'react';

import { getCookie, deleteCookie } from '../utils/cookie';

const initialState = {
	user: null,
	isLoggedIn: false,
	saveUser: () => {},
	logout: () => {},
	toggleLoggedIn: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
	const [ user, setUser ] = useState('');
	const [ isLoggedIn, setLoggedIn ] = useState(false);

	const saveUser = (user) => setUser(user);

	const toggleLoggedIn = (value) => setLoggedIn(value);

	const logout = () => {
		setLoggedIn(false);
		deleteCookie('x-auth-token');
	};

	const fetchUser = async () => {
		const token = getCookie('x-auth-token');
		if (!token) {
			logout();
			return;
		}

		setLoggedIn(true);
	};

	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Context.Provider
			value={{
				user,
				isLoggedIn,
				logout,
				saveUser,
				toggleLoggedIn
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
