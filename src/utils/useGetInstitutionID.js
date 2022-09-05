import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/redux/Proprietor/ProprietorSlice";


const useGetInstitutionID = () => {

  const dispatch = useDispatch();
  const institutions = useSelector((state) => state?.proprietor?.getDashboardData?.proprietor?.institutions);
  const institution_id = useSelector((state) => state?.proprietor?.getDashboardData?.proprietor?.institution_id);
  const [ID, setID] = useState(null);

  // let activeInstitution = institutions.find

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  useEffect(() => {
    Array.isArray(institutions) && institutions.some((institution) => {
      if (institution.is_active === 1) {
        setID(institution.id);
      }
    });
  },[institutions]);

  return ID;
};

export default useGetInstitutionID;