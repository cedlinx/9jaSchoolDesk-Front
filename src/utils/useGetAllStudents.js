import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "@/redux/Proprietor/ProprietorSlice";


const useGetAllStudents = () => {

  const dispatch = useDispatch();
  const allStudentsData = useSelector((state) => state?.proprietor?.getAllStudentsData?.students);

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  return allStudentsData;
};

export default useGetAllStudents;