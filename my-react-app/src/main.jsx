import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModalProvider, Modal } from '../context/modal.jsx'
import {Provider } from 'react-redux'
// import BrowserRouter from 'react-router-dom'

function Root() {
  return (
		<ModalProvider>
			{/* <Provider> */}
				{/* <BrowserRouter> */}
					<App />
					<Modal />
				{/* </BrowserRouter> */}
			{/* </Provider> */}
		</ModalProvider>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
