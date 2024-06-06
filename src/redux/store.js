import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import productReducer from "./features/seller/product/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  sellerProduct: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
