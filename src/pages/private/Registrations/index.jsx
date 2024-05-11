import React, { useEffect, useState } from "react";
import {
  UnRegisterModuleAPI,
  getCourses,
  getRegisterCourses,
} from "../../../core/apis";
import { useAuth } from "../../../core/store/authContext";
import { FaAppStore, FaBars, FaQuestion } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import {
  Col,
  Descriptions,
  Drawer,
  Flex,
  Image,
  Input,
  List,
  Row,
  Segmented,
  Spin,
  Typography,
  message,
} from "antd";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Avatar, Card } from "antd";
import { BiSearch } from "react-icons/bi";
import "./modules.scss";
import { BsEye } from "react-icons/bs";
const { Meta } = Card;
const Registrations = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [view, setView] = useState("Box");
  const [open, setOpen] = useState(false);
  const [courseDetail, setCourseDetails] = useState({});

  const { Title } = Typography;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getCoursesFun = async () => {
    setLoading(true);
    try {
      const res = await getRegisterCourses();
      if (res?.status < 400) {
        setCourses(res?.data);
        setFilteredCourses(res?.data);
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
    setLoading(true);
    try {
      if (item?.module) {
        const res = await UnRegisterModuleAPI(item?.module);
        if (res?.status < 400) {
          message?.success("Module Registered Successfully");
          getCoursesFun();
        } else {
          message?.error(res?.data?.message);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    setSearchText(value);
    const filteredData = courses.filter((course) => {
      const courseNameLower = course?.modules.name.toLowerCase();
      const searchTextLower = value?.toLowerCase();
      return courseNameLower.includes(searchTextLower);
    });
    setFilteredCourses(filteredData);
  };

  useEffect(() => {
    getCoursesFun();
  }, []);
  const isBox = view === "Box";

  const handleShowCourseDetails = (course) => {
    setCourseDetails(course?.modules);
    showDrawer();
  };

  const excludedKeys = [
    "is_staff",
    // "id",
    "is_registered",
    "image",
    "role",
    "is_active",
    "description",
  ];
  let courseDetails = [
    {
      label: "Module Details",
      children: <pre> {courseDetail?.description}</pre>,
      span: 24,
    },
  ];
  Object.entries(courseDetail)
    .filter(([key]) => !excludedKeys?.includes(key)) // Filter out excluded keys
    .map(([key, val]) =>
      courseDetails?.unshift({ key: key, label: key, children: val })
    );

  return (
    <div style={{ height: "92vh", overflow: "auto", padding: "10px 20px" }}>
      <h1>My Registrations</h1>

      <Input
        prefix={<BiSearch size={20} />}
        placeholder="Search By Course Name"
        allowClear
        onChange={(e) => onSearch(e?.target?.value)}
        style={{ marginBottom: 16, height: "3.5rem" }}
        className="fields"
      />
      <Flex justify="flex-end">
        <Segmented
          value={view}
          onChange={(val) => setView(val)}
          options={[
            {
              label: "List",
              value: "List",
              icon: <FaBars />,
            },
            {
              label: "Box",
              value: "Box",
              icon: <FiGrid />,
            },
          ]}
        />
      </Flex>
      <Spin spinning={loading}>
        <Row gutter={[12, 24]} justify="center" align="middle">
          {filteredCourses?.map((course) => (
            <Col
              xs={24}
              sm={24}
              md={isBox ? 8 : 24}
              lg={isBox ? 6 : 24}
              xl={isBox ? 6 : 24}
            >
              <Card
                // style={{height:'30rem',overflow:'auto'}}
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
                    {loading && <Spin spinning={loading} />}
                    Unregister
                    {<FaThumbsDown color="blue" title="unregister" />}
                  </div>,
                  // <div
                  //   style={{
                  //     display: "flex",
                  //     alignItems: "center",
                  //     justifyContent: "center",
                  //     gap: "10px",
                  //   }}
                  // >
                  //   {course?.modules?.availability}
                  //   {<FaQuestion color="blue" title="Availability" />}
                  // </div>,
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                    onClick={() => handleShowCourseDetails(course)}
                  >
                    View Details
                    {<BsEye color="blue" title="Availability" />}
                  </div>,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar
                      src={
                        course?.modules?.is_registered
                          ? user?.token[0]?.image ?? ""
                          : ""
                      }
                      size={50}
                    />
                  }
                  title={course?.modules?.name}
                  description={course?.modules?.code}
                />
                {!isBox && (
                  <pre style={{ marginTop: "3rem", overflow: "auto" }}>
                    {course?.modules?.description}
                  </pre>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>

      <Drawer title="Module Details" onClose={onClose} open={open} width={"90%"}>
        <Card>
          <Flex justify="space-between">
            {/* <Title>Profile Details</Title>
            <Image
              src={profile?.image}
              style={{
                width: "8rem",
                height: "8rem",
                borderRadius: "4rem",
              }}
            /> */}
          </Flex>
          <Descriptions items={courseDetails} />
          <Descriptions items={[{ description: courseDetail?.description }]} />
        </Card>
      </Drawer>
    </div>
  );
};

export default Registrations;
