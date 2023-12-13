// Importing necessary components and dependencies
import React from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerUser___registerUser, sendVerificationEmail___sendVerificationEmail } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";

// BuyerDialog component for displaying a dialog for the buyer signup
export function Biddings__BuyerDialog({ onClose, open, role }) {
  // Initializing necessary Redux hooks
  const dispatch = useDispatch();
  const { is___Loading } = useSelector((state) => state.auth___auth);

  //// Function for handling the form submission
  const onFinish = async (values) => {
    // Creating formData object with user input values
    const formData = {
      fullName: values.fullName,
      email: values.email,
      contactNo: values.contactNo,
      password: values.password,
      role: role,
    };

    // Dispatching actions to register user and send verification email
    await dispatch(registerUser___registerUser(formData));
    await dispatch(sendVerificationEmail___sendVerificationEmail());

    // Closing the dialog
    onClose()
  };

  // Function to handle form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Password validation function
  const validatePassword = (_, value) => {
    // Add your password validation logic here
    // For example, you can check for minimum length or other criteria
    if (value.length < 8) {
      return Promise.reject("Password must be at least 8 characters long");
    }
    return Promise.resolve();
  };

  // JSX structure for the BuyerDialog component
  return (
    <>
      {/* Dialog component for the buyer signup */}

      <Drawer
        title="Set Up Your Buyer Account"
        width={520}
        placement="left"
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            {/* Button to close the Drawer */}
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
        className="bg-gray-400"
      >


        {/* Ant Design Form component for buyer signup */}
        <Form layout="vertical" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your fullName!",
              },
            ]}
          >
            <Input className="px-2 py-3" placeholder="Enter full name"/>
          </Form.Item>

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
            <Input className="px-2 py-3" placeholder="Enter Email"/>
          </Form.Item>

          <Form.Item
            label="Contact No"
            name="contactNo"
            rules={[
              {
                required: true,
                message: "Please input your contact no!",
              },
            ]}
          >
            <Input type="number" className="px-2 py-3" placeholder="Enter Phone Number"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                validator: validatePassword, // Use the custom validation function
              },
            ]}
          >
            <Input.Password className="px-2 py-3" placeholder="**********" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password  className="px-2 py-3" placeholder="**********"/>
          </Form.Item>

          {/* Submit button for the signup form */}
          <Form.Item>
            <Button  htmlType="submit" loading={is___Loading} className="bg-green-500">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
