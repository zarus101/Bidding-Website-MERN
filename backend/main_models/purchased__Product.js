// Importing the mongoose library
const mongoose = require("mongoose");

// Defining the schema for the PurchaseProducts model
const PurchaseSchema = mongoose.Schema({
  // In this line, setting up a reference to the Post model for the purchased post
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  // In this line, establishing a reference to the User model for the user who bought the post
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // In this line, defining the amount at which the post was purchased (required)
  purchasedAt: {
    type: Number,
    required: [true, "Amount is required"],
  },
}, {
  // In this line, adding timestamps to track creation and modification times
  timestamps: true,
});

// In this line, creating the PurchaseProducts model using the defined schema
const PurchaseProducts = mongoose.model("PurchaseProducts", PurchaseSchema);

// In this line, exporting the PurchaseProducts model
module.exports = PurchaseProducts;
