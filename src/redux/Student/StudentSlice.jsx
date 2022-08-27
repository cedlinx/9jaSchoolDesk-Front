import { getDashboardApi, getAllStudentsApi, viewStudentDetailsApi, viewTaskDetailsApi, getStudentTasksApi, modifyStudentProfileApi, submitTaskApi, rateTeacherByStudentApi, lessonDetailsApi, getAllLessonsApi} from "../api/student";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import formatArrayList from "@/helpers/formatArrayList";
import { setToken } from "@/utils/auth";
import { setAuthToken } from "@/utils/setAuthToken";


const initialState = {
  loading: false,
  error: {},
  
  getDashboardData: {},
  getAllStudentsData: {},
  viewStudentDetailsData: {},
  viewTaskDetailsData: {},
  getStudentTasksData: {},
  modifyStudentProfileData: {},
  submitTaskData: {},
  rateTeacherByStudentData: {},
  lessonDetailsData: {},
  getAllLessonsData: {}
};

export const studentSlice = createSlice({
  name: "student",

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

    getAllStudentsAction: (state, action) => {
      state.getAllStudentsData = action.payload;
      state.loading = false;
    },
 
    viewStudentDetailsAction: (state, action) => {
      state.viewStudentDetailsData = action.payload;
      state.loading = false;
    },

    viewTaskDetailsAction: (state, action) => {
      state.viewTaskDetailsData = action.payload;
      state.loading = false;
    },

    getStudentTasksAction: (state, action) => {
      state.getStudentTasksData = action.payload;
      state.loading = false;
    },

    modifyStudentProfileAction: (state, action) => {
      state.modifyStudentProfileData = action.payload;
      state.loading = false;
    },

    submitTaskAction: (state, action) => {
      state.submitTaskData = action.payload;
      state.loading = false;
    },

    rateTeacherByStudentAction: (state, action) => {
      state.rateTeacherByStudentData = action.payload;
      state.loading = false;
    },

    lessonDetailsAction: (state, action) => {
      state.lessonDetailsData = action.payload;
      state.loading = false;
    },

    getAllLessonsAction: (state, action) => {
      state.getAllLessonsData = action.payload;
      state.loading = false;
    }
  }
});
export default studentSlice.reducer;

// Actions
const { startLoading, hasError, getDashboardAction, getAllStudentsAction, viewStudentDetailsAction, viewTaskDetailsAction, getStudentTasksAction, modifyStudentProfileAction, submitTaskAction, rateTeacherByStudentAction, lessonDetailsAction, getAllLessonsAction } = studentSlice.actions;


export const getDashboard = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getDashboardApi(data);
    // toast.success(response.data.message);
    let token = response?.data?.data?.student?.token;
    setToken(token);
    return dispatch(getDashboardAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const getAllStudents = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllStudentsApi(data);
    // toast.success(response.data.message);
    return dispatch(getAllStudentsAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const viewStudentDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewStudentDetailsApi(data);
    // toast.success(response.data.message);
    return dispatch(viewStudentDetailsAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const viewTaskDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await viewTaskDetailsApi(data);
    // toast.success(response.data.message);
    return dispatch(viewTaskDetailsAction(response?.data));
  } catch (e) {
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : e.response.data.message);
    return dispatch(hasError(e.response.data));
  }
};

export const getStudentTasks = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getStudentTasksApi(data);
    // toast.success(response.data.message);
    return dispatch(getStudentTasksAction(response?.data));
  } catch (e) {
    console.log(e.response);
    toast.error(e.response.data.errors ? formatArrayList(e.response.data.errors) : (e.response.data.message));
    return dispatch(hasError(e.response.data));
  }
};

export const modifyStudentProfile = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await modifyStudentProfileApi(data);
    console.log(response);
    toast.success(response?.data?.message);
    return dispatch(modifyStudentProfileAction(response?.data));
  } catch (e) {
    console.log(e);
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const submitTask = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await submitTaskApi(data);
    toast.success(response?.data?.message);
    return dispatch(submitTaskAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const rateTeacherByStudent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await rateTeacherByStudentApi(data);
    toast.success(response?.data?.message);
    return dispatch(rateTeacherByStudentAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const lessonDetails = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await lessonDetailsApi(data);
    return dispatch(lessonDetailsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};

export const getAllLessons = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await getAllLessonsApi(data);
    return dispatch(getAllLessonsAction(response?.data));
  } catch (e) {
    toast.error(e?.response?.data?.errors ? formatArrayList(e.response.data.errors) : e?.response?.data?.message);
    return dispatch(hasError(e?.response?.data));
  }
};
  
