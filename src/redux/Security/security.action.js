import { enable2faApi, disable2faApi, changePasswordApi } from "../api/security";
import { toast } from "react-toastify";

import {
	ENABLE_2FA_FAILURE,
	ENABLE_2FA_SUCCESS,
	ENABLE_2FA_REQUEST,

	DISABLE_2FA_REQUEST,
	DISABLE_2FA_SUCCESS,
	DISABLE_2FA_FAILURE,

	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_FAILURE

} from "./security.types.js";


const enable2faRequest = (payload) => ({
	type: ENABLE_2FA_REQUEST,
	payload
});
const enable2faSuccess = (response) => ({
	type: ENABLE_2FA_SUCCESS,
	payload: response
});
const enable2faFailure = (payload) => ({
	type: ENABLE_2FA_FAILURE,
	payload
});

export const enable2fa = (data) => async (dispatch) => {
	try {
		dispatch(enable2faRequest());
		const response = await enable2faApi(data);
		toast.success(response.data.message);
		return dispatch(enable2faSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(enable2faFailure(e.response.data.message));
	}
};


const disable2faRequest = (payload) => ({
	type: DISABLE_2FA_REQUEST,
	payload
});
const disable2faSuccess = (response) => ({
	type: DISABLE_2FA_SUCCESS,
	payload: response
});
const disable2faFailure = (payload) => ({
	type: DISABLE_2FA_FAILURE,
	payload
});

export const disable2fa = (data) => async (dispatch) => {
	try {
		dispatch(disable2faRequest());
		const response = await disable2faApi(data);

		toast.success(response.data.message);
		return dispatch(disable2faSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(disable2faFailure(e.response.data.message));
	}
};

const changePasswordRequest = (payload) => ({
	type: CHANGE_PASSWORD_REQUEST,
	payload
});
const changePasswordSuccess = (response) => ({
	type: CHANGE_PASSWORD_SUCCESS,
	payload: response
});
const changePasswordFailure = (payload) => ({
	type: CHANGE_PASSWORD_FAILURE,
	payload
});

export const changePassword = (data) => async (dispatch) => {
	try {
		dispatch(changePasswordRequest());
		const response = await changePasswordApi(data);
		toast.success(response.data.message);
		return dispatch(changePasswordSuccess(response));
	} catch (e) {
		toast.error(e.response.data.message);
		return dispatch(changePasswordFailure(e.response.data.message));
	}
};