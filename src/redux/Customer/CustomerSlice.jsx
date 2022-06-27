import { uploadCustomerApi, createCustomerApi, getCustomerInfoApi, getActiveCustomersApi } from "../api/customer";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  uploadCustomerData: {},
  createCustomerData: {},
  getCustomerInfoData: {},
  getActiveCustomersData: {}
};

export const customerSlice = createSlice({
  name: "customer",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    uploadCustomerAction: (state, action) => {
      state.uploadCustomerData = action.payload;
      state.loading = false;
    },

    getCustomerInfoAction: (state, action) => {
      state.getCustomerInfoData = action.payload;
      state.loading = false;
    },

    createCustomerAction: (state, action) => {
      state.createCustomerData = action.payload;
      state.loading = false;
    },
 
    getActiveCustomersAction: (state, action) => {
      state.getActiveCustomersData = action.payload;
      state.loading = false;
    }
  }
});
export default customerSlice.reducer;

// Actions
const { startLoading, hasError, uploadCustomerAction, getCustomerInfoAction, createCustomerAction, getActiveCustomersAction} = customerSlice.actions;

export const uploadCustomer = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await uploadCustomerApi(data);
    console.log(response, "decline agent");
    toast.success(response.data.message);
    return dispatch(uploadCustomerAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getCustomerInfo = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getCustomerInfoApi(data);
    console.log(response, "customer info");
    // toast.success(response.data.message);
    return dispatch(getCustomerInfoAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const createCustomer = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await createCustomerApi(data);
    console.log(response, "approve agent");
    toast.success(response.data.message);
    return dispatch(createCustomerAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getActiveCustomers = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getActiveCustomersApi(data);
    console.log(response, "pending agent");
    toast.success(response.data.message);
    return dispatch(getActiveCustomersAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

