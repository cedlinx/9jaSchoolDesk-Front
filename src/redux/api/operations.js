import axios from "@/config/axios";
// const baseURL = "http://qapp-bank-admin-account.eu-west-1.elasticbeanstalk.com/api/v1/operation";

const baseURL = "http://qapp-bank-admin-operation.eu-west-1.elasticbeanstalk.com/api/v1/operation";

const getPaginationParams =(data)=>{
  const params = new URLSearchParams({
    page: data.page
  }).toString();
  return params;
};

export const inBankDepositApi = async (data) => {
  const request = await axios.post(`${baseURL}/deposit/in-bank`, data);
  return request;
};

export const tokenizedDepositApi = async (data) => {
  const request = await axios.post(`${baseURL}/deposit/with-token`, data);
  return request;
};

export const inBankWithdrawalApi = async (data) => {
  const request = await axios.post(`${baseURL}/withdrawal/in-bank`, data);
  return request;
};

export const tokenizedWithdrawalApi = async (data) => {

  const request = await axios.post(`${baseURL}/withdrawal/with-token`, data);
  return request;
};

export const transferApi = async (data) => {
  const request = await axios.post(`${baseURL}/transfer`, data);
  return request;
};

export const interBankTransferApi = async (data) => {
  const request = await axios.post(`${baseURL}/transfer/inter`, data);
  return request;
};

export const intraBankTransferApi = async (data) => {
  const request = await axios.post(`${baseURL}/transfer/intra`, data);
  return request;
};

export const utilityPaymentApi = async (data) => {
  const request = await axios.post(`${baseURL}/utility/in-bank`, data);
  return request;
};

export const bankCompletedTransactionsApi = async (data) => {
  const request = await axios.get(`${baseURL}/transaction/completed/${(data.page)}/${data.pageSize}`);
  return request;
};

export const customerPendingTransactionsApi = async (data) => {
  const request = await axios.post(`${baseURL}/transaction/pending/${data}`);
  return request;
};

export const customerPendingDepositsApi = async (data) => {
  const request = await axios.get(`${baseURL}/deposit/pending/${data}`);
  return request;
};

export const customerPendingWithdrawalsApi = async (data) => {
  const request = await axios.get(`${baseURL}/withdrawal/pending/${data}`);
  return request;
};