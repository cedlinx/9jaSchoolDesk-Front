import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "@/redux/Teacher/TeacherSlice";


const useGetAllTasks = () => {

  const dispatch = useDispatch();
  const allTasksData = useSelector((state) => state?.teacher?.getAllTasksData?.tasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return allTasksData;
};

export default useGetAllTasks;