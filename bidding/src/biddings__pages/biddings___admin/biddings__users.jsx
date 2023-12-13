// Importing necessary dependencies and components
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList___UserLists from "../../biddings__components/biddings__adminComponents/biddings__userLists";
import { getAllUser___getAllUser, RESET } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";

// User component for displaying a list of users in the admin section
const Biddings__User = () => {
  // Redux state and dispatch setup
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth___auth);

  // I've added an effect to fetch all users when the component mounts
  useEffect(() => {
    // I've created an async function to fetch data
    const fetchData = async () => {
      // Dispatching the action to get all users
      await dispatch(getAllUser___getAllUser());

      // Dispatching the action to reset the user state (assuming it's used for temporary data storage)
      dispatch(RESET());
    };

    // Calling the fetchData function
    fetchData();
  }, [dispatch]);

  // I've added a console log to log the fetched users
  console.log(users, "This is the fetched user data");

  // Rendering the UserList component with the fetched users as a prop
  return (
    <>
      <UserList___UserLists users={users} />
    </>
  );
};

// Exporting the User component
export default Biddings__User;
