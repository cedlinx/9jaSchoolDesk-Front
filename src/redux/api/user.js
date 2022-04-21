import axios from "@/config/axios";

export const loginApi = async (data) => {
  const request = await axios.post("login", data);
  return request;
};

export const signUpApi = async (data) => {
  const request = await axios.post("register", data);
  return request;
};

export const emailVerificationApi = async (data) => {
  const request = await axios.put("verify/user/email", data);
  return request;
};

export const forgotPasswordApi = async (data) => {
  const request = await axios.post("forgot-password", data);
  return request;
};

export const resetPasswordApi =  async (data) => {
  const request = await axios.post("reset-password", data);
  return request;
};

export const logoutApi =  async () => {
  const request = await axios.post("logout");
  return request;
};

export const modifyProfileInfoApi =  async (data) => {
  const request = await axios.post("modify/user", data);
  return request;
};

export const getUserInfoApi = async () => {
  const request = await axios.get("user/profile");
  return request;
};

export const modifyWebsiteInfoApi =  async (data) => {
  // const request = await axios.post("modify/website", data);
  // return request;
};

export const getWebsiteInfoApi = async () => {
  // const request = await axios.get("website/profile");
  // return request;
};

export const requestVerificationLinkApi =  async (data) => {
  const request = await axios.post(`resend/email/verification?email=${data.email}`, data);
  return request;
};

export const deleteUserApi =  async (data) => {
  const request = await axios.post("delete/user", data);
  return request;
};

export const getAllUsersApi =  async (data) => {
  const request = await axios.get("list/users", data);
  return request;
};

export const getAllAdminUsersApi =  async () => {
  const request = await axios.get("corp/list/users");
  return request;
};

export const getUserSocialApi =  async () => {
  const request = await axios.get("list/socials");
  return request;
};

export const addSocialAccountApi =  async (data) => {
  const request = await axios.post("add/socials", data);
  return request;
};

export const modifySocialAccountApi =  async (data) => {
  const request = await axios.put("modify/socials", data);
  return request;
};

export const deleteSocialAccountApi =  async (data) => {
  const request = await axios.delete("delete/socials", data);
  return request;
};

export const linkSocialAccountApi =  async (data) => {
  const request = await axios.post("link/socials", data);
  return request;
};

export const unlinkSocialAccountApi =  async (data) => {
  const request = await axios.post("unlink/socials", data);
  return request;
};