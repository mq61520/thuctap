import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
   name: 'product',
   initialState: { prodList: [] },
   reducers: {
      setList: (state, action) => {
         state.listProd = [];
      },
      addList: (state, action) => {
         state.listProd.push(action.payload);
      },
      removeList: (state, action) => {
         state.listProd = state.listProd.filter((i) => i.ma_sp !== action.payload.ma_sp);
      },
   },
});

const { actions, reducer } = productSlice;
export const { setList, addList, removeList } = actions;
export default reducer;
