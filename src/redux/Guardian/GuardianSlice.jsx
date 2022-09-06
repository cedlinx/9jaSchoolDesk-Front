import { getDashboardApi, getAllWardsApi, viewWardDetailsApi, viewTaskDetailsApi, getWardTasksApi, modifyWardProfileApi, modifyGuardianProfileApi, rateTeacherByGuardianApi, preferredChannelApi} from "../api/guardian";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatArrayList from "@/helpers/formatArrayList";


const initialState = {
  loading: false,
  error: {},
  
  getDashboardData: {},
  getAllWardsData: {},
  viewWardDetailsData: {},
  viewTaskDetailsData: {},
  getWardTasksData: {},
  modifyWardProfileData: {},
  modifyGuardianProfileData: {},
  rateTeacherByGuardianData: {},
  preferredChannelData: {}
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
    },

    viewTaskDetailsAction: (state, action) => {
      state.viewTaskDetailsData = action.payload;
      state.loading = false;
    },

    getWardTasksAction: (state, action) => {
      state.getWardTasksData = action.payload;
      state.loading = false;
    },

    modifyWardProfileAction: (state, action) => {
      state.modifyWardProfileData = action.payload;
      state.loading = false;
    },

    modifyGuardianProfileAction: (state, action) => {
      state.modifyGuardianProfileData = action.payload;
      state.loading = false;
    },

    rateTeacherByGuardianAction: (state, action) => {
      state.rateTeacherByGuardianData = action.payload;
      state.loading = false;
    },

    preferredChannelAction: (state, action) => {
      state.preferredChannelData = action.payload;
      state.loading = false;
    }
  }
});
export default guardianSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardAction, getAllWardsAction, viewWardDetailsAction, viewTaskDetailsAction, getWardTasksAction, modifyWardProfileAction, modifyGuardianProfileAction, rateTeacherByGuardianAction, preferredChannelAction } = guardianSlice.actions;


export const getDashboard = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardApi(data);
    // toast.success(response.data.message);
    return dispatch(getDashboardAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllWards = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllWardsApi(data);
    // toast.success(response.data.message);
    return dispatch(getAllWardsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewWardDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewWardDetailsApi(data);
    // toast.success(response.data.message);
    return dispatch(viewWardDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewTaskDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewTaskDetailsApi(data);
    // toast.success(response.data.message);
    return dispatch(viewTaskDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getWardTasks = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getWardTasksApi(data);
    // toast.success(response.data.message);
    return dispatch(getWardTasksAction(response?.data));
  } catch (e) {
    // toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : formatArrayList(e.response.data.message));
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyWardProfile = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyWardProfileApi(data);
    console.log(response);
    toast.success(response?.data?.message);
    return dispatch(modifyWardProfileAction(response?.data));
  } catch (e) {
    console.log(e);
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyGuardianProfile = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyGuardianProfileApi(data);
    toast.success(response.data.message);
    return dispatch(modifyGuardianProfileAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const rateTeacherByGuardian = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await rateTeacherByGuardianApi(data);
    toast.success(response.data.message);
    return dispatch(rateTeacherByGuardianAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const preferredChannel = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await preferredChannelApi(data);
    toast.success(response.data.message);
    return dispatch(preferredChannelAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};
  
