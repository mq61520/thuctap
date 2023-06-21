import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';

const rootReducer = {
   auth: authSlice,
   cart: cartSlice,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
