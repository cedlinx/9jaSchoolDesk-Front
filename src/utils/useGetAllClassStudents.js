import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "@/redux/Teacher/TeacherSlice";


const useGetAllClassStudents = (data) => {
  const dispatch = useDispatch();
  const allStudentsData = useSelector((state) => state?.teacher?.getAllStudentsData);

  useEffect(() => {
    dispatch(getAllStudents(data));
  }, [data, dispatch]);

  return allStudentsData;
};

export default useGetAllClassStudents;