// Importing necessary React components and styles from Material Tailwind and Heroicons
import React, { useState } from "react";
import { Button, IconButton, List, ListItem, ListItemSuffix, Tooltip } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
// Importing Redux action for deleting a category
import { deleteCategory___deleteCategory } from "../biddings__redux/biddings__slice/bidding__categprySlice";
// Importing components for UI and authentication restrictions
import { GridComponent___GridComponent } from "../biddings__components/biddings_ui/biddings__designs";
import { ShowToSeller___ShowToSeller } from "../biddings__components/biddings__authComponents/biddings__restricts";

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
    </svg>
  );
}
// Component for displaying a slider of categories
const Biddings___CategorySlider = ({ categories, filterItems }) => {
  // State to manage the collapsed/expanded state of the category slider
  const [isCollapsed, setIsCollapsed] = useState(false);
  // State to manage the edit mode for categories
  const [edit, setEdit] = useState(false);
  // Function to toggle the edit mode
  const onEditClicked = () => setEdit((cur) => !cur);
  // Function to toggle the collapsed/expanded state of the category slider
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Redux dispatch for triggering actions
  const dispatch = useDispatch();

  // Function for handling category deletion
  const handleCategoryDelete = async (e, id) => {
    // Displaying a confirmation dialog before deleting a category
    const confirm = window.confirm("Are you sure you want to delete");

    // If the user confirms, dispatch the deleteCategory action
    if (confirm) {
      await dispatch(deleteCategory___deleteCategory(id));
    }
  };

  // JSX structure for rendering the category slider
  return (
    <>
      {/* Sidebar layout for the category slider */}
      <div className={`w-[300px]  sticky top-0 left-0 bg-white flex flex-col ${isCollapsed ? "translate-x-[-240px]" : "translate-x-0"} transition-transform`}>
        {/* Header section with title, edit button, and collapse/expand button */}
        <div className="text text-[20px] font-bold text-center p-2 flex justify-between items-center">
          <h3>Categories</h3>
          <Button onClick={(e) => filterItems(e, "all")}>Reset</Button>
          {/* Show edit button to sellers only */}
          <ShowToSeller___ShowToSeller>
            <Tooltip content="Edit Category">
              <IconButton variant="text" onClick={onEditClicked}>
                <PencilIcon className="h-10 w-6 text-green-500" />
              </IconButton>
            </Tooltip>
          </ShowToSeller___ShowToSeller>
        </div>

        {/* Button for displaying all categories */}
        <List>
          {categories.map((item, index) => (
            <ListItem key={index} ripple={false} className="py-1 pr-1 pl-4">
              <Button disabled={edit ? true : false} key={index} onClick={(e) => filterItems(e, item.slug)}>
                {item?.name}
              </Button>

              <ListItemSuffix>
                {edit && (
                  <IconButton variant="text" color="red" onClick={(e) => handleCategoryDelete(e, item._id)}>
                    <TrashIcon />
                  </IconButton>
                )}
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

// Exporting the component
export default Biddings___CategorySlider;
