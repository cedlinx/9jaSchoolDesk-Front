import axios from "@/config/axios";

export const getDashboardApi = async () => {
  return await axios.get("proprietor/auth/dashboard");
};

export const addInstitutionApi = async (data) => {
  return await axios.post("proprietor/auth/institution/add", data);
};

export const getAllInstitutionsApi = async (data) => {
  return await axios.get("proprietor/auth/institution/list", data);
};

export const modifyInstitutionApi = async (data) => {
  return await axios.post("proprietor/auth/institution/modify", data);
};

export const deleteInstitutionApi = async (data) => {
  return await axios.post("proprietor/auth/institution/delete", data);
};

export const switchInstitutionApi = async (data) => {
  return await axios.post("proprietor/auth/institution/switch", data);
};

export const addClassApi = async (data) => {
  return await axios.post("proprietor/auth/class/add", data);
};

export const getAllClassesApi = async (data) => {
  return await axios.get("proprietor/auth/class/list", data);
};

export const modifyClassApi = async (data) => {
  return await axios.post("proprietor/auth/class/modify", data);
};

export const deleteClassApi = async (data) => {
  return await axios.post("proprietor/auth/class/delete", data);
};

export const reAssignTeacherApi = async (data) => {
  return await axios.post("proprietor/auth/class/assign/teacher", data);
};

export const enableClassSubscriptionApi = async (data) => {
  return await axios.put("proprietor/auth/class/enable", data);
};

export const disableClassSubscriptionApi = async (data) => {
  return await axios.get("proprietor/auth/class/disable", data);
};

export const addTeacherApi = async (data) => {
  return await axios.post("proprietor/auth/teacher/add", data);
};

export const getAllTeachersApi = async (data) => {
  return await axios.get("proprietor/auth/teacher/list", data);
};

export const modifyTeacherApi = async (data) => {
  return await axios.post("proprietor/auth/teacher/modify", data);
};

export const deleteTeacherApi = async (data) => {
  return await axios.post("proprietor/auth/teacher/delete", data);
};

export const addStudentApi = async (data) => {
  return await axios.post("proprietor/auth/student/add", data);
};

export const getAllStudentsApi = async (data) => {
  return await axios.get("proprietor/auth/student/list", data);
};

export const viewStudentRecordApi = async (data) => {
  return await axios.get(`proprietor/auth/student/view?id=${data}`);
};

export const modifyStudentApi = async (data) => {
  return await axios.post("proprietor/auth/student/modify", data);
};

export const deleteStudentApi = async (data) => {
  return await axios.post("proprietor/auth/student/delete", data);
};

export const enableStudentSubscriptionApi = async (data) => {
  return await axios.put("proprietor/auth/student/enable", data);
};

export const disableStudentSubscriptionApi = async (data) => {
  return await axios.get("proprietor/auth/student/disable", data);
};

export const getAllGuardiansApi = async (data) => {
  return await axios.get("proprietor/auth/guardian/dropdown", data);
};

export const viewGuardianDetailsApi = async (data) => {
  return await axios.get(`proprietor/auth/guardian/view?guardian_id=${data}`);
};

export const inviteGuardianApi = async (data) => {
  return await axios.post("proprietor/auth/guardian/invite", data);
};

export const assignGuardianToSingleStudentApi = async (data) => {
  return await axios.post("proprietor/auth/guardian/assign", data);
};

export const assignGuardianToBulkStudentsApi = async (data) => {
  return await axios.post("proprietor/auth/guardian/assign/bulk", data);
};

export const guardianStatusUpdateApi = async (data) => {
  return await axios.post("proprietor/auth/guardian/update/status", data);
};

export const getGuardianStatusApi = async (data) => {
  return await axios.get("proprietor/auth/guardian/list/all", data);
};

export const getNewGuardianSignupsApi = async (data) => {
  return await axios.get("proprietor/auth/guardian/list/new", data);
};

export const addKPIApi = async (data) => {
  return await axios.post("proprietor/auth/kpi/add", data);
};

export const getAllKPIsApi = async (data) => {
  return await axios.get("proprietor/auth/kpi/list", data);
};

export const modifyKPIApi = async (data) => {
  return await axios.post("proprietor/auth/kpi/modify", data);
};

export const deleteKPIApi = async (data) => {
  return await axios.post("proprietor/auth/kpi/delete", data);
};

export const viewKPIDetailsApi = async (data) => {
  return await axios.get(`proprietor/auth/kpi/view?id=${data}`);
};

export const viewKPIForClassApi = async (data) => {
  return await axios.get(`proprietor/auth/kpi/list?class_id=${data}`);
};

export const viewKPIForInstitutionApi = async (data) => {
  return await axios.get(`proprietor/auth/kpi/list?institution_id=${data}`);
};

export const sendNotificationApi = async (data) => {
  return await axios.post("proprietor/auth/notification/bc", data);
};

export const updateProfileApi = async (data) => {
  return await axios.post("proprietor/auth/profile/update", data);
};

export const addSubjectApi = async (data) => {
  return await axios.post("proprietor/auth/subject/add", data);
};

export const getAllSubjectsApi = async (data) => {
  return await axios.get("proprietor/auth/subject/list/all", data);
};

export const modifySubjectApi = async (data) => {
  return await axios.post("proprietor/auth/subject/modify", data);
};

// export const deleteSubjectApi = async (data) => {
//   return await axios.post("proprietor/auth/subject/delete", data);
// };

export const viewSubjectDetailsApi = async (data) => {
  return await axios.get(`proprietor/auth/subject/view?id=${data}`);
};

export const assignSubjectToTeacherApi = async (data) => {
  return await axios.post("proprietor/auth/subject/teacher/save", data);
};

export const assignSubjectToStudentApi = async (data) => {
  return await axios.post("proprietor/auth/subject/student/save", data);
};
