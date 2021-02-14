import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from './providers/global-context.provider';
import DecksContextProvider from './providers/decks-context.provider';
import CardsContextProvider from './providers/cards-context.provider';

import App from './App';
const rootElement = document.getElementById('root');

ReactDOM.render(
	<GlobalContextProvider>
		<DecksContextProvider>
			<CardsContextProvider>
				<BrowserRouter basename="/">
					<App />
				</BrowserRouter>
			</CardsContextProvider>
		</DecksContextProvider>
	</GlobalContextProvider>,
	rootElement
);
