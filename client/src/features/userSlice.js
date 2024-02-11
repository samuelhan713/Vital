import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: {},
    id: localStorage.getItem("userId") || null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = payload.token;
      state.id = payload.user._id;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload.user._id);
    },
    logout: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      state.id = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
