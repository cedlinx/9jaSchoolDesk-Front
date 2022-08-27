import axios from "@/config/axios";

export const getOTPApi = async (data) => {
  const request = await axios.post(`${data.user}/noauth/pre/signup`, data.payload);
  return request;
};

export const verifyOTPApi = async (data) => {
  const request = await axios.post("temp/auth/verify/email/otp", data);
  return request;
};

export const verifyEmailApi = async (data) => {
  const request = await axios.post(`${data.user}/auth/email/verify/6/${data.token}?expires=${data.expires}&signature=${data.signature}`);
  return request;
};

export const signUpApi = async (data) => {
  const request = await axios.post(`temp/auth/${data.user}/signup`, data.payload);
  return request;
};

export const getQRCodeApi = async (data) => {
  const request = await axios.get(`noauth/qrcode/${data}`);
  return request;
};

// export const getQRImageApi = async (data) => {
//   const request = await axios.get(`noauth/qrcode/${data}`);
//   return request;
// };

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
  return await axios.post(`${data.user}/noauth/forgot/password`, data.payload);
};

export const resetPasswordApi =  async (data) => {
  return await axios.post(`${data.user}/noauth/reset/password/${data.token}`, data.payload);
};

export const changePasswordApi =  async (data) => {
  return await axios.post(`${data.user}/auth/change/password`, data.payload);
};

export const validatePinApi = async (data) => {
  return await axios.post("student/noauth/student/validate/pin", data);
};