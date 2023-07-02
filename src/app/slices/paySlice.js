import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'checkout',
   initialState: { listProd: [], location: '', total: 0 },
   reducers: {
      setPayList: (state, action) => {
         state.listProd = [];
      },
      addToList: (state, action) => {
         state.listProd.push(action.payload);
      },
      removeFromList: (state, action) => {
         state.listProd = state.listProd.filter((i) => i.ma_sp !== action.payload.ma_sp);
      },
      setLocation: (state, action) => {
         state.location = action.payload;
      },
      setTotal: (state, action) => {
         state.total = action.payload;
      },
   },
});

const { actions, reducer } = authSlice;
export const { setPayList, addToList, removeFromList, setLocation, setTotal } = actions;
export default reducer;
