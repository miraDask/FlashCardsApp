import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import RegisterPage from './components/RegisterPage';

import './custom.css';

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Layout>
				<Route exact path="/" component={Home} />
				<Route path="/register" component={RegisterPage} />
				<Route path="/fetch-data" component={FetchData} />
			</Layout>
		);
	}
}
