// In this line: Importing necessary dependencies and components
import React, { useEffect } from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser___getAllUser, getUser___getUser } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import { getAllPost___getAllPost, getTotalCommission___getTotalCommission } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import { GridComponent___GridComponent } from "../../biddings__components/biddings_ui/biddings__designs";

// In this line: I've created the AdminDashboard component for the admin section
const Biddings__AdminDashboard = () => {
  // In this line: I've retrieved data from the Redux store using useSelector
  const { users, user } = useSelector((state) => state.auth___auth);
  const { posts, total___Commission } = useSelector((state) => state.post___post);
  const dispatch = useDispatch();

  // In this line: I've added an effect to fetch necessary data when the component mounts
  useEffect(() => {
    // In this line: I've dispatched actions to fetch all users, all posts, the current user, and the total commission
    dispatch(getAllUser___getAllUser());
    dispatch(getAllPost___getAllPost());
    dispatch(getUser___getUser());
    dispatch(getTotalCommission___getTotalCommission());
  }, [dispatch]);

  return (
    <>
      {/* In this line: Displaying admin dashboard information */}
      <div className="w-[90%] m-auto mt-20">
        <div className="flex py-3 mb-10 text-[30px]">
          <h3>
            Welcome <span>{user?.fullName}</span>
          </h3>
        </div>

        {/* In this line: Grid component for displaying various statistics using Card components */}
        <GridComponent___GridComponent col={"grid-cols-3"} gap={4}>

          {/* In this line: Card for displaying the total number of users */}
          <Card>
            <div className="flex justify-between w-full">
              <h3 className="text-[15px] font-bold">Users</h3>
              <p className="text-[20px] text-green-400 font-bold"> {users?.length}</p>
            </div>
          </Card>

          {/* In this line: Card for displaying the number of sellers and buyers */}
          <Card>
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full">
                <h3 className="text-[15px] font-bold">Sellers</h3>
                <p className="text-[20px] text-green-400 font-bold"> {users?.filter((item) => item.role === "seller").length}</p>
              </div>
              <div className="flex justify-between w-full">
                <h3 className="text-[15px] font-bold">Buyers</h3>
                <p className="text-[20px] text-green-400 font-bold"> {users?.filter((item) => item.role === "buyer").length}</p>
              </div>
            </div>
          </Card>

          {/* In this line: Card for displaying the number of verified sellers and buyers */}
          <Card>
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full">
                <h3 className="text-[15px] font-bold">Verified Sellers</h3>
                <p className="text-[20px] text-green-400 font-bold"> {users?.filter((item) => item.isSellerVerified).length}</p>
              </div>
              <div className="flex justify-between w-full">
                <h3 className="text-[15px] font-bold">Buyers</h3>
                <p className="text-[20px] text-green-400 font-bold"> {users?.filter((item) => item.role === "buyer").length}</p>
              </div>
            </div>
          </Card>

          {/* In this line: Card for displaying the total number of posts */}
          <Card>
            <div className="flex justify-between w-full">
              <h3 className="text-[15px] font-bold">Posts</h3>
              <p className="text-[20px] text-green-400 font-bold"> {posts?.length}</p>
            </div>
          </Card>

          {/* In this line: Card for displaying the number of verified and sold products */}
          <Card>
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full">
                <h3 className="text-[15px] font-bold">Verified Products</h3>
                <p className="text-[20px] text-green-400 font-bold"> {posts?.filter((item) => item.isPostVerified).length}</p>
              </div>
              <div className="flex justify-between w-full">
                <h3 className="text-[15px] font-bold">Sold Products</h3>
                <p className="text-[20px] text-green-400 font-bold"> {posts?.filter((item) => item.isSolded).length}</p>
              </div>
            </div>
          </Card>

          {/* In this line: Card for displaying the total commission */}
          <Card>
            <div className="flex justify-between w-full">
              <h3 className="text-[15px] font-bold">Total Commission</h3>
              <p className="text-[20px] text-green-400 font-bold">Rs: {total___Commission}</p>
            </div>
          </Card>

        </GridComponent___GridComponent>
      </div>
    </>
  );
};

// In this line: Exporting the AdminDashboard component
export default Biddings__AdminDashboard;
