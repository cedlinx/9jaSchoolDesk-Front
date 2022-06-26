import {
	
  SHOW_MODAL_START,
  SHOW_MODAL_SUCCESS,
  SHOW_MODAL_FAILURE
	
} from "./modalState.types.js";

const initialState = {

  loading: false,
  showModalSuccess: false,
  action: "",
  type: "",
  modalData: {},

  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case SHOW_MODAL_START:
    return {
      ...state,
      loading: true
    };
  case SHOW_MODAL_SUCCESS:
    return {
      ...state,
      loading: false,
      showModalSuccess: action.payload === "show" ? true : false,
      action: action.payload.action,
      type: action.payload.type,
      modalData: action.payload.modalData
    };
  case SHOW_MODAL_FAILURE:
    return {
      ...state,
      loading: false,
      showModalSuccess: false,
      error: true
    };

  default:
    return {
      ...state
    };
  }
};

export default reducer;





