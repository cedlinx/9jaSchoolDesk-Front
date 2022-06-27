import axios from "@/config/axios";
const baseURL = "http://qapp-bank-admin-agent.eu-west-1.elasticbeanstalk.com/api/v1/agent";

export const declineAgentApi = async (data) => {
  const request = await axios.post(`${baseURL}/decline`, data);
  return request;
};

export const approveAgentApi = async (data) => {
  const request = await axios.post(`${baseURL}/approve`, data);
  return request;
};

export const activateAgentApi = async (data) => {
  const request = await axios.post(`${baseURL}/activate`, data);
  return request;
};

export const pendingAgentsApi = async (data) => {
  const request = await axios.get(`${baseURL}/agents/pending/${data.page}/${data.pageSize}`);
  return request;
};

export const activeAgentsApi = async (data) => {
  const request = await axios.get(`${baseURL}/agents/active/${data.page}/${data.pageSize}`);
  return request;
};

export const approvedAgentsApi = async (data) => {
  const request = await axios.get(`${baseURL}/agents/approved/${data.page}/${data.pageSize}`);
  return request;
};

export const getDevicesApi = async (data) => {
  const request = await axios.get(`${baseURL}/device/devices/${data.accountId}/${data.page}/${data.pageSize}`);
  return request;
};

export const addDeviceApi = async (data) => {
  const request = await axios.post(`${baseURL}/device/add-device`, data);
  return request;
};