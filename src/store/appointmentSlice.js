/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  appointments: [],
};

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async () => {
    const response = await fetch('http://localhost:4000/users/1/appointments');
    const data = await response.json();
    return data;
  },
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointment) => {
    const body = appointment;

    const response = await fetch('http://localhost:4000/appointments/create', {
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

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  extraReducers: {
    [getAppointments.pending]: (state) => {
      state.status = 'Loading';
    },
    [getAppointments.rejected]: (state) => {
      state.status = 'error: "Failed to retrieve appointments"';
    },
    [getAppointments.fulfilled]: (state, action) => {
      state.status = 'Success';
      state.appointments = [...action.payload];
    },
  },
});

export default appointmentSlice.reducer;