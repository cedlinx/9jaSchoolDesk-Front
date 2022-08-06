import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjects } from "@/redux/Proprietor/ProprietorSlice";


const useGetAllSubjects = () => {

  const dispatch = useDispatch();
  const allSubjectsData = useSelector((state) => state?.proprietor?.getAllSubjectsData?.subjects);

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  return allSubjectsData;
};

export default useGetAllSubjects;