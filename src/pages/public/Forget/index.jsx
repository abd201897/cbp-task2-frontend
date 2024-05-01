import { Button, Form, Input, Typography, message } from "antd";
import React from "react";
import { SENDEMAILFORGET } from "../../../core/apis";

const ForgetPassword = () => {
  const [resetForm] = Form.useForm();

  const { Title, Text } = Typography;
  const onFinish = async (values) => {
    try {
      const res = await SENDEMAILFORGET(values);
      if (res?.status < 400) {
        message.success("Email Send Successfully!");
      }
    } catch (error) {}
  };

  return (
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
          className="Form Login"
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
            ]}
          >
            <Input className="fields" />
          </Form.Item>
          <Form.Item>
            <Button
              //   loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
              className="submitBtn"
            >
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
