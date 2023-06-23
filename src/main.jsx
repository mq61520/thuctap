import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import GlobalStyles from './layouts/GlobalStyle';
import store, { persistor } from './app/store';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <GlobalStyles>
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <App />

               <ToastContainer />
            </PersistGate>
         </Provider>
      </GlobalStyles>
   </React.StrictMode>,
);
