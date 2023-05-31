import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/Login/authSlice';

const rootReducer = {
   auth: authSlice,
};

const store = configureStore({
   reducer: rootReducer,
});

export default store;
