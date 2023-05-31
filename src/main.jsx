import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import GlobalStyles from './layouts/GlobalStyle';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <GlobalStyles>
         <Provider store={store}>
            <App />
         </Provider>
      </GlobalStyles>
   </React.StrictMode>,
);
