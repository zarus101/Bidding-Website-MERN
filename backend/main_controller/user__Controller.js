// In this line, handling asynchronous operations using express-async-handler
const asyncHandler = require("express-async-handler");

// In this line, importing the User model
const User = require("../main_models/user__Model");

// In this line, importing token-related utilities
const { generateToken, hashToken } = require("../utils/tokenFunctions");

// In this line, importing necessary libraries
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const cryptr = require("cryptr");
const Token = require("../main_models/token__Model");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

// In this line, creating the default admin user
const create__DefaultAdmin = asyncHandler(async (req, res) => {
  try {
    // In this line, checking if the admin user exists or not
    const adminUser = await User.findOne({ role: "admin" });
    if (adminUser) {
      console.log("Admin user already exists");
      return;
    }

    // In this line, creating the default admin user
    const defaultAdmin = new User({
      fullName: "Admin",
      email: "raz.thapaliya600@gmail.com",
      password: "Admin1234@",
      role: "admin",
      contactNo:"978652622"
    });

    // In this line, saving the new admin user
    await defaultAdmin.save();
    console.log("Default admin user created");
  } catch (error) {
    console.log("Error creating the default admin:", error);
  }
});

// In this line, registering the buyer or seller
const register__User = asyncHandler(async (req, res) => {
  const { fullName, email, password, contactNo, role } = req.body;

  // In this line, validating the fields
  if (!fullName || !email || !password || !contactNo || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User with that email already exists");
  }

  // In this line, creating the new user
  const user = await User.create({
    fullName,
    email,
    password,
    contactNo,
    role,
  });

  // In this line, generating the token
  const token = generateToken(user._id);

  // In this line, sending the token as a cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "None",
    secure: true,
  });

  if (user) {
    const { _id, fullName, email, role, contactNo, isEmailVerified } = user;

    res.status(200).json({
      _id,
      fullName,
      email,
      contactNo,
      role,
      isEmailVerified,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Invalid user data");
  }
});

// In this line, user login
const login__User = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // In this line, validating the fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // In this line, checking if the user is in the database or not
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw  new Error("User not found. Please register");
  }

  // In this line, validating the password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(401);
    throw new Error("Password is incorrect");
  }

  // In this line, generating the token
  const token = generateToken(user._id);

  if (user && isPasswordCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "None",
      secure: true,
    });

    const { _id, fullName, email, role, contactNo, isEmailVerified } = user;
    res.status(200).json({
      _id,
      fullName,
      contactNo,
      email,
      role,
      isEmailVerified,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Internal server error. Please try again");
  }
});

// In this line, checking the login status
const login__Status = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json(false);
  }

  // In this line, verifying the token
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (verified) {
    return res.json(true);
  }

  return res.json(false);
});

// In this line, logging out
const logout__User = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Logout Successful" });
});

// In this line, getting user details
const get__User = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, fullName, email, role, contactNo, isEmailVerified } = user;

    res.status(200).json({
      _id,
      fullName,
      contactNo,
      email,
      role,
      isEmailVerified,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// In this line, sending a verification email
const send__VerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isEmailVerified) {
    res.status(406);
    throw new Error("Email already verified");
  }

  // In this line, deleting the token if it exists in the database
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // In this line, creating the validation token
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;

  // In this line, hashing the token before saving
  const hashedVerificationToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    verifyToken: hashedVerificationToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000),
  }).save();

  // In this line, verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
  console.log(verificationUrl);

  // In this line, send Email
  const subject = "Verify Your Email";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@suraj.com";
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(subject, send_to, sent_from, reply_to, template, name, link);
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// In this line, function to verify the user
const verify__User = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const hashedToken = hashToken(verificationToken);

  // In this line, finding the token details
  const userToken = await Token.findOne({
    verifyToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(400);
    throw new Error("Invalid token or expired token");
  }

  // In this line, finding the user from the token
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isEmailVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // In this line, now verifying the user
  user.isEmailVerified = true;
  await user.save();
  res.status(200).json({ message: "Account Verification Successful" });
});

// In this line, function to verify the seller account
const verifySellerAccount_verifySellerAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // In this line, finding the seller account
  const selectSeller = await User.findById(id);
  if (!selectSeller) {
    res.status(400);
    throw new Error("Seller account not found");
  }

  if (selectSeller.role !== "seller") {
    res.status(400);
    throw new Error("This account is not of a seller");
  }

  // In this line, updating seller verification status
  selectSeller.isSellerVerified = true;
  await selectSeller.save(); // Use await here to ensure the changes are saved

  // In this line, send a success response
  res.status(200).json({ message: "Seller account verified successfully" });
});

// In this line, function for getting all users
const getAllUser_getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt");

  if (users.length <= 0) {
    res.status(202).json({ message: "No users found" });
  }

  // In this line, send a response with the list of all users
  res.status(200).json(users);
});

// In this line, function for getting a user by id
const getUserById_getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const selectUser = await User.findById(id);

  if (!selectUser) {
    res.status(400);
    throw new Error("User not found");
  }

  // In this line, send a response with the selected user details
  res.status(200).json(selectUser);
});

// In this line, function for updating a user
const updateUser_updateUser = asyncHandler(async (req, res) => {
  const { fullName, role, isSellerVerified } = req.body;
  const { id } = req.params;

  // In this line, find the user by id
  const userToUpdate = await User.findById(id);

  if (!userToUpdate) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (userToUpdate.role === "buyer" && isSellerVerified) {
    res.status(400);
    throw new Error("Update user role to seller");
  }

  // In this line, update user properties
  userToUpdate.fullName = fullName;
  userToUpdate.role = role;
  userToUpdate.isSellerVerified = isSellerVerified;

  try {
    // In this line, save the updated user
    const updatedUser = await userToUpdate.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Function for deleting a user
const deleteUser_deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Select the user
  const selectUser = await User.findById(id);
  if (!selectUser) {
    res.status(400);
    throw new Error("No user found");
  }

  if (selectUser.role === "admin") {
    res.status(400);
    throw new Error("You cannot delete an admin");
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

module.exports = {
  register__User,
  login__User,
  logout__User,
  login__Status,
  get__User,
  create__DefaultAdmin,
  send__VerificationEmail,
  verify__User,
  verifySellerAccount_verifySellerAccount,
  getAllUser_getAllUser,
  getUserById_getUserById,
  updateUser_updateUser,
  deleteUser_deleteUser,
};
