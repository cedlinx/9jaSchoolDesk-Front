import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGuardians as proprietorGuardians } from "@/redux/Proprietor/ProprietorSlice";
import { getAllGuardians as teacherGuardians } from "@/redux/Teacher/TeacherSlice";

import useGetUser from "./useGetUser";


const useGetAllGuardians = () => {

  let currentUser = useGetUser();
  const dispatch = useDispatch();
  const allProprietorGuardiansData = useSelector((state) => state?.proprietor?.getAllGuardiansData?.guardians);
  const allTeacherGuardiansData = useSelector((state) => state?.teacher?.getAllGuardiansData?.guardians);

  useEffect(() => {
    currentUser === "proprietor" ? dispatch(proprietorGuardians()) : dispatch(teacherGuardians());

  }, [currentUser, dispatch]);

  return currentUser === "proprietor" ? allProprietorGuardiansData : allTeacherGuardiansData;
};

export default useGetAllGuardians;