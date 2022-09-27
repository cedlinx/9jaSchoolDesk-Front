import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateProfileLoading: false
};

export const loadingSlice = createSlice({
  name: "loading",

  initialState,

  reducers: {
    updateProfileAction: (state, action) => {
      state.updateProfileLoading = action.payload;
    }
  }
});
export default loadingSlice.reducer;

// Actions
const { updateProfileAction } = loadingSlice.actions;

export const updateProfileLoading = (data) => async (dispatch) => {
  return dispatch(updateProfileAction(data));
};


