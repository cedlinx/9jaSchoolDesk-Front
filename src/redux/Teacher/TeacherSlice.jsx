import { getDashboardApi, addKPIApi, deleteKPIApi, modifyKPIApi, getAllKPIsApi, viewKPIDetailsApi, viewKPIForClassApi, scoreStudentKPIApi, incrementScoreKPIApi, decrementScoreKPIApi, getStudentScoreKPIApi, sendNotificationApi, addTaskApi, modifyTaskApi, viewTaskDetailsApi, getAllTasksApi, deleteTaskApi, assignTaskApi, assessTaskApi, submitTaskApi, saveAttendanceApi, takeAttendanceApi, addStudentApi, getAllStudentsApi, viewStudentRecordApi, modifyStudentApi, deleteStudentApi, updateProfileApi, getTeacherDetailsApi, switchClassApi, getClassDetailsApi, getAllGuardiansApi, enableAndDisableTaskApi, getStudentsAssignedToTaskApi, createLessonApi, modifyLessonApi, viewLessonApi, getClassLessonsApi, getAllLessonsApi, deleteLessonApi} from "../api/teacher";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatArrayList from "@/helpers/formatArrayList";


const initialState = {
  loading: false,
  error: {},

  getDashboardData: {},
  addKPIData: {},
  deleteKPIData: {},
  modifyKPIData: {},
  getAllKPIsData: {},
  viewKPIDetailsData: {},
  viewKPIForClassData: {},
  scoreStudentKPIData: {},
  incrementScoreKPIData: {},
  decrementScoreKPIData: {},
  getStudentScoreKPIData: {},
  sendNotificationData: {},
  addTaskData: {},
  modifyTaskData: {},
  viewTaskDetailsData: {},
  getAllTasksData: {},
  deleteTaskData: {},
  assignTaskData: {},
  assessTaskData: {},
  submitTaskData: {},
  saveAttendanceData: {},
  takeAttendanceData: {},
  addStudentData: {},
  getAllStudentsData: {},
  viewStudentRecordData: {},
  modifyStudentData: {},
  deleteStudentData: {},
  updateProfileData: {},
  getTeacherDetailsData: {},
  switchClassData: {},
  getClassDetailsData: {},
  getAllGuardiansData: {},
  enableAndDisableTaskData: {},
  getStudentsAssignedToTaskData: {},
  createLessonData: {},
  modifyLessonData: {},
  viewLessonData: {},
  getClassLessonsData: {},
  getAllLessonsData: {},
  deleteLessonData: {}
};

export const teacherSlice = createSlice({
  name: "teacher",

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

    scoreStudentKPIAction: (state, action) => {
      state.scoreStudentKPIData = action.payload;
      state.loading = false;
    },

    incrementScoreKPIAction: (state, action) => {
      state.incrementScoreKPIData = action.payload;
      state.loading = false;
    },

    decrementScoreKPIAction: (state, action) => {
      state.decrementScoreKPIData = action.payload;
      state.loading = false;
    },

    getStudentScoreKPIAction: (state, action) => {
      state.getStudentScoreKPIData = action.payload;
      state.loading = false;
    },

    sendNotificationAction: (state, action) => {
      state.sendNotificationData = action.payload;
      state.loading = false;
    },

    addTaskAction: (state, action) => {
      state.addTaskData = action.payload;
      state.loading = false;
    },

    modifyTaskAction: (state, action) => {
      state.modifyTaskData = action.payload;
      state.loading = false;
    },

    viewTaskDetailsAction: (state, action) => {
      state.viewTaskDetailsData = action.payload;
      state.loading = false;
    },

    getAllTasksAction: (state, action) => {
      state.getAllTasksData = action.payload;
      state.loading = false;
    },

    deleteTaskAction: (state, action) => {
      state.deleteTaskData = action.payload;
      state.loading = false;
    },

    assignTaskAction: (state, action) => {
      state.assignTaskData = action.payload;
      state.loading = false;
    },

    assessTaskAction: (state, action) => {
      state.assessTaskData = action.payload;
      state.loading = false;
    },

    submitTaskAction: (state, action) => {
      state.submitTaskData = action.payload;
      state.loading = false;
    },

    saveAttendanceAction: (state, action) => {
      state.saveAttendanceData = action.payload;
      state.loading = false;
    },

    takeAttendanceAction: (state, action) => {
      state.takeAttendanceData = action.payload;
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

    updateProfileAction: (state, action) => {
      state.updateProfileData = action.payload;
      state.loading = false;
    },

    getTeacherDetailsAction: (state, action) => {
      state.getTeacherDetailsData = action.payload;
      state.loading = false;
    },

    switchClassAction: (state, action) => {
      state.switchClassData = action.payload;
      state.loading = false;
    },

    getClassDetailsAction: (state, action) => {
      state.getClassDetailsData = action.payload;
      state.loading = false;
    },

    getAllGuardiansAction: (state, action) => {
      state.getAllGuardiansData = action.payload;
      state.loading = false;
    },

    enableAndDisableTaskAction: (state, action) => {
      state.enableAndDisableTaskData = action.payload;
      state.loading = false;
    },

    getStudentsAssignedToTaskAction: (state, action) => {
      state.getStudentsAssignedToTaskData = action.payload;
      state.loading = false;
    },

    createLessonAction: (state, action) => {
      state.createLessonData = action.payload;
      state.loading = false;
    },

    modifyLessonAction: (state, action) => {
      state.modifyLessonData = action.payload;
      state.loading = false;
    },

    deleteLessonAction: (state, action) => {
      state.deleteLessonData = action.payload;
      state.loading = false;
    },

    getAllLessonsAction: (state, action) => {
      state.getAllLessonsData = action.payload;
      state.loading = false;
    },

    viewLessonAction: (state, action) => {
      state.viewLessonData = action.payload;
      state.loading = false;
    },

    getClassLessonsAction: (state, action) => {
      state.getClassLessonsData = action.payload;
      state.loading = false;
    } 
  }
});
export default teacherSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardAction,
  addKPIAction, deleteKPIAction, modifyKPIAction,
  getAllKPIsAction, viewKPIDetailsAction, viewKPIForClassAction,
  scoreStudentKPIAction, incrementScoreKPIAction, decrementScoreKPIAction,
  getStudentScoreKPIAction, sendNotificationAction, addTaskAction,
  modifyTaskAction, viewTaskDetailsAction, getAllTasksAction,
  deleteTaskAction, assignTaskAction, assessTaskAction, submitTaskAction,
  saveAttendanceAction, takeAttendanceAction, addStudentAction,
  getAllStudentsAction, viewStudentRecordAction, modifyStudentAction,
  deleteStudentAction, updateProfileAction, getTeacherDetailsAction, switchClassAction, getClassDetailsAction, getAllGuardiansAction, enableAndDisableTaskAction, getStudentsAssignedToTaskAction, createLessonAction, modifyLessonAction, deleteLessonAction, getAllLessonsAction, viewLessonAction, getClassLessonsAction } = teacherSlice.actions;

export const getDashboard = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardApi(data);
    return dispatch(getDashboardAction(response?.data));
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
    toast.success(response.data.message);
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
    // toast.success(response.data.message);
    return dispatch(viewKPIForClassAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const scoreStudentKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await scoreStudentKPIApi(data);
    toast.success(response.data.message);
    return dispatch(scoreStudentKPIAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const incrementScoreKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await incrementScoreKPIApi(data);
    toast.success(response.data.message);
    return dispatch(incrementScoreKPIAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const decrementScoreKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await decrementScoreKPIApi(data);
    toast.success(response.data.message);
    return dispatch(decrementScoreKPIAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getStudentScoreKPI = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getStudentScoreKPIApi(data);
    // toast.success(response.data.message);
    return dispatch(getStudentScoreKPIAction(response?.data));
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

export const addTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await addTaskApi(data);
    toast.success(response.data.message);
    return dispatch(addTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyTaskApi(data);
    toast.success(response.data.message);
    return dispatch(modifyTaskAction(response?.data));
  } catch (e) {
    
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewTaskDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewTaskDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(viewTaskDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllTasks = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllTasksApi(data);
    return dispatch(getAllTasksAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteTaskApi(data);
    toast.success(response.data.message);
    return dispatch(deleteTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const assignTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assignTaskApi(data);
    toast.success(response.data.message);
    return dispatch(assignTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const assessTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await assessTaskApi(data);
    toast.success(response.data.message);
    return dispatch(assessTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const submitTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await submitTaskApi(data);
    toast.success(response.data.message);
    return dispatch(submitTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const saveAttendance = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await saveAttendanceApi(data);
    toast.success(response.data.message);
    return dispatch(saveAttendanceAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const takeAttendance = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await takeAttendanceApi(data);
    toast.success(response.data.message);
    return dispatch(takeAttendanceAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await updateProfileApi(data);
    response?.data?.teacher && localStorage.setItem("userData", JSON.stringify(response?.data?.teacher));
    toast.success(response.data.message);
    return dispatch(updateProfileAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getTeacherDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getTeacherDetailsApi(data);
    return dispatch(getTeacherDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const switchClass = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await switchClassApi(data);
    toast.success(response.data.message);
    return dispatch(switchClassAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : e?.response?.data?.message);
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

export const enableAndDisableTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await enableAndDisableTaskApi(data);
    toast.success(response.data.message);
    return dispatch(enableAndDisableTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getClassDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getClassDetailsApi(data);
    toast.success(response.data.message);
    return dispatch(getClassDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getStudentsAssignedToTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getStudentsAssignedToTaskApi(data);
    // toast.success(response.data.message);
    return dispatch(getStudentsAssignedToTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const createLesson = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await createLessonApi(data);
    toast.success(response.data.message);
    return dispatch(createLessonAction(response?.data));
  } catch (e) {
    
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : Array.isArray(e.response.data.message) ? formatArrayList(e.response.data.message) : e.response.data.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const modifyLesson = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyLessonApi(data);
    toast.success(response.data.message);
    return dispatch(modifyLessonAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const viewLesson = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewLessonApi(data);
    toast.success(response.data.message);
    return dispatch(viewLessonAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getClassLessons = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getClassLessonsApi(data);
    // toast.success(response.data.message);
    return dispatch(getClassLessonsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const getAllLessons = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllLessonsApi(data);
    toast.success(response.data.message);
    return dispatch(getAllLessonsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

export const deleteLesson = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await deleteLessonApi(data);
    toast.success(response.data.message);
    return dispatch(deleteLessonAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e?.response?.data?.errors) : Array.isArray(e?.response?.data?.message) ? formatArrayList(e?.response?.data?.message) : e?.response?.data?.message ? e?.response?.data?.message : e?.message);
    return dispatch(hasError(e?.response?.data ? e?.response?.data : e?.message));
  }
};

