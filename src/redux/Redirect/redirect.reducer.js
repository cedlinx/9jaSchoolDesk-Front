import {
  REDIRECT_START,
  REDIRECT_SUCCESS ,
  REDIRECT_ERROR 
} from "./redirect.types.js";

const initialState = {
  redirectLoading : false,
  redirectSuccess : false,
  path: ""
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REDIRECT_START:
    return {
      ...state,
      redirectLoading: true
    };
  case REDIRECT_SUCCESS:
    return {
      ...state,
      redirectLoading: false,
      redirectSuccess: true,
      path: action.payload
    };
  case REDIRECT_ERROR:
    return {
      ...state,
      redirectLoading: false,
      redirectSuccess: false,
      error: true
    };

  default:
    return {
      ...state
    };
  }
};

export default reducer;