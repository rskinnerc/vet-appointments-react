/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  doctors: [],
};

export const getDoctors = createAsyncThunk(
  'doctors/getDoctors',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/doctors/index`);
    const data = await response.json();
    return data;
  },
);

export const addDoctor = createAsyncThunk(
  'doctors/addDoctor',
  async (formdata) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/doctors/create`, {
      headers: {
        Accept: 'application/json',
      },
      body: formdata,
      method: 'POST',
    });
    return response.status === 200 ? response.text() : response.json();
  },
);

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDoctors.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(getDoctors.rejected, (state) => {
      state.status = 'error: "Failed to retrieve doctors"';
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.status = 'Success';
      state.doctors = action.payload;
    });
    builder.addCase(addDoctor.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(addDoctor.rejected, (state) => {
      state.status = 'error: "Failed to add doctor"';
    });
    builder.addCase(addDoctor.fulfilled, (state, action) => {
      state.status = action.payload;
    });
  },
});

export default doctorSlice.reducer;
