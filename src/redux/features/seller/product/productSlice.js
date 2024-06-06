import { createSlice } from "@reduxjs/toolkit";
import { fetchSellerProduct } from "./productThunks";

const productSlice = createSlice({
  name: "sellerProduct",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
