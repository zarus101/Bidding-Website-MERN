// Importing necessary components and icons from Material Tailwind and Heroicons
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Avatar, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Card } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import image from "../../biddings__assests/images/user.png";
import { deleteUser___deleteUser, getAllUser___getAllUser } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import EditUser___EditUser from "./biddings__editUser";

// I've created the UserList component to display a list of users in a card format
const UserList___UserLists = ({ users }) => {
  // I've added state for the EditUser modal visibility and selected user ID
  const [editOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  // I've created a function to show the EditUser drawer
  const showEditDrawer = (e, id) => {
    // I've set the selected user ID and toggled the modal visibility
    setSelectedId(id);
    setEditOpen(true);
  };

  // I've created a function to close the EditUser drawer
  const onEditClose = () => {
    setEditOpen(false);
  };

  // I've created a function for deleting a user
  const userDelete = async (e, id) => {
    // I've confirmed the deletion with the user
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      // I've dispatched the action to delete the user by ID
      await dispatch(deleteUser___deleteUser(id));
      // I've dispatched the action to get all users after deletion
      dispatch(getAllUser___getAllUser());
    }
  };

  // JSX for rendering user cards
  return (
    // I've created a section to encapsulate the user list
    <section>
      {/* I've designed a card layout for displaying the list of users */}
      <div className="flex flex-wrap gap-4">
        {/* I've added a Card component for each user with specific styling */}

        {users?.map((user) => (
          <Card key={user._id} className="max-w-xs w-full">
            <div className="p-4">
              {/* I've displayed user information within each card */}
              <Avatar src={image} alt={user.fullName} size="md" className="mx-auto mb-4" />
              <Typography variant="h6">{user.fullName}</Typography>
              <Typography variant="body2" color="blue-gray">
                {user.email}
              </Typography>

              {/* I've added a section to display verification status and role with vertical lines */}
              <div className="mt-4 flex items-center space-x-4">
                <div className=" ">
                  <h2 className="text-blue-gray">isEmailVerified</h2>
                  {/* I've used a Chip component to display verification status with color coding */}
                  <Chip variant="ghost" size="sm" value={user.isEmailVerified ? "True" : "False"} color={user.isEmailVerified ? "green" : "blue-gray"} />
                </div>
                <div className="border-l border-blue-gray"></div>
                <div>
                  <h2 className="text-blue-gray">Role</h2>
                  {/* I've used a Chip component to display the user role with color coding */}
                  <Chip variant="ghost" size="sm" value={user.role} color={user.role === "admin" ? "green" : "blue-gray"} />
                </div>
                <div className="border-l border-blue-gray"></div>
                <div>
                  <h2 className="text-blue-gray">isSellerVerified</h2>
                  {/* I've used a Chip component to display seller verification status with color coding */}
                  <Chip variant="ghost" size="sm" value={user.isSellerVerified ? "True" : "False"} color={user.isSellerVerified ? "green" : "blue-gray"} />
                </div>
              </div>

              {/* I've added a section for Edit and Delete actions */}
              <div className="mt-4 flex items-center space-x-2">
                {/* I've included Tooltip and IconButton for the Edit action */}
                <Tooltip content="Edit User">
                  <IconButton variant="text" onClick={(e) => showEditDrawer(e, user._id)}>
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
                {/* I've included Tooltip and IconButton for the Delete action */}
                <Tooltip content="Delete User">
                  <IconButton variant="text" onClick={(e) => userDelete(e, user._id)}>
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* I've added the EditUser drawer component */}
      <EditUser___EditUser onClose={onEditClose} open={editOpen} id={selectedId} />
    </section>
  );
};

// I've exported the UserList component
export default UserList___UserLists;
