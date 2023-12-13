// Importing necessary dependencies and utilities
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing necessary Redux Toolkit functions
import { toast } from "react-toastify"; // Importing toast notifications library
import CategoryServices___CategoryServices from "../biddings__services/biddings__categoryServices"; // Importing category services

// Initial state for the category slice
const initialState = {
  categories: [], // Array to store category data
  is___Error: false, // Flag to indicate if there's an error
  is___Success: false, // Flag to indicate if the operation was successful
  is___Loading: false, // Flag to indicate if data is being loaded
  message: null, // Message to store error/success messages
};

// Async thunk for creating a new category
export const createCategory___createCategory = createAsyncThunk("category/create", async (formData, thunkAPI) => { // Async operation to create a new category
  try {
    return await CategoryServices___CategoryServices.createCategory___createCategory(formData); // Calling the service to create a category
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for getting all categories
export const getAllCategory___getAllCategory = createAsyncThunk("category/getAll", async (_, thunkAPI) => { // Async operation to get all categories
  try {
    return await CategoryServices___CategoryServices.getAllCategory___getAllCategory(); // Calling the service to get all categories
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for getting categories by user
export const getCategoryByUser___getCategoryByUser = createAsyncThunk("category/getbyuser", async (_, thunkAPI) => { // Async operation to get categories by user
  try {
    return await CategoryServices___CategoryServices.getCategoryByUser___getCategoryByUser(); // Calling the service to get categories by user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for updating a category
export const updateCategory___updateCategory = createAsyncThunk("category/update", async ({ id, formData }, thunkAPI) => { // Async operation to update a category
  try {
    return await CategoryServices___CategoryServices.updateCategory___updateCategory(id, formData); // Calling the service to update a category
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for deleting a category
export const deleteCategory___deleteCategory = createAsyncThunk("category/delete", async (id, thunkAPI) => { // Async operation to delete a category
  try {
    return await CategoryServices___CategoryServices.deleteCategory___deleteCategory(id); // Calling the service to delete a category
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Creating a slice for the category with reducers and extraReducers
const Category___Slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("store Value"); // Dummy reducer for calculating store value
    },
    RESET(state) {
      // Resetting state values for clean state
      state.is___Loading = false;
      state.is___Error = false;
      state.is___Success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => { // Handling extra reducers for async operations
    builder
      .addCase(createCategory___createCategory.pending, (state) => { // Action when creating a category is pending
        state.is___Loading = true;
      })
      .addCase(createCategory___createCategory.fulfilled, (state, action) => { // Action when creating a category is successful
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.categories.push(action.payload); // Adding the new category to the array
        toast.success("Category added successfully."); // Displaying success toast
      })
      .addCase(createCategory___createCategory.rejected, (state, action) => { // Action when creating a category is rejected
        state.is___Error = true;
        state.is___Loading = false;
        state.message = action.payload;
        toast.error(action.payload); // Displaying error toast
      })
      .addCase(getAllCategory___getAllCategory.pending, (state) => { // Action when getting all categories is pending
        state.is___Loading = true;
      })
      .addCase(getAllCategory___getAllCategory.fulfilled, (state, action) => { // Action when getting all categories is successful
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.categories = action.payload; // Setting the categories array with retrieved data
      })
      .addCase(getAllCategory___getAllCategory.rejected, (state, action) => { // Action when getting all categories is rejected
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload); // Displaying error toast
      })
      .addCase(deleteCategory___deleteCategory.pending, (state) => { // Action when deleting a category is pending
        state.is___Loading = true;
      })
      .addCase(deleteCategory___deleteCategory.fulfilled, (state) => { // Action when deleting a category is successful
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        toast.success("Deleted successfully."); // Displaying success toast
      })
      .addCase(deleteCategory___deleteCategory.rejected, (state, action) => { // Action when deleting a category is rejected
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload); // Displaying error toast
      })
      .addCase(getCategoryByUser___getCategoryByUser.pending, (state) => { // Action when getting categories by user is pending
        state.is___Loading = true;
      })
      .addCase(getCategoryByUser___getCategoryByUser.fulfilled, (state, action) => { // Action when getting categories by user is successful
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.categories = action.payload; // Setting the categories array with retrieved data
      })
      .addCase(getCategoryByUser___getCategoryByUser.rejected, (state, action) => { // Action when getting categories by user is rejected
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload); // Displaying error toast
      })
  },
});

// Exporting specific actions for the category slice
export const { CALC_STORE_VALUE, RESET } = Category___Slice.actions;
// Exporting the reducer for the category slice
const Category___Reducer = Category___Slice.reducer;
export default Category___Reducer;
