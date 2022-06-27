import axios from "@/config/axios";

const baseURL = "http://bank-admin-loan-env.eu-west-1.elasticbeanstalk.com/api/v1/loan";

export const getPendingLoansApi = async (data) => {
  const request = await axios.get(`${baseURL}/pending/${data.page}/${data.pageSize}`);
  return request;
};

export const getActiveLoansApi = async (data) => {
  const request = await axios.get(`${baseURL}/active/${data.page}/${data.pageSize}`);
  return request;
};

export const approveLoanApi = async (data) => {
  const request = await axios.post(`${baseURL}/approve`, data);
  return request;
};

export const declineLoanApi = async (data) => {
  const request = await axios.post(`${baseURL}/decline`, data);
  return request;
};