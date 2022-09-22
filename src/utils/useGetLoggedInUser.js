import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "@/redux/Teacher/TeacherSlice";
import { getGuardianDetails } from "@/redux/Guardian/GuardianSlice";
import { getProfile } from "@/redux/Proprietor/ProprietorSlice";
import { getDashboard } from "@/redux/Student/StudentSlice";
import useGetUser from "./useGetUser";


const useGetLoggedInUser = () => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const loggedInStudentID = localStorage.getItem("loggedInStudentID");
  const loggedInStudentClassCode = localStorage.getItem("loggedInStudentClassCode");

  const teacherDetails = useSelector((state) => state?.teacher?.getTeacherDetailsData?.user);
  const guardianDetails = useSelector((state) => state?.guardian?.getGuardianDetailsData?.user);
  const proprietorDetails = useSelector((state) => state?.proprietor?.getProfileData?.user);
  const studentDetails = useSelector((state) => state?.student?.getDashboardData?.data?.ward);
  
  useEffect(() => {
    user === "teacher" ? dispatch(getTeacherDetails()) : user === "guardian" ? dispatch(getGuardianDetails()) : user === "proprietor" ? dispatch(getProfile()) : user === "student" ? dispatch(getDashboard({id: loggedInStudentID, classCode: loggedInStudentClassCode})) :  null;
  }, [dispatch, loggedInStudentClassCode, loggedInStudentID, user]);
  
  return user === "teacher" ? teacherDetails : user === "guardian" ? guardianDetails : user === "proprietor" ? proprietorDetails : user === "student" ? studentDetails : null;
};

export default useGetLoggedInUser;