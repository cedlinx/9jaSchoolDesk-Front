import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: {},

  action: "",
  type: "",
  modalData: ""
};

export const modalSlice = createSlice({
  name: "modal",

  initialState,

  reducers: {

    startLoading: state => {
      state.loading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    showModalAction: (state, action) => {
      state.action = action.payload.action;
      state.type = action.payload.type;
      state.modalData = action.payload.modalData;
      state.loading = false;
    }

  }
});
export default modalSlice.reducer;

// Actions
const { startLoading, hasError, showModalAction } = modalSlice.actions;

export const showModal = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    return dispatch(showModalAction(data));
  }
  catch (e) {
    return dispatch(hasError(e.message));
  }
};


