import axios from "@/config/axios";
const baseURL = "http://qapp-bank-admin-system.eu-west-1.elasticbeanstalk.com/api/v1/system";


export const uploadStaffApi = async (data) => {
  const request = await axios.post(`${baseURL}/user/upload`, data);
  return request;
};

export const removeRoleApi = async (data) => {
  const request = await axios.post(`${baseURL}/user/remove-role`, data);
  return request;
};

export const createStaffApi = async (data) => {
  const request = await axios.post(`${baseURL}/user/create`, data);
  return request;
};

export const addRoleApi = async (data) => {
  const request = await axios.post(`${baseURL}/user/add-role`, data);
  return request;
};

export const getStaffInfoApi = async (data) => {
  const request = await axios.get(`${baseURL}/user/info/${data}`);
  return request;
};

export const getActiveStaffApi = async (data) => {
  const request = await axios.get(`${baseURL}/user/active/${data.page}/${data.pageSize}`);
  return request;
};