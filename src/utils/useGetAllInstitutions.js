import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstitutions } from "@/redux/Proprietor/ProprietorSlice";


const useGetAllInstitutions = () => {

  const dispatch = useDispatch();
  const allInstitutionsData = useSelector((state) => state?.proprietor?.getAllInstitutionsData?.institutions);

  useEffect(() => {
    dispatch(getAllInstitutions());
  }, [dispatch]);

  return allInstitutionsData;
};

export default useGetAllInstitutions;