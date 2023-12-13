// Importing necessary React components and utilities
import React from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost___deletePost, RESET } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import { ShowToSeller___ShowToSeller } from "../biddings__authComponents/biddings__restricts";

// Functional component representing a card for displaying seller's product details
const Biddings___SellerProductCard = ({ item, handleBidOpen }) => {
  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Function to handle the deletion of a post
  const handleDelete = async (e, id) => {
    // Displaying a confirmation dialog before deleting
    const confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      // Dispatching the deletePost action with the post ID
      await dispatch(deletePost___deletePost(id));
      // Resetting the post state after deletion
      dispatch(RESET());
    }
  };

  return (
    // Main container for the product card
    <div className="bg-white rounded-lg shadow-md cursor-pointer overflow-hidden hover:shadow-lg">
      {/* Product image */}
      <div className="h-[400px] relative overflow-hidden">
        <img src={item.image.filePath} alt="Product" className="w-full h-full object-cover rounded-t-lg" />
        {/* Seller-specific actions (visible to sellers only) */}
        <ShowToSeller___ShowToSeller>
          <div className="absolute flex gap-2 top-5 align-middle right-3">
            {/* Tooltip-wrapped IconButton for deleting the post */}
            <Tooltip content="Delete Post">
              <IconButton variant="text" onClick={(e) => handleDelete(e, item._id)}>
                <TrashIcon className="h-10 w-6 text-red-500" />
              </IconButton>
            </Tooltip>

            {/* Displaying the verification status of the post */}
            <div className="p-2 border rounded-md capitalize">
              {item.isPostVerified ? (
                // Displaying "isVerified" if the post is verified
                <h3 className="text-green-500 font-bold">isVerified</h3>
              ) : (
                // Displaying "not yet verified" if the post is not verified
                <h3 className="text-red-500 font-bold">not yet verified</h3>
              )}
            </div>
          </div>
        </ShowToSeller___ShowToSeller>
      </div>

      {/* Product details section */}
      <div className="p-4 flex flex-col">
        {/* Link to the detailed view of the product */}
        <Link to={`/admin/product/${item?.postedBy?.fullName}/${item.postedItemName}/${item?._id}`}>
          {/* Product name */}
          <h2 className="text-2xl font-semibold mb-2">{item.postedItemName}</h2>
        </Link>
        {/* Product description */}
        <p className="text-gray-700">{item.description}</p>

        {/* Additional product details (seller and creation date) */}
        <div className="mt-4 flex justify-between w-full">
          {/* Seller's name */}
          <h3 className="text-[20px] font-bold">
            Seller: <span className="font-semibold">{item.postedBy.fullName}</span>
          </h3>
          {/* Formatted creation date of the post */}
          <span className="text-gray-500">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

// Exporting the SellerProductCard component as the default export
export default Biddings___SellerProductCard;
