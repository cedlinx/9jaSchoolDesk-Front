import { loginWithCodeApi, loginApi, parentSignUpApi, forgotPasswordApi, resetPasswordApi, getOTPApi, verifyOTPApi, proprietorSignUpApi, getQRCodeApi, changePasswordApi, signUpApi  } from "../api/auth";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setToken } from "@/utils/auth";
import { setAuthToken } from "@/utils/setAuthToken";


const initialState = {
  loading: false,
  error: {},
  
  loginWithCodeData: {},
  loginData: {},
  parentSignUpData: {},
  forgotPasswordData: {},
  resetPasswordData: {},
  getOTPData: {},
  verifyOTPData: {},
  proprietorSignUpData: {},
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

    loginWithCodeAction: (state, action) => {
      state.loginWithCodeData = action.payload;
      state.loading = false;
    },

    loginAction: (state, action) => {
      state.loginData = action.payload;
      state.loading = false;
    },

    parentSignUpAction: (state, action) => {
      state.parentSignUpData = action.payload;
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

    proprietorSignUpAction: (state, action) => {
      state.proprietorSignUpData = action.payload;
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
    }
  }
});
export default authSlice.reducer;

// Actions
const { startLoading, hasError, loginWithCodeAction, loginAction, parentSignUpAction, forgotPasswordAction, resetPasswordAction, getOTPAction, verifyOTPAction, proprietorSignUpAction, getQRCodeAction, changePasswordAction, signUpAction} = authSlice.actions;

export const loginWithCode = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await loginWithCodeApi(data);
    return dispatch(loginWithCodeAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await loginApi(data);
    let token = response?.data?.result;
    setToken(token);

    let basicUserData = {
      firstname: response?.data?.result?.firstname,
      lastname: response?.data?.result?.lastname,
      email: response?.data?.result?.email,
      phone: response?.data?.result?.phone,
      bankId: response?.data?.result?.bankId,
      image: response?.data?.result?.image,
      lastLogin: response?.data?.result?.lastLogin
    };
    localStorage.setItem("basicUserData", JSON.stringify(basicUserData));

    return dispatch(loginAction(response?.data));
  } catch (e) {
    toast.error(e.response.message);
    return dispatch(hasError(e.response.message));
  }
};

export const getOTP = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getOTPApi(data);
    console.log(response, "get otp response");
    toast.success(response.data.message);
    let token = response?.data?.token;
    setToken(token);
    return dispatch(getOTPAction(response));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getQRCode = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getQRCodeApi(data);
    toast.success(response.data.message);
    return dispatch(getQRCodeAction(response));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const verifyOTP = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await verifyOTPApi(data);
    toast.success(response.data.message);
    return dispatch(verifyOTPAction(response));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const signUp = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await signUpApi(data);
    toast.success(response.data.message);
    return dispatch(signUpAction(response));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const parentSignUp = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await parentSignUpApi(data);
    toast.success(response.data.message);
    return dispatch(parentSignUpAction(response));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const proprietorSignUp = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await proprietorSignUpApi(data);
    toast.success(response.data.message);
    return dispatch(proprietorSignUpAction(response));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
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
  } catch (e) {
    return dispatch(hasError(e.response.message));
  }
};

  
