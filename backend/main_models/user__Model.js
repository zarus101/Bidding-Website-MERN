// Importing the required libraries
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Defining the schema for the User model
const UserSchema = mongoose.Schema(
  {
    // In this line, defining the user's full name (required)
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    // In this line, specifying the user's email (required, unique, and validated against a regular expression)
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      // In this line, validating the email against a regular expression
      match: [
        /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
        "Please enter a valid email",
      ],
    },
    // In this line, specifying the user's contact number (required and validated for maximum length)
    contactNO: {
      type: Number,
      maxLength: [10, "Please enter a valid phone number"],
    },
    // In this line, defining the user's password (required and validated for minimum length)
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be 6 characters long"],
    },
    // In this line, specifying the user's role (default is "buyer" and must be one of the specified values)
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },
    // In this line, flag indicating if the user's email is verified (default is false)
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    // In this line, flag indicating if the user is verified as a seller (default is false)
    isSellerVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // In this line, adding timestamps to track creation and modification times
    timestamps: true,
  }
);

// In this line, middleware: Pre-save hook to encrypt the password before saving
UserSchema.pre("save", async function (next) {
  // Check if the password is modified before hashing
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  // Set the hashed password back to the schema
  this.password = hashedPassword;
  next();
});

// In this line, creating the User model using the defined schema
const User = mongoose.model("User", UserSchema);

// In this line, exporting the User model
module.exports = User;
