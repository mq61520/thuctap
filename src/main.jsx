import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import GlobalStyles from './layouts/GlobalStyle';
import store from './app/store';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <GlobalStyles>
         <Provider store={store}>
            <App />

            <ToastContainer />
         </Provider>
      </GlobalStyles>
   </React.StrictMode>,
);
