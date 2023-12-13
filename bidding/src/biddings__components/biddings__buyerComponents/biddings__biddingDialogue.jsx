// Importing necessary dependencies
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllPost___getAllPost, getPostById___getPostById, placeBid___placeBid } from "../../biddings__redux/biddings__slice/bidding__postSlice";

// Bidding dialog component
export function Bidding__BiddingDialog({ isModalOpen, handleOk, handleCancel, id, setIsModalOpen }) {
  // Form instance to handle form operations
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  // Handling form submission
  const handleSubmit = async () => {
    // Validating form fields
    await form.validateFields();

    // Extracting bidding amount from form values
    const data = {
      biddingAmount: form.getFieldValue("biddingAmount"),
    };

    console.log(data);

    // Dispatching placeBid action with the bidding data and updating post information
    await dispatch(placeBid___placeBid({ id, data }));
    await dispatch(getAllPost___getAllPost());
    await dispatch(getPostById___getPostById(id));

    // Closing the bidding dialog
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Modal for bidding */}
      <Modal footer={false} title="Bid Your Amount" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {/* Bidding form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          name="basic"
          labelCol={{
            span: 8,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          {/* Bidding amount input field */}
          <Form.Item
            label="Amount"
            name="biddingAmount"
            rules={[
              {
                required: true,
                message: "Please input the amount!",
              },
            ]}
          >
            <Input type="number" style={{ padding: "20px" }} placeholder="Enter Amount" />
          </Form.Item>

          {/* Form submission button */}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button color="secondary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
