import { getDashboardApi, addInstitutionApi, getAllInstitutionsApi, modifyInstitutionApi, deleteInstitutionApi, switchInstitutionApi, addClassApi, getAllClassesApi, modifyClassApi, deleteClassApi, reAssignTeacherApi, enableClassSubscriptionApi, disableClassSubscriptionApi, addTeacherApi, getAllTeachersApi, modifyTeacherApi, deleteTeacherApi, addStudentApi, getAllStudentsApi, modifyStudentApi, deleteStudentApi, enableStudentSubscriptionApi, disableStudentSubscriptionApi, getAllGuardiansApi, viewGuardianDetailsApi, inviteGuardianApi, assignGuardianToSingleStudentApi, assignGuardianToBulkStudentsApi, addKPIApi, deleteKPIApi, modifyKPIApi, getAllKPIsApi, viewKPIDetailsApi, viewKPIForClassApi, viewKPIForInstitutionApi   } from "../api/proprietor";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatArrayList from "@/helpers/formatArrayList";


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
  modifyStudentData: {},
  deleteStudentData: {},
  enableStudentSubscriptionData: {},
  disableStudentSubscriptionData: {},
  getAllGuardiansData: {},
  viewGuardianDetailsData: {},
  inviteGuardianData: {},
  assignGuardianToSingleStudentData: {},
  assignGuardianToBulkStudentsData: {},
  addKPIData: {},
  deleteKPIData: {},
  modifyKPIData: {},
  getAllKPIsData: {},
  viewKPIDetailsData: {},
  viewKPIForClassData: {},
  viewKPIForInstitutionData: {}

};

export const proprietorSlice = createSlice({
  name: "proprietor",

  initialState,

  reducers: {

    startLoading: state => {
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
    }

  }
});
export default proprietorSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardAction, addInstitutionAction, getAllInstitutionsAction, modifyInstitutionAction, deleteInstitutionAction, switchInstitutionAction, addClassAction, getAllClassesAction, modifyClassAction, deleteClassAction, reAssignTeacherAction, enableClassSubscriptionAction, disableClassSubscriptionAction, addTeacherAction, getAllTeachersAction, modifyTeacherAction, deleteTeacherAction, addStudentAction, getAllStudentsAction, modifyStudentAction, deleteStudentAction, enableStudentSubscriptionAction, disableStudentSubscriptionAction, getAllGuardiansAction, viewGuardianDetailsAction, inviteGuardianAction, assignGuardianToSingleStudentAction, assignGuardianToBulkStudentsAction, addKPIAction, deleteKPIAction, modifyKPIAction, getAllKPIsAction, viewKPIDetailsAction, viewKPIForClassAction, viewKPIForInstitutionAction } = proprietorSlice.actions; 



export const getDashboard = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardApi(data);
    return dispatch(getDashboardAction(response?.data));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const addInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addInstitutionApi(data);
    return dispatch(addInstitutionAction(response?.data));
  } catch (e) {
    toast.error(e.response.message);
    return dispatch(hasError(e.response.message));
  }
};

export const switchInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await switchInstitutionApi(data);
    return dispatch(switchInstitutionAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const modifyClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyClassApi(data);
    toast.success(response.data.message);
    return dispatch(modifyClassAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const addClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addClassApi(data);
    toast.success(response.data.message);
    return dispatch(addClassAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const reAssignTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await reAssignTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(reAssignTeacherAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const getAllInstitutions = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllInstitutionsApi(data);
    toast.success(response.data.message);
    return dispatch(getAllInstitutionsAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const getAllClasses = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllClassesApi(data);
    toast.success(response.data.message);
    return dispatch(getAllClassesAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const modifyInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyInstitutionApi(data);
    toast.success(response.data.message);
    return dispatch(modifyInstitutionAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const deleteClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteClassApi(data);
    toast.success(response.data.message);
    return dispatch(deleteClassAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const deleteInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteInstitutionApi(data);
    return dispatch(deleteInstitutionAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};


export const enableClassSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await enableClassSubscriptionApi(data);
    return dispatch(enableClassSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const disableClassSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await disableClassSubscriptionApi(data);
    return dispatch(disableClassSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(e.response.message);
    return dispatch(hasError(e.response.message));
  }
};

export const addTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addTeacherApi(data);
    return dispatch(addTeacherAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const getAllTeachers = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllTeachersApi(data);
    toast.success(response.data.message);
    return dispatch(getAllTeachersAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const modifyTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(modifyTeacherAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const deleteTeacher = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteTeacherApi(data);
    toast.success(response.data.message);
    return dispatch(deleteTeacherAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const addStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addStudentApi(data);
    toast.success(response.data.message);
    return dispatch(addStudentAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const getAllStudents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllStudentsApi(data);
    toast.success(response.data.message);
    return dispatch(getAllStudentsAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const modifyStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyStudentApi(data);
    toast.success(response.data.message);
    return dispatch(modifyStudentAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const deleteStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteStudentApi(data);
    toast.success(response.data.message);
    return dispatch(deleteStudentAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const enableStudentSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await enableStudentSubscriptionApi(data);
    return dispatch(enableStudentSubscriptionAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const disableStudentSubscription = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await disableStudentSubscriptionApi(data);
    return dispatch(disableStudentSubscriptionAction(response?.data));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const getAllGuardians = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllGuardiansApi(data);
    return dispatch(getAllGuardiansAction(response?.data));
  } catch (e) {
    toast.error(e.response.message);
    return dispatch(hasError(e.response.message));
  }
};

export const viewGuardianDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewGuardianDetailsApi(data);
    return dispatch(viewGuardianDetailsAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const inviteGuardian = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await inviteGuardianApi(data);
    toast.success(response.data.message);
    return dispatch(inviteGuardianAction(response?.data));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const assignGuardianToSingleStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignGuardianToSingleStudentApi(data);
    toast.success(response.data.message);
    return dispatch(assignGuardianToSingleStudentAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const assignGuardianToBulkStudents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignGuardianToBulkStudentsApi(data);
    toast.success(response.data.message);
    return dispatch(assignGuardianToBulkStudentsAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const addKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addKPIApi(data);
    toast.success(response.data.message);
    return dispatch(addKPIAction(response?.data));
  } catch (e) {
    console.log(e.response);
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const getAllKPIs = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllKPIsApi(data);
    return dispatch(getAllKPIsAction(response?.data));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const modifyKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    console.log(data);
    const response = await modifyKPIApi(data);
    toast.success(response.data.message);
    return dispatch(modifyKPIAction(response?.data));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const deleteKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteKPIApi(data);
    toast.success(response.data.message);
    return dispatch(deleteKPIAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};


export const viewKPIDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewKPIDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(viewKPIDetailsAction(response));
  } catch (e) {
    toast.error(formatArrayList(e.response.data.errors ? e.response.data.errors : e.response.data.message ));
    return dispatch(hasError(e.response.data));
  }
};

export const viewKPIForClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewKPIForClassApi(data);
    toast.success(response.data.message);
    return dispatch(viewKPIForClassAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};

export const viewKPIForInstitution = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewKPIForInstitutionApi(data);
    toast.success(response.data.message);
    return dispatch(viewKPIForInstitutionAction(response));
  } catch (e) {
    toast.warn(e.message);
    return dispatch(hasError(e.message));
  }
};
