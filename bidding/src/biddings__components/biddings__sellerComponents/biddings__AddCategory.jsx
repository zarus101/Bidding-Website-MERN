// Importing necessary dependencies from React, Ant Design, and Redux
import React from "react";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createCategory___createCategory, getCategoryByUser___getCategoryByUser } from "../../biddings__redux/biddings__slice/bidding__categprySlice";

// Functional component for the Add Category form in a Drawer
const Biddings___AddCategory = ({ onClose, open }) => {
  // Creating a form instance using Ant Design Form
  const [form] = Form.useForm();

  // Accessing the loading state and error status from the category slice in the Redux store
  const { is___Error, is___Loading } = useSelector((state) => state.categories___categories);

  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Handling form submission
  const handleSubmit = async () => {
    // Validating form fields
    await form.validateFields();

    // Extracting category data from the form fields
    const categoryData = {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
    };

    // Dispatching the action to create a new category with the provided data
    await dispatch(createCategory___createCategory(categoryData));

    // Resetting form fields if the category creation was successful
    if (!is___Error) {
      form.resetFields();
    }

    // Fetching the updated list of categories after creating a new one
    await dispatch(getCategoryByUser___getCategoryByUser());
  };

  return (
    <Drawer
      title="Add New Product Category"
      width={520}
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
      {/* Ant Design Form for adding a new category */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Row for the Category Name input field */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Category Name"
              rules={[{ required: true, message: "Please enter the category name" }]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row for the Description input field */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter the category description",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Please enter category description" />
            </Form.Item>
          </Col>
        </Row>

        {/* Submit button */}
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

// Exporting the AddCategory component as the default export
export default Biddings___AddCategory;
