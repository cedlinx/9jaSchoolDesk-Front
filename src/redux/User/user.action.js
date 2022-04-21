import { setAuthToken } from "@/utils/setAuthToken";
import { loginApi, signUpApi, emailVerificationApi, forgotPasswordApi, resetPasswordApi, logoutApi, modifyProfileInfoApi, getUserInfoApi, modifyWebsiteInfoApi, getWebsiteInfoApi, requestVerificationLinkApi, deleteUserApi, getAllUsersApi, getAllAdminUsersApi, getUserSocialApi, addSocialAccountApi, modifySocialAccountApi, deleteSocialAccountApi, linkSocialAccountApi, unlinkSocialAccountApi } from "../api/user";
import { toast } from "react-toastify";

import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,

  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  EMAIL_VERIFICATION_START,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAILURE,

  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,

  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  MODIFY_PROFILE_INFO_FAILURE,
  MODIFY_PROFILE_INFO_SUCCESS,
  MODIFY_PROFILE_INFO_START,

  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_START,

  MODIFY_WEBSITE_INFO_FAILURE,
  MODIFY_WEBSITE_INFO_SUCCESS,
  MODIFY_WEBSITE_INFO_START,

  GET_WEBSITE_INFO_START,
  GET_WEBSITE_INFO_SUCCESS,
  GET_WEBSITE_INFO_FAILURE,

  REQUEST_VERIFICATION_LINK_FAILURE,
  REQUEST_VERIFICATION_LINK_SUCCESS,
  REQUEST_VERIFICATION_LINK_START,

  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_START,

  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_START,

  GET_ALL_ADMIN_USERS_FAILURE,
  GET_ALL_ADMIN_USERS_SUCCESS,
  GET_ALL_ADMIN_USERS_START,

  GET_USER_SOCIAL_FAILURE,
  GET_USER_SOCIAL_SUCCESS,
  GET_USER_SOCIAL_START,

  ADD_SOCIAL_ACCOUNT_FAILURE,
  ADD_SOCIAL_ACCOUNT_SUCCESS,
  ADD_SOCIAL_ACCOUNT_START,

  MODIFY_SOCIAL_ACCOUNT_FAILURE,
  MODIFY_SOCIAL_ACCOUNT_SUCCESS,
  MODIFY_SOCIAL_ACCOUNT_START,

  DELETE_SOCIAL_ACCOUNT_FAILURE,
  DELETE_SOCIAL_ACCOUNT_SUCCESS,
  DELETE_SOCIAL_ACCOUNT_START,

  LINK_SOCIAL_ACCOUNT_FAILURE,
  LINK_SOCIAL_ACCOUNT_SUCCESS,
  LINK_SOCIAL_ACCOUNT_START,

  UNLINK_SOCIAL_ACCOUNT_FAILURE,
  UNLINK_SOCIAL_ACCOUNT_SUCCESS,
  UNLINK_SOCIAL_ACCOUNT_START

} from "./user.types.js";

import { setToken, decodeToken, isExpired } from "@/utils/auth";

const startLogin = () => ({
  type: LOGIN_USER_START
});
const successLogin = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload
});
const errorLogin = (payload) => ({
  type: LOGIN_USER_ERROR,
  payload
});

export const loginUser = (data) => async (dispatch) => {
  try {
		
    dispatch(startLogin());
    const response = await loginApi(data);
    setToken(response.data.token);
    return dispatch(successLogin(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(errorLogin(e.response.data.message));
  }
};

const signupRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload
});
const signupSuccess = (response) => ({
  type: SIGNUP_SUCCESS,
  payload: response
});
const signupFailure = (payload) => ({
  type: SIGNUP_FAILURE,
  payload
});

export const signUp = (data) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const response = await signUpApi(data);
    toast.success(response.data.message);
    return dispatch(signupSuccess(response));
  } catch (e) {
    toast.error("An error occurred, please try again");
    return dispatch(signupFailure(e.response.data.message));
  }
};


const emailVerificationRequest = (payload) => ({
  type: EMAIL_VERIFICATION_START,
  payload
});
const emailVerificationSuccess = (response) => ({
  type: EMAIL_VERIFICATION_SUCCESS,
  payload: response
});
const emailVerificationFailure = (payload) => ({
  type: EMAIL_VERIFICATION_FAILURE,
  payload
});

export const emailVerification = (data) => async (dispatch) => {
  try {
    dispatch(emailVerificationRequest());
    const response = await emailVerificationApi(data);
    return dispatch(emailVerificationSuccess(response));
  } catch (e) {
    return dispatch(emailVerificationFailure(e.response.data.message));
  }
};

const forgotPasswordRequest = (payload) => ({
  type: FORGOT_PASSWORD_START,
  payload
});
const forgotPasswordSuccess = (response) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: response
});
const forgotPasswordFailure = (payload) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload
});

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const response = await forgotPasswordApi(data);
    toast.success(response.data.message);
    return dispatch(forgotPasswordSuccess(response));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(forgotPasswordFailure(e.response.data.message));
  }
};

const resetPasswordRequest = (payload) => ({
  type: RESET_PASSWORD_START,
  payload
});
const resetPasswordSuccess = (response) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: response
});
const resetPasswordFailure = (payload) => ({
  type: RESET_PASSWORD_FAILURE,
  payload
});

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const response = await resetPasswordApi(data);
    return dispatch(resetPasswordSuccess(response));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(resetPasswordFailure(e.response.data.message));
  }
};

const logoutRequest = (payload) => ({
  type: LOGOUT_START,
  payload
});
const logoutSuccess = (response) => ({
  type: LOGOUT_SUCCESS,
  payload: response
});
const logoutFailure = (payload) => ({
  type: LOGOUT_FAILURE,
  payload
});

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const response = await logoutApi();
    toast.success(response.data.message);
    localStorage.clear();
    setAuthToken(false);
    // window.location.reload();
    return dispatch(logoutSuccess());
  } catch (e) {
    toast.warn(e?.response?.data?.message);
    return dispatch(logoutFailure(e.response.data.message));
  }
};

const modifyProfileInfoRequest = (payload) => ({
  type: MODIFY_PROFILE_INFO_START,
  payload
});
const modifyProfileInfoSuccess = (response) => ({
  type: MODIFY_PROFILE_INFO_SUCCESS,
  payload: response
});
const modifyProfileInfoFailure = (payload) => ({
  type: MODIFY_PROFILE_INFO_FAILURE,
  payload
});

export const modifyProfileInfo = (data) => async (dispatch) => {
  try {
    dispatch(modifyProfileInfoRequest());
    const response = await modifyProfileInfoApi(data);
    toast.success(response.data.message);
    return dispatch(modifyProfileInfoSuccess(response));
  } catch (e) {
    toast.warn("An error occurred, please try again");
    return dispatch(modifyProfileInfoFailure(e.response.data.message));
  }
};

const getUserInfoRequest = (payload) => ({
  type: GET_USER_INFO_START,
  payload
});
const getUserInfoSuccess = (response) => ({
  type: GET_USER_INFO_SUCCESS,
  payload: response
});
const getUserInfoFailure = (payload) => ({
  type: GET_USER_INFO_FAILURE,
  payload
});

export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch(getUserInfoRequest());
    const response = await getUserInfoApi();
    return dispatch(getUserInfoSuccess(response));
  } catch (e) {
    toast.warn("An error occurred, please try again");
    return dispatch(getUserInfoFailure(e.response.data.message));
  }
};

const modifyWebsiteInfoRequest = (payload) => ({
  type: MODIFY_WEBSITE_INFO_START,
  payload
});
const modifyWebsiteInfoSuccess = (response) => ({
  type: MODIFY_WEBSITE_INFO_SUCCESS,
  payload: response
});
const modifyWebsiteInfoFailure = (payload) => ({
  type: MODIFY_WEBSITE_INFO_FAILURE,
  payload
});

export const modifyWebsiteInfo = (data) => async (dispatch) => {
  try {
    dispatch(modifyWebsiteInfoRequest());
    const response = await modifyWebsiteInfoApi(data);
    toast.success(response.data.message);
    return dispatch(modifyWebsiteInfoSuccess(response));
  } catch (e) {
    toast.warn("An error occurred, please try again");
    return dispatch(modifyWebsiteInfoFailure(e.response.data.message));
  }
};

const getWebsiteInfoRequest = (payload) => ({
  type: GET_WEBSITE_INFO_START,
  payload
});
const getWebsiteInfoSuccess = (response) => ({
  type: GET_WEBSITE_INFO_SUCCESS,
  payload: response
});
const getWebsiteInfoFailure = (payload) => ({
  type: GET_WEBSITE_INFO_FAILURE,
  payload
});

export const getWebsiteInfo = () => async (dispatch) => {
  try {
    dispatch(getWebsiteInfoRequest());
    const response = await getWebsiteInfoApi();
    return dispatch(getWebsiteInfoSuccess(response));
  } catch (e) {
    toast.warn("An Error Occured, please try again");
    return dispatch(getWebsiteInfoFailure(e.message));
  }
};


const requestVerificationLinkRequest = (payload) => ({
  type: REQUEST_VERIFICATION_LINK_START,
  payload
});
const requestVerificationLinkSuccess = (response) => ({
  type: REQUEST_VERIFICATION_LINK_SUCCESS,
  payload: response
});
const requestVerificationLinkFailure = (payload) => ({
  type: REQUEST_VERIFICATION_LINK_FAILURE,
  payload
});

export const requestVerificationLink = (data) => async (dispatch) => {
  try {
    dispatch(requestVerificationLinkRequest());
    const response = await requestVerificationLinkApi(data);
    toast.success(response.data.msg);
    return dispatch(requestVerificationLinkSuccess(response));
  } catch (e) {
    toast.error(e.response.data.msg);
    return dispatch(requestVerificationLinkFailure(e.response.data.message));
  }
};

const deleteUserRequest = (payload) => ({
  type: DELETE_USER_START,
  payload
});
const deleteUserSuccess = (response) => ({
  type: DELETE_USER_SUCCESS,
  payload: response
});
const deleteUserFailure = (payload) => ({
  type: DELETE_USER_FAILURE,
  payload
});

export const deleteUser = (data) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    const response = await deleteUserApi(data);
    toast.success(response.data.message);
    return dispatch(deleteUserSuccess(response));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(deleteUserFailure(e.response.data.message));
  }
};

const getAllUsersRequest = (payload) => ({
  type: GET_ALL_USERS_START,
  payload
});
const getAllUsersSuccess = (response) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: response
});
const getAllUsersFailure = (payload) => ({
  type: GET_ALL_USERS_FAILURE,
  payload
});

export const getAllUsers = (data) => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const response = await getAllUsersApi(data);
    toast.success(response.data.message);
    return dispatch(getAllUsersSuccess(response));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(getAllUsersFailure(e.response.data.message));
  }
};

const getAllAdminUsersRequest = (payload) => ({
  type: GET_ALL_ADMIN_USERS_START,
  payload
});
const getAllAdminUsersSuccess = (response) => ({
  type: GET_ALL_ADMIN_USERS_SUCCESS,
  payload: response
});
const getAllAdminUsersFailure = (payload) => ({
  type: GET_ALL_ADMIN_USERS_FAILURE,
  payload
});

export const getAllAdminUsers = () => async (dispatch) => {
  try {
    dispatch(getAllAdminUsersRequest());
    const response = await getAllAdminUsersApi();
    toast.success(response.data.message);
    return dispatch(getAllAdminUsersSuccess(response));
  } catch (e) {
    toast.error(e.response.data.message);
    return dispatch(getAllAdminUsersFailure(e.response.data.message));
  }
};

const getUserSocialRequest = (payload) => ({
  type: GET_USER_SOCIAL_START,
  payload
});
const getUserSocialSuccess = (response) => ({
  type: GET_USER_SOCIAL_SUCCESS,
  payload: response
});
const getUserSocialFailure = (payload) => ({
  type: GET_USER_SOCIAL_FAILURE,
  payload
});

export const getUserSocial = () => async (dispatch) => {
  try {
    dispatch(getUserSocialRequest());
    const response = await getUserSocialApi();
    toast.success(response.data.message);
    return dispatch(getUserSocialSuccess(response));
  } catch (e) {
    toast.error("An error occured, please try again");
    return dispatch(getUserSocialFailure(e.response.data.message));
  }
};

const addSocialAccountRequest = (payload) => ({
  type: ADD_SOCIAL_ACCOUNT_START,
  payload
});
const addSocialAccountSuccess = (response) => ({
  type: ADD_SOCIAL_ACCOUNT_SUCCESS,
  payload: response
});
const addSocialAccountFailure = (payload) => ({
  type: ADD_SOCIAL_ACCOUNT_FAILURE,
  payload
});

export const addSocialAccount = (data) => async (dispatch) => {
  try {
    dispatch(addSocialAccountRequest());
    const response = await addSocialAccountApi(data);
    toast.success(response.data.message);
    return dispatch(addSocialAccountSuccess(response));
  } catch (e) {
    toast.error("An error occured, please try again");
    return dispatch(addSocialAccountFailure(e.response.data.message));
  }
};

const modifySocialAccountRequest = (payload) => ({
  type: MODIFY_SOCIAL_ACCOUNT_START,
  payload
});
const modifySocialAccountSuccess = (response) => ({
  type: MODIFY_SOCIAL_ACCOUNT_SUCCESS,
  payload: response
});
const modifySocialAccountFailure = (payload) => ({
  type: MODIFY_SOCIAL_ACCOUNT_FAILURE,
  payload
});

export const modifySocialAccount = (data) => async (dispatch) => {
  try {
    dispatch(modifySocialAccountRequest());
    const response = await modifySocialAccountApi(data);
    toast.success(response.data.message);
    return dispatch(modifySocialAccountSuccess(response));
  } catch (e) {
    toast.error("An error occured, please try again");
    return dispatch(modifySocialAccountFailure(e.response.data.message));
  }
};

const deleteSocialAccountRequest = (payload) => ({
  type: DELETE_SOCIAL_ACCOUNT_START,
  payload
});
const deleteSocialAccountSuccess = (response) => ({
  type: DELETE_SOCIAL_ACCOUNT_SUCCESS,
  payload: response
});
const deleteSocialAccountFailure = (payload) => ({
  type: DELETE_SOCIAL_ACCOUNT_FAILURE,
  payload
});

export const deleteSocialAccount = (data) => async (dispatch) => {
  try {
    dispatch(deleteSocialAccountRequest());
    const response = await deleteSocialAccountApi(data);
    toast.success(response.data.message);
    return dispatch(deleteSocialAccountSuccess(response));
  } catch (e) {
    toast.error("An error occured, please try again");
    return dispatch(deleteSocialAccountFailure(e.response.data.message));
  }
};

const linkSocialAccountRequest = (payload) => ({
  type: LINK_SOCIAL_ACCOUNT_START,
  payload
});
const linkSocialAccountSuccess = (response) => ({
  type: LINK_SOCIAL_ACCOUNT_SUCCESS,
  payload: response
});
const linkSocialAccountFailure = (payload) => ({
  type: LINK_SOCIAL_ACCOUNT_FAILURE,
  payload
});

export const linkSocialAccount = (data) => async (dispatch) => {
  try {
    dispatch(linkSocialAccountRequest());
    const response = await linkSocialAccountApi(data);
    toast.success(response.data.message);
    return dispatch(linkSocialAccountSuccess(response));
  } catch (e) {
    toast.error("An error occured, please try again");
    return dispatch(linkSocialAccountFailure(e.response.data.message));
  }
};

const unlinkSocialAccountRequest = (payload) => ({
  type: UNLINK_SOCIAL_ACCOUNT_START,
  payload
});
const unlinkSocialAccountSuccess = (response) => ({
  type: UNLINK_SOCIAL_ACCOUNT_SUCCESS,
  payload: response
});
const unlinkSocialAccountFailure = (payload) => ({
  type: UNLINK_SOCIAL_ACCOUNT_FAILURE,
  payload
});

export const unlinkSocialAccount = (data) => async (dispatch) => {
  try {
    dispatch(unlinkSocialAccountRequest());
    const response = await unlinkSocialAccountApi(data);
    toast.success(response.data.message);
    return dispatch(unlinkSocialAccountSuccess(response));
  } catch (e) {
    toast.error("An error occured, please try again");
    return dispatch(unlinkSocialAccountFailure(e.response.data.message));
  }
};