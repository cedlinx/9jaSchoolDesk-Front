import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWards } from "@/redux/Guardian/GuardianSlice";


const useGetAllWards = () => {

  const dispatch = useDispatch();
  const allWardsData = useSelector((state) => state.guardian.getAllWardsData.wards);

  useEffect(() => {
    dispatch(getAllWards());
  }, [dispatch]);

  return allWardsData;
};

export default useGetAllWards;