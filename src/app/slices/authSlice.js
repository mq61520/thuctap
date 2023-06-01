import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'authentication',
   initialState: { loginName: '', loginPwd: '' },
   reducers: {
      changeLoginName: (state, action) => {
         state.loginName = action.payload;
      },
      changeLoginPwd: (state, action) => {
         state.loginPwd = action.payload;
      },
   },
});

const { actions, reducer } = authSlice;
export const { changeLoginName, changeLoginPwd } = actions;
export default reducer;
