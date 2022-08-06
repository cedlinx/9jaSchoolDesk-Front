import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "@/redux/Proprietor/ProprietorSlice";


const useGetAllTeachers = () => {

  const dispatch = useDispatch();
  const allTeachersData = useSelector((state) => state?.proprietor?.getAllTeachersData?.teachers);
  console.log("allTeachersData", allTeachersData);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  return allTeachersData;
};

export default useGetAllTeachers;