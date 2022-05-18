import {
  LOGIN_USER_START,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,

  LOGIN_WITH_OTP_START,
  LOGIN_WITH_OTP_ERROR,
  LOGIN_WITH_OTP_SUCCESS,

  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,

  EMAIL_VERIFICATION_START,
  EMAIL_VERIFICATION_FAILURE,
  EMAIL_VERIFICATION_SUCCESS,

  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,

  RESET_PASSWORD_START,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,

  LOGOUT_START,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,

  MODIFY_PROFILE_INFO_FAILURE,
  MODIFY_PROFILE_INFO_SUCCESS,
  MODIFY_PROFILE_INFO_START,

  GET_USER_INFO_START,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,

  MODIFY_WEBSITE_INFO_FAILURE,
  MODIFY_WEBSITE_INFO_SUCCESS,
  MODIFY_WEBSITE_INFO_START,

  GET_WEBSITE_INFO_START,
  GET_WEBSITE_INFO_SUCCESS,
  GET_WEBSITE_INFO_FAILURE,

  REQUEST_VERIFICATION_LINK_FAILURE,
  REQUEST_VERIFICATION_LINK_SUCCESS,
  REQUEST_VERIFICATION_LINK_START,
	
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_START,

  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_START,

  GET_ALL_ADMIN_USERS_FAILURE,
  GET_ALL_ADMIN_USERS_SUCCESS,
  GET_ALL_ADMIN_USERS_START,

  GET_USER_SOCIAL_FAILURE,
  GET_USER_SOCIAL_SUCCESS,
  GET_USER_SOCIAL_START,

  ADD_SOCIAL_ACCOUNT_FAILURE,
  ADD_SOCIAL_ACCOUNT_SUCCESS,
  ADD_SOCIAL_ACCOUNT_START,

  MODIFY_SOCIAL_ACCOUNT_FAILURE,
  MODIFY_SOCIAL_ACCOUNT_SUCCESS,
  MODIFY_SOCIAL_ACCOUNT_START,

  DELETE_SOCIAL_ACCOUNT_FAILURE,
  DELETE_SOCIAL_ACCOUNT_SUCCESS,
  DELETE_SOCIAL_ACCOUNT_START,

  LINK_SOCIAL_ACCOUNT_FAILURE,
  LINK_SOCIAL_ACCOUNT_SUCCESS,
  LINK_SOCIAL_ACCOUNT_START,

  UNLINK_SOCIAL_ACCOUNT_FAILURE,
  UNLINK_SOCIAL_ACCOUNT_SUCCESS,
  UNLINK_SOCIAL_ACCOUNT_START

} from "./user.types.js";

const initialState = {
  loading: false,
  errorMessage: "",
  error: false,
	
  data: {},
  loginData: false,
  loginWithOtpData:{},
  signUpData: false,
  emailVerificationData: false,
  forgotPasswordData: {},
  resetPasswordData: {},
  logoutData: false,
  modifiedProfileInfoData: false,
  userDetails: {},
  modifiedInfoData: {},
  getUserInfoData: {},
  requestVerificationLinkData: {},
  deleteUserData: {},
  getAllUsersData: {},
  getAllAdminUsersData: {},
  getUserSocialData: {},
  addSocialAccountData: {},
  modifySocialAccountData: {},
  deleteSocialAccountData: {},
  linkSocialAccountData: {},
  unlinkSocialAccountData: {},
  getWebsiteInfoData: {},
  modifyWebsiteInfoData: {},
  modifyProfileInfoData: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_USER_START:
    return {
      ...state,
      loading: true
    };
  case LOGIN_USER_SUCCESS:
    // localStorage.setItem("loginData", JSON.stringify(action.payload.data));
    return {
      ...state,
      loading: false,
      loginData: action.payload
    };
  case LOGIN_USER_ERROR:
    return {
      ...state,
      loading: false,
      error: true
    };

  case LOGIN_WITH_OTP_START:
    return {
      ...state,
      loading: true
    };
  case LOGIN_WITH_OTP_SUCCESS:
    localStorage.setItem("loginData", JSON.stringify(action.payload.data));
    return {
      ...state,
      loading: false,
      loginWithOtpData: action.payload
    };
  case LOGIN_WITH_OTP_ERROR:
    return {
      ...state,
      loading: false,
      error: true
    };

  case SIGNUP_REQUEST:
    return {
      ...state,
      loading: true
    };
  case SIGNUP_SUCCESS:
    return {
      ...state,
      loading: false,
      signUpData: action.payload
    };
  case SIGNUP_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case EMAIL_VERIFICATION_START:
    return {
      ...state,
      loading: true
    };
  case EMAIL_VERIFICATION_SUCCESS:
    return {
      ...state,
      loading: false,
      emailVerificationData: action.payload
    };
  case EMAIL_VERIFICATION_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case FORGOT_PASSWORD_START:
    return {
      ...state,
      loading: true
    };
  case FORGOT_PASSWORD_SUCCESS:
    return {
      ...state,
      loading: false,
      forgotPasswordData: action.payload
    };
  case FORGOT_PASSWORD_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case RESET_PASSWORD_START:
    return {
      ...state,
      loading: true
    };
  case RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      loading: false,
      resetPasswordData: action.payload
    };
  case RESET_PASSWORD_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case LOGOUT_START:
    return {
      ...state,
      loading: true
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      loading: false,
      logoutSuccess: true,
      loginSuccess: false,
      logoutData: action.payload
    };
  case LOGOUT_FAILURE:
    return {
      ...state,
      loading: false,
      logoutSuccess: false,
      error: true
    };

  case MODIFY_PROFILE_INFO_START:
    return {
      ...state,
      loading: true
    };
  case MODIFY_PROFILE_INFO_SUCCESS:
    return {
      ...state,
      loading: false,
      modifyProfileInfoData: action.payload
    };
  case MODIFY_PROFILE_INFO_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case GET_USER_INFO_START:
    return {
      ...state,
      loading: true
    };
  case GET_USER_INFO_SUCCESS:
    localStorage.setItem("userDetails", JSON.stringify(action.payload.data));
    return {
      ...state,
      loading: false,
      getUserInfoData: action.payload
    };
  case GET_USER_INFO_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case MODIFY_WEBSITE_INFO_START:
    return {
      ...state,
      loading: true
    };
  case MODIFY_WEBSITE_INFO_SUCCESS:
    return {
      ...state,
      loading: false,
      modifyWebsiteInfoData: action.payload
    };
  case MODIFY_WEBSITE_INFO_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case GET_WEBSITE_INFO_START:
    return {
      ...state,
      loading: true
    };
  case GET_WEBSITE_INFO_SUCCESS:
    localStorage.setItem("websiteDetails", JSON.stringify(action.payload.data));
    return {
      ...state,
      loading: false,
      getWebsiteInfoData: action.payload
    };
  case GET_WEBSITE_INFO_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case REQUEST_VERIFICATION_LINK_START:
    return {
      ...state,
      loading: true
    };
  case REQUEST_VERIFICATION_LINK_SUCCESS:
    return {
      ...state,
      loading: false,
      requestVerificationLinkData: action.payload
    };
  case REQUEST_VERIFICATION_LINK_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case DELETE_USER_START:
    return {
      ...state,
      loading: true
    };
  case DELETE_USER_SUCCESS:
    return {
      ...state,
      loading: false,
      deleteUserData: action.payload
    };
  case DELETE_USER_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case GET_ALL_USERS_START:
    return {
      ...state,
      loading: true
    };
  case GET_ALL_USERS_SUCCESS:
    return {
      ...state,
      getAllUsersData: action.payload,
      loading: false
    };
  case GET_ALL_USERS_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case GET_ALL_ADMIN_USERS_START:
    return {
      ...state,
      loading: true
    };
  case GET_ALL_ADMIN_USERS_SUCCESS:
    return {
      ...state,
      getAllAdminUsersData: action.payload,
      loading: false
    };
  case GET_ALL_ADMIN_USERS_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case GET_USER_SOCIAL_START:
    return {
      ...state,
      loading: true
    };
  case GET_USER_SOCIAL_SUCCESS:
    return {
      ...state,
      loading: false,
      getUserSocialData: action.payload
    };
  case GET_USER_SOCIAL_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case ADD_SOCIAL_ACCOUNT_START:
    return {
      ...state,
      loading: true
    };
  case ADD_SOCIAL_ACCOUNT_SUCCESS:
    return {
      ...state,
      loading: false,
      addSocialAccountData: action.payload
    };
  case ADD_SOCIAL_ACCOUNT_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case MODIFY_SOCIAL_ACCOUNT_START:
    return {
      ...state,
      loading: true
    };
  case MODIFY_SOCIAL_ACCOUNT_SUCCESS:
    return {
      ...state,
      loading: false,
      modifySocialAccountData: action.payload
    };
  case MODIFY_SOCIAL_ACCOUNT_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case DELETE_SOCIAL_ACCOUNT_START:
    return {
      ...state,
      loading: true
    };
  case DELETE_SOCIAL_ACCOUNT_SUCCESS:
    return {
      ...state,
      loading: false,
      deleteSocialAccountData: action.payload
    };
  case DELETE_SOCIAL_ACCOUNT_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case LINK_SOCIAL_ACCOUNT_START:
    return {
      ...state,
      loading: true
    };
  case LINK_SOCIAL_ACCOUNT_SUCCESS:
    return {
      ...state,
      loading: false,
      linkSocialAccountData: action.payload
    };
  case LINK_SOCIAL_ACCOUNT_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case UNLINK_SOCIAL_ACCOUNT_START:
    return {
      ...state,
      loading: true
    };
  case UNLINK_SOCIAL_ACCOUNT_SUCCESS:
    return {
      ...state,
      loading: false,
      unlinkSocialAccountData: action.payload
    };
  case UNLINK_SOCIAL_ACCOUNT_FAILURE:
    return {
      ...state,
      loading: false,
      error: true
    };

  case "USER_INIT_STATE":
    return {
      ...state,
      loading: false,
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
