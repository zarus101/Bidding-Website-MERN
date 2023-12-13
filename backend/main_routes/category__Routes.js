// Importing the 'express' library
const express = require("express");

// Importing specific functions from the 'category__Controller' module
const {
  // In this line, importing the function to create a new product category
  create__ProductCategory,
  // In this line, importing the function to get all product categories
  get__AllCategory,
  // In this line, importing the function to get categories associated with the current user
  get__CategoryByUser,
  // In this line, importing the function to delete a product category
  delete__Category,
  // In this line, importing the function to update a product category
  update__ProductCategory,
} = require("../main_controller/category__Controller");

// Importing middleware function for user authentication
const { check__UserAuth } = require("../main_middlewares/auth__Handler");

// Creating an instance of the express router
const router = express.Router();

// Defining routes and associating them with corresponding controller functions and middleware
// In this line, defining the route to create a new product category and associating it with the corresponding controller function and middleware
router.post("/", check__UserAuth, create__ProductCategory);
// In this line, defining the route to get all product categories and associating it with the corresponding controller function
router.get("/", get__AllCategory);
// In this line, defining the route to get categories associated with the current user and associating it with the corresponding controller function and middleware
router.get("/categorybyuser", check__UserAuth, get__CategoryByUser);
// In this line, defining the route to delete a product category and associating it with the corresponding controller function and middleware
router.delete("/:id", check__UserAuth, delete__Category);
// In this line, defining the route to update a product category and associating it with the corresponding controller function and middleware
router.patch("/:id", check__UserAuth, update__ProductCategory);

// Exporting the router for use in other parts of the application
module.exports = router;
