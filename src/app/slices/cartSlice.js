import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
   name: 'cart',
   initialState: { amount: 0 },
   reducers: {
      changeAmount: (state, action) => {
         state.amount = action.payload;
      },
   },
});

const { actions, reducer } = cartSlice;
export const { changeAmount } = actions;
export default reducer;
