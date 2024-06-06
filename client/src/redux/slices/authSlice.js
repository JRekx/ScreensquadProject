import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {}, // Initialize user as an empty object
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
      state.user = {};
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
