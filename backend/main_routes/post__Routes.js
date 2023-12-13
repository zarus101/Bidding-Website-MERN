// Importing the 'express' library
const express = require("express");

// Importing utility functions, controllers, and middlewares
const { upload } = require("../utils/ImageUpload");
const {
  // In this line, importing the function to create a new product and associating it with the necessary middlewares
  create__Post,
  // In this line, importing the function to get all products and associating it with the necessary middleware
  get__AllPost,
  // In this line, importing the function to get a specific product by ID
  get__PostById,
  // In this line, importing the function to place a bid on a product and associating it with the necessary middlewares
  place__BidOnProduct,
  // In this line, importing the function to sell products and associating it with the necessary middlewares
  sell__ProductsTo,
  // In this line, importing the function to get the total commission and associating it with the necessary middlewares
  get__TotalCommission,
  // In this line, importing the function to get purchased user details
  get__PurchasedUser,
  // In this line, importing the function to verify a product and associating it with the necessary middlewares
  verify__product,
  // In this line, importing the function to get posts associated with the current user
  get__PostByUser,
  // In this line, importing the function to delete a product and associating it with the necessary middlewares
  delete__Product,
  // In this line, importing the function to update a product and associating it with the necessary middlewares
  update__Product,
} = require("../main_controller/post__Controller");
const {
  // In this line, importing middleware functions for user authentication and verification
  check__UserAuth,
  check__UserVerification,
  // In this line, importing middleware functions for role restriction
  restrict__ToSeller,
  restrict__ToBuyer,
  restrict__ToAdmin,
  // In this line, importing middleware function for seller verification
  check__SellerVerification,
} = require("../main_middlewares/auth__Handler");

// Creating an instance of the express router
const router = express.Router();

// Defining routes and associating them with corresponding controller functions and middleware
// In this line, defining the route to create a new product and associating it with the necessary middlewares
router.post(
  "/product",
  upload.single("image"),
  check__UserAuth,
  check__UserVerification,
  restrict__ToSeller,
  check__SellerVerification,
  create__Post
);
// In this line, defining the route to get all products and associating it with the necessary middleware
router.get("/products", check__UserAuth, get__AllPost);
// In this line, defining the route to get a specific product by ID
router.get("/products/:id", get__PostById);
// In this line, defining the route to place a bid on a product and associating it with the necessary middlewares
router.patch(
  "/product/bid/:id",
  check__UserAuth,
  restrict__ToBuyer,
  check__UserVerification,
  place__BidOnProduct
);
// In this line, defining the route to sell products and associating it with the necessary middlewares
router.post("/product/sold/:id", check__UserAuth, restrict__ToSeller, sell__ProductsTo);
// In this line, defining the route to get the total commission and associating it with the necessary middlewares
router.get("/get_total_comission", check__UserAuth, restrict__ToAdmin, get__TotalCommission);
// In this line, defining the route to get purchased user details
router.get("/purchser/:id", get__PurchasedUser);
// In this line, defining the route to verify a product and associating it with the necessary middlewares
router.patch("/verifyproduct/:id", verify__product);
// In this line, defining the route to get posts associated with the current user
router.get("/user/getPosts", check__UserAuth, get__PostByUser);
// In this line, defining the route to delete a product and associating it with the necessary middlewares
router.delete("/:id", check__UserAuth, restrict__ToAdmin, delete__Product);
// In this line, defining the route to update a product and associating it with the necessary middlewares
router.patch(
  "/update-product/:id",
  upload.single("image"),
  check__UserAuth,
  restrict__ToSeller,
  update__Product
);

// Exporting the router for use in other parts of the application
module.exports = router;
