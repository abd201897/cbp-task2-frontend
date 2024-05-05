import { Button, Form, Input, Modal, Typography, message } from "antd";
import React, { useState } from "react";
import { SENDEMAILFORGET, ValidateTokenFORGET } from "../../../core/apis";
import "./forget.scss";
import { useLocation, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [resetForm] = Form.useForm();
  const [confirmForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Title, Text } = Typography;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await SENDEMAILFORGET(values);
      if (res?.status < 400) {
        message.success("Email Send Successfully!");
        setIsModalOpen(true);
      } else {
        message.error(res?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onConfirm = async (values) => {
    setLoading(true);
    try {
      const res = await ValidateTokenFORGET(values);
      if (res?.status < 400) {
        message.success("Password Reset");
        setIsModalOpen(false);
        navigate("/login");
      } else {
        message.error(res?.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <h2>ForgetPassword</h2> */}
        <div>
          <Form
            form={resetForm}
            name="resetForm"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="Form"
            style={{ marginTop: "5rem" }}
          >
            <Title className="headingText">Reset Password</Title>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                { type: "email" },
              ]}
            >
              <Input className="fields" />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                size="large"
                className="submitBtn"
              >
                Send OTP
              </Button>
              <Button
                onClick={() => navigate(-1)}
                className="cancelBtn"
                loading={loading}
                type="primary"
                danger
                size="large"
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={false}
        footer={null}
        width={"850px"}
        destroyOnClose
      >
        <Form
          form={confirmForm}
          name="confirmForm"
          layout="vertical"
          labelAlign="right"
          onFinish={onConfirm}
          autoComplete="off"
          className="Form"
          style={{ margin: "auto" }}
        >
          <Title
            style={{ textAlign: "center" }}
            level={2}
            className="headingText"
          >
            Update Password
          </Title>
          <Title level={3}>OTP</Title>
          <Form.Item
            label=""
            name="token"
            rules={[
              {
                required: true,
                message: "Please input your Token!",
              },
            ]}
          >
            <Input.OTP className="fields" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your New Password!",
              },
            ]}
          >
            <Input.Password className="fields" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input.Password className="fields" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              className="submitBtn"
            >
              Reset Password
            </Button>
            <Button
              onClick={handleCancel}
              className="cancelBtn"
              loading={loading}
              type="primary"
              danger
              size="large"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ForgetPassword;
