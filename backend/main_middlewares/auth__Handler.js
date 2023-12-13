// In this line, importing the express-async-handler package for handling asynchronous operations
const asyncHandler = require("express-async-handler");

// In this line, importing the jsonwebtoken package for working with JSON Web Tokens
const jwt = require("jsonwebtoken");

// In this line, importing the User model for accessing user data
const User = require("../main_models/user__Model");

// In this line, defining a middleware for checking user authentication
const check__UserAuth = asyncHandler(async (req, res, next) => {
  try {
    // In this line, extracting the token from the request cookies
    const token = req.cookies.token;
    console.log(token);

    // In this line, checking if no token is provided
    if (!token) {
      // If no token, return unauthorized
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // In this line, verifying the extracted token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // In this line, getting user id from the verified token and excluding the password
    const user = await User.findById(verified.id).select("-password");

    // In this line, checking if the user is found
    if (!user) {
      // If user not found, return not found
      res.status(404);
      throw new Error("User not found");
    }

    // In this line, assigning user information to the request object
    req.user = user;
    next();
  } catch (error) {
    // In this line, handling errors during authentication and returning an unauthorized error
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

// In this line, defining a middleware for restricting access to roles other than seller
const restrict__ToSeller = asyncHandler(async (req, res, next) => {
  // In this line, extracting user information from the request object
  const user = req.user;

  // In this line, checking if the user role is not seller
  if (user.role !== "seller") {
    // If role is not seller, return unauthorized
    res.status(401);
    throw new Error("Not allowed. Only seller allowed");
  }

  try {
    // In this line, continuing to the next middleware if authorized
    next();
  } catch (error) {
    // In this line, handling errors during authorization and returning an internal server error
    res.status(500).json({ status: "failed", message: "Internal server error" });
  }
});

// In this line, defining a middleware for restricting access to roles other than admin
const restrict__ToAdmin = asyncHandler(async (req, res, next) => {
  // In this line, extracting user information from the request object
  const user = req.user;

  // In this line, checking if the user role is not admin
  if (user.role !== "admin") {
    // If role is not admin, return unauthorized
    res.status(401);
    throw new Error("Not allowed. Admin only allowed");
  }

  try {
    // In this line, continuing to the next middleware if authorized
    next();
  } catch (error) {
    // In this line, handling errors during authorization and returning an internal server error
    res.status(500);
    throw new Error("Internal server error: " + error.message);
  }
});

// In this line, defining a middleware for checking user email verification
const check__UserVerification = asyncHandler(async (req, res, next) => {
  // In this line, extracting user information from the request object
  const user = req.user;

  // In this line, checking if the user's email is not verified
  if (!user.isEmailVerified) {
    // If email is not verified, return not found
    res.status(404);
    throw new Error("Please verify your account to proceed");
  }

  try {
    // In this line, continuing to the next middleware if verified
    next();
  } catch (error) {
    // In this line, handling errors during verification check and returning an internal server error
    res.status(500);
    throw new Error("Internal server error. " + error.message);
  }
});

// In this line, defining a middleware for checking seller verification
const check__SellerVerification = asyncHandler(async (req, res, next) => {
  // In this line, extracting user information from the request object
  const user = req.user;

  // In this line, checking if the seller is not verified
  if (!user.isSellerVerified) {
    // If seller is not verified, return not found
    res.status(404);
    throw new Error("Seller not verified");
  }

  try {
    // In this line, continuing to the next middleware if verified
    next();
  } catch (error) {
    // In this line, handling errors during verification check and returning an internal server error
    res.status(500);
    throw new Error("Internal server error." + error.message);
  }
});

// In this line, defining a middleware for restricting access to roles other than buyer
const restrict__ToBuyer = asyncHandler(async (req, res, next) => {
  // In this line, extracting user information from the request object
  const user = req.user;

  // In this line, checking if the user role is not buyer
  if (user.role !== "buyer") {
    // If role is not buyer, return unauthorized
    res.status(404);
    throw new Error("Not allowed. Only buyer allowed");
  }

  try {
    // In this line, continuing to the next middleware if authorized
    next();
  } catch (error) {
    // In this line, handling errors during authorization and returning an internal server error
    res.status(500);
    throw new Error("Internal server error. " + error.message);
  }
});

module.exports = {
  check__UserAuth,
  restrict__ToAdmin,
  restrict__ToSeller,
  check__UserVerification,
  check__SellerVerification,
  restrict__ToBuyer,
};
