import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "@/redux/Proprietor/ProprietorSlice";


const useGetAllClasses = () => {

  const dispatch = useDispatch();
  const allClassesData = useSelector((state) => state?.proprietor?.getAllClassesData?.classes);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  return allClassesData;
};

export default useGetAllClasses;