import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "@/redux/Teacher/TeacherSlice";


const useGetTeacherDetails = () => {

  const dispatch = useDispatch();
  const teacherDetails = useSelector((state) => state?.teacher?.getTeacherDetailsData);
  console.log("teacher details", teacherDetails);

  useEffect(() => {
    dispatch(getTeacherDetails());
  }, [dispatch]);

  return teacherDetails;
};

export default useGetTeacherDetails;