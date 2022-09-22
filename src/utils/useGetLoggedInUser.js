import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "@/redux/Teacher/TeacherSlice";
import { getGuardianDetails } from "@/redux/Guardian/GuardianSlice";
import { getProfile } from "@/redux/Proprietor/ProprietorSlice";
import { viewStudentDetails } from "@/redux/Student/StudentSlice";
import useGetUser from "./useGetUser";

const useGetLoggedInUser = () => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const loggedInStudentID = localStorage.getItem("loggedInStudentID");
  console.log(user);
  console.log(loggedInStudentID);

  const teacherDetails = useSelector((state) => state?.teacher?.getTeacherDetailsData?.user);
  const guardianDetails = useSelector((state) => state?.guardian?.getGuardianDetailsData?.user);
  const proprietorDetails = useSelector((state) => state?.proprietor?.getProfileData?.user);
  const studentDetails = useSelector((state) => state?.student?.viewStudentDetailsData);

  // const userDetails = user === "teacher" ? useSelector((state) => state?.teacher?.getTeacherDetailsData?.user) : user === "guardian" ? useSelector((state) => state?.guardian?.getGuardianDetailsData?.user) : useSelector((state) => state?.proprietor?.getProfileData?.user);
  
  useEffect(() => {
    user === "teacher" ? dispatch(getTeacherDetails()) : user === "guardian" ? dispatch(getGuardianDetails()) : user === "proprietor" ? dispatch(getProfile()) : user === "student" ? dispatch(viewStudentDetails(loggedInStudentID)) :  null;
  }, [dispatch, loggedInStudentID, user]);
  console.log(studentDetails);
  
  // let user = localStorage.getItem("userData")
  //   ? JSON.parse(localStorage.getItem("userData"))
  //   : null;
  // return user;

  return user === "teacher" ? teacherDetails : user === "guardian" ? guardianDetails : user === "proprietor" ? proprietorDetails : user === "student" ? studentDetails : null;

};

export default useGetLoggedInUser;