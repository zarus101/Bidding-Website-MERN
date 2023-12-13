// Importing necessary dependencies and components
import { Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook for navigation
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector from Redux
import { useEffect } from "react"; // Importing useEffect from React
import { Button } from "@material-tailwind/react"; // Importing the Button component from a library
import { getUser___getUser, loginUser___loginUser, RESET } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";

// Defining a mapping of user roles to corresponding paths
const roleToPath = {
  buyer: "/buyer/home",
  seller: "/seller/dashboard",
  admin: "/admin/dashboard",
};

// Defining the LandingPage component
const LandingPage = () => {
  const [form] = Form.useForm(); // Initializing a Form instance
  const navigate = useNavigate(); // Getting the navigate function for navigation
  const dispatch = useDispatch(); // Getting the dispatch function for Redux actions

  // Selecting relevant data from the Redux store using useSelector
  const { is___Success, user, is___LoggedIn } = useSelector((state) => state.auth___auth);

  // Function to handle the form submission
  const onFinish = async () => {
    await form.validateFields(); // Validating the form fields
    const loginData = {
      email: form.getFieldValue("email"), // Getting email input
      password: form.getFieldValue("password"), // Getting password input
    };

    dispatch(loginUser___loginUser(loginData)); // Dispatching the loginUser action
    if (is___LoggedIn) {
      dispatch(getUser___getUser()); // If the user is logged in, dispatching the getUser action
    }
  };

  // Effect to handle redirection after a successful login
  useEffect(() => {
    if (is___Success && is___LoggedIn && user) {
      const path = roleToPath[user?.role]; // Determining the path based on the user's role
      if (path) {
        navigate(path); // Redirecting to the determined path
        dispatch(RESET()); // Resetting the Redux state
      }
    }
  }, [is___LoggedIn, dispatch, is___Success, user, navigate]);

  // Returning the JSX for the component
  return (
    <>
      <section>
        {/* Container for the login section */}
        <div className="flex justify-center items-center min-h-screen">
          {/* Card component for styling the login form */}
          <Card className="min-w-[500px]">
            {/* Main container with a grid layout */}
            <div className=" relative">
              {/* Form part with 2 columns for email, password, and submit button */}
              <div className=" flex flex-col gap-5 ">
                <div className="flex justify-center">
                  <h3 className="text-[30px] text-gray-600 font-bold">Login Here</h3>
                </div>
                {/* Ant Design Form component */}
                <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
                  {/* Email input field */}
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    {/* Ant Design Input component for email */}
                    <Input placeholder="Email" className="px-3 py-2 w-full" />
                  </Form.Item>

                  {/* Password input field */}
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    {/* Ant Design Input.Password component for password */}
                    <Input.Password placeholder="Password" className="px-3 py-2 w-full"/>
                  </Form.Item>

                  {/* Submit button */}
                  <Form.Item>
                    {/* Using the Ant Design Button component for form submission */}
                    <Button type="primary" htmlType="submit" className="bg-red-500">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
