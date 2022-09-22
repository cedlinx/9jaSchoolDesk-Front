import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/redux/Student/StudentSlice";

const useGetStudentDashboard = () => {

  const dispatch = useDispatch();
  const studentData = useSelector((state) => state?.student?.getDashboardData?.data?.ward);

  const studentID = localStorage.getItem("loggedInStudentID");
  const studentClassCode = localStorage.getItem("loggedInStudentClassCode");
  
  useEffect(() => {
    dispatch(getDashboard({id: studentID, classCode: studentClassCode}));
  }, [dispatch, studentID, studentClassCode]);
  
  return studentData;
};

export default useGetStudentDashboard;