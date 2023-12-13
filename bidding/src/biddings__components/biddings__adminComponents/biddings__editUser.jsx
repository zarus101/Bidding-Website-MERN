// In this line: Importing necessary dependencies and components
import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser___getAllUser, getUserById___getUserById, RESET, updateUser___updateUser } from "../../biddings__redux/biddings__slice/bidding__auth/bidding__authSlice";
import { Roles, TrueFalse } from "../../biddings__assests/data";

// In this line: EditUser component for editing user details in a Drawer
const EditUser___EditUser = ({ onClose, open, id }) => {
  // In this line: Initializing form and loading state
  const [form] = Form.useForm();

  // In this line: Redux state and dispatch setup
  const { select___User, is___Loading } = useSelector((state) => state.auth___auth);
  const dispatch = useDispatch();

  /// In this line: Function for handling role change (not implemented in the provided code)
  const handleRoleChange = (selectedValue) => {};

  // In this line: Function to get the user by id when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // In this line: Dispatching the action to get user details by id
      await dispatch(getUserById___getUserById(id));
      // In this line: Dispatching the action to reset the user state (assuming it's used for temporary data storage)
      dispatch(RESET());
    };

    // In this line: Calling the fetchData function
    fetchData();
  }, [dispatch, id]);

  // In this line: Function to set the default value in the form when user details are fetched
  useEffect(() => {
    form.setFieldsValue({
      fullName: select___User?.fullName,
      role: select___User?.role,
      isSellerVerified: select___User?.isSellerVerified,
    });
  }, [select___User, form]);

  //// In this line: Function for handling form submission
  const handleSubmit = async () => {
    try {
      // In this line: Validate form fields
      await form.validateFields();

      // In this line: Get user data from the form
      const userData = {
        fullName: form.getFieldValue("fullName"),
        role: form.getFieldValue("role"),
        isSellerVerified: form.getFieldValue("isSellerVerified"),
      };

      // In this line: Dispatch the action to update user details
      await dispatch(updateUser___updateUser({ id, userData }));

      // In this line: Dispatch the action to get all users (assuming it updates the user list)
      await dispatch(getAllUser___getAllUser());
    } catch (error) {
      // In this line: Handle form validation errors or other errors here
    }
  };

  // In this line: Rendering the Drawer component with a Form for editing user details
  return (
    <Drawer
      title="Edit User Details"
      width={520}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* In this line: Form fields for editing user details */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="fullName" label="Full Name of User" rules={[{ required: true, message: "Please enter full name" }]}>
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="role" label="Select user role" rules={[{ required: true, message: "Please select user role" }]}>
              {/* In this line: Select component for selecting user role */}
              <Select
                mode="default"
                style={{
                  width: "100%",
                }}
                placeholder="Select user role"
                onChange={handleRoleChange}
                options={Roles.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="isSellerVerified" label="Seller verified" rules={[{ required: true, message: "Please select user role" }]}>
              {/* In this line: Select component for selecting seller verification status */}
              <Select
                mode="default"
                style={{
                  width: "100%",
                }}
                placeholder="Select seller verification status"
                onChange={handleRoleChange}
                options={TrueFalse.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* In this line: Button for submitting the form */}
        <div className="mt-10">
          <Row gutter={16}>
            <Col span={24}>
              <Button htmlType="submit" style={{ backgroundColor: "blue" }} loading={is___Loading}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Drawer>
  );
};

// In this line: Exporting the EditUser component
export default EditUser___EditUser;
