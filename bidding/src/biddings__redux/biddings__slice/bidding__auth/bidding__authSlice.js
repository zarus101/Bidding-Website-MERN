// Importing necessary dependencies and utilities
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AuthServices___AuthServices from "../../biddings__services/biddings__authServices";

// Initial state for the auth slice
const initialState = {
  is___Success: false, // Flag to indicate if the operation was successful
  is___LoggedIn: false, // Flag to indicate if the user is logged in
  is___Error: false, // Flag to indicate if there's an error
  is___Loading: false, // Flag to indicate if data is being loaded
  message: null, // Message to store error/success messages
  user: null, // User information
  select___User: null, // Selected user information
  users: [], // Array to store user data
};

///function for registering the buyer
export const registerUser___registerUser = createAsyncThunk("auth/registerSeller", async (formData, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.registerUser___registerUser(formData); // Registering a new user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for logging the user
export const loginUser___loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.loginUser___loginUser(formData); // Logging in the user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for getting the logged in user
export const getUser___getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.getUser___getUser(); // Getting the logged-in user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for logging out the user
export const logout___logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.logout___logout(); // Logging out the user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for getting the login status
export const getLoginStatus___getLoginStatus = createAsyncThunk("auth/getloginstatus", async (_, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.getLoginStatus___getLoginStatus(); // Getting the login status
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for getting all the users
export const getAllUser___getAllUser = createAsyncThunk("auth/getall", async (_, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.getAllUser___getAllUser(); // Getting all users
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for getting a user by id
export const getUserById___getUserById = createAsyncThunk("auth/getById", async (id, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.getUserById___getUserById(id); // Getting a user by id
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for updating the user
export const updateUser___updateUser = createAsyncThunk("auth/update", async ({ id, userData }, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.updateUser___updateUser(id, userData); // Updating a user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for deleting the user
export const deleteUser___deleteUser = createAsyncThunk("auth/delete", async (id, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.deleteUser___deleteUser(id); // Deleting a user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for sending the verification link
export const sendVerificationEmail___sendVerificationEmail = createAsyncThunk("auth/sendVerificationEmail", async (_, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.sendVerificationEmail___sendVerificationEmail(); // Sending a verification email
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

////function for verifying the user
export const verifyUser___verifyUser = createAsyncThunk("auth/verifyUser", async (verificationToken, thunkAPI) => {
  try {
    return await AuthServices___AuthServices.verifyUser___verifyUser(verificationToken); // Verifying a user
  } catch (error) {
    // Handling errors and returning the error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Creating the auth slice
const Auth___Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      // Resetting state values for clean state
      state.is___Loading = false;
      state.is___Error = false;
      state.is___Success = false;
      state.message = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Action when registering a user is pending
      .addCase(registerUser___registerUser.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      // Action when registering a user is successful
      .addCase(registerUser___registerUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.users = action.payload;
        toast.success("registered successfully. please login");
      })
      // Action when registering a user is rejected
      .addCase(registerUser___registerUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Action when sending a verification email is pending
      .addCase(sendVerificationEmail___sendVerificationEmail.pending, (state) => {
        state.is___Loading = true;
      })
      // Action when sending a verification email is successful
      .addCase(sendVerificationEmail___sendVerificationEmail.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.message = action.payload;
        toast.success("email sent !");
      })
      // Action when sending a verification email is rejected
      .addCase(sendVerificationEmail___sendVerificationEmail.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Success = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Action for verifying a user is pending
      .addCase(verifyUser___verifyUser.pending, (state) => {
        state.is___Loading = true;
      })
      // Action for verifying a user is successful
      .addCase(verifyUser___verifyUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      // Action for verifying a user is rejected
      .addCase(verifyUser___verifyUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      /// Action when logging in the user is pending
      .addCase(loginUser___loginUser.pending, (state) => {
        state.is___Loading = true;
      })
      // Action when logging in the user is successful
      .addCase(loginUser___loginUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___LoggedIn = true;
        state.user = action.payload;
        toast.success("login Successfully");
      })
      // Action when logging in the user is rejected
      .addCase(loginUser___loginUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      /// Action for getting the user is pending
      .addCase(getUser___getUser.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      // Action for getting the user is successful
      .addCase(getUser___getUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.is___LoggedIn = true;
        state.user = action.payload;
      })
      // Action for getting the user is rejected
      .addCase(getUser___getUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      /// Action for logging out is pending
      .addCase(logout___logout.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      // Action for logging out is successful
      .addCase(logout___logout.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.is___LoggedIn = false;
        state.user = null;
        toast.success("logout success");
      })
      // Action for logging out is rejected
      .addCase(logout___logout.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      /// Action for getting login status is pending
      .addCase(getLoginStatus___getLoginStatus.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      // Action for getting login status is successful
      .addCase(getLoginStatus___getLoginStatus.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.is___LoggedIn = action.payload;
      })
      // Action for getting login status is rejected
      .addCase(getLoginStatus___getLoginStatus.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      /// Action for getting all users is pending
      .addCase(getAllUser___getAllUser.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      // Action for getting all users is successful
      .addCase(getAllUser___getAllUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.users = action.payload;
      })
      // Action for getting all users is rejected
      .addCase(getAllUser___getAllUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      }) /// Action for getting the user by id is pending
      .addCase(getUserById___getUserById.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      // Action for getting the user by id is successful
      .addCase(getUserById___getUserById.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.select___User = action.payload;
      })
      .addCase(getUserById___getUserById.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUser___updateUser.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      .addCase(updateUser___updateUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        toast.success("updated");
      })
      .addCase(updateUser___updateUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteUser___deleteUser.pending, (state) => {
        state.is___Loading = true;
        state.is___Success = false;
        state.is___Error = false;
      })
      .addCase(deleteUser___deleteUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        toast.success("delete success");
      })
      .addCase(deleteUser___deleteUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.is___Success = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { RESET } = Auth___Slice.actions;

export const selectis___LoggedIn = (state) => state.auth.is___LoggedIn;
export const select___User = (state) => state.auth.user;
const Auth___Reducer = Auth___Slice.reducer;
export default Auth___Reducer;
