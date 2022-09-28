/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  authPopupOpen: false,
};

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (name) => {
    const body = {
      user: {
        name,
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_HOST}/users/create`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      method: 'POST',
    });
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },
);

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
    enableAuthPopup: (state) => {
      state.authPopupOpen = true;
    },
    signOut: (state) => {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.authPopupOpen = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser, toggleAuthPopup, enableAuthPopup, signOut,
} = authSlice.actions;
export default authSlice.reducer;
