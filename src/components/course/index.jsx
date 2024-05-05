import { Avatar, Card, Collapse, Drawer, Flex, Typography } from "antd";
const { Meta } = Card;
import imgPlaceHolder from "../../assets/images/course-2.jpg";

import { CiClock2, CiUser, CiLaptop } from "react-icons/ci";
import { useState } from "react";
const Course = ({ course }) => {
  const { Title, Text } = Typography;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const first_module = course?.modules[0]?.id;
  const modules = course?.modules?.map((mod) => {
    return {
      key: mod?.id,
      label: mod?.name,
      children: <p>{mod?.description}</p>,
    };
  });
  return (
    <>
      <Card
        onClick={showDrawer}
        hoverable
        className="course"
        key={course?.id}
        cover={
          <img
            src={course?.image || imgPlaceHolder}
            alt={course?.name}
            style={{ aspectRatio: "auto", height: "200px" }}
          />
        }
        actions={[
          <div
            key="credits"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <CiClock2 /> 24
          </div>,
          <div
            key="students"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <CiUser />
            80 students
          </div>,
          <div
            key="moduels"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <CiLaptop />
            {course?.modules?.length} modules
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${course?.id}`}
            />
          }
          title={course?.name}
          description={course?.description}
        />
      </Card>
      <Drawer
        title="Module Details"
        onClose={onClose}
        open={open}
        width={"50%"}
      >
        <Collapse items={modules} defaultActiveKey={[first_module]} />
      </Drawer>
    </>
  );
};

export default Course;
