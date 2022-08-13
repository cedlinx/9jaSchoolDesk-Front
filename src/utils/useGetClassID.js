import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetails } from "@/redux/Teacher/TeacherSlice";


const useGetClassID = () => {
  const classID = localStorage.getItem("class_id");
  console.log("class id", classID);
  return classID;
};

export default useGetClassID;