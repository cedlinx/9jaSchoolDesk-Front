import axios from "@/config/axios";

export const getDashboardApi = async () => {
  return await axios.post("teacher/auth/dashboard");
};

export const addKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/add", data);
};

export const getAllKPIsApi = async (data) => {
  return await axios.get("teacher/auth/kpi/list", data);
};

export const modifyKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/modify", data);
};

export const deleteKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/delete", data);
};

export const viewKPIDetailsApi = async (data) => {
  return await axios.get(`teacher/auth/kpi/view?id=${data}`);
};

export const viewKPIForClassApi = async (data) => {
  return await axios.get(`teacher/auth/kpi/list?class_id=${data}`);
};

export const scoreStudentKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/score/student", data);
};

export const incrementScoreKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/increase/score", data);
};

export const decrementScoreKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/decrease/score", data);
};

export const getStudentScoreKPIApi = async (data) => {
  return await axios.post("teacher/auth/kpi/get/student/score", data);
};

export const sendNotificationApi = async (data) => {
  return await axios.post("teacher/auth/notify/parent", data);
};

export const addTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/add", data);
};

export const modifyTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/modify", data);
};

export const viewTaskDetailsApi = async (data) => {
  return await axios.get(`teacher/auth/task/view?id=${data}`, data);
};

export const getAllTasksApi = async (data) => {
  return await axios.get("teacher/auth/task/list", data);
};

export const deleteTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/delete", data);
};

export const assignTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/assign", data);
};

export const assessTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/grade", data);
};

export const submitTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/submit", data);
};

export const saveAttendanceApi = async (data) => {
  return await axios.post("teacher/auth/attendance/save", data);
};

export const takeAttendanceApi = async (data) => {
  return await axios.post("teacher/auth/attendance/take", data);
};

export const getAttendanceApi = async (data) => {
  return await axios.get("teacher/auth/attendance/list", data);
};

export const addStudentApi = async (data) => {
  return await axios.post("teacher/auth/student/add", data);
};

export const getAllStudentsApi = async (data) => {
  return await axios.get(`teacher/auth/list/student?class_id=${data}`, data);
};

export const viewStudentRecordApi = async (data) => {
  return await axios.get(`teacher/auth/view/student?id=${data}`);
};

export const modifyStudentApi = async (data) => {
  return await axios.put("teacher/auth/student/modify", data);
};

export const deleteStudentApi = async (data) => {
  return await axios.post("teacher/auth/student/delete", data);
};

export const updateProfileApi = async (data) => {
  return await axios.post("teacher/auth/profile/update", data);
};

export const getTeacherDetailsApi = async (data) => {
  // return await axios.get(`teacher/auth/profile/view?id=${data.id}`, data);
  return await axios.get("teacher/auth/profile/view", data);
};

export const switchClassApi = async (data) => {
  return await axios.post("teacher/auth/class/switch", data);
};

export const getAllGuardiansApi = async (data) => {
  return await axios.get("teacher/auth/guardian/dropdown", data);
};

export const enableAndDisableTaskApi = async (data) => {
  return await axios.post("teacher/auth/task/enable-disable", data);
};

export const getStudentsAssignedToTaskApi = async (data) => {
  return await axios.get(`teacher/auth/task/list/assigned/students?task_id=${data}`, data);
};

export const getClassDetailsApi = async (data) => {
  return await axios.get(`teacher/auth/class/view?id=${data}`);
};

export const createLessonApi = async (data) => {
  return await axios.post("teacher/auth/lesson/add", data);
};

export const modifyLessonApi = async (data) => {
  return await axios.post("teacher/auth/lesson/modify", data);
};

export const viewLessonApi = async (data) => {
  return await axios.post("teacher/auth/lesson/view", data);
};

export const getClassLessonsApi = async (data) => {
  return await axios.post("teacher/auth/lesson/list-for-class", data);
};

export const getAllLessonsApi = async (data) => {
  return await axios.get("teacher/auth/lesson/list", data);
};

export const deleteLessonApi = async (data) => {
  return await axios.post("teacher/auth/lesson/delete", data);
};








