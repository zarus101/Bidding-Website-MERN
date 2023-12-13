// Importing necessary dependencies
import { configureStore } from "@reduxjs/toolkit";
import Auth___Reducer from "./biddings__slice/bidding__auth/bidding__authSlice";
import Category___Reducer from "./biddings__slice/bidding__categprySlice";  // in this line
import Post___Reducer from "./biddings__slice/bidding__postSlice";  // in this line

// Configuring the Redux store
export const store___store = configureStore({
  reducer: {
    auth___auth: Auth___Reducer,  // Reducer for authentication-related state
    categories___categories: Category___Reducer,  // Reducer for category-related state
    post___post: Post___Reducer  // Reducer for post-related state
  }
});
