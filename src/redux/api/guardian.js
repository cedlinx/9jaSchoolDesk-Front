import axios from "@/config/axios";

export const getDashboardApi = async () => {
  return await axios.post("guardian/auth/dashboard");
};

export const getAllWardsApi = async (data) => {
  return await axios.get("guardian/auth/ward/list", data);
};

export const viewWardDetailsApi = async (data) => {
  return await axios.get(`guardian/auth/ward/view?id=${data}`);
};