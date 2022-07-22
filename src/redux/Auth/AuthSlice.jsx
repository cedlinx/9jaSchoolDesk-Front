import { loginWithOTPCodeApi, loginWithClassCodeApi, loginApi,  forgotPasswordApi, resetPasswordApi, getOTPApi, verifyOTPApi,  getQRCodeApi, changePasswordApi, signUpApi  } from "../api/auth";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setToken } from "@/utils/auth";
import { setAuthToken } from "@/utils/setAuthToken";


const initialState = {
  loading: false,
  error: {},
  
  loginWithOTPCodeData: {},
  loginWithClassCodeData: {},
  loginData: {},
  forgotPasswordData: {},
  resetPasswordData: {},
  getOTPData: {},
  verifyOTPData: {},
  getQRCodeData: {},
  changePasswordData: {},
  signUpData: {}
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    loginWithOTPCodeAction: (state, action) => {
      state.loginWithOTPCodeData = action.payload;
      state.loading = false;
    },

    loginWithClassCodeAction: (state, action) => {
      state.loginWithClassCodeData = action.payload;
      state.loading = false;
    },

    loginAction: (state, action) => {
      state.loginData = action.payload;
      state.loading = false;
    },
 
    forgotPasswordAction: (state, action) => {
      state.forgotPasswordData = action.payload;
      state.loading = false;
    },

    resetPasswordAction: (state, action) => {
      state.resetPasswordData = action.payload;
      state.loading = false;
    },

    getOTPAction: (state, action) => {
      state.getOTPData = action.payload;
      state.loading = false;
    },

    verifyOTPAction: (state, action) => {
      state.verifyOTPData = action.payload;
      state.loading = false;
    },

    getQRCodeAction: (state, action) => {
      state.getQRCodeData = action.payload;
      state.loading = false;
    },

    changePasswordAction: (state, action) => {
      state.changePasswordData = action.payload;
      state.loading = false;
    },

    signUpAction: (state, action) => {
      state.signUpData = action.payload;
      state.loading = false;
    },

    logoutAction: (state, action) => {
      state.logoutData = action.payload;
      state.loading = false;
    }
  }
});
export default authSlice.reducer;

// Actions
const { startLoading, hasError, loginWithOTPCodeAction, loginWithClassCodeAction, loginAction, forgotPasswordAction, resetPasswordAction, getOTPAction, verifyOTPAction, getQRCodeAction, changePasswordAction, signUpAction} = authSlice.actions;

export const loginWithOTPCode = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await loginWithOTPCodeApi(data);
    console.log(response, "login with code");
    let token = response?.data?.user?.token;
    setToken(token);
    let userData = response?.data?.user;
    localStorage.setItem("userData", JSON.stringify(userData));
    return dispatch(loginWithOTPCodeAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const loginWithClassCode = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await loginWithClassCodeApi(data);
    console.log(response, "login with class code");
    return dispatch(loginWithClassCodeAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await loginApi(data);
    let token = response?.data?.token;
    setToken(token);

    return dispatch(loginAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const getOTP = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getOTPApi(data);
    toast.success(response.data.message);
    let token = response?.data?.token;
    setToken(token);
    return dispatch(getOTPAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const getQRCode = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getQRCodeApi(data);
    toast.success(response.data.message);
    return dispatch(getQRCodeAction(response));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const verifyOTP = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await verifyOTPApi(data);
    return dispatch(verifyOTPAction(response));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const signUp = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await signUpApi(data);
    toast.success(response.data.message);
    let token = response?.data?.token;
    setToken(token);
    return dispatch(signUpAction(response));
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await forgotPasswordApi(data);
    toast.success(response.data.message);
    return dispatch(forgotPasswordAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const changePassword = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await changePasswordApi(data);
    toast.success(response.data.message);
    return dispatch(changePasswordAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await resetPasswordApi(data);
    return dispatch(resetPasswordAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    setAuthToken(false);
    window.location.href = ("/");
  } catch (e) {
    return dispatch(hasError(e.message));
  }
};

  
