// Importing necessary dependencies from React, Ant Design, and Redux
import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory___getAllCategory, RESET } from "../../biddings__redux/biddings__slice/bidding__categprySlice";
import { createPost___createPost } from "../../biddings__redux/biddings__slice/bidding__postSlice";

// Functional component for the Add Product form in a Drawer
const Biddings__AddProduct = ({ onClose, open }) => {
  // Creating a form instance using Ant Design Form
  const [form] = Form.useForm();

  // Accessing the loading state and categories from the Redux store
  const { is___Loading } = useSelector((state) => state.post___post);
  const { categories } = useSelector((state) => state.categories___categories);

  // State variables for image preview and selected file
  const [imagePreview, setIMagePreview] = useState(null);
  const [file, setFile] = useState(null);

  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Function to fetch all categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Dispatching the action to get all categories
      await dispatch(getAllCategory___getAllCategory());
      // Dispatching the action to reset the category state
      dispatch(RESET());
    };

    // Fetching data
    fetchData();
  }, [dispatch]);

  // Function to handle image change and update the state variables
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setIMagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Function to handle category selection
  const handleChange = (selectedValue) => {
    // Setting the category value in the form
    form.setFieldsValue({
      category: selectedValue,
    });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Validating form fields
      await form.validateFields();

      // Creating a FormData object to handle file upload
      const formData = new FormData();
      // Setting form fields in FormData
      formData.append("category", form.getFieldValue("category"));
      formData.append("postedItemName", form.getFieldValue("postedItemName"));
      formData.append("description", form.getFieldValue("description"));
      formData.append("initialPrice", form.getFieldValue("initialPrice"));

      // Appending the uploaded file to FormData if available
      if (file) {
        formData.append("image", file);
      }

      // Dispatching the action to create a new post with the provided data
      await dispatch(createPost___createPost(formData));
    } catch (error) {
      // Handle form validation errors or other errors here
    }
  };

  return (
    <Drawer
      title="Add New Product"
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
      {/* Ant Design Form for adding a new product */}
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Row for the Category selection */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="category"
              label="Select Animal Category"
              rules={[{ required: true, message: "Please select product category" }]}
            >
              {/* Select dropdown for category selection */}
              <Select
                mode="default"
                style={{
                  width: "100%",
                }}
                placeholder="Select product category"
                onChange={handleChange}
                options={categories.map((option) => ({
                  label: option.name,
                  value: option._id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Row for the Product Name input field */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="postedItemName"
              label="Name of Product"
              rules={[{ required: true, message: "Please enter the product name" }]}
            >
              {/* Input field for the product name */}
              <Input placeholder="Enter item name" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row for the Initial Price input field */}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="initialPrice"
              label="Initial Price of Product"
              rules={[{ required: true, message: "Please enter the initial price" }]}
            >
              {/* Input field for the initial price */}
              <Input placeholder="Enter price" type="number" />
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
                  message: "Please enter product description",
                },
              ]}
            >
              {/* Textarea for product description */}
              <Input.TextArea rows={4} placeholder="Please enter product description" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row for the Image upload */}
        <Row gutter={16}>
          <Col span={24}>
            <div>
              {/* Input field for image upload */}
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
                className="bg-gray-200 w-full  p-6 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                required
              />
              {/* Displaying the image preview if available */}
              {imagePreview !== null ? (
                <div className="mt-5">
                  <img src={imagePreview} alt="productImg" width="100%" height="100%" className="mt-5 rounded-lg w-full h-48 object-cover" />
                </div>
              ) : (
                <>No image selected</>
              )}
            </div>
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

// Exporting the AddProduct component as the default export
export default Biddings__AddProduct;
