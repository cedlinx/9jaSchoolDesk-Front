import {
	SHOW_MODAL_START,
	SHOW_MODAL_SUCCESS,
	SHOW_MODAL_FAILURE

} from "./modalState.types";



const showModalStart = (payload) => ({
	type: SHOW_MODAL_START,
	payload
});
const showModalSuccess = (response) => ({
	type: SHOW_MODAL_SUCCESS,
	payload: response
});
const showModalFailure = (payload) => ({
	type: SHOW_MODAL_FAILURE,
	payload
});

export const showModal = (data) => async (dispatch) => {
	try {
		dispatch(showModalStart());
		return dispatch(showModalSuccess(data));
	}
	catch (e) {
		return dispatch(showModalFailure());
	}
};
