import axios from "axios";
import instance from "../network/interceptor";
const PROD_URL = "https://cbp-task2-backend-g5.azurewebsites.net";
const BASE_URL = import.meta.env.VITE_API_KEY || PROD_URL;
export const LoginAPI = async (values) => {
  const res = await instance.post(`${BASE_URL}/login`, values);
  return res;
};
export const RegisterStudentAPI = async (values) => {
  const res = await instance.post(`${BASE_URL}/api/accounts/add_user`, values);
  return res;
};

export const getStudentProfile = async (id) => {
  const res = await instance.get(
    `${BASE_URL}/api/accounts/get_user?user_id=${id}`
  );
  return res;
};

export const UpdateStudentAPI = async (values) => {
  const res = await instance.post(
    `${BASE_URL}/api/accounts/update_user`,
    values
  );
  return res;
};

export const getCourses = async () => {
  const res = await instance.get(`${BASE_URL}/api/courses/get_courses_list`);
  return res;
};

export const getRegisterCourses = async () => {
  const res = await instance.get(
    `${BASE_URL}/api/courses/get_student_module_register`
  );
  return res;
};
export const RegisterModuleAPI = async (id) => {
  const res = await instance.post(
    `${BASE_URL}/api/courses/add_student_module_register?module_id=${id}`
  );
  return res;
};

export const UnRegisterModuleAPI = async (id) => {
  const res = await instance.delete(
    `${BASE_URL}/api/courses/student_module_unregister?module_id=${id}`
  );
  return res;
};

export const ContactUs = async (values) => {
  const res = await instance.post(`${BASE_URL}/api/utils/contact_us`, values);
  return res;
};

export const SENDEMAILFORGET = async (values) => {
  const res = await instance.post(
    `${BASE_URL}/api/accounts/send_reset_password`,
    values
  );
  return res;
};

export const ValidateTokenFORGET = async (values) => {
  const res = await instance.post(
    `${BASE_URL}/api/accounts/validate_reset_token`,
    values
  );
  return res;
};

export const getNews = async () => {
  const res = await instance.get(
    `https://api.thenewsapi.com/v1/news/all?api_token=7hwoZJJIqMyAk4V7oI5X1Yknk7UIT8jNUzjatUOh&search=usd`
  );
  return res;
};

export const ThirdPartyAPI = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res;
  } catch (error) {}
};
