import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewWardDetails } from "@/redux/Guardian/GuardianSlice";

const useGetSelectedWard = () => {
  const dispatch = useDispatch();
  let selectedID = localStorage.getItem("selectedWardID");
  let wardDetails = useSelector((state) => state?.guardian?.viewWardDetailsData?.ward);

  useEffect(() => {
    dispatch(viewWardDetails(selectedID));
  }, [dispatch, selectedID]);
  console.log(wardDetails);

  return wardDetails;
};

export default useGetSelectedWard;