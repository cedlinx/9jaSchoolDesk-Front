import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "@/redux/Teacher/TeacherSlice";


const useGetAllClassStudents = (data) => {
  console.log(data);
  const dispatch = useDispatch();
  const allStudentsData = useSelector((state) => state?.teacher?.getAllStudentsData);
  console.log(allStudentsData);

  useEffect(() => {
    dispatch(getAllStudents(data));
  }, [data, dispatch]);

  return allStudentsData;
};

export default useGetAllClassStudents;