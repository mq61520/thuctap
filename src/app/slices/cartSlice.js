import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
   name: 'cart',
   initialState: { amount: '' },
   reducers: {
      changeAmount: (state, action) => {
         state.amount = action.payload;
      },
   },
});

const { actions, reducer } = cartSlice;
export const { changeAmount } = actions;
export default reducer;
