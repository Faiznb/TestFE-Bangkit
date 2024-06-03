import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { setToken } from "../../utils/cookies";

export const login = createAsyncThunk("auth/login", async ({ user_email, user_password }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/login", { user_email, user_password });
    const token = response.data.token;
    setToken(token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk("auth/register", async ({ user_name, user_email, user_password, user_role, store_name }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/register", { user_name, user_email, user_password, user_role, store_name });
    console.log(response.data);
    const token = response.data.token;
    setToken(token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
