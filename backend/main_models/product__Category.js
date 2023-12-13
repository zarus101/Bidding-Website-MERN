// In this line, importing the mongoose library
const mongoose = require("mongoose");

// In this line, defining the schema for the ProductCategory model
const ProductCategorySchema = mongoose.Schema(
  {
    // In this line, adding a reference to the User model for the user associated with the category
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // In this line, defining the name of the product category (required)
    name: {
      type: String,
      required: [true, "Product category is required"],
    },
    // In this line, defining the description of the product category (required)
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    // In this line, defining a slug for the product category, making it unique (not required to be unique in this schema)
    slug: {
      type: String,
      unique: false,
    },
  },
  {
    // In this line, adding timestamps to track creation and modification times
    timestamps: true,
  }
);

// In this line, creating the ProductCategory model using the defined schema
const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);

// In this line, exporting the ProductCategory model
module.exports = ProductCategory;
