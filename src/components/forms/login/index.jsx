import { useAuth } from "../../../core/store/authContext";
import { Button, Form, Input, Row, Typography } from "antd";
import "../formStyles.scss";
import { Link } from "react-router-dom";
const { Title } = Typography;
const LoginForm = () => {
  const [loginForm] = Form.useForm();
  const { login, loading, error } = useAuth();
  const handleLogin = (values) => {
    login(values);
  };
  return (
    <Form
      form={loginForm}
      name="loginForm"
      layout="vertical"
      onFinish={handleLogin}
      autoComplete="off"
      className="Form Login"
    >
      <Title className="headingText">Login</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input className="fields" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
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
          Login
        </Button>
      </Form.Item>
      <div className="links">
        <Link to="/forget-password" className="forget">
          Forget Password
        </Link>
        <Link to="/register" className="signin">
          Create Account
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
