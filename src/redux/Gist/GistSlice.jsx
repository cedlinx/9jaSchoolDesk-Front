import { createGistApi, viewGistDetailsApi, getAllGistsApi, addCommentApi, getGistConversationsApi  } from "../api/gist";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatArrayList from "@/helpers/formatArrayList";

const initialState = {
  loading: false,
  error: {},
  
  createGistData: {},
  viewGistDetailsData: {},
  getAllGistsData: {},
  addCommentData: {},
  getGistConversationsData: {}
};

export const gistSlice = createSlice({
  name: "gist",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      console.log(state);
      console.log(action);
      state.error = action.payload;
      state.loading = false;
    },

    createGistAction: (state, action) => {
      state.createGistData = action.payload;
      state.loading = false;
    },

    viewGistDetailsAction: (state, action) => {
      state.viewGistDetailsData = action.payload;
      state.loading = false;
    },

    getAllGistsAction: (state, action) => {
      state.getAllGistsData = action.payload;
      state.loading = false;
    },

    addCommentAction: (state, action) => {
      state.addCommentData = action.payload;
      state.loading = false;
    },

    getGistConversationsAction: (state, action) => {
      state.getGistConversationsData = action.payload;
      state.loading = false;
    }
  }
});
export default gistSlice.reducer;

// Actions
const { startLoading, hasError, createGistAction, viewGistDetailsAction, getAllGistsAction, addCommentAction, getGistConversationsAction} = gistSlice.actions;

export const createGist = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await createGistApi(data);
    toast.success(response.data.message);
    return dispatch(createGistAction(response?.data));
  } catch (e) {
    console.log(e.response);
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : formatArrayList(e.response.data.message));
    return dispatch(hasError(e.response.data));
  }
};

export const viewGistDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewGistDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(viewGistDetailsAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const getAllGists = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllGistsApi(data);
    // toast.success(response.data.message);
    return dispatch(getAllGistsAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const addComment = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addCommentApi(data);
    toast.success(response.data.message);
    return dispatch(addCommentAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const getGistConversations = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getGistConversationsApi(data);
    // toast.success(response.data.message);
    return dispatch(getGistConversationsAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};