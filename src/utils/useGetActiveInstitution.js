import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/redux/Proprietor/ProprietorSlice";


const useGetActiveInstitution = () => {

  const dispatch = useDispatch();
  const institutions = useSelector((state) => state?.proprietor?.getDashboardData?.proprietor?.institutions);
  const [activeInstitution, setActiveInstitution] = useState(null);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  useEffect(() => {
    Array.isArray(institutions) && institutions.some((institution) => {
      if (institution.is_active === 1) {
        setActiveInstitution(institution);
      }
    });
  },[institutions]);

  return activeInstitution;
};

export default useGetActiveInstitution;