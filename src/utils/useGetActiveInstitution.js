import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/redux/Proprietor/ProprietorSlice";
import useGetUser from "./useGetUser";


const useGetActiveInstitution = () => {
  const user = useGetUser();
  const dispatch = useDispatch();
  const institutions = useSelector((state) => state?.proprietor?.getDashboardData?.proprietor?.institutions);
  const [activeInstitution, setActiveInstitution] = useState(null);

  useEffect(() => {
    user === "proprietor" && getDashboard();
  }, [dispatch, user]);

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