/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  doctors: [],
};

export const getDoctors = createAsyncThunk(
  'doctors/getDoctors',
  async () => {
    const response = await fetch('http://localhost:4000/doctors/index');
    const data = await response.json();
    return data;
  },
);

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  extraReducers: {
    [getDoctors.pending]: (state) => {
      state.status = 'Loading';
    },
    [getDoctors.rejected]: (state) => {
      state.status = 'error: "Failed to retrieve doctors"';
    },
    [getDoctors.fulfilled]: (state, action) => {
      state.status = 'Success';
      state.doctors = [...action.payload];
    },
  },
});

export default doctorSlice.reducer;
