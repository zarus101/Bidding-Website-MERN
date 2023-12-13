import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "antd";

// Importing actions from Redux
import { verifyUser___verifyUser, RESET } from "../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import { GridComponent___GridComponent } from "../biddings__components/biddings_ui/biddings__designs";

// Component for verifying user account
const Biddings___VerifyUser = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  const navigate = useNavigate();

  // Accessing loading status from Redux store
  const { is___Loading } = useSelector((state) => state.auth___auth);

  // Function to handle the account verification process
  const verifyAccount = async () => {
    // Dispatching the verifyUser action with the verification token
    await dispatch(verifyUser___verifyUser(verificationToken));
    
    // Navigating to the home page after successful verification
    navigate("/");

    // Resetting Redux state to clear any temporary data
    await dispatch(RESET());
  };

  return (
    <>
      <section>
        {/* Container for the verification form */}
        <div className="flex justify-center items-center h-screen">
          {/* Card component for styling the verification form */}
          <Card className="bg-white p-10 bg-loginImg">
            <div className="logo h-[40px] absolute top-4 left-4">
              {/* Logo content goes here */}
            </div>
            {/* Container for the login form */}
            <div className="login-container bg-contain bg-no-repeat px-10">
              <div className="containers relative">
                {/* Grid layout for form elements */}
                <GridComponent___GridComponent col="grid-cols-4">
                  {/* Form part with a button for account verification */}
                  <div className="form-part col-span-2 py-2 flex flex-col gap-5 ">
                    <div className="button">
                      {/* Ant Design Button component for account verification */}
                      <Button loading={is___Loading} onClick={verifyAccount} className="bg-red-500 text-white">
                        Verify Account
                      </Button>
                    </div>
                    {/* Instruction for the user */}
                    <p>Click the button to verify your account</p>
                  </div>
                </GridComponent___GridComponent>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Biddings___VerifyUser;
