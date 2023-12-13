// Importing necessary dependencies and Redux actions
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Form, Input, Space } from "antd";
import { registerUser___registerUser, sendVerificationEmail___sendVerificationEmail } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";

// Seller registration dialog component
export function SellerDialog___SellerDialog({ open, onClose, role }) {
  // Redux state and dispatch function
  const dispatch = useDispatch();
  const { is___Loading } = useSelector((state) => state.auth___auth);

  // Function for handling the form submission
  const onFinish = async (values) => {
    // Form data for seller registration
    const formData = {
      fullName: values.fullName,
      email: values.email,
      contactNo: values.contactNo,
      password: values.password,
      role: role,
    };

    // Dispatching seller registration and email verification actions
    await dispatch(registerUser___registerUser(formData));
    await dispatch(sendVerificationEmail___sendVerificationEmail());

    // Closing the dialog after successful submission
    onClose();
  };

  // Function for handling form submission failure
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

  return (
    <>
      {/* Seller registration dialog */}
      <Drawer
        title="Set Up Your Seller  Account"
        width={520}
        placement="right"
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            {/* Button to close the Drawer */}
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {/* Ant Design form for seller registration */}
        <Form layout="vertical" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          {/* Full Name input */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input className="px-2 py-3" placeholder="Enter full name" />
          </Form.Item>

          {/* Email input */}
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
            <Input className="px-2 py-3" placeholder="Enter email" />
          </Form.Item>

          {/* Contact No input */}
          <Form.Item
            label="Contact No"
            name="contactNo"
            rules={[
              {
                required: true,
                message: "Please input your contact number!",
              },
            ]}
          >
            <Input className="px-2 py-3" placeholder="Enter phone number" />
          </Form.Item>

          {/* Password input */}
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

          {/* Confirm Password input */}
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
            <Input.Password className="px-2 py-3" placeholder="**********" />
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button htmlType="submit" loading={is___Loading} className="bg-green-400">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
