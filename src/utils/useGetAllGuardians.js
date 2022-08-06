import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuardians } from "@/redux/Proprietor/ProprietorSlice";


const useGetAllGuardians = () => {

  const dispatch = useDispatch();
  const allGuardiansData = useSelector((state) => state?.proprietor?.getAllGuardiansData?.guardians);

  useEffect(() => {
    dispatch(getAllGuardians());
  }, [dispatch]);

  return allGuardiansData;
};

export default useGetAllGuardians;