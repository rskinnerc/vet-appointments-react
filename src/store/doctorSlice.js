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

export const deleteDoctor = createAsyncThunk(
  'doctors/deleteDoctor',
  async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/doctors/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    return response.text();
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
    builder.addCase(deleteDoctor.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(deleteDoctor.rejected, (state) => {
      state.status = 'error: "Failed to delete doctor"';
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.status = action.payload;
      state.doctors = state.doctors.filter((doctor) => doctor.id !== action.meta.arg);
      console.log('state.doctors', state.doctors);
    });
  },
});

export default doctorSlice.reducer;
