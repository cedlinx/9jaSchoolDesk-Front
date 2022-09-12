import axios from "@/config/axios";
console.log(axios);

export const getDashboardApi = async (data) => {
  // return await axios.get(`student/join/class/${data.id}/${data.classCode}/dashboard?signature=${data.signature}`);

  return await axios.get(`student/join/class/${data.id}/${data.classCode}/dashboard`);
};

export const getAllStudentsApi = async (data) => {
  return await axios.get("student/auth/ward/list", data);
};

export const viewStudentDetailsApi = async (data) => {
  return await axios.get(`student/auth/ward/view?id=${data}`);
};

export const viewTaskDetailsApi = async (data) => {
  return await axios.post("student/auth/student/task/view", data);
};

export const getStudentTasksApi = async (data) => {
  return await axios.post("student/auth/student/task/list", data);
};

export const modifyStudentProfileApi = async (data) => {
  return await axios.post("student/auth/profile/update/ward", data);
};

export const submitTaskApi = async (data) => {
  return await axios.post("student/auth/task/submit", data);
};

export const rateTeacherByStudentApi = async (data) => {
  return await axios.post("student/auth/teacher/rate", data);
};

export const lessonDetailsApi = async (data) => {
  return await axios.post("student/auth/lesson/view", data);
};

export const getAllLessonsApi = async (data) => {
  return await axios.post("student/auth/lesson/list-for-class", data);
};

export const filterTasksApi = async (data) => {
  return await axios.post("student/auth/task/filter", data);
};



