import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetLoggedInUser from "@/utils/useGetLoggedInUser";
import { getDashboard } from "@/redux/Student/StudentSlice";


const useGetStudentDashboard = () => {

  const dispatch = useDispatch();
  const userDetails = useGetLoggedInUser();
  const studentData = useSelector((state) => state?.student?.getDashboardData?.data?.ward);
  let signature = userDetails?.dashboard_url.split("=")[1];
  let classCode = userDetails?.dashboard_url.split("/")[8];
  const studentID = localStorage.getItem("loggedInStudentID");
  
  useEffect(() => {
    dispatch(getDashboard({id: studentID, signature: signature, classCode: classCode}));
  }, [dispatch, signature, studentID, classCode]);
  
  return studentData;
};

export default useGetStudentDashboard;