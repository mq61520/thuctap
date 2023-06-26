import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';

import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import paySlice from './slices/paySlice';
import productSlice from './slices/productSlice';

const persistConfig = {
   key: 'root',
   storage,
};

const rootReducer = {
   auth: authSlice,
   cart: cartSlice,
   pay: paySlice,
   product: productSlice,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);

export default store;
