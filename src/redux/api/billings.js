import axios from "@/config/axios";

export const getAllPlansApi = async () => {
  const request = await axios.get("payment/get_plans");
  return request;
};

export const getCurrentPlanApi = async (id) => {
  // const request = await axios.get(`/module/${id}`);
  // return request;
};

export const upgradePlanApi = async (data) => {
  const request = await axios.get("upgrade", data);
  return request;
};

export const renewPlanApi = async (data) => {
  // const request = await axios.get("/payments", data);
  // return request;
};

export const getAllPaymentsApi = async (data) => {
  const request = await axios.post("payment/get_user_payments", data);
  return request;
};

export const deletePaymentApi = async (data) => {
  // const request = await axios.post("payment/delete_payment", data);
  // return request;
};

export const createPaymentPlanApi = async (data) => {
  const request = await axios.post("create_plan", data);
  return request;
};

