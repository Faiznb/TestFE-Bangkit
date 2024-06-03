import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

export const getProfile = createAsyncThunk("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
