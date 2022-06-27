import { declineAgentApi, approveAgentApi, activateAgentApi, pendingAgentsApi, approvedAgentsApi, activeAgentsApi, getDevicesApi, addDeviceApi  } from "../api/agents";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: {},
  
  declineAgentData: {},
  approveAgentData: {},
  activateAgentData: {},
  pendingAgentsData: {},
  approvedAgentsData: {},
  activeAgentsData: {},
  getDevicesData: {},
  addDeviceData: {}
};

export const agentsSlice = createSlice({
  name: "agents",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    declineAgentAction: (state, action) => {
      state.declineAgentData = action.payload;
      state.loading = false;
    },

    activateAgentAction: (state, action) => {
      state.activateAgentData = action.payload;
      state.loading = false;
    },

    approveAgentAction: (state, action) => {
      state.approveAgentData = action.payload;
      state.loading = false;
    },
 
    pendingAgentsAction: (state, action) => {
      state.pendingAgentsData = action.payload;
      state.loading = false;
    },

    approvedAgentsAction: (state, action) => {
      state.approvedAgentsData = action.payload;
      state.loading = false;
    },

    activeAgentsAction: (state, action) => {
      state.activeAgentsData = action.payload;
      state.loading = false;
    },

    getDevicesAction: (state, action) => {
      state.getDevicesData = action.payload;
      state.loading = false;
    },

    addDeviceAction: (state, action) => {
      state.addDeviceData = action.payload;
      state.loading = false;
    }
  }
});
export default agentsSlice.reducer;

// Actions
const { startLoading, hasError, declineAgentAction, activateAgentAction, approveAgentAction, pendingAgentsAction, approvedAgentsAction, activeAgentsAction, getDevicesAction, addDeviceAction } = agentsSlice.actions;

export const declineAgent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await declineAgentApi(data);
    console.log(response, "decline agent");
    toast.success(response.data.message);
    return dispatch(declineAgentAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const activateAgent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await activateAgentApi(data);
    console.log(response, "activate agent");
    toast.success(response.data.message);
    return dispatch(activateAgentAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const approveAgent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await approveAgentApi(data);
    console.log(response, "approve agent");
    toast.success(response.data.message);
    return dispatch(approveAgentAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const pendingAgents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await pendingAgentsApi(data);
    console.log(response, "pending agent");
    // toast.success(response.data.message);
    return dispatch(pendingAgentsAction(response?.data));
  } catch (e) {
    console.log(e.response);
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const approvedAgents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await approvedAgentsApi(data);
    console.log(response, "approvedAgents");
    toast.success(response.data.message);
    return dispatch(approvedAgentsAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const activeAgents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await activeAgentsApi(data);
    console.log(response, "activeAgents");
    toast.success(response.data.message);
    return dispatch(activeAgentsAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};

export const getDevices = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDevicesApi(data);
    console.log(response, "getDevices");
    toast.success(response.data.message);
    return dispatch(getDevicesAction(response?.data));
  } catch (e) {
    console.log(e.response);
    toast.error(e.response.message);
    return dispatch(hasError(e.message));
  }
};


export const addDevice = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addDeviceApi(data);
    console.log(response, "addDevice");
    toast.success(response.data.message);
    return dispatch(addDeviceAction(response?.data));
  } catch (e) {
    toast.error(e.message);
    return dispatch(hasError(e.message));
  }
};




  
