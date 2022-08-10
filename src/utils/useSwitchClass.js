import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchClass } from "@/redux/Teacher/TeacherSlice";


const useSwitchClass = (data) => {

  const dispatch = useDispatch();
  const switchClassDetails = useSelector((state) => state?.teacher?.switchClassData);
  console.log("teacher details", switchClassDetails);

  useEffect(() => {
    data && dispatch(switchClass(data));
  }, [data, dispatch]);

  return switchClassDetails;
};

export default useSwitchClass;