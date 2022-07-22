import axios from "@/config/axios";

export const getOTPApi = async (data) => {
  const request = await axios.post(`${data.user}/noauth/pre/signup`, data.payload);
  return request;
};

export const verifyOTPApi = async (data) => {
  const request = await axios.post("temp/auth/verify/email/otp", data);
  return request;
};

export const signUpApi = async (data) => {
  const request = await axios.post(`temp/auth/${data.user}/signup`, data.payload);
  return request;
};

export const getQRCodeApi = async (data) => {
  const request = await axios.get("noauth/qrcode/1");
  return request;
};

export const loginApi = async (data) => {
  const request = await axios.post(`${data.user}/noauth/login`, data.payload);
  return request;
};

export const loginWithOTPCodeApi = async (data) => {
  const request = await axios.post(`${data.user}/auth/otp/login`, data.payload);
  return request;
};

export const loginWithClassCodeApi = async (data) => {
  const request = await axios.post("student/noauth/student/join/class", data);
  return request;
};

export const forgotPasswordApi = async (data) => {
  const request = await axios.post("noauth/forgot/password", data);
  return request;
};

export const resetPasswordApi =  async (data) => {
  const request = await axios.post(`noauth/reset/password/${data.token}`, data);
  return request;
};

export const changePasswordApi =  async (data) => {
  const request = await axios.post(`${data.user}/auth/change/password`, data);
  return request;
};