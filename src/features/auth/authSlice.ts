/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthState, User } from "./authTypes";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// SIGNUP
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
