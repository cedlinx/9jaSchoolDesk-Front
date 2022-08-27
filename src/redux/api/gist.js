import axios from "@/config/axios";

export const createGistApi = async (data) => {
  return await axios.post(`${data.user}/auth/gist/create`, data.payload);
};

export const viewGistDetailsApi = async (data) => {
  return await axios.get(`${data.user}/auth/gist/view?id=${data}`, data);
};

export const getAllGistsApi = async (data) => {
  return await axios.post(`${data.role}/auth/gist/list`, data);
};

export const addCommentApi = async (data) => {
  return await axios.post(`${data.user}/auth/gist/comment/create`, data?.payload);
};

export const getGistConversationsApi = async (data) => {
  return await axios.get(`${data.user}/auth/gist/gists?class_id=${data.class_id}`, data);
};