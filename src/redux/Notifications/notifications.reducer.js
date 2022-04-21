import {
  ALL_NOTIFICATIONS_DETAILS_FAILURE,
  ALL_NOTIFICATIONS_DETAILS_SUCCESS,
  ALL_NOTIFICATIONS_DETAILS_REQUEST,

  NOTIFICATION_SUMMARY_REQUEST,
  NOTIFICATION_SUMMARY_SUCCESS,
  NOTIFICATION_SUMMARY_FAILURE,

  ALL_READ_NOTIFICATIONS_REQUEST,
  ALL_READ_NOTIFICATIONS_SUCCESS,
  ALL_READ_NOTIFICATIONS_FAILURE,

  ALL_UNREAD_NOTIFICATIONS_REQUEST,
  ALL_UNREAD_NOTIFICATIONS_SUCCESS,
  ALL_UNREAD_NOTIFICATIONS_FAILURE,

  MARK_ALL_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_FAILURE,
  MARK_ALL_AS_READ_REQUEST,

  MARK_ALL_AS_UNREAD_SUCCESS,
  MARK_ALL_AS_UNREAD_FAILURE,
  MARK_ALL_AS_UNREAD_REQUEST,

  MARK_SINGLE_AS_READ_FAILURE,
  MARK_SINGLE_AS_READ_REQUEST,
  MARK_SINGLE_AS_READ_SUCCESS,

  MARK_SINGLE_AS_UNREAD_SUCCESS,
  MARK_SINGLE_AS_UNREAD_FAILURE,
  MARK_SINGLE_AS_UNREAD_REQUEST, 

  DISABLE_NOTIFICATIONS_SUCCESS,
  DISABLE_NOTIFICATIONS_FAILURE,
  DISABLE_NOTIFICATIONS_REQUEST,

  ENABLE_NOTIFICATIONS_FAILURE,
  ENABLE_NOTIFICATIONS_REQUEST,
  ENABLE_NOTIFICATIONS_SUCCESS

} from "./notifications.types.js";

const initialState = {
  loading: false,

  data: {},

  allNotificationsDetailsSuccess: false,
  notificationSummarySuccess: false,
  allReadNotificationsSuccess: false,
  allUnreadNotificationsSuccess: false,
  markAllAsReadSuccess: false,
  markAllAsUnreadSuccess: false,
  markSingleAsReadSuccess: false,
  markSingleAsUnreadSuccess: false,
  disableNotificationsSuccess: false,
  enableNotificationsSuccess: false,

  errorMessage: "",
  error: false,
  
  allNotificationsDetailsData: [],
  notificationSummaryData: [],
  allReadNotificationsData: [],
  allUnreadNotificationsData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
	
  case ALL_NOTIFICATIONS_DETAILS_REQUEST:
    return {
      ...state,
      allNotificationsDetailsLoading: true
    };
  case ALL_NOTIFICATIONS_DETAILS_SUCCESS:
    return {
      ...state,
      allNotificationsDetailsLoading: false,
      allNotificationsDetailsSuccess: true,
      data: action.payload,
      allNotificationsDetailsData: action.payload
    };
  case ALL_NOTIFICATIONS_DETAILS_FAILURE:
    return {
      ...state,
      allNotificationsDetailsLoading: false,
      allNotificationsDetailsSuccess: false,
      error: true
    };

  case NOTIFICATION_SUMMARY_REQUEST:
    return {
      ...state,
      notificationSummaryLoading: true
    };
  case NOTIFICATION_SUMMARY_SUCCESS:
    return {
      ...state,
      notificationSummaryLoading: false,
      notificationSummarySuccess: true,
      data: action.payload,
      notificationSummaryData: action.payload
    };
  case NOTIFICATION_SUMMARY_FAILURE:
    return {
      ...state,
      notificationSummaryLoading: false,
      notificationSummarySuccess: false,
      error: true
    };

  case ALL_READ_NOTIFICATIONS_REQUEST:
    return {
      ...state,
      allReadNotificationsLoading: true
    };
  case ALL_READ_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      allReadNotificationsLoading: false,
      allReadNotificationsSuccess: true,
      data: action.payload,
      allReadNotificationsData: action.payload
    };
  case ALL_READ_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      allReadNotificationsLoading: false,
      allReadNotificationsSuccess: false,
      error: true
    };

  case ALL_UNREAD_NOTIFICATIONS_REQUEST:
    return {
      ...state,
      allUnreadNotificationsLoading: true
    };
  case ALL_UNREAD_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      allUnreadNotificationsLoading: false,
      allUnreadNotificationsSuccess: true,
      data: action.payload,
      allUnreadNotificationsData: action.payload
    };
  case ALL_UNREAD_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      allUnreadNotificationsLoading: false,
      allUnreadNotificationsSuccess: false,
      error: true
    };

  case MARK_ALL_AS_READ_REQUEST:
    return {
      ...state,
      markAllAsReadLoading: true
    };
  case MARK_ALL_AS_READ_SUCCESS:
    return {
      ...state,
      markAllAsReadLoading: false,
      markAllAsReadSuccess: true,
      data: action.payload
    };
  case MARK_ALL_AS_READ_FAILURE:
    return {
      ...state,
      markAllAsReadLoading: false,
      markAllAsReadSuccess: false,
      error: true
    };

  case MARK_ALL_AS_UNREAD_REQUEST:
    return {
      ...state,
      markAllAsUnreadLoading: true
    };
  case MARK_ALL_AS_UNREAD_SUCCESS:
    return {
      ...state,
      markAllAsUnreadLoading: false,
      markAllAsUnreadSuccess: true,
      data: action.payload
    };
  case MARK_ALL_AS_UNREAD_FAILURE:
    return {
      ...state,
      markAllAsUnreadLoading: false,
      markAllAsUnreadSuccess: false,
      error: true
    };

  case MARK_SINGLE_AS_READ_REQUEST:
    return {
      ...state,
      markSingleAsReadLoading: true
    };
  case MARK_SINGLE_AS_READ_SUCCESS:
    return {
      ...state,
      markSingleAsReadLoading: false,
      markSingleAsReadSuccess: true,
      data: action.payload
    };
  case MARK_SINGLE_AS_READ_FAILURE:
    return {
      ...state,
      markSingleAsReadLoading: false,
      markSingleAsReadSuccess: false,
      error: true
    };

  case MARK_SINGLE_AS_UNREAD_REQUEST:
    return {
      ...state,
      markSingleAsUnreadLoading: true
    };
  case MARK_SINGLE_AS_UNREAD_SUCCESS:
    return {
      ...state,
      markSingleAsUnreadLoading: false,
      markSingleAsUnreadSuccess: true,
      data: action.payload
    };
  case MARK_SINGLE_AS_UNREAD_FAILURE:
    return {
      ...state,
      markSingleAsUnreadLoading: false,
      markSingleAsUnreadSuccess: false,
      error: true
    };

  case DISABLE_NOTIFICATIONS_REQUEST:
    return {
      ...state,
      disableNotificationsLoading: true
    };
  case DISABLE_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      disableNotificationsLoading: false,
      disableNotificationsSuccess: true,
      data: action.payload
    };
  case DISABLE_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      disableNotificationsLoading: false,
      disableNotificationsSuccess: false,
      error: true
    };

  case ENABLE_NOTIFICATIONS_REQUEST:
    return {
      ...state,
      enableNotificationsLoading: true
    };
  case ENABLE_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      enableNotificationsLoading: false,
      enableNotificationsSuccess: true,
      data: action.payload
    };
  case ENABLE_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      enableNotificationsLoading: false,
      enableNotificationsSuccess: false,
      error: true
    };
				
  case "USER_INIT_STATE":
    return {
      ...state,
      loginSuccess: false,
      signUpSuccess: false,
      forgotPasswordSuccess: false,
      resetPasswordSuccess: false,
      emailVerificationSuccess: false,
      errorMessage: "",
      error: false
    };

  default:
    return {
      ...state
    };
  }
};

export default reducer;
