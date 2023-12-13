// Importing the necessary dependencies
import axios from "axios";
import { BIDDING__MAIN__BACKENDURL } from "./biddings__helper";

// Constructing the API URL for post-related operations
const BIDDING__API_URL = `${BIDDING__MAIN__BACKENDURL}/post/`;

// Service function to create a new post
const createPost___createPost = async (formData) => {
  // Making a POST request to create a new post
  const response___response = await axios.post(`${BIDDING__API_URL}product`, formData, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get all posts with optional query parameters
const getAllPost___getAllPost = async (params) => {
  // Making a GET request to retrieve all posts
  const response___response = await axios.get(`${BIDDING__API_URL}products`, {
    withCredentials: true,
    params: params,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to update a post by its ID
const updatePost___updatePost = async (id, formData) => {
  // Making a PATCH request to update a specific post
  const response___response = await axios.patch(`${BIDDING__API_URL}update-product/${id}`, formData, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to delete a post by its ID
const deletePost___deletePost = async (id) => {
  // Making a DELETE request to remove a specific post
  const response___response = await axios.delete(BIDDING__API_URL + id, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get a post by its ID
const getPostById___getPostById = async (id) => {
  // Making a GET request to retrieve a specific post by ID
  const response___response = await axios.get(`${BIDDING__API_URL}products/${id}`);
  // Returning the response data from the server
  return response___response.data;
};

// Service function to verify a post by its ID
const verifyPost___verifyPost = async (id, data) => {
  // Making a PATCH request to verify a specific post
  const response___response = await axios.patch(`${BIDDING__API_URL}verifyproduct/${id}`, data, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get all posts associated with the current user
const getPostByUser___getPostByUser = async () => {
  // Making a GET request to retrieve posts belonging to the current user
  const response___response = await axios.get(`${BIDDING__API_URL}user/getPosts`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to place a bid on a specific post by its ID
const placeBid___placeBid = async (id, data) => {
  // Making a PATCH request to place a bid on a specific post
  const response___response = await axios.patch(`${BIDDING__API_URL}product/bid/${id}`, data, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to mark a product as sold
const soldProduct___soldProduct = async (id, data) => {
  // Making a POST request to mark a product as sold
  const response___response = await axios.post(`${BIDDING__API_URL}product/sold/${id}`, data, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get the total commission
const getTotalCommission___getTotalCommission = async () => {
  // Making a GET request to retrieve the total commission
  const response___response = await axios.get(`${BIDDING__API_URL}get_total_comission`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get the purchaser of a specific product by its ID
const productPurchaser___productPurchaser = async (id) => {
  // Making a GET request to retrieve the purchaser of a specific product
  const response___response = await axios.get(`${BIDDING__API_URL}purchser/${id}`, {
    withCredentials: true,
  });
  // Returning the response data from the server
  return response___response.data;
};

// Exporting all the post-related services as an object
const PostServices___PostServices = {
  createPost___createPost,
  getAllPost___getAllPost,
  updatePost___updatePost,
  deletePost___deletePost,
  getPostById___getPostById,
  verifyPost___verifyPost,
  getPostByUser___getPostByUser,
  placeBid___placeBid,
  soldProduct___soldProduct,
  productPurchaser___productPurchaser,
  getTotalCommission___getTotalCommission,
};

// Exporting the PostServices___PostServices object
export default PostServices___PostServices;
