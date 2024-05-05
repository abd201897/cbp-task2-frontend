import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Flex,
  Image,
  Modal,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import "./profile.scss";
import { getStudentProfile } from "../../../core/apis";
import { useAuth } from "../../../core/store/authContext";
import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import RegisterForm from "../../../components/forms/registerForm";
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { Title, Text } = Typography;
  const { user } = useAuth();
  const id = user?.token?.user_id;

  const getProfileFun = async () => {
    setLoading(true);
    try {
      const res = await getStudentProfile(id);
      if (res?.status < 400) {
        setProfile(res?.data?.data[0]);
      } else {
        message.error("something wrong");
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "ERR Profile");
      setLoading(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getProfileFun();
  }, []);
  const excludedKeys = [
    "is_staff",
    "id",
    "is_superuser",
    "image",
    "role",
    "is_active",
  ];
  let profileValues = [];
  Object.entries(profile)
    .filter(([key]) => !excludedKeys?.includes(key)) // Filter out excluded keys
    .map(([key, val]) =>
      profileValues.push({ key: key, label: key, children: val })
    );

  return (
    <div className="container">
      <Spin spinning={loading}>
        <Card>
          <Row gutter={[12, 24]} justify="space-between">
            <Col span={4}>
              {profile?.image ? (
                <Image src={profile?.image} width={200} height={200} />
              ) : (
                <Avatar size={200} shape="square" />
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={18}>
              <Flex justify="space-between">
                <div className="left">
                  <Title>
                    Name : {profile?.first_name || "N/A"} {profile?.last_name}
                  </Title>
                  <Title level={3}>
                    Username : {profile?.username || "N/A"}
                  </Title>
                  <Title level={3}>
                    Date Of Birth :{" "}
                    {dayjs.unix(profile?.date_of_birth).format("DD/MM/YYYY") ||
                      "N/A"}
                  </Title>
                </div>
                <Flex vertical gap={10} justify="space-between">
                  <Button
                    type="primary"
                    level={3}
                    icon={<BsEye />}
                    size="large"
                    onClick={showDrawer}
                  >
                    View More
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    danger
                    level={3}
                    icon={<BiEdit />}
                    onClick={showModal}
                  >
                    Edit Profile
                  </Button>
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Card>
      </Spin>
      <Drawer title="" onClose={onClose} open={open} width={"90%"}>
        <Card>
          <Flex justify="space-between">
            <Title>Profile Details</Title>
            <Image
              src={profile?.image}
              style={{
                width: "8rem",
                height: "8rem",
                borderRadius: "4rem",
              }}
            />
          </Flex>
          <Descriptions items={profileValues} />
        </Card>
      </Drawer>
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
        <RegisterForm
          user={profile}
          handleOk={handleOk}
          refetch={getProfileFun}
        />
      </Modal>
    </div>
  );
};

export default Profile;
