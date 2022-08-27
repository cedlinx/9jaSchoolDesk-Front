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

  const columnsHeader = [
    {
      Header: () => (
        <div
          style={{
            minWidth: "1rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >
          S/No</div>
      ),
      accessor: "serialNumber",
      Cell: (row) => {
        let serialNumber = row.cell.row.values.serialNumber;
        return <span style={{ color: "#4F4F4F" }}>{serialNumber}</span>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Teacher</div>
      ),
      accessor: "parent",
      Cell: (row) => {
        let parentName = row.cell.row.values.parent.parentName;
        let parentImage = row.cell.row.values.parent.parentImage;
        return <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {parentImage ? <img style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }} src={parentImage} alt="img" /> : <p style={{ backgroundColor: generateColor(), whiteSpace: "nowrap", borderRadius: "50%", fontSize: "1.25rem", width: "2.5rem", height: "2.5rem", lineHeight: "2.5rem", textAlign: "center" }}>{initialsCase(parentName)}</p>}
          <p style={{ color: "#4F4F4F" }}>{parentName}</p>
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Subject </div>
      ),
      accessor: "firstName",
      Cell: (row) => {
        let firstName = row.cell.row.values.firstName;
        return <div style={{ color: "#4F4F4F" }}>
          {firstName}
        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            width: "15rem",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Feedback </div>
      ),
      accessor: "lastName",
      Cell: (row) => {
        let lastName = row.cell.row.values.lastName;
        return <div style={{ color: "#4F4F4F" }} >
          {lastName}

        </div>;
      }
    },
    {
      Header: () => (
        <div
          style={{
            minWidth: "auto",
            color: "#747474",
            fontSize: "1rem"
          }}
        >Date</div>
      ),
      accessor: "studentId",
      Cell: (row) => {
        return <div>
          <p style={{ color: "#4F4F4F" }}>{formatDate(new Date())}</p>
        </div>;
      }
    }
  ];

  let getTableData = (data) => {
    let result = [];

    data && data.map((item, index) => {
      result.push({
        serialNumber: index + 1,
        firstName: item?.firstName && titleCase(item?.firstName),
        lastName: item?.lastName && titleCase(item?.lastName),
        studentId: item?.studentId && item?.studentId,
        class: item?.class && item?.class,
        parentName: item?.parentName && item?.parentName,
        parentImage: item?.parentImage && item?.parentImage,
        parent: {
          parentName: item?.parentName && item?.parentName,
          parentImage: item?.parentImage && item?.parentImage
        },
        moreOption: "",
        action: ""
      });
    });
    return result;
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
        <h3 className={cx(styles.title)}><span onClick={() => navigate(-1)} style={{ cursor: "pointer", fontSize: "1.125rem" }} >Students</span> / View Report</h3>
      </div>

      <div className={cx(styles.body, "flexCol")}>

        <div className={cx(styles.tableSection)}>
          <h3 className={cx(styles.title)}>{allStudentRecord?.firstName && titleCase(allStudentRecord?.firstName)} {allStudentRecord?.lastName && titleCase(allStudentRecord?.lastName)}</h3>
          {/* {<TableComponent columnsHeader={columnsHeader} tableData={getTableData(allStudentsData)} showHeader={true} />} */}
          <div>
            <span>Student ID: </span><span>{allStudentRecord?.sdid}</span>
          </div>
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
            <span>Tasks: </span><span>{allStudentRecord?.tasks && formatArrayList(taskNames())}</span>
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