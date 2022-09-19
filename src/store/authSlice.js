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

    const response = await fetch('http://localhost:3000/users/create', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      method: 'POST',
    });
    const data = await response.json();
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
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      const [user] = payload;
      state.user = user;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUser, toggleAuthPopup } = authSlice.actions;
export default authSlice.reducer;
