import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/redux/Proprietor/ProprietorSlice";


const useGetInstitutionID = () => {

  const dispatch = useDispatch();
  const institution_id = useSelector((state) => state?.proprietor?.getDashboardData?.proprietor?.institution_id);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return institution_id;
};

export default useGetInstitutionID;