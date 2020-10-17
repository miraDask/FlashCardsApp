import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalContextProvider from './providers/global-context.provider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
	<GlobalContextProvider>
		<BrowserRouter basename={baseUrl}>
			<App />
		</BrowserRouter>
	</GlobalContextProvider>,
	rootElement
);

registerServiceWorker();
