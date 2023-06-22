import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import paySlice from './slices/paySlice';

const rootReducer = {
   auth: authSlice,
   cart: cartSlice,
   pay: paySlice,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
