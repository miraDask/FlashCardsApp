import React, { useState, createContext, useEffect } from 'react';

import { getCookie, deleteCookie } from '../utils/cookie';

const initialState = {
	user: null,
	isLoggedIn: false,
	createDeckModalIsOpen: false,
	editDeckModalIsOpen: false,
	createCardModalIsOpen: false,
	editCardModalIsOpen: false,
	saveUser: () => {},
	logout: () => {},
	toggleLoggedIn: () => {},
	toggleCreateDeckModal: () => {},
	toggleEditDeckModal: () => {},
	toggleCreateCardModal: () => {},
	toggleEditCardModal: () => {}
};

export const Context = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
	const [ user, setUser ] = useState('');
	const [ isLoggedIn, setLoggedIn ] = useState(false);
	const [ createDeckModalIsOpen, setCreateDeckModalIsOpen ] = useState(false);
	const [ editDeckModalIsOpen, setEditDeckModalIsOpen ] = useState(false);
	const [ createCardModalIsOpen, setCreateCardModalIsOpen ] = useState(false);
	const [ editCardModalIsOpen, setEditCardModalIsOpen ] = useState(false);

	const saveUser = (user) => setUser(user);

	const toggleLoggedIn = (value) => setLoggedIn(value);
	const toggleCreateDeckModal = () => setCreateDeckModalIsOpen(!createDeckModalIsOpen);
	const toggleEditDeckModal = () => setEditDeckModalIsOpen(!editDeckModalIsOpen);
	const toggleCreateCardModal = () => setCreateCardModalIsOpen(!createCardModalIsOpen);
	const toggleEditCardModal = () => setEditCardModalIsOpen(!editCardModalIsOpen);
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
				createDeckModalIsOpen,
				editDeckModalIsOpen,
				createCardModalIsOpen,
				editCardModalIsOpen,
				logout,
				saveUser,
				toggleLoggedIn,
				toggleCreateDeckModal,
				toggleEditDeckModal,
				toggleEditCardModal,
				toggleCreateCardModal
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default GlobalContextProvider;
