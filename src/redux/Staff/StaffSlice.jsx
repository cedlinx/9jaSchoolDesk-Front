import { uploadStaffApi, removeRoleApi, createStaffApi, addRoleApi, getStaffInfoApi, getActiveStaffApi  } from "../api/staff";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  uploadStaffData: {},
  removeRoleData: {},
  createStaffData: {},
  addRoleData: {},
  getStaffInfoData: {},
  getActiveStaffData: {}
};

export const staffSlice = createSlice({
  name: "staff",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    uploadStaffAction: (state, action) => {
      state.uploadStaffData = action.payload;
      state.loading = false;
    },

    createStaffAction: (state, action) => {
      state.createStaffData = action.payload;
      state.loading = false;
    },

    removeRoleAction: (state, action) => {
      state.removeRoleData = action.payload;
      state.loading = false;
    },
 
    addRoleAction: (state, action) => {
      state.addRoleData = action.payload;
      state.loading = false;
    },

    getStaffInfoAction: (state, action) => {
      state.getStaffInfoData = action.payload;
      state.loading = false;
    },

    getActiveStaffAction: (state, action) => {
      state.getActiveStaffData = action.payload;
      state.loading = false;
    }
  }
});
export default staffSlice.reducer;

// Actions
const { startLoading, hasError, uploadStaffAction, createStaffAction, removeRoleAction, addRoleAction, getStaffInfoAction, getActiveStaffAction} = staffSlice.actions;

export const uploadStaff = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await uploadStaffApi(data);
    console.log(response, "upload staff");
    toast.success(response.data.message);
    return dispatch(uploadStaffAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const createStaff = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await createStaffApi(data);
    console.log(response, "create staff");
    toast.success(response.data.message);
    return dispatch(createStaffAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const removeRole = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await removeRoleApi(data);
    console.log(response, "remove role");
    toast.success(response.data.message);
    return dispatch(removeRoleAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const addRole = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addRoleApi(data);
    console.log(response, "add role");
    toast.success(response.data.message);
    return dispatch(addRoleAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getStaffInfo = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getStaffInfoApi(data);
    console.log(response, "getStaffInfo");
    toast.success(response.data.message);
    return dispatch(getStaffInfoAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getActiveStaff = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getActiveStaffApi(data);
    console.log(response, "getActiveStaff");
    toast.success(response.data.message);
    return dispatch(getActiveStaffAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};



  
