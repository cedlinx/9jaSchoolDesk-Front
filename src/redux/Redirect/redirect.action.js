import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

import {
  REDIRECT_START,
  REDIRECT_SUCCESS ,
  REDIRECT_ERROR 
} from "./redirect.types.js";

const redirectStart = (payload) => ({
  type: REDIRECT_START,
  payload
});
const redirectSuccess = (response) => ({
  type: REDIRECT_SUCCESS,
  payload: response
});
const redirectError = (payload) => ({
  type: REDIRECT_ERROR,
  payload
});

export const redirect = (data) => async (dispatch) => {
  try {
    dispatch(redirectStart());
    // toast.success(response.data.message);
    return dispatch(redirectSuccess(data));
  } catch (e) {
    toast.warn(e.response.data.message);
    return dispatch(redirectError(e.response.data.message));
  }
};