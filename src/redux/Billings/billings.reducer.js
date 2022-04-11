import {
	GET_ALL_PLANS_REQUEST,
	GET_ALL_PLANS_FAILURE,
	GET_ALL_PLANS_SUCCESS,
	
	GET_CURRENT_PLAN_REQUEST,
	GET_CURRENT_PLAN_SUCCESS,
	GET_CURRENT_PLAN_FAILURE,

	UPGRADE_PLAN_REQUEST,
	UPGRADE_PLAN_SUCCESS,
	UPGRADE_PLAN_FAILURE,

	RENEW_PLAN_REQUEST,
	RENEW_PLAN_SUCCESS,
	RENEW_PLAN_FAILURE,

	GET_USER_PAYMENTS_REQUEST,
	GET_USER_PAYMENTS_SUCCESS,
	GET_USER_PAYMENTS_FAILURE,

	CREATE_PAYMENT_PLAN_REQUEST,
	CREATE_PAYMENT_PLAN_SUCCESS,
	CREATE_PAYMENT_PLAN_FAILURE,

	GET_ALL_PAYMENTS_REQUEST,
	GET_ALL_PAYMENTS_SUCCESS,
	GET_ALL_PAYMENTS_FAILURE,

	DELETE_PAYMENT_REQUEST,
	DELETE_PAYMENT_SUCCESS,
	DELETE_PAYMENT_FAILURE

} from "./billings.types.js";

const initialState = {

	loading: false,
	errorMessage: "",
	error: false,

	allPlansData: [],
	currentPlanData: [],
	renewPlanData: [],
	upgradePlanData: [],
	getUserPaymentsData: [],
	createPaymentPlanData: [],
	allPaymentsData: [],
	deletePaymentData: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_PLANS_REQUEST:
		return {
			...state,
			loading: true
		};
	case GET_ALL_PLANS_SUCCESS:
		return {
			...state,
			loading: false,
			allPlansData: action.payload.data
		};
	case GET_ALL_PLANS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case GET_CURRENT_PLAN_REQUEST:
		return {
			...state,
			loading: true
		};
	case GET_CURRENT_PLAN_SUCCESS:
		return {
			...state,
			loading: false,
			currentPlanData: action.payload.data
		};
	case GET_CURRENT_PLAN_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case UPGRADE_PLAN_REQUEST:
		return {
			...state,
			loading: true
		};
	case UPGRADE_PLAN_SUCCESS:
		return {
			...state,
			loading: false,
			upgradePlanData: action.payload.data
		};
	case UPGRADE_PLAN_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case RENEW_PLAN_REQUEST:
		return {
			...state,
			loading: true
		};
	case RENEW_PLAN_SUCCESS:
		return {
			...state,
			loading: false,
			renewPlanData: action.payload.data
		};
	case RENEW_PLAN_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case GET_USER_PAYMENTS_REQUEST:
		return {
			...state,
			loading: true
		};
	case GET_USER_PAYMENTS_SUCCESS:
		return {
			...state,
			loading: false,
			getUserPaymentsData: action.payload.data
		};
	case GET_USER_PAYMENTS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case CREATE_PAYMENT_PLAN_REQUEST:
		return {
			...state,
			loading: true
		};
	case CREATE_PAYMENT_PLAN_SUCCESS:
		return {
			...state,
			loading: false,
			createPaymentPlanData: action.payload.data
		};
	case CREATE_PAYMENT_PLAN_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};


	case GET_ALL_PAYMENTS_REQUEST:
		return {
			...state,
			loading: true
		};
	case GET_ALL_PAYMENTS_SUCCESS:
		return {
			...state,
			loading: false,
			allPaymentsData: action.payload.data
		};
	case GET_ALL_PAYMENTS_FAILURE:
		return {
			...state,
			loading: false,
			error: true
		};

	case DELETE_PAYMENT_REQUEST:
		return {
			...state,
			loading: true
		};
	case DELETE_PAYMENT_SUCCESS:
		return {
			...state,
			loading: false,
			deletePaymentData: action.payload.data
		};
	case DELETE_PAYMENT_FAILURE:
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
