import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  name: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.name = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setName, logout } = authSlice.actions;
export default authSlice.reducer;
