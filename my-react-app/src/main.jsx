import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

import './index.css'

import { ModalProvider, Modal } from '../context/modal.jsx'
import configureAppStore from './store'

let store = configureAppStore();

if (process.env.NODE_ENV !== 'production') {
	window.store = store;
};

function Root() {
  return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
