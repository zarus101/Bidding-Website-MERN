// In this line: Importing necessary dependencies and components
import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost___getAllPost, getPostById___getPostById, verifyPost___verifyPost } from "../../biddings__redux/biddings__slice/bidding__postSlice";
import { TrueFalse } from "../../biddings__assests/data";

// In this line: EditProduct component for editing and verifying a product
const Biddings___EditProduct = ({ setIsModalOpen, isModalOpen, id }) => {
  // In this line: Initializing form and setting up Redux state and dispatch
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { single___Post, is___Loading } = useSelector((state) => state.post___post);

  // In this line: Function to handle modal cancelation
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // In this line: Function to fetch the post by id when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPostById___getPostById(id));
    };
    fetchData();
  }, [dispatch, id]);

  // In this line: Function to set the default value for the form
  useEffect(() => {
    form.setFieldsValue({
      isPostVerified: single___Post?.isPostVerified,
    });
  }, [single___Post, form]);

  // In this line: Function to handle the change in the Select component
  const handleChange = (value) => {
    form.setFieldsValue({
      isPostVerified: value,
    });
  };

  // In this line: Function to handle the modal confirmation
  const handleOk = async () => {
    try {
      // In this line: Validate form fields
      await form.validateFields();
      
      // In this line: Get the data from the form
      const data = {
        isPostVerified: form.getFieldValue("isPostVerified"),
      };

      // In this line: Dispatch the action to verify the post
      await dispatch(verifyPost___verifyPost({ id, data }));

      // In this line: Dispatch the action to get all posts (assuming it updates the post list)
      await dispatch(getAllPost___getAllPost());

      // In this line: Close the modal
      setIsModalOpen(false);
    } catch (error) {
      // In this line: Handle form validation errors or other errors here
    }
  };

  // In this line: Rendering the Modal component with a Form for editing and verifying the product
  return (
    <Modal title="Verify the product" confirmLoading={is___Loading} visible={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            {/* In this line: Select component for selecting post verification status */}
            <Form.Item name="isPostVerified" label="Post Verify" rules={[{ required: true, message: "Please select" }]}>
              <Select
                style={{ width: "100%" }}
                placeholder="Select"
                onChange={handleChange}
                options={TrueFalse.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* In this line: Button for confirming the edit and verification */}
        <div>
          <Button className="bg-green-400 text-white font-bold capitalize" onClick={handleOk}>
            edit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

// In this line: Exporting the EditProduct component
export default Biddings___EditProduct;
