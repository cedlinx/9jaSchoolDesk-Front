import { toast } from "react-toastify";
import {
  getAllPlansApi,
  getCurrentPlanApi,
  upgradePlanApi,
  renewPlanApi,
  getAllPaymentsApi,
  createPaymentPlanApi,
  deletePaymentApi

} from "../api/billings";

import {
  GET_ALL_PLANS_REQUEST,
  GET_ALL_PLANS_SUCCESS,
  GET_ALL_PLANS_FAILURE,

  GET_CURRENT_PLAN_REQUEST,
  GET_CURRENT_PLAN_SUCCESS,
  GET_CURRENT_PLAN_FAILURE,

  UPGRADE_PLAN_REQUEST,
  UPGRADE_PLAN_SUCCESS,
  UPGRADE_PLAN_FAILURE,

  RENEW_PLAN_REQUEST,
  RENEW_PLAN_SUCCESS,
  RENEW_PLAN_FAILURE,

  GET_USER_PAYMENTS_REQUEST,
  GET_USER_PAYMENTS_SUCCESS,
  GET_USER_PAYMENTS_FAILURE,

  CREATE_PAYMENT_PLAN_REQUEST,
  CREATE_PAYMENT_PLAN_SUCCESS,
  CREATE_PAYMENT_PLAN_FAILURE,

  GET_ALL_PAYMENTS_REQUEST,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_ALL_PAYMENTS_FAILURE,

  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE

} from "./billings.types.js";

const getAllPlansRequest = (payload) => ({
  type: GET_ALL_PLANS_REQUEST,
  payload
});
const getAllPlansSuccess = (response) => ({
  type: GET_ALL_PLANS_SUCCESS,
  payload: response
});
const getAllPlansFailure = (payload) => ({
  type: GET_ALL_PLANS_FAILURE,
  payload
});

export const getAllPlans = () => async (dispatch) => {
  try {
    dispatch(getAllPlansRequest());
    const response = await getAllPlansApi();
    return dispatch(getAllPlansSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(getAllPlansFailure(e.response.data.message));
  }
};

const getCurrentPlanRequest = (payload) => ({
  type: GET_CURRENT_PLAN_REQUEST,
  payload
});
const getCurrentPlanSuccess = (response) => ({
  type: GET_CURRENT_PLAN_SUCCESS,
  payload: response
});
const getCurrentPlanFailure = (payload) => ({
  type: GET_CURRENT_PLAN_FAILURE,
  payload
});

export const getCurrentPlan = (id) => async (dispatch) => {
  try {
    dispatch(getCurrentPlanRequest());
    const response = await getCurrentPlanApi(id);
    return dispatch(getCurrentPlanSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(getCurrentPlanFailure(e.message));
  }
};

const upgradePlanRequest = (payload) => ({
  type: UPGRADE_PLAN_REQUEST,
  payload
});
const upgradePlanSuccess = (response) => ({
  type: UPGRADE_PLAN_SUCCESS,
  payload: response
});
const upgradePlanFailure = (payload) => ({
  type: UPGRADE_PLAN_FAILURE,
  payload
});

export const upgradePlan = (data) => async (dispatch) => {
  try {
    dispatch(upgradePlanRequest());
    const response = await upgradePlanApi(data);
    return dispatch(upgradePlanSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(upgradePlanFailure(e.response.data.message));
  }
};

const renewPlanRequest = (payload) => ({
  type: RENEW_PLAN_REQUEST,
  payload
});
const renewPlanSuccess = (response) => ({
  type: RENEW_PLAN_SUCCESS,
  payload: response
});
const renewPlanFailure = (payload) => ({
  type: RENEW_PLAN_FAILURE,
  payload
});

export const renewPlan = () => async (dispatch) => {
  try {
    dispatch(renewPlanRequest());
    const response = await renewPlanApi();
    return dispatch(renewPlanSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(renewPlanFailure(e.response.data.message));
  }
};

const getUserPaymentsRequest = (payload) => ({
  type: GET_USER_PAYMENTS_REQUEST,
  payload
});
const getUserPaymentsSuccess = (response) => ({
  type: GET_USER_PAYMENTS_SUCCESS,
  payload: response
});
const getUserPaymentsFailure = (payload) => ({
  type: GET_USER_PAYMENTS_FAILURE,
  payload
});

export const getUserPayments = (data) => async (dispatch) => {
  try {
    dispatch(getUserPaymentsRequest());
    const response = await getUserPaymentsApi(data);
    return dispatch(getUserPaymentsSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(getUserPaymentsFailure(e.response.data.message));
  }
};

const createPaymentPlanRequest = (payload) => ({
  type: CREATE_PAYMENT_PLAN_REQUEST,
  payload
});
const createPaymentPlanSuccess = (response) => ({
  type: CREATE_PAYMENT_PLAN_SUCCESS,
  payload: response
});
const createPaymentPlanFailure = (payload) => ({
  type: CREATE_PAYMENT_PLAN_FAILURE,
  payload
});

export const createPaymentPlan = (data) => async (dispatch) => {
  try {
    dispatch(createPaymentPlanRequest());
    const response = await createPaymentPlanApi(data);
    return dispatch(createPaymentPlanSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(createPaymentPlanFailure(e.response.data.message));
  }
};


const getAllPaymentsRequest = (payload) => ({
  type: GET_ALL_PAYMENTS_REQUEST,
  payload
});
const getAllPaymentsSuccess = (response) => ({
  type: GET_ALL_PAYMENTS_SUCCESS,
  payload: response
});
const getAllPaymentsFailure = (payload) => ({
  type: GET_ALL_PAYMENTS_FAILURE,
  payload
});

export const getAllPayments = (data) => async (dispatch) => {
  try {
    dispatch(getAllPaymentsRequest());
    const response = await getAllPaymentsApi(data);
    return dispatch(getAllPaymentsSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(getAllPaymentsFailure(e.message));
  }
};

const deletePaymentRequest = (payload) => ({
  type: DELETE_PAYMENT_REQUEST,
  payload
});
const deletePaymentSuccess = (response) => ({
  type: DELETE_PAYMENT_SUCCESS,
  payload: response
});
const deletePaymentFailure = (payload) => ({
  type: DELETE_PAYMENT_FAILURE,
  payload
});

export const deletePayment = (data) => async (dispatch) => {
  try {
    dispatch(deletePaymentRequest());
    const response = await deletePaymentApi(data);
    return dispatch(deletePaymentSuccess(response));
  } catch (e) {
    toast.error("An Error Occured, please try again");
    return dispatch(deletePaymentFailure(e.message));
  }
};