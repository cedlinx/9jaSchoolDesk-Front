import axios from "@/config/axios";
const baseURL = "http://bank-admin-dashboard.eu-west-1.elasticbeanstalk.com/api/v1/dashboard/analytic";

export const getDashboardPanelDataApi = async (data) => {
  const request = await axios.get(`${baseURL}/panel`);
  console.log(request);
  return request;
};

export const getDashboardChartDataApi = async (data) => {
  const request = await axios.get(`${baseURL}/chart`);
  console.log(request);
  return request;
};

