import { Spin, message } from "antd";
import Course from "../course";
import "./courses.scss";
import { getCourses } from "../../core/apis";
import { useEffect, useState } from "react";
const Courses = ({ count = 3 }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoursesFun = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      if (res?.status < 400) {
        console.log(res?.data);
        setCourses(res?.data?.results);
      } else {
        message.error("something wrong");
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "ERR Profile");
      setLoading(false);
    }
  };
  useEffect(() => {
    getCoursesFun();
  }, []);
  if (loading) return <Spin spinning={loading} />;
  return (
    <div className="coursesList">
      {courses?.length > 0 &&
        courses?.map(
          (course, index) =>
            index < count && <Course course={course} key={index} />
        )}
    </div>
  );
};

export default Courses;
