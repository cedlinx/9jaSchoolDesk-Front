import { getPendingLoansApi, getActiveLoansApi, approveLoanApi, declineLoanApi } from "../api/loans";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  getPendingLoansData: {},
  getActiveLoansData: {},
  approveLoanData: {},
  declineLoanData: {}
};

export const loansSlice = createSlice({
  name: "loans",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getPendingLoansAction: (state, action) => {
      state.getPendingLoansData = action.payload;
      state.loading = false;
    },

    getActiveLoansAction: (state, action) => {
      state.getActiveLoansData = action.payload;
      state.loading = false;
    },

    approveLoanAction: (state, action) => {
      state.approveLoanData = action.payload;
      state.loading = false;
    },

    declineLoanAction: (state, action) => {
      state.declineLoanData = action.payload;
      state.loading = false;
    }
  }
});
export default loansSlice.reducer;

// Actions
const { startLoading, hasError, getPendingLoansAction, getActiveLoansAction, approveLoanAction, declineLoanAction } = loansSlice.actions;

export const getPendingLoans = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getPendingLoansApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(getPendingLoansAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getActiveLoans = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getActiveLoansApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(getActiveLoansAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const approveLoan = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await approveLoanApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(approveLoanAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const declineLoan = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await declineLoanApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(declineLoanAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};


