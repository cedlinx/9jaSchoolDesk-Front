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

export const viewTaskDetailsApi = async (data) => {
  return await axios.post("guardian/auth/student/task/view", data);
};

export const getWardTasksApi = async (data) => {
  return await axios.post("guardian/auth/student/task/list", data);
};

export const modifyWardProfileApi = async (data) => {
  return await axios.post("guardian/auth/profile/update/ward", data);
};

export const modifyGuardianProfileApi = async (data) => {
  return await axios.post("guardian/auth/profile/update", data);
};

export const rateTeacherByGuardianApi = async (data) => {
  return await axios.post("guardian/auth/rate", data);
};

export const preferredChannelApi = async (data) => {
  return await axios.post("guardian/auth/profile/set-comms-channel", data);
};

export const getGuardianDetailsApi = async () => {
  return await axios.get("guardian/auth/profile/view" );
};