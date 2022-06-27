import { addNewBranchApi, createLoanApi, getBranchesApi, getLoansApi, utilitiesServicesApi, getUtilitiesServicesApi, getCountriesApi } from "../api/settings";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  addNewBranchData: {},
  createLoanData: {},
  getBranchesData: {},
  getLoansData: {},
  utilitiesServicesData: {},
  getUtilitiesServicesData: {},
  getCountriesData: []
  
};

export const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    addNewBranchAction: (state, action) => {
      state.addNewBranchData = action.payload;
      state.loading = false;
    },

    createLoanAction: (state, action) => {
      state.createLoanData = action.payload;
      state.loading = false;
    },

    getBranchesAction: (state, action) => {
      state.getBranchesData = action.payload;
      state.loading = false;
    },

    getLoansAction: (state, action) => {
      state.getLoansData = action.payload;
      state.loading = false;
    },

    getUtilitiesServicesAction: (state, action) => {
      state.getUtilitiesServicesData = action.payload;
      state.loading = false;
    },

    utilitiesServicesAction: (state, action) => {
      state.utilitiesServicesData = action.payload;
      state.loading = false;
    },

    getCountriesAction: (state, action) => {
      state.getCountriesData = action.payload;
      state.loading = false;
    }

  }
});
export default settingsSlice.reducer;

// Actions
const { startLoading, hasError, addNewBranchAction, createLoanAction, getBranchesAction, getLoansAction, getUtilitiesServicesAction, utilitiesServicesAction, getCountriesAction } = settingsSlice.actions;

export const addNewBranch = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addNewBranchApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(addNewBranchAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const createLoan = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await createLoanApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(createLoanAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getBranches = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getBranchesApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(getBranchesAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getLoans = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getLoansApi(data);
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(getLoansAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getUtilitiesServices = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getUtilitiesServicesApi(data);
    return dispatch(getUtilitiesServicesAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const utilitiesServices = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await utilitiesServicesApi(data);
    console.log(response, "create utility");
    response?.data?.success ? toast.success(response.data.message) : toast.error(response.data.message);
    return dispatch(utilitiesServicesAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getCountries = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getCountriesApi(data);
    console.log(response, "countries");
    return dispatch(getCountriesAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};
  
  
  
