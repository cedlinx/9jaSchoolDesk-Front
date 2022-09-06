import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./StudentReport.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/Button/Button";

import TableComponent from "@/components/Table/Table";
import TableSkeleton from "@/components/SkeletonLoader/TableSkeleton";
import { initialsCase, titleCase } from "@/helpers/textTransform";

import { allStudentsData } from "@/helpers/sampleData";

import UrgentInfoModal from "@/components/Modals/UrgentInfo/UrgentInfo";
import AddStudentModal from "@/components/Modals/AddNewStudent/AddNewStudent";
import ActivateNewSignUpModal from "@/components/Modals/ActivateNewSignUp/ActivateNewSignUp";
import Modal from "@/components/Modals/ModalContainer/ModalContainer";
import generateColor from "@/helpers/generateColor";
import { viewStudentRecord } from "@/redux/Proprietor/ProprietorSlice";
import formatArrayList from "@/helpers/formatArrayList";
import { Icon } from "@iconify/react";

const StudentReport = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const basicStudentData = location.state.studentData;
  const navigate = useNavigate();
  const modalState = useSelector((state) => state.modalState.action);
  const modalType = useSelector((state) => state.modalState.type);

  const allStudentRecord = useSelector((state) => state.proprietor.viewStudentRecordData.ward);

  console.log(allStudentRecord);

  useEffect(() => {
    dispatch(viewStudentRecord(basicStudentData?.id));
  }, [dispatch, basicStudentData]);

  const getSubjectList = (data) => {
    let subjectList = [];
    data?.forEach((subject) => {
      subjectList.push(subject.subject);
    });
    return formatArrayList(subjectList);
  };

  console.log(basicStudentData);


  let formatDate = (value) => {
    let date = new Date(value);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    let dateValue = date.toLocaleDateString("en-US", options);
    return `${dateValue}`;
  };

  let taskNames =()=>{
    let result = [];
    allStudentRecord?.tasks.forEach((item)=>{
      result.push(item.name);
    });
    return result;
  };

  return (
    <div className={cx(styles.studentReportContainer)}>

      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}><span onClick={() => navigate(-1)} style={{ cursor: "pointer", fontSize: "1.125rem" }} ><Icon icon="eva:arrow-back-outline" /> Students</span> / View Details</h3>
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection, "flexCol")}>
          <h3 className={cx(styles.title)}>{allStudentRecord?.firstName ? titleCase(allStudentRecord?.firstName) : ""} {allStudentRecord?.lastName ? titleCase(allStudentRecord?.lastName) : ""}</h3>
          {allStudentRecord?.sdid && <div>
            <span>Student ID: </span><span>{allStudentRecord?.sdid}</span>
          </div>}
          <div>
            <span>Class: </span><span>{allStudentRecord?.class?.name}</span>
          </div>
          <div>
            <span>Gender: </span><span>{allStudentRecord?.gender && titleCase(allStudentRecord?.gender)}</span>
          </div>
          <div>
            <span>Guardian: </span><span>{allStudentRecord?.guardian.name}</span>
          </div>
          <div>
            <span>Subjects: </span><span>{allStudentRecord?.subjects && getSubjectList(allStudentRecord?.subjects)}</span>
          </div>
          <div>
            <span>Tasks: </span><span>{Array.isArray(allStudentRecord?.tasks) && allStudentRecord?.tasks.length > 0 ? formatArrayList(taskNames()) : "There is currently no task for this student"}</span>
          </div>
          <div>
            <span>Notices: </span><span>{Array.isArray(allStudentRecord?.notices) && allStudentRecord?.notices.length > 0 ? formatArrayList(allStudentRecord?.notices) : "There is currently no notice for this student"}</span>
          </div>
        </div>

      </div>

      {modalState === "show" ? <Modal show >{modalType === "urgentInfo" ? <UrgentInfoModal /> : modalType === "activateSignUp" ? <ActivateNewSignUpModal /> : modalType === "addStudent" ? <AddStudentModal /> : null}</Modal> : null}

    </div>
  );
};

export default StudentReport;