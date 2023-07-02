import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
   name: 'product',
   initialState: { prodList: [] },
   reducers: {
      setList: (state, action) => {
         state.prodList = [];
      },
      addList: (state, action) => {
         state.prodList.concat(action.payload);
      },
      removeList: (state, action) => {
         state.prodList = state.prodList.filter((i) => i.ma_sp !== action.payload.ma_sp);
      },
   },
});

const { actions, reducer } = productSlice;
export const { setList, addList, removeList } = actions;
export default reducer;
