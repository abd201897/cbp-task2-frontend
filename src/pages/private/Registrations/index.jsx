import React, { useEffect, useState } from "react";
import {
  UnRegisterModuleAPI,
  getCourses,
  getRegisterCourses,
} from "../../../core/apis";
import { useAuth } from "../../../core/store/authContext";
import { FaQuestion } from "react-icons/fa";
import { Col, List, Row, message } from "antd";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const Registrations = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoursesFun = async () => {
    setLoading(true);
    try {
      const res = await getRegisterCourses();
      if (res?.status < 400) {
        setCourses(res?.data);
      } else {
        message.error("something wrong");
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "ERR Profile");
      setLoading(false);
    }
  };

  const handleUnRegister = async (item) => {
    try {
      if (item?.module) {
        const res = await UnRegisterModuleAPI(item?.module);
        if (res?.status < 400) {
          console.log(res, "ssss");
          message?.success("Module Registered Successfully");
          getCoursesFun();
        } else {
          message?.error(res?.data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoursesFun();
  }, []);
  return (
    <div>
      <h1 style={{ padding: "" }}>My Registrations</h1>
      <Row gutter={[12, 24]} justify="center" align="middle">
        {courses?.map((course) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <div
                  onClick={() => handleUnRegister(course)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  Unregister
                  {<FaThumbsDown color="blue" title="unregister" />}
                </div>,
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {course?.modules?.availability}
                  {<FaQuestion color="blue" title="Availability" />}
                </div>,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title={course?.modules?.name}
                description="This is the description"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Registrations;
