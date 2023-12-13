// Importing necessary dependencies and Redux actions
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus___getLoginStatus, getUser___getUser } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";

// Function for showing the component if the user is a seller
export const ShowToSeller___ShowToSeller = ({ children }) => {
  // Retrieving user and login status from the Redux store
  const { user, is___LoggedIn } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  // Fetching user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser___getUser());
    };

    // Fetch user data only if the user is logged in and the user data is not available
    if (is___LoggedIn && user === null) {
      fetchData();
    }
  }, [is___LoggedIn, user, dispatch]);

  // Rendering children only if the user role is "seller"
  if (user?.role === "seller") {
    return <>{children}</>;
  }

  // Returning null if the user is not a seller
  return null;
};

// Function for showing the component if the user is a buyer
export const ShowToBuyer___ShowToBuyer = ({ children }) => {
  // Retrieving user and login status from the Redux store
  const { user, is___LoggedIn } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  // Fetching user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser___getUser());
    };

    // Fetch user data only if the user is logged in and the user data is not available
    if (is___LoggedIn && user === null) {
      fetchData();
    }
  }, [is___LoggedIn, user, dispatch]);

  // Rendering children only if the user role is "buyer"
  if (user?.role === "buyer") {
    return <>{children}</>;
  }

  // Returning null if the user is not a buyer
  return null;
};

// Function for showing the component if the user is logged in
export const ShowToLoggednIn___ShowToLoggednIn = ({ children }) => {
  // Retrieving user and login status from the Redux store
  const { user, is___LoggedIn } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  // Fetching user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser___getUser());
    };

    // Fetch user data only if the user is logged in and the user data is not available
    if (is___LoggedIn && user === null) {
      fetchData();
    }
  }, [is___LoggedIn, user, dispatch]);

  // Rendering children only if the user is logged in
  if (user) {
    return <>{children}</>;
  }

  // Returning null if the user is not logged in
  return null;
};

// Function for showing the component if the user is not logged in
export const NotLoggedIn___NotLoggedIn = ({ children }) => {
  // Retrieving login status from the Redux store
  const { is___LoggedIn } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  // Fetching login status when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getLoginStatus___getLoginStatus());
    };

    fetchData();
  }, [is___LoggedIn, dispatch]);

  // Rendering children only if the user is not logged in
  if (!is___LoggedIn) {
    return <>{children}</>;
  }

  // Returning null if the user is logged in
  return null;
};
