import { getDashboardApi, addInstitutionApi, getAllInstitutionsApi, modifyInstitutionApi, deleteInstitutionApi, switchInstitutionApi, addClassApi, getAllClassesApi, modifyClassApi, deleteClassApi, reAssignTeacherApi, enableClassSubscriptionApi, disableClassSubscriptionApi, addTeacherApi, getAllTeachersApi, modifyTeacherApi, deleteTeacherApi, addStudentApi, getAllStudentsApi, viewStudentRecordApi, modifyStudentApi, deleteStudentApi, enableStudentSubscriptionApi, disableStudentSubscriptionApi, getAllGuardiansApi, viewGuardianDetailsApi, inviteGuardianApi, assignGuardianToSingleStudentApi, assignGuardianToBulkStudentsApi, guardianStatusUpdateApi, getGuardianStatusApi, getNewGuardianSignupsApi, addKPIApi, deleteKPIApi, modifyKPIApi, getAllKPIsApi, viewKPIDetailsApi, viewKPIForClassApi, viewKPIForInstitutionApi, sendNotificationApi, updateProfileApi, addSubjectApi, getAllSubjectsApi, modifySubjectApi, viewSubjectDetailsApi, assignSubjectToTeacherApi, assignSubjectToStudentApi, getProfileApi } from "../api/proprietor";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatArrayList from "@/helpers/formatArrayList";
import { setToken } from "@/utils/auth";
import { setAuthToken } from "@/utils/setAuthToken";

const initialState = {
  loading: false,
  error: {},

  getDashboardData: {},
  addInstitutionData: {},
  modifyInstitutionData: {},
  deleteInstitutionData: {},
  switchInstitutionData: {},
  addClassData: {},
  modifyClassData: {},
  deleteClassData: {},
  getAllInstitutionsData: {},
  getAllClassesData: {},
  reAssignTeacherData: {},
  enableClassSubscriptionData: {},
  disableClassSubscriptionData: {},
  addTeacherData: {},
  getAllTeachersData: {},
  modifyTeacherData: {},
  deleteTeacherData: {},
  addStudentData: {},
  getAllStudentsData: {},
  viewStudentRecordData: {},
  modifyStudentData: {},
  deleteStudentData: {},
  enableStudentSubscriptionData: {},
  disableStudentSubscriptionData: {},
  getAllGuardiansData: {},
  viewGuardianDetailsData: {},
  inviteGuardianData: {},
  assignGuardianToSingleStudentData: {},
  assignGuardianToBulkStudentsData: {},
  guardianStatusUpdateData: {},
  getGuardianStatusData: {},
  getNewGuardianSignupsData: {},
  addKPIData: {},
  deleteKPIData: {},
  modifyKPIData: {},
  getAllKPIsData: {},
  viewKPIDetailsData: {},
  viewKPIForClassData: {},
  viewKPIForInstitutionData: {},
  sendNotificationData: {},
  updateProfileData: {},
  addSubjectData: {},
  getAllSubjectsData: {},
  modifySubjectData: {},
  viewSubjectDetailsData: {},
  assignSubjectToTeacherData: {},
  assignSubjectToStudentData: {},
  getProfileData: {}
};

export const proprietorSlice = createSlice({
  name: "proprietor",

  initialState,

  reducers: {

    startLoading: state => {
      console.log(state);
      state.loading = true;
    },

    hasError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getDashboardAction: (state, action) => {
      state.getDashboardData = action.payload;
      state.loading = false;
    },

    addInstitutionAction: (state, action) => {
      state.addInstitutionData = action.payload;
      state.loading = false;
    },

    modifyInstitutionAction: (state, action) => {
      state.modifyInstitutionData = action.payload;
      state.loading = false;
    },

    deleteInstitutionAction: (state, action) => {
      state.deleteInstitutionData = action.payload;
      state.loading = false;
    },

    switchInstitutionAction: (state, action) => {
      state.switchInstitutionData = action.payload;
      state.loading = false;
    },

    addClassAction: (state, action) => {
      state.addClassData = action.payload;
      state.loading = false;
    },

    getAllClassesAction: (state, action) => {
      state.getAllClassesData = action.payload;
      state.loading = false;
    },

    getAllInstitutionsAction: (state, action) => {
      state.getAllInstitutionsData = action.payload;
      state.loading = false;
    },

    modifyClassAction: (state, action) => {
      state.modifyClassData = action.payload;
      state.loading = false;
    },

    deleteClassAction: (state, action) => {
      state.deleteClassData = action.payload;
      state.loading = false;
    },

    reAssignTeacherAction: (state, action) => {
      state.reAssignTeacherData = action.payload;
      state.loading = false;
    },

    enableClassSubscriptionAction: (state, action) => {
      state.enableClassSubscriptionData = action.payload;
      state.loading = false;
    },

    disableClassSubscriptionAction: (state, action) => {
      state.disableClassSubscriptionData = action.payload;
      state.loading = false;
    },

    addTeacherAction: (state, action) => {
      state.addTeacherData = action.payload;
      state.loading = false;
    },

    getAllTeachersAction: (state, action) => {
      state.getAllTeachersData = action.payload;
      state.loading = false;
    },

    modifyTeacherAction: (state, action) => {
      state.modifyTeacherData = action.payload;
      state.loading = false;
    },

    deleteTeacherAction: (state, action) => {
      state.deleteTeacherData = action.payload;
      state.loading = false;
    },

    addStudentAction: (state, action) => {
      state.addStudentData = action.payload;
      state.loading = false;
    },

    getAllStudentsAction: (state, action) => {
      state.getAllStudentsData = action.payload;
      state.loading = false;
    },

    viewStudentRecordAction: (state, action) => {
      state.viewStudentRecordData = action.payload;
      state.loading = false;
    },

    modifyStudentAction: (state, action) => {
      state.modifyStudentData = action.payload;
      state.loading = false;
    },

    deleteStudentAction: (state, action) => {
      state.deleteStudentData = action.payload;
      state.loading = false;
    },

    enableStudentSubscriptionAction: (state, action) => {
      state.enableStudentSubscriptionData = action.payload;
      state.loading = false;
    },

    disableStudentSubscriptionAction: (state, action) => {
      state.disableStudentSubscriptionData = action.payload;
      state.loading = false;
    },

    getAllGuardiansAction: (state, action) => {
      state.getAllGuardiansData = action.payload;
      state.loading = false;
    },

    viewGuardianDetailsAction: (state, action) => {
      state.viewGuardianDetailsData = action.payload;
      state.loading = false;
    },

    inviteGuardianAction: (state, action) => {
      state.inviteGuardianData = action.payload;
      state.loading = false;
    },

    assignGuardianToSingleStudentAction: (state, action) => {
      state.assignGuardianToSingleStudentData = action.payload;
      state.loading = false;
    },

    assignGuardianToBulkStudentsAction: (state, action) => {
      state.assignGuardianToBulkStudentsData = action.payload;
      state.loading = false;
    },

    guardianStatusUpdateAction: (state, action) => {
      state.guardianStatusUpdateData = action.payload;
      state.loading = false;
    },

    getGuardianStatusAction: (state, action) => {
      state.getGuardianStatusData = action.payload;
      state.loading = false;
    },

    getNewGuardianSignupsAction: (state, action) => {
      state.getNewGuardianSignupsData = action.payload;
      state.loading = false;
    },

    addKPIAction: (state, action) => {
      state.addKPIData = action.payload;
      state.loading = false;
    },

    deleteKPIAction: (state, action) => {
      state.deleteKPIData = action.payload;
      state.loading = false;
    },

    modifyKPIAction: (state, action) => {
      state.modifyKPIData = action.payload;
      state.loading = false;
    },

    getAllKPIsAction: (state, action) => {
      state.getAllKPIsData = action.payload;
      state.loading = false;
    },

    viewKPIDetailsAction: (state, action) => {
      state.viewKPIDetailsData = action.payload;
      state.loading = false;
    },

    viewKPIForClassAction: (state, action) => {
      state.viewKPIForClassData = action.payload;
      state.loading = false;
    },

    viewKPIForInstitutionAction: (state, action) => {
      state.viewKPIForInstitutionData = action.payload;
      state.loading = false;
    },

    sendNotificationAction: (state, action) => {
      state.sendNotificationData = action.payload;
      state.loading = false;
    },

    getAllNotificationsAction: (state, action) => {
      state.getAllNotificationsData = action.payload;
      state.loading = false;
    },

    updateProfileAction: (state, action) => {
      state.updateProfileData = action.payload;
      state.loading = false;
    },

    addSubjectAction: (state, action) => {
      state.addSubjectData = action.payload;
      state.loading = false;
    },

    getAllSubjectsAction: (state, action) => {
      state.getAllSubjectsData = action.payload;
      state.loading = false;
    },

    modifySubjectAction: (state, action) => {
      state.modifySubjectData = action.payload;
      state.loading = false;
    },

    viewSubjectDetailsAction: (state, action) => {
      state.viewSubjectDetailsData = action.payload;
      state.loading = false;
    },

    assignSubjectToTeacherAction: (state, action) => {
      state.assignSubjectToTeacherData = action.payload;
      state.loading = false;
    },

    assignSubjectToStudentAction: (state, action) => {
      state.assignSubjectToStudentData = action.payload;
      state.loading = false;
    },

    getProfileAction: (state, action) => {
      state.getProfileData = action.payload;
      state.loading = false;
    }
  }
});
export default proprietorSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardAction, addInstitutionAction, getAllInstitutionsAction, modifyInstitutionAction, deleteInstitutionAction, switchInstitutionAction, addClassAction, getAllClassesAction, modifyClassAction, deleteClassAction, reAssignTeacherAction, enableClassSubscriptionAction, disableClassSubscriptionAction, addTeacherAction, getAllTeachersAction, modifyTeacherAction, deleteTeacherAction, addStudentAction, getAllStudentsAction, viewStudentRecordAction, modifyStudentAction, deleteStudentAction, enableStudentSubscriptionAction, disableStudentSubscriptionAction, getAllGuardiansAction, viewGuardianDetailsAction, inviteGuardianAction, assignGuardianToSingleStudentAction, assignGuardianToBulkStudentsAction, guardianStatusUpdateAction, getGuardianStatusAction, getNewGuardianSignupsAction, addKPIAction, deleteKPIAction, modifyKPIAction, getAllKPIsAction, viewKPIDetailsAction, viewKPIForClassAction, viewKPIForInstitutionAction, sendNotificationAction, updateProfileAction, addSubjectAction, getAllSubjectsAction, modifySubjectAction, viewSubjectDetailsAction, assignSubjectToTeacherAction, assignSubjectToStudentAction, getAllNotificationsAction, getProfileAction } = proprietorSlice.actions;



export const getDashboard = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardApi(data);
    localStorage.setItem("userData", JSON.stringify(response.data.proprietor));
    return dispatch(getDashboardAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const addInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addInstitutionApi(data);
    // let token = response?.data?.token;
    // setToken(token);
    return dispatch(addInstitutionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const switchInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await switchInstitutionApi(data);
    const token = response?.data?.user?.token;
    setToken(token);
    return dispatch(switchInstitutionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyClassApi(data);
    toast.success(response.data.message);
    return dispatch(modifyClassAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const addClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addClassApi(data);
    toast.success(response.data.message);
    return dispatch(addClassAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : Array.isArray(e.response.data.message) ? formatArrayList(e.response.data.message) : e.response.data.message ? e.response.data.message : e.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const reAssignTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await reAssignTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(reAssignTeacherAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllInstitutions = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllInstitutionsApi(data);
    return dispatch(getAllInstitutionsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : e?.response?.data?.message ? formatArrayList(e?.response?.data?.message) : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllClasses = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllClassesApi(data);
    return dispatch(getAllClassesAction(response?.data));
  } catch (e) {
    
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyInstitutionApi(data);
    toast.success(response.data.message);
    return dispatch(modifyInstitutionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteClassApi(data);
    toast.success(response.data.message);
    return dispatch(deleteClassAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteInstitutionApi(data);
    return dispatch(deleteInstitutionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};


export const enableClassSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await enableClassSubscriptionApi(data);
    return dispatch(enableClassSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const disableClassSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await disableClassSubscriptionApi(data);
    return dispatch(disableClassSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const addTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(addTeacherAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : Array.isArray(e.response.data.message) ? formatArrayList(e.response.data.message) : e.response.data.message ? e.response.data.message : e.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllTeachers = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllTeachersApi(data);
    return dispatch(getAllTeachersAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(modifyTeacherAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(deleteTeacherAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const addStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addStudentApi(data);
    toast.success(response.data.message);
    return dispatch(addStudentAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllStudents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllStudentsApi(data);
    return dispatch(getAllStudentsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewStudentRecord = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewStudentRecordApi(data);
    // toast.success(response.data.message);
    return dispatch(viewStudentRecordAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyStudentApi(data);
    toast.success(response.data.message);
    return dispatch(modifyStudentAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteStudentApi(data);
    toast.success(response.data.message);
    return dispatch(deleteStudentAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const enableStudentSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await enableStudentSubscriptionApi(data);
    return dispatch(enableStudentSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const disableStudentSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await disableStudentSubscriptionApi(data);
    return dispatch(disableStudentSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllGuardians = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllGuardiansApi(data);
    return dispatch(getAllGuardiansAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewGuardianDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewGuardianDetailsApi(data);
    return dispatch(viewGuardianDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const inviteGuardian = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await inviteGuardianApi(data);
    toast.success(response.data.message);
    return dispatch(inviteGuardianAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const assignGuardianToSingleStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignGuardianToSingleStudentApi(data);
    toast.success(response.data.message);
    return dispatch(assignGuardianToSingleStudentAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const assignGuardianToBulkStudents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignGuardianToBulkStudentsApi(data);
    toast.success(response.data.message);
    return dispatch(assignGuardianToBulkStudentsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const guardianStatusUpdate = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await guardianStatusUpdateApi(data);
    toast.success(response.data.message);
    return dispatch(guardianStatusUpdateAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getGuardianStatus = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getGuardianStatusApi(data);
    return dispatch(getGuardianStatusAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getNewGuardianSignups = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getNewGuardianSignupsApi(data);
    return dispatch(getNewGuardianSignupsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const addKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addKPIApi(data);
    toast.success(response.data.message);
    return dispatch(addKPIAction(response?.data));
  } catch (e) {
    
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllKPIs = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllKPIsApi(data);
    return dispatch(getAllKPIsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyKPIApi(data);
    toast.success(response.data.message);
    return dispatch(modifyKPIAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteKPIApi(data);
    toast.success(response.data.message);
    return dispatch(deleteKPIAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};


export const viewKPIDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewKPIDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(viewKPIDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewKPIForClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewKPIForClassApi(data);
    toast.success(response.data.message);
    return dispatch(viewKPIForClassAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewKPIForInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewKPIForInstitutionApi(data);
    toast.success(response.data.message);
    return dispatch(viewKPIForInstitutionAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const sendNotification = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await sendNotificationApi(data);
    toast.success(response.data.message);
    return dispatch(sendNotificationAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await updateProfileApi(data);
    response?.data?.proprietor && localStorage.setItem("userData", JSON.stringify(response?.data?.proprietor));
    toast.success(response.data.message);
    return dispatch(updateProfileAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const addSubject = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addSubjectApi(data);
    toast.success(response.data.message);
    return dispatch(addSubjectAction(response?.data));
  } catch (e) {
    
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllSubjects = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllSubjectsApi(data);
    return dispatch(getAllSubjectsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifySubject = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifySubjectApi(data);
    toast.success(response.data.message);
    return dispatch(modifySubjectAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewSubjectDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewSubjectDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(viewSubjectDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};


export const assignSubjectToTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignSubjectToTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(assignSubjectToTeacherAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const assignSubjectToStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignSubjectToStudentApi(data);
    toast.success(response.data.message);
    return dispatch(assignSubjectToStudentAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getProfile = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getProfileApi(data);
    toast.success(response.data.message);
    return dispatch(getProfileAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : e?.response?.data?.message ? formatArrayList(e?.response?.data?.message) : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};