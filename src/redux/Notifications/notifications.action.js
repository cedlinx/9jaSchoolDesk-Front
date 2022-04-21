import { allNotificationsDetailsApi, notificationSummaryApi, allReadNotificationsApi, allUnreadNotificationsApi, markAllAsReadApi, markAllAsUnreadApi, markSingleAsReadApi, markSingleAsUnreadApi, disableNotificationsApi, enableNotificationsApi  } from "../api/notifications";
import { toast } from "react-toastify";

import {
  ALL_NOTIFICATIONS_DETAILS_FAILURE,
  ALL_NOTIFICATIONS_DETAILS_SUCCESS,
  ALL_NOTIFICATIONS_DETAILS_REQUEST,

  NOTIFICATION_SUMMARY_REQUEST,
  NOTIFICATION_SUMMARY_SUCCESS,
  NOTIFICATION_SUMMARY_FAILURE,

  ALL_READ_NOTIFICATIONS_REQUEST,
  ALL_READ_NOTIFICATIONS_SUCCESS,
  ALL_READ_NOTIFICATIONS_FAILURE,

  ALL_UNREAD_NOTIFICATIONS_REQUEST,
  ALL_UNREAD_NOTIFICATIONS_SUCCESS,
  ALL_UNREAD_NOTIFICATIONS_FAILURE,

  MARK_ALL_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_FAILURE,
  MARK_ALL_AS_READ_REQUEST,

  MARK_ALL_AS_UNREAD_SUCCESS,
  MARK_ALL_AS_UNREAD_FAILURE,
  MARK_ALL_AS_UNREAD_REQUEST,

  MARK_SINGLE_AS_READ_FAILURE,
  MARK_SINGLE_AS_READ_REQUEST,
  MARK_SINGLE_AS_READ_SUCCESS,

  MARK_SINGLE_AS_UNREAD_SUCCESS,
  MARK_SINGLE_AS_UNREAD_FAILURE,
  MARK_SINGLE_AS_UNREAD_REQUEST, 

  DISABLE_NOTIFICATIONS_SUCCESS,
  DISABLE_NOTIFICATIONS_FAILURE,
  DISABLE_NOTIFICATIONS_REQUEST,

  ENABLE_NOTIFICATIONS_FAILURE,
  ENABLE_NOTIFICATIONS_REQUEST,
  ENABLE_NOTIFICATIONS_SUCCESS

} from "./notifications.types.js";


const allNotificationsDetailsRequest = (payload) => ({
  type: ALL_NOTIFICATIONS_DETAILS_REQUEST,
  payload
});
const allNotificationsDetailsSuccess = (response) => ({
  type: ALL_NOTIFICATIONS_DETAILS_SUCCESS,
  payload: response
});
const allNotificationsDetailsFailure = (payload) => ({
  type: ALL_NOTIFICATIONS_DETAILS_FAILURE,
  payload
});

export const allNotificationsDetails = (data) => async (dispatch) => {
  try {
    dispatch(allNotificationsDetailsRequest());
    const response = await allNotificationsDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(allNotificationsDetailsSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(allNotificationsDetailsFailure(e.response.data.message));
  }
};


const notificationSummaryRequest = (payload) => ({
  type: NOTIFICATION_SUMMARY_REQUEST,
  payload
});
const notificationSummarySuccess = (response) => ({
  type: NOTIFICATION_SUMMARY_SUCCESS,
  payload: response
});
const notificationSummaryFailure = (payload) => ({
  type: NOTIFICATION_SUMMARY_FAILURE,
  payload
});

export const notificationSummary = (data) => async (dispatch) => {
  try {
    dispatch(notificationSummaryRequest());
    const response = await notificationSummaryApi(data);
    toast.success(response.data.message);
    return dispatch(notificationSummarySuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(notificationSummaryFailure(e.response.data.message));
  }
};

const allReadNotificationsRequest = (payload) => ({
  type: ALL_READ_NOTIFICATIONS_REQUEST,
  payload
});
const allReadNotificationsSuccess = (response) => ({
  type: ALL_READ_NOTIFICATIONS_SUCCESS,
  payload: response
});
const allReadNotificationsFailure = (payload) => ({
  type: ALL_READ_NOTIFICATIONS_FAILURE,
  payload
});

export const allReadNotifications = (data) => async (dispatch) => {
  try {
    dispatch(allReadNotificationsRequest());
    const response = await allReadNotificationsApi(data);
    toast.success(response.data.message);
    return dispatch(allReadNotificationsSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(allReadNotificationsFailure(e.response.data.message));
  }
};

const allUnreadNotificationsRequest = (payload) => ({
  type: ALL_UNREAD_NOTIFICATIONS_REQUEST,
  payload
});
const allUnreadNotificationsSuccess = (response) => ({
  type: ALL_UNREAD_NOTIFICATIONS_SUCCESS,
  payload: response
});
const allUnreadNotificationsFailure = (payload) => ({
  type: ALL_UNREAD_NOTIFICATIONS_FAILURE,
  payload
});

export const allUnreadNotifications = (data) => async (dispatch) => {
  try {
    dispatch(allUnreadNotificationsRequest());
    const response = await allUnreadNotificationsApi(data);
    toast.success(response.data.message);
    return dispatch(allUnreadNotificationsSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(allUnreadNotificationsFailure(e.response.data.message));
  }
};

const markAllAsReadRequest = (payload) => ({
  type: MARK_ALL_AS_READ_REQUEST,
  payload
});
const markAllAsReadSuccess = (response) => ({
  type: MARK_ALL_AS_READ_SUCCESS,
  payload: response
});
const markAllAsReadFailure = (payload) => ({
  type: MARK_ALL_AS_READ_FAILURE,
  payload
});

export const markAllAsRead = (data) => async (dispatch) => {
  try {
    dispatch(markAllAsReadRequest());
    const response = await markAllAsReadApi(data);
    toast.success(response.data.message);
    return dispatch(markAllAsReadSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(markAllAsReadFailure(e.response.data.message));
  }
};

const markAllAsUnreadRequest = (payload) => ({
  type: MARK_ALL_AS_UNREAD_REQUEST,
  payload
});
const markAllAsUnreadSuccess = (response) => ({
  type: MARK_ALL_AS_UNREAD_SUCCESS,
  payload: response
});
const markAllAsUnreadFailure = (payload) => ({
  type: MARK_ALL_AS_UNREAD_FAILURE,
  payload
});

export const markAllAsUnread = (data) => async (dispatch) => {
  try {
    dispatch(markAllAsUnreadRequest());
    const response = await markAllAsUnreadApi(data);
    toast.success(response.data.message);
    return dispatch(markAllAsUnreadSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(markAllAsUnreadFailure(e.response.data.message));
  }
};

const markSingleAsReadRequest = (payload) => ({
  type: MARK_SINGLE_AS_READ_REQUEST,
  payload
});
const markSingleAsReadSuccess = (response) => ({
  type: MARK_SINGLE_AS_READ_SUCCESS,
  payload: response
});
const markSingleAsReadFailure = (payload) => ({
  type: MARK_SINGLE_AS_READ_FAILURE,
  payload
});

export const markSingleAsRead = (data) => async (dispatch) => {
  try {
    dispatch(markSingleAsReadRequest());
    const response = await markSingleAsReadApi(data);
    toast.success(response.data.message);
    return dispatch(markSingleAsReadSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(markSingleAsReadFailure(e.response.data.message));
  }
};

const markSingleAsUnreadRequest = (payload) => ({
  type: MARK_SINGLE_AS_UNREAD_REQUEST,
  payload
});
const markSingleAsUnreadSuccess = (response) => ({
  type: MARK_SINGLE_AS_UNREAD_SUCCESS,
  payload: response
});
const markSingleAsUnreadFailure = (payload) => ({
  type: MARK_SINGLE_AS_UNREAD_FAILURE,
  payload
});

export const markSingleAsUnread = (data) => async (dispatch) => {
  try {
    dispatch(markSingleAsUnreadRequest());
    const response = await markSingleAsUnreadApi(data);
    toast.success(response.data.message);
    return dispatch(markSingleAsUnreadSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(markSingleAsUnreadFailure(e.response.data.message));
  }
};

const disableNotificationsRequest = (payload) => ({
  type: DISABLE_NOTIFICATIONS_REQUEST,
  payload
});
const disableNotificationsSuccess = (response) => ({
  type: DISABLE_NOTIFICATIONS_SUCCESS,
  payload: response
});
const disableNotificationsFailure = (payload) => ({
  type: DISABLE_NOTIFICATIONS_FAILURE,
  payload
});

export const disableNotifications = (data) => async (dispatch) => {
  try {
    dispatch(disableNotificationsRequest());
    const response = await disableNotificationsApi(data);
    toast.success(response.data.message);
    return dispatch(disableNotificationsSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(disableNotificationsFailure(e.response.data.message));
  }
};

const enableNotificationsRequest = (payload) => ({
  type: ENABLE_NOTIFICATIONS_REQUEST,
  payload
});
const enableNotificationsSuccess = (response) => ({
  type: ENABLE_NOTIFICATIONS_SUCCESS,
  payload: response
});
const enableNotificationsFailure = (payload) => ({
  type: ENABLE_NOTIFICATIONS_FAILURE,
  payload
});

export const enableNotifications = (data) => async (dispatch) => {
  try {
    dispatch(enableNotificationsRequest());
    const response = await enableNotificationsApi(data);
    toast.success(response.data.message);
    return dispatch(enableNotificationsSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(enableNotificationsFailure(e.response.data.message));
  }
};







