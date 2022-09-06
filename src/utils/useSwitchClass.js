import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchClass } from "@/redux/Teacher/TeacherSlice";


const useSwitchClass = (data) => {
  const dispatch = useDispatch();
  const switchClassDetails = useSelector((state) => state?.teacher?.switchClassData);

  useEffect(() => {
    data && dispatch(switchClass({id: data}));
  }, [data, dispatch]);

  return switchClassDetails;
};

export default useSwitchClass;