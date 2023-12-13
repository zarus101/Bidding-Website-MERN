// Importing the necessary dependencies
import axios from "axios";
import { BIDDING__MAIN__BACKENDURL } from "./biddings__helper";

// Constructing the API URL for user-related operations
const BIDDING__API__URL = `${BIDDING__MAIN__BACKENDURL}/user/`;

// Service function for user registration
const registerUser___registerUser = async (formData) => {
  // Making a POST request to register a new user
  const response___response = await axios.post(`${BIDDING__API__URL}register`, formData, {
    withCredentials: true
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for user login
const loginUser___loginUser = async (formData) => {
  // Making a POST request to log in the user
  const response___response = await axios.post(`${BIDDING__API__URL}login`, formData, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for getting the current user
const getUser___getUser = async () => {
  // Making a GET request to retrieve the current user
  const response___response = await axios.get(`${BIDDING__API__URL}getuser`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for user logout
const logout___logout = async () => {
  // Making a GET request to log out the user
  const response___response = await axios.get(`${BIDDING__API__URL}logout`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for getting the login status
const getLoginStatus___getLoginStatus = async () => {
  // Making a GET request to check the login status
  const response___response = await axios.get(`${BIDDING__API__URL}loginstatus`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for getting all users
const getAllUser___getAllUser = async () => {
  // Making a GET request to retrieve all users
  const response___response = await axios.get(`${BIDDING__API__URL}getalluser`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for getting a user by ID
const getUserById___getUserById = async (id) => {
  // Making a GET request to retrieve a specific user by ID
  const response___response = await axios.get(BIDDING__API__URL + id, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for updating a user by ID
const updateUser___updateUser = async (id, userData) => {
  // Making a PATCH request to update a specific user by ID
  const response___response = await axios.patch(`${BIDDING__API__URL}update/${id}`, userData, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for deleting a user by ID
const deleteUser___deleteUser = async (id, userData) => {
  // Making a DELETE request to remove a specific user by ID
  const response___response = await axios.delete(`${BIDDING__API__URL}${id}`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for sending a verification email
const sendVerificationEmail___sendVerificationEmail = async () => {
  // Making a POST request to send a verification email
  const response___response = axios.post(BIDDING__API__URL + "sendVerificationEmail", null, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function for verifying a user by a verification token
const verifyUser___verifyUser = async (verificationToken) => {
  // Making a PATCH request to verify a user using a verification token
  const response___response = await axios.patch(`${BIDDING__API__URL}verifyuser/${verificationToken}`, null, {
    withCredentials: true,
  });
  // Returning the verification message from the server
  return response___response.data.message;
};

// Exporting all the authentication-related services as an object
const AuthServices___AuthServices = {
  registerUser___registerUser,
  loginUser___loginUser,
  getUser___getUser,
  logout___logout,
  getLoginStatus___getLoginStatus,
  getAllUser___getAllUser,
  getUserById___getUserById,
  updateUser___updateUser,
  deleteUser___deleteUser,
  sendVerificationEmail___sendVerificationEmail,
  verifyUser___verifyUser
};

// Exporting the AuthServices___AuthServices object
export default AuthServices___AuthServices;
