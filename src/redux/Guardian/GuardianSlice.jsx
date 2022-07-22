import { getDashboardApi, getAllWardsApi, viewWardDetailsApi} from "../api/guardian";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  loading: false,
  error: {},
  
  getDashboardData: {},
  getAllWardsData: {},
  viewWardDetailsData: {}
};

export const guardianSlice = createSlice({
  name: "guardian",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getDashboardAction: (state, action) => {
      state.getDashboardData = action.payload;
      state.loading = false;
    },

    getAllWardsAction: (state, action) => {
      state.getAllWardsData = action.payload;
      state.loading = false;
    },
 
    viewWardDetailsAction: (state, action) => {
      state.viewWardDetailsData = action.payload;
      state.loading = false;
    }
  }
});
export default guardianSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardAction, getAllWardsAction, viewWardDetailsAction } = guardianSlice.actions;

export const getDashboard = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardApi(data);
    return dispatch(getDashboardAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getAllWards = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllWardsApi(data);
    return dispatch(getAllWardsAction(response?.data));
  } catch (e) {
    toast.error(e.response.message);
    return dispatch(hasError(e.response.message));
  }
};

export const viewWardDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewWardDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(viewWardDetailsAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

  
