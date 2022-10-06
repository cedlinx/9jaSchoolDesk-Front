import React from "react";
import cx from "classnames";
import styles from "./AttendanceDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@iconify/react";
import TableComponent from "@/components/Table/Table";
import { titleCase } from "@/helpers/textTransform";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import formatDate from "@/helpers/formatDate";
import DateComp from "@/components/Dates/Default/Default";
import { getAttendance } from "@/redux/Teacher/TeacherSlice";
import useGetClassID from "@/utils/useGetClassID";

const AttendanceDetails = () => {
  const dispatch = useDispatch();
  return (
    <div>AttendanceDetails</div>
  );
};

export default AttendanceDetails;