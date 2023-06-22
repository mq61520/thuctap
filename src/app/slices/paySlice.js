import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'checkout',
   initialState: { listProd: [] },
   reducers: {
      addToList: (state, action) => {
         state.listProd.push(action.payload);
      },
      removeFromList: (state, action) => {
         state.listProd.pop();
      },
   },
});

const { actions, reducer } = authSlice;
export const { addToList, removeFromList } = actions;
export default reducer;
