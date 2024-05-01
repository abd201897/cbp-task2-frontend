import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Typography,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdOutlineFileUpload } from "react-icons/md";
// import { MdOutlineFileUpload } from "react-icons/md";
import "../formStyles.scss";
import dayjs from "dayjs";
import { RegisterStudentAPI, UpdateStudentAPI } from "../../../core/apis";
import { FaCamera } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi";

const { Text, Title } = Typography;
const RegisterForm = ({ handleOk, refetch, user = {} }) => {
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [, setImageFile] = useState(undefined);

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    console.log(values, "hoo");
    setLoading(true);
    try {
      const obj = {
        ...values,
        image: imageUrl || "",
        date_of_birth: dayjs(values?.date_of_birth).format("X"),
        email: values?.email ? values?.email : "",
        password: values?.password ? values?.password : "",
      };

      if (user?.id) {
        const res = await UpdateStudentAPI(obj);
        if (res?.status < 400) {
          message.success("Profile Updated");
          handleOk();
          refetch();
        }
      } else {
        const res = await RegisterStudentAPI(obj);
        if (res?.status < 400) {
          message.success(res?.data?.message);
          registerForm.resetFields();
          navigate("/login");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      message.error("Image file size exceeds 2 MB limit.");
      return;
    }

    const allowedExtensions = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedExtensions.includes(file.type)) {
      message.error("Only PNG, JPG, and JPEG files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageUrl(reader.result); // Set image URL on load
    reader.onerror = (error) => console.error("Error reading file:", error); // Handle errors

    setImageFile(file); // Store the file object for potential future use
  };
  const handleImageDelete = () => {
    setImageFile(undefined);
    setImageUrl(undefined);
  };
  useEffect(() => {
    setImageUrl(user?.image);
  }, [user?.image]);

  return (
    <Form
      style={{ marginTop: "150px" }}
      name="registerForm"
      layout="vertical"
      onFinish={handleRegister}
      initialValues={{
        username: user?.username,
        first_name: user?.first_name,
        last_name: user?.last_name,
        date_of_birth: user?.date_of_birth
          ? dayjs.unix(user?.date_of_birth)
          : dayjs(),
        address: user?.address,
        country: user?.country,
        city: user?.city,
        email: user?.email || "",
      }}
      autoComplete="off"
      className="Form"
      form={registerForm}
    >
      <Title className="headingText">
        {user?.id ? "Update Profile" : "Register Account"}
      </Title>
      <Flex vertical align="center" justify="space-between">
        <Text>Profile Picture</Text>
        {imageUrl ? (
          <div style={{ position: "relative", padding: "10px" }}>
            <button
              className="delete-button"
              type="button"
              onClick={handleImageDelete}
            >
              <HiOutlineTrash size={20} /> Delete Photo
            </button>
            <Image width={160} height={180} src={imageUrl} />
          </div>
        ) : (
          <Avatar shape="square" size={180} icon={<FaUserLarge />} />
        )}
        <div>
          <label
            style={{ border: "1px solid #2255A6" }}
            htmlFor="image-upload"
            className="LabelStyles"
          >
            <FaCamera /> Upload Image
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
        </div>
      </Flex>
      <Row gutter={[12, 24]}>
        <Col sm={24} md={12} lg={12}>
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
        </Col>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: user?.id ? false : true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="fields" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 24]}>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input className="fields" />
          </Form.Item>
        </Col>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input className="fields" />
          </Form.Item>
        </Col>
      </Row>
      <Row span={24}>
        <Col sm={24} md={24} lg={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email",
              },
              {
                type: "email",
                message: "invalid email!",
              },
            ]}
          >
            <Input className="fields" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 24]}>
        <Col span={24}>
          <Form.Item
            label="Date Of Birth"
            name="date_of_birth"
            rules={[
              {
                required: true,
                message: "Please input your Date of Birth!",
              },
              {
                type: "date",
                message: "Invalid Date",
              },
            ]}
          >
            <DatePicker
              placeholder="Enter Date of Birth"
              style={{ width: "100%" }}
              className="fields"
              size="large"
              format="MM-DD-YYYY"
            />
            {/* <Input className="fields" type="date" /> */}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 24]}>
        <Col span={24}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input className="fields" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 24]}>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
                message: "Please input your Country!",
              },
            ]}
          >
            <Input className="fields" />
          </Form.Item>
        </Col>
        <Col sm={24} md={12} lg={12}>
          <Form.Item
            label="City/Town"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your City/Town!",
              },
            ]}
          >
            <Input className="fields" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          size="large"
          className="submitBtn"
        >
          {user?.id ? "Update Profile" : "Create Account"}
        </Button>
      </Form.Item>
      {!user?.id && (
        <div className="links">
          <Link to="forget-password" className="forget">
            Forget Password
          </Link>
          <Link to="/login" className="signin">
            Already have account
            {/* <FaArrowRightToBracket /> */}
          </Link>
        </div>
      )}
    </Form>
  );
};

export default RegisterForm;
