import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'checkout',
   initialState: { listProd: [] },
   reducers: {
      setCart: (state, action) => {
         state.listProd = [];
      },
      addToList: (state, action) => {
         state.listProd.push(action.payload);
      },
      removeFromList: (state, action) => {
         state.listProd = state.listProd.filter((i) => i.ma_sp !== action.payload.ma_sp);
      },
   },
});

const { actions, reducer } = authSlice;
export const { setCart, addToList, removeFromList } = actions;
export default reducer;
