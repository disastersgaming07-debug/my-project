import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  userLogin,
  userRegister,
} from "./authActions";

const token = localStorage.getItem("token");

const initialState = {
  loading: false,
  user: null,
  token: token || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // REGISTER
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });

    // CURRENT USER
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Unable to get current user";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

// Important: export the reducer, not the slice object
export default authSlice.reducer;