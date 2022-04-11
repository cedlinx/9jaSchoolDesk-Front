import {
	ENABLE_2FA_FAILURE,
	ENABLE_2FA_SUCCESS,
	ENABLE_2FA_REQUEST,

	DISABLE_2FA_REQUEST,
	DISABLE_2FA_SUCCESS,
	DISABLE_2FA_FAILURE,

	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_SUCCESS,
	CHANGE_PASSWORD_FAILURE

} from "./security.types.js";

const initialState = {
	loading: false,
	data: {},
	errorMessage: "",
	error: false,
  
	enable2faData: [],
	disable2faData: [],
	changePasswordData: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	
	case ENABLE_2FA_REQUEST:
		return {
			...state,
			loading: true
		};
	case ENABLE_2FA_SUCCESS:
		return {
			...state,
			loading: false,
			enable2faData: action.payload
		};
	case ENABLE_2FA_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case DISABLE_2FA_REQUEST:
		return {
			...state,
			loading: true
		};
	case DISABLE_2FA_SUCCESS:
		return {
			...state,
			loading: false,
			disable2faData: action.payload
		};
	case DISABLE_2FA_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case CHANGE_PASSWORD_REQUEST:
		return {
			...state,
			loading: true
		};
	case CHANGE_PASSWORD_SUCCESS:
		return {
			...state,
			loading: false,
			changePasswordData: action.payload
		};
	case CHANGE_PASSWORD_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	default:
		return {
			...state
		};
	}
};

export default reducer;
