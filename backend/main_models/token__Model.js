// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the Token model
const TokenSchema = mongoose.Schema(
  {
    // Reference to the User model for the associated user (required)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Token used for user verification (default is an empty string)
    verifyToken: {
      type: String,
      default: "",
    },
    // Token expiration date (required)
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    // Adding timestamps to track creation and modification times
    timestamps: true,
  }
);

// Creating the Token model using the defined schema
const Token = mongoose.model("Token", TokenSchema);

// Exporting the Token model
module.exports = Token;
