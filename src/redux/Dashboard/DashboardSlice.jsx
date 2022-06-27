import { getDashboardChartDataApi, getDashboardPanelDataApi } from "../api/dashboard";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  getDashboardChartData: {},
  getDashboardPanelData: {}
};

export const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    getDashboardChartDataAction: (state, action) => {
      state.getDashboardChartData = action.payload;
      state.loading = false;
    },

    getDashboardPanelDataAction: (state, action) => {
      state.getDashboardPanelData = action.payload;
      state.loading = false;
    }
  }
});
export default dashboardSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardChartDataAction, getDashboardPanelDataAction} = dashboardSlice.actions;

export const getDashboardChartData = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardChartDataApi(data);
    console.log(response, "getDashboardChartData");
    toast.success(response.data.message);
    return dispatch(getDashboardChartDataAction(response?.data));
  } catch (e) {
    console.log(e, "getDashboardChartData");

    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getDashboardPanelData = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardPanelDataApi(data);
    console.log(response, "getDashboardPanelData");
    toast.success(response.data.message);
    return dispatch(getDashboardPanelDataAction(response?.data));
  } catch (e) {
    console.log(e, "getDashboardPanelData");

    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};




  
