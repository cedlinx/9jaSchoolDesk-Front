import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetails } from "@/redux/Teacher/TeacherSlice";


const useGetClassDetails = () => {

  const dispatch = useDispatch();
  const classDetails = useSelector((state) => state?.teacher?.getClassDetailsData);
  console.log("class details", classDetails);

  useEffect(() => {
    dispatch(getClassDetails());
  }, [dispatch]);

  return classDetails;
};

export default useGetClassDetails;