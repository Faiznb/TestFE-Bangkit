import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct } from "./productApi";

export const fetchSellerProduct = createAsyncThunk("profile/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchProduct();
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
