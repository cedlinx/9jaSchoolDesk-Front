import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetails } from "@/redux/Teacher/TeacherSlice";


const useGetClassID = () => {
  const classID = localStorage.getItem("class_id");
  return classID;
};

export default useGetClassID;