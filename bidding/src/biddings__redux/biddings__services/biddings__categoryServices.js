// Importing the necessary dependencies
import axios from "axios";
import { BIDDING__MAIN__BACKENDURL } from "./biddings__helper";

// Constructing the API URL for category-related operations
const BIDDING___API__URL = `${BIDDING__MAIN__BACKENDURL}/productcategory/`;

// Service function to create a new category
const createCategory___createCategory = async (formData) => {
  // Making a POST request to create a new category
  const response___response = await axios.post(BIDDING___API__URL, formData, {
    withCredentials: true
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get all categories
const getAllCategory___getAllCategory = async () => {
  // Making a GET request to retrieve all categories
  const response___response = await axios.get(BIDDING___API__URL);
  // Returning the response data from the server
  return response___response.data;
};

// Service function to get categories associated with the current user
const getCategoryByUser___getCategoryByUser = async () => {
  // Making a GET request to retrieve categories belonging to the current user
  const response___response = await axios.get(BIDDING___API__URL + "categorybyuser", {
    withCredentials: true
  });
  // Returning the response data from the server
  return response___response.data;
};

// Service function to update a category by its ID
const updateCategory___updateCategory = async (id, formData) => {
  // Making a PATCH request to update a specific category
  const response___response = await axios.patch(`${BIDDING___API__URL}${id}`, formData);
  // Returning the response data from the server
  return response___response.data;
};

// Service function to delete a category by its ID
const deleteCategory___deleteCategory = async (id) => {
  // Making a DELETE request to remove a specific category
  const response___response = await axios.delete(BIDDING___API__URL + id, {
    withCredentials: true
  });
  // Returning the response data from the server
  return response___response.data;
};

// Exporting all the category-related services as an object
const CategoryServices___CategoryServices = {
  createCategory___createCategory,
  getAllCategory___getAllCategory,
  updateCategory___updateCategory,
  deleteCategory___deleteCategory,
  getCategoryByUser___getCategoryByUser
};

// Exporting the CategoryServices object
export default CategoryServices___CategoryServices;
