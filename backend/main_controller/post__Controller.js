const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/ImageUpload");
const Post = require("../main_models/post__Model");
const PurchaseProducts = require("../main_models/purchased__Product");
const sendEmail = require("../utils/sendEmail");
const User = require("../main_models/user__Model");
const cloudinary = require("cloudinary").v2;

// A feature that fills in particular fields in a Mongoose query
const populate__Post = (query) => {
// Filling in the "postedBy" field in the query result using the populate method
// This is presuming that the Post model's "postedBy" field refers to a different model (such as the User model).
query.populate([
    {
      path: "postedBy", // Field to populate
    },
    {
      path: "category", // Another field to populate
    },
  ]);

// Giving back the updated query with filled-in fields
return query;
};

// An async function to manage a new post's creation
const create__Post = asyncHandler(async (req, res) => {
// Retrieving the necessary data from the body of the request
const { postedItemName, description, initialPrice, category, image } = req.body;

// Verifying that the request body contains the necessary fields
if (!postedItemName || !description || !initialPrice) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let fileData = []; // Placeholder for file-related data

// Recording the file information if the request contains an image file.
console.log(req.file);

// If the image is included in the request, uploading it to Cloudinary
  if (req.file) {
    let uploadedFile;

    try {
      // Attempting to upload the image to Cloudinary
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "bidding/items",
        resource_type: "image",
      });
    } catch (error) {
      // Handling errors related to image upload
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    // Preparing file-related data for storage in the database
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  try {
// Using the Post model to create a new post in the database
    const newPost = await Post.create({
      postedBy: req.user._id, // Assuming req.user is available and contains user information
      postedItemName,
      description,
      initialPrice,
      image: fileData,
      category,
    });

// Forwarding the generated message as a JSON answer
res.status(200).json(newPost);
  } catch (error) {
// Addressing potential issues that arise when creating a post
res.status(500);
    throw new Error("Internal server error", error);
  }
});

// A function that retrieves every post using the query parameters you specify
const get__AllPost = asyncHandler(async (req, res) => {
// Disassembling the request's query parameters
const { search, category, verified } = req.query;
// Create a blank query object to begin constructing the MongoDB query.  
let query = {};
// Verify whether a search term is included.
  if (search) {
// To make the "postedItemName" field case-insensitive, add a regex search condition.
query.postedItemName = { $regex: `^${search}`, $options: "i" };
  }

// Verify whether a category is mentioned
  if (category) {
// Include a qualification in the "category" field.
    query.category = category;
  }
// Verify whether a verification status is mentioned.
  if (verified) {
// Make sure the "isPostVerified" field has a condition.
    query.isPostVerified = verified;
  }
  //Use the populate__Post function to set some query result fields to be filled in.
  const posts = await populate__Post(Post.find(query).sort("-createdAt"));
// In the response, send the posts as JSON.
  res.status(200).json(posts);
});

// The ability to bid on a product
const place__BidOnProduct = asyncHandler(async (req, res) => {
// Taking the post ID out of the parameters of the request
  const { id } = req.params;

// Retrieving the winning bid from the body of the request

const { biddingAmount } = req.body;

// Verifying whether the bid amount is given
  if (!biddingAmount) {
    res.status(400);
    throw new Error("All fields are required");
  }

// Using ID to locate the post

const selectPost = await Post.findById(id);

// Verifying the post's existence

if (!selectPost) {
    res.status(400);
    return res.json({ message: "Post not found" });
  }

// Verifying whether or not the bidding can be placed
  if (selectPost.isSolded) {
    res.status(400);
    return res.json({ message: "Product already sold" });
  }

// Verifying whether the amount being bid exceeds the starting price

if (biddingAmount <= selectPost.initialPrice) {
    res.status(405);
    throw new Error("Amount should be greater than the initial price");
  }

  try {
// Determine if the user has placed a bid yet.
    if (selectPost.biddings.length <= 0) {
// Producing data for bidding

const biddingData = {
        bidPlacedBy: req.user, // Assuming "req.user" contains the user information
        biddingAmount,
        createdAt: new Date(),
      };

      // Adding the bid to the post's biddings array
      selectPost.biddings.push(biddingData);

      // Saving the updated post
      const updatedPost = await selectPost.save();

      // Sending a success response
      res.status(200).json({ message: "Bid placed successfully", data: updatedPost });

      return;
    }

    // If the user has an existing bid, find its index
    const existingBidIndex = selectPost.biddings.findIndex((bid) => bid.bidPlacedBy?._id.toString() === req.user._id.toString());

    // Creating bidding data
    const biddingData = {
      bidPlacedBy: req.user, // Assuming "req.user" contains the user information
      biddingAmount,
      createdAt: new Date(),
    };

    if (existingBidIndex !== -1) {
      // If the user has an existing bid, replace it with the new bid
      selectPost.biddings[existingBidIndex] = biddingData;
    } else {
      // If the user doesn't have an existing bid, add the new bid
      selectPost.biddings.push(biddingData);
    }

    // Saving the updated post
    const updatedPost = await selectPost.save();

    // Sending a success response
    res.status(200).json({ message: "Bid placed successfully", data: updatedPost });
  } catch (error) {
    // Handling errors and sending an informative response
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Function for selling a product to a buyer
const sell__ProductsTo = asyncHandler(async (req, res) => {
  // Extracting product ID from the request parameters
  const { id } = req.params;

  // Extracting soldTo and purchasedAt from the request body
  const { soldTo, purchasedAt } = req.body;

  try {
    // Finding the product and populating associated details
    const selectPost = await populate__Post(Post.findById(id));

    // Checking if the product exists
    if (!selectPost) {
      res.status(400);
      throw new Error("No product found");
    }

    // Checking if the product is already sold
    if (selectPost.isSolded) {
      res.status(400);
      throw new Error("Product already sold");
    }

    // Checking if the purchasedAt amount is provided
    if (!purchasedAt) {
      res.status(400);
      throw new Error("Amount is required");
    }

    // Finding the user details to send the email
    const selectUser = await User.findById({ _id: soldTo });

    // Checking if the buyer exists
    if (!selectUser) {
      res.status(400);
      throw new Error("The buyer is not active anymore");
    }

    // Calculate the commission obtained
    const commissionPercent = selectPost.commissionPercent;
    const commission = (commissionPercent / 100) * purchasedAt;
    const remainingAmount = purchasedAt - commission;

    // Create a record for the purchase
    const purchasedProduct = await PurchaseProducts.create({
      post: selectPost._id,
      soldTo,
      purchasedAt: remainingAmount,
    });

    // Update the product's attributes
    selectPost.commissionObtained = commission;
    selectPost.isSolded = true;
    await selectPost.save();

    // Email subject and content
    const subject = "Product Sold Notification";
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "noreply@suraj.com";

    // Send email notifications to the buyer
    await sendEmail(subject, (send_to = selectUser.email), sent_from, reply_to, (template = "purchaseSuccess"), (name = selectUser.fullName), (message = "You have purchased your product successfully"));

    // Send email notification to the seller
    await sendEmail(subject, (send_to = selectPost.postedBy.email), sent_from, reply_to, (template = "soldSuccess"), (name = selectPost.postedBy.fullName), (message = "Your product has been sold successfully"));

    // Send a success response
    res.status(200).json({ message: "Sold successfully, notifications sent to users through email", data: purchasedProduct });
  } catch (error) {
    // Handle errors and send an informative error response
    res.status(500).json({ error: "Internal server error. " + error.message });
  }
});

// Function for verifying a product
const verify__product = asyncHandler(async (req, res) => {
  // Extracting product ID from the request parameters
  const { id } = req.params;

  // Extracting isPostVerified from the request body
  const { isPostVerified } = req.body;
  console.log(isPostVerified);

  // Finding the product by ID
  const selectProduct = await Post.findById(id);

  // Checking if the product exists
  if (!selectProduct) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Checking if the product is already verified
  if (selectProduct.isPostVerified) {
    res.status(402);
    throw new Error("Product is already verified; you cannot change verification status");
  }

  // Updating the product's verification status
  selectProduct.isPostVerified = isPostVerified;

  // Saving the updated product
  await selectProduct.save();

  // Sending a success response
  res.status(200).json({ message: "Product verified" });
});

// Function for deleting a product
const delete__Product = asyncHandler(async (req, res) => {
  // Extracting product ID from the request parameters
  const { id } = req.params;

  // Finding the product by ID
  const selectPost = await Post.findById(id);

  // Checking if the product exists
  if (!selectPost) {
    res.status(400);
    throw new Error("Product not found");
  }

  // Deleting the product by ID
  await Post.findByIdAndDelete(id);

  // Sending a success response
  res.status(200).json({ success: true, message: "Product deleted" });
});

// Function for getting a product by ID
const get__PostById = asyncHandler(async (req, res) => {
  // Extracting product ID from the request parameters
  const { id } = req.params;
  console.log(id);

  // Selecting the product by ID and populating related fields
  const selectPost = await populate__Post(Post.findById(id));

  // Checking if the product exists
  if (!selectPost) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Sending the selected product as a response
  res.status(200).json(selectPost);
});

// Function for getting products by user ID
const get__PostByUser = asyncHandler(async (req, res) => {
  // Finding products posted by the current user and populating related fields
  const products = await populate__Post(Post.find({ postedBy: req.user._id }));

  // Sending the selected products as a response
  res.status(200).json(products);
});

// Function for updating a product
const update__Product = asyncHandler(async (req, res) => {
  // Extracting necessary fields from the request
  const { postedItemName, description, initialPrice, category } = req.body;
  const { id } = req.params;

  // Selecting the product by ID
  const selectProduct = await Post.findById(id);

  // Checking if the product exists
  if (!selectProduct) {
    res.status(400);
    throw new Error("Product not found");
  }

  let fileData = [];

  // Handling image upload if a file is provided
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "bidding/items",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    // Setting file data
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  try {
    // Updating the product
    const updatedProduct = await Post.findByIdAndUpdate(
      { _id: id },
      {
        postedItemName,
        description,
        initialPrice,
        category,
        image: req.file ? fileData : selectProduct.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Sending a success response with the updated product
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    // Handling errors and sending an error response
    res.status(500);
    throw new Error("Internal server error: " + error.message);
  }
});

// Function for getting the purchaser details of the product
const get__PurchasedUser = asyncHandler(async (req, res) => {
  // Extracting product ID from the request parameters
  const { id } = req.params;

  // Selecting the details of the purchaser and populating the "soldTo" field
  const selectData = await PurchaseProducts.findOne({ post: id }).populate("soldTo");

  // Sending the selected data as a response
  res.status(200).json(selectData);
});

// Function for automatic selling after a certain number of days
const Auto__SellAfterDays = async () => {
  // Defining the criteria for selecting posts
  let query = {};
  query.isSolded = false;
  query.isPostVerified = true;

  // Retrieving posts that meet the criteria and populating related fields
  const posts = await populate__Post(Post.find(query).sort("-createdAt"));

  // Filtering posts with at least one bidding
  const postsWithBiddings = posts.filter((post) => post.biddings.length >= 1);

  // Looping through posts with biddings
  for (const post of postsWithBiddings) {
    // Sorting biddings in descending order by biddingAmount
    const sortedBiddings = post.biddings.sort((a, b) => b.biddingAmount - a.biddingAmount);

    // Finding the most recent bidding
    const mostRecentBidding = post.biddings.reduce((recentBidding, currentBidding) => {
      if (!recentBidding || currentBidding.createdAt > recentBidding.createdAt) {
        return currentBidding;
      }
      return recentBidding;
    }, null);

    // Finding the highest bid
    const highestBid = sortedBiddings[0];

    // Checking if the highest bid was placed more than 1 day ago
    const autoSellTime = 1; // 1 day
    const currentDate = new Date();
    const bidDate = mostRecentBidding.createdAt;
    bidDate.setDate(bidDate.getDate() + autoSellTime);

    if (currentDate >= bidDate) {
      // Marking the post as sold and performing other necessary actions
      const comm = (highestBid.biddingAmount / selectPost.commissionPercent) * 100;
      selectPost.commissionObtained = comm;
      selectPost.isSolded = true;
      await selectPost.save();
      post.isSolded = true;
      await post.save();

      try {
        await PurchaseProducts.create({
          post: post._id,
          soldTo: highestBid.bidPlacedBy._id,
          purchasedAt: highestBid.biddingAmount,
        });

        // Sending email notifications to the buyer and seller
        const subject = "Product Sold Notification";
        const send_to = highestBid.bidPlacedBy.email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = "noreply@gsgvh.com";
        const template = "purchaseSuccess";
        const name = highestBid.bidPlacedBy.fullName;

        await sendEmail(subject, send_to, sent_from, reply_to, template, name);

        const sellerSubject = "Product Sold Notification";
        const sellerSendTo = post.postedBy.email;
        const sellerTemplate = "soldSuccess";
        const sellerName = post.postedBy.fullName;

        await sendEmail(sellerSubject, sellerSendTo, sent_from, reply_to, sellerTemplate, sellerName);
      } catch (error) {
        console.log(error);
      }
      console.log(`Post with ID ${post._id} has been automatically sold.`);
    }
  }
};

// Function for getting the total commission obtained from all posts
const get__TotalCommission = asyncHandler(async (req, res) => {
  try {
    // Retrieving all posts and sorting them by createdAt in descending order
    const posts = await Post.find().sort("-createdAt");

    // Calculating the total commission by summing up the commissionObtained field of each post
    const totalCommission = posts.reduce((total, post) => total + post.commissionObtained, 0);

    // Sending the total commission as a response
    res.status(200).json(totalCommission);
  } catch (error) {
    // Handling errors and sending an error response
    res.status(500).json({ error: "Unable to get total commission" });
  }
});

///exporting the functions
module.exports = {
  create__Post,
  get__AllPost,
  place__BidOnProduct,
  sell__ProductsTo,
  verify__product,
  update__Product,
  delete__Product,
  get__PostById,
  get__PostByUser,
  Auto__SellAfterDays,
  get__PurchasedUser,
  get__TotalCommission,
};
