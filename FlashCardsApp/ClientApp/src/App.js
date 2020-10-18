import React, { useContext } from 'react';
import { Context } from './providers/global-context.provider';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import RegisterPage from './components/RegisterPage';
import DecksPage from './components/DecksPage';

import './custom.css';

const App = () => {
	const { isLoggedIn } = useContext(Context);

	return (
		<Layout>
			<Route exact path="/" render={() => (!isLoggedIn ? <Home /> : <Redirect to="/user/decks" />)} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/user/decks" component={DecksPage} />
		</Layout>
	);
};

export default App;
