import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetails } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "./useGetClassID";


const useGetClassDetails = () => {
  // const dispatch = useDispatch();
  // const classID = useGetClassID();
  // const classDetails = useSelector((state) => state?.teacher?.getClassDetailsData);

  // useEffect(() => {
  //   dispatch(getClassDetails(classID));
  // }, [classID, dispatch]);

  // console.log(classDetails);

  // return classDetails;
  const classDetails = JSON.parse(localStorage.getItem("activeClassData"));
  return classDetails;
};

export default useGetClassDetails;