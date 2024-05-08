import { Avatar, Collapse, Input, List, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import {
  RegisterModuleAPI,
  UnRegisterModuleAPI,
  getCourses,
} from "../../../core/apis";
import { useAuth } from "../../../core/store/authContext";
import "./modules.scss";

const MakeModule = (mod) => {
  const data = mod?.map((module, i) => ({
    key: module?.id,
    availability: module?.availability,
    is_registered: module?.is_registered || false,
    href: "#",
    title: `Module Name:  ${module?.name} (${module?.availability})`,
    avatar: ``,
    description: (
      <div>
        <p>code: {module?.code}</p>
        <p>credit hours: {module?.credit}</p>
      </div>
    ),
    content: module?.description,
  }));
  return data;
};

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const getCoursesFun = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      if (res?.status < 400) {
        setCourses(res?.data?.results);
        setFilteredCourses(res?.data?.results);
      } else {
        message.error("something wrong");
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "ERR Profile");
      setLoading(false);
    }
  };

  const handleRegister = async (item) => {
    setLoading(true);
    try {
      if (item?.key && !item?.is_registered) {
        const res = await RegisterModuleAPI(item?.key);
        if (res?.status < 400) {
          message?.success("Module Registered Successfully");
          setLoading(false);
          getCoursesFun();
        } else {
          message?.error(res?.data?.message);
          setLoading(false);
        }
      } else {
        const res = await UnRegisterModuleAPI(item?.key);
        if (res?.status < 400) {
          message?.success("Module Unregistered Successfully");
          setLoading(false);
          getCoursesFun();
        } else {
          message?.error(res?.data?.message);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSearch = (value) => {
    setSearchText(value);
    const filteredData = courses.filter((course) => {
      const courseNameLower = course.name.toLowerCase();
      const searchTextLower = value?.toLowerCase();
      let isMatch = courseNameLower.includes(searchTextLower);

      if (!isMatch) {
        for (const module of course.modules) {
          const moduleNameLower = module.name.toLowerCase();
          if (moduleNameLower.includes(searchTextLower)) {
            isMatch = true;
            break; // Stop iterating modules if a match is found
          }
        }
      }
      return isMatch;
    });
    setFilteredCourses(filteredData);
  };
  useEffect(() => {
    getCoursesFun();
  }, []);

  const modules = filteredCourses?.map((mod) => {
    return {
      key: mod?.id,
      availability: mod?.availability,
      label: `Course Name: ${mod?.name}`,
      children: (
        <List
          key={mod?.id}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={MakeModule(mod?.modules)}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item) => (
            <List.Item
              key={item?.title}
              actions={[
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                  key={item?.id}
                  onClick={() => handleRegister(item)}
                >
                  {loading && <Spin spinning={loading} />}
                  <FaThumbsUp
                    color={item?.is_registered ? "#ee9626" : "grey"}
                    enableBackground={true}
                    size={20}
                  />
                  {item?.is_registered ? "Enrolled" : "Register "}
                </div>,
                // <SlLike icon={SlLike} text="156" key="list-vertical-like-o" />,
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                  }}
                  key={item?.id}
                >
                  <MdEventAvailable size={20} />
                  {item?.availability}
                  {/* {<FaQuestion color="blue" title="Availability" />} */}
                </div>,
              ]}
              // extra={
              //   <img
              //     width={272}
              //     alt="logo"
              //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              //   />
              // }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item?.is_registered ? user?.token[0]?.image ?? "" : ""}
                    size={50}
                  />
                }
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              <pre style={{ marginTop: "1rem" }}>{item.content}</pre>
              {/* {item.content} */}
            </List.Item>
          )}
        />
      ),
    };
  });

  return (
    <div style={{ height: "92vh", overflow: "auto", padding: "10px 20px" }}>
      <h1 style={{ padding: "0px 0px 10px 0px" }}>Courses and Modules</h1>
      <Input
        prefix={<BiSearch size={20} />}
        placeholder="Search By Course OR Module Name"
        allowClear
        onChange={(e) => onSearch(e?.target?.value)}
        style={{ marginBottom: 16, height: "3.5rem" }}
        className="fields"
      />
      <div className="modulesSection">
        {loading && (
          <Spin
            spinning={loading}
            style={{ marginLeft: "50%", marginTop: "10px" }}
          />
        )}
        <Collapse items={modules} />
      </div>
    </div>
  );
};

export default Courses;
