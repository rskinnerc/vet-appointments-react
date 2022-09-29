import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import doctor from './doctorSlice';
import appointment from './appointmentSlice';

const store = configureStore({
  reducer: {
    auth,
    doctor,
    appointment,
  },
});

export default store;
