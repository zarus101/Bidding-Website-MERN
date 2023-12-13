// In this line: Importing necessary components and icons from Material Tailwind and Heroicons
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Avatar, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost___deletePost, getAllPost___getAllPost } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import Biddings___EditProduct from "./biddings__editProducts";

// In this line: I've created the ProductList component to display a list of products in a card layout
const ProductList___ProductList = ({ users }) => {
  // In this line: I've set up Redux dispatch
  const dispatch = useDispatch();

  // In this line: I've added state for the selected product ID and modal visibility
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In this line: I've created a function to show/hide the EditProduct modal
  const showModal = (e, id) => {
    // In this line: I've toggled the modal visibility and set the selected product ID
    setSelectedId(id);
    setIsModalOpen((cur) => !cur);
  };

  // In this line: I've added a function to handle product deletion
  const productDelete = async (e, id) => {
    // In this line: I've confirmed deletion with the user
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      // In this line: I've dispatched the action to delete the product by ID
      await dispatch(deletePost___deletePost(id));
      // In this line: I've dispatched the action to get all posts after deletion
      dispatch(getAllPost___getAllPost());
    }
  };

  return (
    // In this line: I've created a section to encapsulate the product list
    <section>
      {/* In this line: I've designed a card layout for displaying the list of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* In this line: I've added a div for each product card with specific styling */}
        {users.map((row) => (
          <div key={row._id} className="border rounded-md p-4 bg-gray-4">
            {/* In this line: I've displayed product information within each card */}
            <div className="flex items-center gap-3">
              <Avatar src={row.image.filePath} alt={row.fullName} size="sm" />
              <div className="flex flex-col">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {row.postedItemName}
                </Typography>
              </div>
            </div>

            <div className="mt-2 max-w-xs">{row.description}</div>

            <div className="mt-2">
              {/* In this line: I've displayed the verification status with color coding */}
              <Typography variant="small" color={row.isPostVerified ? "green" : "red"}>
                {row.isPostVerified ? "Verified" : "Not Verified"}
              </Typography>
            </div>

            <div className="mt-2">Price: Rs. {row.initialPrice}</div>
            <div className="mt-2">Commission: Rs. {row.commissionObtained}</div>
            <div className="mt-2">Posted At: {new Date(row.createdAt).toLocaleDateString("eng")}</div>

            {/* In this line: I've added actions (Edit and Delete) at the bottom of each card */}
            <div className="mt-4 flex justify-end">
              {/* In this line: I've included Tooltip and IconButton for the Edit action */}
              <Tooltip content="Edit Post">
                <IconButton variant="text" onClick={(e) => showModal(e, row._id)}>
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Tooltip>

              {/* In this line: I've included Tooltip and IconButton for the Delete action */}
              <Tooltip content="Delete Post">
                <IconButton variant="text" onClick={(e) => productDelete(e, row._id)}>
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {/* In this line: I've added the EditProduct modal component */}
      <Biddings___EditProduct setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} id={selectedId} />
    </section>
  );
};

// In this line: I've exported the ProductList component
export default ProductList___ProductList;
