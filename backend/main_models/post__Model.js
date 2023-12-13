// In this line, importing the mongoose library
const mongoose = require("mongoose");

// In this line, defining the schema for the Post model
const Post__Schema = mongoose.Schema(
  {
    // In this line, adding a reference to the User model for the user who posted the item
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // In this line, defining the name of the posted item (required)
    postedItemName: {
      type: String,
      required: [true, "Name of the item is required"],
    },
    // In this line, defining the description of the posted item (required)
    description: {
      type: String,
      required: [true, "Item description is required"],
    },
    // In this line, defining the initial price of the item (required)
    initialPrice: {
      type: Number,
      required: [true, "Price is required"],
    },
    // In this line, defining a flag indicating whether the post is verified or not (default is false)
    isPostVerified: {
      type: Boolean,
      default: false,
    },
    // In this line, defining an array to store biddings on the item (default is an empty array)
    biddings: {
      type: Array,
      default: [],
    },
    // In this line, defining a flag indicating whether the item is sold or not (default is false)
    isSolded: {
      type: Boolean,
      default: false,
    },
    // In this line, defining an object to store image information (default is an empty object)
    image: {
      type: Object,
      default: {},
    },
    // In this line, defining the commission percentage for the posted item (default is 10%)
    commissionPercent: {
      type: Number,
      default: 10,
    },
    // In this line, adding a reference to the ProductCategory model for the category of the item
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    // In this line, defining the amount of commission obtained for the item (default is 0)
    commissionObtained: {
      type: Number,
      default: 0,
    },
  },
  {
    // In this line, adding timestamps to track creation and modification times
    timestamps: true,
  }
);

// In this line, creating the Post model using the defined schema
const Post__Model = mongoose.model("Post", Post__Schema);

// In this line, exporting the Post model
module.exports = Post__Model;
