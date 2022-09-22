import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import doctor from './doctorSlice';

const store = configureStore({
  reducer: {
    auth,
    doctor,
  },
});

export default store;
