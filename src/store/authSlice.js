/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  authPopupOpen: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleAuthPopup: (state) => {
      state.authPopupOpen = !state.authPopupOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, toggleAuthPopup } = authSlice.actions;
export default authSlice.reducer;
