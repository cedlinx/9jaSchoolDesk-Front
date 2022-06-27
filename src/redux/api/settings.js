import axios from "@/config/axios";

const baseURL = "http://qapp-bank-admin-setting.eu-west-1.elasticbeanstalk.com/api/v1/setting";

// const loanURL = "http://bank-admin-loan-env.eu-west-1.elasticbeanstalk.com/api/v1/loan";

export const getBranchesApi = async () => {
  const request = await axios.get(`${baseURL}/branch/branches`);
  return request;
};

export const addNewBranchApi = async (data) => {
  const request = await axios.post(`${baseURL}/branch/add`, data);
  return request;
};

export const createLoanApi = async (data) => {
  const request = await axios.post(`${baseURL}/loan/create`, data);
  return request;
};

export const getLoansApi = async () => {
  const request = await axios.get(`${baseURL}/loan/loans`);
  return request;
};

export const utilitiesServicesApi = async (data) => {
  const request = await axios.post(`${baseURL}/utility/add`, data);
  return request;
};

export const getUtilitiesServicesApi = async () => {
  const request = await axios.get(`${baseURL}/utility/services`);
  return request;
};

export const getCountriesApi = async () => {
  const request = await axios.get(`${baseURL}/countries`);
  return request;
};
