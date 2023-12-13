// Importing the 'express' library
const express = require("express");

// Importing middleware functions and controller functions for user operations
const { restrict__ToAdmin, check__UserAuth } = require("../main_middlewares/auth__Handler");
const {
  // In this line, importing the function to register a new user
  register__User,
  // In this line, importing the function to login a user
  login__User,
  // In this line, importing the function to logout a user
  logout__User,
  // In this line, importing the function to check login status
  login__Status,
  // In this line, importing the function to get user details and associating it with the necessary middleware
  get__User,
  // In this line, importing the function to get all users and associating it with the necessary middleware
  getAllUser_getAllUser,
  // In this line, importing the function to get user by ID
  getUserById_getUserById,
  // In this line, importing the function to update user details and associating it with the necessary middleware
  updateUser_updateUser,
  // In this line, importing the function to delete a user and associating it with the necessary middlewares
  deleteUser_deleteUser,
  // In this line, importing the function to verify a user and associating it with the necessary middleware
  verify__User,
  // In this line, importing the function to send a verification email and associating it with the necessary middleware
  send__VerificationEmail,
  // In this line, importing the function to verify a seller account and associating it with the necessary middlewares
  verifySellerAccount_verifySellerAccount,
} = require("../main_controller/user__Controller");

// Creating an instance of the express router
const router = express.Router();

// Main route path for user functions

// In this line, defining the route to register a new user
router.post("/register", register__User);
// In this line, defining the route to login a user
router.post("/login", login__User);
// In this line, defining the route to logout a user
router.get("/logout", logout__User);
// In this line, defining the route to check login status
router.get("/loginstatus", login__Status);
// In this line, defining the route to get user details and associating it with the necessary middleware
router.get("/getuser", check__UserAuth, get__User);
// In this line, defining the route to get all users and associating it with the necessary middleware
router.get("/getalluser", check__UserAuth, getAllUser_getAllUser);
// In this line, defining the route to get user by ID
router.get("/:id", getUserById_getUserById);
// In this line, defining the route to update user details and associating it with the necessary middleware
router.patch("/update/:id", check__UserAuth, updateUser_updateUser);
// In this line, defining the route to delete a user and associating it with the necessary middlewares
router.delete("/:id", check__UserAuth, restrict__ToAdmin, deleteUser_deleteUser);

// Additional routes for user verification and seller verification

// In this line, defining the route to verify a user and associating it with the necessary middleware
router.patch("/verifyuser/:verificationToken", check__UserAuth, verify__User);
// In this line, defining the route to send a verification email and associating it with the necessary middleware
router.post("/sendVerificationEmail", check__UserAuth, send__VerificationEmail);
// In this line, defining the route to verify a seller account and associating it with the necessary middlewares
router.patch("/verifyseller/:id", check__UserAuth, restrict__ToAdmin, verifySellerAccount_verifySellerAccount);

// Exporting the router for use in other parts of the application
module.exports = router;
