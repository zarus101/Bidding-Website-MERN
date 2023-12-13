// Importing necessary dependencies from React, Ant Design, and Redux
import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost___getAllPost, getPostById___getPostById, updatePost___updatePost } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import { getAllCategory___getAllCategory, RESET } from "../../biddings__redux/biddings__slice/bidding__categprySlice";

// Functional component for editing a product in a Drawer
const Biddings__EditProduct = ({ onClose, open, id }) => {
  // Creating a form instance using Ant Design Form
  const [form] = Form.useForm();

  // Accessing loading state, singlePost, and categories from the Redux store
  const { is___Loading, single___Post } = useSelector((state) => state.post___post);
  const { categories } = useSelector((state) => state.categories___categories);

  // State variable for the selected file to be uploaded
  const [file, setFile] = useState(null);

  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Function to get the single post data and all posts when the component mounts
  useEffect(() => {
    dispatch(getPostById___getPostById(id));
    dispatch(getAllPost___getAllPost());
  }, [dispatch, id]);

  // Setting default form field values based on the single post data
  useEffect(() => {
    form.setFieldsValue({
      category: single___Post?.category?._id,
      postedItemName: single___Post?.postedItemName,
      initialPrice: single___Post?.initialPrice,
      description: single___Post?.description,
    });
  }, [form, single___Post]);

  // Function to get all categories when the component mounts
  useEffect(() => {
    dispatch(getAllCategory___getAllCategory());
    dispatch(RESET());
  }, [dispatch]);

  // Function to handle category selection
  const handleChange = (selectedValue) => {
    form.setFieldsValue({
      category: selectedValue,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    try {
      // Validating form fields
      await form.validateFields();

      // Creating a FormData object to handle file upload
      const formData = new FormData();
      formData.append("category", form.getFieldValue("category"));
      formData.append("postedItemName", form.getFieldValue("postedItemName"));
      formData.append("description", form.getFieldValue("description"));
      formData.append("initialPrice", form.getFieldValue("initialPrice"));

      // Appending the uploaded file to FormData if available
      if (file) {
        formData.append("image", file);
      }

      // Dispatching the action to update the post with the provided data
      await dispatch(updatePost___updatePost({ id, formData }));

      // Fetching the updated post data
      await dispatch(getPostById___getPostById(id));
    } catch (error) {
      // Handle form validation errors or other errors here
    }
  };

  return (
    <Drawer
      title="Edit Product"
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
      {/* Ant Design Form for editing a product */}
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
            {/* Upload component for image upload */}
            <Upload
              className="mt-5"
              showUploadList={false}
              listType="picture-card"
              accept=".jpg, .png"
              beforeUpload={(file) => {
                setFile({ file }.file);
              }}
              onRemove={() => setFile("")}
            >
              Upload
            </Upload>
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

// Exporting the EditProduct component as the default export
export default Biddings__EditProduct;
