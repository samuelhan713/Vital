import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
    id: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = payload.token;
      state.id = payload.user._id;
    },
    logout: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      state.id = null;
    },
  },
});

export const { login, logout, updateUsername } = userSlice.actions;

export default userSlice.reducer;
