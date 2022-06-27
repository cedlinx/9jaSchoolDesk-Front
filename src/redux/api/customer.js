import axios from "@/config/axios";
const baseURL = "http://qapp-bank-admin-customer.eu-west-1.elasticbeanstalk.com/api/v1/customer";

const testUrl = "http://967d-41-184-233-82.ngrok.io/api/v1/customer/upload";

// export const uploadCustomerApi = async (data) => {
//   const request = await axios.post(`${testUrl}`, data, {headers: {"Content-Type": "application/json"}});
//   return request;
// };

export const uploadCustomerApi = async (data) => {
  const request = await axios.post(`${testUrl}`, data, {headers: {"Content-Type": "application/csv"}});
  return request;
};

// export const uploadCustomerApi = async (data) => {
//   const request = await axios.post(`${baseURL}/upload`, data);
//   return request;
// };

export const createCustomerApi = async (data) => {
  const request = await axios.post(`${baseURL}/create`, data);
  return request;
};

export const getCustomerInfoApi = async (data) => {
  const request = await axios.get(`${baseURL}/account/${data}`);
  return request;
};

export const getActiveCustomersApi = async (data) => {
  const request = await axios.get(`${baseURL}/active/${data.page}/10`);
  return request;
};