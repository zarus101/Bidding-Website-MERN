const asyncHandler = require("express-async-handler");
const Product__Model = require("../main_models/product__Category");
const slugify = require("slugify");

// The mechanism for establishing a product category
const create__ProductCategory = asyncHandler(async (req, res) => {
// Taking the required fields out of the request
  const { name, description } = req.body;

// Verifying the presence of required fields
  if (!name || !description) {
    res.status(400);
    throw new Error("All fields are required");
  }

// Using the name to create a slug for the category
  const slug__ = slugify(req.body.name, {
    lower: true,
    remove: /[*+~.()'"!:@]/,
    strict: true,
  });

// Verifying the validity of the user's email
  if (!req.user.isEmailVerified) {
    res.status(400);
    throw new Error("Please verify your email to proceed");
  }

// Identifying the user's current categories
  const categories__ = await Product__Model.find({ user: req.user._id });

// Verifying if there is already a category with the same slug
  const category = categories__.find((item) => item.slug === slug__);

  if (category) {
    res.status(400);
    throw new Error("You have already added this category");
  }

  try {
// Establishing a fresh category
    const new__Category = await Product__Model.create({
      user: req.user._id,
      name,
      description,
      slug__,
    });

// Encoding the updated category data in a success response.
    res.status(200).json({ success: true, data: new__Category });
  } catch (error) {
// Taking care of mistakes and responding to them
    res.status(500);
    throw new Error("Internal server error: " + error.message);
  }
});

// A way to obtain each product category
const get__AllCategory = asyncHandler(async (req, res) => {
// acquiring each category and placing them in decreasing order of creation
  const all__Categories = await Product__Model.find().sort("-createdAt");

// In response, providing a list of each category

res.status(200).json(all__Categories);
});

// A way to get the categories associated with the currently active user
const get__CategoryByUser = asyncHandler(async (req, res) => {
// A way to get the categories associated with the currently active user
  const categories = await Product__Model.find({ user: req.user._id });

// Giving the user-specific category list in response
  res.status(200).json(categories);
});

// The capacity to eliminate a category of products
const delete__Category = asyncHandler(async (req, res) => {
// Eliminating the category ID from the request's parameters
  const { id } = req.params;

// Locating the category using the ID
  const selectCategory = await Product__Model.findById(id);

// Confirming the existence of the category
  if (!selectCategory) {
    res.status(400);
    throw new Error("Category not found");
  }

// Discarding the category based on ID
  await Product__Model.findByIdAndDelete(id);

// Crafting a fruitful response
res.status(200).json({ success: true, message: "Product category deleted" });
});

// Revise a function for a product category
const update__ProductCategory = asyncHandler(async (req, res) => {
// Eliminating the request's mandatory fields
  const { name, description } = req.body;
  const { id } = req.params;

// Locating the category using the ID

const selectCategory = await Product__Model.findById(id);

// Confirming the existence of the category
  if (!selectCategory) {
    res.status(400);
    throw new Error("Category not found");
  }

// Changing the classification
const updatedCategory = await Product__Model.findByIdAndUpdate({ _id: id }, { name, description }, { new: true, runValidators: true });

// Urging a response with the updated category details
res.status(200).json({ success: true, data: updatedCategory });
});

module.exports = {
  create__ProductCategory,
  get__AllCategory,
  get__CategoryByUser,
  delete__Category,
  update__ProductCategory,
};
